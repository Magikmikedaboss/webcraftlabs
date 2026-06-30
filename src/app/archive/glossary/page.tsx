import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getBaseUrl } from "@/lib/site";
import { GLOSSARY, type GlossaryStatus } from "@/lib/archive";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scholarly Glossary — WebCraft Archive",
  description:
    "Provisional definitions maintained by the Committee on Preservation Theory. Terms central to Archive scholarship, evidence theory, and ongoing investigations.",
  alternates: { canonical: `${getBaseUrl()}/archive/glossary` },
};

const STATUS_STYLES: Record<GlossaryStatus, string> = {
  Established:  "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Provisional:  "text-amber-400  border-amber-400/30  bg-amber-400/10",
  Disputed:     "text-red-400    border-red-400/30    bg-red-400/10",
  Classified:   "text-violet-400 border-violet-400/30 bg-violet-400/10",
};

export default function GlossaryPage() {
  // Group terms by first letter
  const sorted = [...GLOSSARY].sort((a, b) =>
    a.term.replace(/^The /, "").localeCompare(b.term.replace(/^The /, ""))
  );

  const byLetter = sorted.reduce<Record<string, typeof GLOSSARY>>((acc, entry) => {
    const key = entry.term.replace(/^The /, "").charAt(0).toUpperCase();
    (acc[key] ??= []).push(entry);
    return acc;
  }, {});

  const letters = Object.keys(byLetter).sort();

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
              WebCraft Archive — Scholarly Glossary
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-none mb-6">
              Glossary
            </h1>
            <p className="max-w-2xl text-base text-slate-400 leading-relaxed mb-8">
              Provisional definitions maintained by the Committee on Preservation Theory.
              Definitions are subject to revision in response to new evidence.
              Definitions marked <em>Classified</em> are published in incomplete form by institutional decision.
            </p>
            {/* Status legend */}
            <div className="flex flex-wrap gap-3">
              {(Object.keys(STATUS_STYLES) as GlossaryStatus[]).map((s) => (
                <span key={s} className={`inline-flex items-center rounded border px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase ${STATUS_STYLES[s]}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Letter jump nav */}
        <div className="border-b border-slate-800/40 bg-[#07090f] sticky top-0 z-10">
          <div className="mx-auto max-w-5xl px-6 py-3 flex items-center gap-3 flex-wrap">
            {letters.map((l) => (
              <a key={l} href={`#letter-${l}`} className="text-[10px] font-mono text-slate-600 hover:text-slate-300 transition-colors tabular-nums">
                {l}
              </a>
            ))}
            <span className="ml-auto text-[10px] font-mono text-slate-700">{GLOSSARY.length} terms</span>
          </div>
        </div>

        {/* Terms */}
        <main className="mx-auto max-w-5xl px-6 py-12">
          {letters.map((letter) => (
            <section key={letter} id={`letter-${letter}`} className="mb-14 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl font-black text-slate-800 leading-none select-none">{letter}</span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>
              <div className="space-y-8">
                {byLetter[letter].map((entry) => (
                  <div key={entry.term} className="grid sm:grid-cols-[1fr_3fr] gap-4 sm:gap-8">
                    <div className="sm:pt-0.5">
                      <h2 className="text-base font-bold text-slate-100 leading-tight mb-2">{entry.term}</h2>
                      <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase ${STATUS_STYLES[entry.status]}`}>
                        {entry.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 leading-7">{entry.definition}</p>
                      {entry.source && (
                        <p className="mt-3 text-[10px] font-mono text-slate-700">
                          Source: {entry.source}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        {/* Footer nav */}
        <footer className="border-t border-slate-800/60">
          <div className="mx-auto max-w-5xl px-6 py-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[10px] font-mono tracking-[0.2em] text-slate-700 uppercase">
              All definitions provisional — subject to revision
            </p>
            <div className="flex gap-6">
              <Link href="/archive/institutions" className="text-[10px] font-mono text-slate-700 hover:text-slate-500 transition-colors">Institutions →</Link>
              <Link href="/archive/catalog" className="text-[10px] font-mono text-slate-700 hover:text-slate-500 transition-colors">Catalog →</Link>
            </div>
          </div>
        </footer>

      </div>
    </SiteShell>
  );
}
