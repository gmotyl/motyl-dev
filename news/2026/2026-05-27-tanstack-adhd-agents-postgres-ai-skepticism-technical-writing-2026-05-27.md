---
title: "TanStack, ADHD Agents, PostgreSQL Time Traps, AI Skepticism, and the Future of Technical Writing"
excerpt: "Five topics that hit different this week: TanStack Router meets Query, a tree-of-thought agent skill, a subtle PostgreSQL timestamp bug, a fiery AI industry critique, and what human technical writing still means in 2026."
publishedAt: "2026-05-27"
slug: "tanstack-adhd-agents-postgres-ai-skepticism-technical-writing-2026-05-27"
hashtags: "#dailydev #tanstack #react #postgresql #ai #llm #openai #anthropic #career #css #seo #generated #en"
source_pattern: "daily.dev"
---

## TanStack Router and Query: The Right Way to Wire Them Together

**TLDR:** TanStack Router has its own per-route cache, but TanStack Query's global QueryCache is the better choice when data is shared across routes. The integration requires threading the queryClient through router context, using useQuery in components rather than useLoaderData, and knowing when to await versus defer in loaders.

I keep thinking about how many React apps I've seen that accidentally do data fetching twice, or worse, get into weird stale states because the router cache and the query cache are fighting each other. This post from tkdodo.eu cuts straight to it: the router's job is navigation, Query's job is data. Once you separate those responsibilities clearly, everything gets simpler.

The key insight is treating the loader as an event handler, not a data source. You fire off the prefetch in the loader so data is in flight while the component tree renders, but the component reaches into the QueryCache directly with useQuery or useSuspenseQuery. That means no awkward handoff between loader data and query state, no duplicate request logic, and no confusion about which cache wins.

Disabling the router's own caching when Query is in charge is the part people forget. Running both creates silent bugs that only show up under specific navigation patterns. And with TanStack Start, the SSR streaming story gets even cleaner: the server seeds the client QueryCache automatically, so hydration just works.

The decision between blocking and deferred loading is worth sitting with. Blocking gives you a clean loading state at the route level. Deferred lets you show a skeleton faster. Neither is universally right, and that's exactly the kind of decision that belongs in the router loader, not scattered across components.

**Key takeaways:**
- Put the queryClient in router context and use useQuery in components, not useLoaderData, to avoid dual-cache confusion
- Treat loaders as prefetch triggers, not data sources, and prefer not awaiting to keep navigation snappy
- Disable router-level caching when TanStack Query is managing data to avoid silent stale-state bugs

**Why do I care:** Every team I've worked with eventually runs into this exact split-brain problem between router and query caching. Having a clear, documented pattern from the library author saves weeks of debugging and architectural regret. If you're building anything with TanStack Router today, this is the mental model to internalize before you write a single loader.

