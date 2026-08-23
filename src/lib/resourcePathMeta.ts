import type { ActiveLearningPath, LearningPath } from "./resources";

export type LearningPathMeta = {
  label: string;
  status: "active" | "coming-soon";
  audience: string;
  description: string;
  /** Slug of the resource to recommend starting with — must be a resource actually on this path. */
  recommendedStart?: string;
  nextStep?: { label: string; href: string };
};

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
    status: "coming-soon",
    audience: "Founders and product teams building custom software or SaaS.",
    description:
      "Coming to the Resource Center: guides on MVP scope, build-vs-buy decisions, and product architecture. Not yet active — no resources are published on this path.",
  },
};

export function isRecommendedStartValid(path: ActiveLearningPath, resourceSlugs: string[]): boolean {
  const start = LEARNING_PATH_META[path].recommendedStart;
  return start !== undefined && resourceSlugs.includes(start);
}
