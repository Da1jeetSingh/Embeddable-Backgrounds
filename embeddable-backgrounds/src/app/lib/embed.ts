import type { Background } from "@/app/data/backgrounds";

const BASE_URL = "https://yourwebsite.com";

export function generateEmbedCode(background: Background) {
  if (background.type === "iframe") {
    return `<iframe src="${BASE_URL}/embed/${background.slug}" style="position:fixed;inset:0;width:100%;height:100%;border:0;z-index:-1;pointer-events:none;" aria-hidden="true"></iframe>`;
  }

  if (background.type === "js") {
    return `<script src="${BASE_URL}/e/${background.slug}.js" defer></script>`;
  }

  return `<link rel="stylesheet" href="${BASE_URL}/e/${background.slug}.css">`;
}