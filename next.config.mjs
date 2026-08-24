import withMDX from '@next/mdx';

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = withMDXConfig({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/news/enterprise-ai-agents-are-replacing-traditional-workflows',
        destination: '/news/enterprise-ai-human-bottleneck',
        permanent: true,
      },
      {
        source: '/news/human-bottleneck-enterprise-ai',
        destination: '/news/enterprise-ai-human-bottleneck',
        permanent: true,
      },
      // Phase 2: the four thin Las Vegas service stub pages were merged
      // into deep-linked sections on /las-vegas-web-design.
      {
        source: '/services/las-vegas-custom-website-development',
        destination: '/las-vegas-web-design#custom-website-development',
        permanent: true,
      },
      {
        source: '/services/las-vegas-landing-pages-funnels',
        destination: '/las-vegas-web-design#landing-pages-funnels',
        permanent: true,
      },
      {
        source: '/services/las-vegas-saas-platform-development',
        destination: '/las-vegas-web-design#saas-platform-development',
        permanent: true,
      },
      {
        source: '/services/las-vegas-seo-technical-optimization',
        destination: '/las-vegas-web-design#seo-technical-optimization',
        permanent: true,
      },
      // Phase 3.5: Synthetic Minds episodes moved from the Blog collection
      // into the Archive (src/content/archive), each with a canonical
      // /archive/episode-* URL.
      //
      // The 7 institutional Archive documents already resolved at /archive/*
      // via a route-level redirect in /blog/[slug] before this move — but
      // their old /blog/<slug> URLs were real, previously-redirecting URLs
      // too. Removing that route-level redirect without adding these means
      // any existing link/bookmark/index entry at /blog/<slug> now 404s
      // instead of reaching /archive/<slug>.
      {
        source: '/blog/welcome-to-the-archive',
        destination: '/archive/welcome-to-the-archive',
        permanent: true,
      },
      {
        source: '/blog/the-silent-vault',
        destination: '/archive/the-silent-vault',
        permanent: true,
      },
      {
        source: '/blog/treatise-1-on-the-preservation-of-knowledge',
        destination: '/archive/treatise-1-on-the-preservation-of-knowledge',
        permanent: true,
      },
      {
        source: '/blog/the-duplicate-manuscript',
        destination: '/archive/the-duplicate-manuscript',
        permanent: true,
      },
      {
        source: '/blog/treatise-2-on-the-nature-of-evidence',
        destination: '/archive/treatise-2-on-the-nature-of-evidence',
        permanent: true,
      },
      {
        source: '/blog/the-last-simulation',
        destination: '/archive/the-last-simulation',
        permanent: true,
      },
      {
        source: '/blog/the-last-radio-signal',
        destination: '/archive/the-last-radio-signal',
        permanent: true,
      },
      {
        source: '/blog/episode-1-first-spark',
        destination: '/archive/episode-1-first-spark',
        permanent: true,
      },
      {
        source: '/blog/episode-2-alien-ideas',
        destination: '/archive/episode-2-alien-ideas',
        permanent: true,
      },
      {
        source: '/blog/episode-3-thinking-with-something-else',
        destination: '/archive/episode-3-thinking-with-something-else',
        permanent: true,
      },
      {
        source: '/blog/episode-4-the-unexpected',
        destination: '/archive/episode-4-the-unexpected',
        permanent: true,
      },
      {
        source: '/blog/episode-5-human-bottleneck',
        destination: '/archive/episode-5-human-bottleneck',
        permanent: true,
      },
      {
        source: '/blog/episode-6-the-new-creators',
        destination: '/archive/episode-6-the-new-creators',
        permanent: true,
      },
      // The thin duplicate stub is retired; send readers to the real hub.
      {
        source: '/blog/what-is-synthetic-minds',
        destination: '/blog/synthetic-minds-series',
        permanent: true,
      },
      // Legacy nested /blog/synthetic-minds/* routes. These were previously
      // handled by statically-prerendered page components calling
      // permanentRedirect() — which Next.js serves as 200 + <meta
      // http-equiv="refresh"> for a static page, not a true HTTP redirect.
      // Moved here so every legacy URL gets a real edge-level 308, with no
      // app route left to serve them at all.
      {
        source: '/blog/synthetic-minds',
        destination: '/blog/synthetic-minds-series',
        permanent: true,
      },
      {
        source: '/blog/synthetic-minds/episode-1-first-spark',
        destination: '/archive/episode-1-first-spark',
        permanent: true,
      },
      {
        source: '/blog/synthetic-minds/episode-2-alien-ideas',
        destination: '/archive/episode-2-alien-ideas',
        permanent: true,
      },
      {
        source: '/blog/synthetic-minds/episode-3-thinking-with-something-else',
        destination: '/archive/episode-3-thinking-with-something-else',
        permanent: true,
      },
      {
        source: '/blog/synthetic-minds/episode-4-the-unexpected',
        destination: '/archive/episode-4-the-unexpected',
        permanent: true,
      },
      {
        source: '/blog/synthetic-minds/episode-5-human-bottleneck',
        destination: '/archive/episode-5-human-bottleneck',
        permanent: true,
      },
      {
        source: '/blog/synthetic-minds/episode-6-the-new-creators',
        destination: '/archive/episode-6-the-new-creators',
        permanent: true,
      },
      {
        source: '/blog/synthetic-minds/what-is-synthetic-minds',
        destination: '/blog/synthetic-minds-series',
        permanent: true,
      },
      {
        source: '/blog/synthetic-minds/synthetic-minds-series',
        destination: '/blog/synthetic-minds-series',
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizeCss: true, // Enable CSS optimization to reduce render-blocking
    optimizePackageImports: ['react-icons'], // Tree-shake icon imports
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // 7 days, not 30: these images are served from stable public paths, not
    // filenames hashed by content, so a replaced file at the same path would
    // stay stale in caches for however long this TTL is. If you replace a
    // public image, give it a new filename instead of overwriting the old
    // one, so callers naturally pick up a new optimized URL.
    minimumCacheTTL: 604800,
  },
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
});

export default nextConfig;
