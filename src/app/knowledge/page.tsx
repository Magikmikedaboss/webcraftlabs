import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import KnowledgeConstellation from "@/components/KnowledgeConstellation";
import { SITE, getBaseUrl } from "@/lib/site";

const learningPaths = [
  {
    title: "Synthetic Minds",
    description: "A cinematic series about AI creativity, invention, and human-machine collaboration.",
    href: "/blog/synthetic-minds-series",
    tone: "from-cyan-500 to-blue-600",
  },
  {
    title: "Axon Research Intelligence",
    description: "A research signal layer for turning complex material into structured understanding.",
    href: "/news/introducing-axon",
    tone: "from-sky-500 to-indigo-600",
  },
  {
    title: "Enterprise AI",
    description: "How intelligent systems reshape workflows, judgment, and organizational leverage.",
    href: "/news/enterprise-ai-human-bottleneck",
    tone: "from-indigo-500 to-violet-600",
  },
  {
    title: "Future of Work",
    description: "The shift from output-heavy work to systems that amplify taste, judgment, and speed.",
    href: "/news/manifesto",
    tone: "from-cyan-500 to-emerald-500",
  },
  {
    title: "Human + AI Creativity",
    description: "A practical and philosophical look at what happens when people create with intelligence layers.",
    href: "/blog/what-is-synthetic-minds",
    tone: "from-amber-500 to-pink-500",
  },
] as const;

const topicMap = [
  {
    title: "Synthetic Minds",
    description: "Creative systems, new mediums, and the evolution of invention.",
    href: "/blog/synthetic-minds-series",
    chips: ["AI Creativity", "New Creators", "Human Bottleneck"],
  },
  {
    title: "Axon",
    description: "Research signals, knowledge systems, and structured intelligence.",
    href: "/news/introducing-axon",
    chips: ["Signal Over Noise", "Memory", "Research Layers"],
  },
  {
    title: "Enterprise AI",
    description: "Operational intelligence, decision chains, and the modern workflow stack.",
    href: "/news/enterprise-ai-human-bottleneck",
    chips: ["Agents", "Workflows", "Judgment"],
  },
  {
    title: "Future Systems",
    description: "Platforms that learn, adapt, and expand what teams can do.",
    href: "/news/manifesto",
    chips: ["Systems", "Automation", "Adaptation"],
  },
  {
    title: "Human + AI Creativity",
    description: "The interface between taste, language, and machine-assisted exploration.",
    href: "/blog/what-is-synthetic-minds",
    chips: ["Co-Creation", "Experimentation", "Ideas"],
  },
] as const;

const modules = [
  {
    title: "Synthetic Minds",
    href: "/blog/synthetic-minds-series",
    summary: "A path for readers who want the full narrative arc.",
    items: [
      "Start Here: What is Synthetic Minds?",
      "Key Idea: AI as collaborator, not just tool",
      "Related Articles: Episode series and essays",
      "Experiments: Prompting, image generation, creative workflows",
      "Next Path: Human bottlenecks and new creators",
    ],
  },
  {
    title: "Axon",
    href: "/news/introducing-axon",
    summary: "A research intelligence path focused on structure and signal.",
    items: [
      "Start Here: Introducing Axon",
      "Key Idea: Turning complexity into clarity",
      "Related Articles: Research-first system design",
      "Experiments: Signal detection and knowledge clustering",
      "Next Path: Enterprise intelligence layers",
    ],
  },
  {
    title: "Enterprise AI",
    href: "/news/enterprise-ai-human-bottleneck",
    summary: "A systems view of how organizations change when intelligence becomes operational.",
    items: [
      "Start Here: The Human Bottleneck in the Age of Enterprise AI",
      "Key Idea: Intelligence should reduce friction, not add it",
      "Related Articles: Workflow and architecture essays",
      "Experiments: Automation, agents, and decision support",
      "Next Path: Future of work and organizational leverage",
    ],
  },
  {
    title: "Future of Work",
    href: "/news/manifesto",
    summary: "The shift from static sites to adaptive, intelligent systems.",
    items: [
      "Start Here: Websites to systems",
      "Key Idea: The interface is becoming an operating layer",
      "Related Articles: Modern web strategy and AI integration",
      "Experiments: Automations, content flows, and reusable intelligence",
      "Next Path: Human + AI creativity",
    ],
  },
  {
    title: "Human + AI Creativity",
    href: "/blog/what-is-synthetic-minds",
    summary: "A practical and conceptual bridge between expression and intelligence.",
    items: [
      "Start Here: What is Synthetic Minds?",
      "Key Idea: Creative leverage beats creative volume",
      "Related Articles: New creators and unexpected systems",
      "Experiments: Drafting, iteration, and multimodal exploration",
      "Next Path: Build your own knowledge graph",
    ],
  },
] as const;

