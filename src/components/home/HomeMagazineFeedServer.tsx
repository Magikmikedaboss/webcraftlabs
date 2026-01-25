import HomeMagazineFeed from "@/components/home/HomeMagazineFeed";
import { getAllBlogPosts } from "@/lib/blog";
import { getAllNews } from "@/lib/news";

export default async function HomeMagazineFeedServer() {
  // Fetch blog and news posts
  const blogPosts = await getAllBlogPosts();
  const newsPosts = await getAllNews();

  // Normalize blog items
  const blogItems = blogPosts.map((p) => ({
    type: "blog" as const,
    title: p.title,
    href: `/blog/${p.slug}`,
    date: p.date,
    description: p.summary,
    tag: Array.isArray(p.tags) ? p.tags[0] : undefined,
  }));

  // Normalize news items
  const newsItems = newsPosts.map((p) => ({
    type: "news" as const,
    title: p.title,
    href: `/news/${p.slug}`,
    date: p.date,
    description: p.summary,
    tag: Array.isArray(p.tags) ? p.tags[0] : undefined,
  }));

  // Combine and sort
  const combined = [...blogItems, ...newsItems].sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")));
  const featured = combined[0] ?? undefined;
  const latest = combined.slice(1, 5);

  return <HomeMagazineFeed featured={featured} latest={latest} />;
}
