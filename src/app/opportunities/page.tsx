import { getOpportunities } from '@/lib/opportunities';
import { OpportunityList } from '@/components/opportunity-list';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Submission calls' };

export default async function Opportunities() {
  return (
    <section className="page-section layout-catalog">
      <header className="catalog-hero">
        <h1 className="mega-title" id="catalog-title">
          Calls
        </h1>
        <div className="catalog-hero-aside">
          <p className="catalog-hero-copy">
            English-language short comics and anthologies. Read the source, check your project, and see what to prepare. A deliberately small catalog—verification
            reflects a reading of public guidelines, not confirmation that the organizer is still responding.
          </p>
        </div>
      </header>
      <OpportunityList calls={await getOpportunities()} />
    </section>
  );
}
