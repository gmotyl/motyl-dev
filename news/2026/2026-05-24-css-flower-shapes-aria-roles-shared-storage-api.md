---
title: "CSS Flower Shapes, ARIA Roles Done Right, and the Shared Storage API"
excerpt: "A deep dive into CSS clip-path shapes, a practical primer on ARIA roles, and a look at Google's Shared Storage API for the post-third-party-cookie world."
publishedAt: "2026-05-23"
slug: "css-flower-shapes-aria-roles-shared-storage-api"
hashtags: "#tailwindweekly #tailwindcss #css #frontend #accessibility #javascript #html #performance #generated #en"
source_pattern: "Tailwind Weekly"
---

## Creating Flower Shapes Using clip-path: shape()

**TLDR:** The new CSS `shape()` function brings SVG-path-level expressiveness directly into clip-path, and this article proves it by building flower shapes from scratch using nothing but the `arc` command. The author shows how a Sass loop replaces hand-authored coordinates and reveals a lazy-but-correct browser trick where specifying a tiny radius lets the browser figure out the right value for you.

**Summary:** There is a moment in every developer's journey with CSS shapes where you hit the wall. Polygons get you rectangles and triangles. Circles and ellipses give you rounded blobs. But anything with real curves, anything that looks like it belongs in a design portfolio rather than a geometry textbook, has historically required SVG or JavaScript canvas tricks. The `shape()` function in CSS is trying to change that, and this article from Frontend Masters is a convincing demonstration of what is now possible.

The author zeroes in on the `arc` command within `shape()`, which draws elliptic arcs between two points. The geometry here is genuinely interesting. Given any two points and a radius, exactly two circles exist that intersect both points, and those two circles produce four distinct arcs: small clockwise, small counter-clockwise, large clockwise, and large counter-clockwise. That quartet of combinations is the foundation of every flower variation the article produces. The defaults are small and counter-clockwise, which produces the inverted version of the flower shape, a fact the author treats as a teaching moment rather than a gotcha.

What I find convincing about this approach is the use of Sass to generate the clip-path string programmatically. The author defines the radius and distance using trigonometric formulas, then runs a loop to place arc endpoints around a circle. This is not hand-crafted CSS; it is code generating CSS, which is the only sane way to handle shapes with ten or more control points. The compiled output is a single clip-path declaration, meaning the browser sees clean, straightforward CSS even if the source is a loop.

The tip about specifying a radius of 1% is worth lingering on. When you supply a radius smaller than half the distance between two points, no valid arc exists. The browser's error handling, defined in the spec, scales the radius up to the smallest value that works, effectively making the two circles degenerate into one. The author calls this "lazy but clever," and I agree. It is also a reminder that CSS specifications are more thoughtfully engineered than people give them credit for. There is explicit, deliberate error-handling logic written into the language for edge cases like this.

One thing the article does not address is browser support. As of writing, only Chrome, Edge, and Safari have full support. Firefox users will not see these shapes. For production use you would need a fallback, and the article offers none. That is a real gap. Stunning as these flower frames look on an image element, they are a progressive enhancement at best right now, not a deployment-ready technique.

**Key takeaways:**
- The `shape()` function in CSS accepts SVG-like path commands, including `arc`, enabling complex curves that `polygon()` cannot produce
- Four arc variants (small/large combined with clockwise/counter-clockwise) let you invert, petal, or wave any shape
- Sass loops are the practical way to generate these shapes without hand-authoring dozens of coordinates
- Specifying a near-zero radius tells the browser to resolve the geometrically valid minimum for you
- Browser support is currently Chrome, Edge, and Safari only; no Firefox support yet

**Why do I care:** From a senior frontend perspective, `shape()` is one of those CSS features that looks like a toy until you realize it replaces a whole category of SVG-in-HTML hacks. Applying a clip-path to an image element means no extra markup, no JavaScript, no SVG sprite maintenance. If Firefox ships support before the end of the year, this becomes a genuinely practical tool. Until then, use it for hero sections and marketing pages where progressive enhancement is acceptable, and do not let the geometry intimidate you.

