import { getBaseUrl, SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/mdx/blog";
import { getAllNews } from "@/lib/mdx/news";
import { XML_HEADERS, buildRssFeed } from "@/lib/rss";

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
    .filter((item) => Number.isFinite(new Date(item.date).getTime()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 100);

  const rss = buildRssFeed({
    title: `${SITE.name} Updates`,
    description: SITE.tagline,
    link: baseUrl,
    selfUrl: `${baseUrl}/feed.xml`,
    items,
  });

  return new Response(rss, { headers: XML_HEADERS });
}
