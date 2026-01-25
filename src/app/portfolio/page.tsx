"use client";

import { useMemo, useState } from "react";
import SiteShell from "@/components/SiteShell";

type Project = {
  id: string;
  year: string;
  phase: string;
  title: string;
  tagline: string;
  role?: string;
  problem: string;
  build: string[];
  stack: string[];
  wins: string[];
  next?: string[];
  links?: { label: string; href: string }[];
};

const PROJECTS: Project[] = [
  // 2024 - Early Days
  {
    id: "fixitwithmike",
    year: "2024-2025",
    phase: "Monetization & Content",
    title: "Fix It With Mike",
    tagline: "Content blog and local service website with affiliate system and lead generation.",
    role: "Content architecture + monetization + design + dev",
    problem:
      "Needed a content platform that could generate revenue through affiliate partnerships while building authority in the handyman space, evolving into a conversion-focused local service website to turn search traffic into phone calls and booked jobs.",
    build: [
      "Content layouts optimized for SEO",
      "Affiliate link integration and tracking",
      "Multiple monetization paths (ads, affiliates, services)",
      "Strategic content calendar and keyword targeting",
      "Mobile-first service pages optimized for local search intent",
      "Clear call-to-action flows ('Call Now', 'Get Help Fast')",
      "Trust and credibility sections (experience, service scope, FAQs)",
      "Performance-friendly structure for faster load times",
    ],
    stack: ["WordPress", "SEO", "Affiliate Marketing", "Content Strategy", "HTML", "CSS", "JavaScript", "Local SEO", "Schema.org"],
    wins: ["Established content pipeline", "Multiple revenue streams", "Growing organic traffic", "Clearer conversion path", "Mobile-optimized lead generation", "Analytics-ready layout"],
    next: ["Scale content production", "Add video content", "Expand affiliate partnerships", "Add service-area landing pages", "Add review carousel + GBP embed", "Add lightweight booking intake"],
    links: [{ label: "Live Site", href: "#" }],
  },
  {
    id: "fundlinkz",
    year: "2024",
    phase: "Monetization & Content",
    title: "FundLinkZ Donation Templates",
    tagline: "Reusable donation pages with QR flows and Stripe integration.",
    role: "Template system + payment architecture",
    problem:
      "Organizations needed quick, professional donation pages without building from scratch every time.",
    build: [
      "Reusable donation page templates",
      "QR code generation for easy mobile giving",
      "Stripe-ready payment architecture",
      "Customizable branding and messaging",
    ],
    stack: ["HTML/CSS", "JavaScript", "Stripe API", "QR Codes"],
    wins: ["Faster deployment for clients", "Reusable template system", "Mobile-friendly giving"],
    next: ["Add recurring donation options", "Build donor management dashboard", "Add analytics tracking"],
  },
  {
    id: "nelfuoco",
    year: "2025",
    phase: "Core Business Sites",
    title: "Nel Fuoco (Artist Site)",
    tagline: "Multi-page artist portfolio with media embeds and tour dates.",
    role: "Design + Development",
    problem:
      "Artist needed a professional online presence to showcase work, promote tours, and direct fans to merch.",
    build: [
      "Multi-page site with media embeds (music, video)",
      "Tour dates and contact forms",
      "Merch direction and e-commerce integration",
      "Mobile-responsive gallery and media players",
    ],
    stack: ["React", "CSS", "Media APIs", "E-commerce"],
    wins: ["Professional artist presence", "Integrated media showcase", "Clear fan engagement paths"],
    next: ["Add ticket sales integration", "Build email list capture", "Add exclusive content section"],
  },
  {
    id: "webcraft",
    year: "2025",
    phase: "Core Business Sites",
    title: "WebCraft Labz",
    tagline: "Agency Website & Content System",
    role: "Brand direction + system design",
    problem:
      "WebCraft Labs needed a productized agency website that positions services as systems rather than one-off deliverables. The site had to balance clean visual design with a scalable content architecture, allowing blogs, news, and service pages to grow without redesigning every few months.",
    build: [
      "Modular services layout framed as 'builds' instead of generic offerings",
      "Blog and news system designed for long-term publishing",
      "Conversion-focused homepage and service sections",
      "Reusable UI components for rapid iteration",
    ],
    stack: ["Next.js", "Tailwind CSS", "MDX", "Analytics"],
    wins: ["More credible positioning", "Content pipeline ready", "Reusable components"],
    next: ["Add case studies + results blocks", "Add lead magnet + email capture", "Add audit request flow"],
    links: [{ label: "This Site", href: "/" }],
  },
  {
    id: "biotech",
    year: "2025",
    phase: "Core Business Sites",
    title: "Biohacking Research Platform",
    tagline: "Educational & Compliance-Aware Content Architecture",
    role: "Content architecture + compliance",
    problem:
      "This project focused on building a research-first content platform for biohacking and science-based topics. The challenge was credibility—presenting complex topics clearly without hype, misinformation, or regulatory risk.",
    build: [
      "Clear content taxonomy and page hierarchy",
      "Tone and structure guidelines for research-only content",
      "Single-focus educational sections (no product selling)",
      "Scalable layout for future articles and references",
    ],
    stack: ["Content Architecture", "Information Design", "SEO", "Compliance"],
    wins: ["Credible scientific positioning", "Compliant content structure", "Clear research communication"],
    next: ["Add research paper repository", "Build newsletter system", "Add researcher profiles"],
  },
  {
    id: "ravehouse",
    year: "2026",
    phase: "Apps & Platforms",
    title: "Ravehouse Entertainment",
    tagline: "Events Platform & Brand Experience",
    role: "Full-stack build + UI system",
    problem:
      "Ravehouse Entertainment needed a custom events platform for an underground music brand. The goal was to create a digital home that felt alive, immersive, and scalable while supporting real operational needs like events, galleries, and admin management.",
    build: [
      "Full Next.js app structure with brand-driven UI",
      "Events and gallery pages using reusable components",
      "Theme mode system (Rave / Chill)",
      "Admin dashboard direction for managing content",
      "Interactive concepts like a graffiti wall and VIP roadmap",
    ],
    stack: ["Next.js", "Tailwind CSS", "Component UI System", "Content Modeling"],
    wins: ["Platform direction unlocked", "Reusable admin template", "Consistent brand experience", "Unique interactive features"],
    next: ["Finish event CMS workflow", "Add email capture + drop alerts", "Add membership/VIP gating"],
    links: [{ label: "Project", href: "#" }],
  },
  {
    id: "ayso",
    year: "2026",
    phase: "Apps & Platforms",
    title: "AYSO Soccer Admin App",
    tagline: "Admin Dashboard & Data System",
    role: "Data model + admin UX",
    problem:
      "The AYSO Soccer Admin App is a modern, mobile-first admin system built to replace manual league management workflows. The focus was usability, guardrails, and scalability—making complex operations feel simple without relying on spreadsheets.",
    build: [
      "Divisions management page with role-based access",
      "Server actions for safe data mutations",
      "Season picker and responsive admin views",
      "Reusable dashboard layout for future modules",
    ],
    stack: ["Next.js", "Tailwind CSS", "Prisma ORM", "Supabase Auth"],
    wins: ["Cleaner ops workflow", "Scalable schema approach", "Reusable admin building blocks"],
    next: ["Add schedules + roster tooling", "Add exports + audit logs", "Add volunteer/role assignments UI"],
    links: [{ label: "Project", href: "#" }],
  },
  {
    id: "airemodeling",
    year: "2026",
    phase: "Apps & Platforms",
    title: "AI Remodeling SaaS",
    tagline: "AI-powered handyman platform with photo analysis and renders.",
    role: "Product concept + architecture",
    problem:
      "Homeowners struggle to visualize remodeling projects and get accurate estimates. Contractors need better tools for proposals.",
    build: [
      "Photo analysis for project assessment",
      "Before/after render generation",
      "Monetization planning and pricing models",
      "Contractor and homeowner workflows",
    ],
    stack: ["AI/ML", "Image Processing", "SaaS Architecture", "Payment Systems"],
    wins: ["Innovative product concept", "Clear monetization path", "Dual-sided marketplace potential"],
    next: ["Build MVP with basic photo analysis", "Add estimate calculator", "Launch beta with select contractors"],
  },
  {
    id: "blackhatwelders",
    year: "2026",
    phase: "Core Business Sites",
    title: "Black Hat Welders Service Site",
    tagline: "Professional welding service website with lead generation.",
    role: "Design + Development + SEO",
    problem:
      "Black Hat Welders needed a professional online presence to showcase services, generate leads, and build credibility in the local welding market.",
    build: [
      "Service-focused pages with clear CTAs",
      "Lead generation forms and contact integration",
      "Local SEO optimization and Google Business Profile setup",
      "Mobile-responsive design with service galleries",
    ],
    stack: ["Next.js", "Tailwind CSS", "SEO", "Lead Generation"],
    wins: ["Improved online visibility", "Lead generation system", "Professional brand presentation"],
    next: ["Add service booking system", "Integrate customer testimonials", "Expand service area pages"],
  },
  {
    id: "analyticsresearch",
    year: "2026",
    phase: "Apps & Platforms",
    title: "Analytics Research Platform",
    tagline: "Data analytics and research platform for insights.",
    role: "Full-stack development + data architecture",
    problem:
      "Organizations needed a platform to analyze data, generate insights, and share research findings with stakeholders.",
    build: [
      "Data visualization dashboards",
      "Research report generation tools",
      "User authentication and role-based access",
      "API integrations for data sources",
    ],
    stack: ["React", "Node.js", "Data Visualization", "Analytics APIs"],
    wins: ["Streamlined research process", "Improved data insights", "Scalable platform architecture"],
    next: ["Add advanced analytics features", "Implement machine learning models", "Expand user collaboration tools"],
  },
];

