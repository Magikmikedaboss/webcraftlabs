export const revalidate = 3600;
import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/site';
import { getAllPosts } from '@/lib/mdx/blog';
import { getAllNews } from '@/lib/mdx/news';
import { getAllArchivePosts } from '@/lib/mdx/archive';
import { ACTIVE_LEARNING_PATHS } from '@/lib/resources';

/**
 * Explicit, maintained lastModified date per static route, keyed by path
 * relative to the site root ("/" for the homepage).
 *
 * Each date is the commit date of the file(s) that actually own that
 * route's rendered content — not necessarily just page.tsx; check any
 * client component it delegates to as well (e.g. /build's real content
 * lives in BuildCalculatorClient.tsx, not its thin page.tsx wrapper) —
 * verified locally via `git log -1 --format=%aI -- <file>` at the time
 * the entry was added or last revised. Never the current build/deploy
 * time, never a filesystem mtime, and never one shared fallback applied
 * to every route. A route with no entry here simply omits lastModified
 * from its sitemap entry rather than inventing one.
 *
 * "/knowledge/paths" covers every /knowledge/paths/<path> route — they
 * all render from the same [path]/page.tsx template, so one verified
 * date honestly represents all of them.
 *
 * For routes whose real content is a dynamic listing (/blog, /news,
 * /archive, /archive/catalog), this registry date is only a floor — see
 * `newestContentDate` in sitemap()'s staticEntry() calls, which combines
 * it with the newest date among the content actually listed, so
 * publishing new content updates the entry even when the template file
 * hasn't changed.
 */
export const STATIC_ROUTE_LAST_MODIFIED: Record<string, string> = {
  '/': '2026-08-22',
  '/build': '2026-08-22',
  '/services': '2026-08-22',
  '/knowledge': '2026-08-23',
  '/knowledge/developer-stacks': '2026-09-01',
  '/knowledge/paths': '2026-08-23',
  '/las-vegas-web-design': '2026-08-22',
  '/portfolio': '2026-08-24',
  '/contact': '2026-08-22',
  '/blog': '2026-06-30',
  '/archive': '2026-08-23',
  '/archive/catalog': '2026-08-23',
  '/about': '2026-08-23',
  '/disclosure': '2026-08-31',
  '/privacy': '2026-08-31',
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

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Parses a date string and rejects it if invalid. For a date-only
 * (YYYY-MM-DD) input, also rejects it if the resulting UTC calendar date
 * doesn't match what was typed — `new Date("2026-02-30")` doesn't throw,
 * it silently normalizes to March 2, which Number.isFinite(...) alone
 * can't catch.
 */
export function parseValidDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime())) return undefined;

  const dateOnly = DATE_ONLY_PATTERN.exec(value);
  if (dateOnly) {
    const [, year, month, day] = dateOnly;
    const matchesTyped =
      parsed.getUTCFullYear() === Number(year) &&
      parsed.getUTCMonth() + 1 === Number(month) &&
      parsed.getUTCDate() === Number(day);
    if (!matchesTyped) return undefined;
  }

  return parsed;
}

/** Later of two already-parsed dates, treating a missing side as "no opinion" rather than disqualifying. */
function laterOf(a: Date | undefined, b: Date | undefined): Date | undefined {
  if (!a) return b;
  if (!b) return a;
  return a > b ? a : b;
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
  options?: {
    /** Defaults to `path` — override when several routes share one template (e.g. /knowledge/paths/*). */
    registryKey?: string;
    /**
     * For routes whose real content is a dynamic listing (e.g. /blog
     * rendering getAllPosts()): the newest date among that content, so
     * publishing new content updates this entry even when the page's own
     * template file hasn't changed. Combined with the registry date via
     * "whichever is later" — never replaces it outright.
     */
    newestContentDate?: Date;
  }
): MetadataRoute.Sitemap[number] {
  const registryDate = staticLastModified(options?.registryKey ?? path);
  const lastModified = laterOf(registryDate, options?.newestContentDate);
  return {
    url: path === '/' ? baseUrl : `${baseUrl}${path}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  // Computed up front so the index pages below (/blog, /news, /archive,
  // /archive/catalog) can reflect the newest post they actually list —
  // their real content changes on every publish, not just when their
  // template file is edited.
  const allPosts = getAllPosts();
  const allArchivePosts = getAllArchivePosts();
  const allNews = getAllNews();
  const newestPostDate = mostRecentValidDate(...allPosts.map((p) => p.frontmatter.date));
  const newestArchiveDate = mostRecentValidDate(...allArchivePosts.map((p) => p.frontmatter.date));
  const newestNewsDate = mostRecentValidDate(...allNews.map((p) => p.frontmatter.date));

  const staticRoutes: MetadataRoute.Sitemap = [
    staticEntry(baseUrl, '/', 'weekly', 1),
    staticEntry(baseUrl, '/build', 'monthly', 0.9),
    staticEntry(baseUrl, '/services', 'monthly', 0.8),
    staticEntry(baseUrl, '/knowledge', 'monthly', 0.75),
    // The Developer Stack Library's canonical hub. There is deliberately no
    // /knowledge/paths/developer-stacks entry — see RESOURCE_GOALS.
    staticEntry(baseUrl, '/knowledge/developer-stacks', 'monthly', 0.7),
    ...ACTIVE_LEARNING_PATHS.map((path) =>
      staticEntry(baseUrl, `/knowledge/paths/${path}`, 'monthly', 0.7, { registryKey: '/knowledge/paths' })
    ),
    staticEntry(baseUrl, '/las-vegas-web-design', 'monthly', 0.85),
    staticEntry(baseUrl, '/portfolio', 'monthly', 0.9),
    staticEntry(baseUrl, '/contact', 'monthly', 0.8),
    staticEntry(baseUrl, '/blog', 'weekly', 0.7, { newestContentDate: newestPostDate }),
    staticEntry(baseUrl, '/archive', 'weekly', 0.8, { newestContentDate: newestArchiveDate }),
    staticEntry(baseUrl, '/archive/catalog', 'weekly', 0.75, { newestContentDate: newestArchiveDate }),
    staticEntry(baseUrl, '/about', 'monthly', 0.7),
    // Low priority and rarely revised, but both must be indexable: a
    // policy page search engines can't reach isn't one.
    staticEntry(baseUrl, '/privacy', 'yearly', 0.3),
    staticEntry(baseUrl, '/disclosure', 'yearly', 0.3),
    staticEntry(baseUrl, '/news', 'weekly', 0.7, { newestContentDate: newestNewsDate }),
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
  const archiveRoutes: MetadataRoute.Sitemap = allArchivePosts.map((post) => {
    const lastModified = mostRecentValidDate(post.frontmatter.date);
    return {
      url: `${baseUrl}/archive/${post.slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  const newsRoutes: MetadataRoute.Sitemap = allNews.map((post) => {
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
