# DailyDrills — TeamSmith

A family reflection app built on the science of structured self-monitoring. Every day, Justin, Shelby, and Parker get personalized prompts, a mood check-in, and a shared family feed — all backed by Supabase.

Built with **Next.js 16 (App Router)** · **Tailwind 4** · **Supabase** · **TypeScript**

---

## Getting started locally

```bash
cp .env.example .env.local
# fill in your Supabase URL and anon key

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Supabase setup

Run `supabase-schema.sql` once in your [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql/new). It creates:

- `members` — Justin, Shelby, Parker
- `entries` — all reflection entries (private by default)
- `family_feed` view — today's shared entries across the family

---

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

---

## Deploy to Vercel

```bash
npx vercel
```

Add both env vars under **Project Settings → Environment Variables** in Vercel before deploying.

---

## Project structure

```
app/
  page.tsx              # Today — main screen (index)
  layout.tsx            # Root layout, font, max-width shell
  family/page.tsx       # Family feed — stub
  patterns/page.tsx     # Patterns & insights — stub
  history/page.tsx      # Entry history — stub

components/
  index.ts              # Barrel export for all components
  ProfileSwitcher.tsx   # Switch between family members
  StreakBar.tsx          # 7-day streak indicator
  MoodPicker.tsx        # Emoji mood selector (0–4)
  PromptCard.tsx        # Prompt + textarea + save → Supabase
  InsightCard.tsx       # Weekly pattern callout
  FamilyFeed.tsx        # Live shared entries from Supabase
  StatsRow.tsx          # Live streak + entry count from Supabase
  BottomNav.tsx         # Tab navigation

lib/
  index.ts              # Barrel export for lib
  data.ts               # Members, prompts, seed data, types
  supabase.ts           # Supabase client + DB helpers

supabase-schema.sql     # Run once to set up the database
```

---

## What's live

- Profile switching — Justin, Mom, Parker each get their own prompts and greeting
- Mood check-in — saved per entry
- Prompts — 3 per person (quick win, deeper look, family share)
- Saves to Supabase — every entry written to `entries` table with mood + member
- Family feed — live from Supabase `family_feed` view, auto-refreshes on save
- Stats — real streak and entry count pulled from the DB
- Bottom nav — routes between Today, Family, Patterns, History

## What's next

- Auth — Supabase magic link, one account per family
- Daily prompt rotation
- Patterns page — mood over time chart
- History — browse past entries by member
- Push notifications — daily reminder to reflect
