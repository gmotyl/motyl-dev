---
title: "PinchBench v2: Community-Driven Benchmark for OpenClaw Agents"
excerpt: "NVIDIA-endorsed benchmark for evaluating LLM coding agents opens contributions, targeting 100 real-world tasks for agentic performance evaluation"
publishedAt: "2026-03-24"
slug: "pinchbench-v2-openclaw-benchmark-contributors"
hashtags: "#substack #ai #llm #benchmark #openclaw #agents #generated #en"
---

## PinchBench v2: Call for Contributors to the Leading OpenClaw Benchmark

**TLDR:** PinchBench, the benchmark for evaluating LLM models as OpenClaw coding agents, is launching v2 development with community contributions open through April 15th, 2026. NVIDIA CEO Jensen Huang showcased it as the definitive standard for OpenClaw agent evaluation at GTC 2026.

**Summary:**
PinchBench started as a side project by Kilo DevRel mastermind Brendan O'Leary to benchmark LLM models for OpenClaw coding agent use cases. The concept was straightforward: run tests based on real-world tasks to help users choose the right model for their needs. But this "side project" has gained significant traction, culminating in NVIDIA CEO Jensen Huang showcasing PinchBench during his GTC 2026 keynote as the definitive standard for evaluating real-world performance of OpenClaw agents. Huang specifically highlighted Nemotron 3 Super's performance as the top open-weight model for OpenClaw use cases.

The timing is significant. Following the keynote, MiniMax announced upcoming weights release for MiniMax-M2.7, and Z AI shared that GLM-5.1 will also have open weights. The competition is intensifying across both open-source and proprietary models, marking what the announcement calls "the beginning of the agentic revolution."

PinchBench v2 represents a substantial evolution from the original benchmark. The goal is 100 tasks that accurately capture the real-world complexity of agentic work—including longer task horizons, better verification mechanisms, and a richer performance picture across diverse domains. The benchmark is specifically designed for always-on agents, focusing on skills that can be used around the clock in tools like KiloClaw, KiloClaw's hosted OpenClaw service.

The contribution model is open and community-driven. Two types of contributors are needed: skills contributors who create or improve tasks, and leaderboard contributors who enhance UI/UX for results presentation. Tasks must represent real, valuable work that practitioners would actually run OpenClaw on, with clear and programmatically verifiable success criteria. They should be relevant across both local and hosted OpenClaw instances, including services like KiloClaw and KimiClaw.

Good tasks follow specific criteria: they must be realistic (something OpenClaw would genuinely be used for in real workflows), clearly specified (passing solutions unambiguously satisfy the task), well-calibrated in difficulty (targeting solve rates that distinguish model capability), and convention-compliant (following OpenClaw skill conventions for consistency). Contributions that include baseline success rates across multiple models are especially valuable to ensure the benchmark is neither trivially easy nor impossibly hard.

The leaderboard improvements focus on making results easier to understand and compare. Planned enhancements include redesigned filtering and navigation, model and contributor profile pages, improved scoring to eliminate run-size bias, and daily/weekly/monthly recognition badges. The contribution window remains open through April 15th, 2026, with no forms required—contributors can fork the repo, implement tasks or features, and submit PRs directly.

Contributors will be recognized in the v2 release in two categories: Skills Contributors (ordered by number of accepted task contributions) and Leaderboard Contributors (for accepted UI/UX improvements). Every accepted contribution counts toward recognition, whether it's a single well-crafted task or a comprehensive leaderboard feature.

**Key takeaways:**
- PinchBench v2 targets 100 real-world tasks for OpenClaw agent evaluation
- NVIDIA CEO Jensen Huang endorsed it as the definitive OpenClaw benchmark at GTC 2026
- Community contributions open through April 15th, 2026—no forms required, just fork and PR
- Tasks must be realistic, clearly specified, well-calibrated, and convention-compliant
- Leaderboard improvements focus on filtering, profiles, scoring bias elimination, and recognition badges
- Contributors recognized in release based on accepted contributions

**Why do I care:**
As AI coding agents become more prevalent in development workflows, having reliable benchmarks for evaluating their real-world performance is critical for making informed tooling decisions. PinchBench's focus on actual tasks—not synthetic benchmarks—means the results will be more relevant for production use cases. For architects and senior developers evaluating whether to integrate OpenClaw-style agents into their workflows, this benchmark will provide concrete data on which models perform best for specific task types. The community-driven approach also ensures the benchmark evolves with actual usage patterns rather than remaining static. If you're working with AI agents professionally, contributing tasks or following the benchmark results could inform your tooling strategy.

**Link:** [PinchBench v2: Call for Contributors to the Leading OpenClaw Benchmark](https://blog.kilo.ai/p/pinchbench-v2-call-for-contributors)