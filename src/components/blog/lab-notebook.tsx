import Link from "next/link";
import type { ReactNode } from "react";

type Score = {
  label: string;
  value: number;
};

export function LabHero({
  label = "Research Note",
  date,
  title,
  edition,
  subtitle,
}: {
  label?: string;
  date?: string;
  title: string;
  edition?: string;
  subtitle?: string;
}) {
  return (
    <section className="px-5 sm:px-8 lg:px-16 xl:px-20 pb-16 lg:pb-24 pt-10 lg:pt-16">
      <div className="flex items-center justify-between font-mono text-xs text-blue-700">
        <span>{label}</span>
        {date && <span>{date}</span>}
      </div>
      <h1 className="mt-14 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-black leading-[0.92] tracking-tight text-slate-950">
        {title}
      </h1>
      {edition && (
        <p className="mt-5 inline-block rotate-[-2deg] rounded-full border-2 border-blue-600 px-4 py-1 font-mono text-3xl text-blue-700">
          {edition}
        </p>
      )}
      {subtitle && (
        <p className="mt-8 max-w-sm lg:max-w-lg font-mono text-sm md:text-base leading-7 md:leading-8 text-slate-700">
          {subtitle}
        </p>
      )}
      <div className="mt-20 lg:mt-32 text-center font-mono text-xs text-slate-500">
        Scroll to explore
        <div className="mx-auto mt-3 grid size-9 place-items-center rounded-full border border-slate-400">
          ↓
        </div>
      </div>
    </section>
  );
}

export function LabSection({
  number,
  eyebrow,
  title,
  note,
  children,
}: {
  number: string;
  eyebrow?: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-black/10 px-5 sm:px-8 lg:px-16 xl:px-20 py-14 lg:py-24">
      <p className="font-mono text-4xl lg:text-5xl text-blue-600">{number}</p>
      {eyebrow && (
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.24em] text-slate-700">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-950">
        {title}
      </h2>
      {note && (
        <p className="mt-2 rotate-[-2deg] font-mono text-blue-700">{note}</p>
      )}
      <div className="mt-8 space-y-6 text-base md:text-lg leading-8 md:leading-9 text-slate-800">
        {children}
      </div>
    </section>
  );
}

export function LabNote({
  title = "Lab Note",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="relative my-8 rotate-[-1deg] border border-yellow-300 bg-yellow-50 p-5 pt-7 lg:p-8 lg:pt-10 shadow-md">
      <div className="absolute -top-3 left-6 z-10 h-6 w-16 rotate-[-4deg] bg-amber-200/90 shadow-sm ring-1 ring-amber-300/60" />
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-700">
        {title}
      </p>
      <div className="mt-4 font-mono text-sm leading-7 text-slate-800">
        {children}
      </div>
    </aside>
  );
}

export function LabCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 p-5 lg:p-8 shadow-md ring-1 ring-black/5 backdrop-blur">
      {children}
    </div>
  );
}

