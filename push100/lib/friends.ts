// Demo friends used to populate the leaderboard before real auth is wired up.
// We deterministically generate "today's reps" from the date so the numbers
// don't reshuffle on every render but do change day-to-day.

import { todayKey } from "./date";

export type Friend = {
  name: string;
  initials: string;
  // Personality controls roughly how hard they push each day.
  baseline: number;
  variance: number;
  streak: number;
};

export const demoFriends: Friend[] = [
  { name: "Marc", initials: "M", baseline: 180, variance: 80, streak: 22 },
  { name: "Alex", initials: "A", baseline: 110, variance: 70, streak: 5 },
  { name: "Miles", initials: "M", baseline: 240, variance: 120, streak: 41 },
  { name: "Jake", initials: "J", baseline: 90, variance: 50, streak: 3 },
  { name: "Connor", initials: "C", baseline: 320, variance: 150, streak: 12 },
];

// Tiny deterministic pseudo-random so each friend's daily total is stable
// for the day but varies across friends and days.
function seededRand(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // 0..1
  return ((h >>> 0) % 100000) / 100000;
}

export function friendRepsToday(f: Friend, dateKey = todayKey()): number {
  const r = seededRand(`${f.name}:${dateKey}`);
  const offset = Math.round((r - 0.5) * 2 * f.variance);
  return Math.max(0, f.baseline + offset);
}
