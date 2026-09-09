import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");

// Vercel (and other serverless hosts) have a read-only filesystem, so these
// helpers degrade gracefully instead of throwing and taking down the site.

async function ensureDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Read-only filesystem — ignore; reads/writes below handle failures.
  }
}

export async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (
      code === "ENOENT" ||
      code === "EROFS" ||
      code === "EACCES" ||
      code === "ENOTDIR"
    ) {
      return fallback;
    }
    throw err;
  }
}

export async function writeJson(file: string, data: unknown): Promise<boolean> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, file);
  const tmp = `${filePath}.${crypto.randomBytes(6).toString("hex")}.tmp`;
  try {
    await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf-8");
    await fs.rename(tmp, filePath);
    return true;
  } catch (err) {
    console.error(`[store] Failed to write ${file}:`, err);
    return false;
  }
}

