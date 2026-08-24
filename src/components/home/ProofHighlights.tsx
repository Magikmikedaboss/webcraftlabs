import Link from "next/link";
import { PROJECTS } from "@/app/portfolio/projects";

// Selected for a mix of website and custom-software proof, using only
// projects with real (non-placeholder) descriptive content in projects.ts.
// No project imagery exists in the repo today (every entry in
// PortfolioClient renders a labeled placeholder), so this is intentionally
// a text-led layout rather than an image grid.
export const FEATURED_IDS = ["nelfuoco", "leagueos", "ravehouse"] as const;

export const STATUS_LABEL: Record<(typeof PROJECTS)[number]["status"], string> = {
  live: "Live website",
  "business-demo": "Business demo",
  "in-development": "In development",
};

export default function ProofHighlights() {
  const featured = FEATURED_IDS.map((id) => PROJECTS.find((p) => p.id === id)).filter(
    (p): p is (typeof PROJECTS)[number] => Boolean(p)
  );

  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text)]">Recent work</h2>
          <p className="mt-3 text-base text-[var(--muted)]">
            A sample of what we&apos;ve built — from client-facing websites to internal admin systems.
          </p>
        </div>
        <Link
          href="/portfolio"
          className="text-sm font-semibold text-[var(--primary)] hover:opacity-80"
        >
          View the full portfolio →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((project) => (
          <div
            key={project.id}
            data-testid={`proof-card-${project.id}`}
            className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
                {project.projectType}
              </div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)] px-2 py-0.5 text-[10px] font-semibold text-[var(--muted)]"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: project.status === "live" ? "var(--primary)" : "var(--muted)" }}
                  aria-hidden="true"
                />
                {STATUS_LABEL[project.status]}
              </span>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-[var(--text)]">{project.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{project.tagline}</p>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{project.problem}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2.5 py-1 text-xs text-[var(--text)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
