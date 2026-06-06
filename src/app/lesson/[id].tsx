import { useEffect, useRef, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth, useUser } from "@clerk/expo";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  Call,
  CallingState,
} from "@stream-io/video-react-native-sdk";

import { getLessonById } from "@/data/lessons";
import AudioLessonView from "@/components/AudioLessonView";

type CallStatus = "connecting" | "joined" | "error";

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = id ? getLessonById(id) : undefined;

  const { userId, getToken } = useAuth();
  const { user } = useUser();

  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>("connecting");

  // Prevent double-cleanup in React 18 Strict Mode
  const cleanedUp = useRef(false);

  useEffect(() => {
    if (!userId || !id) return;
    cleanedUp.current = false;

    let client: StreamVideoClient | undefined;
    let activeCall: Call | undefined;

    (async () => {
      try {
        // ── 1. Fetch Stream session from our secure API route ─────────────
        const clerkToken = await getToken();
        const res = await fetch("/api/stream/session", {
          headers: { Authorization: `Bearer ${clerkToken}` },
        });
        if (!res.ok) throw new Error("Stream session fetch failed");
        const { apiKey, token } = (await res.json()) as {
          apiKey: string;
          token: string;
        };

        if (cleanedUp.current) return;

        // ── 2. Create (or reuse) the Stream Video client ──────────────────
        const tokenProvider = async () => {
          const t = await getToken();
          const r = await fetch("/api/stream/session", {
            headers: { Authorization: `Bearer ${t}` },
          });
          return ((await r.json()) as { token: string }).token;
        };

        client = StreamVideoClient.getOrCreateInstance({
          apiKey,
          user: {
            id: userId,
            name: user?.fullName ?? user?.firstName ?? userId,
            image: user?.imageUrl ?? undefined,
          },
          token,
          tokenProvider,
        });

        if (cleanedUp.current) return;
        setVideoClient(client);

        // ── 3. Create + join the lesson call (audio-only) ─────────────────
        // Call ID is deterministic per user+lesson so reconnects rejoin the same session
        const callId = `lesson-${id}-${userId}`;
        activeCall = client.call("default", callId, { reuseInstance: true });
        await activeCall.join({ create: true });
        await activeCall.camera.disable();
        await activeCall.microphone.enable();

        if (cleanedUp.current) return;
        setCall(activeCall);
        setCallStatus("joined");
      } catch (err) {
        console.error("[LessonScreen] Stream setup error:", err);
        if (!cleanedUp.current) setCallStatus("error");
      }
    })();

    return () => {
      cleanedUp.current = true;
      if (activeCall && activeCall.state.callingState !== CallingState.LEFT) {
        activeCall.leave().catch(console.error);
      }
      client?.disconnectUser().catch(console.error);
    };
  }, [userId, id]);

  // ── Lesson not found ───────────────────────────────────────────────────────

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-body-md text-text-secondary text-center">
            Lesson not found.
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="mt-4"
          >
            <Text className="text-body-md text-lingua-purple">Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── Connecting ─────────────────────────────────────────────────────────────

  if (callStatus === "connecting" || !call || !videoClient) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#6C4EF5" />
          <Text style={styles.connectingText}>Connecting to your lesson…</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────

  if (callStatus === "error") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>Connection failed</Text>
          <Text style={styles.errorSub}>
            Could not connect to the lesson. Please check your internet and try again.
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            style={styles.retryBtn}
          >
            <Text style={styles.retryText}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── Joined — render the lesson UI inside Stream providers ──────────────────

  return (
    <StreamVideo client={videoClient}>
      <StreamCall call={call}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#FFFFFF" }}
          edges={["top", "bottom"]}
        >
          <AudioLessonView
            lesson={lesson}
            userName={user?.fullName ?? user?.firstName ?? undefined}
            userImage={user?.imageUrl ?? undefined}
            onEnd={() => router.back()}
            onBack={() => router.back()}
          />
        </SafeAreaView>
      </StreamCall>
    </StreamVideo>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 16,
  },
  connectingText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#374151",
    textAlign: "center",
  },
  cancelBtn: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cancelText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
  },
  errorTitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#001132",
    textAlign: "center",
  },
  errorSub: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  retryBtn: {
    marginTop: 8,
    backgroundColor: "#6C4EF5",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  retryText: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
});
