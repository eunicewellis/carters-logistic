import { readJson, writeJson } from "./db";
import { seedIfEmpty } from "./seed";
import { ensureSchema, hasPostgres, sql } from "./postgres";
import type {
  AdminRecord,
  Shipment,
  SiteSettings,
  StatusStep,
} from "@/types";

const SHIPMENTS_FILE = "shipments.json";
const SETTINGS_FILE = "settings.json";
const ADMIN_FILE = "admin.json";

// Postgres keys for the single key/value table.
const KEY_SHIPMENTS = "shipments";
const KEY_SETTINGS = "site";
const KEY_ADMIN = "admin";

export const DEFAULT_STATUS_STEPS: StatusStep[] = [
  { key: "order_created", label: "Order Created" },
  { key: "picked_up", label: "Picked Up" },
  { key: "in_transit", label: "In Transit" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  companyName: "Carters Logistics",
  companyEmail: "support@carterslogistic.com",
  contactCtaText: "Contact Customer Care",
  trackingTitle: "Track Your Shipment",
  trackingSubtitle:
    "Enter your tracking number to see the latest status and delivery details of your package.",
  statusSteps: DEFAULT_STATUS_STEPS,
};

async function pgGet<T>(key: string): Promise<T | null> {
  await ensureSchema();
  const { rows } = await sql`SELECT value FROM app_data WHERE key = ${key}`;
  return (rows[0]?.value as T | undefined) ?? null;
}

async function pgSet(key: string, value: unknown): Promise<void> {
  await ensureSchema();
  await sql`INSERT INTO app_data (key, value) VALUES (${key}, ${
    JSON.stringify(value) as unknown as never
  }::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`;
}

// ---------- Shipments ----------

export async function getShipments(): Promise<Shipment[]> {
  if (hasPostgres()) {
    const stored = await pgGet<Shipment[]>(KEY_SHIPMENTS);
    return stored ?? [];
  }
  await seedIfEmpty();
  return readJson<Shipment[]>(SHIPMENTS_FILE, []);
}

export async function saveShipments(list: Shipment[]): Promise<void> {
  if (hasPostgres()) {
    await pgSet(KEY_SHIPMENTS, list);
    return;
  }
  await writeJson(SHIPMENTS_FILE, list);
}

// ---------- Settings ----------

export async function getSettings(): Promise<SiteSettings> {
  if (hasPostgres()) {
    const stored = await pgGet<Partial<SiteSettings>>(KEY_SETTINGS);
    return {
      ...DEFAULT_SETTINGS,
      ...stored,
      statusSteps: stored?.statusSteps ?? DEFAULT_SETTINGS.statusSteps,
    };
  }
  const s = await readJson<Partial<SiteSettings>>(SETTINGS_FILE, {});
  return {
    ...DEFAULT_SETTINGS,
    ...s,
    statusSteps: s.statusSteps ?? DEFAULT_SETTINGS.statusSteps,
  };
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  if (hasPostgres()) {
    await pgSet(KEY_SETTINGS, settings);
    return;
  }
  await writeJson(SETTINGS_FILE, settings);
}

// ---------- Admin credentials ----------

export async function getAdminRecord(): Promise<AdminRecord | null> {
  if (hasPostgres()) {
    return pgGet<AdminRecord>(KEY_ADMIN);
  }
  return readJson<AdminRecord | null>(ADMIN_FILE, null);
}

export async function saveAdminRecord(record: AdminRecord): Promise<void> {
  if (hasPostgres()) {
    await pgSet(KEY_ADMIN, record);
    return;
  }
  await writeJson(ADMIN_FILE, record);
}


