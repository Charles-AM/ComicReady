'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { OpportunityCoverCard } from '@/components/opportunity-cover';
import {
  matchesPageBand,
  pageRangeLabel,
  paymentLabel,
  paymentType,
  regionLabel,
  sortCalls,
  type CatalogSort,
  type PageBand,
} from '@/lib/catalog-discovery';
import { deadlineLabel, effectiveStatus, formats, roles, type Opportunity } from '@/lib/model';

const SAVED_KEY = 'comicready:saved-opportunities:v1';

export function OpportunityList({ calls }: { calls: Opportunity[] }) {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('');
  const [format, setFormat] = useState('');
  const [status, setStatus] = useState('available');
  const [category, setCategory] = useState('');
  const [payment, setPayment] = useState('');
  const [region, setRegion] = useState('');
  const [pageBand, setPageBand] = useState('');
  const [sort, setSort] = useState<CatalogSort>('deadline');
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [compared, setCompared] = useState<string[]>([]);

  useEffect(() => {
    const loadSaved = window.setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
        if (Array.isArray(stored)) setSaved(stored.filter((id): id is string => typeof id === 'string'));
      } catch {
        localStorage.removeItem(SAVED_KEY);
      }
    }, 0);
    return () => window.clearTimeout(loadSaved);
  }, []);

  function toggleSaved(id: string) {
    setSaved((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      return next;
    });
  }

  function toggleCompared(id: string) {
    setCompared((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current);
  }

  const filterCount = [role, format, status === 'available' ? '' : status, category, payment, region, pageBand].filter(Boolean).length + Number(savedOnly);
  const shown = useMemo(() => sortCalls(calls.filter((call) =>
    (call.title + ' ' + call.organizer + ' ' + call.description).toLowerCase().includes(query.trim().toLowerCase()) &&
    (!role || call.roles.includes(role as (typeof roles)[number])) &&
    (!format || call.formats.includes(format as (typeof formats)[number])) &&
    (!status || (status === 'available' ? ['open', 'rolling'].includes(effectiveStatus(call)) : effectiveStatus(call) === status)) &&
    (!category || call.category === category) &&
    (!payment || paymentType(call) === payment) &&
    (!region || (call.region_scope ?? 'not-stated') === region) &&
    (!pageBand || matchesPageBand(call, pageBand as PageBand)) &&
    (!savedOnly || saved.includes(call.id))
  ), sort), [calls, query, role, format, status, category, payment, region, pageBand, savedOnly, saved, sort]);

  const comparison = compared.map((id) => calls.find((call) => call.id === id)).filter((call): call is Opportunity => Boolean(call));

  function clearFilters() {
    setQuery('');
    setRole('');
    setFormat('');
    setStatus('available');
    setCategory('');
    setPayment('');
    setRegion('');
    setPageBand('');
    setSavedOnly(false);
  }

  return (
    <>
      <div className="catalog-toolbar">
        <label className="catalog-search">Search calls<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, organizer, or theme" /></label>
        <label>Sort by<select value={sort} onChange={(event) => setSort(event.target.value as CatalogSort)}><option value="deadline">Nearest deadline</option><option value="recently-verified">Recently verified</option><option value="rolling-first">Rolling first</option><option value="title">Title A–Z</option></select></label>
        <button type="button" className="catalog-saved-toggle" aria-pressed={savedOnly} onClick={() => setSavedOnly((value) => !value)}>Saved calls <span>{saved.length}</span></button>
      </div>

      <details className="catalog-filter-panel">
        <summary>Filters {filterCount ? `(${filterCount})` : ''}</summary>
        <div className="catalog-filters">
          <label>Creator role<select value={role} onChange={(event) => setRole(event.target.value)}><option value="">All roles</option>{roles.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Project format<select value={format} onChange={(event) => setFormat(event.target.value)}><option value="">All formats</option>{formats.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}><option value="available">Available now</option><option value="">All statuses</option>{['open', 'rolling', 'closed', 'unknown'].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Call type<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All types</option><option value="anthology">Anthology</option><option value="short-comic">Short comic</option></select></label>
          <label>Payment<select value={payment} onChange={(event) => setPayment(event.target.value)}><option value="">Any disclosure</option><option value="paid">Paid</option><option value="conditional">Conditional</option><option value="unpaid">Unpaid</option><option value="undisclosed">Not disclosed</option></select></label>
          <label>Region<select value={region} onChange={(event) => setRegion(event.target.value)}><option value="">Any region</option><option value="worldwide">Worldwide</option><option value="restricted">Region restricted</option><option value="not-stated">Not stated</option></select></label>
          <label>Story length<select value={pageBand} onChange={(event) => setPageBand(event.target.value)}><option value="">Any or unstated</option><option value="up-to-5">Fits up to 5 pages</option><option value="6-to-20">Fits 6–20 pages</option><option value="20-plus">Fits 20+ pages</option></select></label>
        </div>
        {filterCount > 0 && <button className="text-button catalog-clear" type="button" onClick={clearFilters}>Clear filters</button>}
      </details>

      <div className="catalog-results-head">
        <p className="catalog-count" role="status">{shown.length} {shown.length === 1 ? 'call' : 'calls'}</p>
        <p className="catalog-storage-note">Saved calls stay on this device.</p>
      </div>

      {comparison.length > 0 && (
        <section className="comparison-tray" aria-labelledby="comparison-title">
          <div className="comparison-tray-head"><div><p className="eyebrow">Compare</p><h2 id="comparison-title">{comparison.length} of 3 selected</h2></div><button className="text-button" type="button" onClick={() => setCompared([])}>Clear comparison</button></div>
          <div className="comparison-picks">{comparison.map((call) => <button type="button" key={call.id} onClick={() => toggleCompared(call.id)} aria-label={`Remove ${call.title} from comparison`}>{call.title}<span aria-hidden="true">×</span></button>)}</div>
          {comparison.length < 2 ? <p className="muted">Choose one more call to compare requirements side by side.</p> : (
            <div className="comparison-table-wrap"><table className="comparison-table">
              <thead><tr><th scope="col">Compare</th>{comparison.map((call) => <th scope="col" key={call.id}>{call.title}</th>)}</tr></thead>
              <tbody>
                <tr><th scope="row">Organizer</th>{comparison.map((call) => <td key={call.id}>{call.organizer}</td>)}</tr>
                <tr><th scope="row">Deadline</th>{comparison.map((call) => <td key={call.id}>{deadlineLabel(call)}</td>)}</tr>
                <tr><th scope="row">Payment</th>{comparison.map((call) => <td key={call.id}>{paymentLabel(call)}</td>)}</tr>
                <tr><th scope="row">Region</th>{comparison.map((call) => <td key={call.id}>{regionLabel(call)}</td>)}</tr>
                <tr><th scope="row">Length</th>{comparison.map((call) => <td key={call.id}>{pageRangeLabel(call)}</td>)}</tr>
                <tr><th scope="row">Roles</th>{comparison.map((call) => <td key={call.id}>{call.roles.join(', ')}</td>)}</tr>
                <tr><th scope="row">Formats</th>{comparison.map((call) => <td key={call.id}>{call.formats.join(', ')}</td>)}</tr>
                <tr><th scope="row">Open</th>{comparison.map((call) => <td key={call.id}><Link href={`/opportunities/${call.slug}`}>Details</Link><br /><a href={call.official_url}>Official source</a></td>)}</tr>
              </tbody>
            </table></div>
          )}
        </section>
      )}

      {shown.length > 0 && <div className="cover-rail-wrap">
        <ul className="cover-grid cover-grid--rail">{shown.map((call) => <li key={call.id}><OpportunityCoverCard call={call} saved={saved.includes(call.id)} compared={compared.includes(call.id)} compareDisabled={compared.length >= 3} onToggleSaved={() => toggleSaved(call.id)} onToggleCompare={() => toggleCompared(call.id)} /></li>)}</ul>
        <p className="cover-rail-hint" aria-hidden="true">Swipe to browse</p>
      </div>}

      {!shown.length && <div className="empty-state">
        <p className="eyebrow">Catalog</p>
        <h2 className="section-title">{savedOnly && saved.length === 0 ? 'No saved calls yet' : 'No calls fit these filters'}</h2>
        <p>{savedOnly && saved.length === 0 ? 'Use Save on a catalog card to keep a shortlist on this device.' : 'No current listing matches every selected condition. Broaden one filter or reset the catalog.'}</p>
        <button className="button secondary" type="button" onClick={clearFilters}>{savedOnly && saved.length === 0 ? 'Show all calls' : 'Reset search and filters'}</button>
      </div>}
    </>
  );
}
