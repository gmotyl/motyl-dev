# motyl.dev

The publication and platform at motyl.dev — a personal tech blog plus an AI-curated news feed and a weekly newsletter built from the most-voted links. The publication has a single human **Maintainer** (the site owner) and one or more **LLM Agents** that handle the curation pipeline.

## Language

### Authoring

**Maintainer**:
The human owner/editor of the publication. Authors **Blog Articles**, reviews PRs raised by **LLM Agents**, edits Newsletter Issue copy, triggers `/generate-news`, `/generate-trends`, `/publish-social`, etc. A role, not a person — the publication assumes exactly one Maintainer today but the domain model does not preclude more.
_Avoid_: owner, editor (bare), admin

**LLM Agent**:
Any MCP-capable CLI that drives the curation pipeline. Exercised today: Claude Code, OpenCode, Gemini CLI, Qwen Code. The pipeline is vendor-neutral by design — switching agents must not require code changes in motyl-dev or newsletter-ai, only configuration.
_Avoid_: Claude, AI, model, assistant

### Content

**Blog Article**:
First-party long-form writing authored by the **Maintainer** (hand-written, no LLM Agent in the loop).
_Files_: `articles/` · _Code_: `Content` with `itemType: 'article'` (`lib/content/types.ts`)
_Avoid_: post, article (unqualified)

**News Article**:
An AI-generated curated summary written by an LLM Agent from one or more **News Sources** for that day.
_Files_: `news/YYYY/` · _Code_: `Content` with `itemType: 'news'`
_Avoid_: news, summary, digest

**News Source**:
Anything that feeds links into the pipeline — today an inbound newsletter email matched by a pattern in `newsletter-ai/config.yaml`; in future, agents or scrapers. Identified by `patternName` (e.g. `daily.dev`, `TLDR`).
_Avoid_: source newsletter, inbound newsletter, mailing list

**Trending Link**:
A single URL accumulating reader **Votes** for the current cycle. Carries title, description, category, source domain and the originating **News Source** pattern. Backed by `TrendsVotes`; all live rows share the literal week key `'current'` until the cycle closes.
_Avoid_: vote, link, trend item

**Vote**:
An upvote cast by a site visitor on a link inside a **News Article**. Increments the `voteCount` of a **Trending Link**, or creates one if it didn't exist. Anonymous; not tied to a **User** in the current model.

**Newsletter Issue**:
A weekly outbound email composed from the top **Trending Links** of a cycle. Stored as a numbered markdown file (`content/trends/motyl-dev-{N}.md`) and broadcast to **Subscribers** via Resend with `scripts/send-newsletter.ts --send`.
_Avoid_: newsletter (unqualified), trends digest, weekly email

**Cycle Reset**:
The act of archiving the closed-out **Trending Links** into `TrendsArchive` and truncating live `TrendsVotes`. Performed manually by `scripts/trends-reset.ts` after the Newsletter Issue PR merges. From that point new **Votes** accumulate toward the next **Newsletter Issue**.
_Avoid_: rollover, weekly cutover

### Audience

**Subscriber**:
A reader who opted in to receive **Newsletter Issues**. Identity lives in a Resend Audience; motyl-dev does not store a local copy today (see backlog).
_Avoid_: contact, recipient, member

**User**:
An authenticated visitor of the site (NextAuth/GitHub). Owns **Bookmarks** and **Article Views**. Disjoint from **Subscriber** today.
_Avoid_: member, account

**Bookmark**:
A **User**'s saved link, optionally tagged to the parent **News Article** or **Blog Article** and the section heading near where it appeared.

**Article View**:
A record that a **User** has opened a **Blog Article** or **News Article** (unique per user × slug).

### Pipeline analytics

**Pattern Stats**:
Daily counts per **News Source** of how many items were `processed`, `extracted`, and `included` (cited in a **News Article**).
_Code_: `lib/trends/pattern-stats.ts` · `PatternStats` model.

### Distribution

