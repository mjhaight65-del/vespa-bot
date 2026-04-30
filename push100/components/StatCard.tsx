export default function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "accent" | "fire";
}) {
  const valueClass =
    tone === "accent"
      ? "text-accent"
      : tone === "fire"
        ? "text-fire"
        : "text-white";
  return (
    <div className="card p-4">
      <div className="text-[11px] uppercase tracking-wider text-muted font-semibold">
        {label}
      </div>
      <div className={`stat-num text-3xl mt-1 ${valueClass}`}>{value}</div>
      {hint && <div className="text-xs text-muted mt-1">{hint}</div>}
    </div>
  );
}
