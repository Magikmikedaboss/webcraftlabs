import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import { getBaseUrl, SITE } from "@/lib/site";
import {
  ACTIVE_LEARNING_PATHS,
  getResourcesByPath,
  isActiveLearningPath,
  resourceHref,
} from "@/lib/resources";
import { LEARNING_PATH_META, sortByExplicitOrder } from "@/lib/resourcePathMeta";
import { goalForPath, isPathBacked } from "@/lib/resourceGoals";

// Every path in ACTIVE_LEARNING_PATHS is pre-rendered, whether or not it is
// visibly promoted as a goal lane. Route existence is deliberately decoupled
// from navigation (see RESOURCE_GOALS): `modern-web-development` and
// `experiments-emerging-ideas` are no longer surfaced on /knowledge but their
// URLs keep working, so no previously-reachable page becomes a 404. Any
// segment outside the list still 404s — the dynamicParams:false convention
// used by blog/[slug] and archive/[slug].
export const dynamicParams = false;

export function generateStaticParams() {
  return ACTIVE_LEARNING_PATHS.map((path) => ({ path }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string }>;
}): Promise<Metadata> {
  const { path } = await params;
  if (!isActiveLearningPath(path)) {
    return { title: "Resource Center" };
  }
  const meta = LEARNING_PATH_META[path];
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/knowledge/paths/${path}`;

  return {
    title: meta.label,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${meta.label} | ${SITE.name}`,
      description: meta.description,
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.label} | ${SITE.name}`,
      description: meta.description,
    },
  };
}

export default async function LearningPathPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  if (!isActiveLearningPath(path)) notFound();

  const meta = LEARNING_PATH_META[path];
  const resources = getResourcesByPath(path);
  const promoted = goalForPath(path);
  // Only a sequenced (path-backed) lane supplies a reading order. A
  // hub-backed lane like Developer Stacks has no path route at all, so this
  // is defensive rather than reachable — but it keeps the page honest if one
  // is ever added to ACTIVE_LEARNING_PATHS.
  const goal = promoted && isPathBacked(promoted) ? promoted : undefined;
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/knowledge/paths/${path}`;

  /**
   * A promoted goal lane renders RESOURCE_GOALS' explicit sequence, in that
   * order — publish date is not a teaching order. Anything on the path but
   * outside the sequence is listed separately rather than dropped, so no
   * resource silently disappears from a page it used to appear on.
   *
   * Unpromoted paths keep the previous behavior: recommendedStart first,
   * then LEARNING_PATH_META.order, then natural order.
   */
  const bySlug = new Map(resources.map((r) => [r.slug, r]));
  const sequence = goal
    ? goal.sequence.map((slug) => bySlug.get(slug)).filter((r) => r !== undefined)
    : [];
  const sequenced = goal
    ? sequence
    : (() => {
        const start = resources.find((r) => r.slug === meta.recommendedStart);
        const rest = sortByExplicitOrder(
          resources.filter((r) => r.slug !== meta.recommendedStart),
          meta.order
        );
        return start ? [start, ...rest] : rest;
      })();
  const sequencedSlugs = new Set(sequenced.map((r) => r.slug));
  const alsoOnPath = resources.filter((r) => !sequencedSlugs.has(r.slug));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Resource Center", item: `${baseUrl}/knowledge` },
      { "@type": "ListItem", position: 3, name: goal?.title ?? meta.label, item: url },
    ],
  };

  return (
    <SiteShell
      background="bg"
      title={goal?.title ?? meta.label}
      intro={goal?.description ?? meta.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resource Center", href: "/knowledge" },
        { label: goal?.title ?? meta.label },
      ]}
    >
      <script
        id={`path-breadcrumb-jsonld-${path}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\u003c"),
        }}
      />
      <div className="rc-root">
        <section className="rc-canvas px-6 py-10">
          <div className="mx-auto max-w-4xl">
            <p className="rc-body">
              <strong>Who this is for:</strong> {meta.audience}
            </p>
            <p className="rc-body mt-2">
              {sequenced.length} {sequenced.length === 1 ? "resource" : "resources"}, in the order
              we&apos;d read them.
            </p>

            {resources.length === 0 ? (
              <div className="rc-panel mt-8">
                <p className="rc-body">
                  No resources are published on this path yet — check back soon, or explore another
                  goal from the{" "}
                  <Link href="/knowledge#goals" className="rc-inline-link">
                    Resource Center
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <ol aria-label="Reading order" className="mt-8 flex flex-col gap-4">
                {sequenced.map((r, i) => (
                  <li key={`${r.type}-${r.slug}`} className="rc-card flex gap-4">
                    <span
                      aria-hidden="true"
                      className="rc-step-number"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <Link href={resourceHref(r)} className="rc-card-title-link">
                        {r.frontmatter.title}
                      </Link>
                      <p className="rc-card-body mt-1">{r.frontmatter.description}</p>
                      <span className="rc-card-meta">
                        {i === 0 ? "Start here · " : ""}
                        {r.type === "news" ? "Announcement / update" : r.frontmatter.resourceType ?? "Resource"}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            {alsoOnPath.length > 0 && (
              <div className="mt-10">
                <h2 className="rc-h3">More on this topic</h2>
                <p className="rc-body mt-2">
                  Related reading that sits outside the sequence above.
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {alsoOnPath.map((r) => (
                    <li key={`${r.type}-${r.slug}`}>
                      <Link href={resourceHref(r)} className="rc-inline-link">
                        {r.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {meta.nextStep && (
              <div className="mt-10">
                <Link href={meta.nextStep.href} className="rc-pill-link">
                  {meta.nextStep.label} →
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
