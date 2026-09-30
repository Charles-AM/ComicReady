import Link from 'next/link';
import { ComicHero } from '@/components/comic-hero';

const steps = [
  {
    number: '01',
    label: 'The call',
    title: 'Read the guidelines like an editor.',
    text: 'Pick a short-comic or anthology listing. See requirements, payment disclosure, rights wording, and the official source in one place.',
    span: 'wide' as const,
  },
  {
    number: '02',
    label: 'Your project',
    title: 'Map facts to rules.',
    text: 'Compare format, role, and materials with what the organizer published. Keep eligibility, prep work, and open questions in separate lanes.',
    span: 'tall' as const,
  },
  {
    number: '03',
    label: 'Next move',
    title: 'Walk away with a checklist.',
    text: 'Print it, mark it up, then go to the organizer’s site when you are ready. No uploads. No creator account.',
    span: 'wide' as const,
  },
];

export default function Home() {
  return (
    <>
      <div className="issue-line">
        <span>Independent comic submission readiness</span>
        <span>Sheet 01 · working proof</span>
      </div>
      <ComicHero>
        <p className="eyebrow">
          <span className="editorial-tag">Before you submit</span>
          <span className="eyebrow-note">Source-linked · small catalog</span>
        </p>
        <h1 id="hero-title" className="hero-title">
          <span className="title-line">Make comics.</span>
          <span className="title-line title-line-shift">Make your</span>
          <span className="title-line title-line-accent">next move.</span>
        </h1>
        <p className="intro">
          You have the story. The call has the rules. ComicReady turns published guidelines into a straight answer about where you stand and what is still
          missing.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/opportunities">
            Browse submission calls
          </Link>
          <Link className="button button-secondary" href="/#how-it-works">
            See the process
          </Link>
        </div>
      </ComicHero>

      <blockquote className="pull-quote">
        <p>Built for the people who ink, letter, and layout the page — not for mystery scores or fake deadlines.</p>
      </blockquote>

      <section className="workflow" id="how-it-works" aria-labelledby="workflow-title">
        <div className="section-heading">
          <p className="eyebrow">Three-panel workflow</p>
          <h2 id="workflow-title">
            Less guesswork.
            <br />
            More getting it together.
          </h2>
          <span className="folio" aria-hidden="true">
            pp. 01–03
          </span>
        </div>
        <ol className="workflow-strip">
          {steps.map((step) => (
            <li key={step.number} className={`workflow-panel panel-${step.span}`}>
              <div className="panel-gutter">
                <span className="panel-number">{step.number}</span>
                <span className="panel-label-text">{step.label}</span>
              </div>
              <div className="panel-body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="principles" id="our-approach" aria-labelledby="principles-title">
        <div className="principles-lede">
          <p className="eyebrow">Integrity first</p>
          <h2 id="principles-title">
            The source gets
            <br />
            the final word.
          </h2>
        </div>
        <div className="principles-copy">
          <p>
            Every reviewed requirement links to the organizer’s published guidelines. When something is unclear, we say so. A readiness check is guidance — not
            acceptance, not legal advice.
          </p>
          <div className="notice">
            <strong>Development preview</strong>
            <p>
              Browse the first reviewed call and check your project against its stated requirements. Hero artwork mixes original vector panels with decorative
              generated proof art — not a creator submission.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
