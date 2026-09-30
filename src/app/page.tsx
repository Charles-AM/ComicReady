import Link from 'next/link';
import { Storyboard } from '@/components/storyboard';

const steps = [
  {
    label: 'Pick a call',
    title: 'Read between the guidelines.',
    text: 'Open a short-comic or anthology listing. Requirements, payment disclosure, rights wording, and the official source stay together.',
  },
  {
    label: 'Answer plainly',
    title: 'Find out where you stand.',
    text: 'Compare your format, role, and materials with what the organizer published. Eligibility, prep work, and open questions stay in separate lanes.',
  },
  {
    label: 'Leave prepared',
    title: 'Take a checklist with you.',
    text: 'Print it, mark it up, then continue on the organizer’s site when you are ready. No uploads. No creator account.',
  },
];

export default function Home() {
  return (
    <>
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="home-hero-grid">
          <div>
            <p className="eyebrow">Before you submit</p>
            <h1 id="hero-title" className="page-title hero-title">
              Make comics. Make your next move.
            </h1>
            <p className="lede">
              You’ve got a story. What does the submission call need? Turn the guidelines into a clear list of where you stand and what’s still missing.
            </p>
            <Link className="button" href="/opportunities">
              Browse submission calls
            </Link>
            <p className="fine-print">Source-linked listings · No creator account</p>
          </div>
          <div className="home-hero-art">
            <Storyboard />
          </div>
        </div>
      </section>

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
              <strong>Process</strong> is the path you walk for each call—three practical steps from reading the guidelines to a printable checklist. It is not
              a score and not a submission portal.
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
              <strong>Approach</strong> is how ComicReady handles evidence—what we link to, what we refuse to invent, and what a readiness check can and
              cannot promise.
            </p>
          </header>
          <div className="standards-body">
            <ul className="standards-list">
              <li>Every reviewed requirement links to the organizer’s published guidelines.</li>
              <li>Missing or ambiguous rules stay labeled as unknown—not guessed.</li>
              <li>Guidance is not acceptance, artistic judgment, or legal advice.</li>
            </ul>
            <p className="standards-preview">
              This site is a development preview: a small catalog, original homepage illustration (not a sample submission), and checks that run against
              stated requirements only.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
