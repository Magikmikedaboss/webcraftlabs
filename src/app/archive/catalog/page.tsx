import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getBaseUrl } from "@/lib/site";
import { getArchivePosts } from "@/lib/archive";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive Catalog — WebCraft Archive",
  description:
    "Complete reading sequence for the WebCraft Archive. Recovered investigations, scholarly treatises, and historical reconstructions in curated order.",
  alternates: {
    canonical: `${getBaseUrl()}/archive/catalog`,
  },
};

type DocType = "Investigation" | "Treatise" | "Recovered Record" | "Orientation" | "Series Episode" | "Unknown";

function getDocType(
  archiveId: string | undefined,
  archiveCollection?: string
): DocType {
  if (archiveCollection === "synthetic-minds") return "Series Episode";
  if (!archiveId) return "Unknown";
  if (archiveId.startsWith("Investigation")) return "Investigation";
  if (archiveId.startsWith("Treatise")) return "Treatise";
  if (archiveId.startsWith("Recovered Record")) return "Recovered Record";
  if (archiveId === "Orientation") return "Orientation";
  return "Unknown";
}

function getStatusLabel(type: DocType): string {
  switch (type) {
    case "Investigation": return "OPEN";
    case "Treatise": return "LIVING DOCUMENT";
    case "Recovered Record": return "UNKNOWN ORIGIN";
    case "Orientation": return "ACTIVE";
    case "Series Episode": return "CREATIVE SERIES";
    default: return "UNCLASSIFIED";
  }
}

function getStatusColor(type: DocType): string {
  switch (type) {
    case "Investigation": return "text-amber-400 border-amber-400/40 bg-amber-400/10";
    case "Treatise": return "text-cyan-400 border-cyan-400/40 bg-cyan-400/10";
    case "Recovered Record": return "text-violet-400 border-violet-400/40 bg-violet-400/10";
    case "Orientation": return "text-emerald-400 border-emerald-400/40 bg-emerald-400/10";
    case "Series Episode": return "text-sky-400 border-sky-400/40 bg-sky-400/10";
    default: return "text-slate-400 border-slate-400/40 bg-slate-400/10";
  }
}

function getTypeAccent(type: DocType): string {
  switch (type) {
    case "Investigation": return "border-l-amber-500";
    case "Treatise": return "border-l-cyan-500";
    case "Recovered Record": return "border-l-violet-500";
    case "Orientation": return "border-l-emerald-500";
    case "Series Episode": return "border-l-sky-500";
    default: return "border-l-slate-500";
  }
}

