import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getAllPosts } from "@/lib/mdx/blog";
import { getBaseUrl } from "@/lib/site";
import { ARCHIVE_ORDER } from "@/lib/archive";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebCraft Archive",
  description:
    "A living collection of recovered investigations, scholarly treatises, and historical reconstructions. Authenticity varies. Inquiry continues.",
  alternates: {
    canonical: `${getBaseUrl()}/archive`,
  },
};

type DocType = "Investigation" | "Treatise" | "Recovered Record" | "Orientation" | "Unknown";

function getDocType(archiveId: string | undefined): DocType {
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
    default: return "UNCLASSIFIED";
  }
}

function getStatusColor(type: DocType): string {
  switch (type) {
    case "Investigation": return "text-amber-400 border-amber-400/40 bg-amber-400/10";
    case "Treatise": return "text-cyan-400 border-cyan-400/40 bg-cyan-400/10";
    case "Recovered Record": return "text-violet-400 border-violet-400/40 bg-violet-400/10";
    case "Orientation": return "text-emerald-400 border-emerald-400/40 bg-emerald-400/10";
    default: return "text-slate-400 border-slate-400/40 bg-slate-400/10";
  }
}

function getTypeAccent(type: DocType): string {
  switch (type) {
    case "Investigation": return "border-l-amber-500";
    case "Treatise": return "border-l-cyan-500";
    case "Recovered Record": return "border-l-violet-500";
    case "Orientation": return "border-l-emerald-500";
    default: return "border-l-slate-500";
  }
}

export default function ArchivePage() {
  const allPosts = getAllPosts();
  const archivePosts = allPosts
    .filter((p) => p.frontmatter.collection === "webcraft-archive")
    .sort((a, b) => {
      const ai = ARCHIVE_ORDER.findIndex((d) => d.slug === a.slug);
      const bi = ARCHIVE_ORDER.findIndex((d) => d.slug === b.slug);
      return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
    });

  const investigations = archivePosts.filter(
    (p) => getDocType(p.frontmatter.archiveId) === "Investigation"
  );
  const treatises = archivePosts.filter(
    (p) => getDocType(p.frontmatter.archiveId) === "Treatise"
  );
  const recoveredRecords = archivePosts.filter(
    (p) => getDocType(p.frontmatter.archiveId) === "Recovered Record"
  );

  return (
    <SiteShell background="bg">
      <div className="min-h-screen bg-[#05080f] text-slate-200">

        {/* ── Header ─────────────────────────────────────────── */}
        <header className="border-b border-slate-800 bg-[#07090f]/80 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <p className="text-xs font-mono tracking-[0.25em] text-slate-500 uppercase mb-3">
              WebCraft Labz — Special Collection
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              WebCraft Archive
            </h1>
            <p className="max-w-2xl text-slate-400 leading-relaxed">
              A living collection of recovered investigations, scholarly treatises,
              and historical reconstructions. Records are incomplete.
              Interpretations remain provisional.
            </p>
            <blockquote className="mt-6 border-l-2 border-slate-600 pl-4 text-sm italic text-slate-500">
              &ldquo;The Archive does not announce truth. It preserves evidence.&rdquo;            </blockquote>
          </div>
        </header>

        {/* ── Stats bar ──────────────────────────────────────── */}
        <div className="border-b border-slate-800 bg-[#07090f]/60">
          <div className="mx-auto max-w-5xl px-6 py-4 flex flex-wrap gap-x-8 gap-y-2 text-xs font-mono">
            <Stat label="Recovered Documents" value={archivePosts.length} />
            <Stat label="Open Investigations" value={investigations.length} />
            <Stat label="Living Treatises" value={treatises.length} />
            <Stat label="Recovered Records" value={recoveredRecords.length} />
            <Stat label="Current Scholarly Consensus" value="Developing" />
          </div>
        </div>

        {/* ── Catalog ────────────────────────────────────────── */}
        <main className="mx-auto max-w-5xl px-6 py-12 space-y-16">

          {investigations.length > 0 && (
            <Section heading="Investigations" count={investigations.length}>
              {investigations.map((post) => (
                <ArchiveCard key={post.slug} post={post} />
              ))}
            </Section>
          )}

          {treatises.length > 0 && (
            <Section heading="Treatises" count={treatises.length}>
              {treatises.map((post) => (
                <ArchiveCard key={post.slug} post={post} />
              ))}
            </Section>
          )}

          {recoveredRecords.length > 0 && (
            <Section heading="Recovered Records" count={recoveredRecords.length}>
              {recoveredRecords.map((post) => (
                <ArchiveCard key={post.slug} post={post} />
              ))}
            </Section>
          )}


        </main>

        {/* ── Footer note ────────────────────────────────────── */}
        <footer className="border-t border-slate-800 mt-8">
          <div className="mx-auto max-w-5xl px-6 py-8 text-center">
            <p className="text-xs font-mono text-slate-600">
              ARCHIVE STATUS: ACTIVE — INQUIRY CONTINUES
            </p>
          </div>
        </footer>

      </div>
    </SiteShell>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-2 text-slate-500">
      <span className="uppercase tracking-widest">{label}</span>
      <span className="text-slate-300 font-semibold">{value}</span>
    </div>
  );
}

function Section({
  heading,
  count,
  children,
}: {
  heading: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xs font-mono tracking-[0.2em] text-slate-500 uppercase">
          {heading}
        </h2>
        <div className="flex-1 h-px bg-slate-800" />
        <span className="text-xs font-mono text-slate-600">{count}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function ArchiveCard({
  post,
}: {
  post: ReturnType<typeof getAllPosts>[number];
}) {
  const { frontmatter, slug } = post;
  const type = getDocType(frontmatter.archiveId);
  const statusLabel = getStatusLabel(type);
  const statusColor = getStatusColor(type);
  const accentColor = getTypeAccent(type);

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article
        className={`
          flex flex-col sm:flex-row sm:items-center gap-4
          border border-slate-800 border-l-2 ${accentColor}
          bg-slate-900/40 hover:bg-slate-900/80
          rounded-r-lg px-5 py-4
          transition-colors duration-150
        `}
      >
        {/* Left: archiveId + title */}
        <div className="flex-1 min-w-0">
          {frontmatter.archiveId && (
            <p className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-1">
              {frontmatter.archiveId}
            </p>
          )}
          <h3 className="text-base font-semibold text-slate-100 group-hover:text-white transition-colors leading-snug">
            {frontmatter.title}
          </h3>
          {frontmatter.summary && (
            <p className="mt-1 text-sm text-slate-500 line-clamp-1">
              {frontmatter.summary}
            </p>
          )}
        </div>

        {/* Right: status badge + date */}
        <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
          <span
            className={`
              text-[10px] font-mono tracking-widest uppercase
              border rounded px-2 py-0.5
              ${statusColor}
            `}
          >
            {statusLabel}
          </span>
          <span className="text-xs font-mono text-slate-600">
            {frontmatter.date}
          </span>
        </div>
      </article>
    </Link>
  );
}
