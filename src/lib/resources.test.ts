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

const BUILDING_SOFTWARE_PRODUCTS_SLUGS = [
  "mvp-vs-prototype-vs-production-application",
  "custom-software-vs-off-the-shelf-tools",
  "what-drives-the-cost-of-a-saas-mvp-in-2026",
];

describe("Phase 4 — Building Software Products resources (pre-activation)", () => {
  it("all three approved resources are eligible Resource Center content", () => {
    const allSlugs = getAllResources().map((r) => r.slug);
    for (const slug of BUILDING_SOFTWARE_PRODUCTS_SLUGS) {
      expect(allSlugs).toContain(slug);
    }
  });

  it("all three carry learningPath: building-software-products", () => {
    const bySlug = new Map(getAllResources().map((r) => [r.slug, r]));
    for (const slug of BUILDING_SOFTWARE_PRODUCTS_SLUGS) {
      expect(bySlug.get(slug)?.frontmatter.learningPath).toBe("building-software-products");
    }
  });

  it("all three target the approved founders/business-owners audience", () => {
    const bySlug = new Map(getAllResources().map((r) => [r.slug, r]));
    for (const slug of BUILDING_SOFTWARE_PRODUCTS_SLUGS) {
      const audience = bySlug.get(slug)?.frontmatter.audience;
      expect(audience).toEqual(expect.arrayContaining(["founders", "business-owners"]));
    }
  });

  it("all three are published and retrievable (not draft, not future-dated)", () => {
    const bySlug = new Map(getAllResources().map((r) => [r.slug, r]));
    for (const slug of BUILDING_SOFTWARE_PRODUCTS_SLUGS) {
      expect(bySlug.has(slug)).toBe(true);
    }
  });
});

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

  it("building-software-products has its three approved Phase 4 resources classified and is now active", () => {
    const resources = getResourcesByPath("building-software-products");
    const slugs = resources.map((r) => r.slug);
    expect(slugs).toContain("mvp-vs-prototype-vs-production-application");
    expect(slugs).toContain("custom-software-vs-off-the-shelf-tools");
    expect(slugs).toContain("what-drives-the-cost-of-a-saas-mvp-in-2026");
    for (const resource of resources) {
      expect(resource.frontmatter.audience).toEqual(
        expect.arrayContaining(["founders", "business-owners"])
      );
    }
    expect(isActiveLearningPath("building-software-products")).toBe(true);
  });
});

describe("isActiveLearningPath", () => {
  it("recognizes every currently active path", () => {
    for (const path of ACTIVE_LEARNING_PATHS) {
      expect(isActiveLearningPath(path)).toBe(true);
    }
  });

  it("does not treat an unrecognized path string as active", () => {
    expect(isActiveLearningPath("not-a-real-path")).toBe(false);
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

describe("building-software-products is now active (Phase 4)", () => {
  it("is marked active with a recommendedStart that actually exists on the path", () => {
    const meta = LEARNING_PATH_META["building-software-products"];
    expect(meta.status).toBe("active");
    expect(meta.recommendedStart).toBe("mvp-vs-prototype-vs-production-application");
    const slugs = getResourcesByPath("building-software-products").map((r) => r.slug);
    expect(isRecommendedStartValid("building-software-products", slugs)).toBe(true);
  });
});
