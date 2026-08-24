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
 * "/" is a verified exception, not covered by this rule — see the
 * describe block below.
 *
 * openGraph.title / twitter.title are deliberately excluded here — those
 * fields are never run through Next's title template, so they're expected
 * to carry the full "X | WebCraft Labz" string on pages that set them.
 */
describe("Phase 2 pages: metadata.title excludes the site name", () => {
  const pages: Array<[string, () => Promise<{ metadata: { title?: unknown } }>]> = [
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

/**
 * "/" is a verified exception to the rule above: the root layout's title
 * template does not apply to page.tsx's own title, because they share the
 * same top-level route segment (confirmed by building locally and
 * inspecting the rendered <title> — it rendered as the bare string with
 * no " | WebCraft Labz" suffix, while every other route's template
 * applied correctly). So the homepage spells the full title out itself
 * instead of relying on the template, and must contain the site name
 * exactly once rather than zero times.
 */
describe("Homepage (/) metadata.title — verified template exception", () => {
  it("is the full, exact final title, including the site name exactly once", async () => {
    const { metadata } = await import("./page");
    expect(metadata.title).toBe(`Web Design, Software & AI Automation | ${SITE.name}`);

    const title = metadata.title as string;
    const occurrences = title.split(SITE.name).length - 1;
    expect(occurrences).toBe(1);
  });
});