function classNames(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
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

import React, { useRef, useEffect } from "react";

function Drawer(props: {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}) {
  const p = props.project;
  const asideRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<Element | null>(null);

  // Focus management and Escape/Tab trap
  useEffect(() => {
    if (props.open) {
      previouslyFocused.current = document.activeElement;
      // Focus the first focusable element in the drawer
      const aside = asideRef.current;
      if (aside) {
        const focusable = aside.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          aside.focus();
        }
      }
      // Keydown handler for Escape and Tab trap
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          props.onClose();
        } else if (e.key === "Tab") {
          const aside = asideRef.current;
          if (!aside) return;
          const focusable = Array.from(
            aside.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => !el.hasAttribute('disabled'));
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
        // Restore focus
        if (previouslyFocused.current instanceof HTMLElement) {
          previouslyFocused.current.focus();
        }
      };
    }
  }, [props.open, props.onClose]);

  return (
    <div
      aria-hidden={!props.open}
      className={classNames(
        "fixed inset-0 z-50",
        props.open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <button
        onClick={props.onClose}
        className={classNames(
          "absolute inset-0 transition-opacity",
          props.open ? "opacity-100" : "opacity-0"
        )}
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
          props.open ? "translate-x-0" : "translate-x-full"
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
              {p?.tagline ? (
                <div className="mt-1 text-sm text-neutral-600">{p.tagline}</div>
              ) : null}
              {p?.role ? (
                <div className="mt-2 text-xs text-neutral-500">{p.role}</div>
              ) : null}
            </div>

            <button
              onClick={props.onClose}
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
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Problem
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-700">{p.problem}</p>
                </section>

                <section className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Build
                  </div>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
                    {p.build.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((x) => (
                      <Chip key={x} tone="soft">
                        {x}
                      </Chip>
                    ))}
                  </div>
                </section>

                <section className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Wins
                  </div>
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
                    <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Next moves
                    </div>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
                      {p.next.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {p.links?.length ? (
                  <section className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Links
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            ) : (
              <div className="text-sm text-neutral-600">
                Pick a project to view the mini case study.
              </div>
            )}
          </div>

          <div className="border-t border-neutral-200 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-medium text-neutral-900">
                Want something like this built?
              </div>
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

export default function PortfolioPage() {
  const phases = useMemo(() => {
    const map = new Map<string, Project[]>();
    for (const p of PROJECTS) {
      if (!map.has(p.phase)) map.set(p.phase, []);
      map.get(p.phase)!.push(p);
    }
    // Stable order by year (earliest first) inside phases
    for (const [k, arr] of map.entries()) {
      arr.sort((a, b) => Number(a.year) - Number(b.year));
      map.set(k, arr);
    }
    return Array.from(map.entries());
  }, []);

  const [activeId, setActiveId] = useState<string>(PROJECTS[0]?.id ?? "");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeProject = useMemo(
    () => PROJECTS.find((p) => p.id === activeId) ?? null,
    [activeId]
  );

  function openProject(id: string) {
    setActiveId(id);
    setDrawerOpen(true);
  }

  return (
    <SiteShell background="surface">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero Section with Brand Colors */}
        <header className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 md:p-12 shadow-xl">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white border border-white/30">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd"/>
              </svg>
              Portfolio
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              WebCraft LabZ
              <span className="block mt-2 bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Project Timeline
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-blue-50">
              A visual journey through our work. Scroll the timeline, click any project, and explore the problems we solved, the technologies we used, and the results we achieved.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-white/90">
                <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-semibold">Interactive Timeline</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-semibold">Case Studies</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-semibold">Tech Stack Details</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        </header>

        {/* Stats Section */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-blue-700">{PROJECTS.length}</div>
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
            <div className="mt-1 text-sm font-semibold text-blue-600">Technologies</div>
            <div className="mt-2 text-xs text-gray-600">Always learning, always evolving</div>
          </div>
        </div>

        {/* BODY */}
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* TIMELINE RAIL */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="text-sm font-semibold text-neutral-900">Timeline</div>
              <div className="mt-3 space-y-4">
                {phases.map(([phase, items]) => (
                  <div key={phase} className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      {phase}
                    </div>
                    <div className="space-y-1">
                      {items.map((p) => {
                        const active = p.id === activeId;
                        return (
                          <button
                            key={p.id}
                            onClick={() => openProject(p.id)}
                            className={classNames(
                              "group flex w-full items-start gap-3 rounded-xl border px-3 py-2 text-left transition",
                              active
                                ? "border-neutral-300 bg-neutral-50"
                                : "border-neutral-200 bg-white hover:bg-neutral-50"
                            )}
                          >
                            <span
                              className={classNames(
                                "mt-1 h-2.5 w-2.5 flex-none rounded-full",
                                active ? "bg-neutral-900" : "bg-neutral-300 group-hover:bg-neutral-500"
                              )}
                            />
                            <span className="min-w-0">
                              <span className="block text-xs font-medium text-neutral-500">
                                {p.year}
                              </span>
                              <span className="block truncate text-sm font-semibold text-neutral-900">
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

              <div className="mt-4 border-t border-neutral-200 pt-4 text-xs text-neutral-500">
                Tip: Click any project to open the mini case study drawer.
              </div>
            </div>
          </aside>

          {/* PROJECT LIST */}
          <div className="space-y-8">
            {phases.map(([phase, items]) => (
              <div key={phase} className="space-y-3">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      {phase}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-neutral-900">
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
                          <div className="mt-1 text-base font-semibold text-neutral-900">
                            {p.title}
                          </div>
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
                        {p.stack.length > 4 ? (
                          <Chip tone="neutral">+{p.stack.length - 4}</Chip>
                        ) : null}
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
                If you're trying to turn a website into a lead system, admin system, or content engine,
                I can help you ship something clean, fast, and scalable.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                >
                  Download PDF (later)
                </a>
              </div>
            </div>
          </div>
        </div>

        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          project={activeProject}
        />
      </main>
    </SiteShell>
  );
}
