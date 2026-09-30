/** Checklist panel mark (logo concept B) — readiness, not a reader app. */
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="52" y="60" width="152" height="136" stroke="currentColor" strokeWidth="14" />
      <path
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M84 96l16 16 32-32M84 128l16 16 32-32M84 160l16 16 32-32"
      />
      <path fill="currentColor" d="M180 60h16v136h-16z" />
    </svg>
  );
}
