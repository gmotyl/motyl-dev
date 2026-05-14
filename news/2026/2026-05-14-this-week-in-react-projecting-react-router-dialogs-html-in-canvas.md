---
title: "This Week In React: Projecting React, Router Dialogs, HTML in Canvas, and a Quieter Path to Native Web"
excerpt: "A walk through the most interesting React and frontend ideas of the week, from Tanner Linsley shipping his own React projection to dialogs untangled with React Router and HTML rendered directly inside a canvas."
publishedAt: "2026-05-13"
slug: "this-week-in-react-projecting-react-router-dialogs-html-in-canvas"
hashtags: "#thisweekinreact #react #reactnative #nextjs #react-router #animation #canvas #web-components #security #generated #en"
source_pattern: "This Week In React"
---

Welcome back to another walk through the week in React. There is a lot to talk about, so I will keep it moving. We have a Next.js security release worth patching today, a fascinating experiment from Tanner Linsley where he rebuilds his own version of React, a clean way to handle modal dialogs in React Router that finally feels right, a small but useful pattern for animating container size with Motion, a practical guide to React security beyond the basics, a story about replacing React with native Web Components on a marketing site, an experimental browser proposal that lets HTML render inside a canvas, and a reminder that real companies often grow out of hackathons. Grab a coffee, settle in, and let us go.

## Next.js Ships a Coordinated May Security Release

**TLDR:** Vercel pushed a coordinated security release for Next.js that resolves thirteen advisories spanning denial of service, middleware and proxy bypass, server side request forgery, cache poisoning, and cross site scripting. One advisory comes from an upstream React Server Components vulnerability tracked as CVE-2026-23870. If you run Next.js in production, patching is the only complete mitigation.

**Summary:** The fixed versions are Next.js 15.5.18 and 16.2.6, with matching patches for react-server-dom-parcel, react-server-dom-webpack, and react-server-dom-turbopack on the 19.0, 19.1, and 19.2 lines. Vercel is upfront that this batch cannot be reliably blocked at the WAF layer, so an upgrade is the only real fix, even if you sit behind their edge.

The advisories cover a surprising spread of attack surface. Middleware and proxy bypass affects anyone using middleware.js or proxy.js for authorization, which is one of the most common patterns I see in real Next.js apps. The denial of service issues touch Server Functions, Partial Prerendering with Cache Components, and the Image Optimization API. The SSRF case fires on apps that handle WebSocket upgrade requests, and cache poisoning hits anyone with caching layers in front of React Server Component responses.

Cross site scripting shows up in two flavors here. The first affects CSP nonces in App Router, and the second affects beforeInteractive scripts that consume untrusted input. Both are reminders that the line between framework code and your authorization or rendering policy is thinner than it looks once Server Components are in the picture.

Next.js 13 and 14 are end of life for this round. Those branches are listed as all versions affected with no patches coming, which is the upgrade nudge the team has been telegraphing for a while.

**Key takeaways:**
- Upgrade to Next.js 15.5.18 or 16.2.6 and bump the matching react-server-dom-* package today
- Next.js 13 and 14 will not be patched, so any remaining apps on those lines need a major version bump
- WAF rules will not save you here, the fix has to land in your build

**Why do I care:** If you maintain a Next.js app for paying users, this release is the rare changelog you read line by line. The middleware bypass advisory in particular changes how you think about authorization layered into the request pipeline, and the RSC related CVE shows that the Server Components surface is now mature enough to attract real adversarial attention. Plan the upgrade, run your auth integration tests, and assume there will be more of these as RSC adoption grows.

