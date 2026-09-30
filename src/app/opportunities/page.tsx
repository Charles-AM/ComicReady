import { getOpportunities } from '@/lib/opportunities';
import { OpportunityList } from '@/components/opportunity-list';
import { PageHeader } from '@/components/page-header';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Submission calls' };

export default async function Opportunities() {
  return (
    <section className="page-section layout-catalog">
      <PageHeader
        eyebrow="Submission calls"
        title={
          <>
            Small list.
            <br />
            Clear requirements.
          </>
        }
        intro="English-language short comics and anthologies. Read the source, check your project, and see what to prepare."
      />
      <p className="notice layout-catalog-notice">
        A deliberately small catalog. Verification reflects a reading of public guidelines, not confirmation that the organizer is still responding.
      </p>
      <OpportunityList calls={await getOpportunities()} />
    </section>
  );
}
