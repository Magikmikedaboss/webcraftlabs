import Link from "next/link";

export default function PrevNext({
  prev,
  next,
  kind,
}: {
  kind: "blog" | "news";
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}) {
  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/${kind}/${prev.slug}`}
          className="rounded-2xl border border-slate-200 bg-white/90 p-5 hover:shadow-md transition"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Previous
          </div>
          <div className="mt-2 font-extrabold text-slate-900">{prev.title}</div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/${kind}/${next.slug}`}
          className="rounded-2xl border border-slate-200 bg-white/90 p-5 hover:shadow-md transition"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Next
          </div>
          <div className="mt-2 font-extrabold text-slate-900">{next.title}</div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
