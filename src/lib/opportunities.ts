import 'server-only';
import { reviewedCatalog, developmentCall } from './catalog';
import { configured, publicDb } from './supabase/server';
import type { Opportunity } from './model';

/** Bundled reviewed entries fill gaps until they are synced into Supabase. DB wins on slug collision. */
function withBundledReviewed(calls: Opportunity[]): Opportunity[] {
  const bySlug = new Map(calls.map((call) => [call.slug, call]));
  for (const call of reviewedCatalog) {
    const stored = bySlug.get(call.slug);
    if (!stored) {
      bySlug.set(call.slug, call);
      continue;
    }
    bySlug.set(call.slug, {
      ...stored,
      deadline_date: stored.deadline_date ?? call.deadline_date,
      deadline_note: stored.deadline_note ?? call.deadline_note,
      compensation_type: stored.compensation_type ?? call.compensation_type,
      region_scope: stored.region_scope ?? call.region_scope,
      requirements: stored.requirements.length ? stored.requirements : call.requirements,
    });
  }
  return [...bySlug.values()].sort((a, b) => {
    const ta = a.last_verified_at ? Date.parse(a.last_verified_at) : 0;
    const tb = b.last_verified_at ? Date.parse(b.last_verified_at) : 0;
    return tb - ta;
  });
}

export async function getOpportunities(): Promise<Opportunity[]> {
  if (configured()) {
    // Deliberately anonymous: an admin session must never expose drafts on public routes.
    const { data, error } = await publicDb()
      .from('opportunities')
      .select('*,requirements(*)')
      .eq('published', true)
      .order('last_verified_at', { ascending: false });
    if (error) throw new Error('The opportunity catalog is temporarily unavailable. Please try again.');
    return withBundledReviewed(data as Opportunity[]);
  }
  return process.env.COMICREADY_ENABLE_DEV_FIXTURES === 'true'
    ? [...reviewedCatalog, developmentCall]
    : reviewedCatalog;
}
export async function getOpportunity(slug:string){return (await getOpportunities()).find(c=>c.slug===slug&&c.published);}
