'use client';

import { useState } from 'react';
import Link from 'next/link';
import { effectiveStatus, roles, verificationLabel, type Opportunity } from '@/lib/model';

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
            <option>anthology</option>
            <option>short-comic</option>
          </select>
        </label>
      </div>

      <p className="catalog-count" role="status">
        {shown.length} {shown.length === 1 ? 'call' : 'calls'}
      </p>

      <ul className="catalog-list">
        {shown.map((c) => (
          <li key={c.id}>
            <article className="catalog-item">
              <div className="catalog-cover" aria-hidden="true">
                <span className="catalog-cover-label">{c.category === 'anthology' ? 'ANT' : 'S-C'}</span>
              </div>
              <div className="catalog-body">
                <div className="catalog-meta-row">
                  <span className="catalog-organizer">{c.organizer}</span>
                  <span className="catalog-status">{effectiveStatus(c)}</span>
                </div>
                <h2 className="catalog-title">
                  <Link href={'/opportunities/' + c.slug}>{c.title}</Link>
                </h2>
                <p className="catalog-desc">{c.description}</p>
                <dl className="catalog-facts">
                  <div>
                    <dt>Deadline</dt>
                    <dd>{c.deadline ? verificationLabel(c.deadline) : 'Not published — confirm with organizer.'}</dd>
                  </div>
                  <div>
                    <dt>Payment</dt>
                    <dd>{c.compensation || 'Not disclosed — confirm with organizer.'}</dd>
                  </div>
                </dl>
                <p className="catalog-verification">
                  {c.fixture ? 'Fictional example — not verified' : `Checked ${verificationLabel(c.last_verified_at)}`}
                </p>
                <Link className="text-link" href={'/opportunities/' + c.slug}>
                  Read requirements
                </Link>
              </div>
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
