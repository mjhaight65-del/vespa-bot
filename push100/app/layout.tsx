import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Push100 — 100 push-ups a day",
  description:
    "Track daily push-ups, build streaks, beat your friends. A simple, modern way to build the discipline of 100 push-ups a day.",
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh font-sans">
        <div className="mx-auto w-full max-w-[480px] min-h-dvh pb-24">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
