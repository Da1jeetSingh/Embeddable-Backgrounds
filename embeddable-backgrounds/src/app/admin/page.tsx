import Link from "next/link";
import { redirect } from "next/navigation";
import AdminBackgroundCreator from "@/components/AdminBackgroundCreator";
import { requireAdmin } from "@/lib/auth";
import Navbar from "@/components/Navbar";

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
      <div className="relative z-10">
        <Navbar />
      </div>

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