**Link:** [Creating Flower Shapes using clip-path: shape()](https://frontendmasters.com/blog/creating-flower-shapes-using-clip-path-shape/)

---

## ARIA Roles Explained: A Practical Guide for Web Developers

**TLDR:** Level Access walks through what ARIA roles actually do, how the browser exposes them through the accessibility tree, and, most importantly, when you should not use them at all. The core message is that native HTML elements should be your first move, ARIA your last resort.

**Summary:** The phrase "just add ARIA" has caused more accessibility problems than it has solved. This article from Level Access is a useful corrective, written in a way that does not assume you have the WAI-ARIA specification memorized. It starts from first principles: browsers parse HTML into a DOM, then derive an accessibility tree from that DOM, and it is the accessibility tree that screen readers read. Native HTML elements already carry implicit roles in that tree. A `<button>` is a button. A `<nav>` is a navigation landmark. The moment you start building UIs out of divs and spans, you strip those semantics out and then need ARIA to put them back.

The article's most useful contribution is the taxonomy of role categories. Landmark roles (banner, navigation, main, region) let screen reader users jump between major page sections. Document structure roles describe headings, articles, and lists. Widget roles cover interactive components like checkboxes and grids. Composite widget patterns handle multi-element structures where parent-child relationships matter enormously to the accessibility tree. Live region roles handle dynamic content updates without moving focus. Window roles manage dialogs. Abstract roles exist only inside the ARIA spec itself and should never appear in HTML, a point the article makes clearly.

The section on common mistakes is where this article earns its place. The classic error, putting `role="button"` on a div, is covered, but the article goes further. It calls out overloading landmark roles, assigning the same role to multiple elements without unique labels, and using invalid or deprecated role values that cause assistive technologies to ignore elements entirely. That last one is particularly insidious: the page looks fine visually while screen readers get silence or gibberish.

What the article does not say loudly enough is that ARIA states and properties are just as important as roles. A `role="dialog"` with no `aria-labelledby` is only half-finished. A custom checkbox with `role="checkbox"` that does not toggle `aria-checked` on interaction is actively misleading to screen reader users. The article mentions states and properties, but it treats them as secondary to roles. In practice they are equally critical, and many real-world bugs stem from getting the role right and botching the states.

The testing section is also undercooked. "Test with NVDA and VoiceOver" is correct advice, but it glosses over how to test, what to listen for, and how to interpret unexpected announcements. That is a separate article, sure, but a guide calling itself practical should at least link to one.

**Key takeaways:**
- Semantic HTML always beats ARIA because native elements carry consistent implicit roles across browsers
- The accessibility tree is what screen readers actually use, not the DOM
- Six WAI-ARIA role categories exist: landmark, document structure, widget, composite widget, live region, and window
- Abstract roles are internal to the spec and must never appear in HTML markup
- ARIA states like `aria-expanded` and `aria-checked` are required alongside widget roles, not optional additions
- Test with real screen readers, not just automated tools

**Why do I care:** Accessibility is one of those areas where developers tend to either over-engineer it with ARIA sprinkled everywhere or ignore it entirely and ship divs pretending to be buttons. The "ARIA as last resort" mental model is the correct one, and it is worth drilling into every developer who touches a component library. The real cost of getting this wrong is not a failed audit; it is a real person who cannot use your interface. This article gets the big picture right even if the testing advice is thin.

**Link:** [ARIA Roles Explained: A Practical Guide for Web Developers](http://www.levelaccess.com/blog/aria-roles-explained-a-practical-guide-for-web-developers/)

---

## What Is the Shared Storage API?

**TLDR:** Google's Shared Storage API offers a way to store data that can be read across origins, but only inside secure, sandboxed worklets, not in page JavaScript. It is designed to preserve legitimate cross-site use cases, like frequency capping and A/B testing, after third-party cookies disappear.

**Summary:** Third-party cookies are going away, and the web has spent years trying to figure out what to replace them with. Partitioned storage, where each origin gets its own isolated bucket of localStorage and IndexedDB, solves the privacy problem but breaks a category of legitimate use cases that advertising and analytics teams depend on. Frequency capping (do not show this ad more than three times to the same user), A/B testing across properties, and aggregated reporting all require some notion of cross-site memory. Shared Storage is Google's Privacy Sandbox answer to that problem.

The architecture is deliberately restrictive in a way I respect. Data can be written to Shared Storage from any origin. Reading it, however, is locked inside worklets, small JavaScript environments that run in isolation with no access to the page's DOM or network. Worklets can act on the stored data, but they cannot leak it back to page-level JavaScript. This asymmetry is the whole point: the data is "unpartitioned" in the sense that multiple origins can write to the same bucket, but it is also "unreadable" in the conventional sense, so a tracker cannot just read your cross-site history and send it to a server.

Two output APIs sit on top of this: Select URL and Private Aggregation. Select URL lets a worklet choose from a predefined list of URLs, say, which ad creative to show or which variant of a feature to activate, without the page ever knowing which choice was made. Private Aggregation generates noised histograms for reporting, using differential privacy techniques to make sure no individual user's behavior can be identified even in aggregate.

The honest question to ask here is: who is this actually for? The answer is mostly large publishers and ad tech companies managing cross-site campaigns. For the average developer building a SaaS product or a content site, none of this is immediately relevant. But if you work anywhere near advertising, analytics, or multi-domain experiences, understanding Shared Storage now is worthwhile because the post-cookie world will be built on APIs like this one. Getting ahead of it means not scrambling when third-party cookies finally disappear for real.

**Key takeaways:**
- Shared Storage allows cross-origin data writes but restricts reads to isolated worklets, preventing data leakage to page JavaScript
- Select URL lets a worklet pick from a list of predefined content URLs for use cases like A/B testing or ad creative selection
- Private Aggregation produces privacy-safe, noised histograms for reporting without exposing individual user data
- The API is part of Google's Privacy Sandbox initiative and targets the gap left by third-party cookie deprecation
- Most relevant for ad tech, analytics, and multi-domain publishing use cases

**Why do I care:** I am skeptical of the Privacy Sandbox project in general, partly because it was designed by the same company that profits from digital advertising, but the Shared Storage API itself is technically interesting. The worklet isolation model is a clever constraint: it makes the API useful for legitimate purposes while making it genuinely difficult to abuse for tracking. Whether the overall ecosystem will land in a better place after cookie deprecation depends on a lot more than one API, but this is at least a thoughtful piece of the puzzle.

**Link:** [Tailwind Weekly #216 - What is the Shared Storage API?](https://tailwindweekly.com/issue-216/?attribution_id=6a11334f5ffd9e0001d6deab&attribution_type=post)

---

## OpenFlowKit: Free Local-First AI Diagramming for Builders

**TLDR:** OpenFlowKit is an open-source, local-first diagram tool that parses code (Prisma schemas, TypeScript, SQL, JSON) and generates living architecture diagrams with AI assistance. It also includes a cinematic export engine that renders architecture animations to MP4 without any keyframes.

**Summary:** Architecture diagrams are one of those things every team agrees they need and almost no team keeps up to date. The typical lifecycle is: someone makes a beautiful diagram in Figma or Miro during a planning session, it gets shared in Slack, and it is wrong within six weeks. OpenFlowKit is making a bet that the way to fix this is to generate diagrams from code rather than draw them by hand.

The core interaction is paste-and-parse. You drop in a Prisma schema, a TypeScript component tree, a SQL dump, or raw JSON and the AI engine infers the relationships and builds a canvas. This is a genuinely different approach from tools like Mermaid or PlantUML, which require you to write their own diagram syntax. The value proposition is that you are working with artifacts you already have, not a new format to maintain.

The technical architecture is more sophisticated than you would expect from a free tool. The project claims a four-layer design: a stateless React rendering layer, a CRDT collaboration mesh using Yjs and WebRTC, a headless DSL parsing engine with ELK.js for layout, and an LLM bridge that translates natural-language prompts into typed editor commands. That separation between rendering, state, and layout is the right call and the reason the tool can claim native performance without the bloat common in Electron-based diagram tools.

The cinematic export feature is the most novel thing here. The tool promises to take a static architecture diagram and produce a 60fps MP4 animation without requiring any keyframe authoring. Whether that actually produces useful output or just flashy footage depends on implementation, and the project is explicitly described as under construction. I would treat the export feature as interesting-in-principle and wait for real demos before counting on it for anything.

The local-first, MIT-licensed, bring-your-own-key approach is the right default for developer tooling. No SaaS lock-in, no surprise pricing, no third party reading your architecture diagrams. That alone makes this worth watching.

**Key takeaways:**
- Paste existing code artifacts (Prisma, TypeScript, SQL, JSON) and get auto-generated architecture diagrams
- Local-first with MIT license, no SaaS pricing or vendor lock-in
- Collaboration via Yjs and WebRTC with CRDT-based state management
- LLM bridge uses bring-your-own-key prompts translated into typed editor commands
- Cinematic MP4 export engine promises 60fps animations from static diagrams with zero keyframe authoring
- Project is early and under active construction

**Why do I care:** The graveyard of "diagrams as code" tools is large and the survivors (Mermaid, PlantUML, D2) all require you to learn their syntax. OpenFlowKit's pitch of parsing your existing code is more compelling, assuming the AI parsing is accurate enough to be trustworthy. Inaccurate auto-generated diagrams are arguably worse than no diagrams, because they create false confidence. If the parsing holds up, this fills a real gap. Worth a star on GitHub and a revisit in six months.

**Link:** [OpenFlowKit | Free Local-First AI Diagramming for Builders](https://openflowkit.com/)

---

## Locker: Self-Hosted Open-Source File Storage

**TLDR:** Locker is a self-hosted alternative to Dropbox and Google Drive that supports multiple storage backends (S3, R2, Vercel Blob, local disk) switchable via a single environment variable, with a fully type-safe tRPC API and built-in search inside PDFs and images.

**Summary:** The self-hosted software space has been growing steadily as developers get tired of services that change pricing, go defunct, or simply read your files to train models. Locker is a file storage platform that covers the basic Dropbox-style use case, upload, organize, share, team workspaces, while making the storage backend a configuration detail rather than a commitment.

The multi-store replication model is the feature I find most interesting. You attach multiple storage backends per workspace, designate one as the primary for writes, and configure others as writable replicas or read-only sources. This lets you run a local disk as your development backend, swap to S3 or Cloudflare R2 for production, and not change any application code. The single environment variable to switch backends claim is a bold one; real-world storage migrations are usually more complicated, but for greenfield projects the principle is sound.

The search-inside-PDFs-and-images feature is genuinely useful and often overlooked in self-hosted tools. Locker transcribes image and PDF content into searchable text, meaning a screenshot of a terminal session or a scanned contract is as findable as a plain text file. This is the kind of feature you only appreciate once you actually need it and discover that most tools simply index filenames.

The tRPC API deserves a mention. End-to-end type safety from the API client to the server is increasingly the standard expectation for TypeScript projects, and shipping a public API that is type-safe by default rather than an afterthought is the right call. It also makes integration work dramatically simpler for anyone building automations on top of their file storage.

The virtual bash shell, using familiar commands like `ls`, `cd`, and `grep` through a virtual filesystem API, is a curious feature. I am not sure who the target audience is: developers comfortable enough with the command line to want this would probably be fine with S3 CLI tools. But it is a nice quality-of-life touch.

**Key takeaways:**
- Four supported storage backends: local filesystem, AWS S3, Cloudflare R2, and Vercel Blob, switchable via one env var
- Multi-store replication with primary, writable replica, and read-only source configurations per workspace
- Content search inside PDFs and images via automatic transcription
- Full type-safe API using tRPC for programmatic integrations
- Role-based team workspaces with session-managed auth and Google OAuth
- Free, open source, MIT licensed, self-hosted

**Why do I care:** The case for self-hosting file storage is strong when you are dealing with sensitive documents, large files where egress costs matter, or clients who have data residency requirements. Locker hits the right notes: good defaults, flexible backends, type-safe API. The main question is operational burden. Running your own file storage means you own the backups, the uptime, and the security patches. For a team with a DevOps culture, that trade-off is worth it. For a two-person startup, probably not yet.

**Link:** [Locker | Open-Source File Storage Platform](https://locker.dev/)
