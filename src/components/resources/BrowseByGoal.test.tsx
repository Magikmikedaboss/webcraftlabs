import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BrowseByGoal, { goalHref } from "./BrowseByGoal";
import { RESOURCE_GOALS, goalForPath, recommendedStartFor } from "@/lib/resourceGoals";
import { ACTIVE_LEARNING_PATHS, getResourcesByPath, getAllResources } from "@/lib/resources";

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

  it("renders exactly three goal lanes", () => {
    render(<BrowseByGoal />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(RESOURCE_GOALS).toHaveLength(3);
  });

  it.each([
    ["Build a Better Website", "websites-that-grow-businesses"],
    ["Build Software", "building-software-products"],
    ["Use AI & Automation", "ai-workflow-automation"],
  ])("shows the %s lane linking to its path", (title, path) => {
    render(<BrowseByGoal />);
    const link = screen.getByRole("link", { name: new RegExp(title.replace("&", "&")) });
    expect(link.getAttribute("href")).toBe(goalHref(path));
  });

  it("shows a count and a recommended starting point on each card", () => {
    render(<BrowseByGoal />);
    for (const goal of RESOURCE_GOALS) {
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
    const aiGoal = RESOURCE_GOALS.find((g) => g.id === "ai")!;
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
    expect(hrefs).not.toContain(goalHref(path));
  });

  it.each(UNPROMOTED)("keeps the %s route registered so it does not 404", (path) => {
    expect(ACTIVE_LEARNING_PATHS).toContain(path);
  });

  it("keeps route support decoupled from visible promotion", () => {
    // The whole point of the split: more routes than lanes.
    expect(ACTIVE_LEARNING_PATHS.length).toBeGreaterThan(RESOURCE_GOALS.length);
    for (const goal of RESOURCE_GOALS) {
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
    for (const goal of RESOURCE_GOALS) {
      const onPath = new Set(getResourcesByPath(goal.path).map((r) => r.slug));
      for (const slug of goal.sequence) {
        expect(onPath.has(slug), `${slug} is not on ${goal.path}`).toBe(true);
      }
    }
  });

  it("has no duplicate slugs within or across sequences", () => {
    const all = RESOURCE_GOALS.flatMap((g) => g.sequence);
    expect(new Set(all).size).toBe(all.length);
  });

  it("orders the website lane diagnose → structure → cost, not newest-first", () => {
    const goal = RESOURCE_GOALS.find((g) => g.id === "website")!;
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
    const goal = RESOURCE_GOALS.find((g) => g.id === "software")!;
    expect(goal.sequence).toEqual([
      "custom-software-vs-off-the-shelf-tools",
      "mvp-vs-prototype-vs-production-application",
      "what-drives-the-cost-of-a-saas-mvp-in-2026",
    ]);
  });

  it("orders the AI lane fundamentals → application → implications", () => {
    const goal = RESOURCE_GOALS.find((g) => g.id === "ai")!;
    expect(goal.sequence).toEqual([
      "what-is-ai-beginners-guide-professionals",
      "how-i-used-ai-to-rebuild-my-workflow",
      "enterprise-ai-human-bottleneck",
      "ai-backbone-enterprise-architecture-human-adaptation",
    ]);
  });

  it("leaves the speculative AI essay out of the sequence but on the path", () => {
    const goal = RESOURCE_GOALS.find((g) => g.id === "ai")!;
    const speculative = "invisible-workforce-one-person-enterprise";
    expect(goal.sequence).not.toContain(speculative);
    expect(getResourcesByPath(goal.path).map((r) => r.slug)).toContain(speculative);
    expect(getAllResources().map((r) => r.slug)).toContain(speculative);
  });

  it("derives the recommended start from the sequence rather than a second source", () => {
    for (const goal of RESOURCE_GOALS) {
      expect(recommendedStartFor(goal)).toBe(goal.sequence[0]);
    }
  });
});

describe("no Developer Stacks lane exists yet", () => {
  it("has no developer-stacks goal or path", () => {
    expect(RESOURCE_GOALS.map((g) => g.id)).not.toContain("developer-stacks");
    expect(RESOURCE_GOALS.map((g) => g.path as string)).not.toContain("developer-stacks");
    expect(ACTIVE_LEARNING_PATHS as readonly string[]).not.toContain("developer-stacks");
  });

  it("shows no stack lane in the rendered section", () => {
    const { container } = render(<BrowseByGoal />);
    expect(container.textContent).not.toMatch(/Developer Stack|Stack Builder|Solo SaaS/i);
  });
});
