import Link from 'next/link';
import { EventMarker, ApplicationLink } from '@/components/event-marker';
import { BackLink } from '@/components/back-link';
import { notFound } from 'next/navigation';
import { getOpportunity } from '@/lib/opportunities';
import { effectiveStatus, verificationLabel, UNKNOWN } from '@/lib/model';

function coverClass(slug: string, category: string) {
  const bucket = slug.split('').reduce((n, c) => n + c.charCodeAt(0), 0) % 4;
  return `cover-tone-${category === 'anthology' ? 'anthology' : 'short'}-${bucket}`;
}

export const dynamic = 'force-dynamic';

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const c = await getOpportunity((await params).slug);
  if (!c) notFound();

  return (
    <section className="page-section layout-call">
      <EventMarker event="opportunity_viewed" slug={c.slug} enabled={!c.fixture} />
      <BackLink href="/opportunities">Catalog</BackLink>

      <div className="call-showcase">
        <div className={`call-showcase-cover cover-art ${coverClass(c.slug, c.category)}`} aria-hidden="true">
          <span className="cover-status">{effectiveStatus(c)}</span>
          <span className="cover-type">{c.fixture ? 'Fixture' : c.category.replace('-', ' ')}</span>
        </div>
        <header className="call-header">
          <p className="eyebrow">
            {c.fixture ? 'Development fixture' : c.organizer} · {effectiveStatus(c)}
          </p>
          <h1 className="call-title">{c.title}</h1>
          <p className="call-description">{c.description}</p>
          {c.fixture && <p className="notice">Fictional testing data. This is not an actual call and does not accept submissions.</p>}
          <div className="call-primary-action">
            <Link className="button" href={'/check/' + c.slug}>
              Check my project
            </Link>
            <ApplicationLink className="button secondary" href={c.official_url} slug={c.slug} fixture={c.fixture}>
              {c.fixture ? 'Fixture guidelines' : 'Official guidelines'}
            </ApplicationLink>
          </div>
        </header>
      </div>

      <div className="call-layout">
        <div className="call-main">
          <h2 className="section-title">Published requirements</h2>
          <ol className="requirement-sequence">
            {c.requirements.map((r, index) => (
              <li key={r.id}>
                <article className="requirement">
                  <p className="requirement-meta">
                    <span className="requirement-index">{String(index + 1).padStart(2, '0')}</span>
                    {r.roles.length ? r.roles.join(' / ') : 'All applicants'}
                    {r.formats.length ? ` · ${r.formats.join(' / ')}` : ''}
                  </p>
                  <h3>{r.wording}</h3>
                  <a href={r.source_url}>{c.fixture ? 'Development source' : r.source_reference}</a>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <aside className="call-sidebar">
          <h2 className="section-title">Before you submit</h2>
          <dl className="facts">
            <div>
              <dt>Deadline</dt>
              <dd>
                {c.deadline ? verificationLabel(c.deadline) : UNKNOWN}
                {c.deadline_timezone && ` · ${c.deadline_timezone}`}
              </dd>
            </div>
            <div>
              <dt>Payment</dt>
              <dd>{c.compensation || 'Payment not disclosed; confirm with organizer.'}</dd>
            </div>
            <div>
              <dt>Copyright & licensing</dt>
              <dd>{c.rights_disclosure || UNKNOWN}</dd>
            </div>
            <div>
              <dt>Manually verified</dt>
              <dd>{verificationLabel(c.last_verified_at)}</dd>
            </div>
          </dl>
          <p className="fine-print">Apply through the organizer. ComicReady never accepts comic submissions.</p>
        </aside>
      </div>
    </section>
  );
}
