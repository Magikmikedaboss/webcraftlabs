import type { ActiveLearningPath, LearningPath } from "./resources";

export type LearningPathMeta = {
  label: string;
  status: "active" | "coming-soon";
  audience: string;
  description: string;
  /** Slug of the resource to recommend starting with — must be a resource actually on this path. */
  recommendedStart?: string;
  /**
   * Explicit editorial reading order for this path's resources *after*
   * recommendedStart, by slug. Optional — most paths don't need it and rely
   * on the natural (date-descending) order getResourcesByPath() already
   * returns. Use this only when the intended reading sequence must not
   * depend on publish dates (e.g. resources genuinely published the same
   * day, or where date order and reading order are allowed to differ).
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

export const LEARNING_PATH_META: Record<LearningPath, LearningPathMeta> = {
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
    recommendedStart: "what-is-ai-beginners-guide-professionals",
    nextStep: { label: "Explore AI & Automation services", href: "/services/ai-automation" },
  },
  "websites-that-grow-businesses": {
    label: "Websites That Grow Businesses",
    status: "active",
    audience: "Business owners evaluating or improving a business website.",
    description:
      "Straight-talk guides on website cost, conversion, and what actually makes a business website work.",
    recommendedStart: "why-most-websites-dont-convert-and-how-to-fix-yours-in-24-hours",
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
    recommendedStart: "mvp-vs-prototype-vs-production-application",
    order: [
      "mvp-vs-prototype-vs-production-application",
      "custom-software-vs-off-the-shelf-tools",
      "what-drives-the-cost-of-a-saas-mvp-in-2026",
    ],
    nextStep: { label: "Explore SaaS platform development services", href: "/services/saas-platform-development" },
  },
};

export function isRecommendedStartValid(path: ActiveLearningPath, resourceSlugs: string[]): boolean {
  const start = LEARNING_PATH_META[path].recommendedStart;
  return start !== undefined && resourceSlugs.includes(start);
}
