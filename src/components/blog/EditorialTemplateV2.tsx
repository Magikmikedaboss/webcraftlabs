﻿import Image from "next/image";
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
    <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 shadow-xl sm:mt-12 sm:aspect-[16/10] sm:rounded-[2rem] lg:aspect-[16/9]">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        placeholder="blur"
        blurDataURL={BLUR}
        sizes="(max-width: 768px) 100vw, 1200px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
    </div>
  );
}

export function Chapter({
  number = 1,
  title,
  eyebrow,
  label,
  image,
  imageAlt,
  children,
}: {
  number?: number;
  title: string;
  eyebrow?: string;
  /** Replaces the "Chapter" prefix in the kicker. E.g. label="FILE" renders "FILE 01" */
  label?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  const kicker = label
    ? `${label} ${String(number).padStart(2, "0")}${eyebrow ? ` · ${eyebrow}` : ""}`
    : eyebrow ?? null;
  return (
    <section className="mx-auto my-16 max-w-3xl sm:my-20 lg:my-24">
      <div className="relative border-t border-slate-200 pt-10 sm:pt-14">
        <div className="mb-4 text-7xl font-black leading-none tracking-tighter text-slate-200/80 sm:absolute sm:-top-6 sm:right-0 sm:mb-0 sm:text-9xl">
          {String(number).padStart(2, "0")}
        </div>
        {kicker && (
          <p className="text-xs font-black uppercase tracking-[0.24em] text-indigo-700">
            {kicker}
          </p>
        )}
        <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      {image && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 shadow-sm sm:rounded-[2rem]">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}
      <div className="prose prose-slate mt-8 max-w-none prose-lg prose-headings:font-black prose-headings:tracking-tight prose-p:leading-8 prose-a:text-indigo-700 prose-strong:text-slate-950 sm:prose-xl sm:prose-p:leading-9">
        {children}
      </div>
    </section>
  );
}

export function BigQuote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose mx-auto my-16 max-w-5xl px-2 text-center sm:my-24 sm:px-4">
      <div className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
        &ldquo;{children}&rdquo;
      </div>
      <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-indigo-600 sm:mt-10 sm:w-24" />
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
    <aside className="mx-auto my-12 max-w-3xl rounded-[1.5rem] border border-indigo-200 bg-indigo-50 p-5 shadow-sm sm:my-16 sm:rounded-[2rem] sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-800">{title}</p>
      <div className="mt-4 text-lg leading-8 text-slate-700 sm:text-xl">{children}</div>
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
    <aside className="mx-auto my-14 max-w-4xl rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl sm:my-20 sm:rounded-[2.5rem] sm:p-10 lg:p-12">
      <p className="text-6xl font-black tracking-tighter sm:text-8xl lg:text-9xl">{value}</p>
      <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-indigo-200 sm:text-sm">{label}</p>
      {children && (
        <div className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          {children}
        </div>
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
    <section className="mx-auto my-14 grid max-w-5xl gap-5 sm:my-20 sm:grid-cols-2 sm:gap-6">
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-7">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">{leftTitle}</p>
        <ul className="mt-5 space-y-3">
          {left.map((item, i) => (
            <li key={i} className="text-base leading-7 text-slate-700 sm:text-lg">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[1.5rem] border border-indigo-200 bg-indigo-50 p-5 shadow-sm sm:rounded-[2rem] sm:p-7">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-800">{rightTitle}</p>
        <ul className="mt-5 space-y-3">
          {right.map((item, i) => (
            <li key={i} className="text-base leading-7 text-slate-700 sm:text-lg">
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
    <section className="not-prose mx-auto my-14 max-w-3xl rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:my-20 sm:rounded-[2rem] sm:p-7">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-indigo-700">Timeline</p>
      <div className="mt-7 space-y-6">
        {items.map((item, i) => (
          <div key={i} className="border-l-2 border-indigo-200 pl-5 sm:pl-6">
            <p className="text-xs font-black uppercase tracking-wide text-indigo-700 sm:text-sm">
              {item.year || item.label}
            </p>
            <h3 className="mt-2 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{item.title}</h3>
            {item.body && (
              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">{item.body}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ReadNext({ related }: { related?: RelatedPost[] }) {
  if (!related?.length) return null;
  return (
    <section className="mx-auto mt-20 max-w-6xl border-t border-slate-200 pt-10 sm:mt-24 sm:pt-12">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-700">
        Continue Reading
      </p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((p) => (
          <Link
            key={p.id || p.slug}
            href={`/blog/${p.slug}${p.id ? `?id=${encodeURIComponent(p.id)}` : ""}`}
            className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:rounded-[2rem]"
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
            <div className="p-5 sm:p-6">
              <p className="text-xs font-black uppercase tracking-wide text-indigo-700">
                {p.badge || p.tags?.[0] || "Read Next"}
              </p>
              <h3 className="mt-3 text-lg font-black leading-tight tracking-tight text-slate-950 sm:text-xl">
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

export default function EditorialTemplateV2({
  post,
  readMins,
  pageUrl,
  cover,
  coverAbs: _coverAbs,
  related,
  backHref = "/blog",
  backLabel = "← Back to Blog",
  children,
}: {
  post: PostProps;
  readMins?: number;
  pageUrl?: string;
  cover?: string;
  coverAbs?: string;
  related?: RelatedPost[];
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
}) {
  const date = post.published || post.date;

  return (
    <div
      className="editorial min-h-screen bg-[#fafaf7] px-3 py-4 text-slate-950 sm:px-6 sm:py-6 lg:px-8"
      aria-labelledby="post-title"
    >
      <div className="mx-auto mb-4 flex max-w-7xl items-center justify-between px-1 text-xs sm:mb-6 sm:text-sm">
        <Link
          href={backHref}
          className="font-semibold text-slate-600 transition hover:text-indigo-700"
        >
          {backLabel}
        </Link>
        {readMins && <span className="text-slate-500">{readMins} min read</span>}
      </div>
      <article className="mx-auto overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[#fbfaf5] shadow-xl sm:rounded-[2.5rem] lg:rounded-[3rem] lg:shadow-2xl">
        <header className="mx-auto max-w-7xl px-5 py-10 sm:px-10 sm:py-16 lg:px-16 lg:py-24">
          <span className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white sm:px-5 sm:text-xs">
            {post.badge || post.topic || "Editorial"}
          </span>
          <h1
            id="post-title"
            className="mt-8 max-w-6xl text-5xl font-black leading-[0.88] tracking-tighter text-slate-950 sm:mt-10 sm:text-7xl lg:text-[8rem] xl:text-[9rem]"
          >
            {post.displayTitle || post.title}
          </h1>
          {(post.deck || post.summary || post.description) && (
            <p className="mt-7 max-w-3xl text-xl leading-8 text-slate-600 sm:mt-10 sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[1.35]">
              {post.deck || post.summary || post.description}
            </p>
          )}
          <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-500 sm:mt-9">
            <span>By {post.author || "WebCraft Labz"}</span>
            {date && (
              <>
                <span>·</span>
                <time dateTime={date} suppressHydrationWarning>
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
              </>
            )}
          </div>
          <CoverImage src={cover || post.image} alt={post.title} />
        </header>
        <div className="border-t border-slate-200 px-5 py-8 sm:px-10 sm:py-12 lg:px-16">
          {pageUrl && (
            <div className="mx-auto max-w-3xl">
              <ShareBarClient title={post.title} url={pageUrl} />
            </div>
          )}
          {post.pullQuote && <BigQuote>{post.pullQuote}</BigQuote>}
          <div className="mx-auto mt-12 max-w-3xl prose prose-slate prose-lg prose-headings:font-black prose-headings:tracking-tight prose-p:leading-8 prose-a:text-indigo-700 prose-strong:text-slate-950 sm:mt-16 sm:prose-xl sm:prose-p:leading-9">
            {children}
          </div>
          <section className="mx-auto mt-20 max-w-6xl rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl sm:mt-28 sm:rounded-[2.5rem] sm:p-10 lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-indigo-200">
              {post.ctaEyebrow || "Build Something Better"}
            </p>
            <h2 className="mt-5 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {post.ctaTitle || "Ideas deserve a better home than a generic blog."}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              {post.ctaText ||
                "WebCraft Labz builds fast, polished websites for businesses and creators who want their ideas to feel premium from the first scroll."}
            </p>
            <Link
              href={post.ctaHref || "/contact"}
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-wide text-slate-950 transition hover:bg-indigo-100 sm:px-7 sm:py-4 sm:text-sm"
            >
              {post.ctaButton || "Start a Project"}
            </Link>
          </section>
          <ReadNext related={related} />
        </div>
      </article>
    </div>
  );
}
