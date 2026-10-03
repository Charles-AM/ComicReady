import { configured } from '@/lib/supabase/server';
import { getOpportunities } from '@/lib/opportunities';
import { CorrectionForm } from '@/components/correction-form';
import { PageHeader } from '@/components/page-header';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Contact and corrections',
  description: 'Report an outdated deadline, incorrect requirement, broken source, or other catalog problem to the ComicReady editorial queue.',
  alternates: { canonical: '/contact' },
};

export default async function Contact() {
  const calls = await getOpportunities();

  return (
    <section className="page-section layout-reading">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact and corrections' }]} />
      <PageHeader
        eyebrow="Keep the guidelines accurate"
        title="Something changed?"
        intro="Report an incorrect requirement, outdated deadline, or source problem. ComicReady cannot answer for an organizer or accept comic submissions."
      />
      {configured() ? (
        <CorrectionForm calls={calls.filter((c) => !c.fixture).map((c) => ({ slug: c.slug, title: c.title }))} />
      ) : (
        <p className="notice">
          The private correction inbox is not connected in this preview. Connect Supabase to enable correction reports.
        </p>
      )}
    </section>
  );
}
