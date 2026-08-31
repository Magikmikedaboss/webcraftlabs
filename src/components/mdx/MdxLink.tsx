import type { AnchorHTMLAttributes } from "react";

/**
 * The `a` override for MDX-rendered content.
 *
 * Markdown links previously rendered as bare anchors with no rel at all,
 * so every outbound editorial link handed the destination a live
 * window.opener reference and a full referrer. This adds
 * rel="noopener noreferrer" to external links only.
 *
 * What it deliberately does NOT do:
 *  - It does not add target="_blank". Editorial links on this site open in
 *    the same tab; only UI chrome (ShareBar, footer social) opens new tabs,
 *    and forcing every citation into a new tab would be a behavior change,
 *    not hygiene.
 *  - It never adds `sponsored` or `nofollow`. Ordinary editorial links are
 *    genuine, unpaid references and must keep passing normal signals.
 *    Affiliate links are authored with <AffiliateLink>, which is the only
 *    component that marks a link sponsored.
 *
 * Author-supplied rel tokens are preserved and merged rather than
 * overwritten, so raw-HTML links in MDX can still opt into nofollow.
 */
export default function MdxLink({
  href,
  rel,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!isExternal(href)) {
    return (
      <a href={href} rel={rel} {...rest}>
        {children}
      </a>
    );
  }

  const tokens = new Set((rel ?? "").split(/\s+/).filter(Boolean));
  tokens.add("noopener");
  tokens.add("noreferrer");

  return (
    <a href={href} rel={[...tokens].join(" ")} {...rest}>
      {children}
    </a>
  );
}

/**
 * Only absolute http(s) URLs count as external. Relative paths, in-page
 * anchors, mailto:, and tel: are left exactly as authored — a rel on those
 * is meaningless and would just be noise in the rendered HTML.
 */
function isExternal(href: string | undefined): boolean {
  if (!href) return false;
  return /^https?:\/\//i.test(href);
}
