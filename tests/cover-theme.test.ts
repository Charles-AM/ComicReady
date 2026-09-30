import { expect, test } from 'vitest';
import { accentForSlug, callInitials, categoryLabel } from '../src/lib/cover-theme';

test('initials prefer organizer words', () => {
  expect(callInitials('CBK Comics', 'CBA vol 76', 'cbk-cba-v76')).toBe('CC');
  expect(callInitials('Discord Comics', 'Bite', 'discord-bite')).toBe('DC');
});

test('accent is stable and well-formed', () => {
  const color = accentForSlug('sector-13');
  expect(accentForSlug('sector-13')).toBe(color);
  expect(color).toMatch(/^#[0-9a-f]{6}$/i);
});

test('category labels', () => {
  expect(categoryLabel('anthology')).toBe('Anthology');
  expect(categoryLabel('short-comic')).toBe('Short comic');
  expect(categoryLabel('anthology', true)).toBe('Fixture');
});
