"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PackageSearch } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrackingForm({
  className,
  large = false,
}: {
  className?: string;
  large?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = value.trim();
    if (!n) {
      setError("Please enter a tracking number.");
      return;
    }
    setError("");
    router.push(`/track?number=${encodeURIComponent(n)}`);
  }

  return (
    <form onSubmit={submit} className={cn("w-full", className)} noValidate>
      <div
        className={cn(
          "flex flex-col gap-2 sm:flex-row",
          large && "sm:gap-0 sm:rounded-2xl sm:bg-white sm:p-2 sm:shadow-card-lg"
        )}
      >
        <div className="relative flex-1">
          <PackageSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter tracking number (e.g. CL-DEMO12345)"
            className={cn(
              "w-full rounded-xl border border-slate-300 bg-white pl-11 text-slate-800 placeholder-slate-400 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
              large
                ? "py-3.5 text-base sm:border-0 sm:py-3 sm:shadow-none sm:focus:ring-0"
                : "py-3 text-sm"
            )}
          />
        </div>
        <button
          type="submit"
          className={cn(
            "btn-primary shrink-0",
            large && "sm:rounded-xl"
          )}
        >
          Track Shipment
        </button>
      </div>
      {error && <p className="mt-2 text-sm font-medium text-red-500">{error}</p>}
    </form>
  );
}
