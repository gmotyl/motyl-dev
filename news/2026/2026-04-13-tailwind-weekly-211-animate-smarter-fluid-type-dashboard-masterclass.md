---
title: "Tailwind Weekly #211: Animate Smarter, Fluid Type Done Right, and a Dashboard Design Masterclass"
excerpt: "Animation performance tiers, fluid typography that actually respects user preferences, Steve Schoger's AI-assisted dashboard masterclass, and a handful of useful tools for Tailwind developers."
publishedAt: "2026-04-11"
slug: "tailwind-weekly-211-animate-smarter-fluid-type-dashboard-masterclass"
hashtags: "#tailwind #css #frontend #webdev #animation #typography #uidesign #generated #en"
source_pattern: "Tailwind Weekly - A weekly newsletter about Tailwind CSS"
---

## The Web Animation Performance Tier List

**TLDR:** Matt Perry from Motion breaks down the browser render pipeline into a practical tier list — from compositor-thread S-Tier animations down to DOM-thrashing F-Tier disasters. This is the animation performance explainer you bookmarked three times and never actually read. Now read it.

There is a tier list format floating around the internet for ranking everything from fighting game characters to breakfast cereals, and I think applying it to web animation performance is genuinely one of the better ideas I've seen in technical writing lately. Matt Perry does exactly that, and the result is one of those articles you find yourself forwarding to your whole team.

The core insight, which sounds obvious once you hear it but trips up a lot of developers, is that the browser render pipeline has three steps — layout, paint, and composite — and triggering any one of them also triggers everything after it. So layout is always the most expensive, composite is cheapest, and your goal should be to live in that compositor-thread S-Tier where `transform` and `opacity` animations run entirely on the GPU while your main thread is busy doing whatever else you threw at it.

Where this gets genuinely interesting is the CSS variables section. You might be animating a CSS variable that feeds into an `opacity` value and feel good about it. But here is the problem: changing a CSS variable triggers a paint on affected elements regardless of what that variable is used for. And if you are animating a *global* CSS variable, you potentially trigger style recalculations across the entire document tree. Perry found a real production site doing exactly this — updating a global CSS variable every frame, causing style recalculations on over 1300 elements and burning the entire 120fps frame budget just on that one operation. Replacing it with targeted `element.style.transform` updates dropped that cost to nearly nothing.

The B-Tier section on FLIP-based layout animations is worth your attention too. The technique — First, Last, Invert, Play — lets you animate an element's size and position without triggering layout every frame. You measure once upfront, then animate only `transform`. That single DOM measurement takes what would be a D-Tier layout-thrashing animation and makes it behave like an A-Tier compositor animation in practice.

The F-Tier (DOM thrashing) section is a good reminder of how easy it is to accidentally interleave reads and writes in a component-based architecture where multiple libraries are reading `offsetWidth` and writing `element.style` without coordinating with each other.

The one thing I wish the article addressed more directly: the advice around `will-change` is practically useful but leaves some questions open about when browsers will spontaneously promote elements to their own layer anyway. There is a lot of "the browser decides" here, and profiling guidance would have been welcome. Still, at nearly 4000 words, this is about as thorough a treatment of web animation performance as you will find in a single article.

**Key takeaways:**
- `transform`, `opacity`, `filter`, and `clip-path` are your compositor-thread S-Tier properties — animate these and stay smooth
- Animating CSS variables always triggers paint; animating a globally inherited CSS variable can nuke your entire render budget
- Use `@property` with `inherits: false` to scope CSS variable animations and avoid the inheritance recalculation bomb
- FLIP technique (measure once, animate with transform) upgrades layout animations from D-Tier to effectively A-Tier
- DOM thrashing (interleaved reads and writes) is F-Tier and easy to introduce accidentally when mixing libraries
- `IntersectionObserver` for scroll-triggered animations is more performant than reading `scrollTop`

