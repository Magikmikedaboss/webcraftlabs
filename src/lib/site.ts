export const SITE = {
  name: "WebCraft Labz",
  tagline: "Websites built like products, not brochures.",
  cta: "Start Your Build",
  email: "info@webcraftlabz.com",
  social: {
    linkedin: "https://linkedin.com/company/webcraftlabz",
    twitter: "https://twitter.com/webcraftlabz",
  },
  address: {
    locality: "Las Vegas",
    region: "NV",
    country: "US",
    label: "Las Vegas, NV & Remote",
  },
  nav: [
    { href: "/about", label: "About" },
    { href: "/knowledge", label: "Knowledge" },
    { href: "/build", label: "Build" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/archive", label: "Archive" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://webcraftlabz.com",
} as const;

/**
 * Explicit header navigation groups so the desktop header is never coupled
 * to the order of SITE.nav. Update here when header layout changes.
 */
export const HEADER_NAV = {
  /** Standalone link rendered first in the desktop header */
  standalone: { href: "/about", label: "About" },
  /** Items collapsed into the "Explore" dropdown */
  dropdown: [
    { href: "/knowledge", label: "Knowledge" },
    { href: "/build", label: "Build" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/archive", label: "Archive" },
    { href: "/news", label: "News" },
  ],
  /** Primary CTA button rendered last in the desktop header */
  cta: { href: "/contact", label: "Contact" },
};

/**
 * Returns the normalized base URL (removes trailing slash and validates format)
 * Throws an error if SITE.url is invalid to catch misconfiguration early
 */
export function getBaseUrl(): string {
  const rawUrl = SITE.url;
  let parsed: URL;
  // Validate URL format (catch only parsing errors)
  try {
    parsed = new URL(rawUrl);
  } catch (err) {
    const errorMsg = `Invalid SITE.url configuration: "${rawUrl}". Must be a valid HTTP(S) URL.`;
    console.error(errorMsg, err);
    throw new Error(errorMsg);
  }
  // Ensure it's http or https (protocol check outside catch)
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(`SITE.url must use http or https protocol, got: ${parsed.protocol}`);
  }
  // Return only the origin (scheme + host + port) so pathnames in SITE.url
  // never corrupt canonical URLs built as `${baseUrl}/some-path`.
  return parsed.origin;
}
