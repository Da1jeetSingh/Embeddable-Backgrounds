import Link from "next/link";
import SignupForm from "@/components/SignupForm";

export const metadata = {
  title: "Signup - EmbedBG",
};

export default function SignupPage() {
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

      <SignupForm />
    </main>
  );
}