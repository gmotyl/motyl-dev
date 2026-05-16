---
title: "Bun Rewrites Itself in Rust, Software Eats Itself, and Agents Get a Package Manager"
excerpt: "This week brought a jaw-dropping million-line codebase swap from Zig to Rust in Bun, a sharp essay on what AI abundance means for the software industry, and a handful of tools rethinking how agents and developers interact with code."
publishedAt: "2026-05-15"
slug: "bun-rewrites-rust-software-abundance-agent-tools"
hashtags: "#uidev #javascript #frontend #generated #en #bun #rust #agents #reactdata #cicd"
source_pattern: "ui.dev"
---

## Bun Goes Full Leeerroyyyy Jenkins: A Million-Line Zig-to-Rust Migration in Under a Week

**TLDR:** Jarred Sumner, the creator of Bun, merged a one-million-line pull request rewriting Bun's entire codebase from Zig to Rust just six days after opening the "experimental branch" he said probably would never ship. The migration passes Bun's existing test suite on all platforms, shrinks binary size by three to eight megabytes, and brings compiler-assisted memory safety tools that the team has needed badly.

**Summary:** So here is the thing about Bun: it has been suffering from memory leaks and unpredictable crashes that were notoriously difficult to chase down. Zig does not give you the same compile-time guarantees about memory safety that Rust does, and for a runtime that aims for full Node.js compatibility, those kinds of instability issues are reputation-killers. The decision to move was not impulsive; the motivation was real and practical.

What makes this story genuinely remarkable, though, is the speed. Vibe-coded, with substantial AI assistance from Anthropic models, Jarred spent less time on the branch than on a date. That sentence is now immortalized in the GitHub PR comments. I find it both alarming and oddly inspiring.

The reasons to believe this will actually hold up are worth taking seriously. Bun has an extensive compatibility test suite specifically because it targets Node.js parity, and those tests assert on observable behavior rather than implementation internals. That design decision turns out to be a massive advantage when you swap out an entire implementation. Additionally, both Zig and Rust compile through LLVM, which reduces the risk of surprising backend differences.

The PR itself is already in canary, the binary passes on all platforms, and follow-up cleanup PRs are already landing. This feels less like a reckless stunt and more like a calculated bet made with exceptional speed. Whether or not you think large AI-assisted migrations are wise practice, the fact that it mostly worked is going to be the story the industry retells for years.

**Key takeaways:**
- Bun's Zig-to-Rust migration was driven by memory leaks and debugging pain, not a preference for novelty
- The full million-line rewrite passed existing cross-platform tests and landed in canary in under a week
- Binary size shrinks by three to eight megabytes; memory bug tooling improves significantly
- Both Zig and Rust share the LLVM backend, which lowered the architectural risk of the port
- This sets a precedent: AI-assisted large-scale migrations are now demonstrably possible at a pace nobody expected

**Why do I care:** As someone who thinks about what modern runtimes are actually capable of, this migration matters more than the meme. Bun competes in a space where Node.js has decades of battle-hardening. Memory safety and stability are table stakes for enterprise adoption. Getting Rust's borrow checker as a guardrail on a project this size, this fast, is genuinely useful. My concern is about the governance signal it sends, not the technical outcome.

