---
title: "React Native 0.85, TanStack at Railway, OpenClaw Scaling, and Agentforce in Slack"
excerpt: "ui.dev/Bytes covers React Native's new animation backend, Railway's migration off Next.js, Optimizing OpenClaw's frontend for 1M WAU, and a bug story from JUXT."
publishedAt: "2026-04-11"
slug: "uidev-react-native-tanstack-openclaw-agentforce"
hashtags: "#uidev #reactnative #tanstack #nextjs #vite #openclaw #slack #frontend #generated #en"
source_pattern: "ui.dev"
---

## React Native 0.85 Ships a New Shared Animation Backend

**TLDR:** React Native 0.85 introduces a new Shared Animation Backend built with Software Mansion, moves the Jest preset to its own package, and adds Metro TLS support.

**Summary:**

React Native 0.85 lands with a structural change to how animations work under the hood. The new Shared Animation Backend moves the main animation update logic from Reanimated into React Native core. This means both `Animated` and `Reanimated` now share the same internal engine, which gives Reanimated performance improvements that weren't possible before and ensures the update reconciliation process stays stable across future RN updates.

A practical consequence: `Animated` can now animate layout props with the native driver — a limitation that's been lifted. For teams using Reanimated, this is mostly invisible but faster. For teams still on `Animated`, it's a meaningful upgrade.

The Jest preset moving to a separate package (`@react-native/jest-preset`) is a cleanup that makes the dependency graph cleaner. Node.js versions that have reached EOL are dropped, which is the kind of breaking change that's really just maintenance. `StyleSheet.absoluteFillObject` is removed — use the object spread equivalent.

**Key takeaways:**
- New Shared Animation Backend in RN core, built with Software Mansion
- `Animated` can now animate layout props with native driver
- Jest preset moved to `@react-native/jest-preset`
- Dropped EOL Node.js support, removed `StyleSheet.absoluteFillObject`

**Why do I care:** If you're on React Native, the animation backend change is the kind of invisible-but-important infrastructure work that makes everything else more stable. The fact that Software Mansion (the Reanimated team) collaborated directly on the RN core API suggests the ecosystem is maturing — the line between community libraries and the core framework is blurring in a good way.

