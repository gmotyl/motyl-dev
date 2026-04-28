---
title: "Bytes 481: Rspack 2.0, Fresh ships zero JS, and async pays its tab"
excerpt: "Rspack stops being a faster webpack, Fresh 2.3 finally honors zero-JS, AI builds an Angular compiler in Rust, and async/await collects the bill for fifteen years of progress."
publishedAt: "2026-04-28"
slug: "ui-dev-bytes-481-rspack-fresh-async"
hashtags:
  - "#uidev"
  - "#rspack"
  - "#fresh"
  - "#angular"
  - "#async"
  - "#responsiveimages"
  - "#generated"
  - "#en"
source_pattern: "ui.dev"
---

## Rspack 2.0 stops being "a faster webpack"

**TLDR:** Rspack 2.0 ships, drops the "we are webpack but in Rust" pitch, and starts adding modern build defaults including pure ESM, smarter tree shaking, and first-class agent support.

**Summary:** For two years Rspack had a single sentence on the tin. It was webpack with the API you know and a Rust core that ran roughly ten times faster. The pitch worked. Weekly downloads went from one hundred thousand to five million, and v1.0 reached parity with webpack's plugin surface in August of 2024. Now they want a different conversation.

The 2.0 release tightens the screws on performance first. Builds clock in around ten percent faster than 1.7 and roughly twice as fast as 1.0. Persistent cache plus the SWC minimizer adds another fifty percent on cached hits, memory drops by a fifth, and `@rspack/dev-server` cut its dependency tree from one hundred ninety two npm packages down to one. That last number alone tells you what the team has been thinking about.

The bigger change is taste. Core packages went pure ESM. `import.meta` works the way you expect, `import defer` is supported, and there is a new modern-module output mode for libraries that downstream tools can actually tree shake. CommonJS destructuring, inline `import()`, and Module Federation shared dependencies all get analyzed properly now. There is even experimental support for the `#__NO_SIDE_EFFECTS__` annotation so you can tell the bundler "trust me on this one."

The framing matters more than any individual feature. Rspack now sits at the center of a small toolchain alongside Rslib, Rsbuild, and Rsdoctor. The webpack ecosystem is the install base, not the destination.

**Key takeaways:**
- Builds about 2x faster than 1.0 with persistent cache hitting another 50% on top
- Core packages are pure ESM with proper `import.meta` and `import defer` handling
- Tree shaking now understands CJS destructuring, inline dynamic imports, and Module Federation shared deps
- Rspack is positioning itself as a JS toolchain hub, not just a webpack replacement

**Why do I care:** I have spent enough years apologizing to teammates about webpack memory profiles to take a ten percent improvement personally. The interesting bit is not the speed though, it is the willingness to break out of the compatibility cage. Compatibility was the right strategy for v1, because nobody migrates a build pipeline for fun. But once you have the install base, staying chained to webpack's defaults is a tax. I have seen too many builds where the bundler was the slowest thing in CI, and the slowest thing in dev, and somehow also the most fragile. If Rsbuild can give a team modern defaults without a six week migration plan, that is the actual product. The Rust speedup is the marketing. I am still going to insist new projects start with Vite, but for the long tail of webpack codebases at work, this is the first credible escape hatch in years.

