import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import KnowledgePage, { metadata } from "./page";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getAllResources, resourceHref } from "@/lib/resources";
import { getAllArchivePosts } from "@/lib/mdx/archive";
import { getBaseUrl } from "@/lib/site";
import { RESOURCE_CATEGORIES } from "@/lib/resourceCategories";
import { buildRows, buildFilters } from "@/components/resources/AllResources";

const renderPage = () => render(<ThemeProvider>{KnowledgePage()}</ThemeProvider>);

/** The All Resources <ul>, located by its section. */
function allResourcesList(container: HTMLElement): HTMLElement {
  const section = container.querySelector("#all-resources");
  expect(section).not.toBeNull();
  const list = section!.querySelector("ul");
  expect(list).not.toBeNull();
  return list as HTMLElement;
}

const rowsOf = (list: HTMLElement) => Array.from(list.querySelectorAll(":scope > li"));
const visibleRowsOf = (list: HTMLElement) =>
  rowsOf(list).filter((li) => !li.hasAttribute("hidden"));

function jsonLd(container: HTMLElement, id: string) {
  const el = container.querySelector(`#${id}`);
  expect(el).not.toBeNull();
  return JSON.parse(el!.textContent ?? "{}");
}

describe("/knowledge metadata", () => {
  it("keeps its canonical URL", () => {
    expect(metadata.alternates?.canonical).toBe(`${getBaseUrl()}/knowledge`);
  });
});

