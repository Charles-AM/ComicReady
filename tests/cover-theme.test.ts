import { expect, test } from 'vitest';
import { callInitials, paletteForSlug } from '../src/lib/cover-theme';

test('initials prefer organizer words', () => {
  expect(callInitials('CBK Comics', 'CBA vol 76', 'cbk-cba-v76')).toBe('CC');
  expect(callInitials('Discord Comics', 'Bite', 'discord-bite')).toBe('DC');
});

test('palette is stable and well-formed', () => {
  const colors = paletteForSlug('sector-13');
  expect(paletteForSlug('sector-13')).toEqual(colors);
  expect(colors).toHaveLength(3);
  expect(colors.every((c) => /^#[0-9a-f]{6}$/i.test(c))).toBe(true);
});