export default function ArchiveCatalogPage() {
  const archivePosts = getArchivePosts();

  const investigations = archivePosts.filter(
    (p) => getDocType(p.frontmatter.archiveId) === "Investigation"
  );
  const treatises = archivePosts.filter(
    (p) => getDocType(p.frontmatter.archiveId) === "Treatise"
  );
  const recoveredRecords = archivePosts.filter(
    (p) => getDocType(p.frontmatter.archiveId) === "Recovered Record"
  );
  const seriesEpisodes = archivePosts.filter(
    (p) => getDocType(p.frontmatter.archiveId, p.frontmatter.archiveCollection) === "Series Episode"
  );

  return (
    <SiteShell background="bg">
      <div className="min-h-screen bg-[#05080f] text-slate-200">

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

        {/* ── Header ─────────────────────────────────────────── */}
        <header className="border-b border-slate-800 bg-[#07090f]/80 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <Link
              href="/archive"
              className="text-xs font-mono text-slate-600 hover:text-slate-400 transition-colors"
            >
              ← Back to Archive
            </Link>
            <p className="text-xs font-mono tracking-[0.25em] text-slate-500 uppercase mb-3 mt-6">
              WebCraft Archive
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Current Public Collection
            </h1>
            <p className="max-w-2xl text-slate-400 leading-relaxed">
              The Archive rewards curiosity. Understanding arrives through investigation.
            </p>
          </div>
        </header>

        {/* ── Collection stats ───────────────────────────────── */}
        <div className="border-b border-slate-800 bg-[#07090f]/60">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <p className="text-[10px] font-mono tracking-[0.25em] text-slate-700 uppercase mb-3">
              Current Public Collection
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-mono">
              <StatItem label="Documents Available" value={archivePosts.length} />
              <StatItem label="Open Investigations" value={investigations.length} />
              <StatItem label="Living Treatises" value={treatises.length} />
              <StatItem label="Recovered Records" value={recoveredRecords.length} />
              <StatItem label="Synthetic Minds Episodes" value={seriesEpisodes.length} />
              <StatItem label="Current Scholarly Consensus" value="Developing" />
            </div>
          </div>
        </div>

        {/* ── Catalog ────────────────────────────────────────── */}
        <div className="mx-auto max-w-5xl px-6 py-12">
          <section>
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-xs font-mono tracking-[0.2em] text-slate-500 uppercase">
                Current Public Collection
              </h2>
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-xs font-mono text-slate-600">{archivePosts.length}</span>
            </div>
            <div className="space-y-3">
              {archivePosts.map((post, i) => (
                <ArchiveCard key={post.slug} post={post} position={i + 1} />
              ))}
            </div>
          </section>
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="border-t border-slate-800/60 mt-8">
          <div className="mx-auto max-w-5xl px-6 py-8 flex items-center justify-between gap-4">
            <p className="text-[10px] font-mono tracking-[0.2em] text-slate-700 uppercase">
              Inquiry Continues
            </p>
            <Link
              href="/archive"
              className="text-[10px] font-mono text-slate-700 hover:text-slate-500 transition-colors"
            >
              ← Return to Archive
            </Link>
          </div>
        </footer>

      </div>
    </SiteShell>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-2 text-slate-500">
      <span className="uppercase tracking-widest">{label}</span>
      <span className="text-slate-300 font-semibold">{value}</span>
    </div>
  );
}

function ArchiveCard({
  post,
  position,
}: {
  post: ReturnType<typeof getArchivePosts>[number];
  position: number;
}) {
  const { frontmatter, slug } = post;
  const type = getDocType(frontmatter.archiveId, frontmatter.archiveCollection);
  const statusLabel = getStatusLabel(type);
  const statusColor = getStatusColor(type);
  const accentColor = getTypeAccent(type);
  const hook = frontmatter.summary || frontmatter.description || frontmatter.title;

  return (
    <Link href={`/archive/${slug}`} className="group block">
      <article
        className={`
          border border-slate-800 border-l-2 ${accentColor}
          bg-slate-900/40 hover:bg-slate-900/80
          rounded-r-lg px-6 py-5
          transition-colors duration-150
        `}
      >
        {/* Identity header: archiveId + title + position */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            {frontmatter.archiveId ? (
              <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest mb-1">
                {frontmatter.archiveId}
              </p>
            ) : type === "Series Episode" ? (
              <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest mb-1">
                Synthetic Minds — Episode {frontmatter.seriesOrder}
              </p>
            ) : null}
            <h3 className="text-sm text-slate-400 font-medium">
              {frontmatter.title}
            </h3>
          </div>
          <span className="hidden sm:block font-mono text-[10px] text-slate-800 shrink-0 mt-0.5 select-none">
            {position}
          </span>
        </div>

        {/* Mystery hook — the lead */}
        <p className="text-slate-100 group-hover:text-white leading-relaxed mb-4 transition-colors">
          {hook}
        </p>
        {/* Mystery */}
        {frontmatter.mystery && (
          <div className="border-t border-slate-800/60 pt-3 mb-4">
            <p className="text-[10px] font-mono tracking-widest text-slate-700 uppercase mb-1.5">
              Mystery
            </p>
            <p className="text-sm italic text-slate-400">
              {frontmatter.mystery}
            </p>
          </div>
        )}
        {/* Status footer */}
        <div className="flex justify-end">
          <span
            className={`
              text-[10px] font-mono tracking-widest uppercase
              border rounded px-2 py-0.5
              ${statusColor}
            `}
          >
            {statusLabel}
          </span>
        </div>
      </article>
    </Link>
  );
}
