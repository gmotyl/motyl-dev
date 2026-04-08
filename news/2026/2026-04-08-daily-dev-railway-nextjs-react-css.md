---
title: "Railway Leaves Next.js, React's Underrated useId Hook, and CSS Honesty"
excerpt: "A week of pragmatic frontend decisions: Railway's migration from Next.js to Vite + React Router, underrated React hooks you should be using, and a refreshingly honest take on CSS."
publishedAt: "2026-04-08"
slug: "railway-leaves-nextjs-react-underrated-hook-css-honesty"
hashtags: "#dailydev #frontend #react #nextjs #vite #react-router #css #typescript #architecture #generated #en"
source_pattern: "daily.dev"
---

## Moving Railway's Frontend Off Next.js

**TLDR:** Railway migrated their frontend from Next.js to a Vite + React Router SPA, citing build complexity, slow CI times, and the fact that they didn't actually need server-side rendering for their dashboard application.

**Summary:**

Railway's team made a pragmatic decision that many Next.js projects should probably consider: they moved their entire frontend off Next.js and onto a Vite + React Router SPA stack. The reasoning is refreshingly honest — they simply didn't need SSR. Their application is a logged-in dashboard, which means the traditional SEO and first-contentful-paint arguments for server-side rendering don't apply. What they got instead was a massive reduction in build complexity, faster CI pipelines, and a development experience that actually matched their deployment model.

The migration involved replacing Next.js conventions like file-based routing, API routes, and server components with more explicit, traditional SPA patterns. React Router handled routing with nested layouts, Vite provided the build tooling with its famously fast HMR, and the team gained complete control over their bundle without fighting Next.js's opinionated structure. This is a textbook case of "use the right tool for the job" rather than following the default choice every new React project reaches for.

What's notably absent from the typical migration blog post is any sense of regret. The team doesn't claim Next.js is bad — they claim it was wrong for their specific use case. This distinction matters enormously in a community that treats framework choices like identity politics. The reality is that most SaaS dashboards, admin panels, and internal tools are fundamentally SPAs that don't benefit from SSR's complexity tax.

**Key takeaways:**
- Next.js adds significant complexity that many applications don't need — particularly authenticated dashboards and internal tools
- Vite + React Router provides a mature, performant SPA stack with faster builds and simpler CI
- Framework decisions should be driven by actual requirements, not community defaults or resume-driven development
- SSR benefits (SEO, FCP) are irrelevant for logged-in applications behind authentication

**Why do I care:** This is the conversation the industry desperately needs to have but rarely does. Next.js is an excellent framework — for the problems it was designed to solve. But when your application lives behind a login wall, SSR is complexity you're paying for with zero return. Every minute spent debugging server component boundaries, cache invalidation between server and client, and incremental static regeneration is a minute not spent on features your users actually care about. Railway's migration is a permission slip for teams to choose boring, proven SPA architecture when that's what the problem actually calls for.

