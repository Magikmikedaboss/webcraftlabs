import Image from "next/image";
import Link from "next/link";
import BlogGridClient from "./BlogGridClient";
import { getAllPosts } from "@/lib/mdx/blog";
import SiteShell from "@/components/SiteShell";
import { SITE, getBaseUrl } from "@/lib/site";

const siteBase = getBaseUrl();
const blogUrl = `${siteBase}/blog`;

export const metadata = {
  title: "Blog",
  description:
    "Cutting-edge insights on web development, AI, emerging technologies, and the future of software.",
  alternates: {
    canonical: blogUrl,
  },
  openGraph: {
    title: "Blog",
    description:
      "Cutting-edge insights on web development, AI, emerging technologies, and the future of software.",
    url: blogUrl,
    type: "website",
    images: [{ url: `${siteBase}/images/web-development-wide-angle-view-of-a-modern-skyscraper-with-reflective-glass.jpg`, width: 1200, height: 630, alt: "Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description:
      "Cutting-edge insights on web development, AI, emerging technologies, and the future of software.",
    images: [`${siteBase}/images/web-development-wide-angle-view-of-a-modern-skyscraper-with-reflective-glass.jpg`],
  },};


export default function BlogIndexPage() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    date: p.frontmatter.date,
    tags: p.frontmatter.tags || [],
    href: `/blog/${p.slug}`,
    kind: "blog" as const,
  }));

  const postsWithoutIntro = posts;

  return (
    <SiteShell background="surface">
      <div className="relative min-h-screen w-full overflow-hidden bg-[var(--surface)]">
        <div className="relative mx-auto max-w-6xl px-6 py-12 z-10">

        {/* =========================
            HERO (UPGRADED)
        ========================= */}
        <header className="relative mb-16 overflow-hidden rounded-3xl p-10 md:p-14 shadow-xl bg-[var(--page-bg,theme(colors.slate.950))] dark:bg-[var(--page-bg-dark,#0a0f1c)]">

          {/* Gradient + glow removed to lighten header visual */}

          {/* Content */}
          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white border border-white/20">
              Developer Blog
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              {SITE.name}              <span className="block mt-3 bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                Tech & Development Blog
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-blue-100">
              Exploring the future of technology, creativity, and digital culture—insights for everyone curious about what&apos;s next.
            </p>

          </div>
        </header>



        {/* =========================
            BLOG GRID
        ========================= */}
        {/* BlogGridClient is a Client Component and will handle client-only logic. */}
        <BlogGridClient posts={postsWithoutIntro} kind="blog" />

        {/* =========================
            CTA (UPGRADED)
        ========================= */}
        <div className="mt-24 relative overflow-hidden rounded-3xl p-10 md:p-14 text-center bg-[var(--surface)] shadow-xl">

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Need a High-Performance Website?
            </h2>

            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              We build fast, scalable, AI-powered web experiences that convert.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition shadow-lg"
              >
                Explore Services
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                Let’s Talk
              </Link>            </div>
          </div>
        </div>

      </div>
    </div>
    </SiteShell>
  );
}
