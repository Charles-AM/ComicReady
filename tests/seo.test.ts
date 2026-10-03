import { describe, expect, it } from 'vitest';
import { metaDescription } from '../src/lib/seo';

describe('meta descriptions', () => {
  it('keeps short descriptions unchanged after normalizing whitespace', () => {
    expect(metaDescription('A concise\ncomic submission description.')).toBe('A concise comic submission description.');
  });

  it('truncates long descriptions at a word boundary', () => {
    const description = metaDescription(
      'Discord Comics: Paranormal, mild-horror erotica exploring bisexual themes. Applications from writers, artists, and teams—finished pages not required at submission.',
    );

    expect(description.length).toBeLessThanOrEqual(158);
    expect(description).toMatch(/…$/u);
    expect(description).not.toMatch(/\bsubmissi…$/u);
  });
});
