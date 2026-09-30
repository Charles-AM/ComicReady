/** Decorative preview art for catalog cards — not organizer-published cover art. */
export const coverPreviewBySlug: Record<string, string> = {
  'sector-13': '/art/covers/sector-13.jpg',
  'cbk-cba-v76': '/art/covers/cbk-cba-v76.jpg',
  'discord-bite': '/art/covers/discord-bite.jpg',
};

export function coverPreviewForSlug(slug: string) {
  return coverPreviewBySlug[slug] ?? null;
}
