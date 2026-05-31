---
title: "Open-Source Runtimes, AI Agents in Slack, JavaScript Object Flattening, and a Blind Hacker's Path to Cybersecurity"
excerpt: "This HackerNoon edition covers building a no-code open-source runtime, placing AI coding agents where developers actually communicate, a JavaScript object flattening technique that doubles as an interview question, and an extraordinary story of how blindness led one person to reshape cybersecurity accessibility."
publishedAt: "2026-05-31"
slug: "hackernoon-open-source-runtime-ai-agents-javascript-blind-hacker-cybersecurity"
hashtags: "#hackernoon #engineering #ai #generated #en #javascript #opensource #cybersecurity #aitools"
source_pattern: "HackerNoon"
---

## This Is How I Built an Open-Source Runtime Without Writing A Single Line of Code

**TLDR:** Matias Denda built Mycel, an open-source runtime that converts declarative configuration into fully operational microservices. The project required no hand-written implementation code, challenging what "writing software" actually means in a world of AI-assisted tooling.

**Summary:** The title is deliberately provocative, and that's worth sitting with for a moment. Matias Denda, a Technical Architect who builds open-source projects at night, created something called Mycel, a runtime that takes your configuration and produces a functioning microservice, complete with REST API and database wiring, without requiring you to write the implementation yourself.

What Mycel attacks is something Denda calls "boilerplate tax," the compounding cost of re-implementing the same patterns every time you stand up a new service. Think about how many times you've written a CRUD REST API from scratch. The scaffolding, the route handling, the validation layer, the database connection, the error responses. All of it is essentially deterministic given the shape of your data. Mycel says: give me the shape, I'll give you the service.

The claim that "no code was written" deserves scrutiny. Configuration is code. YAML is code. JSON Schema is code. What Denda means is closer to: no imperative, procedural code was written. And that distinction actually matters a great deal architecturally. You are trading expressiveness for convention. Mycel can give you a service fast, but only the service it knows how to build.

What the article doesn't fully address is where Mycel breaks down. Every configuration-driven system eventually hits edge cases that the configuration model didn't anticipate. Business logic bleeds in. Validation gets complex. Authorization rules get nuanced. The moment your service needs to do something Mycel doesn't model, you're either extending the framework or you're rewriting the service. That inflection point isn't hypothetical, it's inevitable, and knowing where it lives matters as much as the initial productivity win.

That said, for internal tooling, for prototyping, for services that genuinely are CRUD wrappers over a database, something like Mycel is genuinely interesting. The boilerplate tax is real and it is paid by real engineers every single week.

**Key takeaways:**
- Mycel is a configuration-driven open-source runtime that generates microservices from declarative specs
- The "no code" framing is a bit generous, since configuration is still code, just at a higher abstraction level
- The real value is eliminating repetitive scaffolding for standard REST/database service patterns
- The unsolved question is how gracefully Mycel handles requirements that escape its configuration model
- Worth evaluating for internal tools, data APIs, and rapid prototyping contexts

**Why do I care:** As a senior frontend developer who also talks to backends constantly, I care about how fast I can get a new API endpoint standing. If Mycel can produce a working, documented REST API from a schema definition in minutes instead of days, that changes the calculus for frontend teams waiting on backend resources. The danger is treating it as a permanent solution rather than a starting point, but as a productivity tool it deserves a serious look.

