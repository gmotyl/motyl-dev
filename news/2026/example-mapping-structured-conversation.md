---
title: "A Sneak Peek About Example Mapping: A Structured Conversation Framework for Teams"
excerpt: "Oskar Dudycz explores Example Mapping, a simple yet powerful technique for collaborative requirement analysis using colored cards to organize stories, rules, examples, and open questions."
publishedAt: "2026-02-02"
slug: "example-mapping-structured-conversation"
hashtags: "#substac #architecture #agile #collaboration #testing #generated #en"
---

## A Sneak Peek About Example Mapping

**TLDR:** Example Mapping is a 25-30 minute structured conversation technique using colored cards (yellow for stories, blue for rules, green for examples, red for questions) to collaboratively break down user stories and uncover misunderstandings between developers, testers, and business stakeholders before implementation begins.

## Summary

Example Mapping is a deceptively simple yet remarkably powerful technique created by Matt Wynne that should be far more widely adopted in software development teams. At its core, it's a facilitated conversation format where a small group—typically a developer, a tester, and someone from the business side—gathers together to discuss and break down a user story in approximately 25-30 minutes. The brilliance of Example Mapping lies in its structured simplicity, using only colored cards or sticky notes to organize and visualize the conversation.

The technique employs four types of cards, each representing a different aspect of the discussion. Yellow cards represent the user story itself—the feature or capability being discussed. Blue cards capture the rules: the business logic and acceptance criteria that define how the feature should behave. Green cards are for concrete examples that illustrate each rule, making abstract requirements tangible. Red cards represent the questions that nobody can answer right now—the unknowns and gaps in understanding. Throughout the session, the group continuously asks "what's an example of that?" to ground abstract rules in concrete, real-world scenarios and cluster examples under the rules they demonstrate.

The real value emerges from what this conversation reveals. Misunderstandings between business stakeholders and technical team members are expensive—they lead to wasted weeks of development effort building the wrong thing. When multiple people attempt to describe the same rule using real examples, discrepancies in assumptions surface immediately. A 30-minute conversation can prevent two weeks of misdirected coding. Beyond conflict resolution, Example Mapping serves as an effective readiness check. Too many red cards signal that the story isn't sufficiently understood. An abundance of blue cards suggests the story is too large and should be broken down further. When examples emerge easily and everyone nods in agreement, you have a strong signal that the work is ready to begin.

For architects and technical teams, Example Mapping provides a structured approach to requirements gathering that bridges the gap between business language and technical implementation. It ensures that acceptance criteria are not just documented but collectively understood before development begins. The examples captured on green cards often translate directly into acceptance tests, meaning the session produces not just clarity but also test specifications. This transforms Example Mapping from a simple conversation technique into a lightweight specification engine that naturally produces testable, concrete requirements.

## Key Takeaways

- Example Mapping uses four types of colored cards (yellow/story, blue/rules, green/examples, red/questions) to structure collaborative requirement discussions
- A 25-30 minute Example Mapping session can prevent weeks of misdirected development by surfacing misunderstandings early
- The readiness of a story can be assessed through card distribution: many red cards indicate unresolved questions, many blue cards suggest the story is too large
- Green card examples often translate directly into acceptance tests, producing testable specifications from the collaborative session
- The technique requires minimal setup while delivering significant value across developer, tester, and business stakeholder perspectives

## Tradeoffs

- Gain early clarity and alignment but sacrifice structured documentation in favor of conversational outcomes
- Gain testable acceptance criteria but must invest time upfront in facilitated group sessions rather than async requirements gathering
- Gain simple visual organization but sacrifice detailed specifications that might support asynchronous distributed teams

## Links

- **Article:** [A sneak peek about Example Mapping](https://substack.com/@oskardudycz)
- **Matt Wynne's Introduction:** [Example Mapping explained by the creator](https://cucumber.io/blog/bdd/example-mapping-introduction/)
- **Gojko Adzic's Intro:** [Quick introduction to Example Mapping](https://gojko.net/)
- **Seb Rose's Video:** Example Mapping Essence (Video)
- **Kenny Baas-Schwegler's EventStorming Video:** Matching Example Mapping with EventStorming
- **Discord Community:** [Join Oskar's Discord for library updates](https://discord.gg/)
- **PostgreSQL Storage Article:** [Enhanced rebuilding and async processing capabilities](https://substack.com/redirect/398b44aa-097d-4555-aa5c-377429051a67)
- **Hono Web API Library:** [Hono integration helpers](https://hono.dev/)
- **Cloudflare D1:** [Cloudflare D1 storage support](https://developers.cloudflare.com/d1/)
