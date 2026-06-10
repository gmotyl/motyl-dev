---
title: "Programming Language Origins, Spec-Driven AI Development, and the Case for Writing Code by Hand"
excerpt: "From mapping programming languages to their countries of origin, to spec-driven development making a comeback thanks to AI, plus a developer making the case for going back to writing code manually."
publishedAt: "2026-06-09"
slug: "daily-dev-programming-languages-spec-driven-dev-hand-coding"
hashtags: "#dailydev #frontend #webdev #generated #en"
source_pattern: "daily.dev"
---

## TLDR

This issue of daily.dev covers a surprisingly eclectic mix: a fun geographic look at where programming languages actually came from, two articles wrestling with how AI is changing software architecture and development workflows, and one developer's thoughtful pushback against the AI-everything tide. The through-line, if there is one, is that the industry is still figuring out where human judgment ends and automation begins.

---

## Programming Languages and Their Country of Origin

There is something oddly satisfying about mapping programming languages to the countries where they were invented. Most developers know that C came out of Bell Labs in the US, that Python was written by a Dutchman (Guido van Rossum), and that Ruby is Japanese. But actually seeing the full picture plotted geographically makes you realize how concentrated the history of programming really is, and how a handful of places produced an outsized share of the languages we use today.

The US dominates, unsurprisingly, given the concentration of research universities and technology companies. But there are interesting exceptions. Japan gave us Ruby. Denmark gave us Perl. Switzerland contributed Pascal. The UK has a surprisingly strong showing when you account for academic languages that influenced everything that came after.

What strikes me is that the geographic origin of a language often reflects its design philosophy. Japanese software culture's emphasis on expressiveness and developer happiness shows up clearly in Ruby's design. The academic rigor of European computer science departments shaped languages like ML, Haskell, and Pascal. These are not coincidences.

The article is more of a curiosity piece than a deep analysis, but it is the kind of thing that makes you stop and think about the cultural context embedded in the tools we use every day. When Matz designed Ruby, he was thinking about programmer happiness as a primary goal, and that sensibility is distinctly different from the performance-first thinking that shaped C or the mathematical purity that motivated Haskell. Geography is not destiny, but it turns out it is not irrelevant either.

