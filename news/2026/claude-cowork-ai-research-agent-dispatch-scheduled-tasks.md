---
title: 'Running a Full AI Research Operation From Your Phone with Claude Cowork'
excerpt: "How Claude Cowork's Dispatch and Scheduled Tasks turn your phone into a remote control for an autonomous research intelligence system."
publishedAt: '2026-03-19'
slug: 'claude-cowork-ai-research-agent-dispatch-scheduled-tasks'
hashtags: '#substack #ai #agents #architecture #productivity #generated #en'
---

## How I Run A Full-Blown AI Research Operation on My Phone (Powered by Claude Cowork)

**TLDR:** This article walks through building a compound intelligence research agent using Claude Cowork's Dispatch and Scheduled Tasks features, replacing simple news-fetching automations with a system that accumulates knowledge over time. The key insight is moving from pipelines that start fresh every run to agents that remember and improve.

The author starts by describing a common pattern many of us have built — an automated pipeline that fetches AI news summaries weekly using tools like Perplexity, Make.com, and OpenAI. It works, it saves hours, but it has a fundamental flaw: every run starts from zero. The system has no memory of what it told you last week, can't connect patterns across days, and can't be asked follow-up questions. It's a pipeline, not a research partner. The upgrade leverages Claude Cowork's two most recent features: Dispatch for mobile triggering and Scheduled Tasks for autonomous execution.

Dispatch is the mobile entry point that gives you full Cowork capabilities from your phone. You can text Claude a research request while waiting for coffee, and it spins up on your desktop, deploys parallel subagents, scans the internet through Tavily MCP, and writes the finished report to your local folder. Your phone becomes the remote control, your desktop becomes the engine. The author notes this is Anthropic's answer to OpenClaw, and just recently Anthropic made it even more powerful by letting Dispatch launch a Claude Code session directly inside your terminal.

Scheduled Tasks handle the recurring layer. You set your daily briefing to run at a fixed time while your computer is on. Step away, come back, and the intelligence report is waiting in your folder. No prompting needed — the agent just runs on schedule and results accumulate. The system can deploy multiple parallel agents scanning different topics simultaneously through Tavily's capabilities: search, extract, research, crawl, and map. The free tier covers daily briefings.

The knowledge architecture uses a three-layer separation: memory for user preferences, a trend index for accumulated intelligence, and daily logs for day-to-day details. This is what makes the system compound. On Day 1 you get a clean scan of today's landscape. By Day 5 the agent starts connecting dots — it notices that three separate announcements across the week follow the same pattern. By Day 15 it can distinguish signal from noise based on two weeks of tracking. By Day 30, deep research builds on a month of accumulated context instead of starting cold.

The system has three operational modes. Daily Briefing takes 5-10 minutes — you say "morning briefing" and the agent reads its memory, checks the trend index, reviews yesterday's log, and deploys parallel subagents to scan all topic areas simultaneously. Deep Research takes 10-15 minutes — you say "research a topic" and the agent goes deep, starting from everything it already knows, running multi-source sweeps, and deploying subagents to fill specific gaps. Trend Review takes 5-10 minutes — the agent pulse-checks every active trend, makes keep/promote/archive decisions, and produces a strategic landscape summary.

The author shares real outputs showing the system in action. On Day 1 it delivered a clean briefing with top signals, five key developments, and emerging patterns. By the end of the first week, the briefing was qualitatively different — it connected dots the author missed independently and caught contradictions between sources that would have gone unnoticed in separate newsletters. The system is measurably smarter on Day 7 than Day 1, and it starts from there next week, not from zero.

The setup requires Claude Pro or Max, Cowork as the easiest interface, and Tavily MCP for internet research with a free tier of 1,000 credits monthly. The whole thing takes about 15 minutes to configure, with the research profile being the only part requiring real thought. Everything else is copy, paste, and go. The article includes the complete research agent folder with all configuration files, skill definitions, output templates, and setup guides ready to use.

**Key takeaways:**

- Pipelines that start from zero every run are fundamentally limited — agents need compound memory to deliver real value
- Dispatch turns your phone into a remote control for desktop AI agents, unlocking research from anywhere
- A three-layer knowledge system (memory, trend index, daily logs) enables the agent to connect patterns across days
- Parallel subagents scanning multiple topics simultaneously make daily briefings fast and comprehensive
- The system improves measurably over time — Day 30 intelligence is qualitatively different from Day 1

**Why do I care:** As someone who integrates AI into developer workflows, this pattern of compound intelligence is exactly what's missing from most AI tooling. Most teams build one-shot integrations that query an LLM and return results. The shift to agents that accumulate context over time and improve their outputs is a fundamental architectural change. For frontend developers building AI-powered features, the three-layer knowledge separation is a pattern worth studying — it's applicable far beyond research agents. The Dispatch mobile control angle also opens interesting possibilities for developer tooling.

**Link:** [How I Run A Full-Blown AI Research Operation on My Phone](https://aimaker.substack.com/p/claude-cowork-ai-research-agent-dispatch-scheduled-tasks-guide)
