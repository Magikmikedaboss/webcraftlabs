import { describe, it, expect } from "vitest";
import {
  getArchivePosts,
  getArchiveUniversePosts,
  getSyntheticMindsEpisodes,
  ARCHIVE_ORDER,
} from "./archive";

describe("getArchiveUniversePosts", () => {
  it("returns only archive-universe documents", () => {
    for (const post of getArchiveUniversePosts()) {
      expect(post.frontmatter.archiveCollection).toBe("archive-universe");
    }
  });

  it("never includes a Synthetic Minds episode", () => {
    const slugs = getArchiveUniversePosts().map((p) => p.slug);
    expect(slugs.some((s) => s.startsWith("episode-"))).toBe(false);
  });

  it("every slug in the canonical ARCHIVE_ORDER resolves to a real archive-universe post", () => {
    const bySlug = new Map(getArchiveUniversePosts().map((p) => [p.slug, p]));
    for (const doc of ARCHIVE_ORDER) {
      expect(bySlug.has(doc.slug)).toBe(true);
    }
  });
});

describe("getSyntheticMindsEpisodes", () => {
  const episodes = getSyntheticMindsEpisodes();

  it("returns only synthetic-minds documents", () => {
    for (const ep of episodes) {
      expect(ep.frontmatter.archiveCollection).toBe("synthetic-minds");
    }
  });

  it("never includes an archive-universe (institutional) document", () => {
    for (const ep of episodes) {
      expect(ep.frontmatter.archiveId).toBeUndefined();
    }
  });

  it("every episode has a unique, positive seriesOrder", () => {
    const orders = episodes.map((e) => e.frontmatter.seriesOrder);
    expect(orders.every((o) => typeof o === "number" && o > 0)).toBe(true);
    expect(new Set(orders).size).toBe(orders.length);
  });

  it("is sorted deterministically by seriesOrder, ascending", () => {
    const orders = episodes.map((e) => e.frontmatter.seriesOrder);
    const sorted = [...orders].sort((a, b) => (a ?? 0) - (b ?? 0));
    expect(orders).toEqual(sorted);
  });
});

describe("getArchivePosts (combined)", () => {
  it("returns the union of both sub-collections and nothing else", () => {
    const combined = new Set(getArchivePosts().map((p) => p.slug));
    const universe = getArchiveUniversePosts().map((p) => p.slug);
    const episodes = getSyntheticMindsEpisodes().map((p) => p.slug);
    for (const slug of [...universe, ...episodes]) {
      expect(combined.has(slug)).toBe(true);
    }
    expect(combined.size).toBe(universe.length + episodes.length);
  });
});
