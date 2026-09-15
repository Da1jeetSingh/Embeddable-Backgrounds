import type { Background } from "@/data/backgrounds";
import type { BackgroundConfig } from "@/lib/customize";
import { configToQueryString } from "@/lib/customize";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function getConfigSuffix(config?: BackgroundConfig) {
  if (!config) {
    return "";
  }

  return `?${configToQueryString(config)}`;
}

export function generateIframeEmbedCode(
  background: Background,
  config?: BackgroundConfig
) {
  const suffix = getConfigSuffix(config);

  return `<iframe
  src="${BASE_URL}/embed/${background.slug}${suffix}"
  style="position:fixed;inset:0;width:100%;height:100%;border:0;z-index:-1;pointer-events:none;"
  aria-hidden="true">
</iframe>`;
}

export function generateCssEmbedCode(
  background: Background,
  config?: BackgroundConfig
) {
  const suffix = getConfigSuffix(config);

  return `<link rel="stylesheet" href="${BASE_URL}/e/${background.slug}${suffix}">`;
}

export function generateEmbedCode(background: Background) {
  return generateIframeEmbedCode(background);
}