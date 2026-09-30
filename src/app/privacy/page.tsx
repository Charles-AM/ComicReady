import Link from 'next/link';
import { MeasurementPreference } from '@/components/measurement-preference';
import { PageHeader } from '@/components/page-header';

export const metadata = { title: 'Privacy' };

export default function Privacy() {
  return (
    <section className="page-section layout-reading">
      <PageHeader eyebrow="Last updated 30 September 2026" title="Your project stays yours." />
      <h2 className="reading-heading">Project facts and checklist</h2>
      <p>
        Project answers and checklist progress are stored in this browser’s local storage. They are not sent to ComicReady’s server. No files or story text are
        requested. Use “Remove saved project facts” on a result page, or clear this site’s browser data, to remove local answers.
      </p>
      <h2 className="reading-heading">Usage counts</h2>
      <p>
        When the database is connected, ComicReady counts call views, checks started/completed, print-dialog requests, official application-link clicks, and
        corrections. Browser events contain only an event name and a public call slug. The app stores daily totals, not visitor IDs, project answers, IP
        addresses, or browsing histories.
      </p>
      <MeasurementPreference />
      <h2 className="reading-heading">Corrections and admin access</h2>
      <p>
        Submitted correction text is stored privately for admin review. Do not send story details or sensitive information. Supabase handles private admin
        authentication and session cookies. Public visitors do not need an account.
      </p>
      <h2 className="reading-heading">Hosting and external sites</h2>
      <p>
        The hosting provider and Supabase may keep their own operational/security logs. Official organizer links take you to independently operated sites with
        their own policies.
      </p>
      <p>
        <Link href="/contact">Contact / corrections</Link>
      </p>
    </section>
  );
}
