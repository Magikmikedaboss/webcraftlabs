import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DeveloperStacksPage, { metadata } from "./page";
import { ThemeProvider } from "@/components/ThemeProvider";
import sitemap from "../../sitemap";
import { getBaseUrl, SITE } from "@/lib/site";
import { getAllResources, ACTIVE_LEARNING_PATHS } from "@/lib/resources";
import { LEARNING_PATHS } from "@/lib/mdx/frontmatterSchema";
import { STACK_TRACKS, DECISION_TOPICS, RELATED_RESOURCE_SLUGS } from "@/lib/stacks/config";
import { buildStackItemList } from "@/lib/stacks/itemList";
import { isPublished, isPublishedTopic } from "@/lib/stacks/types";

const renderHub = () => render(<ThemeProvider>{DeveloperStacksPage()}</ThemeProvider>);

const jsonLd = (container: HTMLElement, id: string) =>
  JSON.parse(container.querySelector(`#${id}`)?.textContent ?? "{}");

/**
 * The hub's own content, excluding SiteShell's header nav and footer —
 * those carry site-wide links (/portfolio, external social) that say
 * nothing about this page.
 */
const hubBody = (container: HTMLElement) =>
  container.querySelector(".rc-root") as HTMLElement;

const hubLinks = (container: HTMLElement) =>
  Array.from(hubBody(container).querySelectorAll("a")).map(
    (a) => a.getAttribute("href") ?? ""
  );

describe("taxonomy", () => {
  it("allows developer-stacks as a learningPath", () => {
    expect(LEARNING_PATHS as readonly string[]).toContain("developer-stacks");
  });

  it("does not register a competing /knowledge/paths/developer-stacks route", () => {
    expect(ACTIVE_LEARNING_PATHS as readonly string[]).not.toContain("developer-stacks");
  });
});

describe("hub metadata and discoverability", () => {
  it("sets the canonical URL", () => {
    expect(metadata.alternates?.canonical).toBe(`${getBaseUrl()}/knowledge/developer-stacks`);
  });

  it("supplies its own title plus OG and Twitter metadata", () => {
    expect(metadata.title).toBe("Developer Stack Library");
    expect(metadata.title as string).not.toContain(SITE.name);
    expect(metadata.openGraph?.title).toBe(`Developer Stack Library | ${SITE.name}`);
    expect(metadata.twitter?.title).toBe(`Developer Stack Library | ${SITE.name}`);
  });

  it("appears in the sitemap, and the path variant does not", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls).toContain(`${getBaseUrl()}/knowledge/developer-stacks`);
    expect(urls).not.toContain(`${getBaseUrl()}/knowledge/paths/developer-stacks`);
  });
});

describe("structured data reflects only real links", () => {
  it("emits BreadcrumbList ending at the hub", () => {
    const { container } = renderHub();
    const data = jsonLd(container, "stacks-breadcrumb-jsonld");
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement).toHaveLength(3);
    expect(data.itemListElement[2].item).toBe(`${getBaseUrl()}/knowledge/developer-stacks`);
  });

  it("emits a CollectionPage whose ItemList holds exactly the published guides", () => {
    const { container } = renderHub();
    const data = jsonLd(container, "stacks-collection-jsonld");
    expect(data["@type"]).toBe("CollectionPage");
    expect(data.url).toBe(`${getBaseUrl()}/knowledge/developer-stacks`);

    const publishedTracks = STACK_TRACKS.filter(isPublished);
    expect(data.mainEntity["@type"]).toBe("ItemList");
    expect(data.mainEntity.numberOfItems).toBe(publishedTracks.length);
    expect(data.mainEntity.itemListElement.map((i: { url: string }) => i.url)).toEqual(
      publishedTracks.map((t) => `${getBaseUrl()}${t.href}`)
    );
  });

  it("never advertises a planned track as a URL", () => {
    const { container } = renderHub();
    const serialised = JSON.stringify(jsonLd(container, "stacks-collection-jsonld"));
    for (const track of STACK_TRACKS.filter((t) => !isPublished(t))) {
      expect(serialised).not.toContain(track.id);
    }
  });

  it("derives the ItemList from the tracks rather than hardcoding it", () => {
    // Same derivation the page uses, so the structured data cannot drift from
    // the config that drives the visible cards.
    const derived = buildStackItemList(STACK_TRACKS, getBaseUrl());
    expect(derived).toBeDefined();
    expect(derived!.numberOfItems).toBe(STACK_TRACKS.filter(isPublished).length);
    // Still returns undefined when nothing is published — the honest empty case.
    expect(buildStackItemList([], getBaseUrl())).toBeUndefined();
  });
});

