import type { ReactNode } from 'react';
import { Storyboard } from '@/components/storyboard';

/** Home hero: copy and original storyboard art share the fold; no motion or full-bleed wallpaper. */
export function ComicHero({ children }: { children: ReactNode }) {
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="home-hero-copy">{children}</div>
      <div className="home-hero-art">
        <Storyboard />
      </div>
    </section>
  );
}
