import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
      />
      <section className="py-16">
        <div className="container-site prose prose-slate max-w-3xl">
          <p className="text-sm text-slate-500">Last updated: January 2026</p>
          <h2 className="mt-6 font-display text-xl font-bold text-brand-900">
            1. Information we collect
          </h2>
          <p className="mt-2 text-slate-600">
            We collect the information you provide when booking a shipment,
            tracking a package, or contacting us — such as your name, email
            address, phone number, and delivery addresses.
          </p>
          <h2 className="mt-6 font-display text-xl font-bold text-brand-900">
            2. How we use your information
          </h2>
          <p className="mt-2 text-slate-600">
            Your information is used to process and deliver shipments, provide
            tracking updates, respond to inquiries, and improve our services. We
            never sell your personal data.
          </p>
          <h2 className="mt-6 font-display text-xl font-bold text-brand-900">
            3. Data security
          </h2>
          <p className="mt-2 text-slate-600">
            We use industry-standard safeguards to protect your data, including
            encryption in transit and restricted access to shipment records.
          </p>
          <h2 className="mt-6 font-display text-xl font-bold text-brand-900">
            4. Your choices
          </h2>
          <p className="mt-2 text-slate-600">
            You may request access to, correction of, or deletion of your
            personal information at any time by contacting our support team.
          </p>
        </div>
      </section>
    </>
  );
}
