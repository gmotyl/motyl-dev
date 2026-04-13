---
title: "AI Blind Spots, Spec-Driven Architecture, and Why Go's Context Is Nothing Like React's"
excerpt: "From the fundamental reasons AI stumbles on frontend work, to spec-driven development as the next abstraction leap, to a TypeScript developer's honest account of misusing Go's context package — this week's batch covers the ideas shaping how we build software in 2026."
publishedAt: "2026-04-13"
slug: "daily-dev-ai-frontend-sdd-go-context-2026-04-13"
hashtags: "#dailydev #frontend #webdev #golang #typescript #ai #architecture #generated #en"
source_pattern: "daily.dev"
---

## Why AI Sucks at Front End

**TLDR:** AI coding tools are genuinely useful for boilerplate and token migration, but they fall apart the moment frontend work gets bespoke, complex, or accessibility-sensitive. The author from nerdy.dev runs through four structural reasons why this isn't going to change anytime soon.

This is one of those posts that says out loud what a lot of frontend developers have been thinking quietly. The title is blunt and so is the argument. AI trained mostly on template-heavy tutorial content is going to produce template-heavy tutorial output. That's not a bug in some model's training run — it's a direct consequence of what the internet is mostly made of. Generic scaffolding, generic patterns, and a whole lot of Stack Overflow answers written for the median use case.

The author identifies four specific failure modes. First, training data that lags behind modern CSS. If you need container queries, cascade layers, or logical properties, you're fighting the model's prior. It knows the old syntax better than the new one, and it'll confidently hand you an approach that would have been fine in 2019. Second, and this one is critical: LLMs cannot actually render anything. They have no idea whether the UI they generated looks right. They're stabbing in the dark every time, and when you tell them something's broken, they adjust probabilistically rather than visually. The feedback loop that every frontend developer depends on — see it, fix it, see it again — is completely absent from the model's experience.

Third, the models don't understand architectural intent. They have no concept of why you're building a state machine instead of a flag-based switch, or why you're using BDD to drive a component's behavior. They'll happily flatten that structure into something that passes a surface-level review but misses the point entirely. Fourth — and this is the one that doesn't get talked about enough — the execution environment for HTML and CSS is genuinely chaotic. You can pin a Node version. You cannot pin a browser, a viewport, an input modality, a user's font size preference, or their OS accessibility settings. The model ignores all of that until you spell it out, and even then the results are inconsistent.

What the post doesn't say, but what's worth naming: the comments are more nuanced than the title suggests. Several readers point out that models with vision capabilities have existed for a while, and that "context engineering" — writing richer, more structured prompts — closes some of these gaps. That's fair. But it also means the burden shifts back onto the developer to compensate for what the model lacks. And for complex, evolving components, that compensation overhead isn't free.

**Key takeaways:**
- AI performs well on repetitive, well-worn frontend patterns but degrades sharply on bespoke or complex UI work
- LLMs have no rendering capability and no visual feedback loop, making pixel-level and layout work structurally difficult for them
- Accessibility output from AI is often performative rather than correct — aria attributes thrown at a wall
- The unpinnability of browser environments is a genuine mismatch with how LLMs model deterministic systems
- Providing richer architectural context in prompts helps, but shifts real cognitive effort back to the developer

**Why do I care:** As a senior frontend developer or architect, this matters because it shapes how you evaluate AI-assisted development in your team. The wins are real and worth capturing — token migration, scaffolding, tedious repetition. But the article is a useful corrective against the assumption that AI will eventually handle all of it. For anything that touches visual correctness, accessibility, or bespoke interaction design, you still need a human who can see and judge the output. The failure mode isn't that AI gets it wrong sometimes — it's that it gets it wrong confidently, which is a different and more dangerous kind of wrong.

