import {
  Clock,
  Headset,
  ShieldCheck,
  Truck,
  Wallet,
  Zap,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const FEATURES = [
  {
    icon: Zap,
    title: "Fast, reliable delivery",
    description: "Optimized routes and trusted carriers get your shipment there on schedule.",
  },
  {
    icon: ShieldCheck,
    title: "Fully insured",
    description: "Every shipment is covered with cargo insurance for complete peace of mind.",
  },
  {
    icon: Wallet,
    title: "Transparent pricing",
    description: "Clear, upfront quotes with no hidden fees or surprise charges.",
  },
  {
    icon: Headset,
    title: "24/7 customer care",
    description: "Real people ready to help with your shipment at any stage.",
  },
  {
    icon: Clock,
    title: "On-time guarantee",
    description: "We hold a 99.2% on-time delivery record across all 48 states.",
  },
  {
    icon: Truck,
    title: "End-to-end visibility",
    description: "Track your package from pickup to doorstep in real time.",
  },
];

export function Features() {
  return (
    <section className="bg-brand-950 py-20">
      <div className="container-site">
        <SectionHeading
          dark
          eyebrow="Why choose us"
          title="The Carters Logistics difference"
          subtitle="We combine modern technology with old-fashioned reliability to give you a better shipping experience."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-accent-400/40 hover:bg-white/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-200">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
