import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getBaseUrl } from "@/lib/site";
import { getArchivePosts } from "@/lib/archive";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline — WebCraft Archive",
  description:
    "Publication timeline of the WebCraft Archive. Recovered investigations, treatises, and records in the order they entered the scholarly record.",
  alternates: { canonical: `${getBaseUrl()}/archive/timeline` },
};

const DOC_TYPE_STYLES: Record<string, { border: string; text: string; label: string; ring: string }> = {
  Investigation:      { border: "border-l-amber-500",   text: "text-amber-400",   label: "OPEN",           ring: "ring-amber-500/50" },
  Treatise:           { border: "border-l-cyan-500",    text: "text-cyan-400",    label: "LIVING DOC",     ring: "ring-cyan-500/50" },
  "Recovered Record": { border: "border-l-violet-500",  text: "text-violet-400",  label: "UNKNOWN ORIGIN", ring: "ring-violet-500/50" },
  Orientation:        { border: "border-l-emerald-500", text: "text-emerald-400", label: "ACTIVE",          ring: "ring-emerald-500/50" },
};

function getDocStyle(archiveId?: string) {
  if (!archiveId) return DOC_TYPE_STYLES.Orientation;
  for (const [key, style] of Object.entries(DOC_TYPE_STYLES)) {
    if (archiveId.startsWith(key)) return style;
  }
  return DOC_TYPE_STYLES.Orientation;
}

export default function TimelinePage() {
  const posts = getArchivePosts();

  // Sort by publication date, newest first for display; exclude Orientation from main flow
  const chronological = posts
    .filter((post) => !String(post.frontmatter.archiveId ?? "").startsWith("Orientation"))
    .sort((a, b) =>
      String(b.frontmatter.date ?? "").localeCompare(String(a.frontmatter.date ?? ""))
    );
  // Group by year
  const byYear = chronological.reduce<Record<string, typeof posts>>((acc, post) => {
    const raw = String(post.frontmatter.date ?? "");
    const candidate = raw.slice(0, 4);
    const year = /^\d{4}$/.test(candidate) ? candidate : "Unknown";
    (acc[year] ??= []).push(post);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

  return (
    <SiteShell background="bg" asMain={false}>
      <div className="min-h-screen bg-[#05080f] text-slate-200">

        {/* Archive Status */}
        <div className="border-b border-slate-800/40 bg-[#07090f]">
          <div className="mx-auto max-w-5xl px-6 py-3 flex items-center gap-6 flex-wrap">
            <span className="text-[10px] font-mono tracking-[0.3em] text-slate-600 uppercase">Archive Status</span>
            <span className="text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase">Active</span>
            <span className="text-[10px] font-mono tracking-[0.3em] text-slate-600 uppercase">Inquiry Continues</span>
            <Link href="/archive" className="ml-auto text-[10px] font-mono text-slate-700 hover:text-slate-500 transition-colors">
              ← Archive
            </Link>
          </div>
        </div>

        {/* Header */}
        <header className="border-b border-slate-800">
          <div className="mx-auto max-w-5xl px-6 pt-16 pb-12">
            <p className="text-[11px] font-mono tracking-[0.3em] text-slate-600 uppercase mb-4">
              WebCraft Archive — Publication Timeline
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-none mb-6">
              Timeline
            </h1>
            <p className="max-w-xl text-base text-slate-400 leading-relaxed mb-2">
              Documents in the order they entered the scholarly record.
              Publication date is not the same as the date of the events described.
            </p>
            <p className="text-sm text-slate-600 italic">
              The Archive&rsquo;s internal chronology is separate from its publication history.
            </p>
          </div>
        </header>

        {/* Timeline */}
        <main className="mx-auto max-w-5xl px-6 py-14">
          {years.map((year) => (
            <div key={year} className="mb-14">
              {/* Year marker */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-px h-8 bg-slate-800 ml-3" />
                <span className="text-4xl font-black text-slate-800 tabular-nums leading-none">{year}</span>
                <div className="flex-1 h-px bg-slate-800/60" />
                <span className="text-[10px] font-mono text-slate-700">{byYear[year].length} doc{byYear[year].length !== 1 ? "s" : ""}</span>
              </div>

              {/* Docs for this year */}
              <div className="ml-3 space-y-0 border-l border-slate-800 pl-8">
                {byYear[year].map((post, i) => {
                  const style = getDocStyle(post.frontmatter.archiveId as string | undefined);
                  const rawDate = post.frontmatter.date as string | undefined;
                  const parsedDate = rawDate ? new Date(rawDate) : null;
                  const displayDate =
                    parsedDate && Number.isFinite(parsedDate.getTime())
                      ? parsedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
                      : "Date unknown";

                  return (
                    <div key={post.slug} className={`relative pb-8 ${i === byYear[year].length - 1 ? "pb-0" : ""}`}>
                      {/* Timeline dot */}
                      <div className={`absolute -left-[2.125rem] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#05080f] ring-1 ${style.ring} bg-slate-700`} />

                      <Link
                        href={`/archive/${post.slug}`}
                        className={`group block border border-slate-800 border-l-2 ${style.border} rounded-r-lg bg-slate-900/20 hover:bg-slate-900/60 transition-colors px-5 py-4`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                              <p className={`text-[10px] font-mono tracking-widest uppercase ${style.text} opacity-80`}>
                                {post.frontmatter.archiveId as string}
                              </p>
                              <span className={`border rounded px-1.5 py-0.5 text-[9px] font-mono tracking-widest uppercase ${style.text} border-current opacity-40`}>
                                {style.label}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug">
                              {post.frontmatter.title as string}
                            </p>
                            {post.frontmatter.mystery && (
                              <p className="mt-1.5 text-xs text-slate-600 italic leading-relaxed line-clamp-1">
                                {post.frontmatter.mystery as string}
                              </p>
                            )}
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-[10px] font-mono text-slate-700 whitespace-nowrap">{displayDate}</p>
                            <p className="mt-1 text-xs font-mono text-slate-700 group-hover:text-slate-500 transition-colors">→</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </main>

        {/* Footer nav */}
        <footer className="border-t border-slate-800/60">
          <div className="mx-auto max-w-5xl px-6 py-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[10px] font-mono tracking-[0.2em] text-slate-700 uppercase">
              {chronological.length} documents — publication order
            </p>
            <div className="flex gap-6">
              <Link href="/archive/search" className="text-[10px] font-mono text-slate-700 hover:text-slate-500 transition-colors">Search →</Link>
              <Link href="/archive/catalog" className="text-[10px] font-mono text-slate-700 hover:text-slate-500 transition-colors">Catalog →</Link>
            </div>
          </div>
        </footer>

      </div>
    </SiteShell>
  );
}