const featuredArticles = [
  {
    title: "What is Synthetic Minds?",
    description: "The introduction to the series about AI creativity and invention.",
    href: "/blog/what-is-synthetic-minds",
    label: "Series opener",
  },
  {
    title: "Introducing Axon: A Research Signal Intelligence Tool",
    description: "How Axon turns research noise into something operationally useful.",
    href: "/news/introducing-axon",
    label: "Product note",
  },
  {
    title: "The Human Bottleneck in the Age of Enterprise AI",
    description: "Why judgment, coordination, and overload matter more as systems get smarter.",
    href: "/news/enterprise-ai-human-bottleneck",
    label: "Enterprise AI",
  },
  {
    title: "From Websites to Systems",
    description: "The broader shift behind the hub: interfaces becoming intelligence layers.",
    href: "/news/manifesto",
    label: "Manifesto",
  },
] as const;

export const metadata = {
  title: "WebCraft Knowledge Hub",
  description:
    "Explore the WebCraft Knowledge Hub: learning paths, topic maps, modules, and featured articles connecting Synthetic Minds, Axon, enterprise AI, and future work.",
  openGraph: {
    title: `WebCraft Knowledge Hub | ${SITE.name}`,
    description:
      "A clickable learning hub for Synthetic Minds, Axon, enterprise AI, future work, and human plus AI creativity.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `WebCraft Knowledge Hub | ${SITE.name}`,
    description:
      "A clickable learning hub for Synthetic Minds, Axon, enterprise AI, future work, and human plus AI creativity.",
  },
  alternates: {
    canonical: `${getBaseUrl()}/knowledge`,
  },
};

