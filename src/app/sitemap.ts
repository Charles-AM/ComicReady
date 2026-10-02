import type { MetadataRoute } from 'next';
import { reviewedCatalog } from '@/lib/catalog';

const origin = 'https://comicready.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages: MetadataRoute.Sitemap = [
    { url: origin, changeFrequency: 'weekly', priority: 1 },
    { url: `${origin}/opportunities`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${origin}/contact`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${origin}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${origin}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const opportunityPages: MetadataRoute.Sitemap = reviewedCatalog
    .filter((opportunity) => opportunity.published)
    .map((opportunity) => ({
      url: `${origin}/opportunities/${opportunity.slug}`,
      lastModified: opportunity.last_verified_at ?? undefined,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  return [...publicPages, ...opportunityPages];
}
