---
title: "Design Systems as Infrastructure, Safari Emoji Bugs, and the CSS Grid Lanes Revolution"
excerpt: "From enforcing design system contracts to debugging a heart emoji that broke Safari, plus new CSS primitives and the art of generating LLM skills after the fact."
publishedAt: "2026-02-25"
slug: "design-systems-infrastructure-safari-emoji-css-grid-lanes"
hashtags: "#unicorn-club #frontend #css #design-systems #ai #performance #architecture #ux #safari #generated #en"
---

## The MCP Tool That's Changing How I Use Figma

**TLDR:** A designer finally took the plunge with Figma Console MCP and discovered it handled the tedious, repetitive parts of design system library work -- like creating 200+ variables in seconds -- without replacing the creative work they actually enjoy.

The author had been circling the MCP-meets-Figma space for months, intimidated by the pace of change. That hesitation is worth examining. We are in a period where tooling moves so fast that the cost of not experimenting is becoming higher than the cost of trying something that does not pan out. The decision to finally try Figma Console MCP by TJ Pitre was motivated not by a desire to automate design decisions, but to offload the mechanical labor of building out libraries -- creating variables, mapping them to color swatches, the kind of work that causes wrist pain and eats hours.

What is interesting here is the framing. The author explicitly separates the creative act of designing from the mechanical act of building the system. That distinction matters. Too many conversations about AI in design treat the whole process as a monolith -- either AI replaces you or it does not. The reality is more granular. There are sub-tasks within any creative workflow that are pure toil, and those are exactly where automation belongs. Creating 200 variables and mapping them to instances is not a design decision. It is data entry wearing a design hat.

For architects and team leads thinking about where to introduce AI tooling, this is the lesson: identify the mechanical bottlenecks in your pipeline first. Do not start with the creative decisions. Start with the tasks your team dreads. The ROI is clearer and the resistance is lower.

**Key takeaways:**
- MCP tooling for Figma is approachable even for those who have been hesitant about AI in their workflow
- The real value is in offloading repetitive library-building tasks, not automating design decisions
- Creating 200+ Figma variables and mapping them took seconds instead of hours
- The barrier to entry is lower than most people assume -- the hard part is just starting

