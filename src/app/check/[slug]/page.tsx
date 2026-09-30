import { EventMarker } from '@/components/event-marker';
import { BackLink } from '@/components/back-link';
import { PageHeader } from '@/components/page-header';
import { notFound } from 'next/navigation';
import { getOpportunity } from '@/lib/opportunities';
import { ProjectForm } from '@/components/project-form';

export const dynamic = 'force-dynamic';

export default async function Check({ params }: { params: Promise<{ slug: string }> }) {
  const call = await getOpportunity((await params).slug);
  if (!call) notFound();

  return (
    <section className="page-section layout-form">
      <BackLink href={'/opportunities/' + call.slug}>{call.title}</BackLink>
      <PageHeader
        eyebrow={call.fixture ? 'Development fixture' : 'Project check'}
        title={
          <>
            Tell us what’s
            <br />
            on your desk.
          </>
        }
        intro={`For ${call.title}. Only questions connected to this call’s reviewed rules appear.`}
      />
      <EventMarker event="fit_check_started" slug={call.slug} enabled={!call.fixture} />
      <ProjectForm call={call} />
    </section>
  );
}
