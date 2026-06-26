---
title: "Deno 2.9 Desktop Apps, AI SDK 7 Agent Depth, and Cookie Library Goes ESM-Only"
excerpt: "This week: Deno brings native desktop apps to the web stack, Vercel ships AI SDK 7 with serious agent infrastructure, and jshttp/cookie v2 drops legacy baggage."
publishedAt: "2026-06-26"
slug: "deno-2-9-desktop-apps-ai-sdk-7-agent-depth-cookie-esm"
hashtags: "#dailydev #javascript #typescript #deno #ai #agents #architecture #performance #frontend #react"
source_pattern: "daily.dev"
---

## Deno 2.9: Desktop Apps, Half the Startup Time, and Post-Quantum Crypto

**TLDR:** Deno 2.9 ships `deno desktop`, a way to build native desktop applications using your existing web stack and compile them down to a single binary. Cold start time drops from 34ms to 17ms, memory use under load falls by more than two-thirds, and the release also lands post-quantum cryptography algorithms directly in the runtime.

**Summary:** Let me tell you what grabbed me immediately about Deno 2.9: the startup number. Going from 34 milliseconds to 17 milliseconds for a cold start is a nearly 2x improvement, and it was achieved through genuinely interesting engineering work, including lazy-loading Node globals out of the snapshot, gating the Node bootstrap to Node workers only, and building a V8 code cache for lazy-loaded ES modules. That is not just tweaking; that is rethinking what gets loaded and when.

The memory story is even more dramatic. In Deno 2.8, resident set size would climb with load, reaching 197 MB when streaming 1 MiB response bodies. In 2.9, it holds flat at around 63 MB regardless of workload. That is a 3x improvement in peak memory. When you are running a lot of concurrent server instances, this is the kind of win that changes your infrastructure bill.

But the headline feature is `deno desktop`. The pitch is simple and, I think, genuinely good: point it at a script or a web framework project, and it compiles a native desktop app with a single distributable binary. The UI runs in a webview, your logic runs in Deno, and you get native APIs like `Deno.BrowserWindow`, `Deno.Tray`, and `Deno.Dock` without any additional dependencies. Compare that to the Electron setup story, which involves separate toolchains, packaging complexity, and shipping a Chromium binary to every user. Deno's default backend uses the OS's built-in WebView engine, so binaries stay small. You can opt into bundled Chromium with the `--backend cef` flag when you need guaranteed rendering consistency across platforms.

The cross-compilation story is also compelling. You can build binaries for Windows, macOS, and Linux from a single Linux CI runner, producing `.dmg`, `.msi`, `.deb`, and `.rpm` outputs from the same machine. The installers are written in pure Rust, so no platform-specific toolchain is required.

The test runner in 2.9 also grew up considerably. It now supports snapshot testing with a built-in `t.assertSnapshot()` method, change-aware test selection that walks the module graph to run only affected tests, parameterized tests via `Deno.test.each`, coverage thresholds that fail the build, and parallel sharding for CI matrix runs. If you were reaching for Vitest or Jest purely for these features, there is now a real argument to stay in-runtime.

On supply chain security, two new features stand out. Minimum dependency age is now enabled by default with a 24-hour window, meaning a freshly published npm package cannot land in your tree immediately. The `no-downgrade` trust policy, which is opt-in, refuses to install a package version whose trust evidence is weaker than prior versions, catching the pattern of compromised maintainer tokens.

The post-quantum cryptography additions are worth noting too. ML-KEM, ML-DSA, and SLH-DSA are all directly available through the standard Web Crypto API. These are NIST FIPS standards, and having them in the runtime without any third-party library is a meaningful step toward future-proofing TLS and signing workflows.

**Key takeaways:**
- `deno desktop` compiles web-stack apps into single native binaries, with webview UI, native OS APIs, and cross-platform compilation from one machine.
- Cold start dropped from 34ms to 17ms; peak memory under load dropped by up to 3x compared to Deno 2.8.
- The test runner now has snapshot testing, change-aware selection, sharding, and coverage thresholds built in.
- Supply chain security defaults tightened: npm packages younger than 24 hours are blocked by default.
- Post-quantum cryptography (ML-KEM, ML-DSA, SLH-DSA) is now available natively via the Web Crypto API.

