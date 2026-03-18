---
title: "Fast Code Isn't the Bottleneck Anymore — Judgment Is"
excerpt: "From rewriting apps for AI workflows to the death (again) of design, from forward-deployed designers to zero-JS tooltips and the Temporal API — this week's roundup explores why speed without judgment is just expensive chaos."
publishedAt: 2026-03-18
slug: fast-code-isnt-the-bottleneck-anymore-judgment-is
hashtags: "#unicorn-club #ai-workflows #design-process #coding-agents #css #javascript #temporal-api #product-design #generated #en"
---

Well, folks. Another week, another batch of really smart people telling us that the thing we thought was the hard part... isn't actually the hard part. Turns out writing code fast was never the real challenge. The real challenge is knowing *what* to build, *why* to build it, and *when to stop*. Let's dig in.

## Re-writing Tapestry for AI Workflows

**TLDR:** A hiring manager rebuilt his personal CRM from a traditional UI app into an MCP server, realizing the real value was never the interface — it was the data and services underneath.

**Summary:** Last year, the author vibe-coded a personal CRM called Tapestry on Replit — a tool for managing high-touch recruiting relationships. It worked. He customized it, added features, built a spreadsheet view. And then he had an uncomfortable realization: he was just rebuilding CRUD apps with AI assistance. The UI felt archaic against the backdrop of how his actual workflows had evolved. So Tapestry v2 went headless. After interviewing recruiters and discovering most of them now live inside ChatGPT or Claude, the pivot became obvious — build an MCP server. Suddenly, relationship tracking became conversational instead of form-based. Notes, enrichment, and actions all happened through natural language in desktop tools rather than through yet another login screen. The lesson is sharp: building for new behaviors means resisting the muscle memory of building what you already know.

**Key takeaways:**
- The value of many apps isn't the UI — it's the services and data layer beneath it
- MCP servers allow products to meet users where they already work (inside AI assistants)
- Vibe coding v1 prototypes are often "prototypes disguised as production apps" — and that's fine, because shipping teaches you what matters
- The future of tooling may be a mix of hyper-local and hyper-cloud

**Why do I care:** As frontend developers, we pour enormous energy into interfaces. This is a wake-up call that for certain product categories, the interface might not be your app at all — it might be someone else's chat window. Understanding MCP and headless architectures is becoming table stakes.

