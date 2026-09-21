import type { MetadataRoute } from 'next';
import { profile, projects } from '@/data/profile';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    ...projects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
}
