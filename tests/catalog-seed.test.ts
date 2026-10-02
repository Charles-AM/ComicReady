import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, expect, test } from 'vitest';

const db = new PGlite();
const migrations = [
  '202609300001_core.sql',
  '202609300002_measurement.sql',
  '202609300003_date_only_deadlines.sql',
  '202609300004_catalog_discovery.sql',
  '202609300005_checker_fields.sql',
  '202610010001_verification_queue.sql',
  '202610020001_reviewed_catalog.sql',
];

async function role(name: 'anon' | 'authenticated') {
  await db.exec('reset role');
  await db.exec(`set role ${name}`);
}

beforeAll(async () => {
  await db.exec(`
    create role anon;
    create role authenticated;
    create schema auth;
    create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$
      select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
    $$;
    grant usage on schema auth to anon, authenticated;
  `);
  for (const migration of migrations) {
    await db.exec(readFileSync(`supabase/migrations/${migration}`, 'utf8'));
  }
}, 30_000);

afterAll(async () => {
  await db.close();
});

test('reviewed catalog migration publishes every sourced call and rule', async () => {
  await role('anon');
  const calls = await db.query<{ count: number }>('select count(*)::int as count from public.opportunities');
  const rules = await db.query<{ count: number }>('select count(*)::int as count from public.requirements');
  const unsafeSources = await db.query<{ count: number }>(`
    select count(*)::int as count
    from public.requirements
    where source_url !~ '^https://' or source_reference = ''
  `);

  expect(calls.rows).toEqual([{ count: 13 }]);
  expect(rules.rows).toEqual([{ count: 67 }]);
  expect(unsafeSources.rows).toEqual([{ count: 0 }]);
});

test('seeded calls include verification timestamps while the audit stays private', async () => {
  await role('anon');
  const missingVerification = await db.query<{ count: number }>(`
    select count(*)::int as count
    from public.opportunities
    where not published or last_verified_at is null
  `);
  expect(missingVerification.rows).toEqual([{ count: 0 }]);
  await expect(db.query('select * from public.verification_events')).rejects.toThrow();

  await db.exec('reset role');
  const audits = await db.query<{ count: number }>(`
    select count(*)::int as count
    from public.verification_events
    where result = 'verified'
  `);
  expect(audits.rows).toEqual([{ count: 13 }]);
});

test('reviewed catalog migration can be re-applied without duplicates', async () => {
  await db.exec('reset role');
  await db.exec(readFileSync('supabase/migrations/202610020001_reviewed_catalog.sql', 'utf8'));
  const calls = await db.query<{ count: number }>('select count(*)::int as count from public.opportunities');
  const rules = await db.query<{ count: number }>('select count(*)::int as count from public.requirements');
  const audits = await db.query<{ count: number }>('select count(*)::int as count from public.verification_events');
  expect(calls.rows).toEqual([{ count: 13 }]);
  expect(rules.rows).toEqual([{ count: 67 }]);
  expect(audits.rows).toEqual([{ count: 13 }]);
});
