# Logo design skill (installed separately)

Upstream: https://github.com/kaankiziltug/logo-design-skill

```bash
git clone --depth 1 https://github.com/kaankiziltug/logo-design-skill.git /tmp/logo-design-skill
mkdir -p ~/.cursor/skills/logo-design
cp -r /tmp/logo-design-skill/skills/logo-design/* ~/.cursor/skills/logo-design/
```

ComicReady concept files live in `brand/logo/`. Regenerate the overview sheet:

```bash
python3 ~/.cursor/skills/logo-design/scripts/concept_sheet.py \
  brand/logo/concept-a-symbol.svg brand/logo/concept-b-symbol.svg brand/logo/concept-c-symbol.svg \
  --lockups brand/logo/concept-a-lockup.svg brand/logo/concept-b-lockup.svg brand/logo/concept-c-lockup.svg \
  --names "Panel monogram" "Checklist panel" "Spine C" \
  --notes "…" "…" "…" \
  --recommend 1 --greyscale -o brand/logo/renders/comicready-concepts.png
```
