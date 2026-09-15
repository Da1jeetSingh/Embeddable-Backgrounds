import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}