**Link:** [TanStack Router and Query](https://tkdodo.eu)

---

## ADHD: A Tree-of-Thought Agent Skill That Actually Enforces Divergence

**TLDR:** ADHD is an open-source skill for coding agents that fans out parallel LLM calls under wildly different cognitive frames, then runs a separate critic pass to score and prune the best ideas. The generator and critic are mechanically separated with opposing system prompts, and the whole thing ships as a drop-in skill for Claude Code, Cursor, Cline, and about 50 other agents.

The name is a bit cheeky, but the idea is genuinely interesting. The problem with Chain-of-Thought and even most Tree-of-Thought implementations is that branches share context and tend to converge early. You get a tree that looks like a tree but thinks like a line. ADHD enforces isolation: each branch is a separate LLM call with its own cognitive frame, and evaluation is explicitly forbidden during generation. The critic comes after.

The cognitive frames are where it gets fun. You're not just asking "think about this differently." You're asking one call to approach the problem as a hardware engineer, another as a speedrunner, another as an ant colony. That kind of forced perspective is genuinely useful for architecture decisions and API design, where premature convergence is the enemy.

Building on the Claude Agent SDK and shipping as a TypeScript library plus CLI means you can integrate it without rewriting your toolchain. The drop-in agent skill compatibility list is long enough that it's probably already supported wherever you work.

I'm most curious about the fuzzy debugging use case. When you're stuck on a weird bug and your mental model is the problem, having a tool that mechanically forces you to approach it from six different angles is worth more than most debugger features.

**Key takeaways:**
- Branches are fully isolated with no shared context during divergence, which prevents the early convergence problem that plagues most tree-of-thought approaches
- The generator/critic split is enforced mechanically via separate LLM calls with opposing system prompts, not just instructed
- Best suited for open-ended problems: architecture decisions, API design, naming, and debugging where your existing mental model might be wrong

**Why do I care:** Most "agentic reasoning" tools still collapse to a single thread under pressure. The isolation-by-design approach here is architecturally honest about how LLMs actually work. For any agent-heavy workflow, this is worth understanding even if you don't use it directly.

**Link:** [ADHD on GitHub](https://github.com/UditAkhourii/adhd)

---

## How soon is now() in PostgreSQL? Not When You Think

**TLDR:** PostgreSQL's now() returns the transaction start time, not the current wall-clock time. This caused a real distributed locking bug where a retry loop inside a single transaction always evaluated the same frozen timestamp, making timeout logic silently wrong. The fix is clock_timestamp().

This is the kind of bug that makes you feel genuinely stupid, and I mean that as a compliment to the author for writing it up. now() sounds like it means "right now." It does not. It means "the moment this transaction started," which is a perfectly reasonable semantic for many use cases, but a disaster for retry loops with timeout predicates.

The bug slipped through tests because unit tests on stored procedures and end-to-end tests were each testing their own slice of behavior. Neither combined a retry policy with a stale-row crash state inside the same transaction. That's the seam where production behavior diverges from test behavior, and it's almost always invisible until it isn't.

clock_timestamp() is the function you want when you need the actual wall clock. It reads the real time on every call, inside or outside a transaction boundary. Swapping now() for clock_timestamp() in timeout logic is a one-line fix, but knowing to make that swap requires understanding PostgreSQL's transaction time model.

The broader lesson, which the post makes clearly, is to test at the seam between your inner implementation and your outer caller. If your production caller wraps things in a transaction and your tests don't, you have a gap. Closing that gap is more valuable than adding more assertions to tests that already pass.

**Key takeaways:**
- now() and transaction_timestamp() are identical in PostgreSQL; both return the transaction start time, not the current time
- Use clock_timestamp() when you need real wall-clock time inside a loop or retry logic within a transaction
- Test at the boundary where your implementation meets its callers, especially around transaction scope

**Why do I care:** PostgreSQL time functions are one of those things that feel obvious until they bite you in production. This specific pattern, retry loops with timeout logic inside a single transaction, is common enough in distributed systems that every backend developer should have this mental flag installed.

**Link:** [How soon is now in PostgreSQL?](https://event-driven.io)

---

## Revenge of the Business Idiot: An Unfiltered Take on AI's ROI Problem

**TLDR:** A pointed critique arguing that generative AI has become a tool perfectly suited to impress managers who don't do real work, that the AI industry's financials are genuinely broken, and that the gap between AI marketing and AI results is widening fast.

I'll be honest: I don't agree with everything here, but the financial data the author cites is real and worth sitting with. OpenAI with a negative 122% operating margin in Q1 2026. Anthropic's profitability claims relying on accounting treatments that look generous under scrutiny. Uber burning its entire AI budget in four months with no measurable ROI. Salesforce marketing AI products before they shipped. These are numbers, not vibes.

The part about LLMs being well-suited to impress people who don't do real work is uncomfortable but not entirely wrong. If your boss evaluates output by whether it looks confident and complete rather than whether it's correct, LLMs are optimized for that exact evaluation function. That's a management problem that AI didn't create, but it does give it a place to hide.

Where I push back is on the totality of the dismissal. The author frames this as a binary: AI is a grift or it isn't. Reality is messier. Some AI use cases are genuinely transformative. Many are not. The challenge is that the incentives currently reward everyone claiming the former while delivering the latter, and that's a structural problem in how AI is being sold and evaluated.

The circular financing accusation against NVIDIA, investing in its own customers to prop up demand, is the most specific and most damning claim. If accurate, it deserves more scrutiny than it's currently getting in mainstream coverage.

**Key takeaways:**
- The AI industry's financial fundamentals deserve the same scrutiny as any other sector, and several major players' numbers don't hold up well under examination
- LLMs optimized for confident-looking output are a natural fit for organizations that reward confident-looking output, which is a management culture problem
- The gap between AI marketing and measurable ROI is wide enough to be a systemic issue, not just isolated cases

**Why do I care:** As a developer, I'm building with these tools. I care whether the infrastructure I'm depending on is financially sustainable. I also care whether the AI features I'm shipping actually help users or just help my team's quarterly metrics. This post is an uncomfortable prompt to ask that question more rigorously.

**Link:** [Revenge of the Business Idiot](https://app.daily.dev/posts/Q4OdZoAen)

---

## Technical Writing in the AI Age: Why Human Voices Still Matter

**TLDR:** AI-generated answers are eating into technical writing traffic, but the author argues that human technical writing still serves irreplaceable purposes: accessible documentation, real experience sharing, and community knowledge building. The advice is to write for humans, not algorithms, and to lean into personal voice over comprehensive coverage.

The traffic drop is real. If you've run a technical blog in the last two years, you've seen it. Search increasingly returns AI-generated summaries, and the long tail of "how do I do X" queries that used to drive discovery now often gets answered before the user reaches your site. That's a structural shift, not a bad month.

What I find useful in this piece is the reframe. The author isn't arguing that technical writing will survive because Google will always need fresh content. The argument is that human technical writing does something different: it carries voice, context, failure stories, and the specific texture of learning something for the first time. AI content averages across all of that. Human content captures a specific moment in a specific person's understanding.

The advice to avoid AI for actual writing, to preserve voice and accuracy, is practical. The advice to write work-in-progress learnings rather than polished tutorials is better. Work-in-progress posts are the ones I actually bookmark. They're honest about what the author didn't know, which is usually more useful than confident documentation of the happy path.

The "punk rock" framing is a bit much, but the underlying point is sound. There's a real appetite for human-authored content precisely because so much of the web is now homogenized. Writing for humans rather than optimizing for AIO is both more satisfying and, increasingly, more differentiated.

**Key takeaways:**
- AI content averages across all experience; human technical writing captures specific moments of learning that readers can actually locate themselves in
- Writing work-in-progress posts and failure stories is more useful and more differentiated than polished happy-path documentation
- Optimizing for SEO or AIO at the expense of voice is a losing trade as AI-generated content makes the algorithmic middle ground increasingly crowded

**Why do I care:** I work with developers who are wondering whether it's still worth writing. My answer is yes, but the reason has shifted. You're not writing to rank. You're writing to build a body of thinking that other humans can learn from and argue with. That's more valuable now, not less.

**Link:** [Technical Writing in the AI Age](https://app.daily.dev/posts/8Nv7RdFJb)