**Link:** [Rspack 2.0](https://rspack.rs/)

## Fresh 2.3 ships zero JavaScript by default, for real

**TLDR:** Deno's Fresh 2.3 finally lives up to the no-JS promise it has been making since launch, adds View Transitions, ships first-class WebSockets, and threads OpenTelemetry from server to browser.

**Summary:** Fresh has been telling everyone for years that pages ship no JavaScript unless they ask for it. That was technically a lie. Every page included a small client bootstrap to wake up islands and the partials engine, even when neither was on the page. Five to nine kilobytes gzipped of code that did nothing for plenty of routes.

In 2.3 the framework checks whether a page actually uses islands or `f-client-nav` before injecting anything. If it does not, the response has no script tag, no module preload header, and no client bundle. Static pages stop shipping JavaScript the moment you upgrade. There is nothing to configure. I appreciate that.

View Transitions get wired into the existing partials system through one attribute on the body element. Fresh wraps partial navigations in `document.startViewTransition()` and you style the rest with the regular pseudo-element selectors. Browsers without support fall back to normal partial updates, which is the only sensible behavior and exactly what you want. WebSockets got built in too, with a clean `app.ws()` method, a file-route `ctx.upgrade()` flavor, and a bare mode for chat-room style fan-out where you need to keep sockets in a shared set.

The Vite integration cycle is where most of the work went. CJS-to-ESM transforms now run through Vite directly, two Babel passes were dropped, Radix UI and other npm packages work without manual aliasing, and the dev server stops crashing on editor swap files. The OpenTelemetry support also injects a `traceparent` meta tag into the HTML so browser-side spans can connect back to the server trace, no code changes required on your end.

**Key takeaways:**
- Static Fresh pages now ship 0 KB of JS by default with no script tag, no preload, no bundle
- `f-view-transition` adds View Transitions to partial navigations through one attribute
- WebSockets are built in via `app.ws()`, `ctx.upgrade()`, and a raw mode for shared sockets
- CSP nonce middleware and IP filter middleware ship in the box
- `traceparent` meta injection links server traces to browser-side telemetry SDKs

**Why do I care:** The "zero JS" claim has been the marketing wedge for half a dozen frameworks now and most of them lie about it the same way Fresh did. There is always a tiny boot script. Fresh actually fixing it matters because it is a forcing function for the rest of the framework world to either match the claim or stop making it. The View Transitions wiring is the right shape too. One attribute, fall back gracefully, lean on the platform. That is how this stuff should be added. The OpenTelemetry meta tag is the small detail I like most. Linking client spans to server spans without instrumenting either side is the kind of thing you only think to ship if you have personally tried to debug a cross-stack performance issue at 2am. Someone on this team has.

**Link:** [Fresh 2.3 on Deno's blog](https://deno.com/blog/fresh-2.3)

## The end of responsive images, finally

**TLDR:** Mat Marquis, who chaired the responsive images working group, confesses he hated `sizes` the whole time, and explains how `sizes="auto"` plus `loading="lazy"` finally lets the browser figure it out for you.

**Summary:** Mat spent fourteen years championing a syntax he hated. The picture element he is fine with. The `srcset` attribute is fine, easy enough for a CMS to spit out a comma separated list of widths and let the browser pick. The `sizes` attribute is what he wanted to torch from the day it shipped, and now he gets to.

The reason `sizes` exists at all is timing. The browser had to make image requests before it knew anything about the layout, so somebody had to describe the layout in advance. That somebody was you, in an HTML attribute, as a string of media queries that no human should ever write by hand. The example he gives, `(min-width: 1340px) 257px, (min-width: 1040px) calc(24.64vw - 68px), (min-width: 360px) calc(28.64vw - 17px), 80px`, is from a relatively simple layout. He calls it disgusting. He is not wrong.

The fix landed quietly when WebKit and Gecko aligned with Blink on `sizes="auto"`. If an image uses `loading="lazy"`, the browser already has the layout in hand by the time it requests the source, so it does not need you to describe anything. You write `sizes="auto"` and the browser uses what it actually measured. Browsers without support ignore the auto value and fall back to the rest of the attribute. You can ship this today. WordPress already did, via a patch from another responsive images alum.

There is a footnote. Images above the fold are bad candidates for `loading="lazy"` because they are usually your Largest Contentful Paint. For those, you still write a `sizes` value, but it is almost always `100vw` or close to it, which is the only kind of `sizes` value that was ever pleasant to write.

**Key takeaways:**
- `sizes="auto"` plus `loading="lazy"` lets the browser measure layout itself before requesting
- Now supported in Blink, Gecko, and WebKit, with graceful fallback in older browsers
- Hand-written `sizes` strings are no longer needed for the long tail of in-flow images
- Above-the-fold hero images still need a real `sizes` value, usually close to `100vw`
- WordPress already shipped the change

**Why do I care:** I have written `sizes` values by hand exactly once in my career, hated it, and never did it again. I built tooling. So did everyone else. A markup feature that requires tooling to author has failed at the basic web ethos of "open a text editor and ship." Mat says as much in the post and I agree. What I find interesting is the broader lesson, which is that descriptive syntaxes outlast prescriptive ones, because the browser will always know more than you do about the user's situation, and you should not pretend otherwise. The `sizes="auto"` rollout is the rare case where the platform actually got out of our way. That happens about once a decade. Enjoy it.

**Link:** [The end of responsive images by Mat Marquis](https://piccalil.li/blog/the-end-of-responsive-images/)

## VoidZero rewrites the Angular compiler in Rust, with AI

**TLDR:** VoidZero shipped an experimental Oxc-based Angular compiler that runs roughly twenty times faster than `@ngtools/webpack` on Bitwarden, written in Rust over two months in collaboration with Claude Code and Codex.

**Summary:** This is a research artifact, not a product, but the numbers are loud. Six and a half times faster than Angular CLI on Super Productivity. Twenty point seven times faster than the webpack plus `@ngtools/webpack` pipeline on Bitwarden. The mechanism is the part I find more interesting than the headline number.

Angular's existing compiler turns templates into TypeScript, then runs the TypeScript Compiler to emit JavaScript, leaning on TS semantic info for optimizations. That means it is functionally doing whole-program type analysis on generated code, which scales the wrong way as your app grows. The Oxc Angular Compiler implements the template compilation and the analysis it needs natively in Rust on Oxc, then plugs into Vite via NAPI-RS. Most of the speed comes from not depending on the TypeScript checker, not from Rust alone.

The development story is what makes the post worth reading. Brooklyn, the author, describes spending the first wave of work bootstrapping a testing harness because that is what made the agents productive. The Oxc repo had test262, Babel and TypeScript conformance tests, and ESLint and Prettier conformance tests already, so Claude Code naturally followed the existing convention and stood up unit tests, snapshot tests, and conformance tests within hours. The orchestrator-and-subagents prompt pattern he uses to run for four to six hours unattended is documented in the post and worth borrowing if you do this kind of work.

The honest caveat at the end: the project is not maintained, does not implement Angular's cross-file optimizations, and skips template type checking. The Angular team is doing their own Oxc experiments focused on the TypeScript parsing side, which leaves more room for incremental porting. There is a future where these efforts converge.

**Key takeaways:**
- Up to 20.7x faster compilation than webpack plus `@ngtools/webpack` on real Angular apps
- Built on Oxc with NAPI-RS bindings into Vite as a first-class plugin
- Most of the speedup comes from not running TS's whole-program checker, not from Rust
- The agent workflow, plan mode then orchestrator and subagents, is documented in detail
- It is explicitly an experiment, not a maintained tool, and skips template type checking

**Why do I care:** Two reasons. First, if Angular's official compiler ever absorbs the Oxc TypeScript parser, the rest of the Angular world gets a real production speedup, and that is the kind of thing every Angular team I have worked with would notice immediately. CI minutes matter. Local dev matters more. Second, the agent story is the real story. The fact that two engineers and a couple of LLMs can port a non-trivial part of a major framework's compiler in two months is a data point I want to take seriously. The unlock is not the model, it is the testing harness. Claude Code did not invent that workflow, the existing Oxc conventions did, and the agent followed them. The takeaway for my own work is "invest in the test scaffolding before you invest in the agent prompts." Without conformance and snapshot tests this project would have collapsed under its own weight in week three.

**Link:** [How we made the Angular Compiler faster using AI](https://voidzero.dev/posts/oxc-angular-compiler)

## What async promised and what it delivered

**TLDR:** Josh Segall traces the callbacks-to-promises-to-async/await arc as a fifteen year accumulation of taxes, and argues each wave fixed local ergonomics while making the global picture worse.

**Summary:** The piece starts at the C10K problem. Threads were too expensive at scale, so we got event loops and callbacks. Callbacks solved the resource problem and broke control flow. Promises solved the nesting and the error fragmentation, but they are one shot, compose awkwardly past two operations, and originally swallowed unhandled rejections silently. Async/await delivered the sequential syntax we wanted, and brought function coloring with it.

The function coloring section is the strongest part. Bob Nystrom's 2015 essay gave the problem a name, and Josh extends it through fifteen years of receipts. The Rust async ecosystem fragmented around incompatible runtimes, where a library written for Tokio cannot easily run on async-std. The reqwest HTTP client requires Tokio. Library authors face a binary choice or maintain two parallel implementations. Python has both `requests` and `aiohttp`, with `httpx` arriving later as a workaround for the split. Adding one I/O call to a sync function changes its signature, return type, and calling convention, and that change ripples up the call graph until it hits a framework boundary.

There is a bug class section too that I think is underappreciated. "Futurelocks" are a class of async Rust deadlocks where a future acquires a lock then stops being polled, while another future tries to acquire the same lock. Threads do not have this. With threads, the holder always makes progress toward release. With async Rust, the standard tools like `select!`, buffered streams, and `FuturesUnordered` routinely stop polling futures that hold resources. Diagnosing these requires core dumps and a disassembler. That is a real cost that nobody talks about.

The closing observation, which I keep coming back to, is the sequential trap. Three `await` statements in a row look correct. They run sequentially even when only one of them depends on the others. The only way to get parallelism is to break the sequential style with `Promise.all` or equivalent, which puts the burden on the programmer to manually analyze dependencies. The syntax actively obscures the one piece of information that would tell you what can run in parallel. Go avoided coloring with goroutines. Java's Project Loom virtual threads avoided it on purpose. Zig removed compiler level async/await entirely. Smart people are trying to undo this.

**Key takeaways:**
- Each concurrency wave fixed the previous wave's worst symptom and added structural costs
- Function coloring fragments ecosystems, with Rust's runtime split as the canonical example
- Async/await introduces new bug classes including "futurelocks" that thread-based code cannot have
- Sequential `await` syntax obscures the dependency information needed to find parallelism
- Go, Project Loom, and Zig are all betting against compiler level async/await

**Why do I care:** I have lived every paragraph of this post. Callback hell was real. Promise rejection handling cost me weekends. Async/await felt like the answer until the second time I had to add `await` to a function and then chase down forty callers. The function coloring tax is the single largest hidden cost in modern frontend architecture, and almost nobody on a product team can articulate it to their PM, which means they pay it forever. What I want senior frontend folks to take from this is not that async/await is bad, it is fine for inherently sequential I/O, but that the right abstraction for concurrency is still an open research question. Project Loom matters. Zig's experiment matters. The sequential trap is the part that hurts performance silently, every day, in production code I review every week. If you read one thing on this list, read this.

**Link:** [What Async Promised and What it Delivered](https://causality.blog/essays/what-async-promised/)

## A four line patch that should have been there from day one

**TLDR:** A 2017 Scratch SVG renderer commit added a regex to strip `<script>` tags from user-uploaded SVGs, plus a single test, and serves as a tidy reminder that SVG sanitization is non-optional.

**Summary:** This is a tiny commit on `scratch-svg-renderer`. Three lines of code add a regex that wipes script tags from an SVG string before rendering. One test confirms a fixture that contains the word "script" no longer contains it after sanitization. That is the entire change. It is also the kind of fix that, if missed, becomes a stored XSS vector on a platform with millions of children uploading content.

I bring it up because someone in the Bytes issue linked to a separate post about "the woes of sanitizing SVGs," and this commit is a useful artifact alongside it. SVG is XML, XML can carry script, and any user-supplied SVG that ends up in the DOM is executable unless you sanitize it. A naive regex like the one here is also not enough on its own, because attackers can hide JavaScript inside event handler attributes, `xlink:href` with `javascript:` schemes, foreign object embeds, and more. The proper answer is a real sanitizer like DOMPurify configured for SVG, not a regex.

The takeaway is not the patch. The takeaway is that anyone on your team who treats SVG as "just an image" is wrong, and you should fix that before they ship a feature that lets users upload one.

**Key takeaways:**
- SVG can execute JavaScript via script tags, event handlers, and several URL schemes
- Regex stripping is better than nothing but not a complete defense
- Use a DOM-aware sanitizer like DOMPurify with SVG mode for any user-uploaded SVG
- Treat SVG inputs as untrusted code, not as image data

**Why do I care:** This is the security bug I look for first when I review a feature that accepts SVG uploads. It is also the bug that gets shrugged off the most because "it is just an icon." I have seen it in production at three different companies. The specific Scratch commit is from years ago, but the underlying class of bug shows up every quarter somewhere. If you let users upload SVG, sanitize it server side, sanitize it again on render, and pin a known-good sanitizer with tests. Do not roll your own regex. The fact that the original Scratch fix is a one line regex is itself a quiet warning: the people who care enough to ship the patch may still ship an incomplete one.

**Link:** [scratch-svg-renderer commit 78cc7ea](https://github.com/scratchfoundation/scratch-svg-renderer/commit/78cc7ea22887cdb2d3e3a00b23557a37251632f8)
