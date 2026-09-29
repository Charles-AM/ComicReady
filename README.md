# ComicReady

Submission-readiness guidance for independent comic creators, based on reviewed,
source-linked requirements. Never an acceptance guarantee or legal opinion.

## Current checkpoint
Checkpoint 1: Next.js App Router foundation, TypeScript, Tailwind, Motion provider,
responsive introductory page, design specification, and environment template.
The opportunity directory, checker, Supabase schema, admin, and analytics are
subsequent checkpoints, not implemented features. No live calls or fabricated
opportunity data are included. Nothing has been deployed or pushed to GitHub.

## Local development
Use Node.js 22 or newer (Node 24 LTS recommended).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The scaffold runs without Supabase credentials.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

Dependencies are locked in package-lock.json after installation. `npm run check`
runs lint, type checking, and the production build. No rules tests exist yet;
meaningful rules-engine tests will be added with that module in checkpoint 4.

## Environment
- `NEXT_PUBLIC_SUPABASE_URL`: future Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: future public publishable key, protected
  by database row-level security once the database checkpoint is implemented.
- `COMICREADY_ENABLE_DEV_FIXTURES`: reserved, default false; currently unused.
Never put service-role credentials or admin identities in public source code.

## Development checkpoints
1. Scaffold, README, environment example, DESIGN.md.
2. Responsive landing and searchable opportunity list.
3. Database migration, admin authorization, opportunity management.
4. Pure typed rule evaluation and meaningful tests.
5. Conditional project form, findings, device-local printable checklist.
6. Aggregate measurement, accessibility review, Netlify configuration, docs.

## Repository isolation
This directory has its own `.git`. Before every commit, run
`git rev-parse --show-toplevel` and confirm it ends in `/ComicReady`.
No GitHub account is required for local development. The intended remote is
https://github.com/Charles-AM/ComicReady.git; connect it only after checking its
existing history. Do not force push over unknown remote content.

## Architecture and product constraints
App routes live in `src/app`, reusable UI in `src/components`, and future pure
rules in `src/lib`. Review DESIGN.md before styling additional screens. Public
users will not need accounts or upload files. Auth will protect only the private
admin area. Reviewed rules must keep their official sources and manual timestamps.
Missing input must never become a silent pass or fail. Compensation that is not
disclosed must not be labeled unpaid. Applications belong on organizer websites.

## Official documentation consulted
- https://nextjs.org/docs/app/getting-started/installation
- https://tailwindcss.com/docs/installation/framework-guides/nextjs
- https://motion.dev/docs/react
- https://supabase.com/docs/guides/auth/server-side/creating-a-client
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/

## Toolchain compatibility
Next.js 16.3.7 uses lint plugins whose current peer ranges require ESLint 9 and
TypeScript below 6.1. This scaffold uses ESLint 9.39.5 and TypeScript 6.0.3;
ESLint 10 and TypeScript 7 were tried and failed inside those plugins. ESLint 9
currently has an upstream deprecation notice. Upgrade the lint toolchain when
Next.js's bundled plugins support ESLint 10. Runtime framework versions remain
current; package-lock.json records the exact installed dependency tree.

## Checkpoint 1 verification — 2026-09-29
- Dependencies installed successfully with the project-local npm cache.
- `npm run lint`: passed with zero warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed; the homepage and not-found route were generated.
- `npm start -- --hostname 127.0.0.1`: production server started successfully.
- Browser: homepage rendered; keyboard activation of “See how it works” reached
  `#how-it-works`; no captured browser console errors.
- At a 390px viewport, document width was 390px (no horizontal overflow).
- Full accessibility and end-to-end checker verification remain for later checkpoints.
- Next.js correctly ignored the unrelated parent lockfile and reported that fact
  as a warning. The current Git root is isolated within ComicReady.

## Visual revision — independent press direction
Replaced the initial soft-card/serif design with bold condensed lettering,
square ink panels, restrained vermilion/yellow accents, and an original SVG comic
proof illustration. DESIGN.md reflects this direction. The development notice
is shorter near the action with full status explained lower on the page.
Validation: lint, TypeScript, production build, desktop browser review, 390px
mobile layout without horizontal overflow, keyboard anchor activation, and no
captured browser console errors. Build and tracing roots are explicitly scoped
to ComicReady. Next.js generated agent guidance is included for future work.
