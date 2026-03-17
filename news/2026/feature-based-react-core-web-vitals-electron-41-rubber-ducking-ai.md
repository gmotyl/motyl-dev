---
title: "Feature-Based React, Core Web Vitals Wins, Electron 41, and Rubber Ducking with AI"
excerpt: "From structuring full-stack React apps around features to slashing Core Web Vitals scores, plus Electron 41 lands and a refreshingly honest take on using AI as a thinking partner."
publishedAt: "2026-03-17"
slug: "feature-based-react-core-web-vitals-electron-41-rubber-ducking-ai"
hashtags: "#dailydev #frontend #webdev #react #nextjs #performance #architecture #ai #generated #en"
---

## Feature-Based React Architecture

**TLDR:** Robin Wieruch walks through how database relationships should drive your React component design when using Server Components. The core idea is to keep each feature, its components, and its data-fetching logic in its own domain folder, then use component composition and parallel fetching to get both clean separation and optimal performance.

**Summary:**

There is a tension at the heart of every full-stack React application built with Server Components. On one side, you have the simplicity of fetching a post and its comments in a single Prisma query with an include statement. On the other, you have the maintenance nightmare that erupts six months later when every query function has grown into a permutation monster: getPostWithComments, getPostWithAuthor, getPostWithCommentsAndAuthor. Robin Wieruch tackles this head-on by showing how to enforce a feature-based architecture that keeps each vertical slice of your application, posts and comments in this example, completely isolated.

The approach starts with the obvious move of splitting a monolithic Post component into a Post component and a Comments component, each living in its own feature folder. But Wieruch does not stop there. He takes data fetching and isolates it too, so the getPost function only fetches posts and the getComments function only fetches comments. Each lives in its own feature folder with its own query file. This avoids the combinatorial explosion of join queries, though Wieruch is honest enough to admit that sometimes you do need those joined queries for performance on complex pages.

The interesting part comes when he addresses the waterfall problem this creates. If the Post component fetches post data and then the Comments component fetches comment data sequentially, you have a waterfall. His solution is component composition at the parent level: the PostPage component fires off both getPost and getComments in parallel using Promise.all, then passes the results down. The Post component receives its data as props plus a comments slot as a ReactNode. This pattern gives you parallel data fetching, clean feature boundaries, and the bonus that either component can independently become a Client Component without dragging the other along.

What Wieruch avoids discussing is the cost of this approach in smaller teams or early-stage projects. The overhead of maintaining separate feature folders with separate query files for a ten-page app is real. He mentions that "in a smaller React project, these steps might not be essential," but glosses over the judgment call of when exactly to introduce this structure. There is also no discussion of how this pattern interacts with React's built-in Suspense boundaries, which offer another approach to avoiding waterfalls without lifting all data fetching to the parent. The N+1 problem warning at the end is valuable, but it deserves more than a paragraph given how easily developers stumble into it when following exactly this kind of advice.

**Key takeaways:**
- Keep each feature's components and data-fetching functions in isolated domain folders to prevent cross-feature coupling
- Use component composition at the parent level with Promise.all for parallel data fetching instead of nested sequential requests
- Passing components as ReactNode props allows either side to become a Client Component independently
- Watch for the N+1 problem when applying this pattern to list pages where you would fetch related data per item

**Why do I care:** If you are building anything beyond a toy app with React Server Components, this pattern is essentially mandatory. The component composition approach with parallel fetching is the sweet spot between clean architecture and performance, and it is a pattern that will scale with your codebase. Understanding when to use isolated queries versus joined queries is the real skill here, and getting it wrong in either direction has consequences.

