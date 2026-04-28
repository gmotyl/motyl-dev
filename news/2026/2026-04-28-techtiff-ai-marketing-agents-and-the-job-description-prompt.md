---
title: "TechTiff: AI Agents Are Running Marketing, Not Just Helping"
excerpt: "Adobe Summit shipped agents that run campaigns end to end, AI-first storefronts that close sales inside ChatGPT, and a brief to write a job description for your tools instead of a prompt."
publishedAt: "2026-04-28"
slug: "techtiff-ai-marketing-agents-and-the-job-description-prompt"
hashtags: ["#TechTiff", "#AI", "#agents", "#marketing", "#AdobeSummit", "#GenStudio", "#LLMOptimizer", "#AgenticSearch", "#workflow", "#generated", "#en"]
source_pattern: "TechTiff"
---

## Adobe Summit Shipped Agents That Actually Run Campaigns

**TLDR:** Adobe rolled out CX Enterprise Coworker and Brand Intelligence at Summit, and the demo went from a Sharpie sketch to a 20-variant Meta campaign without a human in the assembly loop. The agents pull audiences, generate creative, write copy, run a brand check, and hand the plan back for approval.

**Summary:**

There is a moment that lands when you watch a hand drawing become a multi-channel ad campaign in front of you. Tiff scribbled a concept on paper, dropped it into Firefly as a reference image, and GenStudio took it from there. It produced the visual concepts, resized them for every social format, and wrote headlines and copy. Then Adobe's Content Check stepped in and reviewed tone, voice, accessibility, and brand fit. Two pieces got flagged, and rather than bouncing the work back to a human, the system rewrote them to match the guidelines.

That last part is the bit that should make any senior practitioner sit up. The interesting move is not "AI generated more pixels." The interesting move is that the review loop closed without a person. The agent created, the agent edited, and the work was on guideline before anyone opened a Figma frame. CX Enterprise Coworker is the orchestrator that learns the goal and runs the campaign across email, push, web, and paid, while Brand Intelligence is the editorial layer that knows your voice, identity, accessibility, and positioning. Together they look less like a generator and more like a marketing pod that already knows the playbook.

I keep coming back to how this affects engineering teams sitting next to marketing. We have spent years building integrations between asset libraries, CDPs, DAMs, and ad platforms. The pitch here is that the orchestrator does that traversal itself, calling into the asset library, the customer data platform, and the campaign tool from one goal description. That puts pressure on us to make the underlying systems legible to an agent rather than only to a human in a UI. Schemas, APIs, audit trails, and content metadata become first-class product features rather than back-office plumbing.

There is one obvious caveat. A demo at a vendor summit is the cleanest possible version of the workflow, with curated assets, a curated audience, and a curated brand book. Real shops have messy brand docs, two competing tone guides, and a CDP that needs three jira tickets to add a single field. The lesson is not "buy this tomorrow." The lesson is that the bar for what an agent can sequence on its own just moved, and our internal data hygiene is now the bottleneck on whether we get to use any of it.

**Key takeaways:**
- CX Enterprise Coworker runs goal-to-live campaigns across email, push, web, and paid.
- Brand Intelligence reviews each agent-produced asset against voice, identity, accessibility, and positioning rules.
- The interesting frontier is closing the review loop without a human, not raw generation.
- Internal data hygiene (CDP, DAM, brand docs) is the gating factor on whether agent orchestration is useful in your shop.

**Why do I care:**

As a frontend architect, this is the moment I start asking whether our component libraries, content schemas, and CMS APIs are agent-readable. If marketing's tools are about to call into our systems through an orchestrator, every clever undocumented field becomes a future failure mode. I am also paying attention because the same pattern travels: a goal-driven orchestrator with a brand-aware review pass is the shape I want for my own dev workflows. Replace "campaign" with "PR" and "Brand Intelligence" with a lint-and-design-system reviewer, and you can see where the next year of dev tooling is going. I want to be the team whose internal services are easy for agents to call, not the team whose tickets explain why nothing connects.

