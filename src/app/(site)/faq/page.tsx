import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Carters Logistics shipping and tracking.",
};

const FAQS = [
  {
    q: "How do I track my shipment?",
    a: "Enter the tracking number you received into the Track Shipment page on our website. You'll see your product details, current status, and estimated delivery date instantly.",
  },
  {
    q: "Where do I find my tracking number?",
    a: "Your tracking number is provided when your shipment is booked. It's also included in your confirmation email and looks like CL-XXXXXXXXXX.",
  },
  {
    q: "What does 'In Transit' mean?",
    a: "'In Transit' means your package has been picked up and is currently moving through our network toward its destination. You can follow its progress in real time.",
  },
  {
    q: "What areas do you serve?",
    a: "We ship worldwide — to over 120 countries across six continents.",
  },
  {
    q: "Is my shipment insured?",
    a: "Yes, every shipment includes cargo insurance at no extra charge, so you're covered from pickup to delivery.",
  },
  {
    q: "How do I contact customer care?",
    a: "Use the 'Contact Customer Care' button on your tracking page, or email our support team directly.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        subtitle="Quick answers to the questions we hear most from our customers."
      />

      <section className="py-16">
        <div className="container-site mx-auto max-w-3xl space-y-4">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="card group overflow-hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-left">
                <span className="font-display text-base font-semibold text-brand-900">
                  {item.q}
                </span>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="border-t border-slate-100 px-6 py-5 text-sm leading-relaxed text-slate-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
