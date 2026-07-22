"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteCustomBackgroundButtonProps = {
  savedBackgroundId: string;
};

export default function DeleteCustomBackgroundButton({
  savedBackgroundId,
}: DeleteCustomBackgroundButtonProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");

  async function deleteSavedBackground() {
    const confirmed = window.confirm(
      "Delete this saved custom background? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);
      setMessage("");

      const response = await fetch(
        `/api/saved-custom-backgrounds/${savedBackgroundId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not delete saved background.");
      }

      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not delete saved background."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={deleteSavedBackground}
        disabled={isDeleting}
        className="rounded-xl border border-red-400/20 px-3 py-2 text-xs font-semibold text-red-100 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>

      {message && <p className="text-xs text-slate-400">{message}</p>}
    </div>
  );
}