"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

export interface SearchableDoc {
  slug: string;
  title: string;
  archiveId?: string;
  description?: string;
  mystery?: string;
  summary?: string;
  date?: string;
  archiveCollection?: "archive-universe" | "synthetic-minds";
  seriesOrder?: number;
}

const DOC_TYPE_COLOR: Record<string, string> = {
  Investigation:    "text-amber-400",
  Treatise:         "text-cyan-400",
  "Recovered Record": "text-violet-400",
  Orientation:      "text-emerald-400",
};

function docTypeColor(archiveId?: string, archiveCollection?: string): string {
  if (archiveCollection === "synthetic-minds") return "text-sky-400";
  if (!archiveId) return "text-slate-400";
  for (const [key, cls] of Object.entries(DOC_TYPE_COLOR)) {
    if (archiveId.startsWith(key)) return cls;
  }
  return "text-slate-400";
}

function docTypeLabel(doc: SearchableDoc): string | undefined {
  if (doc.archiveCollection === "synthetic-minds") {
    return `Synthetic Minds — Episode ${doc.seriesOrder}`;
  }
  return doc.archiveId;
}

export default function ArchiveSearchClient({ docs }: { docs: SearchableDoc[] }) {
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim();

  const results = useMemo(() => {
    const q = trimmedQuery.toLowerCase();
    if (!q) return docs;
    return docs.filter((d) => {
      const seriesMeta =
        d.archiveCollection === "synthetic-minds"
          ? `Synthetic Minds episode ${d.seriesOrder}`
          : undefined;
      const haystack = [d.title, d.archiveId, d.description, d.mystery, d.summary, seriesMeta]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [trimmedQuery, docs]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Search input */}
      <div className="relative mb-10">
        <label htmlFor="archive-search" className="sr-only">Search the Archive</label>
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-600">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
        <input
          id="archive-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search titles, mysteries, descriptions…"          className="w-full bg-slate-900/60 border border-slate-700 focus:border-slate-500 rounded-lg pl-11 pr-4 py-3.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors font-mono"
          autoComplete="off"
          spellCheck={false}
        />
        {trimmedQuery && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-slate-600 hover:text-slate-400 transition-colors text-xs font-mono"
            aria-label="Clear search"
          >
            clear
          </button>
        )}
      </div>

      {/* Status line */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] font-mono tracking-widest text-slate-700 uppercase">
          {trimmedQuery
            ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${trimmedQuery}"`
            : `${docs.length} documents indexed`}
        </p>
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="space-y-3">
          {results.map((doc) => (
            <Link
              key={doc.slug}
              href={`/archive/${doc.slug}`}
              className="group flex items-start justify-between gap-4 border border-slate-800 hover:border-slate-600 rounded-lg px-5 py-4 bg-slate-900/20 hover:bg-slate-900/60 transition-colors"
            >
              <div className="min-w-0">
                <p className={`text-[10px] font-mono tracking-widest uppercase mb-1 ${docTypeColor(doc.archiveId, doc.archiveCollection)} opacity-80`}>
                  {docTypeLabel(doc)}
                </p>
                <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug">
                  {doc.title}
                </p>
                {doc.mystery && (
                  <p className="mt-1.5 text-xs text-slate-600 italic leading-relaxed line-clamp-2">
                    {doc.mystery}
                  </p>
                )}
                {!doc.mystery && doc.description && (
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {doc.description}
                  </p>
                )}
              </div>
              <span className="shrink-0 text-xs font-mono text-slate-700 group-hover:text-slate-400 transition-colors mt-0.5">→</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-slate-800 rounded-lg px-6 py-12 text-center">
          <p className="text-sm font-mono text-slate-600">No documents match &ldquo;{trimmedQuery}&rdquo;</p>
          <p className="mt-2 text-xs text-slate-700">The Archive does not contain this. The inquiry continues.</p>
        </div>
      )}
    </div>
  );
}
