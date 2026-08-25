import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import KnowledgeConstellation, { type ConstellationResource } from "@/components/KnowledgeConstellation";
import ResourceHero from "@/components/resources/ResourceHero";
import AudienceEntryPoints from "@/components/resources/AudienceEntryPoints";
import LearningPaths from "@/components/resources/LearningPaths";
import FeaturedResources from "@/components/resources/FeaturedResources";
import FeaturedTool from "@/components/resources/FeaturedTool";
import FromTheLab from "@/components/resources/FromTheLab";
import ProjectsAndExperiments from "@/components/resources/ProjectsAndExperiments";
import { SITE, getBaseUrl } from "@/lib/site";
import { ACTIVE_LEARNING_PATHS, getResourcesByPath, resourceHref } from "@/lib/resources";
import { LEARNING_PATH_META } from "@/lib/resourcePathMeta";

/**
 * One graph node per real, published resource (not one per path) — every
 * node links straight to its actual article. Grouped/colored by path;
 * cross-path links come from real, already-tagged audience overlap. See
 * KnowledgeConstellation for the graph itself.
 */
const constellationResources: ConstellationResource[] = ACTIVE_LEARNING_PATHS.flatMap((path) =>
  getResourcesByPath(path).map((r) => ({
    id: resourceHref(r),
    title: r.frontmatter.title,
    href: resourceHref(r),
    path,
    audience: r.frontmatter.audience ?? [],
  }))
);

/**
 * Grouped by path so this stays an honest, identical-in-substance parallel
 * to what the graph now shows (every resource, not just the 5 paths).
 */
function TopicListItems() {
  return (
    <>
      {ACTIVE_LEARNING_PATHS.map((path) => {
        const meta = LEARNING_PATH_META[path];
        const resources = getResourcesByPath(path);
        return (
          <li key={path}>
            <Link href={`/knowledge/paths/${path}`} className="rc-inline-link block rounded px-2 py-1 text-sm no-underline">
              {meta.label}
            </Link>
            {resources.length > 0 && (
              <ul
                className="mt-1 ml-3 flex flex-col gap-1 border-l pl-3"
                style={{ borderColor: "var(--rc-border)" }}
              >
                {resources.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={resourceHref(r)}
                      className="rc-inline-link block rounded px-2 py-1 text-xs no-underline opacity-90"
                    >
                      {r.frontmatter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
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

        <section id="discover" className="rc-canvas mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8 max-w-3xl">
            <span className="rc-eyebrow">Topic Map</span>
            <h2 className="rc-h2 mt-4">Browse by topic</h2>
            <p className="rc-body mt-3">
              Every resource below is also a real, server-rendered page — the visual map is an
              optional way to browse the same links, not the only way to find them.
            </p>
          </div>

          <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] items-start">
            {/* min-w-0: grid items default to min-width:auto, which floors
                this column at the canvas's intrinsic content width and
                blows out the whole row past its container on narrow
                viewports — this override is what lets it actually shrink. */}
            <div className="min-w-0">
              <KnowledgeConstellation resources={constellationResources} />
            </div>

            <div className="flex flex-col gap-3">
              <details className="rc-panel-muted lg:hidden">
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