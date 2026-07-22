"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Background } from "@/data/backgrounds";
import {
  defaultBackgroundConfig,
  type BackgroundConfig,
  configToStyle,
} from "@/lib/customize";
import {
  generateCssEmbedCode,
  generateIframeEmbedCode,
} from "@/lib/embed";
import CopyButton from "@/components/CopyButton";
import FavoriteButton from "@/components/FavoriteButton";

type BackgroundCustomizerProps = {
  background: Background;
  isFavorite?: boolean;
};

export default function BackgroundCustomizer({
  background,
  isFavorite = false,
}: BackgroundCustomizerProps) {
  const [config, setConfig] = useState<BackgroundConfig>(
    defaultBackgroundConfig
  );

  const previewStyle = useMemo(() => {
    return configToStyle(config);
  }, [config]);

  const iframeCode = useMemo(() => {
    return generateIframeEmbedCode(background, config);
  }, [background, config]);

  const cssCode = useMemo(() => {
    return generateCssEmbedCode(background, config);
  }, [background, config]);

  function updateConfig<Key extends keyof BackgroundConfig>(
    key: Key,
    value: BackgroundConfig[Key]
  ) {
    setConfig((currentConfig) => ({
      ...currentConfig,
      [key]: value,
    }));
  }

  function resetConfig() {
    setConfig(defaultBackgroundConfig);
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <div className="relative h-[600px] overflow-hidden rounded-2xl">
          {background.previewCss && <style>{background.previewCss}</style>}

          <div
            className={`absolute inset-0 ${background.cssClass}`}
            style={previewStyle}
          />

          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="max-w-md rounded-3xl border border-white/10 bg-black/40 p-8 text-center backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
                Custom Preview
              </p>

              <h1 className="mt-4 text-4xl font-bold text-white">
                {background.title}
              </h1>

              <p className="mt-4 text-slate-300">
                Change the settings on the right and copy your custom embed
                code.
              </p>

              <Link
                href={`/embed/${background.slug}`}
                target="_blank"
                className="mt-6 inline-flex rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Open Default Embed
              </Link>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Customize
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {background.title}
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Adjust the background and copy the generated embed code.
          </p>

          <div className="mt-5">
            <FavoriteButton
              backgroundId={background.id}
              initialIsFavorite={isFavorite}
            />
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Speed
              </label>

              <select
                value={config.speed}
                onChange={(event) =>
                  updateConfig(
                    "speed",
                    event.target.value as BackgroundConfig["speed"]
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
              >
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
              </select>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-300">
                  Opacity
                </label>

                <span className="text-sm text-slate-400">
                  {config.opacity}
                </span>
              </div>

              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={config.opacity}
                onChange={(event) =>
                  updateConfig("opacity", Number(event.target.value))
                }
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-2 block text-xs font-medium text-slate-300">
                  Primary
                </label>

                <input
                  type="color"
                  value={config.primaryColor}
                  onChange={(event) =>
                    updateConfig("primaryColor", event.target.value)
                  }
                  className="h-12 w-full cursor-pointer rounded-xl border border-white/10 bg-slate-950 p-1"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-300">
                  Secondary
                </label>

                <input
                  type="color"
                  value={config.secondaryColor}
                  onChange={(event) =>
                    updateConfig("secondaryColor", event.target.value)
                  }
                  className="h-12 w-full cursor-pointer rounded-xl border border-white/10 bg-slate-950 p-1"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-300">
                  Accent
                </label>

                <input
                  type="color"
                  value={config.accentColor}
                  onChange={(event) =>
                    updateConfig("accentColor", event.target.value)
                  }
                  className="h-12 w-full cursor-pointer rounded-xl border border-white/10 bg-slate-950 p-1"
                />
              </div>
            </div>

            <button
              onClick={resetConfig}
              className="w-full rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Reset Customization
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Iframe Embed</h2>

          <p className="mt-2 text-sm text-slate-400">
            Recommended for most websites.
          </p>

          <pre className="mt-4 max-h-52 overflow-x-auto rounded-2xl bg-black/50 p-4 text-xs text-slate-300">
            <code>{iframeCode}</code>
          </pre>

          <div className="mt-4">
            <CopyButton text={iframeCode} />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">CSS Embed</h2>

          <p className="mt-2 text-sm text-slate-400">
            Lightweight option for simple websites.
          </p>

          <pre className="mt-4 max-h-52 overflow-x-auto rounded-2xl bg-black/50 p-4 text-xs text-slate-300">
            <code>{cssCode}</code>
          </pre>

          <div className="mt-4">
            <CopyButton text={cssCode} />
          </div>
        </div>
      </aside>
    </section>
  );
}