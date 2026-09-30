/** Home hero title variant — change after picking on /design/hero-options */

export type HeroTitleVariant = 'editorial' | 'lockup' | 'tagline' | 'ready-focus' | 'stacked-serif' | 'uppercase-tracked';

export const heroTitleVariant: HeroTitleVariant = 'stacked-serif';

export const heroTitleOptions: { id: HeroTitleVariant; label: string; note: string }[] = [
  { id: 'editorial', label: 'Editorial serif', note: 'One line “Comic Ready” in Source Serif — matches the rest of the site.' },
  { id: 'lockup', label: 'Mark + name', note: 'Spine C beside “Comic Ready” at hero size (horizontal lockup).' },
  { id: 'tagline', label: 'Tagline hero', note: 'No big name in hero — eyebrow + “Make your next move.” (C mark only in header).' },
  { id: 'ready-focus', label: 'Ready focus', note: 'Small “Comic” above large serif “Ready” — emphasis on preparedness.' },
  { id: 'stacked-serif', label: 'Stacked serif', note: 'Comic / Ready on two lines, normal proportions (no horizontal stretch).' },
  { id: 'uppercase-tracked', label: 'Tracked caps', note: 'COMIC READY in sans, letter-spacing only — no scale transform.' },
];
