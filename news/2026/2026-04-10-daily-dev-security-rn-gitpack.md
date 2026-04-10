---
title: "Supply Chain Attacks, Next.js DoS, React Native 0.85, and AI Git Tooling"
excerpt: "North Korean hackers poisoned 1,700 open source packages, a Next.js vulnerability enables DoS via RSC deserialization, React Native 0.85 lands a new animation backend, and gitpack brings AI to the full Git workflow."
publishedAt: "2026-04-10"
slug: "daily-dev-security-rn-gitpack"
hashtags: "#dailydev #security #react-native #nextjs #ai #devtools #open-source #generated #en"
source_pattern: "daily.dev"
---

## N. Korean Hackers Spread 1,700 Malicious Packages Across npm, PyPI, Go, Rust

**TLDR:** The Contagious Interview campaign, linked to North Korea, has published over 1,700 malicious packages across five ecosystems since January 2025. These packages impersonate legitimate developer tooling and quietly deliver second-stage malware payloads.

**Summary:** What started as a targeted attack campaign has scaled into something that should genuinely worry every developer who reaches for a package without thinking. The Contagious Interview group — tied to North Korean state actors — has now planted malicious packages across npm, PyPI, Go modules, Rust crates, and PHP's Packagist. That's five major ecosystems in one coordinated campaign, which is a first-of-its-kind expansion in terms of breadth.

The technique is not new, but the scale is. These packages are crafted to look like plausible, useful tools. They pass a quick glance in the registry. Some mimic popular packages with typosquatting, others fill a gap in a niche the attackers identified. Once installed, they act as loaders that phone home to fetch second-stage payloads — keeping the initial package clean enough to slip past basic static analysis.

What's particularly alarming is the Go ecosystem being targeted. Go module proxying through the official proxy.golang.org means there's a caching layer that can actually help, but it also means malicious packages may persist in caches longer than you'd expect after being reported. The PHP ecosystem inclusion is new too — historically PHP attacks have been more targeted, not carpet-bombing the registry.

The practical implication here is that no ecosystem is safe anymore. The assumption that "npm is risky, but Go modules are fine because they come from source" is officially dead. And if you're running CI pipelines that pull packages without lockfiles or integrity checks, you are trusting a registry that is actively being gamed.

**Key takeaways:**
- Five ecosystems targeted simultaneously: npm, PyPI, Go, Rust/Crates.io, and PHP (Packagist)
- Over 1,700 malicious packages published since January 2025 as part of Contagious Interview campaign
- Packages use a loader pattern — initial code appears clean, second stage is fetched at runtime
- Lockfiles, supply chain security tools (like Socket.dev or npm audit), and SBOM generation are no longer optional hygiene items

**Why do I care:** This is the kind of thing that makes me want to re-examine every `package.json` I've touched in the past six months. As someone who works across multiple tech stacks, the expansion into Go and Rust specifically changes my mental model of risk. I've always told teams "use lockfiles, pin your dependencies, check the provenance." That advice stands stronger than ever. If your organization doesn't have automated supply chain scanning in CI, this story is your wake-up call. The attack surface is now every ecosystem, not just npm.

