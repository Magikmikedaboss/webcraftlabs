import { describe, it, expect } from "vitest";
import { LEARNING_PATH_META, sortByExplicitOrder, isRecommendedStartValid } from "./resourcePathMeta";
import { getResourcesByPath, ACTIVE_LEARNING_PATHS } from "./resources";
import { RESOURCE_GOALS, isPathBacked } from "./resourceGoals";

/**
 * Build-vs-buy first — a reader decides whether to build at all before
 * choosing between a prototype, an MVP, and a production application. This
 * mirrors the Build Software lane's `sequence`; the describe block at the
 * bottom of this file asserts the two never diverge.
 */
const BUILDING_SOFTWARE_PRODUCTS_ORDER = [
  "custom-software-vs-off-the-shelf-tools",
  "mvp-vs-prototype-vs-production-application",
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

/**
 * The reading order is reachable from two places: RESOURCE_GOALS' `sequence`
 * (what the path page actually renders for a promoted lane) and
 * LEARNING_PATH_META's `recommendedStart`/`order` (the fallback used only if
 * that lane is ever unpromoted). They previously disagreed for
 * building-software-products — the lane taught build-vs-buy first while the
 * fallback started at MVP-vs-prototype — which was invisible precisely
 * because the fallback is unreachable while the lane exists.
 *
 * These assert the two can never drift again.
 */
describe("path-backed lane sequence and path meta agree", () => {
  const pathGoals = RESOURCE_GOALS.filter(isPathBacked);

  it("covers every promoted path-backed lane", () => {
    expect(pathGoals.length).toBeGreaterThan(0);
  });

  it.each(pathGoals.map((g) => [g.path, g] as const))(
    "%s: recommendedStart equals the lane's first sequence entry",
    (path, goal) => {
      expect(LEARNING_PATH_META[path].recommendedStart).toBe(goal.sequence[0]);
    }
  );

  it.each(pathGoals.map((g) => [g.path, g] as const))(
    "%s: any explicit order matches the lane sequence",
    (path, goal) => {
      const { order } = LEARNING_PATH_META[path];
      if (order === undefined) return; // no second copy to disagree with
      expect([...order]).toEqual(goal.sequence.filter((slug) => order.includes(slug)));
    }
  );
});

describe("other learning paths retain their existing (unordered) behavior", () => {
  it.each(ACTIVE_LEARNING_PATHS.filter((p) => p !== "building-software-products"))(
    "%s has no explicit order configured",
    (path) => {
      expect(LEARNING_PATH_META[path].order).toBeUndefined();
    }
  );
});
