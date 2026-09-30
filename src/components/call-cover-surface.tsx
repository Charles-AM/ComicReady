import { CallCoverArt } from '@/components/call-cover-art';
import { coverClass } from '@/components/opportunity-cover';
import { effectiveStatus, type Opportunity } from '@/lib/model';

type CallCoverSurfaceProps = {
  call: Pick<Opportunity, 'slug' | 'category' | 'fixture'>;
  statusLabel?: string;
  className?: string;
};

export function CallCoverSurface({ call, statusLabel, className = '' }: CallCoverSurfaceProps) {
  const status = statusLabel ?? effectiveStatus(call as Opportunity);

  return (
    <div className={`cover-art ${coverClass(call.slug, call.category)} ${className}`.trim()}>
      <div className="cover-art-preview">
        <CallCoverArt slug={call.slug} category={call.category} fixture={call.fixture} />
      </div>
      <div className="cover-art-shade" aria-hidden />
      <div className="cover-art-grain" aria-hidden />
      <div className="cover-art-labels">
        <span className="cover-status">{status}</span>
        <span className="cover-type">{call.fixture ? 'Fixture' : call.category.replace('-', ' ')}</span>
      </div>
    </div>
  );
}
