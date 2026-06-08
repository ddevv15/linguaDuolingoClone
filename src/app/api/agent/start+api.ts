// Expo API route — runs server-side only.
// Proxies to the Vision Agent HTTP server; VISION_AGENT_URL never reaches the client.

import { requireClerkUserId } from "@/lib/serverAuth";

const VISION_AGENT_URL = process.env.VISION_AGENT_URL!;

type StartAgentBody = {
  callId: string;
  callType: string;
};

type VisionAgentSessionResponse = {
  session_id: string;
  call_id: string;
  session_started_at: string;
};

export async function POST(request: Request) {
  const userId = requireClerkUserId(request);
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { callId, callType } = (await request.json()) as StartAgentBody;
  if (!callId || !callType) {
    return Response.json({ error: "callId and callType are required" }, { status: 400 });
  }

  const agentResponse = await fetch(`${VISION_AGENT_URL}/calls/${callId}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ call_type: callType }),
  });

  if (!agentResponse.ok) {
    return Response.json({ error: "Failed to start agent session" }, { status: 502 });
  }

  const session = (await agentResponse.json()) as VisionAgentSessionResponse;
  return Response.json({
    sessionId: session.session_id,
    callId: session.call_id,
    sessionStartedAt: session.session_started_at,
  });
}
