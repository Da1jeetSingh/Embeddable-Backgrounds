import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

type NavbarProps = {
  showAdmin?: boolean;
};

export default async function Navbar({ showAdmin = true }: NavbarProps) {
  const user = await getCurrentUser();
  const isAdmin = user?.role === "admin";

  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Link href="/" className="text-2xl font-bold text-white">
        Embed<span className="text-violet-400">BG</span>
      </Link>

      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
        <Link href="/explore" className="hover:text-white">
          Explore
        </Link>

        <Link href="/create" className="hover:text-white">
          Create
        </Link>

        {user && (
          <Link href="/account" className="hover:text-white">
            Account
          </Link>
        )}

        {showAdmin && isAdmin && (
          <Link href="/admin" className="hover:text-white">
            Admin
          </Link>
        )}

        {user ? (
          <>
            <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400 md:inline">
              {user.email}
            </span>

            <Link
              href="/logout"
              className="rounded-full border border-red-400/20 px-4 py-2 text-sm text-red-100 hover:bg-red-400/10"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-white">
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}