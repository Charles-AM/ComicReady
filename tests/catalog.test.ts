import { describe, expect, test } from 'vitest';
import { reviewedCatalog } from '../src/lib/catalog';
import { evaluate } from '../src/lib/engine';

describe('reviewed catalog integrity', () => {
  test('has unique public records with a manual verification time', () => {
    expect(new Set(reviewedCatalog.map((call) => call.id)).size).toBe(reviewedCatalog.length);
    expect(new Set(reviewedCatalog.map((call) => call.slug)).size).toBe(reviewedCatalog.length);
    for (const call of reviewedCatalog) {
      expect(call.published).toBe(true);
      expect(Number.isFinite(Date.parse(call.last_verified_at || ''))).toBe(true);
      expect(call.official_url).toMatch(/^https:\/\//);
      expect(call.requirements.length).toBeGreaterThan(0);
      expect(call.compensation_type).toMatch(/^(paid|conditional|unpaid|undisclosed)$/);
      expect(call.region_scope).toMatch(/^(worldwide|restricted|not-stated)$/);
    }
  });

  test('keeps every user-facing rule attached to an official HTTPS source', () => {
    for (const call of reviewedCatalog) {
      for (const rule of call.requirements) {
        expect(rule.source_url).toMatch(/^https:\/\//);
        expect(rule.source_reference.trim().length).toBeGreaterThan(2);
        expect(rule.wording.trim().length).toBeGreaterThan(4);
      }
    }
  });

  test('does not manufacture a timestamp for date-only deadlines', () => {
    const dateOnly = reviewedCatalog.filter((call) => call.deadline_note);
    expect(dateOnly.length).toBeGreaterThan(0);
    for (const call of dateOnly) {
      expect(call.deadline).toBeNull();
      expect(call.deadline_timezone).toBeNull();
      expect(call.deadline_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    for (const call of reviewedCatalog.filter((item) => item.deadline)) {
      expect(call.deadline_timezone).toBeTruthy();
      expect(call.deadline_note).toBeFalsy();
    }
  });

  test('new calls produce distinct eligibility, preparation, and unknown findings', () => {
    const afro = reviewedCatalog.find((call) => call.slug === 'afrocomiccon-illustrated-revolution-adult')!;
    const afroResult = evaluate(afro, { role: 'writer-artist', format: 'completed short comic', rights: true, storyPages: 18, bio: false, pdf: true }, Date.parse('2026-09-30T20:00:00Z'));
    expect(afroResult.findings.find((finding) => finding.id === 'afro-pages')?.outcome).toBe('ineligible');
    expect(afroResult.findings.find((finding) => finding.id === 'afro-bio')?.outcome).toBe('prepare');

    const viz = reviewedCatalog.find((call) => call.slug === 'viz-one-shots')!;
    const vizResult = evaluate(viz, { role: 'writer-artist', format: 'completed short comic', storyPages: 30, synopsis: true, bio: true }, Date.parse('2026-09-30T20:00:00Z'));
    expect(vizResult.findings.find((finding) => finding.id === 'payment')?.outcome).toBe('unknown');
    expect(vizResult.findings.find((finding) => finding.id === 'licensing')?.outcome).toBe('unknown');
  });
});
