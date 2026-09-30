import Link from 'next/link';
import { effectiveStatus, verificationLabel, type Opportunity } from '@/lib/model';

export function coverClass(slug: string, category: string) {
  const bucket = slug.split('').reduce((n, c) => n + c.charCodeAt(0), 0) % 4;
  return `cover-tone-${category === 'anthology' ? 'anthology' : 'short'}-${bucket}`;
}

export function OpportunityCoverCard({ call, compactMeta = false }: { call: Opportunity; compactMeta?: boolean }) {
  const deadlineLine = call.deadline
    ? compactMeta
      ? 'Deadline listed'
      : verificationLabel(call.deadline)
    : call.status === 'rolling'
      ? 'Rolling submissions'
      : 'Deadline not published';

  return (
    <article className="cover-card">
      <Link href={'/opportunities/' + call.slug} className="cover-card-link">
        <div className={`cover-art ${coverClass(call.slug, call.category)}`}>
          <span className="cover-status">{effectiveStatus(call)}</span>
          <span className="cover-type">{call.fixture ? 'Fixture' : call.category.replace('-', ' ')}</span>
        </div>
        <div className="cover-info">
          <p className="cover-organizer">{call.organizer}</p>
          <h2 className="cover-title">{call.title}</h2>
          <p className="cover-meta">
            {deadlineLine}
            {' · '}
            {call.compensation ? 'Payment listed' : 'Payment not disclosed'}
          </p>
        </div>
      </Link>
    </article>
  );
}
