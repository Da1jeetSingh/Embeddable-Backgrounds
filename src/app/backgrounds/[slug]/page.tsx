import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBackgroundSlugs, getBackgroundBySlug } from "@/lib/backgrounds";
import BackgroundCustomizer from "@/components/BackgroundCustomizer";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type BackgroundPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
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

  const user = await getCurrentUser();

  const favorite = user
    ? await prisma.favorite.findUnique({
        where: {
          userId_backgroundId: {
            userId: user.id,
            backgroundId: background.id,
          },
        },
      })
    : null;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="relative z-10">
        <Navbar />
      </div>

      <BackgroundCustomizer 
        background={background} 
        isFavorite={Boolean(favorite)} 
      />
    </main>
  );
}