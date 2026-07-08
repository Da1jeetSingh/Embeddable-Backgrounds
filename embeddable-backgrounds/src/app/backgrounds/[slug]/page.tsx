import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBackgroundSlugs, getBackgroundBySlug } from "@/app/lib/backgrounds";
import {
  generateCssEmbedCode,
  generateIframeEmbedCode,
} from "@/app/lib/embed";
import CopyButton from "@/app/components/CopyButton";

type BackgroundPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllBackgroundSlugs();
}

export async function generateMetadata({ params }: BackgroundPageProps) {
  const { slug } = await params;
  const background = getBackgroundBySlug(slug);

  if (!background) {
    return {
      title: "Background Not Found",
    };
  }

  return {
    title: `${background.title} - EmbedBG`,
    description: background.description,
  };
}

export default async function BackgroundDetailPage({
  params,
}: BackgroundPageProps) {
  const { slug } = await params;
  const background = getBackgroundBySlug(slug);

  if (!background) {
    notFound();
  }

  const iframeCode = generateIframeEmbedCode(background);
  const cssCode = generateCssEmbedCode(background);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-2xl font-bold">
          Embed<span className="text-violet-400">BG</span>
        </Link>

        <Link
          href="/"
          className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
        >
          Back Home
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4">
          <div className="relative h-[600px] overflow-hidden rounded-2xl">
            <div className={`absolute inset-0 ${background.cssClass}`} />

            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="max-w-md rounded-3xl border border-white/10 bg-black/40 p-8 text-center backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
                  Live Preview
                </p>

                <h1 className="mt-4 text-4xl font-bold">
                  {background.title}
                </h1>

                <p className="mt-4 text-slate-300">
                  {background.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              {background.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold">{background.title}</h1>

            <p className="mt-4 leading-7 text-slate-300">
              {background.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {background.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Iframe Embed</h2>

            <p className="mt-2 text-sm text-slate-400">
              Recommended. This works best for most websites.
            </p>

            <pre className="mt-4 overflow-x-auto rounded-2xl bg-black/50 p-4 text-xs text-slate-300">
              <code>{iframeCode}</code>
            </pre>

            <div className="mt-4">
              <CopyButton text={iframeCode} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">CSS Embed</h2>

            <p className="mt-2 text-sm text-slate-400">
              Lightweight option. This adds the background using CSS.
            </p>

            <pre className="mt-4 overflow-x-auto rounded-2xl bg-black/50 p-4 text-xs text-slate-300">
              <code>{cssCode}</code>
            </pre>

            <div className="mt-4">
              <CopyButton text={cssCode} />
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}