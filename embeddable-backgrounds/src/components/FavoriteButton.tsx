"use client";

import { useState } from "react";

type FavoriteButtonProps = {
  backgroundId: string;
};

export default function FavoriteButton({ backgroundId }: FavoriteButtonProps) {
  const [message, setMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function toggleFavorite() {
    try {
      setIsSaving(true);
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
        throw new Error(result.message || "Could not save favorite.");
      }

      setIsFavorite(result.isFavorite);
      setMessage(result.message);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not save favorite."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={toggleFavorite}
        disabled={isSaving}
        className="rounded-xl border border-pink-400/20 px-4 py-2 text-sm font-semibold text-pink-100 hover:bg-pink-400/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? "Saving..." : isFavorite ? "Saved ♥" : "Favorite"}
      </button>

      {message && <p className="text-xs text-slate-400">{message}</p>}
    </div>
  );
}