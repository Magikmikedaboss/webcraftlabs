import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PathPage, { generateStaticParams, generateMetadata } from "./page";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ACTIVE_LEARNING_PATHS, getResourcesByPath, resourceHref } from "@/lib/resources";
import { RESOURCE_GOALS, goalForPath, isPathBacked } from "@/lib/resourceGoals";

/** Only sequenced lanes have path pages to test. */
const PATH_GOALS = RESOURCE_GOALS.filter(isPathBacked);
import { getBaseUrl } from "@/lib/site";

const renderPath = async (path: string) => {
  const ui = await PathPage({ params: Promise.resolve({ path }) });
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

/**
 * The reading-order list. Scoped by its accessible name so it can't collide
 * with SiteShell's breadcrumb <ol>, which also renders list items.
 */
const steps = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('ol[aria-label="Reading order"] > li'));

describe("goal path pages render an intentional sequence", () => {
  for (const goal of PATH_GOALS) {
    describe(goal.title, () => {
      it("renders the configured sequence in configured order", async () => {
        const { container } = await renderPath(goal.path);
        const hrefs = steps(container).map(
          (li) => li.querySelector("a")?.getAttribute("href")
        );
        const onPath = getResourcesByPath(goal.path);
        const expected = goal.sequence.map(
          (slug) => `/${onPath.find((r) => r.slug === slug)!.type}/${slug}`
        );
        expect(hrefs).toEqual(expected);
      });

      it("is not ordered by publish date", async () => {
        const { container } = await renderPath(goal.path);
        const rendered = steps(container).map(
          (li) => li.querySelector("a")?.getAttribute("href")
        );
        // getResourcesByPath returns newest-first; the AI and website lanes
        // deliberately differ from it.
        const dateOrder = getResourcesByPath(goal.path)
          .filter((r) => (goal.sequence as readonly string[]).includes(r.slug))
          .map((r) => resourceHref(r));
        if (goal.id !== "software") {
          expect(rendered).not.toEqual(dateOrder);
        }
        expect(rendered).toEqual(goal.sequence.map((s) =>
          resourceHref(getResourcesByPath(goal.path).find((r) => r.slug === s)!)
        ));
      });

      it("numbers the steps and marks the first as the starting point", async () => {
        const { container } = await renderPath(goal.path);
        const first = steps(container)[0];
        expect(first.textContent).toContain("01");
        expect(first.textContent).toContain("Start here");
        expect(steps(container)[1]?.textContent).toContain("02");
      });

      it("links every step to a canonical /blog or /news URL", async () => {
        const { container } = await renderPath(goal.path);
        for (const li of steps(container)) {
          expect(li.querySelector("a")?.getAttribute("href")).toMatch(
            /^\/(blog|news)\/[a-z0-9-]+$/
          );
        }
      });

      it("emits BreadcrumbList JSON-LD ending at this path", async () => {
        const { container } = await renderPath(goal.path);
        const el = container.querySelector(`#path-breadcrumb-jsonld-${goal.path}`);
        expect(el).not.toBeNull();
        const data = JSON.parse(el!.textContent ?? "{}");
        expect(data["@type"]).toBe("BreadcrumbList");
        expect(data.itemListElement).toHaveLength(3);
        expect(data.itemListElement[2].item).toBe(
          `${getBaseUrl()}/knowledge/paths/${goal.path}`
        );
      });

      it("sets a canonical URL in metadata", async () => {
        const meta = await generateMetadata({ params: Promise.resolve({ path: goal.path }) });
        expect(meta.alternates?.canonical).toBe(
          `${getBaseUrl()}/knowledge/paths/${goal.path}`
        );
      });
    });
  }

  it("lists path resources outside the sequence under 'More on this topic'", async () => {
    const ai = PATH_GOALS.find((g) => g.id === "ai")!;
    const { container } = await renderPath(ai.path);
    expect(container.textContent).toContain("More on this topic");
    // The speculative essay is on the path but out of the sequence — it must
    // still be reachable from this page rather than silently dropped.
    const hrefs = Array.from(container.querySelectorAll("a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toContain("/news/invisible-workforce-one-person-enterprise");
    expect(steps(container).map((li) => li.querySelector("a")?.getAttribute("href"))).not.toContain(
      "/news/invisible-workforce-one-person-enterprise"
    );
  });
});

describe("unpromoted paths keep working routes", () => {
  const unpromoted = ACTIVE_LEARNING_PATHS.filter((p) => !goalForPath(p));

  it("still pre-renders every active path, promoted or not", () => {
    const params = generateStaticParams();
    expect(params.map((p) => p.path).sort()).toEqual([...ACTIVE_LEARNING_PATHS].sort());
    expect(unpromoted.length).toBeGreaterThan(0);
  });

  it.each(["modern-web-development", "experiments-emerging-ideas"])(
    "renders %s without 404ing",
    async (path) => {
      const { container } = await renderPath(path);
      expect(container.querySelector("h1")).not.toBeNull();
      expect(steps(container).length).toBeGreaterThan(0);
    }
  );

  it("keeps the single-resource path reachable and linking canonically", async () => {
    const { container } = await renderPath("modern-web-development");
    const hrefs = steps(container).map((li) => li.querySelector("a")?.getAttribute("href"));
    expect(hrefs).toEqual(["/blog/building-your-first-developer-workbench"]);
  });

  it("emits BreadcrumbList JSON-LD on unpromoted paths too", async () => {
    const { container } = await renderPath("experiments-emerging-ideas");
    const el = container.querySelector("#path-breadcrumb-jsonld-experiments-emerging-ideas");
    expect(el).not.toBeNull();
    expect(JSON.parse(el!.textContent ?? "{}")["@type"]).toBe("BreadcrumbList");
  });
});

describe("path pages never duplicate article content", () => {
  it("links out rather than republishing, for every path", async () => {
    for (const path of ACTIVE_LEARNING_PATHS) {
      const { container } = await renderPath(path);
      const hrefs = Array.from(container.querySelectorAll("a"))
        .map((a) => a.getAttribute("href") ?? "")
        .filter((h) => h.startsWith("/blog/") || h.startsWith("/news/"));
      expect(hrefs.length).toBeGreaterThan(0);
      // No resource appears twice on a single path page.
      expect(new Set(hrefs).size).toBe(hrefs.length);
    }
  });
});
