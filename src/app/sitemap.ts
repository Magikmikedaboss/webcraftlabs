export const revalidate = 3600;
import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/site';
import { getAllPosts } from '@/lib/mdx/blog';
import { getAllNews } from '@/lib/mdx/news';
import { getAllArchivePosts } from '@/lib/mdx/archive';
import { ACTIVE_LEARNING_PATHS } from '@/lib/resources';

/**
 * Explicit, maintained lastModified date per static (non-content-driven)
 * route, keyed by path relative to the site root ("/" for the homepage).
 *
 * Each date is the commit date of that route's source file, verified
 * locally via `git log -1 --format=%aI -- <file>` at the time the entry
 * was added or last revised — never the current build/deploy time, never
 * a filesystem mtime, and never one shared fallback applied to every
 * route. Update an entry's date only when you intentionally revise that
 * route's real content. A route with no entry here simply omits
 * lastModified from its sitemap entry rather than inventing one.
 *
 * "/knowledge/paths" covers every /knowledge/paths/<path> route — they
 * all render from the same [path]/page.tsx template, so one verified
 * date honestly represents all of them.
 */
export const STATIC_ROUTE_LAST_MODIFIED: Record<string, string> = {
  '/': '2026-08-22',
  '/build': '2026-06-29',
  '/services': '2026-08-22',
  '/knowledge': '2026-08-23',
  '/knowledge/paths': '2026-08-23',
  '/las-vegas-web-design': '2026-08-22',
  '/portfolio': '2026-08-24',
  '/contact': '2026-08-22',
  '/blog': '2026-06-30',
  '/archive': '2026-08-23',
  '/archive/catalog': '2026-08-23',
  '/about': '2026-08-23',
  '/news': '2026-06-30',
  '/services/custom-website-development': '2026-08-22',
  '/services/landing-pages-funnels': '2026-08-22',
  '/services/saas-platform-development': '2026-08-23',
  '/services/ai-automation': '2026-08-22',
  '/services/seo-technical-optimization': '2026-08-22',
  '/archive/timeline': '2026-08-23',
  '/archive/glossary': '2026-06-29',
  '/archive/collections': '2026-08-23',
  '/archive/institutions': '2026-08-23',
  '/archive/search': '2026-08-23',
};

function parseValidDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) ? parsed : undefined;
}

/** Looks up a static route's registered date. Returns undefined — never a fabricated fallback — if the route isn't registered. */
function staticLastModified(path: string): Date | undefined {
  return parseValidDate(STATIC_ROUTE_LAST_MODIFIED[path]);
}

/**
 * Picks the most recent valid date among the given candidates (e.g. a
 * frontmatter "updated" field alongside "date", once one exists) and
 * ignores invalid or missing ones. Returns undefined if none are valid —
 * callers should omit lastModified in that case rather than inventing one.
 */
function mostRecentValidDate(...candidates: Array<string | undefined>): Date | undefined {
  const valid = candidates.map(parseValidDate).filter((d): d is Date => d !== undefined);
  if (valid.length === 0) return undefined;
  return valid.reduce((latest, d) => (d > latest ? d : latest));
}

function staticEntry(
  baseUrl: string,
  path: string,
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>,
  priority: number,
  registryKey: string = path
): MetadataRoute.Sitemap[number] {
  const lastModified = staticLastModified(registryKey);
  return {
    url: path === '/' ? baseUrl : `${baseUrl}${path}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    staticEntry(baseUrl, '/', 'weekly', 1),
    staticEntry(baseUrl, '/build', 'monthly', 0.9),
    staticEntry(baseUrl, '/services', 'monthly', 0.8),
    staticEntry(baseUrl, '/knowledge', 'monthly', 0.75),
    ...ACTIVE_LEARNING_PATHS.map((path) =>
      staticEntry(baseUrl, `/knowledge/paths/${path}`, 'monthly', 0.7, '/knowledge/paths')
    ),
    staticEntry(baseUrl, '/las-vegas-web-design', 'monthly', 0.85),
    staticEntry(baseUrl, '/portfolio', 'monthly', 0.9),
    staticEntry(baseUrl, '/contact', 'monthly', 0.8),
    staticEntry(baseUrl, '/blog', 'weekly', 0.7),
    staticEntry(baseUrl, '/archive', 'weekly', 0.8),
    staticEntry(baseUrl, '/archive/catalog', 'weekly', 0.75),
    staticEntry(baseUrl, '/about', 'monthly', 0.7),
    staticEntry(baseUrl, '/news', 'weekly', 0.7),
    staticEntry(baseUrl, '/services/custom-website-development', 'monthly', 0.8),
    staticEntry(baseUrl, '/services/landing-pages-funnels', 'monthly', 0.78),
    staticEntry(baseUrl, '/services/saas-platform-development', 'monthly', 0.78),
    staticEntry(baseUrl, '/services/ai-automation', 'monthly', 0.8),
    staticEntry(baseUrl, '/services/seo-technical-optimization', 'monthly', 0.78),
    staticEntry(baseUrl, '/archive/timeline', 'weekly', 0.7),
    staticEntry(baseUrl, '/archive/glossary', 'monthly', 0.65),
    staticEntry(baseUrl, '/archive/collections', 'monthly', 0.7),
    staticEntry(baseUrl, '/archive/institutions', 'monthly', 0.65),
    staticEntry(baseUrl, '/archive/search', 'monthly', 0.6),
  ];

  const allPosts = getAllPosts();

  const blogRoutes: MetadataRoute.Sitemap = allPosts.map((post) => {
    const lastModified = mostRecentValidDate(post.frontmatter.date);
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: 'monthly',
      priority: 0.65,
    };
  });

  // Archive documents (both the institutional Archive Universe and the
  // Synthetic Minds episodes) now live in their own collection/loader,
  // physically separate from Blog — see src/lib/mdx/archive.ts.
  const archiveRoutes: MetadataRoute.Sitemap = getAllArchivePosts().map((post) => {
    const lastModified = mostRecentValidDate(post.frontmatter.date);
    return {
      url: `${baseUrl}/archive/${post.slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  const newsRoutes: MetadataRoute.Sitemap = getAllNews().map((post) => {
    const lastModified = mostRecentValidDate(post.frontmatter.date);
    return {
      url: `${baseUrl}/news/${post.slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: 'monthly',
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...blogRoutes, ...archiveRoutes, ...newsRoutes];
}
