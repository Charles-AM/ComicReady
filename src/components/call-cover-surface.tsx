import Image from 'next/image';
import { CallCoverArt } from '@/components/call-cover-art';
import { coverClass } from '@/components/opportunity-cover';
import { coverPreviewForSlug } from '@/lib/cover-previews';
import { effectiveStatus, type Opportunity } from '@/lib/model';

type CallCoverSurfaceProps = {
  call: Pick<Opportunity, 'slug' | 'category' | 'fixture'>;
  statusLabel?: string;
  className?: string;
};

export function CallCoverSurface({ call, statusLabel, className = '' }: CallCoverSurfaceProps) {
  const status = statusLabel ?? effectiveStatus(call as Opportunity);
  const previewSrc = call.fixture ? null : coverPreviewForSlug(call.slug);

  return (
    <div className={`cover-art ${coverClass(call.slug, call.category)} ${className}`.trim()}>
      <div className="cover-art-preview">
        {previewSrc ? (
          <Image
            src={previewSrc}
            alt=""
            fill
            className="cover-art-photo"
            sizes="(max-width: 768px) 42vw, 220px"
            priority={false}
          />
        ) : (
          <CallCoverArt slug={call.slug} category={call.category} fixture={call.fixture} />
        )}
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
