---
title: "ESLint 10 Drops, Halftone Shaders Get Wild, and Mitchell Hashimoto on AI Adoption"
excerpt: "A packed Bytes newsletter covering ESLint's major v10 release, beautiful halftone shader techniques, Mitchell Hashimoto's pragmatic AI journey, and a manifesto for real software engineering."
publishedAt: "2026-02-12"
slug: "eslint-10-halftone-shaders-ai-adoption-real-engineering"
hashtags: "#uidev #generated #en #eslint #shaders #glsl #ai #react #typescript #opensource #webdev"
---

## ESLint v10.0.0 Released

**TLDR:** ESLint ships its biggest major release in years, finally ripping out the legacy eslintrc system entirely, adding JSX reference tracking, and changing how config files are discovered in monorepos. If you are still clinging to `.eslintrc`, your time is officially up.

**Summary:**

Alright, friends, let us talk about ESLint 10. This is a big one. The kind of "go get a coffee before you start the migration" release. The headline is simple: the old eslintrc configuration system is gone. Not deprecated. Not hidden behind a flag. Gone. If you have `.eslintrc.js` files scattered across your projects, they are now decorative text files. The `ESLINT_USE_FLAT_CONFIG` environment variable? Ignored. The `--no-eslintrc` CLI flag? Removed. Even `/* eslint-env */` comments in your source code now throw errors. This is a clean break, and honestly, it has been telegraphed for long enough that nobody should be surprised.

The more interesting change, especially for monorepo folks, is how config file lookup works now. In v9, ESLint found your config starting from the current working directory. In v10, it starts from the directory of each linted file and walks upward. This means you can finally have multiple `eslint.config.*` files in different parts of your monorepo and they just work in a single run. No more hacking around with overrides or running ESLint multiple times. This alone is worth the upgrade for teams working in large codebases.

JSX reference tracking is another quiet but impactful fix. Before v10, if you imported a component and used it in JSX, ESLint's scope analysis did not actually see that as a reference. So `no-unused-vars` might tell you your `<Card>` import is unused even though you are rendering it right there in your JSX. That kind of false positive erodes trust in your tooling. Now JSX identifiers are tracked as proper references, which should eliminate a whole category of annoying lint warnings.

There are also nice quality-of-life improvements for plugin authors. The RuleTester API got beefed up with assertion options like `requireMessage`, `requireLocation`, and `requireData` that force test cases to be more rigorous. And Espree and ESLint Scope now ship their own TypeScript definitions, so you can drop the `@types/espree` and `@types/eslint-scope` packages.

What the article does not really address is the elephant in the room: migration friction for large organizations. The migration guide exists, and they say "most users should be able to upgrade without any build changes," but anyone who has done a major ESLint upgrade across a codebase with hundreds of contributors knows that "most" is doing heavy lifting in that sentence. The long tail of custom plugins, shared configs, and CI pipelines that reference eslintrc-specific flags is where the real work lives.

**Key takeaways:**
- The eslintrc configuration system is completely removed; flat config is the only option now
- Config file lookup starts from the linted file's directory, which is a game-changer for monorepos
- JSX reference tracking fixes false positives in `no-unused-vars` and similar rules
- RuleTester improvements enforce stricter, more reliable rule tests
- Node.js support drops everything below v20.19.0
- Espree and ESLint Scope now include built-in TypeScript definitions

**Tradeoffs:** The clean break from eslintrc trades backward compatibility for a simpler, more predictable configuration model. Teams that invested heavily in eslintrc-based tooling and shared configs face real migration costs, but the long-term payoff is a single, composable config system.