**Link:** [This Is How I Built an Open-Source Runtime Without Writing A Single Line of Code](https://hackernoon.com/this-is-how-i-built-an-open-source-runtime-without-writing-a-single-line-of-code)

---

## Your AI Coding Agent Should Live Where the Important Conversations Happen

**TLDR:** The argument here is that AI developer tools are too isolated inside the IDE, while real engineering decisions happen in Slack and other communication platforms. Bringing the coding agent into those conversations could eliminate costly context switching.

**Summary:** This piece comes from Kilo, which is itself an AI developer platform, so take the framing with that in mind. The pitch is that AI coding agents are currently trapped in a silo. They live in your editor, they know your code, but they don't know the conversation that led to the code. When a product decision gets made in Slack, that decision gets translated into a ticket, which gets translated into a PR description, which eventually gets read by a developer. By the time the AI agent sees it, the original intent has been filtered multiple times.

The proposal is that the agent should participate earlier in the pipeline, in the channel where the decision is being discussed, able to ask clarifying questions, surface relevant code, and understand requirements before they've been compressed into a task description. This is actually a reasonable observation about how information degrades as it moves through tools.

What the article sidesteps is the organizational trust problem. Giving an AI agent access to your Slack workspace means it has access to your entire communication graph: sales conversations, HR discussions, performance threads. Even if the agent is only technically invoked in engineering channels, the access model doesn't usually work that narrowly. Security teams will notice, and they should. The article treats this as a UX problem, but it's at least partly a governance problem.

There's also a subtler issue. The reason engineering decisions are made in Slack is that Slack is low-friction and contextual. Adding an AI agent to those conversations changes the social dynamics. Developers talk differently when they know a tool is parsing and acting on their messages. That chilling effect on informal technical discussion is not nothing.

The core insight, that context switching between communication tools and coding tools is genuinely expensive, is right. Whether integrating the agent into Slack is the best answer, or whether the answer is better structured handoffs between those tools, is a separate question the article doesn't seriously engage with.

**Key takeaways:**
- AI coding agents that only live in the IDE miss the earlier, higher-value conversations where requirements are actually formed
- Bringing agents into Slack-style communication could reduce context loss between decision and implementation
- The security and governance implications of broad Slack access are underexplored in the article
- Social dynamics in engineering channels may shift when an AI agent is a persistent participant
- The problem of context switching is real even if this specific solution creates new problems

**Why do I care:** As a frontend developer, I live in the gap between design decisions made in Figma, engineering discussions in Slack, and code in VS Code. If an AI agent could bridge that gap without me having to manually re-explain context at each boundary, that would be genuinely valuable. But I'd want to understand the access model and data handling before inviting any agent into team channels. The productivity gain doesn't automatically outweigh the privacy tradeoff.

**Link:** [Your AI Coding Agent Should Live Where the Important Conversations Happen](https://hackernoon.com/your-ai-coding-agent-should-live-where-the-important-conversations-happen)

---

## Converting Nested Objects to Flat Objects in JavaScript: A Quick Guide

**TLDR:** Nandan Kumar walks through the classic interview problem of flattening deeply nested JavaScript objects into a single-level structure, using recursion and careful handling of arrays. It's a small problem with a lot of surface area once you start thinking about edge cases.

**Summary:** This is an interview staple, and Nandan frames it honestly as such. The question looks trivial until it isn't. You have an object with arbitrarily deep nesting, and you need to produce a flat key-value map where the keys represent the path through the original structure. Depth-first recursion handles the basic case cleanly enough.

What makes this problem interesting is how you decide to handle arrays. Most naive implementations either skip them entirely or treat array indices as keys, which produces output like "users.0.name" rather than something more meaningful. The right answer depends entirely on your use case, and the article walks through the trade-offs in a readable way.

There's a version of this problem that comes up constantly in real frontend work: normalizing API responses. When a REST API returns deeply nested JSON and your state management layer wants flat records, this exact function is often what bridges them. Libraries like normalizr exist for the more structured version of this problem, but knowing how to write the primitive yourself is still worth having in your head.

One thing I'd push back on: the article frames the recursion solution as the answer, but for objects that might be very deep or very large, a stack-based iterative approach avoids the risk of a call stack overflow. That's not a theoretical concern if you're processing large tree structures from a backend. The article doesn't mention this alternative, and it's a real gap.

**Key takeaways:**
- Object flattening is a common interview question that tests understanding of recursion and JavaScript object traversal
- Array handling is where naive implementations break down, and the right strategy depends on your data contract
- This pattern appears in real frontend work when normalizing nested API responses
- Recursive solutions can hit call stack limits on very deep or large objects; iterative stack-based approaches are safer for production use
- Libraries like normalizr handle the structured version of this problem, but understanding the primitive is still valuable

**Why do I care:** Flattening nested data is something I've written variations of dozens of times across different projects. The real-world version usually involves additional constraints, handling circular references, preserving type information, dealing with null values. Understanding the core recursion makes you better at reaching for normalizr or similar tools with appropriate confidence, rather than treating them as magic.

**Link:** [Converting Nested Objects to Flat Objects in JavaScript: A Quick Guide](https://hackernoon.com/converting-nested-objects-to-flat-objects-in-javascript-a-quick-guide)

---

## How Blindness Led Me to Cybersecurity — and to Securing Accessibility Itself

**TLDR:** Juan Mathews Rebello Santos, who identifies as the first blind hacker in Brazil, challenges the assumption that cybersecurity is an inherently visual discipline. He works in penetration testing and security research using screen readers and assistive technology, and has turned his experience toward auditing security tools for accessibility failures.

**Summary:** This one stopped me. Most people in this industry, including me, operate with an implicit assumption that security work requires visual interaction with screens, terminals, dashboards, and packet captures scrolling in real time. Juan's career is a direct refutation of that assumption, and it's more than just an inspiring personal story. It exposes a structural problem in how security tooling is built.

Juan does penetration testing and security research as a blind person, which means he depends on screen readers, keyboard navigation, and text-based interfaces that most security tools treat as an afterthought. The irony he identifies is sharp: the same tools that are supposed to protect digital systems are themselves inaccessible, creating a category of exclusion that has nothing to do with skill or knowledge and everything to do with how interfaces are designed.

The question the article poses, what happens if a critical vulnerability is discovered but the tool that would find it is inaccessible to the person trying to use it, is not rhetorical. It's a real operational gap. If your security tooling can only be used by people with full visual access, you are narrowing your talent pool by design, not by necessity.

What the article doesn't fully explore is the systemic side. Individual accessibility heroics are remarkable but they shouldn't be necessary. The problem is that security tool vendors don't consistently include accessibility in their definition of quality. Screen reader compatibility, keyboard operability, sufficient color contrast: these are table stakes in most other software categories now. In security tooling they remain exceptions. That's a choice, and it's one the industry keeps making without much scrutiny.

Juan's work auditing security tools for accessibility problems is the part I found most interesting. He's not just navigating around inaccessible tooling; he's documenting where it fails and why that matters. That kind of feedback loop between marginalized users and tool developers is exactly how the situation changes, slowly, imperfectly, but measurably.

**Key takeaways:**
- Cybersecurity is not inherently a visual discipline, though most tooling is built as if it were
- Juan Mathews works as a blind penetration tester and security researcher using assistive technology
- Security tools consistently lag behind accessibility standards that other software categories now meet
- Inaccessible security tooling narrows the talent pool by design, not by technical necessity
- Auditing tools for accessibility failures and feeding that back to vendors is the mechanism for change

**Why do I care:** Frontend developers own the accessibility of the interfaces we build. But this article is a reminder that accessibility audits and WCAG compliance matter beyond consumer-facing products. Internal tools, developer dashboards, security platforms, all of them have users who depend on assistive technology, and the assumption that "developers don't need accessibility" is both wrong and harmful. Juan's story puts a human cost on what is usually an abstract compliance checkbox.

**Link:** [How Blindness Led Me to Cybersecurity — and to Securing Accessibility Itself](https://hackernoon.com/how-blindness-led-me-to-cybersecurity-and-to-securing-accessibility-itself)
