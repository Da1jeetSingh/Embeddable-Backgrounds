import Link from "next/link";
import LoginForm from "@/components/LoginForm";

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string;
  }>;
};

export const metadata = {
  title: "Login - EmbedBG",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const nextPath = resolvedSearchParams.next || "/admin";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Embed<span className="text-violet-400">BG</span>
        </Link>

        <Link
          href="/"
          className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
        >
          Home
        </Link>
      </nav>

      <LoginForm nextPath={nextPath} />
    </main>
  );
}