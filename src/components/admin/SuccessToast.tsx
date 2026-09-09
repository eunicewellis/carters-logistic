"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

export function SuccessToast({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex max-w-sm items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 shadow-card">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-green-800">Success</p>
        <p className="mt-0.5 text-sm leading-relaxed text-green-700">
          {message}
        </p>
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => setVisible(false)}
        className="rounded-md p-1 text-green-400 transition hover:bg-green-100 hover:text-green-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}