# Haight Growth — One-Page Site

Modern, mobile-first one-pager for Haight Growth (AI consulting + small-business growth agency).

## Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript

## Run locally

```bash
cd site
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to https://vercel.com/new and import the repo.
3. Set **Root Directory** to `site`.
4. Framework preset will auto-detect as **Next.js** — leave defaults.
5. Click Deploy.

## Edit the copy

Almost all text — headlines, services, packages, pricing, contact info — lives in:

```
site/lib/content.ts
```

Change values there and the site updates everywhere.
