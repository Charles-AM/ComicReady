import Link from 'next/link';
import type { Opportunity } from '@/lib/model';
import { OpportunityCoverCard } from '@/components/opportunity-cover';

export function HomeCatalogPeek({ calls }: { calls: Opportunity[] }) {
  if (!calls.length) return null;

  return (
    <section className="home-catalog-peek" aria-labelledby="home-catalog-title">
      <div className="home-catalog-peek-head">
        <div>
          <p className="eyebrow">In the catalog</p>
          <h2 id="home-catalog-title" className="section-title">
            Real calls, linked to the source.
          </h2>
        </div>
        <Link className="text-link home-catalog-peek-link" href="/opportunities">
          Browse all calls
        </Link>
      </div>
      <div className="cover-rail-wrap">
        <ul className="cover-grid cover-grid--rail home-catalog-peek-grid">
          {calls.map((call) => (
            <li key={call.id}>
              <OpportunityCoverCard call={call} compactMeta />
            </li>
          ))}
        </ul>
        <p className="cover-rail-hint" aria-hidden="true">
          Swipe to browse
        </p>
      </div>
    </section>
  );
}
