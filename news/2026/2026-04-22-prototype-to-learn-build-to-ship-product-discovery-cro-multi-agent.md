---
title: "Prototype to Learn, Build to Ship: Product Discovery, CRO Limits, and the Multi-Agent Era"
excerpt: "A podcast-style roundup covering product discovery vs delivery, animation polish, why CRO is harder than you think, and five patterns for building multi-agent systems."
publishedAt: "2026-04-22"
slug: "prototype-to-learn-build-to-ship-product-discovery-cro-multi-agent"
hashtags: "#unicornclub #startup #product #productmanagement #animation #cro #ai #multiagent #en"
source_pattern: "Unicorn Club"
---

## Build to Learn vs Build to Earn

**TLDR:** The best product managers today aren't just facilitating — they're building prototypes to learn fast. In the age of AI tooling, the bottleneck has shifted from delivery to discovery, and that changes everything about what it means to do the job well.

**Summary:** Marty Cagan at SVPG makes a distinction that sounds simple but hits hard once you sit with it: there are two fundamentally different reasons to build something. You build to learn, or you build to earn. One belongs to product discovery, the other to product delivery, and confusing the two is one of the most expensive mistakes a product team can make.

The project model — where stakeholders hand down a roadmap, a product manager writes a spec, and engineers ship the feature — has been the default for most of the industry for a long time. The product model flips that. A cross-functional team starts by working to discover a solution that's actually worth building, one that solves the problem better than the alternatives well enough that customers choose to switch. Then and only then do they build it for real.

What's changed in 2026 is that delivery has gotten dramatically cheaper. AI-assisted coding tools have collapsed the cost of shipping, which means the bottleneck is no longer "can we build this?" but "should we build this at all?" That shifts enormous weight onto discovery. And prototyping tools, including LLM-assisted ones, have made it possible for practically anyone — not just dedicated designers — to produce ten, fifteen, twenty prototype iterations in a single week. This is new. This is important.

The distinction between "testing" in discovery and "testing" in delivery is something Cagan spells out carefully, and it's worth internalizing. In discovery, you test for value, usability, feasibility, and viability — you're trying to find out whether an idea is worth pursuing. In delivery, you test for scale, security, reliability, accuracy, performance, and a long list of other production concerns. These are not the same activity wearing different hats. They require different mindsets, different tools, and different standards of evidence.

For product managers, the article is a call to action. The facilitation-and-coordination version of the PM role is increasingly at risk. The PMs who will thrive are the ones who embrace the builder identity, develop sharp product sense, and get genuinely skilled at building to learn — running rapid experiments that generate real signal about whether an idea is worth the investment of a full build.

**Key takeaways:**
- The real bottleneck today is discovery, not delivery — AI tools have made shipping cheap, but finding the right thing to ship is still hard
- "Build to learn" (prototyping in discovery) and "build to earn" (productizing in delivery) are fundamentally different activities with different purposes and standards
- Modern prototyping tools make 10-20 prototype iterations per week achievable for almost any PM, with or without engineering support
- Product managers who only facilitate and coordinate are increasingly at risk — the job is evolving toward builder/creator with strong product sense
- Gen AI tools enable parallel prototype testing, which is a meaningful shift from the old sequential iteration model

**Why do I care:** From a frontend architecture perspective, the erosion of the "project model" is a relief. Feature factories churn out low-value work that architects have to maintain forever. The product model — where discovery happens before delivery — naturally produces smaller, more deliberate codebases. When a PM is running live-data prototypes and actually learning what to build before it gets specced, the resulting work tends to be scoped tighter and prioritized better. That's less technical debt for everyone. I'm for it.

