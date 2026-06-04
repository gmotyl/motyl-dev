---
title: "PolyCSS, TBT Windows, AI on the Web, and CSS Getting Smarter"
excerpt: "This week's Frontend Focus covers 3D mesh rendering in pure CSS, a subtle but important web performance metric gap, on-device AI landing in Edge, and a CSS function that may finally fix accessibility contrast failures at scale."
publishedAt: "2026-06-04"
slug: "polycss-tbt-window-ai-web-css-smarter"
hashtags: "#frontendfocus #css #html #frontend #webperf #accessibility #ai #devtools #generated #en"
source_pattern: "Frontend Focus"
---

## PolyCSS: Rendering 3D Meshes Directly in the DOM with CSS

**TLDR:** PolyCSS is a new open-source library that renders full polygon meshes as real DOM elements using CSS matrix3d transforms, no WebGL or canvas required. It supports OBJ, glTF, GLB, and MagicaVoxel VOX files with UV textures. React and Vue bindings are included out of the box.

**Summary:** I have to lead with this one because it genuinely surprised me. PolyCSS does something I would have told you was impractical: it takes 3D mesh files, the same formats you would load into Three.js or Blender, and renders each polygon as an individual DOM element positioned in 3D space using the matrix3d CSS transform. No WebGL context. No canvas taking over your layout. Just regular HTML elements with transforms applied.

The way it works is elegant in its stubbornness. Each polygon in a mesh becomes a leaf DOM node. The renderer picks the cheapest CSS primitive that can represent that polygon shape. Solid rectangles become styled block elements, triangles use corner-shape or border-width tricks, and textured surfaces use packed atlas sprites with CSS background positioning. The browser's compositor handles the layering. The result is a scene tree made entirely of ordinary DOM elements that you can click, style, and animate with standard CSS transitions.

The library ships as a monorepo with separate packages depending on your integration layer. There is a vanilla custom elements API where you drop in poly-camera and poly-scene tags, an imperative JavaScript API for direct control, and full React and Vue component bindings. You can even export a snapshot as a standalone HTML document with no runtime dependency, which is a neat capability for generating static previews.

Performance is the obvious question here. PolyCSS is honest about it: rendering through the DOM means the bottleneck is the number of mounted leaf elements and the texture atlas area the browser needs to paint. For complex scenes with thousands of polygons, you will feel that. But for hero sections, product showcases, interactive UI embellishments, or anything where you want 3D objects that respond to CSS and DOM events, this opens up options that did not exist before.

**Key takeaways:**
- PolyCSS renders polygon meshes as real DOM elements using CSS matrix3d, meaning each polygon is individually accessible to JavaScript events and CSS styling
- Supports OBJ, glTF, GLB, and VOX mesh formats with textures and materials; React and Vue bindings are available via separate packages
- Rendering happens through the DOM compositor rather than WebGL, which means performance scales with polygon count and is best suited for moderate complexity scenes

**Why do I care:** The ability to attach click handlers to individual polygons and animate them with CSS transitions is genuinely new territory. I have built 3D UIs with Three.js and R3F before, and the friction of bridging between the canvas world and the DOM world is real. PolyCSS sidesteps that entirely. I would not use it for a game engine, but for an interactive product page or a data visualization that needs to live inside a normal document flow, this is the most interesting CSS project I have seen in a long time.

