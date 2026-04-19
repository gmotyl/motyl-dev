---
title: "7 Tasks Real People Automated With AI Agents (And Never Did Again)"
excerpt: "A look at how the Kilo team uses their own AI agent platform to permanently retire tedious recurring tasks from meal planning to cattle monitoring."
publishedAt: "2026-04-18"
slug: "mybotdoesthat-7-tasks-kilo-team-automated-forever"
hashtags: "#substac #ai #agents #workflow #productivity #automation #generated #en"
source_pattern: "Substac"
---

## #MyBotDoesThat: 7 Tasks the Kilo Team Retired From Forever

**TLDR:** The team behind Kilo, an AI agent platform, shared seven real workflows their own people use to offload recurring tasks to bots permanently. From meal prep to NYC transit routing, these aren't demos — they're daily habits. The company is also running a social media challenge with cash prizes for anyone who does the same.

**Summary:**

There's a gap between what people expect AI agents to do and what they're actually doing right now for folks paying attention. The promise was always "AI handles the boring stuff." The reality is that most people are still doing the boring stuff and waiting for some future version of AI to arrive and fix it. But the machinery is already here. It's just a matter of pointing it at the right problems.

The article from the Kilo blog does something refreshingly concrete: instead of talking abstractly about AI automation potential, it walks through seven actual workflows that real people on the Kilo team run every day. No demos, no screenshots of theoretical pipelines. Just things people set up once and stopped thinking about.

Take Evgeny's meal prep workflow. Every Friday his bot reminds him to plan the week's meals, they plan it together conversationally, and then the bot pushes a grocery list to Todoist and creates per-day prep instructions. It also tracks what's in the freezer and tells him each evening what to pull out for tomorrow. The entire loop, from planning through eating, runs through a single agent he configured once. That's the kind of compounding value that's hard to appreciate until you've experienced it. The friction that normally lives in your head, the "wait what were we eating Thursday" problem, just disappears.

Ligia's case is the one that genuinely surprised me. She manages a cattle operation in Brazil while living in the Netherlands, over ten thousand kilometers away. Her animals generate constant health monitoring data, most of it noise. She pipes it all into her Claw agent, which only bothers her when something actually matters, like a health issue persisting more than twenty-four hours. At that point the bot adds it to her to-do list and drafts a message to her vet. It also monitors milk production and cash flow, so she can check the business without logging into anything. One interface, one agent, remote-managing a physical farm across continents. That's not a future use case. That's Tuesday for her.

The others are compelling in different ways. Scott gets a pre-meeting briefing assembled automatically from his calendar, attendee list, attached documents, and CRM, delivered ten minutes before every call. Brian deleted the airport email scramble entirely because his bot already scanned his Gmail for flight confirmations and sends him just the gate, departure time, and seat number. Ari deleted a stack of transit apps and replaced everything with a single bot that knows his calendar and actually accounts for ferries as a legitimate NYC transit option. And Brendan's story is my favorite for its simplicity: he automated spinning up benchmarks and simply stopped doing it manually, and that was the whole thing. Not everything needs to be dramatic.

**Key takeaways:**

- Real AI agent automation compounds over time because setup cost is one-time but the payoff is every single day
- The most valuable automations are often the least impressive-sounding ones, like a daily weather briefing or a pre-meeting digest, because they remove cognitive overhead at scale
- An always-on personal agent that connects to your existing platforms (email, calendar, CRM, Todoist) is a fundamentally different model than one-off AI queries
- Remote management of physical operations (like livestock monitoring) is a legitimate and working use case today, not a roadmap item

**Why do I care:** From an architecture standpoint, what's interesting here isn't the individual automations but the pattern they share. Each one is essentially a lightweight event-driven workflow with a human-readable trigger, a context-gathering step, and an action or notification output. That's the same mental model I use when thinking about good software systems. The fact that non-engineers are building these naturally, without writing code, tells me the abstraction layer has genuinely improved. The question for me as a developer is what that means for the tooling we build, and whether we're giving users the primitives to compose these kinds of workflows themselves inside our products.

**Link:** [#MyBotDoesThat: 7 Tasks the Kilo Team Retired From Forever](https://blog.kilo.ai/p/mybotdoesthat?publication_id=4363009&post_id=194351279&isFreemail=true&triedRedirect=true)
