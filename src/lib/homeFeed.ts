const ARCHIVE_COLLECTION = "webcraft-archive";

export type HomeFeedFrontmatter = {
  title: string;
  description?: string;
  summary?: string;
  date: string;
  tags?: string[];
  collection?: string;
};

export type HomeFeedSourcePost = {
  slug: string;
  frontmatter: HomeFeedFrontmatter;
};

export type HomeFeedItem = {
  type: "blog" | "news";
  title: string;
  href: string;
  date?: string;
  description?: string;
  tag?: string;
};

/** Excludes WebCraft Archive documents from a normal business/editorial feed. */
export function excludeArchive<T extends { frontmatter: { collection?: string } }>(
  posts: T[]
): T[] {
  return posts.filter((p) => p.frontmatter.collection !== ARCHIVE_COLLECTION);
}

function toFeedItem(post: HomeFeedSourcePost, type: "blog" | "news"): HomeFeedItem {
  const { frontmatter, slug } = post;
  return {
    type,
    title: frontmatter.title,
    href: `/${type}/${slug}`,
    date: frontmatter.date,
    description: frontmatter.description ?? frontmatter.summary,
    tag: Array.isArray(frontmatter.tags) ? frontmatter.tags[0] : undefined,
  };
}

/**
 * Combines published blog + news posts into the homepage "Featured + Latest"
 * feed. Archive-collection documents are excluded here the same way
 * sitemap.ts, the RSS routes, and /blog/[slug] already exclude them —
 * getAllPosts()/getAllNews() only enforce the publish-cutoff, not the
 * collection split.
 */
export function buildHomeFeed(
  blogPosts: HomeFeedSourcePost[],
  newsPosts: HomeFeedSourcePost[]
): { featured?: HomeFeedItem; latest: HomeFeedItem[] } {
  const blogItems = excludeArchive(blogPosts).map((p) => toFeedItem(p, "blog"));
  const newsItems = excludeArchive(newsPosts).map((p) => toFeedItem(p, "news"));

  const combined = [...blogItems, ...newsItems].sort((a, b) =>
    String(b.date ?? "").localeCompare(String(a.date ?? ""))
  );

  return {
    featured: combined[0],
    latest: combined.slice(1, 5),
  };
}
