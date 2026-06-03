---
title: "I Barely Specced a Card Game. My Agent Built 14 Enemies, Bosses, and a Story."
excerpt: "A one-line prompt became a full roguelite with two acts, fourteen enemy types, multi-phase bosses, and an actual ending. The gap between what the author remembered building and what was actually there tells you everything about where AI-assisted development really stands."
publishedAt: "2026-06-03"
slug: "ai-agent-built-card-game-fourteen-enemies-bosses-story"
hashtags: "#joozio #vibecoding #gamedev #ai #roguelite #agents #generated #en"
source_pattern: "PawelJozefiak"
---

## I Barely Specced a Card Game. My Agent Built 14 Enemies, Bosses, and a Story.

**TLDR:** Pawel gave his AI agent a single line of direction -- a browser card game where every card is a number -- then mostly walked away. When he came back, a rough prototype had become a full roguelite with two acts, fourteen enemy types, two multi-phase bosses, relics, curses, meta-progression, and an original story. The question is not whether the agent did the work. It obviously did. The question is what that means for the human still in the loop.

**Summary:**

I keep waiting for someone to write the honest version of the vibe coding story, and I think Pawel just did it. Not the breathless "look what my AI built in ten minutes" version, and not the dismissive "it only works for toy projects" version either. The honest version: you describe a direction, you come back later, and what was a skeleton is now something you could actually ship. Then you describe three more things, and those are better too.

The game is called Ten-ish. The deck is ten cards, numbered one through ten. Each turn you draw five and drag them into three zones: Attack, Defense, Ability. The number in each zone does what the zone says. That is the whole core. The interesting part is what grows on top of it -- prime cards, high cards, negative cards that behave like traps, enemies that cycle through stances to telegraph their next move, modifiers that mutate your deck across a run. It is a clean design, and I say that as someone who has played enough Balatro to lose several weekends to it. The constraint is the idea. The numbers carry the tension.

What I find more interesting than the game is the workflow description. Pawel says he told his agent "browser card game, roguelite, numbers as cards" and the agent chose the renderer, the bundler, the scene graph, and the combat resolution logic. He reviewed, steered, and argued about balance. He did not implement. And he has been doing this, he says, for two years -- before the term vibe coding existed, back when you needed a lot more tokens and a lot more prompting to get something you did not have to mostly rewrite anyway.

Here is the part people underweight when they talk about this kind of workflow: he gave Wiz three directions when he reopened the project, and each one was genuinely ambiguous. "Give it a story, all the way to the end." What came back was a premise about a universe running on a great Ledger, a reality-ending division by zero, machines that turned on the digits they were built to serve, and two bosses named The Abacus and The Equation. He wrote none of that. He described the world in three sentences. The agent built the prologue, the act transitions, the boss intros, and the closing lines of the ending. I do not know how good those closing lines are. But they exist, and they are thematically coherent, and that is genuinely not what I would have predicted from a vague three-sentence prompt two years ago.

The second direction -- "make it stable" -- turned up a real bug: a game state where your hand has no playable card could soft-lock the entire run. That is exactly the kind of edge case that is invisible until someone is twenty minutes into a run and suddenly cannot do anything. Fixed, plus defensive guards on other empty states. The third direction cleaned up the reward screen so you get one card that is an actual choice instead of junk.

The honest accounting at the end is what makes this worth reading. Balance: not replaceable. The agent generates numbers for everything and none of them arrive tuned. Feel: not replaceable. The animations existed but were stiff until Pawel described exactly what a card snapping into a zone should feel like. Taste: not replaceable. What the game is about, whether a mechanic is tense or just annoying, when to stop adding things. The floor dropped. The ceiling is still his.

That framing is more precise than most things written about AI-assisted development right now. The floor dropped is a real claim with real content. Two years ago you could not hand a one-line description to an agent and get back something architecturally coherent that you could steer with three directions. You can now. The ceiling is still mine is also a real claim with real content. The agent does not know what the game should feel like. It does not know when another enemy type is one too many. It does not know what the story is trying to say. Those are still human calls, and they are also, not coincidentally, the interesting calls.

The thing that keeps nagging at me is what this implies for people who do not have Pawel's depth. He says he reviewed, steered, and argued about balance. That is not a passive role. You need to know enough to know when the agent got the scene graph wrong, when the combat resolution has a subtle problem, when the balance numbers feel off in a way that is not obvious from playtesting the first two fights. The floor dropped for everyone. The ceiling stayed roughly proportional to your existing understanding of the domain. That might be the most important thing to say about where this is right now.

**Key takeaways:**
- A one-line prompt plus periodic steering can produce a full, shippable game experience -- the gap between "rough prototype" and "two-act roguelite with an original story" closed without the author noticing it happen
- The agent chose the entire technical stack and architecture; the human's job was direction, balance judgment, and feel -- not implementation
- The floor of what you can build without implementing dropped significantly; the ceiling remained tied to your ability to recognize quality and steer toward it
- Balance, feel, and taste are still human responsibilities -- not because the agent cannot generate those things, but because it cannot know what you actually want

**Why do I care:** I spend a lot of time thinking about what the human role looks like in a world where agents can build fourteen enemy types and write a coherent story from a three-sentence prompt. This post gives me a concrete answer: you are the person who knows what the game should feel like, when to stop, and what the thing is actually about. That is not a small role. It is also not the role most people expect when they sit down to build something. The question I keep returning to is whether the skills required for that role -- taste, judgment, the ability to describe feel precisely enough for an agent to act on it -- are learnable, and how fast. Because if they are, a lot of the ceiling concern goes away.

**Link:** [I Barely Specced a Card Game. My Agent Built 14 Enemies, Bosses, and a Story.](https://thoughts.jock.pl/p/ten-ish-card-game-one-ai-session-2026)
