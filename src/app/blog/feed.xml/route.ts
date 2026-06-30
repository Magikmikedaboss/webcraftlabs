import { getBaseUrl, SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/mdx/blog";
import { XML_HEADERS, buildRssFeed } from "@/lib/rss";

export async function GET() {
  const baseUrl = getBaseUrl();
  // Exclude archive posts, filter invalid dates, sort by date, and cap at 100
  const items = getAllPosts()
    .filter((p) => p.frontmatter.collection !== 'webcraft-archive')
    .filter((p) => {
      const d = p.frontmatter.date ? new Date(p.frontmatter.date) : null;
      return d && Number.isFinite(d.getTime());
    })
    .sort((a, b) => {
      const ta = new Date(a.frontmatter.date).getTime() || 0;
      const tb = new Date(b.frontmatter.date).getTime() || 0;
      return tb - ta;
    })
    .slice(0, 100);

  const rss = buildRssFeed({
    title: `${SITE.name} Blog`,
    description: SITE.tagline,
    link: `${baseUrl}/blog`,
    selfUrl: `${baseUrl}/blog/feed.xml`,
    items: items
      .filter((post) => post.frontmatter.collection !== "webcraft-archive")
      .map((post) => ({
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        url: `${baseUrl}/blog/${post.slug}`,
        date: post.frontmatter.date,
        category: "Blog",
      })),  });

  return new Response(rss, { headers: XML_HEADERS });
}