**Link:** [PolyCSS - CSS 3D Engine for the DOM](https://polycss.com/)

---

## Front-End's Missing Metric: The TBT Window

**TLDR:** Harry Roberts documents a real incident where Total Blocking Time skyrocketed tenfold without any JavaScript changing. The culprit was a subtle interaction between TBT's measurement window and the deprecated Time to Interactive metric that still secretly defines TBT's upper bound. He proposes a new concept called the TBT Window to make this visible.

**Summary:** This is one of those articles that reframes something you thought you understood. Total Blocking Time is supposed to measure how much the main thread is blocked during page load. Most developers treat a TBT regression as a JavaScript problem: look for new bundles, heavier hydration, third-party scripts. Harry Roberts walked into a client situation where TBT jumped from 495ms to nearly 5,800ms, and after a careful investigation, he found that no JavaScript had meaningfully changed. The culprit was something almost nobody tracks anymore: Time to Interactive.

Here is the part that most developers miss. TBT does not sum all blocking work across the entire page load. It only sums blocking work between First Contentful Paint and Time to Interactive. TTI was retired from the Lighthouse performance score years ago, but it never stopped being the metric that defines the far edge of TBT's measurement window. If TTI moves later, the window grows, and long tasks that previously fell outside the measurement period suddenly get counted.

What moved TTI in this case was an LCP optimization. The team added a preload hint for the LCP image, which is exactly the right thing to do for user-perceived performance. But TTI's calculation includes a network quietness condition: it looks for a five-second window with no long tasks and no more than two in-flight GET requests. Adding one preload was enough to push the page past that network threshold, TTI drifted out to nearly twenty seconds, and the TBT window stretched across most of the page load timeline.

Roberts' advice is practical. If you monitor TBT, also plot TTI alongside it. Treat a TBT regression as suspicious only if TBT moves independently of TTI, or moves faster than TTI. And he makes a clear request to synthetic tooling vendors: surface the TBT Window directly on dashboards. DebugBear has already added it after he raised the issue with them.

**Key takeaways:**
- TBT is a windowed metric bounded by First Contentful Paint and Time to Interactive; TTI is deprecated from Lighthouse scores but still secretly controls TBT's upper bound
- An LCP preload optimization caused TTI to drift later by violating its network quietness condition, which widened the TBT Window and pulled previously out-of-scope long tasks into the metric
- The diagnostic fix is to track TBT and TTI together on your dashboards; a TBT spike that correlates with a TTI shift is likely a windowing artifact, not a genuine JavaScript regression

**Why do I care:** I have spent real hours debugging TBT spikes that turned out to be nothing. The idea that a successful LCP optimization can cause a catastrophic-looking TBT regression without changing a single line of JavaScript is the kind of thing that should be in every frontend performance handbook. The fix is not to revert the optimization. The fix is to understand what you are actually measuring.

**Link:** [Front-End's Missing Metric: The TBT Window](https://csswizardry.com/2026/06/front-ends-missing-metric-the-tbt-window/)

---

## Algorithmic Theming With CSS contrast-color(): Self-Correcting Color Systems

**TLDR:** The CSS contrast-color() function is now Baseline in Chrome 147, Firefox 146, and Safari 26, and it solves the problem of automatically choosing readable text colors against dynamic backgrounds without JavaScript. The Smashing Magazine deep-dive explains what it does, what it does not do, and how to combine it with color-mix() and relative color syntax for full theming engines.

**Summary:** Seventy percent of websites still fail basic WCAG contrast checks, according to the HTTP Archive. After years of JavaScript libraries, design system linters, and Sass functions, that number has barely moved. The article opens with that statistic and then makes a compelling argument: the reason the number never moved is that relying on runtime JavaScript for something this fundamental does not scale across the open web. The solution was always going to have to be native CSS.

contrast-color() is that solution. You pass it a color value, it gives you back either black or white, whichever has more contrast against the input. The browser runs the contrast math during style computation, before the page paints, in native code that has been optimized at the C++ level. No library, no build step, no hydration flash. Change a custom property at runtime and the text color updates instantly because the browser recomputes it.

The article is thorough about the gotchas, which I appreciate. The function currently only returns black or white; the Level 6 spec draft adds candidate color lists and target contrast ratios, but that is not shipping yet. When you animate a background from white to black, the text color does not smoothly interpolate because the output is always a discrete value. The snap point is not at the visual midpoint either: because WCAG luminance math is non-linear, the text stays black for most of a white-to-black animation and only snaps to white right at the tail end. That can look jarring. The article explains how to layer color-mix() on top to soften this.

One combination I found genuinely clever: feeding contrast-color()'s output back into oklch relative color syntax to produce tinted dark and light variants instead of pure black and white. You pull the background's hue back into the contrast color at a small chroma value, and your text reads as deep navy or pale ice instead of flat black and white. It adds personality without sacrificing readability, though the article correctly warns you to always verify the final value with an accessibility linter.

**Key takeaways:**
- contrast-color() is now Baseline across Chrome 147, Firefox 146, and Safari 26; it returns black or white based on WCAG contrast math during native style computation, eliminating the need for JavaScript contrast libraries
- The function eliminates SSR hydration flash for dynamic themes because the browser resolves the correct color before JavaScript loads
- It can be combined with color-mix() to soften the black-or-white output, and with oklch relative color syntax to produce hue-tinted contrast colors for richer design systems

**Why do I care:** The practical payoff here is real. I have ripped chroma.js and tinycolor2 out of production bundles before just to reduce runtime cost on themed component trees. Those libraries run on the main thread every time a dynamic background changes. Moving that math into native style computation is a genuine performance win, and the accessibility benefit is the more important story. If the browser handles contrast automatically, there is one fewer gap in the chain where accessibility quietly gets dropped.

**Link:** [Algorithmic Theming Engines: Building Self-Correcting Color Systems With contrast-color()](https://www.smashingmagazine.com/2026/05/building-self-correcting-color-systems-contrast-color/)

---

## Chrome DevTools for Agents 1.0: Your AI Coding Assistant Can Now See the Browser

**TLDR:** Google has shipped a stable 1.0 release of Chrome DevTools for agents, an MCP server that connects AI coding tools to live browser debugging capabilities. AI agents can now run Lighthouse audits, emulate devices, detect memory leaks, debug Chrome extensions, and take over authenticated browser sessions without re-authenticating.

**Summary:** The gap between AI coding tools and running code has always been the same problem: the AI can write a web app but cannot see what it looks like or observe how it behaves. Chrome DevTools for agents 1.0 closes that gap in a concrete way. The release provides three surfaces: an MCP server for LLMs, a command-line interface for batching actions into scripts, and a set of agent skills that teach the AI how and when to use specific debugging capabilities.

The 1.0 feature set is substantial. AI agents can run Lighthouse audits programmatically, which means they can act as a quality gate catching accessibility, SEO, and performance issues before they reach production. They can emulate devices, resize viewports, simulate geolocations, and throttle network and CPU speeds without a human manually dragging a browser window. For Chrome extension development, agents can install, reload, and trigger extension actions directly, automating the save-and-refresh cycle that makes extension development tedious.

Two features stand out to me as particularly useful. The first is session handover: you can share your current authenticated browser context with an agent rather than having it spin up its own sandboxed session. This means the AI can investigate a production bug in an authenticated dashboard without you setting up all the credentials again. The second is the dedicated memory analysis tooling. Heap snapshot analysis for detecting detached DOM nodes has always been a slow and manual process. Having an agent that understands memory leak debugging skills and can run that investigation automatically is a meaningful productivity gain.

The release also includes deep integration with WebMCP, Google's emerging proposal for web pages to expose structured tools to visiting AI agents. With DevTools for agents, you can list, invoke, and validate WebMCP tools in real time during development, which should make building and testing that integration much smoother.

**Key takeaways:**
- Chrome DevTools for agents 1.0 ships as a stable MCP server, CLI, and agent skill set; AI coding assistants can now run Lighthouse audits, emulate devices, debug memory leaks, and develop Chrome extensions without human browser interaction
- Session handover allows sharing an authenticated browser context with an agent, enabling debugging of login-protected dashboards without re-authenticating
- Compatible with Claude Code, Gemini CLI, and Antigravity; install instructions are straightforward for each

**Why do I care:** I use Claude Code daily, and the idea that it can now actually observe the running application instead of just reasoning about code is a real workflow change. The Lighthouse-as-quality-gate pattern is particularly interesting to me. Rather than running audits manually before a PR, an agent that checks accessibility and performance as part of the coding loop could catch regressions the moment they are introduced.

**Link:** [Streamline your AI coding workflow with Chrome DevTools for agents 1.0](https://developer.chrome.com/blog/devtools-for-agents-v1)

---

## Expanding On-Device AI in Microsoft Edge: New Models and APIs

**TLDR:** Microsoft Edge is shipping three significant on-device AI updates: a developer preview of the Aion-1.0-Instruct small language model, Language Detector and Translator APIs now stable in Edge 148, and experimental on-device speech recognition via the Web Speech API in Edge Canary.

**Summary:** Edge has been quietly building out a compelling on-device AI story, and this release moves that work meaningfully forward. The original Phi-4-mini model that powered Edge's Prompt and Writing Assistance APIs was capable, but its hardware requirements limited which devices could actually use it. The new Aion-1.0-Instruct preview addresses that directly. It is smaller and faster, extends support to devices with limited GPUs, and through CPU inference, works even without a GPU at all. Microsoft is planning an open-source release on Hugging Face in July.

The Language Detector and Translator APIs landing in Edge 148 are the most immediately practical addition. These are proper web APIs powered by on-device task-specific models baked into the browser. They support 145 languages, deliver fast translation without network round-trips, and cost nothing in terms of API fees. The privacy and latency benefits over cloud-based translation services are obvious. The API surface is simple enough that you can detect a language or translate a string in just a few lines of JavaScript.

On-device speech recognition via the Web Speech API is still experimental and limited to Edge Canary and Dev channels, but the approach is interesting. Rather than routing speech recognition through cloud services, the browser handles it locally using a task-specific model. You opt in by setting a processLocally flag on the SpeechRecognition instance. Better privacy, lower latency, and the ability to function without network connectivity are all genuine improvements for applications that use voice input.

What I find most interesting here is the direction. Browser vendors are effectively becoming AI infrastructure providers, shipping models as built-in browser capabilities. The translation and language detection use case is the strongest argument for this approach: it is the kind of ubiquitous, privacy-sensitive operation that should never require a cloud roundtrip.

**Key takeaways:**
- Language Detector and Translator APIs are stable in Edge 148, supporting 145 languages with on-device models that provide fast, private, free translation without cloud services
- Aion-1.0-Instruct is a smaller, more efficient model than Phi-4-mini that extends on-device AI to lower-spec hardware; planned open-source release on Hugging Face in July
- On-device speech recognition via Web Speech API is in Edge Canary with a processLocally opt-in flag, offering lower latency and better privacy for voice-input applications

**Why do I care:** The translation API is something I have wanted at the browser level for years. Every internationalized web app I have worked on eventually ends up paying for a cloud translation service or shipping a JavaScript-based detection library that adds weight to the bundle. Having this built into the browser as a fast, private, free capability changes the economics of i18n for smaller projects.

**Link:** [Expanding on-device AI in Microsoft Edge: New models and APIs for the web](https://blogs.windows.com/msedgedev/2026/06/02/expanding-on-device-ai-in-microsoft-edge-new-models-and-apis-for-the-web/)

---

## Intentionally Blocking Rendering with JavaScript: A Case for blocking="render"

**TLDR:** The blocking="render" attribute on script tags is a well-supported but underused tool for eliminating flash-of-unstyled-content in components that depend on JavaScript for their initial layout. Jay Freestone walks through exactly when and how to use it.

**Summary:** The conventional wisdom about JavaScript and rendering is clear: defer everything, load asynchronously, never block the parser. That advice is correct for almost every situation. But there is a small, specific class of problem where you genuinely want JavaScript to run before the browser paints anything, and for those cases, the blocking="render" attribute is the right tool.

The scenario Jay describes is a component whose correct initial state depends on measuring the DOM. The priority-plus navigation pattern is the canonical example. You have a navigation bar with a variable number of items of unknown width. Items that overflow need to move into a dropdown. You cannot know which items overflow until they are actually in the document. If JavaScript loads after paint, the user sees a flash of the full navigation list before the overflow items disappear. That flash is jarring and looks like a bug even though the final state is correct.

Traditional inline scripts and parser-blocking scripts do not reliably solve this either. The browser may choose to paint whatever it has received before the blocking script fires. What blocking="render" does is explicitly hold off all painting until the tagged script has been parsed and evaluated, while still allowing the HTML parser to continue reading the rest of the document. That is a meaningful improvement over old-style render-blocking scripts, which also blocked parsing.

The attribute works with inline scripts, external scripts, and module scripts. Jay is clear that this should be used sparingly and only for small, inline scripts. The moment you introduce a network request for the script, you are adding significant latency that almost certainly makes the cure worse than the disease.

**Key takeaways:**
- The blocking="render" attribute on script elements explicitly holds browser painting until the script evaluates, without blocking the HTML parser, making it strictly better than traditional parser-blocking scripts for this use case
- Best suited for small inline scripts that measure layout to set up components before paint; the priority-plus navigation pattern is the clearest practical example
- Works with type="module" and external scripts, but any network dependency makes it unsuitable; keep it inline and small

**Why do I care:** I have fought the flash-of-unstyled-content battle with custom elements and web components more than once, and the solutions I ended up with were always inelegant. Either hiding the component with visibility: hidden until a class swap, or accepting the flash. Knowing that blocking="render" exists and is well-supported changes how I would approach those problems going forward.

**Link:** [Intentionally blocking rendering with JavaScript](https://www.jayfreestone.com/writing/intentional-render-blocking-javascript/)

---

## Accessible Split-Cell Table Headers: Eric Meyer Works Through a Hard Problem

**TLDR:** Eric Meyer documents his attempt to build an accessible split-diagonal table header cell of the kind seen in historical NASA documentation, walking through multiple revisions based on feedback from accessibility experts, including a Safari-specific workaround he openly describes as gross but functional.

**Summary:** This is the kind of article that I find genuinely enjoyable to read, not because it presents a clean solution but because it documents the full messy process of solving a hard accessibility problem in CSS. The starting point is a real table from Apollo 16 documentation where the top-left header cell is split diagonally to label both the row dimension and the column dimension. It is a common table pattern in printed documents and a notoriously difficult one to reproduce accessibly in HTML.

Meyer's first instinct was to use absolutely positioned spans inside the header cell. He tried something different, using two separate rows in the table head, with the first row containing the column headers plus the diagonal cell, and a second row containing the row dimension label. The semantic intent was cleaner, but accessibility experts Alice Boxhall and Adrian Roselli identified that an incomplete row in the thead fails WCAG 1.3.3. The fix required adding rowspan attributes to the column headers so that the grid of cells remained complete.

The visual split is achieved through CSS: a linear gradient draws the diagonal line, and absolutely positioned elements handle the layout. It mostly works. Safari, as of this writing, does not apply relative positioning to thead elements, which is a known bug. The workaround Meyer landed on involves using the font: -apple-system-body feature query to detect Safari and apply a completely different layout approach for that browser. He describes this workaround clearly, and I respect that honesty.

The article ends with an open question: Meyer cannot fully test his solution against every screen reader, so he is explicitly asking the accessibility community to try it and report back. That is the right approach.

**Key takeaways:**
- Split-diagonal table header cells require rowspan attributes on adjacent headers to maintain a complete cell grid, which is necessary for WCAG 1.3.3 compliance
- Safari does not support relative positioning on thead elements, requiring a separate @supports-based CSS workaround using the -apple-system-body font feature query as a browser detection mechanism
- The visual diagonal is achievable with a CSS linear gradient background; SVG would be more appropriate for production use

**Why do I care:** Tables are one of those areas where I have seen developers give up and reach for non-semantic markup because the CSS gets difficult. The fact that Eric Meyer is still finding genuinely hard unsolved problems in HTML table semantics in 2026 is a useful reminder that "just use a div" is not actually the path of least resistance when accessibility is a real requirement.

**Link:** [Accessible (I Think) Split-Cell Table Headers](https://meyerweb.com/eric/thoughts/2026/05/28/accessible-i-think-split-cell-table-headers/)

---

## Keyboard Accessibility: The Clearest Signal of Digital Maturity

**TLDR:** Dennis Deacon makes the case that keyboard navigation is not an accessibility edge case but the structural foundation from which all other accessibility considerations extend. A product that works well with a keyboard is a product built correctly.

**Summary:** This is an opinion piece and it does not pretend otherwise. The argument is that unplugging your mouse is the fastest and most revealing test you can run on a product's accessibility posture. If a user cannot complete meaningful tasks using only Tab, Shift+Tab, Enter, Spacebar, Arrow keys, and Escape, the product has a structural problem. Not a cosmetic one. The distinction matters because cosmetic problems get addressed in QA; structural problems require architecture changes.

The article runs through the most common failure modes with some directness. Suppressing the browser's default focus ring without replacing it is described not as an aesthetic choice but as a decision that makes navigation guesswork for keyboard users. Tab order that follows document source order but not visual reading order creates disorientation in complex layouts. Custom interactive components built on non-semantic HTML accumulate accessibility debt that is rarely paid down. Keyboard traps in dialogs and custom widgets are barriers that force users to close the browser tab and start over.

The point about native HTML elements is one I agree with strongly. The closer you stay to button, a, input, select, and their kin, the more free keyboard behavior you get without any additional code. Every custom-built interactive widget is a commitment to correctly implementing the ARIA patterns that native elements provide for free.

Deacon closes with a simple call to action: build a keyboard testing checklist, tie it to your definition of done, require it before every release. No special tools needed. Just a keyboard and a real user task.

**Key takeaways:**
- Every interactive element must be reachable and operable with a keyboard; if it cannot receive focus, it is functionally invisible to keyboard users
- Focus indicators are a design requirement and should be treated as a core design system component, not an afterthought or a browser default to suppress
- Keyboard testing requires no budget or specialist tools: unplug the mouse, attempt a real user task, and act on what you find

**Why do I care:** I have reviewed codebases where the entire navigation was built as a series of div elements with onClick handlers, and the product team was genuinely surprised when I pointed out that none of it was keyboard accessible. The argument that keyboard accessibility is a compliance checkbox is exactly the wrong frame. It is a quality signal. A product that works with a keyboard tends to be a product with clean semantic structure, predictable focus management, and correct ARIA roles throughout.

**Link:** [Keyboard Accessibility: The Clearest Signal of Digital Maturity](https://www.dennisdeacon.com/accessibility/keyboard-accessibility-the-clearest-signal-of-digital-maturity/)

---

## Liquid DOM: WebGPU Liquid Glass for the Web

**TLDR:** Liquid DOM is a monorepo bringing Apple's liquid glass visual effect to the web via WebGPU, with React bindings, Three.js integration, and a React Three Fiber bridge. It requires Chrome's Canvas Draw Element experimental flag for DOM-backed content.

**Summary:** Apple introduced liquid glass as a design language, and it was probably inevitable that someone would build a web implementation. Liquid DOM is that implementation, and it is more architecturally serious than I expected. The monorepo is split into distinct layers: a renderer-agnostic layout engine, a core package with the WebGPU renderer and scene graph, React bindings for declarative layout, and adapters for Three.js and React Three Fiber.

The package structure is designed around letting you use the lowest-level API that matches your renderer. If you already have a Three.js WebGPU scene, the Three adapter composites liquid glass as a post-processed layer over it. If you are building in React without any existing 3D context, the React package owns the canvas and exposes a declarative component API. The layout engine is deliberately renderer-agnostic, described as SwiftUI-style measurement and placement.

The hardware requirements are real. Liquid glass rendering requires WebGPU, which narrows the audience considerably. DOM-backed content additionally requires an experimental Chrome flag for the HTML-in-Canvas API. These are not dealbreakers for an effects library, but they mean this is a progressive enhancement tool rather than a production baseline.

What interests me here is the technical approach of using the HTML-in-Canvas API to copy live DOM content into GPU textures. That means the glass effect can be applied over actual rendered HTML, not just flat colors or images. The potential for UI effects that interact with real page content in real time is genuinely new.

**Key takeaways:**
- Liquid DOM requires WebGPU and, for DOM-backed content, Chrome's experimental Canvas Draw Element flag; it is a progressive enhancement capability, not a baseline feature
- The monorepo architecture separates the layout engine from rendering concerns, with packages for vanilla JavaScript, React, Three.js, and React Three Fiber targeting different integration needs
- DOM-backed content is copied into GPU textures via the HTML-in-Canvas API, enabling glass effects applied over actual rendered HTML elements

**Why do I care:** I am skeptical of the liquid glass aesthetic as a UI design choice, but the technical implementation here is worth understanding. The architecture of separating layout from rendering and providing multiple integration points is a pattern I would apply to any rendering library. And the use of HTML-in-Canvas as a GPU texture source is an approach I had not seen used this way before.

**Link:** [GitHub - AndrewPrifer/liquid-dom: Liquid Glass for the Web](https://github.com/AndrewPrifer/liquid-dom)

---

## State of AI 2026: AI-Generated Code Now at 54%, Developers Remain Skeptical

**TLDR:** The 2026 State of Web Dev AI survey gathered responses from 7,258 developers and found that the proportion of AI-generated code jumped from 28% to 54% year-over-year. Most respondents believe we are in an AI bubble and cite hallucinations and code quality as the primary pain points.

**Summary:** The survey numbers here are striking enough to be worth discussing, even with the self-selection caveat acknowledged upfront. An AI-focused survey is going to attract developers who already use AI, so these figures likely skew higher than the industry average. But directionally, the trend is clear: AI-assisted coding has moved from early-adopter territory into something much closer to standard practice. The average proportion of AI-generated code among respondents doubled in one year.

Claude is the model developers pay for most, which says something interesting about the difference between free usage and actual production trust. ChatGPT has higher total reach by name recognition, but when developers or their companies are spending real money, Claude leads. That gap between popularity and paid adoption is worth noting.

The pain points data is the most honest part of the survey. Hallucinations and inaccuracies top the list, followed by code quality concerns. These are not peripheral complaints. They are the central tension in AI-assisted development: the tools are fast and often impressively capable, but they produce output that requires careful review, and that review cost can eat into the productivity gains. The percentage of respondents who see AI as a job security threat is split but leans toward concern, which is unsurprising given the pace of capability improvement.

What strikes me is that the survey also shows growing AI spend, with respondents reporting higher monthly costs than last year. Once you are dependent on AI tooling, the price sensitivity decreases. That is a pattern that benefits AI companies and probably should make developers think carefully about build versus buy decisions in their toolchains.

**Key takeaways:**
- AI-generated code proportion among respondents jumped from 28% to 54% in one year; the percentage using AI "constantly" doubled year-over-year
- Claude is the model developers and companies actually pay for most, despite ChatGPT having higher overall name recognition and free usage
- Hallucinations and code quality are the top pain points; most respondents believe we are in an AI bubble, and job displacement is the most commonly cited AI risk

**Why do I care:** I use AI coding tools every day and I have opinions about both their strengths and their limitations. The survey confirms what I see in my own work: the adoption is real, the productivity gains are real, and so are the quality concerns. The 54% figure means that in most teams that use these tools, more than half the code being written has AI in its lineage somewhere. That changes how you need to think about code review, testing, and architectural discipline.

**Link:** [State of AI 2026](https://2026.stateofai.dev/en-US)

---

## VS Code 1.123: Session Sync, Research Agent, and Integrated Browser Updates

**TLDR:** VS Code 1.123 ships automatic chat session sync across machines with a searchable coding history, a new research agent for deep topic investigation, a side-by-side agents window for comparing sessions, and integrated browser improvements including area screenshots and page favorites.

**Summary:** The VS Code release cadence continues to be relentless, and 1.123 is a substantial one for developers who use the Copilot agent features heavily. Session sync is the headline addition: your chat sessions now automatically back up to your GitHub account and become searchable across machines and workspaces. Each session captures not just the conversation but the files you touched, the repository context including branch and timestamps, and any pull requests, issues, or commits referenced. The new slash command lets you query that history in natural language, generate standup reports, or search by topic and file.

The research agent is currently preview-only in Copilot CLI local sessions, but what it does is clearly useful. When you need to understand an unfamiliar API, compare architectural approaches, or investigate how a library works, a quick chat answer is often not enough. The research agent is designed for depth: it synthesizes information from your codebase, relevant GitHub repositories, and the web, and returns a well-cited Markdown report. It is read-only by design, which makes it trustworthy for investigation without any risk of changes.

The agents window preview now allows multiple sessions open side-by-side, with pinning support so you can keep a reference session visible while working in another. This is genuinely useful for comparing approaches or reviewing another agent's work while running your own session.

The integrated browser additions are smaller but practical. You can now favorite pages in the address bar and take area screenshots or full-page screenshots to attach directly as context in chat. For UI debugging workflows, having the browser and the AI context window tightly integrated like this reduces the steps between observing a layout problem and asking the AI to help fix it.

**Key takeaways:**
- Chat session sync backs up your full coding history to GitHub and makes it searchable across machines; the chronicle slash command enables natural-language queries over past work
- The research agent (preview, Copilot CLI only) produces deep, well-cited Markdown reports on topics you specify, with read-only access to codebases, GitHub repos, and the web
- Area and full-page screenshot capture in the integrated browser can be attached directly as chat context, tightening the loop for UI debugging

**Why do I care:** The session sync feature addresses something I have wanted for a long time. I work across multiple machines and the context loss when switching environments is a real friction point. Having a searchable history of what I was investigating, which files were involved, and what the conversation looked like means I can resume where I left off without spending the first ten minutes reconstructing context.

**Link:** [Visual Studio Code 1.123](https://code.visualstudio.com/updates/v1_123#_integrated-browser)

---

## What's New on the Web Platform in May 2026

**TLDR:** May 2026 brought CSS :open pseudo-class to Baseline, container style queries for custom properties to Baseline, native lazy loading for audio and video elements, and Document Picture-in-Picture landing in Firefox for desktop.

**Summary:** The web platform release notes for May cover a surprisingly satisfying set of baseline arrivals. The CSS :open pseudo-class is now available across browsers after Safari 26.5 added support. It gives you a semantic way to style elements in their open state, covering details, dialog, select, and date picker inputs when their picker is showing. This is cleaner than targeting the open attribute directly and covers more element types.

Container style queries for custom properties are now fully cross-browser after Firefox 151 shipped them. You can query a parent container to check if a custom property like --theme is set to dark and apply styles accordingly. This has been partially available for a while, but having it reliable across all three major engines changes whether you can actually use it in production.

The native lazy loading for video and audio via loading="lazy" is a welcome ergonomic improvement. The same attribute that works on images and iframes now defers media loading until the element approaches the viewport, without any JavaScript or Intersection Observer setup required.

Document Picture-in-Picture landing in Firefox desktop is also notable. Unlike standard video PiP, the Document PiP API lets you open an always-on-top window containing arbitrary HTML content. Video conference participant grids, interactive stock tickers, timers that persist while navigating, these are all patterns that now work across Chrome and Firefox desktop.

**Key takeaways:**
- CSS :open pseudo-class is now Baseline Newly Available; it styles details, dialog, select, and input picker elements when in their open state
- Container style queries for custom properties are Baseline Newly Available across Chrome, Firefox, and Safari; you can query parent custom properties like --theme: dark without JavaScript
- Native loading="lazy" for video and audio elements shipped in Chrome 148, deferring media loading until near the viewport with no JavaScript required

**Why do I care:** Container style queries for custom properties are the feature I am most excited about in this batch. The ability to create truly context-aware components that respond to custom property values on ancestor containers is something I have been working around with workarounds for a couple of years. Having it reliable in all three engines means I can finally stop reaching for JavaScript-based context or class-toggling for theme-aware component patterns.

**Link:** [What's New on the Web Platform in May 2026](https://web.dev/blog/web-platform-05-2026?hl=es-419)
