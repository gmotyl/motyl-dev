# Articles and News Articles live as Git-tracked markdown, not database rows

All content (`articles/`, `news/YYYY/`, `content/trends/motyl-dev-N.md`) is markdown with YAML frontmatter — generated and edited by an **LLM Agent** under the **Maintainer**'s review, merged via PR, and built into a static cache (`data/content-cache.json` via `scripts/build-content-cache.ts`) at deploy time. The database is reserved for ephemeral, per-user state — **Bookmarks**, **Votes**, **Article Views**, **Pattern Stats**, **Trends Archive**. This keeps editorial workflow inside Git (diff, review, revert, branch), keeps reads on Vercel free of DB roundtrips, and lets agents author content with the same tools they author code.

## Considered Options

- **Headless CMS (Sanity, Contentful)** — rejected: extra vendor lock-in and no agent-native authoring loop.
- **Postgres `Article` table** — rejected: loses the Git review loop, blocks an agent from editing content in a PR, and forces a migration on every editorial schema change.
