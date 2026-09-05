import {
  ArrowRight,
  BadgeCheck,
  MapPin,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { TrackingForm } from "@/components/shared/TrackingForm";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-30" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-brand-500/25 blur-3xl" />

      <div className="container-site relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        {/* Left copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-brand-100">
            <BadgeCheck className="h-4 w-4 text-accent-400" />
            USA-Based Consignment &amp; Freight Company
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Shipping made{" "}
            <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
              simple
            </span>
            , safe &amp; on time.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-200">
            Carters Logistics delivers consignments, freight, and packages
            across the United States with real-time tracking and dedicated
            customer care — every step of the way.
          </p>

          <div className="mt-8 max-w-xl">
            <TrackingForm large />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-brand-200">
            <span className="inline-flex items-center gap-2">
              <span className="flex text-accent-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              4.9/5 from 2,000+ customers
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent-400" />
              Insured &amp; secure
            </span>
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4 text-accent-400" />
              Nationwide coverage
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/services" className="btn-primary">
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/quote" className="btn bg-white/10 text-white hover:bg-white/20">
              Get a Free Quote
            </Link>
          </div>
        </div>

        {/* Right visual */}
        <div className="relative hidden lg:block">
          <div className="card animate-float overflow-hidden rounded-3xl border-white/10 bg-white/95 shadow-card-lg backdrop-blur">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Tracking
                </p>
                <p className="font-display text-lg font-bold text-brand-900">
                  CL-DEMO12345
                </p>
              </div>
              <span className="badge bg-accent-50 text-accent-600">
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent-500" />
                In Transit
              </span>
            </div>

            <div className="space-y-5 px-6 py-6">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                  <MapPin className="h-6 w-6 text-brand-600" />
                </span>
                <div className="flex-1">
                  <p className="text-xs text-slate-400">From</p>
                  <p className="text-sm font-semibold text-slate-700">
                    Dallas, TX
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">To</p>
                  <p className="text-sm font-semibold text-slate-700">
                    Austin, TX
                  </p>
                </div>
              </div>

              <div className="relative pt-2">
                <div className="h-1.5 w-full rounded-full bg-slate-100">
                  <div className="h-1.5 w-3/5 rounded-full bg-gradient-to-r from-accent-400 to-accent-500" />
                </div>
                <div className="mt-3 flex justify-between text-xs font-medium text-slate-400">
                  <span>Picked Up</span>
                  <span>In Transit</span>
                  <span>Delivered</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3">
                <div>
                  <p className="text-xs text-slate-400">Estimated delivery</p>
                  <p className="text-sm font-semibold text-brand-900">
                    Sep 12, 2026
                  </p>
                </div>
                <ShieldCheck className="h-8 w-8 text-brand-300" />
              </div>
            </div>
          </div>

          <div className="card absolute -bottom-6 -left-6 animate-float rounded-2xl px-5 py-4 shadow-card-lg [animation-delay:1.5s]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <BadgeCheck className="h-5 w-5 text-green-600" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Package delivered
                </p>
                <p className="text-xs text-slate-400">Signed by the recipient</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
