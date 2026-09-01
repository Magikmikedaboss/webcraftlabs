"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type AllResourcesRow = {
  /** Unique key — `${type}-${slug}`. */
  key: string;
  slug: string;
  title: string;
  description?: string;
  href: string;
  typeLabel: string;
  /** Category id from RESOURCE_CATEGORIES, or null when the path maps to none. */
  categoryId: string | null;
  categoryLabel: string | null;
  /** Lowercased title + description + labels, for search. */
  haystack: string;
};

export type AllResourcesFilter = { id: string; label: string; count: number };

/**
 * Browsing controls over the canonical resource list.
 *
 * Every row is rendered on every pass — filtering toggles the `hidden`
 * attribute rather than removing entries from the DOM. That keeps exactly
 * one copy of each resource in the markup no matter what is selected, so
 * the listing stays crawlable and the "renders every resource exactly
 * once" guarantee holds in any filter state. Mirrors the tag-chip +
 * search pattern already used by PostIndexClient on /blog.
 */
export default function AllResourcesClient({
  rows,
  filters,
}: {
  rows: readonly AllResourcesRow[];
  filters: readonly AllResourcesFilter[];
}) {
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const matches = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const r of rows) {
      const inCategory = category === "all" || r.categoryId === category;
      map.set(r.key, inCategory && (q === "" || r.haystack.includes(q)));
    }
    return map;
  }, [rows, category, q]);

  const visibleCount = useMemo(
    () => rows.reduce((n, r) => n + (matches.get(r.key) ? 1 : 0), 0),
    [rows, matches]
  );

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter resources by category"
        >
          {filters.map((f) => {
            const active = category === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setCategory(f.id)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                  active
                    ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--onPrimary)]"
                    : "border-[var(--controlBorder)] text-[var(--text)] hover:bg-[var(--hoverSurface)]"
                }`}
              >
                {f.label}
                <span className={active ? "ml-2 opacity-80" : "ml-2 text-[var(--muted)]"}>
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="resource-search" className="sr-only">
            Search resources
          </label>
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources…"
            className="w-full max-w-sm rounded-lg border border-[var(--controlBorder)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)]"
          />
          <p className="text-sm text-[var(--muted)]" role="status" aria-live="polite">
            Showing {visibleCount} of {rows.length}
          </p>
        </div>
      </div>

      {visibleCount === 0 && (
        <p className="rc-body mt-8">
          Nothing matches that search. Clear it, or choose a different category.
        </p>
      )}

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {rows.map((r) => (
          <li key={r.key} hidden={!matches.get(r.key)}>
            <Link href={r.href} className="rc-card rc-card-link block h-full">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rc-card-eyebrow">{r.typeLabel}</span>
                {r.categoryLabel && (
                  <span className="rc-badge-muted">{r.categoryLabel}</span>
                )}
              </div>
              <h3 className="rc-card-title mt-2">{r.title}</h3>
              {r.description && <p className="rc-card-body mt-2">{r.description}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
