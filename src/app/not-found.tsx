import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The ComicReady page or submission call you requested could not be found.',
};

export default function NotFound() {
  return (
    <section className="page-section layout-reading not-found-page">
      <p className="eyebrow">404</p>
      <h1 className="page-title">That page is not in the current issue.</h1>
      <p className="page-intro">The link may be outdated, or the submission call may no longer be published.</p>
      <div className="actions">
        <Link className="button" href="/opportunities">Browse current calls</Link>
        <Link className="button secondary" href="/">Go to the home page</Link>
      </div>
    </section>
  );
}
