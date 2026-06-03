import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { useUserProgressStore } from "@/store/userProgressStore";
import { images } from "@/constants/images";
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
  /** Called after lesson completion + XP award — parent handles navigation */
  onEnd: () => void;
  /** If provided, a back button is rendered and calls this on press */
  onBack?: () => void;
};

export default function AudioLessonView({ lesson, onEnd, onBack }: Props) {
  const { addXP, completeLesson } = useUserProgressStore();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);

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

  function handleSpeaker() {
    if (wordIndex < totalItems) setWordIndex((prev) => prev + 1);
  }

  function handleEndCall() {
    completeLesson(lesson.id);
    addXP(lesson.xpReward);
    onEnd();
  }

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
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
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
        <View style={styles.studentAvatar}>
          <Ionicons name="person" size={26} color="#FFFFFF" />
        </View>

        <Image
          source={images.mascotWelcome}
          style={styles.mascotImage}
          contentFit="contain"
        />

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
            onPress={() => setIsMicOn((v) => !v)}
            style={[styles.controlButton, isMicOn && styles.controlButtonOn]}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isMicOn ? "mic" : "mic-off"}
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          <Text style={styles.controlLabel}>Mic</Text>
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
            onPress={handleEndCall}
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
    backgroundColor: "#21C16B",
  },
  onlineText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#21C16B",
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
  },
  mascotImage: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 72,
    height: 270,
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
