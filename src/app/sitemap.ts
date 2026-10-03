import type { MetadataRoute } from 'next';
import { getOpportunities } from '@/lib/opportunities';

const origin = 'https://comicready.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publicPages: MetadataRoute.Sitemap = [
    { url: origin, changeFrequency: 'weekly', priority: 1 },
    { url: `${origin}/opportunities`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${origin}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${origin}/contact`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${origin}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${origin}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const opportunityPages: MetadataRoute.Sitemap = (await getOpportunities())
    .filter((opportunity) => opportunity.published && !opportunity.fixture)
    .map((opportunity) => ({
      url: `${origin}/opportunities/${opportunity.slug}`,
      lastModified: opportunity.last_verified_at ?? undefined,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  return [...publicPages, ...opportunityPages];
}
