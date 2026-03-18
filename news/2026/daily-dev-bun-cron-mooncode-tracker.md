---
title: "Bun Goes Full Cron, and a Dev Builds Their Own WakaTime"
excerpt: "Bun v1.3.11 lands with 105 bug fixes plus OS-level cron scheduling, while MoonCode emerges as an open-source coding activity tracker powered by a VS Code extension."
publishedAt: 2026-03-18
slug: daily-dev-bun-cron-mooncode-tracker
hashtags: "#dailydev #frontend #webdev #bun #vscode #opensource #devtools #javascript #generated #en"
---

## Bun v1.3.11: 105 Bug Fixes and a Cron Job API You Didn't Know You Needed

**TLDR:** Bun v1.3.11 ships with 105 bug fixes and introduces Bun.cron for OS-level cron job scheduling, Bun.sliceAnsi for ANSI-aware string slicing, and richer metadata in Bun.markdown.render() list callbacks.

**Summary:**

The Bun team just dropped v1.3.11, and this is one of those releases where the sheer volume of fixes tells a story about how fast the runtime is maturing. One hundred and five bug fixes in a single release is not a small number — that is the kind of deep stabilization work that makes a runtime trustworthy for production workloads. But beyond the fixes, the headline feature is Bun.cron, which lets you schedule OS-level cron jobs directly from your JavaScript code. On macOS it hooks into launchd, on Linux it talks to crontab, and on Windows it uses Task Scheduler. No more shelling out or managing separate crontab files — you just write your schedule in code and Bun handles the rest.

The release also introduces Bun.sliceAnsi, which is a utility for slicing strings that contain ANSI escape codes and complex grapheme clusters without breaking them. If you have ever tried to truncate a colorized terminal string and ended up with garbled output, you know exactly why this matters. Additionally, the bun test runner now supports --path-ignore-patterns, giving you finer control over which test files get picked up during runs.

**Key takeaways:**

- Bun.cron provides native OS-level cron job scheduling across macOS, Linux, and Windows
- Bun.sliceAnsi handles ANSI and grapheme-aware string slicing for terminal output
- The bun test runner gains --path-ignore-patterns for filtering test files
- 105 bug fixes signal serious stabilization efforts for production readiness

**Why do I care:** If you are running any kind of scheduled task alongside your Node or Bun application — and let us be honest, most of us are — having cron scheduling built right into the runtime eliminates an entire class of deployment complexity. No separate crontab management, no process managers for scheduled work. The 105 bug fixes also suggest Bun is hitting the phase where edge cases get ironed out, which is exactly when a runtime becomes viable for serious projects.

**Link:** [Bun v1.3.11](https://app.daily.dev/posts/bun-v1-3-11-dug54q8tb)

---

## MoonCode: An Open-Source Coding Activity Tracker Built From Scratch

**TLDR:** A developer built MoonCode, an open-source alternative to WakaTime that tracks coding activity through a VS Code extension with offline support, backed by a NestJS API and a React dashboard.

**Summary:**

Sometimes the best way to learn a stack is to build something you actually want to use every day. A developer going by Friedrich WT spent the last few months building MoonCode, a full-stack coding activity tracker that monitors your development time, language usage, and file-level metrics. The architecture is a proper modern monorepo managed with Turborepo: a VS Code extension handles data collection on the client side, a NestJS API serves as the backend, a Vite plus React Router dashboard provides the visualization layer, and PostgreSQL stores everything.

What makes this interesting beyond the usual side project is the offline support built into the VS Code extension. The extension collects metrics locally and syncs to the API when connectivity is restored, which means your tracking data does not disappear just because you were coding on a train or in a coffee shop with spotty Wi-Fi. The entire project is open source and available at mooncode.cc.

**Key takeaways:**

- MoonCode is a self-hosted, open-source alternative to WakaTime for tracking coding activity
- The VS Code extension supports offline data collection with automatic sync when back online
- The stack includes NestJS, Vite, React Router, PostgreSQL, and Turborepo
- Full source is open and available for self-hosting

**Why do I care:** If you have ever wanted detailed coding metrics without sending your data to a third-party service, this is worth a look. The architecture decisions are also instructive — Turborepo for the monorepo, NestJS for the API, React Router for the dashboard — it is basically a reference implementation of a modern full-stack TypeScript application. Whether you use it as a tool or study it as architecture, there is something to learn here.

**Link:** [MoonCode - Coding Activity Tracker](https://app.daily.dev/posts/hello-guys-during-the-last-few-months-i-ve-been-building-an-open-source-side-project-that-i-want-t-ein7xaelu)