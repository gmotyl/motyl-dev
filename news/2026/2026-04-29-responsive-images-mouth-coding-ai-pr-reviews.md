---
title: "14 Years of Responsive Image Pain, Mouth Coding, and AI PR Reviews"
excerpt: "Scott Hanselman covers responsive images with sizes=auto, Brad Frost's mouth coding technique, Intercom's AI-driven PR approvals, PostHog hackathons, and more from this week's web development landscape."
publishedAt: "2026-04-29"
slug: "responsive-images-mouth-coding-ai-pr-reviews"
hashtags: "#unicornclub #frontend #css #responsive-images #ai #workflow #codereview #generated #en"
source_pattern: "Unicorn Club"
---

Scott Hanselman here, and there's a lot to unpack from this week's newsletter.

## The End of Responsive Images

Let me start with what might be the most significant advancement in frontend performance in years: the new `sizes="auto"` attribute for responsive images. Adam from Unicorn Club broke this down beautifully, and it's been fourteen years in the making.

Back in 2011, Adam was chair of the RICG (Responsive Images Community Group) — the group that fought to bring responsive image markup to the web platform. They succeeded, but the syntax they delivered required developers to manually calculate the sizes attribute across every breakpoint, writing monster strings like `(min-width: 1340px) 257px, (min-width: 1040px) calc(24.64vw - 68px), (min-width: 360px) calc(28.64vw - 17px), 80px`. No human should ever write that. The problem was that browsers had to decide which image to load before they had any layout information, so developers had to predict the future.

Here's where it gets interesting. The solution was always hiding in plain sight: `loading="lazy"`. When an image uses lazy loading, the browser doesn't request it until the user scrolls it into view — which means the browser already knows the rendered size. Now, with `sizes="auto"`, the browser can make the right decision automatically for lazy-loaded images. For your hero images at the top of the page, you still want explicit sizes. But for everything else — cards, avatars, sidebar images — just use `loading="lazy" sizes="auto"` and let the browser figure it out.

This is exactly what WordPress now uses, thanks to Joe McGill. It's in Firefox, Safari, and Chrome. Start using it today. You won't miss writing those impossible sizes attributes.

## Mouth Coding

Brad Frost has been talking websites into existence. Literally. He calls it "mouth coding" — and it's exactly what it sounds like: real people having a conversation while an LLM interprets and builds in real-time.

The key ingredients are straightforward. You need an actual conversation where the LLM is listening. You need live transcription — Brad uses Notion's AI meeting notes, which flow directly into his workspace. You need sturdy web infrastructure so the results are actually good. You need a live preview so everyone can see what's being built. And you need human taste and judgment in the loop.

What excites me most about this is accessibility. Mouth coding democratizes the design process in a way I've never seen before. A non-technical founder can articulate their vision and watch it materialize. They can say "make the heading bigger" and see it happen. They can respond to a prototype while the conversation is still fresh.

This isn't about replacing designers and developers. It's about including people who were previously excluded from the process. A small business owner with no coding experience can now collaborate in real-time on their own website. That's powerful.

For Lucent Counseling, Brad and his wife Melissa built the basis for a new website in a single afternoon. The final copy still needs writing, the domain still needs transferring, but the heavy lifting was done through conversation. That seems like a net win to me.

## AI Approving Our Pull Requests

Here's where it gets controversial. Intercom is auto-approving nineteen percent of their pull requests with no human reviewer in the loop. And they're arguing this makes them safer, not less safe.

Let me explain their reasoning. Intercom ships hundreds of times per day. The average time from merge to production is twelve minutes. Human reviewers simply can't keep up with the volume of AI-generated code. When humans can't review properly, they start rubber-stamping — clicking approve without meaningful inspection. That's more dangerous than no review at all.

So Intercom built a system that decomposes PR review into separate sub-jobs. One sub-agent assesses the problem description. Another checks whether the diff matches the stated intent. Another reviews for safety concerns. Another checks for logical correctness. Another reviews against best practices. A human reviewer typically focuses on the diff itself. The agent traces execution paths through the entire codebase, something humans rarely have time to do.

The data is compelling. Zero reverts on AI-approved PRs in their pilot. A six to sixteen times improvement in time-to-approval. But here's the kicker: AI-authored code had a 0.53% revert rate on backend, compared to 5.39% for human-authored. On frontend, it was 0.22% versus 2.00%.

The agent is also strict. It won't approve large PRs. If a change is too big or complex, it requires splitting. This enforces their shipping culture of small, incremental changes. The human who ships the change is still accountable for watching it in production and rolling back if something goes wrong.

I was skeptical going into this section. I'm less skeptical now. The key is the decomposition into sub-agents and the strict enforcement of small PRs. Without those, auto-approval would be reckless. With them, it's arguably safer than the human alternative.

## Great Companies Are Built in Hackathons

PostHog has generated millions in revenue from hackathons. Session Replay, Data Warehouse, Logs, Workflows, and PostHog AI all started as hackathon projects. PostHog's rules are simple and brilliant: work on totally new things, and focus one hundred percent on the hackathon.

The key is separation from regular work. PostHog runs hackathons during offsites with coverage plans for support and incidents. DigitalOcean uses work embargoes. The point is protecting hackathon time from the gravitational pull of sprint work.

The surprising part? LLMs let non-technical team members build too. PostHog's non-technical team members have built Instagram Stories for the product, a DPA generator for legal documents, and games for DeskHog. This breaks down silos between technical and non-technical teammates. It also opens their eyes to what's possible.

The follow-through matters. Most companies run hackathons and let the projects die. PostHog encourages people to "be the driver" to take their project as far as they can, with some slack after the hackathon to wrap things up. The Logs product started as a hackathon, was used internally, then became a real product four months later when customer demand materialized.

The lesson: hackathons work when they're protected time, not when they're cover for accelerating existing roadmaps. Give people permission and cover to work on weird ideas.

## A Playful Clip Menu with easeReverse

GSAP released easeReverse, a feature that lets you define different easing for reversed animations. When you reverse an animation, the easing curve reverses too. An ease-out animation played backwards becomes ease-in, which can feel sluggish or awkward.

With easeReverse, you can give the reverse direction its own character. It reuses the forward ease adaptively, or uses a completely different ease. This is especially useful for toggleable UI like menus, drawers, and modals.

The pattern works like this: opening animation uses `ease: 'expo'`, closing uses `easeReverse: 'elastic.out(0.3)'`. That gives the close action a bouncier, more playful feel. You can also control the speed of the reverse independently using `timeScale()`.

It's a small feature that makes interactive animations feel much more polished. Try it on your next menu or drawer.

## Key Takeaways

- Use `loading="lazy" sizes="auto"` for lazy-loaded responsive images and let the browser pick the right source
- Mouth coding democratizes design by including non-technical collaborators in real-time
- AI code review with strict enforcement of small PRs can outperform human reviewers
- Protect hackathon time from regular work or they become meaningless
- easeReverse gives toggleable UI its own personality for closing animations

## Why Do I Care

As a developer who's spent way too many hours writing impossible sizes attributes and waiting for code reviews, this newsletter hits different. The `sizes="auto"` feature alone will save hours of frustration. AI-assisted review isn't about removing humans from the loop — it's about letting AI handle the mechanical parts so humans can focus on what matters. And mouth coding? That's the most inclusive thing I've seen in frontend tools this year.

**Link:** [🦄 14 years of responsive image pain, fixed](https://nl.unicornclub.dev/emails/webview/146509/186073266232755552)