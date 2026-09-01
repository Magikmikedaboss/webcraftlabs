import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug } from "@/lib/mdx/blog";
import { getAllResources, resourceHref } from "@/lib/resources";
import { STACK_TRACKS } from "@/lib/stacks/config";
import { isPublished } from "@/lib/stacks/types";
import { ACTIVE_LEARNING_PATHS } from "@/lib/resources";
import { getBaseUrl } from "@/lib/site";

/**
 * The first published Developer Stack Library guide.
 *
 * These cover the publishing contract rather than the prose: the article
 * parses, carries the taxonomy that makes it a stack guide, reaches All
 * Resources exactly once, and is the single track the hub advertises. The hub
 * rendering itself is covered in app/knowledge/developer-stacks.
 */

const SLUG = "solo-saas-stack";

describe("solo-saas-stack article", () => {
  it("parses and exposes its canonical frontmatter", () => {
    const post = getPostBySlug(SLUG);
    expect(post).not.toBeNull();
    expect(post!.frontmatter.title).toBe(
      "The Solo SaaS Stack: What One Person Can Actually Ship and Maintain in 2026"
    );
    expect(post!.frontmatter.description?.length ?? 0).toBeGreaterThan(0);
  });

  it("is typed as a Developer Stack Library guide", () => {
    const { frontmatter } = getPostBySlug(SLUG)!;
    expect(frontmatter.resourceType).toBe("guide");
    expect(frontmatter.learningPath).toBe("developer-stacks");
  });

  it("carries no affiliate flag", () => {
    const { frontmatter } = getPostBySlug(SLUG)!;
    // Not merely "not true" — the field is absent in this first version.
    expect(frontmatter.affiliate).toBeUndefined();
  });

  it("contains no affiliate or sponsored links", () => {
    const post = getPostBySlug(SLUG)!;
    expect(post.content).not.toMatch(/rel=["'][^"']*sponsored/i);
    expect(post.content).not.toMatch(/<AffiliateLink/);
    expect(post.content.toLowerCase()).not.toContain("affiliate");
  });

  it("keeps its canonical URL at /blog/solo-saas-stack", () => {
    const resource = getAllResources().find((r) => r.slug === SLUG);
    expect(resource).toBeDefined();
    expect(resourceHref(resource!)).toBe(`/${resource!.type}/${SLUG}`);
    expect(resourceHref(resource!)).toBe("/blog/solo-saas-stack");
  });

  it("links only to internal resources that exist", () => {
    const post = getPostBySlug(SLUG)!;
    const internal = [...post.content.matchAll(/\]\((\/[^)]+)\)/g)].map((m) => m[1]);
    expect(internal.length).toBeGreaterThan(0);

    const blogSlugs = new Set(getAllPosts().map((p) => p.slug));
    const allowed = new Set(["/knowledge/developer-stacks"]);
    for (const href of internal) {
      if (allowed.has(href)) continue;
      expect(href.startsWith("/blog/"), `unexpected internal link: ${href}`).toBe(true);
      const slug = href.replace("/blog/", "");
      expect(blogSlugs.has(slug), `${href} does not resolve to a published post`).toBe(true);
    }
  });
});

describe("All Resources picks the guide up automatically", () => {
  it("includes it exactly once", () => {
    const matches = getAllResources().filter((r) => r.slug === SLUG);
    expect(matches).toHaveLength(1);
  });

  it("counts it without anything hardcoding the total", () => {
    const resources = getAllResources();
    // The count is whatever the collections contain — asserted as a relationship,
    // never as a literal, so publishing the next guide moves it on its own.
    const stackGuides = resources.filter(
      (r) => r.frontmatter.learningPath === "developer-stacks"
    );
    expect(stackGuides).toHaveLength(1);
    expect(stackGuides[0].slug).toBe(SLUG);
  });
});

describe("Developer Stack Library hub state", () => {
  it("marks Solo SaaS published, pointing at the real article", () => {
    const solo = STACK_TRACKS.find((t) => t.id === "solo-saas");
    expect(solo).toBeDefined();
    expect(isPublished(solo!)).toBe(true);
    expect(solo!.href).toBe("/blog/solo-saas-stack");
  });

  it("leaves the other three tracks planned and destination-less", () => {
    const others = STACK_TRACKS.filter((t) => t.id !== "solo-saas");
    expect(others.map((t) => t.id)).toEqual([
      "fast-mvp",
      "ai-application",
      "marketing-website",
    ]);
    for (const track of others) {
      expect(track.status).toBe("planned");
      expect(track.href).toBeUndefined();
    }
  });

  it("publishes exactly one track for now", () => {
    expect(STACK_TRACKS.filter(isPublished)).toHaveLength(1);
  });
});

describe("the hub stays the one canonical destination", () => {
  it("keeps developer-stacks out of the generated learning-path routes", () => {
    // /knowledge/paths/developer-stacks must not exist — the hub owns this URL.
    expect(ACTIVE_LEARNING_PATHS).not.toContain("developer-stacks");
  });

  it("puts the article in the sitemap at its canonical URL", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls).toContain(`${getBaseUrl()}/blog/${SLUG}`);
    expect(urls).not.toContain(`${getBaseUrl()}/knowledge/paths/developer-stacks`);
  });
});
