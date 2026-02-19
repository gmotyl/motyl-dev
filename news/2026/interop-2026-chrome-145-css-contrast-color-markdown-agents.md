---
title: "Interop 2026 launches with 20 focus areas, Chrome 145 ships multicol wrapping, and CSS gets clever with contrast-color approximations"
excerpt: "A packed week for the web platform: Interop 2026 brings 15 new cross-browser focus areas, Chrome 145 lands column wrapping and the Origin API, Cloudflare introduces Markdown for Agents, and CSS wizardry reaches new heights."
publishedAt: "2026-02-18"
slug: "interop-2026-chrome-145-css-contrast-color-markdown-agents"
hashtags: "#frontend-focus #css #javascript #interop #chrome #ai #webdev #performance #generated #en"
---

## Interop 2026: The Fifth Year of Making Browsers Agree

**TLDR:** Interop 2026 has launched with 20 focus areas across CSS, JavaScript, and HTML, including 15 brand new ones like scroll-driven animations, contrast-color(), advanced attr(), and WebTransport. All major browser vendors -- Apple, Google, Microsoft, Mozilla, and Igalia -- are on board for what is shaping up to be the most ambitious year yet.

**Summary:**

Alright, let us talk about the elephant in the room, or rather the elephants, because this week every single major browser vendor dropped their own blog post about Interop 2026. We got the WebKit perspective, the Mozilla Hacks take, the Microsoft Edge angle, and the Igalia wrap-up. When that many organizations align on the same announcement, you know something significant is happening.

Interop 2025 ended with an overall score climbing from 25 to 95. That is staggering. Firefox went from 46 to 99 individually. The program works. But here is the thing Mozilla's Jake Archibald points out that often gets lost in the celebration: you can score well on tests while still having inconsistent behavior across browsers. They found this specifically with CSS Anchor Positioning and Navigation API, where tests were sometimes written against a particular implementation rather than the actual specification. They spent time filing spec issues, getting them prioritized in working groups, and making the specs less ambiguous. That kind of unglamorous work is arguably more valuable than the headline score.

For 2026, the new features are genuinely exciting. CSS contrast-color() lets the browser automatically pick black or white text based on background color. Advanced attr() extends the ancient attr() function to work with any CSS property, not just content. Container style queries let you style elements conditionally based on custom properties on a container. Scroll-driven animations finally let you tie animations to scroll position entirely in CSS. Media pseudo-classes like :playing, :paused, and :buffering for audio and video elements have been in Safari for years but nobody uses them because no other browser supports them. Scoped custom element registries solve the maddening problem of tag name collisions in web components. And shape() reimagines clip-path with responsive, calc()-compatible CSS syntax instead of SVG path notation.

What I think is missing from all these announcements is an honest conversation about the selection process itself. Microsoft actually touched on this -- developers have told them the focus area selection feels opaque, and they want more transparency. Over 150 proposals were submitted and only 20 made it through. What happened to the other 130? Mozilla noted they invited developers to stack-rank proposals this year as an experiment, which is a step in the right direction. But the power dynamics here are real: Mozilla explicitly acknowledged they are "the only engine that isn't owned by billionaires." That single sentence says more about the state of the web platform than any Interop dashboard ever could.

The investigation areas are also telling: accessibility testing infrastructure, JPEG XL test suites, mobile testing, and WebVTT. These are all things that should have been solved years ago but were not because the testing infrastructure was not ready. JPEG XL in particular has been politically charged -- it is worth noting that Mozilla challenged Google's JPEG XL team to build a memory-safe Rust decoder, which they are now both experimenting with. That is the kind of cross-vendor collaboration we need more of.

**Key takeaways:**
- 20 focus areas for 2026, including 15 brand new ones and 5 carryovers from 2025
- Interop 2025 finished with an overall score of 95, up from 25 at the start
- CSS gets contrast-color(), advanced attr(), style queries, scroll-driven animations, media pseudo-classes, and shape()
- JavaScript side includes WebTransport, JSPI for Wasm, scoped custom element registries, and Navigation API improvements
- Investigation areas include accessibility testing, JPEG XL, mobile testing, and WebVTT
- The selection process remains opaque, and the power imbalance between engine vendors is real

