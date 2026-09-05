import type { Metadata } from "next";
import { HeartHandshake, Target, Truck } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stats } from "@/components/home/Stats";
import { CTABanner } from "@/components/home/CTABanner";
import { getSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Carters Logistics — our mission, values, and commitment to reliable USA shipping.",
};

const VALUES = [
  {
    icon: Target,
    title: "Our mission",
    description:
      "To make shipping effortless and transparent for every home and business in America.",
  },
  {
    icon: HeartHandshake,
    title: "Our promise",
    description:
      "Treat every package like it's our own — with care, honesty, and open communication.",
  },
  {
    icon: Truck,
    title: "Our reach",
    description:
      "A nationwide network of carriers and warehouses covering all 48 contiguous states.",
  },
];

export default async function AboutPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Delivering trust, one shipment at a time"
        subtitle="Carters Logistics has been helping people and businesses move what matters for over 15 years."
      />

      <section className="py-20">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="A logistics partner you can rely on"
            />
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                What started as a single delivery van in Dallas has grown into a
                full-service logistics company serving the entire United
                States. Today, Carters Logistics handles everything from
                individual consignments to full truckload freight.
              </p>
              <p>
                We believe shipping should be simple and transparent. That&apos;s
                why we built a real-time tracking experience that keeps you
                informed from pickup to delivery, backed by a customer care team
                that actually answers.
              </p>
              <p>
                Whether you&apos;re a boutique owner sending handcrafted goods or a
                business moving freight coast to coast, you&apos;ll get the same
                careful, dependable service every time.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="card flex gap-4 p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand-900">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Stats />
      <CTABanner settings={settings} />
    </>
  );
}
