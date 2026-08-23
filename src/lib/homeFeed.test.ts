import { describe, it, expect } from "vitest";
import { buildHomeFeed, excludeArchive, type HomeFeedSourcePost } from "./homeFeed";

function post(
  slug: string,
  date: string,
  overrides: Partial<HomeFeedSourcePost["frontmatter"]> = {}
): HomeFeedSourcePost {
  return {
    slug,
    frontmatter: {
      title: `Title for ${slug}`,
      date,
      ...overrides,
    },
  };
}

describe("excludeArchive", () => {
  it("removes documents whose collection is webcraft-archive", () => {
    const posts = [
      post("real-post", "2026-01-01"),
      post("the-silent-vault", "2026-06-28", { collection: "webcraft-archive" }),
    ];
    const result = excludeArchive(posts);
    expect(result.map((p) => p.slug)).toEqual(["real-post"]);
  });

  it("keeps posts with no collection field or a non-archive collection", () => {
    const posts = [
      post("no-collection-field", "2026-01-01"),
      post("blog-collection", "2026-01-02", { collection: "blog" }),
    ];
    expect(excludeArchive(posts)).toHaveLength(2);
  });
});

describe("buildHomeFeed", () => {
  it("never surfaces a webcraft-archive document as featured or latest", () => {
    const blogPosts = [
      post("the-duplicate-manuscript", "2026-06-29", { collection: "webcraft-archive" }),
      post("how-much-does-custom-website-cost-2026", "2026-01-27", { collection: "blog" }),
    ];
    const newsPosts = [post("manifesto", "2026-06-15", { collection: "news" })];

    const { featured, latest } = buildHomeFeed(blogPosts, newsPosts);

    const allSlugsShown = [featured?.href, ...latest.map((i) => i.href)];
    expect(allSlugsShown).not.toContain("/blog/the-duplicate-manuscript");
    expect(featured?.href).toBe("/news/manifesto");
  });

  it("orders combined blog + news items by date descending", () => {
    const blogPosts = [post("older-blog", "2026-01-01"), post("newer-blog", "2026-03-01")];
    const newsPosts = [post("mid-news", "2026-02-01")];

    const { featured, latest } = buildHomeFeed(blogPosts, newsPosts);

    expect(featured?.href).toBe("/blog/newer-blog");
    expect(latest.map((i) => i.href)).toEqual(["/news/mid-news", "/blog/older-blog"]);
  });

  it("falls back to summary when description is absent, and maps the first tag", () => {
    const blogPosts = [
      post("summary-only", "2026-01-01", { summary: "A short summary", tags: ["ai", "automation"] }),
    ];

    const { featured } = buildHomeFeed(blogPosts, []);

    expect(featured?.description).toBe("A short summary");
    expect(featured?.tag).toBe("ai");
  });

  it("returns an empty latest list and undefined featured when there are no posts", () => {
    const { featured, latest } = buildHomeFeed([], []);
    expect(featured).toBeUndefined();
    expect(latest).toEqual([]);
  });
});
