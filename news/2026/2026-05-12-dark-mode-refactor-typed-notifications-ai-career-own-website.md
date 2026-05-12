---
title: "Dark Mode Rabbit Holes, Typed Notifications, AI Career Clocks, and the Case for Your Own Website"
excerpt: "From a dark mode refactor that rewired an entire UI system to the unsettling idea that software engineering may have a finite career lifespan, this issue of daily.dev covers the technical and human sides of building software in 2026."
publishedAt: "2026-05-12"
slug: "dark-mode-refactor-typed-notifications-ai-career-own-website"
hashtags: "#dailydev #frontend #webdev #typescript #nodejs #ai #career #generated #en"
source_pattern: "daily.dev"
---

## I Thought Dark Mode Was Just a Toggle. It Turned Into a Full-System Refactor

**TLDR:** Adding dark mode to a personal website exposed every hardcoded color, every poorly-considered SVG, and a flash-of-wrong-theme bug that forced theme detection to move before the browser's first render. What started as a feature became a UI architecture reckoning.

Here's something that happens constantly in software: you pull on what looks like a loose thread and half the sweater comes with it. That's exactly what happened to the author of this piece when they decided to add dark mode to their personal site. The expectation was a toggle and maybe a few CSS tweaks. What they got was a lesson in why "just add dark mode" is never just that.

The core problem is hardcoded colors. When you've scattered hex values across your stylesheets, you can't flip a mode, you have to hunt down every instance. The fix is semantic CSS variables, things like `--text-primary` and `--background-surface`, names that describe intent rather than value. That abstraction is what makes theming possible at all, but it requires discipline you probably didn't have when you first wrote the site.

Then there's the contrast question. Pure black on white and white on black are, frankly, uncomfortable to read for extended periods. The article correctly points out that real dark mode design reaches for grey shades rather than absolute values. This is not a minor aesthetic preference. It's the difference between something that feels designed and something that feels like a terminal from 1983.

The problems compound from there. Tailwind's typography plugin doesn't automatically respect your CSS variables unless you explicitly map them. Code syntax highlighting requires two separate themes switched dynamically. SVG diagrams embedded in the page need entirely separate versions for each mode. And if you're not careful about when theme detection runs relative to the browser's render pipeline, users will see a flash of the wrong theme before the correct one kicks in. That flash is subtle enough that most people wouldn't report it as a bug, but noticeable enough that everyone subconsciously registers it as sloppiness.

What I find worth pushing back on here is the framing that this is surprising. Dark mode has been a "cross-cutting concern" since the first designer wrote a theming spec. The real lesson isn't that dark mode is unexpectedly complex. It's that most personal projects accumulate technical debt silently until a new requirement exposes the full bill. The author is right to conclude that dark mode requires intentional support at every UI layer. What they're avoiding thinking about is why they didn't build with CSS variables from the start, and whether the refactor addressed root causes or just the most visible symptoms.

**Key takeaways:**
- Semantic CSS variables are the prerequisite for any theming system, and retrofitting them is always more painful than starting with them
- Dark mode design means choosing grey shades over pure black and white, which is a deliberate design decision not a default
- Theme detection must happen before the browser's first paint, or users will see a flash of the wrong theme

**Why do I care:** Every frontend codebase I've worked on has this problem somewhere. Theming is one of those architectural decisions that's cheap to get right early and expensive to fix later. If your project doesn't use CSS custom properties for every color value today, it's technical debt with compounding interest.

