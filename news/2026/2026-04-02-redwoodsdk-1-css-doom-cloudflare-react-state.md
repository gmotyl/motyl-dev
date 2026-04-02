---
title: "RedwoodSDK 1.0, CSS Renders DOOM, and Cloudflare Is Everywhere This Week"
excerpt: "This week's frontend news spans a Cloudflare-native React SDK hitting 1.0, a browser library that measures text without touching the DOM, Cloudflare secretly reading your React state on ChatGPT, and someone actually rendering DOOM in 3D using only CSS."
publishedAt: "2026-04-02"
slug: "redwoodsdk-1-css-doom-cloudflare-react-state"
hashtags: "#uidev #frontend #javascript #react #css #cloudflare #webperf #security #generated #en"
source_pattern: "ui.dev"
---

## RedwoodSDK 1.0: A Server-First React Framework Built on Cloudflare

**TLDR:** RedwoodSDK finally hit version 1.0 after six years of public development, committing fully to Cloudflare as its infrastructure layer and React Server Components as its programming model. It's a bet on "radical minimalism" over the service-soup most teams are running today.

**Summary:** RedwoodJS started in 2020 as Tom Preston-Werner's take on a full-stack JavaScript framework. Over time, lead developer Peter Pistorius left to build a startup on top of it, ran into real pain points wrangling infrastructure, and came back with a fundamentally different philosophy. The result is RedwoodSDK — a minimal, server-first SDK where everything flows through standard JavaScript imports and exports. No code generation, no file-based routing magic, no transpilation surprises.

What makes it interesting is the tight Cloudflare coupling. Workers, D1, R2, Queues, and AI are all treated as first-class primitives. Local development runs through Miniflare, which mirrors production closely enough that "it works on my machine" becomes less of a lie. RSC is available out of the box as a Vite plugin, and routes are just TypeScript functions. There's no REST layer required when a button can call a server function directly.

The piece I find genuinely clever is `useSyncedState`. It's a drop-in replacement for React's `useState` that syncs state across all connected clients via Cloudflare Durable Objects. No WebSocket handlers to write, no third-party pub/sub service to configure. That's the kind of abstraction that actually changes how you think about what's possible.

The trade-off is obvious: you're locking into Cloudflare's platform. The team is upfront about this, comparing it to how Evan You leaned into Vite with his own tooling choices. Whether the productivity gains justify the lock-in is a legitimate question, but the promise is that you stop thinking about infrastructure and start thinking about your application. For teams building in 2026, that's a real value proposition.

**Key takeaways:**
- RedwoodSDK 1.0 is fully server-first, built on Cloudflare Workers with RSC and server functions out of the box
- `useSyncedState` provides real-time state sync across clients without any WebSocket or pub/sub plumbing
- The framework trades platform independence for operational simplicity, a choice worth weighing carefully

**Why do I care:** For senior frontend developers, RedwoodSDK raises a question worth sitting with: at what point does platform lock-in become a feature rather than a bug? Most production apps are already deeply coupled to AWS or GCP primitives anyway. The difference here is that the coupling is explicit and the DX is designed around it. If Cloudflare's platform continues maturing, the teams that bet on it early will have significantly less infrastructure overhead. Worth watching, maybe worth trying on a greenfield project.

