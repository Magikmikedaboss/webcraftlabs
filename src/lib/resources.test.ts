import { describe, it, expect } from "vitest";
import {
  getAllResources,
  getResourcesByPath,
  getResourcesByAudience,
  getFeaturedResources,
  isActiveLearningPath,
  resourceHref,
  ACTIVE_LEARNING_PATHS,
} from "./resources";
import { getAllPosts } from "./mdx/blog";
import { getAllNews } from "./mdx/news";
import { AUDIENCES } from "./mdx/frontmatterSchema";
import { LEARNING_PATH_META, isRecommendedStartValid } from "./resourcePathMeta";

const ARCHIVE_COLLECTION = "webcraft-archive";

describe("getAllResources — Phase 3.5 Archive move regression", () => {
  it("the Synthetic Minds series overview remains eligible for the Resource Center", () => {
    const all = getAllResources();
    expect(all.some((r) => r.slug === "synthetic-minds-series")).toBe(true);
  });

  it("no Synthetic Minds episode ever appears (only the Blog-collection overview is eligible)", () => {
    const all = getAllResources();
    const episodeSlugs = [
      "episode-1-first-spark",
      "episode-2-alien-ideas",
      "episode-3-thinking-with-something-else",
      "episode-4-the-unexpected",
      "episode-5-human-bottleneck",
      "episode-6-the-new-creators",
    ];
    for (const slug of episodeSlugs) {
      expect(all.some((r) => r.slug === slug)).toBe(false);
    }
  });

  it("no institutional Archive Universe document ever appears", () => {
    const all = getAllResources();
    expect(all.some((r) => r.slug === "welcome-to-the-archive")).toBe(false);
    expect(all.some((r) => r.slug === "the-silent-vault")).toBe(false);
  });
});

describe("getAllResources", () => {
  it("never includes webcraft-archive collection documents", () => {
    const all = getAllResources();
    expect(all.length).toBeGreaterThan(0);
    expect(all.some((r) => r.frontmatter.collection === ARCHIVE_COLLECTION)).toBe(false);
  });

  it("excludes any post without an explicit resourceType, even if not Archive", () => {
    const all = getAllResources();
    expect(all.every((r) => r.frontmatter.resourceType != null)).toBe(true);
  });

  it("matches an independently computed eligible count, rather than returning every non-Archive post regardless of classification", () => {
    const eligibleNonArchiveCount = [...getAllPosts(), ...getAllNews()]
      .filter((p) => p.frontmatter.collection !== ARCHIVE_COLLECTION)
      .filter((p) => p.frontmatter.resourceType != null).length;
    expect(getAllResources()).toHaveLength(eligibleNonArchiveCount);
  });
});

describe("getResourcesByPath — active paths have real, eligible content", () => {
  it.each(ACTIVE_LEARNING_PATHS)("%s has at least one real, eligible resource", (path) => {
    const resources = getResourcesByPath(path);
    expect(resources.length).toBeGreaterThan(0);
    for (const resource of resources) {
      expect(resource.frontmatter.learningPath).toBe(path);
      expect(resource.frontmatter.resourceType).toBeDefined();
      expect(resource.frontmatter.collection).not.toBe(ARCHIVE_COLLECTION);
    }
  });

  it("building-software-products (held back) has zero resources and is not an active path", () => {
    expect(getResourcesByPath("building-software-products")).toHaveLength(0);
    expect(isActiveLearningPath("building-software-products")).toBe(false);
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
    expect(getFeaturedResources().some((r) => r.frontmatter.collection === ARCHIVE_COLLECTION)).toBe(false);
  });

  it("only features resources that are Resource-Center-eligible (have resourceType)", () => {
    expect(getFeaturedResources().every((r) => r.frontmatter.resourceType != null)).toBe(true);
  });
});

describe("getResourcesByAudience", () => {
  it.each(AUDIENCES)("returns only resources tagged with the %s audience", (audience) => {
    const resources = getResourcesByAudience(audience);
    for (const resource of resources) {
      expect(resource.frontmatter.audience).toContain(audience);
    }
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
