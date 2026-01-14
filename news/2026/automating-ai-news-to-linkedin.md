---
title: 'The Automation Paradox: Turning AI News Into LinkedIn Gold Without Becoming a Bot'
excerpt: 'How to build a workflow that harvests AI news, curates it, and publishes to LinkedIn—and why doing this at scale forces you to ask uncomfortable questions about signal and noise.'
publishedAt: '2026-01-06'
slug: 'automating-ai-news-to-linkedin'
hashtags: "#substack #automation #ai #linkedin #content-creation #workflow #productivity #generated #en"
---

### TLDR:

You can absolutely automate the process of finding top AI news stories, curating them, writing LinkedIn posts, and scheduling them for publication. Make.com makes this straightforward: query Perplexity for the week's top AI stories, cross-reference against a blocklist to avoid repeats, ask ChatGPT which story has viral potential, scrape the article and extract the feature image, have ChatGPT write the LinkedIn post in a specific structure, then queue it for publishing. The workflow works. But here's the uncomfortable part: if everyone automates this, what happens to the signal-to-noise ratio on LinkedIn? And more importantly—is automation always the answer?

---

## The Automation Opportunity: Why This Matters

Listen, I talk to a lot of developers and creators, and one thing I hear constantly is: "I don't have time to stay on top of the news cycle *and* maintain a social presence *and* actually build things."

This is real. The attention economy is exhausting. You want to share insights, build an audience, create thought leadership—but the *distribution mechanics* of it all feel like a second job.

That's where automation comes in. And the case study here is compelling: one creator used automation to generate 1,000+ signups in seven days. Not through *having* an audience—but through *building* one via consistent, relevant content distribution.

The workflow is elegant because it's modular. Each step is a decision point, a filter, a chance to apply human judgment. Let me walk you through it.

## The Workflow: Seven Steps to Consistent Publication

**Step One: Find the Signal.** You start with Perplexity—a search API that can query the web and surface the top five AI stories from the last seven days. Not all news. Just AI news. Already you're filtering the signal.

**Step Two: Avoid the Repeat.** You check a Google Sheets blocklist. This matters more than it sounds. When you're publishing regularly, you need to avoid repeating yourself. The blocklist is your memory. It's also your protection against the algorithm figuring out that you're mechanically republishing.

**Step Three: Ask for Curation.** Here's where human judgment enters through the back door: you ask ChatGPT which of these five stories "can go viral" and is "most important right now." This isn't an algorithm decision. This is encoded taste. You're teaching the system what *you* think matters, then letting it apply that framework.

**Step Four: Get the Context.** You scrape the article HTML, extract the feature image URL. You're getting rich media—not just a link, but visual context.

**Step Five: Write the Post.** ChatGPT writes the LinkedIn post. But not freely. You give it a *specific structure*—probably something like: hook, three key insights, call-to-action. You're maintaining voice and consistency through constraint.

**Step Six: Close the Loop.** You add the story to the blocklist so you never republish it.

**Step Seven: Queue and Optionally Alert.** The post and image land in a Content Queue sheet—ready for manual copy/paste, or if you're brave, auto-scheduled through LinkedIn's API. You can also send it to Slack to give yourself a moment to review before it goes live.

That's the system. Seven steps. Most of them automated. One of them (reviewing before publish) human.

## Why This Works: The Creator Economics Angle

Let's be honest about what this accomplishes:

You go from "I should stay relevant but I'm too busy" to "I have a consistent stream of curated, written posts ready to go." That's not trivial. Consistency beats virality in the algorithm—and consistency is what you get from automation.

The economics: if it takes you two hours a day to do all this manually, and the workflow takes 30 minutes to run, you've reclaimed 1.5 hours. That compounds. Over a month, that's a workweek you got back.

And the social proof is real. Regular, thoughtful content sharing *does* build an audience. It works. I've seen it work repeatedly. The 1,000+ signups in seven days? That wasn't through one viral post. That was through showing up, consistently, with relevant insights.

So yes, automate this. The tooling (Make.com, Perplexity, ChatGPT, Google Sheets) is cheap and accessible. The ROI on your time is clear.

## The Discomfort: What Happens When Everyone Automates?

But here's the thing I want to push back on, and I think it's important.

If you use this workflow, great. You're probably one of maybe a thousand people doing this right now. You're ahead of the curve.

But what happens when it's ten thousand? What happens when LinkedIn's feed is 60% AI-curated posts about AI news?

You've solved *your* problem—staying relevant with minimal time investment—but you've potentially contributed to a broader problem: the signal-to-noise degradation of the entire platform.

Think about it from a reader's perspective. They see a LinkedIn post about the week's top AI stories. It's well-written. The structure is solid. The image is compelling. But as they scroll, they see five more posts using almost the exact same curation. Maybe different sources, but the same meta-narrative: "Here are five stories you should know about."

The uniqueness evaporates. The platform becomes a conveyor belt of aggregated news, with humans as the display layer.

This is the automation paradox: **when everyone optimizes the same activity, the activity becomes commodified, and the differentiation moves elsewhere.**

## The Signal/Noise Problem in Automation

Let's dig into this more carefully, because it matters for how you think about automation as a strategy.

