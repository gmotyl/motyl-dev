---
title: "Slave Software, Polarity Work, and AI Context"
excerpt: "Why we'll stop writing software for repetitive tasks, how leaders can embrace both/and thinking, and giving AI agents organizational knowledge"
publishedAt: "2026-03-23"
slug: "slave-software-polarity-work-ai-context"
hashtags: "#substack #ai #architecture #leadership #engineering #management #generated #en"
---

## Slave Software: The End of Automation Scripts

**TLDR:** AI agents change what software is worth building. Instead of writing deterministic automations with Zapier or custom code, we can now tell an agent to do repetitive tasks. LLMs handle ambiguity in ways regular software can't.

**Summary:**

This is a provocative framing with real insight. The author argues that AI agents fundamentally change the scope of software we should build. There's an awful lot of automations patched together with Zapier, n8n, custom code. Tasks like "every hour, go here, copy this, paste it there." Deterministic software would be more efficient for these tasks. But the cost of building it is dramatically higher than a one-line instruction in a chat.

Even in the age of AI-generated software, nothing beats just telling a slave to do the thing. LLMs can handle ambiguity in ways regular software can't. They can wing it. Things more or less work. The author's example is personal. Exporting 10,000 notes from Notion to markdown files. The complexity stopped him for years. Earlier this month, OpenClaw did it perfectly. Writing scripts for API calls, improvising tricky parts, figuring things on the go. Like a human would do manually, except that would have taken weeks.

There's a growing class of problems for which we won't write software anymore. We'll just throw an AI slave at them. This changes the scope of human work, but also the scope of software itself. LLMs differ from humans in one key way. They're perfectly fine doing boring, repetitive work. All day, every day.

**Key takeaways:**

- AI agents change what software is worth building
- One-line chat instructions beat Zapier automations for many tasks
- LLMs handle ambiguity and can improvise solutions
- Growing class of problems solved by AI slaves, not deterministic code
- Example: 10,000 Notion notes exported by OpenClaw in hours, not weeks

**Why do I care:**

As a senior frontend architect, I've built countless automations. Data sync scripts. Report generators. ETL pipelines. This post makes me question which ones were worth building. The cost-benefit analysis has shifted. If an agent can do it with a prompt, was the deterministic script ever justified? The slave framing is uncomfortable but apt. These are tasks we delegate because they're beneath human attention. The ambiguity handling is key. Regular software breaks on edge cases. LLMs adapt. They figure it out. For architects, this means rethinking what we build. Not everything needs to be a production system. Some things can be agent tasks. The question becomes: when is determinism worth the cost? When is ambiguity acceptable? I don't have the answer yet. But I'm asking the question now.

