import { getBaseUrl, SITE } from "@/lib/site";
import { getAllNews } from "@/lib/mdx/news";
import { XML_HEADERS, buildRssFeed } from "@/lib/rss";

export async function GET() {
  const baseUrl = getBaseUrl();
  const rss = buildRssFeed({
    title: `${SITE.name} News`,
    description: `News and updates from ${SITE.name}`,
    link: `${baseUrl}/news`,
    selfUrl: `${baseUrl}/news/feed.xml`,
    items: getAllNews()
      .slice(0, 100)
      .map((p) => ({
        title: p.frontmatter.title,
        description: p.frontmatter.description,
        url: `${baseUrl}/news/${p.slug}`,
        date: p.frontmatter.date,
        category: "News",
      })),
  });
  return new Response(rss, { headers: XML_HEADERS });
}
