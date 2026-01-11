import { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use stable timestamp to avoid sitemap churn on every build
  const lastModified = new Date(process.env.VERCEL_GIT_COMMIT_SHA 
    ? process.env.VERCEL_DEPLOYMENT_TIME || Date.now() 
    : '2026-01-11T00:00:00.000Z');
  
  // Normalize base URL (remove trailing slash)
  const baseUrl = SITE.url.replace(/\/$/, '');
  
  return [
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
}
