import type { LearningPath } from "./resources";

/**
 * Browse by Goal — the visible primary navigation above All Resources.
 *
 * Two concepts that used to be one are now deliberately separate:
 *
 *   ACTIVE_LEARNING_PATHS  = which /knowledge/paths/* routes exist
 *   RESOURCE_GOALS         = which of them are visibly promoted as a lane
 *
 * A path can be routable without being promoted, which is what lets
 * `modern-web-development` (one resource) and `experiments-emerging-ideas`
 * (a content bucket, not a teaching sequence) keep working URLs while
 * disappearing from navigation. Route existence must never depend on
 * whether something is currently worth featuring.
 *
 * A path earns a visible lane only when it has several genuinely related
 * resources AND an intentional order someone would actually read them in.
 *
 * `sequence` is that order, written out by slug. It exists because publish
 * date is not a teaching order — the website lane below is deliberately not
 * in date order, and would read backwards if it were. Resources on the path
 * but absent from `sequence` are not lost: they still appear once in All
 * Resources, and the path page lists them under "More on this topic".
 */
export type ResourceGoal = {
  id: string;
  /** Visible lane title — the goal, not the taxonomy label. */
  title: string;
  description: string;
  /** The learningPath this lane is backed by. */
  path: LearningPath;
  ctaLabel: string;
  /**
   * Explicit teaching order, by slug. The first entry is the recommended
   * starting point — derived, never configured twice.
   */
  sequence: readonly string[];
};

export const RESOURCE_GOALS: readonly ResourceGoal[] = [
  {
    id: "website",
    title: "Build a Better Website",
    description:
      "Work out what's wrong with the site you have, how a marketing site should be structured, and what a build like that should cost.",
    path: "websites-that-grow-businesses",
    ctaLabel: "Explore website resources",
    // Diagnose → understand structure → understand cost and scope.
    // Deliberately not publish-date order, which would put cost before
    // structure and teach the sequence backwards.
    sequence: [
      "why-most-websites-dont-convert-and-how-to-fix-yours-in-24-hours",
      "marketing-websites-that-convert",
      "how-much-does-custom-website-cost-2026",
    ],
  },
  {
    id: "software",
    title: "Build Software",
    description:
      "Decide whether to build at all, work out what kind of build you actually need, and understand what drives the cost.",
    path: "building-software-products",
    ctaLabel: "Explore software resources",
    // Build-vs-buy comes first: there is no point choosing between a
    // prototype and an MVP before deciding to build anything.
    sequence: [
      "custom-software-vs-off-the-shelf-tools",
      "mvp-vs-prototype-vs-production-application",
      "what-drives-the-cost-of-a-saas-mvp-in-2026",
    ],
  },
  {
    id: "ai",
    title: "Use AI & Automation",
    description:
      "Start with what AI actually is, see it applied to a real workflow, then look at what it does to teams and organizations.",
    path: "ai-workflow-automation",
    ctaLabel: "Explore AI & automation",
    // Fundamentals → practical application → organizational implications →
    // deeper analysis. "The Invisible Workforce" is on this path but stays
    // out of the sequence: it is speculative economics rather than
    // instruction, and including it would make the lane less coherent. It
    // remains in All Resources and under "More on this topic".
    sequence: [
      "what-is-ai-beginners-guide-professionals",
      "how-i-used-ai-to-rebuild-my-workflow",
      "enterprise-ai-human-bottleneck",
      "ai-backbone-enterprise-architecture-human-adaptation",
    ],
  },
];

/** The goal lane backed by a given learning path, if that path is promoted. */
export function goalForPath(path: string | undefined): ResourceGoal | undefined {
  if (!path) return undefined;
  return RESOURCE_GOALS.find((g) => g.path === path);
}

/** Slug of the recommended starting point — always the first sequence entry. */
export function recommendedStartFor(goal: ResourceGoal): string {
  return goal.sequence[0];
}
