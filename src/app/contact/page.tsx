import { configured } from '@/lib/supabase/server';
import { getOpportunities } from '@/lib/opportunities';
import { CorrectionForm } from '@/components/correction-form';
import { PageHeader } from '@/components/page-header';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Contact & corrections' };

export default async function Contact() {
  const calls = await getOpportunities();

  return (
    <section className="page-section layout-reading">
      <PageHeader
        eyebrow="Keep the guidelines accurate"
        title="Something changed?"
        intro="Report an incorrect requirement, outdated deadline, or source problem. ComicReady cannot answer for an organizer or accept comic submissions."
      />
      {configured() ? (
        <CorrectionForm calls={calls.filter((c) => !c.fixture).map((c) => ({ slug: c.slug, title: c.title }))} />
      ) : (
        <p className="notice">
          The private correction inbox is not connected in this preview.{' '}
          <a href="https://github.com/Charles-AM/ComicReady/issues/new">Report a correction on GitHub</a>. GitHub issues are public; do not include unpublished
          work or private information.
        </p>
      )}
    </section>
  );
}
