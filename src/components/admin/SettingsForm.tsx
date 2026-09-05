"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import type { SiteSettings } from "@/types";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [form, setForm] = useState<SiteSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateStep(index: number, label: string) {
    setForm((f) => ({
      ...f,
      statusSteps: f.statusSteps.map((s, i) =>
        i === index ? { ...s, label } : s
      ),
    }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save");
      setMessage("Settings saved successfully.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {message && (
        <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {message}
        </p>
      )}

      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-brand-900">
          Company Information
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className="label" htmlFor="companyName">
              Company name
            </label>
            <input
              id="companyName"
              className="input"
              value={form.companyName}
              onChange={(e) => update("companyName", e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="companyEmail">
              Company email
            </label>
            <input
              id="companyEmail"
              type="email"
              className="input"
              value={form.companyEmail}
              onChange={(e) => update("companyEmail", e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="companyPhone">
              Phone number
            </label>
            <input
              id="companyPhone"
              className="input"
              value={form.companyPhone}
              onChange={(e) => update("companyPhone", e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="supportHours">
              Support hours
            </label>
            <input
              id="supportHours"
              className="input"
              value={form.supportHours}
              onChange={(e) => update("supportHours", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="label" htmlFor="companyAddress">
              Company address
            </label>
            <input
              id="companyAddress"
              className="input"
              value={form.companyAddress}
              onChange={(e) => update("companyAddress", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-brand-900">
          Tracking Page Text
        </h2>
        <div className="mt-5 grid gap-5">
          <div>
            <label className="label" htmlFor="trackingTitle">
              Tracking page title
            </label>
            <input
              id="trackingTitle"
              className="input"
              value={form.trackingTitle}
              onChange={(e) => update("trackingTitle", e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="trackingSubtitle">
              Tracking page subtitle
            </label>
            <input
              id="trackingSubtitle"
              className="input"
              value={form.trackingSubtitle}
              onChange={(e) => update("trackingSubtitle", e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="contactCtaText">
              &quot;Contact Customer Care&quot; button text
            </label>
            <input
              id="contactCtaText"
              className="input"
              value={form.contactCtaText}
              onChange={(e) => update("contactCtaText", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-brand-900">
          Status / Process Steps
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          These labels appear in the tracking timeline shown to customers.
          Change any step text to customize the process.
        </p>
        <div className="mt-5 space-y-3">
          {form.statusSteps.map((step, i) => (
            <div key={step.key} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                {i + 1}
              </span>
              <input
                className="input"
                value={step.label}
                onChange={(e) => updateStep(i, e.target.value)}
                placeholder={`Step ${i + 1} label`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary min-w-[160px]"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
