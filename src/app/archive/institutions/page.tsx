import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getBaseUrl } from "@/lib/site";
import { INSTITUTIONS, getArchivePosts, type InstitutionPosition } from "@/lib/archive";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Institution Directory — WebCraft Archive",
  description:
    "The institutions that investigate, interpret, and publish within the WebCraft Archive. Their roles, biases, and current positions.",
  alternates: { canonical: `${getBaseUrl()}/archive/institutions` },
};

const CONFIDENCE_COLORS: Record<string, string> = {
  High: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Moderate: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  Low: "text-slate-400 border-slate-400/30 bg-slate-400/10",
  Disputed: "text-red-400 border-red-400/30 bg-red-400/10",
};

function ConfidenceBadge({ level }: { level: InstitutionPosition["confidence"] }) {
  if (!level) return null;
  const color = CONFIDENCE_COLORS[level] ?? CONFIDENCE_COLORS.Low;
  return (
    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase ${color}`}>
      {level}
    </span>
  );
}

export default function InstitutionsPage() {
  const published = getArchivePosts();
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
              WebCraft Archive — Institution Directory
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-none mb-6">
              Participating<br />Institutions
            </h1>
            <p className="max-w-2xl text-base text-slate-400 leading-relaxed">
              The institutions that investigate, interpret, and publish within the Archive.
              Each maintains a distinct role, methodology, and set of positions.
              No institution is authoritative. All positions are provisional.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-800 border border-slate-800 rounded-lg overflow-hidden max-w-lg">
              <DataPlate label="Institutions" value={INSTITUTIONS.length} />
              <DataPlate label="Investigations" value={published.filter((d) => d.frontmatter.archiveId?.startsWith("Investigation")).length} />
              <DataPlate label="Treatises" value={published.filter((d) => d.frontmatter.archiveId?.startsWith("Treatise")).length} />
              <DataPlate label="Open Questions" value="∞" />
            </div>
          </div>
        </header>

        {/* Institution list */}
        <main className="mx-auto max-w-5xl px-6 py-14 space-y-10">
          {INSTITUTIONS.map((inst) => {
            const docs = published.filter((d) => inst.documents.some((s) => s === d.slug));
            return (
              <article
                key={inst.id}
                className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/20"
              >
                {/* Inst header */}
                <div className="border-b border-slate-800 px-6 py-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-mono tracking-[0.25em] text-slate-600 uppercase mb-1">
                      {inst.abbreviation}
                    </p>
                    <h2 className="text-xl font-bold text-slate-100">{inst.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{inst.role}</p>
                  </div>
                  {docs.length > 0 && (
                    <div className="shrink-0 text-right">
                      <p className="text-[9px] font-mono tracking-widest text-slate-700 uppercase mb-1">Published</p>
                      <p className="text-xl font-bold text-slate-400 tabular-nums">{docs.length}</p>
                    </div>
                  )}
                </div>

                {/* Details grid */}
                <div className="grid sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                  <div className="px-6 py-5">
                    <p className="text-[10px] font-mono tracking-widest text-slate-700 uppercase mb-2">Methodology</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{inst.bias}</p>
                    <p className="mt-3 text-[10px] font-mono tracking-widest text-slate-700 uppercase mb-2">Voice</p>
                    <p className="text-sm text-slate-500 italic leading-relaxed">{inst.voice}</p>
                  </div>

                  <div className="px-6 py-5">
                    <p className="text-[10px] font-mono tracking-widest text-slate-700 uppercase mb-3">Current Positions</p>
                    <div className="space-y-4">
                      {inst.positions.map((pos, i) => (
                        <div key={i} className="border-l border-slate-800 pl-4">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">{pos.context}</p>
                            {pos.confidence && <ConfidenceBadge level={pos.confidence} />}
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">{pos.position}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Published documents */}
                {docs.length > 0 && (
                  <div className="border-t border-slate-800 px-6 py-4">
                    <p className="text-[10px] font-mono tracking-widest text-slate-700 uppercase mb-3">Published Documents</p>
                    <div className="flex flex-wrap gap-2">
                      {docs.map((doc) => (
                        <Link
                          key={doc.slug}
                          href={`/archive/${doc.slug}`}
                          className="group inline-flex items-center gap-2 border border-slate-800 hover:border-slate-600 rounded px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
                        >
                          <span className="text-slate-600">{doc.frontmatter.archiveId}</span>
                          <span>{doc.frontmatter.title}</span>
                          <span className="text-slate-700 group-hover:text-slate-500">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </main>

        {/* Footer nav */}
        <footer className="border-t border-slate-800/60 mt-4">
          <div className="mx-auto max-w-5xl px-6 py-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[10px] font-mono tracking-[0.2em] text-slate-700 uppercase">
              {INSTITUTIONS.length} institutions — positions provisional
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

function DataPlate({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-[#07090f] px-4 py-4 text-center">
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-[9px] font-mono tracking-widest text-slate-600 uppercase">{label}</p>
    </div>
  );
}
