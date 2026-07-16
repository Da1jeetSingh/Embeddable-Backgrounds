import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBackgroundSlugs, getBackgroundBySlug } from "@/app/lib/backgrounds";
import BackgroundCustomizer from "@/app/components/BackgroundCustomizer";

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
  const background = await getBackgroundBySlug(slug);

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
  const background = await getBackgroundBySlug(slug);

  if (!background) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-2xl font-bold">
          Embed<span className="text-violet-400">BG</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/explore"
            className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            Explore
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            Home
          </Link>
        </div>
      </nav>

      <BackgroundCustomizer background={background} />
    </main>
  );
}