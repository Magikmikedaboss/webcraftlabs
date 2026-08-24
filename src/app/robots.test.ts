import { describe, it, expect, afterEach, vi } from "vitest";

const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

async function loadRobots() {
  vi.resetModules();
  const mod = await import("./robots");
  return mod.default;
}

describe("robots.txt — canonical domain", () => {
  afterEach(() => {
    if (ORIGINAL_SITE_URL === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL;
    }
    vi.resetModules();
  });

  it("points the Sitemap directive at the canonical www domain", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const robots = await loadRobots();
    const result = robots();
    expect(result.sitemap).toBe("https://www.webcraftlabz.com/sitemap.xml");
  });

  it("disallows /api/ and allows everything else", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const robots = await loadRobots();
    const result = robots();
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rule?.disallow).toContain("/api/");
    expect(rule?.allow).toBe("/");
  });
});
