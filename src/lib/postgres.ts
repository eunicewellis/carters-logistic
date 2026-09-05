import { sql } from "@vercel/postgres";

export function hasPostgres(): boolean {
  return Boolean(process.env.POSTGRES_URL);
}

let initialized = false;

export async function ensureSchema(): Promise<void> {
  if (!hasPostgres() || initialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS app_data (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL
    )
  `;
  initialized = true;
}

export { sql };

