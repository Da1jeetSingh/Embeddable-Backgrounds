import Link from "next/link";
import CustomBackgroundBuilder from "@/components/CustomBackgroundBuilder";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Create Your Own Background - EmbedBG",
  description: "Create a custom embeddable website background.",
};

export default function CreateBackgroundPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="relative z-10">
        <Navbar />
      </div>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Background Builder
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-tight md:text-6xl">
            Create your own embeddable background.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Customize the style, colors, speed, and opacity. Then copy the
            iframe or CSS embed code into any website.
          </p>
        </div>
      </section>

      <CustomBackgroundBuilder />
    </main>
  );
}