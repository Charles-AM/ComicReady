import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { StructuredData } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn who maintains ComicReady, how submission calls are reviewed, and what the checker can and cannot tell comic creators.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <section className="page-section layout-reading">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About ComicReady',
          url: 'https://comicready.com/about',
          mainEntity: {
            '@type': 'Person',
            name: 'Charles Appiah Manu Jnr',
            url: 'https://comicready.com/about',
          },
        }}
      />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      <PageHeader
        eyebrow="About ComicReady"
        title="Built for a clearer submission process."
        intro="ComicReady turns an organizer’s published guidelines into a source-linked project check and preparation list."
      />
      <h2 className="reading-heading">Who maintains it</h2>
      <p>
        ComicReady was created and is maintained by <strong>Charles Appiah Manu Jnr</strong>. Charles reviews opportunity records against organizers’ public
        pages, maintains the checker’s rules, and records when each listing was last verified.
      </p>
      <h2 className="reading-heading">How calls are reviewed</h2>
      <p>
        Each published requirement links to the organizer’s source. Deadlines, payment disclosures, rights language, role restrictions, and required materials
        are recorded only when the public guidelines support them. Missing or unclear information stays marked for confirmation with the organizer.
      </p>
      <h2 className="reading-heading">What the result means</h2>
      <p>
        A ComicReady result is preparation guidance based on published requirements. It is not an acceptance decision or legal advice. Creators should always
        recheck the organizer’s page before submitting.
      </p>
      <p>
        <Link href="/opportunities">Browse current submission calls</Link> or <Link href="/contact">report a correction</Link>.
      </p>
    </section>
  );
}
