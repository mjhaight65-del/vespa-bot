"use client";

import { useEffect, useState, useCallback } from "react";
import { todayKey, lastNDays, startOfMonthKey } from "./date";

export type Reminders = {
  morning: boolean;
  lunch: boolean;
  night: boolean;
};

export type AppData = {
  goal: number;
  // Map of YYYY-MM-DD -> reps for that day
  history: Record<string, number>;
  reminders: Reminders;
};

const KEY = "push100:data:v1";

const defaultData: AppData = {
  goal: 100,
  history: {},
  reminders: { morning: true, lunch: false, night: true },
};

function readRaw(): AppData {
  if (typeof window === "undefined") return defaultData;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    return {
      goal: typeof parsed.goal === "number" ? parsed.goal : defaultData.goal,
      history:
        parsed.history && typeof parsed.history === "object"
          ? parsed.history
          : {},
      reminders: { ...defaultData.reminders, ...(parsed.reminders ?? {}) },
    };
  } catch {
    return defaultData;
  }
}

function writeRaw(data: AppData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(data));
  // Notify other tabs / hook instances
  window.dispatchEvent(new CustomEvent("push100:update"));
}

export function useAppData() {
  const [data, setData] = useState<AppData>(defaultData);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(readRaw());
    setHydrated(true);
    const onUpdate = () => setData(readRaw());
    window.addEventListener("push100:update", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("push100:update", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const update = useCallback((mut: (d: AppData) => AppData) => {
    const next = mut(readRaw());
    writeRaw(next);
    setData(next);
  }, []);

  const addReps = useCallback(
    (n: number) => {
      if (!Number.isFinite(n) || n === 0) return;
      update((d) => {
        const k = todayKey();
        const cur = d.history[k] ?? 0;
        const next = Math.max(0, cur + n);
        return { ...d, history: { ...d.history, [k]: next } };
      });
    },
    [update],
  );

  const setToday = useCallback(
    (n: number) => {
      update((d) => {
        const k = todayKey();
        const next = Math.max(0, Math.floor(n));
        return { ...d, history: { ...d.history, [k]: next } };
      });
    },
    [update],
  );

  const resetToday = useCallback(() => setToday(0), [setToday]);

  const setGoal = useCallback(
    (goal: number) => {
      const safe = Math.max(1, Math.floor(goal) || 1);
      update((d) => ({ ...d, goal: safe }));
    },
    [update],
  );

  const setReminder = useCallback(
    (which: keyof Reminders, value: boolean) => {
      update((d) => ({ ...d, reminders: { ...d.reminders, [which]: value } }));
    },
    [update],
  );

  return {
    data,
    hydrated,
    addReps,
    setToday,
    resetToday,
    setGoal,
    setReminder,
  };
}

// Derived stats (pure, can be reused server-side too if needed)

export function todayReps(data: AppData): number {
  return data.history[todayKey()] ?? 0;
}

export function weeklyTotal(data: AppData): number {
  const days = lastNDays(7);
  return days.reduce((sum, k) => sum + (data.history[k] ?? 0), 0);
}

export function monthlyTotal(data: AppData): number {
  const start = startOfMonthKey();
  return Object.entries(data.history).reduce(
    (sum, [k, v]) => (k >= start ? sum + v : sum),
    0,
  );
}

export function bestDay(data: AppData): { date: string | null; reps: number } {
  let best: { date: string | null; reps: number } = { date: null, reps: 0 };
  for (const [date, reps] of Object.entries(data.history)) {
    if (reps > best.reps) best = { date, reps };
  }
  return best;
}

// Streak = consecutive days (counting back from today) with reps >= goal.
// If today has 0 reps yet, we still allow yesterday's streak to "carry" so
// the user doesn't see it disappear at midnight before they've worked out.
export function currentStreak(data: AppData): number {
  const goal = data.goal;
  const todayK = todayKey();
  const todayHit = (data.history[todayK] ?? 0) >= goal;

  let streak = 0;
  let cursor = new Date();
  // If today not yet hit, start counting from yesterday.
  if (!todayHit) cursor.setDate(cursor.getDate() - 1);

  while (true) {
    const k = isoKey(cursor);
    if ((data.history[k] ?? 0) >= goal) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function isoKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
