import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Read the scope and limitations of ComicReady’s source-linked comic submission readiness guidance.',
  alternates: { canonical: '/terms' },
};

export default function Terms() {
  return (
    <section className="page-section layout-reading">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms' }]} />
      <PageHeader
        eyebrow="Last updated 30 September 2026"
        title={
          <>
            A second look.
            <br />
            Not a promise.
          </>
        }
      />
      <p>
        ComicReady helps compare your stated project facts with reviewed public requirements. It does not predict acceptance, review artistic quality, provide
        legal advice, or act for an organizer.
      </p>
      <p>
        Guidelines may change after verification. Check the official source before preparing or submitting work. Missing or ambiguous information remains unknown.
      </p>
      <p>
        Applications belong on the organizer’s own site or through its stated contact method. ComicReady does not accept submissions, store comic files, or claim
        rights in your project.
      </p>
      <p>
        If you find an error, <Link href="/contact">send a correction</Link>. Read the <Link href="/privacy">privacy page</Link> for how local progress and
        optional usage counts work.
      </p>
    </section>
  );
}
