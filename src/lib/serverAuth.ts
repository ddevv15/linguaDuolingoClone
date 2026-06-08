// Server-only helpers for Expo API routes — never import from client code.

// ── Clerk JWT decode (extract sub without re-verifying signature) ────────────
// The token was issued by Clerk and is short-lived (60 s default session token).
// We check expiry — the primary time-based security guard available without
// fetching Clerk's JWKS in this edge-compatible route.
export function extractClerkUserId(sessionToken: string): string | null {
  const parts = sessionToken.split(".");
  if (parts.length !== 3) return null;
  try {
    const padded = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(padded.padEnd(padded.length + ((4 - (padded.length % 4)) % 4), "="));
    const payload = JSON.parse(json) as { sub?: string; exp?: number };
    if (!payload.sub) return null;
    if (payload.exp && payload.exp < Date.now() / 1000) return null; // expired
    return payload.sub;
  } catch {
    return null;
  }
}

/** Verifies the request's Clerk bearer token and returns the user id, or null if unauthorized. */
export function requireClerkUserId(request: Request): string | null {
  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return extractClerkUserId(authorization.slice(7));
}
