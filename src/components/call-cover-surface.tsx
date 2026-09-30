import type { CSSProperties } from 'react';
import { CatalogIcon } from './catalog-icon';
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

function CategoryPreviewCopy({ category, fixture }: { category: string; fixture?: boolean }) {
  if (fixture) {
    return (
      <>
        <span className="cover-category-line">Practice</span>
        <span className="cover-category-line cover-category-line-muted">fixture</span>
      </>
    );
  }
  if (category === 'short-comic') {
    return (
      <>
        <span className="cover-category-line">Short</span>
        <span className="cover-category-line">comic</span>
      </>
    );
  }
  return <span className="cover-category-line cover-category-line-single">Anthology</span>;
}

export function CallCoverSurface({ call, statusLabel, className = '', style = catalogPreviewStyle }: CallCoverSurfaceProps) {
  const status = statusLabel ?? effectiveStatus(call as Opportunity);
  const accent = accentForSlug(call.slug);
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
          {call.fixture ? '—' : callInitials(call.organizer, call.title, call.slug)}
        </p>
      )}
      {style === 'category' && (
        <div className="cover-preview-category" aria-hidden="true">
          <CatalogIcon category={call.category} />
          <CategoryPreviewCopy category={call.category} fixture={call.fixture} />
          <span className="cover-category-rule" />
        </div>
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
