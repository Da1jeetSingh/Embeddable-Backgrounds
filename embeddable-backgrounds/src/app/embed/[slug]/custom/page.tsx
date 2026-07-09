import {
  configToStyle,
  normalizeBackgroundConfig,
} from "@/app/lib/customize";
import { normalizeCustomBackgroundStyle } from "@/app/lib/custom-background";

type CustomEmbedPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CustomEmbedPage({
  searchParams,
}: CustomEmbedPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const style = normalizeCustomBackgroundStyle(resolvedSearchParams.style);
  const config = normalizeBackgroundConfig(resolvedSearchParams);

  return (
    <main className="fixed inset-0 h-screen w-screen overflow-hidden bg-slate-950">
      <div
        className={`absolute inset-0 custom-bg-${style}`}
        style={configToStyle(config)}
      />
    </main>
  );
}