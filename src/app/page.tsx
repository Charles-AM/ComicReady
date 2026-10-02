import Link from 'next/link';
import { HeroTitle } from '@/components/hero-title';
import { heroTitleVariant } from '@/lib/hero-title-style';
import { HeroReadinessStack } from '@/components/hero-readiness-stack';
import { HomeCatalogPeek } from '@/components/home-catalog-peek';
import { getOpportunities } from '@/lib/opportunities';
import { effectiveStatus } from '@/lib/model';

export const revalidate = 3600;

const steps = [
  {
    label: 'Pick a call',
    title: 'Read between the guidelines.',
    text: 'Open a short-comic or anthology listing. Payment, rights, deadlines, and the link to the real call sit on one page—no hunting through PDFs.',
  },
  {
    label: 'Answer plainly',
    title: 'Find out where you stand.',
    text: 'Tell us your role, format, and what you have ready. You’ll see what matches the rules, what you still need to prep, and what only the organizer can answer.',
  },
  {
    label: 'Leave prepared',
    title: 'Take a checklist with you.',
    text: 'Print it, scribble on it, then finish on the organizer’s site when you’re ready. Nothing to upload here, and no account to create.',
  },
];

export default async function Home() {
  const opportunities = await getOpportunities();
  const availableCalls = opportunities.filter((call) => {
    const status = effectiveStatus(call);
    return !call.fixture && (status === 'open' || status === 'rolling');
  });
  const catalogCalls = availableCalls.slice(0, 6);
  const availableCallCount = availableCalls.length;

  return (
    <>
      <section className="home-hero home-hero--catalog" aria-labelledby="hero-title">
        <div className="home-hero-catalog-layout">
          <div className="home-hero-main">
            <HeroTitle variant={heroTitleVariant} />
            <p className="lede home-hero-lede">
              You’ve got a story. Before you pitch it, see what the call actually asks for—a straight read of the guidelines and a short list of what’s still open.
            </p>
            <Link className="button button-accent" href="/opportunities">
              Browse {availableCallCount} {availableCallCount === 1 ? 'open call' : 'open calls'}
            </Link>
            <p className="fine-print">Currently accepting submissions · Source-linked listings · No creator account</p>
          </div>
          <HeroReadinessStack />
        </div>
      </section>

      <HomeCatalogPeek calls={catalogCalls} availableCallCount={availableCallCount} />

      <section className="workflow-band" id="how-it-works" aria-labelledby="workflow-title">
        <div className="workflow-band-inner">
          <header className="workflow-band-header">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 id="workflow-title" className="section-title">
                Less guesswork. More getting it together.
              </h2>
            </div>
            <p className="workflow-band-lede">
              Three steps, same every time: read the call, compare your project, walk away with a to-do list. We’re not grading your comic, and this isn’t where
              you hit submit.
            </p>
          </header>
          <ol className="workflow-panels">
            {steps.map((step, index) => (
              <li key={step.label}>
                <article className="workflow-panel">
                  <p className="workflow-panel-tag">
                    Step {index + 1} · {step.label}
                  </p>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="standards-section" id="standards" aria-labelledby="standards-title">
        <div className="standards-layout">
          <header className="standards-header">
            <p className="eyebrow">Standards</p>
            <h2 id="standards-title" className="section-title">
              The source gets the final word.
            </h2>
            <p className="standards-lede">
              When we cite a rule, it goes back to the organizer’s page. If the guidelines go quiet on something, we leave it blank instead of guessing. Think
              of the check as prep for your application—not a promise you’ll get in, and not legal advice.
            </p>
          </header>
          <div className="standards-body">
            <ul className="standards-list">
              <li>Requirements link to the wording the organizer published.</li>
              <li>Open questions stay open until you hear back from them.</li>
              <li>We’re looking at eligibility and paperwork—not a jury on your story.</li>
            </ul>
            <p className="standards-preview">
              Early build: a small set of manually reviewed calls in the catalog, original art on the home page (not someone’s submission), and checks that stick to
              what’s written in the guidelines.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
