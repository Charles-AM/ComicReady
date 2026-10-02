# ComicReady setup

## Run locally
Node 24 LTS recommended. `npm ci`, copy `.env.example` to `.env.local`, then
`npm run dev`. The catalog works without Supabase using the bundled reviewed
calls. Set `COMICREADY_ENABLE_DEV_FIXTURES=true` locally to include the fictional
practice call. Fixtures are never inserted into the database.

## Supabase
1. Create a Supabase project and apply every file in `supabase/migrations/` in
   filename order using the SQL editor or Supabase CLI. The reviewed-catalog
   migrations import the 17 manually reviewed calls and their verification records.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
   Never put a service-role key in a `NEXT_PUBLIC_` variable. The app does not
   need a service-role key; admin requests use the authenticated user's RLS permissions.
3. Create your account in Supabase Authentication. Disable public sign-ups in
   the project settings. Use a strong password and retain dashboard recovery access.
4. Copy your account UUID from Authentication and, in the trusted SQL editor, run:

```sql
insert into public.admin_users(user_id) values ('YOUR-AUTH-USER-UUID');
```

Only the SQL editor/project owner can change the admin allowlist. No admin email
or password is stored in public code. To revoke access, delete the corresponding
row from `admin_users`.

5. Visit the private admin path shared with the authorized operator. Add a sourced opportunity, enter role/format rules,
   review the private preview, and save as a draft. After checking the official
   source, tick verification and publish. Edits reset verification unless you
   explicitly recheck the review box. To close a call, choose `closed`; to hide it,
   uncheck publish. Both remain accessible privately.
6. Confirm in an incognito browser that drafts and their requirements cannot be
   read. Public routes deliberately use an anonymous client even while you are signed in.

When Supabase is configured, its published records replace the bundled catalog
entirely. The reviewed-catalog migration uses deterministic UUIDs and is safe to
reapply without duplicate calls, rules, or verification events. New or changed
calls must still be reviewed in the admin area before publication, including
payment, rights, deadlines with their stated timezone, source links, and notes.

After changing `src/lib/catalog.ts`, regenerate the checked-in import migration:

```sh
node --experimental-strip-types scripts/generate-reviewed-catalog-migration.mjs
```

Review the SQL diff before applying it. Never include the fictional fixture.

## Verification limits
Local database tests run the actual migrations in PGlite (Postgres), with an
`auth.uid()` test shim. They check RLS for anonymous users, ordinary signed-in
users, admins, drafts, transactional rollback, publication verification, and
the complete reviewed catalog import.
They do not replace a final test against your hosted Supabase Auth instance.
Hosted setup is separate from local verification; do not assume it has completed from passing local tests.


## Netlify
Import `Charles-AM/ComicReady` from GitHub. Use the Free plan and repository root,
with `npm run build` as build command and `.next` as publish directory. The checked-in
`netlify.toml` selects Node 24 and disables development fixtures. Let Netlify use its
automatic Next.js adapter. Set both Supabase public variables below before deploying.
Do not add a service-role key. Check the deployment log and open the resulting URL.
No production domain or successful deployment is assumed by this repository.

## Environment variables
- `NEXT_PUBLIC_SUPABASE_URL`: your project's HTTPS API URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: its public publishable key (RLS enforces access).
- `COMICREADY_ENABLE_DEV_FIXTURES`: optional; `false` on hosted production.

Changing a public variable requires a fresh build. Keep `.env.local` untracked.
In Supabase Auth URL settings, set Site URL to the deployed HTTPS origin. There is
no public registration page, and password login does not use a callback route.

## Measurement and corrections
The second migration provides daily event aggregates and a private correction inbox.
The admin dashboard lists these; marking a correction reviewed does not edit a rule.
Update, verify, and publish the corresponding opportunity separately. Event rows older
than 90 days are pruned on event ingestion. Remove old correction text manually when
no longer needed. No personal identifiers or story details belong in correction text.
Counts are approximate and may include repeats; the anonymous endpoint is not an
anti-fraud system. Corrections have a global hourly cap and a form honeypot. For a
larger launch, add host-side abuse controls without collecting story facts.

## Hosted release checks
1. Create an Auth user privately and grant its UUID admin membership.
2. Confirm login works and an ordinary authenticated user cannot write calls.
3. Save a draft with source-linked rules, preview it, and verify public URLs return 404.
4. Re-read official guidelines, verify, then publish a real call. Check it anonymously.
5. Complete a fit check on mobile; test unknown answers, checklist reload and printing.
6. Submit a correction and confirm only an admin can view it. Confirm counts update.
7. Close/unpublish the call and verify public behavior. Restore only after review.

Keyboard focus, semantic labels and reduced-motion behavior are implemented; include
an operating-system reduced-motion and screen-reader pass in the hosted acceptance review.
