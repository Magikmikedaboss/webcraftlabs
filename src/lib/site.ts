export const SITE = {
  name: "WebCraft Labz",
  tagline: "Websites built like products, not brochures.",
  cta: "Start Your Build",
  nav: [
    { href: "/build", label: "Build" },
    { href: "/services", label: "Services" },
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
  
  // Validate URL format
  try {
    const parsed = new URL(rawUrl);
    // Ensure it's http or https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error(`SITE.url must use http or https protocol, got: ${parsed.protocol}`);
    }
  } catch (err) {
    const errorMsg = `Invalid SITE.url configuration: "${rawUrl}". Must be a valid HTTP(S) URL.`;
    console.error(errorMsg, err);
    throw new Error(errorMsg);
  }
  
  // Remove trailing slash for consistent URL construction
  return rawUrl.replace(/\/$/, '');
}
