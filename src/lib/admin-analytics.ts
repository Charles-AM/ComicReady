export const analyticsEvents = [
  'page_viewed',
  'opportunity_viewed',
  'fit_check_started',
  'fit_check_completed',
  'checklist_printed',
  'official_application_clicked',
  'correction_submitted',
] as const;

export type AnalyticsEvent = (typeof analyticsEvents)[number];

export type EventCountRow = {
  day: string;
  event: string;
  call_slug: string;
  count: number | string;
};

export type AnalyticsSummary = {
  totals: Record<AnalyticsEvent, number>;
  last7: Record<AnalyticsEvent, number>;
  previous7: Record<AnalyticsEvent, number>;
  last30: Record<AnalyticsEvent, number>;
  daily: Array<{ day: string; activity: number; views: number; checks: number; clicks: number }>;
  topCalls: Array<{ slug: string; views: number; starts: number; completions: number; clicks: number }>;
  pageViews: Array<{ page: string; views: number }>;
};

const emptyCounts = (): Record<AnalyticsEvent, number> => Object.fromEntries(analyticsEvents.map((event) => [event, 0])) as Record<AnalyticsEvent, number>;

function isoDay(value: Date) {
  return value.toISOString().slice(0, 10);
}

function addDays(value: Date, amount: number) {
  const copy = new Date(value);
  copy.setUTCDate(copy.getUTCDate() + amount);
  return copy;
}

function inRange(day: string, start: string, end: string) {
  return day >= start && day <= end;
}

function addRow(target: Record<AnalyticsEvent, number>, row: EventCountRow) {
  if (analyticsEvents.includes(row.event as AnalyticsEvent)) target[row.event as AnalyticsEvent] += Number(row.count);
}

export function buildAnalytics(rows: EventCountRow[], now = new Date()): AnalyticsSummary {
  const today = isoDay(now);
  const last7Start = isoDay(addDays(now, -6));
  const previous7Start = isoDay(addDays(now, -13));
  const previous7End = isoDay(addDays(now, -7));
  const last30Start = isoDay(addDays(now, -29));
  const totals = emptyCounts();
  const last7 = emptyCounts();
  const previous7 = emptyCounts();
  const last30 = emptyCounts();
  const callMap = new Map<string, { slug: string; views: number; starts: number; completions: number; clicks: number }>();
  const pageMap = new Map<string, number>();

  for (const row of rows) {
    addRow(totals, row);
    if (inRange(row.day, last7Start, today)) addRow(last7, row);
    if (inRange(row.day, previous7Start, previous7End)) addRow(previous7, row);
    if (inRange(row.day, last30Start, today)) addRow(last30, row);
    const count = Number(row.count);
    if (row.event === 'page_viewed') pageMap.set(row.call_slug, (pageMap.get(row.call_slug) || 0) + count);
    if (['opportunity_viewed', 'fit_check_started', 'fit_check_completed', 'official_application_clicked'].includes(row.event) && row.call_slug) {
      const item = callMap.get(row.call_slug) || { slug: row.call_slug, views: 0, starts: 0, completions: 0, clicks: 0 };
      if (row.event === 'opportunity_viewed') item.views += count;
      if (row.event === 'fit_check_started') item.starts += count;
      if (row.event === 'fit_check_completed') item.completions += count;
      if (row.event === 'official_application_clicked') item.clicks += count;
      callMap.set(row.call_slug, item);
    }
  }

  const daily = Array.from({ length: 30 }, (_, index) => {
    const day = isoDay(addDays(now, index - 29));
    const dayRows = rows.filter((row) => row.day === day);
    const value = (event: string) => dayRows.filter((row) => row.event === event).reduce((sum, row) => sum + Number(row.count), 0);
    const views = value('page_viewed') + value('opportunity_viewed');
    const checks = value('fit_check_completed');
    const clicks = value('official_application_clicked');
    return { day, activity: dayRows.reduce((sum, row) => sum + Number(row.count), 0), views, checks, clicks };
  });

  return {
    totals,
    last7,
    previous7,
    last30,
    daily,
    topCalls: [...callMap.values()].sort((a, b) => b.views - a.views || b.completions - a.completions).slice(0, 8),
    pageViews: [...pageMap].map(([page, views]) => ({ page, views })).sort((a, b) => b.views - a.views),
  };
}

export function percent(numerator: number, denominator: number) {
  return denominator > 0 ? Math.round((numerator / denominator) * 100) : null;
}

export function trend(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : null;
  return Math.round(((current - previous) / previous) * 100);
}
