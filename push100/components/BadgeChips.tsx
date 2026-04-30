import { badgesFor, toneClasses } from "@/lib/badges";

export default function BadgeChips({
  reps,
  streak,
  empty,
}: {
  reps: number;
  streak: number;
  empty?: React.ReactNode;
}) {
  const badges = badgesFor(reps, streak);
  if (badges.length === 0) return <>{empty ?? null}</>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((b) => (
        <span key={b.id} className={`chip ${toneClasses[b.tone]}`}>
          <span aria-hidden>{b.emoji}</span>
          {b.label}
        </span>
      ))}
    </div>
  );
}
