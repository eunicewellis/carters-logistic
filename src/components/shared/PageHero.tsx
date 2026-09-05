import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-16 sm:py-20">
      <div className="absolute inset-0 bg-grid-pattern bg-[length:36px_36px] opacity-40" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="container-site relative">
        <div className="max-w-2xl">
          {eyebrow && (
            <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-400">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-brand-200">
              {subtitle}
            </p>
          )}
          <nav className="mt-6 flex items-center gap-1.5 text-sm text-brand-300">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-accent-400">{title}</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
