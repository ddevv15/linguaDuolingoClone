import { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  useCall,
  useCallStateHooks,
  CallingState,
} from "@stream-io/video-react-native-sdk";

import { useUserProgressStore } from "@/store/userProgressStore";
import { useAgentSession, type AgentStatus } from "@/hooks/useAgentSession";
import LiveCaptions from "@/components/LiveCaptions";
import { images } from "@/constants/images";
import { posthog } from "@/lib/posthog";
import type { Lesson } from "@/types/learning";

// ── Helpers ───────────────────────────────────────────────────────────────

const WELL_DONE: Record<string, string> = {
  es: "¡Muy bien!",
  fr: "Très bien !",
  ja: "よくできました！",
  ko: "잘 했어요!",
  de: "Sehr gut!",
  zh: "很好！",
};

const AGENT_STATUS_META: Record<
  AgentStatus,
  { label: string; color: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  idle: { label: "Preparing teacher…", color: "#9CA3AF", icon: "hourglass-outline" },
  connecting: { label: "Connecting teacher…", color: "#F59E0B", icon: "sync" },
  connected: { label: "Teacher connected", color: "#21C16B", icon: "checkmark-circle" },
  failed: { label: "Teacher unavailable", color: "#EF4444", icon: "alert-circle" },
};

type SpeechContent = { main: string; sub: string };

function getPrimaryActivity(lesson: Lesson) {
  return lesson.activities.find(
    (a) => a.type === "vocabulary" || a.type === "phrases"
  );
}

function getItemCount(lesson: Lesson): number {
  const a = getPrimaryActivity(lesson);
  if (!a) return lesson.aiTeacher.focusWords.length;
  if (a.type === "vocabulary") return a.items.length;
  if (a.type === "phrases") return a.items.length;
  return lesson.aiTeacher.focusWords.length;
}

function getSpeech(lesson: Lesson, index: number): SpeechContent {
  const a = getPrimaryActivity(lesson);
  if (a?.type === "vocabulary") {
    const item = a.items[index];
    if (item)
      return {
        main: item.word,
        sub: item.phonetic
          ? `${item.translation} · ${item.phonetic}`
          : item.translation,
      };
  }
  if (a?.type === "phrases") {
    const item = a.items[index];
    if (item) return { main: item.phrase, sub: item.translation };
  }
  const word = lesson.aiTeacher.focusWords[index];
  return { main: word ?? lesson.title, sub: lesson.goal.description };
}

// ── Component ─────────────────────────────────────────────────────────────

type Props = {
  lesson: Lesson;
  /** Display name of the lesson's language, e.g. "Spanish" — used for analytics */
  language?: string;
  /** Called after lesson completion + XP award — parent handles navigation */
  onEnd: () => void;
  /** If provided, a back button is rendered and calls this on press */
  onBack?: () => void;
  /** Clerk user info shown in the student avatar */
  userName?: string;
  userImage?: string;
};

