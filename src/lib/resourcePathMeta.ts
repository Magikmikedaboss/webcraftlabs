import type { ActiveLearningPath } from "./resources";

export type LearningPathMeta = {
  label: string;
  status: "active" | "coming-soon";
  audience: string;
  description: string;
  /** Slug of the resource to recommend starting with — must be a resource actually on this path. */
  recommendedStart?: string;
  /**
   * Explicit editorial reading order for this path's resources, by slug,
   * starting with recommendedStart.
   *
   * **Required for every path with a promoted path-backed goal lane**, and
   * it must equal that lane's `sequence` exactly — a test enforces both.
   * Without it, unpromoting a lane would silently drop the whole reading
   * order back to date order rather than just its first entry.
   *
   * Optional for unpromoted paths, which have no lane sequence to preserve
   * and rely on the natural (date-descending) order getResourcesByPath()
   * already returns.
   *
   * Resources not listed here keep their natural relative order and are
   * appended after every explicitly-ordered slug — adding an unrelated
   * resource to a path never reorders, or gets inserted ahead of, the
   * slugs named here.
   */
  order?: readonly string[];
  nextStep?: { label: string; href: string };
};

/**
 * Applies an explicit slug order to a list of resources, falling back to
 * each resource's existing relative position for anything not named in
 * `order` (stable sort — never reorders unlisted items relative to each
 * other or inserts them ahead of an explicitly-ordered slug).
 */
export function sortByExplicitOrder<T extends { slug: string }>(
  items: readonly T[],
  order?: readonly string[]
): T[] {
  if (!order || order.length === 0) return [...items];
  const rank = new Map(order.map((slug, i) => [slug, i]));
  return [...items].sort((a, b) => {
    const ai = rank.get(a.slug);
    const bi = rank.get(b.slug);
    // Both unranked: Infinity - Infinity is NaN, which sort() doesn't
    // handle meaningfully — explicit 0 relies on the spec-guaranteed
    // stable sort to preserve each item's original relative order instead.
    if (ai === undefined && bi === undefined) return 0;
    if (ai === undefined) return 1;
    if (bi === undefined) return -1;
    return ai - bi;
  });
}

/**
 * Metadata for path *pages*. Keyed by ActiveLearningPath rather than
 * LearningPath: only routable paths have a page to describe. `developer-stacks`
 * is a valid taxonomy value with no path route — its canonical destination is
 * the hub at /knowledge/developer-stacks — so it correctly has no entry here.
 *
 * **`RESOURCE_GOALS` owns the reading order, not this file.** When a path has
 * a promoted path-backed lane, the path page renders that lane's `sequence`
 * and ignores `recommendedStart`/`order` entirely (see
 * `app/knowledge/paths/[path]/page.tsx`). The fields below are the fallback
 * for *unpromoted* paths, and are kept here so removing a lane from
 * navigation never silently drops an editorial order back to date order.
 *
 * Because that makes the order reachable from two places, a test in
 * `resourcePathMeta.test.ts` asserts they agree: for every path-backed goal,
 * `recommendedStart` must equal `sequence[0]` and `order` must be present and
 * equal the full `sequence`. Drift is a build failure, not a silent
 * inconsistency.
 */
export const LEARNING_PATH_META: Record<ActiveLearningPath, LearningPathMeta> = {
  "modern-web-development": {
    label: "Modern Web Development",
    status: "active",
    audience: "Developers setting up tools and workflows for real projects.",
    description:
      "Practical setup guides and technical write-ups for building and maintaining modern web projects.",
    recommendedStart: "building-your-first-developer-workbench",
    nextStep: { label: "Browse all Blog articles", href: "/blog" },
  },
  "ai-workflow-automation": {
    label: "AI & Workflow Automation",
    status: "active",
    audience: "Founders and teams deciding where automation and AI actually help.",
    description:
      "Guides and analysis on when to automate, when to use AI, and how enterprise workflows are actually changing.",
    recommendedStart: "ai-101-beginners-guide-artificial-intelligence",
    order: [
      "ai-101-beginners-guide-artificial-intelligence",
      "what-is-ai-beginners-guide-professionals",
      "human-skills-that-matter-more-in-an-ai-world",
      "how-i-used-ai-to-rebuild-my-workflow",
      "enterprise-ai-human-bottleneck",
      "ai-backbone-enterprise-architecture-human-adaptation",
    ],
    nextStep: { label: "Explore AI & Automation services", href: "/services/ai-automation" },
  },
  "websites-that-grow-businesses": {
    label: "Websites That Grow Businesses",
    status: "active",
    audience: "Business owners evaluating or improving a business website.",
    description:
      "Straight-talk guides on website cost, conversion, and what actually makes a business website work.",
    recommendedStart: "why-most-websites-dont-convert-and-how-to-fix-yours-in-24-hours",
    order: [
      "why-most-websites-dont-convert-and-how-to-fix-yours-in-24-hours",
      "marketing-websites-that-convert",
      "how-much-does-custom-website-cost-2026",
    ],
    nextStep: { label: "Explore website development services", href: "/services/custom-website-development" },
  },
  "experiments-emerging-ideas": {
    label: "Experiments & Emerging Ideas",
    status: "active",
    audience: "Readers interested in where we're exploring past the day-to-day work.",
    description:
      "Series, research notes, and essays exploring AI, creativity, and the future of work — clearly separated from client work.",
    recommendedStart: "synthetic-minds-series",
    nextStep: { label: "See what else we're building", href: "/portfolio" },
  },
  "building-software-products": {
    label: "Building Software Products",
    status: "active",
    audience: "Founders and business owners scoping custom software or a SaaS product.",
    description:
      "Guides on MVP scope, build-vs-buy decisions, and what actually drives SaaS product cost.",
    // Build-vs-buy first: there is no point choosing between a prototype and
    // an MVP before deciding to build anything at all. This matches the
    // Build Software lane's `sequence` — see the sync note above.
    recommendedStart: "custom-software-vs-off-the-shelf-tools",
    order: [
      "custom-software-vs-off-the-shelf-tools",
      "mvp-vs-prototype-vs-production-application",
      "what-drives-the-cost-of-a-saas-mvp-in-2026",
    ],
    nextStep: { label: "Explore SaaS platform development services", href: "/services/saas-platform-development" },
  },
};

export function isRecommendedStartValid(path: ActiveLearningPath, resourceSlugs: string[]): boolean {
  const start = LEARNING_PATH_META[path].recommendedStart;
  return start !== undefined && resourceSlugs.includes(start);
}
