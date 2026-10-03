<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Git commits (Cloud Agent)

Do **not** leave Cursor attribution on commits pushed from this repo.

Before the first commit in a session, run:

```bash
./scripts/configure-agent-git.sh
```

When committing:

- Use **`git commit --no-verify`** so managed hooks do not append `Co-authored-by:` lines.
- Do **not** add `Made with Cursor`, `Co-authored-by: Cursor`, or `cursoragent@cursor.com` to commit messages or PR bodies.
- Author must be **V Builders** `<v-builders@users.noreply.github.com>` only (no co-authors from Cursor).
