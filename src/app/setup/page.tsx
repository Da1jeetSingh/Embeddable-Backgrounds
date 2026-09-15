import Link from "next/link";
import SetupAdminForm from "@/components/SetupAdminForm";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Setup Admin - EmbedBG",
};

export default function SetupPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="relative z-10">
        <Navbar />
      </div>

      <SetupAdminForm />
    </main>
  );
}