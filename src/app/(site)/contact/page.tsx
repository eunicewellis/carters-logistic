import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Carters Logistics team for support, quotes, and questions.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const cards = [
    {
      icon: Phone,
      title: "Call us",
      lines: [settings.companyPhone],
      href: `tel:${settings.companyPhone.replace(/[^+\d]/g, "")}`,
    },
    {
      icon: Mail,
      title: "Email us",
      lines: [settings.companyEmail],
      href: `mailto:${settings.companyEmail}`,
    },
    {
      icon: MapPin,
      title: "Visit us",
      lines: [settings.companyAddress],
      href: undefined,
    },
    {
      icon: Clock,
      title: "Support hours",
      lines: [settings.supportHours],
      href: undefined,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're here to help"
        subtitle="Questions about a shipment, a quote, or our services? Reach out any time."
      />

      <section className="py-16">
        <div className="container-site grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {cards.map((card) => {
                const Icon = card.icon;
                const content = (
                  <div className="card flex gap-4 p-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h2 className="font-display text-sm font-semibold text-brand-900">
                        {card.title}
                      </h2>
                      {card.lines.map((line) => (
                        <p key={line} className="mt-1 text-sm text-slate-500">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
                return card.href ? (
                  <a key={card.title} href={card.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={card.title}>{content}</div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm companyEmail={settings.companyEmail} />
          </div>
        </div>
      </section>
    </>
  );
}
