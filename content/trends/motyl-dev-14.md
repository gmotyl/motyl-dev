---
issueNumber: 14
week: '2026-w22'
weekLabel: 'Week 22 (May 25 – May 31, 2026)'
publishedAt: '2026-06-07'
image: 'https://img.motyl.dev/blog/motyl-dev-14.webp'
---

# motyl.dev Weekly #14: Week 22 (May 25 – May 31, 2026)

> A curated digest of what I found worth reading this week.

Leading this week is the new Thoughtworks Technology Radar Vol.34, essential reading for anyone tracking where tools and techniques are headed. Around it runs a common thread: as agents write more of our code, what do we actually keep? The rest of this week's picks range from trust and craft to hard benchmark numbers and a quiet revolt against AI search. Worth your time.

## 🏗️ Architecture

**[Thoughtworks Technology Radar Vol.34](https://www.thoughtworks.com/radar)**
The latest edition of Thoughtworks' twice-yearly snapshot of the techniques, tools, platforms, and languages worth adopting, trialling, or steering clear of. If you read one thing this week, make it this.

**[I'm Going Back to Writing Code by Hand](https://blog.k10s.dev/im-going-back-to-writing-code-by-hand)**
A developer's honest reflection on stepping back from AI-generated code to reclaim understanding and craft, and a meditation on what quietly erodes when you stop writing it yourself.

## 🤖 AI

**[We Tested Grok, Opus, Sonnet, GPT, and Gemini in Kilo Code Reviewer](https://blog.kilo.ai/p/review-testing)**
Kilo planted 15 deliberate bugs in a finished-looking React/TypeScript budget app and ran identical cold review prompts against five frontier models. Opus 4.8 led with 10 of 15 and was the only model to verify the test math by hand rather than trust the green checkmarks. Grok tied Sonnet at 9 for a tenth of the cost, Gemini managed just 2, and four bugs survived every model.

## 💻 Coding

**[Trust Factory](https://tidyfirst.substack.com/p/trust-factory)**
Kent Beck argues that Extreme Programming was secretly a trust factory all along, each practice quietly manufacturing trust between people while making the people more trustworthy. The warning underneath is sharp: solo AI-assisted coding skips almost every one of those trust-building moments, and that gap is going to hurt.

**[Spec-Driven Development: Why AI Is Bringing an Old Software Engineering Idea Back to Life](https://theserverlessedge.com/spec-driven-development-ai-software-engineering/)**
A look at how AI is reviving spec-driven development, turning a clear written specification into the contract an agent builds against instead of a document nobody reads.

## 🎨 Frontend

**[Keyboard Accessibility: The Clearest Signal of Digital Maturity](https://www.dennisdeacon.com/accessibility/keyboard-accessibility-the-clearest-signal-of-digital-maturity/)**
Why full keyboard operability is the clearest signal of a team's digital maturity, and a practical case for treating it as a baseline rather than an afterthought.

## 🧪 Productivity

**[How 7 Kilo Code Engineers Run Up to 20 Parallel Agents and Still Ship Clean Code](https://blog.kilo.ai/p/how-7-kilo-code-engineers-run-up)**
Kilo asked seven of its senior engineers how they actually run parallel agents day to day, and the honest answer is far less dramatic than the social-media flex: two to four agents in the foreground, a handful of fire-and-forget agents in the background, and a strong verification loop on top of everything. The real bottleneck has moved from writing code to checking it.

## 🎥 Video

**[Full Walkthrough: Workflow for AI Coding — Matt Pocock](https://www.youtube.com/watch?v=-QFHIoCo-Ko)**
A hands-on workshop covering the whole lifecycle of building software with agents, from interrogating a fuzzy brief into a real PRD to slicing thin vertical slices and running test-driven development until it ships. The thesis: chatting with an AI in a sidebar is not a workflow.

## 📰 Other

**[DuckDuckGo installs jumped 18% after Google killed the blue links](https://thenextweb.com/news/duckduckgo-user-surge-google-ai-search-overhaul)**
After Google's I/O 2026 decision to make AI answers the default and push the traditional blue links aside, DuckDuckGo saw an 18% jump in US installs in a single week, with Apple-device spikes hitting nearly 70% on the peak day. A measurable backlash from users who simply want the option to turn AI off.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
