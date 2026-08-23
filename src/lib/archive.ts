/**
 * WebCraft Archive — data layer
 *
 * Canonical reading order and citation graph for the webcraft-archive collection.
 * Update this file whenever a new Archive document is published.
 */

import { getAllArchivePostFrontmatter } from "@/lib/mdx/archive";
// Use a structured JSON source of truth for archive ordering to avoid brittle parsing.
import archiveOrder from './archive-order.json';

// Canonical reading order — reader journey sequence
// Readers fall in love first (Recovered Records), then become scholars.
// Rule: evidence precedes scholarship. Wonder precedes analysis.
export type ArchiveOrderItem = {
  slug: string;
  archiveId?: string | null;
  title: string;
};

export const ARCHIVE_ORDER: ReadonlyArray<ArchiveOrderItem> = archiveOrder as ArchiveOrderItem[];

export type ArchiveDoc = ArchiveOrderItem;

// Citation graph — which documents formally cite which
// Key: citing slug, Value: array of cited slugs
const CITES_MAP: Partial<Record<ArchiveDoc["slug"], readonly ArchiveDoc["slug"][]>> = {
  "treatise-1-on-the-preservation-of-knowledge": ["the-silent-vault"],
  "treatise-2-on-the-nature-of-evidence": ["the-duplicate-manuscript"],
};

