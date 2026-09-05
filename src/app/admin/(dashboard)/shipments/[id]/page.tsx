import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ShipmentForm } from "@/components/admin/ShipmentForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getShipments, getSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "Edit Shipment",
};

export default async function EditShipmentPage({
  params,
}: {
  params: { id: string };
}) {
  const [shipments, settings] = await Promise.all([
    getShipments(),
    getSettings(),
  ]);
  const shipment = shipments.find((s) => s.id === params.id);
  if (!shipment) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">
            Edit Shipment
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Tracking number:{" "}
            <span className="font-mono font-semibold text-brand-800">
              {shipment.trackingNumber}
            </span>
          </p>
        </div>
        <DeleteButton id={shipment.id} />
      </div>

      <div className="mt-6">
        <ShipmentForm
          mode="edit"
          shipment={shipment}
          statusSteps={settings.statusSteps}
        />
      </div>
    </div>
  );
}
