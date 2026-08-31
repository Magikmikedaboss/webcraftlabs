"use client";

import { trackEvent } from "@/lib/analytics";

/**
 * The only supported way to author an affiliate link.
 *
 * Follows the TrackedMailtoLink pattern: a plain anchor whose href is the
 * real, visible destination, plus a fire-and-forget GA4 event on click.
 * There is deliberately no redirect route, no /go/ shim, and no cloaking —
 * the URL a reader sees in the status bar is the URL they get.
 *
 * Always renders rel="sponsored noopener noreferrer". `sponsored` is the
 * attribute Google asks for on paid/affiliate links and is what keeps
 * these links from being treated as ordinary editorial endorsements;
 * ordinary external links in MDX get noopener/noreferrer only (see the
 * `a` override in src/lib/mdxComponents.ts) and are never marked sponsored.
 */
export default function AffiliateLink({
  href,
  tool,
  article,
  className,
  children,
}: {
  /** The real destination URL. Shown to the reader as-is; never rewritten. */
  href: string;
  /** Vendor/tool identifier for analytics, e.g. "supabase". Falls back to the destination host. */
  tool?: string;
  /** Article identifier for analytics. Falls back to the current pathname at click time. */
  article?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={className}
      onClick={() => {
        trackEvent("affiliate_click", {
          tool: tool ?? destinationHost(href),
          destination: destinationHost(href),
          article: article ?? currentPath(),
        });
      }}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Host only — never the full URL, so affiliate/tracking query parameters
 * don't end up in analytics payloads. Returns undefined rather than
 * throwing on a malformed href; trackEvent drops undefined params.
 */
function destinationHost(href: string): string | undefined {
  try {
    return new URL(href).hostname;
  } catch {
    return undefined;
  }
}

function currentPath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname;
}