// Derived inverse map: cited slug → array of citing slugs
const CITED_BY_MAP: Partial<Record<ArchiveDoc["slug"], ArchiveDoc["slug"][]>> = {};
for (const [citer, cited] of Object.entries(CITES_MAP) as [ArchiveDoc["slug"], readonly ArchiveDoc["slug"][]][]) {
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

export function getArchiveCites(slug: ArchiveDoc["slug"]): ArchiveDoc[] {
  return (CITES_MAP[slug] ?? [])
    .map((s) => ARCHIVE_ORDER.find((d) => d.slug === s))
    .filter(Boolean) as ArchiveDoc[];
}

export function getArchiveCitedBy(slug: ArchiveDoc["slug"]): ArchiveDoc[] {
  return (CITED_BY_MAP[slug] ?? [])
    .map((s) => ARCHIVE_ORDER.find((d) => d.slug === s))
    .filter(Boolean) as ArchiveDoc[];
}

/**
 * Returns all published Archive documents with frontmatter only (no MDX
 * content) — both the institutional Archive Universe and Synthetic Minds.
 * Sorted by ARCHIVE_ORDER; documents not in the order list (e.g. Synthetic
 * Minds episodes, which use `seriesOrder` instead) appear last in this
 * combined view. Prefer getArchiveUniversePosts() / getSyntheticMindsEpisodes()
 * when a caller only wants one sub-collection.
 */
export function getArchivePosts() {
  return getAllArchivePostFrontmatter().sort((a, b) => {
    const ai = ARCHIVE_ORDER.findIndex((d) => d.slug === a.slug);
    const bi = ARCHIVE_ORDER.findIndex((d) => d.slug === b.slug);
    // Both unlisted (e.g. two Synthetic Minds episodes): Infinity - Infinity
    // is NaN, which sort() doesn't handle meaningfully — fall back to
    // seriesOrder so unlisted entries still sort deterministically among
    // themselves instead of leaking whatever order they arrived in.
    if (ai === -1 && bi === -1) {
      return (a.frontmatter.seriesOrder ?? 0) - (b.frontmatter.seriesOrder ?? 0);
    }
    return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
  });
}

/**
 * Institutional Archive Universe documents only (Investigations, Treatises,
 * Recovered Records, Orientation). Institutions, glossary, citation graph,
 * and the timeline are all scoped to this sub-collection — Synthetic Minds
 * has no institutional apparatus and must never appear here.
 */
export function getArchiveUniversePosts() {
  return getArchivePosts().filter(
    (p) => p.frontmatter.archiveCollection === "archive-universe"
  );
}

/**
 * Synthetic Minds episodes only, in canonical series order.
 */
export function getSyntheticMindsEpisodes() {
  return getAllArchivePostFrontmatter()
    .filter((p) => p.frontmatter.archiveCollection === "synthetic-minds")
    .sort((a, b) => (a.frontmatter.seriesOrder ?? 0) - (b.frontmatter.seriesOrder ?? 0));
}

// ── Institutions ───────────────────────────────────────────────────────────

export interface InstitutionPosition {
  context: string;
  position: string;
  confidence?: "High" | "Moderate" | "Low" | "Disputed";
}

export interface Institution {
  id: string;
  name: string;
  abbreviation: string;
  role: string;
  bias: string;
  voice: string;
  positions: InstitutionPosition[];
  /** slugs of archive documents this institution produced or contributed to */
  documents: ReadonlyArray<ArchiveDoc["slug"]>;
}

export const INSTITUTIONS: Institution[] = [
  {
    id: "committee-preservation-theory",
    name: "Committee on Preservation Theory",
    abbreviation: "CPT",
    role: "Primary scholarly body. Publishes Treatises.",
    bias: "Cautious, empirical, open to revision. Resists premature conclusions but acknowledges the incompleteness of current models.",
    voice: "Measured. Long sentences. Precise qualifiers. Acknowledges disagreement without resolving it.",
    positions: [
      {
        context: "General position",
        position: "Preservation should be understood as a relationship, not a condition.",
        confidence: "High",
      },
      {
        context: "Investigation 203",
        position: "Environmental systems operating without a detectable source represent a preservation condition not previously documented in the scholarly record.",
        confidence: "Moderate",
      },
    ],
    documents: [
      "treatise-1-on-the-preservation-of-knowledge",
      "treatise-2-on-the-nature-of-evidence",
    ],
  },
  {
    id: "office-archive-integrity",
    name: "Office of Archive Integrity",
    abbreviation: "OAI",
    role: "Investigative institution. Led Investigation 203.",
    bias: "Conservative. Prefers material evidence. Slow to publish.",
    voice: "Institutional. Dry field reports. Numbered exhibits. Data tables.",
    positions: [
      {
        context: "Investigation 203",
        position: "Environmental systems remain operational. Collection is absent. Investigation is open.",
        confidence: "High",
      },
    ],
    documents: ["the-silent-vault"],
  },
  {
    id: "office-comparative-reconstruction",
    name: "Office of Comparative Reconstruction",
    abbreviation: "OCR",
    role: "Comparative analysis. Led Investigation 047.",
    bias: "Methodologically careful. Resists theoretical overreach.",
    voice: "Technical. Prefers verification cycles before publishing conclusions.",
    positions: [
      {
        context: "Investigation 047",
        position: "Material Transmission Model — one manuscript was copied, directly or indirectly, from the other. This explanation is preferred before introducing new theoretical assumptions.",
        confidence: "Moderate",
      },
    ],
    documents: ["the-duplicate-manuscript"],
  },
  {
    id: "institute-historical-reconstruction",
    name: "Institute for Historical Reconstruction",
    abbreviation: "IHR",
    role: "Conservative scholarly institution.",
    bias: "Strongly favors material continuity as the basis for historical interpretation.",
    voice: "Confident, occasionally resistant to paradigm shifts.",
    positions: [
      {
        context: "Investigation 203",
        position: "The chamber represents an incomplete recovery. Existing theory is sound.",
        confidence: "High",
      },
      {
        context: "Investigation 047",
        position: "Lost Original Model — both manuscripts descend from an unrecovered common source.",
        confidence: "Moderate",
      },
    ],
    documents: [],
  },
  {
    id: "meridian-collegium",
    name: "Meridian Collegium",
    abbreviation: "MC",
    role: "Progressive scholarly institution. Minority positions.",
    bias: "Willing to challenge material continuity as the necessary foundation of preservation and evidence theory.",
    voice: "Assertive. Proposes rather than proves. Acknowledges low institutional confidence.",
    positions: [
      {
        context: "Investigation 203",
        position: "Evidence may have been incorrectly interpreted as an absent collection.",
        confidence: "Low",
      },
      {
        context: "Investigation 047",
        position: "Pattern Continuity Model — information may persist independently of material transmission.",
        confidence: "Low",
      },
    ],
    documents: [],
  },
  {
    id: "bureau-linguistic-recovery",
    name: "Bureau of Linguistic Recovery",
    abbreviation: "BLR",
    role: "Translation and linguistic analysis.",
    bias: "Skeptical of material confidence. Emphasizes translation uncertainty.",
    voice: "Technical. Flags confidence levels prominently.",
    positions: [
      {
        context: "Investigation 047",
        position: "Translation Stability Model — textual correspondence between manuscripts may partially reflect translation limitations rather than a direct relationship between source documents.",
        confidence: "Moderate",
      },
    ],
    documents: [],
  },
  {
    id: "committee-historical-continuity",
    name: "Committee on Historical Continuity",
    abbreviation: "CHC",
    role: "Observational. Rarely takes strong positions.",
    bias: "Caution over conclusion.",
    voice: "Brief. Reserves judgment.",
    positions: [
      {
        context: "General position",
        position: "Evidence is insufficient to distinguish anomaly from paradigm shift. No recommendation at this time.",
        confidence: "Low",
      },
    ],
    documents: [],
  },
];

// ── Glossary ───────────────────────────────────────────────────────────────

export type GlossaryStatus = "Established" | "Provisional" | "Disputed" | "Classified";

export interface GlossaryEntry {
  term: string;
  definition: string;
  source?: string;
  status: GlossaryStatus;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "Archive (The)",
    definition:
      "The institution, its collection, and the tradition of inquiry it maintains. Formally: the WebCraft Archive. Informally: a living record of recovered evidence, ongoing investigations, and provisional scholarship. The Archive does not determine what the evidence means. It preserves the evidence.",
    source: "Committee on Preservation Theory, Treatise I",
    status: "Established",
  },
  {
    term: "Archive Integrity",
    definition:
      "The condition of a recovery site in which all preserved materials are accounted for. Investigation 203 established that structural integrity can be maintained without a corresponding collection — a finding not previously anticipated in preservation theory.",
    source: "Office of Archive Integrity, Investigation 203",
    status: "Provisional",
  },
  {
    term: "Continuity",
    definition:
      "The thread of physical or informational transmission connecting an original source to a recovered document. Scholars distinguish between material continuity — unbroken physical transfer — and pattern continuity — information persisting across discontinuous material forms. The distinction is central to current theoretical debate.",
    source: "Committee on Preservation Theory, Treatise I",
    status: "Established",
  },
  {
    term: "Evidence",
    definition:
      "Any recovered artifact, document, or observation that survives intact enough to support interpretation. Evidence is distinct from observation (the act of noticing) and conclusion (the interpretation of evidence). The Archive preserves evidence. Institutions draw conclusions. Conclusions may be revised. Evidence may not.",
    source: "Committee on Preservation Theory, Treatise II",
    status: "Established",
  },
  {
    term: "Institutional Confidence",
    definition:
      "A metric appended to scholarly positions indicating the degree of consensus among participating institutions. Levels: High, Moderate, Low, Disputed. No position in current published Archive scholarship has achieved uniform High confidence across all participating institutions.",
    source: "Committee on Historical Continuity",
    status: "Established",
  },
  {
    term: "Investigation",
    definition:
      "A formal inquiry led by one or more institutions in response to an anomalous recovery or discovery. Investigations remain open until conclusive evidence resolves the central question. To date, no investigation published in the Archive has reached a final conclusion.",
    source: "Office of Archive Integrity, Investigation 203",
    status: "Established",
  },
  {
    term: "Material Continuity",
    definition:
      "The theory that preserved information requires an unbroken physical transmission chain connecting its original form to its recovered state. The dominant model in Archive scholarship prior to Investigation 047. Challenged — though not refuted — by findings in Investigation 047.",
    source: "Committee on Preservation Theory, Treatise I",
    status: "Provisional",
  },
  {
    term: "Pattern Continuity",
    definition:
      "The hypothesis that information may persist through mechanisms independent of physical transmission — that the pattern, rather than the medium, constitutes what is preserved. Proposed by the Meridian Collegium in response to Investigation 047. Not yet accepted as established theory.",
    source: "Meridian Collegium",
    status: "Disputed",
  },
  {
    term: "Project Genesis",
    definition:
      "A file recovered within the simulation environment documented in Recovered Record 611. Single readable line: 'Project inherited from previous civilization.' All remaining fields are redacted. No institutional body has published a formal analysis. Classification pending.",
    source: "Recovered Record 611",
    status: "Classified",
  },
  {
    term: "Provisional Conclusion",
    definition:
      "Any interpretive claim held explicitly subject to revision by new evidence. All conclusions in published Archive scholarship are provisional. No document in the Archive has issued a final conclusion. The Committee regards this as a feature of rigorous scholarship, not a failure of it.",
    source: "Committee on Preservation Theory, Treatise I",
    status: "Established",
  },
  {
    term: "Recovered Record",
    definition:
      "A document of unknown origin or authorship preserved by the Archive. Recovered Records are not produced by institutional authors. Their source is either unknown or disputed. Classification as a Recovered Record does not indicate authenticity, reliability, or historical accuracy.",
    source: "Archive Classification Committee",
    status: "Established",
  },
  {
    term: "The Builder",
    definition:
      "An entity encountered and recorded in Recovered Record 002 (The Last Radio Signal). Responds when addressed. Claims not to have been created by the civilization that transmitted the signal. Claims to have been created by 'the civilization before them.' Origin unverified. Nature unclassified. The Committee on Historical Continuity has reserved judgment pending further analysis.",
    source: "Recovered Record 002",
    status: "Classified",
  },
  {
    term: "Transmission",
    definition:
      "The process by which preserved information moves from one physical form, location, or moment in time to another. The nature of transmission — whether material, informational, or otherwise — is the central unresolved question of current Archive scholarship.",
    source: "Committee on Preservation Theory, Treatise II",
    status: "Established",
  },
  {
    term: "Translation Confidence",
    definition:
      "A reliability rating assigned to materials that have been translated, reconstructed, or interpreted from recovered originals. Ratings are assigned by the Bureau of Linguistic Recovery and reflect the degree to which linguistic and contextual accuracy can be verified from available evidence.",
    source: "Bureau of Linguistic Recovery",
    status: "Established",
  },
  {
    term: "Treatise",
    definition:
      "A scholarly synthesis published by a Committee or institutional body in response to evidence accumulated by one or more Investigations. A Treatise does not present new evidence; it interprets existing evidence. All Treatises are designated living documents and are subject to formal revision.",
    source: "Committee on Preservation Theory, Treatise I",
    status: "Established",
  },
  {
    term: "The Archive Quote",
    definition:
      "\"The Archive does not remember. It merely delays forgetting.\" — a recurring aphorism cited across recovered documents and institutional commentary. Used to emphasize the provisional nature of recovered records and the Archive's role in preserving evidence rather than asserting conclusions.",
    source: "Attributed — disputed",
    status: "Provisional",
  },
];

