export default function AIScannerCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-2 to-surface p-5">
      <div
        aria-hidden
        className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="chip bg-accent/15 text-accent border border-accent/30">
            ⚡ Premium · Coming soon
          </span>
        </div>
        <h3 className="mt-3 text-xl font-extrabold tracking-tight">
          AI Form Score
        </h3>
        <p className="mt-1 text-sm text-muted">
          Set up your phone camera and get a form score out of 100. We grade
          depth, back alignment, tempo, and lockout — every rep, every set.
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-2 text-xs">
          {[
            ["Depth", "Chest to floor"],
            ["Back", "Plank alignment"],
            ["Tempo", "Down + up cadence"],
            ["Lockout", "Full extension"],
          ].map(([t, s]) => (
            <li
              key={t}
              className="rounded-xl border border-border bg-surface px-3 py-2"
            >
              <div className="text-white font-semibold">{t}</div>
              <div className="text-muted">{s}</div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          disabled
          className="btn mt-4 w-full bg-surface-2 text-muted border border-border cursor-not-allowed"
        >
          Notify me when it drops
        </button>
      </div>
    </div>
  );
}
