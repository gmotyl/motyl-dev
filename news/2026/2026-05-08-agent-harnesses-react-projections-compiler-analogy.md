---
title: "Agent Harnesses, React Projections, and the Compiler Analogy: The Week AI Rewrote the Stack"
excerpt: "From Flue's programmable agent harnesses to Tanner Linsley's React projection experiment, this week's most interesting work is about what wraps the model, not the model itself."
publishedAt: "2026-05-08"
slug: "agent-harnesses-react-projections-compiler-analogy"
hashtags: "#uidev #react #typescript #agentai #webdev #generated #en"
source_pattern: "ui.dev"
---

## Flue: The Agent Harness Framework

**TLDR:** Flue is a new TypeScript framework that lets you build programmable agent harnesses, giving your AI agents a filesystem, a sandbox, memory, and session management out of the box. It compiles to an HTTP server or runs from the CLI, positioning itself as the open alternative to closed-off AI tooling platforms.

**Summary:** The formula is simple and the page states it directly: Agent equals Model plus Harness. That's the core idea behind Flue, and honestly it's the most clarifying thing I've read about agent architecture in months. Tools like Claude Code and Codex aren't powerful because the underlying models are magic. They're powerful because someone built serious infrastructure around those models, giving them a place to work, a way to remember things, a way to spawn subagents, and a way to adopt specific roles for specific tasks.

Flue tries to give developers that same infrastructure without forcing you to rent it from someone else. The framework ships with a virtual sandbox that requires zero configuration for local work, and it connects to remote sandboxes when you're ready to scale. You write your agent in TypeScript, define the skills it has access to, wire up memory and sessions, and Flue handles the rest. When you're done, it bundles everything into a deployable HTTP server or lets you run agents straight from the command line for CI pipelines and local tasks.

The pitch that resonates is the ownership argument. Off-the-shelf AI tools are built for the broadest possible audience, which means they don't fit your product, your data, your customers, or your specific workflows. Flue hands you the whole stack: agent, harness, sandbox. The example they show is building an AI issue triage system in 22 lines of TypeScript, replacing tools like Dosu, Greptile, and CodeRabbit.

What the page doesn't tell you is how Flue handles failure modes, what the security model for the virtual sandbox looks like in production, or how it compares when you're running hundreds of parallel agent sessions. That missing detail is exactly where frameworks like this prove themselves or fall apart.

**Key takeaways:**
- The agent harness is the real product; the model is a commodity you plug in
- Flue provides filesystem, sandbox, memory, and session management as first-class primitives
- It deploys as an HTTP server or runs from the CLI, making it flexible for both production and local workflows

**Why do I care:** As someone who thinks about developer tooling, the harness framing finally gives me clean language for what I've been building around AI for the past year. If you're assembling AI features on top of raw model APIs and wondering why everything feels fragile, the answer is usually that you haven't invested in the harness. Flue gives you a starting point, though I'd want to see it under production load before committing.

