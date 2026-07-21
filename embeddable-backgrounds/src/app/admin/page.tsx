import Link from "next/link";
import { redirect } from "next/navigation";
import AdminBackgroundCreator from "@/components/AdminBackgroundCreator";
import { requireAdmin } from "@/lib/auth";

export const metadata = {
  title: "Admin - EmbedBG",
  description: "Admin page for managing backgrounds.",
};

export default async function AdminPage() {
  const admin = await requireAdmin();

  if (!admin) {
    redirect("/login?next=/admin");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-2xl font-bold">
          Embed<span className="text-violet-400">BG</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-slate-400 md:inline">
            {admin.email}
          </span>

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
            href="/logout"
            className="rounded-full border border-red-400/20 px-4 py-2 text-sm text-red-100 hover:bg-red-400/10"
          >
            Logout
          </Link>
        </div>
      </nav>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Admin
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-tight md:text-6xl">
            Manage backgrounds.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Add, edit, delete, preview, and manage embeddable backgrounds.
          </p>
        </div>
      </section>

      <AdminBackgroundCreator />
    </main>
  );
}