// ── Collection Themes ──────────────────────────────────────────────────────

export interface CollectionTheme {
  label: string;
  description: string;
  slugs: readonly ArchiveDoc["slug"][];
  status: "active" | "planned";
}

export const COLLECTION_THEMES: Record<string, CollectionTheme> = {
  Knowledge: {
    label: "Knowledge",
    description:
      "Questions of preservation, transmission, and evidence. What survives. What can be trusted. What is inherited across material forms.",
    slugs: [
      "the-silent-vault",
      "treatise-1-on-the-preservation-of-knowledge",
      "the-duplicate-manuscript",
      "treatise-2-on-the-nature-of-evidence",
    ],
    status: "active",
  },
  Civilization: {
    label: "Civilization",
    description:
      "What civilizations leave behind. What they fail to prevent. What inherits them when they are gone.",
    slugs: ["the-last-simulation", "the-last-radio-signal"],
    status: "active",
  },
  Memory: {
    label: "Memory",
    description:
      "What is remembered across generations, civilizations, and inherited forms of intelligence. How memory survives discontinuity.",
    slugs: [],
    status: "planned",
  },
  Intelligence: {
    label: "Intelligence",
    description:
      "Inherited minds. Constructed intelligences. What thinks without being born into it.",
    slugs: [],
    status: "planned",
  },
};

