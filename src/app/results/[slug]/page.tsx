import { notFound } from 'next/navigation';
import { getOpportunity } from '@/lib/opportunities';
import { SavedResults } from '@/components/saved-results';

export const dynamic = 'force-dynamic';

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
