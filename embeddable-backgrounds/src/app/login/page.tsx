import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";

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
      <div className="relative z-10">
        <Navbar />
      </div>

      <LoginForm nextPath={nextPath} />
    </main>
  );
}