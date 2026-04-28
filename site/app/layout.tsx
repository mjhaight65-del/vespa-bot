import type { Metadata } from "next";
import "./globals.css";
import { business } from "@/lib/content";

export const metadata: Metadata = {
  title: `${business.name} — ${business.tagline}`,
  description:
    "Haight Growth helps restaurants and small businesses stop leaking money online with modern websites, AI automation, lead capture, and social media systems.",
  openGraph: {
    title: `${business.name} — ${business.tagline}`,
    description:
      "Modern websites, AI automation, and growth systems for restaurants and small businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
