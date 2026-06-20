---
title: "Next.js for Agents, TypeScript 7.0 RC, React Router v8, and the Agent Framework Wars"
excerpt: "Vercel launches eve, an open-source agent framework that treats an agent like a directory of files, while TypeScript 7.0 RC arrives with a 10x speed boost from a Go rewrite."
publishedAt: "2026-06-19"
slug: "next-js-for-agents-typescript-7-rc-react-router-v8-agent-framework-wars"
hashtags: "#uidev #javascript #frontend #typescript #reactrouter #agents #deno #generated #en"
source_pattern: "ui.dev"
---

## Vercel Launches eve: The "Next.js for Agents" Framework

**TLDR:** Vercel released eve, an open-source agent framework that lets you define an agent's entire infrastructure as a directory of files — the same way Next.js turned a folder into a route. It ships with durable execution, sandboxes, human-in-the-loop approvals, evals, and multi-channel support all built in.

**Summary:** I've been watching the agent framework space for a while now, and Vercel's announcement of eve feels like the moment where things start to make sense — in the same way Next.js made web development feel structured after years of everyone rolling their own routing. The core premise is simple and honestly a bit obvious in retrospect: an agent is a directory. You define the model it runs on, give it an instructions markdown file as a system prompt, drop tools in a tools folder, add skills as markdown files, wire up channels like Slack or Discord, and set up schedules. The framework figures out the rest.

What really caught my attention is the durable execution story. Every conversation in eve is a durable workflow where each step is checkpointed. That means a session can pause, survive a crash or a deploy, and pick up exactly where it stopped. If you've ever lost state in a long-running agent loop because a server hiccuped, you know how painful that is. Vercel built this on their open-source Workflow SDK, and it underpins the whole thing.

The sandbox story is also solid. Any code an agent writes gets treated as untrusted and runs in an isolated environment — backed by Firecracker microVMs on Vercel, Docker locally. That's a real security boundary, not just a vibe. And the human-in-the-loop approval system is genuinely useful: any tool call can be flagged to require a person's approval before it executes, and the agent just waits — without consuming compute — until someone clicks approve.

Vercel is clearly using this to showcase their entire product suite: Workflows, Sandbox, Connect for OAuth, Cron Jobs, and their observability layer. That's a fair criticism, and the newsletter writers weren't wrong to note the business angle. But I'd push back on the cynicism — the framework itself has a coherent design, and the filesystem-first approach gives you something rare in the AI space right now: legibility. You can look at an agent directory and understand what it does without reading a wall of orchestration code. They're already running over a hundred agents internally on it, including d0, a data analyst agent that handles over 30,000 Slack questions per month.

**Key takeaways:**
- An eve agent is a directory: tools are TypeScript files, skills are markdown, channels are adapter files
- Durable sessions checkpoint every step so agents survive crashes and deploys
- Sandboxed compute keeps agent-generated code out of your application runtime
- Human-in-the-loop approvals pause the agent without consuming compute
- Evals are first-class: write scored test suites and wire them into CI
- Ships with Slack, Discord, GitHub, Teams, Telegram, and Linear channels out of the box
- Deploys like any other Vercel project — no separate infrastructure provisioning

**Why do I care:** From an architecture perspective, the filesystem-as-configuration pattern is doing something important here. It makes agent topology inspectable, diffable, and reviewable in pull requests — which is exactly what you want when agents are becoming production software that teams depend on. The fact that a prompt change or model swap goes through Git history and triggers an eval suite before it can hit production is the kind of discipline we should expect from any system that acts on real users' behalf.

