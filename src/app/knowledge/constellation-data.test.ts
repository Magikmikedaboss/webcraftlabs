import { describe, it, expect } from "vitest";
import { ACTIVE_LEARNING_PATHS, getResourcesByPath, resourceHref } from "@/lib/resources";

/**
 * Regression coverage for the data KnowledgeConstellation is built from
 * (see src/app/knowledge/page.tsx's constellationResources). The graph
 * itself renders on canvas and can't be meaningfully unit-tested, but the
 * assumptions it depends on — unique node ids, real audience tags for the
 * cross-path "bridge" links — are plain data and worth guarding directly.
 */
describe("Knowledge Constellation data", () => {
  const resources = ACTIVE_LEARNING_PATHS.flatMap((path) =>
    getResourcesByPath(path).map((r) => ({
      id: resourceHref(r),
      path,
      audience: r.frontmatter.audience ?? [],
    }))
  );

  it("has at least one resource per active learning path except the intentionally sparse ones", () => {
    // Every active path is expected to have real content; this only fails
    // if a path silently loses all its resources.
    for (const path of ACTIVE_LEARNING_PATHS) {
      expect(getResourcesByPath(path).length).toBeGreaterThan(0);
    }
  });

  it("every resource's id (used as the graph's nodeId) is unique", () => {
    const ids = resources.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every resource carries a real, non-empty audience array", () => {
    for (const r of resources) {
      expect(Array.isArray(r.audience)).toBe(true);
      expect(r.audience.length).toBeGreaterThan(0);
    }
  });

  it("at least one cross-path pair shares 2+ audience tags (so bridge links aren't always empty)", () => {
    let bridgeCount = 0;
    for (let i = 0; i < resources.length; i++) {
      for (let j = i + 1; j < resources.length; j++) {
        if (resources[i].path === resources[j].path) continue;
        const shared = resources[i].audience.filter((a) => resources[j].audience.includes(a));
        if (shared.length >= 2) bridgeCount++;
      }
    }
    expect(bridgeCount).toBeGreaterThan(0);
  });
});
