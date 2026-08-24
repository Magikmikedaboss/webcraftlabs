import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import sitemap, { STATIC_ROUTE_LAST_MODIFIED } from "./sitemap";
import { getAllArchivePosts } from "@/lib/mdx/archive";
import { getAllPosts } from "@/lib/mdx/blog";
import { getAllNews } from "@/lib/mdx/news";

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

describe("sitemap — canonical domain", () => {
  const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (ORIGINAL_SITE_URL === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL;
    }
    vi.resetModules();
  });

  it("emits every URL on the canonical www origin, never the redirecting apex origin", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    vi.resetModules();
    const { default: freshSitemap } = await import("./sitemap");
    const entries = await freshSitemap();
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect(entry.url.startsWith("https://www.webcraftlabz.com")).toBe(true);
      expect(entry.url.startsWith("https://webcraftlabz.com/")).toBe(false);
    }
  });
});

describe("sitemap — deterministic lastModified, no Vercel API dependency", () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    delete process.env.VERCEL_TOKEN;
    delete process.env.VERCEL_GIT_COMMIT_SHA;
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("generates successfully with VERCEL_TOKEN and VERCEL_GIT_COMMIT_SHA both absent", async () => {
    const entries = await sitemap();
    expect(entries.length).toBeGreaterThan(0);
  });

  it("never calls fetch — generation is fully local, no network access", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    await sitemap();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("produces no duplicate URLs", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("never includes a URL that is a known redirect source", async () => {
    const nextConfig = (await import("../../next.config.mjs")).default;
    const redirects = await nextConfig.redirects!();
    const redirectSources = new Set(redirects.map((r: { source: string }) => r.source));

    const entries = await sitemap();
    for (const entry of entries) {
      const path = new URL(entry.url).pathname;
      expect(redirectSources.has(path)).toBe(false);
    }
  });

  it("every lastModified value, when present, is valid and not future-dated", async () => {
    const entries = await sitemap();
    const now = new Date();
    for (const entry of entries) {
      if (entry.lastModified === undefined) continue;
      const date = new Date(entry.lastModified);
      expect(Number.isFinite(date.getTime())).toBe(true);
      expect(date.getTime()).toBeLessThanOrEqual(now.getTime());
    }
  });

  it("content entries use their real frontmatter date", async () => {
    const entries = await sitemap();
    const byUrl = new Map(entries.map((e) => [e.url, e]));

    const [firstPost] = getAllPosts();
    if (firstPost) {
      const entry = byUrl.get(`https://www.webcraftlabz.com/blog/${firstPost.slug}`);
      expect(entry).toBeDefined();
      expect(new Date(entry!.lastModified!).toISOString().slice(0, 10)).toBe(firstPost.frontmatter.date);
    }

    const [firstNews] = getAllNews();
    if (firstNews) {
      const entry = byUrl.get(`https://www.webcraftlabz.com/news/${firstNews.slug}`);
      expect(entry).toBeDefined();
      expect(new Date(entry!.lastModified!).toISOString().slice(0, 10)).toBe(firstNews.frontmatter.date);
    }

    const [firstArchive] = getAllArchivePosts();
    if (firstArchive) {
      const entry = byUrl.get(`https://www.webcraftlabz.com/archive/${firstArchive.slug}`);
      expect(entry).toBeDefined();
      expect(new Date(entry!.lastModified!).toISOString().slice(0, 10)).toBe(firstArchive.frontmatter.date);
    }
  });

  it("static routes read their date from the STATIC_ROUTE_LAST_MODIFIED registry", async () => {
    const entries = await sitemap();
    const homepage = entries.find((e) => e.url === "https://www.webcraftlabz.com");
    expect(homepage).toBeDefined();
    expect(new Date(homepage!.lastModified!).toISOString().slice(0, 10)).toBe(
      STATIC_ROUTE_LAST_MODIFIED["/"]
    );

    const portfolio = entries.find((e) => e.url === "https://www.webcraftlabz.com/portfolio");
    expect(portfolio).toBeDefined();
    expect(new Date(portfolio!.lastModified!).toISOString().slice(0, 10)).toBe(
      STATIC_ROUTE_LAST_MODIFIED["/portfolio"]
    );
  });

  it("does not reintroduce one shared fallback date across static routes", async () => {
    const entries = await sitemap();
    const staticUrls = Object.keys(STATIC_ROUTE_LAST_MODIFIED).filter((k) => k !== "/knowledge/paths");
    const staticDates = staticUrls
      .map((path) => entries.find((e) => e.url === (path === "/" ? "https://www.webcraftlabz.com" : `https://www.webcraftlabz.com${path}`)))
      .filter((e): e is NonNullable<typeof e> => e !== undefined)
      .map((e) => new Date(e.lastModified!).toISOString().slice(0, 10));

    const distinctDates = new Set(staticDates);
    expect(distinctDates.size).toBeGreaterThan(1);
  });
});
