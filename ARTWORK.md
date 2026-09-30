# Catalog card preview

Switch look in **`src/lib/cover-theme.ts`** → `catalogPreviewStyle`:

| Value | What you see |
|-------|----------------|
| `stripe` | Plain tile, colored left bar (default) |
| `initials` | Soft tint + two-letter initials |
| `category` | Soft tint + “Anthology” / “Short comic” |
| `label` | Organizer name inside the tile |

Accent color is stable per call slug. Not organizer artwork or AI.

# Home hero

`src/components/storyboard.tsx` — original vector comic proof.
