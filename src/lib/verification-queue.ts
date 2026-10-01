export type VerificationCandidate = {
  id: string;
  slug: string;
  title: string;
  official_url: string;
  status: 'open' | 'rolling' | 'closed' | 'unknown';
  published: boolean;
  deadline: string | null;
  deadline_date?: string | null;
  compensation: string | null;
  rights_disclosure: string | null;
  last_verified_at: string | null;
  updated_at: string;
  requirements?: { id: string; source_url: string }[] | null;
};

export type VerificationIssue = {
  kind: 'deadline-passed' | 'never-verified' | 'overdue' | 'due-soon' | 'missing-payment' | 'missing-rights' | 'missing-rules' | 'missing-source' | 'draft';
  label: string;
};

export type VerificationQueueItem = VerificationCandidate & {
  cadenceDays: 7 | 30;
  dueAt: string | null;
  issues: VerificationIssue[];
  priority: 'urgent' | 'due' | 'needs-details' | 'current';
};

const day = 86_400_000;

function deadlineTime(call: VerificationCandidate) {
  if (call.deadline) return Date.parse(call.deadline);
  if (call.deadline_date) return Date.parse(`${call.deadline_date}T23:59:59Z`);
  return null;
}

export function buildVerificationQueue(calls: VerificationCandidate[], now: number): VerificationQueueItem[] {
  return calls.map((call) => {
    const issues: VerificationIssue[] = [];
    const deadline = deadlineTime(call);
    const daysToDeadline = deadline === null ? null : (deadline - now) / day;
    const cadenceDays: 7 | 30 = daysToDeadline !== null && daysToDeadline >= 0 && daysToDeadline <= 30 ? 7 : 30;
    const verified = call.last_verified_at ? Date.parse(call.last_verified_at) : null;
    const due = verified === null || !Number.isFinite(verified) ? null : verified + cadenceDays * day;

    if (deadline !== null && deadline < now && call.status !== 'closed') {
      issues.push({kind: 'deadline-passed', label: 'Published deadline has passed; close the call or confirm an extension.'});
    }
    if (verified === null || !Number.isFinite(verified)) {
      issues.push({kind: 'never-verified', label: 'No completed source review is recorded.'});
    } else if (due !== null && due <= now) {
      issues.push({kind: 'overdue', label: `Source review is overdue on the ${cadenceDays}-day schedule.`});
    } else if (due !== null && due - now <= 7 * day) {
      issues.push({kind: 'due-soon', label: 'Source review is due within seven days.'});
    }
    if (!call.compensation?.trim()) issues.push({kind: 'missing-payment', label: 'Payment is undisclosed; confirm whether the organizer has added terms.'});
    if (!call.rights_disclosure?.trim()) issues.push({kind: 'missing-rights', label: 'Copyright or licensing terms are not recorded.'});
    if (!call.requirements?.length) issues.push({kind: 'missing-rules', label: 'No reviewed requirements are attached.'});
    else if (call.requirements.some((rule) => !rule.source_url?.trim())) issues.push({kind: 'missing-source', label: 'At least one rule is missing an official source link.'});
    if (!call.published) issues.push({kind: 'draft', label: 'Draft is not visible in the public catalog.'});

    const kinds = new Set(issues.map((issue) => issue.kind));
    const hasBlockingDetails = kinds.has('missing-rules') || kinds.has('missing-source') || kinds.has('draft');
    const priority:VerificationQueueItem['priority'] = kinds.has('deadline-passed') || (call.published && kinds.has('never-verified'))
      ? 'urgent'
      : kinds.has('never-verified') || kinds.has('overdue') || kinds.has('due-soon')
        ? 'due'
        : hasBlockingDetails
          ? 'needs-details'
          : 'current';

    return {...call, cadenceDays, dueAt: due === null ? null : new Date(due).toISOString(), issues, priority};
  }).sort((a, b) => {
    const rank:Record<VerificationQueueItem['priority'],number> = {urgent: 0, due: 1, 'needs-details': 2, current: 3};
    const priority = rank[a.priority] - rank[b.priority];
    if (priority) return priority;
    const aDue = a.dueAt ? Date.parse(a.dueAt) : 0;
    const bDue = b.dueAt ? Date.parse(b.dueAt) : 0;
    return aDue - bDue || a.title.localeCompare(b.title);
  });
}

export function verificationQueueCounts(items: VerificationQueueItem[]) {
  return items.reduce((counts, item) => ({...counts, [item.priority]: counts[item.priority] + 1}), {
    urgent: 0,
    due: 0,
    'needs-details': 0,
    current: 0,
  });
}
