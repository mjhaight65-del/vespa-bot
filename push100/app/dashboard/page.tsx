"use client";

import {
  useAppData,
  todayReps,
  weeklyTotal,
  monthlyTotal,
  bestDay,
  currentStreak,
} from "@/lib/storage";
import PageHeader from "@/components/PageHeader";
import ProgressRing from "@/components/ProgressRing";
import StatCard from "@/components/StatCard";
import RepControls from "@/components/RepControls";
import BadgeChips from "@/components/BadgeChips";
import AIScannerCard from "@/components/AIScannerCard";

export default function DashboardPage() {
  const { data, hydrated, addReps, resetToday } = useAppData();

  const reps = todayReps(data);
  const week = weeklyTotal(data);
  const month = monthlyTotal(data);
  const best = bestDay(data);
  const streak = currentStreak(data);

  return (
    <main className="px-5 pt-6 pb-6">
      <PageHeader
        title="Today"
        subtitle={greet()}
        right={
          <div className="flex items-center gap-1 text-fire font-bold">
            <span aria-hidden>🔥</span>
            <span className="stat-num">{streak}</span>
          </div>
        }
      />

      <section className="card p-5 flex flex-col items-center">
        <ProgressRing value={hydrated ? reps : 0} goal={data.goal} />
        <div className="mt-4 w-full">
          <RepControls onAdd={addReps} onReset={resetToday} />
        </div>
      </section>

      <section className="mt-5">
        <BadgeChips
          reps={reps}
          streak={streak}
          empty={
            <div className="text-xs text-muted">
              Hit 100 today to unlock your first badge.
            </div>
          }
        />
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <StatCard
          label="This week"
          value={hydrated ? week : 0}
          tone="accent"
          hint="last 7 days"
        />
        <StatCard
          label="This month"
          value={hydrated ? month : 0}
          hint="month to date"
        />
        <StatCard
          label="Streak"
          value={hydrated ? streak : 0}
          tone="fire"
          hint={streak === 1 ? "day in a row" : "days in a row"}
        />
        <StatCard
          label="Best day"
          value={hydrated ? best.reps : 0}
          hint={best.date ? `on ${best.date}` : "no record yet"}
        />
      </section>

      <section className="mt-6">
        <AIScannerCard />
      </section>
    </main>
  );
}

function greet(): string {
  const h = new Date().getHours();
  if (h < 5) return "Late grind. Get a few in.";
  if (h < 12) return "Morning. Knock them out early.";
  if (h < 17) return "Afternoon. Time for a set.";
  if (h < 21) return "Evening. Finish strong.";
  return "Late. One more set before bed.";
}
