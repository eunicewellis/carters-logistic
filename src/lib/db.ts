import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

/**
 * Lightweight JSON file store used for persistence.
 * Data lives under ./data (gitignored) so the app runs with zero external DB setup.
 * Swap these helpers for a real database (Postgres, etc.) in production if desired.
 */
const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return fallback;
    throw err;
  }
}

export async function writeJson(file: string, data: unknown): Promise<void> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, file);
  // Unique temp name avoids collisions when multiple requests write concurrently.
  const tmp = `${filePath}.${crypto.randomBytes(6).toString("hex")}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tmp, filePath);
}
