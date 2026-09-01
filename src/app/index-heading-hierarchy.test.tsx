import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BlogIndexPage from "./blog/page";
import NewsIndexPage from "./news/page";
import { ThemeProvider } from "@/components/ThemeProvider";

/**
 * PostIndexClient is a subsection rendered inside pages that already own an h1
 * in their hero, but it declared its own section heading as an h1 — so /blog
 * and /news each shipped two h1 elements. These render the real pages and
 * count headings in the output rather than pattern-matching the source, so
 * they catch the duplicate coming back from either side.
 */

/** The exact utility string on the index section heading. */
const SECTION_HEADING_CLASS =
  "max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-6xl";

const renderBlog = () => render(<ThemeProvider>{BlogIndexPage()}</ThemeProvider>);
const renderNews = async () =>
  render(<ThemeProvider>{await NewsIndexPage()}</ThemeProvider>);

describe("index pages expose exactly one h1", () => {
  it("/blog renders exactly one h1, and it is the page hero", () => {
    const { container } = renderBlog();
    const h1s = container.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toContain("Tech & Development Blog");
  });

  it("/news renders exactly one h1, and it is the page hero", async () => {
    const { container } = await renderNews();
    const h1s = container.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toContain("Newsroom");
  });
});

describe("the index section heading is an h2, not a second h1", () => {
  it("renders 'Ideas for the next internet.' as an h2 on /blog", () => {
    renderBlog();
    expect(screen.getByText("Ideas for the next internet.").tagName).toBe("H2");
  });

  it("renders 'Ideas for the next internet.' as an h2 on /news", async () => {
    await renderNews();
    expect(screen.getByText("Ideas for the next internet.").tagName).toBe("H2");
  });

  it("keeps its visual class string byte-identical", () => {
    renderBlog();
    // The fix is semantic only — any typography drift here is a regression.
    expect(screen.getByText("Ideas for the next internet.").getAttribute("class")).toBe(
      SECTION_HEADING_CLASS
    );
  });
});

describe("no other heading level was changed", () => {
  it("keeps the featured entry at h2 and the list rows at h3", () => {
    const { container } = renderBlog();

    const featured = container.querySelector("a.group.mb-16");
    expect(featured).not.toBeNull();
    expect(featured!.querySelector("h2")).not.toBeNull();
    expect(featured!.querySelector("h1, h3")).toBeNull();

    const rows = container.querySelectorAll("div.space-y-4 > a.group");
    expect(rows.length).toBeGreaterThan(0);
    for (const row of rows) {
      expect(row.querySelector("h3")).not.toBeNull();
      expect(row.querySelector("h1, h2")).toBeNull();
    }
  });

  it("never skips a heading level on /blog", () => {
    const { container } = renderBlog();
    const levels = [...container.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) =>
      Number(h.tagName[1])
    );
    let prev = 0;
    for (const level of levels) {
      if (prev) expect(level).toBeLessThanOrEqual(prev + 1);
      prev = level;
    }
  });

  it("never skips a heading level on /news", async () => {
    const { container } = await renderNews();
    const levels = [...container.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) =>
      Number(h.tagName[1])
    );
    let prev = 0;
    for (const level of levels) {
      if (prev) expect(level).toBeLessThanOrEqual(prev + 1);
      prev = level;
    }
  });
});
