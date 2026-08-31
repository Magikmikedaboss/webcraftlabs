/**
 * Resolves the publication/modification pair used by article metadata.
 *
 * `date` is always the original publication date and never changes when a
 * post is revised. `updated` is optional; when a post has never been revised
 * it is absent and `dateModified` falls back to `date`, which is what search
 * engines expect (rather than an omitted or null value).
 *
 * Kept as a standalone pure function so the fallback is covered by tests —
 * the metadata that consumes it lives in Next route files that are awkward
 * to exercise directly.
 */
export type ArticleDateFields = {
  /** Original publication date, ISO `YYYY-MM-DD`. */
  date: string;
  /** Last revision date, ISO `YYYY-MM-DD`. Absent if never revised. */
  updated?: string;
};

export type ResolvedArticleDates = {
  datePublished: string;
  /** Equals `datePublished` when the post has no `updated` date. */
  dateModified: string;
};

export function resolveArticleDates(frontmatter: ArticleDateFields): ResolvedArticleDates {
  const datePublished = frontmatter.date;
  const updated = typeof frontmatter.updated === "string" ? frontmatter.updated.trim() : "";
  return {
    datePublished,
    dateModified: updated.length > 0 ? updated : datePublished,
  };
}

export default resolveArticleDates;
