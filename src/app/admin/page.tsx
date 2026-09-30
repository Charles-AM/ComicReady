import Link from 'next/link';
import { redirect } from 'next/navigation';
import { adminDb } from '@/lib/supabase/server';
import { logout, resolveCorrection } from './actions';
import { PageHeader } from '@/components/page-header';

export const dynamic = 'force-dynamic';

export default async function Admin() {
  const db = await adminDb();
  if (!db) redirect('/admin/login');

  const { data, error } = await db.from('opportunities').select('id,title,status,published,last_verified_at').order('updated_at', { ascending: false });
  if (error) throw new Error('Could not load admin records. Check the database migration.');

  const { data: counts, error: countError } = await db.from('event_counts').select('*').order('day', { ascending: false }).limit(500);
  const { data: corrections, error: correctionError } = await db.from('corrections').select('*').eq('resolved', false).order('created_at', { ascending: false }).limit(100);

  const totals: Record<string, number> = {};
  for (const row of counts || []) totals[row.event] = (totals[row.event] || 0) + Number(row.count);

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

      <h2 className="section-title">Calls</h2>
      <ul className="admin-list">
        {data?.map((c) => (
          <li key={c.id}>
            <Link href={'/admin/' + c.id}>{c.title}</Link>
            <span className="admin-list-meta">
              {c.published ? 'Published' : 'Draft'} · {c.status}
            </span>
          </li>
        ))}
      </ul>
      {!data?.length && <p className="notice">No calls yet. Start with a real organizer’s official guidelines.</p>}

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
