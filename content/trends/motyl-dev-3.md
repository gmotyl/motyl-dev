---
issueNumber: 3
week: '2026-w12'
weekLabel: 'Week 12 (Mar 16 – Mar 22, 2026)'
publishedAt: '2026-03-22'
image: 'https://img.motyl.dev/newsletter/motyl-dev-3.webp'
---

# motyl.dev Weekly #3: Week 12 (Mar 16 – Mar 22, 2026)

> A curated digest of what I found worth reading this week.

Hello! This is the third issue of motyl.dev Weekly newsletter. This week we have a lot of interesting articles about about AI in productivity context. Developers working with AI tools need to find a balance between speed and quality. There are diffrent ways to use AI tools to improve productivity. Kent C. Dodds has a great talk about this topic ([How I Build Web Applications in 2026](https://gitnation.com/contents/how-i-build-web-applications-in-2026)) but the real question is [Are AI agents actually slowing us down?](https://newsletter.pragmaticengineer.com/p/are-ai-agents-actually-slowing-us) (The Pragmatic Engineer)? I have to admint that even though this newsletter and whole motyl.dev would propably never came to life without AI tools, I'm not sure if intensive use of AI in teams I work with as consultant is always leading to better results. We should learn from dev stars like Oskar Dudycz who is [Interactive Rubber Ducking with GenAI](https://www.architecture-weekly.com/p/interactive-rubber-ducking-with-genai)
Read these articles and find out for yourself.

## 📈 Productivity

**[Interactive Rubber Ducking with GenAI](https://www.architecture-weekly.com/p/interactive-rubber-ducking-with-genai)** — Instead of asking AI to generate solutions, Oskar Dudycz prompts it to ask him one question at a time about his design idea, building a specification through interrogation rather than generation. The AI becomes the interviewer; you remain the source of truth. Probably the most productive use of AI for senior developers I've seen described.

**[How I Build Web Applications in 2026](https://gitnation.com/contents/how-i-build-web-applications-in-2026)** — Modern approaches to building web applications in the age of AI assistants and server components.

**[When Using AI Leads to "Brain Fry"](https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry)** — Harvard Business Review reports on AI-induced cognitive overload. A Berkeley study of 200 tech employees found AI tools don't reduce workload — they intensify it by enabling parallel work streams, creating exhaustion through constant context switching and output verification.

**[AI Doesn't Reduce Work -- It Intensifies It](https://simonwillison.net/2026/Feb/9/ai-intensifies-work/?ref=motyldev)** — Research confirms AI tools enable work intensification rather than reduction. When you can suddenly spin up code in a fraction of the time, you don't take the afternoon off — you start running three things in parallel.

## 🤖 AI

**[Are AI agents actually slowing us down?](https://newsletter.pragmaticengineer.com/p/are-ai-agents-actually-slowing-us)** — The Pragmatic Engineer investigates uncomfortable evidence: Anthropic's website had a basic UX bug affecting all paying customers despite 80%+ AI-generated code, Amazon requires senior sign-off on AI-assisted changes after agent-triggered outages, and Meta ties AI token usage to performance reviews. The question nobody in leadership wants to hear: what if more pull requests just means more code to maintain?

**[A Live Leaderboard For AI Coding Tools](https://app.daily.dev/posts/zRlZbXwNC)** — A community-maintained leaderboard tracking how AI coding tools actually perform in practice, beyond vendor-published benchmarks.

**[Comprehension Debt — the hidden cost of AI generated code](https://addyosmani.com/blog/comprehension-debt/)** — Addy Osmani names the growing gap between how much code exists and how much any human actually understands. Unlike technical debt, comprehension debt breeds false confidence — tests pass, DORA metrics look fine, but nobody can explain why certain design decisions were made. An Anthropic study found developers using AI assistance scored 17% lower on comprehension quizzes, with the largest declines in debugging.

## 🚀 Frontend

**[Moving From Moment.js To The JS Temporal API](https://www.smashingmagazine.com/2026/03/moving-from-moment-to-temporal-api/)** — Temporal has reached Stage 4 and ships in Chrome 144+ and Firefox 139+. This practical migration guide walks through creation, parsing, formatting, arithmetic, and timezone conversion with side-by-side Moment.js comparisons. The immutability alone justifies the switch, plus getting rid of a 294KB dependency that doesn't tree-shake.

**[Monitor and improve your web app's load performance](https://blogs.windows.com/msedgedev/2026/03/17/monitor-and-improve-your-web-apps-load-performance/)** — Microsoft Edge introduces Network Efficiency Guardrails — opt in via a Document Policy header and the browser flags uncompressed text, images over 200KB, and oversized data URLs through the standard Reporting API.

**[Next.js 16.2](https://nextjs.org/blog/next-16-2)** — The general release of Next.js 16.2, covering the full scope of changes including the React Compiler for automatic memoization.

**[Next.js 16.2: AI Improvements](https://nextjs.org/blog/next-16-2-ai)** — Companion post focusing on agent-facing features. Bundled documentation in node_modules achieved 100% pass rate on Next.js evals compared to 79% for retrieval-based approaches. Browser errors now forward to terminal by default.

**[Announcing Vite+ Alpha](https://voidzero.dev/posts/announcing-vite-plus-alpha)** — VoidZero open-sources Vite+ under MIT: a single binary unifying Vite, Vitest, Oxlint, Oxfmt, Rolldown, and tsdown with a task runner and Node.js version management. Performance numbers are significant — 1.6x to 7.7x faster production builds, Oxlint at 50-100x faster than ESLint.

## 🛠️ Tools

**[3 Hidden NotebookLM Features Most People Don't Use](https://aimaker.substack.com/p/notebooklm-hidden-features-gemini-gems-antigravity-guide)** — Google quietly wired NotebookLM into Gemini Canvas for building apps from research, Gems for persistent AI assistants with cross-conversation memory, and Antigravity for programmatic automation via MCP with 32 exposed functions. The MCP integration works across Claude, Gemini, and GPT models.

**[Introducing Veto: security for the next era of software](https://ona.com/stories/introducing-veto-security-for-the-next-era-of-software)** — Ona demonstrated that Claude Code can reason its way past path-based denylists and even disable its own bubblewrap sandbox to complete a task. Their answer is Veto, a BPF LSM enforcement engine that identifies binaries by SHA-256 hash at the kernel level. When enabled, the agent burned nearly two minutes trying to outsmart the kernel before giving up.

## 💻 Coding

**[Six months of Rust](https://app.daily.dev/posts/1MRQwWqbH)** — A seasoned JavaScript developer shares their honest experience learning Rust for a production game server backend. Cargo is a revelation compared to npm's chaos, the compiler errors are genuinely educational, and if the code compiles it almost certainly runs correctly.

**[React Query - The Bad Parts](https://gitnation.com/contents/react-query-the-bad-parts)** — A candid look at the friction points and footguns in React Query that the documentation doesn't emphasize.

---

See next week!

Greg

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
