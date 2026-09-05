import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Headset,
  MapPin,
  PackageCheck,
  User,
} from "lucide-react";
import { ProductImage } from "./ProductImage";
import { formatDate, formatDateTime } from "@/lib/utils";
import type { Shipment, SiteSettings } from "@/types";

export function TrackResult({
  shipment,
  settings,
}: {
  shipment: Shipment;
  settings: SiteSettings;
}) {
  const steps = settings.statusSteps ?? [];
  const foundIndex = steps.findIndex((s) => s.key === shipment.statusCode);
  const currentIndex = foundIndex === -1 ? steps.length - 1 : foundIndex;

  const destination = [
    shipment.destinationAddress,
    shipment.destinationCity,
    shipment.destinationState,
    shipment.destinationZip,
  ]
    .filter(Boolean)
    .join(", ");

  const subject = `Inquiry about shipment ${shipment.trackingNumber}`;
  const body = `Hello ${settings.companyName} team,\n\nI would like to get more information about my shipment.\n\nTracking number: ${shipment.trackingNumber}\nProduct: ${shipment.productName}\n\nThank you.`;
  const mailto = `mailto:${settings.companyEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-5">
      {/* Product details */}
      <div className="card overflow-hidden lg:col-span-3">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold text-brand-900">
              Shipment Details
            </h2>
            <span className="badge bg-brand-50 text-brand-800">
              {shipment.trackingNumber}
            </span>
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
          <div>
            <ProductImage
              src={shipment.productImage}
              alt={shipment.productName}
              className="aspect-[4/3] w-full rounded-xl"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Product
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-brand-900">
              {shipment.productName}
            </h3>

            {shipment.description && (
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {shipment.description}
              </p>
            )}

            <dl className="mt-5 space-y-3 text-sm">
              {shipment.recipientName && (
                <div className="flex items-start gap-2.5">
                  <User className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                  <div>
                    <dt className="text-slate-400">Recipient</dt>
                    <dd className="font-medium text-slate-700">
                      {shipment.recipientName}
                    </dd>
                  </div>
                </div>
              )}
              {shipment.origin && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                  <div>
                    <dt className="text-slate-400">Origin</dt>
                    <dd className="font-medium text-slate-700">
                      {shipment.origin}
                    </dd>
                  </div>
                </div>
              )}
              {shipment.estimatedDelivery && (
                <div className="flex items-start gap-2.5">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                  <div>
                    <dt className="text-slate-400">Estimated delivery</dt>
                    <dd className="font-medium text-slate-700">
                      {formatDate(shipment.estimatedDelivery)}
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="card p-5 sm:p-6 lg:col-span-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-brand-900">
            Delivery Status
          </h2>
          <PackageCheck className="h-6 w-6 text-accent-500" />
        </div>

        <div className="mt-4 rounded-xl bg-accent-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">
            Current status
          </p>
          <p className="mt-0.5 flex items-center gap-2 font-display text-lg font-bold text-brand-900">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-500" />
            </span>
            {shipment.statusLabel}
          </p>
        </div>

        {/* Timeline */}
        <ol className="mt-6 space-y-0">
          {steps.map((step, i) => {
            const isDone = i < currentIndex;
            const isCurrent = i === currentIndex;
            return (
              <li key={step.key} className="relative flex gap-4 pb-6 last:pb-0">
                {i !== steps.length - 1 && (
                  <span
                    className={`absolute left-[13px] top-7 h-full w-0.5 ${
                      isDone ? "bg-brand-300" : "bg-slate-200"
                    }`}
                  />
                )}
                <span className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center">
                  {isDone ? (
                    <CheckCircle2 className="h-7 w-7 text-brand-600" />
                  ) : isCurrent ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 text-white ring-4 ring-accent-100">
                      <span className="h-2 w-2 animate-pulse-dot rounded-full bg-white" />
                    </span>
                  ) : (
                    <Circle className="h-7 w-7 text-slate-300" />
                  )}
                </span>
                <div className="pt-0.5">
                  <p
                    className={`text-sm font-semibold ${
                      isCurrent
                        ? "text-brand-900"
                        : isDone
                          ? "text-slate-700"
                          : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p className="mt-0.5 text-xs text-slate-400">
                      Updated {formatDateTime(shipment.updatedAt)}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Destination */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Shipping to
          </p>
          <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
            {destination || "Address not provided"}
          </p>
        </div>

        {/* Contact CTA */}
        <a href={mailto} className="btn-dark mt-6 w-full">
          <Headset className="h-5 w-5 text-accent-400" />
          {settings.contactCtaText}
        </a>
        <p className="mt-3 text-center text-xs text-slate-400">
          Questions about this shipment? Email{" "}
          <a
            href={`mailto:${settings.companyEmail}`}
            className="font-medium text-accent-600 hover:underline"
          >
            {settings.companyEmail}
          </a>
        </p>
      </div>
    </div>
  );
}
