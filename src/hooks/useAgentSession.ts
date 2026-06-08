import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/expo";
import { useCall, useCallStateHooks } from "@stream-io/video-react-native-sdk";

import { AGENT_USER_ID } from "@/constants/agent";

export type AgentStatus = "idle" | "connecting" | "connected" | "failed";

type AgentSession = { callId: string; sessionId: string };

/**
 * Starts the AI teacher's Vision Agent session for the current call (proxied
 * through our secure /api/agent routes — the Vision Agent server URL never
 * reaches the client), tracks whether the agent has actually joined by
 * watching the participant list, and stops the session on unmount.
 */
export function useAgentSession() {
  const call = useCall();
  const { getToken } = useAuth();
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  const [requested, setRequested] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);
  const sessionRef = useRef<AgentSession | null>(null);
  const startedRef = useRef(false);

  const stopSession = useCallback(async () => {
    const session = sessionRef.current;
    sessionRef.current = null;
    if (!session) return;
    try {
      const clerkToken = await getToken();
      await fetch("/api/agent/stop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${clerkToken}`,
        },
        body: JSON.stringify(session),
      });
    } catch (err) {
      console.error("[useAgentSession] stop error:", err);
    }
  }, [getToken]);

  useEffect(() => {
    if (!call || startedRef.current) return;
    startedRef.current = true;

    (async () => {
      try {
        const clerkToken = await getToken();
        const res = await fetch("/api/agent/start", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${clerkToken}`,
          },
          body: JSON.stringify({ callId: call.id, callType: call.type }),
        });
        if (!res.ok) throw new Error("Agent start request failed");

        sessionRef.current = (await res.json()) as AgentSession;
        setRequested(true);
      } catch (err) {
        console.error("[useAgentSession] start error:", err);
        setRequestFailed(true);
      }
    })();

    return () => {
      void stopSession();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call?.cid]);

  const agentJoined = participants.some((p) => p.userId === AGENT_USER_ID);

  const status: AgentStatus = requestFailed
    ? "failed"
    : agentJoined
      ? "connected"
      : requested
        ? "connecting"
        : "idle";

  // Exposed so callers can stop the session as soon as the user ends the call,
  // rather than waiting for unmount cleanup to run. Safe to call more than
  // once — `sessionRef` is cleared after the first call.
  return { status, stop: stopSession };
}
