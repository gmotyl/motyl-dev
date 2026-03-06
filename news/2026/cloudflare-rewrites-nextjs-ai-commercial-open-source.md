---
title: "Cloudflare Rewrites Next.js in One Week With AI -- What It Means for Commercial Open Source"
excerpt: "A single Cloudflare engineer used AI agents and $1,100 in tokens to rewrite most of Next.js, replacing Turbopack with Vite -- raising fundamental questions about code as a moat and the future of commercial open source."
publishedAt: "2026-03-05"
slug: "cloudflare-rewrites-nextjs-ai-commercial-open-source"
hashtags: "#pragmatic-engineer #nextjs #cloudflare #vite #ai-agents #open-source #react #vercel #web-development #software-architecture #generated #en"
---

## Cloudflare Replaces Turbopack With Vite, Rebuilds Next.js in a Week

**TLDR:** A single Cloudflare engineer used AI coding agents and roughly $1,100 in tokens to rewrite the core of Next.js, swapping Vercel's proprietary Turbopack build system for the industry-standard Vite. The resulting project, called "vinext," produces standardized build output deployable on any cloud provider, not just Vercel.

**Summary:**

Next.js is the dominant fullstack React framework, used by roughly half of all React developers. Until now, it has been tightly coupled to Vercel's proprietary Turbopack build tool, producing undocumented build output that makes deployment on competing platforms painful. Any hosting provider wanting to support Next.js had to reverse-engineer undocumented APIs that could break without notice on minor releases. This was not a bug -- it was Vercel's business strategy, and a fairly effective one that helped build a $9B valuation.

Cloudflare shattered that arrangement by replacing Turbopack with Vite, the most popular build tool in the broader JavaScript ecosystem. The new package, vinext, covers 94% of the Next.js API surface in roughly 67,000 lines of code versus Next.js's ~194,000 lines (excluding tests and bundled dependencies). The project was created by a single engineer using OpenCode (an open source coding agent) powered by Opus 4.5. Early benchmarks claim 4x faster production builds and 57% smaller client bundles, though vendor-sourced benchmarks should always be taken with generous skepticism.

What made the rewrite feasible was Next.js's own comprehensive test suite. The AI agent could validate its reimplementation against existing tests, making this fundamentally a "test-driven rewrite" -- a use case where AI excels because correctness is mechanically verifiable. Without those tests, this project would have been far harder to pull off, even with AI.

The strategic implications are stark. Vercel spent a decade building Next.js as the on-ramp to its platform. Cloudflare dismantled that lock-in in a week. The build-versus-buy calculus has shifted dramatically when a single engineer with an AI agent can replicate years of engineering investment.

**Key takeaways:**
- Next.js's proprietary build output was a deliberate moat for Vercel, now neutralized by Cloudflare's vinext
- The rewrite was estimated at 100x cheaper than traditional engineering approaches
- Comprehensive test suites are now a double-edged sword: they enable maintenance but also enable AI-driven rewrites by competitors
- Vite is the de facto standard build tool; Turbopack was always a strategic play rather than a technical necessity

**Tradeoffs:**
- Vinext covers 94% of the Next.js API, but the remaining 6% likely contains complex edge cases that matter in production
- Cloudflare's benchmarks are self-reported and should be independently verified
- Standardized build output benefits the ecosystem but removes Vercel's competitive advantage

