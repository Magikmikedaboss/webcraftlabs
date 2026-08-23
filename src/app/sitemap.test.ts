import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import { getAllArchivePosts } from "@/lib/mdx/archive";

const EPISODE_SLUGS = [
  "episode-1-first-spark",
  "episode-2-alien-ideas",
  "episode-3-thinking-with-something-else",
  "episode-4-the-unexpected",
  "episode-5-human-bottleneck",
  "episode-6-the-new-creators",
];

describe("sitemap — Archive canonical URLs", () => {
  it("emits an /archive/<slug> URL for every published Archive document", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    for (const post of getAllArchivePosts()) {
      expect(urls.some((u) => u.endsWith(`/archive/${post.slug}`))).toBe(true);
    }
  });

  it("never emits an obsolete /blog/episode-* URL for a moved Synthetic Minds episode", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    for (const slug of EPISODE_SLUGS) {
      expect(urls.some((u) => u.endsWith(`/blog/${slug}`))).toBe(false);
    }
  });

  it("never emits a URL for the retired what-is-synthetic-minds stub", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/blog/what-is-synthetic-minds"))).toBe(false);
    expect(urls.some((u) => u.endsWith("/archive/what-is-synthetic-minds"))).toBe(false);
  });

  it("still emits the Synthetic Minds series overview as a Blog URL", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/blog/synthetic-minds-series"))).toBe(true);
  });
});
