import type { MetadataRoute } from 'next';

const origin = 'https://comicready.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/thgizcblljqbah/', '/check/', '/results/', '/design/', '/development-guidelines'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/thgizcblljqbah/', '/check/', '/results/', '/design/', '/development-guidelines'],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
