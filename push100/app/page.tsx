import Link from "next/link";

const features = [
  {
    icon: "💯",
    title: "Track every rep",
    body: "Log push-ups in two taps. Daily, weekly, monthly totals.",
  },
  {
    icon: "🔥",
    title: "Build a streak",
    body: "Hit your goal every day and watch your streak climb.",
  },
  {
    icon: "🏆",
    title: "Beat your friends",
    body: "Live leaderboard. Earn badges. Be the one nobody can catch.",
  },
];

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="glow-bg" />
      <div className="relative px-5 pt-12 pb-10">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-extrabold tracking-tight text-lg">Push100</span>
        </div>

        <div className="mt-12">
          <span className="chip bg-accent/15 text-accent border border-accent/30">
            ⚡ Daily push-up tracker
          </span>
          <h1 className="mt-4 text-[2.6rem] leading-[1.05] font-extrabold tracking-tight">
            100 push-ups
            <br />
            <span className="text-accent">a day.</span>
          </h1>
          <p className="mt-3 text-base text-muted max-w-sm">
            Beat your friends. Build discipline. One simple goal, every single
            day — tracked and ranked.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link href="/dashboard" className="btn-primary text-base py-4">
              Start Tracking
            </Link>
            <Link href="/leaderboard" className="btn-ghost text-sm">
              See the leaderboard
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-3">
          {features.map((f) => (
            <div key={f.title} className="card card-hover p-4 flex gap-3">
              <div className="text-2xl">{f.icon}</div>
              <div>
                <div className="font-bold">{f.title}</div>
                <div className="text-sm text-muted">{f.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 card p-5">
          <div className="text-xs uppercase tracking-wider text-muted font-semibold">
            How it works
          </div>
          <ol className="mt-2 space-y-2 text-sm">
            {[
              "Set your daily goal — 100 is the standard.",
              "Log reps with a tap (+10, +25, +50, +100).",
              "Hit your goal. Keep your streak alive. Climb the board.",
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 grid place-items-center rounded-full bg-accent text-bg text-xs font-extrabold">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 text-center">
          <Link href="/dashboard" className="btn-primary w-full text-base py-4">
            Start Tracking
          </Link>
          <p className="mt-3 text-xs text-muted">
            Free. No sign-up. Your data stays on your device.
          </p>
        </div>
      </div>
    </main>
  );
}

function Logo() {
  return (
    <div className="h-9 w-9 rounded-xl bg-accent text-bg grid place-items-center font-extrabold shadow-glow">
      P<span className="text-[10px] -mb-3">💯</span>
    </div>
  );
}
