import { getNewsItem, getAllNews } from "@/lib/news";
import SiteShell from "@/components/SiteShell";

export async function generateStaticParams() {
  const items = await getAllNews();
  return items.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  
  return {
    title: `${item.title} | WebCraft Labz`,
    description: item.summary || "Latest news from WebCraft Labz",
    alternates: {
      canonical: `/news/${slug}`,
    },
    openGraph: {
      title: item.title,
      description: item.summary || "Latest news from WebCraft Labz",
      url: `/news/${slug}`,
      type: "article",
      publishedTime: item.date,
    },
  };
}

export default async function NewsItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsItem(slug);

  return (
    <SiteShell title={item.title} intro={item.summary}>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-6 text-xs text-[var(--muted)]">{item.date}</div>
        <div
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: item.contentHtml }}
        />
      </article>
    </SiteShell>
  );
}