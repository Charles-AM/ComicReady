'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Main', match: (path: string) => path === '/' },
  {
    href: '/opportunities',
    label: 'Catalog',
    match: (path: string) => path.startsWith('/opportunities') || path.startsWith('/check/') || path.startsWith('/results/'),
  },
  { href: '/#how-it-works', label: 'Process', match: () => false },
  { href: '/#our-approach', label: 'Approach', match: () => false },
] as const;

export function SiteNav() {
  const pathname = usePathname() ?? '';

  return (
    <nav aria-label="Main navigation">
      {links.map((link) => {
        const active = link.match(pathname);
        return (
          <Link key={link.href} href={link.href} aria-current={active ? 'page' : undefined}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
