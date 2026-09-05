import type { Metadata } from "next";
import { BadgeCheck, Clock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { getSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request a free, no-obligation shipping quote from Carters Logistics.",
};

const PERKS = [
  { icon: Clock, text: "Response within one business day" },
  { icon: ShieldCheck, text: "No obligation, no hidden fees" },
  { icon: BadgeCheck, text: "Tailored to your shipment" },
];

export default async function QuotePage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Get a quote"
        title="Request a free shipping quote"
        subtitle="Tell us about your shipment and we'll get back to you with a transparent, competitive price."
      />

      <section className="py-16">
        <div className="container-site grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-brand-900">
              What happens next?
            </h2>
            <p className="mt-3 text-slate-600">
              Once you submit your request, a logistics specialist will review
              the details and email you a personalized quote.
            </p>
            <ul className="mt-6 space-y-4">
              {PERKS.map((perk) => {
                const Icon = perk.icon;
                return (
                  <li key={perk.text} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {perk.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <QuoteForm companyEmail={settings.companyEmail} />
          </div>
        </div>
      </section>
    </>
  );
}
