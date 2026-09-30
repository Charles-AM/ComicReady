import { getOpportunities } from '@/lib/opportunities';
import { OpportunityList } from '@/components/opportunity-list';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Submission calls' };

export default async function Opportunities() {
  return (
    <section className="page-section layout-catalog">
      <header className="catalog-page-head">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="page-title" id="catalog-title">
            Submission calls
          </h1>
        </div>
        <p className="catalog-hero-copy">
          English-language short comics and anthologies. Read the source, check your project, and see what to prepare. Verification reflects a reading of public
          guidelines, not confirmation that the organizer is still responding.
        </p>
      </header>
      <OpportunityList calls={await getOpportunities()} />
    </section>
  );
}
