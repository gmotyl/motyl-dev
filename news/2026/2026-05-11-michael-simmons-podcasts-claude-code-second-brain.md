---
title: "How Michael Simmons Turns Podcasts Into a Claude Code Second Brain"
excerpt: "Michael Simmons built a system where every podcast he listens to becomes raw material for his Claude Code agent. The tool doing the heavy lifting is Snipd, and the insight is simple: audio is a first-class knowledge source, not background noise."
publishedAt: "2026-05-10"
slug: "michael-simmons-podcasts-claude-code-second-brain"
hashtags: "#aimaker #ai #claude-code #second-brain #obsidian #llm #snipd #generated #en"
source_pattern: "AI Maker"
---

## How Michael Simmons Turns Podcasts Into a Claude Code Second Brain

**TLDR:** Michael Simmons, who writes for Forbes and HBR and averages hundreds of thousands of views per article, built a system that routes podcast clips directly into his Claude Code agent's knowledge vault. He uses an app called Snipd to capture, transcribe, and sync audio clips to Obsidian, turning passive listening into queryable raw material. The workflow means he can draft a Forbes piece and Claude Code can pull genuine, speaker-attributed, timestamped evidence rather than generic summaries.

**Summary:**

The conversation at the center of this episode of One Shot Show is between the host and Michael Simmons, and the premise is straightforward: most people who have built an LLM wiki or second brain for Claude Code are missing an entire channel of information they already consume every day. Articles, web clippings, book highlights, old documents. These are the usual suspects. Podcasts almost never make the list, and Simmons argues that is a mistake.

Think about how much of your actual AI learning happens through audio right now. Lex Fridman, Lenny's Podcast, Dwarkesh, Moonshot. The most interesting people in AI often think out loud in podcast interviews at a depth they never reach in their writing. You hear something on a commute that genuinely lands. An hour later you cannot remember which episode it was. That insight is gone. It never enters your vault. It never becomes material Claude Code can draft from. Simmons built a system to fix that.

The tool is Snipd. It is a podcast app, but what matters is the snip button. You tap it when something resonates. Snipd uses AI to identify the actual context, where the idea started and ended, who said it, and gives you a clean clip with a full transcript attached. You star the ones you want to keep. Those synced clips land in Obsidian or Notion automatically. Every podcast you already listen to becomes a stream of small, time-stamped, transcribed, speaker-attributed notes flowing into the same vault your Claude Code agent reads from.

Simmons has around 11,000 notes in his vault at this point. The follow-by-guest feature is one part that is easy to underestimate. He follows Sam Altman, Dario Amodei, Demis Hassabis, Andrej Karpathy, and several hundred others as people rather than as shows. When any of them appears on a podcast he does not normally subscribe to, the episode lands in his queue. He also built a small Claude Code skill that takes an article he wants to read, sends it to ElevenLabs to get an MP3, and pushes it to a personal RSS feed that shows up in his podcast player. The article becomes something he can clip from. Everything enters the system through the same pipe: speaker, timestamp, transcript, clip. That consistency is what lets the second brain compound rather than becoming a junk drawer.

The episode also touches on broader shifts in how AI gets used. The host frames it as three distinct phases. First, you opened ChatGPT and copied the output manually. Then you built deterministic workflows in Make.com or Zapier. Now Claude Code and Codex handle most of those workflows directly, just by being asked. Simmons described spending eight hours once trying to wire up a single workflow in Make.com. Claude Code did the equivalent in 15 minutes. The speed is not really the point. The point is that the cost of trying a new workflow has dropped close to zero, so you run far more experiments.

**Key takeaways:**

- Podcasts are structurally better raw material for an LLM vault than tweets or book highlights because they preserve speaker identity, timestamp, surrounding context, and the full argument in motion rather than just the polished conclusion.
- Snipd's follow-by-guest feature turns passive listening into a structured, searchable feed instead of a vague memory of something someone said once.
- Converting articles to audio via ElevenLabs and routing them through a personal RSS feed into Snipd means every format enters the vault with the same shape: speaker, timestamp, transcript, clip.
- The cost of trying an AI workflow has dropped to near zero, which changes how aggressively you should experiment.
- Simmons notes Codex as a real alternative to the Claude Code CLI. Different feel, more polished super-app experience, but Claude Code still has the stronger agent harness in his view.

**Why do I care:**

I find the core argument here genuinely compelling, and I also want to push back on one part of how it gets framed. The idea that podcast clips are better raw material than book highlights because they preserve context is correct. A clipped sentence from a book is orphaned from its argument. A 90-second podcast clip with a full transcript still has the speaker's reasoning visible around it. That is a real structural advantage and it is worth building around. What I would challenge is the framing that the second brain "does the work" once this is set up. Simmons has 11,000 notes. The compounding only happens if the notes are actually good, and that depends on whether you are tapping the snip button on genuinely interesting moments or just tapping it because the system is there. Garbage in is still garbage in, just better formatted. The follow-by-guest feature is the part I keep thinking about. It is a small thing but it changes the nature of the feed from a random walk through shows you subscribed to once into a structured stream following the actual thinkers you care about. That shift is worth more than most of the other features combined.

**Link:** [How Michael Simmons Turns Podcasts Into a Claude Code Second Brain](https://aimaker.substack.com/p/podcast-claude-code-snipd-second-brain)
