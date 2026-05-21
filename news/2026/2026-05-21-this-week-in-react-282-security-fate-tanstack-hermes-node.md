---
title: "Supply Chain Chaos, Fate 1.0, Hermes-node, and a Week of Releases"
excerpt: "This Week In React #282 covers a wave of npm supply chain attacks hitting the React ecosystem, the launch of Fate 1.0 as a new async React metaframework, Hermes-node as an experimental Node.js compatibility layer, and a flood of releases across TanStack, Redux, Relay, Storybook, and Expo."
publishedAt: "2026-05-21"
slug: "this-week-in-react-282-security-fate-tanstack-hermes-node"
hashtags: "#thisweekinreact #react #reactnative #security #tanstack #redux #expo #hermes #storybook #relay #en"
source_pattern: "This Week In React"
---

## The Worm That Won't Stop: npm Supply Chain Attacks Keep Spreading

**TLDR:** The same threat actor from last week's TanStack Router compromise is still active, hitting more packages across the npm ecosystem, including tools used in React and front-end workflows. Several major organizations have been affected, and the story is far from over.

The worm, tracked as Shai-Hulud from TeamPCP, has been spreading with alarming persistence. It has now compromised popular packages like echarts-for-react and @antv, GitHub Actions such as actions-cool/issues-helper, and has caused enough downstream damage that OpenAI employees needed to regenerate their code signing certificates. Grafana was reportedly hit with a ransomware demand. The Million.js repository got briefly compromised too, though apparently without downstream victims.

There are also rumors connecting this worm to the Nx Console VSCode extension compromise, which means developers who installed that extension during a specific window may have been exposed. And if the whispers about a GitHub internal repository breach turn out to be accurate, the radius here goes well beyond the React world.

What makes this wave particularly uncomfortable is how it travels through trust relationships. A compromised maintainer account is enough. Once you have one, you publish a tainted release, and anyone running npm install without a lock file, or with automatic updates enabled, can pull it in. It is not a clever zero-day. It is basic credential theft at scale.

The npm team is finally paying attention. An RFC has been proposed to make install scripts opt-in, requiring explicit allowance in package.json before they can run. Yarn 4.15 also quietly added a 24-hour release cooldown gate by default, which would at least force attackers to wait before poisoned packages are automatically trusted. Small steps, but they are the right kind.

**Key takeaways:**
- Shai-Hulud from TeamPCP is an ongoing supply chain attack hitting multiple React-adjacent packages
- OpenAI and Grafana were affected downstream; Nx Console and GitHub internals may be connected
- npm RFC proposes making install scripts opt-in, and Yarn 4.15 adds a 1-day release cooldown

**Why do I care:** Every team running CI with automatic dependency updates is exposed here. The defensive posture needs to change: pin your dependencies, use lock files religiously, review what scripts run on install, and watch for dependency updates that arrive outside of your normal release schedule. Auditing your package.json for packages you did not intentionally add is no longer optional. This attack pattern will repeat.