**Link:** [Next.js May 2026 security release - Vercel](https://vercel.com/changelog/next-js-may-2026-security-release)

## Tanner Linsley Builds His Own Projection of React

**TLDR:** Tanner Linsley shipped a personal experiment called redact, a from scratch reimplementation of just enough React to run his own sites, weighing about nine kilobytes gzipped instead of sixty. He uses it on tannerlinsley.com and tanstack.com, and he frames the technique as a projection rather than a fork.

**Summary:** The idea starts with a frustration. TanStack Start ships React as its largest dependency, and the rest of the TanStack toolchain combined is a fraction of that. Tanner tried Preact, hit drift around the React 19 server action surface, hydration edges, and use semantics, and walked away. Then he tried something stranger. He asked an AI agent to produce a different projection of the React public API, scoped only to what TanStack Start needs.

The result is a fiber based reconciler with the standard hook surface, real SSR streaming, and working Suspense, but no concurrent scheduling, no time slicing, no React DevTools, and no Flight client deserializer. Concurrent features like useTransition and useDeferredValue run synchronously. The rest splits into a tiny core plus eight toggleable features, each with a real implementation and a stub, swapped through a Vite plugin so the unused code never enters the module graph.

The numbers are striking. Against React 19.2.3, the projection is between eighty and eighty five percent smaller. A simulated client navigation loop runs more than twice as fast, SSR runs about three times as fast, and a 480 row stable list re-render comes in around eighteen percent faster after some real Chrome profiling work. On his personal blog, the JavaScript on the wire dropped by a third with mobile FCP down around eighteen percent. On tanstack.com, the full app shed nearly a megabyte of client JS with parity on Core Web Vitals, with one known LCP regression on RSC heavy pages that has a clear fix path.

The broader argument is what makes this essay land. Tanner borrows a line from Kyle Mathews about code as a materialized view. The ideas, the algorithms, the protocols, the semantic contracts are the base table. The code is one projection of those ideas. We have always treated the artifact as authoritative because regenerating it was expensive. With coding agents, regenerating is no longer expensive, and the model inverts. He is careful not to market this as an alternative React, and he is explicit that the React core team does not need to care. It is one person scoping a library down to their own consumer, and reporting back on what they learned.

**Key takeaways:**
- Projecting a large library down to your actual shape now takes days, not months, which changes the cost calculus of shipping general purpose dependencies
- Real numbers on real production sites show that even on a near static blog, the React runtime can dominate the JavaScript payload
- The author intentionally keeps this small and unmarketed, which is itself a useful pattern for community health

**Why do I care:** I do not think most teams should run their own React. But this essay reframes what code ownership means in a post agent world, and I want every architect on my radar to read it. The next time someone asks why you cannot just slim down React, you will have a thoughtful, numbers backed answer about projections, distros, and the price of generality. It also surfaces a quiet truth, that some of our largest dependencies were sized for a different cost model, and we have not yet renegotiated.

**Link:** [Projecting React](https://tannerlinsley.com/posts/projecting-react)

## Untangling Dialogs in React Router 7

**TLDR:** Aaron Pearce walks through a clean pattern for modal dialogs in React Router 7 where each dialog lives in its own route. Loaders, actions, success toasts, and exit animations all fall out naturally, with only one small useEffect along the way and no fetcher juggling.

**Summary:** The first attempt is the one everyone writes. A parent route holds two dialogs for install and uninstall, fetchers load the data, an intent field disambiguates the action, and a useEffect listens for actionData to close the dialog on success. By the end, the route knows about loading, two intents, two dialog states, and the lifecycle of submissions. It works, but the file is doing too many jobs.

The second attempt splits each dialog into its own nested route under the parent. models.install.tsx owns the install dialog, models.uninstall.$name.tsx owns the uninstall dialog, and the parent simply renders an Outlet. Suddenly the routes themselves describe what the app can do. Loader and action go where they belong, the dialogs become navigable units, and the parent route is responsible for one thing again.

Two new pieces of React Router make this practical. The unstable_defaultShouldRevalidate prop lets the link itself opt out of revalidating active loaders, which means opening a dialog does not refetch the parent list. The preventScrollReset prop keeps the page anchored where the user was. Together they make a route based dialog feel exactly like a dialog and not like a navigation.

Two harder problems get clean answers too. For success feedback, the action flashes a message into a server session, the parent loader reads it out and commits the session to clear it, and a clientLoader hands the message to react hot toast on the client. No useEffect, no query parameters, no leaked toast state across navigations. For the exit animation, the post uses view transitions. Shadcn dialog parts get viewTransitionName values, a few keyframes mirror the existing enter and exit, and navigate is called with viewTransition true. The dialog now animates out properly instead of popping out of the DOM.

The one trade off the author flags honestly is that errors in the dialog can cause a small bounce because the view transition fires on any DOM change. Pulling in a single useEffect that only navigates on an explicit success removes the bounce, at the cost of one effect. He calls it a fair trade, and I agree.

**Key takeaways:**
- Routes are a great way to model dialog state when the framework gives you the right control points
- unstable_defaultShouldRevalidate and preventScrollReset are the missing primitives that make route based dialogs feel native
- Flash session data plus a clientLoader is a clean way to deliver a toast without polluting URLs or component state

**Why do I care:** I have written too many dialog components in my career that quietly grew into orchestration engines. This pattern shows what happens when you let the framework do the orchestration, and the result is code that maps almost one to one to how I describe the feature out loud. It is also a great example of what mature router design enables, which is worth keeping in mind whether you use React Router, TanStack Router, or something else.

**Link:** [Untangling dialogs in React Router](https://programmingarehard.com/2026/05/06/react-router-dialogs.html/)

## Animating Container Bounds With Motion

**TLDR:** Emil Kowalski breaks down a small but elegant pattern for animating a container as its content changes. You measure the inner content with ResizeObserver, animate the outer container with Motion, and the result is a button or panel that resizes smoothly instead of snapping.

**Summary:** Width and height are not natively animatable when you do not know the target value. The browser cannot interpolate from a fixed pixel value to "whatever the content needs." The trick is two divs. The outer div has the animate prop and an explicit width or height value. The inner div is what you measure with a small useMeasure hook backed by ResizeObserver. When the content changes, the observer fires, state updates, and Motion animates the outer container to the newly measured size.

The hook itself is short enough that it does not need a dependency. It tracks the element with a ref callback, observes resize events, and stores width and height in state. You then pass bounds.height to a motion.div animate prop and that is it. The same shape works for an expandable accordion, a button whose label changes mid interaction, a panel that grows when new content streams in, and any layout where the natural size is supposed to drive the animation.

The post calls out a few traps. On the first render, bounds are zero before the first measurement, so guarding with bounds.height greater than zero ternary back to auto avoids an animation in from nothing. Never measure and animate the same element, since you create a loop where the animation drives a new measurement which drives a new animation. And the technique is meant to be used sparingly. It is a calm transition, not a feature to apply to every container on the page.

**Key takeaways:**
- ResizeObserver gives you a reactive size source that does not cause layout thrashing
- The pattern requires one outer animated element and one inner measured element, never the same node
- Guard initial renders against animating from zero, and reserve the effect for moments that genuinely benefit

**Why do I care:** Small motion details like this disproportionately shape how an interface feels. Buttons that change label without snapping, panels that grow when they reveal more content, and accordions that animate to their natural height are the kind of polish that users register subconsciously. The pattern is short enough to ship in a shared hook this afternoon and pays dividends across an entire design system.

**Link:** [Animating Container Bounds](https://www.userinterface.wiki/animating-container-bounds)

## Security in React Applications, Beyond the Defaults

**TLDR:** A practical guide to the security topics React developers now need to own. It covers JSX escaping and the dangerouslySetInnerHTML escape hatch, HttpOnly cookies versus localStorage for tokens, server side input validation with Zod, parameterized queries, and Content Security Policy with nonces.

**Summary:** The post starts where every React security article should, with the fact that JSX auto escapes by default and that dangerouslySetInnerHTML is the gap. If you render Markdown or any HTML from an untrusted source, sanitize with DOMPurify or, better, convert to React elements directly so the raw HTML never reaches the DOM.

Authentication gets a clear, opinionated treatment. Storing tokens in localStorage or sessionStorage means a single cross site scripting vulnerability hands them over. HttpOnly cookies eliminate that vector because JavaScript cannot read them, and the browser includes them on requests automatically. Pair that with the Secure attribute for HTTPS only, and SameSite Strict to defang cross site request forgery for almost every case. For older browsers or edge configurations, layer a CSRF token on top of state changing requests.

The Server Components section is where I think the post earns its weight. With Server Functions, React code now talks directly to databases and external services, which means React developers are responsible for things that used to live entirely in the backend. Validate every input with Zod before you use it. Run authentication and authorization checks at the top of the function. Use parameterized queries and never concatenate user input into SQL strings. None of this is new, but it is new ground for many frontend teams.

The Content Security Policy section closes the loop. A strict default of self for scripts plus a nonce for the inline scripts React needs at hydration is the modern shape. Add strict dynamic so code split chunks can load through the trusted root, use Content Security Policy Report Only first to surface violations before enforcing, and treat CSP as defense in depth rather than a primary control.

**Key takeaways:**
- HttpOnly cookies belong in your auth stack today, especially as Server Functions absorb more responsibility
- Server Functions need authentication, schema validation, and parameterized queries on every entry, no exceptions
- Content Security Policy with nonces and strict dynamic is the modern way to protect a React app that needs some inline script

**Why do I care:** The boundary between frontend and backend is dissolving fast under Server Components and Server Functions, and the security model has to catch up. If you lead a frontend team, this post is a good basis for a one hour security session that updates your guidelines for the React 19 world. None of it is exotic, but treating it as a checklist beats discovering it during an incident.

**Link:** [Security in React Applications](https://certificates.dev/blog/security-in-react-applications)

## From React to Native Web With Nanotags

**TLDR:** Evil Martians migrated a marketing site from React with Ark UI to native Web Components, shed about a hundred kilobytes of JavaScript, kept accessibility intact, and built a small library called nanotags along the way to make hand written Web Components feel as pleasant as a Solid component.

**Summary:** The premise is one a lot of us have privately admitted. Many marketing sites, documentation portals, and landing pages are mostly static, with a handful of interactive bits like dropdowns, dialogs, and accordions. Yet we ship a full SPA framework runtime to hydrate them. The author originally built the site with Astro plus React plus Ark UI because deadlines and team knowledge made that the right call, but came back months later with the bundle size still nagging.

He looked at Svelte and Solid, then asked a more radical question. Why add any framework at all? Custom Elements have been stable in every modern browser since 2018. The web platform already has a component model. Astro renders HTML at build time. With Custom Elements you skip the framework runtime entirely and just hydrate the markup the browser already has.

Raw Web Components hurt to write though. A simple counter ends up with manual observedAttributes, manual attribute parsing, manual listener cleanup, lifecycle ordering gotchas, and zero help from TypeScript. So Evil Martians extracted the patterns they kept pasting into a thin library. Nanotags wraps Custom Elements with declarative props as nanostores atoms, refs that are typed and validated at initialization, typed event listeners, two way bindings, and a context object that cleans everything up automatically when the element disconnects. The core is under two and a half kilobytes.

Accessibility was the part the author worried about most, because Ark UI, Radix, and React Aria gave them all of that for free. The solution was to read the W3C ARIA Authoring Practices Guide, lean on LLM agents to translate the spec into a first draft, and package the behaviors as composable attachments that share the cleanup context. Roving focus on a tablist becomes a single line. The result on the migrated site was accessibility parity with the React version, and in some cases better, because each attachment was scoped to one usage rather than a generic component.

The total interactive runtime ends up around three kilobytes including nanostores, less than a hero image on most pages. The argument is not that React is bad, it is that the default of reaching for a full framework on a mostly static page is a habit worth questioning.

**Key takeaways:**
- Custom Elements are platform stable since 2018 and pair well with Astro for static first sites
- A thin library can preserve the developer experience of a framework without the runtime cost
- Accessibility behaviors can be modeled as composable attachments that live with the rest of your component code

**Why do I care:** I work with teams that ship a lot of marketing surfaces, and the bundle math from this post is hard to argue with. Even if you do not adopt nanotags, the broader pattern of using the platform for low interactivity surfaces and reserving framework runtimes for genuinely application like sections is a sensible architectural split. It also suggests a healthier relationship with frameworks, where you pick them by interaction shape rather than by default.

**Link:** [From React to native web with nanotags](https://evilmartians.com/chronicles/from-react-to-native-web-with-nanotags-a-migration-that-saved-100kb)

## HTML In Canvas, an Experimental Proposal That Could Reshape Web UI

**TLDR:** Codrops walks through a WICG proposal that lets a canvas element render real HTML content. The API adds a layoutsubtree attribute, a drawElementImage method, and a paint event, opening the door to post processing effects, in canvas 2D UIs for 3D scenes, and accessible page transitions without losing the DOM.

**Summary:** The web has lived with a hard split between HTML, with its accessibility and layout, and canvas, with its pixel control. If you wanted shaders, custom transitions, or rich animations, you typically gave up the accessible DOM. The HTML in canvas proposal aims to dissolve that boundary by letting a canvas paint its DOM children directly, keeping layout and styling intact.

The API is intentionally minimal. You mark a canvas with the layoutsubtree attribute so its children opt into layout, you call drawElementImage on a child element from the 2D context, and you handle a paint event whenever a child changes. The post is careful to flag that this is currently behind a Chromium flag at chrome:flags hash canvas draw element, and that there are privacy preserving painting constraints worth reading in the full spec.

The demos are where the implications hit. A landing page hero rendered to a canvas can feed a React Three Fiber post processing pipeline with fluid distortion, rain, or pixelation, while crawlers still see the original DOM content. A subtle interaction like a vanishing input that fades away on Enter no longer needs a hidden canvas trick, because the input itself can be the source. Curl style page transitions and dramatic content reveals become possible without abandoning semantic HTML.

The use case that excites me most is 2D interfaces inside 3D scenes. Today you either layer DOM with Drei HTML, which never quite feels embedded in the world, or you build with uikit and render to a render target, which gives you a shaderable texture but limited CSS. Three.js author Mr.doob has already shipped an HTMLTexture class plus an InteractionManager that uses a CSS matrix3d transform so the browser handles hit testing, hover, focus, and input natively. That means a fully interactive HTML UI on the screen of a 3D computer model with no raycasting or synthetic events.

For now there are workarounds like html2canvas, which the Next.js Conf 2024 badge used, and SVG foreignObject serialization. Both are useful and both lose accessibility along the way. A native solution would change the equation.

**Key takeaways:**
- The proposal preserves DOM semantics while exposing HTML as a paintable surface for shaders and effects
- Three.js already has HTMLTexture and InteractionManager add ons that show what a native integration could feel like
- It is behind a flag today, so treat it as future surface area worth tracking rather than something to ship to users

**Why do I care:** This is the kind of platform change that does not show up in your day to day work for a year and then quietly becomes the foundation for the next generation of web experiences. If you work on web games, immersive marketing, or any product that mixes 3D and rich UI, start prototyping behind the flag now. Even outside those niches, the ability to apply visual effects to live HTML without sacrificing crawlers, screen readers, or selection behavior is genuinely new.

**Link:** [Exploring the HTML-in-Canvas Proposal](https://tympanus.net/codrops/2026/05/13/exploring-the-html-in-canvas-proposal/)

## Great Companies Are Built In Hackathons

**TLDR:** PostHog argues that real hackathons, with strict rules about novelty and full focus, are an under appreciated engine for product innovation. Their own Session Replay, Data Warehouse, Logs, Workflows, and PostHog AI products all started inside a hackathon.

**Summary:** The post lays out two simple rules that protect the format. You only work on totally new things, not roadmap acceleration. You give people full coverage so they can ignore their day jobs. PostHog runs theirs during offsites with dedicated support and incident plans. DigitalOcean uses work embargoes. The point is to create a safe space for ambitious bets that would never survive normal prioritization.

The cultural piece they emphasize is that hackathons should not be only for engineers. With LLMs in the loop, non technical team members ship real things, from games to internal tools to instagram style stories that demo new features. Cross functional teams break silos and produce more practical projects, which DigitalOcean, Twilio, and Slack have all reported in different forms.

A few process choices follow. Demos are mandatory and act as a forcing function so plans stay shippable. Judging and prizes are optional and arguably undesirable, because the goal is intrinsic motivation, not chasing what the bosses want to see. After the event, designate a driver for promising projects and give them slack to push toward production. The Logs product is their case study, a hackathon prototype that became real because someone kept moving it forward and the team had Datadog quotes giving them an obvious incentive.

The closing argument is that making your hackathon an annual tradition turns it into a promise. People share ideas all year in a dedicated channel. Restlessness with day to day work goes down because there is a known outlet. And the company occasionally finds itself with a new product line nobody planned for.

**Key takeaways:**
- Hackathons fail when they double as accelerated regular work, and succeed when they are genuinely novel and protected
- Including non technical participants is a feature, not a courtesy, and yields cross functional ideas
- A designated driver plus a little slack after the event is what turns prototypes into shipped products

**Why do I care:** Most engineering orgs talk about innovation and budget zero time for it. This is a concrete recipe with results that any platform or product team can copy. It also resonates with the broader theme this week of letting people own their tools and shape, whether that is projecting React, writing your own Web Components layer, or carving out time to try something that is not on the roadmap.

**Link:** [Great companies are built in hackathons](https://posthog.com/founders/hackathon-best-practices)

## Closing Thoughts

There is a quiet theme running through this week. Tanner Linsley shrinks React for one specific consumer. Evil Martians replaces React entirely for a marketing site. Aaron Pearce uses the router framework to absorb dialog state instead of building it on top. Codrops looks at a proposal that erases the line between DOM and canvas. Even the security release nudges us to think harder about what runs in middleware and what runs in a Server Function. The platform is moving, our defaults are being questioned, and the cost of owning your own shape is dropping fast. Read what catches your eye, patch your Next.js apps today, and I will see you next week.