**Link:** [Introducing eve](https://vercel.com/blog/introducing-eve)

---

## Flue 1.0 Beta: Cloudflare's Answer to the Agent Framework Question

**TLDR:** Flue, the agent framework from the creators of Astro, released its 1.0 Beta with a new autonomous Agents primitive alongside its existing Workflows, plus Channels, a React integration, and a durable execution story built on append-only event logs.

**Summary:** Right on cue after Vercel's eve announcement, Fred Schott and the Astro/Cloudflare team shipped Flue 1.0 Beta, and the timing couldn't be more pointed. Where Vercel leans into a filesystem-first configuration story, Flue leans into what I'd call the log-first philosophy: the source of truth is an append-only durable stream of every prompt, model response, and tool result. When a process dies, another picks up the log and continues. That's a battle-tested concept borrowed from databases and distributed systems, and it's a genuinely smart foundation for agent durability.

The big addition in 1.0 Beta is the Agent primitive. Flue originally launched with Workflows — deterministic, step-by-step orchestration where your code drives the model from start to finish. That's great for structured automation but limiting for anything open-ended. Agents flip that relationship: you define the context (model, tools, skills, sandbox, instructions), and the agent figures out how to solve the task on its own. The two primitives coexist, which gives you a useful mental model: Workflows for predictable pipelines, Agents for autonomous problem-solving. You can mix them.

The Channels feature is analogous to eve's channels — drop your agent into Slack, GitHub, Linear, or a custom surface with minimal boilerplate. And the new flue add command is my favorite detail here: instead of following a multi-step integration guide, you pass a markdown blueprint to your coding agent and it wires up the integration for you, adapting to your actual codebase. They're calling it "like shadcn, for your agents," and honestly that framing lands. The React integration via @flue/react gives you useFlueAgent and useFlueWorkflow hooks that stream live data into your components without you having to wire up any realtime plumbing.

The framework deploys to Cloudflare today, with multi-node horizontally scaled support planned before the stable 1.0 release. Given that Flue was born out of the Astro repo's internal AI tooling, it carries real production credibility.

**Key takeaways:**
- Agents primitive for autonomous problem-solving, distinct from deterministic Workflows
- Durable execution via append-only event log — processes can resume from any interruption
- Channels connect agents to Slack, GitHub, Linear with minimal boilerplate
- The flue add command uses your coding agent to intelligently wire up integrations
- React hooks via @flue/react stream live agent data without custom plumbing
- Built on Vite, targets Cloudflare with multi-node support coming before 1.0 stable
- Vue and Svelte adapters prototyped and in progress

**Why do I care:** The agent framework space is converging on the same set of primitives — durable execution, sandboxes, channels, evals — but the deployment targets and philosophy differ. Eve is Vercel-native; Flue is Cloudflare-native. That matters for teams already committed to one platform. What I find more interesting is the Flue team's choice of the log as the core abstraction. It's a design decision that scales better for debugging, replay, and audit trails than a simple checkpoint-and-resume model.

**Link:** [Flue 1.0 Beta](https://flueframework.com/blog/flue-1-0-beta/)

---

## TypeScript 7.0 RC: The Go Rewrite Lands

**TLDR:** TypeScript 7.0 Release Candidate is out, built on a complete port of the TypeScript compiler from TypeScript-compiled-to-JavaScript over to Go, delivering roughly 10x faster builds through native code speed and shared memory parallelism.

**Summary:** Let me be direct: TypeScript 7.0 is not a feature release. It's an infrastructure release, and it might be the most impactful thing the TypeScript team has shipped in years. The entire codebase was ported — not rewritten from scratch — from the existing TypeScript implementation over to Go. The porting was methodical, keeping the type-checking logic structurally identical to 6.0. So when you upgrade, you're not getting different semantics — you're getting the same semantics executed dramatically faster.

How fast? The team is reporting around 10x faster builds compared to TypeScript 6.0 on real codebases. Companies like Bloomberg, Canva, Figma, Google, Slack, Vercel, and others have been running pre-release builds on multi-million line codebases and reporting consistent speedups. The build time improvements aren't just theoretical. If you've worked on a large TypeScript monorepo where type-checking adds minutes to your CI, this is the release you've been waiting for.

The parallelism story is worth unpacking. Parsing and emitting can run independently across files, and TypeScript 7.0 does exactly that. Type-checking is more complex because of cross-file dependencies, so the team implemented a fixed pool of type-checker workers that each get their own view of the world, avoiding duplicated work while still parallelizing. You can tune this with the new --checkers and --builders flags. The watch mode was also rebuilt on top of a port of Parcel's file watcher, moving away from expensive polling to efficient native file system events.

On compatibility: any code that compiles cleanly under TypeScript 6.0 should produce identical results in 7.0. The RC adopts 6.0's new defaults — strict on by default, module defaults to esnext — and drops support for some legacy configurations like target ES5, AMD/UMD/SystemJS modules, and moduleResolution: node. You'll want to read the breaking changes list before upgrading in a large project, but the migration from 6.x should be more of a mechanical checklist than a painful rewrite.

**Key takeaways:**
- 10x faster builds via a methodical port from TypeScript-to-JS to Go
- Shared memory parallelism for parsing, emitting, and type-checking
- Tune parallelism with --checkers and --builders flags
- Watch mode rebuilt on a port of Parcel's file watcher — no more expensive polling
- Type-checking semantics identical to TypeScript 6.0
- Strict mode is on by default; ES5 target, AMD/UMD/SystemJS, and moduleResolution: node are gone
- VS Code integration via the TypeScript Native Preview extension
- Side-by-side with 6.0 supported via the @typescript/typescript6 compatibility package

**Why do I care:** A 10x build speed improvement isn't just a nice-to-have — it changes the developer feedback loop in ways that compound. Faster type-checking means tighter iteration cycles, which means catching errors earlier, which means less time context-switching between writing code and waiting for the compiler. For teams running large TypeScript monorepos, this could shave meaningful time off every CI run. The fact that the team kept type-checking semantics identical is the right call — you want performance, not surprises.

**Link:** [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/)

---

## React Router v8: Boring on Purpose

**TLDR:** React Router v8 is out, and the team is proudly calling it a boring release — minimal breaking changes, all adoptable as future flags in v7, plus middleware, split route modules, lazy route discovery, and a move to ESM-only with Node 22 and React 19 as minimums.

**Summary:** I genuinely love when a mature library ships a release and the headline is "we tried to make this as boring as possible." That's not laziness — that's discipline. React Router v8 is the result of a team that's learned from years of painful major-version migrations and committed to a different approach: future flags, predictable upgrade paths, and a yearly major release cadence going forward.

Since v7, the team shipped over 40 releases, and v8 is really the graduation ceremony for all of those features: middleware, split route modules, Vite Environment API support, lazy route discovery, type-safe href, link masking, call-site revalidation, and more. If you were already on v7 and kept up with future flags, upgrading to v8 is essentially updating your peer dependencies and removing a few deprecated APIs. The biggest change might be the drop of react-router-dom, which was always just a compatibility shim from the v6 era.

The new baseline is Node 22.22.0, React 19.2.7, and Vite 7. React Router is now ESM-only, and the team is adopting a clear policy on LTS support: Active LTS versions get full support, and only the latest minor branch of Maintenance LTS versions is officially supported. That's a sensible approach that makes it easier to adopt new Node features without getting stuck supporting ancient runtime behavior.

Server Components support is still unstable but actively in progress. The team says they want to be sure about the APIs before committing, which is the right call. They also officially EOL'd React Router v6 and Remix v2 with this release, so if you're still on either of those, the migration path is now or never for security updates. And on the Remix side: Remix 3 beta is a separate thing now, aiming to be a truly full-stack zero-dependency JavaScript web framework — different enough from React Router that both projects can coexist with distinct identities.

**Key takeaways:**
- Minimum requirements: Node 22.22.0, React 19.2.7, Vite 7
- ESM-only module distribution going forward
- Middleware, split route modules, lazy route discovery, and type-safe href are now defaults
- react-router-dom is removed — use react-router and react-router/dom instead
- Yearly major release cadence adopted for predictability
- React Router v6 and Remix v2 are officially EOL
- RSC support is unstable but in active development
- Remix 3 is going in a different direction as a full-stack, zero-dependency framework

**Why do I care:** From a project management perspective, the commitment to boring major versions is exactly what large teams need. When a foundational routing library ships a major version, every app in a portfolio has to assess the upgrade cost. A predictable yearly cadence with future flags means that cost becomes a known, plannable thing rather than a fire drill. That's good engineering culture, and I'm glad to see it reflected in the release strategy.

**Link:** [React Router v8](https://remix.run/blog/react-router-v8)

---

## Deno Desktop: Build Desktop Apps Without Electron

**TLDR:** Deno is shipping deno desktop in v2.9, letting you turn any TypeScript file or web framework project into a redistributable native desktop app using the OS's own webview — a deliberate, petty alternative to Electron.

**Summary:** Ryan Dahl has never been shy about his opinions on Node.js — he built Deno as a correction to its original design — and deno desktop reads like the same energy applied to Electron. The pitch is straightforward: use web technology to build desktop apps, but without the bloat of bundling a full Chromium renderer in every binary. By default, deno desktop uses the operating system's own webview, which keeps binary sizes small. If you need identical rendering across macOS, Windows, and Linux, you can opt into a bundled CEF backend.

The framework auto-detection story is genuinely impressive. Point deno desktop at a Next.js, Astro, Fresh, Remix, Nuxt, SvelteKit, SolidStart, TanStack Start, or Vite SSR project, and it just works — running the production server in release mode and the dev server with hot reload during development. No code changes required to take an existing web project to the desktop. That's a meaningful promise, and if it holds up, it dramatically lowers the barrier to shipping a desktop version of a web app.

The other design decision I appreciate is in-process bindings instead of IPC. In Electron, communication between your main process and the renderer goes through a socket-based IPC layer. Deno desktop does this in-process, which eliminates the cross-process round-trip. Values still get encoded at the call boundary, but the overhead is much lower. The auto-update story ships built-in via binary-diff patches and a simple manifest file, and cross-compilation from a single machine to macOS, Windows, and Linux is supported out of the box.

This is still pre-stable, shipping in the canary build ahead of Deno 2.9, so the APIs may shift. But it's a clear statement of intent, and for teams already using Deno who want a desktop distribution story without reaching for a separate tool like Tauri or Electron, this is worth watching closely.

**Key takeaways:**
- Ships in Deno v2.9, currently in canary
- Uses the OS's native webview by default for small binaries; opt-in to CEF for consistent cross-platform rendering
- Auto-detects Next.js, Astro, Remix, SvelteKit, Nuxt, and other frameworks with no code changes
- In-process bindings instead of socket-based IPC for lower overhead
- Cross-compilation to macOS, Windows, and Linux from one machine
- Built-in auto-update via binary-diff patches and a latest.json manifest
- Full npm ecosystem available through Deno's Node compatibility layer

**Why do I care:** Desktop apps built on web stacks have always required a tradeoff: Electron gives you full control but ships a 100MB+ binary; Tauri is more efficient but requires a Rust toolchain. Deno desktop is trying to thread that needle with a small default footprint and native runtime support. For frontend developers who already live in TypeScript and want to ship a desktop tool, this is a genuinely interesting option — especially if you can take an existing web app and redistribute it as a desktop binary with no code changes.

**Link:** [Deno Desktop Apps](https://docs.deno.com/runtime/desktop/)

---

## pool: Poolside's Open-Source Coding Agent

**TLDR:** Poolside, an American AI company positioning itself as an open-source alternative in the coding agent space, released pool — a terminal-native coding agent that supports ACP (Agent Client Protocol) for editor integration, MCP for tool connections, and a non-interactive mode for CI pipelines.

**Summary:** The coding agent space is getting crowded fast, and pool is Poolside's entry into the open-source side of that market. It runs in your terminal as a standalone interactive application, but it's also designed to integrate into editors via the Agent Client Protocol, which is an emerging open standard for editor-to-agent communication. That means you can run pool as an ACP server inside Zed or JetBrains, or flip it around and use pool as an ACP client driving a different agent backend entirely — including Claude, Codex, or Gemini.

The permission model is one of the more thoughtful things about pool's design. By default it prompts for approval before every tool call, but you can switch to Accept edits (auto-approves file reads and writes), Allow all, or Plan mode, which lets the agent reason about changes without actually making them. Permission rules can be scoped at three levels — personal defaults, shared per-project settings, and local per-project settings that are gitignored — which is exactly the right way to handle the tension between automation convenience and safety in a shared codebase.

The MCP support means pool can connect to any Model Context Protocol server, giving it access to external tools and data sources beyond its built-in capabilities. And the non-interactive pool exec mode is particularly useful for CI pipelines and scripts — send a prompt, get a result, exit. No interactive session required. For American companies or teams with data residency requirements who want an open-source coding agent they can self-host, pool is worth evaluating.

**Key takeaways:**
- Runs in the terminal, as an ACP server inside editors, or as an ACP client driving other agents
- Default permission mode prompts before each tool call; configurable via Allow all, Accept edits, or Plan
- Permission rules scoped at user, shared project, and local project levels
- MCP support for connecting external tool servers
- pool exec for non-interactive CI and scripting use cases
- Supports AGENTS.md for reading project-specific context and instructions
- Open-source from Poolside, an American AI company

**Why do I care:** The ACP (Agent Client Protocol) angle is what I find most interesting here. If this protocol gets traction — and the fact that Claude, Codex, and Gemini already have ACP server implementations suggests it might — then editor integration becomes a standardized concern rather than a proprietary one. That's a better world for developers, even if it's not obviously great for any single company's moat.

**Link:** [pool on GitHub](https://github.com/poolsideai/pool)

---

## The State of AI Post-Training Agents: Claude Fable 5 Breaks Through

**TLDR:** A research report from Thoughtful Lab tests frontier models on a long-horizon post-training task and finds that Claude Fable 5 is the first model to reliably solve it — by discovering the underlying algorithm and generating high-quality training data programmatically rather than recycling weak model outputs.

**Summary:** This is a research paper summary rather than a product launch, but it's worth paying attention to if you care about where AI capabilities are heading. The task in question is FrogsGame, a long-horizon challenge where an agent is asked to improve a fixed base model — Qwen3-8B — to solve a puzzle. The agents can generate training data, call stronger models through an API, write helper scripts, and design their own reinforcement learning and supervised fine-tuning strategies. It's a proxy for the broader question: can frontier AI models do meaningful AI research?

The key finding is that previous generations of models, including Opus 4.8 and GPT-5.5, had the right high-level plan but failed in execution. The most common failure mode was generating low-quality supervised fine-tuning traces from the weak base model itself, then training on those traces — which amplifies noise instead of teaching the underlying reasoning. Opus 4.8 showed a roughly 3x improvement over earlier models, but still fell short. Fable 5 is a different story: it discovered that the right approach is to programmatically generate correct reasoning traces by narrating the outputs of a backtracking algorithm, train on those high-quality traces, and then apply reinforcement learning on top.

What makes this interesting from a research standpoint is the calibration data. The best Fable 5 run had self-evaluation overoptimism of only 1.2x — meaning the model's self-assessment was very close to its actual performance. Compare that to the best Opus 4.8 run, which had 4.9x overoptimism. Fable 5 also used almost the entire 20-hour time budget, generated three times more training data than Opus 4.8, and specifically addressed a known SFT weakness by injecting common errors into 5% of traces to teach recovery behavior.

The researchers are careful to note this is a toy task, but the lesson is real: the bottleneck in post-training agents isn't planning, it's research intuition — knowing when data is too weak to trust, when to use a stronger model, when an eval is misleading. Fable 5 appears to have made meaningful progress on that judgment layer.

**Key takeaways:**
- Fable 5 is the first model to reliably solve the FrogsGame post-training task
- Previous models failed by generating SFT traces from weak base model outputs; Fable 5 generates correct traces algorithmically
- Fable 5 calibration: 1.2x self-evaluation overoptimism vs 4.9x for Opus 4.8
- Used nearly the full 20-hour time budget; previous models gave up early
- Generated 3x more and more diverse training data than Opus 4.8
- Injected common errors into 5% of traces to teach recovery from mistakes
- Evaluation remains the biggest failure point across all models tested

**Why do I care:** If frontier models are getting better at the judgment calls that underpin AI research — when to trust data, how to design evaluation, when a training strategy is working — that changes the trajectory of AI capability improvement. It's not AGI, it's not recursive self-improvement in any alarming sense, but it is a signal that the models are getting meaningfully better at the meta-level skills that humans currently provide when training new models.

**Link:** [The State of AI: Post-Training Agents](https://www.thoughtfullab.com/the-state-of-ai-post-training-agents.html)
