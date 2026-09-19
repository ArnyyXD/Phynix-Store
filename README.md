# Phynix Store — Valorant, Clash of Clans & BGMI Account Marketplace

Plain JavaScript React (no TypeScript, no Tailwind — CSS Modules), Next.js 14
App Router, PostgreSQL + Prisma, and NextAuth for Google + India phone-OTP
sign-in.

## A note on `npm audit` warnings (read before upgrading anything)

This project deliberately stays on **Next.js 14.2.35** and **next-auth v4.24.15**,
pinned exactly (no `^` ranges — see `.npmrc`). Here's why, so nobody
"fixes" this by accident later:

- Next.js 14 reached end-of-life in October 2025. `14.2.35` was its final
  patch release ever — no more security fixes are coming for the 14.x line.
- `npm audit` will therefore keep listing new CVEs against it, and will
  keep suggesting `next@16.x` as the fix.
- The catch: `next-auth` v5 (the version built for Next 16 + React 19) is
  **still in beta** as of this writing. Running a live marketplace handling
  real payments and identity verification on top of beta auth software is
  its own risk — arguably a bigger one than most of the current advisories,
  which mostly require setups this app doesn't use (custom servers,
  Windows-hosted deployments, the old Pages Router with i18n, Server
  Actions, or `next/image` remote patterns).
- **Do not run `npm audit fix --force`.** It will try to jump to
  `next@16.x`, which conflicts with `next-auth` v4's peer dependencies and
  will break the build.

**When to revisit:** check https://authjs.dev for `next-auth` v5 reaching a
stable (non-beta) release, then plan a proper migration (new `auth.js`
config file, `@auth/prisma-adapter` instead of `@next-auth/prisma-adapter`,
`auth()` instead of `getServerSession()`) rather than a blind version bump.

## Multi-game + WhatsApp middleman update

This build added:

- **Multiple games:** every listing now has a `game` field (`valorant`,
  `clash_of_clans`, or `bgmi`) — see `lib/games.js` for the per-game rank
  options and field labels used by the sell form.
- **WhatsApp handoff instead of in-app payment tracking:** this site is
  purely a listing board and an intermediary — actual verification and
  payment happen in WhatsApp with our middleman, not on the site itself.
  - After submitting a listing, a seller gets a **"Contact now for
    verification"** button (`lib/whatsapp.js` builds the link) that opens
    WhatsApp with our middleman, pre-filled with the listing details.
  - On a listing page, a signed-in buyer gets a **"Contact now to
    purchase"** button that does the same thing.
  - The middleman's WhatsApp number lives in `lib/whatsapp.js` as
    `MIDDLEMAN_WHATSAPP` — update it there if it ever changes.
- **Seller KYC status:** `User.kycStatus` tracks `unverified` / `pending` /
  `verified` — there's no automated flow to update it yet, since
  verification happens over WhatsApp, not through the site. Update it
  manually in Prisma Studio once your middleman confirms someone.

**If you already have a dev database from before this update**, the schema
changed (new required `game` field, and the `Order` model was removed
entirely since payment tracking moved to WhatsApp) enough that you'll want
to run:

```bash
npx prisma migrate reset
npx prisma migrate dev --name multi-game-whatsapp-handoff
```

`migrate reset` wipes your dev data — fine at this stage since it's all
placeholder/test listings anyway.

**A regulatory flag worth taking seriously:** even with payment happening
over WhatsApp rather than in-app, a middleman who regularly collects and
forwards payment between buyers and sellers is functionally a payment
aggregator under RBI rules, which normally requires authorization once
volume grows. Using a personal or informal UPI ID for that at real scale is
a compliance question, not just a technical one — see the note on
`/policies/payment-security` and talk to a professional before this runs at
volume.

## Cleaning up expired data

`app/api/cron/cleanup-otp/route.js` deletes expired OTP codes. It's wired to
run automatically via `vercel.json`'s cron config once you deploy to Vercel.

