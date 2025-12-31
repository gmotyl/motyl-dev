---
title: "2025 Programming Retrospective: Job Market Crisis, Vanilla JS Revival, and AI-Driven FOMO"
excerpt: "A look at 2025's programming landscape - from the worst job market in history to developers abandoning frameworks and dealing with AI-induced anxiety."
publishedAt: "2025-12-31"
slug: "2025-programming-retrospective-job-market-vanilla-js-ai-fomo"
hashtags: "#dailydev #javascript #frontend #ai #architecture #career #security #vscode #generated #en"
---

## The Worst Year in Programming History

**TLDR:** 2025 has been brutal for software engineers - the job market is worse than during the pandemic, and despite widespread AI adoption, software quality has actually declined with record outages and code quality issues.

Let me be direct about something uncomfortable: we've spent years building an industry narrative around "learn to code" and perpetual growth, and 2025 has exposed how fragile that assumption was. The job market downturn isn't just a correction - it's a structural shift that even top university graduates are struggling to navigate.

The irony here is striking. We adopted AI tools en masse with promises of increased productivity and better code quality. Instead, we're seeing record outages and degraded code quality across the industry. This isn't to say AI is useless - far from it. But we've conflated "writing code faster" with "writing better software," and those aren't the same thing at all.

What's particularly concerning is the entry-level squeeze. When companies can't justify junior positions because AI ostensibly handles the "simple" work, we're creating a massive gap in our talent pipeline. Who will be the senior engineers of 2030 if we're not training anyone today?

For architects and team leads, this should prompt serious reflection on your hiring and mentorship strategies. The teams that maintain a healthy mix of experience levels - and that use AI to augment rather than replace junior learning opportunities - will be better positioned when the market eventually recovers.

**Key takeaways:**
- The 2025 job market for software engineers is worse than pandemic-era conditions
- AI adoption has not correlated with improved software quality - the opposite may be true
- The entry-level hiring freeze creates long-term talent pipeline problems

