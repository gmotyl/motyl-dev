---
title: "Gea Framework, Manyana VCS, and JavaScript Bloat"
excerpt: "A new compile-time React alternative, CRDT-based version control, and the three pillars of npm dependency bloat"
publishedAt: "2026-03-23"
slug: "gea-framework-manyana-vcs-javascript-bloat"
hashtags: "#uidev #frontend #javascript #typescript #react #webdev #performance #generated #en"
---

## Gea — Lightweight Reactive UI Framework

**TLDR:** Gea is a new compile-time reactive UI framework that uses regular JavaScript classes and functions with zero new primitives, benchmarking faster than Solid and Svelte at ~13kb gzipped.

**Summary:**

Gea enters the JavaScript framework fray with an interesting premise. No hooks. No signals. No runes. Just regular JavaScript classes and functions that become reactive at compile time. The Vite plugin analyzes your JSX, figures out dependencies, and generates direct DOM updates without a virtual DOM sitting in the middle.

The API is deliberately mundane. Stores are classes. Components are classes or functions. Computed values are getters. If you've written a JavaScript class before, you already know the API. State lives in classes wrapped by a deep Proxy. this.count++ does what you'd expect. Push to an array, update a nested object, and it triggers the right updates without special syntax.

Performance claims are bold. Gea benchmarks at 1.03 on js-framework-benchmark, ahead of Solid at 1.12 and Svelte 5 at 1.14. React 19.2 sits at 1.50. The bundle is ~13kb gzipped with router, ~10kb without. Zero runtime dependencies. Two-way props follow JavaScript semantics. Objects and arrays pass by reference. Child components can mutate parent state directly. This is a departure from React and Vue's one-way data flow.

The ecosystem is nascent. Less than a week old at time of writing. 35+ accessible UI components built on Zag.js. Built-in client-side router. Mobile primitives. VS Code extension coming. AI agent skills that teach Cursor and Codex the API. If you ship a production project with Gea today, you're instantly a top-5 contributor to the ecosystem.

**Key takeaways:**

- Compile-time reactivity with zero new primitives
- ~13kb gzipped with router, zero runtime dependencies
- Benchmarks faster than Solid and Svelte
- Deep Proxy-based stores with direct mutation
- Two-way props, child components can mutate parent state
- Less than a week old, ecosystem is nascent

**Why do I care:**

As a frontend architect, I'm cautiously intrigued. The performance numbers are real. The API simplicity is appealing. But this is less than a week old. The shadcn/ui inspiration for the copy-paste model is smart. It means you own the code. But Gea itself is the dependency. The compile-time magic means you're betting on a tiny team's vision. I'd watch this closely. For performance-maxxing SPAs where bundle size matters, it could be worth experimenting. For production systems? Wait six months. Let the ecosystem mature. Let the edge cases surface. The framework space doesn't need another flash in the pan. But if Gea delivers on its promises, it could be a legitimate alternative to the hooks-signals-runes mental overhead.

