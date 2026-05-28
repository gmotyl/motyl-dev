---
title: "CSS Centering in 2026, Google's AI Search Gamble, WordPress 7.0, and More"
excerpt: "From a deep dive on CSS centering and what's still missing from layout, to Google quietly dismantling the open web, plus asm.js retirement, sibling-index(), view transitions at scale, and whether AI is repeating frontend's lost decade."
publishedAt: "2026-05-28"
slug: "css-centering-2026-google-ai-search-wordpress-7"
hashtags: "#frontendfocus #css #html #javascript #accessibility #animation #webdev #performance #generated #en"
source_pattern: "Frontend Focus"
---

## The State of CSS Centering in 2026

**TLDR:** CSS centering is not actually hard, but there are now well over a hundred documented ways to do it. The real problem is picking the right one for your situation, and several newer features like `text-box`, safe alignment, and `anchor-center` make the space more interesting than ever.

**Summary:** There's a certain exhausted familiarity to yet another article about centering things in CSS. And yet this one actually earns its place. The author catalogued over 100 ways to center an element, then went through the work of marking roughly 60 of them as hacky or not recommended, leaving a more manageable core of under 15 genuinely valid approaches. Most of those are just the same idea written slightly differently. So the number is sensational, but the underlying message is real: there are many methods because there are many layout contexts, and treating them as interchangeable is how you end up with subtle bugs that only show up when content changes size.

The piece covers the well-known Flexbox vs. Grid debate, but what I found genuinely useful were the sections on newer features. The `text-box` property is one I hadn't explored properly. It trims the extra whitespace that fonts bake in above and below characters, which is why centering text vertically often looks slightly off even when the math is technically correct. One line, `text-box: cap alphabetic`, and the visual result actually matches the CSS reality. That gap between "centered according to the box model" and "centered to the human eye" has annoyed me for years.

The coverage of safe and unsafe alignment is also worth your time. By default, if a centered element overflows its container, the browser keeps centering it, which means parts of your content can become unreachable even with a scrollbar. Adding the `safe` keyword to your alignment tells the browser to shift the element to the nearest edge if overflow would otherwise clip it. It's a small addition that matters a lot for dynamic content, and most developers I know have never used it intentionally.

Anchor positioning adds yet another layer. The `anchor-center` value for `justify-self` means "center relative to the anchor element itself, not relative to the positioned area." That distinction is confusing until you see it in motion, and the interactive demo in the article makes it click. The broader lesson is an old one restated well: understand the model before you copy the code.

**Key takeaways:**
- There are roughly 10 to 15 genuinely distinct ways to center an element; everything else is a variation or a hack
- `text-box: cap alphabetic` trims font whitespace for visually precise vertical centering
- Safe alignment (`place-content: safe center`) prevents content clipping on overflow
- `anchor-center` centers relative to an anchor element's actual position, not the containing area

**Why do I care:** Because I still see senior developers reaching for `transform: translate(-50%, -50%)` in 2026 when `inset: 0; place-self: center` exists. The author even calls the old transform trick "hacky" at this point, which is a strong take but not wrong. Knowing which method fits which layout context is the kind of craft that separates people who understand CSS from people who cargo-cult it.

