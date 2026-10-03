import { notFound } from 'next/navigation';
import { getOpportunity } from '@/lib/opportunities';
import { SavedResults } from '@/components/saved-results';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const call = await getOpportunity((await params).slug);
  if (!call) return { title: 'Readiness result not found' };
  return {
    title: `Project readiness result for ${call.title}`,
    description: `Review your source-linked project findings and preparation checklist for ${call.title}.`,
    alternates: { canonical: `/results/${call.slug}` },
  };
}

async function evaluationTime() {
  return Date.now();
}

export default async function Results({ params }: { params: Promise<{ slug: string }> }) {
  const call = await getOpportunity((await params).slug);
  if (!call) notFound();

  return (
    <section className="page-section layout-report">
      <SavedResults call={call} now={await evaluationTime()} />
    </section>
  );
}