export function FrameworkScorecard({
  name,
  byline,
  badge,
  icon,
  description,
  bestFor = [],
  scores = [],
  strengths = [],
  cons = [],
  href,
}: {
  name: string;
  byline?: string;
  badge?: string;
  icon?: ReactNode;
  description?: string;
  bestFor?: string[];
  scores?: Score[];
  strengths?: string[];
  cons?: string[];
  href?: string;
}) {
  return (
    <LabCard>
      <div className="flex items-start gap-4">
        <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-slate-950 text-2xl font-black text-white">
          {icon || name.charAt(0)}
        </div>
        <div>
          <h3 className="text-2xl font-black tracking-tight">{name}</h3>
          {byline && <p className="text-sm text-slate-500">{byline}</p>}
          {badge && (
            <span className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-blue-700">
              {badge}
            </span>
          )}
        </div>
      </div>
      {description && (
        <p className="mt-5 text-sm leading-7 text-slate-700">{description}</p>
      )}
      {!!bestFor.length && (
        <div className="mt-5 flex flex-wrap gap-2">
          {bestFor.map((item) => (
            <span
              key={item}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      )}
      {!!scores.length && (
        <div className="mt-6 space-y-3">
          {scores.map((score) => (
            <div key={score.label}>
              <div className="mb-1 flex justify-between font-mono text-xs">
                <span>{score.label}</span>
                <span>{score.value}/10</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${Math.max(0, Math.min(10, score.value)) * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {!!strengths.length && (
        <div className="mt-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            Strengths
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {strengths.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </div>
      )}
      {!!cons.length && (
        <div className="mt-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            Trade-offs
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {cons.map((item) => (
              <li key={item}>– {item}</li>
            ))}
          </ul>
        </div>
      )}
      {href && (
        <Link
          href={href}
          className="mt-6 inline-flex w-full justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold"
        >
          View full breakdown →
        </Link>
      )}
    </LabCard>
  );
}

export function LabStackDiagram() {
  const rows = [
    ["Frontend", "React", "Vue", "Svelte"],
    ["Full-Stack", "Next.js", "Nuxt", "SvelteKit", "Astro"],
    ["Backend", "Laravel", "Django", "FastAPI", "Express"],
    ["Database", "Postgres", "MySQL", "SQLite", "MongoDB"],
    ["Deploy", "Vercel", "Cloudflare", "AWS", "Railway"],
  ];

  return (
    <div className="space-y-4">
      {rows.map((row, index) => (
        <div key={row[0]}>
          <LabCard>
            <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
              {row[0]}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {row.slice(1).map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-center font-mono text-xs"
                >
                  {item}
                </div>
              ))}
            </div>
          </LabCard>
          {index < rows.length - 1 && (
            <div className="py-2 text-center font-mono text-2xl text-slate-400">
              ↓
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function DecisionFlow() {
  return (
    <div className="space-y-4 font-mono text-sm">
      <div className="mx-auto w-fit rounded-xl border border-slate-300 bg-white px-4 py-3">
        What are you building?
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 text-center">
          Content site or blog?
          <div className="mt-4 rounded-full border border-purple-300 bg-white px-3 py-2">
            Choose Astro
          </div>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
          Web app or SaaS?
          <div className="mt-4 grid gap-2">
            <span className="rounded-full border border-green-300 bg-white px-3 py-2 text-green-700">
              FastAPI backend?
            </span>
            <span className="rounded-full border border-red-300 bg-white px-3 py-2 text-red-700">
              Next.js app
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LabVerdict({
  title = "The Lab's Takeaway",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-black/10 px-5 sm:px-8 lg:px-16 xl:px-20 py-16 lg:py-24">
      <div className="mb-6 inline-flex rotate-[-6deg] rounded-full border-2 border-blue-600 bg-blue-600 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-white shadow-lg">
        Lab Verdict
      </div>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
        {title}
      </h2>
      <div className="mt-8 space-y-6 text-base md:text-lg leading-8 md:leading-9 text-slate-800">{children}</div>
    </section>
  );
}

// ─── Additional Lab Components ───────────────────────────────────────────────

type ContentsProps = { items: string[] };

type QuickPick = {
  title: string;
  name?: string;
  framework?: string;
  reason: string;
};

type FrameworkTableRow = {
  name: string;
  performance?: number;
  seo?: number;
  learning?: number;
  ecosystem?: number;
  best?: string;
};

type ExperimentResultItem = {
  label: string;
  score: number;
};

type FAQItem = {
  question: string;
  answer: string;
};

export function ScoreBar({ value }: { value: number }) {
  const safe = Math.max(0, Math.min(10, value));
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
      <div
        className="h-full rounded-full bg-blue-600"
        style={{ width: `${safe * 10}%` }}
      />
    </div>
  );
}

export function LabContents({ items = [] }: ContentsProps) {
  if (!items.length) return null;
  return (
    <section className="mx-5 sm:mx-8 lg:mx-16 xl:mx-20 mb-10 rounded-[1.5rem] bg-slate-950 p-5 lg:p-8 text-white shadow-xl">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-200">
        In This Report
      </p>
      <ol className="mt-5 space-y-3">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3 font-mono text-sm">
            <span className="text-blue-300">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function QuickPicks({ picks = [] }: { picks: QuickPick[] }) {
  if (!picks.length) return null;
  return (
    <section className="mx-5 sm:mx-8 lg:mx-16 xl:mx-20 my-10 lg:my-16">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-blue-700">
        Quick Picks
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((pick, index) => (
          <div
            key={`${pick.title}-${index}`}
            className="rounded-[1.5rem] border border-black/10 bg-white/80 p-5 shadow-sm"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-700">
              {pick.title}
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              {pick.framework || pick.name}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">{pick.reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FrameworkTable({ rows = [] }: { rows: FrameworkTableRow[] }) {
  if (!rows.length) return null;
  return (
    <div className="my-8 overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/80 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-slate-950 font-mono text-xs uppercase tracking-wide text-white">
            <tr>
              <th className="px-4 py-4">Framework</th>
              <th className="px-4 py-4">Performance</th>
              <th className="px-4 py-4">SEO</th>
              <th className="px-4 py-4">Learning</th>
              <th className="px-4 py-4">Best For</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-black/10">
                <td className="px-4 py-4 font-black">{row.name}</td>
                <td className="px-4 py-4">{row.performance ?? "—"}/10</td>
                <td className="px-4 py-4">{row.seo ?? "—"}/10</td>
                <td className="px-4 py-4">{row.learning ?? "—"}/10</td>
                <td className="px-4 py-4">{row.best || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function LabObservation({
  title = "Observation",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="relative my-8 rotate-[-1deg] border-l-4 border-blue-600 bg-blue-50/80 p-5 lg:p-8 shadow-md ring-1 ring-blue-200/50">
      <span className="absolute -left-[3px] top-3 h-6 w-1.5 rounded-r bg-blue-600" />
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-700">
        {title}
      </p>
      <div className="mt-4 font-mono text-sm leading-7 text-slate-800">
        {children}
      </div>
    </aside>
  );
}

export function ExperimentResult({
  title,
  subtitle,
  results = [],
}: {
  title: string;
  subtitle?: string;
  results: ExperimentResultItem[];
}) {
  if (!results.length) return null;
  return (
    <section className="my-8 rounded-[1.75rem] bg-slate-950 p-5 lg:p-8 text-white shadow-xl">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-200">
        Experiment Result
      </p>
      <h3 className="mt-4 text-3xl lg:text-4xl font-black tracking-tight">{title}</h3>
      {subtitle && (
        <p className="mt-2 text-sm leading-7 text-slate-300">{subtitle}</p>
      )}
      <div className="mt-6 space-y-5">
        {results.map((result) => {
          const safe = Math.max(0, Math.min(100, result.score));
          return (
            <div key={result.label}>
              <div className="mb-2 flex justify-between font-mono text-xs">
                <span>{result.label}</span>
                <span>{safe}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-blue-400"
                  style={{ width: `${safe}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function HandSketch({
  title = "Sketch",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-8 rounded-[1.5rem] border-2 border-dashed border-slate-400 bg-white/70 p-5 lg:p-8">
      <figcaption className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
        {title}
      </figcaption>
      <div className="font-mono text-sm leading-7 text-slate-800">{children}</div>
    </figure>
  );
}

export function LabStamp({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 inline-flex rotate-[-5deg] rounded-full border-2 border-blue-600 px-5 py-2 font-mono text-xs font-black uppercase tracking-[0.25em] text-blue-700">
      {children}
    </div>
  );
}

export function FrameworkAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="my-4 lg:my-6 rounded-[1.25rem] border border-black/10 bg-white/80 p-5 lg:p-8 shadow-sm">
      <summary className="cursor-pointer font-black text-slate-950">{title}</summary>
      <div className="mt-4 text-sm leading-7 text-slate-700">{children}</div>
    </details>
  );
}

export function FAQ({ items = [] }: { items: FAQItem[] }) {
  if (!items.length) return null;
  return (
    <section className="border-t border-black/10 px-5 sm:px-8 lg:px-16 xl:px-20 py-14 lg:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-700">
        Field Questions
      </p>
      <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight">FAQ</h2>
      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="rounded-[1.25rem] border border-black/10 bg-white/80 p-5 shadow-sm"
          >
            <summary className="cursor-pointer font-black text-slate-950">
              {item.question}
            </summary>
            <p className="mt-4 text-sm leading-7 text-slate-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function NextSteps({ steps = [] }: { steps: string[] }) {
  if (!steps.length) return null;
  return (
    <section className="mx-5 sm:mx-8 lg:mx-16 xl:mx-20 my-10 lg:my-16 rounded-[1.5rem] border border-black/10 bg-white/80 p-5 lg:p-8 shadow-sm">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-700">
        Next Steps
      </p>
      <ul className="mt-5 space-y-3">
        {steps.map((step) => (
          <li key={step} className="flex gap-3 text-sm leading-7 text-slate-700">
            <span className="font-black text-blue-700">✓</span>
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
