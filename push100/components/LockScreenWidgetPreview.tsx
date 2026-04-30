"use client";

import { useEffect, useState } from "react";
import type { WidgetSettings } from "@/lib/storage";

export default function LockScreenWidgetPreview({
  todayTotal,
  dailyGoal,
  streak,
  widgetSettings,
}: {
  todayTotal: number;
  dailyGoal: number;
  streak: number;
  widgetSettings: WidgetSettings;
}) {
  const safeGoal = Math.max(1, dailyGoal);
  const remaining = Math.max(0, safeGoal - todayTotal);
  const pct = Math.min(100, Math.round((todayTotal / safeGoal) * 100));
  const goalHit = todayTotal >= safeGoal;
  const reminder = pickReminder({ goalHit, streak, remaining });

  const { time, date } = useClock();
  const anyContent =
    widgetSettings.showTodayReps ||
    widgetSettings.showGoalProgress ||
    widgetSettings.showStreak ||
    widgetSettings.showReminders;

  return (
    <div className="mx-auto w-full max-w-[260px]">
      {/* Phone-shaped lock-screen frame */}
      <div className="relative aspect-[9/15] rounded-[2.25rem] border border-border bg-[radial-gradient(120%_70%_at_50%_0%,#1a1f2c_0%,#0a0c11_60%,#06070a_100%)] overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
        {/* Faint accent glow behind the time */}
        <div
          aria-hidden
          className="absolute -top-10 left-1/2 -translate-x-1/2 h-32 w-44 rounded-full bg-accent/20 blur-3xl"
        />

        {/* Dynamic-island-style pill */}
        <div className="relative flex justify-center pt-3">
          <div className="h-5 w-20 rounded-full bg-black border border-white/10" />
        </div>

        {/* Time + date */}
        <div className="relative px-5 pt-4 text-center">
          <div className="text-white text-4xl font-light tracking-tight tabular-nums leading-none">
            {time}
          </div>
          <div className="mt-1 text-[11px] text-white/60 font-medium">
            {date}
          </div>
        </div>

        {/* Widget tile (frosted) */}
        <div className="relative px-3 mt-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-md bg-accent grid place-items-center text-bg text-[10px] font-extrabold shadow-glow">
                  P
                </div>
                <span className="text-[10px] font-extrabold tracking-wider text-white/80">
                  PUSH100
                </span>
              </div>
              {widgetSettings.showStreak && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-fire">
                  <span aria-hidden>🔥</span>
                  <span className="tabular-nums">{streak}</span>
                </span>
              )}
            </div>

            {widgetSettings.showTodayReps && (
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold tabular-nums text-white leading-none">
                  {todayTotal}
                </span>
                <span className="text-[11px] text-white/50 tabular-nums">
                  / {safeGoal}
                </span>
              </div>
            )}

            {widgetSettings.showGoalProgress && (
              <>
                <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-accent"
                    style={{
                      width: `${pct}%`,
                      transition: "width 400ms ease",
                    }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-white/55 font-medium tabular-nums">
                  <span>{pct}%</span>
                  <span>
                    {goalHit ? "Goal hit" : `${remaining} reps left today`}
                  </span>
                </div>
              </>
            )}

            {widgetSettings.showReminders && (
              <div className="mt-2 text-[10px] text-white/70 leading-snug">
                {reminder}
              </div>
            )}

            {!anyContent && (
              <div className="mt-2 text-[10px] text-white/50 leading-snug">
                Turn on widget data in Settings.
              </div>
            )}
          </div>
        </div>

        {/* Lock indicator */}
        <div className="absolute bottom-3 inset-x-0 flex flex-col items-center gap-1.5 text-white/50">
          <LockIcon className="h-3.5 w-3.5" />
          <div className="h-1 w-20 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}

function pickReminder({
  goalHit,
  streak,
  remaining,
}: {
  goalHit: boolean;
  streak: number;
  remaining: number;
}): string {
  if (goalHit) return "Goal smashed. Keep the streak alive tomorrow.";
  if (streak >= 7) return "Don't break the streak.";
  if (streak >= 1) return `Streak of ${streak}. ${remaining} to keep it.`;
  return "Start the streak today.";
}

function useClock() {
  // Default to the iconic Apple demo time so SSR and first paint match.
  const [time, setTime] = useState("9:41");
  const [date, setDate] = useState("Lock screen preview");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const h12 = ((hours + 11) % 12) + 1;
      setTime(`${h12}:${minutes}`);
      setDate(
        now.toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      );
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return { time, date };
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
