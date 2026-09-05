"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!window.confirm("Delete this shipment? This cannot be undone.")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/shipments/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={remove}
      disabled={busy}
      className="btn border border-red-200 bg-white text-red-600 hover:bg-red-50 focus-visible:ring-red-300"
    >
      <Trash2 className="h-4 w-4" />
      {busy ? "Deleting..." : "Delete"}
    </button>
  );
}
