"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export function QuoteForm({ companyEmail }: { companyEmail: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    origin: "",
    destination: "",
    details: "",
  });
  const [sent, setSent] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Quote request");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nOrigin: ${form.origin}\nDestination: ${form.destination}\n\nDetails:\n${form.details}`
    );
    window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card flex flex-col items-center p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <h3 className="mt-4 font-display text-xl font-semibold text-brand-900">
          Quote request received!
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Your email client should have opened with your request. A logistics
          specialist will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="q-name">
            Full name
          </label>
          <input
            id="q-name"
            required
            className="input"
            placeholder="Jane Cooper"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="q-email">
            Email address
          </label>
          <input
            id="q-email"
            type="email"
            required
            className="input"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="q-phone">
            Phone number
          </label>
          <input
            id="q-phone"
            className="input"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="q-origin">
            Pickup location
          </label>
          <input
            id="q-origin"
            required
            className="input"
            placeholder="City, State"
            value={form.origin}
            onChange={(e) => update("origin", e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="q-destination">
            Destination
          </label>
          <input
            id="q-destination"
            required
            className="input"
            placeholder="City, State"
            value={form.destination}
            onChange={(e) => update("destination", e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="q-details">
            Shipment details
          </label>
          <input
            id="q-details"
            className="input"
            placeholder="e.g. 2 pallets, ~300 lbs"
            value={form.details}
            onChange={(e) => update("details", e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        Request Quote
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
