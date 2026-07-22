import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { customBackgroundQueryString } from "@/lib/custom-background";
import type { BackgroundConfig } from "@/lib/customize";
import Navbar from "@/components/Navbar";
import RemoveFavoriteButton from "@/components/RemoveFavoriteButton";
import DeleteCustomBackgroundButton from "@/components/DeleteCustomBackgroundButton";

export const metadata = {
  title: "My Account - EmbedBG",
};

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/account");
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: user.id,
    },
    include: {
      background: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const savedCustomBackgrounds =
    await prisma.savedCustomBackground.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="relative z-10">
        <Navbar />
      </div>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Account
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            My saved backgrounds
          </h1>

          <p className="mt-5 text-slate-300">
            Logged in as {user.email}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-bold">Favorite backgrounds</h2>

          {favorites.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">
              You have no favorite backgrounds yet.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {favorites.map((favorite) => (
                <div
                  key={favorite.backgroundId}
                  className="rounded-2xl border border-white/10 bg-slate-950 p-4"
                >
                  <h3 className="font-semibold text-white">
                    {favorite.background.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {favorite.background.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/backgrounds/${favorite.background.slug}`}
                      className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
                    >
                      Preview
                    </Link>

                    <Link
                      href={`/embed/${favorite.background.slug}`}
                      target="_blank"
                      className="rounded-xl border border-cyan-400/20 px-3 py-2 text-xs font-semibold text-cyan-100 hover:bg-cyan-400/10"
                    >
                      Open Embed
                    </Link>

                    <RemoveFavoriteButton backgroundId={favorite.backgroundId} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-bold">Custom backgrounds</h2>

          {savedCustomBackgrounds.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">
              You have not saved custom backgrounds yet.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {savedCustomBackgrounds.map((item) => {
                const config: BackgroundConfig = {
                  speed: item.speed as BackgroundConfig["speed"],
                  opacity: item.opacity,
                  primaryColor: item.primaryColor,
                  secondaryColor: item.secondaryColor,
                  accentColor: item.accentColor,
                };

                const queryString = customBackgroundQueryString(
                  item.style as any,
                  config
                );

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-slate-950 p-4"
                  >
                    <h3 className="font-semibold text-white">{item.name}</h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Style: {item.style} · Speed: {item.speed} · Opacity:{" "}
                      {item.opacity}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link
                        href={`/embed/custom?${queryString}`}
                        target="_blank"
                        className="rounded-xl border border-cyan-400/20 px-3 py-2 text-xs font-semibold text-cyan-100 hover:bg-cyan-400/10"
                      >
                        Open Embed
                      </Link>

                      <Link
                        href={`/e/custom?${queryString}`}
                        target="_blank"
                        className="rounded-xl border border-violet-400/20 px-3 py-2 text-xs font-semibold text-violet-100 hover:bg-violet-400/10"
                      >
                        Open CSS
                      </Link>

                      <DeleteCustomBackgroundButton savedBackgroundId={item.id} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}