**Link:** [The State of CSS Centering in 2026](https://css-tricks.com/the-state-of-css-centering-in-2026/)

---

## What's Still Missing From CSS Layout

**TLDR:** A developer surveyed the CSS community about layout pain points and what features they wish existed. The results are a mix of old frustrations and genuinely interesting gaps, with overflow and wrap detection topping the wish list by a wide margin.

**Summary:** This article is the kind of thing that makes you nod repeatedly and occasionally mutter "yes, finally someone wrote this down." The author covers two fronts: pain points people reported in the 2025 State of CSS survey around Grid and Flexbox, and a separate mini-survey asking what people actually want from CSS layout that doesn't exist yet.

The Grid frustrations are familiar. The syntax is verbose. Property names are long and hard to remember. The mental model around tracks, implicit vs. explicit grids, and template areas takes real investment to internalize. Experienced developers still look things up. The confusion between when to use Grid versus Flexbox persists, in part because the feature overlap is significant but the mental models are genuinely different.

On the Flexbox side, the sizing and shrinking behavior is where people consistently struggle. The interaction between `flex-grow`, `flex-shrink`, and `flex-basis` is not intuitive. Items shrink below their content size unexpectedly. The `min-width: 0` hack feels like something we shouldn't need in 2026. Wrapping is another weak point. Once items wrap, you lose most of your control. There's no per-line alignment, no way to detect that wrapping happened, no way to style widowed items differently.

The wish list is more interesting. Overflow and wrap detection leads with about 12 mentions. The need is straightforward: when content overflows or wraps, you often want to respond visually, collapsing items, showing a badge, adding scroll affordances. Right now that requires JavaScript. The author argues this single addition would unlock more responsive design possibilities than almost anything else on the list. CSS Regions for flowing text between containers, CSS Exclusions for wrapping text around shapes, and repositioning elements across DOM boundaries all appeared multiple times.

Reading this list alongside the CSS centering article creates a kind of tension. On one hand, CSS layout has become remarkably capable. On the other, the gaps between what print design could do in 1995 and what the web can do natively in 2026 are still embarrassingly large for certain use cases.

**Key takeaways:**
- Overflow and wrap detection is the most-requested missing CSS feature, requiring JS workarounds today
- Grid and Flexbox pain points remain consistent: verbose syntax, confusing mental models, hard-to-predict sizing
- CSS Regions and Exclusions for editorial/magazine layouts are still missing from the web platform
- Moving elements visually without touching the DOM structure is still not possible in pure CSS

**Why do I care:** The wrap detection gap is something I feel in real projects. The pattern of "collapse nav items that don't fit and show a +N badge" requires JavaScript, and it always feels like an overengineered solution to what should be a CSS problem. If I had to pick one item from this whole list to land in browsers, it would be exactly what the author chose.

**Link:** [Patrick - What's missing in CSS layout](https://patrickbrosset.com/articles/2026-05-20-whats-missing-in-css-layout/)

---

## Ad Infinitum: Google's AI Search and the End of the Open Web Contract

**TLDR:** At Google I/O, the company announced generative UI replacing search results while conspicuously mentioning nothing about ads. A look at the research reveals that the new ad model embeds paid content directly inside AI-generated answers, with no visible boundary between sponsored and organic.

**Summary:** This is the piece I kept thinking about long after I finished reading it. Matthias Ott starts from a pointed observation: Google announced its biggest transformation of Search in 25 years, demonstrating AI-generated results, personal agents with full access to your Gmail and files, and interactive widgets built on the fly by Gemini. And across all of it, not a single word about how any of it will be monetized. That's odd for a company that generated $295 billion in advertising revenue last year.

The research Ott found explains why. Google's own researchers have been working on models where advertising doesn't happen next to the answer. It happens inside the answer. One approach auctions off influence over the actual tokens the model generates, with competing LLMs bidding to shape the next word. Another, more directly relevant to the new search, is "prominence allocation": when a user submits a query with commercial intent, an auction determines not which ads appear but how many words of enthusiasm each advertiser gets within the AI's response. Thirty-five words for this product, twenty for that one, zero for the competitor. The ad is the answer.

Google's Marketing Live event, held the day after I/O for advertisers rather than developers, made this explicit. Ads are already running inside AI Mode. Advertisers can no longer choose keywords; they hand control to Google's system. "Highlighted Answers" can appear as items in any AI recommendation list, written by Gemini to explain why a product "may be the right choice for you," framed as objective advice.

The web has operated on an implicit contract for 25 years. Publishers provide content, Google indexes it, users click through, value flows back to the source. That contract assumed the link as the unit of exchange. Generative UI absorbs content, synthesizes it, and presents it as Google's answer. The open web was useful scaffolding for building the index and training the models. The question Ott raises, quietly but sharply, is what happens to that scaffolding now that the building stands on its own.

**Key takeaways:**
- Google's new search replaces discrete ad slots with AI-generated answers where paid content is embedded inline
- "Prominence allocation" means advertisers bid for how much emphasis the model gives their product in its response
- The traditional link-based exchange between Google and web publishers is being phased out
- Advertiser control is being replaced by Google's automated systems, eliminating keyword targeting

**Why do I care:** As someone who builds for the web, this is not a peripheral concern. The traffic model that sustained independent publishing is changing faster than people realize, and the incentives are not aligned with content quality or user trust. This is worth understanding, not to be alarmed, but to think clearly about what we're building and for whom.

**Link:** [Ad Infinitum - Matthias Ott](https://matthiasott.com/notes/ad-infinitum)

---

## WordPress 7.0 "Armstrong"

**TLDR:** WordPress 7.0 arrives with a rebuilt AI integration layer, a modernized dashboard, new blocks, and a comprehensive developer API expansion. It represents a significant architectural shift toward AI-native content creation.

**Summary:** WordPress 7.0 is named after Louis Armstrong, which the release notes describe with the kind of soaring prose WordPress reserves for major milestones. Beneath the metaphors, this is a genuinely significant release, particularly for how it positions AI within the platform's architecture rather than treating it as a plugin concern.

The headline feature is a new AI Client in Core, a first-party mechanism for WordPress to communicate with generative AI models. This pairs with an Abilities API that standardizes how AI functionality is exposed to users and developers. There's a new Client-Side Abilities package on the JavaScript side, with a built-in command palette and UI. The practical result is that capabilities like generating excerpts, suggesting alt text, creating titles, or editing images are now available at the core level, managed from a central Connectors screen where you authenticate your AI service of choice.

The dashboard also got a full visual overhaul. Smooth transitions between screens, a new color scheme, and a command palette accessible via the standard keyboard shortcut make it feel contemporary in a way the old admin interface did not. Font management now lives in a dedicated page that works across block, hybrid, and classic themes. Revision history gets visual scrubbing, which is a small feature with real quality-of-life impact for editorial teams.

For developers, the release expands server-side block registration to PHP-only patterns, makes the Site Editor more extensible with routing and custom page support, and adds a new boot package for plugins that want to build within the editor's shell. Over 875 contributors were involved, including more than 200 first-timers, which continues to be one of WordPress's most impressive attributes as an open source project.

**Key takeaways:**
- AI is now built into Core via the AI Client and Abilities API, not just available through plugins
- A new Connectors screen centralizes management of all AI service connections
- Dashboard redesign brings modern visual polish and a command palette to the admin
- PHP-only server-side block registration simplifies developer workflows significantly

**Why do I care:** The AI integration strategy here is thoughtful. By building a standardized Abilities API rather than just shipping a plugin, WordPress is positioning itself to work with multiple AI providers without locking the ecosystem to one. For a platform that powers a large portion of the web, getting this architecture right matters more than any individual feature.

**Link:** [WordPress 7.0 "Armstrong"](https://wordpress.org/news/2026/05/armstrong/)

---

## Designing Firefox for the Future

**TLDR:** Mozilla is shipping a major Firefox redesign called Project Nova later this year, with a warmer visual language, refreshed tab design, privacy features pulled forward, and more customization options including the return of compact mode.

**Summary:** Mozilla's Project Nova is a renewal of Firefox's design, not a replacement, which is exactly the right framing for what they've done. The changes are visible but not disorienting. Tabs have a softer shape with a subtle gradient to give the active tab more presence. Components are more rounded and consistent across the interface. Icons have been updated. The color palette draws from the feeling of fire, which sounds like marketing copy until you see the deep purples and warm glows around the active tab, at which point it actually makes sense.

The practical improvements matter as much as the aesthetic ones. Privacy features are more visible by default, including the built-in VPN and private browsing. Settings pages have been rewritten with plainer language and clearer controls, including the ability to fully disable AI features. Tab groups, split view, and vertical tabs are more accessible without being intrusive. And compact mode is coming back, which suggests someone at Mozilla actually reads user feedback.

The note about speed is worth taking seriously. Firefox improved load times for key page content by 9% over the last year, and the design is organized to make productivity features like split view more accessible without adding visual noise. There's also an explicit commitment to accessibility: contrast ratios, focus states, keyboard behavior, target sizes, and dark mode as a genuine primary environment rather than an afterthought.

Mozilla is building this in the open and explicitly asking for feedback. The design system being developed internally will make future feature additions feel integrated rather than bolted on, which has been a recurring criticism of Firefox's interface as various features landed without a coherent visual language tying them together.

**Key takeaways:**
- Project Nova refreshes Firefox's visual design with warmer tones, softer tabs, and consistent components
- Compact mode returns in response to user requests
- Privacy controls are more prominent, with clear options to disable AI features entirely
- The redesign extends to mobile with shared colors and icons for cross-device consistency

**Why do I care:** Firefox is worth caring about. Having a genuinely independent browser with its own rendering engine is important for the health of the web platform. This redesign looks like real craft work, not a checkbox exercise, and the accessibility focus gives it credibility beyond the visual refresh.

**Link:** [Designing Firefox for the Future](https://blog.mozilla.org/en/firefox/new-firefox-design/)

---

## Saying Goodbye to asm.js

**TLDR:** Firefox 148 disables asm.js optimizations by default, with full removal planned in a future release. The code keeps running through regular JIT. WebAssembly is the recommended migration path.

**Summary:** OdinMonkey, the asm.js optimizing compiler in SpiderMonkey, has been disabled by default as of Firefox 148. It's a quiet ending to something that was once genuinely exciting technology, and the Mozilla blog post handles it with the right combination of respect for the history and clarity about why it's time.

Asm.js shipped in Firefox 22 in 2013. The idea was elegant: take a strict, statically-typed subset of JavaScript that an engine could recognize on the fly and compile to native code. This was Mozilla's answer to the question that NaCl and PNaCl were also trying to solve, specifically how to run C and C++ code at near-native speeds in a browser without a separate sandbox or non-standard APIs. The Epic Citadel demo ported from Unreal Engine to asm.js in four days was a genuine landmark. Unity and Unreal shipping to the web for the first time was not a small thing.

The reason it's being retired now is straightforward. WebAssembly, which arrived in Firefox 52, has taken over. It does everything asm.js did but better, with faster execution, smaller binaries, and proper toolchain support. The asm.js optimization path alongside WebAssembly is pure maintenance cost with no upside, and it represents additional attack surface in the VM.

Existing asm.js code does not break. It just runs through the regular JIT like any other JavaScript, which means it works but without the specialized optimization path. If you're still shipping asm.js content, the recommendation is clear: recompile to WebAssembly.

The post uses Norse mythology to frame the retirement, since OdinMonkey's replacement, BaldrMonkey, is named after the Norse god who rules the reborn world after Ragnarök. It's a bit much, but also kind of charming for a technical post about deprecating a compiler.

**Key takeaways:**
- asm.js optimizations are disabled in Firefox 148 with full removal coming in a future release
- Existing asm.js code still runs via the standard JIT, so nothing breaks
- WebAssembly is the correct modern equivalent with better performance and smaller output
- asm.js was instrumental in proving that near-native web performance was possible, which led directly to WebAssembly

**Why do I care:** This is a clean deprecation story. Technology that solved a real problem, got superseded by something better it helped create, and exits gracefully without breaking anything. Web platform evolution should always look like this, but rarely does.

**Link:** [Saying goodbye to asm.js](https://spidermonkey.dev/blog/2026/05/20/saying-goodbye-to-asmjs.html)

---

## CSS vs. JavaScript Animation Performance

**TLDR:** CSS animations don't outperform JavaScript animations because they do less work. They run on a separate thread from the main thread. The Web Animations API gives JavaScript libraries like Motion the same advantage, which is why Motion stays smooth when the main thread is busy.

**Summary:** Josh Comeau's article on this topic cuts through a piece of received wisdom that most developers hold without fully examining it. The common belief is that CSS animations are faster than JavaScript animations. The common explanation is that JavaScript has overhead, parsing costs, and bridge-crossing between script and DOM. All of that is technically true but largely irrelevant, because modern browser engines handle those calculations in fractions of a millisecond that have no impact on animation framerate.

The actual reason CSS transitions and keyframe animations outperform naive JavaScript loops is simpler and more interesting. CSS animations run on a separate compositor thread. JavaScript animation loops run on the main thread, competing with React reconciliation, fetch response parsing, user input handling, and everything else the application is doing. When the main thread gets blocked for even a hundred milliseconds, a JavaScript animation stutters. A CSS animation just keeps going because it never needed the main thread to begin with.

The comparison against Motion (formerly Framer Motion) is where it gets interesting. Motion is JavaScript-based, so the expectation would be that it stutters with the main thread. But it doesn't. The reason is that Motion uses the Web Animations API under the hood. WAAPI is a JavaScript interface that hooks into the same low-level animation engine CSS uses, which means it gets compositor thread scheduling without requiring pure CSS. GSAP, by contrast, doesn't use WAAPI, so it does stutter, not because of a technical failure but because it's optimizing for different trade-offs including features that aren't compatible with the WAAPI model.

The practical guidance is clear. Prefer native CSS when you can. When you need JavaScript for animation logic, reach for a library that uses WAAPI. The cases where you actually need something like GSAP are narrower than most developers assume.

**Key takeaways:**
- CSS animations run on the compositor thread and are unaffected by main thread blocking
- JavaScript animation loops run on the main thread and will stutter during busy application activity
- Motion uses the Web Animations API to get compositor thread scheduling from JavaScript
- GSAP runs on the main thread but offers features that WAAPI doesn't support, so it's a different trade-off

**Why do I care:** I've seen a lot of animation performance debugging over the years. Most of the time when "CSS is faster" comes up, the real problem is someone running a requestAnimationFrame loop in the same tick as a heavy state update. Understanding why CSS is faster helps you fix JavaScript animations rather than just avoiding them.

**Link:** [CSS vs. JavaScript](https://www.joshwcomeau.com/animation/css-vs-javascript/)

---

## Don't Put aria-label on Generic Elements Like Divs

**TLDR:** The ARIA spec explicitly prohibits naming elements with the "generic" role, which includes divs and spans. Browser and screen reader behavior is inconsistent and unpredictable when you do it, with some announcing the label and others completely ignoring it.

**Summary:** This is one of those articles that confirms something you suspected but had not formally documented. The ARIA specification lists roles that cannot be named, and "generic" is on that list. Divs and spans have the generic role by default. Putting `aria-label` on them is technically prohibited, but more practically, it produces wildly inconsistent behavior across browsers and screen readers.

Manuel Matuzovic ran the tests. VoiceOver on Safari for macOS announces the label as "News, group." VoiceOver on iOS ignores the label and reads the text content instead. Talkback in Chrome announces "News" while Talkback in Firefox ignores it. JAWS and NVDA across different browser combinations either ignore the label and read the content, or announce the label. Narrator on Windows announces both the label and the content. That's the full range of possible behaviors across roughly eight combinations tested, and they're almost entirely inconsistent.

The practical implication is that if you're using `aria-label` on a div to communicate information to screen reader users, about half your users might not receive that information at all, depending on which screen reader and browser combination they use. The solution is not to label divs but to use semantically appropriate elements or to change the role. The article covers two genuine exceptions worth knowing: `section` elements change their implicit role from generic to region when labeled, making labeling appropriate, and the `popover` attribute on a div changes the implicit role to group, which can be labeled.

The broader lesson is one that accessibility work keeps reinforcing. You cannot assume that setting an ARIA attribute produces consistent behavior. Testing across actual assistive technology combinations remains necessary, and using semantic HTML reduces the surface area for this kind of unpredictability in the first place.

**Key takeaways:**
- The ARIA spec prohibits naming elements with the "generic" role, which includes divs and spans
- Screen reader behavior when `aria-label` is applied to a div varies from announcing the label to fully ignoring it
- `section` elements labeled with `aria-label` or `aria-labelledby` change their implicit role from generic to region, which is fine
- The `popover` attribute changes a div's role to group, making labeling technically valid

**Why do I care:** Accessibility mistakes that look harmless are often worse than no attempt at all. A `div` with an `aria-label` you thought was communicating something to screen reader users but isn't affects roughly half the people using assistive technology, without any error to tell you something went wrong.

**Link:** [Don't put aria-label on generic elements like divs](https://www.matuzo.at/blog/2026/aria-label-generic-elements)

---

## Mathematical Layouts With sibling-index() and sibling-count()

**TLDR:** CSS now has `sibling-index()` and `sibling-count()` functions that return an element's position among its parent's children as actual integers you can use in calculations. Staggered animations, equal-width tabs, hue distribution, and radial layouts that previously required JavaScript or preprocessor tricks can now be done in one line of CSS.

**Summary:** This is the kind of CSS feature that makes you stop and think about all the times you've written ten `:nth-child()` rules to set a `--index` variable on each item. The problem was always obvious. The browser built the DOM tree. It knows which element is the third child. The data exists. CSS just couldn't access it. Now it can.

The functions are simple. `sibling-index()` returns the 1-based position of an element among its parent's element children. `sibling-count()` returns the total number of element children the parent has. Both resolve to integers you can use in `calc()`, `min()`, `max()`, and even trigonometric functions. Staggered animation delays collapse to one rule. Equal-width tab distribution becomes a single width calculation. Color hue distribution across a dynamic number of items becomes a one-liner using the hue angle divided by the sibling count. Radial positioning using `sin()` and `cos()` with the sibling index becomes pure CSS.

The article covers the gotchas thoroughly, which is where the real value is. Shadow DOM scoping means the functions see the shadow tree, not the flattened visual tree, which will cause surprises with Web Components. `display: none` elements still count because the functions read the DOM tree, not the layout tree, which breaks radial layouts and proportional widths when items are hidden. Custom properties set on a parent element capture the parent's sibling index, not the children's, so you have to apply the functions directly on the elements that need them.

Browser support is Chrome and Edge from version 138, Safari 26.2. Firefox has a positive spec position and active implementation work but hasn't shipped in stable yet. The progressive enhancement story is clean with `@supports`, and the existing fallback approaches work reasonably well until Firefox catches up.

**Key takeaways:**
- `sibling-index()` and `sibling-count()` give CSS access to an element's position in the DOM tree as usable integers
- Staggered animations, equal widths, hue distributions, and radial layouts can now be done without JavaScript
- `display: none` elements still count in the index, which breaks continuous-counting patterns
- Available in Chrome/Edge 138 and Safari 26.2; Firefox support is in progress

**Why do I care:** I write `:nth-child()` stacking rules often enough that this feels like solving a genuine recurring annoyance. The radial layout use case with native CSS trig is particularly satisfying. The display:none gotcha is the kind of thing that will bite someone in production, so worth filing away now.

**Link:** [Advanced Tree Counting: Mathematical Layouts With sibling-index() And sibling-count()](https://www.smashingmagazine.com/2026/05/mathematical-layouts-sibling-index-sibling-count/)

---

## Cross-Document View Transitions: Scaling Across Hundreds of Elements

**TLDR:** The key to scaling view transitions beyond tutorial examples is understanding that `view-transition-name` is a unique identity and `view-transition-class` is a styling hook, assigning names just-in-time on click rather than at page load, and wrapping all animation code in `prefers-reduced-motion: no-preference`.

**Summary:** Part two of this series on cross-document view transitions does what the title promises: it covers what happens when you move from the tutorial's one animated hero element to a real product grid with hundreds of items. The answers are practical and specific.

The central concept is the distinction between `view-transition-name` and `view-transition-class`. Name is identity. It tells the browser which element on page A corresponds to which element on page B. It must be unique per page. Class is a styling hook. It groups elements for shared animation rules, exactly like a CSS class groups elements for shared styles. With this separation, a site with thousands of products needs exactly three CSS rules to handle all transitions, regardless of how many products are in the database. One `::view-transition-group(*.card)` rule handles all of them.

Equally important is the just-in-time naming pattern. Putting `view-transition-name` on every card at page load means the browser snapshots every card on every navigation, including the 47 you didn't click. On mobile over LTE, that's the kind of thing that kills your transition or causes the browser to abandon it entirely. The solution is assigning the name only in the `pageswap` handler, at the moment the user clicks, targeting only the element they're navigating to. Clean up after `viewTransition.finished` resolves to avoid stale name conflicts on subsequent navigations.

The accessibility section is direct. People with vestibular disorders can get physically ill from unexpected motion. The `prefers-reduced-motion` media query is not optional. All animation customizations belong inside `@media (prefers-reduced-motion: no-preference)`, with a fallback block that forces `animation-duration: 0s` on all transition pseudo-elements. The browser already gracefully ignores view transitions on unsupported browsers, giving you full progressive enhancement for free.

**Key takeaways:**
- `view-transition-name` is a unique identity; `view-transition-class` is a shared styling hook - understanding both is how you avoid writing a rule per element
- Assign names just-in-time in `pageswap`/`pagereveal` handlers to avoid snapshotting the entire page on every navigation
- All animation customizations must be wrapped in `prefers-reduced-motion: no-preference`
- Unsupported browsers get normal page loads automatically; no fallback code is needed

**Why do I care:** The just-in-time naming pattern is the kind of thing tutorials skip because it complicates the example. It's also the difference between an animation that works in demos and one that works in production on real devices. Getting this right from the start saves a debugging session later.

**Link:** [Cross-Document View Transitions: Scaling Across Hundreds of Elements](https://css-tricks.com/cross-document-view-transitions-part-2/)

---

## Is AI Causing a Repeat of Frontend's Lost Decade?

**TLDR:** The author draws a direct parallel between how JavaScript frameworks deskilled frontend development over the past decade and how AI coding tools are now deskilling programming more broadly. Both are analyzed through the lens of industrial deskilling, the Bauhaus movement's response to industrialization, and what it means to care about craft.

**Summary:** This piece is longer and more philosophical than most technical writing, and it earns the length. The author's starting point is Alex Russell's concept of "Frontend's Lost Decade," the argument that JavaScript frameworks treated the browser as a compilation target, effectively deskilling the frontend by making it possible to build for the web without understanding HTML, CSS, browser differences, accessibility, or performance on constrained devices. A generalist who can wrangle a JavaScript framework can now be called a full-stack developer, which shifts bargaining power and lowers the value of deep frontend expertise.

The parallel to AI is not just an analogy. The author lived through the framework shift and sees the same mechanics at work. Skilled labor is being replaced by a technology operated by people with less specialized knowledge. The Wikipedia definition of deskilling fits both cases. The details considered "unimportant" by the abstraction are always consequential, and they always eventually leak through.

The Stack Overflow comparison is the sharpest insight in the piece. LLMs are an extension of copy-pasta. Google Search was a skill. Knowing which keywords to use to find the right forum post was genuinely useful knowledge. Over time, Google normalized that search, making it easier for people who hadn't developed the skill but less powerful for those who had. LLMs are the same curve accelerated. They enable people without deep knowledge to arrive at something that often kind of works. And when it doesn't work, someone needs to actually understand what went wrong.

The Bauhaus reference is not decorative. The movement responded to industrialization not by opposing it or by faking handcraft aesthetics, but by going back into the workshops, understanding the materials and the processes, and designing specifically for mass production with the end user in mind. The author's argument is that this is the right model for how programmers should relate to AI: understand what it actually does, design work with it in mind, and never stop caring about the people using what you build.

**Key takeaways:**
- JavaScript frameworks deskilled frontend development by abstracting away HTML, CSS, accessibility, and performance knowledge
- AI coding tools are doing the same thing to programming generally, through the same deskilling mechanism
- LLMs are best understood as an extension of copy-paste from Stack Overflow: useful when you understand what you're getting, risky when you don't
- The Bauhaus model, using new tools while staying grounded in materials and users, is the more productive response than either resistance or uncritical adoption

**Why do I care:** This piece says out loud something that's been harder to articulate. The thing I valued about frontend work was the intersection of deep technical knowledge with real user impact. That combination is genuinely harder to find work for now, and knowing why helps decide how to respond to it.

**Link:** [Is AI causing a repeat of Frontend's Lost Decade?](https://mastrojs.github.io/blog/2026-05-23-is-AI-causing-a-repeat-of-frontends-lost-decade/)

---

## ESLint CSS Plugin: Native CSS Linting

**TLDR:** ESLint now has a first-party CSS language plugin that lets you lint CSS files alongside JavaScript using the same ESLint configuration. It ships with rules for invalid properties, duplicate imports, missing fallback fonts, and more.

**Summary:** The ESLint team has been expanding language support beyond JavaScript, and the CSS plugin is a meaningful addition to that effort. You install `@eslint/css`, add a configuration block targeting CSS files, and you get the same `eslint.config.js`-based setup you use for your JavaScript code, applied to stylesheets.

The rule set covers real problems. Invalid properties, invalid at-rules, unmatchable selectors, duplicate keyframe selectors, empty blocks, missing font-family fallbacks, and a `use-baseline` rule that flags properties not yet in the Baseline set. There's also a `no-important` rule, which I imagine will generate some spirited configuration debate in teams. Several rules are disabled by default but available, including `prefer-logical-properties`, `relative-font-units`, and `selector-complexity`.

The plugin uses strict mode by default, which reports all parsing errors. A `tolerant` mode option exists for projects using PostCSS plugins or other non-standard CSS syntax, including Tailwind 4, which has its own `tailwind-csstree` package for compatibility. Custom syntax can be registered either as a CSSTree-format object or as a function that extends the default syntax, which gives teams room to handle proprietary or extended CSS without fighting the linter.

The ability to put ESLint disable comments inside CSS files follows the same syntax as JavaScript. Per-file, per-block, and per-line disabling all work as expected.

**Key takeaways:**
- ESLint's first-party CSS plugin brings native CSS linting to the standard ESLint config format
- Ships with recommended rules covering invalid properties, duplicate at-rules, missing font fallbacks, and baseline feature enforcement
- Tailwind 4 is supported via the `tailwind-csstree` package as a custom syntax extension
- Requires ESLint v9.15.0 or higher and the flat config system

**Why do I care:** I have a love-hate relationship with CSS linting. The tooling has always felt like a separate ecosystem you configure separately from everything else. Having this in ESLint's own config, using the same format as JavaScript rules, lowers the friction enough that I'd actually add it to new projects.

**Link:** [GitHub - eslint/css: CSS language plugin for ESLint](https://github.com/eslint/css)
