import { getBackgroundBySlug } from "@/app/lib/backgrounds";

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
  background:
    radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.8), transparent 30%),
    radial-gradient(circle at 80% 30%, rgba(6, 182, 212, 0.7), transparent 35%),
    radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.5), transparent 35%),
    #020617;
  animation: embedbgAuroraMove 8s ease-in-out infinite alternate;
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
  background-color: #020617;
  background-image:
    linear-gradient(rgba(34, 211, 238, 0.25) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 211, 238, 0.25) 1px, transparent 1px),
    radial-gradient(circle at center, rgba(139, 92, 246, 0.4), transparent 45%);
  background-size: 36px 36px, 36px 36px, 100% 100%;
  animation: embedbgGridMove 12s linear infinite;
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
  background:
    radial-gradient(circle at 25% 30%, rgba(251, 113, 133, 0.85), transparent 28%),
    radial-gradient(circle at 75% 35%, rgba(96, 165, 250, 0.85), transparent 30%),
    radial-gradient(circle at 50% 80%, rgba(52, 211, 153, 0.75), transparent 35%),
    #0f172a;
  animation: embedbgBlobFloat 9s ease-in-out infinite alternate;
}

@keyframes embedbgBlobFloat {
  from {
    filter: blur(0px);
  }

  to {
    filter: blur(3px);
    transform: scale(1.05);
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
  background-color: #020617;
  background-image:
    radial-gradient(circle, rgba(255, 255, 255, 0.9) 1px, transparent 1px),
    radial-gradient(circle, rgba(255, 255, 255, 0.6) 1px, transparent 1px),
    radial-gradient(circle at center, rgba(30, 64, 175, 0.5), transparent 55%);
  background-size: 24px 24px, 60px 60px, 100% 100%;
  background-position: 0 0, 20px 30px, center;
  animation: embedbgStarDrift 16s linear infinite;
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
  background:
    radial-gradient(circle at 15% 20%, #f97316, transparent 30%),
    radial-gradient(circle at 85% 20%, #8b5cf6, transparent 32%),
    radial-gradient(circle at 50% 85%, #06b6d4, transparent 34%),
    linear-gradient(135deg, #020617, #111827);
  animation: embedbgMeshShift 10s ease-in-out infinite alternate;
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

export async function GET(
  request: Request,
  { params }: CssRouteProps
) {
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

  return new Response(
    `
/* EmbedBG - ${background.title} */

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