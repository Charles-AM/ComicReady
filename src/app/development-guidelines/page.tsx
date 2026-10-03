import Link from 'next/link';
import { developmentCall } from '@/lib/catalog';
import { PageHeader } from '@/components/page-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Development fixture guidelines',
  description: 'Fictional ComicReady guidelines used only to test the project checker during development.',
};

export default function Guidelines() {
  return (
    <section className="page-section layout-reading">
      <PageHeader eyebrow="Testing only — not an official call" title="Practice guidelines." intro="This fictional source exists solely to demonstrate the checker. Do not submit work." />
      <ol className="reading-list">
        {developmentCall.requirements.map((r) => (
          <li key={r.id}>{r.wording}</li>
        ))}
      </ol>
      <p>No payment or licensing details are defined in this fixture. Those findings must remain unknown.</p>
      <Link href="/opportunities">Back to calls</Link>
    </section>
  );
}
