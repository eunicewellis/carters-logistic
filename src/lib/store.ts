import { readJson, writeJson } from "./db";
import { seedIfEmpty } from "./seed";
import type { AuthData, Shipment, SiteSettings, StatusStep } from "@/types";

const SHIPMENTS_FILE = "shipments.json";
const SETTINGS_FILE = "settings.json";
const AUTH_FILE = "auth.json";

export const DEFAULT_STATUS_STEPS: StatusStep[] = [
  { key: "order_created", label: "Order Created" },
  { key: "picked_up", label: "Picked Up" },
  { key: "in_transit", label: "In Transit" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  companyName: "Carters Logistics",
  companyEmail: "support@carterslogistics.com",
  companyPhone: "+1 (800) 555-0134",
  companyAddress: "1234 Logistics Way, Suite 200, Dallas, TX 75201",
  supportHours: "Mon–Fri: 8:00 AM – 6:00 PM CT",
  contactCtaText: "Contact Customer Care",
  trackingTitle: "Track Your Shipment",
  trackingSubtitle:
    "Enter your tracking number to see the latest status and delivery details of your package.",
  statusSteps: DEFAULT_STATUS_STEPS,
};

// ---------- Shipments ----------

export async function getShipments(): Promise<Shipment[]> {
  await seedIfEmpty();
  return readJson<Shipment[]>(SHIPMENTS_FILE, []);
}

export async function saveShipments(list: Shipment[]): Promise<void> {
  await writeJson(SHIPMENTS_FILE, list);
}

// ---------- Settings ----------

export async function getSettings(): Promise<SiteSettings> {
  const s = await readJson<Partial<SiteSettings>>(SETTINGS_FILE, {});
  return {
    ...DEFAULT_SETTINGS,
    ...s,
    statusSteps: s.statusSteps ?? DEFAULT_SETTINGS.statusSteps,
  };
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await writeJson(SETTINGS_FILE, settings);
}

// ---------- Auth ----------

export async function getAuthData(): Promise<AuthData> {
  return readJson<AuthData>(AUTH_FILE, {
    salt: "",
    passwordHash: "",
    secret: "",
  });
}

export async function saveAuthData(data: AuthData): Promise<void> {
  await writeJson(AUTH_FILE, data);
}
