"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { useAppData } from "@/lib/storage";

const PRESETS = [50, 100, 150, 200, 300];

export default function SettingsPage() {
  const { data, hydrated, setGoal, setReminder, setWidgetSetting } =
    useAppData();
  const [draft, setDraft] = useState<string>("100");

  useEffect(() => {
    if (hydrated) setDraft(String(data.goal));
  }, [hydrated, data.goal]);

  const saveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(draft, 10);
    if (Number.isFinite(n) && n > 0) setGoal(n);
  };

  return (
    <main className="px-5 pt-6 pb-6 space-y-6">
      <PageHeader title="Settings" subtitle="Tune your daily goal & reminders" />

      <section className="card p-5">
        <h2 className="font-bold">Daily push-up goal</h2>
        <p className="text-sm text-muted mt-1">
          The number you're trying to hit every day. Streaks count days you
          reach this number.
        </p>

        <div className="mt-4 grid grid-cols-5 gap-2">
          {PRESETS.map((n) => {
            const active = data.goal === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setGoal(n)}
                className={`rounded-xl py-2.5 font-extrabold text-sm border transition ${
                  active
                    ? "bg-accent text-bg border-accent shadow-glow"
                    : "bg-surface text-white border-border hover:border-accent/60"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>

        <form onSubmit={saveCustom} className="mt-3 flex gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="flex-1 rounded-xl bg-surface border border-border px-4 py-3 text-white placeholder:text-muted focus:outline-none focus:border-accent/60"
          />
          <button type="submit" className="btn-primary px-5">
            Save
          </button>
        </form>
      </section>

      <section className="card p-5">
        <h2 className="font-bold">Reminders</h2>
        <p className="text-sm text-muted mt-1">
          Toggle when you want push-up nudges. Push notifications go live in a
          future update.
        </p>

        <div className="mt-4 divide-y divide-border">
          <ReminderRow
            label="Morning reminder"
            sub="7:00 AM · get ahead early"
            value={data.reminders.morning}
            onChange={(v) => setReminder("morning", v)}
          />
          <ReminderRow
            label="Lunch reminder"
            sub="12:30 PM · midday set"
            value={data.reminders.lunch}
            onChange={(v) => setReminder("lunch", v)}
          />
          <ReminderRow
            label="Night reminder"
            sub="9:00 PM · finish the goal"
            value={data.reminders.night}
            onChange={(v) => setReminder("night", v)}
          />
        </div>
      </section>

      <section className="card p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-bold">Phone Widget</h2>
          <span className="chip bg-accent/15 text-accent border border-accent/30">
            Coming soon
          </span>
        </div>
        <p className="text-sm text-muted mt-1">
          Coming soon: add Push100 to your lock screen so your daily goal
          follows you all day.
        </p>

        <div className="mt-4 divide-y divide-border">
          <ReminderRow
            label="Show today's reps"
            sub="Big number on the widget"
            value={data.widget.showTodayReps}
            onChange={(v) => setWidgetSetting("showTodayReps", v)}
          />
          <ReminderRow
            label="Show goal progress"
            sub="Progress bar + percentage"
            value={data.widget.showGoalProgress}
            onChange={(v) => setWidgetSetting("showGoalProgress", v)}
          />
          <ReminderRow
            label="Show streak"
            sub="🔥 streak chip in the corner"
            value={data.widget.showStreak}
            onChange={(v) => setWidgetSetting("showStreak", v)}
          />
          <ReminderRow
            label="Show reminders"
            sub="One-line motivational nudge"
            value={data.widget.showReminders}
            onChange={(v) => setWidgetSetting("showReminders", v)}
          />
        </div>

        <p className="text-[11px] text-muted mt-3">
          Tweak these and watch the live preview on the dashboard update.
        </p>
      </section>

      <section className="card p-5">
        <h2 className="font-bold">Account</h2>
        <p className="text-sm text-muted mt-1">
          Push100 stores everything on your device for now. Sign-in & cloud sync
          arrive with friend invites.
        </p>
        <button
          type="button"
          disabled
          className="btn mt-3 w-full bg-surface-2 text-muted border border-border cursor-not-allowed"
        >
          Sign in (coming soon)
        </button>
      </section>

      <p className="text-center text-[11px] text-muted">Push100 · v0.1 MVP</p>
    </main>
  );
}

function ReminderRow({
  label,
  sub,
  value,
  onChange,
}: {
  label: string;
  sub: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="font-semibold">{label}</div>
        <div className="text-xs text-muted">{sub}</div>
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  );
}

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={`relative h-7 w-12 rounded-full transition ${
        value ? "bg-accent" : "bg-surface-2 border border-border"
      }`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-all ${
          value ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

