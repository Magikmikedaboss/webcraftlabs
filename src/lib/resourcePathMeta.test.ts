import { describe, it, expect } from "vitest";
import { LEARNING_PATH_META, sortByExplicitOrder, isRecommendedStartValid } from "./resourcePathMeta";
import { getResourcesByPath, ACTIVE_LEARNING_PATHS } from "./resources";

const BUILDING_SOFTWARE_PRODUCTS_ORDER = [
  "mvp-vs-prototype-vs-production-application",
  "custom-software-vs-off-the-shelf-tools",
  "what-drives-the-cost-of-a-saas-mvp-in-2026",
];

describe("sortByExplicitOrder", () => {
  it("orders items by their position in the explicit slug list", () => {
    const items = [{ slug: "c" }, { slug: "a" }, { slug: "b" }];
    const sorted = sortByExplicitOrder(items, ["a", "b", "c"]);
    expect(sorted.map((i) => i.slug)).toEqual(["a", "b", "c"]);
  });

  it("is a no-op when order is undefined or empty (other paths' existing behavior)", () => {
    const items = [{ slug: "z" }, { slug: "a" }, { slug: "m" }];
    expect(sortByExplicitOrder(items, undefined).map((i) => i.slug)).toEqual(["z", "a", "m"]);
    expect(sortByExplicitOrder(items, []).map((i) => i.slug)).toEqual(["z", "a", "m"]);
  });

  it("appends unlisted items after every explicitly-ordered slug, in their original relative order", () => {
    // Regression-shaped: two unlisted items must not corrupt the sort via
    // Infinity - Infinity (NaN) — they should just keep their original
    // relative order, appended at the end.
    const items = [{ slug: "unrelated-2" }, { slug: "b" }, { slug: "unrelated-1" }, { slug: "a" }];
    const sorted = sortByExplicitOrder(items, ["a", "b"]);
    expect(sorted.map((i) => i.slug)).toEqual(["a", "b", "unrelated-2", "unrelated-1"]);
  });

  it("does not mutate the input array", () => {
    const items = [{ slug: "b" }, { slug: "a" }];
    const original = [...items];
    sortByExplicitOrder(items, ["a", "b"]);
    expect(items).toEqual(original);
  });
});

describe("building-software-products path order (Phase 4 fix)", () => {
  it("all three approved resources share the same publish date", () => {
    const resources = getResourcesByPath("building-software-products");
    const bySlug = new Map(resources.map((r) => [r.slug, r]));
    const dates = BUILDING_SOFTWARE_PRODUCTS_ORDER.map((slug) => bySlug.get(slug)?.frontmatter.date);
    expect(new Set(dates).size).toBe(1);
  });

  it("renders in the intended reading order despite the shared date, via explicit order — not accidental filename/date luck", () => {
    const meta = LEARNING_PATH_META["building-software-products"];
    const resources = getResourcesByPath("building-software-products");
    const rest = sortByExplicitOrder(
      resources.filter((r) => r.slug !== meta.recommendedStart),
      meta.order
    );
    expect(rest.map((r) => r.slug)).toEqual(
      BUILDING_SOFTWARE_PRODUCTS_ORDER.filter((slug) => slug !== meta.recommendedStart)
    );
  });

  it("adding an unrelated resource to this path would not silently determine the editorial order", () => {
    const meta = LEARNING_PATH_META["building-software-products"];
    const real = getResourcesByPath("building-software-products").filter(
      (r) => r.slug !== meta.recommendedStart
    );
    // Simulate a new, unrelated resource landing on this path later, with an
    // arbitrary slug that sorts alphabetically ahead of the real ones.
    const withUnrelated = [{ slug: "a-brand-new-unrelated-resource" }, ...real];
    const sorted = sortByExplicitOrder(withUnrelated, meta.order);
    // The explicitly-ordered slugs still come first, in the intended order;
    // the unrelated resource is appended at the end, not inserted ahead.
    expect(sorted.map((r) => r.slug)).toEqual([
      ...BUILDING_SOFTWARE_PRODUCTS_ORDER.filter((slug) => slug !== meta.recommendedStart),
      "a-brand-new-unrelated-resource",
    ]);
  });

  it("recommendedStart is still valid", () => {
    const slugs = getResourcesByPath("building-software-products").map((r) => r.slug);
    expect(isRecommendedStartValid("building-software-products", slugs)).toBe(true);
  });
});

describe("other learning paths retain their existing (unordered) behavior", () => {
  it.each(ACTIVE_LEARNING_PATHS.filter((p) => p !== "building-software-products"))(
    "%s has no explicit order configured",
    (path) => {
      expect(LEARNING_PATH_META[path].order).toBeUndefined();
    }
  );
});
