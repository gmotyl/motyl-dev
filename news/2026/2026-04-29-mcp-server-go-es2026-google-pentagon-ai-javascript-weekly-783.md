---
title: "MCP Servers in Go, ES2026, Google's Pentagon AI Deal, and JavaScript Weekly 783"
excerpt: "A roundup covering production MCP server architecture in Go, JavaScript's upcoming ES2025/2026 features, Google's controversial classified Pentagon AI contract, and a comedic look at tech culture."
publishedAt: "2026-04-29"
slug: "mcp-server-go-es2026-google-pentagon-ai-javascript-weekly-783"
hashtags: "#dailydev #frontend #webdev #golang #javascript #ai #mcp #typescript #generated #en"
source_pattern: "daily.dev"
---

## Building a Production MCP Server in Go

**TLDR:** Arcjet describes how they integrated an MCP server directly into their existing Go API service rather than spinning up a standalone sidecar. The article covers OAuth, tool design philosophy, and prompt injection defenses in practical detail.

**Summary:** The Model Context Protocol is having its infrastructure moment, and Arcjet's writeup is one of the more honest accounts I've seen from a team that actually shipped something rather than blogging about the potential. Their central architectural decision — embedding the MCP server into the existing API service instead of running it alongside as a separate process — deserves more attention than it gets. The reasoning is straightforward: you already have session validation, middleware, rate limiting, and a data layer. Why duplicate all of that just to serve a new protocol? The sidecar pattern sounds clean in diagrams but in practice it means you're managing shared secrets, synchronizing auth state, and debugging inter-process failures you didn't have before.

The tool design section gets at something the MCP community is still figuring out. The instinct when building an MCP server is to just wrap your REST API, one tool per endpoint. Arcjet explicitly rejected this and built tools around how an agent would actually think about a problem: security briefings that aggregate multiple data sources, anomaly detection that returns actionable recommendations, dry-run impact analysis before any state change. That's a fundamentally different design philosophy, and it produces tools that are actually useful to an LLM rather than just technically correct.

The OAuth section is where the article earns its title. Serving RFC 8414 and RFC 9728 discovery endpoints while proxying to WorkOS AuthKit for the actual authentication flow involves careful layering. Dynamic Client Registration adds another wrinkle because you need to handle unknown clients registering themselves at runtime. This is not a trivial implementation and the article doesn't pretend it is.

What the article doesn't address: prompt injection is mentioned but the treatment is thin. The separation of "trusted guidance" from "untrusted attacker-controlled request data" is real, but in practice the boundary is blurry and the failure mode is catastrophic. Any production MCP server handling security data (which this one does) should have a much more developed adversarial model than what's described. I also want to know what happens when the MCP server's tool descriptions themselves become the attack surface.

**Key takeaways:**
- Embedding MCP into an existing service reuses auth, middleware, and data layers rather than duplicating them in a sidecar
- Tools should reflect agent workflows, not REST endpoint mappings
- OAuth for MCP requires implementing RFC 8414 and RFC 9728 discovery metadata alongside Dynamic Client Registration
- Prompt injection from attacker-controlled request data is a real threat that needs architectural separation

**Why do I care:** The pattern of embedding MCP alongside your existing service is something I'm going to copy. Most of the Go MCP tutorials online start with a blank slate and ignore the reality that production services already have auth and middleware worth keeping. This article gives a concrete answer to "how do I add MCP to what I already have" rather than "how do I build MCP from scratch."

