import { describe, it, expect } from "vitest";
import { getAllArchivePosts, getAllArchivePostFrontmatter, getArchivePostBySlug } from "./archive";
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
