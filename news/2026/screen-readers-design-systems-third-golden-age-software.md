---
title: "Screen Readers, Design Systems, and the Third Golden Age of Software"
excerpt: "From breaking accessibility with letter-splitting animations to rethinking platform design and AI's role in software engineering, this week's roundup covers the full spectrum of building better products."
publishedAt: "2026-02-12"
slug: "screen-readers-design-systems-third-golden-age-software"
hashtags: "#unicorn-club #generated #en #accessibility #design-systems #ai #ux #platform-design #software-engineering #metrics"
---

## You Know What? Just Don't Split Words into Letters

**TLDR:** GSAP's SplitText plugin claims screen reader support, but testing across eight browser-screen reader pairings shows it fails in six of them. If you are splitting words into individual DOM elements for animation, you are almost certainly breaking accessibility.

**Summary:**

Adrian Roselli has been banging this drum for over a decade now, and frankly, it is maddening that we are still having this conversation in 2026. The core issue is deceptively simple: when you wrap each letter of a word in its own DOM element -- whether it is a `<div>`, a `<span>`, or a `<kern>` tag -- screen readers may announce each letter individually instead of reading the word. Or worse, they may announce nothing at all.

GSAP's SplitText plugin is the latest offender, and it is a particularly frustrating one because they explicitly claim screen reader support. Roselli tested their demo across every major screen reader and browser combination, and the results are brutal. Out of eight pairings, only NVDA with Firefox and TalkBack with Chrome actually worked. JAWS with Chrome? Silent. Narrator with Edge? Only the first letter. VoiceOver on macOS? Letter by letter. That is a catastrophic failure rate for something marketed as accessible.

The attempted ARIA fix does not hold up either. The demo uses `<div>` elements, which map to the generic role in the HTML Accessibility API Mapping. The generic role does not allow `aria-label`, so slapping one on there is technically invalid. Even when used on elements that do support it, `aria-label` may not auto-translate for users in different languages -- a detail the GSAP documentation conveniently omits.

Here is what the author is dancing around but not stating bluntly enough: the entire paradigm of splitting text into individual DOM nodes for visual effect is architecturally hostile to accessibility. There is no "doing it right." The approach itself is the problem. If GSAP, with their resources and expertise, cannot make it work reliably, what chance does a random developer on a deadline have? The answer is zero. Find another way to animate your text.

And in a delicious bit of same-day irony, the Tailwind team launched ui.sh with the same `aria-label` mistake on their homepage. The machines are not saving us from ourselves yet.

**Key takeaways:**
- Splitting words into individual DOM elements breaks screen readers in 6 out of 8 tested pairings
- `aria-label` on generic role elements like `<div>` is invalid per HTML AAM specification
- Even valid `aria-label` usage carries risks: no auto-translation, potential Label in Name conflicts
- If a well-resourced library like GSAP cannot make this pattern accessible, you certainly cannot either
- Stop splitting words into letters. Full stop.