**Link:** [Why AI Sucks At Front End](https://nerdy.dev/why-ai-sucks-at-front-end)

---

## Go's context Isn't React's Context — Think AbortSignal

**TLDR:** Supriya Kotturu, coming from a TypeScript and React background, made the classic mistake of treating Go's context package like a global state store. It's not. It has two jobs: carry request-scoped values and propagate cancellation signals across goroutines.

This is a genuinely useful piece of technical writing, the kind that comes from actually getting something wrong and then understanding it properly afterward. The author describes storing database connections and app config directly in Go's context, the way you might pass values through React's Context API. It compiles, it runs, and it's wrong. Go's context values resolve to the empty interface — there's no type safety, no compiler help, and if the type assertion fails, you get a runtime panic. For anyone coming from TypeScript, that's a significant and specific kind of pain.

The article makes the case that Go's context serves two purposes only. The first is carrying request-scoped values: a requestID, a JWT token, an authenticated user ID. The key test is simple: does this value die when the request dies? If yes, context is appropriate. If you're using it to drive business logic — fetching user data, making authorization decisions — that's a mistake. That logic belongs in explicit function parameters where the compiler can help you and other developers can read it clearly in the function signature.

The second purpose is cancellation, and this is where the AbortController comparison becomes genuinely illuminating. The author walks through a scenario where your server kicks off an HTTP call to a third-party API, and then the request is cancelled or times out before the response arrives. Without a context, the goroutine just keeps running — wasted work, potential goroutine leak. With context, you pass a cancellation signal down the call chain, and anything listening on ctx.Done() can bail out cleanly. The party supplies analogy is a bit much, but the underlying mechanics are explained clearly. You create a context with cancel, defer the cancel call so it always runs, pass the context into every goroutine that should respect the cancellation, and use a select statement to check the Done channel before doing the next unit of work.

What I find most valuable here is the explicit mapping to JavaScript primitives. The ctx maps to AbortSignal, not AbortController. You pass it in. cancel() is the AbortController equivalent — it's the thing that triggers the stop. ctx.Done() is the abort event listener. That's a clean, concrete mental model that a TypeScript developer can anchor to immediately.

What the article skips over: the costs of passing context through every function signature in a deep call stack. It can feel verbose and it generates friction in refactoring. There are also legitimate debates about when userID in context is fine versus when it crosses into business logic — the line is fuzzier in real applications than the article suggests.

**Key takeaways:**
- Go's context is for request-scoped observability values and cancellation propagation, not for sharing application state
- Using raw string keys in context is risky due to collision; always define a private unexported type as the key
- The AbortSignal mental model from JavaScript maps cleanly to how ctx works in Go
- context.WithTimeout handles deadlines automatically without requiring explicit timer checks in goroutines
- Always defer cancel() immediately after creating a cancellable context to prevent goroutine leaks

**Why do I care:** If your team is moving toward Go for backend services — common as frontend teams take on more full-stack responsibility — this is a concrete, practical article to share with anyone coming from TypeScript or React. The misuse pattern described here is extremely common in early Go code written by frontend developers, and it produces bugs that are annoying to diagnose because they fail at runtime with no compiler warning. Getting this right early saves real debugging time.

**Link:** [Go's context isn't React's Context. Think AbortSignal.](https://dev.to/supriya-kotturu/gos-context-isnt-reacts-context-think-abortsignal-1h2e)

---

## Spec-Driven Development: When Architecture Becomes Executable

**TLDR:** An InfoQ deep-dive frames Spec-Driven Development as a fifth-generation programming paradigm where specifications become the authoritative source of truth and code is continuously generated from them, rather than the other way around. It's a thorough and mostly honest accounting of both the gains and the real costs.

This is a long one and it earns most of its length. The central claim is that SDD represents a structural inversion of how software systems have traditionally worked. In the classical model, code is truth. Architecture documents describe what was intended, but the running system is what actually defines behavior. Drift between intent and implementation is discovered late — sometimes in production, sometimes in a compliance audit. SDD flips this: the specification is truth, code is a generated artifact, and drift is something the system actively prevents rather than retroactively discovers.

The article structures SDD as a five-layer execution model. The specification layer is the declarative definition of what the system does — API contracts, data schemas, event topologies, security boundaries, compatibility rules. The generation layer transforms those specifications into executable form: type models, validators, stubs, documentation, contract tests. The artifact layer holds the generated outputs, treated as disposable and regenerable rather than as the system of record. The validation layer enforces continuous alignment between intent and execution through contract tests, schema validation, and drift detection. And the runtime layer is the operational system, its behavior fully constrained by the upstream layers.

What I appreciate about this article is that it doesn't shy away from the costs. Specifications become a primary complexity surface — they acquire all the properties of source code: technical debt, cross-team coupling, compatibility inertia. Generator trust becomes a supply chain problem; if your AI code generator is now structural infrastructure, you need the same guarantees you'd require of a compiler: determinism, reproducibility, auditability. Runtime enforcement adds real computational overhead. And the cognitive shift is non-trivial — moving from implementation-first thinking to contract-first reasoning requires engineers to think in invariants, reason about compatibility, and treat schemas as executable programs.

The human-in-the-loop section is the most grounded part of the piece. The authors tried the naive version — accepting generated changes with minimal review — and it failed quickly. The conclusion is that SDD doesn't remove humans from engineering, it relocates them to a higher control plane. Humans govern intent, policy, and meaning. Machines handle enforcement, generation, and conformance. Breaking schema changes require human approval. AI-proposed refactors require human confirmation. That bounded autonomy framing is more realistic than the "just let the AI drive" narrative that often accompanies these discussions.

What the article avoids thinking about seriously: the bootstrapping problem. If specifications are the source of truth but they're authored by humans using natural language and structured formats, the quality of the system is still fundamentally bounded by the quality of the specs. Garbage in, generated garbage out — just faster and at greater scale. The article also sidesteps the organizational reality that most teams struggle to keep documentation in sync with code, let alone make that documentation the authoritative artifact that drives code generation.

**Key takeaways:**
- SDD inverts the traditional relationship between code and architecture — specifications become the system of record, code becomes a generated output
- Drift detection transforms from a testing convenience into a mandatory architectural capability that makes misalignment machine-detectable
- Generator trust is a supply chain concern: determinism, reproducibility, and auditability become non-negotiable requirements for code generation tools
- Human authority shifts upward to intent, policy, and ethics — not removed, but relocated to the highest abstraction layers
- The cognitive shift from behavior-first to invariant-first thinking is real and significant, not just a tooling change

**Why do I care:** This matters for architects and senior engineers because it clarifies what AI-assisted development is actually converging toward. We're not just getting faster autocomplete — we're moving toward systems where the spec is the program and code is a compilation target. If that future arrives even partially, the skills that retain value are specification authorship, contract design, and drift governance — not the ability to write boilerplate implementations quickly. That's a meaningful shift in where you invest your engineering craft.

**Link:** [Spec Driven Development: When Architecture Becomes Executable](https://www.infoq.com/articles/spec-driven-development)

---

## I Don't Really Use Libraries Anymore

**TLDR:** Theo from t3.gg argues that AI code generation is changing the dependency calculus — generating custom implementations directly rather than installing packages is increasingly viable, and the tradeoffs have shifted significantly. It's a provocative take worth thinking through carefully.

The premise here is that for a growing class of tasks, pulling in a library is no longer the obvious choice. When AI can generate a working implementation in seconds, the reasons you'd previously reach for a package — saving time, reducing bugs, not reinventing the wheel — start to look different. The supply chain risk argument has sharpened considerably after a string of high-profile npm compromises. Dependency bloat is a real operational cost. And a generated implementation that lives in your codebase is, paradoxically, something your team actually owns and can read and modify without navigating a library's API surface.

This isn't a "never use libraries" argument and it shouldn't be read as one. It's more a recalibration of the threshold. A date formatting library for a few simple operations? Generate it. A cryptographic implementation? Absolutely do not generate it — use a well-audited library. A state management pattern for a specific use case? Maybe generate a minimal version tuned to your needs rather than adopting a full framework with all its assumptions baked in.

The honest pushback is that generated implementations carry their own risks. They don't receive security patches. They don't benefit from community bug reports. When a bug is found, the fix has to come from you. And if the AI generated something subtly wrong — the kind of wrong that passes tests and looks correct but fails in edge cases — you may not discover it for a long time. Libraries with broad adoption have that surface area stress-tested in ways a fresh generation never has.

There's also the question of what "generating a custom implementation" actually looks like at scale. For a single utility function, fine. For a complex feature that would normally be a 50k-line library, you're not replacing the library — you're generating a worse version of it with no documentation and no community.

Still, the directional point is real. The dependency calculus has shifted. The bar for reaching for a package should be higher than it was three years ago, and being thoughtful about what you pull in is more tractable now that generating a small focused implementation is quick.

**Key takeaways:**
- AI generation makes custom implementations viable for a wider class of tasks than before, reducing the reflexive reach for external packages
- Supply chain risk, dependency bloat, and ownership clarity are legitimate reasons to prefer generated code for simpler utilities
- Generated code does not receive security patches or community bug fixes — this cost is real and shouldn't be glossed over
- Cryptographic, security-critical, and highly complex implementations should still come from well-audited libraries
- The threshold question is not "library vs. generate" but "what level of complexity and risk justifies an external dependency in 2026"

**Why do I care:** This directly affects architectural decisions at the project and team level. If you're setting dependency policies or reviewing pull requests that add new packages, it's worth having a clearer framework for when that's the right call versus when generation — with appropriate review — is a better option. The answer isn't the same for every dependency, but the default assumption that "just npm install it" is always lower-risk no longer holds cleanly.

**Link:** [I don't really use libraries anymore](https://www.youtube.com/watch?v=u9P3CKwtRnM)

---

## To Live in an AI World, Knowing Is Half the Battle

**TLDR:** Marcus Fontoura, a Microsoft Technical Fellow, joined the Stack Overflow podcast to discuss his book "Human Agency in a Digital World." The conversation covers how understanding the fundamentals of how technology works gives ordinary people meaningful agency over the systems that shape their lives.

This is a podcast transcript, and it reads like one — conversational, discursive, occasionally meandering. But the core argument is worth sitting with. Fontoura's thesis is that people feel powerless in relation to technology largely because they don't understand how it works at even a basic level. Not the implementation details, not the algorithms in depth — just the foundational concepts. What is an array. How does content propagate through a social network. Why social media recommendation algorithms are non-deterministic and fragile in ways that PageRank wasn't.

The social media discussion is the strongest part. He draws a clear line from books to the web to social media, framing each transition as a democratization of publishing that outpaced our ability to evaluate content quality. PageRank worked by using the link structure of the web as a proxy for credibility. Social media replaced that with engagement metrics — likes, shares, retweets — which are fragile, non-deterministic, and easily gamed. Understanding that mechanical difference, he argues, changes how you relate to information you encounter on those platforms. It's not a moral judgment about social media being bad; it's a structural observation about the algorithm's properties.

The AI section is more interesting than the breathless coverage you usually get. Fontoura is blunt: AI is a prediction platform, a very good and accurate one. Agents built on AI are deterministic software that humans wrote or generated. The "AI will destroy us" framing is, in his view, actually a statement about human misuse — and that's a different and more tractable problem. His call to action is to stop treating the technology as either miraculous or apocalyptic and start thinking seriously about applications to real-world problems: distribution, healthcare, diagnosis, self-driving vehicles. These are solvable today with today's technology. Most of the energy goes elsewhere.

What Fontoura avoids thinking about: the power asymmetry between individuals who understand the technology and the institutions deploying it at scale. Even a fully informed user of a social media platform cannot meaningfully change the algorithm's behavior through individual action. Understanding that the recommendation system is fragile and non-deterministic doesn't give you the ability to opt out of it. Agency at the individual level and structural reform at the systemic level are different problems, and the book seems to conflate them somewhat.

**Key takeaways:**
- Understanding how technology works at a conceptual level gives people a foundation for informed opinions and meaningful participation in policy debates
- Social media recommendation algorithms are structurally fragile and non-deterministic in ways that earlier information systems like PageRank were not
- AI is a prediction tool; agents built on AI are deterministic software — the risk lies in how humans deploy and direct them, not in some emergent AI will
- Reducing friction in information publishing without improving quality signals creates instability, not democratization
- The technology problems most worth solving — healthcare, distribution, diagnosis — are largely tractable with AI as it exists today

**Why do I care:** For senior engineers and architects, the relevance here is partly personal and partly professional. Personally, this kind of accessible framing is useful for conversations with non-technical stakeholders who are either over-anxious or over-optimistic about AI. Professionally, Fontoura's point about focusing on real applications rather than capability races is a useful corrective to how a lot of AI investment and attention is currently directed. The interesting engineering work is in the application layer, not just the model layer.

**Link:** [To live in an AI world, knowing is half the battle](https://stackoverflow.blog/2026/02/27/to-live-in-an-ai-world-knowing-is-half-the-battle/)
