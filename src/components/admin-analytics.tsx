import Link from 'next/link';
import { ADMIN_PATH } from '@/lib/admin-route';
import { percent, trend, type AnalyticsSummary } from '@/lib/admin-analytics';

const number = new Intl.NumberFormat('en-US');
const pageNames: Record<string, string> = { home: 'Homepage', catalog: 'Catalog' };

function Change({ current, previous }: { current: number; previous: number }) {
  const value = trend(current, previous);
  if (value === null) return <span className="analytics-change">New activity</span>;
  return <span className={`analytics-change ${value < 0 ? 'is-down' : value > 0 ? 'is-up' : ''}`}>{value > 0 ? '+' : ''}{value}% vs previous 7 days</span>;
}

export function AdminAnalytics({ summary, calls }: { summary: AnalyticsSummary; calls: Record<string, { id: string; title: string }> }) {
  const completionRate = percent(summary.last30.fit_check_completed, summary.last30.fit_check_started);
  const clickRate = percent(summary.last30.official_application_clicked, summary.last30.opportunity_viewed);
  const maxActivity = Math.max(1, ...summary.daily.map((item) => item.activity));
  const recent = summary.daily.filter((item) => item.activity > 0).slice(-14).reverse();

  return <section className="admin-block analytics-dashboard" aria-labelledby="analytics-title">
    <div className="admin-section-head">
      <div><p className="eyebrow">Audience & activity</p><h2 className="section-title" id="analytics-title">Is ComicReady gaining traction?</h2></div>
      <p className="muted analytics-privacy">Anonymous aggregate counts only. No names, visitor profiles, story details, IP addresses, or browsing histories.</p>
    </div>

    <div className="analytics-period"><strong>Last 30 days</strong><span>Updated when this page loads</span></div>
    <dl className="analytics-kpis">
      <div><dt>Site visits</dt><dd>{number.format(summary.last30.page_viewed)}</dd><small>Homepage and catalog views tracked from this release onward</small></div>
      <div><dt>Call views</dt><dd>{number.format(summary.last30.opportunity_viewed)}</dd><Change current={summary.last7.opportunity_viewed} previous={summary.previous7.opportunity_viewed}/></div>
      <div><dt>Checks completed</dt><dd>{number.format(summary.last30.fit_check_completed)}</dd><small>{completionRate === null ? 'No check starts yet' : `${completionRate}% of check starts`}</small></div>
      <div><dt>Application clicks</dt><dd>{number.format(summary.last30.official_application_clicked)}</dd><small>{clickRate === null ? 'No call views yet' : `${clickRate}% of call views`}</small></div>
    </dl>

    <div className="analytics-grid">
      <section className="analytics-panel" aria-labelledby="activity-chart-title">
        <div className="analytics-panel-head"><div><p className="eyebrow">30-day pulse</p><h3 id="activity-chart-title">Daily activity</h3></div><p>{number.format(summary.last30.opportunity_viewed + summary.last30.fit_check_started + summary.last30.fit_check_completed + summary.last30.official_application_clicked + summary.last30.checklist_printed + summary.last30.page_viewed)} interactions</p></div>
        <ul className="analytics-bars" aria-label="Daily interaction counts for the last 30 days">
          {summary.daily.map((item) => <li key={item.day} aria-label={`${item.day}: ${item.activity} interactions`} title={`${item.day}: ${item.activity}`}><span style={{ height: `${Math.max(item.activity ? 6 : 2, item.activity / maxActivity * 100)}%` }}/></li>)}
        </ul>
        <div className="analytics-axis"><span>{summary.daily[0]?.day}</span><span>{summary.daily.at(-1)?.day}</span></div>
      </section>

      <section className="analytics-panel" aria-labelledby="audience-title">
        <p className="eyebrow">People</p><h3 id="audience-title">Anonymous by design</h3>
        <p>Public visitors do not create accounts, so ComicReady cannot list individuals or claim a unique-user count. Use visits and funnel actions to measure demand without identifying creators.</p>
        <dl className="analytics-mini-stats"><div><dt>Tracked page visits</dt><dd>{number.format(summary.totals.page_viewed)}</dd></div><div><dt>Call views</dt><dd>{number.format(summary.totals.opportunity_viewed)}</dd></div></dl>
      </section>
    </div>

    <div className="analytics-grid analytics-grid-wide">
      <section className="analytics-panel" aria-labelledby="top-calls-title">
        <div className="analytics-panel-head"><div><p className="eyebrow">Catalog demand</p><h3 id="top-calls-title">Most-viewed calls</h3></div></div>
        {summary.topCalls.length ? <div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Call</th><th>Views</th><th>Checks</th><th>Apply clicks</th></tr></thead><tbody>{summary.topCalls.map((call) => <tr key={call.slug}><th>{calls[call.slug] ? <Link href={`${ADMIN_PATH}/${calls[call.slug].id}`}>{calls[call.slug].title}</Link> : call.slug}</th><td>{number.format(call.views)}</td><td>{number.format(call.completions)}</td><td>{number.format(call.clicks)}</td></tr>)}</tbody></table></div> : <p className="muted">No call activity has been measured yet.</p>}
      </section>

      <section className="analytics-panel" aria-labelledby="recent-activity-title">
        <div className="analytics-panel-head"><div><p className="eyebrow">Recent activity</p><h3 id="recent-activity-title">Active days</h3></div></div>
        {recent.length ? <div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Date</th><th>Views</th><th>Checks</th><th>Clicks</th></tr></thead><tbody>{recent.map((item) => <tr key={item.day}><th>{item.day}</th><td>{number.format(item.views)}</td><td>{number.format(item.checks)}</td><td>{number.format(item.clicks)}</td></tr>)}</tbody></table></div> : <p className="muted">No activity has been measured in the last 30 days.</p>}
      </section>
    </div>

    {!!summary.pageViews.length && <p className="analytics-page-note">Tracked site pages: {summary.pageViews.map((item) => `${pageNames[item.page] || item.page} ${number.format(item.views)}`).join(' · ')}</p>}
  </section>;
}
