import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export function isFile(value: unknown): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    "name" in value &&
    typeof (value as { arrayBuffer?: unknown }).arrayBuffer === "function"
  );
}

export async function saveUploadedImage(file: File): Promise<string> {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  const type = (file.type || "").toLowerCase();
  let ext = "jpg";
  if (type.includes("png")) ext = "png";
  else if (type.includes("webp")) ext = "webp";
  else if (type.includes("gif")) ext = "gif";
  else if (type.includes("svg")) ext = "svg";
  const name = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}.${ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, name), bytes);
  // Serve through the API route so uploads work in both dev and `next start`.
  return `/api/uploads/${name}`;
}
