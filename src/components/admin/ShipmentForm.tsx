"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ImagePlus, Save } from "lucide-react";
import { ProductImage } from "@/components/shared/ProductImage";
import type { Shipment, StatusCode, StatusStep } from "@/types";

export function ShipmentForm({
  mode,
  shipment,
  statusSteps,
}: {
  mode: "create" | "edit";
  shipment?: Shipment;
  statusSteps: StatusStep[];
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    productName: shipment?.productName ?? "",
    productImageUrl: "",
    recipientName: shipment?.recipientName ?? "",
    origin: shipment?.origin ?? "",
    destinationAddress: shipment?.destinationAddress ?? "",
    destinationCity: shipment?.destinationCity ?? "",
    destinationState: shipment?.destinationState ?? "",
    destinationZip: shipment?.destinationZip ?? "",
    statusCode: shipment?.statusCode ?? "in_transit",
    statusLabel: shipment?.statusLabel ?? "In Transit",
    description: shipment?.description ?? "",
    estimatedDelivery: shipment?.estimatedDelivery ?? "",
    notes: shipment?.notes ?? "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    shipment?.productImage ?? null
  );
  const [clearImage, setClearImage] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key: Exclude<keyof typeof form, "statusCode">, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setClearImage(false);
    setPreview(URL.createObjectURL(f));
  }

  function handleStatusChange(code: StatusCode) {
    const step = statusSteps.find((s) => s.key === code);
    setForm((f) => ({
      ...f,
      statusCode: code,
      statusLabel: step ? step.label : f.statusLabel,
    }));
  }

  function removeImage() {
    setFile(null);
    setClearImage(true);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("productName", form.productName);
      if (file) fd.append("productImage", file);
      if (form.productImageUrl.trim()) {
        fd.append("productImageUrl", form.productImageUrl.trim());
      }
      if (clearImage) fd.append("clearImage", "1");
      fd.append("recipientName", form.recipientName);
      fd.append("origin", form.origin);
      fd.append("destinationAddress", form.destinationAddress);
      fd.append("destinationCity", form.destinationCity);
      fd.append("destinationState", form.destinationState);
      fd.append("destinationZip", form.destinationZip);
      fd.append("statusCode", form.statusCode);
      fd.append("statusLabel", form.statusLabel);
      fd.append("description", form.description);
      fd.append("estimatedDelivery", form.estimatedDelivery);
      fd.append("notes", form.notes);

      const url =
        mode === "edit" && shipment
          ? `/api/shipments/${shipment.id}`
          : "/api/shipments";
      const res = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      router.push(`/admin/shipments/${data.shipment.id}`);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit}>
      {error && (
        <p className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      {/* Product */}
      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-brand-900">
          Product Information
        </h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <span className="label">Product image</span>
            {preview ? (
              <div className="space-y-2">
                <ProductImage
                  src={preview}
                  alt="Product preview"
                  className="aspect-square w-full rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="text-xs font-semibold text-red-500 hover:underline"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 text-slate-400 transition hover:border-brand-400 hover:text-brand-600"
              >
                <ImagePlus className="h-8 w-8" />
                <span className="text-xs font-medium">Click to upload</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
            <p className="mt-2 text-xs text-slate-400">
              Upload a photo, or paste an image URL below.
            </p>
            <input
              className="input mt-2"
              placeholder="https://... image URL"
              value={form.productImageUrl}
              onChange={(e) => update("productImageUrl", e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="label" htmlFor="productName">
              Product name <span className="text-red-500">*</span>
            </label>
            <input
              id="productName"
              required
              className="input"
              placeholder="e.g. Oak Dining Table"
              value={form.productName}
              onChange={(e) => update("productName", e.target.value)}
            />
            <label className="label mt-4" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              className="input resize-none"
              placeholder="Optional details about the product being shipped"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
            <label className="label mt-4" htmlFor="recipientName">
              Recipient name
            </label>
            <input
              id="recipientName"
              className="input"
              placeholder="e.g. Jane Cooper"
              value={form.recipientName}
              onChange={(e) => update("recipientName", e.target.value)}
            />
            <label className="label mt-4" htmlFor="origin">
              Origin
            </label>
            <input
              id="origin"
              className="input"
              placeholder="e.g. Dallas, TX"
              value={form.origin}
              onChange={(e) => update("origin", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Destination */}
      <div className="card mt-6 p-6">
        <h2 className="font-display text-lg font-semibold text-brand-900">
          Shipping Address
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          The address this product is being shipped to.
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="label" htmlFor="destinationAddress">
              Street address
            </label>
            <input
              id="destinationAddress"
              className="input"
              placeholder="4821 Birchwood Avenue"
              value={form.destinationAddress}
              onChange={(e) => update("destinationAddress", e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="destinationCity">
              City
            </label>
            <input
              id="destinationCity"
              className="input"
              placeholder="Austin"
              value={form.destinationCity}
              onChange={(e) => update("destinationCity", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="label" htmlFor="destinationState">
                State
              </label>
              <input
                id="destinationState"
                className="input"
                placeholder="TX"
                value={form.destinationState}
                onChange={(e) => update("destinationState", e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="destinationZip">
                ZIP
              </label>
              <input
                id="destinationZip"
                className="input"
                placeholder="78701"
                value={form.destinationZip}
                onChange={(e) => update("destinationZip", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="card mt-6 p-6">
        <h2 className="font-display text-lg font-semibold text-brand-900">
          Status &amp; Delivery
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className="label" htmlFor="statusCode">
              Status step
            </label>
            <select
              id="statusCode"
              className="input"
              value={form.statusCode}
              onChange={(e) => handleStatusChange(e.target.value as StatusCode)}
            >
              {statusSteps.map((step) => (
                <option key={step.key} value={step.key}>
                  {step.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="statusLabel">
              Status text (shown to customers)
            </label>
            <input
              id="statusLabel"
              className="input"
              placeholder="In Transit"
              value={form.statusLabel}
              onChange={(e) => update("statusLabel", e.target.value)}
            />
            <p className="mt-1.5 text-xs text-slate-400">
              Edit this text freely — e.g. &quot;In Transit&quot; or &quot;Arrived at Dallas
              hub&quot;.
            </p>
          </div>
          <div>
            <label className="label" htmlFor="estimatedDelivery">
              Estimated delivery date
            </label>
            <input
              id="estimatedDelivery"
              type="date"
              className="input"
              value={form.estimatedDelivery}
              onChange={(e) => update("estimatedDelivery", e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="notes">
              Internal notes
            </label>
            <input
              id="notes"
              className="input"
              placeholder="Optional"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary min-w-[160px]"
        >
          <Save className="h-4 w-4" />
          {loading
            ? "Saving..."
            : mode === "edit"
              ? "Save Changes"
              : "Create Shipment"}
        </button>
      </div>
    </form>
  );
}
