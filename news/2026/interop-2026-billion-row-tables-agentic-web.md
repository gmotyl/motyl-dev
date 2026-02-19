---
title: "Interop 2026, Billion-Row Tables, and the Agentic Web"
excerpt: "Browser interoperability goals, virtual scrolling at extreme scale, a new Electron alternative, durable ETL pipelines, and Chrome's WebMCP for AI agents."
publishedAt: "2026-02-18"
slug: "interop-2026-billion-row-tables-agentic-web"
hashtags: "#uidev #frontend #css #react #typescript #ai #performance #architecture #generated #en"
---

## Interop 2026: The Browser Wars Nobody Talks About

**TLDR:** Apple, Google, Microsoft, Mozilla, and Igalia have announced Interop 2026, a coordinated push to make 20+ web platform features work identically across browsers. The focus areas read like a wish list from the State of CSS and State of HTML surveys, and they include anchor positioning, container style queries, view transitions, and scroll-driven animations.

Let me tell you something: the fact that we still need an annual coordinated effort to make browsers agree on how basic CSS features should work in 2026 is both embarrassing and encouraging. Embarrassing because, honestly, anchor positioning has been talked about for years. Encouraging because at least these companies are sitting at the same table and committing to measurable results on a public dashboard.

The focus areas are extensive. Anchor positioning carries over from 2025, which tells you how hard it is to get right. Container style queries using the `@container` at-rule with `style()` functions are in there. Dialogs and popovers get attention with the `closedby` attribute and `popover="hint"` -- practical stuff that every developer building interactive UIs needs. Scroll-driven animations, where animation timelines are tied to scroll position, are finally getting the interop treatment. And view transitions are expanding from same-document to cross-document, which is the real prize -- that is what will let multi-page apps feel as smooth as SPAs.

What caught my eye are some of the less flashy items. The `attr()` CSS function returning typed values, `contrast-color()` for accessibility, scoped custom element registries for web components that do not stomp on each other, and the `shape()` function for creating paths directly in CSS. Each of these individually is a small thing, but together they represent the platform catching up to what frameworks have been polyfilling for a decade.

The investigation efforts are also telling. JPEG XL is being explored for testability, which means the image format wars are not over. Mobile testing infrastructure is being improved, which is an admission that we have been testing desktop browsers and hoping mobile works. And accessibility testing is getting attention for generating consistent accessibility trees -- something that should have been a priority from day one.

What is missing from this announcement? Any mention of performance benchmarks. Interop is about correctness, not speed. Two browsers can both implement anchor positioning correctly but with wildly different rendering performance. That gap is where real developer pain lives, and nobody is coordinating on it.

**Key takeaways:**
- 20+ focus areas targeting CSS, HTML, and API interoperability across all major browsers
- Anchor positioning, container style queries, view transitions, and scroll-driven animations are top priorities
- Cross-document view transitions could fundamentally change how multi-page apps feel
- Investigation efforts include JPEG XL, mobile testing, and accessibility tree consistency
- Results are tracked on a public dashboard at wpt.fyi/interop-2026

