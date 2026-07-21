import {
  getAnimationDuration,
  normalizeBackgroundConfig,
} from "@/lib/customize";
import {
  getCustomBackgroundCss,
  normalizeCustomBackgroundStyle,
} from "@/lib/custom-background";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const query = Object.fromEntries(url.searchParams.entries());

  const style = normalizeCustomBackgroundStyle(query.style);
  const config = normalizeBackgroundConfig(query);

  const css = getCustomBackgroundCss(style);

  return new Response(
    `
/* EmbedBG - Custom Background */

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