**Link:** [Building a production MCP server in Go](https://app.daily.dev/posts/building-a-production-mcp-server-in-go-bbavimh57)

---

## JavaScript Weekly Issue 783: ES2025, ES2026, and the Ecosystem

**TLDR:** JavaScript Weekly 783 rounds up ES2025 and ES2026 features, a new performance-focused package manager called Aube, and Nano Stores 1.3 at a remarkable 286 bytes. There's also practical content on WASM debugging and Node.js addons with .NET Native AOT.

**Summary:** Every few years there's a JavaScript Weekly issue that feels like a checklist of things you should probably know by now but haven't sat down to learn. Issue 783 is one of those. The ES2025 and ES2026 feature overview is the most useful single artifact because these features are arriving in Node and browsers on different schedules and it's easy to lose track of what's actually available versus what's still behind a flag.

Iterator helpers are genuinely useful and the fact that they landed in ES2025 means they're real in current Node LTS. The ability to chain map, filter, and take directly on iterators without materializing intermediate arrays is something that should change how you write data processing code. Promise.try is a small quality-of-life addition that removes a common footgun where synchronous throws inside async functions don't get caught by the outer promise chain. Map.getOrInsert is similarly focused, solving the "check then set" pattern that produces ugly code whenever you're building lookup tables.

Temporal is the one I watch with cautious optimism. The Date API is famously broken and Temporal is the proper replacement, but "Stage 4" has been "almost done" for so long that I have a healthy skepticism about when you'll actually use it in production without a polyfill.

Aube, the new package manager, is the kind of project that either becomes the next pnpm or disappears in six months. Performance is the stated focus but "faster than npm" is table stakes at this point. The differentiation question is what else it brings. Nano Stores 1.3 at 286 bytes is more immediately interesting to me. Framework-agnostic, tiny, and addressing real state sharing problems between islands or micro-frontends.

What's missing from this coverage: the article doesn't tell you which of these features are actually safe to use today without transpilation, which matters enormously for teams with older targets. "ES2026 feature" tells you about the spec, not about your users' browsers.

**Key takeaways:**
- Iterator helpers (ES2025) allow chaining map, filter, take directly on iterables without intermediate arrays
- Promise.try and Map.getOrInsert solve specific but common async and collection patterns
- Temporal is Stage 4 but still needs polyfills in most real-world deployments
- Nano Stores 1.3 at 286 bytes is a practical option for lightweight cross-framework state

**Why do I care:** The iterator helpers section alone is worth bookmarking because I keep writing the same iterator-to-array-then-map pattern and there's no good reason to keep doing that once this lands everywhere. The WASM debugging in Chrome DevTools section is also underrated since WASM errors are notoriously opaque and any improvements in tooling visibility matter.

**Link:** [JavaScript Weekly Issue 783: April 28, 2026](https://app.daily.dev/posts/javascript-weekly-issue-783-april-28-2026-9t0vy8eim)

---

## Google Signs Classified AI Deal with the Pentagon

**TLDR:** Google has agreed to let the Pentagon use its AI models for "any lawful government purpose" with fewer ethical restrictions than competitors like Anthropic maintained. The deal was announced the same day 560 Google employees published an open letter asking the company to refuse exactly this kind of arrangement.

**Summary:** The timing here is almost too on the nose. Five hundred and sixty Google employees publish an open letter to Sundar Pichai asking him not to sign classified AI contracts with the Pentagon. Hours later, the news breaks that he already had. Whatever your position on military AI applications, the sequence of events tells you something about how seriously leadership takes these internal dissent processes.

The comparison to Anthropic is where the article gets substantive. Anthropic was reportedly blacklisted in February 2026 for maintaining contractual prohibitions on mass domestic surveillance and autonomous weapons. Those aren't vague ethical stances. They're specific restrictions on specific capabilities. Google's deal, as described, grants discretion for "any lawful government purpose" which is language that does almost no limiting work at all. The phrase is defined by what the government decides is lawful, not by independent ethical review.

OpenAI and xAI are also now in this vendor pool. The competitive dynamic is worth naming: if you want Pentagon contracts, you apparently need to remove the restrictions. Anthropic's exclusion creates a direct financial incentive for every other major AI lab to not be Anthropic. That's not a conspiracy, it's just how procurement works, and it should inform how you think about any AI company's public ethical commitments.

The employee open letter is not meaningless but it's also not sufficient. The last time Google employees organized around Project Maven they succeeded in forcing the company to not renew a specific contract. This time the company was already signed before the letter was public. That's a different situation and suggests the internal accountability mechanisms have changed.

What the coverage avoids thinking about: "classified" means we don't actually know what was agreed to. The framing assumes the worst based on the public contract language, which may be fair, but there's a significant gap between what's reported and what was actually negotiated. The ethical analysis would look different if there are classified annexes with specific restrictions.

**Key takeaways:**
- Google's Pentagon deal allows AI use for "any lawful government purpose" with broader discretion than competitor contracts
- Anthropic was reportedly excluded from similar deals for maintaining specific restrictions on autonomous weapons and surveillance
- The deal was finalized before 560 employee signatories published their open letter opposing it
- OpenAI and xAI are also now in the classified Pentagon AI vendor pool

**Why do I care:** As a developer building on top of AI APIs, the ethical constraints (or lack of them) in foundation model agreements affect what gets optimized for and ultimately what gets built into the models. This is not abstract. If military use cases drive training priorities, that influences capability development in ways that eventually show up in the APIs we use.

**Link:** [Google signs classified AI deal with the Pentagon](https://app.daily.dev/posts/google-signs-classified-ai-deal-with-the-pentagon-3xuf8jtji)

---

## Goodbye Tim Apple: The daily.dev Show Launches

**TLDR:** daily.dev launched a short-form comedy video show covering tech news, developer culture, and industry events in a sketch format. The first episode runs about one minute and covers Python multicore updates, Visual Studio 2026, AI tools, and Git alternatives.

**Summary:** I'll be honest, a tech news comedy sketch format is either charming or unwatchable depending entirely on the execution, and at one minute per episode there's limited runway for either. The topics covered in the first episode are genuinely interesting, Python's multicore work is a long time coming, Visual Studio 2026 is a real release, Sora and Anthropic are worth discussing, and Git alternatives remain a perennial topic for developers who have opinions about version control. The comedic framing might work as a weekly catch-up format for people who want to stay loosely informed without reading.

The name "Goodbye Tim Apple" is presumably a reference to Tim Cook and suggests the episode covers Apple news or Apple-adjacent topics alongside the developer content. Whether this becomes a consistent series or a launch experiment will depend on whether the production effort is sustainable at daily.dev's scale.

**Key takeaways:**
- daily.dev launched a short-form video show covering tech news in a comedic sketch format
- Episode 1 covers Python multicore, Visual Studio 2026, Sora, Anthropic, and Git alternatives
- The format runs approximately one minute per episode

**Why do I care:** The format is worth watching to see if short-form tech comedy finds an audience among developers. If it does, it's a signal about how technical content consumption is changing. If it doesn't, it's still interesting as an experiment from a developer media company that has the distribution to test this properly.

**Link:** [Goodbye Tim Apple - daily.dev show (S1E1)](https://app.daily.dev/posts/kELgFGnIp)
