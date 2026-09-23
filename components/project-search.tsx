'use client';

import { Search, X } from 'lucide-react';

type ProjectSearchProps = {
  onQueryChange: (query: string) => void;
  query: string;
  resultCount: number;
  totalCount: number;
};

export function ProjectSearch({ onQueryChange, query, resultCount, totalCount }: ProjectSearchProps) {
  return (
    <div className="project-search">
      <div className="project-search-field">
        <label className="sr-only" htmlFor="project-search-input">Search projects</label>
        <Search aria-hidden="true" />
        <input
          id="project-search-input"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search projects or technologies…"
          aria-controls="project-results"
        />
        {query ? (
          <button type="button" onClick={() => onQueryChange('')} aria-label="Clear project search">
            <X aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <p aria-live="polite">
        {query.trim() ? `${resultCount} of ${totalCount} projects` : `${totalCount} selected projects`}
      </p>
    </div>
  );
}
