export type Badge = {
  id: string;
  label: string;
  emoji: string;
  tone: "lime" | "orange" | "red" | "blue";
};

export function badgesFor(reps: number, streak: number): Badge[] {
  const out: Badge[] = [];
  if (reps >= 100)
    out.push({ id: "100", label: "100 Club", emoji: "💯", tone: "lime" });
  if (reps >= 250)
    out.push({ id: "250", label: "250 Beast", emoji: "🦾", tone: "orange" });
  if (reps >= 500)
    out.push({ id: "500", label: "500 Psycho", emoji: "🔥", tone: "red" });
  if (streak >= 7)
    out.push({ id: "streak", label: "Streak King", emoji: "👑", tone: "blue" });
  return out;
}

export const toneClasses: Record<Badge["tone"], string> = {
  lime: "bg-accent/15 text-accent border border-accent/30",
  orange: "bg-fire/15 text-fire border border-fire/30",
  red: "bg-red-500/15 text-red-300 border border-red-500/30",
  blue: "bg-sky-500/15 text-sky-300 border border-sky-500/30",
};
