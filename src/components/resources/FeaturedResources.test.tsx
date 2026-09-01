import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

/**
 * Exercises the Start Here cap against content that actually has more
 * featured resources than the limit.
 *
 * The MDX loaders are mocked rather than the query layer, so the real
 * chain runs: getAllPosts/getAllNews → getAllResources → getFeaturedResources
 * (limit) → the component. That means this fails if the component ever stops
 * passing START_HERE_LIMIT — which the live content, having exactly three
 * featured resources, cannot catch on its own.
 */
vi.mock("@/lib/mdx/blog", () => ({ getAllPosts: vi.fn() }));
vi.mock("@/lib/mdx/news", () => ({ getAllNews: vi.fn() }));

import { getAllPosts } from "@/lib/mdx/blog";
import { getAllNews } from "@/lib/mdx/news";
import FeaturedResources, { START_HERE_LIMIT } from "./FeaturedResources";

type Extra = Record<string, unknown>;

const post = (slug: string, extra: Extra = {}) => ({
  slug,
  content: "",
  frontmatter: {
    title: `Title ${slug}`,
    description: `Description ${slug}`,
    date: "2026-01-01",
    collection: "blog",
    resourceType: "guide",
    featured: true,
    ...extra,
  },
});

const mockPosts = (posts: ReturnType<typeof post>[]) => {
  vi.mocked(getAllPosts).mockReturnValue(posts as never);
  vi.mocked(getAllNews).mockReturnValue([] as never);
};

const cardHrefs = () =>
  screen.getAllByRole("link").map((a) => a.getAttribute("href"));

describe("Start Here is capped at START_HERE_LIMIT", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders only START_HERE_LIMIT cards when more resources are featured", () => {
    mockPosts([post("a"), post("b"), post("c"), post("d"), post("e")]);

    render(<FeaturedResources />);

    expect(START_HERE_LIMIT).toBe(3);
    expect(screen.getAllByRole("link")).toHaveLength(START_HERE_LIMIT);
  });

  it("takes the first START_HERE_LIMIT in query order and drops the rest", () => {
    mockPosts([post("a"), post("b"), post("c"), post("d")]);

    render(<FeaturedResources />);

    expect(cardHrefs()).toEqual(["/blog/a", "/blog/b", "/blog/c"]);
    // The fourth is not rendered here — it is still in All Resources.
    expect(cardHrefs()).not.toContain("/blog/d");
  });

  it("ignores resources that are not featured, however many exist", () => {
    mockPosts([
      post("a"),
      post("plain-1", { featured: undefined }),
      post("b"),
      post("plain-2", { featured: false }),
      post("c"),
      post("d"),
    ]);

    render(<FeaturedResources />);

    expect(cardHrefs()).toEqual(["/blog/a", "/blog/b", "/blog/c"]);
  });

  it("renders fewer than the limit without padding when few are featured", () => {
    mockPosts([post("a"), post("plain", { featured: false }), post("b")]);

    render(<FeaturedResources />);

    expect(cardHrefs()).toEqual(["/blog/a", "/blog/b"]);
  });

  it("renders nothing at all when no resource is featured", () => {
    mockPosts([post("plain-1", { featured: false }), post("plain-2", { featured: undefined })]);

    const { container } = render(<FeaturedResources />);

    expect(container.querySelector("#start-here")).toBeNull();
  });

  it("never surfaces Archive content, even if flagged featured", () => {
    mockPosts([
      post("archive-doc", { collection: "webcraft-archive" }),
      post("a"),
      post("b"),
    ]);

    render(<FeaturedResources />);

    expect(cardHrefs()).toEqual(["/blog/a", "/blog/b"]);
  });
});
