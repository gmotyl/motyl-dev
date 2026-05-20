---
title: "Claude Mythos, npm Supply Chain Attacks, CSS round(), and Browser Quirks Files"
excerpt: "Bytes #488 covers Anthropic's Project Glasswing and the Claude Mythos security model, a fresh wave of npm supply chain compromises, CSS round() for fluid sizing, and the hidden world of browser site-specific rendering quirks."
publishedAt: "2026-05-20"
slug: "claude-mythos-npm-supply-chain-css-round-browser-quirks-2026-05-20"
hashtags: "#uidev #javascript #security #css #ai #frontend #npm #agents #anthropic #performance #generated #en"
source_pattern: "ui.dev"
---

## Project Glasswing: Anthropic's Claude Mythos and the AI Security Threshold

**TLDR:** Anthropic has unveiled Project Glasswing, a cross-industry security initiative built around Claude Mythos Preview — an unreleased frontier model that has already found thousands of zero-day vulnerabilities across every major operating system and browser, including a 27-year-old flaw in OpenBSD and a 16-year-old vulnerability in FFmpeg.

There is a phrase in the Anthropic announcement that deserves to be read carefully: AI models have reached a level of coding capability where they can surpass all but the most skilled humans at finding and exploiting software vulnerabilities. This is not a marketing claim. The model found vulnerabilities that survived decades of human review and millions of automated security tests. The FFmpeg finding in particular — a 16-year-old bug in a line of code that automated testing had hit five million times — illustrates the gap between what statistical scanning catches and what a model capable of genuine reasoning can find.

The project brings together Amazon Web Services, Apple, Cisco, CrowdStrike, Google, JPMorganChase, Microsoft, NVIDIA, and Palo Alto Networks among others. The $100 million in usage credits and $4 million in direct open-source security donations are real commitments. The model has been made available to over 40 organizations maintaining critical infrastructure, with the framing that defenders need to get ahead of offensive use of these same capabilities before they proliferate beyond actors committed to deploying them safely.

Cloudflare's write-up of their experience testing Mythos Preview on their own repositories adds the concrete operational detail that the Anthropic announcement lacks. Two capabilities stood out. Exploit chain construction — the ability to take multiple low-severity bug primitives and reason about how to combine them into a working, higher-severity exploit — is what separates Mythos Preview from earlier models. Previous models would identify an interesting bug, write a thoughtful description, and stop. Mythos Preview chains them. The second is proof generation: the model writes code to trigger a suspected bug, compiles it, runs it, reads the failure if it fails, adjusts its hypothesis, and tries again. It closes the gap between "suspected flaw" and "confirmed exploitable vulnerability" autonomously.

Cloudflare is also honest about the operational challenges. Signal-to-noise is a real problem — the model tends to over-report, hedging findings with "possibly" and "potentially." Their solution was to build a multi-stage harness where an independent validator agent re-reads code and tries to disprove the original finding using a different prompt. Putting two agents in deliberate disagreement proves more effective than asking one agent to check its own work. The architecture insight is that vulnerability research is narrow and parallel by nature — many focused hypotheses against specific attack classes and scopes — while generic coding agents are built for a single sequential stream of work. Pointing a generic coding agent at a large repository produces coverage of maybe a tenth of a percent of the surface area before context fills up. You need to build a harness, not just prompt the model.

The safety picture is genuinely complicated. The Mythos Preview model used in the Glasswing program does not have the additional safeguards present in generally available models. Even so, it organically pushes back on some requests — but inconsistently. The same task, framed differently or in a different context, can produce completely opposite outcomes. Semantically equivalent requests can get opposite answers. That inconsistency is precisely the argument for why additional safeguards need to sit on top of the model's emergent guardrails before anything like this goes to general availability.

Anthropic's stated plan is not to release Mythos Preview generally, but to use the learnings to ship new safeguards with an upcoming Claude Opus model. The benchmark numbers — 83.1% on CyberGym for Mythos Preview versus 66.6% for Opus 4.6, and similar margins across SWE-bench and Terminal-Bench — make the capability gap concrete.

**Key takeaways:**
- Claude Mythos Preview found thousands of zero-day vulnerabilities including a 27-year-old OpenBSD flaw and a 16-year-old FFmpeg bug
- Exploit chain construction and autonomous proof generation are the capabilities that mark this as a qualitative leap
- Cloudflare built a multi-stage harness with adversarial validation agents — a single generic coding agent doesn't provide meaningful coverage
- The model's organic safety refusals are inconsistent; additional safeguards are required before broader availability
- Project Glasswing includes $100M in usage credits and $4M in open-source security donations

