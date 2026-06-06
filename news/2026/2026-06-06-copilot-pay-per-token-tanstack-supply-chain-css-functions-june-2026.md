---
title: "GitHub Copilot Goes Pay-Per-Token, TanStack Hit by Supply Chain Worm, and CSS Gets Custom Functions"
excerpt: "GitHub Copilot billing switches to token-based consumption, TanStack Router packages were briefly compromised by a self-propagating npm worm, and a wave of browser and tooling releases rounds out a busy week."
publishedAt: "2026-06-05"
slug: "copilot-pay-per-token-tanstack-supply-chain-css-functions-june-2026"
hashtags: "#frontendmasters #frontend #javascript #css #security #github-copilot #react #tailwind #nodejs #generated #en"
source_pattern: "Frontend Masters"
---

## GitHub Copilot Is Moving to Usage-Based Billing

**TLDR:** Starting June 1, 2026, all GitHub Copilot plans transition from seat-based pricing to GitHub AI Credits, where usage is calculated on token consumption including input, output, and cached tokens. The era of unlimited AI coding assistance is over.

This was coming. The "unlimited premium requests" model that Copilot launched with was always a promotional pricing approach, not a sustainable business model. Token-based pricing aligns costs with actual usage and probably makes sense long-term, but the transition is painful for teams that budgeted Copilot as a fixed line item.

The mechanics matter here. Every Copilot plan includes a monthly AI Credits allotment. When you exceed that, paid plans can purchase additional credits. The rate is based on the API pricing for each model, including input tokens, output tokens, and cached tokens. A single complex code completion request against a frontier model can cost meaningfully more than a quick suggestion. Teams whose developers use Copilot heavily for architecture-level prompts and multi-file refactors will see bills that vary significantly month to month.

For engineering leaders, this creates a new kind of cost management problem. You now need visibility into which developers are consuming the most tokens and for what tasks. Copilot usage during your team's most productive sprint will also be your most expensive billing month. The tooling to give managers this visibility probably doesn't exist yet in most orgs.

The deeper issue is what this signals about the economics of AI-assisted development. The subsidized era genuinely accelerated adoption. The question is whether the value proposition holds at real cost. Based on what I've seen in terms of productivity impact, the answer for senior developers using AI thoughtfully is probably yes. For teams that adopted it as a morale perk without measuring impact, it's about to get harder to justify.

**Key takeaways:**
- Copilot billing switches to GitHub AI Credits based on token consumption starting June 1
- Costs now vary with usage, making Copilot a variable expense rather than a fixed headcount cost
- Input, output, and cached tokens all count toward the credit calculation
- Paid plans can purchase additional credits beyond the monthly allotment

**Why do I care:** This directly affects every team that has Copilot on their tooling budget. From an engineering leadership perspective, you now need a token monitoring strategy the same way you need a cloud cost monitoring strategy. For individual developers, the mental model shift is from "use it freely" to "use it deliberately." That's not necessarily bad, but it requires teams to think intentionally about where AI assistance actually provides leverage.

**Link:** [GitHub Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)

---

## TanStack npm Supply Chain Compromise: Postmortem

**TLDR:** TanStack Router and Start packages were compromised by a self-propagating npm worm that hijacked GitHub Actions OIDC tokens to publish malicious package versions. All affected versions were deprecated within an hour, and a full security sweep confirmed other TanStack packages were not affected.

This is a genuinely alarming attack for several reasons. The threat group, TeamPCP, didn't just publish a malicious package. They used the compromised OIDC tokens from the project's own GitHub Actions pipeline to publish malicious versions with valid SLSA Build Level 3 provenance attestations. That makes it the first documented npm worm that produces validly-attested malicious packages.

SLSA (Supply-chain Levels for Software Artifacts) is the framework the industry has been pushing as a way to verify that packages were built in a secure, reproducible way. The premise is that an attacker can't fake the provenance because they'd need to compromise the build pipeline. What TeamPCP demonstrated is that compromising the OIDC token inside the pipeline achieves exactly that. The attestation is valid from a cryptographic standpoint; it just attests to a malicious build.

