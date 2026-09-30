import type { Metadata } from 'next';
import Link from 'next/link';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { MotionProvider } from '@/components/motion-provider';
import { SiteNav } from '@/components/site-nav';
import './globals.css';

const bodyFont = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: { default: 'ComicReady — Make comics. Make your next move.', template: '%s | ComicReady' },
  description: 'Understand published comic submission requirements and what you still need to prepare.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${monoFont.variable}`}>
      <body>
        <MotionProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <div className="site-frame">
            <header className="site-banner">
              <div className="site-shell site-header">
                <Link className="brand" href="/" aria-label="ComicReady home">
                  ComicReady
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
