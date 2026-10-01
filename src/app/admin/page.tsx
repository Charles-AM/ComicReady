import Link from 'next/link';
import { redirect } from 'next/navigation';
import { adminDb } from '@/lib/supabase/server';
import { logout, resolveCorrection, verifyCall } from './actions';
import { PageHeader } from '@/components/page-header';
import {buildVerificationQueue,verificationQueueCounts,type VerificationCandidate} from '@/lib/verification-queue';
import {verificationLabel} from '@/lib/model';
import {verificationNow} from '@/lib/verification-now';

export const dynamic = 'force-dynamic';

export default async function Admin() {
  const db = await adminDb();
  if (!db) redirect('/admin/login');

  const { data, error } = await db.from('opportunities').select('id,slug,title,official_url,status,published,deadline,deadline_date,compensation,rights_disclosure,last_verified_at,updated_at,requirements(id,source_url)').order('updated_at', { ascending: false });
  if (error) throw new Error('Could not load admin records. Check the database migration.');

  const { data: counts, error: countError } = await db.from('event_counts').select('*').order('day', { ascending: false }).limit(500);
  const { data: corrections, error: correctionError } = await db.from('corrections').select('*').eq('resolved', false).order('created_at', { ascending: false }).limit(100);

  const totals: Record<string, number> = {};
  for (const row of counts || []) totals[row.event] = (totals[row.event] || 0) + Number(row.count);
  const now=await verificationNow();
  const queue=buildVerificationQueue((data||[]) as VerificationCandidate[],now);
  const queueCounts=verificationQueueCounts(queue);
  const actionItems=queue.filter(item=>item.priority!=='current');
  const currentItems=queue.filter(item=>item.priority==='current');
  const date=(value:string)=>new Intl.DateTimeFormat('en-GB',{dateStyle:'medium',timeZone:'UTC'}).format(new Date(value));

  return (
    <section className="page-section layout-admin">
      <PageHeader eyebrow="Private editorial desk" title="Keep the source close." />
      <div className="actions">
        <Link className="button" href="/admin/new">
          Add a call
        </Link>
        <form action={logout}>
          <button className="button secondary" type="submit">
            Sign out
          </button>
        </form>
      </div>

      <section className="admin-block verification-desk">
        <div className="admin-section-head"><div><p className="eyebrow">Source maintenance</p><h2 className="section-title">Verification queue</h2></div><p className="muted">Review every 30 days, or every seven days during a call’s final month.</p></div>
        <dl className="queue-stats">
          <div><dt>Urgent</dt><dd>{queueCounts.urgent}</dd></div>
          <div><dt>Due</dt><dd>{queueCounts.due}</dd></div>
          <div><dt>Needs details</dt><dd>{queueCounts['needs-details']}</dd></div>
          <div><dt>Current</dt><dd>{queueCounts.current}</dd></div>
        </dl>
        <div className="verification-queue">
          {actionItems.map(item=>{const blocked=item.issues.some(issue=>issue.kind==='missing-rules'||issue.kind==='missing-source');return <article className={'verification-card priority-'+item.priority} key={item.id}>
            <div className="verification-card-head"><div><span className="queue-priority">{item.priority.replace('-',' ')}</span><h3><Link href={'/admin/'+item.id}>{item.title}</Link></h3><p className="admin-list-meta">{item.published?'Published':'Draft'} · {item.status} · {item.last_verified_at?'Checked '+verificationLabel(item.last_verified_at):'Never verified'}</p></div><div className="verification-card-links"><a href={item.official_url} target="_blank" rel="noreferrer">Official source ↗</a><Link href={'/admin/'+item.id}>Edit record</Link></div></div>
            <ul className="queue-issues">{item.issues.map(issue=><li key={issue.kind}>{issue.label}</li>)}</ul>
            {item.dueAt&&<p className="queue-due">Next review {Date.parse(item.dueAt)<=now?'was':'is'} due {date(item.dueAt)}.</p>}
            {blocked?<p className="notice">Add the missing sourced requirements before recording verification.</p>:<details className="verify-action"><summary>Record completed source review</summary><form action={verifyCall}><input type="hidden" name="id" value={item.id}/><label>What did you confirm or change?<textarea name="note" required minLength={3} maxLength={2000} placeholder="Checked deadline, payment, rights, eligibility, and application link against the official page."/></label><label className="check-label"><input type="checkbox" name="confirmed" required/>I checked the current official source and every published rule.</label><button className="button" type="submit">Mark verified now</button></form></details>}
          </article>})}
          {!actionItems.length&&<p className="notice">Nothing needs attention. All calls are inside their review window and have complete source coverage.</p>}
        </div>
        {!!currentItems.length&&<details className="current-calls"><summary>{currentItems.length} current {currentItems.length===1?'call':'calls'}</summary><ul className="admin-list">{currentItems.map(item=><li key={item.id}><Link href={'/admin/'+item.id}>{item.title}</Link><span className="admin-list-meta">Next review {item.dueAt?date(item.dueAt):'not scheduled'}{item.issues.length?` · ${item.issues.length} ${item.issues.length===1?'fact':'facts'} to reconfirm`:''}</span></li>)}</ul></details>}
        {!data?.length&&<p className="notice">No calls yet. Start with a real organizer’s official guidelines.</p>}
      </section>

      <section className="admin-block">
        <h2 className="section-title">Aggregate funnel counts</h2>
        <p className="muted">Totals across the latest 500 daily buckets (up to 90 days). Event counts, not unique people.</p>
        {countError ? (
          <p className="notice">Apply the measurement migration to enable counts.</p>
        ) : (
          <dl className="facts facts-compact">
            {Object.entries(totals).map(([name, count]) => (
              <div key={name}>
                <dt>{name.replaceAll('_', ' ')}</dt>
                <dd>{count}</dd>
              </div>
            ))}
            {!counts?.length && <p>No measured events yet.</p>}
          </dl>
        )}
      </section>

      <section className="admin-block">
        <h2 className="section-title">Correction inbox</h2>
        {correctionError ? (
          <p>Apply the measurement migration to enable corrections.</p>
        ) : (
          <ul className="admin-corrections">
            {corrections?.map((c) => (
              <li key={c.id}>
                <p className="eyebrow">
                  {c.call_slug || 'General'} · {c.created_at}
                </p>
                <p>{c.message}</p>
                <form action={resolveCorrection}>
                  <input type="hidden" name="id" value={c.id} />
                  <button className="button secondary" type="submit">
                    Mark reviewed
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
        {!correctionError && !corrections?.length && <p>No pending corrections.</p>}
      </section>
    </section>
  );
}
