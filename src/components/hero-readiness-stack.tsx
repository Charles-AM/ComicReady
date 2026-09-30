/** Original vector proof sheet; a workflow illustration, not a fit result. */
export function HeroReadinessStack() {
  return (
    <aside className="hero-readiness-stack" aria-label="A preview of what your readiness check covers">
      <div className="readiness-proof">
        <div className="readiness-proof-heading"><span>From the call</span><span aria-hidden="true">01 / 03</span></div>
        <svg className="readiness-drawing" viewBox="0 0 300 152" fill="none" aria-hidden="true">
          <path d="M37 16h145v117H37z" fill="var(--surface)" stroke="currentColor" strokeWidth="1.5" />
          <path d="M29 27v114h143" stroke="currentColor" opacity=".3" />
          <path d="M48 28h122v38H48zM48 75h49v46H48zM106 75h64v46h-64z" stroke="currentColor" strokeWidth="1.5" />
          <path d="m49 62 29-23 22 18 20-12 49 20M55 113l16-27 20 27M112 113l17-22 15 13 18-21" stroke="currentColor" opacity=".35" />
          <circle cx="146" cy="41" r="6" fill="var(--accent)" />
          <path d="m194 90 22-50 18-12 6 23-32 44-16 11 2-16Z" fill="var(--surface-raised)" stroke="currentColor" strokeWidth="1.5" />
          <path d="m194 90 14 5m-14-5 31-43m-9-7 24 11" stroke="currentColor" strokeWidth="1.5" />
          <path d="M229 105c-17 18 38 1 31 17-3 7-28 11-44 5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 17h10M23 12v10M256 67h10m-5-5v10" stroke="var(--accent)" />
        </svg>
        <h2 className="readiness-proof-title">Before you submit<span aria-hidden="true">↗</span></h2>
        <ol className="readiness-proof-list">
          <li><span aria-hidden="true">01</span><div>Match the brief<small>Format, role &amp; story length</small></div></li>
          <li><span aria-hidden="true">02</span><div>Read the small print<small>Rights &amp; payment disclosures</small></div></li>
          <li><span aria-hidden="true">03</span><div>Know what’s still open<small>Materials to prepare &amp; questions to ask</small></div></li>
        </ol>
        <p className="readiness-proof-foot">Your story. A clearer next step.</p>
      </div>
    </aside>
  );
}
