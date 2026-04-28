"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Today", icon: HomeIcon },
  { href: "/leaderboard", label: "Friends", icon: TrophyIcon },
  { href: "/challenges", label: "Challenges", icon: BoltIcon },
  { href: "/settings", label: "Settings", icon: GearIcon },
];

export default function BottomNav() {
  const pathname = usePathname();
  // Hide nav on landing page so first impression is clean.
  if (pathname === "/") return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30">
      <div className="mx-auto w-full max-w-[480px] px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-surface/90 backdrop-blur px-2 py-2">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname?.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl transition ${
                  active ? "text-accent" : "text-muted hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "stroke-accent" : ""}`} />
                <span className="text-[11px] font-semibold">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9.5" />
    </svg>
  );
}

function TrophyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4z" />
      <path d="M17 5h3v3a3 3 0 0 1-3 3" />
      <path d="M7 5H4v3a3 3 0 0 0 3 3" />
    </svg>
  );
}

function BoltIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

function GearIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
