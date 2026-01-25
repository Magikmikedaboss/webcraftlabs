import Image from "next/image";
import Link from "next/link";


type FeedItem = {
  type: "blog" | "news";
  title: string;
  href: string;
  date?: string;
  description?: string;
  readingTime?: string;
  tag?: string;
  image?: string;
};

function MetaLine({ item }: { item: FeedItem }) {
  const label = item.type === "blog" ? "Blog" : "News";
  return (
    <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-[var(--muted)]">
      <span className="inline-flex rounded bg-[var(--primary)]/10 px-2 py-1 font-semibold text-[var(--primary)]">
        {label}
      </span>
      {item.tag ? <span className="opacity-80">{item.tag}</span> : null}
      {item.readingTime ? (
        <>
          <span>•</span>
          <span>{item.readingTime}</span>
        </>
      ) : null}
      {item.date ? (
        <>
          <span>•</span>
          <span>{item.date}</span>
        </>
      ) : null}
    </div>
  );
}

type HomeMagazineFeedProps = {
  featured?: FeedItem;
  latest: FeedItem[];
};

export default function HomeMagazineFeed(props: HomeMagazineFeedProps) {
  const { featured, latest } = props;

  // Extract 'View all' href logic for clarity
  const allTypes = [featured, ...(latest || [])].filter(Boolean).map(p => p?.type);
  const unique = Array.from(new Set(allTypes));
  let viewAllHref = "/blog";
  if (unique.length === 1) {
    viewAllHref = unique[0] === "news" ? "/news" : "/blog";
  } else if (unique.includes("news")) {
    viewAllHref = "/news";
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        {/* Featured */}
        <article className="lg:col-span-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface-2)] shadow-lg">
          {featured ? (
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[240px] md:min-h-[340px]">
                <Image
                  src={featured.image ?? "/images/bright-sky-reflects-on-tranquil-water-webcraft-website-design-image.jpg"}
                  alt={featured.title ?? "Featured post"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col">
                <MetaLine item={featured} />
                {featured.title && (
                  <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-[var(--featured-title,var(--text))]">
                    {featured.title}
                  </h3>
                )}
                {featured.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] line-clamp-4">
                    {featured.description}
                  </p>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-3">
                  {featured.href && (
                    <Link
                      href={featured.href}
                      className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                    >
                      Continue reading
                    </Link>
                  )}
                  <Link
                    href="/build"
                    className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold hover:bg-[var(--bg)]"
                  >
                    Start your build
                  </Link>
                </div>
                <div className="mt-auto pt-6">
                  <div className="h-px w-full bg-[var(--border)]/60" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[240px] p-8">
              <div className="text-center text-[var(--muted)]">
                <div className="text-2xl font-bold mb-2">No posts found</div>
                <div className="text-sm">Check back soon for updates!</div>
              </div>
            </div>
          )}
        </article>
        {/* Sidebar latest */}
        <aside className="lg:col-span-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold">Latest updates</div>
              <Link href={viewAllHref} className="text-xs font-semibold text-[var(--primary)] hover:opacity-80">
                View all
              </Link>
            </div>
            <div className="mt-4 flex flex-col divide-y divide-[var(--border)]">
              {latest.map((p) => (
                <Link key={p.href} href={p.href} className="group py-4 first:pt-0 last:pb-0">
                  <div className="text-[10px] sm:text-xs text-[var(--muted)]">
                    {(p.type === "blog" ? "Blog" : "News")}
                    {p.date ? ` • ${p.date}` : ""}
                    {p.readingTime ? ` • ${p.readingTime}` : ""}
                  </div>
                  <div className="mt-1 text-sm font-semibold leading-snug group-hover:opacity-90 text-[var(--featured-title,var(--text))]">
                    {p.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
