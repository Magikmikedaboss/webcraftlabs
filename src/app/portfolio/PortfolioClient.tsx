"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import SiteShell from "@/components/SiteShell";
import type { Project } from "./projects";

function classNames(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

// Extract a numeric sort key from year strings like "2024-2025"
function yearSortKey(y: string) {
  const m = y.match(/\d{4}/);
  return m ? Number(m[0]) : 9999;
}

function PlaceholderImage(props: { label: string }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mx-auto mb-2 h-10 w-10 rounded-lg border border-neutral-200 bg-white shadow-sm" />
          <div className="text-sm font-medium text-neutral-800">{props.label}</div>
          <div className="mt-1 text-xs text-neutral-500">Placeholder image (swap later)</div>
        </div>
      </div>
    </div>
  );
}

function Chip(props: { children: React.ReactNode; tone?: "neutral" | "soft" }) {
  const tone = props.tone ?? "neutral";
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        tone === "neutral" && "border-neutral-200 bg-white text-neutral-700",
        tone === "soft" && "border-neutral-200 bg-neutral-50 text-neutral-700"
      )}
    >
      {props.children}
    </span>
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

  return (
    <div
      aria-hidden={!open}
      className={classNames("fixed inset-0 z-50", open ? "pointer-events-auto" : "pointer-events-none")}
    >
      {/* Backdrop */}
      <button
        onClick={onClose}
        className={classNames("absolute inset-0 transition-opacity", open ? "opacity-100" : "opacity-0")}
        style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
        aria-label="Close case study"
      />

      {/* Panel */}
      <aside
        ref={asideRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={p ? `${p.title} case study` : "Case study"}
        className={classNames(
          "absolute right-0 top-0 h-full w-full max-w-[560px] border-l border-neutral-200 bg-white shadow-2xl transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-neutral-200 p-5">
            <div className="min-w-0">
              <div className="text-xs font-medium tracking-wide text-neutral-500">
                {p?.year} · {p?.phase}
              </div>
              <div className="mt-1 truncate text-lg font-semibold text-neutral-900">
                {p?.title ?? "Select a project"}
              </div>
              {p?.tagline ? <div className="mt-1 text-sm text-neutral-600">{p.tagline}</div> : null}
              {p?.role ? <div className="mt-2 text-xs text-neutral-500">{p.role}</div> : null}
            </div>

            <button
              onClick={onClose}
              className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {p ? (
              <div className="space-y-6">
                <PlaceholderImage label={`${p.title} screens`} />

                <section className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Problem</div>
                  <p className="text-sm leading-relaxed text-neutral-700">{p.problem}</p>
                </section>

                <section className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Build</div>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
                    {p.build.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((x) => (
                      <Chip key={x} tone="soft">
                        {x}
                      </Chip>
                    ))}
                  </div>
                </section>

                <section className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Wins</div>
                  <ul className="space-y-1 text-sm text-neutral-700">
                    {p.wins.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 flex-none rounded-full bg-neutral-400" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {p.next?.length ? (
                  <section className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Next moves</div>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
                      {p.next.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {p.links?.length ? (
                  <section className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Links</div>
                    <div className="flex flex-wrap gap-2">
                      {p.links.map((l) =>
                        l.href && l.href !== "#" ? (
                          <a
                            key={l.label}
                            href={l.href}
                            className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                          >
                            {l.label}
                          </a>
                        ) : (
                          <span
                            key={l.label}
                            className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700"
                            aria-disabled="true"
                            tabIndex={-1}
                          >
                            {l.label}
                          </span>
                        )
                      )}
                    </div>
                  </section>
                ) : null}
              </div>
            ) : (
              <div className="text-sm text-neutral-600">Pick a project to view the mini case study.</div>
            )}
          </div>

          <div className="border-t border-neutral-200 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-medium text-neutral-900">Want something like this built?</div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                Request a build
              </a>
            </div>
            <div className="mt-2 text-xs text-neutral-500">
              This drawer is reusable. Swap placeholder images with real screenshots anytime.
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function PortfolioClient(props: { projects: Project[] }) {
  const { projects } = props;

  const phases = useMemo(() => {
    const map = new Map<string, Project[]>();
    for (const p of projects) {
      if (!map.has(p.phase)) map.set(p.phase, []);
      map.get(p.phase)!.push(p);
    }
    for (const [k, arr] of map.entries()) {
      arr.sort((a, b) => yearSortKey(a.year) - yearSortKey(b.year));
      map.set(k, arr);
    }
    return Array.from(map.entries());
  }, [projects]);

  const [activeId, setActiveId] = useState<string>(projects[0]?.id ?? "");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeProject = useMemo(() => projects.find((p) => p.id === activeId) ?? null, [projects, activeId]);

  function openProject(id: string) {
    setActiveId(id);
    setDrawerOpen(true);
  }

  return (
    <SiteShell background="surface">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero */}
        <header className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 md:p-12 shadow-xl">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white border border-white/30">
              <span className="h-2 w-2 rounded-full bg-cyan-200" />
              Portfolio
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              WebCraft LabZ
              <span className="block mt-2 bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Project Timeline
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-blue-50">
              Scroll the timeline, click any project, and explore the problems solved, the stack used, and the wins delivered.
            </p>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        </header>

        {/* Stats */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-blue-700">{projects.length}</div>
            <div className="mt-1 text-sm font-semibold text-blue-600">Projects</div>
            <div className="mt-2 text-xs text-gray-600">From concept to completion</div>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-cyan-700">2024-2026</div>
            <div className="mt-1 text-sm font-semibold text-cyan-600">Timeline</div>
            <div className="mt-2 text-xs text-gray-600">Building the future</div>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-blue-700">∞</div>
            <div className="mt-1 text-sm font-semibold text-blue-600">Systems</div>
            <div className="mt-2 text-xs text-gray-600">Web, content, admin, platform</div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Timeline rail */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 shadow-sm">
              <div className="text-sm font-semibold text-blue-900">Timeline</div>

              <div className="mt-3 space-y-4">
                {phases.map(([phase, items]) => (
                  <div key={phase} className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">{phase}</div>

                    <div className="space-y-1">
                      {items.map((p) => {
                        const active = p.id === activeId;
                        return (
                          <button
                            key={p.id}
                            onClick={() => openProject(p.id)}
                            className={classNames(
                              "group flex w-full items-start gap-3 rounded-xl border px-3 py-2 text-left transition-all duration-200",
                              active
                                ? "border-blue-400 bg-gradient-to-r from-blue-100 to-cyan-100 shadow-md"
                                : "border-blue-200 bg-white hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:shadow-sm"
                            )}
                          >
                            <span
                              className={classNames(
                                "mt-1 h-2.5 w-2.5 flex-none rounded-full transition-all duration-200",
                                active
                                  ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                                  : "bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:from-cyan-500 group-hover:to-blue-500"
                              )}
                            />
                            <span className="min-w-0">
                              <span className="block text-xs font-medium text-blue-600">{p.year}</span>
                              <span className="block truncate text-sm font-semibold text-blue-900 group-hover:text-cyan-700">
                                {p.title}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-blue-200 pt-4 text-xs text-blue-600">
                Tip: Click any project to open the mini case study drawer.
              </div>
            </div>
          </aside>

          {/* Project list */}
          <div className="space-y-8">
            {phases.map(([phase, items]) => (
              <div key={phase} className="space-y-3">
                <div className="flex items-end justify-between gap-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 p-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">{phase}</div>
                    <div className="mt-1 text-lg font-semibold text-blue-900">
                      {items[0]?.year} – {items[items.length - 1]?.year}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {items.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => openProject(p.id)}
                      className="group rounded-2xl border border-neutral-200 bg-white p-4 text-left shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-medium text-neutral-500">{p.year}</div>
                          <div className="mt-1 text-base font-semibold text-neutral-900">{p.title}</div>
                          <div className="mt-1 text-sm text-neutral-600">{p.tagline}</div>
                        </div>
                        <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 group-hover:bg-neutral-50">
                          Open
                        </span>
                      </div>

                      <div className="mt-4">
                        <PlaceholderImage label="Project preview" />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.stack.slice(0, 4).map((x) => (
                          <Chip key={x} tone="neutral">
                            {x}
                          </Chip>
                        ))}
                        {p.stack.length > 4 ? <Chip tone="neutral">+{p.stack.length - 4}</Chip> : null}
                      </div>

                      <div className="mt-4 text-xs text-neutral-500">
                        Click to view Problem → Build → Stack → Wins.
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <div className="text-lg font-semibold text-neutral-900">Want a build like this?</div>
              <p className="mt-2 max-w-2xl text-sm text-neutral-600">
                If you&apos;re turning a website into a lead system, admin system, or content engine, I can help you ship something clean, fast, and scalable.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                  Contact
                </a>
                <span
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800"
                  aria-disabled="true"
                  tabIndex={-1}
                >
                  Download PDF (later)
                </span>
              </div>
            </div>
          </div>
        </div>

        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} project={activeProject} />
      </main>
    </SiteShell>
  );
}
