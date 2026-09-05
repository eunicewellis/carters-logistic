import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { put } from "@vercel/blob";

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

function extFromType(type: string): string {
  const t = type.toLowerCase();
  if (t.includes("png")) return "png";
  if (t.includes("webp")) return "webp";
  if (t.includes("gif")) return "gif";
  if (t.includes("svg")) return "svg";
  return "jpg";
}

export async function saveUploadedImage(file: File): Promise<string> {
  const type = (file.type || "").toLowerCase();
  const ext = extFromType(type);
  const name = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  // Vercel Blob is configured via EITHER a read/write token (legacy) OR a
  // store id + OIDC (new store model). Use Blob when either is present.
  const useBlob = Boolean(
    process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID
  );
  if (useBlob) {
    const blob = await put(`uploads/${name}`, bytes, {
      access: "public",
      contentType: file.type || "image/jpeg",
    });
    return blob.url;
  }

  // Local development: store on disk and serve via the API route.
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), bytes);
  return `/api/uploads/${name}`;
}