**Link:** [Interop 2026: Continuing to improve the web for developers](https://web.dev/blog/interop-2026)

---

## Virtual Scrolling for Billions of Rows: Five Techniques from HighTable

**TLDR:** A deep technical walkthrough of how the HighTable React component renders tables with billions of rows using five layered techniques: lazy loading, table slicing, infinite pixel workarounds, dual-mode scrolling, and two-step random access. No canvas element hacks, no fake scrollbars -- just native HTML and clever math.

This article is a masterclass in solving a problem most developers think they understand until they actually try it at scale. You think virtual scrolling is just "render the visible rows"? That is technique two out of five. The rabbit hole goes much, much deeper.

The first technique, lazy loading, is straightforward. Only fetch data for visible cells, using a data frame abstraction that decouples the table component from whatever data source you have -- a remote Parquet file, an API, a local array. The component calls `getCell()` synchronously for rendering and `fetch()` asynchronously for loading. This is clean separation of concerns and it is the foundation everything else builds on.

Technique two, table slicing, is what most people think of as virtual scrolling. Only render the visible rows in the DOM. But the implementation detail matters: they use a canvas div (not a `<canvas>` element) sized to the full table height, with the actual `<table>` element absolutely positioned inside it. The sticky header is part of the table element itself, not a separate element, which is a smart choice for accessibility -- screen readers can properly associate headers with data cells.

Here is where it gets genuinely interesting. Technique three tackles the maximum element height limit in browsers. Firefox caps at about 17 million pixels. With 33-pixel rows, that is only 500K rows. Their solution is to downscale the scrollbar resolution above a threshold of 8 million pixels. One scrolled pixel maps to multiple virtual pixels. Simple in concept, but it creates a problem: with 10 billion rows, a single pixel scroll jumps over 72 million rows. Rows in between become unreachable through normal scrolling.

Technique four solves this with dual-mode scrolling -- small scroll movements are treated as local (pixel-precise), while large movements are treated as global (jump to scrollbar position). They maintain a state with a global anchor and a local offset, switching between modes based on the magnitude of each scroll delta. This is the kind of thing that sounds obvious in retrospect but requires careful engineering to get right without jank.

The fifth technique handles random access -- keyboard navigation, "jump to row" features -- by decoupling vertical and horizontal scrolling. When you press the down arrow, the component first scrolls vertically to ensure the target row exists in the DOM, then scrolls horizontally and sets focus. The sequencing matters because you cannot focus an element that does not exist yet.

What the author does not discuss is accessibility beyond keyboard navigation. Screen readers with billions of rows present unique challenges around ARIA attributes, row count announcements, and navigation landmarks. The WAI Grid Pattern they reference was not designed for this scale. Also notably absent: any discussion of column virtualization, which they acknowledge as a pending feature.

**Key takeaways:**
- Five layered techniques enable native HTML tables with billions of rows
- Browser height limits (17M pixels in Firefox) require scrollbar resolution downscaling
- Dual-mode scrolling distinguishes local (mouse wheel) from global (scrollbar drag) movements
- Random access requires decoupling vertical and horizontal scroll operations
- All built on native HTML elements with no canvas rendering or fake scrollbars

**Link:** [Virtual Scrolling for Billions of Rows -- Techniques from HighTable](https://rednegra.net/blog/20260212-virtual-scroll/)

---

## Electrobun v1: A Desktop App Framework That Is Not Electron or Tauri

**TLDR:** Electrobun has reached v1 after two years of development. Built on Bun and Zig, it targets developers who want to build cross-platform desktop apps with TypeScript but find Electron too heavy and Tauri's Rust requirement too steep. It now supports macOS, Windows, and Ubuntu with built-in code signing, auto-updates, and differential patching.

The creator's frustration is relatable to anyone who has shipped a desktop app in the last decade. Electron's developer experience around code signing, notarization, and updates has always been painful. Tauri solves some of that but requires Rust, which is a real barrier for teams that are all-in on TypeScript. Electrobun tries to thread the needle: TypeScript for your application code, with Bun as the runtime and Zig under the hood for the performance-critical bits.

The differential updates story is compelling. They ported bsdiff from C to Zig, optimized it with SIMD and zstd compression, and built the whole pipeline so you just point it at a static host -- R2, S3, GitHub Releases -- and you are done. That is the kind of batteries-included approach that makes shipping actual products possible. Electron makes you cobble this together from five different packages.

The OOPIF (Out-of-Process Iframe) work is technically interesting. Electron deprecated Chromium's `<webview>` tag years ago and still has not replaced it properly. Electrobun built `<electrobun-webview>` as a "super iframe" with process isolation, proper DOM positioning, and layering that works across platforms without patching browser engines. If you have ever fought with Electron's webview, you know how significant this is.

But here is what I think the author is avoiding: the elephant in the room is ecosystem maturity. Electron has thousands of production apps, a massive community, extensive documentation, and battle-tested edge cases. Electrobun v1 is a starting point, not a finish line. The question is not whether it works -- it clearly does -- but whether it will still be maintained in three years, whether edge cases around platform-specific behaviors are handled, and whether the bus factor of what appears to be primarily a solo project is acceptable for production use. The Discord community is growing, which is encouraging, but "growing" and "mature" are different things.

**Key takeaways:**
- Cross-platform desktop apps with TypeScript, powered by Bun and Zig
- Built-in code signing, notarization, auto-updates with differential patching
- Custom OOPIF implementation replaces Electron's deprecated webview
- Supports macOS, Windows, and Ubuntu out of the box
- v1 is stable but ecosystem maturity remains the key question

**Link:** [Electrobun v1](https://blackboard.sh/blog/electrobun-v1/)

---

## Every App You Have Built Is an ETL Pipeline

**TLDR:** A compelling argument that most web applications are disguised ETL systems, and the accidental complexity of status tracking, retry logic, and idempotency eventually overwhelms the actual business logic. The post advocates for step-level durability using Inngest as the solution.

This article nails a pattern that every experienced backend developer has lived through. You start with three clean lines of code -- fetch data, transform it, save it. Then production happens. You add status tracking. Then retry logic. Then idempotency checks. Then deduplication. Then timeout handling. Then observability. Before you know it, your support ticket categorization function is 40 lines of infrastructure code with 3 lines of business logic buried inside.

The evolutionary trap metaphor is perfect. Each individual fix is reasonable. Status tracking? Obviously needed. Retry logic? Of course. Idempotency? Learned that one the hard way after duplicate data corrupted a database. But the compound effect is that you are now maintaining a bespoke orchestration system that nobody fully understands, and your domain model is polluted with `categorization_status`, `categorization_error`, and `categorization_attempts` columns that have nothing to do with support tickets.

The LLM angle is timely and underappreciated. When your transform step is a non-deterministic AI model, all the traditional ETL problems get worse. The same input can produce different outputs, invalid schemas, or outright failures. Retries that re-run the whole pipeline burn through API budget without telling you which specific step failed. RAG pipelines are just chained ETL cycles, each carrying the same failure modes.

The Inngest solution is genuinely elegant -- `step.run()` creates checkpoints, so if the LLM call fails, you retry only that step, not the data fetch before it. The singleton pattern prevents duplicate processing. The event-driven fan-out means adding new reactions to the same trigger does not require modifying existing code. These are real architectural wins.

But let me push back on something. The article presents this as an either-or: hand-roll your orchestration or use Inngest. There is a middle ground. Libraries like Temporal, BullMQ with proper job design, or even well-structured database-backed state machines can solve many of these problems without a third-party service dependency. The trade-off the author is not examining is vendor lock-in and the cost of routing all your background processing through someone else's infrastructure. For startups that might be fine. For companies processing millions of events per day, the pricing and operational dependency conversation is more nuanced.

Also, this is a sponsored article masquerading as editorial -- the author works at Inngest. That does not invalidate the technical arguments, which are sound, but it should be disclosed more prominently than a casual mention buried in the middle.

**Key takeaways:**
- Most web apps are ETL pipelines with a UI on top
- Accidental complexity from status tracking, retries, and idempotency compounds over time
- LLM-powered features make ETL problems worse due to non-deterministic transforms
- Step-level durability prevents partial retries and duplicate data
- Event-driven fan-out decouples pipeline additions from existing code
- Consider the vendor lock-in trade-off before adopting any orchestration platform

**Link:** [Every app you've built is an ETL pipeline](https://www.inngest.com/blog/etl-via-inngest)

---

## Expo Adds MCP Tools for EAS Build and Workflows

**TLDR:** Expo now supports MCP (Model Context Protocol) tools for interacting with EAS Build and Workflows, letting AI assistants query build status, inspect workflow runs, and investigate failures directly through conversational interfaces.

This is a practical integration that shows where MCP is heading. Instead of opening the Expo dashboard, navigating to your builds, finding the failed one, and reading through logs, you ask your AI assistant "what are my recent workflows?" and get a formatted table of results. Then you ask "what's the info for the failed iOS one?" and get a structured breakdown showing which job succeeded and which failed.

The demo is straightforward -- listing workflows, checking statuses, drilling into failures. It is essentially a conversational interface to the EAS API. But the implications are interesting for developer workflows. Debugging build failures is one of those context-switching tasks that pulls you out of your editor, into a browser, through multiple clicks, and then back. Having that information available in your coding environment through MCP reduces friction.

What is worth watching is whether this becomes a pattern. If every CI/CD provider, every cloud service, and every developer tool exposes MCP tools, the AI assistant becomes a universal dashboard. That is genuinely useful. But it also means your AI assistant needs access to all your production systems, which raises security and access control questions that nobody in the MCP ecosystem has fully answered yet.

**Key takeaways:**
- Query EAS Build and Workflow status through AI assistants via MCP
- Conversational debugging reduces context-switching for build failures
- Part of a broader trend of developer tools adopting MCP
- Access control and security for MCP-connected production systems remain open questions

**Link:** [MCP tools for EAS Build and Workflows](https://expo.dev/changelog/mcp-build-and-workflows)

---

## WebMCP: Chrome's Play for the Agentic Web

**TLDR:** Google has announced an early preview of WebMCP, a proposal for two new browser APIs that let websites define structured tools for AI agents to interact with, replacing brittle DOM scraping with explicit, declared capabilities.

This is Google trying to get ahead of the agentic web before it turns into a mess. Right now, AI agents interact with websites by scraping the DOM, clicking buttons, and hoping the page structure does not change. It is fragile, slow, and imprecise. WebMCP proposes a better way: websites explicitly declare what actions agents can take, using either a Declarative API (HTML forms for standard actions) or an Imperative API (JavaScript for complex interactions).

The use cases they highlight -- customer support ticket creation, e-commerce product search, travel booking -- are exactly the scenarios where current browser automation breaks constantly. If a travel site can declare "here is how to search for flights" as a structured tool, agents do not need to reverse-engineer the DOM or deal with dynamic loading states.

But here is what Google is carefully not saying: this is a power play. Whoever defines the standard for how AI agents interact with the web controls the agentic ecosystem. If WebMCP becomes the standard, websites will need to implement Google's APIs to be "agent-ready." That is a significant platform advantage. The fact that this is launching as an early preview program -- not an open standard through the W3C -- should give everyone pause.

There are also hard unsolved questions. How do you handle authentication in agent workflows? What about rate limiting agents versus humans? How do you prevent agents from taking actions the user did not intend? The announcement is deliberately vague on all of these. It is a vision document, not a specification. And the gap between a compelling vision and a working standard is where most web proposals go to die.

**Key takeaways:**
- Two new APIs: Declarative (HTML forms) and Imperative (JavaScript) for agent interactions
- Replaces brittle DOM scraping with explicit, structured tool definitions
- Early preview program, not yet an open standard
- Raises questions about who controls the agentic web standard
- Authentication, rate limiting, and intent verification remain unsolved

**Link:** [WebMCP is available for early preview](https://developer.chrome.com/blog/webmcp-epp)