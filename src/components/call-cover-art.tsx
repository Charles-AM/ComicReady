/** Original decorative cover previews — not organizer artwork or sample submissions. */

type CoverArtProps = {
  slug: string;
  category: string;
  fixture?: boolean;
};

function slugBucket(slug: string, mod: number) {
  return slug.split('').reduce((n, c) => n + c.charCodeAt(0), 0) % mod;
}

function Sector13Cover() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="200" height="300" fill="#0f1418" />
      <circle cx="148" cy="52" r="28" fill="#1a2830" stroke="#6a8a9a" strokeWidth="1.2" />
      <ellipse cx="148" cy="52" rx="42" ry="8" stroke="#4a6a78" strokeWidth="1" fill="none" opacity="0.7" />
      <ellipse cx="148" cy="52" rx="54" ry="12" stroke="#3a5868" strokeWidth="0.8" fill="none" opacity="0.45" />
      {[...Array(24)].map((_, i) => (
        <circle key={i} cx={(i * 37) % 200} cy={(i * 23) % 120 + 20} r={0.6 + (i % 3) * 0.4} fill="#c8d4dc" opacity={0.2 + (i % 5) * 0.08} />
      ))}
      <rect x="14" y="118" width="172" height="88" fill="#121820" stroke="#5a7080" strokeWidth="1.5" />
      <path d="M24 198 68 152l36 28 52-62 20 80H24Z" fill="#1e2a34" stroke="#7a9098" strokeWidth="1" />
      <path d="M38 178h24v12H38zm48-8h18v20H86zm40 4h22v16h-22z" fill="#2a3844" />
      <rect x="14" y="218" width="82" height="68" fill="#101418" stroke="#5a7080" strokeWidth="1.2" />
      <path d="M22 268 42 238l18 14 22-32 32 48H22Z" fill="#243038" stroke="#6a8898" strokeWidth="0.8" />
      <rect x="104" y="218" width="82" height="68" fill="#101418" stroke="#5a7080" strokeWidth="1.2" />
      <circle cx="145" cy="252" r="14" fill="#1a2228" stroke="#8aa0a8" strokeWidth="1" />
      <path d="M145 238v28M131 252h28" stroke="#8aa0a8" strokeWidth="1" />
    </svg>
  );
}

function CbkCover() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="200" height="300" fill="#141210" />
      <rect x="18" y="24" width="164" height="112" fill="#1c1a18" stroke="#8a8478" strokeWidth="2" strokeDasharray="6 4" />
      <path d="M28 34h144M28 124h144" stroke="#5a544c" strokeWidth="1" />
      <text x="100" y="82" textAnchor="middle" fill="#6a645c" fontFamily="monospace" fontSize="11" letterSpacing="3">
        NO IMAGE
      </text>
      <rect x="18" y="152" width="76" height="124" fill="#1a1816" stroke="#7a7468" strokeWidth="1.5" />
      <rect x="106" y="152" width="76" height="124" fill="#1a1816" stroke="#7a7468" strokeWidth="1.5" />
      <path d="M106 152 182 276M182 152 106 276" stroke="#b93424" strokeWidth="2.5" opacity="0.85" />
      <path d="M18 152 94 276M94 152 18 276" stroke="#b93424" strokeWidth="2.5" opacity="0.85" />
      <rect x="42" y="248" width="116" height="28" fill="#f1d45c" stroke="#21211f" strokeWidth="1.2" transform="rotate(-8 100 262)" />
      <text x="100" y="265" textAnchor="middle" fill="#21211f" fontFamily="monospace" fontSize="9" letterSpacing="1">
        ART ON STRIKE
      </text>
    </svg>
  );
}

