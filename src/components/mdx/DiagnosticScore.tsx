/**
 * DiagnosticScore — a self-scoring block for diagnostic-style guides.
 *
 * Renders one scored category as a set of *behavioral* anchors: each anchor
 * pairs a score with an observable condition, so a reader grades what the
 * site actually does rather than picking an adjective. Intermediate scores
 * are described automatically from the gaps between supplied anchors, so the
 * component carries no content specific to any one article.
 *
 * Follows the same conventions as the other neutral MDX components
 * (Checklist, Stat, Callout): CSS custom properties for theming so it tracks
 * light/dark automatically, and defensive prop filtering so malformed
 * frontmatter-driven content renders nothing instead of breaking the page.
 */

export type DiagnosticAnchor = {
  /** Score this condition corresponds to. Clamped to 0..max. */
  score: number;
  /** Observable condition — what the site does at this score. */
  text: string;
};

function isValidAnchor(item: unknown): item is DiagnosticAnchor {
  if (item === null || typeof item !== "object") return false;
  const score = (item as { score?: unknown }).score;
  const text = (item as { text?: unknown }).text;
  if (typeof score !== "number" || !Number.isFinite(score)) return false;
  if (typeof text !== "string" || text.trim().length === 0) return false;
  return true;
}

/** Deterministic id fragment — no randomness, so SSR and client agree. */
function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "category"
  );
}

/** "1 and 3", "1", "2, 3 and 4" — for describing the unlisted scores. */
function joinReadable(values: number[]): string {
  if (values.length === 1) return String(values[0]);
  return `${values.slice(0, -1).join(", ")} and ${values[values.length - 1]}`;
}

export default function DiagnosticScore({
  category,
  anchors = [],
  evidence,
  max = 5,
}: {
  /** Name of the scored category, e.g. "Message Clarity". */
  category: string;
  /** Behavioral anchors. Order doesn't matter — they're sorted by score. */
  anchors?: DiagnosticAnchor[];
  /** Prompt naming the evidence required to claim an above-midpoint score. */
  evidence?: string;
  /** Top of the scale. Defaults to 5. */
  max?: number;
}) {
  const safeCategory = typeof category === "string" ? category.trim() : "";
  if (safeCategory.length === 0) return null;

  // Normalize before validating, not after: `max={0.5}` passes a naive `> 0`
  // check but floors to 0, which would collapse the scale to zero length and
  // clamp every anchor to 0. Validate the normalized integer instead.
  const flooredMax =
    typeof max === "number" && Number.isFinite(max) ? Math.floor(max) : 0;
  const safeMax = flooredMax >= 1 ? flooredMax : 5;

  const validAnchors = (Array.isArray(anchors) ? anchors : [])
    .filter(isValidAnchor)
    .map((a) => ({
      score: Math.max(0, Math.min(safeMax, Math.round(a.score))),
      text: a.text.trim(),
    }))
    .sort((a, b) => a.score - b.score);

  if (validAnchors.length === 0) return null;

  const anchored = new Set(validAnchors.map((a) => a.score));
  const lowest = validAnchors[0].score;
  const highest = validAnchors[validAnchors.length - 1].score;

  // Scores that sit *between* supplied anchors — described rather than listed.
  const between: number[] = [];
  for (let i = lowest + 1; i < highest; i += 1) {
    if (!anchored.has(i)) between.push(i);
  }

  const headingId = `diagnostic-score-${slugify(safeCategory)}`;
  const safeEvidence = typeof evidence === "string" ? evidence.trim() : "";

  return (
    <section
      aria-labelledby={headingId}
      className="not-prose my-10 overflow-hidden rounded-2xl border"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div
        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b px-4 py-3 sm:px-6"
        style={{ borderColor: "var(--border)" }}
      >
        <p
          className="text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: "var(--primary)" }}
        >
          Score yourself
        </p>
        <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          0–{safeMax}
        </p>
      </div>

      <div className="px-4 py-5 sm:px-6">
        <h4
          id={headingId}
          className="text-lg font-extrabold tracking-tight"
          style={{ color: "var(--text)" }}
        >
          {safeCategory}
        </h4>

        <dl className="mt-4 space-y-3">
          {validAnchors.map((anchor) => (
            <div key={anchor.score} className="flex items-start gap-3 sm:gap-4">
              <dt className="shrink-0">
                {/* --primary is verified AA against --surface in both themes
                    (see globals.css); --accent is not, so it isn't used as a
                    background behind --primary text here. */}
                <span
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg border font-mono text-sm font-bold"
                  style={{
                    borderColor: "var(--primary)",
                    color: "var(--primary)",
                    background: "var(--surface)",
                  }}
                >
                  <span className="sr-only">Score </span>
                  {anchor.score}
                </span>
              </dt>
              <dd
                className="min-w-0 text-sm leading-6"
                style={{ color: "var(--text)" }}
              >
                {anchor.text}
              </dd>
            </div>
          ))}
        </dl>

        {between.length > 0 && (
          <p className="mt-4 text-sm leading-6" style={{ color: "var(--muted)" }}>
            {between.length === 1 ? "A score of" : "Scores of"}{" "}
            {joinReadable(between)}{" "}
            {between.length === 1 ? "sits" : "sit"} between the anchors above.
          </p>
        )}

        {safeEvidence.length > 0 && (
          <div
            className="mt-5 rounded-xl border border-dashed p-4"
            style={{ borderColor: "var(--border)" }}
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.16em]"
              style={{ color: "var(--muted)" }}
            >
              Evidence required
            </p>
            <p
              className="mt-2 text-sm leading-6"
              style={{ color: "var(--text)" }}
            >
              {safeEvidence}
            </p>
          </div>
        )}

        <p
          className="mt-5 font-mono text-sm font-bold"
          style={{ color: "var(--text)" }}
        >
          {safeCategory}: ___ / {safeMax}
        </p>
      </div>
    </section>
  );
}
