'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { effectiveStatus, roles, verificationLabel, type Opportunity } from '@/lib/model';

function coverClass(slug: string, category: string) {
  const bucket = slug.split('').reduce((n, c) => n + c.charCodeAt(0), 0) % 4;
  return `cover-tone-${category === 'anthology' ? 'anthology' : 'short'}-${bucket}`;
}

export function OpportunityList({ calls }: { calls: Opportunity[] }) {
  const filterPanelId = useId();
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const shown = calls.filter(
    (c) =>
      (c.title + ' ' + c.organizer + ' ' + c.description).toLowerCase().includes(query.toLowerCase()) &&
      (!role || c.roles.includes(role as (typeof roles)[number])) &&
      (!status || effectiveStatus(c) === status) &&
      (!category || c.category === category),
  );

  const categoryTabs = [
    { value: '', label: 'All items' },
    { value: 'anthology', label: 'Anthologies' },
    { value: 'short-comic', label: 'Short comics' },
  ] as const;

  return (
    <>
      <div className="catalog-toolbar">
        <div className="catalog-search">
          <label className="catalog-search-label" htmlFor="catalog-search">
            Search
          </label>
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Title or organizer"
            aria-describedby="catalog-search-hint"
          />
          <span id="catalog-search-hint" className="visually-hidden">
            Filters the list below as you type
          </span>
        </div>

        <ul className="catalog-tabs" role="tablist" aria-label="Call type">
          {categoryTabs.map((tab) => {
            const selected = category === tab.value;
            return (
              <li key={tab.label} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={selected ? 'is-active' : undefined}
                  onClick={() => setCategory(tab.value)}
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="button filter-toggle"
          aria-expanded={filtersOpen}
          aria-controls={filterPanelId}
          onClick={() => setFiltersOpen((open) => !open)}
        >
          Filters
        </button>
      </div>

      <div id={filterPanelId} className={`catalog-filter-panel${filtersOpen ? ' is-open' : ''}`} hidden={!filtersOpen}>
        <label>
          Creator role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">All roles</option>
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            {['open', 'rolling', 'closed', 'unknown'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="catalog-count" role="status">
        {shown.length} {shown.length === 1 ? 'call' : 'calls'}
      </p>

      <ul className="cover-grid">
        {shown.map((c) => (
          <li key={c.id}>
            <article className="cover-card">
              <Link href={'/opportunities/' + c.slug} className="cover-card-link">
                <div className={`cover-art ${coverClass(c.slug, c.category)}`}>
                  <span className="cover-status">{effectiveStatus(c)}</span>
                  <span className="cover-type">{c.fixture ? 'Fixture' : c.category.replace('-', ' ')}</span>
                </div>
                <div className="cover-info">
                  <p className="cover-organizer">{c.organizer}</p>
                  <h2 className="cover-title">{c.title}</h2>
                  <p className="cover-meta">
                    {c.deadline ? verificationLabel(c.deadline) : 'Deadline not published'}
                    {' · '}
                    {c.compensation ? 'Payment listed' : 'Payment not disclosed'}
                  </p>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>

      {!shown.length && (
        <div className="empty-state">
          <h2 className="section-title">No matching calls</h2>
          <p>Try a broader search or clear your filters.</p>
          <button
            className="button secondary"
            type="button"
            onClick={() => {
              setQuery('');
              setRole('');
              setStatus('');
              setCategory('');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
