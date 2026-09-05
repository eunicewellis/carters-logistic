import crypto from "crypto";
import { cookies } from "next/headers";
import { getAdminRecord, saveAdminRecord } from "./store";

const COOKIE_NAME = "cl_admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin123";
const DEFAULT_SECRET = "carters-logistics-change-this-secret";

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 32).toString("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

async function getOrInitAdmin() {
  const existing = await getAdminRecord().catch(() => null);
  if (existing && existing.salt && existing.passwordHash) return existing;

  const salt = crypto.randomBytes(16).toString("hex");
  const record = {
    salt,
    passwordHash: hashPassword(
      process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD,
      salt
    ),
  };
  await saveAdminRecord(record).catch(() => {});
  return record;
}

export function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME || DEFAULT_USERNAME;
}

export async function verifyAdmin(password: string): Promise<boolean> {
  // The environment password always works as a master/fallback login, so you
  // can never be locked out: `ADMIN_PASSWORD` (or the default "admin123").
  const envPassword = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
  if (password === envPassword) return true;

  const record = await getOrInitAdmin();
  const hash = hashPassword(password, record.salt);
  return safeEqual(hash, record.passwordHash);
}

export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ ok: boolean; error?: string }> {
  const record = await getOrInitAdmin();
  const currentHash = hashPassword(currentPassword, record.salt);
  if (!safeEqual(currentHash, record.passwordHash)) {
    return { ok: false, error: "Current password is incorrect." };
  }

  const salt = crypto.randomBytes(16).toString("hex");
  await saveAdminRecord({
    salt,
    passwordHash: hashPassword(newPassword, salt),
  });
  return { ok: true };
}

function getSecret(): string {
  return process.env.ADMIN_SECRET || DEFAULT_SECRET;
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


