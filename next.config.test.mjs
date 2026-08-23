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
});
