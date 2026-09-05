import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SERVICES } from "@/data/services";
import { CTABanner } from "@/components/home/CTABanner";
import { getSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Carters Logistics services: consignment shipping, ground, air and ocean freight, warehousing, and last-mile delivery.",
};

const INCLUDED = [
  "Real-time tracking number on every shipment",
  "Cargo insurance included",
  "Dedicated account manager",
  "Flexible pickup scheduling",
  "Proof of delivery with signature",
  "Transparent, upfront pricing",
];

export default async function ServicesPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Shipping solutions for every need"
        subtitle="From single consignments to full truckloads — we move it all, safely and on schedule."
      />

      <section className="py-20">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="card p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-lg"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500 text-white shadow-card">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-semibold text-brand-900">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-950 py-20">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              dark
              align="left"
              eyebrow="What's included"
              title="Every shipment comes standard with"
            />
            <ul className="mt-6 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-3 text-brand-100">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="font-display text-2xl font-bold text-white">
              Not sure which service fits?
            </h3>
            <p className="mt-3 text-brand-200">
              Tell us what you&apos;re shipping and we&apos;ll recommend the fastest,
              most cost-effective option for you.
            </p>
            <a href="/quote" className="btn-primary mt-6">
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      <CTABanner settings={settings} />
    </>
  );
}