export default function KnowledgePage() {
  return (
    <SiteShell background="bg">
      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#050b16_0%,#081122_26%,#f7fbff_26%,#f7fbff_100%)] text-[var(--text)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.26),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(99,102,241,0.24),transparent_26%),radial-gradient(circle_at_50%_72%,rgba(59,130,246,0.16),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20 [mask-image:linear-gradient(180deg,black_0%,transparent_82%)]" />

        <section className="relative mx-auto max-w-7xl px-6 pb-14 pt-16 md:pb-20 md:pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
                WebCraft Learning Hub
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
                Explore the WebCraft
                <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                  Knowledge Hub
                </span>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
                A curated constellation of our most consequential ideas, research, and products. Traverse thematic paths, inspect topic relationships, or open compact modules that teach the craft.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#paths"
                  className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan-300/50 hover:bg-white/15"
                >
                  Learning Paths
                </Link>
                <Link
                  href="#map"
                  className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan-300/50 hover:bg-white/15"
                >
                  Topic Map
                </Link>
                <Link
                  href="#articles"
                  className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan-300/50 hover:bg-white/15"
                >
                  Featured Articles
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4 text-white/95 shadow-lg shadow-cyan-950/20 backdrop-blur">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Signal</div>
                  <div className="mt-2 text-2xl font-semibold">01</div>
                  <p className="mt-2 text-sm leading-6 text-slate-200">One map for products, series, and research threads.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4 text-white/95 shadow-lg shadow-indigo-950/20 backdrop-blur">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-200">Paths</div>
                  <div className="mt-2 text-2xl font-semibold">05</div>
                  <p className="mt-2 text-sm leading-6 text-slate-200">Learning routes with room to expand into full series.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4 text-white/95 shadow-lg shadow-sky-950/20 backdrop-blur">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Modules</div>
                  <div className="mt-2 text-2xl font-semibold">25+</div>
                  <p className="mt-2 text-sm leading-6 text-slate-200">Start here, key idea, related reading, experiments, next path.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-8 h-28 w-28 rounded-full bg-cyan-300/20 blur-3xl" />
              <div className="absolute -right-6 bottom-6 h-36 w-36 rounded-full bg-indigo-400/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,17,34,0.96),rgba(14,24,46,0.94))] p-6 text-white shadow-[0_30px_80px_rgba(8,15,28,0.45)] backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Command Deck</div>
                    <h2 className="mt-2 text-2xl font-semibold">A continuously curated research map</h2>
                  </div>
                  <div className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold text-cyan-100">Constellation Live</div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.8)]" />
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Synthetic Minds</span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-200">Creative intelligence, invention, and the foundational path into the hub.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="h-3 w-3 rounded-full bg-indigo-300 shadow-[0_0_20px_rgba(165,180,252,0.8)]" />
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-200">Axon</span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-200">Research intelligence, signal design, and structured insight.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">What connects it all</div>
                        <p className="mt-2 text-lg font-semibold text-white">Knowledge is the interface between research, product, and publishing.</p>
                      </div>
                      <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">Interactive map</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="paths" className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8 max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
              Learning Paths
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Follow a curated route</h2>
            <p className="mt-3 text-base leading-7 text-[var(--muted)]">
              Five focused learning routes that distill our research and practice. Each path guides you through narrative, experiments, and next steps.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-5 md:grid-cols-2">
            {learningPaths.map((path) => (
              <Link
                key={path.title}
                href={path.href}
                className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${path.tone}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_38%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className={`h-1.5 rounded-full bg-gradient-to-r ${path.tone}`} />
                <h3 className="mt-4 text-lg font-semibold text-[var(--text)]">{path.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{path.description}</p>
                <div className="mt-5 inline-flex items-center text-sm font-semibold text-[var(--primary)] transition group-hover:translate-x-1">
                  Open path →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="map" className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8 max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
              Topic Constellation
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Interactive Constellation</h2>
            <p className="mt-3 text-base leading-7 text-[var(--muted)]">
              An interactive view revealing relationships between ideas — drag, zoom, and open topics from the map.
            </p>
          </div>

          <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] items-start">
            <div>
              <KnowledgeConstellation topics={topicMap} />
            </div>

            <div className="flex flex-col gap-3">
              <details className="lg:hidden rounded-md border border-[var(--border)] bg-[var(--surface)] p-3">
                <summary className="cursor-pointer text-sm font-semibold">Topics</summary>
                <ul className="mt-3 flex flex-col gap-2">
                  {topicMap.map((t) => (
                    <li key={t.title}>
                      <Link href={t.href} className="block rounded px-2 py-1 text-sm text-[var(--muted)] hover:bg-[var(--bg)]">
                        {t.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>

              <nav aria-label="Topics" className="hidden lg:block w-56">
                <ul className="flex flex-col gap-2">
                  {topicMap.map((t) => (
                    <li key={t.title}>
                      <Link href={t.href} className="block rounded px-2 py-1 text-sm text-[var(--muted)] hover:bg-[var(--bg)]">
                        {t.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(248,251,255,0.98),rgba(237,244,252,0.92))] p-6 shadow-xl md:p-8">
            <div className="mb-8 max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
                Modules
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Each topic is a compact curriculum</h2>
              <p className="mt-3 text-base leading-7 text-[var(--muted)]">
                Concise lessons, essential readings, and hands-on experiments — designed so every topic teaches a practice, not just a concept.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {modules.map((module) => (
                <div key={module.title} className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-[var(--text)]">{module.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{module.summary}</p>
                    </div>
                    <Link href={module.href} className="text-sm font-semibold text-[var(--primary)] transition hover:opacity-80">
                      Open →
                    </Link>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {module.items.map((item) => (
                      <div key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="articles" className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8 max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
              Featured Articles
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Canonical essays and notes</h2>
            <p className="mt-3 text-base leading-7 text-[var(--muted)]">
              Selected essays and notes that define our current thinking — the best starting points to understand our perspective.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2">
            {featuredArticles.map((article) => (
              <Link
                key={article.title}
                href={article.href}
                className="group rounded-3xl border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,255,0.92))] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">{article.label}</div>
                <h3 className="mt-3 text-xl font-semibold text-[var(--text)]">{article.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{article.description}</p>
                <div className="mt-5 text-sm font-semibold text-[var(--primary)] transition group-hover:translate-x-1">
                  Read article →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 pb-24">
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(8,15,28,0.96),rgba(3,9,18,0.98))] p-8 text-white shadow-2xl md:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-12 -bottom-20 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                  Build with us
                </span>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Want to turn a topic into a product, series, or research system?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
                  This hub is the front door to the way we think. If you want help building the next layer, we can map the ideas into a real site, product, or internal system.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  Build with us
                </Link>
                <Link
                  href="/news/introducing-axon"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200 hover:bg-white/10"
                >
                  Explore Axon
                </Link>
                <Link
                  href="/blog/synthetic-minds-series"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200 hover:bg-white/10"
                >
                  Read the series
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}