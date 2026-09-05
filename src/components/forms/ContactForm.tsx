"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export function ContactForm({ companyEmail }: { companyEmail: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Website inquiry: ${form.subject}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card flex flex-col items-center p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <h3 className="mt-4 font-display text-xl font-semibold text-brand-900">
          Thank you for reaching out!
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Your email client should have opened with your message. You can also
          email us directly at{" "}
          <a
            href={`mailto:${companyEmail}`}
            className="font-medium text-accent-600 hover:underline"
          >
            {companyEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="c-name">
            Full name
          </label>
          <input
            id="c-name"
            required
            className="input"
            placeholder="Jane Cooper"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="c-email">
            Email address
          </label>
          <input
            id="c-email"
            type="email"
            required
            className="input"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
      </div>
      <div className="mt-5">
        <label className="label" htmlFor="c-subject">
          Subject
        </label>
        <input
          id="c-subject"
          required
          className="input"
          placeholder="How can we help?"
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
        />
      </div>
      <div className="mt-5">
        <label className="label" htmlFor="c-message">
          Message
        </label>
        <textarea
          id="c-message"
          required
          rows={5}
          className="input resize-none"
          placeholder="Tell us a little about your question..."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>
      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        Send Message
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
