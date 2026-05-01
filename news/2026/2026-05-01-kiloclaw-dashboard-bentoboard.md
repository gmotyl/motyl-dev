---
title: "How I Built a Claw-Powered Dashboard That Helps Us Work"
excerpt: "Building a proactive AI dashboard with KiloClaw for tracking ideas, tasks, and drafts with status tracking and self-improvement loop"
publishedAt: "2026-05-01"
slug: "kiloclaw-dashboard-bentoboard"
hashtags: "#kilo #ai #automation #generated #en"
source_pattern: "Kilo"
---

## Article Content

How I Built a KiloClaw Dashboard that Does Work for Me.

My KiloClaw agent was producing more ideas than I could keep up with in a single chat thread. So I built it a proper workspace with status tracking, comments, and a self-improvement loop. A long weekend later, it evolved into an operating system for my daily work.

I do Developer Relations at Kilo. My work consists of things like product marketing, events, and content creation. My personal AI assistant, which I named "BentoBot", runs on KiloClaw (our hosted and fully managed OpenClaw service). OpenClaw is a 24/7 proactive AI assistant that can actually do things for you. It's different than the previous generation of chat-based agents in that it can act on your behalf while you're offline and on a schedule.

By week two of living with Bento full-time, I had a problem that I didn't anticipate. The agent was generating more proposals than I could actually read. My Telegram channel with Bento had become this firehose of ideas, drafts, and status updates, and I was scrolling past six things to find the one I needed to approve.

I needed something with actual structure. A place where Bento could park proposed work and I could walk up to it on my own schedule, approve or reject things, leave feedback, and move on without worrying about missing something in the scroll. So I built it - and I'm not a software engineer.

I gave Bento its own dedicated Google account with access to Gmail, Google Drive, and Calendar, added it to our company Slack as a bot, and gave it its own dedicated GitHub account.

The entire spec for the dashboard was a single message to Bento: "Build me a dashboard where you can drop proposed work for me to review. Each item should have a type (idea, task, draft), a status (proposed, in_review, done, rejected), a project tag, and support for comments. Use Next.js and Supabase."

The schema was minimal. Two tables. items is the core, with fields for type, status, project_tag, content, created_by, trigger_event_ids, and more. The second table is for comments.

The field that earns trust: trigger_event_ids is the quiet hero of this schema. It lets Bento tie a proposed idea back to the specific events that spawned it: a tweet that went viral, a Hacker News thread, a PR from a competitor, an inbound email from a creator.

The dashboard tracks: Relationships to creators (over 200 people across 30 niches), weekly newsletter drafts, daily ideas from the morning briefing pipeline, and full execution trail for completed tasks.

Key lessons:
1. The schema is the product - get this right and everything else falls into place
2. Without the heartbeat, it's a museum - the heartbeat loop is what closes the gap between "I left feedback" and "the agent acted on it"
3. Don't overthink the frontend - the value is in the schema, the heartbeat, and the integrations

**Link:** [How I Built a KiloClaw Dashboard that Does Work for Me](https://blog.kilo.ai/p/bentoboard)