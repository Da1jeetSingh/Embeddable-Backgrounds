"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginFormProps = {
  nextPath: string;
};

export default function LoginForm({ nextPath }: LoginFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setMessage("");

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not log in.");
      }

      router.push(nextPath || "/admin");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not log in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6"
    >
      <h1 className="text-3xl font-bold text-white">Admin login</h1>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        Log in to manage backgrounds.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
          />
        </div>

        <button
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300">
            {message}
          </p>
        )}

        <p className="text-center text-sm text-slate-500">
          First time?{" "}
          <a href="/setup" className="text-violet-300 hover:text-violet-200">
            Create admin account
          </a>
        </p>
      </div>
    </form>
  );
}