**Content Atom**:
A short, platform-shaped repurposing of a **Newsletter Issue** — e.g. a LinkedIn post, an X thread, a Bluesky post, an Instagram caption, a TikTok script. Produced by `/repurpose`; published by `/publish-social`.
_Avoid_: snippet, social post (unqualified)

**Issue Cover**:
The hero image embedded in a **Newsletter Issue**, generated externally (NanoBanana etc.), optimised to WebP, uploaded to Cloudflare R2 (`motyl-dev-img` bucket, served at `img.motyl.dev`), and pinned in frontmatter by `/publish-image`.
_Avoid_: hero, image (unqualified)

**Publish Checklist**:
The fixed eight-step sequence — `/generate-trends` → manual edit → `/image-prompt` → external image gen → `/publish-image` → publish to site → email to audience → `/repurpose` → `/publish-social`. Documented in `docs/newsletter-publish-checklist.md`.

## Relationships

- A **News Source** emits links that an **LLM Agent** scrapes via newsletter-ai MCP, producing one **News Article** per generation run.
- A **News Article** cites several external links; readers of the site cast **Votes** that promote any of those into a **Trending Link**.
- At the end of a cycle, `/generate-trends` reads the live **Trending Links** and drafts a **Newsletter Issue** for review; once merged, `scripts/send-newsletter.ts --send` delivers it to **Subscribers**.
- After delivery, a **Cycle Reset** archives the closed-out **Trending Links** into `TrendsArchive` and clears `TrendsVotes`, so the next cycle starts from zero.
- A published **Newsletter Issue** is then repurposed into **Content Atoms** across social platforms via `/repurpose` and `/publish-social`, fronted by an **Issue Cover** uploaded via `/publish-image`.
- A **Blog Article** lives outside the curation pipeline — it is hand-written and unrelated to **News Sources**.
- **Pattern Stats** are recorded per **News Source** per day at processing time (`processed`, `extracted`) and at citation time (`included`).

## Example dialogue

> **Dev:** When `/generate-news` runs daily.dev, what gets created?
> **Domain expert:** One **News Article** in `news/YYYY/`. The **News Source** is `daily.dev`. **Pattern Stats** for `daily.dev` get bumped (`processed`, `extracted`, `included`). No **Trending Links** are created automatically — those only appear when a site reader votes on a link inside the article.

> **Dev:** And when the cycle closes?
> **Domain expert:** I run `/generate-trends`. It pulls every live **Trending Link** out of `TrendsVotes`, drafts a **Newsletter Issue** at `content/trends/motyl-dev-{N}.md`, opens a PR. I edit the headline and copy, generate an **Issue Cover**, publish it to the site, then `scripts/send-newsletter.ts {N} --send` broadcasts to every **Subscriber** in the Resend audience. After that I run `scripts/trends-reset.ts` — that's the **Cycle Reset**. From that moment new **Votes** count toward the next issue. Finally `/repurpose` and `/publish-social` push **Content Atoms** to LinkedIn, X and Bluesky.

## Flagged ambiguities

- "Newsletter" used to mean three things across the stack (inbound email, outbound issue, the publication itself). Resolved: inbound = **News Source**, outbound = **Newsletter Issue**, brand-name "newsletter" is allowed in marketing copy only and never in code or this glossary.
- "Article" used to mean both the Maintainer's first-party writing and scraped third-party content. Resolved: first-party = **Blog Article**, third-party scraped content lives only in newsletter-ai and is called a **Scraped Source** there (see newsletter-ai/CONTEXT.md). The code's `ItemType.Article` enum value refers to **Blog Article** — rename is a backlog item.
- `content/trends/motyl-dev-N.md` directory name mixes "Trends" and "Newsletter Issue" — the file *is* a Newsletter Issue. Directory name is legacy.
- The literal `week: 'current'` in `TrendsVotes` is a workflow signal, not an ISO week. Real week labels appear only in `TrendsArchive` after a **Cycle Reset**. `getCurrentWeek()` in `lib/trends/trends.ts` is computed but unused for storage.
- `/generate-trends` currently doubles as "compute the analytics + draft the issue body" — the issue body coming out of a trends command is an acknowledged smell (see backlog).
