'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { Storyboard } from '@/components/storyboard';
import { PrintMarks } from '@/components/print-marks';

export function ComicHero({ children }: { children: ReactNode }) {
  return (
    <section className="hero-spread" aria-labelledby="hero-title">
      <PrintMarks />
      <div className="hero-spread-inner">
        <div className="hero-sheet">{children}</div>
        <aside className="hero-visual">
          <Storyboard />
          <figure className="art-clipping">
            <div className="art-clipping-frame">
              <Image
                src="/art/comic-world-v1.png"
                alt=""
                width={420}
                height={280}
                className="art-clipping-image"
                sizes="(max-width: 800px) 60vw, 280px"
              />
            </div>
            <figcaption>Decorative proof art — not a sample submission.</figcaption>
          </figure>
        </aside>
      </div>
    </section>
  );
}