**Link:** [Rewrite Bun in Rust – Pull Request #30412](https://github.com/oven-sh/bun/pull/30412)

---

## Software Is Becoming Marketing

**TLDR:** Tereza Tizkova makes a sharp argument that AI-driven software abundance is doing to software engineering what the internet did to media: collapsing the middle class, compressing wages for average practitioners, and rewarding only those who combine technical skill with distribution, taste, or domain authority.

**Summary:** I want you to sit with Tereza's framing for a minute. She draws a parallel between mathematics and marketing to explain what happens to a profession when anyone can participate. Nobody argues with you about how you proved a lemma, because most people cannot even speak the language. But everyone will tell you what colors to put on your landing page, because they have eyes and opinions. Her argument is that software is crossing that threshold right now.

The economic model she describes is brutal in its clarity. Software that was hard to build had a natural moat: the difficulty itself. Now that a weekend vibe-coding session can produce a working SaaS alternative, the mid-tier product charging fifty dollars a month for something you could generate yourself has no story left to tell. She calls it the death of the "good enough" vendor, and the rise of the power law: mega aggregators at the top, millions of hyper-personal disposable apps at the bottom, and almost nothing sustainable in the middle.

Her take on services versus products is the part I find most provocative. The Sequoia observation that the next trillion-dollar company will be a software firm masquerading as a services firm hits differently when you map it onto frontend tooling. Selling the accounting software is a shrinking business. Closing the books, at software margins, is the new opportunity. The expert does not need to be on staff; they need to be the best at one judgment call, available to two hundred clients at once because AI handles everything else.

For people building frontend products today, the implication is uncomfortable: taste, distribution, and specialization matter more than raw implementation skill. The bullshitters will multiply, as she notes, but so will the premium on genuinely exceptional work. That is a hard truth to sit with, but it is probably correct.

**Key takeaways:**
- AI-generated software is collapsing the barrier to entry, which historically leads to compressed wages and increased external judgment of the work
- The middle class of software products, mid-priced tools with no network effects, is getting squeezed out
- A long tail of hyper-personal disposable apps is emerging, but they are personal utilities, not businesses
- Selling outcomes and judgment rather than software products is the viable path forward
- Specialists who combine technical depth with domain authority or distribution will command a premium

**Why do I care:** This essay is not just a market analysis; it is a career warning. Most frontend developers I know are solidly in the "competent at software and nothing else" category Tereza flags as the worst position to be in. The answer is not panic; it is intentionality. Pick a domain. Build a reputation. Have something to say that is not just "I can implement a design in React."

**Link:** [Software is becoming marketing](https://www.terezatizkova.com/writing/software-abundance)

---

## Automated npm Releases with GitHub Actions, Done Right

**TLDR:** Satyajit Sahoo wrote a thorough guide for wiring up GitHub Actions to automatically publish npm packages on every commit to main using release-it and npm's Trusted Publisher feature, with careful attention to the security considerations that most quick-start guides skip entirely.

**Summary:** Automated releases sound simple until you actually try to set one up securely. The naive version involves storing a long-lived npm token in your GitHub secrets, triggering on push to main, and hoping nobody compromised anything in the dependency chain. Sahoo's guide takes a more thoughtful approach by centering the npm Trusted Publisher feature, which uses OpenID Connect authentication instead of static tokens entirely.

The workflow structure he describes has two jobs, not one. The first job checks whether the triggering commit is itself a release commit produced by release-it. If it is, the second job does not run, which breaks the infinite loop that would otherwise occur. This is one of those details that seems obvious in retrospect but has bitten plenty of teams who tried to roll this themselves.

There is also a useful discussion of branch protection and when the default GITHUB_TOKEN is sufficient versus when you need a personal access token. Commits made by the default token do not trigger other workflows, which is either a feature or a bug depending on your setup. The guide covers both paths clearly.

The security considerations section at the end is worth reading even if you never implement the rest. Tips like pinning third-party actions to full-length commit SHAs instead of version tags, not using dependency caches in the release job, and treating workflow_run events as privileged are the kind of hard-won wisdom that does not make it into the official docs.

**Key takeaways:**
- npm Trusted Publisher via OIDC eliminates the need for long-lived npm tokens in GitHub Actions
- A two-job workflow structure with commit message inspection prevents infinite release loops
- Release is triggered by a successful run of the CI workflow, not directly on push
- Third-party actions should be pinned to full commit SHAs, not tags or branch names
- Dependency caches should be skipped in release jobs to prevent cache poisoning attacks

**Why do I care:** Automated releases are one of those things that improve developer quality of life dramatically but are set up badly surprisingly often. This guide represents a mature approach that accounts for supply chain security, not just convenience. If your team is still running releases manually or has a fragile token-based setup, this is a weekend project worth doing.

**Link:** [Automated release on GitHub Actions](https://satya164.page/posts/automated-release-on-github-actions)

---

## The One Weird Git Trick That Makes Coding Agents More Effective

**TLDR:** The Effect team shares a practical technique for dramatically improving how coding agents work with specialized libraries: vendor the library's source repository directly into your project as a git subtree, and instruct the agent to treat it as read-only reference material.

**Summary:** Here is something that sounds obvious once you hear it but is not how most teams are setting up their AI-assisted development workflows. Agents are substantially better at learning from source code than from documentation. Documentation explains what an API does; source code shows how it is actually used across thousands of real examples. When you give an agent documentation, it has fragments. When you give it source code, it has patterns.

The git subtree approach the Effect team recommends has meaningful advantages over the alternatives. Compared to web search and web fetch, it gives the agent stable, structured, locally-available code it can explore without hitting network latency or token-inefficient context fragmentation. Compared to relying on node_modules, it avoids the common case where installed packages contain compiled or flattened code that has had its useful structure removed. Compared to git submodules, subtrees do not require separate initialization and do not introduce the .gitmodules metadata layer.

The practical setup they describe is a repos/ directory at your project root, populated by running a single git subtree add command with the --squash flag to avoid importing the entire commit history of large projects. Updates pull from the same remote in a single squash commit, keeping things predictable. VSCode configuration then excludes this directory from search indexing and auto-import suggestions so it does not pollute the human developer experience.

The AGENTS.md integration piece completes the loop: you explicitly tell the agent which directories contain vendored reference material, how to use them, and critically that it should not edit or import from them. The suggestion to have the agent generate a project-local reference file for frequently-used modules is particularly good, since it creates a persistent artifact the agent can return to rather than rediscovering the same patterns repeatedly.

**Key takeaways:**
- Agents learn better from source code than documentation because source code contains usage patterns, not just API descriptions
- Git subtrees are preferable to submodules for this use case because they behave like ordinary directories with no special initialization
- The --squash flag on subtree add avoids importing thousands of commits from large external repositories
- VSCode settings should exclude the repos/ directory from search, file watching, and auto-import to protect the human developer workflow
- AGENTS.md should explicitly instruct the agent to treat vendored repos as read-only reference material, not editable code

**Why do I care:** I work with enough teams using Effect and other specialized TypeScript libraries that generate confusing or incorrect code from agents constantly. This technique directly addresses that problem by giving the agent actual ground truth to work from. The overhead of setting it up is genuinely low; the payoff in output quality for complex library usage is real.

**Link:** [The One Weird Git Trick That Makes Coding Agents More Effect-ive](https://effect.website/blog/the-one-weird-git-trick-that-makes-coding-agents-more-effect-ive/)

---

## Fate 1.0: A Data Framework Built for Async React From the Ground Up

**TLDR:** Christoph Nakazawa released fate 1.0, a React data framework that caches normalized objects instead of requests, composes declarative view requirements up to a single server fetch per screen, and now ships with live views via Server-Sent Events, Drizzle support, and garbage collection.

**Summary:** Most React data fetching today is still organized around requests. A component needs data, it fires a request, and managing consistency between those independently-fetching components becomes an exercise in careful cache invalidation and mutation patching. Fate takes a different starting point: instead of caching requests, it caches normalized objects, and instead of each component fetching independently, it composes what data is needed from the entire component tree and collapses it into a single request at the application root.

The programming model is centered on Views, which are co-located with components and declare a typed shape of what data each component needs. A PostCard component declares a PostView that says it needs the author, content, id, and title fields, with the author resolved through a nested UserView. These views compose automatically; at the root of the app, you pass the composed view structure to useRequest and fate handles fetching, suspension, and cache management. There are no imperative cache invalidation calls; mutations use React's native useActionState and React Actions, with optimistic updates specified declaratively alongside the mutation.

The 1.0 additions make fate considerably more production-ready. Live views work by swapping useView for useLiveView and calling live.update on the server side. Because the cache is normalized by object and type rather than by request, the SSE subscription system can update only the specific components that care about a changed object, without refetching entire queries. The Drizzle support and native HTTP transport mean you no longer need tRPC to adopt fate, which removes a significant adoption barrier for many codebases. The Vite plugin that automatically regenerates types when your server API changes replaces the manual code generation step from the initial release.

Garbage collection, inspired by Relay's approach, means mounted components retain their data and unmounted ones eventually release it. The default policy keeps data from the last ten released requests warm, which makes normal navigation feel instant without holding stale data forever.

**Key takeaways:**
- Fate caches normalized objects rather than requests, eliminating the need for imperative cache invalidation
- Views compose from leaf components up to a single root request per screen
- useLiveView and useLiveListView connect to Server-Sent Events with zero configuration changes beyond swapping the hook
- Drizzle support and a native HTTP transport remove the tRPC dependency for new adopters
- Garbage collection keeps recent navigation data warm while releasing older entries from memory

**Why do I care:** I have been watching the Relay model fail to get mainstream adoption for years, largely because of its tooling complexity. Fate is making a serious attempt at the same core insight, that normalized caching and declarative data composition lead to better applications, but with a much more approachable API. The Async React integration is forward-looking in the right way. I want to see how it holds up under real production conditions.

**Link:** [fate 1.0](https://fate.technology/posts/fate-1.0)

---

## Turso Kills Its Bug Bounty Program Because AI Slop Drowned It

**TLDR:** Turso, the team rewriting SQLite, is shutting down their $1,000 data corruption bug bounty because AI-generated low-quality submissions have consumed so much maintainer time that the program is no longer viable, a sign of a broader problem for open source projects with financial incentives attached.

**Summary:** This one is a bit grim, and I think it deserves honest attention. Turso runs a serious testing operation: native deterministic simulation, fuzzers, oracle-based differential testing against SQLite, a concurrency simulator, and extended runs on Antithesis. They started the bug bounty because they had confidence in their methodology and wanted to reward people who could find the gaps their automated systems missed. And for a while, it worked beautifully. The five individuals they paid were exceptional contributors; one of them found more than ten bugs in SQLite itself as a side effect.

Then the incentive structure collided with the slop machine. The dollar value attached to the program was just high enough to make it a target for people who point AI systems at codebases and tell them to find bugs. The AI outputs something, the slopmaker submits it, and now Turso's maintainers have to read it, understand it, engage with it, and explain why it is wrong. That process costs hours per submission. The slopmaker spent maybe a minute. Scaled up, that asymmetry is fatal.

The examples Turso shares are genuinely something. One submission involved manually injecting garbage bytes into the database header and then claiming the database was corrupted. Another claimed to have discovered a critical vulnerability allowing arbitrary SQL execution in a SQL database. A third modified the source code to add an out-of-bounds array access and then submitted the corruption that caused as evidence of a bug. These are not edge cases; they are the mode.

Turso tried a vouching system and auto-closing suspected bot submissions. The bots started opening issues questioning the closures and requesting manual review. The cycle repeated. Eventually, the math does not work.

**Key takeaways:**
- Turso's $1,000 data corruption bug bounty attracted massive AI-generated low-quality submission volume once AI tools matured
- The cost asymmetry is brutal: each submission costs maintainers hours; generating one costs a slopmaker minutes
- The program successfully rewarded five genuine contributors before the incentive landscape changed
- Vouching systems and auto-closure were insufficient once bots learned to appeal the closures
- Open source projects with financial incentives attached now need new governance models for this environment

**Why do I care:** This is not primarily a story about Turso; it is a story about open source sustainability in an era where the barrier to generating plausible-looking technical content has dropped to nearly zero. Every OSS project with any kind of financial incentive attached is going to face a version of this problem. The solutions are not obvious, and I do not think we have found them yet.

**Link:** [The Wonders of AI: We Are Retiring Our Bug Bounty Program](https://turso.tech/blog/the-wonders-of-ai)

---

## Rosie: An npm for AI Agent Skills

**TLDR:** Rosie is a new cross-platform package manager for AI agent skills, written in C with a WebAssembly fallback, that discovers SKILL.md files in GitHub repos, installs them into the right locations for Claude, Cursor, Opencode, and nine other agents, and maintains a lockfile for reproducible installs.

**Summary:** The agent skills ecosystem has been somewhat chaotic to navigate if you want to share or reuse skills across projects. Rosie is an attempt to bring the same package management discipline to agent skills that npm brought to JavaScript libraries, with a few interesting design choices worth noting.

First, the native implementation. Rosie is written in C and ships as a single small binary with no Node, Python, or JVM dependency. It also compiles to WebAssembly and ships that as the runtime for the npm package's JavaScript API, so you get the same behavior whether you are using the CLI or calling it programmatically from a build script. That is a thoughtful architecture for something that needs to work reliably across many different developer environments.

The lockfile design (.agents/rosie.lock) is deliberately simple: line-oriented, space-separated, diffs cleanly. Each entry records the skill name, source, ref, SHA, and whether it was pinned or auto-resolved. The distinction between pinned and auto entries maps directly onto how you installed: a specific ref means the ref stays put on updates, just the SHA refreshes; no ref means rosie update advances to the latest semver tag. That is the same mental model npm developers already have for dependencies, which lowers the learning curve considerably.

The reference concept is worth understanding separately from skills. Where a skill is a directory with a SKILL.md that gets symlinked into agent-specific skill directories, a reference is a markdown document that gets appended to your project's AGENTS.md or CLAUDE.md as an indexed link. This is the model that Vercel's research found outperformed SKILL.md-style discovery in their evals, and Rosie supports both in the same tool.

**Key takeaways:**
- Rosie is a C-based package manager for agent skills, available as a native binary and as a WebAssembly-backed npm package
- It auto-detects twelve different coding agents and installs to their respective skill directories
- The lockfile is line-oriented and version-controlled, enabling reproducible installs across team environments
- References install markdown docs as indexed entries in AGENTS.md rather than as agent skill directories
- Skills can be scoped to specific agents, pinned to exact refs, or installed globally across all projects

**Why do I care:** The ecosystem for agent skills is still early and messy. Having a principled package manager with a lockfile and reproducible installs is a meaningful step toward treating agent configuration with the same rigor we apply to code dependencies. Whether Rosie becomes the standard or just a useful experiment, the design thinking here is pointing in a direction that matters.

**Link:** [rosie — a robot helper for agent skills](https://rosie.libs.technology/)
