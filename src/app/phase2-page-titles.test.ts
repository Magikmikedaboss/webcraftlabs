import { describe, it, expect } from "vitest";
import { SITE } from "@/lib/site";

/**
 * Regression test for a CodeRabbit/Codex finding on PR #17: the root
 * layout's title template (`%s | ${SITE.name}`) applies to every page's
 * plain `metadata.title`. A page that already includes "| WebCraft Labz"
 * in its own title renders a doubled-up <title> ("X | WebCraft Labz |
 * WebCraft Labz"). Every page touched in Phase 2 must supply only its
 * own title text and let the root template append the site name once.
 *
 * openGraph.title / twitter.title are deliberately excluded here — those
 * fields are never run through Next's title template, so they're expected
 * to carry the full "X | WebCraft Labz" string on pages that set them.
 */
describe("Phase 2 pages: metadata.title excludes the site name", () => {
  const pages: Array<[string, () => Promise<{ metadata: { title?: unknown } }>]> = [
    ["/", () => import("./page")],
    ["/las-vegas-web-design", () => import("./las-vegas-web-design/page")],
    ["/services", () => import("./services/page")],
    ["/services/ai-automation", () => import("./services/ai-automation/page")],
    ["/services/custom-website-development", () => import("./services/custom-website-development/page")],
    ["/services/saas-platform-development", () => import("./services/saas-platform-development/page")],
    ["/services/landing-pages-funnels", () => import("./services/landing-pages-funnels/page")],
    ["/services/seo-technical-optimization", () => import("./services/seo-technical-optimization/page")],
  ];

  it.each(pages)("%s", async (_route, loadPage) => {
    const { metadata } = await loadPage();
    expect(typeof metadata.title).toBe("string");
    expect(metadata.title as string).not.toContain(SITE.name);
  });
});