**Link:** [RedwoodSDK: A simple framework for humans](https://rwsdk.com/)

---

## Pretext: Text Measurement Without DOM Reflow

**TLDR:** Cheng Lou released Pretext, a JavaScript library that measures text height and line layout using canvas-based font metrics without ever triggering a DOM reflow. For virtualizing long text lists or implementing precise custom layouts, this fills a gap that has existed in the web platform for years.

**Summary:** If you've ever tried to virtualize a list of messages or build a text-heavy layout without knowing how tall each item will be, you know the pain. The browser's APIs for measuring text, like `getBoundingClientRect` and `offsetHeight`, all require a DOM layout pass first. That triggers reflow, which is one of the most expensive things a browser can do. Pretext sidesteps this entirely.

The library works by using the browser's canvas `measureText` API as ground truth for font metrics, then doing the line-breaking arithmetic itself in pure JavaScript. The `prepare()` function does the expensive work once: normalizing whitespace, segmenting the text, applying language-specific rules, and caching the measurements. After that, `layout()` is just arithmetic, running in about 0.09 milliseconds for a batch of 500 text blocks.

What I appreciate about the design is the separation between preparation and layout. You call `prepare()` once for a piece of text with a given font, then call `layout()` repeatedly as the container width changes during a window resize. That's the right mental model. The library also handles bidirectional text, emoji, and cross-language quirks, which is genuinely hard to get right.

More advanced use cases let you lay out lines manually, flow text around a floated image one row at a time, or compute the tightest container width that still fits the text. That last one, which the author calls "multiline shrink wrap," has been effectively missing from the web platform. The library supports rendering to DOM, Canvas, and SVG, with server-side rendering on the roadmap.

**Key takeaways:**
- Pretext measures text height and wrapping without touching the DOM, eliminating layout reflow entirely
- The two-phase API separates expensive preparation from cheap layout calculation, designed for resize-heavy scenarios
- It handles complex text including bidirectional strings, emoji, and mixed-language content correctly

**Why do I care:** Anyone building virtualized lists, chat interfaces, or collaborative document editors will immediately recognize the problem this solves. The status quo of guessing row heights or measuring everything upfront with hidden DOM nodes is embarrassing given how long we've been building UIs. Pretext is a low-level primitive, not a framework, and that's exactly what makes it useful. Worth adding to your toolkit before you need it.

**Link:** [GitHub - chenglou/pretext](https://github.com/chenglou/pretext)

---

## ChatGPT Won't Let You Type Until Cloudflare Reads Your React State

**TLDR:** A researcher decrypted 377 Cloudflare Turnstile programs embedded in ChatGPT and found that the bot detection goes far beyond standard browser fingerprinting. It specifically checks whether the ChatGPT React application has fully hydrated in the browser before allowing you to interact.

**Summary:** Every time you send a message on ChatGPT, a Cloudflare Turnstile challenge runs silently in your browser. Normally this sort of thing is treated as a black box. Someone went and decrypted it anyway, and the findings are genuinely interesting from both a security and a web architecture perspective.

The challenge arrives as about 28,000 characters of base64-encoded bytecode, encrypted with an XOR cipher. The key is embedded in the same payload, which means the "encryption" is really just obfuscation against casual inspection, not actual cryptographic protection. The decryption chain is straightforward once you know where to look, and the researcher cracked all 377 programs they tested.

Inside, the program collects 55 properties organized into three distinct layers. The first is standard browser fingerprinting: GPU details, screen dimensions, font measurements, storage quota. The second layer checks Cloudflare edge headers that only exist if the request actually passed through Cloudflare's network, filtering out bots that hit origin servers directly. The third layer is the one that caught my attention: it checks for `__reactRouterContext`, `loaderData`, and `clientBootstrap` on the DOM. These only exist if the React application has fully executed and hydrated.

The implication is that a headless browser that loads the HTML but skips JavaScript execution will fail this check. A bot that stubs out browser APIs without actually running React will fail too. Bot detection has moved from the browser layer to the application layer. Running alongside all of this is a behavioral biometric layer that monitors keystroke timing, mouse velocity, scroll patterns, and paste events. And a proof-of-work challenge adds compute cost for anyone trying to brute-force it.

**Key takeaways:**
- Cloudflare Turnstile on ChatGPT checks for React hydration state, meaning bot detection operates at the application layer, not just the browser layer
- The XOR "encryption" is obfuscation, not real cryptographic protection, since the key travels in the same payload
- Three detection layers run simultaneously: browser fingerprint, network origin validation, and application state verification

**Why do I care:** This is practically important if you're building any kind of automation against web applications, but more broadly it shows where bot detection is heading. Checking for application-layer state is a significant step up from checking browser APIs. For frontend architects, it's a reminder that your SPA's hydration state is observable from the outside in ways you might not have considered. It also raises legitimate questions about what "user data" means when a bot detection system is reading your application's internal React state.

**Link:** [ChatGPT Won't Let You Type Until Cloudflare Reads Your React State. I Decrypted the Program That Does It.](https://www.buchodi.com/chatgpt-wont-let-you-type-until-cloudflare-reads-your-react-state-i-decrypted-the-program-that-does-it/)

---

## CSS is DOOMed: Rendering DOOM in 3D with CSS

**TLDR:** Niels Leenheer built a fully playable version of DOOM where every wall, floor, barrel, and enemy is a div positioned in 3D space using CSS transforms. The game logic runs in JavaScript, but the rendering is entirely CSS, and the result is better than it has any right to be.

**Summary:** This project is genuinely ridiculous in the best possible way. Niels started with the original DOOM WAD file data, the same vertices, linedefs, sidedefs, and sectors the 1993 engine used, then built a CSS renderer on top of it. Each wall passes its raw DOOM coordinates as CSS custom properties. CSS then uses `hypot()` to calculate the wall width, `atan2()` to get the rotation angle, and `translate3d` plus `rotateY` to position everything in 3D space. The browser's CSS engine is doing the trigonometry.

The architecture has a clean separation: JavaScript runs the game loop and writes coordinates and state to CSS custom properties. CSS handles all the visual output. Opening a door means JavaScript sets a `data-state` attribute on the right DOM element and CSS handles the transition. Projectiles get their start and end positions set as custom properties and then fly from A to B via a CSS keyframe animation, with collision detection handled separately in JavaScript using the same linear math.

A few details stand out. The `@property` registration for custom properties is what makes animated transitions on things like light levels and player height possible at all. Without registering them as typed values, the browser treats them as strings and refuses to interpolate. Sprite billboarding, where enemies always face the camera, is handled with a `rotateY` that tracks the player's angle. The mirrored sprite trick from the original game, where DOOM only stores half the rotation angles and mirrors the rest, is replicated with a CSS `scaleX`. Texture alignment across adjacent floor sectors uses negative background-position offsets keyed to world coordinates so tiles never break at sector boundaries.

Performance is the honest weakness. Thousands of 3D-transformed DOM elements overwhelm browser compositors that were built for layered UI, not 3D scenes. The project includes both JavaScript-based and experimental pure-CSS culling to hide elements outside the view frustum. The pure-CSS version uses a technique called type grinding to toggle visibility using paused animation delays, since CSS can't yet use computed values in conditionals without the `if()` function that only just landed in Chrome. Browser bugs showed up in Safari and Chrome throughout development, from View Transitions flattening the 3D scene to background images set via custom properties causing massive re-rasterization.

**Key takeaways:**
- Modern CSS trig functions like `hypot()` and `atan2()` and registered custom properties via `@property` make genuine 3D rendering possible without JavaScript doing any of the math
- The strict separation between JavaScript game state and CSS rendering is the architectural insight worth taking back to production work
- Performance limits are real; browser compositors are not built for thousands of 3D-transformed surfaces, so culling is necessary and browser bugs are unavoidable at this scale

**Why do I care:** The fact that this works at all says a lot about how far CSS has come. `@property`, `hypot()`, `atan2()`, `anchor-positioning`, `clip-path` with `evenodd`, `shape()`, CSS-driven transitions triggered by attribute changes. These are all production-ready features being stress-tested in ways their spec authors never intended. The project serves as a kind of stress test for the entire CSS rendering pipeline. For anyone working on data visualization, game UI, or complex animations, the techniques here, especially the game-loop-to-CSS-custom-properties pattern, are genuinely worth studying.

**Link:** [CSS is DOOMed! Rendering DOOM in 3D with CSS](https://nielsleenheer.com/articles/2026/css-is-doomed-rendering-doom-in-3d-with-css/)

---

## Sentry's Debugging and Monitoring Cookbook

**TLDR:** Sentry published a recipe collection covering practical debugging and monitoring workflows for modern JavaScript apps, with a particular focus on AI agent observability and integrations with tools like Claude Code, Cursor, and the Sentry MCP server.

**Summary:** Cookbooks as a format work well for developer tools, and Sentry's collection covers ground that most teams would actually benefit from. The recipes span a range of difficulty levels, from beginner to intermediate, and cover React Native, Next.js, Node.js, and Python backends.

A few recipes stand out from the noise. Using the Sentry MCP server inside Cursor to pull production issues, trigger root cause analysis with Seer, and apply fixes directly in the IDE without copy-pasting stack traces is a genuinely useful workflow. The recipe for monitoring Claude Code sessions via a plugin gets you visibility into tool calls and agent behavior, which is increasingly relevant as more teams run AI coding agents in their pipelines.

There's also a recipe for monitoring AI agent costs and LLM calls in a Next.js app using the Vercel AI SDK, covering token usage, tool calls, and agent traces. As AI inference costs become a real budget line item, having observability into where tokens are going stops being nice-to-have and starts being necessary. The MCP server monitoring recipe, which wraps an existing MCP server with a single function call to get visibility into client activity and tool performance, also addresses a real gap since MCP hides errors from you by default.

**Key takeaways:**
- Sentry now has first-class recipes for AI agent observability, covering Claude Code, OpenCode, and MCP server monitoring
- The Cursor plus Sentry MCP workflow reduces the round-trip from production error to fix without leaving the IDE
- Monitoring LLM costs and token usage in Next.js apps via the Vercel AI SDK is now a beginner-level setup

**Why do I care:** Observability for AI agents is where application monitoring was for microservices about eight years ago. The tooling is immature, the failure modes are opaque, and most teams are flying blind. Sentry moving into this space with concrete recipes rather than vague promises is the right approach. If you're running any kind of agent-assisted development workflow or deploying LLM features to production, the monitoring recipes here are worth an afternoon to implement.

**Link:** [Cookbook: Debugging & Monitoring Recipes](https://sentry.io/cookbook/)