**Link:** [React Native 0.85 Release Notes](https://reactnative.dev/blog/2026/04/07/react-native-0.85)

---

## Railway Moved Its Entire Frontend Off Next.js to TanStack Start + Vite

**TLDR:** Railway migrated their whole production frontend (dashboard, canvas, marketing site) from Next.js Pages Router to TanStack Start + Vite in two PRs with zero downtime. Build times dropped from 10+ minutes to near-instant.

**Summary:**

Railway's story is one I hear more often than you'd expect: Next.js got them from zero to millions of users, and then stopped being the right fit. Their frontend builds had crept past 10 minutes, with 6 of those minutes being Next.js alone — half of it stuck on "finalizing page optimization." For a team shipping multiple times a day, that's a tax on every single iteration.

The fundamental mismatch: Railway's app is overwhelmingly client-side. The dashboard is a rich, stateful interface. The canvas is real-time with websockets everywhere. Next.js's server-first primitives weren't things they used, and they'd built their own abstractions on top of the Pages Router just to handle layouts and routing. The App Router would have solved some problems but leans heavily into server-first patterns for a product that's intentionally client-driven.

TanStack Start + Vite matched how they actually build: explicit, client-first, and fast. Type-safe routing out of the box with inferred route params and autocomplete across the entire route tree. First-class layouts via pathless layout routes — composable and predictable instead of bolted-on workarounds. Instant HMR and near-zero startup time. SSR where it actually matters (marketing pages, changelog, careers) and pure client-side everywhere else.

The migration shipped in two PRs with zero downtime. That's the kind of migration story that makes engineering leaders sit up and pay attention.

**Key takeaways:**
- Railway's entire production frontend migrated from Next.js Pages Router to TanStack Start + Vite
- Build times dropped from 10+ minutes to near-instant
- Two PRs, zero downtime migration
- Type-safe routing, first-class layouts, instant HMR
- SSR only where it matters — pure client-side for the dashboard

**Why do I care:** This is a data point in a broader trend. Next.js is fantastic for getting started and for content-heavy sites. But for apps that are primarily rich client-side interfaces, the server-first paradigm is overhead you don't need. TanStack Start hitting this sweet spot — explicit, client-first, with opt-in SSR — is exactly what a growing segment of teams wants. The two-PR migration is the killer feature here. If your build times are painful and your app is mostly client-side, this is worth evaluating.

**Link:** [Moving Railway's Frontend Off Next.js](https://blog.railway.com/p/moving-railways-frontend-off-nextjs)

---

## Optimizing OpenClaw's Frontend for 1M Weekly Active Users

**TLDR:** Convex's engineering blog details how they optimized OpenClaw's frontend to handle 1M WAU — cutting costs, improving performance, and keeping the site up through aggressive scaling.

**Summary:**

OpenClaw (a Convex-powered application) hit 1M weekly active users and the engineering team wrote up their optimization journey. The post covers the full stack of frontend optimizations — from reducing unnecessary re-renders and optimizing data fetching patterns to cutting infrastructure costs while maintaining uptime.

The approach is methodical: measure first, optimize second. They profiled the application to find the actual bottlenecks rather than guessing. The results were significant — better performance, lower costs, and a more maintainable codebase.

**Key takeaways:**
- OpenClaw scaled to 1M weekly active users
- Systematic profiling identified actual bottlenecks before optimizing
- Optimizations reduced both costs and improved user-facing performance

**Why do I care:** Scaling stories are always more useful than theoretical best practices. The "measure first, optimize second" discipline is the part that's easy to skip when you're under pressure. Convex's approach of instrumenting everything before making changes is a template you can apply to any scaling challenge.

**Link:** [Optimizing OpenClaw's 1M Weekly Active Users](https://stack.convex.dev/optimizing-openclaw)

---

## A Bug on the Dark Side of the Moon

**TLDR:** JUXT's blog post traces a subtle bug through a system — the kind of debugging story that's part detective work, part systems thinking.

**Summary:**

JUXT's engineering blog is consistently excellent, and this debugging story doesn't disappoint. The post walks through a bug that manifested in unexpected ways — the kind where the symptom is nowhere near the cause, and the fix requires understanding the full system rather than just the failing component.

These stories are worth reading even if the specific technology isn't your stack. The debugging methodology — forming hypotheses, isolating variables, and tracing causality through a complex system — is universally applicable.

**Key takeaways:**
- Subtle bugs often have causes far from where they manifest
- Good debugging is systems thinking, not just code reading
- The methodology matters as much as the technical details

**Link:** [JUXT Blog: A bug on the dark side of the Moon](https://www.juxt.pro/blog/a-bug-on-the-dark-side-of-the-moon/)

---

## How to Get Started with Agentforce in Slack

**TLDR:** Salesforce's guide to setting up Agentforce — their AI agent platform — within Slack for team workflows.

**Summary:**

Agentforce is Salesforce's answer to the "AI agents everywhere" trend. This guide walks through the setup process for integrating it into Slack, covering the configuration steps, permissions, and initial agent deployment. The article is practical and step-by-step — useful if you're evaluating Salesforce's agent platform for your organization.

**Link:** [Getting Started with Agentforce in Slack](https://slack.com/resources/using-slack/how-to-get-started-with-agentforce-in-slack)

---

## Boneyard: Auto-Generated Skeleton Loading Framework

**TLDR:** An open-source framework for automatically generating skeleton loading states for your application's UI components.

**Summary:**

Boneyard is a small open-source project that automates skeleton screen generation — those placeholder UIs you show while content is loading. Instead of hand-crafting skeleton states for every component, Boneyard analyzes your component tree and generates appropriate loading placeholders automatically. It's the kind of tool that saves a few hours of tedious work per project.

**Link:** [GitHub - 0xGF/boneyard](https://github.com/0xGF/boneyard)
