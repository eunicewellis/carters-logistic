import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getAdminUsername,
  setSessionCookie,
  verifyAdmin,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "");

  if (username !== getAdminUsername() || !(await verifyAdmin(password))) {
    return NextResponse.json(
      { error: "Invalid username or password." },
      { status: 401 }
    );
  }

  const token = await createSessionToken();
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
