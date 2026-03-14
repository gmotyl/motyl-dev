---
title: "Temporal: A 9-Year Journey to Modern JavaScript Time Handling, Vite 8's Rolldown Revolution, and AI Generation Hooks"
excerpt: "The week's biggest updates: JavaScript finally has proper datetime handling after nearly a decade of standardization, Vite achieves 10-30x faster builds with Rust, and AI generation goes beyond chat with unified hooks for images, speech, and video."
publishedAt: "2026-03-14"
slug: "temporal-vite8-generation-hooks"
hashtags: "#uidev #javascript #typescript #temporal #vite #rolldown #ai #react #performance #generated #en"
---

## TLDR

**Temporal hits Stage 4 standardization** — JavaScript finally has immutable, timezone-aware date/time handling with nanosecond precision after 9 years of TC39 consensus-building. Already shipping in Firefox 139, Chrome 144, and TypeScript 6.0 beta.

**Vite 8 ships Rolldown bundler** — A unified Rust-based bundler replaces the dual esbuild+Rollup approach, delivering 10-30x faster builds while maintaining full plugin compatibility. Real-world projects report 38-64% build time reductions.

**TanStack launches generation hooks** — React hooks for image generation, text-to-speech, transcription, summarization, and video, with type-safe streaming and server function integration. Same API across all generation types.

---

## Temporal: The 9-Year Journey to Fix Time in JavaScript

**Why do I care:** If you've ever shipped a feature that broke on daylight saving time, or dealt with timezone edge cases that made you question your career choices, Temporal is your redemption arc. This isn't just an API improvement—it's the culmination of nearly a decade of Bloomberg, Google, Microsoft, Igalia, and the open-source community solving a real problem that's been buried in JavaScript since 1995.

Temporal reached Stage 4 in TC39 this week, meaning it's now part of the ES2026 specification. But here's the kicker: you can already use it. Firefox 139, Chrome 144, Edge 144 all ship it. Safari has partial support in Technology Preview. Node.js 26 will include it.

**The problem** was baked in from day one. In 1995, Brendan Eich had 10 days to create JavaScript. He pragmatically ported Java's Date implementation directly—a decision made under time pressure that echoed through 30 years of developer pain. Date is mutable (mutations happen in place), doesn't handle month arithmetic correctly (adding one month can silently roll into the next month), and parses "almost ISO" strings ambiguously depending on the browser.

By the 2010s, this became a critical pain point. JavaScript was powering banking terminals, trading systems, collaboration tools—all in different timezones on earth. Libraries like Moment.js (first released 2011) filled the gap, but at a cost: adding 100+ MB downloads of locale and timezone data wholesale, because most devs didn't know which timezones they'd need.

**Temporal types:**
- `Temporal.ZonedDateTime` — exact moment + explicit timezone + explicit calendar + daylight saving correctness, fully immutable
- `Temporal.Instant` — exact moment in time, nanosecond precision (not milliseconds like Date)
- `Temporal.PlainDate`, `PlainTime`, `PlainDateTime` — "wall time" without timezone/calendar concerns
- `Temporal.Duration` — for arithmetic operations
- **Calendar support** — you can do "add one Hebrew month" as a first-class operation, not just format differently

The implementation was itself a technical milestone. Temporal is the biggest addition to ECMAScript since ES2015, with ~4,500 tests in Test262. Instead of duplicating implementation effort across engines, Google and Boa collaborated on `temporal_rs`, a Rust library that V8, Boa, and other engines now share. This reduced friction, made the codebase easier to review, and created a maintainable home for fixes post-standardization.

**Key takeaways:**
- Use `Temporal.ZonedDateTime` as your drop-in replacement for Date with explicit timezone handling
- Immutability and calendar-aware arithmetic prevent entire categories of bugs
- Already available in modern browsers/Node.js; polyfills exist for older targets
- The temporal_rs library demonstrates how engines can collaborate on shared infrastructure

