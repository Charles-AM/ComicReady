import Link from 'next/link';
import { EventMarker, ApplicationLink } from '@/components/event-marker';
import { notFound } from 'next/navigation';
import { getOpportunity } from '@/lib/opportunities';
import { CallCoverSurface } from '@/components/call-cover-surface';
import { deadlineLabel, effectiveStatus, verificationLabel, UNKNOWN } from '@/lib/model';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { StructuredData } from '@/components/structured-data';
import { metaDescription } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = await getOpportunity((await params).slug);
  if (!c) return { title: 'Submission call not found' };
  const description = metaDescription(`${c.organizer}: ${c.description}`);
  return {
    title: c.title,
    description,
    alternates: { canonical: `/opportunities/${c.slug}` },
    openGraph: { type: 'article', url: `/opportunities/${c.slug}`, title: c.title, description },
  };
}

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const c = await getOpportunity((await params).slug);
  if (!c) notFound();

  return (
    <section className="page-section layout-call">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: c.title,
          description: c.description,
          url: `https://comicready.com/opportunities/${c.slug}`,
          dateModified: c.last_verified_at,
          author: { '@type': 'Organization', name: 'V Builders', url: 'https://comicready.com/about' },
          publisher: { '@type': 'Organization', name: 'ComicReady', url: 'https://comicready.com/' },
          about: { '@type': 'CreativeWork', name: `${c.organizer} submission call` },
        }}
      />
      <EventMarker event="opportunity_viewed" slug={c.slug} enabled={!c.fixture} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Submission calls', href: '/opportunities' }, { label: c.title }]} />

      <div className="call-showcase">
        <CallCoverSurface call={c} className="call-showcase-cover" />
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
                {c.deadline || c.deadline_note || c.status === 'rolling' ? deadlineLabel(c) : UNKNOWN}
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
