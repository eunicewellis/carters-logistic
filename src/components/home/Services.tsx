import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function Services() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="What we do"
          title="Comprehensive logistics solutions"
          subtitle="From a single package to full truckloads, we move your goods safely and efficiently across the United States."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-lg"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-brand-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {service.description}
                </p>
                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 transition hover:gap-2.5"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
