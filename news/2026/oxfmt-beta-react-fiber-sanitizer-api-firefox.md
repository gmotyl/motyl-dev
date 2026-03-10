---
title: "Oxfmt Beta, React Fiber Internals, and the Sanitizer API Lands in Firefox"
excerpt: "A packed week covering the new Prettier challenger Oxfmt, a deep dive into why React Fiber exists, Firefox's Sanitizer API for XSS protection, error handling across RSC environments, and TanStack Intent for shipping agent skills."
publishedAt: "2026-03-09"
slug: "oxfmt-beta-react-fiber-sanitizer-api-firefox"
hashtags: "#ui-dev #bytes #frontend #react #tooling #security #rsc #ai #generated #en"
---

## Oxfmt Beta: Another Prettier Killer Has Entered the Arena

**TLDR:** Oxfmt, the formatter from the Oxc toolchain, just shipped its first beta with 100% Prettier JavaScript and TypeScript conformance, 30x speed improvement over Prettier, and built-in Tailwind class sorting. Migration is a single command.

The formatter wars continue, and frankly, it is getting interesting. Oxfmt is the latest Rust-based contender stepping up to challenge Prettier, and it comes with some numbers that are hard to ignore. We are talking 30 times faster than Prettier and 3 times faster than Biome on a cold run. Those are not micro-benchmark vanity numbers either -- in a large monorepo, that difference translates to real developer time savings.

But here is what actually matters: Oxfmt now passes 100% of Prettier's JavaScript and TypeScript conformance tests. That is the key detail. Biome claims around 97% compatibility, and that remaining 3% is exactly why teams hesitate to migrate -- nobody wants to review thousands of formatting diffs across a codebase. With Oxfmt, you get zero formatting diffs on migration. That removes the single biggest barrier to switching.

The feature set is also genuinely comprehensive. One formatter handles JS, TS, JSX, TSX, JSON, YAML, TOML, HTML, CSS, SCSS, Markdown, MDX, and more. Tailwind class sorting is built in, no plugin needed. Import sorting ships out of the box with configurable groups and side effects handling. This is the "batteries included" approach that Prettier never quite achieved without its plugin ecosystem.

Now, let me push back on something. The migration story sounds almost too smooth. One command to install, migrate config, and reformat. In practice, large codebases have edge cases -- custom Prettier plugins, unusual configurations, CI pipeline integrations. The blog post lists impressive adopters like Vue, Turborepo, and Sentry's JavaScript SDK, but I would want to hear more about the migration pain points those teams actually encountered. What broke? What workaround did they need? The "it just works" narrative is compelling marketing, but production migrations are rarely that clean.

What is also missing from the conversation is the long-term maintenance story. Prettier has years of battle-tested stability and a massive contributor base. Oxfmt is beta software. What happens when you hit a formatting bug that blocks your release? How responsive is the team? These are the questions that matter more than raw speed benchmarks.

**Key takeaways:**
- Oxfmt passes 100% of Prettier's JS/TS conformance tests, making migration effectively diff-free
- 30x faster than Prettier, 3x faster than Biome on cold runs
- Built-in Tailwind class sorting and import sorting eliminate the need for extra plugins
- Migration is a single command: install, migrate config, reformat
- Already adopted by Vue, Turborepo, and other major projects
- Still in beta -- stability and long-term support remain open questions

