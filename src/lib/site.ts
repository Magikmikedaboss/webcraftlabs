export const SITE = {
  name: "WebCraft Labz",
  tagline: "Websites built like products, not brochures.",
  cta: "Start Your Build",
  nav: [
    { href: "/about", label: "About" },
    { href: "/build", label: "Build" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://webcraftlabz.com",
} as const;

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
  // Remove trailing slash for consistent URL construction
  return rawUrl.replace(/\/$/, '');
}
