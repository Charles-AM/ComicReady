/** Layered checklist + blank panel — original layout art, not generated imagery. */
export function HeroReadinessStack() {
  return (
    <aside
      className="hero-readiness-stack"
      aria-label="Illustration: guidelines, a short checklist, and an open comic panel waiting for your next step."
    >
      <div className="hero-readiness-sheet hero-readiness-sheet--guidelines">
        <p className="hero-readiness-kicker">From the call</p>
        <div className="hero-readiness-rule" aria-hidden />
        <div className="hero-readiness-bars" aria-hidden>
          <span />
          <span />
          <span className="hero-readiness-bar-short" />
        </div>
      </div>

      <div className="hero-readiness-sheet hero-readiness-sheet--checklist">
        <p className="hero-readiness-kicker">Before you submit</p>
        <ul className="hero-readiness-items">
          <li className="hero-readiness-item hero-readiness-item--done">
            <span className="hero-readiness-mark" aria-hidden />
            Format fits the brief
          </li>
          <li className="hero-readiness-item hero-readiness-item--done">
            <span className="hero-readiness-mark" aria-hidden />
            Rights &amp; payment noted
          </li>
          <li className="hero-readiness-item hero-readiness-item--open">
            <span className="hero-readiness-mark hero-readiness-mark--open" aria-hidden />
            Open items flagged
          </li>
        </ul>
      </div>

      <div className="hero-readiness-sheet hero-readiness-sheet--panel" aria-hidden>
        <span className="hero-readiness-panel-spine" />
        <span className="hero-readiness-panel-dash">Next scene</span>
      </div>
    </aside>
  );
}
