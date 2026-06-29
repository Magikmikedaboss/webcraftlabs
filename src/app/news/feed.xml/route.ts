import { getBaseUrl, SITE } from "@/lib/site";
import { getAllNews } from "@/lib/mdx/news";
import { XML_HEADERS, escapeXml } from "@/lib/rss";

export async function GET() {
  const baseUrl = getBaseUrl();
  const validItems = getAllNews().filter((p) => {
    const d = new Date(p.frontmatter.date);
    return !isNaN(d.getTime());
  }).slice(0, 100);

  const latestDate = validItems.reduce<Date | null>((best, p) => {
    const d = new Date(p.frontmatter.date);
    return best === null || d > best ? d : best;
  }, null);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)} News</title>
    <description>News and updates from ${escapeXml(SITE.name)}</description>
    <link>${baseUrl}/news</link>
    <atom:link href="${baseUrl}/news/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${latestDate !== null ? latestDate.toUTCString() : new Date().toUTCString()}</lastBuildDate>    ${validItems
      .map(
        (post) => `<item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <description>${escapeXml(post.frontmatter.description)}</description>
      <link>${baseUrl}/news/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/news/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
    </item>`,
      )
      .join("\n")}
  </channel>
</rss>`;

  return new Response(rss, { headers: XML_HEADERS });
}
