import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getBaseUrl } from "@/lib/site";
import { getArchiveUniversePosts, getSyntheticMindsEpisodes, ARCHIVE_ORDER } from "@/lib/archive";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebCraft Archive — Creative Works & Experiments",
  description:
    "The creative wing of WebCraft Labz—a growing collection of speculative fiction, experimental narratives, imagined worlds, and unconventional digital work.",
  alternates: {
    canonical: `${getBaseUrl()}/archive`,
  },
};

export default function ArchiveLanding() {
  const archivePosts = getArchiveUniversePosts();
  const episodes = getSyntheticMindsEpisodes();

  const investigations = archivePosts.filter((p) =>
    p.frontmatter.archiveId?.startsWith("Investigation")
  );
  const treatises = archivePosts.filter((p) =>
    p.frontmatter.archiveId?.startsWith("Treatise")
  );
  const recoveredRecords = archivePosts.filter((p) =>
    p.frontmatter.archiveId?.startsWith("Recovered Record")
  );

  // Recommended entry point: The Last Simulation — resolve by slug so changes
  // to ARCHIVE_ORDER ordering won't affect which document is recommended.
  const entryDocMeta = ARCHIVE_ORDER.find((d) => d.slug === "the-last-simulation");
  const entryPost = entryDocMeta && archivePosts.find((p) => p.slug === entryDocMeta.slug);

  return (
    <SiteShell background="bg" showArchiveQuote>
      <div className="min-h-screen bg-[#05080f] text-slate-200 flex flex-col">

        {/* ── Archive Status ─────────────────────────────────── */}
        <div className="border-b border-slate-800/40 bg-[#07090f]">
          <div className="mx-auto max-w-5xl px-6 py-3 flex items-center gap-6">
            <span className="text-[10px] font-mono tracking-[0.3em] text-slate-600 uppercase">
              Archive Status
            </span>
            <span className="text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase">
              Active
            </span>
            <span className="text-[10px] font-mono tracking-[0.3em] text-slate-600 uppercase">
              Inquiry Continues
            </span>
          </div>
        </div>

        {/* ── Hero ─────────────────────────────────────────── */}
        <header className="border-b border-slate-800">
          <div className="mx-auto max-w-5xl px-6 pt-20 pb-16">

            <p className="text-[11px] font-mono tracking-[0.3em] text-slate-600 uppercase mb-6">
              WebCraft Labz — Creative Works &amp; Experiments
            </p>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-none mb-10">
              WebCraft<br />Archive
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl text-slate-200 leading-relaxed mb-8">
              The creative wing of WebCraft Labz — a growing collection of speculative fiction,
              experimental narratives, imagined worlds, and unconventional digital work.
            </p>

            {/* Cinematic opening — the Archive Universe is a fictional frame story */}
            <div className="max-w-2xl mb-10 space-y-5">
              <p className="text-[10px] font-mono tracking-[0.25em] text-slate-600 uppercase">
                Inside the Archive: The Archive Universe (speculative fiction)
              </p>
              <p className="text-base text-slate-400 leading-relaxed">
                The WebCraft Archive Universe began with a discovery that should not have been possible.
                Researchers recovered a sealed collection of documents — investigations, field notes,
                technical reports, recovered records — none of which matched the age of the site
                in which they were found. Several cited archives that did not appear to exist.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                Entirely fictional. No accepted historical explanation currently accounts for either
                discovery, because there isn&rsquo;t one — it&rsquo;s a story.
              </p>
            </div>

            <blockquote className="max-w-xl text-base sm:text-lg text-slate-400 italic leading-relaxed mb-10 border-l-2 border-slate-700 pl-5">
              &ldquo;The Archive does not announce truth. It preserves evidence.&rdquo;
            </blockquote>

            {/* Institutional data plates */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-800 border border-slate-800 rounded-lg overflow-hidden mb-10">
              <DataPlate label="Documents" value={archivePosts.length} />
              <DataPlate label="Investigations" value={investigations.length} />
              <DataPlate label="Treatises" value={treatises.length} />
              <DataPlate label="Recovered Records" value={recoveredRecords.length} />
            </div>

            {/* Primary CTA */}
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/archive/catalog"
                className="inline-flex items-center gap-2 bg-slate-100 text-slate-900 font-semibold text-sm px-7 py-3 rounded-lg hover:bg-white transition-colors"
              >
                Enter the Archive
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/archive/welcome-to-the-archive"
                className="text-sm font-mono text-slate-600 hover:text-slate-300 transition-colors"
              >
                New here? Read the orientation →
              </Link>
            </div>
          </div>
        </header>

        {/* ── Start Here ───────────────────────────────────── */}
        {entryPost && (
          <section className="border-b border-slate-800">
            <div className="mx-auto max-w-5xl px-6 py-14">
              <p className="text-[10px] font-mono tracking-[0.3em] text-slate-600 uppercase mb-6">
                Recommended Entry Point for New Researchers
              </p>
              <Link href={`/archive/${entryDocMeta.slug}`} className="group block max-w-2xl">
                <div className="border border-slate-800 border-l-2 border-l-violet-500 bg-slate-900/40 hover:bg-slate-900/80 rounded-r-lg px-6 py-6 transition-colors">
                  <p className="text-[10px] font-mono tracking-widest text-violet-400/80 uppercase mb-2">
                    {entryDocMeta.archiveId}
                  </p>
                  <h2 className="text-xl font-bold text-slate-100 group-hover:text-white mb-3 transition-colors">
                    {entryDocMeta.title}
                  </h2>
                  {entryPost.frontmatter.pullQuote ? (
                    <p className="text-sm italic text-slate-500 mb-5 leading-relaxed">
                      &ldquo;{entryPost.frontmatter.pullQuote}&rdquo;
                    </p>
                  ) : entryPost.frontmatter.summary ? (
                    <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                      {entryPost.frontmatter.summary}
                    </p>
                  ) : null}
                  <span className="text-xs font-mono text-slate-600 group-hover:text-slate-300 transition-colors">
                    Begin Reading →
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ── Synthetic Minds — a separate creative collection ────────── */}
        {episodes.length > 0 && (
          <section className="border-b border-slate-800">
            <div className="mx-auto max-w-5xl px-6 py-14">
              <p className="text-[10px] font-mono tracking-[0.3em] text-slate-600 uppercase mb-4">
                Also in the Archive — A Separate Collection
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border border-slate-800 border-l-2 border-l-cyan-500 rounded-r-lg px-6 py-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 mb-2">🧠 Synthetic Minds</h2>
                  <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                    A cinematic series exploring when intelligence begins inventing — {episodes.length} ordered
                    episodes, entirely separate from the Archive Universe fiction above. No institutions,
                    no citations, no evidence controls — just the series, in order.
                  </p>
                </div>
                <Link
                  href="/blog/synthetic-minds-series"
                  className="inline-flex shrink-0 items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  Start the series
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── Section Navigation ───────────────────────────── */}
        <section className="border-b border-slate-800">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <p className="text-[10px] font-mono tracking-[0.3em] text-slate-600 uppercase mb-8">
              Navigate the Archive
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800 border border-slate-800 rounded-lg overflow-hidden">
              {[
                { href: "/archive/catalog",      label: "Catalog",      desc: "Full reading sequence" },
                { href: "/archive/institutions",  label: "Institutions", desc: "Participating bodies" },
                { href: "/archive/collections",   label: "Collections",  desc: "Thematic groupings" },
                { href: "/archive/glossary",      label: "Glossary",     desc: "Provisional definitions" },
                { href: "/archive/timeline",      label: "Timeline",     desc: "Publication history" },
                { href: "/archive/search",        label: "Search",       desc: "Title, mystery, and summary search" },              ].map(({ href, label, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="group bg-[#07090f] hover:bg-slate-900 transition-colors px-6 py-5 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{label}</p>
                    <p className="text-[11px] font-mono text-slate-700 mt-0.5">{desc}</p>
                  </div>
                  <span className="text-slate-700 group-hover:text-slate-400 transition-colors text-xs font-mono">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────── */}
        <footer className="mt-auto border-t border-slate-800/60">
          <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[10px] font-mono tracking-[0.2em] text-slate-700 uppercase">
              Archive Status: Active — Inquiry Continues
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
              <Link
                href="/archive/welcome-to-the-archive"
                className="text-[10px] font-mono text-slate-700 hover:text-slate-500 transition-colors"
              >
                About the Archive →
              </Link>
              <Link
                href="/archive/catalog"
                className="text-[10px] font-mono text-slate-700 hover:text-slate-500 transition-colors"
              >
                Browse Catalog →
              </Link>
            </div>
          </div>
        </footer>

      </div>
    </SiteShell>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function DataPlate({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-[#07090f] px-4 py-5 text-center">
      <p className="text-3xl font-bold text-white mb-1 tabular-nums">{value}</p>
      <p className="text-[10px] font-mono tracking-widest text-slate-600 uppercase">{label}</p>
    </div>
  );
}
