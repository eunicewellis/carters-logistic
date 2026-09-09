import type { Metadata } from "next";
import { ShipmentForm } from "@/components/admin/ShipmentForm";
import { getSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "Add Shipment",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewShipmentPage() {
  const settings = await getSettings();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-900">
        Add Shipment
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Enter the product and delivery details. A unique tracking number will
        be generated automatically.
      </p>

      <div className="mt-6">
        <ShipmentForm mode="create" statusSteps={settings.statusSteps} />
      </div>
    </div>
  );
}
