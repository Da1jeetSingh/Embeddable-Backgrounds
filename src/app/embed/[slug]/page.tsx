import { notFound } from "next/navigation";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import { getAllBackgroundSlugs, getBackgroundBySlug } from "@/lib/backgrounds";
import {
  configToStyle,
  normalizeBackgroundConfig,
} from "@/lib/customize";

type EmbedPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return getAllBackgroundSlugs();
}

export default async function EmbedPage({
  params,
  searchParams,
}: EmbedPageProps) {
  const { slug } = await params;
  const background = await getBackgroundBySlug(slug);

  if (!background) {
    notFound();
  }

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const config = normalizeBackgroundConfig(resolvedSearchParams);

  return (
    <main className="fixed inset-0 h-screen w-screen overflow-hidden bg-slate-950">
      {slug === "neural-network" ? (
        <NeuralNetworkBackground />
      ) : (
        <>
          {background.previewCss && <style>{background.previewCss}</style>}
          <div
            className={`absolute inset-0 ${background.cssClass}`}
            style={configToStyle(config)}
          />
        </>
      )}
    </main>
  );
}