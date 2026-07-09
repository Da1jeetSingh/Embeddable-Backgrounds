"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/app/components/CopyButton";

type AccessType = "free" | "pro";

const defaultPreviewCss = `.bg-my-background {
  background:
    radial-gradient(circle at 20% 20%, var(--embed-primary, #8b5cf6), transparent 30%),
    radial-gradient(circle at 80% 30%, var(--embed-secondary, #06b6d4), transparent 35%),
    radial-gradient(circle at 50% 80%, var(--embed-accent, #ec4899), transparent 35%),
    #020617;
  animation: myBackgroundMove var(--embed-duration, 10s) ease-in-out infinite alternate;
}

@keyframes myBackgroundMove {
  from {
    transform: scale(1);
    filter: hue-rotate(0deg);
  }

  to {
    transform: scale(1.08);
    filter: hue-rotate(45deg);
  }
}`;

const defaultEmbedCss = `html::before {
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
  animation: embedbgMyBackgroundMove var(--embed-duration, 10s) ease-in-out infinite alternate;
}

@keyframes embedbgMyBackgroundMove {
  from {
    transform: scale(1);
    filter: hue-rotate(0deg);
  }

  to {
    transform: scale(1.08);
    filter: hue-rotate(45deg);
  }
}`;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function toCssClass(slug: string) {
  return `bg-${slug}`;
}

export default function AdminBackgroundCreator() {
  const [id, setId] = useState("14");
  const [title, setTitle] = useState("My Background");
  const [slug, setSlug] = useState("my-background");
  const [description, setDescription] = useState(
    "A beautiful custom background for modern websites."
  );
  const [category, setCategory] = useState("Gradient");
  const [tags, setTags] = useState("custom, gradient, animated");
  const [access, setAccess] = useState<AccessType>("free");
  const [previewCss, setPreviewCss] = useState(defaultPreviewCss);
  const [embedCss, setEmbedCss] = useState(defaultEmbedCss);

  const cssClass = toCssClass(slug);

  const backgroundObjectCode = useMemo(() => {
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return `{
  id: "${id}",
  slug: "${slug}",
  title: "${title}",
  description: "${description}",
  type: "css",
  category: "${category}",
  tags: ${JSON.stringify(tagArray)},
  access: "${access}",
  cssClass: "${cssClass}",
},`;
  }, [id, slug, title, description, category, tags, access, cssClass]);

  const previewCssCode = useMemo(() => {
    return previewCss.replaceAll(".bg-my-background", `.${cssClass}`);
  }, [previewCss, cssClass]);

  const embedCssCode = useMemo(() => {
    return `"${slug}": \`
${embedCss}
\`,`; 
  }, [slug, embedCss]);

  const fullInstructions = `1. Add this object inside src/data/backgrounds.ts:

${backgroundObjectCode}

2. Add this CSS at the bottom of src/app/globals.css:

${previewCssCode}

3. Add this entry inside backgroundCssMap in src/lib/background-css.ts:

${embedCssCode}`;

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slug || slug === slugify(title)) {
      setSlug(slugify(value));
    }
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Admin Helper
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white">
            Add background manually
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Fill this form, copy the generated code, and paste it into your
            project files.
          </p>

          <div className="mt-6 grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                ID
              </label>

              <input
                value={id}
                onChange={(event) => setId(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Title
              </label>

              <input
                value={title}
                onChange={(event) => handleTitleChange(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Slug
              </label>

              <input
                value={slug}
                onChange={(event) => setSlug(slugify(event.target.value))}
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
              />

              <p className="mt-2 text-xs text-slate-500">
                URL will be: /backgrounds/{slug}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category
                </label>

                <input
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Access
                </label>

                <select
                  value={access}
                  onChange={(event) => setAccess(event.target.value as AccessType)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
                >
                  <option value="free">Free</option>
                  <option value="pro">Pro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Tags
              </label>

              <input
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                placeholder="gradient, animated, dark"
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
              />

              <p className="mt-2 text-xs text-slate-500">
                Separate tags with commas.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Preview CSS</h2>

          <p className="mt-2 text-sm text-slate-400">
            This CSS is used inside your website cards and preview pages.
          </p>

          <textarea
            value={previewCss}
            onChange={(event) => setPreviewCss(event.target.value)}
            rows={14}
            className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950 p-4 font-mono text-xs text-slate-300 outline-none focus:border-violet-400"
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Embed CSS</h2>

          <p className="mt-2 text-sm text-slate-400">
            This CSS is returned from your external CSS route.
          </p>

          <textarea
            value={embedCss}
            onChange={(event) => setEmbedCss(event.target.value)}
            rows={14}
            className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950 p-4 font-mono text-xs text-slate-300 outline-none focus:border-violet-400"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
          <div className="relative h-[420px] overflow-hidden rounded-2xl">
            <style>{previewCssCode}</style>

            <div className={`absolute inset-0 ${cssClass}`} />

            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="max-w-sm rounded-3xl border border-white/10 bg-black/40 p-6 text-center backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
                  Live Preview
                </p>

                <h2 className="mt-4 text-3xl font-bold text-white">{title}</h2>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">
              Background object
            </h2>

            <CopyButton text={backgroundObjectCode} />
          </div>

          <pre className="mt-4 max-h-72 overflow-auto rounded-2xl bg-black/50 p-4 text-xs text-slate-300">
            <code>{backgroundObjectCode}</code>
          </pre>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">
              Preview CSS code
            </h2>

            <CopyButton text={previewCssCode} />
          </div>

          <pre className="mt-4 max-h-72 overflow-auto rounded-2xl bg-black/50 p-4 text-xs text-slate-300">
            <code>{previewCssCode}</code>
          </pre>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">
              Embed CSS map entry
            </h2>

            <CopyButton text={embedCssCode} />
          </div>

          <pre className="mt-4 max-h-72 overflow-auto rounded-2xl bg-black/50 p-4 text-xs text-slate-300">
            <code>{embedCssCode}</code>
          </pre>
        </div>

        <div className="rounded-3xl border border-violet-400/20 bg-violet-400/10 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">
              Full instructions
            </h2>

            <CopyButton text={fullInstructions} />
          </div>

          <pre className="mt-4 max-h-96 overflow-auto rounded-2xl bg-black/50 p-4 text-xs text-slate-300">
            <code>{fullInstructions}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}