---
title: "EmDash: Cloudflare's Modern CMS Built by AI"
excerpt: "Cloudflare released EmDash, a TypeScript-based CMS powered by Astro and built by AI agents. It aims to modernize WordPress with better security, serverless infrastructure, and x402 micropayments."
publishedAt: "2026-04-07"
slug: "emdash-cloudflare-modern-cms-built-by-ai"
hashtags: "#uidev #cms #typescript #astro #security #ai-generated #en"
source_pattern: "ui.dev"
---

## EmDash: Cloudflare's Modern CMS Built by AI

**TLDR:** Cloudflare spent two months using AI agents to rebuild WordPress from scratch as EmDash, a serverless TypeScript CMS with sandboxed plugins and built-in payment support. It addresses WordPress' 24-year-old architecture while attempting to solve the plugin security crisis that affects 96% of WordPress installations.

## WordPress Gets a Modern Remake

WordPress powers over 40% of the internet and transformed publishing for millions. But it was designed in an era before AWS, serverless computing, and AI-powered development. Cloudflare saw an opportunity: what if you could build a modern successor that learned from WordPress's successes while fixing its fundamental problems?

That's EmDash. Built over two months by AI agents with occasional human nudging from Matt Kane and Matt Taylor, EmDash is written entirely in TypeScript and powered by Astro. The fact that Cloudflare named it EmDash is either brilliantly self-aware or completely tone-deaf, since the em dash has become synonymous with AI writing over the past few years.

The project addresses three specific problems with WordPress. First, WordPress plugins run with full database and filesystem access, which explains why 96% of WordPress security vulnerabilities originate from plugins. EmDash runs each plugin in its own V8 sandbox with declared permissions, similar to OAuth scopes. A plugin explicitly declares what it needs, and it can only do those things. Second, WordPress requires server management and scaling headaches. EmDash is serverless by default on Cloudflare's Workers, scaling to zero when idle. Third, WordPress has no built-in monetization beyond traditional ads. EmDash includes x402 support, which means you can charge for content access on a pay-per-use basis without any engineering work.

WordPres co-founder Matt Mullenweg offered measured criticism. He praised the sandboxing strategy as brilliant and suggested WordPress needs to copy it immediately. He also pointed out that the plugin security improvements only fully work on Cloudflare's infrastructure, making this somewhat of a vendor lock-in strategy dressed up as open source. He's not wrong, but that's also how Vercel operates with Next.js, and plenty of platforms benefit from that model.

## What Changed From WordPress

The technical differences matter. Structured JSON storage instead of HTML means better data integrity. The Node Particle Editor and improved theming system make it easier for developers already familiar with Astro. Import tools let you migrate existing WordPress sites in minutes, automatically handling custom post types and media.

The sandboxing is the real innovation. Instead of trusting every plugin author with database access, you define capabilities upfront. A plugin that sends emails declares `email:send` and `read:content` capabilities. That's all it gets. No surprise database queries, no silent network calls. The platform can even enforce rules like "this group of users can only install plugins that don't require network access."

## Why This Actually Matters

For developers tired of PHP and WordPress's architectural constraints, this is genuinely interesting. Astro is a solid foundation for content-driven sites. TypeScript everywhere removes the mental context switching. Serverless scales better for sparse traffic patterns. The sandboxing model is a real security improvement, even if it does tie you to Cloudflare for the full benefits.

But Mullenweg's skepticism deserves respect. EmDash isn't spiritually tied to WordPress's core mission of democratization. It's optimized for Cloudflare's infrastructure. The x402 integration assumes web agents will pay for content, which is speculative. And it's version 0.1, built quickly by AI that can hallucinate and miss edge cases.

The real test isn't whether it's better than WordPress in theory. It's whether teams actually adopt it and whether the AI-agent development model holds up as the codebase grows and needs maintenance.

## Key Takeaways

