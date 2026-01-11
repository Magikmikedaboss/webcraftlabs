export const SITE = {
  name: "WebCraft Labs",
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