**Why do I care:** As someone who has spent more time than I care to admit debugging janky animations in production, I find this tier list framework genuinely useful for reasoning quickly about why something is slow. The specific warning about CSS variable inheritance is something I have seen bite teams who thought they were being clever by animating design tokens. The framing is practical enough that I would put this in a new frontend developer onboarding doc without hesitation.

**Link:** [The Web Animation Performance Tier List](https://motion.dev/magazine/web-animation-performance-tier-list)

---

## Reimagining Fluid Typography

**TLDR:** Miriam Suzanne from OddBird makes a compelling case that most fluid typography implementations are broken for users who actually set custom font-size preferences in their browser. The fix turns out to be surprisingly simple: stop setting a root font size at all, and if you need responsiveness, add a small `vw`-based nudge relative to whatever the user already chose.

Here is a situation that probably sounds familiar. You design a site with 24px body text. The default browser font size is 16px, so you set `html { font-size: 1.5em; }` and call it a day. Then someone who prefers larger text sets their browser default to 24px, visits your site, and now your body text is rendering at 36px. You applied their preference so hard it broke it. They either suffer through the oversized text or go turn off their preference. The lesson developers draw from this is "users don't set font size preferences." The reality, as Suzanne points out, is that we taught them their preferences don't work.

The tools like Utopia that generate fluid type scales with `clamp()` have the same underlying problem. They assume 1rem equals 16px in their math. That assumption holds under default browser settings, but the moment anyone deviates, the whole scale shifts in a way the user did not ask for.

Suzanne's position is that the correct root font size is no root font size. Let the browser default — which is already the user's preference — be the base. Then, if you want your typography to respond to viewport width, you add a slight responsive layer on top of that user default rather than replacing it. Her proposed formula `clamp(1em, 0.9em + 1vw, 1.5em)` is interesting because the reference point is always the user's chosen base size. You are adding responsiveness *relative to their intent* rather than chasing a pixel target that assumes 16px is universal truth.

She is appropriately cautious here — she says explicitly she is not ready to call this a new best practice, just that she thinks it is worth exploring. I respect that. A lot of CSS articles present tentative experiments as settled guidance, and this one does not. What I think is clearly settled is the underlying diagnosis: doing `16px == 1em` arithmetic in your head while writing em and rem values is wrong and leads to fragile systems.

There is also a broader point here about user control that gets at something worth sitting with. Browsers used to let you set an exact pixel preference. Chromium has moved to a small/medium/large selector. That simplification makes sense for casual users but removes expressiveness for people who actually depend on font size accessibility settings. The web platform keeps nudging users away from control, and then we act surprised when accessibility preferences are underused.

**Key takeaways:**
- Setting `html { font-size: 1.5em; }` (or similar) multiplies the user's preference on top of itself, doubling the problem for users who set larger defaults
- The most reliable root font size is no root font size — let the browser default stand
- Utopia-style fluid scales that convert from px to rem by assuming 16px will break for non-default preferences
- For responsive typography that respects user choice, try `font-size: clamp(1em, 0.9em + 1vw, 1.5em)` — you are scaling relative to their preference, not overriding it
- Stop doing mental math with `16px == 1em` — ask yourself whether that math holds across the full range of user preferences (it does not)

**Why do I care:** I have built fluid type systems using Utopia and similar tools and never thought carefully about what happens when a user's default font size is not 16px. This article made me realize I have shipped sites that actively work against the accessibility preferences of users who need larger text. The `clamp(1em, ...)` approach is something I want to try in my next project. The argument is tight, the fix is small, and the problem it solves is real.

**Link:** [Reimagining Fluid Typography](https://www.oddbird.net/2025/02/12/fluid-type/)

---

## Steve Schoger's Dashboard Design Masterclass with Claude Code and Wispr Flow

**TLDR:** Steve Schoger, the designer behind Refactoring UI, published a new video walking through how he takes an AI-generated dashboard and turns it into something that actually looks professionally designed. He uses Claude Code for the implementation side and Wispr Flow for voice-driven workflow. It is free and the quality is the kind of thing you would have paid for a few years ago.

If you watched Schoger's first video in this series, you know the format. An AI-generated UI is functional but visually mediocre. He then walks through the specific design decisions that separate something that looks auto-generated from something that looks deliberate: spacing, hierarchy, color usage, component consistency. The practical tips land because they are grounded in actual before-and-after decisions you can observe on screen.

What is interesting about this particular video is the workflow layer. Wispr Flow is a voice-dictation tool that lets you issue commands and write code without touching the keyboard, and seeing it integrated into a design-to-code flow shows how these tools are starting to compose. You talk, the code changes, you evaluate, you talk again. It is genuinely faster for certain kinds of iterative design work where you know what you want but typing it out is slower than thinking it.

The content itself would hold up as a paid course. That it is being released as content marketing for ui.sh — the Tailwind team's AI UI design tool currently in closed beta — is a choice worth noting. The promotional angle exists but it is not the point. The design instruction is real.

The ui.sh tool itself keeps showing up in newsletter snippets. Adam Wathan posted a quick demo showing it generating multiple design variations to choose from regardless of tech stack. Jonathan Reinink hinted the beta users are hammering the MCP server, which usually means a release is not far off. The Tailwind team has been careful about how they are rolling this out, and the content-first approach to the launch is an interesting contrast to how most dev tools are marketed.

**Key takeaways:**
- Schoger's video is a practical design masterclass packaged as free content — worth watching regardless of whether you use the promoted tools
- Voice-driven workflows via tools like Wispr Flow are composing with AI coding tools in ways that meaningfully speed up iterative design work
- ui.sh from the Tailwind team is in closed beta and, based on public demos and beta user commentary, getting close to a broader release
- The pattern of releasing high-value educational content as marketing for a product is genuinely different from the usual launch playbook

**Why do I care:** The gap between "AI-generated UI" and "professionally designed UI" is still large, and most of what I see in the wild stays on the wrong side of that gap. Videos that teach the specific moves to cross that gap have immediate practical value. The voice workflow angle is also something I have been skeptical about, but watching it demonstrated in context — rather than in a promotional demo — is more convincing.

**Link:** [Tailwind Weekly #211 — full issue](https://tailwindweekly.com/issue-211/?attribution_id=69d9cf3bcdb61700015e4f65&attribution_type=post)

---

## New Life-Like Easing in CSS with linear()

**TLDR:** The `linear()` easing function in CSS lets you create spring-like, bouncy, elastic, and physically plausible animation curves without JavaScript. Tools like the Easing Wizard generate the ready-to-paste `linear()` value for you based on spring physics parameters you set visually.

For years, if you wanted animation easing that felt alive — a bounce at the end of a dropdown, an elastic snap when a card flips into place, that subtle anticipation before an element moves — you reached for a JavaScript animation library. CSS gave you `ease`, `ease-in`, `ease-out`, `ease-in-out`, and `cubic-bezier`. That was it. The `linear()` function changes that calculus.

The idea is that you can define an arbitrary easing curve as a series of linear segments, and with enough segments you can approximate any curve with high fidelity. The generated values look like `linear(0, 0.009, 0.035 9.1%, 0.141, 0.281 27.3%, 0.878 45.5%, 1.055, 1.111 59.1%, 1.097, 1.063 72.7%, 1.004 81.8%, 0.991, 1)` — not something you write by hand, but something you generate from a tool and paste into your `transition-timing-function` or `animation-timing-function`.

The practical payoff is that you get spring physics, bounces, and overshoots natively in CSS, which means the animations can be hardware accelerated and compositor-thread eligible in ways that some JavaScript-driven equivalents are not. It also means fewer dependencies for what should be a presentational concern.

Browser support is solid enough now that this should be on your radar for new projects. The Easing Wizard referenced in the newsletter is a good starting point for generating values and understanding the relationship between spring stiffness, damping, and the resulting curve shape.

**Key takeaways:**
- `linear()` accepts a series of easing stops that together define an arbitrary curve, enabling spring physics and bounce effects natively in CSS
- You do not write these values by hand — use a generator like Easing Wizard, adjust stiffness and duration visually, and copy the result
- Native CSS easing means these animations can stay compositor-thread eligible, unlike some JS-driven spring implementations
- Use in `transition-timing-function` or `animation-timing-function` wherever you currently reach for JS for bounce and spring effects

**Why do I care:** Spring-based easing is one of those things that makes interfaces feel physical and grounded rather than mechanical. I have been pulling in Framer Motion or GSAP for this for years. Having it available as a CSS function that works with standard `transition` declarations is a meaningful reduction in complexity for a category of UI interactions I care about.

**Link:** [Tailwind Weekly #211 — New life-like easing in CSS](https://tailwindweekly.com/issue-211/?attribution_id=69d9cf3bcdb61700015e4f65&attribution_type=post)

---

## GetWaves — Custom SVG Wave Generator

**TLDR:** GetWaves is a browser-based tool for generating custom SVG wave shapes for hero sections, section dividers, and backgrounds. You adjust shape, complexity, and color in the browser and export the SVG. There is also a Figma plugin.

There is not much to say about this one beyond: it works, it is free, and it covers a repetitive task well. If you have ever spent twenty minutes hand-tweaking an SVG wave path or struggling with a generator that only exports bitmaps, this is the tool. You set the shape parameters, pick your colors, and copy the SVG markup directly into your Tailwind component.

The Figma plugin integration is a practical touch for teams where designers and developers are working in the same file before handoff. Rather than the designer exporting a PNG of a wave background and the developer trying to recreate it in SVG, both sides can work from the same generated SVG source.

For Tailwind users specifically, the output drops into an `absolute` positioned div behind your hero content without friction. The wave shapes work well with gradient backgrounds that Tailwind's color utilities generate.

**Key takeaways:**
- Browser-based, free, no signup required — generates clean SVG wave markup you paste directly into your component
- Shape, complexity, and color are all adjustable with immediate preview
- Figma plugin available for design-to-code workflow consistency
- SVG output works well with Tailwind's layout and color utility classes

**Why do I care:** Wave section dividers are one of those small visual details that read as "designed" rather than "defaulted" when done well and as clip-art when done badly. Having a fast, reliable generator for this specific shape type saves time and reduces the temptation to use a raster image where an SVG belongs.

**Link:** [GetWaves](https://getwaves.io/)

---

## Wirewiki — DNS and Internet Infrastructure Explorer

**TLDR:** Wirewiki is a DNS and internet infrastructure tool with a clean interface for DNS propagation checks, record lookups, DNS trace, and more. It also has a "DNS for Developers" learning section.

This one is a bit of an outlier in a Tailwind newsletter, but it keeps showing up in frontend-adjacent resources lists for a reason. If you are a frontend developer who also handles deployment, domain setup, or debugging production issues where "the site works on my machine," DNS tools are something you reach for more than you expect. Wirewiki consolidates the DNS lookup, propagation checker, SPF record lookup, MX lookup, and DNS trace into one clean interface.

The DNS for Developers learning section is worth a bookmark separately. It is the kind of foundational knowledge that gets skipped in frontend bootcamps and self-taught paths, and then shows up as a blind spot when something breaks at 2am.

The interface is well designed — fast, keyboard-navigable (Ctrl+K), and clean. Given the topic is DNS tooling, which historically lives in utilitarian tools built for sysadmins, the UX here is noticeably better than most of the alternatives.

**Key takeaways:**
- Covers DNS lookup, propagation checking, SPF/MX/TXT/CNAME/A record lookup, and DNS trace in one place
- DNS for Developers learning section is a useful reference for frontend developers who are less comfortable with infrastructure
- Clean, fast interface with keyboard navigation — better UX than most DNS tooling alternatives

**Why do I care:** I have used whois, dig, nslookup, and half a dozen web-based DNS checkers depending on what was available and what I remembered. Having one tool with a good interface that covers all these cases is a small but real improvement to the debugging workflow.

**Link:** [Wirewiki](https://www.wirewiki.com/)
