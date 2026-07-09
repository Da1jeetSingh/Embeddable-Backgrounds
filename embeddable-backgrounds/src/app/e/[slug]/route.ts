import { getBackgroundBySlug } from "@/app/lib/backgrounds";
import { getEmbedBackgroundCss } from "@/app/lib/background-css";
import {
  getAnimationDuration,
  normalizeBackgroundConfig,
} from "@/app/lib/customize";

type CssRouteProps = {
  params: Promise<{
    slug: string;
  }>;
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

  const css = getEmbedBackgroundCss(slug);

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