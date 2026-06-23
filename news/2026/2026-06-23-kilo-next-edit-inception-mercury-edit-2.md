---
title: "Next-Edit in Kilo: Diffusion LLMs Come for Your Tab Key"
excerpt: "Kilo integrates Inception's Mercury Edit 2, a diffusion-based model that predicts your next code edit rather than your next token — and it's free for 30 days."
publishedAt: "2026-06-22"
slug: "kilo-next-edit-inception-mercury-edit-2"
hashtags: "#ai #productivity #engineering #kilo #codingtools #devtools #diffusionllm #autocomplete #generated #en"
source_pattern: "Kilo"
---

## Next-Edit in Kilo, Powered by Inception's Mercury Edit 2

**TLDR:** Kilo has shipped Next-Edit, a new code-editing mode powered by Inception's Mercury Edit 2 diffusion LLM. Unlike traditional autocomplete that predicts tokens ahead of your cursor, Next-Edit watches your recent edits and jumps to wherever your next logical change should land. It's free for everyone through July 23rd, 2026, no credit card required.

**Summary:**

The promise here is a meaningful shift in how AI-assisted coding actually works in practice. Traditional autocomplete is a forward-looking prediction engine — it sees where you are and guesses what comes next sequentially. That's useful, but it doesn't reflect how developers actually work. We refactor, rename, cascade changes across a block, and bounce around a file. Mercury Edit 2 is designed to match that non-linear workflow.

What makes this technically interesting is the underlying architecture. Mercury Edit 2 is a diffusion language model (dLLM), which means it doesn't generate code left-to-right, one token at a time. Instead, it refines the target edit in parallel passes — more like sculpting than typing. The result is a model that can propose an edit anywhere in your file, not just immediately after your cursor. You hit Tab to accept, just like you would with Copilot, but the suggestion might be three functions down.

The benchmark numbers Inception is citing are notable: 48% higher acceptance rates compared to prior iterations (attributed to KTO-based reinforcement learning from real human feedback), and 27% more selectivity, meaning it stays quiet unless it's confident. That last number matters more than it sounds — one of the biggest friction points with AI coding tools is the constant noise of low-confidence suggestions that break concentration.

Kilo is keeping classic autocomplete available alongside Next-Edit, which is the right call. Next-Edit becomes the new default for new users, but the toggle to switch back is straightforward. The free promotion via the Kilo Gateway runs through July 23rd, 2026, after which Mercury Edit 2 continues at standard market rates.

The real test, as always, is whether the latency holds up on real projects. Inception claims Mercury Edit 2 wins in side-by-side latency tests against "speed-optimized frontier models," which is a bold claim — one worth verifying in a large monorepo rather than a benchmark suite.

**Key takeaways:**

- Mercury Edit 2 uses diffusion architecture — generates edits in parallel, not left-to-right
- Next-Edit predicts *where* you'll edit next across the file, not just what comes after your cursor
- 48% higher acceptance rate vs. prior Mercury model; 27% more selective about when to trigger
- Free via Kilo Gateway through July 23rd, 2026 — no signup friction
- Both Next-Edit and classic Autocomplete modes available, switchable per-project in VS Code settings
- New Kilo users get Next-Edit as default; existing users with prior settings must manually opt in

**Why do I care:**

The diffusion LLM angle for code editing is worth paying attention to, not as hype, but because it addresses a real structural limitation of autoregressive models — they can only sensibly suggest what comes *after* your cursor. If you're mid-refactor and the change you need is 50 lines up, current tools are useless. A model that genuinely learns from your recent edit history and proposes the *next logical change location* could compress the cognitive overhead of large refactors meaningfully. The skeptic in me wants to see this on a 200k-line TypeScript codebase with circular dependencies and 12 barrel files — that's where "predicts your next edit" either earns its marketing copy or collapses into noise. But the architecture is sound, the benchmark story is coherent, and the free 30-day window is a zero-friction way to find out.

**Link:** [Announcing Next-Edit in Kilo, Powered by Inception](https://blog.kilo.ai/p/announcing-next-edit-in-kilo-powered-by-inception?publication_id=4363009&post_id=203116847&isFreemail=true&triedRedirect=true)
