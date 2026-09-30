import Link from 'next/link';
import { ComicHero } from '@/components/comic-hero';

const steps = [
  {
    number: '01',
    title: 'Read between the guidelines.',
    text: 'Start with a short-comic or anthology call. See the organizer’s requirements, payment disclosure, rights wording, and official source.',
  },
  {
    number: '02',
    title: 'Find out where you stand.',
    text: 'Compare your format, role, and materials with the stated rules. Keep eligibility, things to prepare, and unanswered questions separate.',
  },
  {
    number: '03',
    title: 'Leave with a to-do list.',
    text: 'Work through a checklist, print it, and head to the organizer’s website when you’re ready. No comic uploads. No creator account.',
  },
];

export default function Home() {
  return (
    <>
      <ComicHero>
        <p className="eyebrow">
          <span className="editorial-tag">Before you submit</span>
        </p>
        <h1 id="hero-title" className="display-title">
          Make comics.
          <br />
          Make your <span className="title-accent">next move.</span>
        </h1>
        <p className="lede">
          You’ve got a story. What does the submission call need? Turn the guidelines into a clear list of where you stand and what’s still missing.
        </p>
        <div className="hero-actions">
          <Link className="button" href="/opportunities">
            Explore submission calls
          </Link>
        </div>
        <p className="fine-print">A small, source-linked catalog. No creator account.</p>
      </ComicHero>

      <section className="home-process" id="how-it-works" aria-labelledby="workflow-title">
        <div className="section-intro">
          <p className="eyebrow">How it works</p>
          <h2 id="workflow-title" className="section-title">
            Less guesswork. More getting it together.
          </h2>
        </div>
        <ol className="process-list">
          {steps.map((step) => (
            <li key={step.number}>
              <span className="process-index">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-approach" id="our-approach" aria-labelledby="principles-title">
        <div className="approach-grid">
          <div>
            <p className="eyebrow">Our approach</p>
            <h2 id="principles-title" className="section-title">
              The source gets the final word.
            </h2>
          </div>
          <div className="approach-body">
            <p>
              Every reviewed requirement will link to the organizer’s published guidelines. If something is unclear, we’ll say so. A readiness check is
              guidance—not a promise of acceptance or a legal opinion.
            </p>
            <div className="notice">
              <strong>Development preview</strong>
              <p>
                Browse the first reviewed call and check your project against its stated requirements. The homepage illustration is original vector art, not a
                sample submission.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
