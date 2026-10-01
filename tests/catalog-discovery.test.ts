import { describe, expect, test } from 'vitest';
import { reviewedCatalog } from '../src/lib/catalog';
import { deadlineValue, isClosingSoon, isRecentlyVerified, matchesPageBand, pageRange, paymentLabel, sortCalls } from '../src/lib/catalog-discovery';

const bySlug = (slug: string) => reviewedCatalog.find((call) => call.slug === slug)!;
const now = Date.parse('2026-09-30T20:00:00Z');

describe('catalog discovery metadata', () => {
  test('classifies payment without treating every disclosure as paid', () => {
    expect(paymentLabel(bySlug('sector-13'))).toBe('Unpaid');
    expect(paymentLabel(bySlug('afrocomiccon-illustrated-revolution-adult'))).toBe('Conditional payment');
    expect(paymentLabel(bySlug('lumicpress-magazine'))).toBe('Paid');
    expect(paymentLabel(bySlug('viz-one-shots'))).toBe('Payment not disclosed');
  });

  test('derives deterministic page ranges only from universal eligibility rules', () => {
    expect(pageRange(bySlug('lumicpress-magazine'))).toEqual({ min: 1, max: 5 });
    expect(pageRange(bySlug('viz-one-shots'))).toEqual({ min: 20, max: 50 });
    expect(pageRange(bySlug('kkum-hybrid-horror'))).toEqual({ min: null, max: null });
  });

  test('matches project-length bands by whether a call can accept that length', () => {
    expect(matchesPageBand(bySlug('lumicpress-magazine'), 'up-to-5')).toBe(true);
    expect(matchesPageBand(bySlug('lumicpress-magazine'), '20-plus')).toBe(false);
    expect(matchesPageBand(bySlug('viz-one-shots'), '20-plus')).toBe(true);
  });

  test('sorts exact and date-only deadlines without inventing a deadline time', () => {
    const calls = [bySlug('viz-one-shots'), bySlug('afrocomiccon-illustrated-revolution-adult'), bySlug('kkum-hybrid-horror')];
    expect(sortCalls(calls, 'deadline').map((call) => call.slug)).toEqual(['kkum-hybrid-horror', 'afrocomiccon-illustrated-revolution-adult', 'viz-one-shots']);
    expect(deadlineValue(bySlug('kkum-hybrid-horror'))).toBe(Date.parse('2026-10-15T12:00:00Z'));
  });

  test('closing-soon and recently-verified signals use explicit time windows', () => {
    expect(isClosingSoon(bySlug('kkum-hybrid-horror'), now)).toBe(true);
    expect(isClosingSoon(bySlug('afrocomiccon-illustrated-revolution-adult'), now)).toBe(false);
    expect(isRecentlyVerified(bySlug('viz-one-shots'), now)).toBe(true);
  });
});