**Link:** [The MCP Tool That's Changing How I Use Figma](https://newsletter.baselinedesign.com/the-mcp-tool-thats-changing-how-i-use-figma/)

## Your Design System Has Opinions. They're Just Not Being Enforced.

**TLDR:** Design systems that rely on documentation and trust are not infrastructure -- they are suggestions. The author argues for encoding component contracts with TypeScript constraints, ESLint rules, and runtime guardrails, especially as AI agents start consuming your component libraries.

This piece lands a punch that most design system teams need to hear: if your system's rules live only in documentation, they are not rules. They are hopes. The example is sharp -- a modal ships without action buttons, the PR gets approved, QA misses it, and now a user is staring at a dialog with no way out. That is not a process problem. It is a system that has opinions but no enforcement mechanism.

The author draws a direct parallel to backend engineering, where no one would ship an API that accepts whatever input it gets and "does its best." Databases enforce constraints. APIs validate inputs. But frontend components? We tolerate ambiguity that backend teams would reject instantly. The proposed solution operates at three layers: design-time validation in Figma, build-time constraints through TypeScript and ESLint, and runtime guardrails with developer-friendly error messages.

The AI angle is what makes this urgent rather than merely important. When your component consumers are not just developers but also LLM-powered agents, ambiguity becomes catastrophic. Humans can squint at a slightly wrong implementation and make it work. Agents cannot. Google's A2UI approach -- treating UI as messages validated against a component catalogue -- is the direction things are heading. If your design system cannot reject invalid compositions programmatically, you are going to have a very bad time when agents start generating your UI.

For architecture teams, the practical takeaway is to start with your three to five most-misused components. The ones you dread reviewing. Encode their constraints in TypeScript using discriminated unions and the `never` type. Add ESLint rules. Make the error messages teach the correct pattern. You are not building a police state -- you are building a strike zone.

**Key takeaways:**
- Documentation without enforcement is just hope -- encode constraints in TypeScript, ESLint, and runtime checks
- Use the `never` type to make invalid prop combinations a compile-time error
- AI agents consuming your components need crisp contracts, not tribal knowledge
- Start enforcement with 3-5 high-usage, frequently-misused components
- Error messages should teach the correct pattern, not just block the wrong one

**Tradeoffs:** Heavy enforcement risks resentment and workarounds if not introduced with a collaborative posture. The balance is encoding the non-negotiable structural rules while leaving room for legitimate variation.

**Link:** [Your Design System Has Opinions](https://blog.murphytrueman.com/p/your-design-system-has-opinions)

## The Recommendation-Adoption Score (RAS)

**TLDR:** Nielsen Norman Group introduces a concrete metric for tracking how much UX research actually ships. The RAS scores recommendations on a 0-100 scale based on adoption status and user-value impact, turning "research breakage" from an invisible problem into a measurable one.

This is one of those articles that makes you wonder why the metric did not exist sooner. The core insight is borrowed from supply chain management: treat research recommendations like inventory. Each one represents time, energy, and money. Track it through every stage. Know where it breaks down.

The scoring system is deliberately weighted to prevent gaming. Adopted high-value recommendations score 3 points, medium 2, low 1. Committed items -- scoped and resourced but not shipped -- earn only 0.66 regardless of potential impact. Communicated recommendations that are not on a path to adoption score zero. Cancelled items are excluded entirely. This weighting means teams cannot inflate their score by cherry-picking easy wins. A backlog of adopted low-value items produces activity but does not meaningfully change user experience.

What the authors are diplomatically avoiding is the uncomfortable truth about why RAS scores start in the "Poor" range for most organizations: research teams and product teams often have fundamentally misaligned incentives. Researchers are measured on insight quality. Product managers are measured on shipping features. Without a shared metric that makes breakage visible, the gap persists because it is in nobody's immediate interest to close it. RAS forces that conversation by putting a number on the problem.

For engineering and product leaders, the practical application extends beyond UX research. The same framework could track adoption of architectural recommendations, tech debt remediation plans, or accessibility audit findings. Any context where expert recommendations routinely die in backlogs would benefit from this kind of structured accountability.

**Key takeaways:**
- RAS = Actual user value / Total possible user value x 100, scored on a 0-100 scale
- Weighted scoring prevents gaming: high-value adopted items (3pts) outweigh any number of low-value fixes (1pt)
- Committed but unshipped recommendations earn only 0.66 points -- promises are not delivery
- Track with a rolling 12-month window; your first score is a baseline, not a verdict
- The real value is making breakage visible so it can no longer be ignored

**Link:** [The Recommendation-Adoption Score](https://www.nngroup.com/articles/recommendation-adoption-score/)

## How Design Systems Offer Creative Safety for Product Teams

**TLDR:** The distinction between cohesion and sameness is where most design systems go wrong. This piece argues that clearly defining these terms creates "creative safety" -- the confidence for teams to experiment without fear of undefined consequences.

The taxonomy here is worth memorizing. Cohesion: things that are the same look the same. Drift: things that are the same look different. Differentiation: things that are different look different. Sameness: things that are different look the same. Most organizations chase "consistency" without distinguishing between healthy cohesion and unhealthy sameness, and the result is products that feel generic.

The concept of "creative safety" is built on psychological safety but goes further. It is the confidence to explore and challenge design decisions because the boundaries are explicit rather than tribal. When expectations are unclear, critique feels arbitrary -- like losing a game when you did not know the rules. When expectations are documented and shared, teams can justify their decisions against a framework rather than defending against personal preferences.

The anecdote about the design system consumer who avoids office hours because "they don't really listen -- they are there to defend the system, not to hear how it could be better" is devastating. It reveals a pattern where design system teams evolve toward a defensive posture, building walls around their standard of excellence rather than enabling the product teams they exist to serve. If you have not earned a collaborative reputation, you will not have the credibility to push back when it is actually needed.

For team leads running design system programs, the uncomfortable question is whether your system enables expression or prohibits it. If product designers are routing around your system because it cannot accommodate legitimate variation, the system is failing regardless of how internally consistent it is.

**Key takeaways:**
- Define cohesion, drift, differentiation, and sameness explicitly -- do not leave product teams to interpret vague principles
- Creative safety requires explicit boundaries, not defensive gatekeeping
- A design system that prohibits expression will fall out of relevance as teams route around it
- Clear definitions enable productive critique, reduce institutional knowledge dependency, and improve tooling
- Invest more time articulating expectations than defending existing decisions

**Link:** [How Design Systems Offer Creative Safety for Product Teams](https://bencallahan.com/how-design-systems-offer-creative-safety-for-product-teams)

## The Cost of Consistency: Avoiding Design System Bottlenecks

**TLDR:** A mature design system can become a single point of failure for innovation. This article outlines the "Rigidity Trap" and "Abstraction Tax" that emerge at scale, and advocates for a federated governance model where feature teams can contribute and extend the system.

The numbers here are sobering. The team initially saw a 40% reduction in delivery time after adopting their Angular-based design system. But as they scaled past 50+ consuming applications, they hit what the author calls the "maintenance phase" -- where the cost of consistency rivaled the cost of development itself. A simple padding change on a button for a marketing campaign turned into a multi-week process involving variant debates, core library updates, versioned releases, and cross-team regression testing.

The "Abstraction Tax" framing is equally sharp. Every design system component is an abstraction, and every abstraction hides complexity while creating cost for anyone who needs to do something unanticipated. When developers spend 30% of their time fighting the system to accomplish what would be trivial with plain HTML and CSS, the abstraction is no longer serving its purpose. It has become the obstacle.

The proposed solution -- a federated model treating the design system as an internal open-source project -- is pragmatic. Core tokens (colors, spacing, typography) stay strictly governed. Component recipes provide base styles but allow teams to build specialized components. Contribution pipelines make it easy for feature teams to push their components upstream. This acknowledges a truth that centralized teams resist: the people closest to the user often have the best insights into what a component should do.

What the author is not saying loudly enough is that knowing when not to use the design system is perhaps the most important skill. Experimental features, one-off marketing pages, and internal tools often do not belong in the system, and forcing them in creates the very bottlenecks the system was supposed to eliminate.

**Key takeaways:**
- A design system that enforces 100% consistency becomes a single point of failure for innovation
- The "Abstraction Tax" appears when developers spend more time fighting the system than building features
- Federated governance treats the design system as internal open source: strict core tokens, flexible component recipes
- Know when not to use the system: A/B tests, marketing pages, and internal tools often warrant throwaway code
- Systems are tools, not religions -- if the system feels like a burden, refactor governance, not just code

**Tradeoffs:** Federated models trade some consistency for speed and autonomy. The risk is drift if contribution pipelines lack quality gates. The balance is strict governance on atoms, flexibility on molecules.

**Link:** [The Cost of Consistency: Avoiding Design System Bottlenecks](https://omid.dev/2025/12/25/cost-of-consistency-design-systems/)

## LLM-Generated Skills Work, If You Generate Them Afterwards

**TLDR:** A recent paper showed that LLM-authored "skills" (short procedural prompts) do not help when generated before the task. The author argues the opposite approach works: have the LLM solve the problem first, then distill what it learned into a reusable skill.

The paper's finding -- that self-generated skills provide no benefit on average -- sounds damning until you look at the methodology. They asked the LLM to write a skill before attempting the task. That is essentially a weird version of "think step by step" prompting, and modern reasoning models already do that internally. Of course it does not help.

The author's alternative is more interesting. After using Codex to solve a genuinely hard problem -- clamping features in open-source models using Sparse Autoencoders -- they asked Codex to summarize the working solution into a skill document. That skill then transferred successfully to a new Codex instance working on a different model. The key insight is what would have happened if the skill had been generated beforehand: it would have baked in all of the incorrect assumptions the LLM started with, like extracting features from the final layernorm instead of the middle layers.

The broader principle here is about what LLM-generated skills are actually for. They are not meant to distill knowledge the model already has from training data. They are meant to capture knowledge the model gained by iterating on a problem for millions of tokens. The skill is a compression of hard-won experience, not a summary of pre-existing knowledge.

For teams building AI-assisted workflows, this has direct implications for how you structure agent memory and knowledge bases. Do not pre-populate skills from documentation. Let agents solve problems, then extract the learnings. The order matters enormously.

**Key takeaways:**
- LLM skills generated before the task bake in incorrect assumptions and provide no benefit
- Skills generated after solving a problem capture genuinely learned knowledge and transfer well
- The purpose of LLM-generated skills is to distill iteration experience, not training data
- This has implications for how teams structure agent memory and knowledge bases
- Let agents solve problems the hard way first, then extract reusable patterns

**Link:** [LLM-generated skills work, if you generate them afterwards](https://www.seangoedecke.com/generate-skills-afterwards/)

## A Broken Heart: Getting a 100x Speedup with One Dumb Line of Code

**TLDR:** A heart emoji caused Safari to spend 1600ms per layout pass on a web app dashboard. The culprit was Noto Color Emoji's COLRv1 font falling back to SVG rendering in Safari's CoreSVG, creating a glyph-specific performance catastrophe.

This is a masterclass in debugging, and a cautionary tale about the invisible complexity hiding in modern web stacks. The author noticed a dashboard that went from 1-second loads to 10-second loads. Initial suspicion fell on React -- unnecessary re-renders, missing memoizations, no React Compiler. Fixing all of that made almost no difference. The real culprit was discovered through the Safari performance inspector: 94% of an M1 Max CPU was being consumed by Layout, with individual passes taking 1600ms each.

The binary search debugging approach -- having a coding agent iteratively remove things until the problem disappears, then re-add until you find the minimal reproduction -- is a technique worth adopting. In this case, it led to the discovery that a single heart emoji in a button was causing the entire page to choke. The root cause: Noto Color Emoji uses Google's COLRv1 color font spec, which falls back to SVG rendering in Safari. That SVG fallback path in CoreSVG is catastrophically slow for certain glyphs -- heart and exploding-head emoji take 1600ms, while basket and melting-face emoji take 0.2ms.

The meta-lesson is delicious. Claude suggested using Noto Color Emoji in the first place to solve cross-platform emoji rendering on Linux. The AI agent both created and solved the problem. As the author puts it: "These coding agents are very much like a power saw. Profoundly useful, and proportionately dangerous."

For frontend architects, the immediate fix is to list "Apple Color Emoji" first in your font-family stack if you are using Noto Color Emoji. The deeper lesson is that color fonts are still a minefield of competing standards and inconsistent browser support, and what Google optimizes for is not necessarily what Safari handles well.

**Key takeaways:**
- Noto Color Emoji's COLRv1 SVG fallback can cause 100x layout slowdowns in Safari for specific glyphs
- Always list "Apple Color Emoji" before "Noto Color Emoji" in font-family declarations on Apple platforms
- Binary search debugging with a coding agent is exceptionally effective for isolating browser-specific performance issues
- The Safari performance inspector showed Layout consuming 94% CPU -- not JavaScript, not network, not styles
- AI agents can both introduce and solve subtle problems -- the same agent that suggested the problematic font also helped debug it

**Link:** [A Broken Heart](https://allenpike.com/2026/a-broken-heart/)

## Native HTML Components Don't Guarantee Good UX

**TLDR:** The instinct to prefer native HTML over custom JavaScript is generally sound, but many native elements -- including date inputs, maxlength, title attributes, and the reset button -- deliver objectively poor user experiences.

The author pushes back on a popular post advocating for the native HTML reset button. The spirit of preferring native solutions is right -- custom code is more expensive and often unnecessary. But the specific advice is wrong. Reset buttons are harmful for two reasons: users almost never need to reset a form (in hundreds of observed user sessions, not once), and when they hit it by accident, everything they entered is gone with no undo.

The deeper point is more interesting than the specific example. There is a recurring fallacy in frontend discourse that "native equals good." Date inputs are hard to use and inaccessible. The maxlength attribute silently truncates pasted content. The title attribute only works on hover and excludes keyboard users. These are not edge cases -- they are fundamental UX failures baked into the platform.

What the author is really arguing against is cargo-cult simplicity. Reducing JavaScript is not inherently virtuous if the result is a worse user experience. The goal is not minimal code -- it is minimal friction. Sometimes that means a native element. Sometimes it means building something custom that actually works for your users.

For frontend teams, the practical question is not "can we use a native element?" but "should we use this native element?" The answer requires actually testing with users, not just checking a spec compliance box.

**Key takeaways:**
- Native HTML elements are not inherently good UX -- many have significant usability and accessibility gaps
- The reset button is harmful: users do not need it, and accidental clicks destroy all entered data with no undo
- Date inputs, maxlength, and title attributes all have well-documented UX failures
- "Native" is not a proxy for "correct" -- test with real users, not spec compliance
- The goal is minimal friction, not minimal JavaScript

**Link:** [Native HTML Components Don't Guarantee Good UX](https://adamsilver.io/blog/native-html-components-dont-guarantee-good-ux/)

## Potentially Coming to a Browser :near() You

**TLDR:** A proposed CSS pseudo-class `:near()` would match elements when the pointer is within a specified distance, enabling proximity-based interactions without JavaScript. The article explores use cases from visual effects to prefetching, along with accessibility concerns.

The `:near()` proposal is one of those ideas that immediately generates a split reaction: half the audience thinks "finally" and the other half thinks "oh no, another way to make the web annoying." Both reactions are correct. The core mechanic is simple -- `button:near(3rem)` matches when the pointer is within 3rem of the button, presumably using Euclidean distance calculation behind the scenes.

The compelling use cases are the subtle ones. Showing a hidden share button slightly before the user hovers over its exact location reduces the precision required for interaction, which is a genuine accessibility win for users with motor impairments. The Speculation Rules API could use proximity as a signal for prefetching, which would be more predictive than viewport presence alone. The Interest Invoker API could use proximity to prevent accidental deactivation of hover-triggered overlays, replacing awkward timing delays with spatial awareness.

The article is thorough about the accessibility minefield. `:near()` must not imply `:hover` or `:focus` -- the difference between preemptive (preparing for likely interaction) and presumptive (acting as if interaction occurred) is critical. There are also legitimate concerns about abuse: heatmapping, fingerprinting, aggressive advertising. The proposal addresses these, but history suggests that any new capability will be misused in proportion to its power.

The hidden gem in the article is the `content-visibility: hidden` trick combined with `contain-intrinsic-size: auto none` and a 1ms animation to reserve space for hidden elements. That technique is useful today, regardless of whether `:near()` ever ships.

**Key takeaways:**
- `:near()` would enable proximity-based styling without JavaScript's pointermove performance overhead
- Best use cases: progressive disclosure of hidden controls, prefetch hinting, and preventing accidental overlay dismissal
- Must not imply `:hover` or `:focus` -- proximity is preemptive, not presumptive
- The `content-visibility: hidden` + `contain-intrinsic-size` trick for reserving space is usable today
- "Near" as a concept could extend beyond CSS to the Speculation Rules API and Interest Invoker API

**Link:** [Potentially Coming to a Browser :near() You](https://css-tricks.com/potentially-coming-to-a-browser-near-you/)

## Introducing CSS Grid Lanes

**TLDR:** WebKit ships `display: grid-lanes` in Safari Technology Preview 234, finally bringing native masonry layouts to the web with the full power of CSS Grid syntax -- spanning, explicit placement, direction control, and a new `flow-tolerance` property.

This is the one we have been waiting for. After years of debate at the CSS Working Group about whether masonry should be its own display type or an extension of Grid, the answer is `display: grid-lanes`. Three lines of CSS -- display, grid-template-columns, and gap -- produce a responsive masonry layout with zero media queries and zero JavaScript. The naming is deliberate: think of highway lanes where each car (item) moves into whichever lane gets it closest to the top.

What makes this more than just "Pinterest layout in CSS" is the full Grid integration. You can span lanes with `grid-column: span 4`. You can explicitly place items with `grid-column: -3 / -1`. You can create asymmetric lane patterns with complex `repeat()` and `minmax()` expressions. You can switch between waterfall (column-based) and brick (row-based) layouts by defining `grid-template-columns` or `grid-template-rows` respectively.

The `flow-tolerance` property is a genuinely new concept. It controls how aggressively items switch lanes to fill space. With zero tolerance, a tiny size difference causes items to reorder across lanes, which creates a confusing tab order. The default of `1em` means only differences larger than 1em matter when placing items. Think of it as how "chill" you want the layout algorithm to be. Higher tolerance produces more predictable reading order at the cost of slightly less optimal space usage.

For teams building content-heavy layouts -- image galleries, card grids, news feeds, mega menu footers -- this replaces an entire category of JavaScript layout libraries. The accessibility story is also notably better than JS-based masonry: content tabs across lanes to visible items rather than down an entire column before jumping to the next.

**Key takeaways:**
- `display: grid-lanes` ships in Safari Technology Preview 234 with full CSS Grid syntax support
- Three lines of CSS produce responsive masonry layouts with no media queries or JavaScript
- Items can span lanes, be explicitly placed, and flow in either direction (waterfall or brick)
- `flow-tolerance` (default 1em) controls how aggressively items reorder across lanes -- higher values produce more predictable tab order
- Tab order follows visible content across lanes rather than down columns, improving accessibility over JS-based masonry

**Link:** [Introducing CSS Grid Lanes](https://webkit.org/blog/17660/introducing-css-grid-lanes/)
