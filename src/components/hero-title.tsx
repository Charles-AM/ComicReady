import { BrandMark } from '@/components/brand-mark';
import type { HeroTitleVariant } from '@/lib/hero-title-style';

type HeroTitleProps = {
  variant: HeroTitleVariant;
  id?: string;
  className?: string;
};

export function HeroTitle({ variant, id = 'hero-title', className = '' }: HeroTitleProps) {
  const root = `hero-title hero-title--${variant} ${className}`.trim();

  switch (variant) {
    case 'editorial':
      return (
        <h1 id={id} className={root} aria-label="Comic Ready">
          Comic Ready
        </h1>
      );
    case 'lockup':
      return (
        <h1 id={id} className={root} aria-label="Comic Ready">
          <BrandMark className="hero-title-mark" aria-hidden />
          <span className="hero-title-lockup-text brand-lockup-text">Comic Ready</span>
        </h1>
      );
    case 'tagline':
      return (
        <div className={root}>
          <p className="eyebrow hero-title-eyebrow">Before you submit</p>
          <h1 id={id} className="page-title hero-title-tagline">
            Make your next move.
          </h1>
        </div>
      );
    case 'ready-focus':
      return (
        <h1 id={id} className={root} aria-label="Comic Ready">
          <span className="hero-title-kicker">Comic</span>
          <span className="hero-title-ready">Ready</span>
        </h1>
      );
    case 'stacked-serif':
      return (
        <h1 id={id} className={root} aria-label="Comic Ready">
          <span className="hero-title-stack-line">Comic</span>
          <span className="hero-title-stack-line">Ready</span>
        </h1>
      );
    case 'uppercase-tracked':
      return (
        <h1 id={id} className={root} aria-label="Comic Ready">
          Comic Ready
        </h1>
      );
  }
}
