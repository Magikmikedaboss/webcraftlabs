import { describe, it, expect } from "vitest";
import { assertAffiliateInvariant, usesAffiliateLink } from "./affiliateInvariant";
import { getAllPosts } from "./blog";
import { getAllNews } from "./news";
import { getAllArchivePosts } from "./archive";

const call = (source: string, frontmatter: { affiliate?: boolean }, collection = "blog") =>
  assertAffiliateInvariant({
    collection,
    slug: "some-post",
    filePath: `/src/content/${collection}/some-post.mdx`,
    source,
    frontmatter,
  });

const USAGE = `Try <AffiliateLink href="https://example.com" tool="x">Example</AffiliateLink>.`;

describe("usesAffiliateLink — detects real JSX usage only", () => {
  it("matches an opening tag with props", () => {
    expect(usesAffiliateLink(USAGE)).toBe(true);
  });

  it("matches a self-closing and a bare tag", () => {
    expect(usesAffiliateLink(`<AffiliateLink/>`)).toBe(true);
    expect(usesAffiliateLink(`<AffiliateLink>x</AffiliateLink>`)).toBe(true);
    expect(usesAffiliateLink(`<AffiliateLink\n  href="https://example.com"\n>x</AffiliateLink>`)).toBe(true);
  });

  it("does not match prose that merely names the component", () => {
    expect(
      usesAffiliateLink("Authors should use the AffiliateLink component for affiliate links.")
    ).toBe(false);
  });

  it("does not match a different component with the same prefix", () => {
    expect(usesAffiliateLink(`<AffiliateLinkGroup href="https://example.com" />`)).toBe(false);
  });

  it("does not match usage inside a fenced code example", () => {
    const doc = [
      "Here is how you author one:",
      "",
      "```mdx",
      `<AffiliateLink href="https://example.com">Example</AffiliateLink>`,
      "```",
      "",
      "That is the only supported form.",
    ].join("\n");
    expect(usesAffiliateLink(doc)).toBe(false);
  });

  it("does not match usage inside a tilde-fenced or indented-fence example", () => {
    expect(usesAffiliateLink(`~~~tsx\n<AffiliateLink href="x" />\n~~~`)).toBe(false);
    expect(usesAffiliateLink(`  \`\`\`\n  <AffiliateLink href="x" />\n  \`\`\``)).toBe(false);
  });

  it("does not match usage inside an inline code span", () => {
    expect(usesAffiliateLink('Use `<AffiliateLink href="…">` to author one.')).toBe(false);
  });

  it("does not match usage inside an MDX comment", () => {
    expect(usesAffiliateLink(`{/* <AffiliateLink href="x" /> */}`)).toBe(false);
  });

  it("still detects real usage in a document that also documents the component", () => {
    const doc = [
      "```mdx",
      `<AffiliateLink href="https://example.com">Example</AffiliateLink>`,
      "```",
      "",
      USAGE,
    ].join("\n");
    expect(usesAffiliateLink(doc)).toBe(true);
  });
});

describe("assertAffiliateInvariant — rule 1: usage requires affiliate: true", () => {
  it("passes with AffiliateLink + affiliate: true", () => {
    expect(() => call(USAGE, { affiliate: true })).not.toThrow();
  });

  it("fails with AffiliateLink + affiliate absent", () => {
    expect(() => call(USAGE, {})).toThrow(/does not set `affiliate: true`/);
  });

  it("fails with AffiliateLink + affiliate: false", () => {
    expect(() => call(USAGE, { affiliate: false })).toThrow(/does not set `affiliate: true`/);
  });

  it("names the collection, slug, and file path so the failure is actionable", () => {
    expect(() => call(USAGE, {})).toThrow(/blog\/some-post/);
    expect(() => call(USAGE, {})).toThrow(/some-post\.mdx/);
  });

  it("passes for a document with no usage, whatever the flag says", () => {
    expect(() => call("Just prose.", {})).not.toThrow();
    expect(() => call("Just prose.", { affiliate: false })).not.toThrow();
  });

  it("allows affiliate: true with no usage — over-disclosing is not an error", () => {
    // A future approved mechanism (e.g. a stack table rendering vendor links
    // from config) would set the flag without the JSX tag in the source.
    expect(() => call("Just prose.", { affiliate: true })).not.toThrow();
  });

  it("does not fail on a doc that only documents the component", () => {
    const doc = "```mdx\n<AffiliateLink href=\"x\" />\n```";
    expect(() => call(doc, {})).not.toThrow();
  });
});

describe("assertAffiliateInvariant — rule 2: only disclosure-capable collections", () => {
  it("rejects usage in news, which has no disclosure mechanism", () => {
    expect(() => call(USAGE, { affiliate: true }, "news")).toThrow(
      /has no article template that renders <AffiliateDisclosure \/>/
    );
  });

  it("rejects usage in the Archive, even with affiliate: true", () => {
    expect(() => call(USAGE, { affiliate: true }, "webcraft-archive")).toThrow(
      /has no article template that renders <AffiliateDisclosure \/>/
    );
  });

  it("allows usage in blog", () => {
    expect(() => call(USAGE, { affiliate: true }, "blog")).not.toThrow();
  });
});

/**
 * The invariant runs inside every loader, so simply loading all content is
 * itself the assertion: if any published document violated it, these calls
 * would throw rather than return.
 */
describe("published content satisfies the invariant", () => {
  it("loads every blog, news, and archive document without violating it", () => {
    expect(() => {
      getAllPosts();
      getAllNews();
      getAllArchivePosts();
    }).not.toThrow();
  });

  it("has no published article that is affiliate-enabled yet", () => {
    const flagged = [...getAllPosts(), ...getAllNews(), ...getAllArchivePosts()]
      .filter((p) => p.frontmatter.affiliate === true)
      .map((p) => p.slug);
    expect(flagged).toEqual([]);
  });

  it("has no published document using <AffiliateLink> yet", () => {
    const using = [...getAllPosts(), ...getAllNews(), ...getAllArchivePosts()]
      .filter((p) => usesAffiliateLink(p.content))
      .map((p) => p.slug);
    expect(using).toEqual([]);
  });
});
