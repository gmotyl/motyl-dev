---
title: "7 Vibe Coding Mistakes That Turn Weekend Projects Into Week-Long Headaches"
excerpt: "A practical rundown of the most common mistakes builders make when using AI coding tools, from skipping version control to stuffing context windows."
publishedAt: "2026-03-10"
slug: "7-vibe-coding-mistakes-you-are-probably-making"
hashtags: "#ai-maker #vibe-coding #ai #developer-tools #generated #en"
---

## Stop Shipping Broken Apps: 7 Vibe Coding Mistakes You're Probably Making

**TLDR:** If you are using AI tools like Bolt, Lovable, Cursor, or Replit to build software, you are a vibe coder -- and you are almost certainly making at least one of these seven mistakes. The article walks through each one, from skipping version control to writing lazy prompts, and offers concrete fixes that apply whether you are a seasoned developer or someone who just started building things last Tuesday.

**Summary:**

This piece, originally a guest post by Jeff Morhous (a senior software engineer behind The AI-Augmented Engineer newsletter), is a field guide to the self-inflicted wounds that plague anyone building with AI assistance. And let me tell you, the timing could not be better. We are living through an explosion of AI-generated code, and while the barrier to entry has never been lower, the number of ways to shoot yourself in the foot has never been higher.

The article identifies seven core mistakes. The first and most devastating is **skipping version control**. This is the classic "I was just going to make a small change" scenario. Without Git or at least some form of snapshot history, you are one bad AI suggestion away from losing everything that was working. The advice here is refreshingly simple: initialize a repo the moment you have anything that runs, commit at every "it works" moment, and push to a remote so your laptop is not a single point of failure. For non-technical builders, the article acknowledges that Git can be intimidating and points to simpler tools that offer version history without the learning curve.

The second mistake is **never writing tests**. There is a persistent myth that testing requires some massive enterprise infrastructure. It does not. A test is just a repeatable check that confirms today's code still does yesterday's job. The article includes a practical example of a detailed prompt for generating RSpec tests in a Rails project, and a more general prompt for when you just want comprehensive coverage and do not know where to start. The critical insight here is that AI-generated tests still need to be validated -- if you can delete an important piece of code and no test breaks, your tests are decoration, not protection.

The third is **never actually using your own product**. This one is underrated. AI can generate features that technically work but feel terrible. The recommendation is a three-minute daily ritual: use your own app with realistic data, click through the paths a real user would take, and keep a friction log. One-sentence notes like "upload freezes on large files" become your improvement roadmap. The article gives a real example of debugging a notification permission error that only surfaced through manual testing in the browser -- something no unit test would have caught.

Mistake four is **stuffing the context window**. Just because a model has a massive context window does not mean you should fill it with irrelevant chat history. The analogy is apt: imagine someone reading you a three-page recipe and expecting you to follow it. The practical rule of thumb offered is to open a new chat session for each discrete task and try to clear context before hitting 50% of the model's maximum. Use plan files like Plan.md to persist critical information across sessions without bloating the context.

Fifth is **ignoring database backups**. The most common way vibe coders lose data is by letting an LLM access their production database directly. This is almost always a mistake. The advice is to use separate databases for production and development, turn on automated backups, and -- this is the part most people skip -- actually practice a restore once. Backups you have never tested are just a comforting theory.

Sixth is **writing vague prompts**. "Build me a dashboard" is not a specification; it is an invitation for the model to guess. Good prompting is good product thinking written down: goals, constraints, context, and a clear definition of done. The article suggests asking the model to list its assumptions before writing code, then confirming or correcting them. Plan mode in tools like Cursor and Codex is highlighted as the single best way to get this right without having to become a prompt engineering expert.

The seventh and final mistake is **building too much at once**. AI makes adding features feel cheap, but integration is still expensive. The recommendation is to ship a thin vertical slice -- front end, back end, data -- that lets a real user complete a single valuable job. Then get it in front of yourself and one other human, fix the top friction, and repeat. This feels slow but compounds quickly and avoids the rewrites that come from guessing what users wanted across five unfinished features.

Now, here is what I think the article is missing. It does not address the elephant in the room: **security**. When you are vibe coding with AI, you are often accepting code you do not fully understand. That code might have vulnerabilities, leaked API keys, or insecure defaults. The article covers database backups but completely sidesteps the broader question of what happens when AI-generated code introduces security holes that a non-technical builder would never notice. That is arguably more dangerous than any of the seven mistakes listed.

There is also no discussion of **dependency management**. AI tools love pulling in libraries. Before you know it, your weekend project has forty npm packages, half of which are unmaintained. That is a ticking time bomb for both security and stability, and it deserves at least a mention.

**Key takeaways:**

- Always use version control, even if it is just simple snapshots -- Git is ideal but any history is better than none
- Write tests incrementally, one bug at a time, and verify they actually fail when important code breaks
- Use your own product daily with realistic data and maintain a friction log
- Start fresh chat sessions for each task to avoid context window degradation
- Never give AI tools direct access to production databases; use separate environments
- Write specific, detailed prompts with clear goals, constraints, and definitions of done
- Ship small vertical slices instead of building multiple features simultaneously
- Use plan mode in your AI coding tool before every significant change

**Tradeoffs:**

The article strongly advocates for plan mode and incremental development, which is sound advice for most cases. However, there is a tension here: plan mode adds overhead. For truly simple changes -- a color tweak, a text update -- the ceremony of planning first can slow you down more than just making the change. The key is knowing when a task is simple enough to just do and when it is complex enough to plan. The article does not draw that line, which means a reader following the advice literally might over-engineer their workflow for trivial changes.

Similarly, the advice to open a new chat for every task is good for context hygiene but can be frustrating when tasks are related. There is a sweet spot between "one giant conversation" and "a new chat for every single thing," and finding it requires judgment the article does not really address.

**Link:** [Stop Shipping Broken Apps: 7 Vibe Coding Mistakes You're Probably Making](https://aimaker.substack.com/p/vibe-coding-mistakes)