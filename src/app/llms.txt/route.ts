import { getBaseUrl, SITE } from "@/lib/site";

const TEXT_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

export async function GET() {
  const baseUrl = getBaseUrl();

  const body = [
    `# ${SITE.name}`,
    "",
    SITE.tagline,
    "",
    "## Canonical domain",
    baseUrl,
    "",
    "## About",
    `- About: ${baseUrl}/about`,
    "",
    "## Primary content",
    `- Blog index: ${baseUrl}/blog`,
    `- Synthetic Minds series: ${baseUrl}/blog/synthetic-minds-series`,    `- News index: ${baseUrl}/news`,
    `- Knowledge base: ${baseUrl}/knowledge`,
    "",
    "## WebCraft Archive",
    `- Archive index: ${baseUrl}/archive`,
    `- Archive catalog: ${baseUrl}/archive/catalog`,
    `- Timeline: ${baseUrl}/archive/timeline`,
    `- Collections: ${baseUrl}/archive/collections`,
    `- Institutions: ${baseUrl}/archive/institutions`,
    `- Glossary: ${baseUrl}/archive/glossary`,
    "",
    "## Machine-readable discovery",
    `- Sitemap: ${baseUrl}/sitemap.xml`,
    `- Combined RSS: ${baseUrl}/feed.xml`,
    `- Blog RSS: ${baseUrl}/blog/feed.xml`,
    `- News RSS: ${baseUrl}/news/feed.xml`,
    "",
    "## Services",
    `- Services overview: ${baseUrl}/services`,
    `- Custom website development: ${baseUrl}/services/custom-website-development`,
    `- SaaS platform development: ${baseUrl}/services/saas-platform-development`,
    `- AI & Automation: ${baseUrl}/services/ai-automation`,
    `- Landing pages + funnels: ${baseUrl}/services/landing-pages-funnels`,
    `- SEO + technical optimization: ${baseUrl}/services/seo-technical-optimization`,
    `- Las Vegas web design: ${baseUrl}/las-vegas-web-design`,
    "",
    "## Business pages",
    `- Portfolio: ${baseUrl}/portfolio`,
    `- Build configurator: ${baseUrl}/build`,
    `- Contact: ${baseUrl}/contact`,
  ].join("\n");

  return new Response(body, { headers: TEXT_HEADERS });
}
