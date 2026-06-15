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
    "## Primary content",
    `- Blog index: ${baseUrl}/blog`,
    `- News index: ${baseUrl}/news`,
    "",
    "## Machine-readable discovery",
    `- Sitemap: ${baseUrl}/sitemap.xml`,
    `- Combined RSS: ${baseUrl}/feed.xml`,
    `- Blog RSS: ${baseUrl}/blog/feed.xml`,
    `- News RSS: ${baseUrl}/news/feed.xml`,
    "",
    "## High-priority business pages",
    `- Services: ${baseUrl}/services`,
    `- Las Vegas Web Design: ${baseUrl}/las-vegas-web-design`,
    `- Build Configurator: ${baseUrl}/build`,
    `- Contact: ${baseUrl}/contact`,
  ].join("\n");

  return new Response(body, { headers: TEXT_HEADERS });
}
