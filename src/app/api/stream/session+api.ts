// Expo API route — runs server-side only.
// Stream API secret and Clerk secret never leave this file.

import { requireClerkUserId } from "@/lib/serverAuth";
import { AGENT_USER_ID } from "@/constants/agent";

const STREAM_API_KEY = process.env.STREAM_API_KEY!;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET!;

// ── Stream JWT (HS256, Web Crypto API) ───────────────────────────────────────

function base64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function encodeJson(obj: object): string {
  return btoa(JSON.stringify(obj))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

async function signJwt(payload: object): Promise<string> {
  const header = encodeJson({ alg: "HS256", typ: "JWT" });
  const encodedPayload = encodeJson(payload);

  const sigInput = `${header}.${encodedPayload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(STREAM_API_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(sigInput)
  );
  return `${sigInput}.${base64url(sig)}`;
}

function generateStreamToken(userId: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return signJwt({
    iss: "stream-video-javascript",
    sub: `user/${userId}`,
    user_id: userId,
    iat: now - 5,
    exp: now + 60 * 60 * 4, // 4-hour token
  });
}

// Server tokens carry no user_id — Stream recognizes `{ server: true }` as an
// app-level credential allowed to manage users via the REST API.
function generateServerToken(): Promise<string> {
  return signJwt({ server: true });
}

// ── Agent user provisioning ──────────────────────────────────────────────────
// Stream requires every call member to exist as a user *before* the call is
// created — the AI teacher (`language-teacher`) is never logged in from a
// client, so we upsert it here, server-side, the first time a session is
// requested. Upserts are idempotent, so the in-memory guard is just an
// optimization to skip the extra request on every token refresh.
let agentUserEnsured = false;

async function ensureAgentUserExists(): Promise<void> {
  if (agentUserEnsured) return;

  const serverToken = await generateServerToken();
  const res = await fetch(
    `https://video.stream-io-api.com/api/v2/users?api_key=${STREAM_API_KEY}`,
    {
      method: "POST",
      headers: {
        Authorization: serverToken,
        "stream-auth-type": "jwt",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users: {
          [AGENT_USER_ID]: {
            id: AGENT_USER_ID,
            role: "admin",
            name: "Language Teacher",
          },
        },
      }),
    }
  );

  if (res.ok) agentUserEnsured = true;
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const userId = requireClerkUserId(request);
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureAgentUserExists();

  const token = await generateStreamToken(userId);
  return Response.json({ apiKey: STREAM_API_KEY, token, userId });
}