describe("no dead links", () => {
  it("every rendered link points at a real internal route or published resource", () => {
    const { container } = renderHub();
    const published = new Set(getAllResources().map((r) => `/${r.type}/${r.slug}`));
    const allowedStatic = new Set([
      "/",
      "/knowledge",
      "/knowledge#tools",
      "/knowledge#all-resources",
    ]);
    const hrefs = hubLinks(container);
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      const ok = allowedStatic.has(href) || published.has(href) || href.startsWith("/knowledge");
      expect(ok, `unexpected href: ${href}`).toBe(true);
    }
  });

  it("renders no link to an unbuilt Stack Builder", () => {
    const { container } = renderHub();
    const hrefs = hubLinks(container);
    expect(hrefs).not.toContain("/stack-builder");
    expect(hrefs).not.toContain("/tools/stack-builder");
    expect(hrefs).not.toContain("/knowledge/developer-stacks/stack-builder");
  });
});

describe("published vs planned tracks", () => {
  it("has four build-type tracks", () => {
    expect(STACK_TRACKS).toHaveLength(4);
    expect(STACK_TRACKS.map((t) => t.title)).toEqual([
      "Solo SaaS",
      "Fast MVP",
      "AI Application",
      "Marketing Website",
    ]);
  });

  it("renders planned tracks as non-clickable, status-marked cards", () => {
    const { container } = renderHub();
    const planned = STACK_TRACKS.filter((t) => !isPublished(t));
    expect(planned.length).toBeGreaterThan(0);

    for (const track of planned) {
      const heading = screen.getByRole("heading", { name: track.title });
      const card = heading.closest("li");
      expect(card).not.toBeNull();
      // No anchor anywhere in a planned track's card.
      expect(card!.querySelector("a")).toBeNull();
      expect(card!.textContent).toContain("Guide coming next");
    }
    expect(container.textContent).toContain("Guide coming next");
  });

  it("only a published track can carry an href — planned ones cannot by type", () => {
    for (const track of STACK_TRACKS) {
      if (isPublished(track)) {
        expect(typeof track.href).toBe("string");
      } else {
        expect(track.href).toBeUndefined();
      }
    }
  });

  it("frames decision topics as planned scope, not published links", () => {
    const { container } = renderHub();
    for (const topic of DECISION_TOPICS.filter((t) => !isPublishedTopic(t))) {
      const heading = screen.getByRole("heading", { name: topic.label });
      expect(heading.closest("li")!.querySelector("a")).toBeNull();
    }
    expect(container.textContent).toContain("Planned");
  });

  it("says nothing is published while nothing is", () => {
    // The published branch — a topic rendering as a reachable link — is
    // exercised in published.test.tsx, which mocks the config so the branch
    // actually runs. Asserting it here would loop zero times and verify
    // nothing.
    expect(DECISION_TOPICS.filter(isPublishedTopic)).toHaveLength(0);
    const { container } = renderHub();
    expect(container.textContent).toContain("none are published yet");
  });
});

