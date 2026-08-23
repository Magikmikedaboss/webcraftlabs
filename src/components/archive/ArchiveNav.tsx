import Link from "next/link";
import {
  ARCHIVE_ORDER,
  getArchiveCites,
  getArchiveCitedBy,
  getArchiveUniversePosts,
  getSyntheticMindsEpisodes,
  type ArchiveDoc,
} from "@/lib/archive";

/**
 * Synthetic Minds episodes get a lightweight series-order nav — no citation
 * graph, no institutional reading sequence, no evidence controls. Those
 * concepts belong only to the Archive Universe.
 */
function SyntheticMindsNav({ slug }: { slug: string }) {
  const episodes = getSyntheticMindsEpisodes();
  const pos = episodes.findIndex((e) => e.slug === slug);
  if (pos === -1) return null;

  const current = episodes[pos];
  const prev = pos > 0 ? episodes[pos - 1] : null;
  const next = pos < episodes.length - 1 ? episodes[pos + 1] : null;

  return (
    <div className="border-t border-slate-800 bg-[#07090f] text-slate-300">
      <div className="mx-auto max-w-5xl px-6 py-10 space-y-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase">
            Synthetic Minds / Episode {current.frontmatter.seriesOrder} of {episodes.length}
          </p>
          <Link
            href="/blog/synthetic-minds-series"
            className="text-xs font-mono text-slate-500 hover:text-slate-200 transition-colors whitespace-nowrap"
          >
            ← Series overview
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prev ? (
            <Link
              href={`/archive/${prev.slug}`}
              className="group block border border-slate-800 rounded-lg px-5 py-4 text-left hover:border-slate-700 hover:bg-slate-900/60 transition-colors"
            >
              <p className="text-[10px] font-mono tracking-widest text-slate-600 uppercase mb-1">← Previous</p>
              <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {prev.frontmatter.title}
              </p>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
          {next ? (
            <Link
              href={`/archive/${next.slug}`}
              className="group block border border-slate-800 rounded-lg px-5 py-4 text-right hover:border-slate-700 hover:bg-slate-900/60 transition-colors"
            >
              <p className="text-[10px] font-mono tracking-widest text-slate-600 uppercase mb-1">Next →</p>
              <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {next.frontmatter.title}
              </p>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ArchiveNav({
  slug,
  archiveCollection,
}: {
  slug: ArchiveDoc["slug"];
  archiveCollection?: "archive-universe" | "synthetic-minds";
}) {
  if (archiveCollection === "synthetic-minds") {
    return <SyntheticMindsNav slug={slug} />;
  }

  // Derive navigation only from actually published, archive-universe posts
  // so links never point to unpublished/future slugs — or to Synthetic
  // Minds episodes, which have no place in the institutional reading
  // sequence or citation graph.
  const published: ReturnType<typeof getArchiveUniversePosts> = getArchiveUniversePosts();
  const publishedSlugs = new Set(published.map((p) => p.slug));
  const seq = published.map((p) => {
    const meta = ARCHIVE_ORDER.find((d) => d.slug === p.slug);
    return {
      slug: p.slug,
      archiveId: meta?.archiveId ?? p.frontmatter.archiveId ?? p.slug,
      title: p.frontmatter.title ?? meta?.title ?? p.slug,
    } as ArchiveDoc;
  });

  const pos = seq.findIndex((d) => d.slug === slug);
  if (pos === -1) return null;

  const current = seq[pos];
  const prev = pos > 0 ? seq[pos - 1] : null;
  const next = pos < seq.length - 1 ? seq[pos + 1] : null;

  // Only show cites/cited-by entries that are published
  const cites = getArchiveCites(slug).filter((d) => publishedSlugs.has(d.slug));
  const citedBy = getArchiveCitedBy(slug).filter((d) => publishedSlugs.has(d.slug));

  return (
    <div className="border-t border-slate-800 bg-[#07090f] text-slate-300">
      <div className="mx-auto max-w-5xl px-6 py-10 space-y-8">

        {/* Breadcrumb + return link */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase">
            Archive / {current.archiveId}
          </p>
          <Link
            href="/archive"
            className="text-xs font-mono text-slate-500 hover:text-slate-200 transition-colors whitespace-nowrap"
          >
            ← Return to Archive
          </Link>
        </div>

        {/* Prev / Next navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prev ? (
            <NavCard doc={prev} direction="prev" />
          ) : (
            <div className="hidden sm:block" />
          )}
          {next ? (
            <NavCard doc={next} direction="next" />
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>

        {/* Cross-reference section */}
        {(cites.length > 0 || citedBy.length > 0) && (
          <div className="border-t border-slate-800 pt-7 grid sm:grid-cols-2 gap-6">
            {cites.length > 0 && (
              <RefGroup label="Cites" docs={cites} />
            )}
            {citedBy.length > 0 && (
              <RefGroup label="Cited By" docs={citedBy} />
            )}
          </div>
        )}

        {/* Reading sequence */}
        <div className="border-t border-slate-800 pt-7">
          <p className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase mb-4">
            Archive Reading Sequence
          </p>
          <ol className="space-y-1">
            {seq.map((doc, i) => {
              const isCurrent = doc.slug === slug;
              return (
                <li key={doc.slug}>
                  <Link
                    href={`/archive/${doc.slug}`}
                    className={`
                      flex items-baseline gap-3 rounded px-2 py-1.5 -mx-2
                      text-sm transition-colors
                      ${isCurrent
                        ? "bg-slate-800/60 text-slate-100"
                        : "text-slate-500 hover:text-slate-300"
                      }
                    `}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    <span className="font-mono text-[10px] text-slate-700 w-4 shrink-0 text-right">
                      {i + 1}
                    </span>
                    <span className="font-mono text-[10px] text-slate-600 w-36 shrink-0 truncate">
                      {doc.archiveId}
                    </span>
                    <span className={`truncate ${isCurrent ? "font-medium" : ""}`}>
                      {doc.title}
                    </span>
                    {isCurrent && (
                      <span className="ml-auto text-[10px] font-mono text-slate-500 shrink-0">
                        ← you are here
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-6 flex items-center justify-between gap-4">
          <p className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase">
            Inquiry continues.
          </p>
          <p className="text-[10px] font-mono text-slate-700">
            Document {pos + 1} of {seq.length}
          </p>
        </div>

      </div>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────── */

function NavCard({
  doc,
  direction,
}: {
  doc: ArchiveDoc;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/archive/${doc.slug}`}
      className={`
        group block border border-slate-800 rounded-lg px-5 py-4
        hover:border-slate-700 hover:bg-slate-900/60 transition-colors
        ${isPrev ? "text-left" : "text-right"}
      `}
    >
      <p className="text-[10px] font-mono tracking-widest text-slate-600 uppercase mb-1">
        {isPrev ? "← Previous" : "Next →"}
      </p>
      <p className="text-[10px] font-mono text-slate-600 mb-1">
        {doc.archiveId}
      </p>
      <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
        {doc.title}
      </p>
    </Link>
  );
}

function RefGroup({ label, docs }: { label: string; docs: ArchiveDoc[] }) {
  return (
    <div>
      <p className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase mb-3">
        {label}
      </p>
      <div className="space-y-2">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/archive/${doc.slug}`}
            className="flex items-baseline gap-2 group"
          >
            <span className="font-mono text-[10px] text-slate-600 shrink-0">
              {doc.archiveId}
            </span>
            <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
              — {doc.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
