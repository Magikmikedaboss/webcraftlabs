export const revalidate = 3600;
import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/site';
import { getAllPosts } from '@/lib/mdx/blog';
import { getAllNews } from '@/lib/mdx/news';
import { getAllArchivePosts } from '@/lib/mdx/archive';
import { ACTIVE_LEARNING_PATHS } from '@/lib/resources';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use stable timestamp to avoid sitemap churn on every build
  let lastModified: Date;
  async function fetchVercelDeploymentCreatedAt(sha: string): Promise<string> {
    // Example: fetch from Vercel API (requires token)
    // Replace with your actual API call and error handling
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(`https://api.vercel.com/v6/deployments?commit=${sha}`,
        {
          headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` },
          cache: 'force-cache',
          signal: controller.signal,
        }
      );
      clearTimeout(timeout);
      if (!res.ok) {
        throw new Error(`Failed to fetch deployments: ${res.status} - ${await res.text()}`);
      }
      const data = await res.json();
      if (data.deployments && data.deployments.length > 0) {
        return data.deployments[0].createdAt;
      }
      throw new Error('No deployments found');
    } catch (err) {
      clearTimeout(timeout);
      console.warn('Failed to fetch Vercel deployment timestamp:', err);
      throw err;
    }
  }
  if (process.env.VERCEL_GIT_COMMIT_SHA && process.env.VERCEL_TOKEN) {
    try {
      const ts = await fetchVercelDeploymentCreatedAt(process.env.VERCEL_GIT_COMMIT_SHA);
      lastModified = new Date(ts);
    } catch {
      lastModified = new Date('2026-01-11T00:00:00.000Z');
    }
  } else {
    lastModified = new Date('2026-01-11T00:00:00.000Z');
  }
  
  // Get normalized base URL (validated and trailing slash removed)
  const baseUrl = getBaseUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/build`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/knowledge`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    ...ACTIVE_LEARNING_PATHS.map((path) => ({
      url: `${baseUrl}/knowledge/paths/${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/las-vegas-web-design`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/archive/catalog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/custom-website-development`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/landing-pages-funnels`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.78,
    },
    {
      url: `${baseUrl}/services/saas-platform-development`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.78,
    },
    {
      url: `${baseUrl}/services/ai-automation`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/seo-technical-optimization`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.78,
    },
    {
      url: `${baseUrl}/archive/timeline`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/archive/glossary`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/archive/collections`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/archive/institutions`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/archive/search`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    
  ];

  const allPosts = getAllPosts();

  const blogRoutes: MetadataRoute.Sitemap = allPosts.map((post) => {
    const parsedDate = post.frontmatter.date ? new Date(post.frontmatter.date) : undefined;
    const isValidDate = parsedDate && Number.isFinite(parsedDate.getTime());

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      ...(isValidDate ? { lastModified: parsedDate } : {}),
      changeFrequency: 'monthly',
      priority: 0.65,
    };
  });

  // Archive documents (both the institutional Archive Universe and the
  // Synthetic Minds episodes) now live in their own collection/loader,
  // physically separate from Blog — see src/lib/mdx/archive.ts.
  const archiveRoutes: MetadataRoute.Sitemap = getAllArchivePosts().map((post) => {
    const parsedDate = post.frontmatter.date ? new Date(post.frontmatter.date) : undefined;
    const isValidDate = parsedDate && Number.isFinite(parsedDate.getTime());

    return {
      url: `${baseUrl}/archive/${post.slug}`,
      ...(isValidDate ? { lastModified: parsedDate } : {}),
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  const newsRoutes: MetadataRoute.Sitemap = getAllNews().map((post) => {
    const parsedDate = post.frontmatter.date ? new Date(post.frontmatter.date) : undefined;
    const isValidDate = parsedDate && Number.isFinite(parsedDate.getTime());

    return {
      url: `${baseUrl}/news/${post.slug}`,
      ...(isValidDate ? { lastModified: parsedDate } : {}),
      changeFrequency: 'monthly',
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...blogRoutes, ...archiveRoutes, ...newsRoutes];
}
