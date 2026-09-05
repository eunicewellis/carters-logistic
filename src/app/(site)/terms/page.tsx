import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="The terms that govern your use of Carters Logistics services."
      />
      <section className="py-16">
        <div className="container-site prose prose-slate max-w-3xl">
          <p className="text-sm text-slate-500">Last updated: January 2026</p>
          <h2 className="mt-6 font-display text-xl font-bold text-brand-900">
            1. Services
          </h2>
          <p className="mt-2 text-slate-600">
            Carters Logistics provides consignment, freight, and delivery
            services worldwide, subject to availability and the
            terms agreed at booking.
          </p>
          <h2 className="mt-6 font-display text-xl font-bold text-brand-900">
            2. Shipments
          </h2>
          <p className="mt-2 text-slate-600">
            You are responsible for ensuring that shipped items are lawful,
            properly packaged, and accurately described. Prohibited items may
            not be shipped through our network.
          </p>
          <h2 className="mt-6 font-display text-xl font-bold text-brand-900">
            3. Liability
          </h2>
          <p className="mt-2 text-slate-600">
            Shipments are covered by cargo insurance. Liability for loss or
            damage is limited to the terms of the applicable coverage and
            applicable law.
          </p>
          <h2 className="mt-6 font-display text-xl font-bold text-brand-900">
            4. Contact
          </h2>
          <p className="mt-2 text-slate-600">
            Questions about these terms can be directed to our support team at
            any time.
          </p>
        </div>
      </section>
    </>
  );
}
