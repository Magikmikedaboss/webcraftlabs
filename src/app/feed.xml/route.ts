import { getBaseUrl, SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/mdx/blog";
import { getAllNews } from "@/lib/mdx/news";
import { XML_HEADERS, escapeXml } from "@/lib/rss";

export async function GET() {
  const baseUrl = getBaseUrl();

  const blogItems = getAllPosts().map((post) => ({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    url: `${baseUrl}/blog/${post.slug}`,
    date: post.frontmatter.date,
    category: "Blog",
  }));

  const newsItems = getAllNews().map((post) => ({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    url: `${baseUrl}/news/${post.slug}`,
    date: post.frontmatter.date,
    category: "News",
  }));

  const items = [...newsItems, ...blogItems]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 100);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)} Updates</title>
    <description>${escapeXml(SITE.tagline)}</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items
      .map(
        (item) => `<item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <category>${item.category}</category>
    </item>`,
      )
      .join("\n")}
  </channel>
</rss>`;

  return new Response(rss, { headers: XML_HEADERS });
}