export default function AudioLessonView({
  lesson,
  language,
  onEnd,
  onBack,
  userName,
  userImage,
}: Props) {
  const { addXP, completeLesson } = useUserProgressStore();

  // ── Stream call hooks (available because we're inside <StreamCall>) ──────
  const call = useCall();
  const { useCallCallingState, useMicrophoneState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const { status: micStatus } = useMicrophoneState();

  const isMicOn = micStatus === "enabled";
  const isReconnecting = callingState === CallingState.RECONNECTING;

  // ── AI teacher (Vision Agent) session ─────────────────────────────────────
  const { status: agentStatus, stop: stopAgentSession } = useAgentSession();
  const agentStatusMeta = AGENT_STATUS_META[agentStatus];

  // ── Local UI state (not stream-specific) ──────────────────────────────────
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);

  const hasCompleted = useRef(false);

  // Captured once on mount so `lesson_abandoned` can report an accurate
  // elapsed time regardless of re-renders.
  const lessonStartedAt = useRef(Date.now());
  // Mirrors `wordIndex` so the unmount cleanup below (a stable closure with
  // empty deps) can read the latest progress instead of its initial value.
  const wordIndexRef = useRef(wordIndex);
  useEffect(() => {
    wordIndexRef.current = wordIndex;
  }, [wordIndex]);

  // ── Lesson lifecycle analytics ─────────────────────────────────────────────
  // This view only mounts once the call has joined and the lesson UI is shown,
  // so its mount/unmount line up with "the user begins/leaves the lesson".
  useEffect(() => {
    const startedAt = lessonStartedAt.current;

    posthog.capture("lesson_started", {
      lesson_id: lesson.id,
      language: language ?? "",
      lesson_number: lesson.order,
    });

    return () => {
      if (!hasCompleted.current) {
        posthog.capture("lesson_abandoned", {
          lesson_id: lesson.id,
          time_into_lesson_seconds: Math.round((Date.now() - startedAt) / 1000),
          last_question_index: wordIndexRef.current,
        });
      }
    };
    // Fire once per mounted lesson — `lesson`/`language` are stable for the view's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalItems = getItemCount(lesson);
  const isComplete = wordIndex >= totalItems;
  const wellDone = WELL_DONE[lesson.unitId.slice(0, 2)] ?? "Well done!";
  const speech: SpeechContent = isComplete
    ? { main: wellDone, sub: "That was great! 👋" }
    : getSpeech(lesson, wordIndex);

  const feedbackRatings = {
    speaking: lesson.aiTeacher.voiceTone === "professional" ? "Good" : "Excellent",
    pronunciation: "Great",
    grammar: "Good",
  };

  // ── End call (local button or externally-ended call) ──────────────────────

  async function handleEndCall() {
    if (hasCompleted.current) return;
    hasCompleted.current = true;

    await stopAgentSession();

    if (call && call.state.callingState !== CallingState.LEFT) {
      await call.leave().catch(console.error);
    }

    completeLesson(lesson.id);
    addXP(lesson.xpReward);
    onEnd();
  }

  // Detect when Stream ends the call externally (network drop, remote end)
  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      void handleEndCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callingState]);

  // ── Mic toggle ────────────────────────────────────────────────────────────

  function handleMicToggle() {
    call?.microphone.toggle().catch(console.error);
  }

  // ── Speaker advance ───────────────────────────────────────────────────────

  function handleSpeaker() {
    if (wordIndex < totalItems) setWordIndex((prev) => prev + 1);
  }

  // ── User initials for avatar fallback ─────────────────────────────────────

  const initials = userName
    ? userName
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "Me";

  // ── Calling state label ───────────────────────────────────────────────────

  const statusLabel = isReconnecting ? "Reconnecting…" : "Online";
  const statusColor = isReconnecting ? "#F59E0B" : "#21C16B";

  return (
    <View style={styles.root}>
      {/* ── Header ──────────────────────────────────── */}
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={styles.headerSide}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={26} color="#001132" />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerSide} />
        )}

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>AI Teacher</Text>
          <View style={styles.onlineRow}>
            <View style={[styles.onlineDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.onlineText, { color: statusColor }]}>
              {statusLabel}
            </Text>
          </View>
        </View>

        <View style={[styles.headerSide, styles.headerRight]}>
          <Ionicons name="videocam-outline" size={20} color="#6B7280" />
          <View style={styles.lessonBadge}>
            <Text style={styles.lessonBadgeText}>{lesson.order}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={{ marginLeft: 10 }}>
            <Ionicons name="notifications-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Teacher Area ─────────────────────────────── */}
      <View style={styles.teacherArea}>
        {/* Student avatar (top-right) */}
        <View style={styles.studentAvatar}>
          {userImage ? (
            <Image
              source={{ uri: userImage }}
              style={styles.avatarImage}
              contentFit="cover"
            />
          ) : (
            <Text style={styles.avatarInitials}>{initials}</Text>
          )}
        </View>

        <Image
          source={images.mascotWelcome}
          style={styles.mascotImage}
          contentFit="contain"
        />

        {/* Reconnecting overlay */}
        {isReconnecting && (
          <View style={styles.reconnectingOverlay}>
            <Text style={styles.reconnectingText}>Reconnecting…</Text>
          </View>
        )}

        {/* Muted indicator */}
        {!isMicOn && (
          <View style={styles.mutedBadge}>
            <Ionicons name="mic-off" size={13} color="#FFFFFF" />
            <Text style={styles.mutedText}>Muted</Text>
          </View>
        )}

        {/* AI teacher (Vision Agent) connection status */}
        <View style={[styles.agentStatusBadge, { backgroundColor: agentStatusMeta.color }]}>
          <Ionicons name={agentStatusMeta.icon} size={13} color="#FFFFFF" />
          <Text style={styles.agentStatusText}>{agentStatusMeta.label}</Text>
        </View>

        {/* Live captions — real-time transcription of the teacher and student */}
        {showSubtitles && <LiveCaptions />}

        {showSubtitles && (
          <View style={styles.speechBubble}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={styles.speechMain} numberOfLines={2}>
                {speech.main}
              </Text>
              <Text style={styles.speechSub} numberOfLines={1}>
                {speech.sub}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleSpeaker}
              activeOpacity={0.7}
              style={styles.speakerButton}
            >
              <Ionicons name="volume-high" size={20} color="#6C4EF5" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* ── Controls ─────────────────────────────────── */}
      <View style={styles.controls}>
        <View style={styles.controlItem}>
          <TouchableOpacity
            onPress={() => setIsCameraOn((v) => !v)}
            style={[styles.controlButton, isCameraOn && styles.controlButtonOn]}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isCameraOn ? "videocam" : "videocam-off-outline"}
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          <Text style={styles.controlLabel}>Camera</Text>
        </View>

        <View style={styles.controlItem}>
          <TouchableOpacity
            onPress={handleMicToggle}
            style={[styles.controlButton, isMicOn && styles.controlButtonOn]}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isMicOn ? "mic" : "mic-off"}
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          <Text style={styles.controlLabel}>{isMicOn ? "Mute" : "Unmute"}</Text>
        </View>

        <View style={styles.controlItem}>
          <TouchableOpacity
            onPress={() => setShowSubtitles((v) => !v)}
            style={[
              styles.controlButton,
              showSubtitles && styles.controlButtonOn,
            ]}
            activeOpacity={0.8}
          >
            <Ionicons
              name={showSubtitles ? "language" : "language-outline"}
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          <Text style={styles.controlLabel}>Subtitles</Text>
        </View>

        <View style={styles.controlItem}>
          <TouchableOpacity
            onPress={() => void handleEndCall()}
            style={styles.endCallButton}
            activeOpacity={0.8}
          >
            <Ionicons name="call" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.controlLabel}>End Call</Text>
        </View>
      </View>

      {/* ── Feedback ──────────────────────────────────── */}
      <View style={styles.feedback}>
        {(
          [
            { label: "Speaking", value: feedbackRatings.speaking },
            { label: "Pronunciation", value: feedbackRatings.pronunciation },
            { label: "Grammar", value: feedbackRatings.grammar },
          ] as const
        ).map((item, i, arr) => (
          <View
            key={item.label}
            style={[
              styles.feedbackItem,
              i < arr.length - 1 && styles.feedbackDivider,
            ]}
          >
            <Text style={styles.feedbackLabel}>{item.label}</Text>
            <Text style={styles.feedbackValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────

const BTN = 56;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  headerSide: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerRight: {
    justifyContent: "flex-end",
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#001132",
    lineHeight: 22,
  },
  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 1,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  onlineText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    lineHeight: 16,
  },
  lessonBadge: {
    backgroundColor: "#F0ECFE",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
    minWidth: 22,
    alignItems: "center",
  },
  lessonBadgeText: {
    fontSize: 11,
    fontFamily: "Poppins-SemiBold",
    color: "#6C4EF5",
    lineHeight: 15,
  },
  teacherArea: {
    flex: 1,
    backgroundColor: "#EEF2FF",
    overflow: "hidden",
    position: "relative",
  },
  studentAvatar: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#4B5563",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    overflow: "hidden",
  },
  avatarImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  avatarInitials: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  mascotImage: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 72,
    height: 270,
  },
  reconnectingOverlay: {
    position: "absolute",
    top: 12,
    left: 16,
    backgroundColor: "#F59E0B",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    zIndex: 20,
  },
  reconnectingText: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  mutedBadge: {
    position: "absolute",
    bottom: 84,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#374151",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 20,
  },
  mutedText: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  agentStatusBadge: {
    position: "absolute",
    bottom: 84,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 20,
  },
  agentStatusText: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  speechBubble: {
    position: "absolute",
    bottom: 12,
    left: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  speechMain: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#001132",
    lineHeight: 24,
  },
  speechSub: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    lineHeight: 18,
    marginTop: 2,
  },
  speakerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0ECFE",
    alignItems: "center",
    justifyContent: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#FFFFFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
  },
  controlItem: {
    alignItems: "center",
    gap: 6,
  },
  controlButton: {
    width: BTN,
    height: BTN,
    borderRadius: BTN / 2,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  controlButtonOn: {
    backgroundColor: "#6C4EF5",
  },
  endCallButton: {
    width: BTN,
    height: BTN,
    borderRadius: BTN / 2,
    backgroundColor: "#FF3B30",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "135deg" }],
  },
  controlLabel: {
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    lineHeight: 15,
  },
  feedback: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  feedbackItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 2,
  },
  feedbackDivider: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: "#E5E7EB",
  },
  feedbackLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    lineHeight: 16,
  },
  feedbackValue: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#21C16B",
    lineHeight: 20,
    marginTop: 2,
  },
});
