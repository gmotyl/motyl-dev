---
title: "Fate: The Modern Data Client, AI Coding Agents Done Right, and Why Web Development is Fun Again"
excerpt: "From Relay-inspired data fetching with tRPC to mastering AI coding agents with proper constraints, plus reflections on the industrialization of software development."
publishedAt: "2026-01-07"
slug: "fate-data-client-ai-agents-web-development-fun"
hashtags: "#uidev #react #trpc #graphql #relay #ai #architecture #frontend #generated #en"
---

## Introducing Fate: A Modern Data Client for React and tRPC

**TLDR:** Christoph Nakazawa, original Relay and React team member at Facebook, has released Fate - a data client that brings Relay's best ideas (normalized caching, fragment co-location, data masking) to the tRPC ecosystem without requiring GraphQL.

**Summary:**

This is significant news for anyone who's admired Relay's elegant approach to data management but couldn't justify adopting GraphQL. Nakazawa spent years rebuilding a stack similar to Facebook's frontend, using GraphQL and Relay, even forking abandoned Facebook libraries. But he's now witnessed the reality of React data fetching in the broader ecosystem, and it's not pretty.

The typical pattern looks familiar: `useFetch` returns data, isLoading, isError. You handle each state. It works. But the real problems emerge with mutations, where you're writing complex cache patching logic, managing rollbacks, and knowing every place in your application that might fetch the same data. This leads to defensive refetching and request waterfalls cascading down the component tree.

Fate takes Relay's key insights and puts them on top of tRPC. Views are co-located with components, declaring exactly what data they need. A `PostView` specifies the fields it uses, including nested views like `UserView` for the author. References get passed around, and `useRequest` at the root composes everything into a single network request. This is the fragment composition pattern that made Relay powerful, now available without GraphQL's type system overhead.

The mutations story is particularly elegant. Fate exposes tRPC mutations as React Actions, working with `useActionState`. Optimistic updates happen automatically because Fate has a normalized cache under the hood. When you like a post and pass `optimistic: { likes: post.likes + 1 }`, Fate updates all views that depend on that field. No manual cache patching. Automatic rollback on failure. Components that don't select that field don't re-render.

For architects evaluating data solutions, Fate represents a pragmatic middle ground. You get Relay's ergonomics without GraphQL's adoption cost. The tradeoff is that Fate is alpha software, missing features like garbage collection and a compiler for static view extraction. But the core insight - that request-centric APIs create problems that normalized caching solves - is sound.

A fascinating footnote: 80% of Fate's code was written by OpenAI's Codex, carefully curated by Nakazawa. The docs are 100% human-written. Make of that what you will.

**Key takeaways:**
- Fate brings Relay's normalized caching and fragment co-location to tRPC without requiring GraphQL
- Views declare data requirements co-located with components; composition happens automatically
- Mutations work through React Actions with automatic optimistic updates and rollback
- The mental model shifts from "when to fetch" to "what data is required"

**Tradeoffs:**
- Gain Relay-like ergonomics but sacrifice GraphQL ecosystem compatibility
- Gain automatic cache management but sacrifice fine-grained control over caching behavior
- Gain tRPC type safety but sacrifice Fate's maturity (alpha software with missing features)

