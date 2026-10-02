'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Opportunity } from '@/lib/model';
import { OpportunityCoverCard } from '@/components/opportunity-cover';

function ArrowIcon({ direction }: { direction: 'previous' | 'next' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20">
      <path d={direction === 'previous' ? 'M12.5 4.5 7 10l5.5 5.5' : 'M7.5 4.5 13 10l-5.5 5.5'} />
    </svg>
  );
}

export function HomeCatalogPeek({ calls, availableCallCount }: { calls: Opportunity[]; availableCallCount: number }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canGoPrevious, setCanGoPrevious] = useState(false);
  const [canGoNext, setCanGoNext] = useState(calls.length > 1);

  const updateRailState = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
    setCanGoPrevious(rail.scrollLeft > 2);
    setCanGoNext(rail.scrollLeft < maxScroll - 2);

    const cards = Array.from(rail.children) as HTMLElement[];
    const nearestIndex = cards.reduce((nearest, card, index) => {
      const nearestDistance = Math.abs(cards[nearest].offsetLeft - rail.scrollLeft);
      const cardDistance = Math.abs(card.offsetLeft - rail.scrollLeft);
      return cardDistance < nearestDistance ? index : nearest;
    }, 0);
    setActiveIndex(nearestIndex);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    updateRailState();
    const observer = new ResizeObserver(updateRailState);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [updateRailState]);

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    const firstCard = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !firstCard) return;

    const railStyle = getComputedStyle(rail);
    const gap = Number.parseFloat(railStyle.columnGap || railStyle.gap) || 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  if (!calls.length) return null;

  return (
    <section className="home-catalog-peek" aria-labelledby="home-catalog-title">
      <div className="home-catalog-peek-head">
        <div className="home-catalog-peek-intro">
          <p className="eyebrow">
            Six selected · {availableCallCount} {availableCallCount === 1 ? 'call' : 'calls'} accepting submissions
          </p>
          <h2 id="home-catalog-title" className="section-title">
            Real calls, linked to the source.
          </h2>
        </div>
        <div className="cover-rail-tools">
          <p className="cover-rail-count" aria-hidden="true">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="cover-rail-count-rule" />
            <span>{String(calls.length).padStart(2, '0')}</span>
          </p>
          <div className="cover-rail-buttons">
            <button type="button" className="cover-rail-button" aria-label="Show previous submission call" disabled={!canGoPrevious} onClick={() => moveRail(-1)}>
              <ArrowIcon direction="previous" />
            </button>
            <button type="button" className="cover-rail-button" aria-label="Show next submission call" disabled={!canGoNext} onClick={() => moveRail(1)}>
              <ArrowIcon direction="next" />
            </button>
          </div>
          <Link className="text-link home-catalog-peek-link" href="/opportunities">
            Browse all calls
          </Link>
        </div>
      </div>
      <div className="cover-rail-wrap" data-at-end={!canGoNext}>
        <ul ref={railRef} className="cover-grid cover-grid--rail home-catalog-peek-grid" aria-label="Six featured submission calls" onScroll={updateRailState}>
          {calls.map((call, index) => (
            <li key={call.id} className="cover-rail-item">
              <p className="cover-rail-folio" aria-hidden="true">
                <span>Call</span>
                {String(index + 1).padStart(2, '0')}
              </p>
              <OpportunityCoverCard call={call} compactMeta />
            </li>
          ))}
        </ul>
        <p className="cover-rail-hint">
          <span aria-hidden="true">↔</span> Drag, scroll or use the arrows to browse
        </p>
      </div>
    </section>
  );
}
