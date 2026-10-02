import type { MetadataRoute } from 'next';

const origin = 'https://comicready.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/thgizcblljqbah/', '/check/', '/results/', '/design/'],
    },
    sitemap: `${origin}/sitemap.xml`,
  };
}