**Link:** [Feature-based React Architecture](https://robinwieruch.de/react-feature-architecture/)

## How We Used Next.js to Improve Core Web Vitals for SaaS

**TLDR:** A practical case study of improving Core Web Vitals on a SaaS blog page by upgrading to Next.js 16, moving rendering to the server, optimizing images, and restructuring CSS. The results include a 58.6% improvement in Speed Index and eliminating all Cumulative Layout Shift.

**Summary:**

This article from Surajon is the kind of performance optimization write-up that actually matters because it shows real numbers. The author took a SaaS blog page with mediocre mobile performance scores and methodically improved them through a series of focused changes. No single change was revolutionary, but stacked together, they turned an orange-and-red PageSpeed report into something mostly green.

The first move was upgrading from Next.js 15 to Next.js 16 using the official codemod tool. This is not just a version bump for bragging rights. The upgrade enabled the React Compiler, which performs automatic memoization and eliminates the need for manual React.memo, useMemo, and useCallback calls. That is a meaningful reduction in both code complexity and runtime overhead. The codemod handled migration of the config file to the new Turbopack format and cleaned up experimental prefixes, which is the kind of tooling support that makes framework upgrades less terrifying.

The bigger wins came from auditing client-side rendering. The author found components with a top-level "use client" directive that only needed client-side rendering for a single feature like scroll tracking. By extracting just that feature into its own client component and leaving everything else as server-rendered, they cut the JavaScript shipped to the browser significantly. Moving markdown-to-HTML parsing to the server alone dropped the Speed Index from 2.9 seconds to 1.2 seconds. For images, they reduced quality to 50 on thumbnail images and added blur placeholders to eliminate layout shift from loading author avatars. The CSS restructuring, extracting blog-specific styles from the global stylesheet into a dedicated file only loaded on article pages, cut the global CSS bundle by 40%.

What the article does not address is the ongoing cost of these optimizations. Reducing image quality to 50 is fine for thumbnails, but there is no discussion of how to set up automated quality decisions or responsive image strategies. The mention of AI agents skipping slow pages is an interesting point about the evolving incentives for performance, but it is stated without evidence. The author also does not mention monitoring: how do you know when performance regresses after the next feature ships? A one-time optimization is a snapshot, not a strategy.

**Key takeaways:**
- Upgrading to Next.js 16 enables the React Compiler, which automates memoization and eliminates manual performance hooks
- Audit "use client" directives ruthlessly and extract only the specific features that need client rendering into their own components
- Image quality reduction and blur placeholders are high-impact, low-effort wins for LCP and CLS
- Splitting CSS by page type prevents unnecessary styles from loading on pages that do not need them

**Why do I care:** These are the kinds of optimizations that compound. Each one is small, but together they represent a massive improvement in user experience and search ranking. If you are running a Next.js application and have not audited your client-side rendering boundaries or image optimization strategy recently, this article is a practical checklist. The React Compiler migration path alone is worth the upgrade conversation.

**Link:** [How We Used Next.js to Improve Core Web Vitals for SaaS](https://www.surajon.dev/nextjs-to-improve-core-web-vitals-for-saas)

## Electron 41.0

**TLDR:** Electron 41 ships with Chromium 146, Node.js 24.14.0, and V8 14.6. Headline features include ASAR integrity digest for macOS security, improved Wayland support on Linux, MSIX auto-updating, and a breaking change where PDFs no longer create separate WebContents.

**Summary:**

Electron 41 is a solid infrastructure release that moves the platform forward on security, Linux support, and Windows distribution. The Chromium jump from 144 to 146 is significant, bringing two major versions of browser engine improvements along with V8 14.6. Node.js moves from 24.11.1 to 24.14.0, which includes several patch releases worth of stability fixes.

The ASAR integrity digest feature is the most interesting security addition. macOS Electron apps can now embed a digest of their ASAR integrity information, which means the integrity validation data itself gets validated at launch. This is tamper detection on top of tamper detection. You run a command from the electron/asar CLI, re-sign your app, and you have an additional layer of assurance that your application bundle has not been modified. Electron Forge support for this is coming, which will make it accessible to the majority of Electron developers who use Forge as their build tool.

The Wayland improvements on Linux deserve attention. Frameless windows now get drop shadows and extended resize boundaries, which means Electron apps on modern Linux desktops stop looking like they were designed in 2010. Setting hasShadow to false creates truly frameless windows. The team has hinted at a dedicated blog post about their Wayland and client-side decorations work, which suggests more improvements are in the pipeline. On the Windows side, MSIX auto-updating support means you can use essentially the same JSON response format on your update server for both MSIX and Squirrel.Mac updates. That is a meaningful reduction in update infrastructure complexity for cross-platform apps.

The breaking change around PDF rendering is worth flagging. PDFs no longer create a separate guest WebContents. Instead, they render within the same WebContents using out-of-process iframes. If you have any code that detects or manipulates PDF resources through WebContents APIs, it will break and needs to be migrated to use the frame tree instead. The cookie change cause updates are also more granular now, distinguishing between entirely new cookies, identical overwrites, and attribute-only updates.

**Key takeaways:**
- ASAR integrity digest adds a meta-layer of tamper detection for macOS apps, validating the integrity information itself
- Wayland frameless windows now have proper shadows and resize boundaries on Linux
- MSIX auto-updating unifies update server formats across Windows and macOS
- PDF rendering moved from separate WebContents to in-process OOPIFs, a breaking change for code that detects PDFs via WebContents

**Why do I care:** If you maintain an Electron application, the PDF rendering change is the one that could bite you silently. Test your PDF handling before upgrading. The ASAR integrity digest is worth enabling for any macOS distribution, and the Wayland improvements matter if any of your Linux users are on modern desktops with Wayland compositors, which is an increasingly common setup.

**Link:** [Electron 41.0](https://www.electronjs.org/blog/electron-41-0)

## Interactive Rubber Ducking with GenAI

**TLDR:** Oskar Dudycz describes a technique where you prompt an LLM to ask you one question at a time about your design idea, building up a specification through interrogation rather than generation. The goal is not to get the AI to think for you, but to surface blind spots in your own thinking.

**Summary:**

This article from Architecture Weekly is refreshingly honest about what GenAI is actually useful for. Oskar Dudycz, a self-described AI skeptic, has found a workflow where the AI's tendency toward mediocrity becomes a feature rather than a bug. He calls it "Interactive Rubber-Ducking," and the premise is simple: you give Claude Code a prompt that says "ask me one question at a time so we can develop a step-by-step spec for this idea," and then you become the one doing the thinking while the AI becomes the interviewer.

The key insight is that this inverts the typical AI coding workflow. Instead of asking the AI to generate solutions, you are asking it to interrogate your solutions. The AI saves each question and answer to a qa.md file as a running log, and builds a spec.md as a summary document. Dudycz is explicit that the spec is not the point. The point is that the process of answering questions forces you to articulate decisions you might have left vague, and occasionally the AI asks something that reveals a blind spot you genuinely had not considered. He emphasizes using stronger models like Opus for this because the quality of questions degrades significantly with smaller models.

The article includes a complete, unedited transcript of Dudycz using this technique to design a second-level cache for his open-source projects Pongo and Emmett. The transcript is genuinely valuable because it shows the actual back-and-forth, including Dudycz's typos and moments of reconsideration. The AI asks about cache provider choice, configuration cascading, key collision avoidance, transaction interaction, and error handling strategy. Each answer reveals a design decision that Dudycz had partially thought through but had not fully articulated. The cascading configuration discussion, where cache settings inherit from client to database to collection to session to per-operation, is a particularly good example of a design that benefited from being forced through a structured Q&A.

What Dudycz does not fully explore is the risk of confirmation bias in this process. He acknowledges that LLMs are "yes men," but the question-asking format does not fully escape this problem. The AI's questions tend to offer options where the "right" answer is obvious, and Claude's "thoughts" after each answer are uniformly affirming. A human architect would push back harder, suggest the developer is overengineering, or point out that the entire second-level cache might be premature optimization. The technique is most powerful when the developer already has strong opinions and deep domain knowledge, which limits its usefulness for exactly the situations where you most need a rubber duck: when you genuinely do not know what you are doing.

**Key takeaways:**
- Prompting an AI to ask you one question at a time about your design forces you to articulate decisions you might have left vague
- The technique produces two artifacts: a full Q&A log and a concise specification summary
- Use stronger models for better question quality; smaller models ask shallow, obvious questions
- The approach works best when you already have deep domain knowledge and need to stress-test your thinking, not when you are starting from scratch

**Why do I care:** This is probably the most productive use of AI for senior developers I have seen described. It does not pretend the AI is doing the thinking. It uses the AI as a structured interviewing tool that happens to be available at two in the morning when no human colleague is around. If you are a technical lead or architect making design decisions in isolation, this technique is worth adding to your workflow. Just stay aware that the AI will rarely tell you your entire approach is wrong, which is sometimes exactly what you need to hear.

**Link:** [Interactive Rubber Ducking with GenAI](https://www.architecture-weekly.com/p/interactive-rubber-ducking-with-genai)
