import { deadlineCloseAt, type Opportunity } from './model';

export type CatalogSort = 'deadline' | 'recently-verified' | 'rolling-first' | 'title';
export type PageBand = 'up-to-5' | '6-to-20' | '20-plus';

export function paymentType(call: Opportunity) {
  return call.compensation_type ?? (call.compensation ? 'conditional' : 'undisclosed');
}

export function paymentLabel(call: Opportunity) {
  const type = paymentType(call);
  return type === 'paid' ? 'Paid' : type === 'conditional' ? 'Conditional payment' : type === 'unpaid' ? 'Unpaid' : 'Payment not disclosed';
}

export function regionLabel(call: Opportunity) {
  return call.region_scope === 'worldwide' ? 'Worldwide' : call.region_scope === 'restricted' ? 'Region restricted' : 'Region not stated';
}

export function pageRange(call: Opportunity): { min: number | null; max: number | null } {
  let min: number | null = null;
  let max: number | null = null;
  for (const requirement of call.requirements) {
    if (requirement.field !== 'storyPages' || requirement.kind !== 'eligibility' || requirement.roles.length || requirement.formats.length || typeof requirement.value !== 'number') continue;
    if (requirement.operator === 'gte') min = min === null ? requirement.value : Math.max(min, requirement.value);
    if (requirement.operator === 'lte') max = max === null ? requirement.value : Math.min(max, requirement.value);
  }
  return { min, max };
}

export function pageRangeLabel(call: Opportunity) {
  const { min, max } = pageRange(call);
  if (min !== null && max !== null) return `${min}–${max} pages`;
  if (max !== null) return `Up to ${max} pages`;
  if (min !== null) return `${min}+ pages`;
  return 'Page range varies or is not stated';
}

export function matchesPageBand(call: Opportunity, band: PageBand) {
  const range = pageRange(call);
  if (range.min === null && range.max === null) return false;
  if (band === 'up-to-5') return (range.min ?? 0) <= 5;
  if (band === '6-to-20') return (range.max ?? Number.POSITIVE_INFINITY) >= 6 && (range.min ?? 0) <= 20;
  return (range.max ?? Number.POSITIVE_INFINITY) >= 20;
}

export function deadlineValue(call: Opportunity) {
  if (call.deadline) return Date.parse(call.deadline);
  if (call.deadline_date) return Date.parse(`${call.deadline_date}T12:00:00Z`);
  return Number.POSITIVE_INFINITY;
}

export function isClosingSoon(call: Opportunity, now = Date.now(), days = 30) {
  const deadline = deadlineCloseAt(call) ?? Number.POSITIVE_INFINITY;
  return Number.isFinite(deadline) && deadline > now && deadline - now <= days * 86_400_000;
}

export function isRecentlyVerified(call: Opportunity, now = Date.now(), days = 30) {
  if (!call.last_verified_at) return false;
  const checked = Date.parse(call.last_verified_at);
  return Number.isFinite(checked) && checked <= now && now - checked <= days * 86_400_000;
}

export function sortCalls(calls: Opportunity[], sort: CatalogSort) {
  return [...calls].sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title);
    if (sort === 'recently-verified') return Date.parse(b.last_verified_at || '1970-01-01') - Date.parse(a.last_verified_at || '1970-01-01');
    if (sort === 'rolling-first') {
      const rolling = Number(b.status === 'rolling') - Number(a.status === 'rolling');
      return rolling || deadlineValue(a) - deadlineValue(b) || a.title.localeCompare(b.title);
    }
    return deadlineValue(a) - deadlineValue(b) || a.title.localeCompare(b.title);
  });
}
