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
          Short comics and anthologies in English. Open a call, skim the linked guidelines, run a quick check on your project, and see what you still need in
          hand. We read what’s public—we can’t tell you if someone’s inbox is open today.
        </p>
      </header>
      <OpportunityList calls={await getOpportunities()} />
    </section>
  );
}
