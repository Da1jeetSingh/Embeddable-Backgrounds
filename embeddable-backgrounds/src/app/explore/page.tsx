import ExploreBackgrounds from "@/app/components/ExploreBackgrounds";
import { backgrounds } from "@/app/data/backgrounds";

export const metadata = {
  title: "Explore Backgrounds - EmbedBG",
  description: "Browse free and premium embeddable website backgrounds.",
};

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <a href="/" className="text-2xl font-bold text-white">
            Embed<span className="text-violet-400">BG</span>
          </a>

          <div className="mt-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              Explore Library
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
              Find the perfect background.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Search, filter, preview, and copy embeddable backgrounds for your
              own website.
            </p>
          </div>
        </div>
      </section>

      <ExploreBackgrounds backgrounds={backgrounds} />
    </main>
  );
}