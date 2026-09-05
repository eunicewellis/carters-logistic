import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import type { SiteSettings } from "@/types";

export function CTABanner({ settings }: { settings: SiteSettings }) {
  return (
    <section className="py-20">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-3xl bg-brand-900 px-6 py-14 text-center sm:px-12">
          <div className="absolute inset-0 bg-grid-pattern bg-[length:36px_36px] opacity-30" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-500/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-500/30 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to ship with confidence?
            </h2>
            <p className="mt-4 text-lg text-brand-200">
              Get a free, no-obligation quote today — or email us to speak with a
              logistics expert.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/quote" className="btn-primary w-full sm:w-auto">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${settings.companyEmail}`}
                className="btn w-full bg-white/10 text-white hover:bg-white/20 sm:w-auto"
              >
                <Mail className="h-4 w-4 text-accent-400" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
