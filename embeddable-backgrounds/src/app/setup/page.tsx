import Link from "next/link";
import SetupAdminForm from "@/components/SetupAdminForm";

export const metadata = {
  title: "Setup Admin - EmbedBG",
};

export default function SetupPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Embed<span className="text-violet-400">BG</span>
        </Link>

        <Link
          href="/login"
          className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
        >
          Login
        </Link>
      </nav>

      <SetupAdminForm />
    </main>
  );
}