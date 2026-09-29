import { ComicHero } from '@/components/comic-hero';

const steps = [
  { number: '01', label: 'THE CALL', title: 'Read between the guidelines.', text: 'Start with a short-comic or anthology call. See the organizer’s requirements, payment disclosure, rights wording, and official source.' },
  { number: '02', label: 'YOUR PROJECT', title: 'Find out where you stand.', text: 'Compare your format, role, and materials with the stated rules. Keep eligibility, things to prepare, and unanswered questions separate.' },
  { number: '03', label: 'THE NEXT MOVE', title: 'Leave with a to-do list.', text: 'Work through a checklist, print it, and head to the organizer’s website when you’re ready. No comic uploads. No creator account.' },
];

export default function Home() {
  return <>
    <div className="issue-line"><span>THE INDEPENDENT COMIC CREATOR’S FIELD GUIDE</span><span>VOL. 01 — DEVELOPMENT EDITION</span></div>
    <ComicHero>
      <div className="hero-copy">
        <p className="eyebrow"><span className="editorial-tag">BEFORE YOU HIT SUBMIT</span></p>
        <h1 id="hero-title">Make comics.<br />Make your<br /><span className="highlight">next move.</span></h1>
        <p className="intro">You’ve got a story. What does the submission call need? Turn the guidelines into a clear list of where you stand and what’s still missing.</p>
        <a className="button" href="#how-it-works">Meet your submission checklist <span aria-hidden="true">↘</span></a>
        <p className="preview-note"><span aria-hidden="true">○</span> In development. The checker is coming next.</p>
      </div>
    </ComicHero>
    <div className="manifesto-strip"><span>FOR THE WRITERS.</span><span>THE ARTISTS.</span><span>THE WHOLE TEAM.</span><span className="strip-note">Made for the people who make the pages. <span aria-hidden="true">↙</span></span></div>
    <section className="workflow" id="how-it-works" aria-labelledby="workflow-title">
      <div className="section-heading"><p className="eyebrow">A THREE-PANEL EXPLANATION</p><h2 id="workflow-title">Less guesswork.<br />More getting it together.</h2><span className="folio" aria-hidden="true">[ 01—03 ]</span></div>
      <ol className="workflow-grid">{steps.map(step => <li key={step.number}><div className="panel-label"><span>{step.label}</span><span>{step.number}</span></div><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
    </section>
    <section className="principles" id="our-approach" aria-labelledby="principles-title"><div><p className="eyebrow">NO MYSTERY RULES. NO MAGIC SCORES.</p><h2 id="principles-title">The source gets<br />the final word.</h2></div><div><p>Every reviewed requirement will link to the organizer’s published guidelines. If something is unclear, we’ll say so. A readiness check is guidance—not a promise of acceptance or a legal opinion.</p><div className="notice"><strong>On the drawing board</strong><p>This is an early preview. No calls are published yet, and the project checker is still being built. The background is AI-generated decorative artwork, not a sample submission.</p></div></div></section>
  </>;
}
