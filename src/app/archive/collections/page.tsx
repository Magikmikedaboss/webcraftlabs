import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getBaseUrl } from "@/lib/site";
import { COLLECTION_THEMES, getArchivePosts } from "@/lib/archive";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections — WebCraft Archive",
  description:
    "Archive documents organized by thematic collection. Knowledge, Civilization, Memory, and Intelligence — four lenses on the same accumulated evidence.",
  alternates: { canonical: `${getBaseUrl()}/archive/collections` },
};

const COLLECTION_ACCENTS: Record<string, { border: string; text: string; glow: string }> = {
  Knowledge:    { border: "border-l-cyan-500",    text: "text-cyan-400",    glow: "bg-cyan-400/10" },
  Civilization: { border: "border-l-violet-500",  text: "text-violet-400",  glow: "bg-violet-400/10" },
  Memory:       { border: "border-l-amber-500",   text: "text-amber-400",   glow: "bg-amber-400/10" },
  Intelligence: { border: "border-l-emerald-500", text: "text-emerald-400", glow: "bg-emerald-400/10" },
};

export default function CollectionsPage() {
  const posts = getArchivePosts();
  const postsBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]));

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
              WebCraft Archive — Thematic Collections
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-none mb-6">
              Collections
            </h1>
            <p className="max-w-2xl text-base text-slate-400 leading-relaxed">
              Four thematic lenses applied to the accumulated evidence.
              Collections do not replace the reading sequence — they offer an alternate
              entry point for researchers arriving with a particular question.
            </p>
          </div>
        </header>

        {/* Collections grid */}
        <main className="mx-auto max-w-5xl px-6 py-14 space-y-10">
          {Object.entries(COLLECTION_THEMES).map(([key, theme]) => {
            const accent = COLLECTION_ACCENTS[key] ?? COLLECTION_ACCENTS.Knowledge;
            const docs = theme.slugs
              .map((slug) => {
                const doc = postsBySlug[slug];
                if (!doc && process.env.NODE_ENV !== "production") {
                  console.warn(`[collections] slug not found in published posts: "${slug}" (collection: ${key})`);
                }
                return doc;
              })
              .filter(Boolean);

            return (
              <section
                key={key}
                className={`border border-slate-800 border-l-2 ${accent.border} rounded-r-lg overflow-hidden`}
              >
                {/* Collection header */}
                <div className="px-6 py-6 border-b border-slate-800 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className={`text-2xl font-bold ${accent.text}`}>{theme.label}</h2>
                      {theme.status === "planned" && (
                        <span className="border border-slate-700 text-slate-600 text-[9px] font-mono tracking-widest uppercase rounded px-2 py-0.5">
                          Planned
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 max-w-xl leading-relaxed">{theme.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[9px] font-mono tracking-widest text-slate-700 uppercase mb-1">Documents</p>
                    <p className={`text-3xl font-bold tabular-nums ${docs.length > 0 ? "text-white" : "text-slate-700"}`}>
                      {docs.length > 0 ? docs.length : "—"}
                    </p>
                  </div>
                </div>

                {/* Document list */}
                {docs.length > 0 ? (
                  <div className="divide-y divide-slate-800/60">
                    {docs.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/archive/${post.slug}`}
                        className="group flex items-start justify-between gap-4 px-6 py-5 hover:bg-slate-900/40 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className={`text-[10px] font-mono tracking-widest uppercase mb-1 ${accent.text} opacity-70`}>
                            {post.frontmatter.archiveId as string}
                          </p>
                          <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug">
                            {post.frontmatter.title as string}
                          </p>
                          {post.frontmatter.mystery && (
                            <p className="mt-1 text-xs text-slate-600 italic leading-relaxed">
                              {post.frontmatter.mystery as string}
                            </p>
                          )}
                        </div>
                        <span className="shrink-0 text-xs font-mono text-slate-700 group-hover:text-slate-400 transition-colors mt-0.5">→</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-6 py-8">
                    <p className="text-sm text-slate-700 italic">
                      No documents have been assigned to this collection.
                      The Archive continues.
                    </p>
                  </div>
                )}
              </section>
            );
          })}
        </main>

        {/* Footer nav */}
        <footer className="border-t border-slate-800/60">
          <div className="mx-auto max-w-5xl px-6 py-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[10px] font-mono tracking-[0.2em] text-slate-700 uppercase">
              {Object.values(COLLECTION_THEMES).filter((t) => t.status === "active").length} active ·{" "}
              {Object.values(COLLECTION_THEMES).filter((t) => t.status === "planned").length} planned
            </p>
            <div className="flex gap-6">
              <Link href="/archive/glossary" className="text-[10px] font-mono text-slate-700 hover:text-slate-500 transition-colors">Glossary →</Link>
              <Link href="/archive/catalog" className="text-[10px] font-mono text-slate-700 hover:text-slate-500 transition-colors">Catalog →</Link>
            </div>
          </div>
        </footer>

      </div>
    </SiteShell>
  );
}
