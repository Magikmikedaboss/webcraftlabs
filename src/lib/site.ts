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
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Work" },
    { href: "/knowledge", label: "Resources" },
    { href: "/build", label: "Build Calculator" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://webcraftlabz.com",
} as const;

/**
 * Archive is intentionally excluded from SITE.nav and HEADER_NAV — it's a
 * speculative-fiction project, not a commercial or resource destination, and
 * is surfaced only as a distinctly labeled, visually subordinate footer link
 * (see SiteShell's footer). Do not add it back to primary navigation.
 */
export const ARCHIVE_FOOTER_LINK = {
  href: "/archive",
  label: "WebCraft Archive — Creative Works & Experiments",
} as const;

/**
 * Explicit header navigation groups so the desktop header is never coupled
 * to the order of SITE.nav. Update here when header layout changes.
 *
 * Desktop order: Services, Work, Resources, Build Calculator, About, Contact.
 * Contact stays the visually prominent CTA button rendered last.
 */
export const HEADER_NAV = {
  services: {
    label: "Services",
    items: [
      { href: "/las-vegas-web-design", label: "Websites & Local Growth" },
      { href: "/services/saas-platform-development", label: "Custom Software & SaaS" },
      { href: "/services/ai-automation", label: "AI & Automation" },
    ],
  },
  work: { href: "/portfolio", label: "Work" },
  /**
   * Phase 2 intentionally ships only destinations that exist and work today.
   * Developer Guides, Business Growth, dedicated AI & Automation resources,
   * and Tools & Templates are deferred to the Phase 3 Resource Center
   * transformation rather than linked here as placeholders.
   */
  resources: {
    label: "Resources",
    items: [
      { href: "/knowledge", label: "Resource Center" },
      { href: "/knowledge#paths", label: "Learning Paths" },
      { href: "/blog", label: "Blog" },
      { href: "/news", label: "News" },
    ],
  },
  buildCalculator: { href: "/build", label: "Build Calculator" },
  about: { href: "/about", label: "About" },
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
  // Build base URL from parsed components and strip search/hash for consistency
  const pathname = parsed.pathname.replace(/\/$/, '');
  return `${parsed.origin}${pathname === '' ? '' : pathname}`;
}