**Link:** [Slave software, polarities, and weekly readings](https://refactoring.fm/p/slave-software-polarities-and-weekly?publication_id=64099&post_id=191354498&isFreemail=true&triedRedirect=true)

---

## Polarity Work: Both/And Leadership

**TLDR:** Polarity work helps leaders see that what feels like either/or choices are actually both/and situations. Empowerment vs directness, team needs vs business needs. Most situations allow both simultaneously.

**Summary:**

This concept comes from Richard Hughes-Jones, a professional tech coach with 20+ years of experience. Polarity work is helping leaders see that what feels like an either/or choice is actually a both/and situation. The framing shift is powerful. Leaders often think in binaries. Empower the team or have strong opinions about what to do. Team's needs or business's needs. These feel like trade-offs. You can't have both.

The first polarity: empowerment vs directness. Leaders may think they can either empower their teams or have strong opinions. In most situations, you can find ways to do both at once. Strong opinions about the problem space. Empowerment about the solution space. Clear constraints. Freedom within those constraints. This isn't compromise. It's synthesis.

The second polarity: team's needs vs business's needs. Seeing these two as being at odds is usually a limiting belief. It prevents finding true good solutions. The best solutions serve both. A team that's thriving delivers better business outcomes. A business that's healthy provides stability for the team. The polarity isn't real. It's a mental model problem.

**Key takeaways:**

- Polarity work: either/or choices are actually both/and situations
- Empowerment vs directness: can do both simultaneously
- Team needs vs business needs: false dichotomy, limiting belief
- Best solutions serve both poles, not one at expense of other
- Polarity thinking prevents finding true good solutions

**Why do I care:**

As someone who's led teams and architected systems, this resonates deeply. I've felt the tension. Empower the team or drive the technical vision? Can't do both, right? Wrong. The best technical leaders I've seen do both. Strong opinions about architecture principles. Empowerment about implementation details. Clear about the what. Flexible about the how. The team vs business polarity is equally false. I've seen teams burn out delivering business value. I've seen businesses fail coddling teams. The synthesis is sustainable pace delivering sustainable value. Polarity work is a mental tool. When you catch yourself thinking either/or, pause. Ask: is this actually both/and? Most of the time, it is. The constraint is your thinking, not the situation. For senior engineers moving into leadership, this is crucial. You don't stop having technical opinions. You learn when to impose them and when to empower others. Both/and.

**Link:** [Slave software, polarities, and weekly readings](https://refactoring.fm/p/slave-software-polarities-and-weekly?publication_id=64099&post_id=191354498&isFreemail=true&triedRedirect=true)

---

## Unblocked: Organizational Context for AI Agents

**TLDR:** Unblocked gives coding agents organizational knowledge to generate mergeable code without back-and-forth. It pulls context from across your engineering stack, resolves conflicts, and cuts rework.

**Summary:**

This is a tool worth watching. Unblocked addresses a real problem. AI agents generate code, but without organizational context, it doesn't merge cleanly. The back-and-forth is exhausting. Agent generates PR. Reviewer says: we don't do it that way here. Agent revises. Reviewer says: this conflicts with X. Agent revises again. Unblocked short-circuits this.

The tool pulls context from across your engineering stack. Coding standards. Architecture patterns. Existing codebases. It resolves conflicts before they happen. Cuts the rework cycle by delivering only what agents need for the task at hand. The founder was interviewed on the podcast. The author is a big fan. Unblocked represents the authority on giving good context to AI agents.

The value proposition is clear. Agents with context generate better code. Less back-and-forth. Faster merges. The alternative is manual context dumping. Here's our style guide. Here's the architecture doc. Here's the PRD. Agents miss things. Humans miss things. Unblocked automates the context delivery.

**Key takeaways:**

- Unblocked provides organizational context to AI coding agents
- Pulls context from engineering stack automatically
- Resolves conflicts before PR creation
- Cuts rework cycle by delivering relevant context
- Agents generate mergeable code without back-and-forth

**Why do I care:**

As an architect, context is everything. I've reviewed PRs from junior developers who didn't know the patterns. I've reviewed PRs from AI agents who didn't know the patterns. Same problem. Different source. Unblocked addresses this systematically. The tool encodes organizational knowledge. It makes that knowledge available at code-generation time. This is force multiplication. Senior engineers don't need to review every stylistic choice. The agent already knows. They can focus on architecture, logic, edge cases. For teams adopting AI agents, this is infrastructure. Not optional. Context is the difference between useful and unusable agents. I'd evaluate this for any team serious about AI-assisted development. The ROI is in reduced review time. Reduced rework. Faster iteration. The question isn't whether to use context. It's whether to automate context delivery or do it manually.

**Link:** [Unblocked](https://refactoring.fm/p/slave-software-polarities-and-weekly?publication_id=64099&post_id=191354498&isFreemail=true&triedRedirect=true)

---

## Weekly Readings: Future of Software, AI Reimplementations, and Prioritization

**TLDR:** Three recommended articles: Annie Vella on the future of software development retreat, antirez on AI reimplementations through historical lens, and Boz on prioritizing things against each other, not in isolation.

**Summary:**

Three articles worth reading. First, Annie Vella attended the future of software development retreat, hosted by Martin Fowler and Thoughtworks. She reported back on eight themes she extracted. The author enjoyed her framing. Retreats like this gather industry leaders to discuss where software is heading. AI's role. Engineering practices. Team dynamics. Annie's synthesis is valuable. Eight themes give structure to the conversation.

Second, antirez implicitly comments on recent controversies about AI reimplementations. He looks at examples from the past. Historical perspective provides context. The new mental model he proposes is key. What matters now is design, novelty, and craft. Not just the code itself. This is a response to the debate about AI rewriting existing tools. Is it innovation or regurgitation? antirez says: look at history. Design and craft matter more than raw code.

Third, Boz writes in his signature style. Super short post. You should not prioritize things in isolation. Only prioritize them against each other. This is prioritization wisdom in one sentence. Prioritizing in isolation leads to local optima. Everything seems important. Prioritizing against each other forces trade-offs. If A is more important than B, and B is more important than C, you have a hierarchy. You can act on it.

**Key takeaways:**

- Annie Vella: 8 themes from future of software retreat
- antirez: AI reimplementations viewed through historical lens
- What matters: design, novelty, craft, not just code
- Boz: Prioritize things against each other, not in isolation
- Historical perspective provides mental models for current debates

**Why do I care:**

These three articles represent different levels of abstraction. Annie's retreat themes are industry-level. Where is software going? antirez's post is craft-level. What makes code worth writing? Boz's post is decision-level. How do I choose what to do next? As a senior engineer, I need all three perspectives. Industry trends inform my career decisions. Craft principles inform my code quality. Prioritization frameworks inform my daily work. The antirez point about design and craft is particularly relevant. In an age of AI-generated code, what differentiates good engineers? Not typing speed. Not syntax knowledge. Design sense. Craft. Novelty. These are human skills. AI can generate code. Humans decide what's worth generating. The Boz prioritization advice is actionable immediately. I have a task list. Instead of prioritizing each task in isolation, I'll prioritize them against each other. This task vs that task. Which matters more? The answer creates clarity. I'd recommend all three articles. They're short. They're dense. They're worth the time.

**Link:** [Slave software, polarities, and weekly readings](https://refactoring.fm/p/slave-software-polarities-and-weekly?publication_id=64099&post_id=191354498&isFreemail=true&triedRedirect=true)