**Link:** [N. Korean Hackers Spread 1,700 Malicious Packages Across npm, PyPI, Go, Rust](https://app.daily.dev/posts/a2AwYAjaL)

---

## CVE-2026-23869: Next.js RSC Deserialization DoS

**TLDR:** A high-severity vulnerability in Next.js 13.x through 16.x lets attackers craft HTTP requests that trigger excessive CPU usage via RSC deserialization, causing denial of service. Vercel has deployed WAF mitigations, but you should patch.

**Summary:** CVE-2026-23869 has a CVSS score of 7.5 and targets React Server Components specifically in Next.js versions 13 through 16. The attack vector is straightforward: send a specially crafted HTTP request to any App Router Server Function endpoint. The RSC deserialization logic then spins up excessive CPU usage — essentially a resource exhaustion attack that doesn't require authentication.

The good news for Vercel-hosted apps is that WAF rules have already been deployed at the edge to block the attack pattern. The bad news is that anyone running Next.js on their own infrastructure — bare-metal, Kubernetes, other cloud providers — is currently exposed unless they've patched.

This is the kind of vulnerability that's particularly nasty for Server Functions that are publicly accessible. A single unauthenticated request can spike CPU to the point where legitimate traffic stops getting served. And because it's a deserialization flaw rather than code injection, there's no obvious user-facing indicator that you're being attacked until your server is unresponsive.

What's interesting here architecturally is that RSC is still relatively young as a production feature, and we're already seeing the first serious CVEs targeting the deserialization layer. This was predictable — any time you deserialize data that came over the network, you're opening an attack surface. The question of what version of this attack enables remote code execution rather than just DoS is one that security researchers will be actively investigating.

**Key takeaways:**
- Affects Next.js 13.x through 16.x using the App Router
- Unauthenticated HTTP request to any Server Function endpoint can trigger CPU exhaustion
- Vercel-hosted apps have WAF mitigations deployed; self-hosted apps need the patch
- CVSS 7.5 — high severity, patch immediately

**Why do I care:** If you're running Next.js with the App Router in production, this is a drop-everything-and-patch situation. I've seen teams delay patch cycles because "we're on Vercel so we're fine," but that's not a permanent solution — WAF rules can be bypassed, and edge mitigations aren't a substitute for a fixed runtime. Update your Next.js version today.

**Link:** [Summary of CVE-2026-23869](https://app.daily.dev/posts/AcID9BlWb)

---

## React Native 0.85: Shared Animation Backend and Flexbox with Native Driver

**TLDR:** React Native 0.85 introduces a Shared Animation Backend co-built with Software Mansion that unifies Animated and Reanimated, and finally allows animating Flexbox layout props via the native driver. TextInput also now surfaces selection data in onChange events.

**Summary:** React Native 0.85 is a release that's been quietly anticipated by anyone who's wrestled with animation performance. The headline change is the Shared Animation Backend, which was built in collaboration with Software Mansion — the team behind Reanimated. This new backend is the foundation that both the built-in Animated API and Reanimated now share, which is a big deal because it means the two systems can finally talk to each other without the performance cliffs you'd hit at the boundaries.

The more practical improvement is that you can now animate Flexbox and layout properties using the native driver. Previously, if you wanted to animate something like `flex`, `flexDirection`, or other layout-affecting props, you were forced to do it on the JS thread — which meant jank, especially during heavy JS work. The native driver has supported transform and opacity animations for years, but layout props were explicitly excluded. That exclusion is now lifted for a meaningful subset of layout properties.

TextInput getting selection data in onChange events sounds small, but it closes a gap that's frustrated native text editing implementations for years. If you've ever tried to build a rich text editor or a cursor-aware autocomplete in React Native, you know the pain of not having synchronous selection state. This gives you position and length on every keystroke, which opens up new possibilities.

The Jest preset refactoring is the kind of housekeeping that doesn't get headlines but saves teams hours of debugging. React Native's testing setup has always been a bit fragile, and the new preset package centralizes that configuration.

**Key takeaways:**
- Shared Animation Backend unifies Animated and Reanimated under one native layer
- Flexbox layout props can now be animated via the native driver — a long-requested capability
- TextInput onChange now includes selection data (position + length)
- New Jest Preset Package simplifies test configuration

**Why do I care:** The Shared Animation Backend is the change I've been waiting for longest. Anyone building complex gesture-driven UIs in React Native has had to navigate the Animated vs. Reanimated divide and work around the performance boundaries. Having a unified backend means library authors can now build on a single foundation, and app developers don't have to mentally model two separate animation systems. The Flexbox native driver support is genuinely going to change how people build animated layouts.

**Link:** [New Animation Backend, TextInput Selection Data, New Jest Preset Package — React Native](https://reactnative.dev/blog/2026/04/08/react-native-0.85)

---

## gitpack: AI-Powered Git Packaging From the Terminal

**TLDR:** gitpack is an open-source CLI that takes the full Git workflow beyond commit message generation — it groups related changes into logical commits, flags risky areas, drafts PR summaries, and tracks review progress.

**Summary:** There are already dozens of tools that will write your commit message from a diff. gitpack is trying to solve the harder problem: the workflow around packaging work for review. It looks at your staged or unstaged changes and groups related file changes into logical commits — so if you've been working on three different concerns in a feature branch and forgot to separate them, gitpack tries to untangle that into coherent units of work.

The "flag risky areas" feature is the one I find most interesting. It analyzes changes to authentication code, database schemas, CI configuration, and other sensitive areas and surfaces those explicitly. It's not static analysis in the formal sense — it's more of a pattern-aware heuristic that says "you touched this auth middleware, that probably warrants a closer look in the PR description."

The PR summary drafting integrates into the workflow naturally. Instead of staring at a diff and writing a PR description from scratch, gitpack can draft one based on the logical grouping it identified. The review tracking piece — monitoring CI status and reviewer activity from the terminal — reduces the context switching between your editor and the GitHub web UI.

Where I'd push back: this is a tool that works best on codebases with clear module boundaries. If your changes are highly coupled or your files don't follow conventional naming patterns, the grouping heuristics may produce suggestions that miss the actual intent. Like any AI tooling, it's a collaborator, not an oracle.

**Key takeaways:**
- Groups related file changes into logical commits automatically
- Flags risky areas (auth, schema, CI) as part of the packaging process
- Drafts PR summaries from the logical commit structure it builds
- Tracks review progress (CI status, reviewers) from the terminal

**Why do I care:** The commit message problem has been solved. The harder problem — packaging work coherently for review — hasn't. I've spent more time than I care to admit figuring out how to split a sprawling feature branch into reviewable pieces. A tool that even partially automates that logical grouping is worth experimenting with. The risk flagging is a nice bonus for teams that want automated "did you think about security implications here?" prompts baked into the commit workflow.

**Link:** [GitHub - Arindam200/gitpack](https://github.com/Arindam200/gitpack)

---

## Handling Unreasonable AI Productivity Expectations

**TLDR:** A CTO consultant breaks down why comparing established engineering teams to small greenfield startups on AI productivity metrics is fundamentally flawed, and offers three frameworks for managing those conversations with leadership.

**Summary:** This piece resonated with me because I've had exactly these conversations with leadership teams since AI coding tools started generating headlines. The author's central argument is that expecting an existing team with an established codebase, years of accumulated technical debt, and complex integration requirements to match the output metrics of a two-person startup on a greenfield project is a category error. The comparison isn't just unfair, it's analytically wrong.

The three frameworks the author proposes center on context anchoring, relative baseline measurement, and expectation decomposition. Context anchoring means making explicit what constraints actually exist — legacy code, compliance requirements, cross-team dependencies — before any productivity comparison happens. Relative baseline measurement means measuring improvement against your own historical pace rather than against some idealized external benchmark. Expectation decomposition means breaking down "10x productivity" into specific, testable claims: does that mean 10x lines of code, 10x features, 10x fewer bugs, 10x faster deployment?

What the article avoids addressing directly, which I think deserves more attention, is the political dimension of these conversations. When a CEO comes to you with "I read that AI makes developers 4x faster," they're often not genuinely asking for a productivity analysis — they're looking for justification for a headcount decision they've already made. The frameworks are useful, but they assume good faith from the executive asking.

**Key takeaways:**
- Comparing established teams to greenfield startups on AI productivity is an apples-to-oranges error
- Measure improvement relative to your own baseline, not against external benchmarks
- Decompose "productivity" claims into specific, measurable sub-claims before engaging with them
- Contextual factors (legacy code, compliance, integration complexity) must be made explicit in any productivity conversation

**Why do I care:** Every team lead I know is currently navigating some version of this conversation. The AI productivity hype cycle has created executive expectations that don't map to the reality of maintaining production systems. Having a vocabulary for these conversations — the ability to say "this comparison is invalid for these specific reasons" — is a practical skill right now. The frameworks here are useful tools for that.

**Link:** [Handling Unreasonable Expectations](https://app.daily.dev/posts/xkgwMFzyY)
