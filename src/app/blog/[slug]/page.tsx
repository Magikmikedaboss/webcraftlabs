import SiteShell from "@/components/SiteShell";
import Link from "next/link";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <SiteShell
      title={`Blog: ${slug}`}
      intro="This is a placeholder post page. Next step: load markdown from src/content/blog."
    >
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="text-sm text-[var(--muted)]">Slug</div>
          <div className="mt-1 font-semibold">{slug}</div>
          <p className="mt-4 text-[var(--muted)]">
            When you&rsquo;re ready, we&rsquo;ll wire this to markdown and add “next/prev” navigation.
          </p>

          <Link
            href="/blog"
            className="mt-6 inline-flex rounded-md border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm font-semibold hover:bg-[var(--surface)]"
          >
            Back to blog
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}