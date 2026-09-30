import type { CSSProperties } from 'react';
import {
  accentForSlug,
  callInitials,
  catalogPreviewStyle,
  categoryLabel,
  type CatalogPreviewStyle,
} from '@/lib/cover-theme';
import { effectiveStatus, type Opportunity } from '@/lib/model';

type CallCoverSurfaceProps = {
  call: Pick<Opportunity, 'slug' | 'category' | 'title' | 'organizer' | 'fixture'>;
  statusLabel?: string;
  className?: string;
  style?: CatalogPreviewStyle;
};

export function CallCoverSurface({ call, statusLabel, className = '', style = catalogPreviewStyle }: CallCoverSurfaceProps) {
  const status = statusLabel ?? effectiveStatus(call as Opportunity);
  const accent = accentForSlug(call.slug);
  const initials = call.fixture ? '—' : callInitials(call.organizer, call.title, call.slug);
  const type = categoryLabel(call.category, call.fixture);

  const css = { '--cover-accent': accent } as CSSProperties;

  return (
    <div
      className={`cover-art cover-art-preview-${style} ${call.fixture ? 'cover-art--fixture' : ''} ${className}`.trim()}
      style={css}
      data-preview-style={style}
    >
      {style === 'initials' && (
        <p className="cover-preview-initials" aria-hidden="true">
          {initials}
        </p>
      )}
      {style === 'category' && (
        <p className="cover-preview-category" aria-hidden="true">
          {type}
        </p>
      )}
      {style === 'label' && (
        <p className="cover-preview-label">{call.fixture ? 'Practice fixture' : call.organizer}</p>
      )}

      <div className="cover-art-labels">
        <span className="cover-status">{status}</span>
        {style !== 'category' && <span className="cover-type">{type}</span>}
      </div>
    </div>
  );
}