**Link:** [You Know What? Just Don't Split Words into Letters](https://adrianroselli.com/2026/02/you-know-what-just-dont-split-words-into-letters.html)

---

## Your Design System Needs an Enforcer

**TLDR:** Design systems without active enforcement degrade into chaos through a thousand small compromises. The enforcer role is not about saying no -- it is about saying yes to the right things at the right time.

**Summary:**

Nielsen Norman Group makes a case that every design system needs a dedicated enforcer, and they are right, but the framing deserves some scrutiny. The article lays out the classic failure modes: teams optimize locally instead of globally, small deviations compound into a Frankenstein product, and designers need institutional backup when product managers push for "just this one exception."

The carousel example is perfect and painfully recognizable. One standard component. Every PM wants a "small" adjustment. Suddenly you have dozens of variations, engineers cannot maintain them, and customers are confused because the same pattern behaves differently on the same page. This is the tragedy of the commons applied to component libraries.

What is most valuable here is the practical enforcement framework. Review too early and there is nothing to evaluate. Review too late and teams have already shipped. The sweet spot is after initial design exploration but before final implementation. The three-team rule is elegant: if a change would help three or more teams, standardize it. If it is unique to one use case, it is an exception.

But there is something missing from this analysis. The article treats enforcement as primarily a governance problem, when it is also a tooling problem. In 2026, we should be talking about automated enforcement -- linting tools that catch design system violations at build time, automated visual regression testing, and CI pipelines that flag deviations before they reach code review. Human enforcers are necessary, but they do not scale. The combination of human judgment for ambiguous cases and automated enforcement for clear violations is the real answer.

The tension between the two failure modes -- too rigid versus too loose -- is real, and the article handles it well. A perfect system nobody uses is worthless. A slightly messy system that solves real problems is valuable. That is the kind of pragmatism we need more of.

**Key takeaways:**
- Without active enforcement, design systems degrade through accumulated "small" exceptions
- Time reviews strategically: after design exploration, before final implementation
- The three-team rule: if it helps three or more teams, standardize it
- Get executive and engineering support -- enforcement without authority is just suggestion
- A slightly messy system people actually use beats a pristine system they ignore

**Link:** [Your Design System Needs an Enforcer](https://www.nngroup.com/articles/design-system-enforcer/)

---

## The New UX Toolkit: Data, Context, and Evals

**TLDR:** UX designers need to move upstream from polishing AI outputs to shaping model behavior. The new toolkit is data, context, and evaluations -- not wireframes and prototypes.

**Summary:**

Paz Perez argues that UX is being left behind in the AI product development cycle, and the evidence is damning. Andrew Ng's framing of the product bottleneck explicitly excluded UX from the conversation. Engineering shapes models, product shapes strategy, and UX gets brought in downstream to "make the output feel nicer." That is not where the leverage is.

The core argument is that designers need to understand three new materials: data (what a model knows), context (what it considers in the moment), and evaluations (what counts as success). Writing system prompts, defining safeguards, and setting evaluation criteria -- these are design decisions, whether designers are making them or not. Right now, in most organizations, they are not.

The RISK framework -- Relevant, Inclusive, Safe, and Kind -- is a useful starting point for evaluation, though calling it a framework is generous. It is more of a checklist. The real meat is in the evaluation strategy: human evaluations for nuance, code-based evaluators for deterministic checks, and LLM-as-judge evaluators for quality dimensions that are hard to codify.

Here is what the article avoids confronting directly: the reason UX is being excluded is not just organizational inertia. It is a skills gap. Most UX designers do not understand how language models work, what a system prompt does, or how fine-tuning affects behavior. The article says "not to become AI engineers, but to understand how behavior emerges from systems." That is a nice aspiration, but it requires a fundamental retooling of UX education and practice. And the article conveniently ends with a pitch for a workshop, which undermines the urgency somewhat.

The point about AI models generating harmful content and the responsibility of design in setting safeguards is the most important and least developed section. Choosing not to implement strong safeguards is a design decision. That line should be in bold on every product team's wall.

**Key takeaways:**
- UX is being brought in too late -- after model behavior is already defined
- The new UX toolkit: data shapes what the model knows, context shapes what it considers, evals define success
- Writing system prompts and defining safeguards is design work
- Evaluation strategies should mix human review, code-based checks, and LLM-as-judge approaches
- Choosing not to implement safeguards is itself a design decision with real consequences

**Link:** [The new UX Toolkit: data, context, and evals](https://uxdesign.cc/the-new-ux-toolkit-data-context-and-evals-9bd09fea466d)

---

## AI's Text-Trap: Moving Towards a More Interactive Future

**TLDR:** AI assistants are reducing carefully crafted SaaS experiences to text-only interfaces. The fix is not generative UI but design-system-aware AI that renders rich, interactive components instead of paragraphs.

**Summary:**

Ishan Korde identifies a real and growing problem: as AI assistants become standard across SaaS products, they flatten sophisticated user experiences into text-based chat interfaces. Your carefully designed product becomes a commodity when users interact with it through Claude or ChatGPT via MCP instead of through your actual UI.

The article proposes three modes to escape the text trap. Mode 1, Rich Output, replaces text responses with UI components -- showing two contact cards side-by-side instead of describing them in paragraphs. Mode 2, UI as Input, replaces the text prompt with structured input components like query builders. Mode 3, Co-creation, is the most ambitious: the AI assistant becomes a workspace where users and AI collaborate on multi-step workflows, with fluid modality switching between text and direct manipulation.

The co-creation mode is genuinely compelling. The example of building a marketing automation campaign where the AI renders a flow builder, proactively surfaces analytics insights from connected tools, and handles delegated subtasks while the user focuses on structural logic -- that is a vision worth pursuing. The detail about contextual text prompts anchored to specific UI components rather than a generic chat box is particularly smart.

But the article glosses over the enormous implementation complexity. Making an AI assistant that can render arbitrary components from your design system, maintain state across a multi-step workflow, proactively pull data from connected tools, and handle delegation -- that is not a design challenge, it is a massive engineering undertaking. And the generative UI approach the article dismisses may actually be the more practical path for most teams, even if it produces "generic" results.

What is also missing is an honest assessment of whether users actually want this. The text interface is popular precisely because it is simple. Sometimes a paragraph is exactly the right response format. The push toward richer AI interfaces needs to be driven by genuine user needs, not by SaaS companies' fear of commoditization.

**Key takeaways:**
- AI assistants risk reducing differentiated SaaS products to commodity text interfaces
- Three modes to escape: Rich Output (UI components), UI as Input (structured inputs), Co-creation (shared workspace)
- Design-system-aware AI that renders native components preserves product differentiation
- Contextual prompts anchored to specific UI elements beat generic chat boxes
- The implementation complexity of rich AI interactions is far greater than the article acknowledges

**Link:** [AI's text-trap: Moving towards a more interactive future](https://uxdesign.cc/ais-text-trap-moving-towards-a-more-interactive-future-7035bbc4aaa5)

---

## Surfaces, Capabilities, and Extensions

**TLDR:** Every platform boils down to three layers: surfaces (the opinionated UI), capabilities (the engine underneath), and extensions (the ecosystem). Getting the balance right between these layers determines whether your platform thrives or dies.

**Summary:**

This is a clean mental model for thinking about platform design, and the three-layer framework -- surfaces, capabilities, extensions -- is one of those ideas that feels obvious once stated but is rarely articulated this clearly.

Surfaces are where opinion should be strongest. Notion has a point of view about blank pages. Figma has a point of view about tool placement. These reduce cognitive load. But when surfaces become ceilings, you lose the users who outgrow your defaults.

Capabilities are the engine underneath, and this is where long-term platform value lives. Stripe's API is richer than its dashboard. Shopify's admin is one surface over a massive capability layer. The critical insight here is that teams constantly conflate these two layers. Just because the UI does not show something does not mean the platform cannot do it. And just because you built a capability does not mean it needs a button.

The InVision cautionary tale is worth remembering. Strong surface -- simple prototyping from Sketch to clickable prototype -- but shallow capabilities. When Figma shifted the paradigm, there was no engine to adapt. Surface without depth is a death sentence in platform design.

The extension layer is where you admit you cannot anticipate every use case. The "desire paths" metaphor from urban planning is apt: you can fight the trails people wear into the grass, or you can pave them. VS Code, Slack, WordPress -- these treat extensibility as a first-class layer, not a bolted-on afterthought.

The most actionable advice: your ecosystem is prototyping for you. Every popular plugin is a feature request. Every Zapier workflow is a diagram of what your surfaces are missing. Watch what people build on top of your platform and "naturalize" the patterns that gain traction.

**Key takeaways:**
- Surfaces carry opinion and reduce cognitive load, but must not become ceilings
- Capabilities (the engine) hold long-term platform value, not the UI
- Do not conflate surfaces and capabilities -- not every capability needs a button
- Extensions admit you cannot anticipate every use case; treat third-party developers as co-creators
- Popular plugins and Zapier workflows are feature requests -- let your ecosystem prototype for you

**Link:** [Surfaces, capabilities, and extensions](https://www.proofofconcept.pub/p/surfaces-capabilities-and-extensions)

---

## Refactoring Internal Documentation in Notion

**TLDR:** One person spent eight hours scripting and curating Notion documentation after a Confluence migration, archiving 1,500 stale pages and establishing clear policies for ongoing maintenance. Practical, unglamorous, high-impact work.

**Summary:**

Will Larsen documents the concrete steps he took to fix his organization's documentation after a Confluence-to-Notion migration left behind a graveyard of stale pages. This is the kind of article I love because it is intensely practical and refreshingly honest about what actually works.

The diagnosis is familiar to anyone who has lived through a documentation migration: old pages that are "obviously wrong" create a bad smell around all docs, inconsistent approaches to Git-managed versus Notion-managed content lead to duplication, and duplication makes people create an N+1th version rather than debugging why N versions already exist. The insight about Notion AI changing the game is crucial -- when people primarily discover content through AI search rather than manual navigation, stale content tucked in quiet corners becomes actively harmful because it pollutes AI responses.

The implementation is clever within Notion's constraints. Since Notion has no real archive functionality that excludes documents from search, Larsen created a private "Archive" teamspace and a public "Scheduled to Archive" teamspace, with a weekly script migrating between them. Practical, not elegant, but it works.

The scripting approach is where it gets interesting: one script to prune pages where all children were last edited more than N days ago (archiving about 1,500 pages), a second to find current pages buried in stale hierarchies and promote them, and a third to find broken links after the mass migration. All of this was done within Notion's API limitations, which are considerable -- you cannot get verification status on non-wiki pages, you cannot retrieve all pages in a teamspace directly, and there is no programmatic visibility into page views or usage.

What is missing is a discussion of prevention. The cleanup is admirable, but without changing the incentives and habits that created the mess, you are just resetting the clock. The policy statements are good -- "everyone tidies our documentation," "prefer natural documentation in version control" -- but policies without enforcement mechanisms tend to decay. This is the same problem as design systems: you need an enforcer.

**Key takeaways:**
- Notion AI discovery changes the calculus: stale content in quiet corners actively harms AI search results
- Archive functionality can be simulated with private teamspaces and scheduled migration scripts
- Scripted pruning by last-edited date is effective for mass cleanup (1,500 pages archived)
- Find and fix broken links after mass archival to prevent a "haunted forest" of dead references
- Eight hours of one person's time, zero hours of anyone else's -- high leverage documentation work

**Link:** [Refactoring internal documentation in Notion](https://lethain.com/refactoring-internal-docs-notion/)

---

## TBM 405: Hope, Context, and Control

**TLDR:** The tension between legibility (standardized, manageable information) and metis (local, tacit knowledge) is being amplified by AI. Whether AI becomes a tool for collective sensemaking or top-down control depends on choices being made right now.

**Summary:**

John Cutler takes on the fundamental tension at the heart of modern product organizations: the gap between what systems of record capture and what people actually know. He frames this through James C. Scott's distinction between legibility and metis -- the locally grounded, experience-based, tacit knowledge that people use when the map no longer matches the terrain.

The "Rollup Systems" framing is devastating. These are tools designed so leadership can "see everything in one place, nicely rolled up, everything adding up, into neat and tidy apples-to-apples abstractions, such that everyone gets the warm and fuzzy feeling they are managing a simple or complicated system, and not an emergent, complex, sociotechnical system." There is a lot of record, and only a little bit of truth, but that truth is very seductive.

The AI research findings are fascinating. When employees got AI tools, they talked to each other more, not less. Specialists became knowledge magnets. Generalists shipped 28 percent more projects. The organizational network literally rewired in three months. This is the optimistic read: AI as a catalyst for collaboration and context sharing.

But Cutler does not let us stay comfortable. The pessimistic read is equally plausible: if you can harness the hive mind of creative decision-makers, you can ultimately replace them. AI becomes a tool for more legibility and top-down control because context is no longer the moat when it becomes ubiquitous. And this is not hypothetical -- Cutler points to real techno-authoritarian movements in tech that explicitly advocate for centralized algorithmic control over humanistic complexity.

The article is at its strongest when it acknowledges both realities simultaneously. It is okay to be optimistic and pessimistic at the same time. To see real possibilities and understand the depth of what is at stake. That is a more honest framing than the "Best Of Times!" LinkedIn posts or the doom-and-gloom predictions.

**Key takeaways:**
- Systems of record capture legibility but miss metis -- the tacit knowledge where real value lives
- "Rollup Systems" give leadership a false sense of control over complex sociotechnical systems
- AI research shows increased collaboration, specialist value, and generalist productivity -- optimistic signs
- The pessimistic read: AI could enable extraction and replacement of collective tacit knowledge
- Both optimistic and pessimistic interpretations are simultaneously valid -- hold the tension honestly

**Link:** [TBM 405: Hope, Context, and Control](https://cutlefish.substack.com/p/tbm-405-hope-context-and-control)

---

## The Circular Logic of Our Metrics

**TLDR:** The attention economy's toxic logic has infected professional decision-making. Dashboard metrics rarely reflect actual strategy, and chasing them is not the same as doing valuable work.

**Summary:**

Pavel from Product Picnic draws a direct line from consumer attention-economy dynamics to internal product team dysfunction, and it is a line that deserves more examination than it usually gets.

The starting observation is sharp: "intuitive" is not actually a thing. It is shorthand for "familiar." Users demand intuitive software, stakeholders use "it is not intuitive" to veto designs they dislike, but nobody can define it precisely. This matters because it reveals how design patterns reproduce themselves -- through familiarity bias, not quality assessment.

The concept of "universal phantom obligation" is the standout idea. Every experience is designed to yell at you because that is what stakeholders have seen other experiences do. Notification-heavy software trains us to create notification-worthy outputs. The toxic logic of consumer algorithms makes its way back to the very designers building those systems. Your professional decision-making is shaped by the same engagement-maximizing dynamics you are building for users.

The most actionable advice: reverse-engineer the strategy out of your metrics. Bureaucracies track what is easiest to measure, not what is most relevant. What trickles down to individual contributors is often just metrics, not actual strategy. If you can distinguish signal from noise in your dashboard, you can identify which metrics anyone actually cares about -- and those may not appear on the dashboard at all.

The counterintuitive closing point is worth highlighting: under-appreciated domains like internal tooling, where nobody has given any thought to success criteria, may be the best opportunity to define your own meaningful metrics. When no one is watching the dashboard, you have the freedom to optimize for what actually matters.

What the article does not address is the structural problem: even if individual practitioners see through the metrics theater, organizational incentive structures still reward dashboard performance. You cannot solve a systemic problem with individual enlightenment.

**Key takeaways:**
- "Intuitive" means "familiar" -- design patterns propagate through recognition, not quality
- Universal phantom obligation: every product yells at you because other products do
- The attention economy's toxic logic infects professional decision-making through the same tools we build
- Reverse-engineer strategy from metrics to separate signal from noise
- Under-appreciated domains like internal tooling offer freedom to define meaningful success criteria

**Link:** [The circular logic of our metrics](https://productpicnic.beehiiv.com/p/the-circular-logic-of-our-metrics)

---

## Setting Incentives: Aligned Incentives

**TLDR:** You cannot stop people from gaming incentives, but you can choose the game. Three principles: know your desired outcome first, use multiple metrics to create healthy tension, and align incentives across groups.

**Summary:**

Michal wraps up a three-part series on incentives with practical principles for designing incentive systems that actually work. The core insight is not new but bears repeating: setting incentives is manipulation, and pretending otherwise leads to worse outcomes than being intentional about it.

The three principles are sound. First, know your desired outcome before choosing metrics -- this sounds obvious but is violated constantly. The Hanoi rat example from earlier in the series is perfect: paying for cut rat tails was a proxy metric that completely failed to achieve the actual goal of reducing the rat population. People just bred rats. Second, single metrics create tunnel vision while multiple metrics create healthy tension. Revenue alone does not guarantee quality deals, but revenue plus retention plus satisfaction together makes gaming much harder. Third, align incentives across groups so shared principles create shared direction.

The Basecamp example is elegant: employees who have been there more than two years get a share of profits, one share per month, with 10 percent of profits distributed annually. Simple, transparent, aligned with long-term thinking. The Substack model is even cleaner -- writers earn, Substack takes a cut. Incentives are perfectly aligned.

The six-question checklist at the end is genuinely useful: What behavior are you trying to encourage? What metrics support the desired outcome? How will people game the metrics? What are second-order consequences? What will this incentive cause people to stop doing? Are these incentives aligned across groups? If you cannot confidently answer all six, you need more iteration.

What is absent from the discussion is power dynamics. Incentive design is not a neutral, collaborative process. The people setting incentives and the people subject to them have fundamentally different interests. The article treats incentive design as a benevolent engineering problem, but in practice it is often a tool of organizational control, which connects directly to the legibility-versus-metis tension from Cutler's piece earlier.

**Key takeaways:**
- Setting incentives is manipulation -- be intentional about it rather than pretending otherwise
- Single metrics create tunnel vision; multiple balanced metrics create healthy tension
- Second-order thinking is essential: once you hit the metric, then what?
- Transparency about what is measured, how it is weighted, and why it matters builds trust
- Six diagnostic questions can reveal whether your incentive system needs more iteration

**Link:** [Setting Incentives](https://read.perspectiveship.com/p/setting-incentives)

---

## The Third Golden Age of Software Engineering

**TLDR:** Grady Booch argues we are in the third golden age of software engineering -- the age of systems -- and AI tools represent another rise in abstraction, not the end of engineering. The existential panic is nothing new; the profession has survived every previous wave.

**Summary:**

Gergely Orosz sits down with Grady Booch, co-creator of UML and one of the most influential figures in software engineering history, to put the current AI panic in historical context. And honestly, there is no better person to do it. When someone who has been in the field since before the term "software" existed tells you to calm down, it is worth listening.

Booch frames three golden ages: the age of algorithms (1940s to 1970s), the age of object-oriented abstractions (1970s to 2000s), and the current age of systems. Crucially, this third age did not start with ChatGPT -- it started with the rise of abstraction from individual components to whole libraries, platforms, and packages. AI fits into this trajectory as another layer of abstraction, not as a discontinuity.

The historical parallel to compilers is apt. When higher-level languages emerged, developers feared obsolescence. Assembly programmers thought Fortran would make them irrelevant. It did not. It changed what they worked on. Booch frames current AI coding tools the same way: "Fear not, developers. Your tools are changing, but your problems are not."

The nuance that most AI commentary misses is here in force. Current AI tools are trained mostly on patterns we have already seen -- they excel at automating known patterns, especially web-centric CRUD systems, but the frontier of computing is far larger. Infrastructure and delivery pipelines are identified as low-hanging fruit for automation, and people in those roles will genuinely need to re-skill. That is an honest assessment, not a hand-wave.

The most provocative observation: AI lets you redirect attention from friction to imagination. When constraints and costs of development disappear, the bottleneck shifts to what you can imagine building. That is exciting, but it also means the skills that matter are shifting from execution to systems thinking, judgment, and imagination. Not everyone will make that transition comfortably.

What Booch does not adequately address is the economic pressure. Even if software engineering is not dying, the number of engineers needed for a given unit of output is likely decreasing. "Your problems are not changing" does not address "your employer may need fewer of you to solve them." The golden age may be golden for the field, but that does not guarantee it is golden for every individual practitioner.

**Key takeaways:**
- Three golden ages: algorithms (1940s-70s), object-oriented (1970s-2000s), systems (now)
- AI tools are another rise in abstraction, comparable to compilers -- not the end of engineering
- Current AI is trained on known patterns; the frontier of computing is far larger than CRUD apps
- Infrastructure and delivery pipelines are genuinely at risk of automation-driven displacement
- The bottleneck is shifting from execution to imagination -- deep foundations matter more than ever

**Tradeoffs:** The shift from execution to systems thinking creates winners and losers. Engineers who understand complexity at scale will see greater demand. Those focused purely on implementation of known patterns face real displacement risk.

**Link:** [The third golden age of software engineering](https://newsletter.pragmaticengineer.com/p/the-third-golden-age-of-software)