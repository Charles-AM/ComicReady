# ComicReady

A mobile-responsive submission-readiness tool for independent comic creators.
Reviewed, source-linked rules produce separate eligibility, preparation, and
unknown findings. They never promise acceptance or replace legal advice.

## Run

Use Node 24, then:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Without Supabase, the app displays a small bundled catalog of manually reviewed
calls with official source links (see `src/lib/catalog.ts`). Set `COMICREADY_ENABLE_DEV_FIXTURES=true` to exercise a clearly
labeled fictional practice anthology. These fixtures are never seeded to a database.
With Supabase configured, only its published records appear publicly.

## What works

- Search and filter the opportunity directory; inspect original sources and verification times.
- Answer relevant project questions, receive deterministic findings, mark a checklist,
  and print/save it using the browser. Facts and progress stay on that browser/device.
- Admin-only call/rule editing, private preview, verification, publication, closure,
  correction review, and aggregate funnel counts.
- Supabase RLS hides drafts and rules from public readers, including public pages
  viewed while signed in as an administrator.
- Privacy preference, correction form, accessible labels/focus, responsive layouts,
  reduced-motion support, and print styling.

There are no comic uploads, public accounts, generative eligibility chatbot,
application submissions, payments, or individual tracking profiles.

## Verify

```sh
npm run check
```

Runs lint, meaningful rules/database/request tests, TypeScript, and the production
build. Database tests execute both migrations in PGlite with a small test Auth shim;
real Supabase sign-in and hosted deployment still need integration verification.
Webpack is used for portable production builds. The lockfile records compatible
installed versions; use `npm ci` for reproducibility.

## Deploy and administer

See [SETUP.md](SETUP.md) for Supabase migrations, the private admin allowlist,
Netlify configuration, required environment variables, and the release checklist.
The repository includes Netlify build settings and a GitHub Actions check workflow.
It remains a standard Next.js app and is portable to other Next-compatible hosts.

## Structure

- `src/lib/engine.ts`: pure rules evaluation, independent of UI and database.
- `src/lib/model.ts`: typed opportunities, project facts, and requirements.
- `src/lib/catalog.ts`: reviewed fallback entry and explicit development fixture.
- `src/lib/supabase/`: anonymous public reads and cookie-backed admin authorization.
- `supabase/migrations/`: schema, RLS, transactional admin saves, aggregate events.
- `tests/`: behavioral rules, real Postgres policy, and input-validation tests.
- `DESIGN.md` and `ARTWORK.md`: visual system and artwork provenance.

## Measurement

The private dashboard reports daily aggregate counts for opportunity views, checks
started/completed, print-dialog requests, official-link clicks, and corrections.
No project facts, persistent visitor identifiers, IP addresses, or referrers are
stored in these tables. Counts are approximate interactions, not unique users or
confirmed submissions/PDF saves. Browser opt-out, DNT, and GPC suppress optional
client measurement; a submitted correction still increments its functional count.
Host infrastructure may retain its own request logs.

## Content maintenance

Every live rule needs an official source, short reference, and manual verification.
Unknown payment remains undisclosed, not unpaid. Nuanced exceptions remain human
review findings. Recheck deadlines, compensation, licensing, and submission status
before publishing, then periodically. Do not pad the catalog with invented calls.
