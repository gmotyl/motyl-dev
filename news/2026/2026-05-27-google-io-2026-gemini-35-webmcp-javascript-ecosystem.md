---
title: "Google I/O 2026: Gemini 3.5, WebMCP, and the JavaScript Ecosystem Moving Fast"
excerpt: "Google I/O 2026 dropped a mountain of announcements, Deno 2.8 earned its 'biggest minor release ever' badge, React Server Components got a definitive architecture guide, and the JavaScript world keeps spinning."
publishedAt: "2026-05-27"
slug: "google-io-2026-gemini-35-webmcp-javascript-ecosystem"
hashtags: "#uidev #googleio #gemini #webdev #reactjs #deno #cloudflare #generated #en"
source_pattern: "ui.dev"
---

## Google I/O 2026: 100 Announcements, Five That Actually Matter

**TLDR:** Google dropped over 100 announcements at I/O 2026, but the signal-to-noise ratio is rough. Gemini 3.5 Flash, WebMCP, Managed Agents, Google Antigravity, and Stitch are the five things worth your attention as a frontend developer.

Every year Google I/O feels like being handed a Cheesecake Factory menu when all you wanted was a burger. This year they hit 100+ announcements, which is a lot of words for what boils down to one very clear message: Google is betting everything on agents. Not just AI features in products, but the whole development platform reoriented around agents as first-class citizens.

I keep thinking about Gemini 3.5 Flash specifically. It is positioned not as a smarter chatbot but as the model you wire into multi-step automated workflows. Google claims it outperforms Gemini 3.1 Pro on agentic benchmarks and costs less than half what other frontier models charge. Whether those benchmark numbers translate to your actual workloads is always the real question, but the direction is unambiguous: faster, cheaper, and built for action rather than conversation.

WebMCP is the one that caught me by surprise. It is a proposed open web standard that lets web pages expose structured tools, basically JavaScript functions and annotated HTML forms, to browser-based agents. Instead of an agent trying to figure out what a button does by reading the DOM like a confused tourist, your page tells the agent exactly what actions are available and what inputs they expect. That is genuinely clever, and it has the right instinct: give developers control over how agents interact with their UIs rather than leaving it to statistical guesswork. The standard is still experimental in Chrome, but it is worth watching.

Managed Agents in the Gemini API is the other thing I would not sleep on. A single API call provisions a remote Linux environment where an agent can reason, browse the web, execute code in a sandbox, and do long-running tasks. You are not orchestrating infrastructure, you are defining behavior in markdown files. That is a model for agent deployment that could genuinely reduce the barrier to building useful automated workflows.

**Key takeaways:**
- Gemini 3.5 Flash is the new default in the Gemini app and AI Mode in Search globally, built for agentic tasks at speed and lower cost than competing frontier models
- WebMCP is a proposed browser standard for exposing structured tools to agents, currently experimental in Chrome and landing in an origin trial in Chrome 149
- Managed Agents via the Gemini API let you deploy agentic workflows with a single API call, no infrastructure orchestration required
- Google Antigravity unified the CLI, SDK, desktop app, and agent harness into one platform, replacing the previous Gemini CLI

**Why do I care:** WebMCP is the announcement I will be revisiting in six months. If it gets traction, it changes how we think about building web UIs. Today we design for human users and hope agents can figure it out. WebMCP inverts that: you declare intent explicitly, which is just good engineering practice anyway. The rest of I/O is Google catching up to where the market already was, but WebMCP is actually forward-looking.

