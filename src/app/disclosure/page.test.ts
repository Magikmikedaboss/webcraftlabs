import { describe, it, expect } from "vitest";
import { SITE, getBaseUrl } from "@/lib/site";
import { metadata } from "./page";
import sitemap from "../sitemap";
import { getAllPosts } from "@/lib/mdx/blog";
import { getAllNews } from "@/lib/mdx/news";

describe("/disclosure metadata", () => {
  it("sets a canonical URL", () => {
    expect(metadata.alternates?.canonical).toBe(`${getBaseUrl()}/disclosure`);
  });

  it("supplies only its own title text (the root layout appends the site name)", () => {
    expect(metadata.title).toBe("Affiliate Disclosure");
    expect(metadata.title as string).not.toContain(SITE.name);
  });

  it("has a description for search results", () => {
    expect(typeof metadata.description).toBe("string");
    expect((metadata.description as string).length).toBeGreaterThan(0);
  });
});

describe("/disclosure is discoverable", () => {
  it("appears in the sitemap — a disclosure search engines can't reach isn't one", async () => {
    const entries = await sitemap();
    const entry = entries.find((e) => e.url === `${getBaseUrl()}/disclosure`);
    expect(entry).toBeDefined();
    expect(entry?.lastModified).toBeInstanceOf(Date);
  });
});

/**
 * PR 1 builds the infrastructure only. No article is affiliate-enabled
 * yet, and none should be until real affiliate links are actually added —
 * a disclosure on an article with nothing to disclose is its own kind of
 * inaccuracy. This fails loudly if a future change flips one on by
 * accident rather than on purpose.
 */
describe("no published article is affiliate-enabled yet", () => {
  it("has zero blog or news posts with affiliate: true", () => {
    const flagged = [...getAllPosts(), ...getAllNews()]
      .filter((p) => p.frontmatter.affiliate === true)
      .map((p) => p.slug);
    expect(flagged).toEqual([]);
  });
});