**Why do I care:** This matters for every developer who writes software that runs on infrastructure others depend on. The window between vulnerability discovery and exploitation has been shrinking for years; models like Mythos Preview compress it further on both sides. For developers, the near-term implication is that supply-chain security, dependency hygiene, and secure-by-design practices carry more weight than they did six months ago. The Cloudflare harness architecture is also genuinely instructive — the principle that narrow, parallel, adversarially-validated tasks outperform single-agent exhaustive searches applies to a lot of agentic workflows beyond security research.

**Link:** [Project Glasswing: Securing critical software for the AI era](https://www.anthropic.com/glasswing)

---

## Mini Shai-Hulud Strikes Again: 317 npm Packages Compromised

**TLDR:** The same toolkit responsible for the SAP compromise three weeks prior hit the AntV data-visualization ecosystem on May 19, 2026, compromising 317 packages including ones with millions of monthly downloads. The payload harvests credentials from every layer of your stack at install time.

The pattern is consistent enough that it has a name now: Mini Shai-Hulud. The attacker compromised the atool npm account and published 637 malicious versions across 317 packages in a 22-minute automated burst. Size-sensor, echarts-for-react, timeago.js, and hundreds of scoped @antv packages are in the affected set. If those names appear in your lockfile, the assumption should be exposure until you verify otherwise.

The payload is a 498-kilobyte obfuscated Bun script that executes via a preinstall hook at install time. It goes after AWS credentials from environment variables, config files, the EC2 instance metadata service, ECS container metadata, and Secrets Manager. It also collects Kubernetes service account tokens, HashiCorp Vault tokens, GitHub personal access tokens, npm tokens, SSH keys, and local password manager vaults — 1Password, Bitwarden, pass, and gopass are all in scope. This is not targeted; it's a broad sweep of everything credentialed that it can reach.

The exfiltration runs on two parallel channels. Stolen data goes to public GitHub repositories created under compromised tokens, with a user agent spoofed as python-requests to blend in. It also goes to an HTTPS endpoint disguised as OpenTelemetry trace data — an evasion technique that's effective precisely because observability egress doesn't typically trigger alerts. The payload also injects persistence into CI workflows by modifying .github/workflows/codeql.yml, targeting the next scheduled security scan as a reinfection vector.

The Claude Code and Codex targeting is particularly notable. The payload injects hooks that re-execute the malware on every AI coding session start, both locally and through repository commits. VS Code gets a tasks.json modification that runs on folder open. These persistence mechanisms are designed to survive the initial credential rotation by re-establishing a foothold through tooling that developers interact with constantly.

The credential rotation order matters because of how leverage chains work. npm and GitHub tokens go first because they let an attacker republish packages and access source code, extending the attack surface before you've finished rotating anything else. Then cloud IAM, then Kubernetes service accounts, then Vault tokens, then SSH keys.

The structural prevention story is the same message the security community has been delivering for years, but each successful attack is evidence it hasn't landed: pin exact versions in your lockfiles, not ranges. Disable install scripts in CI — they should not be running by default against untrusted packages. Use ephemeral runners that have no production credentials baked in. Set egress allowlists so that unexpected outbound traffic to novel endpoints fails rather than succeeds silently.

**Key takeaways:**
- 317 packages compromised via hijacked atool npm account in a 22-minute automated burst on May 19, 2026
- Payload runs at install time via preinstall hook and sweeps credentials across AWS, Kubernetes, Vault, GitHub, and password managers
- Exfiltration disguised as OpenTelemetry traces; persistence injected into CI workflows and AI coding tool hooks
- Rotation order: npm → GitHub → cloud IAM → Kubernetes → Vault → SSH keys
- Prevention: exact version pinning, disable install scripts in CI, ephemeral runners, egress allowlists

**Why do I care:** The Claude Code and Codex persistence hook is a new escalation that deserves attention from any team using AI coding assistants. If a compromised package installs a hook that re-executes on every AI session, you haven't fully remediated by rotating credentials — you need to audit your local AI tooling configuration as well. This incident also reinforces that the preinstall hook default is dangerous. The npm ecosystem needs to treat scripts execution as opt-in, not opt-out, in CI environments. Teams that haven't made that change should do it before the next supply chain compromise.

**Link:** [Mini Shai-Hulud Strikes Again: 317 npm Packages Compromised](https://safedep.io/mini-shai-hulud-strikes-again-314-npm-packages-compromised/)

---

## Better Fluid Sizing with CSS round()

**TLDR:** The CSS round() function lets you snap fluid values from clamp() and container query units to predictable intervals, giving you typography scales and spacing tokens that feel deliberate rather than landing on arbitrary decimal values.

Fluid sizing with clamp() is genuinely powerful, but it has an aesthetic problem that's hard to articulate until you notice it: the computed values land on numbers like 19.7px or 143.2px. Those values are technically correct but they break the grid rhythm that good design depends on. round() addresses this directly by snapping computed values to a specified step, which is especially useful when you want fluid behavior within predictable increments.

The function takes three arguments: a rounding mode (up, down, nearest, or to-zero), the value to round, and the interval. Pairing it with clamp() looks something like rounding a clamped font size down to the nearest 4px. The result is a font size that scales fluidly with the container but always lands on a value that belongs to your type scale. The difference becomes visible when you look at a typographic scale before and after — instead of five values with arbitrary decimal precision, you get clean increments that align with your spacing system.

The snap-to-line layout example in the article is the most creative use case. Given a striped editorial layout where you want card heights to align to a baseline grid, round() combined with the calc-size() function snaps a fluid height to the nearest baseline unit. This is the kind of thing that used to require JavaScript to enforce, or that designers had to accept as an approximation. Having it in pure CSS is a genuine improvement.

Browser support landed across Chrome, Firefox, Edge, and Safari in 2024, so this is usable today without polyfills. The advice to treat it as a progressive enhancement still makes sense — it won't break anything if it doesn't apply — but for typography scales and spacing tokens specifically, it's worth reaching for.

**Key takeaways:**
- CSS round() snaps fluid values from clamp() to a predictable step — useful for typography, spacing, and layout rhythm
- Takes mode (up, down, nearest, to-zero), a value, and an interval; pairs naturally with clamp() and container query units
- Snap-to-line layouts are now achievable in pure CSS using round() with calc-size()
- Fully supported across Chrome, Firefox, Edge, and Safari since 2024

**Why do I care:** This is the kind of CSS addition that fills a specific, annoying gap. Anyone who has implemented a fluid type scale knows the friction of computed values that don't align with anything — they work, but they undermine the feeling that the design is disciplined. round() doesn't solve the underlying problem of designing a good fluid scale, but it gives you the last piece to make the output feel intentional. It also integrates cleanly with CSS custom properties and design tokens, which means adding it to an existing system is low-effort.

**Link:** [Better fluid sizing with round()](https://ishadeed.com/article/css-round/)

---

## Browsers Treat Big Sites Differently — And They Don't Tell You

**TLDR:** Safari and Firefox both ship site-specific rendering quirks in their source code — literal domain checks that change how pages render for TikTok, Netflix, Instagram, Amazon, and others. Chrome doesn't need quirks files because the web is already built for Chrome.

This is the kind of thing you don't think about until someone shows you the source code, and then you can't stop thinking about it. Firefox's about:compat page lists site-specific interventions with toggle switches you can flip to watch specific sites break. WebKit's Quirks.cpp file is public on GitHub and contains thousands of lines of domain checks that modify scrolling behavior, touch event handling, viewport calculations, image MIME type handling, and more — all conditionally applied based on which site you're visiting.

The examples make the scope concrete. Facebook, Twitter, and Reddit all have quirks that change how the browser handles Picture-in-Picture video because those sites pause video elements that scroll out of viewport regardless of PiP state, which is wrong behavior that the browser works around rather than waiting for the companies to fix. Safari ships a fake Chrome user agent string, ready to deploy when sites refuse to work otherwise. The comment in the code about SeatGuru — "FIXME: Remove this quirk if seatguru decides to adjust their site" — tells a whole story about the economics of browser compatibility work.

Chrome doesn't have a comparable quirks file, and the article is precise about why: not because Chrome's engineering is superior, but because the web is already built for Chrome. When 80% of users browse with Chromium-based browsers, developers build for Chrome first. If a site works in Chrome, it ships. When it breaks in Safari or Firefox, that's treated as a lower-priority problem. Chrome doesn't add quirks — it sets the agenda, and everyone else adapts or patches around the differences.

The implication for developers is practical and uncomfortable. Your site might be getting special rendering treatment in Firefox or Safari and you have no way to know it. It doesn't appear in error logs. There's no console warning. If you test primarily in Chrome, you're especially exposed — your site might work not because you wrote good code but because Chrome's behavior happens to align with your assumptions. Open your site in Firefox and Safari regularly, not just before launches.

The feedback loop the article describes is the same one that produced the IE monoculture: developers build for the dominant browser, sites work best in that browser, users who hit issues elsewhere switch to the dominant browser, reinforcing its dominance. We dug out of the IE hole and then quietly built the same hole again around a different browser.

**Key takeaways:**
- Firefox and Safari ship site-specific rendering quirks for major domains including Netflix, TikTok, Instagram, and Amazon
- Chrome doesn't need quirks files because the web is already built for Chrome
- Safari ships a fake Chrome user agent string for sites that actively block non-Chrome browsers
- Your site might work in Firefox/Safari only because someone wrote a domain-specific fix in the browser source code
- Test in Firefox and Safari regularly — Chrome alignment is not evidence of correct code

**Why do I care:** This is one of those articles that shifts how you think about cross-browser testing. The quirks files exist because developers didn't test in non-Chrome browsers regularly enough, and browser vendors chose to fix problems invisibly rather than wait for site owners to act. The question of whether your site is in one of these files is one you should probably check — but the larger question is whether your development process creates the conditions that generate these quirks in the first place. Testing primarily in Chrome and treating Safari/Firefox as afterthoughts is how you end up in the file.

**Link:** [Browsers Treat Big Sites Differently](https://denodell.com/blog/browsers-treat-big-sites-differently)

---

## The Third Hard Problem: Mapping Graphs Onto Trees

**TLDR:** Beyond naming things and cache invalidation, there's a third pervasive hard problem in computer science: tree mapping — the challenge of embedding a general graph of relationships into a hierarchical structure, which shows up in file systems, code organization, writing, city design, and biological taxonomy.

Phil Karlton's two hard problems get cited constantly, but this essay argues there's a third one that's equally pervasive and less recognized: the need to force a web of interconnected concepts into a hierarchy, because hierarchies are how we organize almost everything — files, packages, books, cities, biological classifications. The problem is that ideas don't fit trees. They form webs. And every time we shove a web into a tree, we lose some of the connections.

The file system example is the one most developers will recognize immediately. Where does the dentist bill go — in a general archive folder, a medical folder, or a taxes project folder? The right answer is all three simultaneously, which hierarchical file systems can't express. Operating systems have been fighting this for decades. Windows and macOS organize by application; most Linux systems organize by type; the resulting tension produced Snap and Flatpak as attempts to reconcile the approaches. Code repositories face the same dilemma: organize by component or by language, and each choice sacrifices some useful view of the structure.

The city planning example is less obvious but more illuminating. Christopher Alexander's 1965 essay argued that artificially designed cities feel stifled because they're organized as trees — isolated neighborhoods, each self-contained. Natural cities feel alive because they have a semilattice structure where work, leisure, and play overlap and interact. The design of a city is a tree-mapping problem where you're embedding a semilattice of human relationships into a physical terrain. No algorithm gives you the right mapping, which is why Alexander couldn't provide a universal blueprint.

The biological taxonomy case closes the loop. Morphological taxonomy failed because observable traits form lattices, not trees — traits evolve independently in unrelated branches. Cladistics, organizing by common ancestry, works better because it preserves the actual connections rather than imposing artificial ones. The same principle applies to object-oriented class hierarchies, database schema design, and Rust's ownership model where object interaction graphs are webs but ownership must be a tree.

The prescription at the end is simple: be intentional. We reach for hierarchies instinctively, often without noticing we're making a choice. The questions to ask are: what web is being flattened, which connections are being sacrificed, and does the target medium actually have to be a tree?

**Key takeaways:**
- Tree mapping — embedding a graph into a hierarchy — is a third pervasive hard problem in computer science
- File systems, code organization, cities, writing, and biological taxonomy all face the same fundamental challenge
- Natural cities feel alive because they have semilattice structure; designed cities feel stifled because they're trees
- Object-oriented hierarchies, database schemas, and Rust ownership models all encounter tree mapping constraints
- The practical response is to make the choice consciously: ask what connections are being sacrificed by the hierarchy you're imposing

**Why do I care:** I find this framing useful because it gives vocabulary to a frustration that comes up constantly in architecture discussions — why doesn't the code organization feel right, why does the folder structure fight against how the code actually relates. The answer is usually that the web of dependencies doesn't fit the tree of directories, and someone made an implicit choice about which connections to sacrifice. Making that choice consciously, and naming what's being lost, leads to better architectural conversations than just debating whether to organize by feature or by layer.

**Link:** [The third hard problem](https://mmapped.blog/posts/48-the-third-hard-problem)