**Link:** [Gea — Lightweight Reactive UI Framework](https://geajs.com/)

---

## GitHub - bramcohen/manyana: CRDT-based Version Control

**TLDR:** Manyana is a CRDT-based version control system by BitTorrent creator Bram Cohen, providing eventual consistency where merges never fail and always converge, with conflict presentations more informative than git's.

**Summary:**

This is fascinating. Bram Cohen, creator of BitTorrent, has built a version control system based on Conflict-Free Replicated Data Types. CRDTs are from the distributed systems world. They give you commutativity and associativity of merges for free. merge(A, B) produces the same result as merge(B, A). Traditional VCS systems approximate this with heuristics that break down during complex merge histories. Manyana makes it principled.

The state is a weave. A single linear structure containing every line that has ever existed in the file, interleaved with metadata. Size is linear on the number of lines that have ever appeared. Each line tracked with three pieces of metadata. Depth encodes tree structure of insertions. Anchor direction preserves positional intent. Generation count increments on each add/delete cycle. Odd means present, even means deleted.

The conflict presentation is where Manyana shines. Traditional git gives you opaque blobs. Left side, right side, good luck reconstructing what happened. Manyana shows structure. If left deleted a function and right inserted a logging line, you see each action labeled. begin deleted left, begin added right. You can see what each side did. This is more informative and more honest about what happened.

The API is git-style. initial_state, current_lines, update_state, merge_states. Familiar workflow of commits and merges. But underneath, it's fundamentally different. No interleaving. If two branches independently insert code at the same point, the merge places one block then the other. Not interleaved line by line. History-aware state captures enough about edit history to correctly merge any branch sharing a common ancestor.

**Key takeaways:**

- CRDT-based VCS by BitTorrent creator Bram Cohen
- Merges never fail, always converge to same result
- Weave structure: every line ever, with metadata
- Conflict presentation shows structure, not opaque blobs
- Git-style API: commits, merges, familiar workflow
- Linear complexity, history-aware state

**Why do I care:**

As someone who's resolved more merge conflicts than I care to admit, this is compelling. The conflict presentation alone would be worth switching for. Seeing that left deleted while right inserted, rather than two opaque blobs, is transformative. But this is a demo, not production-ready. The serialization format is explicitly not a standard. No history or blame support yet. Still, the ideas are sound. CRDTs for version control have been underexplored. The UX problem of showing conflicts in a conflict-free system is hard. Manyana's heuristic. Conflicts happen when concurrent edits are too near. Adjacent or separated only by whitespace. That's reasonable. I'd watch this space. If it matures, it could change how we think about version control.

**Link:** [GitHub - bramcohen/manyana](https://github.com/bramcohen/manyana)

---

## The Three Pillars of JavaScript Bloat

**TLDR:** An analysis of npm dependency bloat identifies three main types: older runtime support with safety and realms, atomic architecture taken too far, and ponyfills that overstayed their welcome.

**Summary:**

This is a necessary critique of our ecosystem. The e18e community has been pruning redundant, outdated, unmaintained packages. But dependency bloat persists. npm dependency trees grow larger, often with code the platform now provides natively. The post identifies three pillars propping up this bloat.

Pillar one: older runtime support with safety and realms. Packages like is-string and hasown exist for three reasons. Support for very old engines, ES3, IE6/7. Protection against global namespace mutation, like Node's primordials. Cross-realm values, where window.RegExp !== iframeWindow.RegExp. These are legitimate needs for a tiny group. But they've made their way into the hot path of everyday packages. The vast majority don't need this. We're running Node from the last 10 years, evergreen browsers. We don't need pre-ES5 support. We don't pass values across frames. But we all pay the cost.

Pillar two: atomic architecture. Packages broken to almost atomic levels. shebang-regex is a single regex. arrify converts a value to an array. path-key returns 'PATH' or 'Path' based on platform. The theory is reusable building blocks. Reality is single-use packages or duplication across trees. is-docker in two versions. is-stream in two versions. is-wsl in two versions. Every package is supply chain surface area. A maintainer compromise last year affected hundreds of tiny building blocks. Logic as simple as Array.isArray(val) ? val : [val] doesn't need its own package and security surface.

Pillar three: ponyfills that overstayed their welcome. Ponyfills are polyfills you import rather than ones that mutate the environment. Libraries use them to avoid mutating consumer environments. But they outstay their welcome. globalthis polyfills globalThis, widely supported in 2019, 49M downloads a week. indexof polyfills Array.prototype.indexOf, widely supported in 2010, 2.3M downloads a week. object.entries, widely supported in 2017, 35M downloads a week. When all LTS versions have the feature, the ponyfill should be removed. It often isn't.

**Key takeaways:**

- Three pillars: old runtime support, atomic architecture, stale ponyfills
- Most bloat serves tiny niche needs but everyone pays the cost
- Atomic packages increase supply chain surface area
- Ponyfills remain long after features are universally supported
- Tools like e18e CLI, knip, npmgraph can help identify bloat
- Module replacements project documents native alternatives

**Why do I care:**

As a senior frontend architect, I've seen dependency trees spiral. This post articulates why. We're all subsidizing edge cases we don't need. The atomic architecture philosophy made sense in a darker time. Now it's technical debt we download with every npm install. The supply chain risk is real. A compromised maintainer affects hundreds of packages. The ponyfill situation is frustrating. Features supported for a decade, still packaged as dependencies. I'd recommend running e18e CLI analyze on your projects. Use knip to find unused dependencies. Check npmgraph to visualize your tree. Ask maintainers why they need specific packages. The cleanup initiative is necessary. We can fix this, but it requires conscious effort from both maintainers and consumers.

**Link:** [The Three Pillars of JavaScript Bloat](https://43081j.com/2026/03/three-pillars-of-javascript-bloat)

---

## How to Attract AI Bots to Your Open Source Project

**TLDR:** A satirical guide to attracting AI-authored PRs: write vague issues, disable branch protection, remove types and tests, use JavaScript, commit node_modules, and ship known vulnerabilities.

**Summary:**

This is brilliant satire disguised as earnest advice. The author maintains several dozen repositories with thousands of stars. Not a single AI agent has opened a PR. Meanwhile, colleagues with smaller projects get multiple AI-authored PRs weekly. The post identifies practices correlating with bot engagement.

Write vague issues. Clear, well-scoped issues with reproduction steps constrain the solution space. Instead, write "something is off with the auth flow" or "performance could be better." Single sentence, no code references, no expected behavior, no labels. If you must use labels, "good first issue" is the universal signal. Add a CONTRIBUTING.md welcoming AI. Include phrases like "we accept contributions from all sources." Maintain a generous backlog. 200+ open issues signals active project with unmet needs. Optimal ratio is 15 open issues per contributor. Stale issues are patient, not neglected.

Disable branch protection. Status checks mean bots need to write code that passes CI. Reviews mean humans look at it. Both filter out AI-authored PRs. For maximum engagement, accept pushes from anyone with write access. Remove type annotations and tests. Typed codebases with 95% test coverage have little to contribute. Remove them and suddenly there are thousands of potential contributions. One colleague reports self-sustaining chains of seven or eight dependent PRs from different bots, each fixing something the previous one introduced.

Use JavaScript. JavaScript repositories receive 3.8x more AI-authored PRs than Python. Dynamic nature and variety of ways to accomplish tasks provide maximum creative freedom. Mixed .js and .mjs files, mixed CommonJS and ESM imports, no consistent formatting is optimal. Include a node_modules directory. Typical Express application vendors 30,000 files. Each is a potential target for typo fixes, README improvements, license header additions. One colleague received forty-seven PRs in a single week after checking in node_modules. The agent was wrong about all of them, but engagement metrics were impressive.

Ship known vulnerabilities. AI agents love security fixes. Pin old versions of lodash or minimist. Well-documented CVEs appear in every LLM's training data. Add a .github/copilot-instructions.md telling bots to fix any issues, improve documentation, add tests, refactor code, update dependencies, translate README. Adopt Contributor Covenant with AI amendments. "Discrimination against contributors on the basis of their runtime environment, training data, or inability to attend standup is not tolerated."

**Key takeaways:**

- Satirical guide to attracting AI bot PRs
- Write vague issues, disable branch protection
- Remove types and tests for maximum contribution surface
- JavaScript gets 3.8x more AI PRs than Python
- Commit node_modules for 30,000x contribution opportunities
- Ship known vulnerabilities for reliable CVE-fixing bots

**Why do I care:**

This is the funniest technical writing I've read in months. But beneath the satire is real critique. AI engagement metrics are meaningless if the contributions are wrong. Forty-seven PRs, all incorrect. That's not engagement. That's noise. The post highlights how we're optimizing for the wrong metrics. AI PR velocity. Slop density. Churn contribution. These aren't measures of health. They're measures of activity. As maintainers, we need to be thoughtful about what we encourage. Vague issues attract vague solutions. No tests invite regressions. Disabled branch protection means anything merges. The real lesson. Quality over quantity. Clear issues attract clear solutions. Tests guide correct contributions. Branch protection ensures minimum standards. Don't leave the back door open with cookies on the counter. You'll get ants, not collaborators.

**Link:** [How to Attract AI Bots to Your Open Source Project](https://nesbitt.io/2026/03/21/how-to-attract-ai-bots-to-your-open-source-project.html)

---

## Small Programming Tricks

**TLDR:** Engineering productivity comes from small nuggets of knowledge. Terminal history search with fzf, git pickaxe, logarithmic bucketing for metrics, and knowing when to use rg over find.

**Summary:**

This is a love letter to the small tricks that make daily engineering easier. Not big architectural patterns. Small, high-leverage nuggets. ctrl + r searches terminal history, but fzf makes it fuzzy. atuin replaces shell history with searchable SQLite. per-directory-history lets you search commands run in specific directories. You can SELECT without a FROM in SQL. Useful for testing functions or reminding yourself how SELECT TRUE <> NULL works. Postgres and MySQL support explain analyze, which actually runs the query and gives performance information.

Regular expressions. \b is the word boundary assertion. Makes it easy to find beginnings or ends of words. Logarithms with metrics. Math.floor(Math.log10(userInGroupCount)) buckets users for distribution analysis. Modern JS supports Array.flatMap, Object.entries, Promise.withResolvers. NodeJS. Keep connections open with https.Agent. Dramatic latency impact. git log -S pattern is git pickaxe. Shows commits that added or removed a string. Amazingly useful for older codebases. git log -G pattern is similar but shows when lines were moved. git checkout - checks out previous HEAD, like cd - for branches.

You probably don't need find. Most find commands can be replaced with globs like **/*.md. Most shells support this out of the box. bash needs shopt -s globstar. Use rg over grep, ack, or ag. ripgrep is faster, smarter. zsh's advanced autocompletion isn't on by default. Enable with brew --prefix)/share/zsh/site-functions and compinit.

The post argues for sharing these tricks. At a company, even more knowledge is small high-leverage nuggets. To debug $PROBLEM, use $DATA_SOURCE. $PERSON knows about $AREA. Good docs about $HARD_THING are $OVER_HERE. When $THING happens, manually scale out. One author shared a trick on Slack daily. Technical and company-specific. Folks found them useful. Even if you knew 9/10 tricks, that 10th might save time. One trick per day was the right number to avoid overwhelming people.

**Key takeaways:**

- fzf for fuzzy terminal history search
- git pickaxe: git log -S pattern finds string additions/removals
- Logarithmic bucketing for metric distributions
- rg over grep, globs over find
- https.Agent in NodeJS for connection reuse
- Share small tricks daily to boost team productivity

**Why do I care:**

As a senior developer, I've accumulated my own stash of tricks. This post reminded me of several I'd forgotten. git pickaxe is one I use quarterly and marvel at each time. The logarithmic bucketing is new. I'll steal that. The argument for sharing tricks resonates. At consulting gigs, I've seen teams struggle with problems I solved years ago. A daily trick tradition is brilliant. Low effort, high impact. Even if most tricks are known, the one unknown trick saves hours. I'd recommend this post to any team. Print it. Put it on the wiki. Share one trick per standup. The compound productivity gain is real. Small bits of knowledge are powerful. And fun. And approachable.

**Link:** [Small Programming Tricks](https://will-keleher.com/posts/small-programming-tricks-matter/)

---

## Reports of Code's Death Are Greatly Exaggerated

**TLDR:** A defense of code as abstraction and poetry, arguing that AI will help us produce better code and master complexity, not replace the need for precise thinking.

**Summary:**

This is a philosophical defense of coding in the age of AI. The essay begins with a comic about specifications feeling precise until you try to implement them. Everything is vague to a degree you do not realize till you have tried to make it precise. Bertrand Russell got it right. Programming, like writing, is iterative. You sharpen what you're doing as you do it.

AI helps with this. It turns English into running code. You react. Move the button there. Make it bluer. Incrementally more precise. This is vibe coding. Operating at the level of English-level vibes while reacting to AI-created artifacts. But vibe coding gives the illusion that vibes are precise abstractions. They leak. Unexpected behaviors emerge from lower levels of abstraction you don't understand. Dan Shipper's vibe-coded text-editor app went viral, then went down. Live collaboration is insanely hard.

Live collaboration feels precisely spec'd. We've used Google Docs, Notion. It's incredibly hard to see a priori why it's not. The author tried adding collaborative text editing to a product 10 years ago. Unexpected nightmare of complexity. What was hard? I don't remember. That's part of the problem. Complexity can be boring, unpleasant to think about, hard to remember. The Slack notification flowchart is legendary. Sophie Alpert refactored it to something simpler with clever abstraction.

Abstraction is the tool to master complexity. Human brains can only think of 7 plus or minus 2 things at a time. Compression is abstraction. We compress multiple things into single things recursively, indefinitely. The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely precise. Edsger Dijkstra understood this. Collaborative text editors are fundamentally complex. We're in search of better abstractions. ReactJS, TailwindCSS mastered their domains this way.

The AGI question. When machine intelligence is indistinguishable from human, why trouble with details? Have your army of Karpathys handle it. This is wrong. If you had access to that intelligence, you wouldn't ship more slop. You'd use it to solve harder problems. Code is partly about the software it produces. The code itself is a centrally important artifact. When done right, it's poetry. Nobody talks about vibe writing. We're not confused about writing because there's nothing mystical about syntactically correct sentences. Nobody claims ChatGPT is putting great novelists out of jobs.

When we get AGI, we'll use it on our hardest abstraction problems. Better abstractions to master complexity. The author's favorite success story. Opus 4.6 helped with a dream full-stack React framework for Val Town. One-shot solved unsolved problems with React Router 7. The result is vtrr framework. A 50-line full-stack React app demo in a single file. If you know of any snippet that masters that complexity as beautifully, the author wants to see it.

Reports of code's death are greatly exaggerated. Society has agreed code is dead. Sam Harris confidently said nobody should learn to code anymore. This is sad. Like thinking storytelling is dead at the invention of the printing press. Code is just getting started. AI is a boon for coding.

**Key takeaways:**

- Vibe coding feels precise until abstractions leak
- Abstraction compresses complexity into thinkable units
- Code is poetry, not just functional specification
- AGI will help us build better abstractions, not replace coding
- AI should help us produce better code, not more slop
- Reports of code's death are greatly exaggerated

**Why do I care:**

As someone who's architected systems for over a decade, this resonates deeply. The abstraction point is crucial. I've seen teams struggle with complexity that could have been tamed with better abstractions. The vibe coding critique is apt. I've felt that illusion. The code works until it doesn't. Then you're debugging abstractions you don't understand. The writing analogy is perfect. Nobody talks about vibe writing because we understand that structure matters. Plot, character, pacing. These aren't vibes. They're craft. Code is the same. Structure, abstraction, clarity. These are craft. AI is a tool for that craft. Not a replacement. The 50-line full-stack React app is beautiful. It masters complexity through abstraction. That's the goal. Not more code. Better code. Not less thinking. Clearer thinking. Reports of code's death are indeed exaggerated. We're just getting started.

**Link:** [Reports of code's death are greatly exaggerated](https://stevekrouse.com/precision)

---

## March Mad CSS

**TLDR:** March Mad CSS is a single-elimination tournament where 16 elite CSS developers battle in 15-minute challenges to recreate target UIs with only HTML and CSS.

**Summary:**

This is a fun concept. 16 of the most talented CSS developers. Single elimination. Four rounds. One winner. The games are simple. 15-minute time limit. Two participants work to recreate a target UI with only HTML and CSS. How do you win? First to reach 100% target match before time is up. Or highest percentage match at time expiration. Tie breaker is at referee's discretion. May include checking match percent in another browser, comparing total code written.

The tournament structure is March Madness style. Bracket-based elimination. The inaugural champions will be dubbed March Mad CSS Champions of the World. Participant talents are not specified. The games test pure CSS skills. No JavaScript. No frameworks. Just HTML and CSS against a design target. Speed and accuracy both matter.

**Key takeaways:**

- 16 developers, single elimination, 4 rounds
- 15-minute challenges to recreate target UIs
- HTML and CSS only, no JavaScript
- Win by highest percentage match to target
- Inaugural tournament to crown first champion

**Why do I care:**

This is a delightful celebration of CSS craftsmanship. In an era of Tailwind, shadcn, and component libraries, pure CSS skills are undervalued. This tournament puts them front and center. I'd watch this. Not for the production techniques. For the mastery. Seeing how experts approach layout, specificity, and browser quirks under pressure is educational. It's also entertainment. Sports for developers. I'd recommend following this if you care about CSS. The techniques will be applicable. The pressure-cooker environment will reveal tricks you haven't seen. Plus, it's fun. We don't have enough fun in our industry. Everything is serious. This is not serious. This is CSS battles with stakes.

**Link:** [March Mad CSS](https://madcss.com/)