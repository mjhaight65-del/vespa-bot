import PageHeader from "@/components/PageHeader";

const challenges = [
  {
    title: "Fastest 50",
    desc: "Bang out 50 push-ups as fast as you can. We track your time.",
    emoji: "⚡",
  },
  {
    title: "Fastest 100",
    desc: "The classic. 100 push-ups, on the clock.",
    emoji: "💯",
  },
  {
    title: "Max in 2 minutes",
    desc: "Two minute timer. Most reps wins.",
    emoji: "⏱️",
  },
  {
    title: "Daily 100",
    desc: "Hit 100 push-ups every day for 30 days straight.",
    emoji: "🗓️",
  },
];

export default function ChallengesPage() {
  return (
    <main className="px-5 pt-6 pb-6">
      <PageHeader
        title="Challenges"
        subtitle="Push yourself. Compete with friends."
      />

      <div className="grid gap-3">
        {challenges.map((c) => (
          <div key={c.title} className="card p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{c.emoji}</div>
              <div className="flex-1">
                <div className="font-bold">{c.title}</div>
                <div className="text-sm text-muted mt-0.5">{c.desc}</div>
              </div>
            </div>
            <button
              type="button"
              disabled
              className="btn mt-3 w-full bg-surface-2 text-muted border border-border cursor-not-allowed text-sm"
            >
              Coming soon
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 card p-4 text-sm">
        <div className="font-bold">More challenges on the way</div>
        <p className="text-muted mt-1">
          Group challenges, weekly volume contests, and AI-graded form
          challenges are next up. Got an idea? Save it for the suggest box in
          Settings.
        </p>
      </div>
    </main>
  );
}
