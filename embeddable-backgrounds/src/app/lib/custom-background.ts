import type { BackgroundConfig } from "@/app/lib/customize";
import { configToQueryString } from "@/app/lib/customize";

export type CustomBackgroundStyle =
  | "aurora"
  | "mesh"
  | "blobs"
  | "grid"
  | "waves"
  | "stars";

export const customBackgroundStyles: {
  value: CustomBackgroundStyle;
  label: string;
  description: string;
}[] = [
  {
    value: "aurora",
    label: "Aurora",
    description: "Soft glowing lights with smooth movement.",
  },
  {
    value: "mesh",
    label: "Mesh Gradient",
    description: "Modern colorful gradient circles.",
  },
  {
    value: "blobs",
    label: "Floating Blobs",
    description: "Large soft abstract shapes.",
  },
  {
    value: "grid",
    label: "Tech Grid",
    description: "Futuristic grid background.",
  },
  {
    value: "waves",
    label: "Ocean Waves",
    description: "Calm wave-like gradient movement.",
  },
  {
    value: "stars",
    label: "Star Field",
    description: "Simple space-style dot background.",
  },
];

export const defaultCustomBackgroundStyle: CustomBackgroundStyle = "aurora";

export function normalizeCustomBackgroundStyle(
  value: string | string[] | undefined
): CustomBackgroundStyle {
  const rawValue = Array.isArray(value) ? value[0] : value;

  const validStyle = customBackgroundStyles.find(
    (style) => style.value === rawValue
  );

  return validStyle?.value || defaultCustomBackgroundStyle;
}

export function customBackgroundQueryString(
  style: CustomBackgroundStyle,
  config: BackgroundConfig
) {
  const params = new URLSearchParams(configToQueryString(config));
  params.set("style", style);

  return params.toString();
}

export const customBackgroundCssMap: Record<CustomBackgroundStyle, string> = {
  aurora: `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background:
    radial-gradient(circle at 20% 20%, var(--embed-primary, #8b5cf6), transparent 30%),
    radial-gradient(circle at 80% 30%, var(--embed-secondary, #06b6d4), transparent 35%),
    radial-gradient(circle at 50% 80%, var(--embed-accent, #ec4899), transparent 35%),
    #020617;
  animation: customAuroraMove var(--embed-duration, 10s) ease-in-out infinite alternate;
}

@keyframes customAuroraMove {
  from { transform: scale(1); filter: hue-rotate(0deg); }
  to { transform: scale(1.08); filter: hue-rotate(45deg); }
}
`,

  mesh: `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background:
    radial-gradient(circle at 15% 20%, var(--embed-primary, #8b5cf6), transparent 30%),
    radial-gradient(circle at 85% 25%, var(--embed-secondary, #06b6d4), transparent 32%),
    radial-gradient(circle at 50% 85%, var(--embed-accent, #f97316), transparent 35%),
    linear-gradient(135deg, #020617, #111827);
  animation: customMeshMove var(--embed-duration, 10s) ease-in-out infinite alternate;
}

@keyframes customMeshMove {
  from { transform: scale(1); filter: saturate(1); }
  to { transform: scale(1.06); filter: saturate(1.35); }
}
`,

  blobs: `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background:
    radial-gradient(circle at 25% 35%, var(--embed-primary, #fb7185), transparent 28%),
    radial-gradient(circle at 75% 30%, var(--embed-secondary, #60a5fa), transparent 30%),
    radial-gradient(circle at 50% 80%, var(--embed-accent, #34d399), transparent 35%),
    #0f172a;
  animation: customBlobMove var(--embed-duration, 10s) ease-in-out infinite alternate;
}

@keyframes customBlobMove {
  from { background-position: 0 0; transform: scale(1); filter: blur(0px); }
  to { background-position: 30px -30px; transform: scale(1.06); filter: blur(3px); }
}
`,

  grid: `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background-color: #020617;
  background-image:
    linear-gradient(var(--embed-secondary, rgba(34, 211, 238, 0.3)) 1px, transparent 1px),
    linear-gradient(90deg, var(--embed-secondary, rgba(34, 211, 238, 0.3)) 1px, transparent 1px),
    radial-gradient(circle at center, var(--embed-primary, rgba(139, 92, 246, 0.45)), transparent 45%);
  background-size: 40px 40px, 40px 40px, 100% 100%;
  animation: customGridMove var(--embed-duration, 10s) linear infinite;
}

@keyframes customGridMove {
  from { background-position: 0 0, 0 0, center; }
  to { background-position: 40px 40px, 40px 40px, center; }
}
`,

  waves: `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background:
    radial-gradient(circle at 20% 80%, var(--embed-primary, #0ea5e9), transparent 35%),
    radial-gradient(circle at 80% 20%, var(--embed-secondary, #22d3ee), transparent 35%),
    radial-gradient(circle at 50% 50%, var(--embed-accent, #2563eb), transparent 45%),
    linear-gradient(135deg, #020617, #075985, #0f172a);
  animation: customWaveMove var(--embed-duration, 12s) ease-in-out infinite alternate;
}

@keyframes customWaveMove {
  from { background-position: 0 0; transform: scale(1); }
  to { background-position: 50px -50px; transform: scale(1.07); }
}
`,

  stars: `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background-color: #020617;
  background-image:
    radial-gradient(circle, var(--embed-primary, rgba(255, 255, 255, 0.9)) 1px, transparent 1px),
    radial-gradient(circle, var(--embed-secondary, rgba(255, 255, 255, 0.6)) 1px, transparent 1px),
    radial-gradient(circle at center, var(--embed-accent, rgba(59, 130, 246, 0.5)), transparent 55%);
  background-size: 24px 24px, 60px 60px, 100% 100%;
  background-position: 0 0, 20px 30px, center;
  animation: customStarMove var(--embed-duration, 16s) linear infinite;
}

@keyframes customStarMove {
  from { background-position: 0 0, 20px 30px, center; }
  to { background-position: 100px 100px, 140px 160px, center; }
}
`,
};

export function getCustomBackgroundCss(style: CustomBackgroundStyle) {
  return customBackgroundCssMap[style];
}