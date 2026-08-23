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

// Only the four active paths are pre-rendered. Any other segment (including
// "building-software-products", the held-back path) 404s rather than
// rendering a thin/empty page — mirrors the dynamicParams:false convention
// already used by blog/[slug] and archive/[slug].
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
  const recommended = resources.find((r) => r.slug === meta.recommendedStart);
  const rest = sortByExplicitOrder(
    resources.filter((r) => r.slug !== meta.recommendedStart),
    meta.order
  );

  return (
    <SiteShell
      background="bg"
      title={meta.label}
      intro={meta.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resource Center", href: "/knowledge" },
        { label: meta.label },
      ]}
    >
      <div className="rc-root">
        <section className="rc-canvas px-6 py-10">
          <div className="mx-auto max-w-4xl">
            <p className="rc-body">
              <strong>Who this is for:</strong> {meta.audience}
            </p>
            <p className="rc-body mt-2">
              {resources.length} {resources.length === 1 ? "resource" : "resources"} on this path.
            </p>

            {resources.length === 0 ? (
              <div className="rc-panel mt-8">
                <p className="rc-body">
                  No resources are published on this path yet — check back soon, or explore another
                  path from the{" "}
                  <Link href="/knowledge#paths" className="rc-inline-link">
                    Resource Center
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <>
                {recommended && (
                  <div className="rc-panel mt-8">
                    <span className="rc-eyebrow">Recommended starting point</span>
                    <h2 className="rc-h3 mt-2">
                      <Link href={resourceHref(recommended)} className="rc-inline-link">
                        {recommended.frontmatter.title}
                      </Link>
                    </h2>
                    <p className="rc-body mt-2">{recommended.frontmatter.description}</p>
                  </div>
                )}

                {rest.length > 0 && (
                  <ol className="mt-8 flex flex-col gap-4">
                    {rest.map((r) => (
                      <li key={`${r.type}-${r.slug}`} className="rc-card">
                        <Link href={resourceHref(r)} className="rc-card-title-link">
                          {r.frontmatter.title}
                        </Link>
                        <p className="rc-card-body mt-1">{r.frontmatter.description}</p>
                        <span className="rc-card-meta">
                          {r.type === "news" ? "Announcement / update" : r.frontmatter.resourceType ?? "Resource"}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </>
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