**Link:** [ESLint v10.0.0 released](https://eslint.org/blog/2026/02/eslint-v10.0.0-released/)

---

## Shades of Halftone

**TLDR:** Maxime Heckel delivers a masterclass on implementing halftone effects as GLSL shaders, going from basic dot grids all the way through CMYK color separation, Moire pattern mitigation, gooey blending, and animated displacement. This is one of those articles that makes you want to immediately open a code editor.

**Summary:**

This article is a joy. Maxime Heckel takes the humble halftone pattern, those dot grids you see in old newspapers and comic books, and systematically breaks down how to implement it as a real-time shader. And he does not stop at the basics. He goes deep, and every step of the way there are interactive demos you can play with.

The fundamentals are approachable. You start with a distance field to draw a circle in a fragment shader, use `fract()` to tile it into a grid, and you have dots. The clever part comes when you layer on a texture: you pixelate the underlying image to match your dot grid one-to-one, then modulate each dot's radius based on the pixel's luminance. Bright areas get small dots, dark areas get big dots, and your brain does the rest of the optical illusion. This is literally how newspaper printing works, and seeing it reconstructed in GLSL is deeply satisfying.

Where it gets genuinely advanced is the CMYK halftone section. Instead of one grid, you have four overlapping grids, one each for cyan, magenta, yellow, and black. Each grid is rotated at specific angles (15, 75, 0, and 45 degrees respectively) to minimize Moire interference patterns. The color math is fascinating too: RGB is additive (light adds up to white), but CMYK is subtractive (inks filter light, overlapping toward black). Heckel walks through the conversion from RGB to CMYK and the subtractive blending formula, and the results genuinely look like print.

The final sections on breaking the grid are where creativity explodes. By sampling neighboring cells in a 3x3 kernel instead of just the current cell, dots can grow beyond their cell boundaries without clipping. Add a smoothmin blending function and suddenly adjacent dots merge together like liquid ink drops. The animated variant, where a mouse trail displaces the dots with a swooping motion, is the kind of thing that makes you stare at your screen for ten minutes just moving your cursor around.

What I appreciate most is the modularity. Heckel builds each variant on top of the previous one, reusing the same core functions. What is missing from the article is any discussion of performance. These nested loops over 3x3 kernels, the multiple texture samples for CMYK, the smoothstep calls - on a complex 3D scene, what is the actual GPU cost? For a blog post with beautiful demos, that is forgivable, but if you are shipping this in production, you will want to profile it.

**Key takeaways:**
- Halftone is fundamentally a distance field plus a luminance-driven radius, tiled with `fract()`
- Pixelating the source texture to match the dot grid is essential for proper halftone sampling
- CMYK halftone requires rotating each color channel's grid at specific angles to minimize Moire patterns
- Breaking out of cell boundaries requires sampling a neighborhood kernel (3x3 or larger)
- Smoothmin blending creates organic, liquid-like dot merging
- All variants are built modularly on the same foundational shader code

**Link:** [Shades of Halftone](https://blog.maximeheckel.com/posts/shades-of-halftone/)

---

## My AI Adoption Journey

**TLDR:** Mitchell Hashimoto (creator of Vagrant, Terraform, and Ghostty) shares his measured, step-by-step journey from AI skeptic to productive AI user, offering a refreshingly grounded perspective that avoids both hype and dismissiveness.

**Summary:**

Mitchell Hashimoto is one of those engineers whose opinion I pay attention to because he has built real, widely-used software. So when he writes about AI adoption, the signal-to-noise ratio is high. His framework breaks down into six stages, and the honesty about each phase is what makes this valuable.

Stage one is blunt: stop using chatbots for serious coding. The copy-paste loop between a chat interface and your editor is inefficient, especially in brownfield projects where context matters enormously. You need an agent that can read files, run programs, and iterate in a loop. Stage two is where most people give up, but Hashimoto forced himself through it. He literally did every task twice: once manually, once with an agent. Excruciating, yes, but it built genuine expertise about what agents are good at and what they are not. The negative space, knowing when not to reach for an agent, turns out to be just as important as knowing when to use one.

The "end-of-day agents" pattern in stage three is clever. Instead of trying to be faster during your working hours, use the last 30 minutes to kick off agents that work during your off hours. Deep research, parallel exploration of vague ideas, issue triage. Not shipping code, but creating a "warm start" for the next morning. Stage four is about outsourcing the confident wins: tasks where you know the agent will produce a mostly-correct solution, running in the background while you do deep manual work on something else. His advice to turn off desktop notifications is gold. Do not let the agent interrupt your flow. Check on it during natural breaks.

Stage five, "harness engineering," is the most actionable insight. Every time an agent makes a mistake, invest in preventing that mistake from ever happening again. Sometimes that is an AGENTS.md update, sometimes it is building an actual tool. The compound effect of this over time is an agent that gets better and better at your specific codebase.

What I think Hashimoto is avoiding thinking about, and he touches on it only in a footnote, is the skill formation problem at scale. His framework works because he has twenty-plus years of experience and can evaluate agent output critically. He can tell when the agent laid the bricks wrong because he has laid them himself. The question he does not fully explore is: what happens when the next generation of engineers skips the brick-laying entirely? His approach works precisely because of the expertise he already possesses, and that expertise was formed through exactly the kind of manual work he is now delegating.

**Key takeaways:**
- Chatbots are useful but fundamentally limited for coding; agents with tool access are the minimum bar
- Force yourself to reproduce manual work with agents to build genuine expertise about their capabilities
- Use off-hours agent runs for research, exploration, and triage rather than trying to speed up active work
- Turn off agent notifications; you control when you context-switch, not the agent
- "Harness engineering" means investing in AGENTS.md and tools that prevent repeated agent mistakes
- Knowing when NOT to use an agent is as valuable as knowing when to use one

**Tradeoffs:** Delegating "slam dunk" tasks to agents frees you to focus on more interesting work, but you trade skill formation in those delegated areas. This is sustainable when you already have deep expertise, but the model may not transfer well to less experienced engineers.

**Link:** [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey)

---

## Vouch: A Community Trust Management System

**TLDR:** Mitchell Hashimoto releases Vouch, a system for managing contributor trust in open source projects through explicit vouching and denouncing, motivated by the flood of AI-generated low-quality contributions.

**Summary:**

Here is a tool born directly from the pain of maintaining a popular open source project in the age of AI-generated pull requests. Vouch is a community trust management system where trusted individuals explicitly vouch for others before those people can interact with a project. Think of it as a bouncer at the door of your GitHub repository.

The motivation is stated plainly: for twenty-plus years, the effort required to understand a codebase and submit a quality contribution was high enough to naturally filter out bad actors. That barrier has evaporated. AI tools let people generate plausible-looking but fundamentally low-quality contributions with no real understanding. So Hashimoto is proposing we move from implicit trust (the barrier of effort) to explicit trust (someone vouches for you).

The implementation is deliberately minimal. The vouch list is a flat file in a custom `.td` format (standing for "Trustdown") with one username per line. Denounced users get a `-` prefix. The CLI is a Nushell module, and GitHub integration comes via GitHub Actions that can check issue authors, check PR authors, and let collaborators vouch or denounce users through comments. The system supports a "web of trust" where projects can reference each other's vouch lists, so being trusted in one project can carry over to others.

What is worth questioning here is the social dynamics. Explicit vouching systems can create gatekeeping that excludes legitimate newcomers who simply do not know anyone in the community yet. Hashimoto acknowledges this by making the policies fully configurable (you can allow unvouched users and only block denounced ones), but the default incentive structure still favors insiders. There is also the question of what happens when a vouched person's behavior changes, or when the web of trust propagates a bad vouching decision across multiple projects. The system is experimental and Hashimoto says as much, but these are the failure modes worth watching.

**Key takeaways:**
- AI-generated contributions have broken the natural quality filter of "effort required to contribute"
- Vouch uses explicit trust lists stored in flat files, managed via CLI or GitHub Actions
- The web of trust feature lets projects share vouching decisions across the ecosystem
- The system is configurable: you can require vouching, or only block denounced users
- Currently experimental, in active use by the Ghostty project

**Tradeoffs:** Explicit trust management reduces low-quality contributions but risks creating insider gatekeeping that discourages genuine new contributors. The balance depends entirely on how each project configures its policies.

**Link:** [Vouch on GitHub](https://github.com/mitchellh/vouch)

---

## Software Engineering is Back

**TLDR:** Alain Di Chiappari argues that AI coding agents have made frameworks and their accumulated complexity obsolete, and that engineers should seize the opportunity to return to first-principles software design instead of operating within someone else's architecture.

**Summary:**

This is a manifesto, and a provocative one. Alain Di Chiappari's thesis is that AI-powered automated programming has eliminated the main justifications for the framework-heavy, abstraction-layered approach that has dominated web and application development. And he is not being gentle about it.

His argument breaks frameworks down into three purposes they serve. First, "simplification" in scare quotes, which he calls intellectual surrender: accepting someone else's architecture rather than designing your own. Second, automation of boilerplate, which he concedes is legitimate but argues is now handled better by AI agents. Third, and this is the sharp one, labor cost reduction. Frameworks let companies hire "React Developers" instead of "Software Engineers," turning engineers into interchangeable operators of someone else's system. This is not engineering, he says. This is operating.

The practical claim is that since December 2025, AI agents have matured enough that the boilerplate automation argument for frameworks has collapsed. He builds purpose-specific tools on the fly. He uses Makefiles instead of monorepo managers. He reaches for Bash, which he points out was born in 1989 and is known better by AI models than any human alive, as the universal adapter. The core message: stop paying the costs of framework lock-in (operational costs, design constraints, cognitive overhead) when the problem they solved (tedious manual coding) is now solved better by agents.

Now, let me push back a bit, because this argument has some blind spots. First, frameworks do not just automate boilerplate. They encode battle-tested patterns for security, accessibility, routing, state management, and a hundred other concerns that most solo developers would get wrong building from scratch. When Di Chiappari says "I can be the architect without laying every brick," he is speaking from twenty years of experience. A less experienced developer building everything from first principles with AI assistance is going to produce something that works on the happy path and falls apart at the edges. Second, the "labor cost" argument cuts both ways. Shared frameworks create shared vocabulary, which enables team collaboration. When every engineer builds their own bespoke system, onboarding costs explode. Third, the article completely ignores the maintenance story. That purpose-built tool you generated with an agent? Who maintains it in three years when the agent's context is gone and the code has no community, no documentation, no Stack Overflow answers?

That said, the core emotional truth here resonates. The JavaScript ecosystem in particular has a pathological relationship with complexity, and the idea that we can start peeling layers back because AI handles the tedium is genuinely exciting.

**Key takeaways:**
- AI agents have made framework-driven boilerplate automation less necessary
- Frameworks serve three purposes: simplification, automation, and labor cost reduction, and all three are being disrupted
- Simple, decades-old tools like Bash and Make are the most reliable foundation for AI-assisted development
- The author advocates building purpose-specific tools on the fly rather than adopting general-purpose frameworks
- Twenty years of experience is a prerequisite for making this approach work well

**Tradeoffs:** Abandoning frameworks for bespoke AI-generated solutions trades community-supported, battle-tested patterns for maximum design freedom. This works when you have deep expertise; it is dangerous when you do not. The maintenance and collaboration costs of fully custom architectures are real and unaddressed.

**Link:** [Software Engineering is Back](https://blog.alaindichiappari.dev/p/software-engineering-is-back)

---

## LiteBox: Microsoft's Security-Focused Library OS

**TLDR:** Microsoft open-sources LiteBox, a Rust-based sandboxing library OS that reduces host attack surface by providing a minimal interface between applications and the underlying platform, supporting scenarios from running Linux programs on Windows to SEV SNP confidential computing.

**Summary:**

This one is brief but worth noting. Microsoft has released LiteBox, a library OS designed around security. The concept is a "North-South" architecture: the "North" side provides a Rust-flavored, nix/rustix-inspired interface to applications, while the "South" side is a platform abstraction that connects to the actual host OS or hardware. The key value proposition is that by drastically cutting down the interface between application and host, you reduce attack surface.

The use cases are interesting in their breadth: running unmodified Linux programs on Windows, sandboxing Linux applications on Linux, running programs on top of AMD SEV SNP (confidential computing), and running OP-TEE trusted applications on Linux. This is clearly infrastructure-level work aimed at scenarios where isolation and security are paramount.

The project is early and explicitly warns that APIs may change. The MIT license and the Rust implementation make it accessible for experimentation, but if you need stability, they suggest waiting. What is missing here is any performance benchmarking or comparison with existing sandboxing approaches like gVisor, Firecracker, or Wasmtime. The "library OS" approach has a specific performance profile, and understanding where LiteBox sits relative to alternatives would make this much more actionable.

**Key takeaways:**
- LiteBox is a Rust-based library OS focused on minimizing the host interface for security
- The North-South architecture separates application-facing APIs from platform-specific implementations
- Supports diverse use cases from cross-platform execution to confidential computing
- Early stage, MIT licensed, APIs still evolving
- No performance data available yet for comparison with existing sandboxing solutions

**Link:** [LiteBox on GitHub](https://github.com/microsoft/litebox)