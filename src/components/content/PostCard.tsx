
import Link from "next/link";
export type IndexPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  kind: "blog" | "news";
};

export default function PostCard({
  post,
  variant = "standard",
}: {
  post: IndexPost;
  variant?: "featured" | "standard" | "compact";
}) {
  const href = `/${post.kind}/${post.slug}`;
  const badge = post.kind === "blog" ? "Editorial" : "News";

  if (variant === "featured") {
    return (
      <Link
        href={href}
        className="group block rounded-3xl border border-[var(--border)] bg-white/90 p-7 shadow-sm hover:shadow-lg transition"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--muted)]">
          <span className="rounded-full border border-[var(--border)] bg-white px-2 py-1">
            {badge}
          </span>
          <span>{post.date}</span>
        </div>

        <div className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--text)] group-hover:underline">
          {post.title}
        </div>

        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          {post.description}
        </p>

        {post.tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--border)] bg-white/70 px-2.5 py-1 text-xs font-semibold text-[var(--text)]"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
          Read story <span className="transition group-hover:translate-x-0.5">→</span>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group block rounded-2xl border border-[var(--border)] bg-white/80 p-4 hover:shadow-md transition"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs font-semibold text-[var(--muted)]">{post.date}</div>
            <div className="mt-1 truncate text-lg font-extrabold text-[var(--text)] group-hover:underline">
              {post.title}
            </div>
            <div className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">
              {post.description}
            </div>
          </div>
          <div className="mt-1 text-sm font-semibold text-blue-700">→</div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-[var(--border)] bg-white/90 p-6 shadow-sm hover:shadow-md transition"
    >
      <div className="text-xs font-semibold text-[var(--muted)]">{post.date}</div>
      <div className="mt-2 text-xl font-extrabold text-[var(--text)] group-hover:underline">
        {post.title}
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">{post.description}</p>
      {post.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--border)] bg-white/70 px-2.5 py-1 text-xs font-semibold text-[var(--text)]"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
