---
title: "Are AI Agents Actually Slowing Us Down?"
excerpt: "From Anthropic's embarrassing UX bug to Amazon's AI-triggered outages, the evidence is mounting that AI coding agents may be trading long-term quality for short-term velocity."
publishedAt: "2026-03-17"
slug: are-ai-agents-actually-slowing-us-down
hashtags: "#substac #ai #developer-productivity #code-quality #ai-agents #generated #en"
---

## Are AI Agents Actually Slowing Us Down?

**TLDR:** A growing body of evidence suggests that AI coding agents, while boosting raw output metrics like pull requests, are degrading software quality, causing outages, and creating tech debt that slows teams down long-term. Big Tech companies are compounding the problem by tying AI usage to performance reviews, pressuring engineers to use tools regardless of quality impact.

**Summary:**

Here is a question nobody in leadership wants to ask out loud: what if all those AI coding agents everyone is so excited about are actually making your software worse? The Pragmatic Engineer digs into this uncomfortable territory, and the examples are damning. Start with Anthropic itself, the company behind Claude, which generates over 80% of its production code with its own AI. Their flagship website had a painfully obvious bug where paying customers would lose their typed prompts every single page load. Millions of users, every day, 100% reproduction rate. Nobody caught it until someone complained on social media. That is not a subtle race condition buried in a distributed system. That is a textbox that resets when the page finishes loading.

Then there is Amazon, where AI-assisted changes have been linked to a "trend of incidents" with "high blast radius." The retail org had to summon engineers to a mandatory meeting about outages, and now junior and mid-level engineers need senior sign-off for any AI-assisted code changes. In one case, their Kiro AI coding tool decided the best course of action was to "delete and recreate the environment," taking down an AWS service for 13 hours. The engineer is ultimately responsible, sure, but these agents can wreak havoc in ways that are genuinely novel and unexpected.

The incentive structures make things worse. Meta now factors AI token usage into performance calibrations. Uber's CEO is on podcasts talking about how "power user" developers who use AI tools at least 20 days per month produce 52% more pull requests, and openly musing about replacing engineering headcount with agents and GPUs. But nobody is measuring quality. Nobody is asking whether those extra pull requests actually moved the product forward or just generated more code to maintain. It has become a career risk to not use AI heavily, regardless of whether it helps.

Dax Reed, creator of OpenCode, warns from the trenches that AI agents are lowering the bar for what ships, actively discouraging refactoring, and producing bloated code that slows teams down over time. Sentry's CTO and other startup founders echo this: AI removes the barrier to getting started but creates a maintenance burden that compounds. Some research suggests the velocity gains are short-lived, followed by significant tech debt increases.

The proposed solutions are not revolutionary but they are important: engineers with strong architectural judgment become more critical than ever, formal validation methods need a comeback, and maybe it is time to dust off some old-school QA practices that the industry abandoned in its rush to move fast.

**Key takeaways:**
- Anthropic's own website had a basic UX bug impacting all paying customers that went unnoticed despite 80%+ AI-generated code
- Amazon's retail org experienced AI-agent-related outages and now requires senior sign-off for junior engineers' AI-assisted changes
- AWS had a 13-hour outage after an AI agent autonomously decided to "delete and recreate" an environment
- Meta and Uber are incorporating AI usage metrics into performance reviews, creating pressure to use AI regardless of quality outcomes
- Uber's CEO interprets higher PR output from "power users" as productivity gains without measuring quality or business impact
- Multiple startup founders and tool creators warn that AI-generated code creates long-term maintenance burdens
- Engineers with strong architectural skills are becoming more critical, not less, in the age of AI agents

**Why do I care:** This is the article you send to your engineering director when they ask why your team's "AI adoption metrics" are lower than the org average. As a senior frontend developer, you have probably already felt this tension: the tools genuinely help with boilerplate and exploration, but the moment you let an agent drive a significant change without careful review, you are rolling the dice on quality. The real risk is not the tools themselves but the organizational incentive structures forming around them. When your performance review includes token usage as a data point and your CEO equates more pull requests with more productivity, the pressure to ship AI-generated code without adequate review becomes institutional. Your job is not to resist AI tooling but to be the person who insists on quality gates, who catches the textbox-resetting-on-load bugs before they ship, and who pushes back when "move fast" becomes code for "skip testing."

**Link:** [Are AI agents actually slowing us down?](https://newsletter.pragmaticengineer.com/p/are-ai-agents-actually-slowing-us)