**Link:** [Bytes #490 - Google I/O 2026 - The Good Parts](https://bytes.dev/archives/490)

---

## Gemini 3.5 Flash: Frontier Speed for Agentic Work

**TLDR:** Google's Gemini 3.5 Flash is now generally available, claiming frontier-level performance at Flash-series speed with a particular focus on long-horizon agentic tasks and coding workflows.

Four times faster than other frontier models on output tokens per second is the headline claim, and Google backed it with benchmark numbers on Terminal-Bench and agentic evaluation datasets. The honest answer is that benchmarks tell you how a model performs on benchmark tasks, and your mileage will vary. But the real-world examples are more interesting: Macquarie Bank using it to reason over 100-page documents for customer onboarding, Shopify running subagents in parallel for merchant growth forecasting, Databricks diagnosing data pipeline issues with agentic workflows.

The part that matters most for developers is the Antigravity harness integration. When 3.5 Flash runs inside Antigravity, it gets subagent capabilities, meaning it can spawn and coordinate multiple agents working in parallel on different parts of a problem. The demo of it transforming a legacy codebase to Next.js using the Antigravity harness is the kind of thing that sounds like marketing until you realize the underlying mechanism is just good software architecture applied to model orchestration.

Google also says 3.5 Pro is coming next month, already deployed internally. So Flash is the performance tier and Pro is the quality tier, same naming convention they have used before. Given that Flash already outperforms 3.1 Pro on coding benchmarks, the question of when you actually need Pro becomes interesting.

The safety work is worth mentioning too. Gemini 3.5 was developed under Google's Frontier Safety Framework with strengthened cyber and CBRN safeguards, and they are using interpretability tools to check the model's inner reasoning before it responds. That is a meaningful engineering commitment, not just a marketing checkbox.

**Key takeaways:**
- Gemini 3.5 Flash is available now via Google Antigravity, the Gemini API, AI Studio, Android Studio, and the consumer Gemini app
- It outperforms Gemini 3.1 Pro on coding and agentic benchmarks while costing less than half the price of comparable frontier models
- Multi-agent subagent coordination via the Antigravity harness is the key capability for complex, long-running tasks
- Gemini 3.5 Pro is coming next month, already in internal use at Google

**Why do I care:** The cost argument is real. If you are building something that makes a lot of model calls, the price difference between frontier models adds up fast. Flash at frontier performance levels is a genuinely useful development, not just a spec-sheet improvement.

**Link:** [Gemini 3.5: frontier intelligence with action](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/)

---

## Deno 2.8: The Biggest Minor Release You Have Seen

**TLDR:** Deno 2.8 arrived with a pile of genuinely useful new subcommands, better workspace support, improved Node.js compatibility, and a package manager that now supports lifecycle scripts.

I love when a team leans into the joke. Deno called 2.8 their biggest minor release ever, and from what is in the changelog, that is not puffery. The new subcommands alone would justify a minor bump: deno audit fix automatically upgrades vulnerable npm packages to the nearest patched version, deno bump-version manages version fields across your deno.json or package.json with semver-aware commands, and deno init now has templates for starting new projects faster.

The workspace improvements are where I spent the most time reading. Deno's workspace support now handles monorepo setups more gracefully, and the package manager gained lifecycle scripts support, which was a meaningful gap for anyone trying to use Deno in projects that depend on npm packages with postinstall hooks. That was a real friction point, and it is good to see it addressed.

Node.js compatibility keeps getting better in small, meaningful ways. There are bug fixes across various Node.js built-in modules, and the overall compatibility story is now solid enough that most Node.js projects can run on Deno without significant changes. That was always the goal and they are very close to delivering it.

The deno compile improvements also caught my eye. Cross-compilation support has been extended, and the resulting binaries are smaller. For anyone distributing CLI tools, having a single binary you can cross-compile without a CI matrix for each target platform is a meaningful quality-of-life improvement.

**Key takeaways:**
- deno audit fix auto-patches vulnerable npm packages to the nearest safe version without requiring manual version pinning
- deno bump-version adds proper semver version management directly to the Deno CLI for both deno.json and package.json projects
- Package manager lifecycle scripts support closes a major compatibility gap with the npm ecosystem
- Cross-compilation improvements in deno compile make distributing single-binary CLI tools easier across target platforms

**Why do I care:** Deno keeps chipping away at the remaining friction points that would stop someone from choosing it over Node.js for a new project. Each minor release closes a gap. 2.8 closes several at once. If you dismissed Deno a year ago because of the npm compatibility story, it is worth another look.

**Link:** [Deno 2.8 | Deno](https://deno.com/blog/v2.8)

---

## Component Architecture for React Server Components: The Definitive Guide

**TLDR:** Aurora Scharff walks through the full evolution of React data fetching from useEffect to RSCs, making a clear case for why pages should be synchronous compositors and components should own their own server-side data fetching.

Here is the thing about this post: it actually answers the question. Most RSC content gives you the what but skips the why, or shows you isolated examples without addressing how this plays out across a real app with multiple pages, shared components, and loading states you actually care about. This one starts from the beginning and walks you through each step of the progression, with the tradeoffs made explicit.

The argument that resonates most with me is the coupling problem with loaders. When you fetch everything at the route boundary and pass it down, your components get welded to whichever loader happens to be providing their data. WhoToFollow works on the home page because the home page loader fetches it. Want to use WhoToFollow on a profile page? You write the same fetch call again, in the same shape, threaded through the same prop chain. RSCs break that coupling by letting each component fetch its own data on the server. The component is now portable.

The Suspense boundary placement section is where the post gets genuinely practical. The point is not that there is a formula for where to put boundaries. The point is that boundaries are how the page expresses what loading experience it wants to deliver. If you have three regions that can resolve independently and you wrap each in its own boundary, the user gets progressive disclosure. If you group slow things together behind one boundary, you get a more composed reveal. That is a design decision, and the page should own it, not the network.

The skeleton co-location pattern is something I immediately want to adopt. Exporting FeedSkeleton from the same file as Feed means that when you edit the component's layout, you are looking at the skeleton right there. Drift between the loading placeholder and the real component is one of the most common sources of layout jank in production apps, and it is completely avoidable if you just keep them together.

**Key takeaways:**
- Pages in an RSC architecture should be synchronous compositors that describe structure, with async data fetching pushed down into the components that use it
- React's cache() deduplicates repeated server-side data fetches within a single render, similar to what React Query's client-side cache does for hooks
- Suspense boundary placement is a design decision owned by the page, not a technical requirement determined by which components are async
- Co-locating skeletons with their components in the same file prevents drift between loading states and real content

**Why do I care:** This is the mental model shift that makes RSCs actually useful rather than just different. Once you internalize that pages compose and components fetch, the architecture becomes easier to reason about, easier to refactor, and much more natural to extend. Aurora's post is the clearest explanation of this I have seen.

**Link:** [Component Architecture for React Server Components | Aurora Scharff](https://aurorascharff.no/posts/component-architecture-for-react-server-components/)

---

## 16 Ways to Make a Small Language Model Think Bigger

**TLDR:** Oracle's agent-reasoning library wraps any Ollama model with 16 research-backed reasoning strategies, applied via a simple plus-sign suffix on the model name, no code changes required.

The core insight here is one I keep coming back to: much of the progress in applied AI right now is not coming from bigger models, it is coming from better orchestration. Take a 270M parameter model that fails at basic multi-step reasoning. Wrap it in a Tree of Thoughts agent running breadth-first search, and it solves the puzzle. The model weights did not change. The architecture around the call did.

The agent-reasoning library operationalizes this. You install it as an Ollama-compatible drop-in client, and then you change the model name string. gemma3:270m becomes gemma3:270m+cot for Chain of Thought, or gemma3:270m+tot for Tree of Thoughts, or gemma3:270m+meta if you want the library to pick the best strategy for your query automatically. Existing LangChain pipelines, web UIs, and scripts keep working because the library exposes the same Ollama API.

The benchmark results from March 2026 across 4,200 evaluations are useful for calibrating expectations. CoT wins overall at 88.7% average accuracy versus 81.3% for standard generation. Tree of Thoughts and Self-Consistency tie on GSM8K math. ReAct does best on factual and science tasks where it can use external tool calls. The branching strategies cost you 5-8x more in latency because they are making multiple model calls, so there is a real tradeoff to weigh.

The meta-strategy that automatically routes queries to the right approach is the most practical feature for most use cases. You do not have to think about which strategy fits your problem, and the library's routing is sensible: math goes to CoT, logic puzzles to Tree of Thoughts, controversial questions to Adversarial Debate, factual queries to ReAct. It is a reasonable starting point.

**Key takeaways:**
- The agent-reasoning library adds 16 reasoning strategies to any Ollama model via a plus-sign suffix in the model name, with no changes to existing code
- Chain of Thought achieves 88.7% average accuracy across math, logic, and reasoning benchmarks versus 81.3% for standard generation on the same model
- Branching strategies like Tree of Thoughts improve accuracy but cost 5-8x more in latency due to multiple model calls per query
- The MetaReasoningAgent automatically routes queries to the best strategy, making the library useful even without knowing which strategy to pick

**Why do I care:** Prompt structure alone can close a 7-point accuracy gap without touching model weights. That is worth knowing if you are building anything that relies on small or mid-size models for cost reasons. This library makes it easy to experiment with different approaches on real queries.

**Link:** [16 Ways to make a Small Language Model think bigger](https://blogs.oracle.com/developers/16-ways-to-make-a-small-language-model-think-bigger)

---

## Cloudsail: Self-Hosted Coding Agent Sandboxes on Cloudflare

**TLDR:** Cloudsail gives you instant isolated sandboxes for running coding agents on Cloudflare Workers, with GitHub integration, controlled egress, and credentials that stay out of the container.

The security model is the interesting part. When you run Codex or another agent in a Cloudsail sandbox, your GitHub token and OpenAI API key live in the Cloudflare Worker, not in the container. When the sandbox makes an approved outbound HTTP request to github.com or api.openai.com, the Worker injects the real credential at the edge. The container only sees a placeholder. Inside the shell, echo of the API key variable prints the placeholder, not your real key. Git push and OpenAI API calls still work because the Worker handles the injection transparently.

That is a legitimately clever approach to a real problem. Coding agents running in untrusted or semi-trusted environments routinely end up with credentials exposed in shell history, environment dumps, or log files. Keeping credentials at the Worker layer and injecting them per-request eliminates that attack surface.

The egress control is similarly well-designed. Sandboxes start with a sensible allowlist: GitHub, OpenAI, ChatGPT, npm registries. You can extend per project with cs allow. Mutating requests to project-added hosts are blocked; only GET, HEAD, and OPTIONS go through. That keeps the agent from doing something unexpected with newly allowed domains.

The lifecycle defaults are practical. Sandboxes sleep after three hours of idle time, costing roughly $0.17 per sandbox for that window. You can extend keepalive per sandbox, up to forever if you need a persistent environment. Cost transparency at this level of granularity is something most tools skip, and it is useful.

**Key takeaways:**
- Credentials live in the Cloudflare Worker and get injected at the edge per approved request, keeping API keys out of containers and shell history
- Egress is controlled by default with a sensible allowlist, and project-level additions allow only read requests to docs or research hosts
- Sandboxes sleep after three idle hours by default with an estimated cost of about $0.17, and keepalive is configurable per sandbox
- GitHub integration supports starting from a repo or pull request URL, with helpers for diff inspection, commit, push, and PR creation

**Why do I care:** Running coding agents locally is convenient until the agent does something unexpected with a credential or makes outbound requests you did not intend. Cloudsail addresses both problems with a model that keeps the agent in a box while still giving it the access it needs. Worth watching as agent-based development workflows mature.

**Link:** [GitHub - nkzw-tech/cloudsail](https://github.com/nkzw-tech/cloudsail)

---

## The Eternal Sloptember: A Skeptic's Case Against Coding Agents

**TLDR:** George Hotz (geohot) makes a pointed argument that AI agents cannot actually program in any meaningful sense, that the output is subtly broken in increasingly hard-to-detect ways, and that large organizations adopting them will hurt themselves more than high performers who know when to trust the output.

This is the kind of post you need to read even if you disagree with it, because the argument is specific rather than vague. Hotz is not saying AI is useless. He is saying agents specifically as software engineers are not close to the bar at any company he has worked at. He tried for six months, wrote parts of tinygrad with agents, reversed hardware with agents, and each time came away thinking he could have done it better and faster manually.

The observation about large organizations is the one I find hardest to dismiss. High performers have error-correction instincts. They read the output, they notice when something is wrong, they push back. The people producing ten-times output with agents at a large organization are not necessarily the high performers. The feedback loops are slower, the alignment is weaker, and the bottom of the distribution does not have the calibration to know when the agent's answer is wrong. What happens to the average quality of the organization's output in that scenario?

His model of what is actually broken is interesting: agents are sophisticated statistical models mimicking the distribution of programming. The output looks right because it matches the patterns. It fails in ways that are increasingly hard to detect precisely because the model is getting better at superficial correctness. Old proxies for quality like syntax and grammar are useless. The artifact can look completely fine until you try to build on it.

I do not fully agree with the conclusion that agents will never be able to program. But the warning about large organizations outsourcing judgment to the bottom of the distribution is a real risk that deserves more attention than it gets.

**Key takeaways:**
- Agents frontload progress but struggle with the polish and precision that distinguish working code from production-ready code
- Large organizations face more risk than high performers because slower feedback loops mean broken agent output propagates further before anyone catches it
- The failure mode is subtle: agent output looks correct on the surface but fails when you try to build on it in the way human-produced artifacts support
- Knowing when to use agents and when not to is the actual skill, not maximizing agent output indiscriminately

**Why do I care:** The industry narrative right now is overwhelmingly optimistic about agents. A grounded skeptic's field report from someone who actually tried it seriously for six months is valuable counterweight. Even if you think Hotz is wrong about the ceiling, the observation about organizational failure modes deserves a place in your mental model.

**Link:** [The Eternal Sloptember](https://geohot.github.io//blog/jekyll/update/2026/05/24/the-eternal-sloptember.html)

---

## Pico: A 400-Byte Router for Cloudflare Workers and Deno

**TLDR:** Yusuke Wada (the person behind Hono) built a tiny router using URLPattern that compresses to under 400 bytes and runs on Cloudflare Workers and Deno.

When the creator of Hono, one of the most popular edge framework options, builds a separate 400-byte router as a code golf exercise, you pay attention. Pico uses URLPattern, the browser-native URL matching API, to handle routing without reimplementing any URL parsing logic. GET, POST, path parameters with regex, query strings, custom status codes, executionContext for waitUntil, and environment variable access all work out of the box.

The API is deliberately minimal. You call Pico() to create a router, define routes with router.get(), router.post(), or router.on() for custom HTTP methods, then export the router as the default export for Cloudflare Workers or pass router.fetch to Deno's serve. That is the entire surface area.

This is experimental and the API might change, which Wada says explicitly. But the idea is worth paying attention to. If you are building something small on Cloudflare Workers or Deno where every byte of bundle size matters, or if you are just curious about what a URLPattern-based router feels like in practice, this is a clean minimal implementation to study.

The connection to Hono is worth noting. Hono is the full-featured version; Pico is the question of how far you can strip it down. Understanding both ends of the design space is useful when you are making architectural decisions about edge compute projects.

**Key takeaways:**
- Pico uses the native URLPattern API for URL matching, keeping the implementation tiny without reimplementing URL parsing
- Under 400 bytes compressed, it supports path parameters, regex patterns, query string access, custom HTTP methods, and Cloudflare Workers environment variables
- Currently experimental with an API that may change; both Cloudflare Workers and Deno are supported targets
- Created by the author of Hono as a code golf exercise in finding the minimal viable router surface area

**Why do I care:** URLPattern is underused. Most router implementations do their own URL parsing from scratch, which adds bytes and potential bugs. Building on the platform's native URL matching is the right instinct, and Pico demonstrates how far you can take it. Even if you never use Pico directly, reading the source is instructive.

**Link:** [GitHub - yusukebe/pico: Ultra-tiny router for Cloudflare Workers and Deno](https://github.com/yusukebe/pico)

---

## Full-Stack Observability for Next.js and Supabase

**TLDR:** A practical walkthrough of connecting Sentry to a Next.js plus Supabase stack for distributed tracing across the full request path, including N+1 query detection, log draining, and AI-assisted debugging with Sentry Seer.

The framing here is direct and honest: AI-assisted development has a specific failure mode where agents write working code with no observability built in. You end up with three different database connection strategies because the agent kept switching approaches, Deno edge functions that need their own Sentry configuration separate from your Node.js server, and N+1 queries that are invisible on a dev database with 40 rows but become ten-second queries in production with real data.

The technical setup is more nuanced than most guides acknowledge. Next.js runs in multiple runtimes: Node.js on the server, V8 in the browser, possibly edge runtimes. Supabase Edge Functions run in Deno. These need separate Sentry projects and separate SDK configurations, not because Sentry requires it but because the AI analysis features work within a project's context, and mixing runtimes makes that analysis noisier.

The Supabase integration for Sentry's SDK is the piece I had not seen documented clearly before. Adding the supabaseIntegration to your sentry.server.config.ts means every Supabase SDK call becomes a named span with timing data in your traces. Without it, you know an API route was slow but not which database query caused it. The log drain from Supabase's dashboard into a dedicated Sentry project gives you infrastructure logs correlated with application traces, so you can trace a slow page load from the Next.js frontend through an edge function into a specific Postgres query.

Seer's Autofix capability is the forward-looking piece. Connect your repo in Sentry project settings and new issues automatically get root cause analysis and optionally a draft PR with a suggested fix. Combined with the Supabase MCP exposing RLS policy issues, you can pipe security advisories into the same Sentry workflow as application errors and let the agentic loop handle triage.

**Key takeaways:**
- Supabase's built-in observability covers everything inside Supabase, but cannot trace from a specific user action in your Next.js frontend to the database query it triggered
- The Supabase Sentry integration turns every Supabase SDK call into a named span with timing data, turning "this route is slow" into "this specific query is slow"
- N+1 queries are detected automatically once instrumented, which matters because agents frequently write N+1 patterns that are invisible until production traffic scales up
- Seer's Autofix, with repo access configured, can generate draft PRs for new issues without you having to notice them first

**Why do I care:** The observation about agents writing unobservable code is the most practically important thing in this post. The next time you accept an agent-generated implementation, add instrumentation as part of the acceptance criteria. Otherwise you are shipping a black box and hoping nothing goes wrong.

**Link:** [Full-stack observability for Next.js + Supabase](https://blog.sentry.io/nextjs-supabase-observability/)
