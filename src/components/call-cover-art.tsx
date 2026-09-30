/** Mini comic-page preview — same print language as the home Storyboard. Not organizer art. */

const PAPER = '#FFFDF7';
const MAT = '#E3DDD0';
const INK = '#21211F';
const MUTED = '#656057';
const YELLOW = '#F1D45C';
const VERM = '#B93424';
const STROKE = 1.8;

type CoverArtProps = {
  slug: string;
  category: string;
  title?: string;
  fixture?: boolean;
};

function slugBucket(slug: string, mod: number) {
  return slug.split('').reduce((n, c) => n + c.charCodeAt(0), 0) % mod;
}

function wrapTitle(title: string, maxLen = 22) {
  const words = title.trim().split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxLen && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function PanelGrid({ layout }: { layout: number }) {
  const s = STROKE;
  if (layout === 0) {
    return (
      <g stroke={INK} strokeWidth={s}>
        <rect x="14" y="38" width="172" height="92" fill={YELLOW} />
        <circle cx="148" cy="72" r="18" fill={PAPER} />
        <path d="M22 122 58 78l38 28 48-40 20 56H22Z" fill={PAPER} strokeWidth={1.2} />
        <rect x="14" y="138" width="82" height="78" fill={PAPER} />
        <path d="M22 206 38 168l16 14 22-28 22 52H22Z" fill={MAT} strokeWidth={1.2} />
        <rect x="104" y="138" width="82" height="78" fill={INK} />
        <path d="M116 200 132 168l14 12 18-24 18 44H116Z" stroke={PAPER} strokeWidth={1} fill="none" />
      </g>
    );
  }
  if (layout === 1) {
    return (
      <g stroke={INK} strokeWidth={s}>
        <rect x="14" y="38" width="172" height="58" fill={PAPER} />
        <path d="M28 82h144M40 52h24m32 0h24m32 0h24" strokeWidth={1.2} />
        <rect x="14" y="102" width="172" height="114" fill={PAPER} />
        <path d="M28 200 64 118l36 32 52-48v98H28Z" fill={MAT} strokeWidth={1.2} />
        <rect x="14" y="222" width="172" height="52" fill={YELLOW} />
        <path d="M28 248h88M28 262h56" strokeWidth={2} strokeLinecap="round" />
      </g>
    );
  }
  if (layout === 2) {
    return (
      <g stroke={INK} strokeWidth={s}>
        <rect x="14" y="38" width="100" height="132" fill={PAPER} />
        <path d="M22 158 42 98l28 24 34-42 28 78H22Z" fill={MAT} strokeWidth={1.2} />
        <rect x="122" y="38" width="64" height="64" fill={YELLOW} />
        <rect x="122" y="106" width="64" height="64" fill={PAPER} />
        <circle cx="154" cy="138" r="12" fill={MAT} />
        <rect x="14" y="178" width="172" height="96" fill={INK} />
        <path d="M28 258h120M28 242h80" stroke={PAPER} strokeWidth={1.5} strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g stroke={INK} strokeWidth={s}>
      <rect x="14" y="38" width="172" height="72" fill={PAPER} />
      <path d="M28 98 52 58l32 28 48-36 24 48H28Z" fill={MAT} strokeWidth={1.2} />
      <rect x="14" y="118" width="82" height="88" fill={YELLOW} />
      <rect x="104" y="118" width="82" height="88" fill={PAPER} />
      <path d="M112 188 128 148l20 16 24-32 24 56H112Z" fill={MAT} strokeWidth={1.2} />
      <rect x="14" y="214" width="172" height="60" fill={PAPER} strokeDasharray="4 4" stroke={MUTED} />
      <path d="M28 238h144M28 256h96" strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

function ComicPagePreview({ slug, category, title, fixture }: CoverArtProps) {
  const layout = slugBucket(slug, 4);
  const folio = String(slugBucket(slug, 99) + 1).padStart(2, '0');
  const titleLines = wrapTitle(title || 'Submission call');
  const typeLabel = fixture ? 'FIXTURE' : category === 'anthology' ? 'ANTHOLOGY' : 'SHORT COMIC';

  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden className="call-cover-svg">
      <rect width="200" height="300" fill={MAT} />
      <rect x="8" y="10" width="184" height="280" fill={PAPER} stroke={INK} strokeWidth={2} />
      <text x="18" y="28" fill={INK} fontFamily="ui-monospace, monospace" fontSize="7" letterSpacing="1.5">
        {typeLabel}
      </text>
      <text x="182" y="28" textAnchor="end" fill={MUTED} fontFamily="ui-monospace, monospace" fontSize="7">
        {folio}
      </text>
      {fixture ? (
        <g stroke={INK} strokeWidth={STROKE}>
          <rect x="14" y="38" width="172" height="200" fill={PAPER} strokeDasharray="6 4" stroke={MUTED} />
          <text x="100" y="130" textAnchor="middle" fill={MUTED} fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2">
            PRACTICE ONLY
          </text>
        </g>
      ) : (
        <PanelGrid layout={layout} />
      )}
      <rect x="14" y="248" width="172" height="34" fill={PAPER} stroke={INK} strokeWidth={1.2} />
      {titleLines.map((line, i) => (
        <text
          key={line}
          x="100"
          y={262 + i * 11}
          textAnchor="middle"
          fill={INK}
          fontFamily="Georgia, 'Iowan Old Style', serif"
          fontSize="9"
        >
          {line}
        </text>
      ))}
      <path d="M172 268 184 280 172 292" fill={VERM} stroke={INK} strokeWidth={1} />
    </svg>
  );
}

export function CallCoverArt(props: CoverArtProps) {
  return <ComicPagePreview {...props} />;
}
