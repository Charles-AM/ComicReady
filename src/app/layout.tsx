import type { Metadata } from 'next';
import Link from 'next/link';
import { MotionProvider } from '@/components/motion-provider';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'ComicReady — Make comics. Make your next move.', template: '%s | ComicReady' },
  description: 'Understand published comic submission requirements and what you still need to prepare.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><MotionProvider>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header"><Link className="brand" href="/" aria-label="ComicReady home"><svg width="32" height="35" viewBox="0 0 32 35" fill="none" aria-hidden="true"><path d="M1 1h30v33H1zM1 14h30M13 14v20" stroke="currentColor" strokeWidth="2"/><path d="m18 23 3 3 6-7" stroke="currentColor" strokeWidth="2"/></svg>COMIC<span>READY</span><span className="brand-period">.</span></Link><nav aria-label="Main navigation"><Link href="/opportunities">Find a call</Link><Link href="/#how-it-works">How it works</Link><Link href="/#our-approach">Our approach <span aria-hidden="true">↗</span></Link></nav></header>
    <main id="main">{children}</main>
    <footer className="site-footer"><span className="footer-brand">COMICREADY.</span><span>Independent stories. Informed next steps.</span><nav aria-label="Footer"><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/contact">Corrections</Link></nav></footer>
  </MotionProvider></body></html>;
}
