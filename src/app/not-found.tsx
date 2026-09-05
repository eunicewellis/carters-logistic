import Link from "next/link";
import { PackageSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-50">
          <PackageSearch className="h-8 w-8 text-accent-500" />
        </span>
        <p className="mt-6 font-display text-6xl font-bold text-brand-900">
          404
        </p>
        <h1 className="mt-2 font-display text-xl font-semibold text-brand-900">
          Page not found
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link href="/" className="btn-primary mt-6">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
