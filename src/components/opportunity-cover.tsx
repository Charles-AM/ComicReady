import Link from 'next/link';
import { CallCoverSurface } from '@/components/call-cover-surface';
import { isClosingSoon, isRecentlyVerified, paymentLabel } from '@/lib/catalog-discovery';
import { deadlineLabel, type Opportunity } from '@/lib/model';

type OpportunityCoverCardProps = {
  call: Opportunity;
  compactMeta?: boolean;
  saved?: boolean;
  compared?: boolean;
  compareDisabled?: boolean;
  onToggleSaved?: () => void;
  onToggleCompare?: () => void;
};

export function OpportunityCoverCard({ call, compactMeta = false, saved, compared, compareDisabled, onToggleSaved, onToggleCompare }: OpportunityCoverCardProps) {
  const deadlineLine = compactMeta && (call.deadline || call.deadline_note) ? 'Deadline listed' : deadlineLabel(call);

  return (
    <article className="cover-card">
      <Link href={'/opportunities/' + call.slug} className="cover-card-link">
        <CallCoverSurface call={call} />
        <div className="cover-info">
          {(onToggleSaved || onToggleCompare) && (isClosingSoon(call) || isRecentlyVerified(call)) && <p className="cover-signals">
            {isClosingSoon(call) && <span>Closing soon</span>}
            {isRecentlyVerified(call) && <span>Recently verified</span>}
          </p>}
          <p className="cover-organizer">{call.organizer}</p>
          <h2 className="cover-title">{call.title}</h2>
          <p className="cover-meta">
            {deadlineLine}
            {' · '}
            {paymentLabel(call)}
          </p>
        </div>
      </Link>
      {(onToggleSaved || onToggleCompare) && (
        <div className="cover-card-actions">
          {onToggleSaved && <button type="button" className="catalog-action" aria-pressed={saved} onClick={onToggleSaved}>{saved ? 'Saved' : 'Save'}</button>}
          {onToggleCompare && <button type="button" className="catalog-action" aria-pressed={compared} disabled={compareDisabled && !compared} onClick={onToggleCompare}>{compared ? 'Comparing' : 'Compare'}</button>}
        </div>
      )}
    </article>
  );
}