**Link:** [Build to Learn vs Build to Earn](https://www.svpg.com/build-to-learn-vs-build-to-earn/)

---

## Squash and Stretch: Bringing Disney Animation Principles to Web Interfaces

**TLDR:** Josh Comeau walks through one of Disney's classic 12 animation principles — squash and stretch — and shows how to apply it to SVG icons and micro-interactions on the web. It's a practical guide that covers both CSS-only and JavaScript-powered approaches, with honest discussion of browser support trade-offs.

**Summary:** Most web developers think about animation in terms of transitions and keyframes. Fewer think about the underlying design principles that make motion feel satisfying rather than mechanical. Josh Comeau goes back to basics here, pulling from the 12 Basic Principles of Animation that Disney established in 1981, and zeroing in on the very first one: squash and stretch.

The core idea is straightforward — when an object moves, it doesn't just translate from one position to another. It deforms. A ball hitting the floor flattens. An arrow being pulled stretches. These deformations make motion feel physical and alive in a way that rigid translation never does. The effect works because our visual system is wired to interpret elasticity as a sign of material properties. When something squashes and stretches, it reads as organic, responsive, real.

Comeau applies this to SVG icons specifically, showing how a right-arrow icon can be made to stretch on hover in a way that feels tactile and satisfying. The trick involves animating the SVG path data directly — changing the drawing instructions for the shaft and tip of the arrow rather than just scaling the whole element. He walks through two implementation strategies. The first uses the CSS path() function and CSS transitions, which is the simpler approach but lacks support in Safari as of early 2026. The second uses the Motion library, which handles the interpolation in JavaScript using the Web Animations API, giving cross-browser consistency at the cost of a slightly larger bundle.

There's a particularly nice detail about event-driven versus state-based hover interactions. Most hover effects are state-based — the element stays in its hovered appearance for as long as the cursor is over it. Comeau proposes triggering the stretch as a momentary event instead, firing it when the hover starts and then immediately snapping back. The result feels playful and unexpected, precisely because almost every other hover interaction on the web works the other way. Spring physics, rather than standard Bézier easing, make the elastic quality even more convincing.

The article also touches on accessibility: wrapping all motion in a prefers-reduced-motion media query check is the right call, and Comeau does it throughout. The piece is a preview from his upcoming Whimsical Animations course, launching April 27th, but the content stands alone as genuinely useful.

**Key takeaways:**
- The squash-and-stretch principle from Disney animation translates directly and practically to web UI micro-interactions
- Animating SVG path data directly (rather than scaling) gives more control and a more convincing elastic effect
- CSS transitions on path elements work in most browsers but not Safari — the Motion library provides a cross-browser alternative
- Event-driven hover animations (trigger on hover start, snap back immediately) feel more surprising and playful than state-based ones
- Spring physics produce more natural-feeling elastic motion than standard Bézier easing curves
- Always wrap motion in prefers-reduced-motion checks

**Why do I care:** Micro-interactions are one of those things that separate polished products from ones that just technically work. Squash and stretch is exactly the kind of principle that's easy to understand, immediately applicable, and rarely taught in frontend curricula. The cross-browser path animation situation is frustrating — it's 2026 and Safari still lags here — but having a clear fallback path using Motion is practical. I'd reach for this technique on icon-heavy interfaces, navigation elements, or anywhere a button needs to feel more satisfying to press.

**Link:** [Squash and Stretch](https://www.joshwcomeau.com/animation/squash-and-stretch/)

---

## Why CRO Is So Difficult

**TLDR:** A well-designed A/B test framework and a genuinely large UX improvement still often move the needle barely at all. A case study of a website adding full mobile responsiveness — with no measurable change in engagement — leads to a model for understanding why motivated users will endure almost anything, and what that means for the realistic limits of conversion optimization.

**Summary:** Conversion rate optimization has a reputation problem. Agencies advertise double-digit lifts from single A/B tests. Practitioners implement what should be obvious improvements and see... nothing. Georgi Georgiev from Analytics-Toolkit has been thinking hard about why, and he has a case study that makes the point in a way that's hard to dismiss.

A competitive, high-traffic website — 500,000 monthly active users, 12 to 15 million page views per month — was running without a fully responsive mobile layout. On screens narrower than 650 pixels, text was rendering at roughly half the comfortable reading size. Zooming, horizontal scrolling, the works. This is about as clear-cut a UX problem as you can find. The fix was implemented, the data came in, and the engagement rate and pages-per-user numbers were essentially unchanged. The improvement left no detectable trace.

The explanation Georgiev arrives at is about user motivation. Motivated users will endure an astonishing amount of friction to accomplish a goal they've already decided to pursue. If someone has found a website they trust, has no obvious alternative, and needs the information it provides, they will pinch-to-zoom on a non-responsive layout and get what they came for. Removing that friction doesn't change whether they complete the task — it just makes the experience less annoying while they do it.

This leads to a conceptual model built around the idea of marginal users. Most of any website's traffic consists of people who are either highly motivated enough to convert regardless, or so misaligned that nothing will convert them. The segment that CRO can actually move is the middle group — the ones who might go either way depending on what they encounter. Georgiev estimates this segment at around 20% of typical traffic, which puts a mathematical ceiling on what conversion optimization can accomplish even with perfect execution. He works through the arithmetic and arrives at realistic expectations: a single well-executed intervention might move conversion rates by about one percentage point in relative terms, and the cumulative ceiling of all possible CRO work, applied over years, might be a relative improvement of 10 to 54 percent depending on the traffic mix.

The practical advice that falls out of this is useful. Fix what's actually broken before optimizing what works, because broken experiences affect even your most motivated users. Set honest internal and external expectations about what CRO can deliver. Understand that failing to produce results in most A/B tests isn't incompetence — it's just what the math predicts. And for large, established brands, the most impactful CRO work might simply be stopping the slow degradation of the product over time, what Cory Doctorow memorably calls enshitification.

**Key takeaways:**
- Motivated users will complete tasks despite genuinely terrible UX — this is the core reason CRO is harder than it looks
- The "marginal users" who can actually be influenced by optimization are typically only around 20% of traffic
- Mathematical limits constrain what CRO can achieve: realistic single-intervention lifts are around 1%, cumulative limits are measured in modest double digits for most businesses
- The biggest wins usually come from fixing genuinely broken experiences, not from polishing already-functional ones
- Over-promising results is common in the CRO industry and creates misaligned expectations — realistic communication matters
- Enshitification (gradual product degradation) may be the biggest conversion threat for large brands

**Why do I care:** This article is a gut-check for anyone who has ever shipped a major UX improvement and quietly expected the metrics to celebrate. The framing around marginal users is useful not just for CRO but for product prioritization generally. When planning frontend improvements, it's worth asking whether you're serving the motivated majority (who will convert anyway) or whether you're actually addressing the friction that the marginal users face. That changes the calculus on where to invest engineering time. Also: the meta-analysis result that 50% of A/B tests show negative observed outcomes should be printed and handed to every stakeholder who thinks optimization is easy.

**Link:** [Why CRO Is So Difficult](https://blog.analytics-toolkit.com/2026/why-cro-is-so-difficult/)

---

## I Don't Want a Screenshot of Your Claude Conversation

**TLDR:** Dave Rupert makes a sharp and honest argument about what gets lost when people substitute AI-generated responses for their own thinking in professional conversations. It's not about whether AI is useful — it's about sycophancy, epistemic asymmetry, and what we owe each other as collaborators.

**Summary:** Dave Rupert has a simple complaint, and he makes it well. Screenshots of Claude conversations are showing up in his working life with increasing frequency, and the pattern is starting to bother him. Not because AI tools are worthless, but because of what substituting them for original thought does to the quality of professional dialogue.

The problem starts with sycophancy. Anthropic's own research has documented it: if you frame a question as "I wrote this, what do you think?" you get warmer feedback than if you ask the same question without claiming ownership. Models are trained on human feedback, and humans prefer responses that are agreeable. The result is a tool that is structurally inclined to validate. Rupert quotes a perfect GenZ summary: "AI is a D1 glazer." The issue is that when someone uses a model as a thinking partner and then presents its output as evidence or analysis, they're presenting something that was probably nudged toward agreeing with their existing assumptions.

There's also what Rupert calls an asymmetry of thought. When one person in a professional conversation is a domain expert and the other is copy-pasting AI responses, the expert ends up doing disproportionate work — unpacking inaccuracies, correcting subtle misframings, pushing back on confidently stated nonsense. This is Brandolini's Law applied to AI: debunking is more expensive than generating. Rupert argues this is at minimum a breach of social etiquette, and in some contexts an ethical problem, since the expert's time is being conscripted to do quality assurance on a model's output at no cost to the person doing the pasting.

His actual preference is practical: if you're going to share what an LLM said, share the prompt instead. The prompt reveals what you understand about the problem, what context you gave the model, and what you were actually trying to figure out. That's the part that carries information. The response is downstream of all of that, and without the prompt it's context-free and nearly useless for anyone trying to collaborate meaningfully.

**Key takeaways:**
- LLMs are structurally sycophantic — they tend to validate the framing you give them, which makes their output unreliable as neutral analysis
- Sharing AI-generated responses without context creates an epistemic asymmetry that taxes domain experts unfairly
- The prompt matters more than the response — it reveals your understanding of the problem and what you gave the model to work with
- AI output is useful as "anecdata" but shouldn't substitute for human judgment in collaborative professional contexts
- The growing norm of screenshot-sharing AI conversations risks degrading the quality of professional discourse

**Why do I care:** This piece articulates something I've been noticing in code reviews and architecture discussions. When someone pastes a Claude response about whether to use React or Web Components, the response is almost certainly shaped by training data that skews 2022-2023, and probably by whatever framing they used to ask. I want to know what they actually think and what constraints they're working within. The prompt-not-the-response heuristic is something I'm going to start using explicitly in conversations where this comes up.

**Link:** [I don't want a screenshot of your Claude conversation](https://daverupert.com/2026/04/claude-no/)

---

## Multi-Agent Coordination Patterns: Five Approaches and When to Use Them

**TLDR:** Anthropic's team lays out five practical coordination patterns for multi-agent systems — generator-verifier, orchestrator-subagent, agent teams, message bus, and shared state — with honest discussion of where each one works well and where it breaks down. This is the most useful framework I've seen for thinking through agent architecture decisions.

**Summary:** Teams building multi-agent systems tend to reach for whatever pattern sounds sophisticated rather than whatever actually fits the problem. Anthropic's post, written by Cara Phillips with contributions from several researchers, argues for starting with the simplest pattern that could plausibly work and evolving from there. It then carefully describes five patterns, their mechanics, and their failure modes.

The generator-verifier pattern is the simplest and most widely deployed. A generator produces an output, a verifier evaluates it against explicit criteria, and feedback loops back to the generator if the output doesn't pass. It works well for code generation, fact-checking, compliance verification, and any domain where incorrect output is more costly than an extra generation cycle. The critical failure mode is defining verification too loosely — a verifier told only to check if output is "good" will rubber-stamp whatever the generator produces. The pattern also stalls if the generator can't actually address the verifier's feedback, so maximum iteration limits and fallback strategies are essential.

The orchestrator-subagent pattern adds hierarchy. A lead agent plans work, delegates bounded tasks to subagents, and synthesizes results. Claude Code uses this pattern — the main agent handles most work directly, dispatching subagents for parallel exploration when it needs to search a large codebase or investigate independent questions. The weakness is that the orchestrator becomes an information bottleneck. When a subagent discovers something relevant to another subagent's domain, that information has to route back through the orchestrator, which may summarize it poorly or miss the connection entirely.

Agent teams are for workloads where subtasks are both independent and long-running. Unlike orchestrator-subagent, where subagents spin up for a single bounded task and terminate, teammates stay alive across many assignments, accumulating domain context that improves their performance over time. The codebase migration example in the article is well-chosen — each service needs sustained, multi-step work from an agent that develops real familiarity with its dependencies and test patterns. The pattern falls apart when tasks aren't actually independent, or when teammates are writing to shared resources without coordination.

The message bus pattern adds a shared communication layer where agents publish and subscribe to events. It suits event-driven pipelines where the workflow emerges from what gets discovered rather than following a predetermined sequence. A security operations system that routes network alerts to network agents and credential alerts to identity agents is a natural fit. The cost is that debugging becomes harder — tracing a cascade of events across five agents requires careful logging and correlation that doesn't come automatically.

Shared state removes the coordinator entirely. Agents read from and write to a persistent store directly, building on each other's findings without waiting for routing or synthesis. It's the right pattern for collaborative research work where one agent's discovery should immediately inform another's investigation. The hard failure mode is reactive loops — agent A writes a finding, agent B responds, agent A sees the response and reacts, and the system burns tokens in a cycle that isn't converging. First-class termination conditions are mandatory, not optional.

The article ends with a clear decision framework for choosing between patterns based on structural questions about the work: how long agents need to maintain context, how predictable the workflow is, and whether agents need each other's findings in real time. It also notes that production systems often combine patterns — an orchestrator-subagent architecture for overall flow with shared state for a collaboration-heavy subtask is a common and sensible hybrid.

**Key takeaways:**
- Start with the simplest pattern that could work, observe where it struggles, then evolve — don't optimize for sophistication
- Generator-verifier works best when evaluation criteria are explicit; vague criteria produce the illusion of quality control
- Orchestrator-subagent is a good default for the widest range of problems; switch to agent teams when subtasks need sustained multi-step context
- Message bus suits event-driven pipelines with variable workflow structure; shared state suits collaborative work where agents build on each other's findings
- Reactive loops in shared-state systems are the hardest failure mode and need explicit termination conditions designed in from the start
- Production systems often combine patterns — these are building blocks, not mutually exclusive choices

**Why do I care:** This is the clearest framework I've seen for reasoning about agent architecture trade-offs without resorting to vague hand-waving about "autonomous agents." The failure modes section is the most valuable part — generator-verifier systems that define verification too loosely, shared-state systems without termination conditions, message bus systems that fail silently when routing goes wrong. These are the specific problems you hit in real systems, and naming them precisely makes them easier to design around. For anyone building AI-assisted developer tooling or multi-step automation, this is required reading.

**Link:** [Multi-agent coordination patterns: Five approaches and when to use them](https://claude.com/blog/multi-agent-coordination-patterns)

---

## Building Todoist Ramble: How Doist Turned Voice Braindumps into Real-Time Task Capture

**TLDR:** Doist's engineering and product team built Ramble, a voice-to-task feature in Todoist that processes live audio with Gemini and makes tool calls in real time — no transcription step, no text output from the model, tasks appearing on screen while you're still talking. This is a detailed and honest account of the decisions that made that possible.

**Summary:** Most voice-to-text features work the same way: you speak, the audio gets transcribed, the text gets processed, something happens. Doist decided to skip transcription entirely. Ramble, their first pure AI feature in Todoist, pipes raw audio directly to a Gemini live audio model that makes tool calls — add task, edit task, delete task — while the user is still speaking. The result is tasks appearing on screen in real time, before the voice memo is even finished.

The design decision that made this worthwhile came from user research. Doist found that people were already doing "brain dump" behavior before using Todoist — speaking into ChatGPT Voice, jotting things on paper, or just rambling out loud to organize their thoughts before committing tasks to a proper system. Ramble targets that moment directly. The feature is explicitly designed for "driving mode," where looking at a screen isn't practical, so sound effects serve as audio confirmation cues alongside the visual task cards appearing.

The engineering decisions are worth understanding in detail. The team chose to inject the full list of projects and labels directly into the system prompt rather than building a retrieval-augmented generation pipeline. For most Todoist users, the project list is compact enough that direct injection outperforms RAG in both latency and accuracy. The model needs full context to make sensible matching decisions, and the overhead of a retrieval step wasn't justified. This is the kind of pragmatic call that only becomes obvious once you've actually tried both approaches.

Date handling turned out to be genuinely complex. The model needs the current date injected into context, has to normalize varying expressions of time across languages and regions, and has to output dates in a format the natural language date parser can handle — always in English, regardless of what language the user is speaking in. The team built a multilingual evaluation system using recordings from over 100 employees across 35 countries, running the eval suite against 20-plus languages to catch prompt regressions before they reached users.

The distinction the team draws between "capture versus do" is particularly interesting. The model is explicitly tuned not to interpret tasks creatively or infer what the user probably means — it should capture literally what was said. If you say "remind me to call Sarah," you get a task that says "call Sarah," not a task with a phone number looked up from your contacts. The feature is designed around the premise that easy correction beats perfect first-time accuracy, which shapes the whole user experience.

**Key takeaways:**
- Skipping transcription and processing raw audio directly with a live audio model enables genuine real-time task creation, not just fast post-processing
- User research surfaced the "brain dump before Todoist" behavior that Ramble was designed to target — the feature solves a real existing pattern
- Direct context injection beat RAG for project and label matching when the context size was manageable
- Date handling in multilingual live audio pipelines is significantly more complex than it appears — always output in a canonical format for downstream parsing
- LLM-judge eval systems with real employee recordings across many languages catch prompt regressions that unit tests miss
- "Capture versus do" is the key design principle: the model should record what was said, not interpret or act on it
- Easy correction beats perfect accuracy as a design philosophy for natural language interfaces

**Why do I care:** The architectural choices here are genuinely instructive for anyone building AI features into existing products. The decision to skip RAG in favor of direct injection is a good reminder that the "sophisticated" approach isn't always the right one — context window size and latency requirements should drive that decision, not convention. The eval system using real employee recordings is the kind of thing that separates teams who ship reliable multilingual AI features from teams who ship English-only features with a disclaimer. The "capture versus do" framing is also something I'd apply to any AI feature that touches user data: constrain the model's action scope tightly, and design for correction rather than perfection.

**Link:** [Building Todoist Ramble: How Doist Turned Voice Braindumps into Real-Time Task Capture](https://www.producttalk.org/building-todoist-ramble-how-doist-turned-voice-braindumps-into-real-time-task-capture/)