**Link:** [Temporal: The 9-Year Journey to Fix Time in JavaScript](https://bloomberg.github.io/js-blog/post/temporal/)

---

## Vite 8: Rolldown Powers 10-30x Build Speedups

**Why do I care:** As someone shipping React apps, this is about reclaiming engineering time. Linear dropped their build time from 46 seconds to 6 seconds. Ramp cut 57% off theirs. Beehiiv saved 64%. These aren't marginal improvements—they're the difference between iterative dev feedback in seconds vs. minutes, and between deploying to production in 2 minutes vs. 20.

Vite 8 ships with Rolldown, a Rust-based bundler built by VoidZero. This is the most significant architectural change since Vite 2. Until now, Vite relied on esbuild (fast dev-time compilation, TypeScript/JSX transforms) and Rollup (production bundling, chunking, optimization). Two bundlers meant two plugin systems, two separate transformation pipelines, and constant sync work to keep edge cases aligned.

Rolldown unifies this: single bundler, same plugin API as Rollup (backward compatible out of the box), Rust performance, and new capabilities that were impossible with the dual approach (full bundle mode, flexible chunk splitting, persistent caching at the module level, Module Federation support).

**Real-world results:**
- Linear: 46s → 6s
- Ramp: 57% reduction  
- Mercedes-Benz.io: 38% faster
- Beehiiv: 64% faster

The migration path was deliberate. A separate `rolldown-vite` preview package shipped first, letting teams test on real codebases before it became the default in Vite 8 beta. This feedback surfaced edge cases the team fixed before the stable release. CI validated key plugins and frameworks against the new bundler to catch regressions early.

**Additional features in Vite 8:**
- **Integrated Devtools** — debugging and analysis directly from the dev server
- **Built-in tsconfig.paths support** — TypeScript path alias resolution with `resolve.tsconfigPaths: true`
- **emitDecoratorMetadata support** — automatic TypeScript decorator support, no external plugin needed
- **Wasm SSR support** — `.wasm?init` imports now work in SSR
- **Browser console forwarding** — browser console logs appear in your CLI (great for agents)
- **@vitejs/plugin-react v6** — now uses Oxc instead of Babel, smaller install size

**The trade-off:** Vite 8 is ~15 MB larger than Vite 7 (Rolldown itself is ~5 MB, lightningcss now included is ~10 MB). This was a deliberate choice: better CSS minification and Rolldown's performance optimizations favor speed over binary size.

**What's coming next:**
- **Full Bundle Mode** — bundle during dev like production, 3x faster startup, 40% faster reloads on large projects
- **Raw AST transfer** — JS plugins can access the Rust AST with minimal overhead
- **Native MagicString transforms** — string manipulation runs in Rust, logic lives in JS
- **Environment API stabilization** — collaborative effort with the ecosystem

**Key takeaways:**
- Upgrade to Vite 8 for significant build speedups (10-30x in many cases)
- Existing plugins work out-of-the-box thanks to compatibility layers
- Use the gradual migration path (rolldown-vite on Vite 7 first) for complex projects
- The new unified toolchain (Vite + Rolldown + Oxc) enables optimizations that were impossible before

**Link:** [Vite 8.0 is out!](https://vite.dev/blog/announcing-vite8)

---

## TypeScript Type Safety: Absorbing Unknown Into the Type Realm

**Why do I care:** Every `as` cast you leave in your codebase is a lie you're telling the compiler—and eventually, a bug you're shipping to production. This is a practical guide for killing those lies systematically.

The article walks through where `unknown` data enters your system and how to handle each case:

**Foreign JSON (APIs, databases):** Parse it with validation schemas like Zod. Don't cast. The absolute worst lie is `const user = (await res.json()) as User;` because you're asserting the shape of data from across a network boundary. Use Zod's `.parse()` to get runtime proof. If the API changes shape, you get a clear error instead of "undefined is not a function" three frames down the stack.

**Generic boundaries:** One `as` cast in the utility, validation at the call site. Example: `safeFetchJson<T>` accepts the cast internally (boundary between `any` and the typed world), but callers must validate with Zod. This keeps application code cast-free.

**Type guards:** When you've already checked a condition but TypeScript can't narrow, write a type guard instead of casting. Example: `function isImageNode(node: { type: string }): node is ImageNode { return node.type === 'image'; }`. Reusable, and keeps the lie out of application logic.

**Assertion functions:** Like guards but throw on failure and narrow for the rest of the scope. Best for preconditions inside functions. For external data, still prefer Zod.

**Catch clauses:** `catch (err)` gives you `unknown`. Don't cast to Error immediately. Use `Error.isError(err) ? err.message : String(err)` instead. Works across realms (iframes, workers, vm contexts).

**ORM JSON columns:** Type at the schema level using `$type<T>()` in Drizzle or similar patterns in Prisma. Zero casts at call sites.

**The hierarchy:**
1. **Can you validate it?** Use Zod (best for APIs, databases, localStorage, URL params)
2. **Can you narrow it?** Type guards or assertion functions (discriminated unions, string literals, set membership)
3. **Generic boundary?** One `as` in the utility, validation at call site
4. **Structural plumbing** (Proxies, generated code)? Inline disable comment, move on

**Key takeaway:** The goal isn't zero `as`—it's zero *unexamined* `as`. Every cast should be a conscious decision, not a reflex.

**Link:** [Absorbing unknown Into the Type Realm](https://www.solberg.is/unknown-to-typed)

---

## Generation Hooks: Type-Safe AI Beyond Chat | TanStack

**Why do I care:** Until now, adding image generation, text-to-speech, transcription, summarization, or video to your app meant writing custom fetch logic, managing loading states, handling errors, and juggling streaming protocols for *each one*. Generation hooks unify all of that under a single API.

TanStack AI launches generation hooks: React hooks (with Solid, Vue, Svelte coming soon) that give you first-class primitives for non-chat AI activities:
- `useGenerateImage()` — image generation
- `useGenerateSpeech()` — text-to-speech
- `useTranscription()` — audio transcription
- `useSummarize()` — text summarization
- `useGenerateVideo()` — video generation

Every hook has the same API: `generate()`, `result`, `isLoading`, `error`, `stop()`, `reset()`. Learn one, you know them all.

**Three transport modes:**
1. **Streaming (SSE)** — Classic server-sent events. Flexible, works with any server framework.
2. **Direct (fetcher)** — Just call a function, get JSON back. Synchronous from the user's perspective, fully type-safe.
3. **Server Function Streaming (NEW)** — The real innovation. Combines type safety of server functions with real-time streaming feedback. Your fetcher returns a Response (SSE stream), the client auto-detects it and parses in real-time. Input stays fully typed throughout.

The genius is in the detection: if your fetcher returns a Response, it's treated as SSE. If it returns anything else, it's a direct result. No flags, no configuration, no separate hook.

**Result transforms:** Every hook accepts an `onResult` callback to transform results before storing. TypeScript infers the output type. Example: convert base64 audio to a blob URL for playback.

**Video generation is special.** Providers like OpenAI's Sora use a jobs-based architecture (submit prompt → get job ID → poll for status). `useGenerateVideo()` handles this transparently, exposing `jobId` and `videoStatus` as reactive state. Users see "pending", "processing", progress percentages, and finally the video URL—no polling loop required.

**Adapter ecosystem:** Generation functions are provider-agnostic by design. Swapping from OpenAI to Anthropic or a local model is a one-line change.

**Key takeaway:** 3 lines of hook setup gives you type-safe input, streaming progress, error handling, and abort support. That's the whole feature.

**Link:** [Generation Hooks: Type-Safe AI Beyond Chat | TanStack Blog](https://tanstack.com/blog/generation-hooks)

---

## React Native CI/CD with Expo Workflows

**Why do I care:** Setting up React Native CI/CD has historically been a nightmare of bash scripts, Fastlane, manual signing, and brittle macOS VMs. Expo Workflows turns that into a few lines of configuration.

Expo Workflows is purpose-built mobile CI/CD: iOS builds on dedicated M4 Pro hardware (10-20 min vs. 15-40 min on generic VMs), automatic caching, managed signing (one `EXPO_TOKEN` replaces keystone base64 vars, Fastlane Match, Apple API keys), and pre-packaged jobs: Build, Submit, Update, Maestro, Repack, Fingerprint, Slack—fully composable.

**Speed tiers based on what changed:**
- **Full Build** (10-20 min) — Native code changed? Full compile, sign, submit on M4 Pro
- **Repack** (~2 min) — JS-only changes? Reuse last build, rebundle JS, re-sign. Skip compilation entirely.
- **OTA Updates** (<5 min) — Hotfix? Push over-the-air update, no rebuild

Most teams start by offloading mobile builds to Workflows, then expand. You don't rip out your CI—integrate gradually. Instant jobs (~300ms) for Slack notifications, artifact lookups, lightweight tasks. Zero CI minutes consumed.

Operators report ~80% reduction in DevOps overhead, freeing engineers to focus on features.

**Key takeaway:** From indie devs to enterprises (HipCamp, PrizePicks, InfiniteRed), Workflows replaces sluggish, brittle build processes with something quick and dependable.

**Link:** [Mobile CI/CD built for React Native](https://expo.dev/services/workflows)

---

## Just Use Postgres: The Forbidden Monolith

**Why do I care:** This is architectural thinking at its most provocative. What if git repositories, deployment infrastructure, and application runtime were all inside a single Postgres process?

The experiment: `omni_git`, a Postgres extension implementing the git smart HTTP protocol in SQL. Paired with `omnigres` (Postgres as an application server), it turns `git push` into a deployment mechanism. You push Flask code (or raw SQL) to a Postgres remote, a trigger deploys it, and omnigres serves HTTP traffic—no reverse proxy, no container runtime, no separate application server. The database is the git host, the build system, and the runtime.

**What this unlocks:**
- **Replication magic:** Streaming replication gives you every git push, deployed function, and application state through the same WAL stream. One `pg_basebackup` covers all three concerns (git mirror, artifact store, database replication).
- **Point-in-time recovery:** Restore from backup, replay WAL to any moment. You get repository contents, deployed code, and application data all consistent at that exact point in time.
- **Single `pg_dump`:** Backs up application code, git history, and application state all at once.
- **Unified monitoring:** Git objects and refs participate in Postgres's MVCC, vacuum, monitoring, connection pooling—all the ops tooling already exists.

**The trade-off:** The monolith only works if you accept that a bad deploy can take down your database. That's a management problem, not a technical one, but it needs more than a trigger and `EXECUTE` to handle safely.

**Disclaimer:** This is experimental and proof-of-concept. Large repos will be slow (packfile generator skips delta compression), deploy trigger isn't battle-tested with real applications, no auth, protocol v1 only, no concurrent push handling. It works for the happy path on small repos.

The insight: when everything is in one database, operational concerns like replication, backup, recovery, and monitoring become dramatically simpler because you're not coordinating across multiple storage systems with different consistency models.

**Link:** [Just Use Postgres](https://nesbitt.io/2026/03/10/just-use-postgres.html)

---

## Disclaimer

This article summarizes technical newsletters and curated links for developers. All views and opinions expressed here are for educational purposes. Verify claims and evaluate tools based on your specific needs before adopting them in production.