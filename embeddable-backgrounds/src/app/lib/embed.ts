import type { Background } from "@/app/data/backgrounds";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function generateIframeEmbedCode(background: Background) {
  return `<iframe
  src="${BASE_URL}/embed/${background.slug}"
  style="position:fixed;inset:0;width:100%;height:100%;border:0;z-index:-1;pointer-events:none;"
  aria-hidden="true">
</iframe>`;
}

export function generateCssEmbedCode(background: Background) {
  return `<link rel="stylesheet" href="${BASE_URL}/e/${background.slug}">`;
}

export function generateEmbedCode(background: Background) {
  return generateIframeEmbedCode(background);
}