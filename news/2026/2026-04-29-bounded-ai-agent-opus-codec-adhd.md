---
title: "The Bounded AI Agent: Opus 4.7 Frustrations, ADHD, and Local Models"
excerpt: "Scott Hanselman explores the bounded AI agent paradigm, Pawel's Opus 4.7 frustrations driving him back to Codex, ADHD and AI agents, and the notes app integration that changed his workflow."
publishedAt: "2026-04-29"
slug: "bounded-ai-agent-opus-codec-adhd"
hashtags: "#joozio #ai #agents #workflow #productivity #adhd #codereview #generated #en"
source_pattern: "PawelJozefiak"
---

Scott Hanselman here, and this week's PawelJozefiak newsletter is a deep dive into AI agent workflows, frustrations, and the personal toll of depending on these tools.

## The Bounded AI Agent

Pawel opens with an important concept: "Capacity, Not Capability." The idea is that an AI agent amplify your output, but they also amplify your executive dysfunction. Before an agent, your filter was friction. An idea would show up, you'd try to write it down, and the note would either die quietly in some list you never read again or you'd drop everything and do it right now. The middle ground was thin. That friction was protecting you from yourself.

Now the friction is gone. You can start almost anything in a sentence. Not "start" as in type a note. Start as in delegate an actual prototype, stand up a small experiment, launch a scraper. An agent can hold eight open threads, your brain holds one, and the output-to-attention tradeoff is real.

What Pawel does about it: he caps the "Now" list hard. One to three things at a time, not eight. He built a wellbeing layer on top of his agent that nudges him when the count is drifting, when it is late, when notifications should be muted. Not a cure. What it does is turn "as many open loops as possible" into a pace he can hold.

## Antinote: Notes Before Taking Notes

This is the practical part of the newsletter that a lot of you will find useful. Antinote is a macOS menu bar app that lives between your brain and your note system. Hotkey, you type, you move on. Swipe to browse notes, swipe away to create a new one. It's not a replacement for your main note system.

But here's where it gets interesting: Antinote has extensions. You type "::" at the start of a note and it runs custom commands. Pawel built three commands to integrate with his AI agent named Wiz. "::wiz" reads the note and figures out what to do. Looks like meeting notes? It summarizes. Looks like a task? It creates one. Contains a URL? It fetches and summarizes. "::wiz_do(create task)" is when you want to be explicit.

The plumbing: the MacBook extension POSTs to a small HTTP server on Mac Mini over Tailscale. The server routes to Haiku for fast things like task creation, or to Claude Code for full sessions when intent is unclear.

The value is in the lightness. You hand something to Wiz without breaking what you're doing. It's not instant, but that's fine.

## Opus 4.7 Frustrations: Back to Codex

Here's the controversial part. Pawel let his ChatGPT Pro subscription lapse two months ago. Claude Max was covering everything. One subscription, one CLI, one model. Life was simpler.

Then Opus 4.7 shipped on April 17. Within days his experience went from "I steer occasionally" to "I am steering constantly."

The behaviors that changed: it stopped trying as hard. Before, when he asked for depth, the model went deep. Now it returns in two or three minutes with a grep-level summary. It stopped following instructions the way it used to. It asks more questions and commits less work. Full-file rewrites where surgical edits used to live.

The compound effect is what got him. Reasoning decline on top of shallower analysis on top of stale web search on top of a tokenizer that costs thirty-five percent more per token. Many things in one. All of them together, not small.

GitHub issue number 42796 documents this. Stella Laurenzo, Senior Director of AI at AMD, analyzed six thousand eight hundred fifty-two Claude Code sessions and found eighty times more API requests and one hundred seventy times more input tokens to produce measurably worse output. Same human effort. One hundred twenty-two times more dollars per day.

At max reasoning, Opus 4.7 comes back. The depth returns. Instruction-following tightens. But max effort burns usage roughly three to four times faster than medium did. On Claude Max that means the weekly ceiling arrives on Tuesday instead of Friday. You're not paying for a more capable model. You're paying more to reach the capability that used to be the default.

So Pawel went back to ChatGPT Pro. Two hundred dollars a month on top of Claude Max. The math: web search is better on Codex. Depth of analysis is better on Codex. And usage feels fair. On Claude Max, a normal day eats ten to fifteen percent of the weekly quota without doing anything heroic. On ChatGPT Pro with Codex, he hasn't hit a ceiling once in a week of equivalent workload.

His setup now: Claude Code handles morning routines because the skills are tuned there. Research-heavy tasks go to Codex. Architectural refactors go to Codex. Small agent-adjacent changes stay on Claude Code. Split burn across two providers means roughly twice the headroom for the same quality of output. He's paying three hundred a month total instead of steering constantly at two hundred.

## ADHD and AI Agents

This section hit close to home. Pawel has ADHD, and he's honest about what an AI agent means for it.

Before an agent, the filter was friction. That friction was protecting him from himself. Now the agent amplifies both output and dysregulation.

The agent is a personal assistant for the boring part. The interesting work is always in the idea itself, not in the directory structure or the deploy command. The operational layer is the part his executive function gets taxed twice for. An agent absorbs most of it.

Concretely, how it works: he describes an idea whenever it hits, sometimes as a long dictated note. The agent writes it to the right place and picks it up during the night shift. He comes back to a Discord message saying "here is a thing, take a look." A minute to know if he wants to keep going.

Three things that helped the most: offload immediately, cap the "Now" list, and batch the check-ins. Don't supervise. Give the agent a job, go do something else, come back and judge the result. Continuous supervision burns the same attention channel as the work itself.

## Why Do I Care

This newsletter is required reading for anyone building AI agent workflows. The "bounded" concept matters. An agent amplifies your capacity, which means it amplifies your capacity for both great work and burnout. Setting boundaries isn't limiting your agent, it's limiting yourself.

The Opus 4.7 discussion is raw and honest. It's easy to assume model regressions are conspiracies or user error. The data in issue 42796 suggests otherwise. The real insight is that max reasoning restores capability, but at a usage cost that hits weekly ceilings early.

The ADHD section should be required reading for any team lead. The narrative has been uneven: great at creative parts, taxed by operational parts. Agents reverse that tax. But without boundaries, they also enable burnout. Setting explicit limits isn't weakness, it's sustainability.

**Link:** [The Bounded AI Agent](https://thoughts.jock.pl/p/the-bounded-ai-agent-ep5)