"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type RemoveFavoriteButtonProps = {
  backgroundId: string;
};

export default function RemoveFavoriteButton({
  backgroundId,
}: RemoveFavoriteButtonProps) {
  const router = useRouter();

  const [isRemoving, setIsRemoving] = useState(false);
  const [message, setMessage] = useState("");

  async function removeFavorite() {
    try {
      setIsRemoving(true);
      setMessage("");

      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          backgroundId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not remove favorite.");
      }

      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not remove favorite."
      );
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={removeFavorite}
        disabled={isRemoving}
        className="rounded-xl border border-red-400/20 px-3 py-2 text-xs font-semibold text-red-100 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isRemoving ? "Removing..." : "Remove"}
      </button>

      {message && <p className="text-xs text-slate-400">{message}</p>}
    </div>
  );
}