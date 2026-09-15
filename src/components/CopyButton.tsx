"use client";

import { useState } from "react";

type CopyButtonProps = {
  text: string;
};

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      alert("Could not copy. Please copy manually.");
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400"
    >
      {copied ? "Copied!" : "Copy Embed"}
    </button>
  );
}