**Link:** [AI Marketing Agents on TechTiff](https://techtiff.substack.com/p/ai-marketing-agents)

## The Storefront Moved Into ChatGPT, And Your Homepage Is The New SEO Problem

**TLDR:** Adobe demoed a buyer asking ChatGPT for golf clubs, getting DICK's recommended with the right products and pricing, booking a fitting, and never opening the website. Adobe's LLM Optimizer is essentially analytics for that surface, and the work is being called Agentic Search Optimization.

**Summary:**

The mental model I grew up with was: search, click, land, convert. That sequence is breaking. People now ask an AI tool for a recommendation, compare options inside the chat, and finish the purchase without ever loading your domain. In Adobe's live demo a user asked ChatGPT for golf clubs, DICK's came back with the right pricing and colors, the user filled out a form, and the fitting was booked, all inside the conversation. The site did not get a visit.

This is not the first wave of "search is changing" hand-wringing, but the difference matters. Featured snippets stole clicks. Conversational answers steal entire sessions. Your product is either understood by the model well enough to be recommended in the right context, or it isn't. That puts a strange new weight on your homepage and product pages because they are now training data and retrieval targets for systems you do not control. The copy needs to read like a direct answer to a question a customer would type, with the specifics, the constraints, and the proof a model would lean on when summarizing.

Adobe's response is LLM Optimizer, which tracks where your brand shows up in AI answers, how often it gets selected, what content is being pulled in, and how you compare to competitors. That is essentially Google Analytics for the AI surface, and it makes the abstract problem measurable. There is also Adobe Brand Concierge, which flips the model and puts the conversation on your own domain, so a runner asks for shoes and gets product videos, customer reviews, and a meeting booking from inside the chat without leaving your site.

There is a small experiment worth running this week. Open ChatGPT and ask it to recommend a business in your category, with the customer profile and the detail a real buyer would care about. If your product shows up with the right specifics, you are inside the conversation. If not, the gap is on your pages, in how you describe what you do. The work to fix that is not "more SEO content." It is clearer, more answer-shaped writing, with the specifics models need to be confident citing you.

**Key takeaways:**
- Buying journeys are starting and finishing inside ChatGPT, Claude, and Perplexity.
- Agentic Search Optimization is the new layer of work between you and your customer.
- Adobe LLM Optimizer turns AI visibility into a measurable analytics surface.
- Brand Concierge moves the conversation onto your own domain when you want to keep the session.
- Product copy now serves a model as much as a human, and needs to be specific and answer-shaped.

**Why do I care:**

For frontend folks this is a structural shift in what websites are for. If a real chunk of demand never lands on a page, our perf, conversion, and analytics models need a rethink. I want our content to be machine-friendly without writing for robots, which means proper semantics, structured data, accessible product detail, and copy that doesn't lean on visual layout to make sense. I also want our design system to support a Brand Concierge style chat surface as a first-class component, not a bolted-on widget. The teams that win the next two years are the ones who treat their site as both a destination and a corpus, and who can ship a well-grounded chat experience without it feeling like a third-party plugin.

**Link:** [AI Marketing Agents on TechTiff](https://techtiff.substack.com/p/ai-marketing-agents)

## Stop Writing Prompts, Write A Job Description

**TLDR:** Tiff's framing is that briefing an AI agent looks more like writing a job listing than typing a one-off prompt. Role, scope, context, handoff, and standard. It is also the difference between human-in-the-loop and human-on-the-loop, and which one you pick depends on how stable the workflow is.

**Summary:**

The prompt-as-recipe era was useful for a minute. It got us through the chat box phase. Once you start handing real work to an agent that runs across tools, the prompt model breaks because there is no single message that captures everything an actual coworker would need to know. The reframe in this issue is to write the agent's job the way you would write a job listing for a new hire. Role names what the agent owns. Scope draws the line between work it finishes and work it returns. Context is the brand voice, customer data, playbooks, and examples of work you love and work you would never send. Handoff is what gets delivered, when, and in what form. Standard is what good looks like, with concrete examples of pass and fail.

There is a related idea that I find more practically useful than the alignment debates: in-the-loop versus on-the-loop. In-the-loop means you stay close, the agent produces, you review, nothing ships without approval. Use it when stakes are high, the workflow is new, or you are still figuring out what good means. On-the-loop means you set the rules up front and only step in when something hits a boundary. Use it when the system is stable, the rules are clear, and volume makes step-by-step review impractical. The teams that get value out of agents are the ones who pick the right posture for the right job, instead of treating either as a default.

The customer-support example in the issue is a good shape. The agent owns first responses for shipping, returns, and product details. Anything sensitive escalates. It needs the brand voice, offers, customer data, and past replies in one place. Every draft lands in a review folder before anything goes out. The bar is "sounds like the brand, answers the question, stays in policy." That is not a prompt. That is a tiny operating contract, and once it exists you can swap models and tools without rewriting from scratch.

The hidden tax is that doing this well requires the work everyone tries to skip: writing down the playbook, tagging client notes, saving strong outputs, fixing weak instructions, keeping the brand voice doc current. It is the same hygiene that makes onboarding a new hire pleasant, applied to software. The reward is that releases stop being scary because each new model walks into a system that already knows how the work is done.

**Key takeaways:**
- Treat agent briefs as job descriptions: role, scope, context, handoff, standard.
- Pick human-in-the-loop for new and high-stakes work, on-the-loop when the system is stable.
- A small written operating contract beats a clever prompt and survives model swaps.
- The unglamorous hygiene work (tagging, examples, playbook updates) is what makes any of it work.

**Why do I care:**

This maps cleanly onto how I want to use coding agents on my own teams. The "give it everything in one mega-prompt" approach is fragile and unreviewable. I would much rather have a versioned doc that says: this agent owns refactors in /packages/ui, never touches the API layer, must run the design system codemod, opens a draft PR, and the bar is "no visual regressions in Storybook and no new TS errors." That is a job description and it makes the agent reviewable like any other contributor. It also forces me to clarify what I actually expect, which is the part senior engineers usually skip when they are tired. I am stealing the role-scope-context-handoff-standard frame for my next agent setup and I suspect a lot of you should too.

**Link:** [AI Marketing Agents on TechTiff](https://techtiff.substack.com/p/ai-marketing-agents)
