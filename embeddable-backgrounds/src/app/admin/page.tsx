import Link from "next/link";
import AdminBackgroundCreator from "@/app/components/AdminBackgroundCreator";

export const metadata = {
  title: "Admin - EmbedBG",
  description: "Admin helper page for adding backgrounds manually.",
};

export default function AdminPage() {
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
            href="/create"
            className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            Create
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            Home
          </Link>
        </div>
      </nav>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Admin
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-tight md:text-6xl">
            Add new backgrounds manually.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            This is a temporary admin helper. It generates the code you need to
            paste into your project files. Later, this will save directly to a
            database.
          </p>
        </div>
      </section>

      <AdminBackgroundCreator />
    </main>
  );
}