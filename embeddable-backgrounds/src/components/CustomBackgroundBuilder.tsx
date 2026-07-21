"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import {
  configToStyle,
  defaultBackgroundConfig,
  type BackgroundConfig,
} from "@/lib/customize";
import {
  customBackgroundQueryString,
  customBackgroundStyles,
  defaultCustomBackgroundStyle,
  type CustomBackgroundStyle,
} from "@/lib/custom-background";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function CustomBackgroundBuilder() {
  const [style, setStyle] = useState<CustomBackgroundStyle>(
    defaultCustomBackgroundStyle
  );

  const [config, setConfig] = useState<BackgroundConfig>({
    ...defaultBackgroundConfig,
  });

  const queryString = useMemo(() => {
    return customBackgroundQueryString(style, config);
  }, [style, config]);

  const previewStyle = useMemo(() => {
    return configToStyle(config);
  }, [config]);

  const iframeUrl = `${BASE_URL}/embed/custom?${queryString}`;
  const cssUrl = `${BASE_URL}/e/custom?${queryString}`;

  const iframeCode = `<iframe
  src="${iframeUrl}"
  style="position:fixed;inset:0;width:100%;height:100%;border:0;z-index:-1;pointer-events:none;"
  aria-hidden="true">
</iframe>`;

  const cssCode = `<link rel="stylesheet" href="${cssUrl}">`;

  function updateConfig<Key extends keyof BackgroundConfig>(
    key: Key,
    value: BackgroundConfig[Key]
  ) {
    setConfig((currentConfig) => ({
      ...currentConfig,
      [key]: value,
    }));
  }

  function resetBuilder() {
    setStyle(defaultCustomBackgroundStyle);
    setConfig({ ...defaultBackgroundConfig });
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.35fr_1fr]">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <div className="relative h-[650px] overflow-hidden rounded-2xl">
          <div
            className={`absolute inset-0 custom-bg-${style}`}
            style={previewStyle}
          />

          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="max-w-md rounded-3xl border border-white/10 bg-black/40 p-8 text-center backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
                Custom Background
              </p>

              <h1 className="mt-4 text-4xl font-bold text-white">
                Build your own
              </h1>

              <p className="mt-4 text-slate-300">
                Pick a style, choose your colors, then copy the generated embed
                code.
              </p>

              <Link
                href={`/embed/custom?${queryString}`}
                target="_blank"
                className="mt-6 inline-flex rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Open Custom Embed
              </Link>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Builder
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            Create background
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            This creates a custom URL using query parameters. No database is
            needed yet.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Background style
              </label>

              <select
                value={style}
                onChange={(event) =>
                  setStyle(event.target.value as CustomBackgroundStyle)
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
              >
                {customBackgroundStyles.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-xs text-slate-500">
                {
                  customBackgroundStyles.find((item) => item.value === style)
                    ?.description
                }
              </p>
            </div>

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
              onClick={resetBuilder}
              className="w-full rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Reset Builder
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Iframe Embed</h2>

          <p className="mt-2 text-sm text-slate-400">
            Best option for most users.
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