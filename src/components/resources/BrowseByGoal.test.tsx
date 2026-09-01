import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BrowseByGoal from "./BrowseByGoal";
import {
  RESOURCE_GOALS,
  goalForPath,
  goalDestination,
  isPathBacked,
  recommendedStartFor,
} from "@/lib/resourceGoals";
import { ACTIVE_LEARNING_PATHS, getResourcesByPath, getAllResources } from "@/lib/resources";
import { LEARNING_PATHS } from "@/lib/mdx/frontmatterSchema";

/** Only the lanes that promise an ordered sequence. */
const PATH_GOALS = RESOURCE_GOALS.filter(isPathBacked);

/** A sequenced lane by id — narrows the union so `.sequence` is defined. */
const pathGoal = (id: string) => PATH_GOALS.find((g) => g.id === id)!;

const UNPROMOTED = ["modern-web-development", "experiments-emerging-ideas"] as const;

describe("Browse by Goal replaces Learning Paths", () => {
  it("uses the goal framing in visible copy", () => {
    render(<BrowseByGoal />);
    expect(screen.getByText("Browse by Goal")).toBeTruthy();
  });

  it("no longer shows the Learning Paths heading", () => {
    const { container } = render(<BrowseByGoal />);
    expect(container.textContent).not.toContain("Learning Paths");
    expect(container.textContent).not.toContain("Learning paths");
  });

  it("renders exactly four goal lanes", () => {
    render(<BrowseByGoal />);
    expect(screen.getAllByRole("link")).toHaveLength(4);
    expect(RESOURCE_GOALS).toHaveLength(4);
  });

  it.each([
    ["Build a Better Website", "websites-that-grow-businesses"],
    ["Build Software", "building-software-products"],
    ["Use AI & Automation", "ai-workflow-automation"],
  ])("shows the %s lane linking to its path", (title, path) => {
    render(<BrowseByGoal />);
    const link = screen.getByRole("link", { name: new RegExp(title.replace("&", "&")) });
    expect(link.getAttribute("href")).toBe(`/knowledge/paths/${path}`);
  });

  it("shows a count and a recommended starting point on each sequenced card", () => {
    render(<BrowseByGoal />);
    for (const goal of PATH_GOALS) {
      const link = screen.getByRole("link", { name: new RegExp(goal.title) });
      expect(within(link).getByText(new RegExp(`${goal.sequence.length} resources?, in order`))).toBeTruthy();

      const startSlug = recommendedStartFor(goal);
      const start = getResourcesByPath(goal.path).find((r) => r.slug === startSlug);
      expect(start).toBeDefined();
      expect(link.textContent).toContain(start!.frontmatter.title);
    }
  });

  it("does not cram every article title onto the card", () => {
    render(<BrowseByGoal />);
    const aiGoal = pathGoal("ai");
    const link = screen.getByRole("link", { name: new RegExp(aiGoal.title) });
    // Only the recommended start is named; the rest live on the path page.
    const named = getResourcesByPath(aiGoal.path).filter((r) =>
      link.textContent!.includes(r.frontmatter.title)
    );
    expect(named).toHaveLength(1);
  });
});

