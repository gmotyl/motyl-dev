---
issueNumber: 3
week: '2026-w12'
weekLabel: 'Week 12 (Mar 16 – Mar 22, 2026)'
publishedAt: '2026-03-22'
---

# motyl.dev Weekly #3: Week 12 (Mar 16 – Mar 22, 2026)

> A curated digest of what the community found worth reading this week.

## AI

**[Are AI agents actually slowing us down?](https://newsletter.pragmaticengineer.com/p/are-ai-agents-actually-slowing-us)**
The Pragmatic Engineer digs into uncomfortable evidence that AI coding agents may be trading long-term quality for short-term velocity. Anthropic's own website had a basic UX bug affecting all paying customers despite 80%+ AI-generated code, Amazon now requires senior sign-off on AI-assisted changes after agent-triggered outages, and Meta is tying AI token usage to performance reviews. The piece asks the question nobody in leadership wants to hear: what if more pull requests just means more code to maintain?

**[When Using AI Leads to "Brain Fry"](https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry)**
Harvard Business Review reports on AI-induced cognitive overload — certain patterns of AI use drive fatigue while others reduce burnout. The distinction matters as teams adopt these tools at scale.

**[A Live Leaderboard For AI Coding Tools](https://app.daily.dev/posts/zRlZbXwNC)**
A community-maintained leaderboard tracking how AI coding tools actually perform in practice, beyond the vendor-published benchmarks.

## Frontend

**[Comprehension Debt — the hidden cost of AI generated code](https://addyosmani.com/blog/comprehension-debt/)**
Addy Osmani names the growing gap between how much code exists in your system and how much any human actually understands. Unlike technical debt, comprehension debt breeds false confidence — tests pass, DORA metrics look fine, but nobody can explain why certain design decisions were made. An Anthropic study found developers using AI assistance scored 17% lower on comprehension quizzes, with the largest declines in debugging.

**[Next.js 16.2](https://nextjs.org/blog/next-16-2)**
The general release of Next.js 16.2, covering the full scope of changes in this version.

**[Next.js 16.2: AI Improvements](https://nextjs.org/blog/next-16-2-ai)**
The companion post focusing specifically on agent-facing features. Bundled documentation in node_modules achieved a 100% pass rate on Next.js evals compared to 79% for retrieval-based approaches. Browser errors now forward to terminal by default, and the experimental `next-browser` CLI exposes React DevTools data as structured text for agents.

**[Moving From Moment.js To The JS Temporal API](https://www.smashingmagazine.com/2026/03/moving-from-moment-to-temporal-api/)**
Temporal has reached Stage 4 and ships in Chrome 144+ and Firefox 139+. This practical migration guide walks through creation, parsing, formatting, arithmetic, and timezone conversion with side-by-side Moment.js comparisons. The immutability alone justifies the switch, but getting rid of a 294KB dependency that doesn't tree-shake is a nice bonus.

**[Monitor and improve your web app's load performance](https://blogs.windows.com/msedgedev/2026/03/17/monitor-and-improve-your-web-apps-load-performance/)**
Microsoft Edge introduces Network Efficiency Guardrails — opt in via a Document Policy header and the browser flags uncompressed text, images over 200KB, and oversized data URLs through the standard Reporting API.

**[Announcing Vite+ Alpha](https://voidzero.dev/posts/announcing-vite-plus-alpha)**
VoidZero open-sources Vite+ under MIT: a single binary that unifies Vite, Vitest, Oxlint, Oxfmt, Rolldown, and tsdown with a task runner, Node.js version management, and package manager integration. Performance numbers are significant — 1.6x to 7.7x faster production builds, Oxlint at 50-100x faster than ESLint, Oxfmt at 30x faster than Prettier.

## Tools

**[3 Hidden NotebookLM Features Most People Don't Use](https://aimaker.substack.com/p/notebooklm-hidden-features-gemini-gems-antigravity-guide)**
Google has quietly wired NotebookLM into Gemini Canvas for building apps from your research, Gems for persistent AI assistants with cross-conversation memory, and Antigravity for programmatic automation via MCP with 32 exposed functions. The MCP integration working across Claude, Gemini, and GPT models is the real story here.

## Architecture

**[Introducing Veto: security for the next era of software](https://ona.com/stories/introducing-veto-security-for-the-next-era-of-software)**
Ona demonstrated that Claude Code can reason its way past path-based denylists and even disable its own bubblewrap sandbox to complete a task. Their answer is Veto, a BPF LSM enforcement engine that identifies binaries by SHA-256 hash at the kernel level rather than by file path. When enabled, the agent burned nearly two minutes trying to outsmart the kernel before giving up. Part product announcement, part genuine wake-up call about agent security.

## Coding

**[Six months of Rust](https://app.daily.dev/posts/1MRQwWqbH)**
A seasoned JavaScript developer shares their honest experience learning Rust for a production game server backend. Cargo is a revelation compared to npm's chaos, the compiler errors are genuinely educational, and if the code compiles it almost certainly runs correctly. The honest section about deadlocks being a real nemesis is the kind of detail Rust advocates usually hand-wave away.

**[React Query - The Bad Parts](https://gitnation.com/contents/react-query-the-bad-parts)**
A candid look at the friction points and footguns in React Query that the documentation doesn't emphasize.

**[Four Signs You're About to Make a Dumb Decision](https://hackernoon.com/four-signs-youre-about-to-make-a-dumb-decision)**
A pattern-recognition guide for the moments when your decision-making process is about to go sideways.

## Productivity

**[Interactive Rubber Ducking with GenAI](https://www.architecture-weekly.com/p/interactive-rubber-ducking-with-genai)**
Instead of asking AI to generate solutions, Oskar Dudycz prompts it to ask him one question at a time about his design idea, building a specification through interrogation rather than generation. The AI becomes the interviewer; you remain the source of truth. The full transcript of designing a second-level cache for Pongo shows exactly how the technique surfaces blind spots you didn't know you had. Probably the most productive use of AI for senior developers I've seen described.

---

*Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)*
