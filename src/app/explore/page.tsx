import Link from "next/link";
import ExploreBackgrounds from "@/components/ExploreBackgrounds";
import { getAllBackgrounds } from "@/lib/backgrounds";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Explore Backgrounds - EmbedBG",
  description: "Browse free and premium embeddable website backgrounds.",
};

export default async function ExplorePage() {
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
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mt-4 max-w-3xl">
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

      <ExploreBackgrounds
        backgrounds={backgrounds}
        favoriteBackgroundIds={favoriteBackgroundIds}
      />
    </main>
  );
}