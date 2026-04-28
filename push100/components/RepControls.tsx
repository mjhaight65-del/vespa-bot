"use client";

import { useState } from "react";

const QUICK = [10, 25, 50, 100] as const;

export default function RepControls({
  onAdd,
  onReset,
}: {
  onAdd: (n: number) => void;
  onReset: () => void;
}) {
  const [custom, setCustom] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  const submitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(custom, 10);
    if (!Number.isFinite(n) || n <= 0) return;
    onAdd(n);
    setCustom("");
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {QUICK.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onAdd(n)}
            className="btn-ghost px-0 py-3 text-base font-extrabold"
          >
            +{n}
          </button>
        ))}
      </div>
      <form onSubmit={submitCustom} className="flex gap-2">
        <input
          type="number"
          inputMode="numeric"
          min={1}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Custom reps"
          className="flex-1 rounded-xl bg-surface border border-border px-4 py-3 text-white placeholder:text-muted focus:outline-none focus:border-accent/60"
        />
        <button type="submit" className="btn-primary px-5">
          Add
        </button>
      </form>
      {!confirmReset ? (
        <button
          type="button"
          onClick={() => setConfirmReset(true)}
          className="w-full text-xs font-semibold text-muted hover:text-red-300 py-2"
        >
          Reset today
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setConfirmReset(false)}
            className="btn-ghost flex-1 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onReset();
              setConfirmReset(false);
            }}
            className="btn-danger flex-1 py-2 text-sm"
          >
            Yes, reset
          </button>
        </div>
      )}
    </div>
  );
}
