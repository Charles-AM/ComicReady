/** Spine C mark (concept C) — paths only, inherits `currentColor`. */
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M168 68c-36-24-96-8-96 60s60 84 96 60c14-8 24-22 28-38l-24-8c-2 10-8 18-16 22-18 10-48-2-48-36s30-46 48-36c8 4 14 12 16 22l24-8c-4-16-14-30-28-38z"
      />
      <rect x="176" y="76" width="14" height="104" rx="2" fill="currentColor" />
    </svg>
  );
}
