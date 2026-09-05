"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Mail,
  Menu,
  Search,
  Truck,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/track", label: "Track Shipment" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden bg-brand-950 text-brand-100 md:block">
        <div className="container-site flex items-center justify-between py-2 text-xs">
          <span className="inline-flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-accent-400" />
            {settings.companyEmail}
          </span>
          <span className="text-brand-200">
            Worldwide Shipping &amp; Logistics
          </span>
        </div>
      </div>

      {/* Sticky main nav */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="container-site flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-900 shadow-card">
              <Truck className="h-5 w-5 text-accent-400" />
            </span>
            <span className="font-display text-lg font-bold leading-tight tracking-tight">
              <span className="text-brand-900">Carters</span>{" "}
              <span className="text-accent-500">Logistics</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-accent-600"
                      : "text-slate-600 hover:bg-slate-100 hover:text-brand-900"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/track" className="btn-outline !px-4 !py-2">
              <Search className="h-4 w-4" />
              Track
            </Link>
            <Link href="/quote" className="btn-primary !px-5 !py-2">
              Get a Quote
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <nav className="container-site flex flex-col py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-3">
                <Link
                  href="/quote"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Get a Quote
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
