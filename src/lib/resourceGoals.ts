import type { ActiveLearningPath, LearningPath } from "./resources";

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
type BaseGoal = {
  id: string;
  /** Visible lane title — the goal, not the taxonomy label. */
  title: string;
  description: string;
  ctaLabel: string;
};

/**
 * The common case: the lane opens /knowledge/paths/<path>, which lists an
 * ordered teaching sequence.
 *
 * `sequence` is typed as a non-empty tuple so a path-backed goal cannot be
 * declared with nothing in it — that would make recommendedStartFor()
 * return undefined and render a lane card with no starting point.
 */
export type PathBackedGoal = BaseGoal & {
  destination: "path";
  /**
   * ActiveLearningPath, not LearningPath: this lane's card links to
   * /knowledge/paths/<path>, and only an active path has that route. Typing
   * it loosely would let a lane be declared against a routeless value like
   * `developer-stacks` and render a card pointing at a 404.
   */
  path: ActiveLearningPath;
  sequence: readonly [string, ...string[]];
};

/**
 * A lane whose canonical destination is a dedicated hub page rather than a
 * path listing. Used by the Developer Stack Library, where the hub is the
 * one canonical URL and /knowledge/paths/developer-stacks deliberately does
 * not exist.
 *
 * A hub-backed goal has no `sequence`. One stack guide is published today
 * (Solo SaaS); the remaining tracks are still planned, and a single guide is
 * not a reading order. Promising an order for content that does not exist is
 * exactly the kind of claim the Resource Center cleanup removed. It gains a
 * sequence when there are enough real guides to order.
 */
export type HubBackedGoal = BaseGoal & {
  destination: "hub";
  /**
   * Any LearningPath, including one with no route — that is the point of a
   * hub-backed lane. Kept so future guides tagged with this value are
   * associated with the lane even though no path listing exists.
   */
  path: LearningPath;
  /** Canonical destination for this lane. */
  href: string;
  /** Short honest secondary line, e.g. "4 build types". Never a resource count. */
  meta: string;
  sequence?: undefined;
};

export type ResourceGoal = PathBackedGoal | HubBackedGoal;

export const RESOURCE_GOALS: readonly ResourceGoal[] = [
  {
    id: "website",
    title: "Build a Better Website",
    description:
      "Work out what's wrong with the site you have, how a marketing site should be structured, and what a build like that should cost.",
    path: "websites-that-grow-businesses",
    ctaLabel: "Explore website resources",
    destination: "path",
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
    destination: "path",
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
    destination: "path",
    // Fundamentals → workplace framing → practical application →
    // organizational implications → deeper analysis.
    //
    // AI 101 leads: it is the broad general-audience primer, and a reader who
    // needs "what is AI" at all needs it before the workplace-scoped guide.
    // "What Is AI? …for Professionals" stays second rather than being merged
    // or redirected — it is deliberately the short career-focused read.
    //
    // "The Invisible Workforce" is on this path but stays out of the
    // sequence: it is speculative economics rather than instruction, and
    // including it would make the lane less coherent. It remains in All
    // Resources and under "More on this topic".
    sequence: [
      "ai-101-beginners-guide-artificial-intelligence",
      "what-is-ai-beginners-guide-professionals",
      "how-i-used-ai-to-rebuild-my-workflow",
      "enterprise-ai-human-bottleneck",
      "ai-backbone-enterprise-architecture-human-adaptation",
    ],
  },
  {
    id: "stacks",
    title: "Choose a Developer Stack",
    description:
      "Compare practical technology combinations for SaaS products, MVPs, AI applications, marketing sites, and other common builds.",
    path: "developer-stacks",
    ctaLabel: "Explore developer stacks",
    // Hub-backed: /knowledge/developer-stacks is the one canonical
    // destination. developer-stacks is deliberately absent from
    // ACTIVE_LEARNING_PATHS so no competing path listing is generated.
    destination: "hub",
    href: "/knowledge/developer-stacks",
    // Build types the hub covers — categories, not published resources.
    // Kept factual so the card never implies guides that don't exist yet.
    meta: "4 build types",
  },
];

/** The goal lane backed by a given learning path, if that path is promoted. */
export function goalForPath(path: string | undefined): ResourceGoal | undefined {
  if (!path) return undefined;
  return RESOURCE_GOALS.find((g) => g.path === path);
}

/**
 * Where a lane card points. Path-backed goals resolve to their path listing;
 * hub-backed goals carry their own canonical href. Components must call this
 * rather than building the URL themselves, so no component needs to know a
 * lane is special.
 */
export function goalDestination(goal: ResourceGoal): string {
  return goal.destination === "hub" ? goal.href : `/knowledge/paths/${goal.path}`;
}

/** Slug of the recommended starting point — always the first sequence entry. */
export function recommendedStartFor(goal: PathBackedGoal): string {
  return goal.sequence[0];
}

/** Narrowing helper so callers can ask for a sequence without a cast. */
export function isPathBacked(goal: ResourceGoal): goal is PathBackedGoal {
  return goal.destination === "path";
}
