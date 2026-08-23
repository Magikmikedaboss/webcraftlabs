import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import KnowledgeConstellation from "@/components/KnowledgeConstellation";
import ResourceHero from "@/components/resources/ResourceHero";
import AudienceEntryPoints from "@/components/resources/AudienceEntryPoints";
import LearningPaths from "@/components/resources/LearningPaths";
import FeaturedResources from "@/components/resources/FeaturedResources";
import FeaturedTool from "@/components/resources/FeaturedTool";
import FromTheLab from "@/components/resources/FromTheLab";
import ProjectsAndExperiments from "@/components/resources/ProjectsAndExperiments";
import { SITE, getBaseUrl } from "@/lib/site";


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

function TopicListItems() {
  return (
    <>
      {topicMap.map((t) => (
        <li key={t.title}>
          <Link href={t.href} className="block rounded px-2 py-1 text-sm text-[var(--muted)] hover:bg-[var(--bg)]">
            {t.title}
          </Link>
        </li>
      ))}
    </>
  );
}

export const metadata = {
  title: "WebCraft Resource Center",
  description:
    "Practical guides, technical tutorials, project breakdowns, and tools for developers, founders, business owners, and teams exploring AI automation.",
  openGraph: {
    title: `WebCraft Resource Center | ${SITE.name}`,
    description:
      "Practical guides, technical tutorials, project breakdowns, and tools for developers, founders, business owners, and teams exploring AI automation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `WebCraft Resource Center | ${SITE.name}`,
    description:
      "Practical guides, technical tutorials, project breakdowns, and tools for developers, founders, business owners, and teams exploring AI automation.",
  },
  alternates: {
    canonical: `${getBaseUrl()}/knowledge`,
  },
};

export default function KnowledgePage() {
  return (
    <SiteShell background="bg">
      <div className="rc-root">
        <ResourceHero />
        <AudienceEntryPoints />

        <LearningPaths />

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
                  <TopicListItems />
                </ul>
              </details>

              <nav aria-label="Topics" className="hidden lg:block w-56">
                <ul className="flex flex-col gap-2">
                  <TopicListItems />
                </ul>
              </nav>
            </div>
          </div>
        </section>

        <FeaturedResources />
        <FeaturedTool />
        <FromTheLab />
        <ProjectsAndExperiments />

        <section className="rc-canvas-dark mx-auto max-w-7xl px-6 py-16 pb-24">
          <div className="rc-cta-panel">
            <div>
              <span className="rc-eyebrow-on-dark">Need help building this?</span>
              <h2 className="rc-h2-on-dark mt-4">
                Want to turn a resource into a real project?
              </h2>
              <p className="rc-body-on-dark mt-4 max-w-2xl">
                This center is where we publish how we think. If you want help building something
                like it, tell us what you&apos;re working on.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link href="/contact" className="rc-cta-primary">
                Talk to us
              </Link>
              <Link href="/blog/synthetic-minds-series" className="rc-cta-secondary">
                Read the series
              </Link>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}