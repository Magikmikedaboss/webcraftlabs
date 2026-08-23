import { describe, it, expect } from "vitest";
import {
  getAllResources,
  getResourcesByPath,
  getFeaturedResources,
  isActiveLearningPath,
  resourceHref,
  ACTIVE_LEARNING_PATHS,
} from "./resources";
import { LEARNING_PATH_META, isRecommendedStartValid } from "./resourcePathMeta";

describe("getAllResources", () => {
  it("never includes webcraft-archive collection documents", () => {
    const all = getAllResources();
    expect(all.length).toBeGreaterThan(0);
    expect(all.some((r) => r.frontmatter.collection === "webcraft-archive")).toBe(false);
  });
});

describe("getResourcesByPath — real migrated counts", () => {
  it("modern-web-development has exactly 1 resource", () => {
    expect(getResourcesByPath("modern-web-development")).toHaveLength(1);
  });

  it("ai-workflow-automation has exactly 5 resources", () => {
    expect(getResourcesByPath("ai-workflow-automation")).toHaveLength(5);
  });

  it("websites-that-grow-businesses has exactly 3 resources", () => {
    expect(getResourcesByPath("websites-that-grow-businesses")).toHaveLength(3);
  });

  it("experiments-emerging-ideas has exactly 4 resources", () => {
    expect(getResourcesByPath("experiments-emerging-ideas")).toHaveLength(4);
  });

  it("building-software-products (held back) has zero resources", () => {
    expect(getResourcesByPath("building-software-products")).toHaveLength(0);
  });
});

describe("isActiveLearningPath", () => {
  it("recognizes exactly the four active paths", () => {
    for (const path of ACTIVE_LEARNING_PATHS) {
      expect(isActiveLearningPath(path)).toBe(true);
    }
  });

  it("does not treat building-software-products as active", () => {
    expect(isActiveLearningPath("building-software-products")).toBe(false);
  });
});

describe("getFeaturedResources", () => {
  it("returns a small, genuine selection — not everything", () => {
    const all = getAllResources();
    const featured = getFeaturedResources();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.length).toBeLessThan(all.length);
    expect(featured.every((r) => r.frontmatter.featured === true)).toBe(true);
  });

  it("never includes Archive content in the featured set", () => {
    expect(getFeaturedResources().some((r) => r.frontmatter.collection === "webcraft-archive")).toBe(false);
  });
});

describe("resourceHref", () => {
  it("builds /blog/<slug> and /news/<slug> respectively", () => {
    expect(resourceHref({ type: "blog", slug: "example" })).toBe("/blog/example");
    expect(resourceHref({ type: "news", slug: "example" })).toBe("/news/example");
  });
});

describe("recommended start resources are real", () => {
  it.each(ACTIVE_LEARNING_PATHS)("%s recommends a resource that actually exists on that path", (path) => {
    const slugs = getResourcesByPath(path).map((r) => r.slug);
    expect(isRecommendedStartValid(path, slugs)).toBe(true);
  });
});

describe("building-software-products stays honestly held back", () => {
  it("is marked coming-soon with no recommendedStart", () => {
    expect(LEARNING_PATH_META["building-software-products"].status).toBe("coming-soon");
    expect(LEARNING_PATH_META["building-software-products"].recommendedStart).toBeUndefined();
  });
});
