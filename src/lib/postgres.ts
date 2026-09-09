import {
  createPool,
  type QueryResultRow,
  type VercelPool,
} from "@vercel/postgres";

type Primitive = string | number | boolean | undefined | null;

// Different integrations expose the connection string under different names
// (e.g. "Vercel Postgres" sets POSTGRES_URL, while a direct Neon integration
// may only set POSTGRES_URL_NON_POOLING or DATABASE_URL). Accept the common ones.
function getConnectionString(): string | undefined {
  return (
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL
  );
}

export function hasPostgres(): boolean {
  return Boolean(getConnectionString());
}

let pool: VercelPool | null = null;
let initialized = false;

function getPool(): VercelPool {
  if (!pool) {
    const connectionString = getConnectionString();
    if (!connectionString) {
      throw new Error("Postgres is not configured: no connection string found.");
    }
    pool = createPool({ connectionString });
  }
  return pool;
}

export async function ensureSchema(): Promise<void> {
  if (!hasPostgres() || initialized) return;
  await getPool().sql`
    CREATE TABLE IF NOT EXISTS app_data (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL
    )
  `;
  initialized = true;
}

export function sql<O extends QueryResultRow = QueryResultRow>(
  strings: TemplateStringsArray,
  ...values: Primitive[]
) {
  return getPool().sql<O>(strings, ...values);
}