**Link:** [Introducing Fate](https://fate.technology/posts/introducing-fate)

---

## Where Good Ideas Come From (For Coding Agents)

**TLDR:** Sunil Pai applies Steven Johnson's seven patterns of innovation to explain why some developers excel with AI coding agents while others struggle - it comes down to constraints, context, oracles, and feedback loops.

**Summary:**

This is perhaps the most practical and intellectually rigorous piece I've seen on making AI coding agents actually work. Sunil Pai's core insight is elegant: if LLMs are "next token predictors" in the small, they're "thought completers" in the large. You give them context, they infer the genre, then sprint down the most likely path in idea-space. Good prompting isn't magic words; it's navigation.

The framework uses Steven Johnson's seven patterns from "Where Good Ideas Come From": adjacent possible (next reachable steps), liquid networks (ideas colliding), slow hunch (incubating partial ideas), serendipity (noticing anomalies), error (failure as feedback), exaptation (repurposing), and platforms (stable primitives). Each pattern has implications for how agents work.

Agents excel at adjacent possible work - small diffs, incremental refinements. They do well with platforms - interfaces, scaffolds, reusable primitives. But they struggle where progress depends on reality pushing back. They need tests, benchmarks, traces, and experiments to create gradients toward truth. Without these feedback channels, they generate "plausible nonsense" - code that looks clean but is subtly wrong.

The running example of making webhook ingestion reliable is brilliant. Day one: ask for "reliability" and get vibe-shaped completion. Day two: decompose into stairs (idempotency, bounded retries, dead-letter, metrics) and create actual tests as oracles. Day three: build a context packet with your existing retry policy, error taxonomy, and prior art. Day four: a real design question appears (ack on ingestion vs. after downstream success) and you document the hypothesis without forcing closure. Day five: feed the agent anomalies from production rather than asking it to "be creative."

The practical punchline is clear: agents make code cheaper, but they don't make judgment cheap. The scarce skill becomes expressing constraints, designing oracles, curating context, and running tight feedback loops. Teams with solid verification culture get leverage. Teams without it get a chaos multiplier.

For team leads, the section on juniors is crucial. Juniors can gain missing context faster in this world if you restructure learning properly. Have them own the spec, constraints, non-goals, and acceptance tests. Let the agent draft implementation. Require them to iterate through the error loop, cite existing patterns, and write failure notes. Train them on objective engineering, not keystrokes.

**Key takeaways:**
- AI agents are "thought completers" that sprint down likely paths; prompting is navigation
- Agents excel at adjacent possible work but need feedback channels for error-dependent progress
- The context packet template (goal, constraints, oracles, prior art) prevents agents from guessing
- Scarce skills shift to expressing constraints and designing verification, not writing code

**Link:** [Where good ideas come from (for coding agents)](https://sunilpai.dev/posts/seven-ways/)

---

## Web Development is Fun Again

**TLDR:** After decades of increasing complexity that pushed solo developers toward specialization, AI tools have restored the ability to manage the full stack - making web development feel fun and achievable again.

**Summary:**

This piece is part nostalgia, part genuine observation about how AI has shifted the calculus of what a solo developer can accomplish. The author remembers PHP 4, jQuery, table layouts, Dreamweaver, and phpMyAdmin. Looking back, those were simpler days where the entire development cycle could fit in one head.

Fast forward to today: build pipelines, bundlers, CSS frameworks with their own toolchains, PWAs, Core Web Vitals, SEO, layout shifts, responsive images on the frontend. Design patterns, unit tests, code coverage, APIs, performance, dependency management, infrastructure, monitoring, observability on the backend. Each area has grown up, probably for the better, but it demands deeper domain knowledge. The author chose to specialize in backend, stepping back from frontend because keeping up with both was impossible.

Then AI entered the chat. Claude and Codex provided the leverage desperately needed. The feeling of managing the entire stack returned - with confidence. Going from idea to execution in days became realistic again.

The "vibe coding" criticism gets addressed directly. After two decades working with talented people - backend developers, frontend developers, marketers, leaders - those experiences provide pattern recognition. When AI generates code, you know when it's good and when it's not. Even with refinement and back-and-forth prompting, the author claims 10x productivity improvement.

But the deeper observation is about mental space. When your head isn't constantly full of build pipelines, testability concerns, code patterns, and unfixed bugs, there's room for creativity. Room to experiment with UI and UX, try ideas and throw them away, add small quality-of-life improvements that never made the priority list.

The author makes a subtle but important point: it's not the typing of code that's enjoyable, nor the syntax or boilerplate. It's building something out of nothing. Writing code was just how you got there. AI tooling accelerates that journey.

**Key takeaways:**
- Modern web development complexity forced solo developers into specialization
- AI tools restore the ability to manage full-stack development with confidence
- Pattern recognition from experience helps distinguish good AI output from bad
- Mental space freed from infrastructure concerns enables creativity and experimentation

**Link:** [Web development is fun again](https://ma.ttias.be/web-development-is-fun-again/)

---

## The Rise of Industrial Software

**TLDR:** AI is industrializing software production, shifting it from craft to manufacture. This will create "disposable software" at massive scale, but innovation and stewardship will remain distinctly human challenges.

**Summary:**

Chris Loy offers a thoughtful, historically-grounded analysis of what happens when software production undergoes industrialization. The core observation: for most of its history, software has been closer to craft than manufacture - costly, slow, and dominated by the need for skills and experience. AI coding changes that equation.

The historical parallels are illuminating. Industrialization of printing led to paperback genre fiction. Agriculture led to ultraprocessed junk food. Digital image sensors led to user-generated video. In each case, the first-order effect was disruption in the supply chain. The second-order effect was enabling low-quality, low-cost production at high scale. Software will follow the same pattern, creating "disposable software" - software created with no durable expectation of ownership, maintenance, or long-term understanding.

The Jevons paradox applies here. Nineteenth-century economists noted that improved efficiency in coal consumption led to lower costs, fueling higher demand, resulting in higher overall consumption. We're seeing the same with AI compute, and it will ripple through software development itself. If the democratization of software mirrors what smartphones did for photo and video, we may see user-generated software created, shared, and discarded at social-media scale.

But the piece avoids simple doom-saying. It distinguishes between industrialization and innovation. Industrialization focuses on efficiently replicating what exists. Innovation advances by finding and solving new problems, building on what came before. These forces interplay to create progress. LLMs are a steam engine moment - collapsing the cost of a class of work previously dependent on scarce human labor. But steam engines didn't appear in a vacuum; software has been industrializing for years through open source, containerization, APIs, and low-code tools.

The haunting question at the end: technical debt is the pollution of the digital world, invisible until it chokes the systems that depend on it. In an era of mass automation, the hardest problem may not be production, but stewardship. Who maintains the software that no one owns?

For architects, this frames a genuine tension. The economics favor disposable software. The systems we depend on require durable maintenance. Navigating that gap will define the next era of software engineering.

**Key takeaways:**
- AI is industrializing software, shifting production from craft to manufacture
- Historical parallels suggest mass production of low-quality "disposable software"
- Innovation (solving new problems) remains distinct from industrialization (replicating efficiently)
- Technical debt as pollution raises stewardship questions at industrial scale

**Tradeoffs:**
- Gain democratized software creation but sacrifice quality control and maintenance expectations
- Gain production speed and cost reduction but sacrifice the craft-based skills pipeline
- Gain massive output scale but sacrifice stewardship of software no one owns

**Link:** [The rise of industrial software](https://chrisloy.dev/post/2025/12/30/the-rise-of-industrial-software)

---

## Notable Mention: Addy Osmani's Growing Library

**TLDR:** Addy Osmani, now a director at Google Cloud AI, continues expanding his library of engineering resources including "Beyond Vibe Coding," "Building Web Apps with Bolt," and updates to "Learning JavaScript Design Patterns."

Addy Osmani has transitioned from 14 years leading developer experiences in Chrome (DevTools, Lighthouse, Core Web Vitals) to Google Cloud AI, focusing on Gemini, Vertex AI, and the Agent Development Kit. His growing collection of books now includes "Beyond Vibe Coding" - suggesting even the champions of traditional web performance are taking AI-assisted engineering seriously. Worth following for anyone interested in the intersection of established engineering practices and emerging AI tooling.

**Link:** [AddyOsmani.com](https://addyosmani.com/)

---

*This article was generated based on content from the ui.dev Bytes newsletter. The summaries represent analysis and interpretation of the original sources, which should be consulted for complete information.*