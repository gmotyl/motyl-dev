---
title: "Vibe-Coding Notion Apps, Real-Time React with Mercure, and Why You Should Be Writing ADRs"
excerpt: "From turning Notion pages into live React apps to real-time game updates with Server-Sent Events, plus architecture decision records and AI-powered developer tools."
publishedAt: "2026-03-26"
slug: "daily-dev-vibe-coding-notion-real-time-react-mercure-adrs"
hashtags: "#dailydev #frontend #webdev #react #notion #architecture #ai #realtime #symfony #devtools #generated #en"
---

## Vibe-Code Your Notion Pages and Databases Into Apps Without Leaving Notion

**TLDR:** Vizion is a new tool that lets you write a spec directly in Notion, click a button, and get a live deployed React app with two-way sync back to your Notion data. It uses Notion MCP and an AI agent pipeline under the hood.

**Summary:**

Alright, so here is something that genuinely caught my attention. Vizion takes a Notion page, reads the full block structure through Notion MCP, feeds it into an AI agent pipeline, and spits out a live, interactive React application. You literally write your spec in Notion, hit a button, and the app appears embedded right back into your page. Two-way sync included.

Now, let me be the skeptic for a moment. The idea of "vibe-coding" is appealing, but we need to ask the hard question: what happens when your generated React app needs to do something the AI pipeline did not anticipate? What does debugging look like when you never wrote the code yourself? The demo is impressive, but the real test is what happens at the edges, when the generated app needs a custom API call, or when Notion's block structure does not map cleanly to the UI you envisioned.

That said, the workflow is genuinely clever. Using Notion as both the spec document and the deployment target removes a huge amount of friction. For internal tools, dashboards, and quick prototypes, this could save teams hours of boilerplate. The two-way sync with Notion databases is the real killer feature here, because it means you are not just generating a static page, you are getting a living application connected to your data.

What the article does not really address is scalability and maintainability. If you build fifty of these micro-apps across your Notion workspace, how do you manage them? Version them? Test them? These are the questions that separate a fun demo from a production tool.

**Key takeaways:**
- Vizion turns Notion pages into deployed React apps using AI agent pipelines and Notion MCP
- Two-way sync means the generated app stays connected to your Notion databases
- Best suited for internal tools, prototypes, and dashboards where speed matters more than full control
- Long-term maintainability and debugging of AI-generated code remain open questions

**Why do I care:** If you are a senior frontend developer, this is worth watching not because you would use it for your main product, but because the pattern of "spec-to-app" pipelines is becoming real. Understanding what these tools can and cannot do will help you make smart decisions about where to apply them in your workflow, especially for internal tooling where time-to-value matters more than pixel-perfect control.

