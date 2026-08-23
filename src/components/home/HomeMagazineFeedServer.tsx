import HomeMagazineFeed from "@/components/home/HomeMagazineFeed";
import { getAllPosts } from "@/lib/mdx/blog";
import { getAllNews } from "@/lib/mdx/news";
import { buildHomeFeed } from "@/lib/homeFeed";

export default function HomeMagazineFeedServer() {
  // getAllPosts()/getAllNews() already enforce the same publish-cutoff /
  // `published` frontmatter rules used by the Blog, News, sitemap, and RSS
  // feeds. buildHomeFeed() additionally excludes `collection: "webcraft-archive"`
  // documents, matching how every other consumer of these loaders treats them.
  const blogPosts = getAllPosts();
  const newsPosts = getAllNews();

  const { featured, latest } = buildHomeFeed(blogPosts, newsPosts);

  return <HomeMagazineFeed featured={featured} latest={latest} />;
}
