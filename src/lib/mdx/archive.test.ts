import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import { getAllArchivePosts, getAllArchivePostFrontmatter, getArchivePostBySlug, ARCHIVE_DIR } from "./archive";
import { getAllPosts, getAllPostSlugs } from "./blog";
import { ARCHIVE_ORDER } from "../archive";

const INSTITUTIONAL_SLUGS = ARCHIVE_ORDER.map((d) => d.slug);
const EPISODE_SLUGS = [
  "episode-1-first-spark",
  "episode-2-alien-ideas",
  "episode-3-thinking-with-something-else",
  "episode-4-the-unexpected",
  "episode-5-human-bottleneck",
  "episode-6-the-new-creators",
];

describe("Archive loader — collection separation", () => {
  it("resolves every institutional slug in the canonical order through the Archive loader", () => {
    for (const slug of INSTITUTIONAL_SLUGS) {
      expect(() => getArchivePostBySlug(slug)).not.toThrow();
    }
  });

  it("resolves every Synthetic Minds episode through the Archive loader", () => {
    for (const slug of EPISODE_SLUGS) {
      expect(() => getArchivePostBySlug(slug)).not.toThrow();
    }
  });

  it("the Blog loader no longer returns any moved fiction (institutional or Synthetic Minds)", () => {
    const blogSlugs = new Set(getAllPostSlugs());
    for (const slug of [...INSTITUTIONAL_SLUGS, ...EPISODE_SLUGS]) {
      expect(blogSlugs.has(slug)).toBe(false);
    }
    const blogFrontmatter = getAllPosts().map((p) => p.slug);
    for (const slug of [...INSTITUTIONAL_SLUGS, ...EPISODE_SLUGS]) {
      expect(blogFrontmatter).not.toContain(slug);
    }
  });

  it("the Archive loader does not return Blog essays or News", () => {
    const archiveSlugs = getAllArchivePostFrontmatter().map((p) => p.slug);
    // A couple of real, distinct Blog/News slugs that must never leak into Archive.
    expect(archiveSlugs).not.toContain("what-is-ai-beginners-guide-professionals");
    expect(archiveSlugs).not.toContain("introducing-axon");
  });

  it("every returned Archive document has an explicit archiveCollection", () => {
    for (const post of getAllArchivePosts()) {
      expect(["archive-universe", "synthetic-minds"]).toContain(post.frontmatter.archiveCollection);
    }
  });

  describe("rejects a file with non-Archive frontmatter, even if placed in the Archive directory", () => {
    // Mocked, not written to disk: src/content/archive/ is scanned by
    // getAllArchivePosts() in other test files running concurrently, so a
    // real fixture file here would race against them (create/delete timing
    // can make a sibling test's readdir see it, then 404 on the read).
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("throws when collection is a valid, but non-Archive, value", () => {
      const fixtureSlug = "not-an-archive-doc";
      const fixturePath = path.join(ARCHIVE_DIR, `${fixtureSlug}.mdx`);
      const fixtureContent = [
        "---",
        "title: Not an Archive document",
        "description: A Blog-collection file that should never load through the Archive loader.",
        "date: '2026-01-01'",
        "collection: blog",
        "---",
        "",
        "Body.",
        "",
      ].join("\n");

      vi.spyOn(fs, "existsSync").mockImplementation((p) => p === fixturePath);
      vi.spyOn(fs, "readFileSync").mockImplementation((p) => {
        if (p === fixturePath) return fixtureContent;
        throw new Error(`unexpected readFileSync path in test: ${p}`);
      });

      expect(() => getArchivePostBySlug(fixtureSlug)).toThrow(/collection must be "webcraft-archive"/);
    });
  });

  it("draft/future-dated Archive content remains excluded (same publish-cutoff gating as Blog/News)", () => {
    // getAllArchivePosts() filters through isArchivePublished(), which mirrors
    // isPostPublished()/isNewsPublished() exactly — this asserts every
    // returned document actually satisfies that gate rather than assuming it.
    const today = new Date().toISOString().slice(0, 10);
    for (const post of getAllArchivePosts()) {
      // The schema normalizes legacy string tokens to boolean `true` at parse
      // time, so by the time frontmatter reaches here `published` is only
      // ever `true` or `undefined`.
      expect(post.frontmatter.published === true || post.frontmatter.date <= today).toBe(true);
    }
  });
});
