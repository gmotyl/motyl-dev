---
title: "Context is the New Infrastructure: Economic Primitives, Agentic SDLC, and FastMCP 3.0"
excerpt: "Anthropic's comprehensive economic analysis of AI usage, the enterprise shift from copilots to autonomous agents, and FastMCP 3.0's new architecture for context-aware applications."
publishedAt: "2026-02-04"
slug: "context-new-infrastructure-economic-primitives-agentic-sdlc-fastmcp"
hashtags: "#ona-newsletter #ai #anthropic #mcp #architecture #sdlc #agents #generated #en"
---

## Anthropic Economic Index Report: Economic Primitives

**TLDR:** Anthropic released a massive analysis of how Claude is used across the globe, introducing new "economic primitives" that measure task complexity, success rates, human skills, and AI autonomy. The findings suggest AI tends to cover higher-education tasks, and when factoring in reliability, productivity gains are roughly halved from initial estimates.

**Summary:**

This is one of those reports that makes you stop and think about what we actually know versus what we assume about AI's economic impact. Anthropic analyzed a million Claude conversations and API records from November 2025, right before Opus 4.5 dropped, and what they found challenges some comfortable narratives.

Let me start with what I think is the most honest admission in the report: they found that when you account for task success rates, the implied productivity growth falls from 1.8 percentage points per year to about 1.0 percentage point. That is still significant, but it is a sobering correction. We have been measuring speedups without asking whether the AI actually completed the task correctly. When the author says Claude struggles more on complex tasks, they are not hedging. Success rates drop meaningfully as task duration increases. In API data, tasks estimated to take humans over five hours show success rates around 45 percent.

The geographic analysis reveals something that should concern anyone thinking about equitable AI adoption. Higher-income countries use Claude more collaboratively, more like a thought partner, while lower-income countries concentrate on coursework and specific technical applications. The report frames this as a natural adoption curve, but I would push back a bit. It might also reflect that sophisticated collaborative usage requires a foundation of experience and infrastructure that is not evenly distributed. The report shows human prompt sophistication and AI response quality are nearly perfectly correlated. How you ask determines what you get.

The "deskilling" finding deserves attention. When they model what happens if you remove the tasks Claude handles, the average education requirement of remaining work drops. Technical writers lose their high-judgment analysis work. Travel agents lose the complex planning. What remains is the routine stuff. Now, the authors are careful to note this is not necessarily negative. Some occupations actually experience "upskilling" as AI removes their bookkeeping tasks. But the net effect across the economy is deskilling. If you are a knowledge worker whose value comes from handling complexity, this should make you think hard about where you are investing your skill development.

One thing the report avoids addressing directly is what happens when these patterns become self-reinforcing. If AI handles your complex work, you get less practice at complex work. If your prompting skills determine your AI outcomes, and you never develop those skills, the gap widens. The report shows beautiful convergence data for US states, but the global picture shows no such convergence. Rich countries are not pulling away, but poor countries are not catching up either.

**Key takeaways:**
- Task success rates significantly reduce productivity gains when factored in, cutting estimates roughly in half
- More complex tasks yield greater time savings but also have lower success rates, a fundamental tradeoff
- Claude usage tends to cover higher-education tasks, producing a net "deskilling" effect when those tasks are removed
- Human prompt sophistication almost perfectly predicts AI response quality, suggesting skills inequality will compound
- Geographic adoption shows US states converging but no global convergence between rich and poor countries
- API usage is heavily automated and concentrated in coding tasks, while Claude.ai shows more collaborative patterns

