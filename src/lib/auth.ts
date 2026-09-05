import crypto from "crypto";
import { cookies } from "next/headers";
import { getAuthData, saveAuthData } from "./store";

const COOKIE_NAME = "cl_admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 32).toString("hex");
}

async function ensureAdminConfigured() {
  const auth = await getAuthData();
  if (!auth.salt || !auth.secret) {
    auth.salt = crypto.randomBytes(16).toString("hex");
    auth.secret = crypto.randomBytes(32).toString("hex");
    auth.passwordHash = hashPassword(
      process.env.ADMIN_PASSWORD || "admin123",
      auth.salt
    );
    await saveAuthData(auth);
  }
  return auth;
}

export function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME || "admin";
}

export async function verifyAdmin(password: string): Promise<boolean> {
  const auth = await ensureAdminConfigured();
  const hash = hashPassword(password, auth.salt);
  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(auth.passwordHash, "hex")
  );
}

function sign(payloadB64: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payloadB64).digest("hex");
}

export async function createSessionToken(): Promise<string> {
  const auth = await ensureAdminConfigured();
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS });
  const payloadB64 = Buffer.from(payload, "utf-8").toString("base64url");
  return `${payloadB64}.${sign(payloadB64, auth.secret)}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  const auth = await ensureAdminConfigured();
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return false;
  const expected = sign(payloadB64, auth.secret);
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
