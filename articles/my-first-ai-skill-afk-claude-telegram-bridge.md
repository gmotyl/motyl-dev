---
title: 'My First AI Skill: Building a Telegram Bridge for Claude Code'
excerpt: 'How I built an AFK Telegram Bridge skill for Claude Code that lets you manage AI agent sessions from your phone — and what I learned about vibe coding along the way.'
publishedAt: '2026-03-05'
slug: 'my-first-ai-skill-afk-claude-telegram-bridge'
hashtags: '#AI #ClaudeCode #Telegram #VibeCoding #Skills #TypeScript'
---

### TLDR:

I built my first skill for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — an AFK Telegram Bridge that lets you manage agent sessions from your phone when you're away from the terminal. It took a week of rewrites from Python to TypeScript, but the process felt like pair programming from the future. Here's the full story, from idea to publication on [skills.sh](https://skills.sh).

---

## The Rise of AI Agent Skills

And so it happened — I created my first skill for Claude Code. For a while now, a platform called [skills.sh](https://skills.sh) has been gaining popularity. It's an ecosystem of skills for AI agents — essentially capabilities you can grant them. In practice, many of these are simply Markdown files containing prompts that get injected into your task whenever the agent determines a given skill would be useful, or when you explicitly tell it to use one.

## What the Skill Does

The skill I built is quite advanced for a first attempt. Its job is to maintain your connection with an active Claude Code session while you're away from the terminal. Picture this: you're working with the agent in the terminal, and you need to step away — go downstairs for lunch, grab a coffee, or pick up your kid from school. The agent still has work to do, but it's going to have questions: "Can I create this file?", "Can I run this command?"

One solution is to run it in YOLO mode, but let's be honest — that's not exactly safe.

## How It Works

You fire up the `/afk` command — short for "away from keyboard" — and the agent launches a script that keeps listening for a [Telegram](https://telegram.org/) session. During the initial setup, you configure a Telegram bot and give it admin permissions in a channel so it can create topics. Then, for each separate terminal session, the agent creates a dedicated topic. Whenever approval is needed — file edits, script execution, anything — the request appears in Telegram as a message from the agent. You get two buttons: **Approve** or **Deny**.

There's also a batch approval mode. If you have a solid plan and you know the agent should be able to finish everything according to your expectations, you can grant blanket approval — almost like YOLO mode, but with a conscious opt-in.

## Why Not Just Use Claude Code's Native Remote Session?

Shortly after I published the skill, I learned that Claude Code natively supports remote sessions. So why do I still use my own skill?

With the native approach, you can only have one remote session, and it looks like a mini terminal where you see everything. I noticed that — especially in private projects like this blog — I don't necessarily want all the details. I don't want to constantly monitor what the agent is doing. If it's prototyping solutions, I just care about the end result: does it work? I want the agent to finish quickly but safely, without breaking things in my system. I want control, but I don't want to look over its shoulder the whole time.

A Telegram session is far less cognitively demanding. You tell the agent what to do, and it doesn't occupy your attention with every detail of its thought process. You get a regular notification only when your input is actually needed. That works beautifully for side projects.

## Reclaiming Dead Time

Think about it — everyone has moments during the workday. You're at the dentist, sitting in the waiting room. It would be awkward to pull out a laptop and sit there coding on your knees. Socially, that's... not always acceptable. But everyone's on their phone. With an open Telegram session, you can put those minutes to actual work instead of scrolling through social media.

And with my skill, you can have **multiple sessions open simultaneously**. You're not limited to a single task — you can be genuinely productive across several workstreams at once.

## The Origin Story: From Python to TypeScript

The history of building this skill is interesting in itself. I came up with the idea and — in true vibe coding fashion — told the agent to build it. After a few corrections, tests, and iterations, a working version was ready in about two days. But the agent wrote it in Python, and while it mostly worked, I eventually decided that if I'm going to put my name on this, I want more control over the architecture. Especially since longer testing started revealing bugs.

So I decided: okay, I'm not going to learn Python for this — let's rewrite it in [TypeScript](https://www.typescriptlang.org/).

You'd think that with working Python code already in place, the agent should be able to do a near one-to-one rewrite without issues. That's not what happened at all. Despite using the best agents available, I had to correct things repeatedly. Many features got forgotten. I kept telling the agent explicitly: "Look, this worked in Python. Check how it was done there and do the same thing." Problem after problem kept surfacing.

The rewrite took a **full week** — longer than the original Python version. Only after that week did it work roughly the same way. But now I had proper unit tests, a solid architectural separation — clean enough that I could even jump in and write code by hand if needed. Though let's be honest, once you've worked with agents, those days aren't coming back.

## The Joy of Building Something New

The takeaway? It works well, but it definitely requires oversight. When I looked at the final TypeScript version and the amount of code — there's no way I would have written all of that by hand just to prove a point or to have this one feature. I'd probably have just used the native Claude Code version instead.

And that's precisely the novelty of the AI era: we can create things we'd normally never bother spending time on. Even though this took a week, it felt amazing — like being a teenager again, writing my first program in [Turbo Pascal](https://en.wikipedia.org/wiki/Turbo_Pascal). That same excitement of something new coming to life. AI takes the grind of connecting all the details off your shoulders. It's like pair programming, except you're always the one thinking abstractly, designing solutions, and steering — while the agent handles the details.

## The Verdict on AI-Assisted Development

Spending more time on this project was worthwhile, even though — despite having a really solid initial plan — the agent still required many manual corrections and tests along the way. It's clear that we'll be supervising AI-generated code for a long time yet. Programmers aren't leaving this profession anytime soon.

If you want to check out the skill, here are the links:

- [AFK Claude Telegram Bridge on GitHub](https://github.com/gmotyl/afk-claude-telegram-bridge-skill)
- [AFK Claude Telegram Bridge on skills.sh](https://skills.sh/gmotyl/afk-claude-telegram-bridge-skill/afk-claude-telegram-bridge)
