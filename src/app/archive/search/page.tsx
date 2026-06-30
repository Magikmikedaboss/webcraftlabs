import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getBaseUrl } from "@/lib/site";
import { getArchivePosts } from "@/lib/archive";
import ArchiveSearchClient from "@/components/archive/ArchiveSearchClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search — WebCraft Archive",
  description:
    "Search the WebCraft Archive. Titles, mysteries, and descriptions across all published investigations, treatises, and recovered records.",
  alternates: { canonical: `${getBaseUrl()}/archive/search` },
};

export default function ArchiveSearchPage() {
  const posts = getArchivePosts();

  const docs = posts.map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title as string,
    archiveId: p.frontmatter.archiveId as string | undefined,
    description: p.frontmatter.description as string | undefined,
    mystery: p.frontmatter.mystery as string | undefined,
    summary: p.frontmatter.summary as string | undefined,
    date: p.frontmatter.date as string | undefined,
  }));

  return (
    <SiteShell background="bg">
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
              WebCraft Archive — Document Search
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-none mb-4">
              Search
            </h1>
            <p className="text-base text-slate-500">
              Searches titles, mysteries, descriptions, and summaries across all published documents.
            </p>          </div>
        </header>

        <ArchiveSearchClient docs={docs} />

        {/* Footer nav */}
        <footer className="border-t border-slate-800/60">
          <div className="mx-auto max-w-5xl px-6 py-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[10px] font-mono tracking-[0.2em] text-slate-700 uppercase">
              {docs.length} documents indexed
            </p>
            <div className="flex gap-6">
              <Link href="/archive/collections" className="text-[10px] font-mono text-slate-700 hover:text-slate-500 transition-colors">Collections →</Link>
              <Link href="/archive/catalog" className="text-[10px] font-mono text-slate-700 hover:text-slate-500 transition-colors">Catalog →</Link>
            </div>
          </div>
        </footer>

      </div>
    </SiteShell>
  );
}
