import crypto from "crypto";

// Alphabet excludes easily-confused characters (0/O, 1/I/L).
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function generateTrackingNumber(): string {
  const bytes = crypto.randomBytes(10);
  let out = "";
  for (let i = 0; i < 10; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return `CL-${out}`;
}

export function generateUniqueTrackingNumber(existing: string[]): string {
  const set = new Set(existing.map((n) => n.toUpperCase()));
  let number = generateTrackingNumber();
  while (set.has(number)) {
    number = generateTrackingNumber();
  }
  return number;
}

export function normalizeTrackingNumber(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}
