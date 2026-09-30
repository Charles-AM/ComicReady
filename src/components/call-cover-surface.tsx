import { CallCoverArt } from '@/components/call-cover-art';
import { effectiveStatus, type Opportunity } from '@/lib/model';

type CallCoverSurfaceProps = {
  call: Pick<Opportunity, 'slug' | 'category' | 'title' | 'fixture'>;
  statusLabel?: string;
  className?: string;
};

export function CallCoverSurface({ call, statusLabel, className = '' }: CallCoverSurfaceProps) {
  const status = statusLabel ?? effectiveStatus(call as Opportunity);

  return (
    <div className={`cover-art cover-art--comic ${className}`.trim()}>
      <div className="cover-art-preview">
        <CallCoverArt slug={call.slug} category={call.category} title={call.title} fixture={call.fixture} />
      </div>
      <div className="cover-art-shade" aria-hidden />
      <div className="cover-art-labels">
        <span className="cover-status">{status}</span>
        <span className="cover-type">{call.fixture ? 'Fixture' : call.category.replace('-', ' ')}</span>
      </div>
    </div>
  );
}
