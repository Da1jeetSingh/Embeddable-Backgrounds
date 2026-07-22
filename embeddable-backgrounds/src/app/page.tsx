import BackgroundCard from "@/components/BackgroundCard";
import { getAllBackgrounds } from "@/lib/backgrounds";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const backgrounds = await getAllBackgrounds();
  const user = await getCurrentUser();

  const favorites = user
    ? await prisma.favorite.findMany({
        where: {
          userId: user.id,
        },
        select: {
          backgroundId: true,
        },
      })
    : [];

  const favoriteBackgroundIds = favorites.map((favorite) => favorite.backgroundId);

  return (
    <main className="min-h-screen bg-slate-950">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-aurora-glow opacity-40" />
        <div className="absolute inset-0 bg-slate-950/70" />

        <div className="relative z-10">
          <Navbar />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm text-violet-200">
              Beautiful backgrounds in one embed link
            </p>

            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white md:text-7xl">
              Embeddable backgrounds for modern websites.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Choose a background, copy one small code snippet, and paste it into
              your website. Perfect for portfolios, landing pages, SaaS apps,
              blogs, and creative websites.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/explore"
                className="rounded-2xl bg-violet-500 px-6 py-3 text-center font-semibold text-white hover:bg-violet-400"
              >
                Explore Backgrounds
              </a>

              <a
                href="#how-it-works"
                className="rounded-2xl border border-white/10 px-6 py-3 text-center font-semibold text-white hover:bg-white/10"
              >
                How It Works
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30">
            <div className="relative h-[420px] overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-neon-grid" />

              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="max-w-sm rounded-3xl border border-white/10 bg-black/40 p-6 text-center backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                    Live Preview
                  </p>

                  <h2 className="mt-4 text-3xl font-bold text-white">
                    Neon Grid
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    This is how your background can look behind real website
                    content.
                  </p>

                  <div className="mt-6 rounded-xl bg-white/10 p-3 text-xs text-slate-200">
                    &lt;iframe src=&quot;/embed/neon-grid&quot;&gt;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="backgrounds" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
              Background Library
            </p>

            <h2 className="mt-3 text-4xl font-bold text-white">
              Start with free backgrounds
            </h2>

            <p className="mt-4 max-w-2xl text-slate-400">
              These are stored in a simple data file for now. Later, we will move
              them into a real database.
            </p>
          </div>

          <div className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
            {backgrounds.length} backgrounds available
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {backgrounds.map((background) => (
            <BackgroundCard 
              key={background.id} 
              background={background} 
              isFavorite={favoriteBackgroundIds.includes(background.id)} 
            />
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-y border-white/10 bg-white/[0.03]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              How it works
            </p>

            <h2 className="mt-3 text-4xl font-bold text-white">
              Copy, paste, done.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-950 p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500 text-xl font-bold text-white">
                1
              </div>

              <h3 className="text-xl font-semibold text-white">
                Choose background
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Users browse your background library and choose one they like.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950 p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-xl font-bold text-white">
                2
              </div>

              <h3 className="text-xl font-semibold text-white">
                Copy embed code
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                They copy a small iframe, CSS, or JavaScript snippet.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950 p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500 text-xl font-bold text-white">
                3
              </div>

              <h3 className="text-xl font-semibold text-white">
                Paste into website
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Their website instantly gets a beautiful background from your
                platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="docs" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Developer Example
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            Example embed code
          </h2>

          <pre className="mt-6 overflow-x-auto rounded-2xl bg-black/50 p-5 text-sm text-slate-300">
            <code>
{`<iframe
  src="https://yourwebsite.com/embed/aurora-glow"
  style="position:fixed;inset:0;width:100%;height:100%;border:0;z-index:-1;pointer-events:none;"
  aria-hidden="true">
</iframe>`}
            </code>
          </pre>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        EmbedBG — Embeddable backgrounds for any website.
      </footer>
    </main>
  );
}