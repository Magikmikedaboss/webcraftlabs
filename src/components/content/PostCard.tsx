
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
        className="group block rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/30 p-7 shadow-lg hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 text-white shadow-md">
            {badge}
          </span>
          <span className="text-gray-600">{post.date}</span>
        </div>

        <div className="mt-4 text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-cyan-600 transition-all">
          {post.title}
        </div>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-700">
          {post.description}
        </p>

        {post.tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-cyan-600 transition-colors">
          Read article <span className="transition group-hover:translate-x-1">→</span>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group block rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 hover:shadow-md transition"
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
          <div className="mt-1 text-sm font-semibold text-[var(--primary)]">→</div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center gap-2">
        <div className="text-xs font-semibold text-gray-500">{post.date}</div>
        <span className="text-xs text-blue-600">•</span>
        <span className="text-xs font-semibold text-blue-600">{badge}</span>
      </div>
      <div className="mt-3 text-xl font-extrabold text-gray-900 group-hover:text-blue-700 transition-colors">
        {post.title}
      </div>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{post.description}</p>
      {post.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
      <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
        Read more <span>→</span>
      </div>
    </Link>
  );
}
