export const revalidate = 3600;
import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/site';
import { getAllPosts } from '@/lib/mdx/blog';
import { getAllNews } from '@/lib/mdx/news';

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
    {
      url: `${baseUrl}/las-vegas-web-design`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/las-vegas-custom-website-development`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.84,
    },
    {
      url: `${baseUrl}/services/las-vegas-landing-pages-funnels`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.83,
    },
    {
      url: `${baseUrl}/services/las-vegas-seo-technical-optimization`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.83,
    },
    {
      url: `${baseUrl}/services/las-vegas-saas-platform-development`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
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
      url: `${baseUrl}/news`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    const parsedDate = post.frontmatter.date ? new Date(post.frontmatter.date) : undefined;
    const isValidDate = parsedDate && Number.isFinite(parsedDate.getTime());

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      ...(isValidDate ? { lastModified: parsedDate } : {}),
      changeFrequency: 'monthly',
      priority: 0.65,
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

  return [...staticRoutes, ...blogRoutes, ...newsRoutes];
}
