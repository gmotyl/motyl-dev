---
title: "Wider Scope: Kent Beck's Thinkie for Stuck Problems"
excerpt: "Kent Beck shares a thinking pattern called Wider Scope: when stuck on a complicated problem, zoom out to see the feedback loops and surrounding context instead of dissecting the parts."
publishedAt: "2026-05-13"
slug: "kent-beck-wider-scope-thinkie"
hashtags: "#kentbeck #engineering #tdd #thinkie #systemsthinking #problemsolving #generated #en"
source_pattern: "Kent Beck"
---

## Wider Scope: Kent Beck's Thinkie for Stuck Problems

**TLDR:** Kent Beck describes a thinking pattern he calls a Thinkie: when you're stuck on a complicated problem, zoom out instead of zooming in. Look at the sources and uses of the problem, and the feedback loops it participates in. He illustrates the move with the "profit is theft" debate by widening the frame from worker plus owner to capital, production, and return.

**Summary:** Beck opens with a self-aware preamble about why this short piece exists at all, then gets to the pattern. The Thinkie is simple in form. Pattern: you're stuck thinking about a complicated problem. Transformation: look at the problem in its wider context. He borrows vocabulary from Permaculture, asking what the sources and uses of the situation are, and which feedback loops connect to it. The point is that staring harder at the same picture rarely loosens the stuck thinking.

The motivating example comes from an economics framing he encountered called "ecosystem exploitation." In the original version, a factory owner pays a wage, the worker produces something worth more than the wage, the owner sells the product and pockets the surplus. Framed that way, "profit is theft" lands as a clean argument. Beck doesn't take the bait by arguing the moral case. Instead he widens the picture. Before the wage exists, someone had to invest capital to build the factory. After the sale, that capital owner expects to be paid back with interest. If the worker captures all the surplus, nobody finances the factory in the first place, and the whole sequence collapses.

He's careful to mark the limits of his own move. He notes that he has stepped into a centuries-old argument and isn't trying to settle it. The piece is not about who deserves which slice of the surplus. It's about a technique: when a model produces a tidy conclusion that troubles you, check whether the model is the whole picture. Adding the missing step, in this case the investment that precedes production, can change which conclusions are even available.

The Thinkie generalizes well past economics. A bug that resists analysis often makes sense once you include the deploy pipeline that placed it there. A team that misses every estimate looks different once you include the planning cadence and the way priorities shift mid-sprint. Beck is offering a reusable move: when local reasoning stalls, expand the boundary of what counts as part of the problem.

**Key takeaways:**
- Wider Scope is a named move you can reach for when stuck: expand the boundary of the problem instead of dissecting it.
- "Sources and uses" plus "feedback loops" give concrete questions to ask when widening the frame.
- Tidy conclusions from a narrow model are a signal to check whether the model is the whole picture.

**Why do I care:** As a senior frontend dev or architect, most of the hardest decisions sit in the spot where local code reasoning bottoms out. Should this state live in a context, a server component, or a query cache? Locally any answer defends itself. The Wider Scope move pushes you to include the upstream investment such as ownership of the data, the team that maintains it, the cadence of changes, and the downstream return such as who reads it, how often, and what they do next. That wider frame often picks the design for you and makes the trade-off legible to the people you have to convince.

**Link:** [Thinkie: Wider Scope](https://tidyfirst.substack.com/p/thinkie-wider-scope)
