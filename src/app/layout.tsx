import type { Metadata } from 'next';
import Link from 'next/link';
import { Big_Shoulders, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { MotionProvider } from '@/components/motion-provider';
import { SiteNav } from '@/components/site-nav';
import './globals.css';

const bodyFont = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

const displayFont = Big_Shoulders({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
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
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
      <body>
        <MotionProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <div className="site-shell">
            <header className="site-header">
              <Link className="brand" href="/" aria-label="ComicReady home">
                <span className="brand-mark" aria-hidden="true">
                  <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
                    <rect x="1" y="1" width="30" height="34" stroke="currentColor" strokeWidth="2" />
                    <path d="M1 13h30M12 13v22" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
                <span className="brand-name">ComicReady</span>
              </Link>
              <SiteNav />
            </header>
            <main id="main">{children}</main>
            <footer className="site-footer">
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
