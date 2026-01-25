
import PostIndexClient from "@/components/content/PostIndexClient";
import { getAllNews } from "@/lib/mdx/news";
import SiteShell from "@/components/SiteShell";
import { SITE } from "@/lib/site";

export const metadata = {
  title: `Company News & Updates | ${SITE.name}`,
  description: `Latest product launches, feature updates, client success stories, and company announcements from ${SITE.name}. Stay updated on our journey building the future of web development.`,
  keywords: `${SITE.name} news, product launches, company updates, tech announcements, client success stories, web development updates`,
  openGraph: {
    title: `Company News & Updates | ${SITE.name}`,
    description: `Latest product launches, feature updates, and company announcements from ${SITE.name}.`,
    type: "website",
  },
};


export default async function NewsIndexPage() {
  const posts = (await getAllNews()).map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    date: p.frontmatter.date,
    tags: p.frontmatter.tags || [],
    kind: "news" as const,
  }));

  return (
    <SiteShell background="surface">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero Section with Brand Colors */}
        <header className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-700 to-blue-600 p-8 md:p-12 shadow-xl">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white border border-white/30">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"/>
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/>
              </svg>
              Company News
            </div>
            
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              {SITE.name}
              <span className="block mt-2 bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Newsroom
              </span>
            </h1>
            
            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-blue-50">
              Product launches, feature updates, client success stories, and company announcements. Follow our journey as we build cutting-edge web solutions and push the boundaries of what&apos;s possible.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-white/90">
                <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-semibold">Product Launches</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-semibold">Client Wins</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-semibold">Company Updates</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
        </header>

        {/* Stats Section */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-cyan-700">{posts.length}</div>
            <div className="mt-1 text-sm font-semibold text-cyan-600">Announcements</div>
            <div className="mt-2 text-xs text-gray-600">Latest updates & launches</div>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-blue-700">Live</div>
            <div className="mt-1 text-sm font-semibold text-blue-600">Real-Time</div>
            <div className="mt-2 text-xs text-gray-600">Fresh news as it happens</div>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-cyan-700">{new Date().getFullYear()}</div>
            <div className="mt-1 text-sm font-semibold text-cyan-600">Building Forward</div>
            <div className="mt-2 text-xs text-gray-600">Innovation never stops</div>
          </div>
        </div>

        {/* News Posts */}
        <PostIndexClient posts={posts} kind="news" />

        {/* CTA Section */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-600 p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Want to Be Featured?
          </h2>
          <p className="mt-4 text-lg text-blue-50 max-w-2xl mx-auto">
            We love sharing client success stories and project showcases. Let&apos;s build something worth announcing together.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-cyan-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Start Your Project
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white bg-transparent px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              View Our Work
            </a>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