describe("unpromoted paths are hidden from navigation but stay routable", () => {
  it.each(UNPROMOTED)("does not promote %s as a goal lane", (path) => {
    expect(goalForPath(path)).toBeUndefined();
    render(<BrowseByGoal />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).not.toContain(`/knowledge/paths/${path}`);
  });

  it.each(UNPROMOTED)("keeps the %s route registered so it does not 404", (path) => {
    expect(ACTIVE_LEARNING_PATHS).toContain(path);
  });

  it("every path-backed lane points at a route that actually exists", () => {
    // The type now enforces this — PathBackedGoal.path is ActiveLearningPath,
    // so a lane cannot be declared against a routeless value like
    // `developer-stacks` and render a card pointing at a 404. Asserted at
    // runtime too, since ACTIVE_LEARNING_PATHS can shrink independently.
    for (const goal of PATH_GOALS) {
      expect(ACTIVE_LEARNING_PATHS as readonly string[]).toContain(goal.path);
      expect(goalDestination(goal)).toBe(`/knowledge/paths/${goal.path}`);
    }
  });

  it("lets a hub-backed lane use a routeless taxonomy value", () => {
    // The inverse: developer-stacks has no path route by design, which is
    // exactly why the hub-backed variant keeps the looser LearningPath type.
    const stacks = RESOURCE_GOALS.find((g) => g.id === "stacks")!;
    expect(isPathBacked(stacks)).toBe(false);
    expect(stacks.path).toBe("developer-stacks");
    expect(ACTIVE_LEARNING_PATHS as readonly string[]).not.toContain(stacks.path);
    expect(goalDestination(stacks)).not.toMatch(/^\/knowledge\/paths\//);
  });

  it("keeps route support decoupled from visible promotion", () => {
    // The whole point of the split: more routes than lanes.
    expect(ACTIVE_LEARNING_PATHS.length).toBeGreaterThan(PATH_GOALS.length);
    for (const goal of PATH_GOALS) {
      expect(ACTIVE_LEARNING_PATHS).toContain(goal.path);
    }
  });

  it("still lists the single-resource path's article in All Resources", () => {
    const slugs = getAllResources().map((r) => r.slug);
    expect(slugs).toContain("building-your-first-developer-workbench");
  });

  it("keeps creative/experimental resources available in All Resources", () => {
    const slugs = getAllResources().map((r) => r.slug);
    for (const slug of ["synthetic-minds-series", "what-will-the-last-human-job-be", "introducing-axon"]) {
      expect(slugs).toContain(slug);
    }
  });
});

describe("goal sequences are intentional, not publish-date order", () => {
  it("every sequenced slug is really on its path", () => {
    for (const goal of PATH_GOALS) {
      const onPath = new Set(getResourcesByPath(goal.path).map((r) => r.slug));
      for (const slug of goal.sequence) {
        expect(onPath.has(slug), `${slug} is not on ${goal.path}`).toBe(true);
      }
    }
  });

  it("has no duplicate slugs within or across sequences", () => {
    const all = PATH_GOALS.flatMap((g) => g.sequence);
    expect(new Set(all).size).toBe(all.length);
  });

  it("orders the website lane diagnose → structure → cost, not newest-first", () => {
    const goal = pathGoal("website");
    expect(goal.sequence).toEqual([
      "why-most-websites-dont-convert-and-how-to-fix-yours-in-24-hours",
      "marketing-websites-that-convert",
      "how-much-does-custom-website-cost-2026",
    ]);

    // Proves the sequence is not publish-date driven: date order would put
    // the cost guide second, ahead of the structural blueprint.
    const byDate = getResourcesByPath(goal.path).map((r) => r.slug);
    expect(byDate).not.toEqual([...goal.sequence]);
  });

  it("orders the software lane build-vs-buy first", () => {
    const goal = pathGoal("software");
    expect(goal.sequence).toEqual([
      "custom-software-vs-off-the-shelf-tools",
      "mvp-vs-prototype-vs-production-application",
      "what-drives-the-cost-of-a-saas-mvp-in-2026",
    ]);
  });

  it("orders the AI lane fundamentals → application → implications", () => {
    const goal = pathGoal("ai");
    expect(goal.sequence).toEqual([
      "what-is-ai-beginners-guide-professionals",
      "how-i-used-ai-to-rebuild-my-workflow",
      "enterprise-ai-human-bottleneck",
      "ai-backbone-enterprise-architecture-human-adaptation",
    ]);
  });

  it("leaves the speculative AI essay out of the sequence but on the path", () => {
    const goal = pathGoal("ai");
    const speculative = "invisible-workforce-one-person-enterprise";
    expect(goal.sequence).not.toContain(speculative);
    expect(getResourcesByPath(goal.path).map((r) => r.slug)).toContain(speculative);
    expect(getAllResources().map((r) => r.slug)).toContain(speculative);
  });

  it("derives the recommended start from the sequence rather than a second source", () => {
    for (const goal of PATH_GOALS) {
      expect(recommendedStartFor(goal)).toBe(goal.sequence[0]);
    }
  });

  it("never has an empty sequence, so every lane has a starting point", () => {
    // `sequence` is typed `readonly [string, ...string[]]`, so an empty one
    // fails to compile. This asserts the same invariant at runtime, and that
    // recommendedStartFor never hands the card an undefined start.
    for (const goal of PATH_GOALS) {
      expect(goal.sequence.length).toBeGreaterThan(0);
      expect(typeof recommendedStartFor(goal)).toBe("string");
    }
  });
});

describe("Developer Stacks is a hub-backed lane", () => {
  const stacks = RESOURCE_GOALS.find((g) => g.id === "stacks")!;

  it("is the fourth lane and links to the hub, not a path listing", () => {
    expect(RESOURCE_GOALS[3].id).toBe("stacks");
    expect(goalDestination(stacks)).toBe("/knowledge/developer-stacks");
    render(<BrowseByGoal />);
    const link = screen.getByRole("link", { name: /Choose a Developer Stack/ });
    expect(link.getAttribute("href")).toBe("/knowledge/developer-stacks");
  });

  it("does not create a competing /knowledge/paths/developer-stacks route", () => {
    expect(ACTIVE_LEARNING_PATHS as readonly string[]).not.toContain("developer-stacks");
    render(<BrowseByGoal />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).not.toContain("/knowledge/paths/developer-stacks");
  });

  it("uses developer-stacks as its backing taxonomy value", () => {
    expect(stacks.path).toBe("developer-stacks");
    expect(LEARNING_PATHS as readonly string[]).toContain("developer-stacks");
  });

  it("promises no sequence, because no stack guide is published yet", () => {
    expect(isPathBacked(stacks)).toBe(false);
    expect(stacks.sequence).toBeUndefined();
    // The card shows a factual descriptor, never a resource count.
    render(<BrowseByGoal />);
    const link = screen.getByRole("link", { name: /Choose a Developer Stack/ });
    expect(link.textContent).toContain("4 build types");
    expect(link.textContent).not.toMatch(/resources?, in order/);
    expect(link.textContent).not.toContain("Start with:");
  });

  it("leaves the existing three lanes untouched", () => {
    expect(RESOURCE_GOALS.slice(0, 3).map((g) => g.id)).toEqual([
      "website",
      "software",
      "ai",
    ]);
    for (const goal of PATH_GOALS) {
      expect(goal.destination).toBe("path");
      expect(goalDestination(goal)).toBe(`/knowledge/paths/${goal.path}`);
    }
  });

  it("adds no Stack Builder route or affiliate content to the lane", () => {
    const { container } = render(<BrowseByGoal />);
    const hrefs = Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(hrefs).not.toContain("/stack-builder");
    expect(hrefs).not.toContain("/tools/stack-builder");
    expect(container.querySelector('a[rel*="sponsored"]')).toBeNull();
  });
});