For the TanStack team specifically, they contained the incident quickly. 42 packages across the Router/Start monorepo were affected, 2 versions each. All deprecated within the hour, removed by npm shortly after. Every other TanStack package (Query, Form, Table, etc.) remained unaffected. They've since published a companion hardening guide covering what they're changing.

The broader takeaway for the ecosystem is that supply chain security assumptions need revisiting. Verifying provenance attestations is still valuable, but it doesn't protect against pipeline compromise. Staged publishing for npm packages, which npm recently released support for, is one mitigation. Others include restricting which workflow files can generate OIDC tokens and pinning Actions to commit hashes.

**Key takeaways:**
- TanStack Router/Start packages were briefly compromised via hijacked GitHub Actions OIDC tokens
- The attack produced malicious packages with valid SLSA Build Level 3 provenance, a documented first
- Only 42 Router/Start packages were affected; all other TanStack packages remained secure
- npm's new staged publishing feature is one practical mitigation for future attacks

**Why do I care:** This is a wake-up call for any team using npm packages in production, which is every JavaScript team. The attack vector is specific and reproducible: if your GitHub Actions workflows generate OIDC tokens for npm publishing, those tokens are a target. Review your CI configuration to understand what has publishing permissions, pin Actions to commit SHAs rather than version tags, and look at npm's staged publishing feature. This isn't hypothetical anymore.

**Link:** [Postmortem: TanStack npm supply-chain compromise](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem)

---

## AI Engineer Is a New Role

**TLDR:** AI engineering is a distinct discipline, not a rebrand of ML engineering or a description of any developer who calls an LLM API. The core skill is managing reliability in production agent systems, where demos work but production loops fall apart.

The observation that demos are easy and production is hard applies to most software, but it hits particularly hard with AI systems. An LLM agent that works for five steps in a demo will fail in unpredictable ways when real users interact with it. The failure modes are different from traditional software: non-deterministic outputs, context window exhaustion, tool call failures that cascade in unexpected directions, model behavior that drifts based on subtle prompt changes.

What the author identifies as the core AI engineer skill is managing the loop. Not building the agent, but keeping it running reliably across diverse real-world inputs. That requires a different mental model than traditional software engineering, where you can reason about deterministic behavior and test against specified inputs. In agentic systems, the space of possible inputs and intermediate states is too large to test exhaustively.

The distinction from ML engineering is also worth taking seriously. ML engineers care about model training, data pipelines, evaluation frameworks, and statistical reasoning about model behavior. That skill set has limited overlap with building reliable production agent systems on top of existing models. The AI engineer role is closer to systems engineering than to data science.

**Key takeaways:**
- AI engineering is distinct from ML engineering: it focuses on reliable production loops, not model training
- Demos of AI systems are deceptively easy; production reliability requires entirely different skills
- The core discipline is managing agentic systems through diverse real-world inputs that no test suite covers
- Measuring AI system reliability requires new approaches beyond traditional test coverage

**Why do I care:** I'm seeing teams staff AI initiatives by assigning whoever is curious about AI, regardless of actual skill fit. The result is demos that impress stakeholders and production systems that embarrass everyone six weeks later. The framing here - that AI engineering is a distinct role with specific skills - is something engineering leaders need to internalize before hiring or assigning people to AI infrastructure work.

