"use client";

import PageHeader from "@/components/PageHeader";
import Avatar from "@/components/Avatar";
import BadgeChips from "@/components/BadgeChips";
import { useAppData, todayReps, currentStreak } from "@/lib/storage";
import { demoFriends, friendRepsToday } from "@/lib/friends";

type Row = {
  name: string;
  initials: string;
  reps: number;
  streak: number;
  isYou: boolean;
};

export default function LeaderboardPage() {
  const { data, hydrated } = useAppData();
  const youReps = hydrated ? todayReps(data) : 0;
  const youStreak = hydrated ? currentStreak(data) : 0;

  const rows: Row[] = [
    ...demoFriends.map((f) => ({
      name: f.name,
      initials: f.initials,
      reps: friendRepsToday(f),
      streak: f.streak,
      isYou: false,
    })),
    {
      name: "You",
      initials: "YO",
      reps: youReps,
      streak: youStreak,
      isYou: true,
    },
  ].sort((a, b) => b.reps - a.reps);

  return (
    <main className="px-5 pt-6 pb-6">
      <PageHeader
        title="Leaderboard"
        subtitle="Today · ranked by push-ups"
      />

      <ul className="space-y-2">
        {rows.map((r, i) => (
          <li
            key={r.name}
            className={`card p-3 flex items-center gap-3 ${
              r.isYou ? "border-accent/60" : ""
            }`}
          >
            <div
              className={`stat-num text-lg w-7 text-center ${
                i === 0
                  ? "text-fire"
                  : i === 1
                    ? "text-accent"
                    : "text-muted"
              }`}
            >
              {i + 1}
            </div>
            <Avatar
              initials={r.initials}
              tone={r.isYou ? "accent" : "default"}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold truncate">
                  {r.name}
                  {r.isYou && (
                    <span className="ml-1 text-[10px] font-extrabold text-accent">
                      YOU
                    </span>
                  )}
                </span>
                <span className="ml-auto stat-num text-lg">{r.reps}</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-fire font-semibold">
                  🔥 {r.streak}d
                </span>
                <BadgeChips reps={r.reps} streak={r.streak} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-muted text-center">
        Friends are demo accounts for now. Real invites coming next.
      </p>
    </main>
  );
}