**Link:** [THE WORST YEAR IN PROGRAMMING HISTORY](https://app.daily.dev/posts/the-worst-year-in-programming-history-0qqm9rivu)

---

## Why Developers Are Ditching Frameworks for Vanilla JavaScript

**TLDR:** Modern browsers have matured to the point where native JavaScript APIs can genuinely replace framework functionality. Web components, ES modules, and the Fetch API now provide modularity and reactivity without the React or Vue overhead.

This is a conversation worth having carefully. The "just use vanilla JS" argument resurfaces every few years, but the 2025 version has more merit than previous iterations. Browser APIs have genuinely caught up - web components are stable, ES modules work everywhere that matters, and you can build reactive interfaces without a virtual DOM.

But let's not be naive about what we're trading. Frameworks aren't popular because developers are lazy or uneducated about native APIs. They're popular because they solve real problems: consistent patterns across large teams, ecosystem tooling, and battle-tested solutions to common challenges. When you "ditch the framework," you're not just losing bundle size - you're losing the accumulated wisdom encoded in that framework's design decisions.

The nuanced take here is that vanilla JavaScript makes sense for certain contexts: smaller applications, teams with strong discipline, or projects where bundle size is genuinely critical. What doesn't make sense is treating this as a universal best practice. A five-person startup building an MVP has different needs than a hundred-person team maintaining a complex application.

For architects evaluating this trend, the question isn't "frameworks vs. vanilla" - it's "what problems do frameworks solve for us specifically, and are those problems present in our context?" If you're building component libraries consumed across multiple teams, the consistency guarantees of a framework probably outweigh the bundle size costs. If you're building a static marketing site, maybe not.

**Key takeaways:**
- Native browser APIs (web components, ES modules, Fetch) now provide framework-equivalent functionality
- The decision should be context-dependent, not ideological
- Framework benefits include team consistency and ecosystem tooling, not just reactivity

**Tradeoffs:**
- Vanilla JS reduces bundle size but sacrifices ecosystem tooling and community patterns
- Ditching frameworks gives you control but requires more discipline to maintain consistency

**Link:** [Why Developers Are Ditching Frameworks for Vanilla JavaScript](https://app.daily.dev/posts/why-developers-are-ditching-frameworks-for-vanilla-javascript-cycaxb92o)

---

## Void: Open Source AI Code Editor as Cursor Alternative

**TLDR:** Void is an open-source AI code editor forked from VS Code, offering autocomplete, inline editing, and file indexing. It supports any LLM and can be self-hosted, making it an interesting alternative to proprietary tools like Cursor.

The AI code editor space is getting crowded, and Void represents an interesting entry point: what if we took the VS Code foundation and built AI features on top, but kept everything open source? The value proposition is clear - you get VS Code's mature ecosystem (themes, keybinds, extensions) with AI capabilities you control.

What's particularly notable is the "any LLM" support combined with local hosting options. For organizations with data sensitivity concerns, this addresses the fundamental objection to tools like Cursor or Copilot: your code doesn't have to leave your infrastructure. That's not a minor consideration for enterprises dealing with compliance requirements.

However, I'd encourage some skepticism about community-driven roadmap claims. Open source AI tooling requires substantial compute resources for development and testing. The sustainability model here matters - who's funding the development, and what happens when the initial enthusiasm wanes? We've seen this pattern before with developer tools that start strong but struggle to maintain momentum.

For teams evaluating AI coding tools, Void is worth watching rather than immediately adopting. Let the early adopters find the rough edges. The VS Code foundation provides confidence in the editing experience, but the AI features need to prove themselves against well-funded competitors.

**Key takeaways:**
- Void is a VS Code fork with built-in AI features (autocomplete, inline editing, file indexing)
- Supports any LLM with local hosting options - addresses enterprise data concerns
- Community-driven development with open source model

**Tradeoffs:**
- Open source provides transparency and customization but may lack polish and consistent development velocity
- Self-hosting gives data control but shifts infrastructure burden to your team

**Link:** [Void - Open Source AI Code Editor](https://app.daily.dev/posts/RBNNDJhFP)

---

## Feeling Behind as a Programmer in the AI Era

**TLDR:** The 2025 programming landscape is dominated by AI hype and FOMO, but developers shouldn't feel pressured to master every new tool. Traditional engineering skills remain essential for validating AI output.

This might be the most important article in today's roundup, because it addresses something we don't talk about enough: the psychological toll of constant technological churn. The AI space in particular moves so fast that "staying current" has become a full-time job that conflicts with actually doing your job.

Here's what I think gets lost in the AI productivity discourse: traditional engineering skills aren't just "still relevant" - they're more critical than ever. Testing, CI/CD, code review, architectural thinking - these are exactly the skills you need to validate whether AI-generated code actually works. The developers who will thrive aren't those who can prompt most effectively, but those who can evaluate AI output critically.

The "10x productivity" promises deserve particular scrutiny. Most productivity claims around AI tools are based on narrow benchmarks - completing coding challenges, generating boilerplate, etc. Real software engineering involves understanding requirements, designing systems, coordinating with teams, and maintaining code over time. AI helps with some of these; it doesn't help with others; and it arguably makes some harder by increasing the volume of code that needs review.

For team leads and architects, this has practical implications for how you structure work and evaluate performance. If your metrics reward code volume, AI tools will look miraculous. If your metrics focus on system reliability and maintainability, the picture becomes more nuanced.

**Key takeaways:**
- AI FOMO is real and psychologically damaging - be intentional about what you learn
- Traditional engineering skills (testing, CI/CD, code review) are essential for validating AI output
- "10x productivity" claims rarely account for full software development lifecycle

**Link:** [Feeling Behind as a Programmer](https://app.daily.dev/posts/C8mbCIFgJ)

---

## WhatsApp and Signal Privacy Vulnerability: Device Activity Tracking via RTT

**TLDR:** A proof-of-concept tool demonstrates that measuring Round-Trip Time of message delivery receipts can reveal whether a device is active, in standby, or offline - a significant privacy vulnerability in encrypted messaging apps.

This is a fascinating and somewhat disturbing piece of security research. We tend to think of end-to-end encryption as providing comprehensive privacy, but this PoC demonstrates that metadata leakage happens at layers encryption doesn't touch. The timing of delivery receipts - how quickly they come back - tells you something about the recipient's device state.

The attack is elegant in its simplicity. Send probe messages, measure response times, build a profile. An actively-used device responds differently than one in standby or offline. You don't need to break encryption to learn when someone is using their phone. For certain threat models - domestic abuse situations, stalking, or state surveillance - this information is genuinely dangerous.

What makes this particularly concerning is that it's not really a "bug" that can be fixed without changing fundamental protocol behaviors. Delivery receipts are a feature, and their timing is inherent to how messaging works. You could disable receipts entirely, but that degrades user experience significantly.

For architects working on communication systems, this is a good reminder that security analysis must extend beyond cryptographic primitives. Side channels exist everywhere - timing, power consumption, electromagnetic emissions, and yes, delivery receipts. The question isn't whether they exist, but whether they're exploitable in your threat model.

**Key takeaways:**
- Message delivery receipt timing can reveal device activity states even with end-to-end encryption
- This is metadata leakage at the protocol level, not a cryptographic weakness
- Privacy analysis must consider side channels beyond encrypted content

**Tradeoffs:**
- Delivery receipts provide UX benefits but create timing side channels
- Disabling receipts improves privacy but degrades user experience

**Link:** [Device Activity Tracker PoC](https://app.daily.dev/posts/YcJReEKpv)

---

*The information presented here is based on newsletter content and may not reflect the complete picture. Always refer to original sources for full context.*