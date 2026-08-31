import { describe, it, expect } from "vitest";

import { resolveArticleDates } from "@/lib/articleDates";
import { BlogFrontmatterSchema } from "@/lib/mdx/frontmatterSchema";

const base = {
  title: "A post",
  description: "A description",
  date: "2026-04-07",
};

describe("resolveArticleDates", () => {
  it("falls back to the publish date when the post has never been revised", () => {
    const { datePublished, dateModified } = resolveArticleDates({ date: "2026-04-07" });
    expect(datePublished).toBe("2026-04-07");
    expect(dateModified).toBe("2026-04-07");
    expect(dateModified).toBe(datePublished);
  });

  it("keeps the original publish date and uses `updated` for the modified date", () => {
    const { datePublished, dateModified } = resolveArticleDates({
      date: "2026-04-07",
      updated: "2026-08-30",
    });
    // The regression this guards: a revised post used to report its original
    // publish date as its dateModified.
    expect(datePublished).toBe("2026-04-07");
    expect(dateModified).toBe("2026-08-30");
    expect(dateModified).not.toBe(datePublished);
  });

  it("treats an empty or whitespace `updated` as absent", () => {
    expect(resolveArticleDates({ date: "2026-04-07", updated: "" }).dateModified).toBe("2026-04-07");
    expect(resolveArticleDates({ date: "2026-04-07", updated: "   " }).dateModified).toBe("2026-04-07");
  });
});

describe("BlogFrontmatterSchema — updated date", () => {
  it("accepts frontmatter without `updated` (existing content stays valid)", () => {
    const parsed = BlogFrontmatterSchema.safeParse(base);
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.updated).toBeUndefined();
  });

  it("accepts a valid ISO `updated` date", () => {
    const parsed = BlogFrontmatterSchema.safeParse({ ...base, updated: "2026-08-30" });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.updated).toBe("2026-08-30");
  });

  it("rejects a malformed `updated` date", () => {
    expect(BlogFrontmatterSchema.safeParse({ ...base, updated: "08/30/2026" }).success).toBe(false);
    expect(BlogFrontmatterSchema.safeParse({ ...base, updated: "2026-8-30" }).success).toBe(false);
  });

  it("rejects an `updated` date that is not a real calendar date", () => {
    // Same guard `date` already has: this must not roll over to March 2nd.
    expect(BlogFrontmatterSchema.safeParse({ ...base, updated: "2026-02-30" }).success).toBe(false);
    expect(BlogFrontmatterSchema.safeParse({ ...base, updated: "2026-13-01" }).success).toBe(false);
  });

  it("still applies the same validation to `date` itself", () => {
    expect(BlogFrontmatterSchema.safeParse({ ...base, date: "2026-02-30" }).success).toBe(false);
    expect(BlogFrontmatterSchema.safeParse({ ...base, date: "not-a-date" }).success).toBe(false);
  });
});