**Link:** [The Pragmatic Engineer - Cloudflare rewrites Next.js](https://newsletter.pragmaticengineer.com/p/the-pulse-cloudflare-rewrites-nextjs)

---

## The "AI Slop" Problem: Vinext Is Not Production-Ready

**TLDR:** Despite Cloudflare's triumphant announcement, vinext is one week old, experimental, and has not been battle-tested at scale. Vercel's CEO rightly pointed out security vulnerabilities, and the "customers running it in production" claim turns out to mean a single beta site with no meaningful traffic.

**Summary:**

Cloudflare's announcement was carefully crafted to bury the disclaimers. The opening paragraph closes with "we already have customers running it in production," which sounds impressive until you discover -- 1,000 words later -- that "production" means a single beta site for CIO.gov with no meaningful traffic. This is misleading from a company that typically prides itself on precision, and Vercel's CEO Guillermo Rauch was justified in calling it out as "vibe coding" with real security implications.

The broader pattern here is one that the industry should be concerned about. AI-generated code can achieve functional parity quickly, but security, reliability, and edge-case handling are where the real engineering effort lives. Getting 94% of an API surface working is impressive as a demo; it is dangerous as a production deployment. The gap between "mostly works" and "production-ready" is where security vulnerabilities, data loss, and outages live.

There is also the question of maintenance. Creating a codebase with AI in a week is one thing. Keeping it secure, patched, and compatible with upstream changes is another. Cloudflare is betting that AI-assisted maintenance will be proportionally cheap, and they may be right. But the track record is thin, and the consequences of falling behind on security patches in a framework that handles web traffic are severe.

The honest framing would have been: "We proved the concept; now the real work begins." Instead, Cloudflare's CEO and CTO promoted vinext as though it were a mature alternative, which undermines trust in the technical claims that are genuinely impressive.

**Key takeaways:**
- "Running in production" at Cloudflare meant one beta site with negligible traffic -- a misleading claim
- AI-generated code achieves functional parity quickly but security and edge-case handling remain unsolved
- The 94%-to-100% gap in API coverage is where production failures live
- Vendor announcements around AI-generated projects need more scrutiny than traditional launches

**Link:** [The Pragmatic Engineer - Cloudflare rewrites Next.js](https://newsletter.pragmaticengineer.com/p/the-pulse-cloudflare-rewrites-nextjs)

---

## AI as a New Attack Vector on Commercial Open Source Business Models

**TLDR:** AI agents make it trivial to fork, rewrite, or piggyback off commercial open source projects, fundamentally undermining the moat that made "open core" a viable business strategy. Companies like Vercel that relied on code complexity as a barrier now face a world where that barrier barely exists.

**Summary:**

Vercel's strategy was textbook commercial open source: build and maintain the best framework (Next.js), optimize your platform for its specific output, and benefit as developers naturally gravitate to your ecosystem. This worked because assumption #2 -- that rewriting Next.js for a competing platform would be prohibitively expensive -- held true. AI has now invalidated that assumption, and it will not un-invalidate it.

The parallel with WordPress and WP Engine is instructive. WP Engine built a business by hosting WordPress without contributing meaningfully to its development -- "free-riding" on Automattic's R&D investment. Vercel managed to avoid this problem through the Turbopack lock-in, which made free-riding technically impractical. That defense is now gone.

What makes this particularly threatening is the asymmetry. Vercel employs a large team to build and maintain Next.js. Cloudflare used one engineer and an AI agent. For every future Next.js feature, Cloudflare can sync changes to vinext using AI, reaping the benefits of Vercel's investment at a fraction of the cost. This is not just a problem for Vercel -- it is an existential question for every commercial open source company whose moat is code complexity.

The responses available are limited and none are great. Making test suites private (as tldraw briefly considered) removes one enabler but also hurts the open source community. Moving more code to closed source undermines the "open" part of open core. New AI-specific licenses are theoretically possible but practically unenforceable. The honest answer is that code alone is no longer a moat, and companies need to compete on support, community, infrastructure, and developer experience instead.

**Key takeaways:**
- AI makes the "expensive to rewrite" assumption behind commercial open source obsolete
- Free-riding on open source R&D is now cheaper than ever: one engineer plus AI tokens versus a full team
- Private test suites are a partial defense but hurt the open source ecosystem
- Moats must shift from code to infrastructure, community, support, and developer experience
- Open core business models need fundamental rethinking

**Tradeoffs:**
- Making tests private protects against AI rewrites but damages contributor experience and community trust
- Moving to closed source protects revenue but contradicts the open source ethos that built the community
- Competing on infrastructure favors large companies with existing scale

**Link:** [The Pragmatic Engineer - Cloudflare rewrites Next.js](https://newsletter.pragmaticengineer.com/p/the-pulse-cloudflare-rewrites-nextjs)

---

## AI-World Reality: Tests as the Baseline, Migration Agents as the Future

**TLDR:** Comprehensive test suites are now the minimum requirement for productive AI agent usage, and vendors are deploying "migration agents" -- AI-powered tools that automate switching customers from competitor platforms.

**Summary:**

The Cloudflare-Next.js episode surfaces a broader truth about AI in software engineering: the single best use case for AI coding agents is full rewrites of well-tested products. The estimated 100x speedup for vinext dwarfs the typical ~10% self-reported efficiency gain from AI tools in day-to-day development. This gap exists because AI excels at "no-brainer tasks" where correctness is mechanically verifiable through tests, and struggles with open-ended or creative work.

This has practical implications for every engineering team. If your codebase lacks comprehensive tests, AI agents will be far less effective. Tests are no longer just a maintenance best practice; they are the enabling infrastructure for AI-augmented development. Peter Steinberger's emphasis on "closing the loop" -- having AI test its own output against existing test suites -- is the pattern that makes AI productive rather than just fast.

Perhaps the most strategically significant detail in Cloudflare's announcement was buried at the bottom: vinext ships with an "Agent Skill" that handles migration automatically. Install a package, open your Next.js project in any AI coding tool (Claude Code, Cursor, Codex, etc.), and tell the agent to migrate. The skill handles compatibility checking, dependency installation, and configuration generation. This is genuinely clever and will be copied aggressively. Expect every infrastructure vendor to ship migration agents targeting competitor platforms within the year.

The competitive dynamics are accelerating. Laura Tacho's observation that "AI is an accelerator, a multiplier" applies to ruthlessness as much as productivity. Cloudflare shipped an experimental, security-questionable rewrite and marketed it as production-ready because the window for first-mover advantage is narrowing. This urgency will define vendor behavior in the AI era.

**Key takeaways:**
- AI rewrites of well-tested codebases see ~100x speedup versus ~10% for general development tasks
- Comprehensive test suites are now the baseline infrastructure for AI-augmented engineering, not just a best practice
- Vendor-shipped "migration agents" will become standard competitive weapons
- The `npx skills add cloudflare/vinext` pattern will be replicated across the industry
- AI accelerates competitive ruthlessness -- expect more aggressive, less polished launches

**Tradeoffs:**
- Investing in comprehensive tests enables AI productivity but also enables competitors to rewrite your code
- Migration agents lower switching costs for users but intensify vendor competition
- First-mover advantage with AI-generated products comes at the cost of quality and trust

**Link:** [The Pragmatic Engineer - Cloudflare rewrites Next.js](https://newsletter.pragmaticengineer.com/p/the-pulse-cloudflare-rewrites-nextjs)