**Link:** [Announcing Interop 2026 (WebKit)](https://webkit.org/blog/17818/announcing-interop-2026/)

## Chrome 145: Column Wrapping, the Origin API, and Device Bound Sessions

**TLDR:** Chrome 145 ships column wrapping for multi-column layouts, a new Origin API for safer origin comparisons, and Device Bound Session Credentials to protect against cookie theft. The DevTools update is equally substantial with MCP server improvements and significantly better performance profiling.

**Summary:**

Chrome 145 has landed and the headline feature is column wrapping for multi-column layouts. For years, if your multicol container ran out of vertical space, content would overflow into horizontal scrollbar territory. Now with column-wrap and column-height properties, overflow columns wrap into new rows in the block direction. This is one of those features where you look at the before-and-after and wonder why it took this long. The reading experience for long multi-column content was genuinely broken before this, and now it actually works the way you would intuitively expect.

The Origin API is a more subtle but arguably more important addition. Origins are fundamental to web security, yet there was never a proper Origin object for developers. You had various origin getters that returned ASCII serializations, and then you were on your own to compare them correctly. Getting same-origin or same-site comparisons wrong can lead to real security vulnerabilities. This new API encapsulates the origin concept with proper methods for comparison, serialization, and parsing. It is the kind of infrastructure improvement that prevents entire categories of bugs.

Device Bound Session Credentials is the security feature I want everyone to pay attention to. It binds authentication sessions to the physical device using hardware-backed key pairs and short-lived cookies. The browser periodically proves possession of the private key to refresh the session cookie. This means stolen session cookies become significantly harder to exploit on other machines. In a world where session hijacking is a constant threat, this is a meaningful defensive layer.

The DevTools update deserves its own attention. The MCP server now supports auto-connection to running Chrome instances, unified emulation for geolocation, network throttling, CPU throttling, and user agent overrides through a single tool. Soft navigations are now visible in the Performance panel trace view, which is huge for anyone debugging SPA performance. Line-level profiler timings have been fixed to work correctly with pretty-printed and source-mapped code. And there is a new render-blocking column in the Network panel that immediately shows which resources are preventing first paint. That alone will save countless debugging hours.

One thing Chrome's announcement conveniently avoids mentioning is that many Interop 2026 features "first appeared in Chromium, then became standards." That framing -- where Chrome ships first and then the standard follows -- is exactly the dynamic that has historically caused interop problems in the first place. Standards should lead implementations, not the other way around.

**Key takeaways:**
- column-wrap and column-height properties finally fix multi-column overflow behavior
- The Origin API provides proper same-origin comparison methods, preventing security bugs from string comparison
- Device Bound Session Credentials ties sessions to hardware, making cookie theft far less useful
- DevTools MCP server gets auto-connect, unified emulation, and preserved logs across navigations
- Performance panel now shows soft navigation markers for SPAs
- Network panel adds a render-blocking resource column

**Link:** [New in Chrome 145](https://developer.chrome.com/blog/new-in-chrome-145)

## Cloudflare's Markdown for Agents: The Web Gets a Second Language

**TLDR:** Cloudflare now automatically converts HTML pages to markdown when AI agents request them with an Accept: text/markdown header. This reduces token usage by roughly 80% and introduces content negotiation as a first-class pattern for agent-readable web content.

**Summary:**

Cloudflare has shipped something genuinely clever here. Their network now supports real-time content negotiation for markdown. When an AI agent or crawler sends a request with Accept: text/markdown in the header, Cloudflare intercepts the response, converts the HTML to markdown on the fly, and serves it back. The blog post itself goes from 16,180 tokens in HTML down to 3,150 in markdown -- an 80% reduction. They even include an x-markdown-tokens header so your agent pipeline can estimate context window consumption before reading the content.

The technical implementation is straightforward content negotiation using the Accept header, which is the correct HTTP mechanism for this. They have enabled it for their own developer docs and blog, and it is available as a toggle for Pro, Business, and Enterprise plan customers. The response also includes Content-Signal headers indicating the content is approved for AI training, search, and agentic use. They note that agents like Claude Code and OpenCode already send these accept headers, so there is existing demand.

Here is what I think Cloudflare is strategically avoiding: this is also a massive data play. By positioning themselves as the markdown conversion layer, they get visibility into exactly which AI agents are consuming which web content, how often, and in what patterns. They have already built this into Cloudflare Radar with content type insights for AI bot traffic. This is not just a developer convenience feature -- it is an intelligence platform about how AI consumes the web. That is not necessarily bad, but it should be acknowledged.

The more interesting question is whether this sets a useful standard or fragments the web further. If every CDN implements their own HTML-to-markdown conversion, the results will differ. Markdown itself is ambiguous in many edge cases. And the conversion necessarily loses information -- interactive elements, complex layouts, embedded applications all get flattened. For documentation and blog content this is fine. For the rest of the web, the "just serve markdown" approach papers over the real problem, which is that the web was not designed for machine consumption and maybe we should be more intentional about how we bridge that gap.

**Key takeaways:**
- Add Accept: text/markdown to requests and Cloudflare converts HTML to markdown in real-time
- Roughly 80% token reduction compared to raw HTML
- Includes x-markdown-tokens header for context window planning
- Available for Pro, Business, and Enterprise plans as a dashboard toggle
- Content-Signal headers declare usage permissions for AI training and search
- Also available via Workers AI and Browser Rendering API for non-Cloudflare origins

**Link:** [Introducing Markdown for Agents](https://blog.cloudflare.com/markdown-for-agents/)

## Approximating contrast-color() With Pure CSS Today

**TLDR:** Since contrast-color() is only in Safari and Firefox so far, a clever CSS-only approximation using OKLCH lightness and round() gives you automatic black-or-white text selection in a single line: oklch(from var(--color) round(1.21 - L) 0 0). It closely matches APCA contrast calculations.

**Summary:**

This CSS-Tricks article is a masterclass in practical CSS problem-solving. The author wants automatic foreground color selection based on background color -- the same thing contrast-color() does -- but cross-browser today. The journey starts with the WCAG 2.2 luminance formula, which involves messy power functions and coefficient calculations. You can technically express all of this in CSS using calc(), pow(), and round(), but the result is an unreadable multi-line monster that nobody wants to maintain.

The breakthrough comes from stepping back and using color spaces. The OKLCH lightness value already represents perceptual lightness, which correlates closely with contrast behavior. Instead of computing luminance from scratch, you just need to find the threshold where black text becomes more readable than white. Through empirical testing against APCA contrast calculations, the author found the sweet spot is around 0.72 in OKLCH lightness. Above that, black always has better contrast. Below 0.65, white always wins. The narrow band between 0.65 and 0.72 is where both options give moderate contrast.

The final formula is beautiful in its simplicity: round(1.21 - L). When L is 0.72 or above, 1.21 - 0.72 = 0.49 rounds down to 0 (black). When L is 0.71 or below, 1.21 - 0.71 = 0.50 rounds up to 1 (white). One line of CSS, readable, maintainable. The article even goes further with a color-mix() trick to switch between white and a base text color rather than just white and black, though that requires Safari 18+ or later.

The honest caveat is important: this formula matches APCA better than WCAG 2.0. If you are legally held to WCAG compliance rather than APCA, the simpler formula might disagree in edge cases. But given that APCA is positioned to replace the WCAG contrast algorithm, you could argue this formula is more future-proof than the specification it is approximating. That is a fascinating situation where a pragmatic hack might outlive the standard it was designed to work around.

**Key takeaways:**
- Single-line CSS: color: oklch(from var(--bg) round(1.21 - L) 0 0) gives you automatic contrast text
- OKLCH lightness threshold of 0.72 reliably predicts APCA contrast preference
- The formula matches APCA calculations better than WCAG 2.0
- LCH is less reliable than OKLCH for this purpose due to larger uncertainty gaps
- A color-mix() extension can switch between white and a custom base color instead of just white and black
- CSS Custom Functions (@function) can clean up the syntax once browser support improves

**Link:** [Approximating contrast-color() With Other CSS Features](https://css-tricks.com/approximating-contrast-color-with-other-css-features/)

## Modern CSS Snippets: A Reference for Replacing JavaScript With CSS

**TLDR:** modern-css.com is a curated collection of old-versus-modern CSS comparisons showing how features like anchor positioning, scroll-driven animations, container queries, popover, and field-sizing can replace what previously required JavaScript libraries or complex workarounds.

**Summary:**

This is not an article so much as a reference card, but it is an exceptionally useful one. The site presents dozens of side-by-side comparisons of how you used to do something (often with JavaScript) versus how you can do it now with modern CSS alone. The breadth is impressive -- from replacing Swiper.js carousels with CSS scroll-snap and scroll-markers, to replacing Popper.js tooltips with anchor positioning, to replacing JavaScript-driven textarea auto-resize with field-sizing: content.

What makes this resource valuable is not any individual snippet but the cumulative picture it paints. When you see 60+ patterns where JavaScript is no longer necessary, you start to understand the magnitude of the shift CSS has undergone. Container queries replace media queries for component-level responsiveness. The :has() selector replaces JavaScript parent selection. View transitions replace Barba.js. Scroll-driven animations replace IntersectionObserver. The popover attribute replaces entire menu libraries. The dialog element replaces custom modal implementations.

Some of these are aspirational -- corner-shape: squircle, CSS @function, and sibling-index() are not widely supported yet. The site does include browser compatibility indicators, but they are easy to miss. The risk with a resource like this is that developers adopt patterns before they are production-ready, then wonder why things break in certain browsers. I would have liked to see more prominent warnings about which features are still experimental. That said, as a vision document for where CSS is heading, it is outstanding. The web platform is genuinely becoming capable of things that used to require entire framework ecosystems.

**Key takeaways:**
- Dozens of before/after comparisons showing CSS replacing JavaScript patterns
- Covers anchor positioning, scroll-driven animations, container queries, view transitions, popover, and more
- Includes emerging features like CSS @function, corner-shape: squircle, and sibling-index()
- Browser compatibility varies significantly across snippets -- check support before using in production
- Useful as both a learning resource and a reference for modernizing existing codebases

**Link:** [Modern CSS Code Snippets](https://modern-css.com/)

## The EU Moves to Ban Infinite Scrolling

**TLDR:** The European Union is pushing to ban infinite scrolling on platforms like TikTok, Instagram, and Facebook as part of enforcing the Digital Services Act, arguing that the design pattern is addictive and harmful to users, particularly minors.

**Summary:**

This one is not technically a frontend article, but it has massive implications for frontend developers. The EU is targeting infinite scrolling as an "addictive design" pattern under the Digital Services Act. The specific enforcement angle here is that platforms use infinite scroll to maximize engagement time, which regulators view as deliberately exploitative, especially for younger users.

If this becomes law, it would force a fundamental redesign of how major social media platforms present content. Pagination or explicit "load more" interactions would become the default. For frontend developers working on content-heavy applications, this is worth paying attention to even if you are not building for the EU market, because regulatory patterns like GDPR have a way of becoming de facto global standards. Your product team may preemptively adopt pagination to avoid future compliance risk.

What the regulators are not grappling with is the nuance. Infinite scroll is not inherently evil -- it is a perfectly reasonable pattern for many use cases. A developer reading documentation, an analyst scrolling through data, a shopper browsing products -- these are all cases where infinite scroll serves the user well. The problem is specifically when it is combined with algorithmic content feeds designed to maximize time-on-site. Banning the UI pattern rather than the optimization objective is like banning cars because some people speed. The real conversation should be about dark patterns in recommendation algorithms, not scroll mechanics.

**Key takeaways:**
- EU regulators are targeting infinite scrolling as addictive design under the Digital Services Act
- Enforcement would primarily affect TikTok, Meta's platforms, and similar social media
- This could force pagination or explicit load-more patterns as defaults
- GDPR-style regulatory spillover means this may affect global product decisions
- The regulation targets the UI pattern rather than the underlying algorithmic manipulation, which is arguably the wrong lever

**Link:** [The EU moves to kill infinite scrolling](https://www.politico.eu/article/tiktok-meta-facebook-instagram-brussels-kill-infinite-scrolling/)

## Gwtar: A Static, Single-File, Efficient HTML Archive Format

**TLDR:** Gwtar is a new polyglot HTML archival format that solves a long-standing trilemma: it is simultaneously static (self-contained), single-file, and efficient (lazy-loading) by using a JavaScript header that calls window.stop() and then serves assets via HTTP range requests into an appended tarball.

**Summary:**

This is one of those deep technical articles that makes you appreciate how much unsolved infrastructure exists on the web. The problem is straightforward: archiving HTML pages. You want the archive to be self-contained (no dependency on the original server), a single file (easy to manage and host), and efficient (do not force the user to download 500MB just to read a blog post). No existing format achieves all three. SingleFile gives you static and single-file but downloads everything upfront. Save-as-HTML gives you efficient but not self-contained. WARCs give you static and efficient but require complex replay software.

The breakthrough is window.stop(). A Gwtar file is an HTML page with a JavaScript header, followed by a tarball of the original page and all its assets. When the browser starts loading, the JavaScript immediately calls window.stop() to halt further downloading. It then loads only the original HTML and hooks all asset requests to turn them into HTTP range requests back into the tarball portion of the same file. The browser sees what looks like a normal web page with lazy-loaded images and media, but it is all coming from different byte ranges of the single Gwtar file.

There are real limitations the author is upfront about. Local viewing is broken because browsers restrict certain requests from local HTML files for security reasons. Cloudflare specifically strips range request headers from text/html responses, requiring a MIME type workaround. The interaction with Brotli compression is unclear. But the format includes clever provisions: PAR2 forward error correction can be appended for corruption recovery, the file can be trivially extracted back to normal HTML with a one-liner, and it degrades gracefully -- without JavaScript, the entire file just downloads like a normal SingleFile archive.

What impresses me most is the intellectual honesty. The author considered and rejected simpler approaches like server-side splitting, and documents every limitation and edge case. This is what good systems design writing looks like. Whether Gwtar becomes widely adopted or remains a niche solution for Gwern.net, the thinking behind it is worth studying.

**Key takeaways:**
- Solves the HTML archive trilemma: static + single-file + efficient, using window.stop() and HTTP range requests
- A Gwtar file is a polyglot: valid HTML with a JavaScript header plus an appended tarball
- Degrades gracefully: without JS, the full file downloads like a standard SingleFile archive
- Supports PAR2 forward error correction and cryptographic signatures as appended data
- Local viewing is broken due to browser security restrictions on file:// origins
- Cloudflare's range request stripping for text/html requires a MIME type workaround

**Link:** [Gwtar: a static efficient single-file HTML format](https://gwern.net/gwtar)

## Justifying text-wrap: pretty -- A Bug Report Disguised as Typography History

**TLDR:** Safari shipped text-wrap: pretty in 2025, but combining it with text-align: justify produces ugly results because the smart line-breaking algorithm targets a width slightly narrower than the container, and justification then inflates whitespace to fill the gap.

**Summary:**

This short piece from matklad is equal parts typography appreciation and bug report. The setup is delightful: Safari shipped text-wrap: pretty, bringing us closer to "cutting-edge XV-century technology." Gutenberg did manual line balancing for beautiful paragraphs. Knuth and Plass formalized it with dynamic programming in 1981 for TeX. And somehow, web browsers stuck with the naive greedy algorithm until 2025.

The bug is precise and well-explained. text-wrap: pretty uses dynamic programming to find line breaks that make lines roughly equal in length. To achieve this, the algorithm targets a width slightly narrower than the maximum, giving room to both undershoot and overshoot the target, which produces better overall balance. But text-align: justify then stretches every line to the full container width. Because the smart algorithm systematically wraps lines earlier than necessary, justification has to inflate whitespace more than it would with greedy line-breaking. The result: paragraphs with visibly blown-out word spacing.

The fix is conceptually simple -- the line-breaking algorithm should account for justification when computing its target width -- but it requires the two features to be aware of each other in the rendering engine. This is a good example of how CSS features that work perfectly in isolation can interact poorly. It is also a reminder that shipping a feature first does not mean shipping it correctly. Safari deserves credit for leading on text-wrap: pretty, but this interaction should have been caught before release.

**Key takeaways:**
- text-wrap: pretty works well alone and text-align: justify works well alone, but the combination produces inflated whitespace
- The dynamic programming algorithm targets slightly narrower lines than max width, and justification then overstretches them
- This is a WebKit bug that should be fixed by making the line-breaking algorithm aware of justification mode
- A good reminder that CSS feature interactions are a significant testing challenge

**Link:** [Justifying text-wrap: pretty](https://matklad.github.io/2026/02/14/justifying-text-wrap-pretty.html)

## CSS Selectors Level 5: The Working Draft Drops

**TLDR:** The W3C published a new working draft of CSS Selectors Level 5, introducing pseudo-classes like :local-link, :interest-source/:interest-target, :blank, :heading(), time-dimensional selectors, the :state() pseudo-class for custom elements, and the column combinator.

**Summary:**

A new working draft of CSS Selectors Level 5 landed on February 17, and it is packed with additions that have been deferred from earlier Selectors 4 drafts. The :local-link pseudo-class lets you style links based on whether they point to the current site, with a functional form that matches specific path depth levels. The :interest-source and :interest-target pseudo-classes formalize the concept of hover-triggered popups at the selector level, working with the new interestfor HTML attribute. The :blank pseudo-class finally gives you a way to style empty form inputs. The :heading() functional pseudo-class matches heading elements by their semantic level rather than their tag name, which matters for accessibility where an h1 might have a computed heading level of 3. And the column combinator (||) enables styling table cells by their column membership.

Most of these are things that have been discussed and deferred for years. The fact that they are being consolidated into Level 5 suggests the working group is clearing the backlog. Whether browsers will prioritize implementing these anytime soon is another question entirely. The Interop project notably does not include any Selectors Level 5 features in its 2026 focus areas, which suggests these are still a ways from cross-browser reality.

**Key takeaways:**
- :local-link for styling internal vs external links with optional path-depth matching
- :interest-source/:interest-target for formalizing hover popup patterns
- :blank for empty form inputs, :heading() for semantic heading levels
- Column combinator (||) for styling table cells by column
- Time-dimensional pseudo-classes :current, :past, :future for synchronized media
- These are working draft additions -- production use is likely years away

**Link:** [Selectors Level 5 Working Draft](https://www.w3.org/TR/2026/WD-selectors-5-20260217/)