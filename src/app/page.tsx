export default function Home() {
  return <>
    <section className="hero">
      <div><p className="eyebrow"><span className="dot" /> THE SUBMISSION READINESS TOOL</p>
        <h1>Your story is yours.<br /><em>Your next step,</em><br />a little clearer.</h1>
        <p className="intro">Turn a comic submission call’s published requirements into a clear picture of where your project stands—and what to prepare next.</p>
        <a className="button" href="#how-it-works">See how it works <span aria-hidden="true">↗</span></a>
        <p className="small">No creator account. No uploads. Your work stays yours.</p>
      </div>
      <aside className="editorial-panel" aria-labelledby="readiness-title">
        <div className="panel-top"><span>YOUR SUBMISSION, UNPACKED</span><span aria-hidden="true">01 / 03</span></div>
        <h2 id="readiness-title">Less second-guessing.<br />More making comics.</h2>
        <ol className="readiness-list"><li><span className="number">01</span><div><h3>Know where you stand</h3><p>Compare your project with the stated requirements.</p></div></li><li><span className="number">02</span><div><h3>See what’s missing</h3><p>Separate eligibility questions from materials to prepare.</p></div></li><li><span className="number">03</span><div><h3>Take the next step</h3><p>Keep a checklist and apply on the organizer’s website.</p></div></li></ol>
        <p className="panel-foot">Sources first. Uncertainty made visible.</p>
      </aside>
    </section>
    <section id="how-it-works" className="foundation"><div><p className="eyebrow">A SMALL, THOUGHTFUL START</p><h2>A clearer path from<br />project to submission.</h2></div><div><p>ComicReady is being built for English-language short-comic and anthology calls. Every reviewed requirement will link to the organizer’s original guidelines.</p><p className="notice"><strong>Development preview.</strong> The app foundation is ready for development. No calls have been published yet, and the project checker is not available in this checkpoint.</p></div></section>
  </>;
}
