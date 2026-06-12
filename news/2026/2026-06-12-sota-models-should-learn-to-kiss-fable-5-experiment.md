---
title: "When SOTA Coding Models Reach for the Wrong Abstraction"
excerpt: "A hands-on test of Claude Fable 5 on a simple Next.js cache bug reveals a pattern: frontier models default to scalable abstractions before considering the smallest fix that works."
publishedAt: "2026-06-11"
slug: "sota-models-should-learn-to-kiss-fable-5-experiment"
hashtags: "#substack #kilocode #nextjs #ai #agents #architecture #caching #generated #en"
---

## When SOTA Coding Models Reach for the Wrong Abstraction

**TLDR:** The author built a small Next.js app with a deliberate cache invalidation bug and asked Claude Fable 5 to fix it. The model found and solved the bug correctly, but it reached for a tag-based revalidation system when a single line of `revalidatePath` would have done the job. The piece argues that newer models are drifting toward over-engineering, picking scalable patterns before checking whether the problem actually needs them.

**Summary:** The setup here is clever because it isn't a trick question. The author spun up a basic Next.js app with two routes, a products listing and an admin form, plus an internal API route for adding products. The admin form posts to that API, which writes to an in-memory store. The catch is that the products page cached its read for sixty seconds, and the write path never invalidated that cache. So if you added a product and immediately went back to the listing, you might not see it. The author is upfront that none of the individual decisions were wrong. Server-rendering a catalog page is sensible. URL-based filters are normal. A sixty-second cache on product data is a defensible performance call. The bug lived in the gap between those reasonable choices, which is exactly where real production bugs tend to hide.

What I found interesting is that the author wasn't really testing whether the model could find the bug. He knew it would. He was testing the judgment behind the fix. And the model did read the files, correctly identified cache invalidation as the core issue, and resisted the obviously dumb moves like disabling caching entirely, refactoring to a client component, or messing with the filters. That part is genuinely reassuring. The failure mode of older models was loud and easy to catch. They hallucinated APIs or wrote code that didn't compile. You rejected it in two seconds. The newer failure mode is quieter and harder to spot.

Here's where it gets pointed. Fable 5 chose to tag the fetch with a products tag and then call revalidateTag in the POST handler. That works. It keeps reads cached for normal browsing and invalidates after writes. It's the kind of answer you'd expect from a frontier model. But for this app, the author argues the right fix was a single call to revalidatePath on the products route after the POST succeeds. That's it. The tag-based approach is what you reach for when product data shows up in many places, a homepage, category pages, related-product sections, sitemaps, multiple layouts. In that world, invalidating the concept of products beats remembering every path. For a toy app anyone could write after a few months of Next.js, tags add more architecture than the problem needs.

The author is careful not to over-generalize from one example, and he's right to be. But he's not alone in the observation. He quotes Anthropic directly saying that Claude Opus 4.5 and 4.6 have a tendency to over-engineer by creating extra files, adding unnecessary abstractions, or building in flexibility nobody asked for. Anthropic's suggested fix is prompting, and the author openly wonders whether prompting is enough. His sharper hypothesis is about the eval loop itself. As models improve, benchmark tasks get more complicated, complicated tasks need patterns, and the model may be learning to reach for patterns by default. Simpler apps then pay the tax because the model applies machinery the problem never called for.

What the author avoids dwelling on is the human side of this. A senior engineer reviewing that tag-based fix might not even flag it, because it's correct and it's a pattern they recognize. The risk isn't a broken PR. It's a slow accretion of unnecessary abstraction across a codebase, each individually justified, none individually wrong, that nobody pushes back on because the AI wrote something that looks professional. The best answer, as the author notes, would have offered both options and named the condition that picks between them. That conditional judgment, "use the small fix unless X, then use the scalable one," is exactly the thing that's hard to benchmark and easy to lose.

**Key takeaways:**
- Fable 5 correctly diagnosed a Next.js cache invalidation bug and avoided the obviously wrong fixes, so model reasoning on real bugs is solid.
- It defaulted to tag-based revalidation when a single `revalidatePath` call matched the actual requirements, an example of solving for scale the app didn't need.
- Anthropic has acknowledged that recent Opus models tend to over-engineer, and recommends prompting to counter it.
- The author's theory is that eval loops favoring increasingly complex tasks may train models to reach for patterns by default, penalizing simple apps.
- The strongest response would name the condition that decides between the small fix and the scalable one, rather than picking the scalable one unprompted.

**Why do I care:** If you're shipping with an AI pair, this is the failure mode to watch, because it's the one your linter and your tests won't catch. Correct, well-structured, over-built code passes review more easily than broken code, and that's the trap. As an architect I care less about whether the model can find the bug and more about whether it picks the simplest thing that satisfies the requirement, because every premature abstraction is a maintenance cost someone inherits. Practically, this means your prompts and your review discipline should explicitly reward the smallest change that works, and you should treat "the model chose a scalable pattern" as a question to interrogate, not a box to check. The day-to-day takeaway: don't outsource the "do we actually need this yet" judgment to the model, because right now that's still the part it's weakest at.

**Link:** [SOTA Models Should Learn to KISS (Fable 5 Experiment)](https://blog.kilo.ai/p/sota-models-should-learn-to-kiss)
