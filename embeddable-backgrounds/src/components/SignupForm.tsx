"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setMessage("");

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not create account.");
      }

      router.push("/account");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not create account."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6"
    >
      <h1 className="text-3xl font-bold text-white">Create account</h1>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        Save favorite backgrounds and custom designs.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Name</label>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
          />
        </div>

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

          <p className="mt-2 text-xs text-slate-500">
            Minimum 8 characters.
          </p>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>

        {message && (
          <p className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300">
            {message}
          </p>
        )}

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a href="/login" className="text-violet-300 hover:text-violet-200">
            Login
          </a>
        </p>
      </div>
    </form>
  );
}