**Link:** [Programming Languages and Their Country of Origin](https://app.daily.dev/posts/GdL6H66zh)

---

## The Repo is Sus - daily.dev Show (S1E6)

The daily.dev show digs into repository hygiene and what your codebase actually says about how your team works. "The Repo is Sus" is a fun framing for a real problem: the gap between what a repository looks like on the surface and what is actually going on underneath.

I appreciate this format. Video content about development culture and practices tends to be more watchable than written essays on the same topics, and the daily.dev team has been building this show with enough consistency to make it worth following. Episode six covering repository red flags is a topic that every engineer who has ever inherited a legacy codebase will have opinions about.

**Link:** [The Repo is Sus - daily.dev show (S1E6)](https://app.daily.dev/posts/igsCdq9z3)

---

## Spec-Driven Development: Why AI Is Bringing an Old Software Engineering Idea Back to Life

Spec-driven development is not new. Writing detailed specifications before code was a standard part of waterfall-era software engineering, and it largely fell out of fashion as agile practices took over and "working software over comprehensive documentation" became the guiding principle. Now AI is making specs relevant again, and the reason is pretty obvious once you think about it: AI models need context to produce useful output, and a well-written spec is exactly that context.

The core argument here is that when you are working with an AI coding assistant, the quality of your specification determines the quality of what the AI produces. Vague requirements produce vague code. A detailed spec that explains not just what to build but why, what the edge cases are, and what constraints apply gives the AI enough to work with. You end up writing a spec anyway, just in a different form. You might as well do it deliberately.

What I find interesting about this is that it is partly a critique of how developers have been using AI tools. The "just describe it and see what happens" approach that most developers start with is fine for exploration, but it is a poor workflow for production code. Spec-driven development forces you to think clearly before you type, which has always been good engineering practice. The AI just makes the payoff more immediate and concrete.

There is a real tension here, though. Agile's rejection of heavy upfront specification was not arbitrary. Requirements change. Customers do not always know what they want until they see it. Writing a comprehensive spec and then handing it to an AI still has the same problem it had when you were handing it to a junior developer: the spec is only as good as your understanding at the time you wrote it. The difference is that iterating with an AI is cheaper and faster than iterating with humans, which means the feedback loop is tighter. That changes the calculus somewhat.

The article does not fully reckon with the maintenance problem. A spec and the code it generated can drift apart quickly. If you update the code and do not update the spec, you are back to the same documentation rot problem that killed formal specifications in the first place. Someone needs to own that synchronization, and that is harder than it sounds.

**Key takeaways:**

- Spec-driven development is reviving because AI assistants produce better output when given detailed, well-structured specifications
- The quality of AI-generated code is directly correlated with the quality of the context you provide
- Spec drift, where documentation falls out of sync with implementation, remains a real risk
- Fast iteration with AI changes the cost-benefit analysis of upfront specification compared to the waterfall era

**Link:** [Spec-Driven Development: Why AI Is Bringing an Old Software Engineering Idea Back to Life](https://app.daily.dev/posts/jEFbpvuOQ)

---

## How Domain-Driven Design Changed My Approach to AI Agent Architecture

Domain-Driven Design has been around since Eric Evans published his blue book in 2003. The core ideas, bounded contexts, ubiquitous language, aggregates, are well-established in enterprise software circles, though they never fully crossed over into mainstream frontend or startup development. The argument in this article is that DDD turns out to be surprisingly applicable to building multi-agent AI systems.

The parallel makes more sense than it might first appear. An AI agent system where different agents handle different parts of a problem is structurally similar to a microservices or bounded context architecture. Each agent has a domain of responsibility. The handoffs between agents need clean interfaces. The language and vocabulary used to communicate between agents matters for reliability. These are exactly the problems DDD was designed to solve.

The author's experience is that applying DDD thinking to agent architecture reduced the messiness that comes from agents with poorly defined responsibilities. When you give an agent too broad a mandate, it tries to do too much and does all of it worse. When you define its bounded context clearly, it behaves more predictably. That rings true from my own experience watching agentic systems succeed and fail.

What the article does not spend enough time on is the practical question of how you discover bounded contexts for agent systems. In traditional DDD, you run event-storming workshops with domain experts to map out the business domain. That process assumes you have a stable business domain to model. AI agent systems often need to be designed before the domain is fully understood, which inverts the usual process.

Still, the instinct to apply rigorous architectural thinking to agent design rather than just wiring together API calls is the right one. Most agent systems I see are essentially procedural code dressed up with AI calls. Bringing DDD vocabulary into that space is a useful forcing function for thinking more carefully about separation of concerns.

**Key takeaways:**

- Bounded contexts from DDD map naturally onto agent responsibilities in multi-agent AI systems
- Clearly defined agent domains produce more predictable behavior than broad, loosely scoped agents
- The interfaces between agents deserve the same design attention as service boundaries in distributed systems
- Discovering bounded contexts for agent systems is harder than traditional DDD because the domain may not be stable at design time

**Link:** [How Domain-Driven Design Changed My Approach to AI Agent Architecture](https://app.daily.dev/posts/r91LrZeGq)

---

## I'm Going Back to Writing Code by Hand

This one is going to be polarizing, and I think that is intentional. The author is pushing back against the AI-coding-everything wave, arguing that writing code by hand, without AI assistance, produces better outcomes for them personally. Not universally. Not as a prescription for everyone. Just for them, in their context.

The honest response to this is: it depends, and that is actually the point. The developer tooling conversation has shifted very quickly from "should I try AI coding assistants" to "why aren't you using AI for everything." That shift happened faster than most people could meaningfully evaluate the tradeoffs. Articles like this are valuable precisely because they slow down the conversation.

The specific arguments tend to cluster around a few themes. Writing code by hand forces you to actually understand what you are writing. When you have to type it yourself, you cannot accept something you do not understand. AI-generated code can work without you understanding why it works, and that is a debt that accumulates. The second theme is about deep work. The flow state of writing code is disrupted when you are constantly prompting, accepting, rejecting, and editing AI suggestions. Some developers find that the AI mode of working fragments their attention in ways that the alternative does not.

I do not think this is the right conclusion for most developers most of the time. But I do think it is worth taking seriously that AI coding tools are not uniformly beneficial for every task and every person. The reflexive dismissal of "going back to hand-coding" as Luddism misses the real insight, which is that the best tool depends on the task, your familiarity with the domain, and how you personally think.

What I take from this is not "stop using AI" but rather "be deliberate about when you use it." Reaching for AI assistance out of habit rather than because it actually helps is a real pattern, and occasional resistance is a reasonable way to stay honest about it.

**Key takeaways:**

- Writing code manually enforces genuine understanding in a way that accepting AI suggestions does not
- Flow state and deep work can be disrupted by the prompt-accept-reject cycle of AI-assisted coding
- The case for manual coding is not universal, but context-specific and worth examining honestly for your own work
- Reflexive AI use is different from deliberate AI use, and the distinction matters

**Link:** [Im going back to writing code by hand](https://app.daily.dev/posts/yKd6Wl6dT)
