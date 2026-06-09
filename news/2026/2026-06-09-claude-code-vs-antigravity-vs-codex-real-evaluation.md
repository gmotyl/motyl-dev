---
title: "Claude Code vs Antigravity 2.0 vs Codex: A Real-World Agent Showdown"
excerpt: "A hands-on comparison of three AI coding agent harnesses tested against a real research task, plus the week's AI news from NVIDIA superchips to Uber's budget crisis."
publishedAt: "2026-06-09"
slug: "claude-code-vs-antigravity-vs-codex-real-evaluation"
hashtags: "#TheCircuit #ai #agents #devtools #generated #en"
source_pattern: "TheCircuit"
---

## Claude Code vs Antigravity 2.0 vs Codex: A Real Evaluation

**TLDR:** After a year of running a heavily customized Claude Code setup, the author benchmarked all three major AI agent harnesses against a real research task using a custom MCP server. Claude Code held its ground, Codex impressed but wasn't worth the migration cost, and Antigravity 2.0 finished first but left the most to be desired.

**Summary:** There's something refreshing about someone who actually puts these tools through their paces on real work rather than synthetic benchmarks. The author has been running Claude Code with Obsidian, custom Skills, and multiple MCP servers across three distinct AI workspaces for about a year. That's not a weekend experiment. That's a real investment in a workflow, and it earns the comparison some credibility.

The evaluation task was research into demo short formats for a filmmaking project called Project Skia, run through a custom desk research MCP server. That matters because it's not a hello-world script. It requires the agent to actually use external tooling, handle context, and produce coherent output. The configs were matched as closely as possible across the three tools: Opus 4.8 for Claude Code, Gemini 3.1 Pro for Antigravity, and GPT 5.5 for Codex, all at high compute settings.

The permissions story alone tells you a lot. Antigravity kept asking for approval of the same basic shell commands, like ls and sed, repeatedly within the same session. That's not a workflow. That's a speed bump disguised as a security model. Codex ships with most bash permissions unlocked out of the box. Claude Code's permission model was familiar and consistent. These aren't minor UX differences. When you're in a flow state and the tool keeps interrupting you to ask permission to list a directory, you start to question whether the tool is working for you or you're working for the tool.

Live feedback and transparency is where Claude Code genuinely pulled ahead. The author calls out that Codex gave too much text with too little information density, which I recognize immediately as that feeling of reading a progress report that somehow tells you nothing. Antigravity's status messages were described as generic placeholders, which is its own special kind of frustrating. Claude Code was concise and clear about what it was actually doing.

The research quality results were interesting. Antigravity finished first but produced less complete output, partly because it couldn't incorporate context files in the prompt and partly because Gemini 3.1 Pro still lags behind on agentic reasoning compared to GPT 5.5 or Opus 4.8. Both Codex and Claude Code just worked. The conclusion to stay on Claude Code comes down to migration cost for Claude-native integrations, but the author is clear that for someone starting fresh today, both Claude Code and Codex are genuinely good choices.

**Key takeaways:**
- Antigravity 2.0's permission prompting behavior is disruptive, asking the same approvals multiple times per session rather than remembering them.
- Claude Code's live feedback was more concise and information-dense than Codex's verbose output or Antigravity's placeholder messages.
- Gemini 3.1 Pro underperforms GPT 5.5 and Opus 4.8 specifically on agentic tasks, which hurt Antigravity's research quality.
- The switching cost from Claude Code to Codex is relatively low in terms of workspace structure, but existing Claude-native integrations create real migration friction.
- Codex's built-in browser is a genuine differentiator worth watching.

**Why do I care:** As someone thinking about which agent harness to commit to for a year of work, this comparison cuts through the marketing noise with actual task results. The permissions model and live feedback quality aren't just comfort features. They determine whether you can stay in flow while the agent works. A tool that keeps interrupting you for redundant approvals or buries its status in verbose noise is a tool that breaks your thinking. The practical takeaway is that both Claude Code and Codex are production-ready, but if you've already invested in Claude-native MCP servers and Skills, the migration calculus is real and not just theoretical.

**Link:** [Claude Code vs Antigravity 2.0 vs Codex: A Real Evaluation](https://metacircuits.substack.com/p/claude-code-vs-antigravity-20-vs)

---

## Last Week in AI: Superchips, Executive Orders, and a Budget Crisis

**TLDR:** NVIDIA and Microsoft announced Windows PCs built specifically to run AI agents locally. The White House pushed agencies to deploy AI cyber defenses within 30 days. Uber burned through its entire 2026 AI tools budget before Q2 was over. And Anthropic reported that Claude now writes more than 80% of their production code.

**Summary:** The NVIDIA and Microsoft RTX Spark announcement is the one I keep thinking about. A 120-billion-parameter model running on a laptop with 128GB unified memory is not a demo. That's a real local inference machine, and it starts shifting the conversation about what it means to run AI agents privately and without cloud latency. The DGX Station for Windows is clearly aimed at developers and enterprises who want the capability without the cloud dependency.

The White House executive order on AI is worth reading past the headline. The 30-day mandate for federal agencies to deploy AI-driven cyber defenses sounds aggressive, and it probably is. But the explicit decision to avoid licensing requirements for AI developers is a meaningful signal. The benchmarking framework for "covered frontier models" is the part I'd watch over the next year because that's where the actual regulatory teeth could eventually appear.

The Uber story is the most honest thing I've read about enterprise AI adoption in months. The company burned through its entire 2026 AI tools budget by April, then had to cap engineers at around $1,500 per month per agentic coding tool. The COO's comment that it's very hard to draw a line between spend and useful features is something most engineering leaders are feeling but not saying out loud. It also tells you something about how fast teams adopt these tools when given real access.

The Anthropic "When AI Builds Itself" piece is a milestone worth noting plainly. More than 80% of Anthropic's production code is now authored by Claude. That's not a projection or a roadmap item. It's the current state of how one of the most significant AI labs builds its software. The policy ask for an optional verifiable multilateral pause on frontier development is a separate thread, but the two together paint a clear picture of where Anthropic thinks things are heading.

**Key takeaways:**
- RTX Spark and DGX Station for Windows bring 120-billion-parameter local inference to standard Windows PCs for the first time, with 128GB unified memory.
- The White House executive order pushes federal AI cyber deployment in 30 days and sets up frontier model benchmarking without adding developer licensing requirements.
- Uber's AI tools budget exhaustion by April reveals how quickly real enterprise adoption can outpace budget assumptions when engineers have access to capable tools.
- Anthropic's own production codebase is now more than 80% Claude-authored, making it one of the clearest public data points on AI-assisted software development at scale.

**Why do I care:** The Uber budget story is a canary. If a company with Uber's engineering budget and operational discipline ran out of AI tools money before summer, every engineering organization needs to rethink how it budgets for agentic tooling. These aren't line items that behave like traditional SaaS seats. Usage scales with how good the tools are, and right now the tools are getting better fast. Planning for AI tooling spend the way you'd plan for GitHub seats is a mistake you'll notice in April.

**Link:** [TheCircuit Newsletter - Last Week in AI](https://metacircuits.substack.com/p/claude-code-vs-antigravity-20-vs)
