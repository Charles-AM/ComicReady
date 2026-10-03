import Link from 'next/link';
import { HeroTitle } from '@/components/hero-title';
import { heroTitleOptions } from '@/lib/hero-title-style';
import { PageHeader } from '@/components/page-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hero title options',
  description: 'Private ComicReady interface preview for comparing home-page title treatments.',
};

export default function HeroOptionsPage() {
  return (
    <section className="page-section hero-options-page">
      <PageHeader
        eyebrow="Design preview"
        title="Pick a home hero title"
        intro="Each block shows how the top of the home page would read. Reply with A–F (or the variant id). We’ll set heroTitleVariant in src/lib/hero-title-style.ts and remove this page if you want."
      />
      <ol className="hero-options-list">
        {heroTitleOptions.map((opt, index) => (
          <li key={opt.id} className="hero-option-card">
            <p className="hero-option-label">
              <strong>{String.fromCharCode(65 + index)}</strong> — {opt.label.replace(/^[A-Z] · /, '')}
            </p>
            <p className="hero-option-note">{opt.note}</p>
            <div className="hero-option-preview">
              <HeroTitle variant={opt.id} id={`preview-${opt.id}`} />
              <p className="lede hero-option-lede">Sample lede text stays the same under every option.</p>
            </div>
            <p className="hero-option-id">
              Set <code>heroTitleVariant = &apos;{opt.id}&apos;</code>
            </p>
          </li>
        ))}
      </ol>
      <p>
        <Link href="/">Back to home</Link>
      </p>
    </section>
  );
}
