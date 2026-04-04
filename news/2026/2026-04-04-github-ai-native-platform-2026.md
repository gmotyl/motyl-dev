---
title: "Does GitHub Still Deserve Its Throne in the Age of AI Agents?"
excerpt: "GitHub's reliability has cratered to one-nine uptime while AI-generated code floods the platform. A new startup called Pierre is filling the gap, and some influential voices are calling for dramatic change at Microsoft's favorite developer toy."
publishedAt: "2026-04-04"
slug: "github-ai-native-platform-2026"
hashtags: "#github #devtools #ai #copilot #pragmaticengineer #substack #generated #en"
source_pattern: "Substac"
---

## Does GitHub Still Deserve Its Throne in the Age of AI Agents?

**TLDR:** GitHub has dropped to one-nine reliability in recent months as AI agent traffic explodes, a startup called Pierre is handling 15,000 new repos per minute where GitHub can barely stay up, and there's a real question whether GitHub's current leadership structure can course-correct before developers start leaving.

**Summary:** Let's talk about GitHub, because the numbers are genuinely alarming. Third-party monitoring, built after GitHub quietly stopped updating its own status page, shows the platform experiencing issues on roughly three days out of every thirty, with degradations averaging two and a half hours per day. That's one-nine availability. For a platform hosting the world's code, that is not a quirk, it is a crisis.

The root cause is load. Claude Code's contribution volume on GitHub has grown sixfold in three months. GitHub's infrastructure was not built for autonomous agents committing code around the clock, and the strain is showing in very specific ways. The February ninth incident was a database cluster getting saturated faster than anyone expected. The March fifth incident was eerily similar: a Redis cluster failing after a failover triggered a configuration problem that blocked writes entirely. GitHub's CTO Vladimir Fedorov published postmortems, and to their credit, they shared real details. But Lori Hochstein's analysis lands on something I keep thinking about too: failovers are not as smooth as they should be, and the telemetry gaps mean problems compound rather than resolve cleanly.

Into this gap steps Pierre Computer, founded by Jacob Thornton, who you might know as the creator of Bootstrap. Pierre's product, Code.storage, claims to have sustained over 15,000 new repo creations per minute for three hours straight, and reports nine million repos created in a single month. Those are self-reported numbers from a closed beta, so take them with some skepticism, but even directionally, they describe a category of infrastructure that GitHub simply does not offer today.

Mitchell Hashimoto, the founder of Ghostty and a frustrated GitHub power user, published a sharp take on what he would do if he ran GitHub. His prescription includes shutting down Copilot entirely to refocus the company, acquiring Pierre, and rebuilding around a North Star of being critical infrastructure for agentic code lifecycles. The framing that resonated with me is this: agentic interactions should critically rely on GitHub APIs, not as a bolt-on through GitHub Actions, but as real platform primitives. Agent mailboxes, agentic code review, first-class primitives, not integrations.

The structural problem Hashimoto and others are circling is that GitHub no longer has a CEO. Thomas Dohmke stepped down voluntarily, Microsoft never replaced the role, and GitHub was folded into Microsoft's AI group. Without a CEO and with Copilot entangled in Microsoft's broader Copilot branding sprawl across every product line, GitHub teams are effectively optimizing for Copilot revenue because that is the safest path inside the org. Meanwhile, Cursor has grown faster, Claude Code is eating market share, and GitHub's platform has no coherent story for how it evolves to serve a world where agents are the primary producers of code.

**Key takeaways:**
- GitHub's availability has degraded to roughly one-nine (90% uptime) over the past month, driven by AI agent load
- Three major incidents in early 2026 all involved saturation or failover failures, suggesting infrastructure is under sustained strain
- Pierre Computer claims to handle 15,000+ new repos per minute, a category GitHub cannot currently compete in
- GitHub has no CEO since Thomas Dohmke's departure; the company was folded into Microsoft's AI group
- Copilot, once the dominant AI coding tool, is now behind Claude Code and catching up to Cursor
- Mitchell Hashimoto's prescription: fire everyone on Copilot, acquire Pierre, establish agentic infrastructure as the North Star
- Stacked diffs, a feature GitHub started in October 2025, may already be irrelevant before it ships given how agents work

**Why do I care:** I have been saying for a while that the real moat in developer tooling is not the AI model, it is the platform. GitHub owned that moat so completely that no one bothered to challenge it for a decade. Now, because of a leadership vacuum and Microsoft internal politics, they are fumbling the single most important infrastructure transition in software development since the move to cloud. If GitHub cannot reliably host agent-generated code, the whole ecosystem has to find alternatives, and that is a genuinely destabilizing moment. Architects need to be thinking right now about what their agentic CI/CD pipelines depend on, and whether GitHub being down 10% of the time is acceptable. Spoiler: it is not.

**Link:** [Does GitHub still merit "top git platform for AI-native development" status?](https://newsletter.pragmaticengineer.com/p/does-github-still-merit-top-git-platform)
