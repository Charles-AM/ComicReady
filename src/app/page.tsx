import Link from 'next/link';
import { HeroTitle } from '@/components/hero-title';
import { heroTitleVariant } from '@/lib/hero-title-style';
import { HeroReadinessStack } from '@/components/hero-readiness-stack';
import { HomeCatalogPeek } from '@/components/home-catalog-peek';
import { getOpportunities } from '@/lib/opportunities';
import { effectiveStatus } from '@/lib/model';
import type { Metadata } from 'next';
import { StructuredData } from '@/components/structured-data';

// Keep the public count and featured calls close to the reviewed catalog state.
// This page remains cached for performance, but refreshes soon after an admin
// publishes or closes an opportunity.
export const revalidate = 60;
export const metadata: Metadata = {
  title: 'Comic submission calls and readiness checks',
  description: 'Find verified comic submission calls, compare your project with published requirements, and leave with a source-linked preparation checklist.',
  alternates: { canonical: '/' },
};

const steps = [
  {
    label: 'Choose a call',
    title: 'Read the published details.',
    text: 'Review the deadline, payment disclosure, rights terms, eligibility rules, and the organizer’s official source in one place.',
  },
  {
    label: 'Describe your project',
    title: 'Compare it with the requirements.',
    text: 'Answer only the questions relevant to the call. The checker keeps unknown answers separate from passes and failures.',
  },
  {
    label: 'Prepare the submission',
    title: 'Work through a practical checklist.',
    text: 'Mark items complete, print the result, and submit through the organizer when you are ready. ComicReady does not collect your files.',
  },
];

const faqs = [
  {
    question: 'Does ComicReady guarantee that my comic will be accepted?',
    answer: 'No. ComicReady compares your answers with requirements published by the organizer. It cannot predict an editorial decision or provide legal advice.',
  },
  {
    question: 'Where do the eligibility rules come from?',
    answer: 'Every displayed requirement links to the organizer’s official source. Each listing also shows when the guidelines were last manually verified.',
  },
  {
    question: 'What happens when a guideline is unclear?',
    answer: 'The checker reports that it cannot determine the answer from published guidelines and tells you to confirm the point with the organizer.',
  },
  {
    question: 'Does ComicReady store my comic or project answers?',
    answer: 'No comic files are uploaded. Project answers and checklist progress stay in local browser storage on the device you use.',
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
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }}
      />
      <section className="home-hero home-hero--catalog" aria-labelledby="hero-title">
        <div className="home-hero-catalog-layout">
          <div className="home-hero-main">
            <HeroTitle variant={heroTitleVariant} />
            <p className="lede home-hero-lede">
              Compare your comic project with a call’s published requirements. See what matches, what you need to prepare, and what the organizer has not made clear.
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
                From published guidelines to a practical checklist.
              </h2>
            </div>
            <p className="workflow-band-lede">
              Review the call, compare your project, and leave with a list you can act on. The organizer still makes every submission decision.
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
              Every rule links to the organizer’s page. If the guidelines do not answer a question, the result says so instead of guessing. The check is
              preparation guidance, not an acceptance promise or legal advice.
            </p>
          </header>
          <div className="standards-body">
            <ul className="standards-list">
              <li>Requirements link to the wording the organizer published.</li>
              <li>Open questions stay open until you hear back from them.</li>
              <li>We’re looking at eligibility and paperwork—not a jury on your story.</li>
            </ul>
            <p className="standards-preview">
              Catalog records are reviewed by hand. The checker uses structured rules from those records and never evaluates artistic quality.
            </p>
          </div>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <header className="faq-header">
          <p className="eyebrow">Questions creators ask</p>
          <h2 id="faq-title" className="section-title">How ComicReady works</h2>
        </header>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="faq-more">More detail is available on the <Link href="/about">About page</Link> and in the <Link href="/privacy">privacy explanation</Link>.</p>
      </section>
    </>
  );
}
