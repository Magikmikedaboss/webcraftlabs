"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import SiteShell from "@/components/SiteShell";
import type { Project } from "./projects";

function initials(title: string): string {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  "in-development": "In development",
};

/**
 * Deterministic per-project tint strength, derived only from the approved
 * --primary/--surface tokens via color-mix() — no new colors introduced,
 * just a distinct intensity per card so the grid doesn't look uniform.
 */
const TINT_STRENGTHS = ["14%", "20%", "26%", "18%", "24%", "30%"];
function tintFor(index: number): string {
  return TINT_STRENGTHS[index % TINT_STRENGTHS.length];
}

function StatusBadge({ status }: { status: Project["status"] }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        color: status === "live" ? "var(--primary)" : "var(--muted)",
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: status === "live" ? "var(--primary)" : "var(--muted)" }}
        aria-hidden="true"
      />
      {STATUS_LABEL[status]}
    </span>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium"
      style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
    >
      {children}
    </span>
  );
}

/**
 * Designed, screenshot-ready preview area. Renders a real image when one
 * exists; otherwise a deliberately-designed placeholder (project initials,
 * subtle window-chrome framing, status) — never a fabricated screenshot,
 * and never the literal word "placeholder" repeated on screen.
 */
function ProjectPreview({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    return (
      <div
        className="relative aspect-video w-full overflow-hidden rounded-xl border"
        style={{ borderColor: "var(--border)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- real screenshots are added later via next/image once actual files exist; this branch is exercised only in tests today */}
        <img src={project.image} alt={project.imageAlt ?? project.title} className="h-full w-full object-cover" />
      </div>
    );
  }

  const tint = tintFor(index);

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-xl border"
      style={{
        borderColor: "var(--border)",
        background: `linear-gradient(135deg, color-mix(in srgb, var(--primary) ${tint}, var(--surface)), var(--surface))`,
      }}
      role="img"
      aria-label={`${project.title} preview — ${STATUS_LABEL[project.status]}`}
    >
      <div className="absolute left-3 top-3 flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full" style={{ background: "var(--border)" }} />
        <span className="h-2 w-2 rounded-full" style={{ background: "var(--border)" }} />
        <span className="h-2 w-2 rounded-full" style={{ background: "var(--border)" }} />
      </div>
      <div className="absolute right-3 top-3">
        <StatusBadge status={project.status} />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold"
          style={{ background: "var(--primary)", color: "var(--bg)" }}
          aria-hidden="true"
        >
          {initials(project.title)}
        </div>
        <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
          Preview coming soon
        </span>
      </div>
    </div>
  );
}

function Drawer(props: { open: boolean; onClose: () => void; project: Project | null }) {
  const { open, onClose, project: p } = props;
  const asideRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement;

    const aside = asideRef.current;
    if (aside) {
      const focusable = aside.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) focusable[0].focus();
      else aside.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const aside = asideRef.current;
        if (!aside) return;

        const focusable = Array.from(
          aside.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el: HTMLElement) => !el.hasAttribute("disabled"));

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused.current instanceof HTMLElement) previouslyFocused.current.focus();
    };
  }, [open, onClose]);

  // Hooks above must always run in the same order every render, so this
  // early return — which unmounts the interactive backdrop, buttons, and
  // links while closed — has to come after them, not before.
  if (!open) return null;

  const canVisit = !!p && p.status === "live" && !!p.publicUrl;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      <button
        onClick={onClose}
        className="absolute inset-0 opacity-100 transition-opacity"
        style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
        aria-label="Close project details"
      />

      <aside
        ref={asideRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={p ? `${p.title} project details` : "Project details"}
        className="absolute right-0 top-0 h-full w-full max-w-[560px] translate-x-0 border-l shadow-2xl transition-transform"
        style={{ borderColor: "var(--border)", background: "var(--bg)" }}
      >
        <div className="flex h-full flex-col">
          <div
            className="flex items-start justify-between gap-4 border-b p-5"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="min-w-0">
              {p && (
                <div className="mb-1 flex items-center gap-2">
                  <StatusBadge status={p.status} />
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {p.projectType}
                  </span>
                </div>
              )}
              <div className="mt-1 truncate text-lg font-semibold" style={{ color: "var(--text)" }}>
                {p?.title ?? "Select a project"}
              </div>
              {p?.tagline ? (
                <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  {p.tagline}
                </div>
              ) : null}
            </div>

            <button
              onClick={onClose}
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {p ? (
              <div className="space-y-6">
                <section className="space-y-2">
                  <div
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--muted)" }}
                  >
                    Purpose
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                    {p.problem}
                  </p>
                </section>

                <section className="space-y-2">
                  <div
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--muted)" }}
                  >
                    What&apos;s been built so far
                  </div>
                  <ul className="list-disc space-y-1 pl-5 text-sm" style={{ color: "var(--text)" }}>
                    {p.build.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  {p.wins.length > 0 && (
                    <ul className="mt-2 space-y-1 text-sm" style={{ color: "var(--text)" }}>
                      {p.wins.map((x) => (
                        <li key={x} className="flex gap-2">
                          <span
                            className="mt-[6px] h-1.5 w-1.5 flex-none rounded-full"
                            style={{ background: "var(--primary)" }}
                          />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section className="space-y-2">
                  <div
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--muted)" }}
                  >
                    Technology
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((x) => (
                      <Chip key={x}>{x}</Chip>
                    ))}
                  </div>
                </section>

                {p.next?.length ? (
                  <section className="space-y-2">
                    <div
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--muted)" }}
                    >
                      Planned / Next
                    </div>
                    <ul className="list-disc space-y-1 pl-5 text-sm" style={{ color: "var(--text)" }}>
                      {p.next.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {canVisit && (
                  <section className="space-y-2">
                    <a
                      href={p.publicUrl}
                      target={p.publicUrl === "/" ? undefined : "_blank"}
                      rel={p.publicUrl === "/" ? undefined : "noopener noreferrer"}
                      className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium"
                      style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
                    >
                      Visit website
                    </a>
                  </section>
                )}
              </div>
            ) : (
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                Pick a project to view details.
              </div>
            )}
          </div>

          <div className="border-t p-5" style={{ borderColor: "var(--border)" }}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
                Want something like this built?
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold"
                style={{ background: "var(--primary)", color: "var(--bg)" }}
              >
                Request a build
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (id: string) => void;
}) {
  const canVisit = project.status === "live" && !!project.publicUrl;

  return (
    <div
      data-testid={`project-card-${project.id}`}
      className="group flex flex-col rounded-2xl border p-4 shadow-sm transition"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <ProjectPreview project={project} index={index} />

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium" style={{ color: "var(--muted)" }}>
            {project.projectType}
          </div>
          <div className="mt-1 text-base font-semibold" style={{ color: "var(--text)" }}>
            {project.title}
          </div>
          <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            {project.tagline}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((x) => (
          <Chip key={x}>{x}</Chip>
        ))}
        {project.stack.length > 4 ? <Chip>+{project.stack.length - 4}</Chip> : null}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => onOpen(project.id)}
          className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold transition"
          style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
        >
          View project details
        </button>
        {canVisit && (
          <a
            href={project.publicUrl}
            target={project.publicUrl === "/" ? undefined : "_blank"}
            rel={project.publicUrl === "/" ? undefined : "noopener noreferrer"}
            className="text-sm font-semibold hover:underline"
            style={{ color: "var(--primary)" }}
          >
            Visit website →
          </a>
        )}
      </div>
    </div>
  );
}

export default function PortfolioClient(props: { projects: Project[] }) {
  const { projects } = props;

  const liveCount = useMemo(() => projects.filter((p) => p.status === "live").length, [projects]);
  const inDevelopmentCount = projects.length - liveCount;

  const [activeId, setActiveId] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeProject = useMemo(() => projects.find((p) => p.id === activeId) ?? null, [projects, activeId]);

  function openProject(id: string) {
    setActiveId(id);
    setDrawerOpen(true);
  }

  return (
    <SiteShell
      background="bg"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Selected Builds" }]}
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero */}
        <header className="mb-10 max-w-3xl">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--primary)" }}
          >
            Selected Builds
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--text)" }}>
            Products, platforms, and digital experiences we&apos;re building
          </h1>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            A mix of live work and products still taking shape — real problems, real stacks, and an
            honest look at what&apos;s actually been built so far.
          </p>
        </header>

        {/* Honest counts */}
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <div className="text-3xl font-bold" style={{ color: "var(--text)" }}>{projects.length}</div>
            <div className="mt-1 text-sm font-semibold" style={{ color: "var(--muted)" }}>Selected builds</div>
          </div>
          <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <div className="text-3xl font-bold" style={{ color: "var(--text)" }}>{liveCount}</div>
            <div className="mt-1 text-sm font-semibold" style={{ color: "var(--muted)" }}>Live</div>
          </div>
          <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <div className="text-3xl font-bold" style={{ color: "var(--text)" }}>{inDevelopmentCount}</div>
            <div className="mt-1 text-sm font-semibold" style={{ color: "var(--muted)" }}>In development</div>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={openProject} />
          ))}
        </div>

        {/* Final CTA */}
        <div
          className="mt-12 rounded-2xl border p-6"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <div className="text-lg font-semibold" style={{ color: "var(--text)" }}>
            Want a build like this?
          </div>
          <p className="mt-2 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
            If you&apos;re turning an idea into a website, admin system, or product, we can help you
            ship something clean, fast, and scalable.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold"
              style={{ background: "var(--primary)", color: "var(--bg)" }}
            >
              Contact
            </a>
          </div>
        </div>

        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} project={activeProject} />
      </div>
    </SiteShell>
  );
}
