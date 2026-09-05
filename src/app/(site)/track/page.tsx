import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { TrackingForm } from "@/components/shared/TrackingForm";
import { TrackResult } from "@/components/shared/TrackResult";
import { getShipments, getSettings } from "@/lib/store";
import { normalizeTrackingNumber } from "@/lib/tracking";

export const metadata: Metadata = {
  title: "Track Shipment",
  description:
    "Track your Carters Logistics shipment in real time using your tracking number.",
};

export default async function TrackPage({
  searchParams,
}: {
  searchParams: { number?: string };
}) {
  const settings = await getSettings();
  const number = normalizeTrackingNumber(searchParams.number ?? "");

  let shipment = null;
  if (number) {
    const shipments = await getShipments();
    shipment =
      shipments.find(
        (s) => normalizeTrackingNumber(s.trackingNumber) === number
      ) ?? null;
  }

  return (
    <>
      <PageHero
        eyebrow="Shipment tracking"
        title={settings.trackingTitle}
        subtitle={settings.trackingSubtitle}
      />

      <section className="container-site py-12">
        <div className="mx-auto max-w-3xl">
          <TrackingForm />
        </div>

        {shipment ? (
          <TrackResult shipment={shipment} settings={settings} />
        ) : number ? (
          <div className="card mx-auto mt-10 max-w-3xl p-10 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-50">
              <SearchX className="h-7 w-7 text-accent-500" />
            </span>
            <h2 className="mt-4 font-display text-xl font-bold text-brand-900">
              No shipment found
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              We couldn&apos;t find a shipment with the tracking number{" "}
              <span className="font-semibold text-slate-700">{number}</span>.
              Please double-check the number and try again.
            </p>
            <Link href="/contact" className="btn-outline mt-6">
              Contact Support
            </Link>
          </div>
        ) : null}
      </section>
    </>
  );
}
