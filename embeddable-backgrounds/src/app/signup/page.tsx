import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Signup - EmbedBG",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="relative z-10">
        <Navbar />
      </div>

      <SignupForm />
    </main>
  );
}