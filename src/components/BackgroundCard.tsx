import Link from "next/link";
import type { Background } from "@/data/backgrounds";
import { generateEmbedCode } from "@/lib/embed";
import CopyButton from "./CopyButton";
import FavoriteButton from "@/components/FavoriteButton";

type BackgroundCardProps = {
  background: Background;
  isFavorite?: boolean;
};

export default function BackgroundCard({ background, isFavorite = false }: BackgroundCardProps) {
  const embedCode = generateEmbedCode(background);

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
      <Link href={`/backgrounds/${background.slug}`}>
        <div className="relative h-56 overflow-hidden">
          {background.previewCss && <style>{background.previewCss}</style>}
          
          <div className={`absolute inset-0 ${background.cssClass}`} />

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {background.access === "free" ? "Free" : "Pro"}
          </div>
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-semibold text-white">
            {background.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {background.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {background.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="rounded-2xl bg-black/30 p-3">
          <code className="line-clamp-2 text-xs text-slate-300">
            {embedCode}
          </code>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/backgrounds/${background.slug}`}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Preview
          </Link>

          <Link
            href={`/embed/${background.slug}`}
            target="_blank"
            className="rounded-xl border border-cyan-400/30 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-400/10"
          >
            Open Embed
          </Link>

          <FavoriteButton 
            backgroundId={background.id} 
            initialIsFavorite={isFavorite}
          />

          <CopyButton text={embedCode} />
        </div>
      </div>
    </article>
  );
}