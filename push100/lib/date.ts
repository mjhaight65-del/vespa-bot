// Local-day helpers. We key everything by YYYY-MM-DD in the user's local time
// so "today" matches what the user sees on their phone.

export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function shiftDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function lastNDays(n: number, ref: Date = new Date()): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    out.push(todayKey(shiftDays(ref, -i)));
  }
  return out;
}

export function startOfWeekKey(ref: Date = new Date()): string {
  // Week starts Monday.
  const d = new Date(ref);
  const day = (d.getDay() + 6) % 7; // Mon=0..Sun=6
  d.setDate(d.getDate() - day);
  return todayKey(d);
}

export function startOfMonthKey(ref: Date = new Date()): string {
  return todayKey(new Date(ref.getFullYear(), ref.getMonth(), 1));
}
