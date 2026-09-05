import { Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const TESTIMONIALS = [
  {
    name: "Amanda Rodriguez",
    role: "Boutique Owner, Houston TX",
    quote:
      "Carters Logistics ships my consignment pieces across the country without a single issue. The tracking page is so easy for my customers to use.",
  },
  {
    name: "David Chen",
    role: "E-commerce Manager, Seattle WA",
    quote:
      "Reliable, fast, and the support team actually answers the phone. We've moved our entire fulfilment to Carters and couldn't be happier.",
  },
  {
    name: "Melissa Thompson",
    role: "Interior Designer, Chicago IL",
    quote:
      "Their white-glove delivery handled my fragile furniture perfectly. Real-time updates kept my client informed every step of the way.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by shippers nationwide"
          subtitle="Here's what our customers say about working with Carters Logistics."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card flex flex-col p-6">
              <div className="flex text-accent-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-slate-100 pt-4">
                <p className="font-display text-sm font-semibold text-brand-900">
                  {t.name}
                </p>
                <p className="text-xs text-slate-400">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
