import { notFound } from "next/navigation";
import { getAllBackgroundSlugs, getBackgroundBySlug } from "@/app/lib/backgrounds";

type EmbedPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllBackgroundSlugs();
}

export default async function EmbedPage({ params }: EmbedPageProps) {
  const { slug } = await params;
  const background = getBackgroundBySlug(slug);

  if (!background) {
    notFound();
  }

  return (
    <main className="fixed inset-0 h-screen w-screen overflow-hidden">
      <div className={`absolute inset-0 ${background.cssClass}`} />
    </main>
  );
}