**Link:** [The Worm That Keeps on Digging: TeamPCP Hits @antv](https://www.wiz.io/blog/mini-shai-hulud-teamcp-hits-antv-supply-chain)

---

## Fate 1.0: A Relay-Inspired React Metaframework Without GraphQL

**TLDR:** Fate 1.0 is the first stable release of an async React metaframework that borrows the best ideas from Relay, including data masking, normalized caching, and view composition, but drops the GraphQL requirement entirely.

Relay has always had a problem. The architecture is genuinely good. Collocated data requirements, normalized cache, deterministic rendering from a consistent data graph. These ideas are sound and they scale. But the mandatory GraphQL dependency has kept Relay confined to a narrow set of teams willing to pay that adoption cost. Fate tries to take the same architecture and remove that friction.

Version 1.0 ships with view composition, a normalized cache with garbage collection, data masking between components, live views powered by Server-Sent Events, Drizzle integration for your database layer, and first-class support for Async React features like Suspense and streaming. The server rendering story includes proper deferred hydration support.

What I find genuinely interesting here is the approach to caching. Relay's normalized cache is one of the things that separates it from everything else, and bringing that pattern outside of GraphQL-only land has real potential. If you have ever tried to manually keep your server state consistent across a complex UI without a normalized cache, you know exactly the class of bugs Fate is trying to eliminate at the architectural level.

This is an early 1.0. It is not Next.js in terms of community and documentation depth. But for teams willing to invest, there is something thoughtful here.

**Key takeaways:**
- Fate 1.0 brings Relay-style architecture including normalized caching and data masking to non-GraphQL projects
- Includes live views via Server-Sent Events, Drizzle integration, and Async React support
- First stable release, early days for the community and tooling around it

**Why do I care:** The normalized cache pattern from Relay is one of the most underappreciated ideas in React data fetching. Most teams accumulate inconsistency bugs because they never invest in it. Fate is a bet that the pattern can work without GraphQL overhead. Worth watching even if you do not adopt it immediately.

**Link:** [fate 1.0](https://fate.technology/posts/fate-1.0)

---

## RSC Security: The Flight Protocol DoS and Remote Code Execution Reports

**TLDR:** Two security researchers published details of vulnerabilities they found in React Server Components, one allowing remote code execution and another enabling a denial-of-service attack by blocking the Node.js process with a single HTTP request.

The pair who go by React2Shell published their story this week, describing the security flaw they discovered that allowed remote code execution through RSC. The details of the exploit path are in their writeup, and it is the kind of thing that should make you think carefully about your trust boundaries in a server component architecture.

Separately, a blog post titled "The Flight Protocol Made Your DoS My Problem" describes how the React Flight protocol, used for RSC streaming, could be exploited to block your entire Node.js process with a single crafted HTTP request. This was patched in a recent Next.js CVE, but the writeup does a good job explaining why the vulnerability existed in the first place.

The through-line across both of these is that RSC moves computation to the server in ways that change your threat model. Client-side React has a relatively contained attack surface. Once you start running React components on your server and handling incoming requests that influence what components render, you need to think about server-side security in the same way you think about any API endpoint.

These are patched issues. But the pattern of finding vulnerabilities in RSC implementations is going to continue as adoption grows.

**Key takeaways:**
- React2Shell published details of an RSC remote code execution vulnerability they reported
- A patched CVE in Next.js allowed a single HTTP request to block the entire Node process via the Flight protocol
- RSC significantly changes the server-side threat model compared to traditional client-side React

**Why do I care:** If you are running Next.js with RSC in production, check your version and make sure you are patched. More broadly, the shift to server components means your React code is now a surface for server-side attacks. Input validation, authentication checks in server components, and proper sandboxing matter in ways they did not before.

**Link:** [The Flight Protocol Made Your DoS My Problem](https://saschb2b.com/blog/flight-protocol-dos)

---

## TanStack and Redux Release Week: Deferred Hydration, Streaming Output, and Migration Notes

**TLDR:** TanStack Router added experimental deferred hydration and a CSRF middleware, TanStack AI's useChat now supports streaming structured output, React Redux 9.3 officially deprecated the connect HOC API, and Redux Toolkit 2.12 landed TypeScript improvements.

TanStack Router's deferred hydration feature is worth your attention. The idea is that you can make a page interactive sooner by deferring some of the hydration work to after the initial paint. The result is that users can start interacting with parts of your UI while other parts are still loading. It is experimental, but the docs are up and it is ready to try. They also shipped a CSS inlining feature and a CSRF middleware for route-level protection.

On the AI side, TanStack's useChat hook now supports streaming structured output. Instead of waiting for a full JSON response before you can do anything with it, you get partial structured data as it arrives. This matters a lot for AI-driven UIs where responses can take seconds, and showing partial progress dramatically improves perceived responsiveness.

React Redux 9.3 marks the formal deprecation of the connect HOC API. It is not removed, so nothing breaks immediately, but the message is clear: migrate to useSelector and useDispatch. The connect pattern served its purpose through years of React class components, but it carries complexity that the hooks API does not need. If you are starting a new project today, connect should not be in your code.

**Key takeaways:**
- TanStack Router gains experimental deferred hydration, CSS inlining, and CSRF middleware
- TanStack AI's useChat supports streaming structured output from LLMs
- React Redux 9.3 deprecates connect in favor of hooks; migration is recommended but not urgent

**Why do I care:** Deferred hydration is one of those performance levers that sounds subtle but has real user-perceived impact, especially on slower devices. Worth prototyping. The connect deprecation is a good nudge to clean up older codebases; it also signals that the Redux team wants to reduce the conceptual surface area of the library.

**Link:** [React Server Components in TanStack](https://frontendmasters.com/blog/react-server-components-in-tanstack/)

---

## Hermes-node: Running Node.js APIs on the Hermes JS Engine

**TLDR:** Tzvetan Mikov, the creator of Hermes, published an experimental prototype called hermes-node that provides a Node.js built-in module compatibility layer on top of the Hermes JS engine, with an eye toward future performance advantages from Static Hermes.

This one is early. Very early. But the idea is interesting enough to pay attention to. The Hermes engine already runs JavaScript in React Native apps, and Static Hermes, which compiles TypeScript and Flow directly to native code, is coming. If hermes-node reaches a point where you can run Node.js-compatible server code through Hermes and get Static Hermes compilation benefits, the performance profile could be genuinely different from V8.

Right now it will not outperform Node.js. It is a compatibility layer prototype. But the direction makes sense: Static Hermes does ahead-of-time compilation in a way that V8's JIT cannot match for predictable, typed code. Server-side TypeScript is exactly the kind of workload where that matters.

For React Native developers, a world where your mobile JS runtime and your server JS runtime share an engine and a compilation pipeline is actually coherent. This is the early sketch of that world.

**Key takeaways:**
- hermes-node provides Node.js module compatibility on the Hermes JS engine
- Current performance does not beat Node.js/V8, but Static Hermes ahead-of-time compilation could change that
- An early prototype from Hermes creator Tzvetan Mikov; the long-term direction is more interesting than the current state

**Why do I care:** React Native teams already invest in Hermes for mobile. If server-side Hermes becomes viable, the knowledge transfer is real. Static Hermes compilation for typed server code is a genuinely different approach from JIT-based engines, and for latency-sensitive workloads it could matter. Watch this project.

**Link:** [GitHub - tmikov/hermes-node](https://github.com/tmikov/hermes-node)

---

## Storybook 10.4, Relay 21, and Base UI 1.5

**TLDR:** Storybook 10.4 adds TanStack React support and React Native isolation mode, Relay 21 ships first-party TypeScript and experimental RSC support, and Base UI 1.5 brings significant mount performance improvements for overlay components.

Storybook 10.4 has something I did not expect to see this quickly: React Native isolation mode. This lets you develop and test React Native components in a browser environment through Storybook, isolating them from the native layer. There is also TanStack React integration and an agentic setup flow that configures Storybook for your project automatically. The review filters feature looks useful for design collaboration workflows.

Relay 21 is a significant release. First-party TypeScript support arrives after years of community-maintained types, which means the generated types and tooling are now officially maintained by the Relay team. The experimental RSC support is there for teams who want to start exploring that integration, and the error handling improvements make it meaningfully easier to debug data-fetching failures in production.

Base UI 1.5 focused on mount performance for popover, dialog, tooltip, and menu components. These overlay components can be expensive to mount because they often involve portals, focus management, and animation setup. The 1.5 improvements are measurable in profiling, which matters on lower-end devices or pages with many interactive elements.

**Key takeaways:**
- Storybook 10.4 adds TanStack React support, React Native isolation mode, and agentic project setup
- Relay 21 ships first-party TypeScript support and experimental RSC integration
- Base UI 1.5 targets mount performance for popover and dialog-class components

**Why do I care:** Relay's first-party TypeScript support removes one of the friction points that made it feel like a second-class ecosystem. For teams already on Relay, this is a quality-of-life improvement that should reduce type-related confusion. The Storybook React Native isolation mode is genuinely useful if you maintain a component library targeting both web and mobile.

**Link:** [Storybook 10.4](https://storybook.js.org/blog/storybook-10-4/)
