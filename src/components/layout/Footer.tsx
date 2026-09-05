import Link from "next/link";
import { Mail, Truck } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";
import type { SiteSettings } from "@/types";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/track", label: "Track Shipment" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const SERVICE_LINKS = [
  "Consignment Shipping",
  "Ground Freight",
  "Air Freight",
  "Ocean Freight",
  "Warehousing",
  "Last-Mile Delivery",
];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-brand-950 text-brand-200">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Truck className="h-5 w-5 text-accent-400" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Carters <span className="text-accent-400">Logistics</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-brand-300">
            A worldwide consignment and freight company delivering reliable,
            transparent shipping for homes and businesses around the globe.
          </p>
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-white">
              Get shipping updates
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-brand-300 transition hover:text-accent-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICE_LINKS.map((service) => (
              <li key={service}>
                <Link
                  href="/services"
                  className="text-brand-300 transition hover:text-accent-400"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Contact Us
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-accent-400" />
              <a
                href={`mailto:${settings.companyEmail}`}
                className="text-brand-300 transition hover:text-accent-400"
              >
                {settings.companyEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-xs text-brand-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.companyName}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition hover:text-accent-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-accent-400">
              Terms of Service
            </Link>
            <Link
              href="/admin/login"
              className="transition hover:text-accent-400"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
