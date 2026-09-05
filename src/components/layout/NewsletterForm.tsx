"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-brand-100">
        <Check className="h-4 w-4 text-accent-400" />
        Thanks for subscribing to our updates.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-brand-300 outline-none transition focus:border-accent-400"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="inline-flex shrink-0 items-center justify-center rounded-xl bg-accent-500 px-4 text-white transition hover:bg-accent-600"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
