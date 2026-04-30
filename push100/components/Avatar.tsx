export default function Avatar({
  initials,
  tone = "default",
  size = 40,
}: {
  initials: string;
  tone?: "default" | "accent";
  size?: number;
}) {
  const cls =
    tone === "accent"
      ? "bg-accent text-bg"
      : "bg-surface-2 text-white border border-border";
  return (
    <div
      className={`shrink-0 rounded-full grid place-items-center font-extrabold ${cls}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials.slice(0, 2)}
    </div>
  );
}
