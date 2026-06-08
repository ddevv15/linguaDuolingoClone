// Expo API route — runs server-side only.
// Stream API secret and Clerk secret never leave this file.

import { requireClerkUserId } from "@/lib/serverAuth";

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

async function generateStreamToken(userId: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = encodeJson({ alg: "HS256", typ: "JWT" });
  const payload = encodeJson({
    iss: "stream-video-javascript",
    sub: `user/${userId}`,
    user_id: userId,
    iat: now - 5,
    exp: now + 60 * 60 * 4, // 4-hour token
  });

  const sigInput = `${header}.${payload}`;
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

// ── Handler ───────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const userId = requireClerkUserId(request);
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await generateStreamToken(userId);
  return Response.json({ apiKey: STREAM_API_KEY, token, userId });
}
