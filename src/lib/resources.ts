import { getAllPosts } from "./mdx/blog";
import { getAllNews } from "./mdx/news";
import { LEARNING_PATHS, AUDIENCES, type BlogFrontmatter } from "./mdx/frontmatterSchema";

const ARCHIVE_COLLECTION = "webcraft-archive";

/**
 * Paths with real, migrated content today. Building Software Products is a
 * valid taxonomy value (see frontmatterSchema.ts) but intentionally has no
 * page and no active resources yet — do not add it here until real content
 * exists for it.
 */
export const ACTIVE_LEARNING_PATHS = [
  "modern-web-development",
  "ai-workflow-automation",
  "websites-that-grow-businesses",
  "experiments-emerging-ideas",
] as const satisfies readonly (typeof LEARNING_PATHS)[number][];

export type ActiveLearningPath = (typeof ACTIVE_LEARNING_PATHS)[number];
export type LearningPath = (typeof LEARNING_PATHS)[number];

export function isActiveLearningPath(path: string): path is ActiveLearningPath {
  return (ACTIVE_LEARNING_PATHS as readonly string[]).includes(path);
}

export type ResourceItem = {
  slug: string;
  type: "blog" | "news";
  frontmatter: BlogFrontmatter;
};

function isRealResource(frontmatter: { collection?: string; resourceType?: string }): boolean {
  return frontmatter.collection !== ARCHIVE_COLLECTION && frontmatter.resourceType != null;
}

/**
 * All published, non-Archive, Resource-Center-classified Blog + News
 * content. This is the single query surface every Resource Center section
 * reads from — publish-cutoff gating is already enforced upstream by
 * getAllPosts()/getAllNews(); this adds the Archive exclusion those two
 * don't apply themselves (sitemap.ts, the RSS routes, and buildHomeFeed()
 * each apply the same exclusion independently, since getAllPosts()/
 * getAllNews() intentionally return every collection) and requires an
 * explicit `resourceType` tag so untagged posts never inflate Resource
 * Center counts or sections.
 */
export function getAllResources(): ResourceItem[] {
  const blog: ResourceItem[] = getAllPosts()
    .filter((p) => isRealResource(p.frontmatter))
    .map((p) => ({ slug: p.slug, type: "blog", frontmatter: p.frontmatter }));

  const news: ResourceItem[] = getAllNews()
    .filter((p) => isRealResource(p.frontmatter))
    .map((p) => ({ slug: p.slug, type: "news", frontmatter: p.frontmatter }));

  return [...blog, ...news];
}

export function getResourcesByPath(path: LearningPath): ResourceItem[] {
  return getAllResources().filter((r) => r.frontmatter.learningPath === path);
}

/** Real featured selection — never a hardcoded list. */
export function getFeaturedResources(limit?: number): ResourceItem[] {
  const featured = getAllResources().filter((r) => r.frontmatter.featured === true);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getResourcesByAudience(audience: (typeof AUDIENCES)[number]): ResourceItem[] {
  return getAllResources().filter((r) => r.frontmatter.audience?.includes(audience));
}

export function resourceHref(r: Pick<ResourceItem, "type" | "slug">): string {
  return `/${r.type}/${r.slug}`;
}
