export function metaDescription(value: string, maximumLength = 158) {
  const clean = value.replace(/\s+/g, ' ').trim();
  if (clean.length <= maximumLength) return clean;

  const candidate = clean.slice(0, maximumLength - 1);
  const lastWordBoundary = candidate.lastIndexOf(' ');
  const end = lastWordBoundary >= Math.floor(maximumLength * 0.7) ? lastWordBoundary : candidate.length;

  return `${candidate.slice(0, end).replace(/[\s,.;:!?–—-]+$/u, '')}…`;
}
