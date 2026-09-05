import { CalendarCheck, MapPin, PackageCheck, Truck } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const STEPS = [
  {
    icon: CalendarCheck,
    title: "Book a shipment",
    description:
      "Tell us what you're shipping and where it's going — online or over the phone.",
  },
  {
    icon: Truck,
    title: "We pick it up",
    description:
      "Our team collects your package from your location and secures it for transit.",
  },
  {
    icon: MapPin,
    title: "Track in real time",
    description:
      "Follow your shipment every mile with your unique tracking number.",
  },
  {
    icon: PackageCheck,
    title: "Delivered safely",
    description:
      "Your package arrives on time with proof of delivery and a signature.",
  },
];

export function Process() {
  return (
    <section className="py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="How it works"
          title="Getting started is easy"
          subtitle="Four simple steps from booking to delivery — with full visibility the whole way."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative">
                {i !== STEPS.length - 1 && (
                  <div className="absolute right-0 top-7 hidden h-0.5 w-1/2 bg-gradient-to-r from-accent-200 to-transparent lg:block" />
                )}
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500 text-white shadow-card">
                  <Icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-900 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-brand-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
