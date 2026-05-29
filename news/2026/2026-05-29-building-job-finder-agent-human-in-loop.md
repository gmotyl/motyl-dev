---
title: "Building a Job Finder Agent That Actually Respects the Human in the Loop"
excerpt: "A developer shares how he built a personal job search agent for close friends, designed to filter and explain rather than auto-apply."
publishedAt: "2026-05-29"
slug: "building-job-finder-agent-human-in-loop"
hashtags: "#paweljozefiak #ai #agents #automation #workflow #productivity #llm #engineering #generated #en"
source_pattern: "PawelJozefiak"
---

## Building a Job Finder Agent That Actually Respects the Human in the Loop

**TLDR:** A developer built a personal job search agent for friends, running daily searches against carefully maintained profiles, scoring roles, and delivering concise morning emails. The agent refines its behavior through plain-text replies, but will never auto-apply. The human stays in charge of every decision.

**Summary:** The problem with job alerts is not that there are too few roles. It is that the signal gets buried under noise, and the noise arrives three days late. One friend was getting five LinkedIn alerts a day, one of which might be worth opening, none of which felt timely. That framing, alignment-not-supply, is what drove the design of this agent. The whole system runs every morning at 6:15 and follows a simple shape: load a profile, pick which sources to check based on rotation and cooldown, score what it finds, and send an email with the best three to five matches plus a reason for each. Nothing more.

What makes this work, and what the author admits underestimating at first, is the profile file. It is a plain markdown document, not a CV. It captures current situation in two or three lines, three or four target lanes instead of one role title, hard geography rules, a salary floor, concrete dealbreakers, and positive examples from real job posts the person would actually want. The agent reads this file at the top of every run the way a responsible program reads its own config, before making any decision. Lanes matter here in a way that a single target role does not. Strong candidates fit multiple patterns. The agent needs to reflect that.

The scoring itself is a set of rules applied in order, not a fuzzy dial. Lane match first. If the title and description do not fit a lane, the role is out before anything else runs. Then geography, language, salary floor. Roles below the floor get rejected unless the company appears on a short aspirational list. Anything that passes those filters gets a fit reason and a concern, both one sentence, and a score from zero to ten. Six and above makes the email. Below six gets dropped, not softened. The author is direct about this: two good roles tomorrow beats five mediocre ones today. That is a design choice worth copying.

The reply loop turned out to be the most interesting part of the whole system, and the author says he did not expect that. People do not reply to automated alerts. People do reply to a short personal email that ends with "not relevant? Reply with one line and I'll adjust." When someone replies that a company is in gambling and they want nothing to do with that sector, the agent does not just skip that one company. It updates the dealbreakers permanently. A reply saying "too senior, I want builder-track" shifts the lane weights. A reply saying "more like this one" saves the role as a positive example. The profile file changes. The next morning's search uses the new version. The person can see it working.

One deliberate absence in this design is worth paying attention to. The agent will not apply on anyone's behalf. No auto-filled forms, no generated cover letters sent without review. The author's argument is not just about quality, though he makes that point. It is about what applying actually means. The cover letter that earns an interview is the one written after the person has thought about the company. Removing that step removes the part that matters. There is also a broader cost: recruiters reading twenty AI-generated applications get worse at recognising the human ones. Auto-apply degrades the channel for every actual person using it. The clean boundary between the agent's territory and the human's is not a limitation. It is what keeps the thing useful.

**Key takeaways:**
- A profile file with lanes, dealbreakers, a salary floor, and positive examples beats any amount of clever prompting. The quality of the profile is the constraint, not the search logic.
- Tier the sources and use per-source cooldowns. Searching everything every day gets you rate-limited and buried in noise.
- Plain-reply feedback that graduates into permanent profile updates is a simple, durable way to make an agent learn from real use.
- Hard score thresholds and a "send nothing on quiet days" rule prevent the email from training its recipient to stop opening it.
- Auto-apply is not leverage. The decision to apply, and the cover letter, belong to the human.

**Why do I care:** This is one of the more honest and practical agent write-ups I have seen. The profile-as-CLAUDE.md framing is genuinely useful, and the "no auto-apply" line is a principle worth having in writing. From an architecture standpoint, the reply-to-profile feedback loop is clean and portable: it works anywhere you have a short-form input channel and a config file. The cost note about Anthropic SDK pricing changing on June 15 is also worth paying attention to if you are building daily cron-driven agents. This is primarily a builder and practitioner post, not a business or product audience piece.

**Link:** [I Built a Job Finder Agent for My Friends. I Just Showed It on Live.](https://thoughts.jock.pl/p/job-finder-agent-live-walkthrough-2026?publication_id=1540552&post_id=198572990&play_audio=true&triedRedirect=true)
