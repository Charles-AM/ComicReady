import { describe, expect, test } from 'vitest';
import { buildAnalytics, percent, trend } from '../src/lib/admin-analytics';

describe('admin analytics', () => {
  test('separates current and previous periods and builds the funnel', () => {
    const summary = buildAnalytics([
      { day: '2026-10-03', event: 'page_viewed', call_slug: 'home', count: 8 },
      { day: '2026-10-03', event: 'opportunity_viewed', call_slug: 'call-a', count: 5 },
      { day: '2026-10-03', event: 'fit_check_started', call_slug: 'call-a', count: 4 },
      { day: '2026-10-03', event: 'fit_check_completed', call_slug: 'call-a', count: 3 },
      { day: '2026-10-03', event: 'official_application_clicked', call_slug: 'call-a', count: 2 },
      { day: '2026-09-24', event: 'opportunity_viewed', call_slug: 'call-a', count: 2 },
    ], new Date('2026-10-03T12:00:00Z'));
    expect(summary.last7.opportunity_viewed).toBe(5);
    expect(summary.previous7.opportunity_viewed).toBe(2);
    expect(summary.last30.fit_check_completed).toBe(3);
    expect(summary.topCalls[0]).toMatchObject({ slug: 'call-a', views: 7, completions: 3, clicks: 2 });
    expect(summary.daily.at(-1)).toMatchObject({ day: '2026-10-03', views: 13, checks: 3, clicks: 2 });
  });

  test('handles empty denominators without claiming a conversion rate', () => {
    expect(percent(2, 0)).toBeNull();
    expect(percent(3, 4)).toBe(75);
    expect(trend(2, 0)).toBeNull();
    expect(trend(6, 4)).toBe(50);
  });
});
