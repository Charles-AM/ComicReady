/** Deterministic catalog card color + initials — not generated imagery. */

const palettes: readonly [string, string, string][] = [
  ['#5c3d30', '#2f2438', '#14110f'],
  ['#3a4a52', '#252018', '#0f1012'],
  ['#4a3a28', '#1e2830', '#0c0d10'],
  ['#443828', '#302438', '#101014'],
  ['#364038', '#281e28', '#0e0e0c'],
  ['#503432', '#222838', '#121018'],
];

export function paletteForSlug(slug: string): [string, string, string] {
  const bucket = slug.split('').reduce((n, c) => n + c.charCodeAt(0), 0);
  return palettes[bucket % palettes.length];
}

const skip = new Set(['the', 'a', 'an', 'and', '&', 'of']);

function wordsFrom(text: string) {
  return text
    .normalize('NFKD')
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0 && !skip.has(w.toLowerCase()));
}

export function callInitials(organizer: string, title: string, slug: string) {
  const org = wordsFrom(organizer);
  if (org.length >= 2) return (org[0][0] + org[1][0]).toUpperCase();
  if (org.length === 1 && org[0].length >= 2) return org[0].slice(0, 2).toUpperCase();

  const named = wordsFrom(title);
  if (named.length >= 2) return (named[0][0] + named[1][0]).toUpperCase();
  if (named.length === 1 && named[0].length >= 2) return named[0].slice(0, 2).toUpperCase();

  const compact = slug.replace(/[^a-z0-9]/gi, '');
  return (compact.slice(0, 2) || '??').toUpperCase();
}
