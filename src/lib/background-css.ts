export const backgroundCssMap: Record<string, string> = {
  "aurora-glow": `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background:
    radial-gradient(circle at 20% 20%, var(--embed-primary, rgba(139, 92, 246, 0.8)), transparent 30%),
    radial-gradient(circle at 80% 30%, var(--embed-secondary, rgba(6, 182, 212, 0.7)), transparent 35%),
    radial-gradient(circle at 50% 80%, var(--embed-accent, rgba(236, 72, 153, 0.5)), transparent 35%),
    #020617;
  animation: embedbgAuroraMove var(--embed-duration, 8s) ease-in-out infinite alternate;
}

@keyframes embedbgAuroraMove {
  from { filter: hue-rotate(0deg) blur(0px); transform: scale(1); }
  to { filter: hue-rotate(45deg) blur(2px); transform: scale(1.08); }
}
`,

  "neon-grid": `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background-color: #020617;
  background-image:
    linear-gradient(var(--embed-secondary, rgba(34, 211, 238, 0.25)) 1px, transparent 1px),
    linear-gradient(90deg, var(--embed-secondary, rgba(34, 211, 238, 0.25)) 1px, transparent 1px),
    radial-gradient(circle at center, var(--embed-primary, rgba(139, 92, 246, 0.4)), transparent 45%);
  background-size: 36px 36px, 36px 36px, 100% 100%;
  animation: embedbgGridMove var(--embed-duration, 12s) linear infinite;
}

@keyframes embedbgGridMove {
  from { background-position: 0 0, 0 0, center; }
  to { background-position: 36px 36px, 36px 36px, center; }
}
`,

  "soft-blobs": `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background:
    radial-gradient(circle at 25% 30%, var(--embed-accent, rgba(251, 113, 133, 0.85)), transparent 28%),
    radial-gradient(circle at 75% 35%, var(--embed-primary, rgba(96, 165, 250, 0.85)), transparent 30%),
    radial-gradient(circle at 50% 80%, var(--embed-secondary, rgba(52, 211, 153, 0.75)), transparent 35%),
    #0f172a;
  animation: embedbgBlobFloat var(--embed-duration, 9s) ease-in-out infinite alternate;
}

@keyframes embedbgBlobFloat {
  from { background-position: 0 0; filter: blur(0px); }
  to { background-position: 20px -30px; filter: blur(3px); }
}
`,

  "star-field": `
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
    radial-gradient(circle at center, var(--embed-accent, rgba(30, 64, 175, 0.5)), transparent 55%);
  background-size: 24px 24px, 60px 60px, 100% 100%;
  background-position: 0 0, 20px 30px, center;
  animation: embedbgStarDrift var(--embed-duration, 16s) linear infinite;
}

@keyframes embedbgStarDrift {
  from { background-position: 0 0, 20px 30px, center; }
  to { background-position: 100px 100px, 140px 160px, center; }
}
`,

  "mesh-gradient": `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background:
    radial-gradient(circle at 15% 20%, var(--embed-accent, #f97316), transparent 30%),
    radial-gradient(circle at 85% 20%, var(--embed-primary, #8b5cf6), transparent 32%),
    radial-gradient(circle at 50% 85%, var(--embed-secondary, #06b6d4), transparent 34%),
    linear-gradient(135deg, #020617, #111827);
  animation: embedbgMeshShift var(--embed-duration, 10s) ease-in-out infinite alternate;
}

@keyframes embedbgMeshShift {
  from { filter: saturate(1); transform: scale(1); }
  to { filter: saturate(1.4); transform: scale(1.06); }
}
`,

  "ocean-waves": `
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
    linear-gradient(135deg, #020617, #075985, #0f172a);
  animation: embedbgOceanWaveMove var(--embed-duration, 12s) ease-in-out infinite alternate;
}

@keyframes embedbgOceanWaveMove {
  from { background-position: 0 0; transform: scale(1); filter: saturate(1); }
  to { background-position: 40px -40px; transform: scale(1.06); filter: saturate(1.3); }
}
`,

  "sunset-orbs": `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background:
    radial-gradient(circle at 25% 30%, var(--embed-primary, #fb7185), transparent 30%),
    radial-gradient(circle at 75% 30%, var(--embed-secondary, #f97316), transparent 32%),
    radial-gradient(circle at 50% 80%, var(--embed-accent, #facc15), transparent 35%),
    linear-gradient(135deg, #451a03, #7f1d1d, #020617);
  animation: embedbgSunsetOrbMove var(--embed-duration, 10s) ease-in-out infinite alternate;
}

@keyframes embedbgSunsetOrbMove {
  from { transform: scale(1); filter: hue-rotate(0deg); }
  to { transform: scale(1.08); filter: hue-rotate(25deg); }
}
`,

  "cyber-lines": `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background-color: #020617;
  background-image:
    repeating-linear-gradient(
      135deg,
      transparent 0,
      transparent 12px,
      var(--embed-primary, rgba(139, 92, 246, 0.35)) 13px,
      transparent 14px
    ),
    radial-gradient(circle at 20% 20%, var(--embed-secondary, rgba(6, 182, 212, 0.45)), transparent 35%),
    radial-gradient(circle at 80% 80%, var(--embed-accent, rgba(236, 72, 153, 0.35)), transparent 35%);
  animation: embedbgCyberLineMove var(--embed-duration, 8s) linear infinite;
}

@keyframes embedbgCyberLineMove {
  from { background-position: 0 0, center, center; }
  to { background-position: 80px 80px, center, center; }
}
`,

  "purple-noise": `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background:
    radial-gradient(circle at 30% 20%, var(--embed-primary, rgba(168, 85, 247, 0.6)), transparent 30%),
    radial-gradient(circle at 80% 70%, var(--embed-secondary, rgba(59, 130, 246, 0.4)), transparent 30%),
    repeating-radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.04) 0,
      rgba(255, 255, 255, 0.04) 1px,
      transparent 1px,
      transparent 6px
    ),
    #020617;
  animation: embedbgPurpleNoisePulse var(--embed-duration, 9s) ease-in-out infinite alternate;
}

@keyframes embedbgPurpleNoisePulse {
  from { filter: contrast(1) brightness(1); }
  to { filter: contrast(1.2) brightness(1.15); }
}
`,

  "lava-lamp": `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background:
    radial-gradient(circle at 20% 30%, var(--embed-primary, #ef4444), transparent 25%),
    radial-gradient(circle at 80% 30%, var(--embed-secondary, #f97316), transparent 25%),
    radial-gradient(circle at 40% 80%, var(--embed-accent, #8b5cf6), transparent 30%),
    radial-gradient(circle at 70% 75%, #ec4899, transparent 25%),
    #020617;
  animation: embedbgLavaLampMove var(--embed-duration, 11s) ease-in-out infinite alternate;
}

@keyframes embedbgLavaLampMove {
  from { background-position: 0 0; transform: scale(1); filter: blur(0px); }
  to { background-position: 50px -40px; transform: scale(1.08); filter: blur(2px); }
}
`,

  "glass-morph": `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.12), transparent),
    radial-gradient(circle at 20% 20%, var(--embed-primary, rgba(125, 211, 252, 0.45)), transparent 35%),
    radial-gradient(circle at 80% 80%, var(--embed-secondary, rgba(196, 181, 253, 0.45)), transparent 35%),
    #0f172a;
  animation: embedbgGlassMorphMove var(--embed-duration, 12s) ease-in-out infinite alternate;
}

@keyframes embedbgGlassMorphMove {
  from { filter: blur(0px) saturate(1); }
  to { filter: blur(1px) saturate(1.3); transform: scale(1.04); }
}
`,

  "matrix-rain": `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background-color: #020617;
  background-image:
    linear-gradient(var(--embed-primary, rgba(34, 197, 94, 0.35)) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.08) 1px, transparent 1px),
    repeating-linear-gradient(
      180deg,
      rgba(34, 197, 94, 0.18) 0,
      rgba(34, 197, 94, 0.18) 2px,
      transparent 2px,
      transparent 18px
    );
  background-size: 40px 40px, 40px 40px, 100% 40px;
  animation: embedbgMatrixRainMove var(--embed-duration, 6s) linear infinite;
}

@keyframes embedbgMatrixRainMove {
  from { background-position: 0 0, 0 0, 0 -40px; }
  to { background-position: 0 40px, 0 40px, 0 40px; }
}
`,

  "candy-sky": `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--embed-opacity, 1);
  background:
    radial-gradient(circle at 20% 25%, var(--embed-primary, #f9a8d4), transparent 30%),
    radial-gradient(circle at 80% 25%, var(--embed-secondary, #93c5fd), transparent 30%),
    radial-gradient(circle at 50% 80%, var(--embed-accent, #fde68a), transparent 35%),
    linear-gradient(135deg, #fdf2f8, #dbeafe);
  animation: embedbgCandySkyMove var(--embed-duration, 12s) ease-in-out infinite alternate;
}

@keyframes embedbgCandySkyMove {
  from { transform: scale(1); filter: saturate(1); }
  to { transform: scale(1.05); filter: saturate(1.25); }
}
`,
};

export function getEmbedBackgroundCss(slug: string) {
  return backgroundCssMap[slug];
}