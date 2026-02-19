---
title: "The Compounding Game: Why Spec-Driven Development Misses the Point"
excerpt: "Kent Beck argues that software development is not a finish line race but a compounding game, and AI genies won't save you from complexity debt."
publishedAt: "2026-02-18"
slug: "the-compounding-game-why-spec-driven-development-misses-the-point"
hashtags: "#substack #architecture #ai #engineering #generated #en"
---

## Earn *And* Learn

**TLDR:** Kent Beck introduces the concept of two distinct software development games: The Finish Line Game (build to spec, ship, done) and The Compounding Game (each delivery funds the next). He argues that most teams unknowingly play the wrong game, and that AI coding assistants won't save you from the consequences.

**Summary:**

Alright, this one from Kent Beck hits at something I've been chewing on for a while now. He frames software development as a choice between two fundamentally different games, and honestly, most teams don't even realize which one they're playing. The Finish Line Game is straightforward: you have a spec, you build to that spec, you ship. Done. Think of a one-off data munging script. You write it, you run it, you never touch it again. That's a perfectly valid game to play — when it's actually the game you're in.

But here's where it gets interesting, and where I think Beck is really poking at something uncomfortable. Most of us are not playing The Finish Line Game. We're playing The Compounding Game, where the first thing we ship earns the resources — the trust, the revenue, the organizational capital — to build the next thing. And that next thing earns the resources for the thing after that. It's not a sprint to a finish line; it's an infinite game where the goal is to keep playing. And if you treat an infinite game like a finite one, you're going to hit a wall hard.

Now, the AI angle here is what really caught my attention. Beck refers to AI coding tools as "the genie" and makes a sharp observation: the genie is great at features but terrible at futures. It can help you cross a finish line, sure. You can write a better agent.md file, give it more context, nudge its output quality upward. But that's still Finish Line Game thinking. The genie doesn't understand that the decisions you make today about code structure, about what's easy to change tomorrow, about keeping optionality open — those decisions compound. They're investments in your future capacity to deliver.

And here's what I think Beck is dancing around but not quite saying directly: complexity is the real enemy, and AI accelerates your ability to generate it. If you're playing The Compounding Game and you let an AI agent autonomously crank out features without investing in futures — without tidying, without refactoring, without thinking about what you need to be able to build next quarter — you're building a house of cards faster than ever before. The genie's capacity has limits, and when the accumulated complexity exceeds those limits, game over. There are still plenty of dollar signs on the table, but you can't reach them anymore.

What's missing from this piece, though, is the practical bridge. Beck acknowledges there's more to come — what senior engineers do, what junior engineers do, what tools and practices to apply — but right now this reads as a framing essay. It sets up the mental model beautifully but leaves you hungry for the concrete moves. I also think he's underweighting one scenario: what happens when the genie gets good enough to manage some level of futures on its own? Not all of them, sure, but refactoring tools, architecture linting, automated tidying — these are not science fiction. The line between "features only" and "features plus futures" might blur faster than the essay implies.

**Key takeaways:**
- Software development is either a Finish Line Game (build to spec, done) or a Compounding Game (each delivery earns resources for the next) — know which one you're playing
- AI coding assistants excel at features but are blind to futures — the optionality and structural health that enable long-term compounding
- Spec-driven development with AI won't save you from complexity accumulation; at some point the system's complexity will exceed even the AI's capacity
- Investing in futures (tidying, refactoring, maintaining optionality) is not overhead — it's the core mechanic of The Compounding Game
- Better prompts and better agent files are still Finish Line Game tactics applied to a Compounding Game problem

**Tradeoffs:** The central architectural tradeoff here is features versus futures. Shipping features fast creates immediate value but accumulates structural debt. Investing in futures (clean abstractions, good test coverage, manageable complexity) slows individual deliveries but extends the lifespan and capacity of the system. Beck argues you need both, alternating between them, and that this alternation is what separates teams that compound value from teams that flame out.

**Link:** [Earn *And* Learn](https://tidyfirst.substack.com/p/earn-and-learn)