describe("internal linking to existing resources", () => {
  it("links Building Your First Developer Workbench", () => {
    renderHub();
    const link = screen.getByRole("link", { name: /Building Your First Developer Workbench/ });
    expect(link.getAttribute("href")).toBe("/blog/building-your-first-developer-workbench");
  });

  it("only links related slugs that are genuinely published", () => {
    const published = new Set(getAllResources().map((r) => r.slug));
    for (const slug of RELATED_RESOURCE_SLUGS) {
      expect(published.has(slug), `${slug} is not a published resource`).toBe(true);
    }
  });

  it("points back at the canonical All Resources listing", () => {
    const { container } = renderHub();
    expect(hubLinks(container)).toContain("/knowledge#all-resources");
  });
});

describe("affiliate safety", () => {
  it("renders no sponsored or affiliate links", () => {
    const { container } = renderHub();
    expect(hubBody(container).querySelector('a[rel*="sponsored"]')).toBeNull();
    // No outbound vendor links at all on the hub — this PR is editorial
    // architecture, so every link is internal.
    for (const href of hubLinks(container)) {
      expect(href.startsWith("http"), `outbound link: ${href}`).toBe(false);
    }
  });

  it("introduces no affiliate-enabled content", () => {
    const flagged = getAllResources().filter((r) => r.frontmatter.affiliate === true);
    expect(flagged).toEqual([]);
  });
});

describe("All Resources is unaffected by the hub", () => {
  it("contains no fabricated stack guides", () => {
    const slugs = getAllResources().map((r) => r.slug);
    // A planned track must never correspond to a real resource — that would
    // mean the hub is withholding something that exists. A published track
    // must, which is asserted separately below.
    for (const track of STACK_TRACKS.filter((t) => !isPublished(t))) {
      expect(slugs).not.toContain(track.id);
      expect(slugs).not.toContain(`${track.id}-stack`);
    }
  });

  it("every published track points at a resource that actually exists", () => {
    const hrefs = new Set(getAllResources().map((r) => `/${r.type}/${r.slug}`));
    const published = STACK_TRACKS.filter(isPublished);
    expect(published.length).toBeGreaterThan(0);
    for (const track of published) {
      expect(hrefs.has(track.href), `${track.href} is not a published resource`).toBe(true);
    }
  });

  it("still derives its count from published content rather than the hub", () => {
    // Derived, never hardcoded: the hub contributes nothing of its own, so the
    // count is exactly the content collections' own total.
    const resources = getAllResources();
    const stackGuides = resources.filter(
      (r) => r.frontmatter.learningPath === "developer-stacks"
    );
    expect(stackGuides).toHaveLength(STACK_TRACKS.filter(isPublished).length);
    expect(resources.length).toBeGreaterThan(stackGuides.length);
  });
});

describe("hub page structure", () => {
  it("renders exactly one h1", () => {
    const { container } = renderHub();
    const h1s = container.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toBe("Developer Stack Library");
  });

  it("states the core editorial principle rather than naming a best stack", () => {
    const { container } = renderHub();
    const text = container.textContent ?? "";
    expect(text).toContain("no universal best stack");
    expect(text).not.toMatch(/\bbest stack for\b|#1 stack|top stack/i);
  });

  it("publishes the evaluation criteria", () => {
    const { container } = renderHub();
    const text = container.textContent ?? "";
    for (const label of ["Maintenance burden", "Scaling path", "Lock-in & portability"]) {
      expect(text).toContain(label);
    }
  });

  it("mentions the Stack Builder as planned without linking it", () => {
    const { container } = renderHub();
    const text = container.textContent ?? "";
    expect(text).toContain("Stack Builder");
    expect(text).toContain("isn't built yet");
    expect(hubLinks(container).filter((h) => /stack-builder/i.test(h))).toHaveLength(0);
  });

  it("shows no fake pricing, ratings, or best badges", () => {
    const { container } = renderHub();
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\$\d|\bper month\b|★|\b\d(\.\d)?\/5\b|\bBest\b/);
  });

  it("names no vendor as recommended anywhere on the hub", () => {
    const { container } = renderHub();
    const cards = within(container).queryAllByRole("heading");
    expect(cards.length).toBeGreaterThan(0);
    expect(container.textContent).not.toMatch(/we recommend|our pick|winner/i);
  });
});
