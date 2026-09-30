'use client';

import { useState } from 'react';
import Link from 'next/link';
import { effectiveStatus, roles, verificationLabel, type Opportunity } from '@/lib/model';

function coverClass(slug: string, category: string) {
  const bucket = slug.split('').reduce((n, c) => n + c.charCodeAt(0), 0) % 4;
  return `cover-tone-${category === 'anthology' ? 'anthology' : 'short'}-${bucket}`;
}

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