**Link:** [Anthropic Economic Index report: Economic primitives](https://www.anthropic.com/research/anthropic-economic-index-january-2026-report)

---

## The Agentic Shift: Redefining Enterprise SDLC from Assistance to Autonomy

**TLDR:** This article argues we are moving from the "Copilot Era" of AI assistance to the "Agentic Era" where AI not only writes code but plans, executes, detects errors, and fixes them in continuous loops. The author proposes a crawl-walk-run adoption roadmap for enterprises.

**Summary:**

Alright, so the thesis here is that GitHub Copilot and its ilk are essentially fancy typewriters. You type, they predict, you press Enter. The agentic shift means AI that operates in loops instead of lines. It plans, acts, observes results, and adjusts. The author uses the OODA loop framework from military strategy to explain this, which is actually a useful mental model.

Here is where I want to be a bit contrarian. The article presents this shift as essentially inevitable and overwhelmingly positive, with Gartner predicting 33 percent of enterprise software will contain agentic AI by 2028. But the author spends very little time on the fundamental question: how do you debug a system that debugs itself? When your agent is observing its own failures and making autonomous decisions about fixes, you have introduced a complexity layer that traditional software engineering has no good tooling for. The article mentions a "Human Gate" requirement, that agents should never merge to main or deploy to production without human review. But what happens when the agent has made 47 small changes across 12 files over six iterations? Is that review meaningful or theater?

The "Socratic Requirements Agent" concept is genuinely interesting. Having an AI trained on your architecture and business rules challenge ambiguous requirements before they hit engineering. The example given, an agent pointing out that a "real-time dashboard" request conflicts with a 15-minute data warehouse refresh rate, is exactly the kind of requirement-level error that costs fortunes to fix later. But notice what the author is not thinking about: the agent needs deep knowledge of your specific systems. Building that Enterprise Knowledge Graph they mention later is not trivial. It requires indexing code embeddings, documentation, historical tickets, incident reports. Most enterprises have this information scattered across systems with inconsistent metadata. The agent is only as good as the context it can access.

The "Healer Agent" example, where a nightly build failure from a renamed UI button gets auto-fixed before developers wake up, sounds wonderful. But what if the button was renamed for a reason the test did not capture? What if the auto-fix masks a deeper problem? The author presents a very optimistic scenario where agents fix surface-level breakage, but software failures are often symptoms of design tensions. Autonomous healing might create a system that runs but accumulates technical debt in ways humans no longer understand.

I appreciate that the author includes a governance section. The stat that 63 percent of software professionals already use unlicensed GenAI tools is alarming and probably underselling the reality. The "Budget Kill Switch" recommendation is practical, hard limits on retries and cost per run. But the metrics section reveals a gap in our thinking. They propose measuring "Decision Turn Count" to track agent efficiency, but what about measuring decision quality over time? An agent that takes three turns but makes good choices is better than one that takes one turn and makes a mediocre choice.

**Key takeaways:**
- The shift from generative to agentic AI represents moving from linear assistance to continuous loop-based autonomy
- Requirements agents using Socratic questioning could catch expensive ambiguity before code is written
- Enterprise Knowledge Graphs powered by RAG are essential for agents to have company-specific context
- Governance requires sandboxing, cost controls, and mandatory human gates for production changes
- Traditional metrics like velocity and lines of code become meaningless; new metrics around autonomy and recovery rate are needed
- Shadow AI usage at 63 percent suggests enterprises have already lost control of their AI governance

**Tradeoffs:**
- Autonomous healing versus human understanding: auto-fixes may mask deeper design problems
- Speed versus auditability: faster agent decisions are harder to review meaningfully
- Adoption curve (crawl-walk-run) versus competitive pressure to move faster

**Link:** [The Agentic Shift: Redefining Enterprise SDLC from Assistance to Autonomy](https://piotr-jurowiec.medium.com/the-agentic-shift-redefining-enterprise-sdlc-from-assistance-to-autonomy-30c1333ece89)

---

## Introducing FastMCP 3.0

**TLDR:** FastMCP 3.0 represents a complete architectural rethink, moving from a collection of features to a system built on three primitives: Components, Providers, and Transforms. The goal is building "Context Applications" that manage information flow to agents rather than just serving tools.

**Summary:**

I have to respect the honesty in this post. The author admits FastMCP 2.0 was reactive, constantly bolting on features to keep up with spec changes and user demands. That takes some courage when your framework powers 70 percent of MCP servers and gets a million downloads a day. But version 3 is apparently the designed framework they always wanted to build.

The core insight here is that the real challenge with MCP was never implementing the protocol. It is delivering the right information at the right time. If you dump 500 tools into a context window, the model gets confused. This is the "context crowding" problem, and FastMCP 3 is architected around solving it. The three-primitive design, Components, Providers, and Transforms, is elegant. Components are your tools, resources, and prompts. Providers answer where they come from. Transforms let you modify behavior without touching source code.

What excites me most is how this architecture makes composition natural. In version 2, mounting a sub-server was apparently a massive specialized subsystem. In version 3, it is just a Provider plus a Transform adding a namespace prefix. That is good framework design, making complex things emerge from simple combinations rather than requiring purpose-built machinery for every use case.

The "progressive disclosure" example at the end is worth studying. Start with limited tools visible, then use an authenticated unlock tool to reveal admin capabilities for the current session only. No special feature required, just composition of Providers, Visibility controls, Auth middleware, and Session State. This is how you build dynamic systems that adapt to context rather than static API wrappers.

But let me push on something the author seems to be avoiding. The FileSystemProvider that watches directories and hot-reloads on changes is developer-friendly, but what are the security implications of a system that can dynamically load new code? The post mentions production realities like OAuth and authorization, but the tension between "move fast" and "stay secure" deserves more examination. Same with the OpenAPIProvider, which apparently was so popular that people stopped designing servers and just regurgitated REST APIs. The author had to write a blog post asking people to stop. That suggests the tooling makes bad practices too easy, and while pairing it with ToolTransforms is positioned as the solution, the underlying incentive is still there.

The "playbooks" concept, chaining stateful unlocks to guide agents through workflows, points to something genuinely new. MCP servers that are not just tool collections but active participants in conversation flow. The author hints at "context optimization" features coming, search transforms and curator agents. If context is the new infrastructure, then FastMCP is positioning itself as the framework for building that infrastructure thoughtfully rather than just accumulating more endpoints.

**Key takeaways:**
- FastMCP powers 70 percent of MCP servers with a million daily downloads, making architectural decisions consequential
- The three-primitive architecture (Components, Providers, Transforms) makes complex features emerge from composition
- Context crowding is the real problem: too many tools confuse models, requiring progressive disclosure patterns
- FileSystemProvider with hot reload enables directory-based server organization with instant updates
- Component versioning allows serving multiple tool versions side-by-side for backwards compatibility
- Native OpenTelemetry instrumentation provides production observability out of the box
- "Playbooks" represent dynamic MCP-native workflows that evolve based on session state and authentication

**Tradeoffs:**
- Developer velocity versus security: hot reload and dynamic loading increase attack surface
- Openness versus curation: OpenAPIProvider makes it too easy to dump APIs into context without thoughtful design
- Framework sophistication versus learning curve: three-primitive architecture is powerful but requires understanding composition patterns

**Link:** [Introducing FastMCP 3.0](https://www.jlowin.dev/blog/fastmcp-3)