**Link:** [Oxfmt Beta](https://oxc.rs/blog/2026-02-24-oxfmt-beta.html)

---

## Understanding Why React Fiber Exists

**TLDR:** React Fiber was born because JavaScript's call stack is fundamentally non-interruptible. React replaced recursive rendering with an iterative fiber tree traversal that can pause, yield to the browser, and resume -- enabling time slicing and priority-based updates.

This is the kind of deep dive I genuinely appreciate. Sanku walks through the actual problem React Fiber solves, starting from first principles rather than jumping straight to the solution.

The core insight is deceptively simple: JavaScript's call stack cannot be paused. When React 15 started reconciling a component tree recursively, it was trapped. A tree with 1,000 components meant 1,000 stack frames, all nested, all blocking. If a user typed a character while React was halfway through reconciliation, that keystroke had to wait. The browser could not process input events because the call stack was full. This is why React apps used to feel laggy during complex renders.

React Fiber solves this by abandoning recursion entirely. Instead of letting the JavaScript engine drive reconciliation through the call stack, React built its own data structure -- the fiber tree -- that it controls completely. Each fiber is just an object in memory with child, sibling, and return pointers forming a linked list. React can walk this structure iteratively, process one unit of work, check the time, and yield back to the browser if needed.

The time slicing mechanism works in roughly 5 millisecond increments. React processes a few fibers, checks whether its time budget is spent, and if so, saves a pointer to where it stopped and exits. The browser gets control back to handle pending events -- keystrokes, scrolls, clicks, repaints. Then React picks up exactly where it left off.

What I think the article could explore more is the tradeoff React made here. Vue and SolidJS took a fundamentally different approach with reactive signals and fine-grained tracking. They avoid the problem entirely by only updating what actually changed, no tree reconciliation needed. React chose to keep the "components as pure functions of state" mental model and solve the performance problem at the scheduling layer. That is a valid architectural choice, but it means React carries more runtime overhead to enable a simpler programming model. The article acknowledges this briefly but does not dig into whether the tradeoff is still worth it as the ecosystem evolves.

Also worth noting: the article describes the old scheduler heuristic of roughly 5ms time slices, but modern React's scheduler is frame-aligned and dynamic. It tries to finish before the next frame deadline and yields earlier when higher-priority events are pending. The article does include a footnote about this, which is good, but the distinction matters for understanding how React actually behaves today.

**Key takeaways:**
- JavaScript's call stack is non-interruptible -- recursive reconciliation in React 15 blocked the main thread
- Fiber replaces recursion with an iterative linked-list traversal that React fully controls
- Time slicing lets React work in small chunks, yielding to the browser between units of work
- Priority-based scheduling means user interactions like typing can preempt background renders
- The tradeoff: React accepts more runtime overhead to preserve a simpler component programming model
- Modern React's scheduler is frame-aligned and dynamic, not a fixed 5ms budget

**Link:** [Understanding Why React Fiber Exists](https://inside-react.vercel.app/blog/understanding-why-react-fiber-exists)

---

## Goodbye innerHTML, Hello setHTML: The Sanitizer API Lands in Firefox 148

**TLDR:** Firefox 148 ships the standardized Sanitizer API, providing a built-in way to sanitize untrusted HTML and prevent XSS attacks. The setHTML method is a drop-in replacement for innerHTML that strips dangerous elements by default.

XSS has ranked among the top three web vulnerabilities for nearly a decade, and honestly, it is kind of embarrassing that we are still dealing with it. The new Sanitizer API in Firefox 148 is a meaningful step toward making the platform itself safer by default.

The API is refreshingly straightforward. Instead of assigning untrusted HTML via innerHTML, you call setHTML on the element. It automatically strips dangerous content -- script tags, event handlers, and other XSS vectors -- while keeping the safe HTML structure intact. The example in the article shows an image tag with an onclick handler being completely removed, leaving just the safe heading element.

What makes this genuinely useful, as opposed to just another security API that nobody adopts, is the minimal migration effort. If your codebase uses innerHTML to insert user-generated content, replacing those calls with setHTML is close to a find-and-replace operation. You do not need to restructure your application or understand complex security policies. If the default configuration is too strict or too permissive, you can customize which elements and attributes are allowed.

The article also mentions Trusted Types integration, which is where the real long-term security story gets interesting. Once you adopt setHTML, you can enable Trusted Types enforcement to block all other unsafe HTML insertion methods. This creates a policy-based security model where innerHTML becomes a violation rather than just a bad practice.

What I want to challenge here is the implicit assumption that developer adoption will follow simply because the API exists. Content Security Policy has been available since 2009, and the article itself acknowledges it did not gain sufficient adoption. The Sanitizer API is simpler, yes, but "simpler" has not historically been enough to drive security adoption. What would actually move the needle is if frameworks like React, Vue, and Angular started using setHTML internally for their escape hatches. Framework-level adoption would protect developers who never even know the API exists.

Firefox is first to ship, but this only becomes truly useful when Chrome and Safari follow. Cross-browser support is what determines whether library authors and framework teams can actually rely on it.

**Key takeaways:**
- Firefox 148 is the first browser to ship the standardized Sanitizer API
- setHTML is a drop-in replacement for innerHTML that strips XSS vectors by default
- Customizable configuration lets developers control which elements and attributes are allowed
- Combines with Trusted Types for policy-based HTML injection control
- Real impact depends on cross-browser adoption and framework-level integration
- Historical precedent with CSP suggests "just make it available" is not enough for adoption

**Link:** [Goodbye innerHTML, Hello setHTML: Stronger XSS Protection in Firefox 148](https://hacks.mozilla.org/2026/02/goodbye-innerhtml-hello-sethtml-stronger-xss-protection-in-firefox-148/)

---

## Error Rendering with React Server Components

**TLDR:** Errors in RSC flow through three distinct rendering environments -- RSC, SSR, and Browser -- each handling them differently. The key insight is that errors need to reach the browser as quickly as possible, since it is the only environment that supports Error Boundaries.

Ryan Toronto delivers a thorough walkthrough of what actually happens when a React Server Component throws an error, and this is the kind of knowledge that separates developers who use RSC from developers who understand it.

The architecture involves three rendering environments, and each one treats errors differently. In the RSC environment, errors are serialized into the RSC stream as data. The render does not crash -- the error just becomes part of the stream payload. This is a clever design choice because it means the RSC layer is resilient by default.

The SSR environment is where things get tricky. When SSR encounters an error in the RSC stream, one of two things happens. If the error is outside a Suspense boundary, the entire SSR render crashes. If it is inside a Suspense boundary, the fallback stays rendered and React gives up on that subtree, leaving it for the browser to handle. This asymmetry is important to understand for production applications.

The browser is the only environment where Error Boundaries work. This is the critical architectural constraint. React's Error Boundary mechanism, which is how you display friendly error messages to users, only exists in the client rendering environment. So the entire error handling strategy in RSC boils down to: get the error to the browser as fast as possible.

The Suspense interaction is particularly well explained. When an RSC error happens inside a Suspense boundary during SSR, React has already produced some HTML output. It cannot throw an exception at that point because partial HTML has already been sent. So it leaves the Suspense fallback in place and injects a script that tells the browser to switch to client rendering for that subtree. That is an elegant solution, but it also means your Suspense fallback content needs to be meaningful because users might see it for longer than you expect.

What the article does not address, and this is a significant gap, is the error recovery story. What happens after the Error Boundary catches the error? Can the user retry? Does the RSC stream get re-fetched? In production applications, showing an error message is the easy part. Recovering gracefully is where the real complexity lives. The author mentions future posts on server action errors and RSC errors for control flow, which should fill in some of these gaps.

**Key takeaways:**
- RSC errors are serialized as data in the stream -- the RSC render never crashes
- SSR crashes on errors outside Suspense boundaries but degrades gracefully inside them
- Error Boundaries only work in the browser -- errors must reach the client to be properly handled
- Suspense boundaries change error behavior significantly in SSR by allowing partial HTML output
- Framework authors need clear error propagation paths from RSC through SSR to browser
- Error recovery after boundary catches is an under-discussed topic in the RSC ecosystem

**Link:** [Error Rendering with RSC](https://twofoldframework.com/blog/error-rendering-with-rsc)

---

## TanStack Intent: Shipping Agent Skills with npm Packages

**TLDR:** TanStack Intent is a CLI that lets library maintainers generate, validate, and ship Agent Skills alongside their npm packages. Skills are versioned documents that tell AI coding agents how to correctly use a library, traveling with the package through npm updates.

This is an ambitious attempt to solve a real problem: AI coding agents are terrible at using libraries that are new, recently updated, or composed in non-obvious ways. The training data problem is well articulated -- models develop permanent split-brain when a library ships a breaking change because training data contains both old and new versions forever with no disambiguation signal.

The proposed solution is elegant in concept. Library maintainers author skills -- short, versioned documents describing correct patterns, common mistakes, and when to apply them. These skills ship inside the npm package itself, so they update when the package updates. No more hunting for community-maintained cursor rules files. No more copy-pasting from Discord. The knowledge travels through the same channel as the code.

The staleness detection is the most interesting part of the design. Each skill declares which documentation files it was derived from. The CLI can check whether those source docs have changed since the skill was last updated, flagging stale skills in CI. This is genuinely clever because it turns skill maintenance from "something you remember to do" into "something your pipeline catches."

But let me be honest about the challenges here. This requires library maintainers to do additional work -- authoring skills, reviewing generated drafts, keeping them current, processing feedback. The open source maintainer burnout problem is already severe. Adding another artifact to maintain, even with good tooling, is a real cost. The value proposition needs to be strong enough that maintainers see reduced support burden as the payoff.

There is also a coordination problem. The Agent Skills spec claims adoption by VS Code, GitHub Copilot, Cursor, Claude Code, and others. But "adopted" can mean many things. How consistently do these tools actually consume and apply skills? If the behavior is inconsistent across agents, maintainers are doing work that only sometimes helps, which undermines the motivation to invest.

The feedback loop concept -- users report when skills produce wrong output, fixes ship on the next npm update -- is the most compelling long-term vision. If skills compound in quality over time and reduce support tickets, that is a genuine incentive for maintainers. But that flywheel needs to actually spin before we celebrate it.

**Key takeaways:**
- Agent Skills are versioned documents that ship inside npm packages, describing correct library usage patterns
- Skills solve the training data staleness problem by updating through npm rather than model retraining
- Built-in staleness detection flags skills when their source documentation changes
- The feedback loop lets user reports improve skills for everyone on the next package update
- Requires additional maintainer effort, which is a real cost given open source burnout
- Actual agent consumption consistency across tools remains an open question

**Link:** [Introducing TanStack Intent: Ship Agent Skills with your npm Packages](https://tanstack.com/blog/from-docs-to-agents)

---

## Debugging Next.js Without Errors: How Logs Saved the Day

**TLDR:** A Next.js production bug where Firefox and Safari users were blocked by Vercel's bot protection turned out to be caused by the AI SDK sending its own user-agent string instead of the browser's. Structured logging with Sentry revealed the root cause in minutes.

This is a practical debugging story that illustrates a point experienced developers already know but that bears repeating: stack traces tell you what broke, not why. The bug itself is interesting -- Vercel's bot protection was flagging legitimate Firefox and Safari users as bots, while Chrome users passed through fine.

The root cause was that the AI SDK was replacing the browser's user-agent header with its own "ai-sdk" string. Vercel's bot protection reasonably interpreted a non-browser user-agent as a bot. Chrome happened to preserve the correct user-agent through whatever code path it took, while Firefox and Safari did not.

The debugging approach is sound. Rather than guessing, the author added a single structured log capturing the bot check result and the user-agent string. High-cardinality attributes in Sentry logs made it trivial to filter and compare passing versus failing requests. The trace connection feature then confirmed the browser context.

What I appreciate about this story is the humility in the fix. The solution was not some elegant architectural change -- it was adding a firewall rule to bypass bot protection for requests with the "ai-sdk" user-agent. Pragmatic, quick, effective. Sometimes the right fix is the simple one.

That said, this is really a sponsored post for Sentry's logging product, and we should acknowledge that. The debugging technique described -- logging relevant context at decision points -- works with any structured logging solution. The specific tooling matters less than the practice of capturing the right data before you need it.

**Key takeaways:**
- Stack traces show what failed but not the data that caused the failure -- logs fill that gap
- High-cardinality structured logging lets you search by any attribute without predicting what will be useful
- The AI SDK replaces browser user-agent headers, which can trigger bot detection on some platforms
- Cross-browser testing remains essential, especially when third-party SDKs modify request headers
- Pragmatic fixes like firewall rules are sometimes the right answer
- The debugging practice matters more than the specific tooling

**Link:** [Debugging Next.js without errors: how Logs revealed a production bug](https://blog.sentry.io/not-everything-that-breaks-is-an-error-a-logs-and-next-js-story/)
