export const roles = ['writer', 'artist', 'writer-artist', 'colorist', 'letterer', 'team'] as const;
export type Role = typeof roles[number];
export const formats = ['script', 'completed short comic', 'pitch', 'portfolio'] as const;
export type ProjectFormat = typeof formats[number];
export const fields = ['role', 'format', 'country', 'region', 'age', 'identityMatch', 'rights', 'english', 'aiUsed', 'previouslyPublished', 'genreFit', 'audienceFit', 'samplePages', 'storyPages', 'script', 'synopsis', 'bio', 'portfolio', 'collaborator', 'teamRoles', 'fileFormat', 'dpi', 'colorMode', 'dimensionsReady', 'pdf'] as const;
export type Field = typeof fields[number];
export type Project = Partial<Record<Field, string | number | boolean | null>>;
export type Requirement = {
  id: string; opportunity_id: string; kind: 'eligibility' | 'preparation' | 'review';
  roles: Role[]; formats: ProjectFormat[]; field: Field | null;
  operator: 'eq' | 'gte' | 'lte' | 'in' | 'review'; value: string | number | boolean | string[] | null;
  wording: string; source_reference: string; source_url: string;
};
export type Opportunity = {
  id: string; slug: string; title: string; organizer: string;
  category: 'anthology' | 'short-comic'; official_url: string;
  status: 'open' | 'rolling' | 'closed' | 'unknown'; deadline: string | null; deadline_timezone: string | null; deadline_note?: string | null; deadline_date?: string | null;
  compensation: string | null; compensation_type?: 'paid' | 'conditional' | 'unpaid' | 'undisclosed'; rights_disclosure: string | null;
  region_scope?: 'worldwide' | 'restricted' | 'not-stated';
  last_verified_at: string | null; published: boolean; description: string;
  roles: Role[]; formats: ProjectFormat[]; requirements: Requirement[]; fixture?: boolean;
};
export const UNKNOWN = 'Cannot determine from published guidelines';
export function verificationLabel(value: string | null) {
  return value ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(new Date(value)) + ' UTC' : 'Not yet manually verified';
}

/**
 * Date-only deadlines do not publish a timezone. Treat them as open through the
 * end of that calendar date anywhere on earth so ComicReady never closes a call
 * early for a creator in another region.
 */
export function deadlineCloseAt(call: Opportunity): number | null {
  const value = call.deadline
    ? Date.parse(call.deadline)
    : call.deadline_date
      ? Date.parse(`${call.deadline_date}T23:59:59.999-12:00`)
      : Number.NaN;
  return Number.isFinite(value) ? value : null;
}

export function deadlineLabel(call: Opportunity) {
  if (call.deadline) {
    const requestedZone = call.deadline_timezone || 'UTC';
    try {
      return `${new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: requestedZone }).format(new Date(call.deadline))} ${requestedZone}`;
    } catch {
      return `${new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(new Date(call.deadline))} UTC`;
    }
  }
  if (call.deadline_note) return call.deadline_note;
  return call.status === 'rolling' ? 'Rolling submissions' : 'Deadline not published';
}

export function effectiveStatus(call: Opportunity, now = new Date()) {
  const closesAt = deadlineCloseAt(call);
  if (call.status === 'closed' || (closesAt !== null && closesAt <= now.getTime())) return 'closed';
  return call.status;
}
