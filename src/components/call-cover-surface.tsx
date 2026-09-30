import type { CSSProperties } from 'react';
import { callInitials, paletteForSlug } from '@/lib/cover-theme';
import { effectiveStatus, type Opportunity } from '@/lib/model';

type CallCoverSurfaceProps = {
  call: Pick<Opportunity, 'slug' | 'category' | 'title' | 'organizer' | 'fixture'>;
  statusLabel?: string;
  className?: string;
};

export function CallCoverSurface({ call, statusLabel, className = '' }: CallCoverSurfaceProps) {
  const status = statusLabel ?? effectiveStatus(call as Opportunity);
  const [g0, g1, g2] = paletteForSlug(call.slug);
  const initials = call.fixture ? '—' : callInitials(call.organizer, call.title, call.slug);

  return (
    <div
      className={`cover-art cover-art-placard ${call.fixture ? 'cover-art-placard--fixture' : ''} ${className}`.trim()}
      style={
        {
          '--cover-g0': g0,
          '--cover-g1': g1,
          '--cover-g2': g2,
        } as CSSProperties
      }
    >
      <div className="cover-art-preview cover-art-gradient" aria-hidden />
      <p className="cover-initials" aria-hidden="true">
        {initials}
      </p>
      <div className="cover-art-labels">
        <span className="cover-status">{status}</span>
        <span className="cover-type">{call.fixture ? 'Fixture' : call.category.replace('-', ' ')}</span>
      </div>
    </div>
  );
}
