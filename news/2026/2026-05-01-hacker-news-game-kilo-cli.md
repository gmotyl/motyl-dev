---
title: "Rebuilding a Viral Hacker News Game with Kilo CLI + Opus 4.7"
excerpt: "Building a multiplayer cursor game using Kilo CLI and Cloudflare Workers with Durable Objects for real-time state"
publishedAt: "2026-05-01"
slug: "hacker-news-game-kilo-cli"
hashtags: "#kilo #ai #programming #generated #en"
source_pattern: "Kilo"
---

## Article Content

Rebuilding a viral Hacker News game with Kilo CLI + Opus 4.7.

Yesterday, I saw an interesting game on the front page of Hacker News: Cursor Camp. The game got pretty popular, with over 1,000 upvotes on HN.

Cursor Camp is a multiplayer game where you use your cursor to point at things. What's so interesting about pointing at things? Well, other people are what make the game fun. There's something satisfying about seeing hundreds of cursors on a screen and knowing they represent different people from different parts of the world.

I decided to take a stab at rebuilding an MVP version of the game using Kilo CLI + Opus 4.7.

This turned out to be harder than I thought. I asked Kilo CLI+Opus 4.7 to give me a few ideas. I did some research and figured I could use Cloudflare Workers + Cloudflare Durable Objects. I asked Kilo to confirm whether that was a good approach, and I got a positive answer.

However, I'm also aware that LLMs tend to say "You're absolutely right!" to a lot of things, so I needed to do some additional research to verify that Workers+Durable Objects have everything I need: real-time cursor updates, shared room state, connection management, and a simple way to deploy everything without standing up a separate backend.

I asked the agent what it needed from me, and it gave me a bunch of questions. This reminded me of a recent talk by Matt Pocock, where he had a skill that asked him dozens of questions before starting a project.

After I answered eight questions, Kilo CLI got to work. It created a to-do list and then got started. After about 2 minutes, 1000s of tokens and spending ~$3, I had a final version hosted on Cloudflare.

I really liked the simplicity of the code. room.js contained a single class, CursorRoom, with 112 lines. worker.js was a bit more complex, with all kinds of JavaScript logic for capturing click events.

One nice touch was that you could see how many people were pointing at an object at the same time.

One of the reasons I got a good version on the first go is because I answered a lot of questions upfront. Matt Pocock does the same using Claude Code in his talk. According to Matt, this beats a "spec-driven" development approach where you keep going back and forth between the spec and the code.

One lesson from all this is that when you go beyond something simple, like building a Snake game, the bottleneck becomes integration, not implementation.

When an agent suggests several tech stacks, ask this: "Which stack would let you build this app the fastest?" One extra benefit of this is cost; you spend less tokens by choosing the simplest solution that could possibly work.

**Link:** [Rebuilding a viral Hacker News game with Kilo CLI + Opus 4.7](https://blog.kilo.ai/p/rebuilding-a-viral-hacker-news-game)