**Link:** [Moving Railway's Frontend Off Next.js](https://app.daily.dev/posts/moving-railway-s-frontend-off-next-js-ncgxh3cqx)

## You Need To Start Using This Underrated React Hook

**TLDR:** A deep dive into useId — React's built-in hook for generating stable, unique IDs that survive server-client hydration, essential for accessible form components and ARIA relationships.

**Summary:**

React's useId hook is one of those utilities that sits quietly in the documentation while most developers reach for nanoid or uuid for anything requiring unique identifiers. The critical difference is that useId generates IDs that are stable across server and client renders, which is exactly what you need for accessibility attributes like aria-labelledby and htmlFor relationships in forms. When you use a random ID generator in a server-rendered React application, the server and client will generate different values, causing hydration mismatches and potential accessibility breakage.

The hook works by React tracking the render order of components and generating deterministic IDs based on that position in the component tree. This means the same component will always produce the same ID on both server and client, eliminating the hydration mismatch warnings that plague teams using Math.random or date-based ID generation. It's particularly valuable for form inputs, where the label-input relationship via htmlFor is fundamental to screen reader navigation.

What makes this hook truly underrated is how often the accessibility problem it solves goes unnoticed. Most development teams test their applications with mouse and keyboard in sighted browsers, where the visual association between a label and its input is obvious. But for screen reader users, that programmatic relationship is everything. A form input without a properly associated label is essentially invisible to assistive technology, and useId is the simplest way to get it right in React.

**Key takeaways:**
- useId generates hydration-safe unique IDs that work consistently across server and client renders
- Essential for accessible form patterns — htmlFor attributes, aria-labelledby, aria-describedby relationships
- Far superior to random ID generators in React applications, especially those using SSR or streaming
- The hook is free and built-in — no additional dependencies needed for a fundamental accessibility requirement

**Why do I care:** Accessibility is not optional, and the form-label pattern is one of the most common a11y failures on the web. If you're still using Math.random or timestamp-based IDs in React components, you're one hydration cycle away from broken accessibility. useId costs nothing to adopt and solves a real problem that real users encounter every day. This is the kind of small, boring, correct engineering decision that separates professionals from hobbyists.

**Link:** [You Need To Start Using This Underrated React Hook](https://app.daily.dev/posts/you-need-to-start-using-this-underrated-react-hook-vv9wbwqfj)

## I'm a CSS Noob

**TLDR:** A candid reflection on CSS knowledge gaps in the developer community — admitting that many developers, including experienced ones, struggle with CSS fundamentals despite years of working with it.

**Summary:**

This piece tackles an uncomfortable truth that the developer community rarely acknowledges openly: CSS is genuinely hard, and most developers are significantly less competent at it than they believe. The author's honesty about being a "CSS noob" despite years of professional experience resonates because it reflects a widespread reality. JavaScript developers routinely rate themselves as senior while producing CSS that relies on copy-pasted Stack Overflow snippets and increasingly desperate specificity wars.

The root cause is structural rather than personal. CSS operates on a fundamentally different mental model than imperative programming languages. Its cascade, inheritance, and selector specificity rules create a system where the outcome of a stylesheet is often surprising even to its author. Unlike JavaScript, where you can trace execution flow linearly, CSS applies rules simultaneously across the entire document tree, making debugging a spatial reasoning exercise rather than a logical one.

The piece also touches on how the ecosystem responds to this knowledge gap. Rather than investing in genuine CSS education, the industry has produced an endless stream of abstraction layers — CSS-in-JS libraries, utility-first frameworks, and style systems that promise to "fix" CSS by essentially hiding it. These tools are valuable, but they also enable a cycle where developers never develop the underlying mental model, making them dependent on the next abstraction when the current one reaches its limits.

**Key takeaways:**
- CSS difficulty is a widespread, rarely admitted reality — even experienced developers struggle with fundamentals
- CSS operates on a different mental model than JavaScript — cascade, inheritance, and specificity create non-obvious behavior
- The ecosystem's response (abstraction layers) often enables continued CSS illiteracy rather than solving it
- Honest self-assessment and willingness to learn CSS fundamentals is more valuable than another framework abstraction

**Why do I care:** Every senior developer I respect will tell you that CSS mastery separates adequate frontend engineers from great ones. The current industry pattern of "CSS is hard, so we'll abstract it away" creates developers who can build complex state management systems but can't center a div without a utility class library. The next time you reach for a CSS framework to solve a layout problem, consider whether you're making a pragmatic productivity choice or avoiding a knowledge gap that will limit your ceiling as an engineer.

**Link:** [I'm a CSS noob](https://app.daily.dev/posts/i-m-a-css-noob-qjabpe2sf)

## NestJS Sliding Window Throttler

**TLDR:** A practical implementation of a sliding window rate limiting algorithm for NestJS applications, providing more accurate request throttling compared to simple fixed-window approaches.

**Summary:**

Rate limiting is one of those infrastructure concerns that seems straightforward until you actually need to implement it correctly. The sliding window algorithm covered here addresses a specific weakness of the simpler fixed-window approach: the boundary problem where a burst of requests straddling two windows can effectively double the allowed rate. A sliding window tracks request timestamps individually and counts only those within the rolling time period, providing smooth and accurate throttling regardless of request timing patterns.

The NestJS implementation uses an in-memory store to track request timestamps per client identifier, with the ability to swap in Redis for distributed deployments. The interceptor pattern integrates cleanly with NestJS's dependency injection system, making rate limiting a declarative concern on controllers and routes rather than scattered middleware logic. This is how infrastructure code should feel — present where needed, invisible where not.

What distinguishes this from a generic rate limiting tutorial is the attention to edge cases: handling clock skew in distributed systems, the memory implications of storing individual timestamps at high request volumes, and the graceful degradation behavior when the storage backend becomes unavailable. These are the considerations that separate production-ready code from blog-post code.

**Key takeaways:**
- Sliding window rate limiting provides more accurate throttling than fixed windows by eliminating boundary burst vulnerabilities
- NestJS interceptors offer a clean integration pattern for cross-cutting infrastructure concerns
- Production rate limiting requires attention to distributed state, clock synchronization, and storage backend resilience
- In-memory stores work for single instances; Redis or similar is required for horizontally scaled deployments

**Why do I care:** Rate limiting is the difference between your API staying alive during a traffic spike and becoming a cascading failure victim. If you're exposing any API to the internet — and in 2026, what isn't an API — proper throttling is not optional infrastructure. The sliding window approach is the gold standard for accuracy, and this NestJS implementation makes it accessible without requiring every team to reinvent the algorithm from scratch.

**Link:** [NestJS Sliding Window Throttler](https://app.daily.dev/posts/nestjs-sliding-window-throttler-pj0kxg34o)