**Link:** [Re-writing Tapestry for AI workflows](https://www.proofofconcept.pub/p/re-writing-tapestry-for-ai-workflows)

---

## Software Is a Coordination Problem. AI Can't Help You With That.

**TLDR:** AI accelerates production design but actively undermines the judgment, collaboration, and problem-framing that make design actually work.

**Summary:** The "UX is dead" discourse is back, this time courtesy of claims that AI has killed the design process. But dig past the headline and the target is specifically production design — the Figma-layout-shuffling variety that abandoned strategic thinking years ago. The real design process was never about artifact velocity. AI chatbots make you less likely to collaborate with humans, constrain your thinking to a single monotonous mode, and push you to move at machine pace while research with users stubbornly happens at human pace. Studies show AI use actually intensifies work, yet its proponents brag about volume rather than outcomes. The core argument is devastating: the speed of making artifacts has never been what prevents organizations from doing high-quality design. Without strategy, "build to learn" becomes "throw things at the wall," requiring an order of magnitude more shipped experiments to learn what research could have revealed in an afternoon. Showing sketches to your team will always be a tighter feedback loop than an AI-generated prototype pipeline.

**Key takeaways:**
- AI replaces production design, not the design process — those are very different things
- LLM usage can hijack judgment, making us feel productive while actually undermining effectiveness
- The real design process is a feedback loop that feeds back into problem definition, not just solution generation
- Orienting toward outputs means orienting away from thinking about the problem

**Why do I care:** Every time someone ships an AI-generated prototype without talking to users first, they're optimizing for the wrong metric. As senior developers, we're often the last line of defense before something hits production — understanding why fast artifacts aren't the same as good decisions keeps us from building the wrong thing quickly.

**Link:** [Software is a coordination problem. AI can't help you with that.](https://productpicnic.beehiiv.com/p/software-is-a-coordination-problem-ai-can-t-help-you-with-that)

---

## Judgment and Creativity Are All You Need

**TLDR:** With coding agents providing unlimited implementation time, the bottleneck in software development has shifted from execution to judgment — and eventually to creativity.

**Summary:** Will Larsen compares two major migrations — one at Uber in 2014 and one at Imprint in 2026 — to illustrate how profoundly coding agents have changed the nature of software work. The Uber migration meant a team of three engineers grinding through six months of continuous implementation, building scheduling algorithms and service platforms from scratch. The Imprint migration, also with three engineers over three months, involved building on Kubernetes and ArgoCD — but the difference wasn't just better infrastructure. In 2026, the vast majority of time was spent designing approaches, reviewing agent pull requests, and revising when reality didn't match the design. The frenzied sprint was replaced by deliberate architectural thinking. Coding agents have effectively solved the problem of time and are making progress on attention. What remains is judgment: how do you build things that are maintainable, secure, and reliable? The author proposes "datapacks" and skill package managers as the mechanism for scaling judgment, imagining an ecosystem where publishers distribute curated expert context that coding agents can consume.

**Key takeaways:**
- Coding agents have made implementation time essentially unlimited and cheap
- The constraint ladder is: time (solved) then attention (improving) then judgment (current bottleneck) then creativity (future challenge)
- "Datapacks" — expert context injected into agent workflows — are the proposed mechanism for scaling judgment
- The industry will likely develop skill package managers, similar to how O'Reilly might distribute blessed engineering skills

**Why do I care:** This reframes what it means to be a senior engineer. If implementation is commoditized, your value is in the judgment calls — architecture decisions, security posture, maintainability trade-offs. Investing in those skills is investing in the thing that can't be automated away yet.

**Link:** [Judgment and creativity are all you need.](https://lethain.com/judgment-is-all-you-need/)

---

## When Using AI Leads to "Brain Fry"

**TLDR:** New research shows certain patterns of AI use drive cognitive fatigue, while others can help reduce burnout.

**Summary:** Harvard Business Review reports on the emerging phenomenon of AI-induced cognitive overload. The piece opens with the launch of Gas Town, an open-source platform for orchestrating swarms of Claude Code agents simultaneously. While the results were impressive, early users described a palpable sense of stress — the system was simply moving too fast for human comprehension. The research finds that not all AI usage patterns are created equal: some drive cognitive fatigue while others can genuinely reduce burnout. The distinction matters enormously as teams adopt these tools at scale.

**Key takeaways:**
- AI tool usage can create cognitive overload when the pace exceeds human comprehension capacity
- The pattern of AI use matters more than the amount — some patterns reduce burnout while others amplify it
- Teams need intentional strategies for AI adoption, not just "use it for everything"

**Why do I care:** We're all reaching for Copilot, Claude, and agent swarms to move faster. But if the cognitive load of supervising these tools exceeds the cognitive load of just doing the work, we've traded one problem for another. Being deliberate about how we integrate AI into workflows isn't optional — it's a performance concern.

**Link:** [When Using AI Leads to "Brain Fry"](https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry)

---

## Workshops Are for Making Things

**TLDR:** Workshops become dramatically more engaging and productive when participants create tangible outputs rather than just providing input for someone else to synthesize later.

**Summary:** The traditional workshop format has a fundamental problem: participants spend all day discussing a topic but leave with nothing to show for it. The actual output gets compiled by someone else afterward, and that disconnect kills engagement. The author proposes flipping the model by having participants build things during the workshop itself — websites with Lovable, videos with CapCut, posters, prototypes. In a recent two-day session, an IT leadership team used Lovable to create websites encapsulating their discussions and decisions. About 80 percent had never touched such a tool before. The most prolific user turned out to be an accountant. The deeper insight is that making forces decisions in a way that discussion never can. You cannot put three names on a cereal box — you have to pick one, and that single choice reveals what the team actually believes is most important. The facilitator's role shifts from moderator to coach, and agenda planning simplifies because every activity feeds into the thing being built.

**Key takeaways:**
- Making forces decision-making in ways that discussion cannot
- Tools like Lovable, Canva, and CapCut make creation accessible to non-technical participants
- The facilitator role shifts from moderator to coach when workshops center on building
- Working backwards from the output simplifies agenda planning enormously

**Why do I care:** If you've ever sat through a workshop that produced a deck nobody read, this is the antidote. As developers who often facilitate technical planning sessions, structuring them around building something — even a rough prototype — produces better decisions and higher engagement than another round of sticky notes.

**Link:** [Workshops are for making things](https://www.philmorton.co/workshops-are-for-making-things/)

---

## Forward Deployed Designer

**TLDR:** AI tools now give designers the technical leverage to embed directly with teams, research problems, and ship functional prototypes — creating a new "forward deployed designer" role modeled after Palantir's forward deployed engineers.

**Summary:** Palantir coined the Forward Deployed Software Engineer in the early 2010s — engineers embedded at client sites who discovered problems and built solutions in the same motion. The concept spread to Databricks, Scale AI, and OpenAI because collapsing the distance between problem-understander and solution-builder eliminates the telephone game between sales, product, and engineering. Design never had its equivalent because a designer embedded at a client site still needed an engineer to build anything. That constraint has evaporated. With Claude, Cursor, Replit, and v0, a designer can go from observing a workflow to shipping a functional prototype in the same day. The proposed model is a three-person forward-deployed squad — designer, engineer, researcher — deployed for four to eight weeks against a company's most ambiguous problems. They operate like a startup-within-the-company, producing working prototypes rather than decks. A three-person team with AI tools in 2026 covers ground that used to require ten people. The rotation model prevents the squad from becoming just another product team and solves the career problem for designers and researchers who get stuck in support roles.

**Key takeaways:**
- AI tools give designers the technical leverage to independently handle the first 80% of a solution
- A three-person squad (designer, engineer, researcher) with AI tools replaces a ten-person cross-functional team
- Forward-deployed squads should be temporary (4-8 weeks) and rotate to prevent becoming permanent product teams
- The model works both for external customer engagement and internal cross-team problem solving

**Why do I care:** This reshapes how we think about team composition. If a designer can ship a working prototype before engineering even engages, the handoff model changes fundamentally. Understanding this shift helps us collaborate more effectively and recognize that the "design to dev handoff" bottleneck is dissolving.

**Link:** [Forward deployed designer](https://www.proofofconcept.pub/p/forward-deployed-designer)

---

## Zero-JS Tooltips and Menus

**TLDR:** The Popover API lets you build tooltips, menus, and floating UI with zero JavaScript — the browser handles light dismiss, top-layer rendering, and toggle behavior natively.

**Summary:** For years, every tooltip and dropdown menu required the same boilerplate: a click listener, a class toggle, and fiddly logic to close the thing when clicking elsewhere. The Popover API makes all of that unnecessary. Adding the popover attribute to an element gives you automatic light dismiss (close on outside click or Escape), top-layer rendering (no more z-index wars or overflow hidden battles), and declarative toggling via popovertarget — all without a single line of JavaScript. You can style open state transitions using the :popover-open pseudo-class. The API became Baseline in early 2024 and is supported across Chrome, Edge, Safari, and Firefox, making it production-ready today.

**Key takeaways:**
- The popover attribute provides light dismiss, top-layer rendering, and declarative toggling with zero JavaScript
- The :popover-open pseudo-class enables CSS-only animations for show/hide states
- Baseline since early 2024 — supported in all major browsers
- Eliminates the need for tooltip and menu JavaScript libraries in many common scenarios

**Why do I care:** This is one of those "delete code" features. If you're still importing a tooltip library or writing click-outside handlers, the platform now does it for you. Less JavaScript, fewer bugs, better accessibility out of the box. Ship it.

**Link:** [Zero-JS tooltips and menus](https://markodenic.tech/zero-js-tooltips-and-menus/)

---

## Moving From Moment.js to the JS Temporal API

**TLDR:** The Temporal API has reached Stage 4 and shipped in Chrome and Firefox — here are practical recipes for migrating your Moment.js code to this immutable, type-safe, locale-aware replacement.

**Summary:** JavaScript date handling has come a long way from the cursed days of the Date API to the Moment.js era and now to Temporal. Moment.js solved real problems but brought baggage: it's huge (294KB minified), doesn't support tree shaking, and its objects are mutable — meaning operations like timezone conversion silently destroy your original value unless you remember to clone. As of March 2026, Temporal has reached TC39 Stage 4 and ships in Chrome 144+ and Firefox 139+, with Safari expected soon. The API introduces distinct types for different use cases: Temporal.Instant for UTC points in time, PlainDate for dates without times, PlainTime for times without dates, and ZonedDateTime for the full package with timezone awareness. Everything is immutable — arithmetic operations return new objects. Month indexing is 1-based, finally ending the January-is-zero madness. Parsing is strict ISO 8601 only, which means fewer surprises at the cost of having to pre-process non-standard date strings. Formatting uses the Intl.DateTimeFormat API under the hood, giving you automatic locale adaptation instead of hard-coded format tokens. The article walks through creation, parsing, formatting, arithmetic, comparison, timezone conversion, and a complete real-world refactoring of an event scheduling function.

**Key takeaways:**
- Temporal is Stage 4, shipping in Chrome 144+ and Firefox 139+, with a polyfill available (44KB gzipped vs Moment's 75KB + moment-timezone's 114KB)
- Immutable objects eliminate an entire category of mutation bugs that plague Moment.js code
- 1-based month indexing finally matches human expectations (January = 1)
- Built-in timezone support without additional packages, and locale-aware formatting via Intl APIs
- Strict ISO 8601 parsing is safer but requires pre-processing for non-standard date strings

**Why do I care:** Moment.js is in maintenance mode and has been for six years. If you're still depending on it, Temporal is the migration target — and it's not theoretical anymore, it's shipping in browsers. The immutability alone would justify the switch, but getting rid of a 294KB dependency that doesn't tree-shake is the cherry on top. Start planning your migration.

**Link:** [Moving From Moment.js To The JS Temporal API](https://www.smashingmagazine.com/2026/03/moving-from-moment-to-temporal-api/)

---

## TBM 410: Dancing With Problems

**TLDR:** There is no perfect problem statement — effective product work requires constantly moving between layers of abstraction, from concrete root causes to strategic implications and back again.

**Summary:** The piece starts with a deceptively simple statement — "We've got to make the app easier to use!" — and methodically peels back layers to show why problem definition is never a single moment but an ongoing negotiation between perspectives. Through the example of initiative creation in a product tool, each seemingly clear problem statement dissolves under scrutiny. "Users take too long to create an initiative" sounds specific until you ask whether speed is actually the goal. Adding diagnostic depth helps — users are unsure what information is required, much of it isn't readily available, there's confusion about what an initiative should represent. But even that falls apart when you examine why those fields were added in the first place and who relies on that information downstream. The author identifies eight types of questions that product teams must constantly navigate: exploratory, definitional, contextual, descriptive, explanatory, strategic, generative, and evaluative. The trick is dancing between layers — a root cause at the behavioral layer might not hold up when examined from an ecosystem perspective. This connects to Richard Rumelt's concept of the "crux" from Good Strategy/Bad Strategy: the real diagnosis is elusive precisely because different actors see different problems across different time horizons and abstraction levels.

**Key takeaways:**
- Problem definition is not a deliverable — it's a continuous navigation between layers of abstraction
- Eight question types (exploratory, definitional, contextual, descriptive, explanatory, strategic, generative, evaluative) map the problem space
- A "root cause" at one layer often falls apart when examined from another layer
- Product leadership's job isn't defining the problem — it's creating conditions where people can engage with the situation from multiple elevations

**Why do I care:** Every time we get a ticket that says "make this faster" or "fix the UX," we're looking at a collapsed problem statement. Understanding the layers underneath helps us push back productively, ask better questions, and avoid building the wrong solution to a misdiagnosed problem. This is judgment in action.

**Link:** [TBM 410: Dancing With Problems](https://cutlefish.substack.com/p/tbm-410-dancing-with-problems)

---

## Abusing Customizable Selects

**TLDR:** The new customizable select feature in CSS unlocks wild creative possibilities — curved folder stacks, fanned card decks, and radial emoji pickers, all built on native select elements that gracefully degrade.

**Summary:** CSS-Tricks walks through three increasingly ambitious demos built entirely on the new customizable select feature. The first creates a curved stack of folder icons using appearance: base-select to opt into customization, the ::picker(select) pseudo-element to style the dropdown, and the new sibling-index() function to rotate each option at gradually increasing angles. The second demo builds a fanned deck of playing cards, overriding anchor positioning with position-area: center center and using sibling-index() with sibling-count() to calculate each card's rotation offset from center. The third creates a radial emoji picker using CSS trigonometry functions cos() and sin() combined with sibling-index() to position options in a circle. All three demos use @starting-style for entry animations and transition delays calculated from sibling position. The critical design principle: a customized select is still a select element, so non-supporting browsers simply show a standard dropdown. This is progressive enhancement at its finest.

**Key takeaways:**
- appearance: base-select and ::picker(select) unlock full styling of select elements including button, dropdown, and options
- sibling-index() and sibling-count() enable position-dependent styling without JavaScript or nth-child hacks
- Anchor positioning override via position-area allows complete control over dropdown placement
- Everything degrades gracefully — non-supporting browsers show a standard select
- Currently Chromium-only but designed for progressive enhancement

**Why do I care:** Customizable selects solve one of the longest-running pain points in frontend development — styling native form controls without rebuilding them from scratch and losing accessibility. The progressive enhancement story is excellent: you get a beautiful, animated, fully accessible select in supporting browsers and a perfectly functional standard select everywhere else. Start experimenting now.

**Link:** [Abusing Customizable Selects](https://css-tricks.com/abusing-customizable-selects/)
