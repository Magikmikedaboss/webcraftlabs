import type { LearningPath } from "./resources";

/**
 * Browsing categories for the All Resources listing.
 *
 * Derived from `learningPath` rather than from individual slugs, so a new
 * resource joins a category purely by being tagged — nothing here needs
 * editing when content is published. When the learning-path taxonomy is
 * reworked into goal lanes, this map is the single place that changes.
 *
 * Two paths are deliberately absent, for different reasons:
 *
 * `experiments-emerging-ideas` — creative and speculative work is pointed at
 * the Archive rather than promoted as a peer browsing category.
 *
 * `developer-stacks` — discovery for stack guides is handled by the dedicated
 * hub at /knowledge/developer-stacks, which is their canonical destination.
 * A chip here would be a second, weaker entry point to the same content.
 *
 * Resources on either path still appear in All Resources exactly once under
 * "All", and in search — they simply have no category chip.
 */
export type ResourceCategory = {
  id: string;
  label: string;
  /** Learning paths that roll up into this category. */
  paths: readonly LearningPath[];
};

export const RESOURCE_CATEGORIES: readonly ResourceCategory[] = [
  { id: "websites", label: "Websites", paths: ["websites-that-grow-businesses"] },
  { id: "software", label: "Software", paths: ["building-software-products"] },
  { id: "development", label: "Development", paths: ["modern-web-development"] },
  { id: "ai-automation", label: "AI & Automation", paths: ["ai-workflow-automation"] },
];

/** The category a learning path rolls up into, or undefined if it maps to none. */
export function categoryForPath(path: string | undefined): ResourceCategory | undefined {
  if (!path) return undefined;
  return RESOURCE_CATEGORIES.find((c) => (c.paths as readonly string[]).includes(path));
}
