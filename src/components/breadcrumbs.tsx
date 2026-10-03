import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';

type Crumb = {
  label: string;
  href?: string;
};

const origin = 'https://comicready.com';

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: item.href ? new URL(item.href, origin).toString() : undefined,
  }));

  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement,
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`}>
              {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