**Why do I care:** The performance numbers alone make this worth upgrading for server workloads. But `deno desktop` is the thing I want to think hard about. For internal tooling, CLI companions with a GUI, or any developer-facing app where you do not want to ship Electron, the pitch is real. The compile-once, run-everywhere story with cross-compilation from CI is exactly the missing piece that kept me away from desktop-adjacent runtimes. The test runner improvements are also meaningful, not because Vitest is bad, but because fewer tool boundaries means fewer configuration surfaces to maintain.

**Link:** [Deno 2.9](https://deno.com/blog/v2.9)

---

## AI SDK 7: Production Depth for Agent Workflows

**TLDR:** Vercel's AI SDK reaches version 7 with a major focus on building, running, and observing production agents. The release adds reasoning control, tool and runtime context, durable agent execution via WorkflowAgent, first-class timeouts, harness abstractions for running Claude Code and Codex, and provider-agnostic realtime voice support.

**Summary:** With over 16 million weekly downloads, AI SDK is not a niche project anymore, and version 7 reads like a team that surveyed production failure modes and built directly against them. The five areas of focus are develop, run, integrate, observe, and go beyond text, and each one addresses something real.

On the development side, the standardized `reasoning` option for `generateText` and `streamText` is a small API change that represents a genuine quality-of-life improvement. Frontier models all support configurable reasoning, but every provider exposes it differently. Having one option that maps to native provider settings means you can switch models without rewriting reasoning configuration. The typed tool context feature is more architecturally interesting: you can scope API keys or configuration to specific tools rather than passing them through the agent's broader context. That matters as the ecosystem moves toward third-party tools that agents consume, since you do not want those tools having access to unrelated secrets.

The file and skill upload APIs solve a real inefficiency. If your agent workflow repeatedly processes the same PDF or skill definition, uploading it once and passing a lightweight reference is strictly better than re-sending the same bytes on every model call. This applies especially to Anthropic's container-based Claude execution environment, where skill files can now be uploaded once and referenced by subsequent inference calls.

The durability story in `WorkflowAgent` is the feature I would have asked for six months ago. Agents that run across multiple steps, wait for human approval, or span deployment boundaries need durable execution that survives process restarts. The WorkflowAgent gives you that with workflow-based streaming, typed runtime context, stable telemetry, and preserved invalid tool calls. The callback improvements include richer execution data like step numbers, previous results, duration, and success or failure, which matters for billing and debugging.

Timeouts in version 7 are now genuinely granular. You can set total time, per-step time, per-chunk time for stream hangs, and per-tool time, with individual overrides per tool. This matters because agents fail in ways a simple HTTP timeout cannot catch: a streaming response can open and stop sending chunks, a tool can hang indefinitely, or a multi-step run can blow its budget before completing. Having all four failure modes covered with clean `TimeoutError` propagation is the kind of thing that separates a library built for toys from one built for production.

The `HarnessAgent` abstraction is interesting for a different reason. It lets you run established agent runtimes like Claude Code, Codex, or Pi through a single interface, configuring each with a sandbox, custom instructions, and skills. The fact that `HarnessAgent` implements the same `Agent` interface means `useChat()` and the new terminal UI work without additional wiring. I want to reserve some skepticism about abstraction layers over agent harnesses, since each one has its own nuances, but the portability argument is compelling for teams that want to swap runtimes without rewriting integrations.

The observability revamp is long overdue. Registering telemetry once at application startup with `registerTelemetry(new OpenTelemetry())` is a much cleaner model than wiring lifecycle callbacks into every `generateText` call. The Node.js tracing channel support via `node:diagnostics_channel` gives observability providers a standard integration surface, and the per-step performance statistics let you answer specific questions: how long did the model take to start responding, how fast were tokens arriving, which tool was the slowest.

**Key takeaways:**
- WorkflowAgent gives agents durable, resumable execution that survives process restarts, deploys, and delayed human approvals.
- Typed tool context scopes API keys and configuration to individual tools, important for third-party tool safety.
- File and skill upload APIs eliminate redundant data transfer in multi-step agent workflows.
- First-class timeouts cover four distinct failure modes: total, per-step, per-chunk, and per-tool.
- HarnessAgent lets you run Claude Code, Codex, and other established runtimes through a unified interface.
- Telemetry is now registered once at application startup rather than per-call.

**Why do I care:** The timeout story is what I've been waiting for. Anyone who has run multi-step agents in production knows that the failure modes are not the same as a simple API call, and generic HTTP timeouts do not cover stream hangs or tool-level freezes. The WorkflowAgent durability feature is the other one I'd evaluate seriously for anything involving human-in-the-loop approval steps. The HarnessAgent abstraction makes me cautiously optimistic, but I want to see how well it handles the edge cases each harness handles differently before committing to it as an abstraction boundary.

**Link:** [AI SDK 7 is now available](https://vercel.com/blog/ai-sdk-7)

---

## jshttp/cookie v2.0.0: ESM-Only, Renamed APIs, Faster Performance

**TLDR:** The `cookie` package used by Node.js servers everywhere has shipped version 2.0.0, dropping CommonJS in favor of ESM only, renaming its main APIs, and delivering measurable performance improvements to stringify and encode operations.

**Summary:** The `jshttp/cookie` library is one of those packages you probably do not think about much until it changes. It sits at the bottom of the stack in nearly every Node.js server framework, parsing and serializing HTTP cookies. Version 2.0.0 is a breaking change release, and the breaks are intentional and appropriate.

The move to ESM only is the most significant change. The old CommonJS `parse` and `stringify` methods are gone, replaced by `parseCookie` and `stringifySetCookie`. The rename is a real breaking change rather than just a module system swap, which means automated upgrade scripts will not silently succeed here. You need to update call sites. In Node.js 22 and later, `require()` of ESM works natively, so older codebases on modern runtimes have an escape hatch. Anything still on Node.js below 22 is simply not supported.

The `stringifySetCookie` method now only accepts object mode input, dropping the older string-based path. This is a welcome simplification. The previous API allowed ambiguous usage patterns that made it easy to produce malformed cookie headers. The performance improvements to stringify and encode are a bonus, and the fix for leading semicolons in cookies with skipped values closes a subtle correctness bug that could produce headers that looked valid but were not.

What is missing from the release notes is any acknowledgment of migration tooling or a codemod path. If you maintain a framework or library that depends on `cookie` directly, version 2.0.0 is a manual upgrade. Check your indirect dependencies too: Express, Koa, and many middleware packages build on this, and the ecosystem needs to catch up before you can take the upgrade end-to-end.

**Key takeaways:**
- Package is now ESM only; CommonJS support is dropped. Node.js 22+ can use `require()` of ESM, but older Node versions are unsupported.
- `parse` is renamed to `parseCookie` and `stringify` is renamed to `stringifySetCookie`.
- `stringifySetCookie` now only accepts object mode input.
- Performance improved for stringify and encode operations.
- A leading semicolon bug in cookies with skipped values is fixed.

**Why do I care:** This one requires active attention, not because the API is complex but because `cookie` is so widely used as an indirect dependency. Before upgrading, check whether your web framework or session middleware depends on a specific major version. If you maintain a package that wraps cookie functionality, version 2 is an opportunity to clean up your own API surface at the same time. The ESM migration is the right direction for the ecosystem, even if it creates short-term friction.

**Link:** [Release v2.0.0 · jshttp/cookie](https://github.com/jshttp/cookie/releases/tag/v2.0.0)

---

## Rust Web Development 2026: The Problems Nobody Talks About

**TLDR:** A JetBrains article surfaces the honest challenges of building web services in Rust in 2026, covering the parts of the ecosystem that do not get discussed in the usual "Rust is fast" narrative. The piece appeared as a trending post on daily.dev this week.

**Summary:** The title alone is worth your attention. Most Rust web content in 2026 still leads with raw performance numbers and memory safety guarantees, which are both true and not the full picture. The article from JetBrains positioned itself as the honest counterpart to that narrative.

The problems in Rust web development that rarely get discussed include ecosystem maturity for specific problem domains, the steep learning curve that affects team velocity even after initial proficiency is reached, compile times that still punish large dependency graphs, and the friction of async Rust when you need fine-grained control over executor behavior. The fact that the post was trending on daily.dev suggests these concerns resonate widely, even among developers who like Rust.

The irony is that Rust's web story in 2026 is genuinely strong. Frameworks like Axum are production-ready, the async ecosystem has stabilized considerably, and tooling has improved. But the article is right to push back on the idea that choosing Rust for web services is a straightforward tradeoff. If your team does not already have Rust experience, the learning investment is real, and it shows in the first six months of a project. The compile-time story is also still a genuine cost, especially in CI environments with cold caches.

The piece, attributed to JetBrains, also has an inherent tension: JetBrains has Rust IDE support to sell. The criticism of the ecosystem should be read with that context in mind. That said, the problems raised are not invented for the sake of balance. They reflect genuine friction points that teams encounter in practice.

**Key takeaways:**
- Rust web development has real challenges beyond the performance headline, including ecosystem gaps, team velocity costs, and compile time friction.
- Async Rust remains complex when executor control matters.
- Team learning curve affects project timelines even after initial Rust proficiency is established.
- The article's perspective is informed but not entirely neutral, given JetBrains' commercial interest in Rust tooling.

**Why do I care:** I think the most valuable thing this article does is give teams permission to name the costs. "Rust is faster" is not a complete argument for adopting it on a web project. If your bottleneck is not CPU or memory, if your team does not have Rust background, and if your iteration speed matters more than marginal throughput gains, the tradeoff looks different than the benchmark posts suggest. Knowing the full cost upfront is how you make a good decision.

**Link:** [Rust Web Development 2026: The Problems Nobody Talks About](https://daily.dev/posts/3kIFxBVeb)

---

## Stop Building Distributed Monoliths: How to Find Real Business Boundaries

**TLDR:** An architecture article by Marcos Lobo argues that most microservice architectures are just distributed monoliths in disguise, and walks through how to identify genuine business boundaries before splitting services. The post was trending on daily.dev this week.

**Summary:** "Distributed monolith" is one of those terms that gets thrown around at architecture talks but rarely gets a precise definition in practice. The pattern is recognizable once you know to look for it: services that deploy independently but cannot function independently, shared databases across service boundaries, synchronous chains of calls that create cascading failure modes, and deploys that require coordination across multiple teams.

The question the article takes on is how you find real business boundaries before you split. The answer, done well, is usually domain-driven design vocabulary: bounded contexts, ubiquitous language, and context maps. But even those tools require a certain level of organizational maturity and time investment that not every team has. The more practical question is what signals tell you a boundary is wrong after the fact. Chatty service communication, shared data models, and the need to deploy multiple services to ship one feature are the clearest signs.

What the article is probably not saying clearly enough is that the organizational boundary and the technical boundary should align. Conway's Law is not just a clever observation. If you have one team owning three services that are tightly coupled by business logic, the solution is not necessarily to split the team or the services differently. Sometimes the right answer is to merge the services back into a coherent module with a clean public API and accept that the "microservice" goal was not appropriate for the domain.

The piece is also probably underweighting the cost of distributed transaction management. When a business operation needs to span what you have drawn as separate service boundaries, you are looking at eventual consistency, saga patterns, or two-phase commit, all of which add operational and cognitive overhead that a single service with a transaction boundary does not have.

**Key takeaways:**
- Most microservice architectures with tight coupling are distributed monoliths, not genuine service decompositions.
- Real business boundaries should be identified before splitting, using signals like independent deployability, data ownership, and team alignment.
- Chatty inter-service communication and shared data models are signs of boundary misalignment.
- Conway's Law is real: organizational and technical boundaries should reinforce each other.
- Distributed transactions add overhead that often exceeds the benefits of separation when boundaries are wrong.

**Why do I care:** This is a topic I care about precisely because the mistakes are expensive to fix. I have seen teams spend months migrating a working monolith into a distributed system that became harder to reason about, slower to deploy, and more expensive to operate, all in pursuit of a "microservices architecture" that did not match their actual domain structure or team size. The honest advice is: get the domain model right first, and let the service boundaries follow from that, not from the deployment diagram.

**Link:** [Stop Building Distributed Monoliths: How to Find Real Business Boundaries](https://daily.dev/posts/8jB22c0ll)