**One limitation to know about:** Vercel's free (Hobby) tier only allows
cron jobs to run **once a day**, not hourly — it'll silently coalesce the
schedule down when you deploy. That's fine for this (expired OTPs sitting
around for up to a day isn't a real problem), but if you ever need more
frequent cleanup, either upgrade to a paid Vercel plan or point a free
external scheduler like [cron-job.org](https://cron-job.org) at
`https://yourdomain.com/api/cron/cleanup-otp` with an
`Authorization: Bearer <CRON_SECRET>` header instead.

Generate `CRON_SECRET` the same way as `NEXTAUTH_SECRET` (`openssl rand -base64 32`)
and add it to both `.env` and your Vercel project's environment variables.

## What's working now

- **Auth:** Google sign-in, and phone number sign-in via a 6-digit OTP
  (`/auth/signin`). Sessions are JWT-based.
- **Sell flow:** `/sell` requires sign-in, collects rank, level, skin names,
  and estimated price (plus listing type, region, payout details), and posts
  to the database via `/api/accounts`. New listings start as `"pending"` and
  won't show to buyers until you flip their status to `"live"` (see below).
- **Buy flow:** `/buy` fetches live listings from `/api/accounts` and lets
  buyers filter by budget tier and listing type. If the database isn't
  connected yet, it falls back to sample data automatically so the page
  still renders.
- **Policy pages:** `/policies/privacy-refund`, `/policies/payment-security`,
  and `/contact` have full draft copy — see "Before you go live" below.

## 1. Set up the database

1. Create a free Postgres instance at [neon.tech](https://neon.tech) or
   [supabase.com](https://supabase.com) and copy its connection string.
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL`.
3. Install dependencies and push the schema:

```bash
npm install
npx prisma migrate dev --name init
```

This creates all the tables (users, listings, orders, OTP codes, etc.) in
your database.

## 2. Set up Google sign-in

1. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   and create an OAuth 2.0 Client ID (type: Web application).
2. Add `http://localhost:3000/api/auth/callback/google` as an authorized
   redirect URI.
3. Put the client ID and secret into `.env` as `GOOGLE_CLIENT_ID` and
   `GOOGLE_CLIENT_SECRET`.
4. Generate a session secret and put it in `.env` too:

```bash
openssl rand -base64 32
```
→ `NEXTAUTH_SECRET`

## 3. Phone OTP sign-in

Works out of the box in development — OTPs are logged to your terminal
instead of actually being texted, so you can test the flow without paying
for SMS. When you're ready to go live, sign up with an SMS provider (MSG91
and 2Factor are common India-focused choices) and fill in the actual API
call in `app/api/otp/send/route.js` — the surrounding logic (generating,
storing, and expiring codes) is already done.

## 4. Run it

```bash
npm run dev
```

Open http://localhost:3000.

## Approving a listing

New listings are created with `status: "pending"` so nothing goes live
without a look first. Until there's an admin dashboard, you can approve one
manually with Prisma Studio:

```bash
npx prisma studio
```

Open the `GameAccount` table, find the listing, and change its `status`
field to `"live"`.

## Before you go live

- **Fill in every `[BRACKETED PLACEHOLDER]`** in the policy pages
  (`app/policies/privacy-refund/page.js`, `app/policies/payment-security/page.js`,
  `app/contact/page.js`) — business name, Grievance Officer contact, refund
  windows, support email/WhatsApp. Have someone (ideally a lawyer) review
  the policy pages before real payments start flowing.
- **Wire up the real SMS provider** in `app/api/otp/send/route.js`.
- **Consider a real KYC/verification API** (Signzy, HyperVerge, Cashfree
  Verification) instead of storing government ID uploads directly, per the
  note in the privacy policy.
- **Set `NEXTAUTH_URL`** to your real domain once deployed (e.g. on Vercel).

## Not built yet

- Admin dashboard for reviewing/approving listings (currently manual via
  Prisma Studio)
- Actual image upload for listing screenshots
- Any in-app record of who contacted the middleman about what (right now,
  the WhatsApp message itself is the only record)
- Real KYC integration
