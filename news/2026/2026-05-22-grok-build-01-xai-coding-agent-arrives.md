---
title: "Grok Build 0.1: xAI's Relentless Coding Agent Arrives Quietly"
excerpt: "xAI's new Grok Build 0.1 model targets autonomous software engineering with a 256K context window and aggressive pricing."
publishedAt: "2026-05-21"
slug: "grok-build-01-xai-coding-agent-arrives"
hashtags: "#productivity #ai #xai #grok #codingagents #generated #en"
source_pattern: "Kilo"
---

## The Quiet Arrival of Grok Build 0.1 in a Wild Week for the xAI Empire

**TLDR:** xAI released Grok Build 0.1, a new model built for autonomous, multi-step coding workflows with a 256K context window and no text output limits. It's priced aggressively at $1 per million input tokens, positioning it as a cost-effective alternative to frontier coding models. It's already live in early access on Kilo.

This was one of those weeks where you had to be paying close attention to catch everything that moved. Cursor dropped a new version of their own model — the community suspects it might be a variant of Kimi K2.6 — and SpaceX's IPO filings casually revealed that xAI burned through $6.4 billion last year. That's not a typo. $6.4 billion, just in infrastructure and operations. For context, OpenAI is projected to spend $115 billion over the next four years, which means the AI arms race has a very concrete dollar value attached to it.

In the middle of all that financial noise, xAI quietly rolled out Grok Build 0.1. And I mean quietly — this landed without the usual hype campaign. If you weren't paying attention to your Kilo dashboard, you might have missed it entirely. That restraint is either refreshing or suspicious, depending on your level of cynicism about AI product launches.

So what exactly is Grok Build 0.1? It's not a chat model and it's not trying to be. It's purpose-built for autonomous software engineering — the kind of workflow where you hand it a complex ticket, walk away, and come back to find a rewritten codebase. It reasons through problems, writes code, runs terminal commands, checks for errors, and fixes its own mistakes in a continuous loop. The 256K context window (with both text and image inputs) and the absence of text output limits are what make this kind of "long-horizon" workflow actually viable. Previous models would hit an 8K token cap and force you to keep typing "continue" like you're babysitting a distracted intern. Build 0.1 just keeps going.

The pricing is where this gets genuinely interesting. At $1 per million input tokens and $2 per million output tokens, this sits in what the team calls the "Flash" tier — cost-efficient enough to let agents run in loops without watching your API bill spiral. Early testing shows it built a professional landing page in 40 seconds for less than ten cents. That kind of cost-to-output ratio matters enormously when you're running agentic loops that might generate hundreds of thousands of tokens per session. That said, there are some caveats worth tracking: if your context exceeds 200K tokens, costs double, and the lack of output limits means you need to watch what you've unleashed. No guardrails is a feature until it's an expense.

It's worth being clear about what Grok Build 0.1 is replacing conceptually. Grok Code Fast — recently deprecated after going paid — was optimized for low-latency autocomplete and quick in-editor refactors. Build 0.1 is the other end of that spectrum: you give it an architectural problem, not a line edit. Think of it less as your coding copilot and more as a junior architect who will autonomously work through your Jira backlog. Whether it's actually as good at the back-end and infrastructure work as it is at building landing pages remains to be seen from real-world usage at scale.

**Key takeaways:**
- Grok Build 0.1 is designed for autonomous, multi-step coding agents, not conversational use
- 256K context window with no text output limits enables rewriting entire codebases in one session
- Priced at $1/million input and $2/million output tokens, targeting cost-efficient agentic loops
- Costs double if the 200K context threshold is exceeded, so token management still matters
- Already live in early access on Kilo, climbing their internal leaderboard against older flagship models

**Why do I care:** The pricing model here is the real story. Making agentic coding loops economically viable changes how you think about automation. When it costs pennies to generate a full-page UI, the bottleneck stops being model cost and starts being your ability to review and integrate what the model produces. That's a workflow problem, not a model problem — and it's one most teams aren't ready for. What the article skips entirely is any discussion of output quality consistency across large codebases. Building a landing page in 40 seconds is a demo, not a proof. The real test is whether it can navigate a 100K-line legacy codebase without hallucinating dependencies or subtly breaking existing behavior. Until we see that kind of benchmark, the "relentless robotic engineer" framing should come with an asterisk.

**Link:** [The Quiet Arrival of Grok Build 0.1 in a Wild Week for the xAI Empire](https://blog.kilo.ai/p/the-quiet-arrival-of-grok-build-01?publication_id=4363009&post_id=198635814&isFreemail=true&triedRedirect=true)
