import { describe, it, expect } from "vitest";
import nextConfig from "./next.config.mjs";

describe("next.config.mjs redirects", () => {
  it("includes permanent redirects for all four retired Las Vegas service pages", async () => {
    const redirects = await nextConfig.redirects();
    const lvRedirects = redirects.filter((r) => r.source.includes("las-vegas"));

    expect(lvRedirects).toHaveLength(4);
    lvRedirects.forEach((r) => {
      expect(r.permanent).toBe(true);
      expect(r.destination).toMatch(/^\/las-vegas-web-design#/);
    });

    const destinations = lvRedirects.map((r) => r.destination).sort();
    expect(destinations).toEqual(
      [
        "/las-vegas-web-design#custom-website-development",
        "/las-vegas-web-design#landing-pages-funnels",
        "/las-vegas-web-design#saas-platform-development",
        "/las-vegas-web-design#seo-technical-optimization",
      ].sort()
    );
  });

  it("still includes the pre-existing legacy news redirects", async () => {
    const redirects = await nextConfig.redirects();
    const sources = redirects.map((r) => r.source);

    expect(sources).toContain("/news/enterprise-ai-agents-are-replacing-traditional-workflows");
    expect(sources).toContain("/news/human-bottleneck-enterprise-ai");
  });

  it("redirects every old top-level Synthetic Minds episode URL directly to its final Archive URL", async () => {
    const redirects = await nextConfig.redirects();
    const bySource = Object.fromEntries(redirects.map((r) => [r.source, r]));

    const episodeSlugs = [
      "episode-1-first-spark",
      "episode-2-alien-ideas",
      "episode-3-thinking-with-something-else",
      "episode-4-the-unexpected",
      "episode-5-human-bottleneck",
      "episode-6-the-new-creators",
    ];

    for (const slug of episodeSlugs) {
      const redirect = bySource[`/blog/${slug}`];
      expect(redirect, `missing redirect for /blog/${slug}`).toBeDefined();
      expect(redirect.destination).toBe(`/archive/${slug}`);
      expect(redirect.permanent).toBe(true);
    }
  });

  it("redirects the retired Synthetic Minds stub straight to the series overview", async () => {
    const redirects = await nextConfig.redirects();
    const redirect = redirects.find((r) => r.source === "/blog/what-is-synthetic-minds");

    expect(redirect).toBeDefined();
    expect(redirect.destination).toBe("/blog/synthetic-minds-series");
    expect(redirect.permanent).toBe(true);
  });

  it("never redirects an episode through an intermediate /blog/* destination (no double hop)", async () => {
    const redirects = await nextConfig.redirects();
    const episodeRedirects = redirects.filter((r) => /^\/blog\/episode-\d/.test(r.source));

    for (const r of episodeRedirects) {
      expect(r.destination.startsWith("/archive/")).toBe(true);
    }
  });

  it("redirects every old /blog/<slug> URL for a moved institutional Archive document to /archive/<slug>", async () => {
    const redirects = await nextConfig.redirects();
    const bySource = Object.fromEntries(redirects.map((r) => [r.source, r]));

    const institutionalSlugs = [
      "welcome-to-the-archive",
      "the-silent-vault",
      "treatise-1-on-the-preservation-of-knowledge",
      "the-duplicate-manuscript",
      "treatise-2-on-the-nature-of-evidence",
      "the-last-simulation",
      "the-last-radio-signal",
    ];

    for (const slug of institutionalSlugs) {
      const redirect = bySource[`/blog/${slug}`];
      expect(redirect, `missing redirect for /blog/${slug}`).toBeDefined();
      expect(redirect.destination).toBe(`/archive/${slug}`);
      expect(redirect.permanent).toBe(true);
    }
  });

  it("redirects every legacy nested /blog/synthetic-minds/* route directly to its final destination", async () => {
    const redirects = await nextConfig.redirects();
    const bySource = Object.fromEntries(redirects.map((r) => [r.source, r]));

    const expected = {
      "/blog/synthetic-minds": "/blog/synthetic-minds-series",
      "/blog/synthetic-minds/episode-1-first-spark": "/archive/episode-1-first-spark",
      "/blog/synthetic-minds/episode-2-alien-ideas": "/archive/episode-2-alien-ideas",
      "/blog/synthetic-minds/episode-3-thinking-with-something-else": "/archive/episode-3-thinking-with-something-else",
      "/blog/synthetic-minds/episode-4-the-unexpected": "/archive/episode-4-the-unexpected",
      "/blog/synthetic-minds/episode-5-human-bottleneck": "/archive/episode-5-human-bottleneck",
      "/blog/synthetic-minds/episode-6-the-new-creators": "/archive/episode-6-the-new-creators",
      "/blog/synthetic-minds/what-is-synthetic-minds": "/blog/synthetic-minds-series",
      "/blog/synthetic-minds/synthetic-minds-series": "/blog/synthetic-minds-series",
    };

    for (const [source, destination] of Object.entries(expected)) {
      const redirect = bySource[source];
      expect(redirect, `missing redirect for ${source}`).toBeDefined();
      expect(redirect.destination).toBe(destination);
      expect(redirect.permanent).toBe(true);
    }
  });
});
