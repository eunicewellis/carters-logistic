import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  PackagePlus,
  Package,
  Truck,
} from "lucide-react";
import { getShipments } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { SuccessToast } from "@/components/admin/SuccessToast";
import type { StatusCode } from "@/types";

export const metadata: Metadata = {
  title: "Dashboard",
};

const STATUS_BADGE: Record<StatusCode, string> = {
  order_created: "bg-slate-100 text-slate-600",
  picked_up: "bg-brand-50 text-brand-700",
  in_transit: "bg-accent-50 text-accent-600",
  out_for_delivery: "bg-amber-50 text-amber-600",
  delivered: "bg-green-50 text-green-600",
};

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { created?: string; tracking?: string };
}) {
  const shipments = await getShipments();

  const stats = [
    {
      label: "Total Shipments",
      value: shipments.length,
      icon: Package,
      tint: "bg-brand-50 text-brand-700",
    },
    {
      label: "In Transit",
      value: shipments.filter((s) => s.statusCode === "in_transit").length,
      icon: Truck,
      tint: "bg-accent-50 text-accent-600",
    },
    {
      label: "Out for Delivery",
      value: shipments.filter((s) => s.statusCode === "out_for_delivery")
        .length,
      icon: ArrowUpRight,
      tint: "bg-amber-50 text-amber-600",
    },
    {
      label: "Delivered",
      value: shipments.filter((s) => s.statusCode === "delivered").length,
      icon: CheckCircle2,
      tint: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div>
      {searchParams?.created ? (
        <SuccessToast
          message={`Shipment created successfully${
            searchParams.tracking
              ? ` — tracking number ${searchParams.tracking}`
              : ""
          }.`}
        />
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your consignments and tracking numbers.
          </p>
        </div>
        <Link href="/admin/shipments/new" className="btn-primary">
          <PackagePlus className="h-4 w-4" />
          Add Shipment
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-5">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.tint}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-3xl font-bold text-brand-900">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="card mt-6 overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-display text-base font-semibold text-brand-900">
            Recent Shipments
          </h2>
        </div>

        {shipments.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <Package className="h-10 w-10 text-slate-300" />
            <p className="mt-3 font-medium text-slate-600">
              No shipments yet
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Add your first shipment to generate a tracking number.
            </p>
            <Link href="/admin/shipments/new" className="btn-primary mt-5">
              Add Shipment
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Tracking #</th>
                  <th className="px-5 py-3 font-semibold">Product</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Destination</th>
                  <th className="px-5 py-3 font-semibold">Created</th>
                  <th className="px-5 py-3 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-mono text-xs font-semibold text-brand-800">
                      {shipment.trackingNumber}
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-700">
                      {shipment.productName}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`badge ${
                          STATUS_BADGE[shipment.statusCode] ??
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {shipment.statusLabel}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {[shipment.destinationCity, shipment.destinationState]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {formatDate(shipment.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/shipments/${shipment.id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:underline"
                      >
                        View / Edit
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
