import Link from 'next/link';
import { CallCoverSurface } from '@/components/call-cover-surface';
import { verificationLabel, type Opportunity } from '@/lib/model';

export function OpportunityCoverCard({ call, compactMeta = false }: { call: Opportunity; compactMeta?: boolean }) {
  const deadlineLine = call.deadline
    ? compactMeta
      ? 'Deadline listed'
      : verificationLabel(call.deadline)
    : call.deadline_note
      ? compactMeta
        ? 'Deadline listed'
        : call.deadline_note
    : call.status === 'rolling'
      ? 'Rolling submissions'
      : 'Deadline not published';

  return (
    <article className="cover-card">
      <Link href={'/opportunities/' + call.slug} className="cover-card-link">
        <CallCoverSurface call={call} />
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
