/**
 * Catalog card preview style — change this one line to try another look.
 *
 * A `stripe`   — dark tile, colored left bar (default, least busy)
 * B `initials` — flat fill + two letters, centered
 * C `category` — flat fill + anthology / short comic word only
 * D `label`    — no “cover art”, organizer name in the tile
 */

export type CatalogPreviewStyle = 'stripe' | 'initials' | 'category' | 'label';

export const catalogPreviewStyle: CatalogPreviewStyle = 'stripe';

const accents = ['#8a6a58', '#6a8088', '#887860', '#786878', '#688078', '#886860'] as const;

export function accentForSlug(slug: string) {
  const bucket = slug.split('').reduce((n, c) => n + c.charCodeAt(0), 0);
  return accents[bucket % accents.length];
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

export function categoryLabel(category: string, fixture?: boolean) {
  if (fixture) return 'Fixture';
  return category === 'anthology' ? 'Anthology' : 'Short comic';
}
