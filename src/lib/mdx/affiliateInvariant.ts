/**
 * Enforces the invariant that makes the public promise on /disclosure true:
 *
 *   "Where an article does contain affiliate links, a disclosure appears near
 *    the top of that article, before the links it covers. If you do not see
 *    that disclosure, the article has no affiliate links in it."
 *
 * <AffiliateLink> is registered globally in mdxComponents, so nothing stops
 * an author from using it in a document whose frontmatter omits
 * `affiliate: true` — the link would render and the disclosure would not.
 * Documentation and "remember to set the flag" tests can't prevent that;
 * only a hard failure during content load can.
 *
 * Two rules, both checked when a document is read:
 *
 *   1. A document that uses <AffiliateLink> MUST set `affiliate: true`.
 *      That flag is what makes the article template render the disclosure.
 *
 *   2. A document that uses <AffiliateLink> MUST live in a collection whose
 *      route actually renders a disclosure. Today that's `blog` only. News
 *      and Archive render MDX through the same shared component map but have
 *      no disclosure mechanism, so an affiliate link there would be
 *      undisclosed no matter what the frontmatter says.
 *
 * Both throw during content parsing, which means `next build` fails rather
 * than shipping an undisclosed affiliate link.
 *
 * The inverse case — `affiliate: true` with no <AffiliateLink> usage — is
 * deliberately NOT an error. It over-discloses rather than under-discloses,
 * the copy reads "may contain affiliate links", and a future approved
 * mechanism (a shared stack-table component rendering vendor links from
 * config, say) would legitimately set the flag without the JSX tag appearing
 * in the source. Failing that case would block the safe direction.
 */

/** Collections whose article templates render <AffiliateDisclosure />. */
export const AFFILIATE_CAPABLE_COLLECTIONS = ['blog'] as const;
export type AffiliateCapableCollection = (typeof AFFILIATE_CAPABLE_COLLECTIONS)[number];

/**
 * Strips the regions of an MDX document where `<AffiliateLink` is being
 * shown rather than used, so documentation about the component doesn't trip
 * the check:
 *
 *  - fenced code blocks (``` / ~~~), i.e. usage examples
 *  - inline code spans, i.e. `<AffiliateLink href=…>`
 *  - MDX comments, {@literal {}}{@literal /}* … *{@literal /}{@literal }}
 *
 * Prose that merely names AffiliateLink never matches in the first place —
 * the check requires the opening JSX angle bracket.
 */
function stripNonRenderingRegions(source: string): string {
  return source
    .replace(/^[ \t]*(`{3,}|~{3,})[\s\S]*?^[ \t]*\1[ \t]*$/gm, '')
    // An unterminated fence at end of file still shouldn't count as usage.
    .replace(/^[ \t]*(`{3,}|~{3,})[\s\S]*$/m, '')
    .replace(/`[^`\n]*`/g, '')
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '');
}

/**
 * True when the document actually renders the component. Requires a real
 * JSX opening tag — `<AffiliateLink` followed by whitespace, `>`, or `/` —
 * so `<AffiliateLinkGroup>` or the bare word "AffiliateLink" in a sentence
 * don't match.
 */
export function usesAffiliateLink(source: string): boolean {
  return /<AffiliateLink(?=[\s/>])/.test(stripNonRenderingRegions(source));
}

/**
 * Throws if a document uses <AffiliateLink> without the disclosure
 * machinery that covers it. Called by every MDX loader, so the failure
 * surfaces at content-load time — in `next build`, in `next dev`, and in
 * any test that reads content.
 */
export function assertAffiliateInvariant({
  collection,
  slug,
  filePath,
  source,
  frontmatter,
}: {
  /** Content collection the document was loaded from. */
  collection: string;
  slug: string;
  /** Absolute path, quoted in the error so the file is trivial to open. */
  filePath: string;
  /** MDX body, frontmatter already stripped. */
  source: string;
  frontmatter: { affiliate?: boolean };
}): void {
  if (!usesAffiliateLink(source)) return;

  const where = `${collection}/${slug} (${filePath})`;

  if (!(AFFILIATE_CAPABLE_COLLECTIONS as readonly string[]).includes(collection)) {
    throw new Error(
      `Affiliate disclosure invariant violated in ${where}: this document uses ` +
        `<AffiliateLink>, but the "${collection}" collection has no article template ` +
        `that renders <AffiliateDisclosure />, so the link would be undisclosed. ` +
        `Affiliate links are only supported in: ${AFFILIATE_CAPABLE_COLLECTIONS.join(', ')}. ` +
        `Move the content, or remove the <AffiliateLink> usage.`
    );
  }

  if (frontmatter.affiliate !== true) {
    throw new Error(
      `Affiliate disclosure invariant violated in ${where}: this document uses ` +
        `<AffiliateLink>, but its frontmatter does not set \`affiliate: true\`, so no ` +
        `disclosure would render above the link. Add \`affiliate: true\` to the ` +
        `frontmatter, or remove the <AffiliateLink> usage. See /disclosure.`
    );
  }
}
