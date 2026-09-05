import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "cl_admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

// Stateless auth configuration — reads credentials from environment variables
// so it works on serverless platforms (e.g. Vercel) where the filesystem is
// read-only and no database is available.
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin123";
const DEFAULT_SECRET = "carters-logistics-change-this-secret";

export function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME || DEFAULT_USERNAME;
}

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

function getSecret(): string {
  return process.env.ADMIN_SECRET || DEFAULT_SECRET;
}

export async function verifyAdmin(password: string): Promise<boolean> {
  const a = Buffer.from(password);
  const b = Buffer.from(getAdminPassword());
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function sign(payloadB64: string): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(payloadB64)
    .digest("hex");
}

export async function createSessionToken(): Promise<string> {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS });
  const payloadB64 = Buffer.from(payload, "utf-8").toString("base64url");
  return `${payloadB64}.${sign(payloadB64)}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return false;
  const expected = sign(payloadB64);
  if (
    expected.length !== sig.length ||
    !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))
  ) {
    return false;
  }
  try {
    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf-8")
    );
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function setSessionCookie(token: string): Promise<void> {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearSessionCookie(): Promise<void> {
  cookies().delete(COOKIE_NAME);
}

