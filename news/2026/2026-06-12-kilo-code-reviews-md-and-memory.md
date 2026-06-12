---
title: "Kilo Code's REVIEWS.md: Teaching Review Agents Your Team's Conventions"
excerpt: "Kilo Code introduces a per-repo REVIEWS.md standard, Code Review Memory that learns from your PR feedback, and local review suggestions in VS Code."
publishedAt: "2026-06-12"
slug: "kilo-code-reviews-md-and-memory"
hashtags: "#substack #kilocode #devtools #code-review #agents #github #dx #generated #en"
---

## Kilo Code's REVIEWS.md: Teaching Review Agents Your Team's Conventions

**TLDR:** Kilo Code shipped three things for its AI review agent: a per-repo REVIEWS.md file that lets each project carry its own conventions, a Code Review Memory feature that learns your preferences from how you respond to past PRs, and a local review suggestion inside VS Code that runs before you push. The pitch is that a review agent should adapt to the repo it's in rather than apply one generic rubric everywhere.

**Summary:** The starting observation here is one most of us have lived through. Every team has its own style, its own architectural lines in the sand, and those rules shift from one repo to the next. A review bot that runs the same checklist against your frontend app and your Terraform modules is going to flag the wrong things and miss the things you actually argue about in PRs. Kilo's answer is REVIEWS.md, which they describe as an open-standard Markdown file that reads like a README written for machines. You drop it in the root of the repo, write your conventions in plain prose, and the review agent picks them up. If you've worked with an AGENTS.md or AGENT.md file, this is the same shape pointed at a narrower job.

The mechanism is straightforward. When you set up Kilo Code Reviews on a GitHub or GitLab repo for automatic AI reviews, there's now a toggle to turn on REVIEWS.md support. Flip it on and the agent reads the file and applies those repository-specific standards on every automated pass. The part I find genuinely useful is that the config is local to the repo, so your frontend project enforces frontend rules and your infrastructure repo enforces its own, with nothing shared between them. That's the right granularity. A single org-wide review config always ends up as a lowest-common-denominator mush.

The second feature, Code Review Memory, is the more interesting idea and also the one I'd poke at hardest. The premise is that you shouldn't have to sit down and document every preference you hold, because most of them already live in how you respond to reviews. So Memory runs an analysis over your replies and feedback on Kilo's reviews, then uses AI to generate a proposed update to your REVIEWS.md. The example they give: if your team keeps dismissing nitpicks about line length but consistently acts on error-handling comments, the agent proposes shifting its focus accordingly. When the analysis finishes you get a proposal, and Kilo can open the PR for you, so your review standards stay version-controlled and visible to the whole team.

There's a quieter third change. Locally in VS Code, Code mode will now suggest a local review when it makes sense, non-invasively. Accept it and you switch into Code Reviewer mode, which analyzes uncommitted changes for issues before they ever leave your machine. The argument is about the feedback loop: catching a problem locally saves a round trip through CI and spares both human reviewers and the cloud agent from flagging something you could have fixed in thirty seconds. That's a real and underrated cost, the latency of finding out you made a dumb mistake only after a five-minute pipeline.

Now the part the announcement avoids thinking about. Code Review Memory learns from how you behave, which means it will faithfully encode your bad habits alongside your good ones. If your team rubber-stamps PRs at 5pm on Fridays, or consistently waves through a category of bug because nobody on the team understands it, Memory will dutifully learn to stop flagging exactly the thing you most need flagged. Inferring intent from dismissals is a noisy signal. A dismissed comment can mean "this rule is wrong" or it can mean "I'm tired and this PR is already three days late." The post also doesn't address the obvious lock-in: REVIEWS.md is pitched as an open standard, but Memory, the PR generation, and the VS Code integration are all Kilo's proprietary surface around it. The open file is the hook; the value lives in the closed parts.

**Key takeaways:**

- REVIEWS.md is a per-repo Markdown file the review agent reads to apply your team's specific conventions, scoped so each repo can differ.
- Code Review Memory analyzes your past PR responses and proposes updates to REVIEWS.md, optionally opening the PR itself so standards stay version-controlled.
- VS Code Code mode now suggests a local review of uncommitted changes, switching you into Code Reviewer mode to catch issues before CI.
- The learning-from-feedback approach risks encoding bad habits, since a dismissed comment is an ambiguous signal.
- The "open standard" file is genuinely portable, but the memory, PR automation, and editor integration are Kilo-specific.

**Why do I care:** As an architect, the per-repo scoping is the bit worth stealing even if you never touch Kilo. Conventions should live next to the code they govern, in plain text, version-controlled, reviewable like anything else, and REVIEWS.md is just AGENTS.md applied to one job. That's a healthy pattern. I'm warier of the auto-learning loop. The whole reason you write conventions down is to hold a standard your team drifts away from under deadline pressure, and an agent that quietly relaxes its focus because you keep dismissing comments is optimizing for your convenience, not your code quality. If you adopt this, treat Memory's proposals as a starting draft a human edits with intent, not as ground truth, and keep the file readable so the next person can see what the bot decided on your behalf. The local-review-before-push idea is the easiest win of the three and the one I'd turn on first.

**Link:** [Code Reviews: Introducing REVIEWS.md and Memory](https://blog.kilo.ai/p/code-reviews-md)
