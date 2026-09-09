"use client";

import { MessageCircle } from "lucide-react";

export function LiveChatButton() {
  function openChat() {
    const w = window as unknown as {
      smartsupp?: (...args: unknown[]) => void;
    };
    if (typeof w.smartsupp === "function") {
      w.smartsupp("chat:open");
    }
  }

  return (
    <button
      type="button"
      onClick={openChat}
      className="card flex w-full gap-4 p-5 text-left transition hover:border-accent-400"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
        <MessageCircle className="h-6 w-6" />
      </span>
      <span>
        <span className="block font-display text-sm font-semibold text-brand-900">
          Live chat
        </span>
        <span className="mt-1 block text-sm text-slate-500">
          Chat with our support team in real time.
        </span>
      </span>
    </button>
  );
}