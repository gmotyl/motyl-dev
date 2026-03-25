---
title: "The Telephone Game of Software: How Intent Gets Lost From Idea to Production"
excerpt: "Exploring how software development is essentially a translation game, and how AI is forcing us to rethink every step from intent to code."
publishedAt: "2026-03-25"
slug: "telephone-game-software-intent-translation"
hashtags: "#substack #architecture #ai #productivity #developer-experience #software-engineering #code-quality #generated #en"
---

## The Telephone Game of Software

**TLDR:** Software development is fundamentally a translation act — from what you want to achieve to what ends up in production. AI is forcing us to rethink every step of that translation chain, and the concept of "intent" is becoming central to how we discuss engineering workflows.

**Summary:**

Alright folks, let me tell you about something that has been rattling around in my brain. Luca Rossi over at Refactoring just dropped a piece that frames software engineering in a way I find genuinely refreshing. He calls it the telephone game of software, and the analogy is almost painfully accurate. You know the telephone game — you whisper something to one person, they whisper it to the next, and by the end the message is completely mangled. That is basically what happens every single day in our industry, from the moment someone has an idea to the moment code hits production.

The central concept here is "intent," and Rossi makes the point that this word has really exploded in our vocabulary thanks to the AI shift. We now talk about capturing a PM's intent in specs, or making sure AI-generated code reflects the engineer's intent. What is fascinating is that this is not a new problem at all — it is the oldest problem in software — but AI is finally giving us the language and the pressure to confront it head-on. Every step in your development process is a translation layer. High-level idea becomes a spec. Spec becomes a design. Design becomes code. And at every single one of those boundaries, fidelity can be lost. Many of our engineering practices — code reviews, PRDs, design docs — exist precisely to reduce the error rate of that translation.

Rossi walks through a concrete example from his own work building an editor. He wants to add split panes. Simple enough in his head, right? But the moment you start writing a spec, you have to make dozens of micro-decisions. How is the split triggered? Is there a button? What about keyboard shortcuts? What happens when you drag a tab between panes? And here is the critical thing — some of those decisions are just filling in detail, but others can actually derail the feature in a direction that was never intended. A spec writer might legitimately interpret "split panes" as opening tabs in new windows, which is a completely different feature. That gap between what you meant and what got written down is where bugs, wasted cycles, and frustration are born.

The piece also features insights from Amelia Wattenberger, who has been thinking deeply about developer workflows and built a tool called Intent that has strong opinions about this problem space. Together they explore the idea of "staying at the right altitude" — making sure your artifacts match the level of detail you actually want to inspect and verify. They also discuss using the product itself to improve understanding, not just as the thing you are implementing but as a feedback mechanism that helps you refine your own intent. This is a subtle but powerful reframing: building the thing teaches you what you actually wanted.

What I find most provocative about this piece is the open questions it raises. Should we write big specs beforehand, or is that just adding more telephone game nodes? Should we keep human code reviews in an AI-heavy workflow? The honest answer is that nobody really knows yet, and the willingness to say that out loud is refreshing compared to the breathless certainty you see elsewhere.

**Key takeaways:**
- Software development is a multi-step translation from intent to production, and fidelity is lost at every boundary
- The concept of "intent" has become central to discussing engineering workflows in the AI era
- Every engineering practice (code reviews, PRDs, specs) exists to reduce translation error rates
- Micro-decisions in specs can silently derail features away from the original intent
- Staying at the "right altitude" means matching your artifacts to the level of detail you need to verify
- Building the product should be a feedback loop that refines your understanding of what you actually want

**Why do I care:** This is one of those pieces that makes you stop and reconsider something you do every day without thinking about it. As someone who has spent years in the trenches, I can tell you the intent problem is real and it is expensive. I have seen entire features get built correctly according to the spec but completely wrong according to what someone actually wanted. The AI angle makes this more urgent because AI amplifies both the speed and the error rate of translation. If your spec is slightly off, a human developer might catch that and ask a question. An AI will cheerfully implement exactly what you said, not what you meant. Understanding this dynamic is not optional anymore — it is the difference between AI making you faster and AI making you faster at building the wrong thing.

**Link:** [The Telephone Game of Software](https://refactoring.fm/p/the-telephone-game-of-software)
