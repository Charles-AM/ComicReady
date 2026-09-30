# ComicReady — independent press / working proof

## Direction
A practical tool from the world of independent comics and small-press publishing.
The visual reference is a comic maker's printed proof: confident lettering, ruled
panels, generous gutters, registration marks, numbered pages, and handwritten
editorial touches. The rejected first direction (soft green cards and literary
serif headlines) was too generic and has been replaced.

Use original geometric storyboard drawings, never copyrighted comic panels,
characters, or stock anime. No superhero bursts, fake halftone wallpaper, or
neon effects. The interface is a useful tool, not a comic-book costume.

References reviewed: styles.refero.design, typeui.sh, designmd.me,
designmd.supply, getdesign.md, collectui.com. Apply their emphasis on coherent
systems, explicit design decisions, and hierarchy; do not copy their screens.

## Tokens and typography
- Paper #F4F0E7; white sheet #FFFDF7; ink #21211F.
- Vermilion #B93424 for editorial labels; yellow #F1D45C for limited emphasis.
- Muted ink #656057; rules #B9B3A6.
- Display: Impact / Haettenschweiler / Arial Narrow / sans-serif, uppercase,
  48–100px, compact line height. It evokes cover lettering without novelty fonts.
- Body: Arial / Helvetica / sans-serif, 16–18px, 1.55 line height.
- Marginal notes, folios, labels: monospace, 10–12px, letter spacing .08em.
- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96px.
- Maximum content width 1200px; phone margins 20px, desktop margins 48px.
- Square corners; 1px dividers and 2px panel borders. No diffuse shadows.
  Physical paper art may use a small solid offset edge.

## Components
Listing: flat panel, organizer label, strong title, status, deadline/timezone,
compensation, verification timestamp, descriptive source/detail links.
Question: numbered fieldset, explicit label, source, helper text, unknown choice,
inline validation. Sequential sample pages and total story length stay distinct.
Finding: outcome word and symbol, explanation and official source. Four separate
outcomes: meets requirements, not eligible, preparation, cannot determine.
Checklist: native checkbox, action, source; completed text remains readable.
Show the local-device storage notice and keep print controls functional.

## States
Default: ink text and crisp borders. Hover: yellow background or stronger rule.
Focus: 3px vermilion outline with 4px offset. Disabled: native semantics and an
explanation. Loading: aria-live status. Error: written message plus icon and red
accent. Success: explicit text plus check, never color alone. Every control must
perform a real action; do not show future features as decorative buttons.

## Responsive, accessibility and motion
Stack the hero and workflow below 800px. Scale lettering down without clipping.
Keep source text selectable and wrap long URLs. Touch targets at least 44px.
Semantic landmarks, skip link, one h1, explicit labels, orderly headings,
keyboard access, readable contrast. Respect prefers-reduced-motion. Motion is
reserved for brief feedback, never essential information; avoid decorative loops.
Print on white, hide navigation/actions, retain URLs, timestamps and outcomes.

## Integrity
No fabricated calls, timestamps, deadlines, payment or rights terms. Label the
current unfinished app as a development preview. Every future real rule links to
an official source. Use “Cannot determine from published guidelines” and
“Payment not disclosed; confirm with organizer.” when appropriate. Guidance is
not an acceptance guarantee or legal opinion.

## Hero and call previews
The home hero uses the original vector `Storyboard` illustration (see ARTWORK.md).
Catalog cards use hand-built SVG cover previews in `call-cover-art.tsx`—no
AI-generated imagery. Decorative art only; not creator submissions or real
opportunity covers. Text, source links, results and forms never sit on busy art.
