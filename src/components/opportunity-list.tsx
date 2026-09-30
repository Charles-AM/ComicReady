'use client';

import { useState } from 'react';
import { OpportunityCoverCard } from '@/components/opportunity-cover';
import { effectiveStatus, roles, type Opportunity } from '@/lib/model';

export function OpportunityList({ calls }: { calls: Opportunity[] }) {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');

  const shown = calls.filter(
    (c) =>
      (c.title + ' ' + c.organizer + ' ' + c.description).toLowerCase().includes(query.toLowerCase()) &&
      (!role || c.roles.includes(role as (typeof roles)[number])) &&
      (!status || effectiveStatus(c) === status) &&
      (!category || c.category === category),
  );

  return (
    <>
      <div className="catalog-filters">
        <label>
          Search
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Title or organizer" />
        </label>
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
        <label>
          Call type
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All types</option>
            <option value="anthology">Anthology</option>
            <option value="short-comic">Short comic</option>
          </select>
        </label>
      </div>

      <p className="catalog-count" role="status">
        {shown.length} {shown.length === 1 ? 'call' : 'calls'}
      </p>

      <div className="cover-rail-wrap">
        <ul className="cover-grid cover-grid--rail">
          {shown.map((c) => (
            <li key={c.id}>
              <OpportunityCoverCard call={c} />
            </li>
          ))}
        </ul>
        <p className="cover-rail-hint" aria-hidden="true">
          Swipe to browse
        </p>
      </div>

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
