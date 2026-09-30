import type { ReactNode } from 'react';
import Link from 'next/link';

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="back-link" href={href}>
      {children}
    </Link>
  );
}
