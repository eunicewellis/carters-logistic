import { readJson, writeJson } from "./db";
import type { Shipment } from "@/types";

const SHIPMENTS_FILE = "shipments.json";

const demoShipment: Shipment = {
  id: "demo-shipment-1",
  trackingNumber: "CL-DEMO12345",
  productName: "Leather Office Chair (Sample Consignment)",
  productImage: null,
  recipientName: "Jane Cooper",
  origin: "Dallas, TX",
  destinationAddress: "4821 Birchwood Avenue",
  destinationCity: "Austin",
  destinationState: "TX",
  destinationZip: "78701",
  statusCode: "in_transit",
  statusLabel: "In Transit",
  description:
    "This is a sample shipment created to demonstrate the tracking experience. Log in to the admin dashboard to add your own shipments.",
  estimatedDelivery: "2026-09-12",
  notes: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export async function seedIfEmpty(): Promise<void> {
  const existing = await readJson<Shipment[] | null>(SHIPMENTS_FILE, null);
  if (existing === null) {
    await writeJson(SHIPMENTS_FILE, [demoShipment]);
  }
}
