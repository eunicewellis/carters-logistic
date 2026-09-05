"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  PackagePlus,
  Settings,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/shipments/new", label: "Add Shipment", icon: PackagePlus },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-brand-950 lg:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-white/10 px-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
            <Truck className="h-5 w-5 text-accent-400" />
          </span>
          <div>
            <p className="font-display text-sm font-bold leading-tight text-white">
              Carters <span className="text-accent-400">Logistics</span>
            </p>
            <p className="text-[11px] text-brand-300">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent-500 text-white"
                    : "text-brand-200 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/10 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-brand-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-5 w-5" />
            View Website
          </Link>
          <a
            href="/api/auth/logout"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-brand-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </a>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white lg:hidden">
        <div className="flex h-14 items-center gap-2.5 px-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-950">
            <Truck className="h-4 w-4 text-accent-400" />
          </span>
          <p className="font-display text-sm font-bold text-brand-900">
            Carters <span className="text-accent-500">Logistics</span>
          </p>
          <span className="ml-auto text-xs font-medium text-slate-400">
            Admin
          </span>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-2">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
                  active
                    ? "bg-accent-500 text-white"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <a
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600"
          >
            <ExternalLink className="h-4 w-4" />
            View Site
          </a>
          <a
            href="/api/auth/logout"
            className="flex shrink-0 items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </a>
        </nav>
      </div>

      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
