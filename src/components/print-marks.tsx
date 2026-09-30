/** Registration and crop marks — print-shop comic proof, not decoration-only chrome. */
export function PrintMarks() {
  return (
    <div className="print-marks" aria-hidden="true">
      <svg className="print-marks-svg" viewBox="0 0 1200 80" preserveAspectRatio="none">
        <path d="M24 40 H56 M24 40 V24 M24 40 V56" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M1176 40 H1144 M1176 40 V24 M1176 40 V56" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="600" cy="40" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="600" cy="40" r="1.5" fill="currentColor" />
        <path d="M588 40 H612" stroke="var(--red)" strokeWidth="1.5" opacity="0.85" />
        <path d="M600 28 V52" stroke="var(--red)" strokeWidth="1.5" opacity="0.85" />
      </svg>
    </div>
  );
}
