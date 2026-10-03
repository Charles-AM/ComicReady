import type { Metadata } from 'next';
import Link from 'next/link';
import '@fontsource/bebas-neue/400.css';
import '@fontsource/source-sans-3/300.css';
import '@fontsource/source-sans-3/400.css';
import '@fontsource/source-sans-3/500.css';
import '@fontsource/source-sans-3/700.css';
import '@fontsource/source-serif-4/400.css';
import '@fontsource/source-serif-4/500.css';
import { BrandMark } from '@/components/brand-mark';
import { MotionProvider } from '@/components/motion-provider';
import { SiteNav } from '@/components/site-nav';
import { StructuredData } from '@/components/structured-data';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://comicready.com'),
  title: { default: 'Comic Ready', template: '%s | Comic Ready' },
  description: 'Understand published comic submission requirements and what you still need to prepare.',
  applicationName: 'ComicReady',
  authors: [{ name: 'Charles Appiah Manu Jnr', url: '/about' }],
  creator: 'Charles Appiah Manu Jnr',
  publisher: 'ComicReady',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: 'Comic Ready',
    url: '/',
    title: 'Comic Ready',
    description: 'Understand published comic submission requirements and what you still need to prepare.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StructuredData
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ComicReady',
              url: 'https://comicready.com/',
              description: 'Source-linked comic submission calls and project readiness checks for independent creators.',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ComicReady',
              url: 'https://comicready.com/',
              founder: { '@type': 'Person', name: 'Charles Appiah Manu Jnr', url: 'https://comicready.com/about' },
            },
          ]}
        />
        <MotionProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <div className="site-frame">
            <header className="site-banner">
              <div className="site-shell site-header">
                <Link className="brand brand-lockup brand-lockup--mark-only" href="/" aria-label="Comic Ready home">
                  <BrandMark className="brand-mark" aria-hidden />
                </Link>
                <SiteNav />
              </div>
            </header>
            <main id="main" className="site-shell site-main">
              {children}
            </main>
            <footer className="site-footer site-shell">
              <p className="footer-lede">Independent stories. Informed next steps.</p>
              <nav aria-label="Footer">
                <Link href="/about">About</Link>
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
                <Link href="/contact">Corrections</Link>
              </nav>
            </footer>
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