function BiteCover() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="bite-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1428" />
          <stop offset="55%" stopColor="#281830" />
          <stop offset="100%" stopColor="#120c14" />
        </linearGradient>
      </defs>
      <rect width="200" height="300" fill="url(#bite-sky)" />
      <circle cx="132" cy="58" r="22" fill="#e8e0d0" opacity="0.92" />
      <circle cx="126" cy="54" r="20" fill="#1a1428" opacity="0.35" />
      <path d="M24 200 Q60 170 100 188 T176 178 L200 300 0 300Z" fill="#0c0810" />
      <path d="M48 188c8-12 18-8 22 2s14 10 22-2" stroke="#d60270" strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M88 192c10-14 22-10 26 4s16 12 26-4" stroke="#9b4f96" strokeWidth="1.2" fill="none" opacity="0.55" />
      <path d="M128 186c8-12 20-8 24 4s18 10 26-6" stroke="#0038a8" strokeWidth="1.2" fill="none" opacity="0.5" />
      <rect x="16" y="218" width="168" height="64" fill="#18121c" stroke="#6a5878" strokeWidth="1.2" rx="2" />
      <path d="M28 248h48M28 262h72" stroke="#9a8898" strokeWidth="2" strokeLinecap="round" />
      <circle cx="156" cy="248" r="10" fill="#2a2030" stroke="#d60270" strokeWidth="1" opacity="0.8" />
      <path d="M152 248l4 4 8-10" stroke="#e8e0d0" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function FixtureCover() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="200" height="300" fill="#161614" />
      <path d="M0 40h200M0 80h200M0 120h200" stroke="#2c2c28" strokeWidth="1" />
      <path d="M40 0v300M80 0v300M120 0v300M160 0v300" stroke="#2c2c28" strokeWidth="1" />
      <rect x="24" y="36" width="152" height="100" fill="#1e1e1c" stroke="#6a6a64" strokeWidth="1.5" strokeDasharray="5 3" />
      <rect x="24" y="148" width="72" height="80" fill="#1a1a18" stroke="#6a6a64" strokeWidth="1.2" />
      <rect x="104" y="148" width="72" height="80" fill="#1a1a18" stroke="#6a6a64" strokeWidth="1.2" />
      <text x="100" y="92" textAnchor="middle" fill="#8a8a82" fontFamily="monospace" fontSize="10" letterSpacing="2">
        FIXTURE
      </text>
      <text x="100" y="268" textAnchor="middle" fill="#656057" fontFamily="monospace" fontSize="8">
        PRACTICE ONLY
      </text>
    </svg>
  );
}

function GenericCover({ slug, category }: { slug: string; category: string }) {
  const b = slugBucket(slug, 4);
  const warm = category === 'anthology';
  const base = warm ? ['#2a221c', '#1e1814', '#283028', '#242018'][b] : ['#222228', '#1c1c22', '#202028', '#242420'][b];
  const accent = warm ? '#b93424' : '#6a8090';

  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="200" height="300" fill={base} />
      <rect x="16" y="20" width="168" height="120" fill="#121010" stroke={accent} strokeWidth="1.5" opacity="0.9" />
      <path
        d={
          b === 0
            ? 'M28 120 60 48l44 36 68-52v88H28Z'
            : b === 1
              ? 'M28 40h144v80H28zm0 88h68v72H28zm76 0h68v72H104Z'
              : b === 2
                ? 'M28 40c40 0 72 32 72 72s-32 72-72 72V40zm76 0h68v144h-68z'
                : 'M28 52h144v52H28zm0 64h88v84H28zm96 0h48v84h-48z'
        }
        fill="#1a1816"
        stroke={accent}
        strokeWidth="1"
        opacity="0.85"
      />
      <rect x="16" y="156" width="168" height="124" fill="#101010" stroke="#4a4a48" strokeWidth="1.2" />
      <path d="M28 220h144M28 248h96" stroke="#5a5a56" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CallCoverArt({ slug, category, fixture }: CoverArtProps) {
  if (fixture || slug === 'development-anthology') return <FixtureCover />;
  switch (slug) {
    case 'sector-13':
      return <Sector13Cover />;
    case 'cbk-cba-v76':
      return <CbkCover />;
    case 'discord-bite':
      return <BiteCover />;
    default:
      return <GenericCover slug={slug} category={category} />;
  }
}
