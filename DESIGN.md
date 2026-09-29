# ComicReady design system

## Intent
An editorial workbench for independent comic creators: precise, creative, calm,
and transparent. Help people understand requirements and the next action quickly.
Page margins, small folios, fine rules, and restrained panel groupings evoke print
production without borrowing comic artwork. Never use copyrighted panels or characters.

## References reviewed
- https://styles.refero.design/ — coherent visual systems rather than isolated screens.
- https://typeui.sh/ — deliberate typography and component consistency.
- https://designmd.me/ — explicit, reusable design decisions.
- https://designmd.supply/ — document tokens before implementation.
- https://getdesign.md/ — shared vocabulary for consistent UI.
- https://collectui.com/ — scanning hierarchy and focused forms.
These are conceptual references, not assets or interfaces to copy.

## Tokens
- Paper: #F6F3EC; surface: #FFFDF8.
- Ink: #20251F; secondary ink: #596052; line: #D6D9CB.
- Accent: #DBF078, used with ink text; primary button: ink with paper text.
- Success: #315D41 / #EAF2E9; preparation: #715315 / #FFF2D0.
- Ineligible: #923B32 / #FBEAE6; unknown: #55596C / #ECECF3.
- Body/UI: system sans-serif; editorial headline: Georgia, serif.
- Body 16–18px, line-height 1.6; labels 14px; metadata 13px.
- Headline fluid 40–76px, line-height 1.05; section titles 28–40px.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px.
- Maximum page width: 1160px; reading width: 680px.
- Corners: 8px controls, 16px cards, 24px feature panels.
- Borders: 1px; shadow: 0 8px 30px rgb(32 37 31 / 5%), rarely used.

## Responsive behavior
Start at 320px. Use 20px side padding on phones, 32px on tablets, 48px
on large screens. One-column forms and findings; split supporting content at 800px.
Never hide source links on phones. Wrap navigation and long URLs. Touch targets
are at least 44px. No horizontally scrolling form or result content.

## Component states
- Default: legible ink, explicit labels, fine borders, visible link underlines.
- Hover: darker border or subtle surface shift; no essential hover-only content.
- Focus: 3px #42643B outline, 3px offset; never remove keyboard focus.
- Disabled: lower emphasis, native disabled semantics, visible reason nearby.
- Loading: plain status text with aria-live; avoid indefinite decorative spinners.
- Error: red text plus a written explanation associated with the field.
- Success: green text plus a check and explicit outcome; never color alone.

## Applied examples
- Listing card: organizer eyebrow, title, status, deadline/timezone, payment
  disclosure, verification timestamp, then a descriptive details link.
- Form question: visible label, why it matters, a source link, an input, and a
  separate unknown option. Distinguish sequential sample pages from story length.
- Result finding: outcome word/icon, requirement, explanation, official source.
  Group eligibility, preparation, and uncertainty separately. A prominent summary
  names the next action without promising acceptance. Unknown is never a pass.
- Checklist item: native checkbox, action sentence, source, optional explanation.
  Completed text remains readable. Show local-device storage notice and reset.

## Motion and accessibility
Use Motion from motion/react for 120–180ms reveals, short step transitions,
and checklist feedback. Respect reduced motion with MotionConfig and CSS;
all information and controls must function with animation disabled.
Use semantic landmarks, one h1, orderly heading levels, explicit form labels,
fieldsets for grouped choices, skip navigation, and keyboard-operable controls.
Keep normal text at WCAG AA contrast. Do not communicate results with color alone.
Printing removes navigation and controls, retains source URLs, timestamps,
findings and checklist state, and avoids splitting individual findings.

## Content integrity
No acceptance guarantees or legal ratings. Link each real rule to an official
source. Show “Cannot determine from published guidelines” for ambiguity and
“Payment not disclosed; confirm with organizer.” for undisclosed payment.
Fixtures must be visibly labeled as development examples and never inserted
into a live database. There are no fabricated live calls in this scaffold.
