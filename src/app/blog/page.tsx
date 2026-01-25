import PostIndexClient from "@/components/content/PostIndexClient";
import { getAllPosts } from "@/lib/mdx/blog";
import SiteShell from "@/components/SiteShell";

export const metadata = {
  title: "Tech & Development Blog | WebCraft LabZ",
  description:
    "Cutting-edge insights on web development, AI, emerging technologies, and the future of software. From practical coding tutorials to industry trends - everything developers need to stay ahead.",
  keywords: "web development blog, AI technology, software development, tech news, programming tutorials, future of tech, developer insights, coding best practices",
  openGraph: {
    title: "Tech & Development Blog | WebCraft LabZ",
    description: "Cutting-edge insights on web development, AI, emerging technologies, and the future of software.",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    date: p.frontmatter.date,
    tags: p.frontmatter.tags || [],
    kind: "blog" as const,
  }));

  return (
    <SiteShell background="surface">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero Section with Brand Colors */}
        <header className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 md:p-12 shadow-xl">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white border border-white/30">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
              Developer Blog
            </div>
            
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              WebCraft LabZ
              <span className="block mt-2 bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Tech & Development Blog
              </span>
            </h1>
            
            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-blue-50">
              Cutting-edge insights on web development, AI, emerging technologies, and the future of software. From practical tutorials to industry trends — everything developers need to build the future.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-white/90">
                <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-semibold">Web Development</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-semibold">AI & Tech News</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-semibold">Future of Code</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        </header>

        {/* Stats Section */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-blue-700">{posts.length}</div>
            <div className="mt-1 text-sm font-semibold text-blue-600">Tech Articles</div>
            <div className="mt-2 text-xs text-gray-600">Deep dives into development & AI</div>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-cyan-700">∞</div>
            <div className="mt-1 text-sm font-semibold text-cyan-600">Topics</div>
            <div className="mt-2 text-xs text-gray-600">Web dev, AI, tech news & more</div>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-blue-700">100%</div>
            <div className="mt-1 text-sm font-semibold text-blue-600">Developer-Focused</div>
            <div className="mt-2 text-xs text-gray-600">Built by devs, for devs</div>
          </div>
        </div>

        {/* Blog Posts */}
        <PostIndexClient posts={posts} kind="blog" />

        {/* CTA Section */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Need a Powerful Web Solution?
          </h2>
          <p className="mt-4 text-lg text-blue-50 max-w-2xl mx-auto">
            From custom web apps to AI-powered solutions — we build cutting-edge software that scales with your vision.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/build"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Explore Our Services
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white bg-transparent px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              Let&apos;s Talk Tech
            </a>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
