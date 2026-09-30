# ComicReady setup

## Run locally
Node 24 LTS recommended. `npm ci`, copy `.env.example` to `.env.local`, then
`npm run dev`. The catalog works without Supabase using one reviewed official
source. Set `COMICREADY_ENABLE_DEV_FIXTURES=true` locally to include the fictional
practice call. Fixtures are never inserted into the database.

## Supabase
1. Create a Supabase project and run `supabase/migrations/202609300001_core.sql`
   in the SQL editor (or apply all migrations with the Supabase CLI).
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

5. Visit `/admin/login`. Add a sourced opportunity, enter role/format rules,
   review the private preview, and save as a draft. After checking the official
   source, tick verification and publish. Edits reset verification unless you
   explicitly recheck the review box. To close a call, choose `closed`; to hide it,
   uncheck publish. Both remain accessible privately.
6. Confirm in an incognito browser that drafts and their requirements cannot be
   read. Public routes deliberately use an anonymous client even while you are signed in.

There is no automatic seed. When Supabase is configured its published records
replace the bundled catalog. Enter real guidelines manually, including payment,
rights, deadlines with their stated timezone, sources, and verification notes.
The bundled Sector 13 entry was reviewed on 2026-09-30. Its flexible seven-page
language must remain human-reviewed, and its missing licensing terms unknown.

## Verification limits
Local database tests run the actual migration in PGlite (Postgres), with an
`auth.uid()` test shim. They check RLS for anonymous users, ordinary signed-in
users, admins, drafts, transactional rollback, and publication verification.
They do not replace a final test against your hosted Supabase Auth instance.
No Supabase credentials have been supplied in this development session.
