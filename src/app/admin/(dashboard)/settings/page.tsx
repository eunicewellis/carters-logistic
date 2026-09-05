import type { Metadata } from "next";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { PasswordForm } from "@/components/admin/PasswordForm";
import { getSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-900">
        Settings
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Customize the company details and the text shown to customers.
      </p>

      <div className="mt-6">
        <SettingsForm initial={settings} />
      </div>

      <div className="mt-8">
        <PasswordForm />
      </div>
    </div>
  );
}
