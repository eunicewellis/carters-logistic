import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/store";
import type { SiteSettings } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PUT(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<SiteSettings>;
  const current = await getSettings();

  const next: SiteSettings = {
    companyName: String(body.companyName ?? current.companyName),
    companyEmail: String(body.companyEmail ?? current.companyEmail),
    contactCtaText: String(body.contactCtaText ?? current.contactCtaText),
    trackingTitle: String(body.trackingTitle ?? current.trackingTitle),
    trackingSubtitle: String(body.trackingSubtitle ?? current.trackingSubtitle),
    statusSteps: Array.isArray(body.statusSteps)
      ? body.statusSteps.map((step, i) => ({
          key: step.key ?? current.statusSteps[i]?.key,
          label: String(step.label ?? ""),
        }))
      : current.statusSteps,
  };

  await saveSettings(next);
  return NextResponse.json({ settings: next });
}
