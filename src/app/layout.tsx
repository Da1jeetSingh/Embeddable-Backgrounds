import type { Metadata } from "next";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "EmbedBG - Embeddable Website Backgrounds",
  description: "Beautiful backgrounds that you can embed into any website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NeuralNetworkBackground />
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}