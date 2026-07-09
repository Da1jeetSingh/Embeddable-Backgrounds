import { getBackgroundBySlug } from "@/app/lib/backgrounds";
import {
  getAnimationDuration,
  normalizeBackgroundConfig,
} from "@/app/lib/customize";

type CssRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

const backgroundCssMap: Record<string, string> = {
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
  from {
    filter: hue-rotate(0deg) blur(0px);
    transform: scale(1);
  }

  to {
    filter: hue-rotate(45deg) blur(2px);
    transform: scale(1.08);
  }
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
  from {
    background-position: 0 0, 0 0, center;
  }

  to {
    background-position: 36px 36px, 36px 36px, center;
  }
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
  from {
    background-position: 0 0;
    filter: blur(0px);
  }

  to {
    background-position: 20px -30px;
    filter: blur(3px);
  }
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
  from {
    background-position: 0 0, 20px 30px, center;
  }

  to {
    background-position: 100px 100px, 140px 160px, center;
  }
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
  from {
    filter: saturate(1);
    transform: scale(1);
  }

  to {
    filter: saturate(1.4);
    transform: scale(1.06);
  }
}
`,
};

export async function GET(request: Request, { params }: CssRouteProps) {
  const { slug } = await params;
  const background = getBackgroundBySlug(slug);

  if (!background) {
    return new Response("/* Background not found */", {
      status: 404,
      headers: {
        "Content-Type": "text/css",
      },
    });
  }

  const css = backgroundCssMap[slug];

  if (!css) {
    return new Response("/* CSS not available for this background */", {
      status: 404,
      headers: {
        "Content-Type": "text/css",
      },
    });
  }

  const url = new URL(request.url);
  const config = normalizeBackgroundConfig(
    Object.fromEntries(url.searchParams.entries())
  );

  return new Response(
    `
/* EmbedBG - ${background.title} */

:root {
  --embed-primary: ${config.primaryColor};
  --embed-secondary: ${config.secondaryColor};
  --embed-accent: ${config.accentColor};
  --embed-opacity: ${config.opacity};
  --embed-duration: ${getAnimationDuration(config.speed)};
}

html,
body {
  min-height: 100%;
}

body {
  background: #020617;
}

${css}

@media (prefers-reduced-motion: reduce) {
  html::before {
    animation: none !important;
  }
}
`,
    {
      headers: {
        "Content-Type": "text/css",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}