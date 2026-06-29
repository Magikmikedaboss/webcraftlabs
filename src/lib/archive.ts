/**
 * WebCraft Archive — data layer
 *
 * Canonical reading order and citation graph for the webcraft-archive collection.
 * Update this file whenever a new Archive document is published.
 */

// Canonical reading order — the intended sequence for researchers
export const ARCHIVE_ORDER = [
  {
    slug: "welcome-to-the-archive",
    archiveId: "Orientation",
    title: "Welcome to the Archive",
  },
  {
    slug: "the-silent-vault",
    archiveId: "Investigation 203",
    title: "The Silent Vault",
  },
  {
    slug: "treatise-1-on-the-preservation-of-knowledge",
    archiveId: "Treatise I",
    title: "On the Preservation of Knowledge",
  },
  {
    slug: "the-duplicate-manuscript",
    archiveId: "Investigation 047",
    title: "The Duplicate Manuscript",
  },
  {
    slug: "treatise-2-on-the-nature-of-evidence",
    archiveId: "Treatise II",
    title: "On the Nature of Evidence",
  },
  {
    slug: "the-last-simulation",
    archiveId: "Recovered Record 611",
    title: "The Last Simulation",
  },
  {
    slug: "the-last-radio-signal",
    archiveId: "Recovered Record 002",
    title: "The Last Radio Signal",
  },
] as const;

export type ArchiveDoc = (typeof ARCHIVE_ORDER)[number];

// Citation graph — which documents formally cite which
// Key: citing slug, Value: array of cited slugs
const CITES_MAP: Record<string, readonly string[]> = {
  "treatise-1-on-the-preservation-of-knowledge": ["the-silent-vault"],
  "treatise-2-on-the-nature-of-evidence": ["the-duplicate-manuscript"],
};

// Derived inverse map: cited slug → array of citing slugs
const CITED_BY_MAP: Record<string, string[]> = {};
for (const [citer, cited] of Object.entries(CITES_MAP)) {
  for (const s of cited) {
    (CITED_BY_MAP[s] ??= []).push(citer);
  }
}

// ── Helpers ────────────────────────────────────────────────────────

export function isArchiveSlug(slug: string): boolean {
  return ARCHIVE_ORDER.some((d) => d.slug === slug);
}

export function getArchivePosition(slug: string): number {
  return ARCHIVE_ORDER.findIndex((d) => d.slug === slug);
}

export function getArchivePrevNext(slug: string): {
  prev: ArchiveDoc | null;
  next: ArchiveDoc | null;
} {
  const idx = getArchivePosition(slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? ARCHIVE_ORDER[idx - 1] : null,
    next: idx < ARCHIVE_ORDER.length - 1 ? ARCHIVE_ORDER[idx + 1] : null,
  };
}

export function getArchiveCites(slug: string): ArchiveDoc[] {
  return (CITES_MAP[slug] ?? [])
    .map((s) => ARCHIVE_ORDER.find((d) => d.slug === s))
    .filter(Boolean) as ArchiveDoc[];
}

export function getArchiveCitedBy(slug: string): ArchiveDoc[] {
  return (CITED_BY_MAP[slug] ?? [])
    .map((s) => ARCHIVE_ORDER.find((d) => d.slug === s))
    .filter(Boolean) as ArchiveDoc[];
}