There are roughly three ways this plays out:

**First scenario: You're early.** You automate before the market saturates. You build an audience. You become known as someone who curates good AI stories. Even when the automation becomes common, you've already captured the initial audience, the authority, the flywheel. You're good. You won.

**Second scenario: You're in the middle of the wave.** By the time you implement this workflow, hundreds of others have already done the same thing. Your posts are indistinguishable from theirs. They have the same structure, the same timing, the same sources. The algorithm notices. It deprioritizes all of you. Nobody wins except Perplexity and ChatGPT.

**Third scenario: You use automation as a foundation, not a destination.** You automate the mundane stuff—the news aggregation, the initial draft, the post scheduling. But then you add something non-automatable: your specific POV, your unique angle, your voice. Suddenly the post isn't just "here are five AI stories"—it's "here are five AI stories, *and here's why they mean this for how we build things*." That's harder to commodify.

The most durable strategy isn't "automate everything." It's "automate the parts that don't differentiate, so you have energy for the parts that do."

## The Tradeoffs You're Making

When you automate your content distribution, you're gaining efficiency. But you're also trading some things:

**You're trading spontaneity for consistency.** Automation produces regular output, but it's based on inputs you've pre-specified. Real-time reactions, breaking news hot takes, spontaneous insights—those require human presence. You get the feed-through, not the pulse.

**You're trading depth for breadth.** You can cover five stories a week, curated and formatted. But you might not go deep on any of them. Automation is good at covering ground. It's less good at exploring territory.

**You're trading voice for scalability.** There's a subtle shift when a machine writes something, even if it's trained on your tone. The voice becomes "consistent" rather than "authentic." Readers can often feel this difference, even if they can't articulate it.

**You're trading discovery for efficiency.** When you manually read stories, you stumble on unexpected angles, adjacent fields, contrarian takes. Automation follows the path you've defined. It doesn't wander.

None of these are necessarily bad tradeoffs. But they're real.

## The Practical Middle Ground

Here's what I'd actually recommend:

Automate the workflow. Seriously. The time savings are real, and the consistency matters for algorithm performance and audience building. Set up the Make.com flow. Queue the posts. Get them going.

But also:

**Review before publishing.** That extra 10 seconds of human eyes catching something, maybe rewording the hook, maybe deciding this story isn't worth sharing this week—that's where your differentiation lives. Don't automate *that part*.

**Write occasional deep dives.** Every fifth post, or every tenth, write something yourself. Go deep on one of the stories. Add your analysis. This keeps your voice present and reminds your audience that there's a human behind the curation.

**Monitor the response.** Watch which posts actually get engagement. You'll probably find that your curated takes outperform pure aggregation. That's your signal. Double down on that.

**Stay skeptical about scale.** If you're getting traction with this workflow, great. But resist the urge to 10x the frequency or add five more channels. The value is in the consistency and curation, not in the volume.

## Why This Matters Beyond LinkedIn Posts

I know this seems like a narrow topic—how to automate content distribution. But it's actually a window into a much bigger question that we're collectively grappling with:

**What should we automate, and what should we keep human?**

This applies to code generation. It applies to customer support. It applies to analytics and decision-making. It applies to teaching.

The pattern is always the same: there's a task that's tedious and repetitive. We build automation to handle it. We gain efficiency. The world becomes better for that specific optimization. But we also shift the ground—we make the task more common, sometimes less valued, occasionally less visible.

And then we have to decide: where's the next frontier of human value? What do we do with the time we've reclaimed?

If you use automation to build a better LinkedIn presence, that's one answer. You're using it to amplify your message, to show up more consistently, to build authority. That's legitimate.

But if you use automation just to avoid thinking about distribution entirely, you might be missing something. The distribution *is* part of the craft. It's part of showing up.

## Key Takeaways

1. **The workflow is real and works.** Make.com + Perplexity + ChatGPT + Google Sheets can absolutely create a repeatable content distribution pipeline. Build it.

2. **Consistency beats perfection.** Automated, regular posts will build an audience faster than sporadic, brilliant ones. The algorithm rewards showing up.

3. **But signal matters.** If everyone automates the same way, the signal degrades. Your differentiation has to come from somewhere else—deeper curation, unique voice, genuine analysis.

4. **Automate the boring parts.** News aggregation, post formatting, scheduling—automate those. But keep the human judgment in curation and voice.

5. **Use time savings intentionally.** Don't just automate to do less work. Automate to do *different* work. Use the time to go deeper on what matters.

6. **Watch for the paradox.** Automation strategies that work individually can create problems collectively. That doesn't mean don't automate. It means automate thoughtfully.

7. **Your voice is the last frontier.** As these tools become commodified, the only thing that doesn't commodify is your specific perspective, your taste, your judgment. Protect that.

## The Link

For the technical implementation, check out Make.com's template library—they likely have pre-built workflows for news-to-LinkedIn. If not, this is a straightforward integration project using their module builder. The hardest part isn't the automation; it's deciding what matters enough to publish.

---

**The bottom line:** Yes, automate your content distribution. But don't automate your thinking. The first will save you time. The second will save you from becoming indistinguishable from a bot.
