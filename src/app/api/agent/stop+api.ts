// Expo API route — runs server-side only.
// Proxies to the Vision Agent HTTP server; VISION_AGENT_URL never reaches the client.

import { requireClerkUserId } from "@/lib/serverAuth";

const VISION_AGENT_URL = process.env.VISION_AGENT_URL!;

type StopAgentBody = {
  callId: string;
  sessionId: string;
};

export async function POST(request: Request) {
  const userId = requireClerkUserId(request);
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { callId, sessionId } = (await request.json()) as StopAgentBody;
  if (!callId || !sessionId) {
    return Response.json({ error: "callId and sessionId are required" }, { status: 400 });
  }

  // The Vision Agent server returns 202 Accepted — the session closes on its
  // next maintenance cycle, not immediately (see SKILL.md "Common gotchas").
  const agentResponse = await fetch(`${VISION_AGENT_URL}/calls/${callId}/sessions/${sessionId}`, {
    method: "DELETE",
  });

  if (!agentResponse.ok) {
    return Response.json({ error: "Failed to stop agent session" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