**Link:** [I Thought Dark Mode Was Just a Toggle. It Turned Into a Full-System Refactor](https://code.likeagirl.io)

---

## Better-Notify: Typed Notifications for Node.js

**TLDR:** Better-Notify is an open-source Node.js library that provides a single, type-safe API for sending notifications across email, SMS, Slack, Discord, Telegram, and push channels. It sits between heavyweight SaaS platforms and hand-rolled notification helpers, with no vendor lock-in.

Notification infrastructure is one of those things that looks simple until the moment it isn't. You start with a `sendEmail` call, then someone wants SMS, then Slack, then push notifications for mobile. Before long you have a collection of provider-specific integrations with inconsistent error handling, no retry logic, and no deduplication. Better-Notify is an attempt to give Node.js developers a single, coherent place to manage all of that.

The library's most interesting design decision is the typed notification catalog. Rather than calling different functions for different channels, you define your notifications once with a schema, and the library handles routing to the appropriate transport. TypeScript types flow through the whole pipeline, so malformed notification payloads fail at compile time rather than at 2am on a Sunday. Input validation is handled through Zod or Valibot schemas, which is the right move given that notification payloads are exactly the kind of user-facing data that needs to be validated rigorously.

The middleware system is where the practical engineering value lives. Rate limiting, retry logic, and deduplication are composable concerns that you can attach to the pipeline. The `multiTransport` primitive handles provider failover, so if your primary email provider is having a bad day, you can fall back to a secondary without changing application code. These are features that most teams build from scratch, usually poorly, under deadline pressure.

The comparison Better-Notify draws for itself is apt. It's not trying to compete with Resend or Twilio at the product level. It's trying to be the infrastructure layer that talks to those providers, with no dashboard, no per-send pricing, and no account to manage. The MIT license and zero vendor lock-in are not marketing copy, they're genuinely the point.

Where I'd push back: the library is, by its own description, still young. Middleware composability is only valuable if the middleware is well-tested under load, and "composable" systems have a habit of becoming "complicated" systems as more providers get added. The deduplication feature deserves particular scrutiny. Notification deduplication is a distributed systems problem in disguise, and a library-level solution that doesn't account for multiple instances of your service will give you false confidence. The author is not talking about this at all.

**Key takeaways:**
- A typed notification catalog with schema-first validation catches malformed payloads at compile time, not in production
- Composable middleware for rate limiting, retry, and deduplication means not rebuilding these primitives per project
- Multi-provider failover without application code changes is the practical reliability win

**Why do I care:** Every non-trivial application eventually needs multi-channel notifications. The choice at that point is usually between a SaaS platform with pricing that scales painfully or a bespoke integration that someone has to maintain. A well-designed open-source library in this space is genuinely useful, as long as its deduplication and failover semantics hold up under real-world distributed deployments.

**Link:** [Better-Notify: Typed Notifications for Node.js](https://better-notify.com)

---

## Software Engineering May No Longer Be a Lifetime Career

**TLDR:** AI adoption may compress the productive lifespan of a software engineering career, and refusing to use AI tools to protect your skills might just mean being outcompeted by someone who doesn't have that concern. The analogy to professional athletes is uncomfortable but worth taking seriously.

This one is going to land differently depending on where you are in your career. The core argument is blunt: AI tools may cause skill atrophy over time, but you may still be obligated to use them anyway. The competitive pressure doesn't care about your long-term craft. If someone using AI can produce more output, businesses will prefer them, and the engineer who opted out of AI to preserve their "real" skills will find themselves on the wrong side of a hiring decision.

The athlete analogy is the most interesting part of the argument. Professional athletes accept that their careers have a natural end. The physical demands of the job accumulate over time, and at some point the body can't keep up. Software engineering has historically been positioned as the opposite of this, a career where experience compounds indefinitely, where a 50-year-old engineer can still be among the most valuable people in the room. The suggestion here is that AI might be ending that era.

I find myself agreeing with the observation and disagreeing with some of the conclusions. The skill atrophy risk is real. If you're using AI to generate code without understanding what it's generating, you are absolutely degrading the foundational understanding that makes you useful when the AI gets it wrong, and it will get it wrong. But the athlete framing implies a kind of passive decay that I don't think is inevitable. Athletes can't think their way out of physical limits. Engineers can choose to actively maintain deep skills alongside AI-assisted productivity.

What the author is avoiding thinking about is the difference between different kinds of software engineering work. AI is genuinely very good at generating routine implementation code. It's much less good at system design, debugging distributed failures, or making architectural tradeoffs under ambiguous requirements. Those skills don't atrophy from AI use, they get more valuable as the ratio of AI-generated code increases and the humans responsible for it need to understand the systems holistically. The career lifespan concern is real, but it applies unevenly across specializations.

**Key takeaways:**
- Competitive pressure may force AI adoption even if it degrades certain skills over time, regardless of individual preference
- The finite career lifespan model from professional sports is a genuinely new frame for software engineering, and worth taking seriously
- Skill atrophy is a real risk, but it's not uniformly distributed across all engineering specializations

**Why do I care:** This is the conversation every senior engineer I know is having internally, even if they're not saying it out loud. The right response is not panic, and it's not dismissal. It's being deliberate about which skills you're maintaining, which ones you're comfortable delegating to AI, and what your career looks like across a 10 to 20 year horizon.

**Link:** [Software engineering may no longer be a lifetime career](https://app.daily.dev/posts/spSYQ1HbC)

---

## Why Have Your Own Website

**TLDR:** Your content on someone else's platform is not your content, it's a tenancy that can be revoked. Owning your domain and running your own site is the only way to have a durable presence on the web. Social media should drive traffic to you, not be the destination.

The argument for owning your own website is one of those things that seems obvious until you look at how most developers actually behave. We spend our careers building web infrastructure, and then we put our writing on Medium, our professional presence on LinkedIn, and our thoughts on whatever microblogging platform is currently considered acceptable. The author of this piece is making a case that I find genuinely persuasive, even if most of it has been made before.

Platforms disappear or change their terms. This is not a theoretical concern. Developers who built audiences on Medium when it was promising have watched that platform change its monetization model repeatedly. People who invested heavily in building followings on various social networks have seen those followings become inaccessible overnight due to algorithm changes or account actions. Your domain name is the only piece of online real estate that you actually own. Everything else is a lease with no guaranteed renewal.

The technical recommendations in the piece are reasonable: use a static site generator with Markdown source files, which gives you content that's portable and not coupled to any particular tool. Own your domain. Treat your site as a second brain and a permanent record of your thinking. Use social media to drive traffic back to your own properties rather than treating it as the destination.

The tools mentioned, Obsidian for writing, Vim motions for editing efficiency, point toward an author who has thought carefully about their writing workflow. This matters because the biggest practical barrier to maintaining a personal site is consistency. A workflow that feels good is the only one that actually gets maintained long-term.

Where this piece is silent: it doesn't grapple with the discoverability problem. Your website, however well-crafted, starts with an audience of zero. Social platforms, for all their downsides, provide discovery mechanisms that a personal site fundamentally lacks. The "small web" movement the author references is appealing philosophically, but it assumes either an existing audience or willingness to accept a small one. For someone starting from scratch, platform presence is often genuinely necessary for getting any readership at all. Own your site, yes, but don't pretend that solves the distribution problem.

**Key takeaways:**
- Content on third-party platforms is a tenancy, not ownership, and platform terms change without your input
- Static site generators with Markdown source files give you portable content that outlasts any particular tool or platform
- Social media's role should be driving traffic to your owned properties, not being the destination

**Why do I care:** I've watched developers build significant followings on platforms that then changed in ways that made those followings far less valuable. The engineers who had their own sites as the hub of their presence came through those transitions better. This is infrastructure thinking applied to your professional presence, and it's worth the upfront investment.

**Link:** [Why Have Your Website](https://ssp.sh)
