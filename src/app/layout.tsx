import type { Metadata } from 'next';
import Link from 'next/link';
import { Big_Shoulders, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { MotionProvider } from '@/components/motion-provider';
import { PrintMarks } from '@/components/print-marks';
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
              <div className="masthead-rule" aria-hidden="true" />
              <div className="site-header-inner">
                <Link className="brand" href="/" aria-label="ComicReady home">
                  <span className="brand-mark" aria-hidden="true">
                    <svg width="36" height="40" viewBox="0 0 36 40" fill="none">
                      <rect x="1" y="1" width="34" height="38" stroke="currentColor" strokeWidth="2" />
                      <path d="M1 14h34M14 14v26" stroke="currentColor" strokeWidth="2" />
                      <path d="M19 22h10M19 28h6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                    </svg>
                  </span>
                  <span className="brand-text">
                    <span className="brand-line">Comic</span>
                    <span className="brand-line brand-line-accent">Ready</span>
                  </span>
                </Link>
                <nav aria-label="Main navigation">
                  <Link href="/opportunities">Calls</Link>
                  <Link href="/#how-it-works">Process</Link>
                  <Link href="/#our-approach">Approach</Link>
                </nav>
              </div>
            </header>
            <PrintMarks />
            <main id="main">{children}</main>
            <footer className="site-footer">
              <div className="footer-colophon">
                <span className="footer-brand">ComicReady</span>
                <span className="footer-edition">Vol. 01 · development proof</span>
              </div>
              <p className="footer-tagline">Independent stories. Informed next steps.</p>
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