**Link:** [Flue: The Agent Harness Framework](https://flueframework.com/)

---

## GitHub: vercel-labs/just-bash: Bash for Agents

**TLDR:** Vercel Labs released just-bash, a package that provides a simulated bash environment with a virtual filesystem, designed specifically for agent workloads that need to run shell-style operations without touching the real system.

**Summary:** The premise is compact: give agents a bash-like interface that runs in a safe, virtualized environment instead of the host machine. The just-bash package lives in a monorepo alongside example consumers including a bash-agent example, a CommonJS consumer, and a website integration, which suggests this is already being put to practical use internally at Vercel.

The architecture is a simulated bash environment with a virtual filesystem, meaning an agent can create files, navigate directories, run commands, and observe outputs without any of that actually touching the real operating system. For agent-driven workflows, that isolation is the whole point. You want the agent to feel like it has a real shell, while you keep full control over what it can actually do and see.

The monorepo uses pnpm throughout, with separate build, test, and typecheck commands per package. There's also a WASM target for the just-bash package itself, which hints at the intent to run this in environments beyond Node, including browsers or edge runtimes.

What the README doesn't say is what the limits of the simulation are, which bash features are supported versus stubbed, and what happens when an agent tries to do something the virtual filesystem doesn't support. Those gaps matter a lot for real-world agent workloads.

**Key takeaways:**
- Simulated bash with a virtual filesystem lets agents work in a shell-like environment without real system access
- The WASM build target opens the door to running agent environments in browsers and edge runtimes
- Vercel Labs releasing this suggests it's connected to their broader agent infrastructure work

**Why do I care:** Sandboxed execution is one of the hardest parts of building agent systems that you'd actually trust in production. If just-bash delivers a reliable virtual shell that runs at the edge, it fills a genuine gap. I'd want to understand the fidelity of the simulation before betting a production agent pipeline on it.

**Link:** [GitHub: vercel-labs/just-bash](https://github.com/vercel-labs/just-bash)

---

## 16 Ways to Make a Small Language Model Think Bigger

**TLDR:** Oracle's agent-reasoning library wraps any Ollama-served model with 16 research-backed reasoning strategies, applied via a simple tag appended to the model name, no code changes required. Chain of Thought alone pushes a 9-billion-parameter model from 81% to 88% accuracy on mixed benchmarks.

**Summary:** Here's the number that stopped me: a 270-million-parameter model can solve the classic water jug puzzle reliably when wrapped in a Tree of Thoughts agent running breadth-first search, and fails confidently without it. The model itself didn't change. The architecture around it did. That's the whole thesis of this piece, and it's a good one.

The agent-reasoning library intercepts Ollama API calls by reading a plus-strategy tag appended to the model name. Call a model with plus-cot and the interceptor strips the tag, routes the request through a Chain of Thought agent, and returns the response. Your existing LangChain pipelines and web UIs require zero changes. You can also run it as a network proxy, pointing Ollama-compatible clients at a different port and getting reasoning transparently.

The sixteen strategies fall into four families. Sequential strategies like Chain of Thought and Least-to-Most handle problems with discrete steps. Branching strategies like Tree of Thoughts and Self-Consistency explore multiple reasoning paths and pick the best. Reflective strategies run draft-critique-refine loops. Cross-domain and meta strategies either transfer knowledge across domains or route queries automatically to the right strategy for the problem type.

The benchmark numbers are worth reading carefully, not just accepting. Chain of Thought wins on average across diverse tasks at 88.7% accuracy, while Tree of Thoughts and Self-Consistency tie on GSM8K math at 76.7%. ReAct dominates on factual and science tasks where tool use is available. But the benchmarks only cover 11 of the 16 strategies, because the remaining five are generation-focused and don't produce the kind of extractable answers that multiple-choice benchmarks measure. The author acknowledges this mismatch honestly, which is more than most benchmark writeups do.

The part the article avoids thinking about is latency. Tree of Thoughts is 5 to 8 times slower than Chain of Thought. In production, that's not a footnote, that's an architectural constraint that shapes which strategies you can actually use.

**Key takeaways:**
- Reasoning strategy selection matters as much as model size, often more
- Chain of Thought is the best default starting point: highest average accuracy, minimal latency overhead
- The plus-strategy tag pattern is a clever zero-friction adoption mechanism for existing pipelines

**Why do I care:** If you're building applications on smaller, cheaper, locally-served models, this is the most practical piece of research I've seen this year. The interceptor pattern means you can experiment with different reasoning strategies on real workloads without touching your application code. That's the right abstraction.

**Link:** [16 Ways to Make a Small Language Model Think Bigger](https://blogs.oracle.com/developers/16-ways-to-make-a-small-language-model-think-bigger)

---

## Projecting React

**TLDR:** Tanner Linsley built a minimal, AI-assisted React-compatible runtime called @tanstack/redact that is 80 to 85 percent smaller than standard React, 2 to 3 times faster for SSR, and currently running in production on two real sites. He's not marketing it; he built it to understand the shape of his own dependency.

**Summary:** The starting point is a frustration I recognize: React is 60 KB gzipped before a single line of your application runs. For TanStack Start, which already owns routing, state management, forms, and developer tooling through other packages in the ecosystem, that 60 KB felt wrong. The smallest thing you can't remove is also the largest thing on the wire.

Linsley tried Preact first and ran into the same problem everyone runs into: preact-compat has drifted far enough from React 19 that it's no longer a real drop-in. Use semantics, server action surfaces, portals, error boundaries, hydration edges, each one required a patch on top of a patch. He stopped after the fifth.

The conceptual shift came from a framing by Kyle Mathews: code used to be the source of truth because regenerating it was expensive. Flip that cost and the ideas become the base table; the code becomes one projection among many. React's public API, the element model, the hooks contract, Suspense semantics, the hydration lifecycle, is stable enough to project against. React-the-repo is one projection of that API, optimized for concurrent mode, time slicing, DevTools, RSC, and a long tail of DOM edge cases that TanStack Start doesn't share.

So he asked an AI agent to produce a different projection, scoped to exactly what TanStack Start needs. One day of prompting produced a nearly complete React surface: the fiber reconciler, keyed child diffing, host DOM mounting, the standard hook set, native event binding, Fragments, JSX runtime. The bugs that followed, reconciliation order issues, effect cleanup timing, deferred hydration edge cases, controlled inputs, SSR streaming buffer handling, each showed up only under real production traffic. Every fix was described to the agent and came back correct. The pattern was always: spot it in production, describe what you saw, get the fix.

The numbers are striking. Full client runtime including react-dom and the JSX runtime goes from about 60 KB gzipped to about 11.5 KB in the full preset or under 10 KB in the nano preset. SSR throughput goes from around 48 requests per second to around 168. Client navigation speed doubles. The one regression is LCP on RSC-heavy pages, where the Flight-streamed subtree adds latency versus React's battle-tested RSC client.

Linsley is explicit that he's not marketing this and won't be putting it into TanStack Start as a dependency. He built it to understand his own shape. But the conclusion he draws is uncomfortable: if projecting your dependencies down to your actual usage now takes days instead of months, then shipping the full general-purpose library is itself a decision you're making, not a default you're stuck with.

**Key takeaways:**
- AI-assisted code generation has made "project your dependency to your actual shape" a weekend project rather than a months-long engineering effort
- The size reduction is real and measurable: 80 to 85 percent smaller, 2 to 3 times faster for SSR, a third of the JavaScript on the wire for a simple blog
- The production bugs that emerged were identical to real React bug shapes, which means the projection is engineering, not a knockoff

**Why do I care:** This is the most consequential frontend architecture experiment I've read in a long time. The Linux distro analogy at the end lands correctly: we're moving toward a world where the dependency you use is the projection scoped to your consumer, not the upstream general-purpose library. The cost of owning that projection just dropped by orders of magnitude.

**Link:** [Projecting React](https://tannerlinsley.com/posts/projecting-react)

---

## The Self-Driving Codebase: Building Horizon at WorkOS

**TLDR:** WorkOS built an internal autonomous code factory called Horizon that responds to webhook events from Linear, GitHub, and Slack, spawns isolated cloud agent sessions, and drives implementation work end-to-end with humans reviewing pull requests rather than writing code. The compounding feedback loop is the real investment.

**Summary:** The problem Horizon is solving is one level above the problem most teams are thinking about. Most teams are asking "how do I use an AI agent to write code faster?" WorkOS is asking "how do we turn the entire software development loop, including deciding what to work on next, into an event-driven agent system?" The distinction matters.

The architecture is webhook-driven. A human writes product requirements in Linear, creates a project, and delegates it to Horizon's PM agent. The PM agent decomposes the project into issues with descriptions and blocking relationships. A human reviews those issues and moves them to In Progress to trigger the implementation loop. From there, the orchestrator picks up the Linear webhook, boots a cloud sandbox with the full development environment inside, and hands control to an agent session running inside OpenCode. Agents can work in semi-autonomous mode, producing an artifact from starting context, or interactively with a human in the loop.

The infrastructure story is interesting and honest. They started with GitHub Codespaces for rapid prototyping, hit the edges of what Codespaces supports for agentic workflows, and moved to Cloudflare Containers. The move gave them explicit egress controls through Workers, multiple sandbox flavors under a single control plane, and preview URLs that let agents communicate with each other across sandboxes. The custom MCP server stitches together Datadog logs, Sentry errors, and Slack conversations so agents have the same context a human engineer would reach for.

The self-improvement loop is the most interesting part. When Horizon runs and hits friction, a second agent ingests the session logs and writes up a targeted fix. A human reviews and merges it. The next run gets faster. What that means in practice is that Horizon's platform improvements are generated by Horizon itself, codified in AGENTS.md and CLAUDE.md, reviewed by humans, and fed back into the next run. That's a compounding loop, and it's working.

What the post is careful not to claim is full autonomy. Humans are always in the pull request review loop. The bottleneck, as they acknowledge, is frequently those humans. The honest question they're not fully addressing is: at what scale of agent velocity does human PR review become the binding constraint on the entire system?

**Key takeaways:**
- Webhook-driven orchestration turns the software development loop itself into an automatable event stream
- Custom MCP servers that stitch together internal context are the real leverage point for agent quality
- The separation between orchestrator and execution sandbox lets you scale each independently

**Why do I care:** The architectural patterns here are worth studying even if you're not building something at WorkOS scale. The event-driven orchestration model, the custom MCP server as a shared context surface, the separation of control plane from execution sandbox: these are transferable decisions. The part about dogfooding Horizon to improve Horizon is either the most interesting thing in the post or a recipe for compounding technical debt, and I'm genuinely unsure which.

**Link:** [The Self-Driving Codebase: Building Horizon at WorkOS](https://workos.com/blog/project-horizon)

---

## tsz: A TypeScript Compiler in Rust

**TLDR:** tsz is a Rust-based TypeScript type checker and language service targeting 2x the speed of tsgo, currently at 99.5% conformance on TypeScript's own test suite and nearly ready for production use.

**Summary:** The TypeScript compiler space is getting competitive in a way that would have seemed implausible two years ago. Microsoft released tsgo as the official Go-based rewrite of the TypeScript compiler, promising dramatically faster type checking. Now tsz shows up claiming to outperform tsgo by another factor of two, built in Rust across over a million lines of code spread across fourteen crates.

The conformance numbers are the most interesting part of the project status page. Language service behavior is at 100% conformance against TypeScript's own test suite. Type checking conformance is at 99.5%. JavaScript emit lands at 93.6% and declaration emit at 82%, which are the areas still in active development. The project is targeting TypeScript 6.0.3 as its reference version.

The claim of a "Sound Mode" for stricter type checking is worth noting separately. Standard TypeScript makes deliberate unsoundness tradeoffs for ergonomics. A sound mode that actually enforces the type system fully would be a meaningful capability for teams that want to use types as stronger guarantees rather than hints.

The benchmark shows tsz completing a representative suite in about 3 seconds versus tsgo's 6 seconds, a 2x improvement. What the page doesn't tell you is what the benchmark suite contains, what the hardware is, or how representative it is of real TypeScript projects. A 2x speedup on a synthetic benchmark and a 2x speedup on a 500,000-line production monorepo are different claims.

**Key takeaways:**
- A Rust-based TypeScript compiler at 99.5% conformance and 2x faster than tsgo is a credible near-future tool
- The Sound Mode for stricter type checking would differentiate tsz from both tsc and tsgo
- Declaration emit at 82% is the gap that matters most for library authors

**Why do I care:** TypeScript type checking speed is a real productivity bottleneck in large codebases, and tsz is the first competitor to tsgo that looks genuinely capable of replacing it. If the conformance numbers hold on real codebases, this is worth following closely. The LSP support in WebAssembly, once it ships, would make it deployable inside editors without a native binary, which is the practical unlock.

**Link:** [tsz: A TypeScript Compiler in Rust](https://tsz.dev/)

---

## React Doctor: Your Agent Writes Bad React. This Catches It.

**TLDR:** React Doctor is a CLI tool and lint plugin from Million.js that scans your React codebase and produces a 0 to 100 health score with actionable diagnostics across state management, performance, architecture, security, accessibility, and dead code. It also installs as context for your coding agent so it stops writing the bad patterns in the first place.

**Summary:** The premise is pointed and it doesn't apologize for it: coding agents write bad React. They produce patterns that work in isolation but accumulate into codebases that are slow, fragile, or hard to maintain. React Doctor is the feedback mechanism that catches those patterns before they compound.

Running it is one command at your project root. You get back a health score, a ranked list of issues grouped by category, and enough detail to act on each one. Scores above 75 are great, 50 to 74 need work, and below 50 is critical. The rules toggle automatically based on your detected framework and React version, so a Next.js project gets different checks than a Vite or React Native project.

The install-for-your-agent command is the part that changes the workflow. Rather than running React Doctor as a post-hoc audit, you teach your coding agent the rules upfront so it produces better React in the first place. It works with Claude Code, Cursor, Codex, OpenCode, and a list of over 50 other agents. The GitHub Actions integration posts findings as PR comments when a GitHub token is configured, which means the health check runs on every pull request with no manual step required.

The lint plugin ships for both oxlint and ESLint, so you can run the same rule set inside your existing lint pipeline. The configuration surface is thorough: you can silence individual rules, exclude files, create per-directory overrides, and merge your existing lint config automatically. The inline suppression syntax follows ESLint conventions closely enough that it won't feel foreign.

The leaderboard of publicly scanned repos is a nice touch. Seeing that excalidraw scores 69 and tldraw scores 76 gives you a real calibration point for what these numbers mean in practice.

**Key takeaways:**
- Teaching your agent the rules upfront produces better React than auditing afterward
- The GitHub Actions integration makes health scoring a standard part of the PR review process
- Framework-specific rule sets mean the diagnostics are relevant rather than generic

**Why do I care:** This is the right tool at the right time. As coding agents write more of the React in production codebases, the quality enforcement has to move into automated tooling. React Doctor puts that enforcement at the two points where it actually matters: before the agent writes the code, and before the PR gets merged.

**Link:** [GitHub: millionco/react-doctor](https://github.com/millionco/react-doctor)

---

## Datatype: A Variable Font That Turns Text Into Charts

**TLDR:** Datatype is an OpenType variable font that renders inline bar charts, sparklines, and pie charts using only CSS and a text expression syntax, with no JavaScript or rendering library required. It works anywhere text does.

**Summary:** This is one of those ideas that is so simple it makes you wonder why it took this long. Datatype uses OpenType ligature substitution, the same mechanism that turns arrow sequences into arrows in coding fonts, to convert text expressions into rendered charts. You type a curly brace expression describing a bar chart or sparkline, apply the Datatype font family to that span, and the font renders the chart. No JavaScript. No canvas. No SVG. Just text.

The syntax is minimal. Bar charts use values between curly braces prefixed with b, sparklines use l, and pie charts use p with a single percentage value. Each value represents a position from 0 to 100. Up to 20 data points per chart, variable width and weight axes for density and visual weight control, and it scales cleanly from 14px to 64px.

The "Datatype in context" section is the convincing part. Charts sitting inline within running prose, matching the surrounding typeface's metrics, work across serif, sans-serif, and monospace fonts. A stock watchlist with sparklines rendered entirely in font glyphs is genuinely useful. The medical records example and the server monitoring example show the range.

What Datatype doesn't solve is dynamic data. The syntax is static: you write the values into the HTML. For real-time dashboards you'd still need JavaScript to update the text expressions, which puts you back at the boundary of the trick. The use case is reports, documentation, and design contexts where the data is known at render time.

**Key takeaways:**
- OpenType ligature substitution can do real work: this is charts as typography, not as rendering
- Zero JavaScript dependency makes it viable in email, static HTML, and print stylesheets
- The variable font axes give you meaningful control over chart density and weight

**Why do I care:** As a typography nerd who also builds data-heavy interfaces, Datatype is delightful. The constraint that data must be static at render time is real but narrow. For documentation, changelogs, dashboards that update on page load, and anywhere you generate HTML server-side, this is a technique worth having in the toolkit.

**Link:** [Datatype: A Variable Font That Turns Text Into Charts](https://franktisellano.github.io/datatype/)

---

## Treat Agent Output Like Compiler Output

**TLDR:** The reason lights-out codebases feel scary is not the volume of AI-generated code; it's that we haven't built the equivalent of the compiler verification apparatus around agent output. The compiler analogy tells us exactly what we need to build.

**Summary:** Philip Su's post arguing that code reviews are headed toward being irresponsible under lights-out codebases is the jumping-off point here, but this piece goes somewhere more interesting than the original. The observation is that we don't review compiler output, and we never have. Not because we blindly trust compilers, compilers have had catastrophic bugs, but because we built an entire apparatus that makes reviewing the output unnecessary: type systems, reproducible builds, test suites, fuzzing, sanitizers.

We haven't built that apparatus for coding agents. And that's the actual problem, not the volume of output, not the speed of generation, not the model quality. The volume is a symptom. The symptom exposes the missing apparatus.

The compiler analogy is clarifying rather than reassuring. What it tells you is not "trust agents" but "here's what a mature pipeline looks like once you stop treating artifacts as things to be read and start treating them as things to be verified." You moved quality control upstream through type systems and formal specs, and downstream through testing, monitoring, and rollback. You eliminated the manual middle.

For agent output, the upstream layer means formal specifications that agents execute against, not just prompts. The verification layer means test infrastructure comprehensive enough to substitute for human code comprehension, plus AI-checks-AI pipelines as first-class CI. The downstream layer means production monitoring and rollback cultures mature enough to catch bad agent behavior fast. The article acknowledges none of these are fully built yet. That's not a reason to stop; it's a description of the engineering work ahead.

The uncomfortable edge is this: the engineers most resistant to lights-out codebases are often the same engineers who, if they could time-travel back, would resist the idea that you don't need to review your linker's output. The intuition feels protective. It's actually unfamiliarity with where the trust has been relocated.

**Key takeaways:**
- The verification apparatus, not human review, is what makes trusting compiler output reasonable; we need to build the equivalent for agents
- Upstream formal specs, comprehensive test infrastructure, and AI-checks-AI pipelines are the three gaps to close
- Hardware chip verification is the closest existing model: black-box components verified by acceptance tests rather than human review

**Why do I care:** This is the most honest framing of the agent trust problem I've read. It doesn't pretend the answer is "just trust the model" and it doesn't pretend the answer is "keep reviewing everything by hand." The answer is "build the infrastructure that makes trust warranted," and it's specific enough to act on. Every team building with coding agents should read this.

**Link:** [Treat Agent Output Like Compiler Output](https://skiplabs.io/blog/codegen_as_compiler)

---

## The Anatomy of an Agent Harness

**TLDR:** LangChain's Vivek Trivedy defines exactly what a harness is and derives each component from first principles, working backward from what models cannot do on their own. The model contains intelligence; the harness makes that intelligence useful.

**Summary:** Agent equals Model plus Harness. If you're not the model, you're the harness. That's the definition and it's a good one, clean enough to be useful and precise enough to generate real design decisions. The rest of the post earns that opener.

Models take in data and output text. That's it. They cannot maintain durable state across interactions, execute code, access real-time knowledge, or set up environments and install packages. Everything that makes an agent useful is harness-level work. The article traces each capability back to this observation and derives the harness component that provides it.

Filesystems come first because they're the most foundational: agents need a workspace, a way to offload information that doesn't fit in context, and a persistence layer that outlasts a single session. Git adds versioning to the filesystem so agents can track work and multiple agents can collaborate through a shared ledger. Bash comes next as the general-purpose tool, letting agents design their own tools on the fly rather than being constrained to a fixed set of pre-configured options.

The context management section is the most practically useful. The post introduces the concept of Context Rot: model performance degrades as the context window fills up. Compaction handles the critical moment when context is close to full, intelligently offloading and summarizing rather than erroring. Tool call offloading prevents large tool outputs from noisily cluttering context. Skills, as a progressive disclosure mechanism, prevent too many tools from being loaded at agent start, which itself degrades performance before any real work begins.

The long-horizon execution section connects everything. Long tasks require durable state, planning, observation, and verification across multiple context windows. The Ralph Loop, a harness pattern that intercepts an agent's exit attempt and reinjects the original prompt in a clean context window with the filesystem state intact, keeps work progressing beyond what any single context window can hold.

The honest conclusion is that some of what lives in harnesses today will get absorbed into models as they improve. But the argument that harnesses will therefore matter less over time doesn't fully account for the other direction: a well-configured environment with the right tools, durable state, and verification loops makes any model more effective regardless of its base intelligence.

**Key takeaways:**
- Every useful agent capability that models lack natively becomes a harness design problem to solve
- Context Rot is a real failure mode and compaction, tool call offloading, and progressive skill disclosure are concrete mitigations
- The Ralph Loop pattern for long-horizon autonomous execution is worth understanding and implementing

**Why do I care:** If you're building agent systems and feeling like every new capability requires reinventing something from scratch, this is the conceptual map you've been missing. The derived-from-first-principles structure makes each component feel inevitable rather than arbitrary. LangChain has obvious reasons to promote harness engineering, but the reasoning here is sound regardless of the source.

**Link:** [The Anatomy of an Agent Harness](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness)