**Link:** [AI Engineer Is a New Role](https://frontendmasters.com/blog/ai-engineer-is-a-new-role/)

---

## Using AI to Write Better Code More Slowly

**TLDR:** The dominant narrative around AI coding tools is speed and volume, but LLMs are equally useful for the opposite goal: writing less code, more carefully, with higher quality. The tools are flexible enough to serve both approaches.

The "slop cannon" critique of AI coding has become common, and it's mostly fair as a critique of how many teams are actually using these tools. Open massive PRs, merge them unvetted, ship it. But Nolan Lawson's point is that this is a usage pattern, not an inherent property of the tools.

The alternative is using AI for deep code review, finding edge cases, identifying antipatterns, and suggesting cleaner approaches. LLMs are quite good at this when prompted carefully. If you treat the AI as a skeptical reviewer rather than a code generator, you often get better results than either a rushed human review or an uncritical code dump.

The reference to using Mythos for bug finding is interesting. Repeated AI sweeps of a codebase surfacing bugs you wouldn't have caught otherwise is a real capability. The question is whether you're measuring that against the bugs that AI-generated code introduces, which most teams aren't tracking carefully.

**Key takeaways:**
- AI coding tools are useful for quality-focused, deliberate development, not just fast bulk generation
- LLMs as code reviewers and bug finders can improve quality rather than degrade it
- The usage pattern you choose (slop cannon vs. careful reviewer) determines the outcome
- Measuring AI impact on code quality requires tracking bugs introduced, not just velocity gained

**Why do I care:** This reframes the AI coding conversation in a way that's more useful for teams trying to set norms. Instead of "should we use AI?" the question becomes "how should we use it?" The deliberate, quality-focused approach described here is something you can actually put into a team engineering charter. It also helps push back against the pure velocity narrative that tends to dominate these conversations with non-technical stakeholders.

**Link:** [Using AI to write better code more slowly](https://nolanlawson.com/2026/05/25/using-ai-to-write-better-code-more-slowly/)

---

## Moving Away from Tailwind, and Learning to Structure CSS

**TLDR:** Julia Evans migrated several sites away from Tailwind toward semantic HTML and vanilla CSS, and found the process educational. Her conclusion isn't that Tailwind is bad, but that it can obscure CSS fundamentals in ways that matter when you need to work without it.

This piece resonates because the author is honest about her starting point: she used Tailwind because she didn't know how to structure CSS well. Tailwind solved a real problem for her, not because it's the right tool for all contexts, but because it was better than unstructured chaos.

What's interesting about her migration experience is what it taught her. Structuring CSS requires decisions about component boundaries, naming conventions, cascade management, and specificity. Tailwind sidesteps most of these decisions by moving styling into the markup. When you move back to CSS, you have to make them explicitly. That forced decision-making process turned out to be useful learning, even if the destination CSS isn't objectively better than Tailwind output.

The practical insight is that CSS-in-HTML versus CSS-in-CSS is a genuine tradeoff, not a clear winner. For small sites and quick projects, Tailwind's colocation advantage is significant. For larger codebases with complex styling requirements, the cascade and specificity tools in vanilla CSS give you more control. Knowing how to use both is more valuable than strong opinions about which is always right.

**Key takeaways:**
- Moving from Tailwind to vanilla CSS requires learning explicit decisions that Tailwind avoids
- Colocation of styles in markup is a genuine advantage for small projects, not just a preference
- CSS fundamentals like cascade and specificity become more important without utility classes
- The right choice depends on project scale and team familiarity, not universal rules

**Why do I care:** I see a lot of Tailwind fatigue in the frontend community right now, some of it thoughtful and some of it just aesthetic preference dressed up as engineering reasoning. Julia's piece is the thoughtful version. For teams evaluating CSS approaches, the honest framing is: Tailwind reduces CSS knowledge requirements at the cost of hiding useful tools. That's a tradeoff worth making explicitly rather than defaulting to either approach.

**Link:** [Moving away from Tailwind, and learning to structure my CSS](https://jvns.ca/blog/2026/05/15/moving-away-from-tailwind--and-learning-to-structure-my-css-/)

---

## The Fundamentals and Dev Experience of CSS @function

**TLDR:** CSS is getting custom functions via @function, letting developers encapsulate reusable property logic without duplicating code or polluting stylesheets with one-off custom properties.

CSS custom functions are a genuinely new capability. The syntax looks like a function declaration with a result property instead of a return statement. You define a function with @function, give it a name starting with -- (following custom property conventions), optionally add parameters, and set result to whatever value you want to produce. Then you call it like any other CSS function.

What makes this interesting beyond just syntactic sugar is what it enables architecturally. Right now, when you want to share a complex value calculation across multiple properties or selectors, you either duplicate it or create intermediate custom properties that aren't really meant to be used directly. Custom functions give you a proper abstraction layer. You can write the math or logic once and call it by name.

The article is explicit that this is coming soon but not shipped in most browsers yet. That's the right caveat. The developer experience of writing @function feels natural if you're already used to CSS custom properties, which is intentional design. The learning curve is low.

**Key takeaways:**
- CSS @function lets you define reusable value functions directly in stylesheets
- Functions use -- naming conventions consistent with custom properties
- The result property sets the function's return value rather than a return keyword
- The feature is coming soon and not yet broadly available in production browsers

**Why do I care:** This is the CSS feature I've been most interested in for the past year. Complex design systems constantly fight the limitation that CSS can't abstract value logic the way preprocessors can. @function doesn't replace Sass or PostCSS mixins entirely, but for pure CSS codebases or projects trying to minimize build tooling, it closes a real gap. Worth watching the browser support timeline closely.

**Link:** [The Fundamentals and Dev Experience of CSS @function](https://frontendmasters.com/blog/the-fundamentals-and-dev-experience-of-css-function/)

---

## Tailwind CSS v4.3: Scrollbars, New Colors, and More

**TLDR:** Tailwind v4.3 arrives with native scrollbar styling utilities, four new neutral color palettes, and a first-class webpack plugin, plus v4.2 additions including logical property utilities and font feature controls.

The scrollbar utilities are the most immediately useful addition here. Styling scrollbars has been a browser compatibility mess for years. Webkit-based browsers use one set of pseudo-elements, Firefox uses a different scrollbar-width and scrollbar-color API, and nothing standardized exists across all browsers. Tailwind wrapping this into utilities means you can apply consistent scrollbar styling without writing browser-specific CSS directly.

The four new neutral palettes (mauve, olive, mist, taupe) solve a real design problem. Gray comes in many temperatures, and the original gray/zinc/neutral/stone/slate set doesn't cover every design direction. Warmer neutrals like mauve and taupe are common in contemporary design aesthetics, and having them as first-class Tailwind palettes means fewer one-off custom colors cluttering project configs.

The webpack plugin for v4 is overdue. Next.js and other webpack-based setups saw worse build performance with v4 compared to the Vite path. A first-class webpack plugin should bring those build times back in line.

**Key takeaways:**
- Scrollbar styling utilities finally land in Tailwind, abstracting browser-specific CSS
- Four new neutral palettes expand the color system for contemporary design aesthetics
- First-class webpack plugin improves build performance for Next.js and webpack users
- v4.2 also added logical property utilities and OpenType font feature controls

**Why do I care:** Tailwind v4 had some rough edges for webpack users, and the performance gap with Vite was frustrating for teams on Next.js who don't have the option to switch bundlers easily. The webpack plugin fix is the most immediately impactful change for real projects. The scrollbar utilities are a nice-to-have that will actually save time in projects that need custom scrollbar styling.

**Link:** [Tailwind CSS v4.3: Scrollbars, new colors, and more](https://tailwindcss.com/blog/tailwindcss-v4-3)

---

## WebKit Features for Safari 26.5

**TLDR:** Safari 26.5 ships the :open pseudo-class, element-scoped random(), color-interpolation for SVG gradients, the ToggleEvent.source property, and the Origin API, plus 63 bug fixes.

The :open pseudo-class is probably the most immediately useful addition for interactive UI work. It lets you style the disclosure element that opens a details/summary or a popover based on its open state. Previously this required JavaScript state tracking or creative workarounds with the :checked pseudo-class. Having a native CSS pseudo-class for it is cleaner.

The element-scoped random() function addresses a limitation with the recently introduced CSS random(). The element-scoped version generates per-element random values that are stable across re-paints, which is what you actually want for most design uses. Without scoping, random() in CSS would change values on every paint, making it unusable for anything that needs stable visual variation.

63 bug fixes is a significant number. The mention of improved scroll-driven animations and anchor positioning fixes is particularly valuable, since both features shipped with known gaps. Each Safari release that closes these gaps expands the practical usability of new CSS features across all browsers.

**Key takeaways:**
- :open pseudo-class enables CSS styling of open disclosure elements and popovers without JavaScript
- Element-scoped random() provides stable per-element random values rather than per-paint variation
- 63 bug fixes including improvements to scroll-driven animations and anchor positioning
- This is the biggest May release of WebKit by bug fix count

**Why do I care:** Safari continues to be the browser that determines when new CSS features are actually usable in production. Each release like this one that closes feature gaps and fixes scroll-driven animation bugs moves the practical availability date earlier for everyone. The :open pseudo-class in particular is something I'll start using immediately for interactive components.

**Link:** [WebKit Features for Safari 26.5](https://webkit.org/blog/17938/webkit-features-for-safari-26-5/)
