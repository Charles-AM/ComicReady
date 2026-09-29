import type { Metadata } from 'next';
import Link from 'next/link';
import { MotionProvider } from '@/components/motion-provider';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'ComicReady — Your next submission, clearer.', template: '%s | ComicReady' },
  description: 'Understand published comic submission requirements and what you still need to prepare.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><MotionProvider>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header"><Link className="brand" href="/" aria-label="ComicReady home"><span aria-hidden="true" className="brand-icon">C<span>✓</span></span>ComicReady<span className="edition">FIRST EDITION</span></Link><span className="header-note">A little clarity before you submit.</span></header>
    <main id="main">{children}</main>
    <footer className="site-footer"><span>Made for independent comic creators.</span><span>Guidance from published requirements. Never an acceptance guarantee.</span></footer>
  </MotionProvider></body></html>;
}