- Cloudflare used AI agents to rebuild WordPress in two months, shipping a serverless, TypeScript-based alternative called EmDash
- Sandboxed plugins with declared capabilities solve the plugin security crisis that affects 96% of WordPress sites
- Serverless-first architecture with x402 micropayments built in addresses modern web hosting and content monetization
- Works on any Node.js server but fully optimized for Cloudflare Workers, creating potential vendor lock-in

## Why Do I Care

This is a textbook example of how AI changes the economics of software development. Cloudflare didn't have to hire five senior engineers for a year. They shipped a credible CMS in weeks. That's powerful and disruptive. But it also means the codebase was built without the weight of hard architectural decisions that come from years of incremental choices. That's both a feature (clean slate, no baggage) and a risk (no battle-tested patterns, potential brittleness).

If you're building CMSes or content platforms, pay attention to how Cloudflare is using agents here. The sandboxing pattern is production-ready. The serverless approach is sound. Whether the AI-driven development holds up as complexity grows is the question every team using agents should be asking themselves.

**Link:** [Introducing EmDash — the spiritual successor to WordPress](https://blog.cloudflare.com/emdash-wordpress/)

---

## What Is the AI Agent Loop? The Core Architecture Behind Autonomous AI Systems

**TLDR:** The architectural difference between a chatbot and an AI agent is one pattern: the agent loop. It's an LLM invoking tools inside an iterative cycle, repeating until the task is complete. Every major AI company (OpenAI, Anthropic, Google, Microsoft, Meta) has converged on this same core pattern.

## From Chatbots to Agents

A chatbot answers one question. A user asks, the model generates a response, done. One input, one output, no state. That works for Q&A and summarization. It breaks immediately when you need something slightly more complex.

"Find me the three cheapest flights to Tokyo next month, check if my loyalty points cover any of them, and book the best option." A chatbot can't do this. It can answer questions about flights or explain loyalty points, but it can't execute a workflow. There's no mechanism to loop back, check results, and make decisions based on what it learned.

That's what the agent loop solves. At each iteration, the agent assembles available context, invokes an LLM to reason and select an action, executes that action (calling a tool), observes the outcome, and feeds the observation back into the next iteration. This repeats until the task is done or a stopping condition is reached.

The pattern is called ReAct (Reasoning + Acting), formalized by Princeton and Google researchers. The core insight is that models perform significantly better when they can reason, act, observe, and reason again. On ALFWorld it's a 34% improvement. On WebShop it's 10%. Single-pass responses aren't just architecturally limiting. They leave measurable performance on the table.

## The Five Stages

Every agent loop has the same structure. Perceive: the agent receives input (a message, an API response, an error, a previous action's result). Reason: the LLM processes everything in context and decides what to do next. Plan: for complex tasks, decompose the objective into subtasks. Act: execute something—a tool call, an API request, a database query, code execution. Observe: examine the result and decide whether the task is complete or the plan needs adjusting.

In pseudocode, it's six lines:

```
while not done:
    response = call_llm(messages)
    if response has tool_calls:
        results = execute_tools(response.tool_calls)
        messages.append(results)
    else:
        done = True
        return response
```

That's the entire pattern. Every major AI company has converged on it: OpenAI's Agents SDK, Anthropic's augmented LLM plus tools, Google's ReAct, Microsoft's Think-Act-Learn, Meta's agent loop via Llama Stack. The nomenclature differs. The execution pattern is identical.

## The Production Reality

Building an agent that works in a demo is one thing. Building one that works at scale is different. Two constraints dominate enterprise deployments.

Cost scales with iteration. Anthropic's internal data shows agents consume roughly 4x more tokens than standard chat. Multi-agent systems push that to approximately 15x. On thousands of agent sessions per day, token costs compound with every loop iteration. Mitigations exist: plan-and-execute patterns reduce LLM calls by planning upfront. Caching commonly retrieved tool results avoids redundant work. Token and cost budgets per agent run prevent runaway spending. But these controls must be designed in from the start, not added retroactively.

Observability is the other critical piece. A standard chat interaction produces one response from one LLM call. An agent running 15 iterations, calling 8 different tools, and branching across multiple reasoning paths produces a complex execution trace. When a failure occurs, diagnosing it requires structured visibility into every stage: what the model reasoned, which tool it invoked, what arguments it passed, what the result was, how it interpreted that result.

Every production agent system needs structured logging at every stage of the loop. Microsoft's AutoGen 0.4 builds on OpenTelemetry. LangChain's middleware hooks let you intercept and inspect every iteration. Stopping conditions are critical. Without them, agents can loop indefinitely, burning tokens and producing garbage. Maximum iteration limits, no-progress detection, and token budgets act as hard guardrails.

## Key Takeaways

- The agent loop is the fundamental pattern separating chatbots from autonomous AI systems
- Every major AI company (OpenAI, Anthropic, Google, Microsoft, Meta) has converged on this same core architecture despite different naming and SDK design
- Production agents consume approximately 4x more tokens than standard chat, and multi-agent systems can reach 15x, requiring cost controls built in from the start
- Observability and stopping conditions are critical for production deployments to prevent runaway loops and enable effective debugging

## Why Do I Care

If you're building anything agentic, this is the mental model you need. Not the specific SDK or framework, but the five-stage loop and the production constraints around it. The loop itself is stable and not changing. What's evolving is the infrastructure around it: context management, multi-loop coordination, and auditability.

The token cost scaling is the hidden tax you'll feel once you ship agents to real users. The observability problem is harder to solve after the fact. Start with cost budgets and structured logging from day one.

**Link:** [What Is the AI Agent Loop?](https://blogs.oracle.com/developers/what-is-the-ai-agent-loop-the-core-architecture-behind-autonomous-ai-systems)

---

## Making Turborepo 96% Faster With Agents, Sandboxes, and Humans

**TLDR:** Vercel's Anthony Shew spent 8 days optimizing Turborepo using AI agents, Vercel Sandboxes, and methodical engineering. The result: 81-91% faster task graph computation on real repositories, with some hitting 96% improvement. Time to First Task dropped from 8.1 seconds to 716 milliseconds on their largest monorepo.

## Starting With Unattended Agents

Shew started experimentally. He spun up 8 background AI agents, each targeting different parts of the Rust codebase suspected of being slow. The prompt was deliberately vague: "Look for a performance speedup. It has to be well-tested, and on our hot path. I'm particularly interested in our hashing code."

By morning, 3 of the 8 had produced shippable wins. PR #11872 reduced wall-clock time by 25% by reducing allocation pressure through reference-based hashing instead of cloning. PR #11874 replaced twox-hash with xxhash-rust, a faster hashing algorithm, for a 6% win. PR #11878 addressed an existing TODO by replacing Floyd-Warshall with depth-first search.

But the unattended approach also revealed limitations. Agents never realized they could benchmark the improvements on the Turborepo codebase itself (which dogfoods Turborepo). They hyperfixated on the first idea and forced it to work instead of backing up to think abstractly. They chased microbenchmarks that were meaningless in real-world performance. They never wrote regression tests. They never used the profiling flag.

The takeaway: unattended agents produce some wins, but not sustainable ones. Human involvement is required for testing, strategy, and verification.

## Making Profiling Useful for Agents

Shew took a profile using Turborepo's Chrome Tracing JSON format. But reading JSON flame graphs is slow, and LLMs struggle with it. He noticed a pattern: if something is poorly designed for humans to work with, it's probably poorly designed for agents too.

He built a new turbo-profile-md crate that generates a companion Markdown file alongside every trace. Hot functions sorted by self-time, call trees sorted by total-time, caller-callee relationships. All greppable, all on single lines.

The improvement was dramatic. Same model, same codebase, same data, different format. The profile data went from something only humans could sort through carefully to something both humans and agents could read at a glance.

## The Iterative Loop

With Markdown profiles, Shew settled into a rhythm. Put the agent in Plan Mode with instructions to find hotspots. Review the proposed optimizations and decide which were worth pursuing. Have the agent implement the ones you approved. Validate with end-to-end benchmarks. Make a PR. Repeat.

This loop produced over 20 performance PRs in four days. The wins fell into three categories. Parallelization: building the git index, walking the filesystem, parsing lockfiles, and loading package.json files were all sequential and could run concurrently. Allocation elimination: removing redundant copies and clones throughout the pipeline. Syscall reduction: batching per-package git subprocess calls into a single repo-wide index, then replacing git subprocesses with libgit2, then replacing libgit2 with gix-index.

One interesting pattern emerged. Shew's own source code became the agent's best feedback mechanism. When he pointed out a problem and fixed one instance, the agent would find more instances of the same pattern across the codebase. When he corrected a sloppy pattern, the agent stopped reproducing it in future conversations. Over time, the agent spontaneously wrote tests, created better abstractions, and produced higher-quality code. The codebase itself taught the agent.

## Hitting a Wall at 85%

By week's end, Turborepo was 85% faster. Shew had set an arbitrary goal of 95%. The remaining gains seemed within reach, but measurement became the problem. On his MacBook, hyperfine reports were increasingly noisy. As code gets faster, system noise matters more. Syscalls, memory, disk I/O all have variance. Were real improvements distinguishable from luck?

He needed a quieter lab. Vercel Sandboxes provided it. Ephemeral Linux containers with nothing but what you put in them. No background daemons, no Slack notifications, no background programs. The machine's resources are entirely focused on what you're running.

He wrote a bash script that automated the entire benchmarking workflow. Cross-compile Turborepo binaries for Linux. Create a Sandbox from a snapshot with test repos pre-loaded. Upload both binaries. Run hyperfine comparing them. Generate Markdown profiles for both. Download reports.

With clean signal from Sandbox, real breakthroughs became visible. Stack-allocated git OIDs (fixed-size stack-allocated types for SHA-1 hex strings instead of heap allocations) dropped new_from_gix_index self-time by 15%. Syscall elimination (removing redundant stat checks) dropped fetch self-time from 200.5ms to 129.6ms, a 35% reduction.

## Results

After eight days, Time to First Task on Vercel's largest repo dropped from 8.1 seconds to 716 milliseconds. On a 132-package repo, it went from 1.9s to 361ms. On a 6-package repo, from 676ms to 132ms. The variance in measurements also decreased dramatically, indicating more predictable performance.

Shew estimates this would have taken at least two months without agents. But he led the entire time, deciding what to profile, which proposals to pursue, when to change tools, when to change strategy. Agents didn't do the work. They amplified what one experienced engineer could accomplish in a concentrated week.

## Key Takeaways

- Unattended AI agents produce some wins but lack testing discipline and strategic thinking
- Profiling data matters more than the profiling tool; Markdown profiles were dramatically more useful to agents than JSON
- Your own source code is the best reinforcement learning for agents; fixed patterns propagate faster when the codebase demonstrates them
- Clean measurement environments (Vercel Sandboxes) revealed optimizations that were invisible on noisy local machines

## Why Do I Care

This is how you actually use agents effectively. It's not hands-off automation. It's strategic collaboration where the human directs, the agent executes, and the human validates and course-corrects. Shew didn't try to turn the entire optimization over to agents. He created feedback loops, profiling tools, and measurement infrastructure that made it easy for agents to produce correct suggestions.

The insight about profiling format is crucial. If your tools are designed only for human consumption, agents will struggle. Make your internal data formats greppable, greppable means agent-friendly.

**Link:** [Making Turborepo 96% faster](https://vercel.com/blog/making-turborepo-ninety-six-percent-faster-with-agents-sandboxes-and-humans)
