# Push100

100 push-ups a day. Beat your friends. Build discipline.

A mobile-first Next.js + Tailwind MVP for tracking daily push-ups, streaks, and a friends leaderboard. All data is stored in `localStorage` for the MVP — easy to swap out for an auth + DB later.

## Run locally

```bash
cd push100
npm install
npm run dev
```

Then open http://localhost:3000

The layout is constrained to a phone-width column. Open Chrome DevTools and toggle the device toolbar (or just resize the window) to see the intended mobile experience.

## Pages

- `/` — landing page
- `/dashboard` — daily tracker (progress ring, quick-add, custom add, reset, stats, badges)
- `/leaderboard` — you vs. demo friends, ranked by today's reps
- `/challenges` — static "coming soon" cards
- `/settings` — daily goal + reminder toggles

## Project layout

```
push100/
├── app/
│   ├── globals.css           Tailwind base + design tokens
│   ├── layout.tsx            Root layout + bottom nav
│   ├── page.tsx              Landing
│   ├── dashboard/page.tsx
│   ├── leaderboard/page.tsx
│   ├── challenges/page.tsx
│   └── settings/page.tsx
├── components/
│   ├── BottomNav.tsx
│   ├── PageHeader.tsx
│   ├── ProgressRing.tsx
│   ├── StatCard.tsx
│   ├── RepControls.tsx
│   ├── BadgeChips.tsx
│   ├── Avatar.tsx
│   └── AIScannerCard.tsx
├── lib/
│   ├── storage.ts            useAppData hook + localStorage + derived stats
│   ├── friends.ts            Demo friends + deterministic daily reps
│   ├── badges.ts             Badge definitions
│   └── date.ts               Local-day helpers
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── next.config.mjs
└── package.json
```

## Wiring future features

- **Auth + DB**: replace `useAppData` reads/writes with a server-side store; the rest of the app already consumes a single hook.
- **Friend invites**: replace `lib/friends.ts#demoFriends` with API-backed friends. The leaderboard page already merges `you` into the same shape.
- **AI camera scoring**: the `AIScannerCard` is the design hook for this. Add a `/scan` route that opens the camera and posts frames to your model endpoint.
- **Push reminders**: the `reminders` shape in `lib/storage.ts` is already persisted; wire it to a service worker + Web Push.
