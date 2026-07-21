"use client";

import { useEffect, useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";

type AccessType = "free" | "pro";

type AdminBackground = {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  category: string;
  tags: string;
  access: string;
  cssClass: string;
  previewCss: string | null;
  embedCss: string | null;
  createdAt: string;
  updatedAt: string;
};

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
  const [backgrounds, setBackgrounds] = useState<AdminBackground[]>([]);
  const [isLoadingBackgrounds, setIsLoadingBackgrounds] = useState(true);

  const [id, setId] = useState("");
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

  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const cssClass = toCssClass(slug);

  const previewCssCode = useMemo(() => {
    return previewCss.replaceAll(".bg-my-background", `.${cssClass}`);
  }, [previewCss, cssClass]);

  const backgroundObjectCode = useMemo(() => {
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return `{
  id: "${id || "AUTO_GENERATED"}",
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

  const embedCssCode = useMemo(() => {
    return `"${slug}": \`
${embedCss}
\`,`;
  }, [slug, embedCss]);

  const fullInstructions = `1. Background object:

${backgroundObjectCode}

2. Preview CSS:

${previewCssCode}

3. Embed CSS map entry:

${embedCssCode}`;

  async function loadBackgrounds() {
    try {
      setIsLoadingBackgrounds(true);

      const response = await fetch("/api/admin/backgrounds", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not load backgrounds.");
      }

      setBackgrounds(result.backgrounds || []);
    } catch (error) {
      setSaveMessage(
        error instanceof Error
          ? error.message
          : "Could not load backgrounds."
      );
    } finally {
      setIsLoadingBackgrounds(false);
    }
  }

  useEffect(() => {
    loadBackgrounds();
  }, []);

  function resetForm() {
    setId("");
    setTitle("My Background");
    setSlug("my-background");
    setDescription("A beautiful custom background for modern websites.");
    setCategory("Gradient");
    setTags("custom, gradient, animated");
    setAccess("free");
    setPreviewCss(defaultPreviewCss);
    setEmbedCss(defaultEmbedCss);
    setSaveMessage("");
  }

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slug || slug === slugify(title)) {
      setSlug(slugify(value));
    }
  }

  function editBackground(background: AdminBackground) {
    setId(background.id);
    setTitle(background.title);
    setSlug(background.slug);
    setDescription(background.description);
    setCategory(background.category);
    setTags(background.tags);
    setAccess(background.access === "pro" ? "pro" : "free");
    setPreviewCss(background.previewCss || defaultPreviewCss);
    setEmbedCss(background.embedCss || defaultEmbedCss);
    setSaveMessage(`Editing: ${background.title}`);
  }

  async function saveToDatabase() {
    try {
      setIsSaving(true);
      setSaveMessage("");

      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const response = await fetch("/api/admin/backgrounds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id || undefined,
          title,
          slug,
          description,
          category,
          tags: tagArray,
          access,
          cssClass,
          previewCss: previewCssCode,
          embedCss,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not save background.");
      }

      setSaveMessage(result.message);

      if (result.background?.id) {
        setId(result.background.id);
      }

      await loadBackgrounds();
    } catch (error) {
      setSaveMessage(
        error instanceof Error ? error.message : "Could not save background."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteBackground(background: AdminBackground) {
    const confirmed = window.confirm(
      `Delete "${background.title}"? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeletingId(background.id);
      setSaveMessage("");

      const response = await fetch(`/api/admin/backgrounds/${background.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not delete background.");
      }

      setSaveMessage(result.message);

      if (id === background.id) {
        resetForm();
      }

      await loadBackgrounds();
    } catch (error) {
      setSaveMessage(
        error instanceof Error
          ? error.message
          : "Could not delete background."
      );
    } finally {
      setIsDeletingId("");
    }
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Admin Editor
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white">
            {id ? "Edit background" : "Add background"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Create, update, and delete backgrounds from your local database.
          </p>

          {id && (
            <p className="mt-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
              Editing database ID: {id}
            </p>
          )}

          <div className="mt-6 grid gap-4">
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
                  onChange={(event) =>
                    setAccess(event.target.value as AccessType)
                  }
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

            <div className="flex flex-wrap gap-3">
              <button
                onClick={saveToDatabase}
                disabled={isSaving}
                className="rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Saving..." : id ? "Update Background" : "Save New Background"}
              </button>

              <button
                onClick={resetForm}
                className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Clear Form
              </button>
            </div>

            {saveMessage && (
              <p className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300">
                {saveMessage}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Preview CSS</h2>

          <p className="mt-2 text-sm text-slate-400">
            This CSS is used in preview cards and detail pages.
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
            This CSS is returned from /e/your-slug.
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
              Saved Backgrounds
            </h2>

            <button
              onClick={loadBackgrounds}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Refresh
            </button>
          </div>

          {isLoadingBackgrounds ? (
            <p className="mt-4 text-sm text-slate-400">Loading...</p>
          ) : backgrounds.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">
              No backgrounds saved yet.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {backgrounds.map((background) => (
                <div
                  key={background.id}
                  className="rounded-2xl border border-white/10 bg-slate-950 p-4"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <h3 className="font-semibold text-white">
                        {background.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        /backgrounds/{background.slug}
                      </p>

                      <p className="mt-2 text-sm text-slate-400">
                        {background.category} · {background.access}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`/backgrounds/${background.slug}`}
                        target="_blank"
                        className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
                      >
                        Preview
                      </a>

                      <a
                        href={`/embed/${background.slug}`}
                        target="_blank"
                        className="rounded-xl border border-cyan-400/20 px-3 py-2 text-xs font-semibold text-cyan-100 hover:bg-cyan-400/10"
                      >
                        Embed
                      </a>

                      <button
                        onClick={() => editBackground(background)}
                        className="rounded-xl border border-violet-400/20 px-3 py-2 text-xs font-semibold text-violet-100 hover:bg-violet-400/10"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteBackground(background)}
                        disabled={isDeletingId === background.id}
                        className="rounded-xl border border-red-400/20 px-3 py-2 text-xs font-semibold text-red-100 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isDeletingId === background.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-violet-400/20 bg-violet-400/10 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">
              Generated code
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