**Link:** [Vibe-Code Your Notion Pages Into Apps](https://app.daily.dev/posts/v4Ce0453Q)

## Architecture Decision Records

**TLDR:** Architecture Decision Records are short, one-page documents that capture a single architectural decision along with its context, rationale, alternatives considered, and consequences. They live in your source repository and should never be modified after the fact.

**Summary:**

This is one of those topics where I want to grab every developer by the shoulders and say: please, start doing this today. Architecture Decision Records, or ADRs, are one of the highest-value, lowest-effort documentation practices you can adopt, and yet most teams still do not use them.

The concept is beautifully simple. Each ADR is a short document, ideally one page, stored in your repository as Markdown. It captures one decision: what was the context, what did you decide, what alternatives did you consider, and what are the consequences. You number them sequentially, and critically, you never go back and modify them. If a decision is superseded, you write a new ADR that references the old one.

Here is what the article gets right: ADRs are not about process overhead. They are about making your future self and your future teammates not hate you. Six months from now, when someone asks "why did we choose this database" or "why is this service structured this way," the ADR is sitting right there in the repo. No Slack archaeology required.

What I think the article could push harder on is the cultural aspect. The hardest part of ADRs is not the format or the tooling. It is getting your team to actually write them consistently. The trick is to make it part of your pull request process. If a PR introduces an architectural decision, it should include an ADR. Make it a checkbox on your PR template.

The immutability aspect is also worth emphasizing more. The reason you never edit an ADR is that the historical record of your thinking is just as valuable as the decision itself. Knowing what you considered and rejected tells you as much as knowing what you chose.

**Key takeaways:**
- ADRs are short, one-page documents capturing a single architectural decision with context, rationale, and consequences
- Store them in your repository as numbered Markdown files and never modify them after creation
- They eliminate the need for "Slack archaeology" when someone needs to understand past decisions
- The hardest part is cultural adoption, not the format itself

**Why do I care:** As a senior frontend developer, you make architectural decisions constantly, choosing state management approaches, API patterns, component architectures, build tooling. These decisions are invisible six months later unless you document them. ADRs take five minutes to write and save hours of confused debate later. If your team does not use them, be the person who starts.

**Link:** [Architecture Decision Record](https://app.daily.dev/posts/VQrV9duQh)

## Symfony, Mercure, React: Real-Time Updates in Less Than 100 Lines of Code

**TLDR:** A practical walkthrough of adding real-time updates to a Chinese checkers game using Symfony on the backend, React on the frontend, and Mercure as the real-time transport layer built on top of Server-Sent Events.

**Summary:**

This is one of those articles that reminds me why I love the web platform. The author walks through adding real-time updates to a Chinese checkers game, and the entire real-time layer comes together in fewer than a hundred lines of code. The stack is Symfony publishing game state changes to a Mercure hub, and a React frontend subscribing to those updates via a custom hook.

Mercure is the interesting piece here. If you have not encountered it, Mercure is a protocol built on top of Server-Sent Events. Think of it as a simpler, more web-native alternative to WebSockets for cases where you primarily need server-to-client push. The Symfony backend publishes updates to a Mercure hub after each move, and the React side uses the native EventSource API to subscribe. No socket libraries, no complex connection management.

What I appreciate about this article is that it demonstrates the right tool for the right job. A turn-based board game does not need bidirectional WebSocket communication. It needs the server to push state updates to all connected clients. Server-Sent Events handle that perfectly, and Mercure adds a nice authorization and topic-based routing layer on top.

The React hook pattern is worth noting too. Wrapping EventSource in a custom hook makes the subscription lifecycle clean and predictable. You get automatic cleanup on unmount and a familiar React-idiomatic API for your components. The author does not overthink it, and that is the point.

What the article could explore more is error handling and reconnection. SSE has built-in reconnection, which is great, but what happens when the Mercure hub goes down? What about message ordering guarantees? These are the production concerns that matter when you move beyond a game demo.

**Key takeaways:**
- Mercure provides a protocol layer on top of Server-Sent Events for server-to-client push notifications
- The native EventSource API in the browser handles SSE subscriptions without any library dependencies
- For use cases that only need server-to-client push, SSE and Mercure are simpler than WebSockets
- Wrapping EventSource in a custom React hook provides clean lifecycle management

**Why do I care:** Real-time features are showing up everywhere in frontend applications, from live dashboards to collaborative editing to notification feeds. Understanding that you do not always need WebSockets, and that Server-Sent Events with something like Mercure can be dramatically simpler for server-to-client push, gives you a lighter-weight option in your toolkit. The React hook pattern here is directly reusable.

**Link:** [Symfony, Mercure, React: Real-time Updates](https://app.daily.dev/posts/yxcdAVOjM)

## The Ultimate Job Finding-Management Tool

**TLDR:** A developer built a Chrome extension that saves job descriptions and uses a local Ollama LLM to rate how well your skills align with each job on a one-to-five star scale, sorting results by relevance.

**Summary:**

So someone built a Chrome extension for job hunting that saves job descriptions and then uses a locally-running Ollama LLM to rate how well your skills match each posting. It scores alignment on a one-to-five star scale and sorts your saved jobs by relevance. The developer apparently built it quickly using Copilot CLI, and it features what is described as a neon UI.

Let me be honest about what is interesting and what is not here. The interesting part is the pattern of using a local LLM for personal productivity tooling. Running Ollama locally means your resume and job search data never leave your machine, which is a genuine privacy advantage. The skill-matching concept is sound, you are essentially automating the tedious process of reading through job descriptions and mentally mapping them to your experience.

What gives me pause is that this is currently using local storage with plans for backend persistence. That is fine for a side project, but it means your saved jobs vanish if you clear your browser data. The roadmap mentions resume tailoring, which is where this could get genuinely useful, automatically adjusting your resume emphasis based on each job description's requirements.

The broader trend here is worth paying attention to. Local LLMs are becoming capable enough for these kinds of personal automation tasks, and the privacy story is compelling. But the article does not address accuracy. How good is a local model at actually assessing skill alignment? A five-star rating that is wrong is worse than no rating at all, because it creates false confidence in your job search prioritization.

**Key takeaways:**
- The extension uses a local Ollama LLM for privacy-preserving skill-to-job matching
- Current implementation relies on local storage with plans for backend persistence
- The pattern of local LLMs for personal productivity tooling is a growing trend
- Accuracy of AI-based skill matching remains an open question worth validating

**Why do I care:** The specific tool may or may not be useful to you, but the architecture pattern is worth noting. Using local LLMs as personal productivity agents that process sensitive data without sending it to the cloud is a pattern that will show up increasingly in developer tooling. Understanding how to build Chrome extensions that integrate with local AI models is a skill with growing relevance.

**Link:** [The Ultimate Job Finding-Management Tool](https://app.daily.dev/posts/D1Xl7DBql)

## Convert Blogs Into Videos With Little or No Effort

**TLDR:** Blog2Video is an open-source AI tool that converts blog posts into professional videos by generating scripts, animating scenes, and adding voiceovers. Users paste a URL, pick a template, and the tool handles the rest.

**Summary:**

Blog2Video, from FireBird Technologies, is an AI-powered tool that takes a blog post URL and converts it into a video. You pick a template, choosing from storytelling, promotional, explainer, or marketing styles, and the tool generates a script, creates animated scenes, and adds voiceover. It also supports bulk video creation and custom voice generation.

The appeal here is obvious. Video content gets dramatically more engagement than written content on most platforms, but producing video is expensive and time-consuming. If you can automate even a rough first draft of a video from existing written content, that is a meaningful productivity gain for content teams.

But let me push back on the premise a bit. "Little or no effort" is doing a lot of heavy lifting in that headline. The quality gap between an AI-generated video and a professionally produced one is still significant. What you are getting is probably good enough for social media clips and internal presentations, but not for your main content channel. The real value proposition is not replacing video production, it is creating video content from written content that would otherwise never become a video at all.

The template approach is smart because it constrains the creative decisions. Rather than giving the AI complete freedom and getting unpredictable results, you are channeling it into proven formats. The custom voice generation feature is interesting but also raises questions about brand consistency and the uncanny valley effect that AI voices still sometimes trigger.

What is missing from the discussion is the feedback loop. Can you edit the generated script before it becomes video? Can you swap out scenes? The difference between a useful tool and a toy is often the ability to iterate on the output rather than accepting it wholesale.

**Key takeaways:**
- Blog2Video converts blog URLs into videos using AI-generated scripts, animations, and voiceovers
- Template-based approach with storytelling, promotional, explainer, and marketing options constrains AI output
- Best positioned for creating video content that would not otherwise exist, not replacing professional production
- The ability to iterate on generated output is crucial for practical usefulness

**Why do I care:** Content repurposing is increasingly part of a developer advocate or technical writer's job. If you write blog posts, the ability to automatically generate even a draft video version extends your content's reach significantly. As a frontend developer, understanding these AI content pipelines also helps you build better interfaces for similar tools.

**Link:** [Blog2Video on GitHub](https://app.daily.dev/posts/yHKd9kf9s)