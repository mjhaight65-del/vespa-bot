export default function ProgressRing({
  value,
  goal,
  size = 200,
  stroke = 14,
}: {
  value: number;
  goal: number;
  size?: number;
  stroke?: number;
}) {
  const pct = Math.max(0, Math.min(1, goal > 0 ? value / goal : 0));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * pct;
  const remaining = Math.max(0, goal - value);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#23262f"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          style={{ transition: "stroke-dasharray 400ms ease" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bef264" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="stat-num text-5xl text-white leading-none">{value}</div>
        <div className="text-xs text-muted mt-2">
          {value >= goal
            ? "Goal smashed 💪"
            : `${remaining} to ${goal}`}
        </div>
      </div>
    </div>
  );
}
