import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import SiteShell from "@/components/SiteShell";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  return (
    <SiteShell title={post.title} intro={post.summary}>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-6 text-xs text-[var(--muted)]">{post.date}</div>
        <div
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </SiteShell>
  );
}