describe("All Resources is the canonical listing", () => {
  it("renders every Resource Center resource, and renders each exactly once", () => {
    const { container } = renderPage();
    const rows = rowsOf(allResourcesList(container));
    const resources = getAllResources();

    expect(rows.length).toBe(resources.length);

    const rendered = rows.map((li) => li.querySelector("a")?.getAttribute("href"));
    const expected = resources.map((r) => resourceHref(r));
    expect([...rendered].sort()).toEqual([...expected].sort());
  });

  it("has no duplicate hrefs — one card per resource", () => {
    const { container } = renderPage();
    const hrefs = rowsOf(allResourcesList(container)).map((li) =>
      li.querySelector("a")?.getAttribute("href")
    );
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("links every resource through its canonical /blog or /news route", () => {
    const { container } = renderPage();
    for (const li of rowsOf(allResourcesList(container))) {
      const href = li.querySelector("a")?.getAttribute("href") ?? "";
      expect(href).toMatch(/^\/(blog|news)\/[a-z0-9-]+$/);
    }
  });

  it("shows a title and a type label on each row", () => {
    const { container } = renderPage();
    for (const li of rowsOf(allResourcesList(container))) {
      expect(li.querySelector("h3")?.textContent?.trim().length).toBeGreaterThan(0);
      expect(li.textContent?.trim().length).toBeGreaterThan(10);
    }
  });
});

describe("filtering hides rather than duplicates", () => {
  it("keeps every row in the DOM when a category is selected", () => {
    const { container } = renderPage();
    const list = allResourcesList(container);
    const total = rowsOf(list).length;

    const websites = screen.getByRole("button", { name: /^Websites/ });
    fireEvent.click(websites);

    // Same number of <li> elements — filtering toggles `hidden` only.
    expect(rowsOf(list).length).toBe(total);
    expect(visibleRowsOf(list).length).toBeLessThan(total);
    expect(visibleRowsOf(list).length).toBeGreaterThan(0);
  });

  it("returns to the full list when All is selected again", () => {
    const { container } = renderPage();
    const list = allResourcesList(container);
    const total = rowsOf(list).length;

    fireEvent.click(screen.getByRole("button", { name: /^Software/ }));
    expect(visibleRowsOf(list).length).toBeLessThan(total);

    fireEvent.click(screen.getByRole("button", { name: /^All/ }));
    expect(visibleRowsOf(list).length).toBe(total);
  });

  it("narrows on search without removing rows from the document", () => {
    const { container } = renderPage();
    const list = allResourcesList(container);
    const total = rowsOf(list).length;

    fireEvent.change(screen.getByLabelText("Search resources"), {
      target: { value: "zzzz-no-match" },
    });
    expect(rowsOf(list).length).toBe(total);
    expect(visibleRowsOf(list).length).toBe(0);
  });
});

describe("filters derive from taxonomy, not hardcoded slugs", () => {
  it("offers All plus only categories that have resources", () => {
    const filters = buildFilters(buildRows(getAllResources()));
    expect(filters[0]).toMatchObject({ id: "all" });

    const categoryIds = filters.slice(1).map((f) => f.id);
    for (const id of categoryIds) {
      expect(RESOURCE_CATEGORIES.map((c) => c.id)).toContain(id);
    }
    expect(filters.slice(1).every((f) => f.count > 0)).toBe(true);
  });

  it("assigns each row its category from learningPath alone", () => {
    const resources = getAllResources();
    const rows = buildRows(resources);
    rows.forEach((row, i) => {
      const path = resources[i].frontmatter.learningPath;
      const expected = RESOURCE_CATEGORIES.find((c) =>
        (c.paths as readonly string[]).includes(path ?? "")
      );
      expect(row.categoryId).toBe(expected?.id ?? null);
    });
  });

  it("counts add up — every categorised row is reachable from exactly one chip", () => {
    const rows = buildRows(getAllResources());
    const filters = buildFilters(rows);
    const categorised = rows.filter((r) => r.categoryId !== null).length;
    const summed = filters.slice(1).reduce((n, f) => n + f.count, 0);
    expect(summed).toBe(categorised);
  });
});

describe("the published count is live and agrees with the listing", () => {
  it("renders getAllResources().length, never a hardcoded number", () => {
    const { container } = renderPage();
    const stat = Array.from(container.querySelectorAll(".rc-stat-card")).find((c) =>
      c.textContent?.includes("Published resources")
    );
    expect(stat).toBeDefined();
    const shown = Number(stat!.querySelector(".rc-stat-value")?.textContent?.trim());
    expect(shown).toBe(getAllResources().length);
  });

  it("displayed count === unique resources rendered in All Resources", () => {
    const { container } = renderPage();
    const stat = Array.from(container.querySelectorAll(".rc-stat-card")).find((c) =>
      c.textContent?.includes("Published resources")
    );
    const shown = Number(stat!.querySelector(".rc-stat-value")?.textContent?.trim());

    const hrefs = rowsOf(allResourcesList(container)).map((li) =>
      li.querySelector("a")?.getAttribute("href")
    );
    expect(new Set(hrefs).size).toBe(shown);
  });
});

describe("Archive stays out of the Resource Center", () => {
  it("getAllResources() contains no archive document", () => {
    const archiveSlugs = new Set(getAllArchivePosts().map((p) => p.slug));
    const leaked = getAllResources().filter((r) => archiveSlugs.has(r.slug));
    expect(leaked).toEqual([]);
  });

  it("no resource carries the webcraft-archive collection", () => {
    expect(
      getAllResources().filter((r) => r.frontmatter.collection === "webcraft-archive")
    ).toEqual([]);
  });

  it("links to the Archive without surfacing individual creative articles", () => {
    const { container } = renderPage();
    const pointer = Array.from(container.querySelectorAll("section")).find((s) =>
      s.textContent?.includes("Looking for experiments")
    );
    expect(pointer).toBeDefined();
    const links = within(pointer as HTMLElement).getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("href")).toBe("/archive");
  });
});

describe("Start Here", () => {
  it("renders exactly three resources", () => {
    const { container } = renderPage();
    const section = container.querySelector("#start-here");
    expect(section).not.toBeNull();
    expect(within(section as HTMLElement).getAllByRole("link")).toHaveLength(3);
  });

  it("does not promote the creative Synthetic Minds series", () => {
    const { container } = renderPage();
    const section = container.querySelector("#start-here") as HTMLElement;
    expect(section.textContent).not.toMatch(/Synthetic Minds/i);
    const hrefs = within(section)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect(hrefs).not.toContain("/blog/synthetic-minds-series");
  });

  it("promotes practical resources drawn from featured frontmatter", () => {
    const featuredHrefs = getAllResources()
      .filter((r) => r.frontmatter.featured === true)
      .map((r) => resourceHref(r));
    expect(featuredHrefs).toHaveLength(3);

    const { container } = renderPage();
    const section = container.querySelector("#start-here") as HTMLElement;
    const hrefs = within(section)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect([...hrefs].sort()).toEqual([...featuredHrefs].sort());
  });
});

describe("removed sections stay removed", () => {
  it("renders no audience entry cards or audience resource panels", () => {
    const { container } = renderPage();
    const text = container.textContent ?? "";
    expect(text).not.toContain("Find resources for you");
    expect(text).not.toContain("Jump to resources");
    for (const id of ["for-you", "for-developers", "for-founders", "for-business-owners", "for-ai-adopters"]) {
      expect(container.querySelector(`#${id}`)).toBeNull();
    }
  });

  it("renders no Topic Map section", () => {
    const { container } = renderPage();
    expect(container.querySelector("#discover")).toBeNull();
    expect(container.textContent).not.toContain("Topic Map");
    expect(container.textContent).not.toContain("Browse by topic");
  });

  it("renders no large Projects & Experiments section", () => {
    const { container } = renderPage();
    const text = container.textContent ?? "";
    expect(text).not.toContain("Projects & Experiments");
    expect(text).not.toContain("Where we explore past client work");
    expect(text).not.toContain("Essays & Emerging Ideas");
  });

  it("renders no From the Lab section", () => {
    const { container } = renderPage();
    expect(container.textContent).not.toContain("From the Lab");
    expect(container.textContent).not.toContain("Project breakdowns and build logs");
  });

  it("renders no dead 'Growing next' teaser", () => {
    const { container } = renderPage();
    expect(container.textContent).not.toContain("Growing next");
  });

  it("has no hardcoded closing CTA to the Synthetic Minds series", () => {
    // The series is still a resource and still belongs in the canonical
    // listing exactly once — what must be gone is the hand-written CTA that
    // singled it out. So: linked from All Resources, and nowhere else.
    const { container } = renderPage();
    const links = Array.from(container.querySelectorAll("a")).filter(
      (a) => a.getAttribute("href") === "/blog/synthetic-minds-series"
    );
    expect(links).toHaveLength(1);
    expect(container.querySelector("#all-resources")!.contains(links[0])).toBe(true);
  });

  it("hero jump links point only at sections that exist", () => {
    const { container } = renderPage();
    const anchors = Array.from(container.querySelectorAll('a[href^="#"]')).map((a) =>
      a.getAttribute("href")!.slice(1)
    );
    expect(anchors.length).toBeGreaterThan(0);
    for (const id of anchors) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });
});

describe("structured data", () => {
  it("emits CollectionPage with an ItemList of every resource", () => {
    const { container } = renderPage();
    const data = jsonLd(container, "knowledge-collection-jsonld");
    const resources = getAllResources();

    expect(data["@type"]).toBe("CollectionPage");
    expect(data.url).toBe(`${getBaseUrl()}/knowledge`);
    expect(data.mainEntity["@type"]).toBe("ItemList");
    expect(data.mainEntity.numberOfItems).toBe(resources.length);
    expect(data.mainEntity.itemListElement).toHaveLength(resources.length);
  });

  it("points every ItemList entry at the resource's canonical article URL", () => {
    const { container } = renderPage();
    const data = jsonLd(container, "knowledge-collection-jsonld");
    const expected = getAllResources().map((r) => `${getBaseUrl()}${resourceHref(r)}`);
    expect(data.mainEntity.itemListElement.map((i: { url: string }) => i.url).sort()).toEqual(
      [...expected].sort()
    );
    for (const item of data.mainEntity.itemListElement) {
      expect(item.url).toMatch(/\/(blog|news)\//);
      expect(item.url).not.toContain("/knowledge/");
    }
  });

  it("emits a BreadcrumbList for the Resource Center itself", () => {
    const { container } = renderPage();
    const data = jsonLd(container, "knowledge-breadcrumb-jsonld");
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement).toHaveLength(2);
    expect(data.itemListElement[1].item).toBe(`${getBaseUrl()}/knowledge`);
  });
});

describe("Tools", () => {
  it("keeps the Build Calculator reachable", () => {
    const { container } = renderPage();
    const tools = container.querySelector("#tools") as HTMLElement;
    expect(tools).not.toBeNull();
    const hrefs = within(tools)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/build");
  });
});
