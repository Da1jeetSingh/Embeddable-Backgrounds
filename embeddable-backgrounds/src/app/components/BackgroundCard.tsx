import type { Background } from "@/app/data/backgrounds";
import { generateEmbedCode } from "@/app/lib/embed";
import CopyButton from "./CopyButton";

type BackgroundCardProps = {
  background: Background;
};

export default function BackgroundCard({ background }: BackgroundCardProps) {
  const embedCode = generateEmbedCode(background);

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
      <div className="relative h-56 overflow-hidden">
        <div className={`absolute inset-0 ${background.cssClass}`} />

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {background.access === "free" ? "Free" : "Pro"}
        </div>
      </div>

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

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Type: {background.type.toUpperCase()}
          </span>

          <CopyButton text={embedCode} />
        </div>
      </div>
    </article>
  );
}