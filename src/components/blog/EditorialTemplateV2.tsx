import Image from "next/image";
import Link from "next/link";
import ShareBarClient from "../ShareBarClient";
import { BLUR_DATA_URL as BLUR } from "./constants";

interface PostProps {
  title: string;
  displayTitle?: string;
  description?: string;
  summary?: string;
  deck?: string;
  published?: string;
  date?: string;
  author?: string;
  image?: string;
  badge?: string;
  topic?: string;
  tags?: string[];
  pullQuote?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaButton?: string;
}

interface RelatedPost {
  id?: string;
  slug: string;
  image?: string;
  title: string;
  badge?: string;
  tags?: string[];
  summary?: string;
}

function CoverImage({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;
  return (
    <div className="relative mt-16 aspect-[16/9] overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-100 shadow-2xl">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        placeholder="blur"
        blurDataURL={BLUR}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
    </div>
  );
}

function ReadNext({ related }: { related?: RelatedPost[] }) {
  if (!related?.length) return null;
  return (
    <section className="mx-auto mt-24 max-w-6xl border-t border-slate-200 pt-12">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-700">
        Continue Reading
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {related.map((p) => (
          <Link
            key={p.id || p.slug}
            href={`/blog/${p.slug}${p.id ? `?id=${encodeURIComponent(p.id)}` : ""}`}
            className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            {p.image && (
              <Image
                src={p.image}
                alt={p.title}
                width={700}
                height={420}
                className="aspect-video w-full object-cover"
              />
            )}
            <div className="p-6">
              <p className="text-xs font-black uppercase tracking-wide text-indigo-700">
                {p.badge || p.tags?.[0] || "Read Next"}
              </p>
              <h3 className="mt-3 text-xl font-black leading-tight tracking-tight text-slate-950">
                {p.title}
              </h3>
              {p.summary && (
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                  {p.summary}
                </p>
              )}
              <p className="mt-5 text-xs font-black uppercase tracking-wide text-indigo-700">
                Read Article →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Chapter({
  number = 1,
  title,
  eyebrow,
  children,
}: {
  number?: number;
  title: string;
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto my-24 max-w-3xl">
      <div className="relative border-t border-slate-200 pt-14">
        <div className="pointer-events-none absolute -top-5 right-0 text-8xl font-black leading-none tracking-tighter text-slate-200/70 sm:text-9xl">
          {String(number).padStart(2, "0")}
        </div>
        {eyebrow && (
          <p className="relative text-xs font-black uppercase tracking-[0.28em] text-indigo-700">
            {eyebrow}
          </p>
        )}
        <h2 className="relative mt-5 max-w-2xl text-4xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-6xl">
          {title}
        </h2>
      </div>
      <div className="prose prose-slate mt-10 max-w-none prose-lg prose-headings:font-black prose-headings:tracking-tight prose-p:leading-8 prose-a:text-indigo-700 prose-strong:text-slate-950">
        {children}
      </div>
    </section>
  );
}

export function BigQuote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="mx-auto my-24 max-w-5xl px-4 text-center">
      <div className="text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-7xl">
        &ldquo;{children}&rdquo;
      </div>
      <div className="mx-auto mt-10 h-1 w-24 rounded-full bg-indigo-600" />
    </aside>
  );
}

export function Insight({
  title = "Insight",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="mx-auto my-16 max-w-3xl rounded-[2rem] border border-indigo-200 bg-indigo-50 p-7 shadow-sm sm:p-9">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-indigo-800">{title}</p>
      <div className="mt-4 text-xl leading-8 text-slate-700">{children}</div>
    </aside>
  );
}

export function StatBlock({
  value,
  label,
  children,
}: {
  value: string | number;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <aside className="mx-auto my-20 max-w-4xl rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl sm:p-12">
      <p className="text-7xl font-black tracking-tighter sm:text-9xl">{value}</p>
      <p className="mt-4 text-sm font-black uppercase tracking-[0.24em] text-indigo-200">{label}</p>
      {children && (
        <div className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{children}</div>
      )}
    </aside>
  );
}

export function SplitCompare({
  leftTitle,
  rightTitle,
  left = [],
  right = [],
}: {
  leftTitle: string;
  rightTitle: string;
  left?: string[];
  right?: string[];
}) {
  return (
    <section className="mx-auto my-20 grid max-w-5xl gap-6 sm:grid-cols-2">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">{leftTitle}</p>
        <ul className="mt-6 space-y-4">
          {left.map((item, i) => (
            <li key={i} className="text-lg leading-7 text-slate-700">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-7 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-indigo-800">{rightTitle}</p>
        <ul className="mt-6 space-y-4">
          {right.map((item, i) => (
            <li key={i} className="text-lg leading-7 text-slate-700">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PostTimeline({
  items = [],
}: {
  items?: { year?: string; label?: string; title: string; body?: string }[];
}) {
  if (!items.length) return null;
  return (
    <section className="mx-auto my-20 max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-indigo-700">Timeline</p>
      <div className="mt-8 space-y-7">
        {items.map((item, i) => (
          <div key={i} className="border-l-2 border-indigo-200 pl-6">
            <p className="text-sm font-black uppercase tracking-wide text-indigo-700">
              {item.year || item.label}
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{item.title}</h3>
            {item.body && (
              <p className="mt-2 text-base leading-7 text-slate-600">{item.body}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function EditorialTemplateV2({
  post,
  readMins,
  pageUrl,
  cover,
  coverAbs,
  related,
  children,
}: {
  post: PostProps;
  readMins?: number;
  pageUrl?: string;
  cover?: string;
  coverAbs?: string;
  related?: RelatedPost[];
  children: React.ReactNode;
}) {
  return (
    <main
      className="min-h-screen bg-[#fafaf7] px-4 py-6 text-slate-950 sm:px-6 lg:px-8"
      aria-labelledby="post-title"
    >
      <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between text-sm">
        <Link
          href="/blog"
          className="font-semibold text-slate-600 transition hover:text-indigo-700"
        >
          ← Back to Blog
        </Link>
        {readMins && <span className="text-slate-500">{readMins} min read</span>}
      </div>
      <article className="mx-auto overflow-hidden rounded-[3rem] border border-slate-200 bg-[#fbfaf5] shadow-2xl">
        <header className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
          <span className="inline-flex rounded-full bg-slate-950 px-5 py-2 text-xs font-black uppercase tracking-[0.24em] text-white">
            {post.badge || post.topic || "Editorial"}
          </span>
          <h1
            id="post-title"
            className="mt-10 max-w-6xl text-6xl font-black leading-[0.84] tracking-tighter text-slate-950 sm:text-8xl lg:text-[9rem]"
          >
            {post.displayTitle || post.title}
          </h1>
          {(post.deck || post.summary || post.description) && (
            <p className="mt-12 max-w-3xl text-2xl leading-10 text-slate-600 sm:text-3xl sm:leading-[1.35]">
              {post.deck || post.summary || post.description}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-3 text-sm text-slate-500">
            <span>By {post.author || "WebCraft Labs"}</span>
            {post.published || post.date ? (
              <>
                <span>·</span>
                <time
                  dateTime={post.published || post.date}
                  suppressHydrationWarning
                >
                  {new Date(post.published || post.date!).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
              </>
            ) : null}
          </div>
          <CoverImage src={cover || post.image} alt={post.title} />
        </header>
        <div className="border-t border-slate-200 px-6 py-12 sm:px-10 lg:px-16">
          {pageUrl && (
            <div className="mx-auto max-w-3xl">
              <ShareBarClient
                title={post.title}
                url={pageUrl}
                description={post.summary || post.description || ""}
                cover={coverAbs}
              />
            </div>
          )}
          {post.pullQuote && <BigQuote>{post.pullQuote}</BigQuote>}
          <div className="mx-auto mt-16 max-w-3xl prose prose-slate prose-xl prose-headings:font-black prose-headings:tracking-tight prose-p:leading-9 prose-a:text-indigo-700 prose-strong:text-slate-950">
            {children}
          </div>
          <section className="mx-auto mt-28 max-w-6xl rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl sm:p-12">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-200">
              {post.ctaEyebrow || "Build Something Better"}
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl">
              {post.ctaTitle || "Ideas deserve a better home than a generic blog."}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {post.ctaText ||
                "WebCraft Labs builds fast, polished websites for businesses and creators who want their ideas to feel premium from the first scroll."}
            </p>
            <Link
              href={post.ctaHref || "/contact"}
              className="mt-9 inline-flex rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-slate-950 transition hover:bg-indigo-100"
            >
              {post.ctaButton || "Start a Project"}
            </Link>
          </section>
          <ReadNext related={related} />
        </div>
      </article>
    </main>
  );
}
