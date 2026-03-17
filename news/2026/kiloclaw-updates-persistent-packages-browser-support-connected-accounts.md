---
title: "KiloClaw Updates: Persistent Packages, Browser Support, and Connected Accounts"
excerpt: "KiloClaw shipped a wave of March updates focused on making AI agent environments more durable — persistent installs, built-in browser automation, connected Google and GitHub accounts, and better defaults out of the box."
publishedAt: "2026-03-16"
slug: "kiloclaw-updates-persistent-packages-browser-support-connected-accounts"
hashtags: ["#substack", "#ai", "#devtools", "#automation", "#generated", "#en"]
---

## KiloClaw Updates: Persistent Packages, Browser Support, and Connected Accounts

**TLDR:** KiloClaw's first two weeks of March landed persistent package installs, headless Chromium out of the box, direct Google and GitHub account integrations, and a "full" tool profile as the new default — all aimed at cutting setup friction and making agent environments actually survive restarts.

**Summary:**

There's a pattern in developer tooling where every new version promises "less friction" and then quietly introduces a new form of it somewhere else. KiloClaw's March batch of updates is notably honest about what it's fixing: things that were broken by design, now unbroken. The biggest one is package persistence. Previously, any pip install or npm install -g would evaporate the moment your instance restarted. That's the kind of thing that seems like a minor annoyance until you've lost a working setup for the third time in a week. Starting March 10, installs now go to durable volumes that survive restarts — /root/.pip-global, /root/.uv, and /root/.npm-global. It's not glamorous, but it's the sort of fix that makes the whole platform feel trustworthy rather than experimental.

The connected accounts story is more interesting from an architecture standpoint. Linking a Google account gives the agent access to Gmail, Calendar, and Docs in a persistent way across sessions. GitHub integration goes further — you're attaching a real machine user identity, so the agent can clone repos, push commits, and open PRs without you having to pass tokens manually each time. That shift from stateless credential injection to persistent identity is worth paying attention to. It changes what kinds of workflows are practical to automate, and it changes the trust model of what your agent can do on your behalf when you're not watching.

Adding headless Chromium to the default image is a quiet but meaningful move. Browser automation has historically been one of those things that requires a non-trivial amount of environment setup before you can even test whether your code works. Baking it in — along with CDP automation support — turns it from a thing you have to configure into a thing you can just use. The "full" tool profile becoming the default follows the same logic: exec, filesystem access, web search, and messaging shouldn't require opting in if they're what most agents actually need.

The version pinning feature rounds out the picture. Being able to lock your instance to a specific OpenClaw version is the kind of control that matters when you're running agents in any kind of production-adjacent capacity. Surprise updates breaking a working setup is a real concern, and pinning is a straightforward answer to it. The model picker fixes — supporting all models and showing them correctly after a redeploy — are smaller quality-of-life wins that nonetheless affect day-to-day usability in a meaningful way.

What's notably absent from this changelog is any mention of how these changes interact with multi-agent or collaborative setups. Persistent identity and durable packages sound great in a single-agent context, but the interesting (and harder) questions are about what happens when multiple agents share an environment or compete for the same persisted resources. That's probably a future update, but it's worth keeping in mind as the platform matures.

**Key takeaways:**

- Package installs via pip, uv, and npm global now persist across instance restarts via durable volume mounts — applies to new instances only
- Google and GitHub accounts can be connected once in Settings and used across all sessions
- Headless Chromium is now pre-installed, enabling web browsing, screenshots, and CDP automation without setup
- The "full" tool profile (exec, filesystem, web search, messaging) is now the default for new deploys
- OpenClaw version pinning is available from Settings, giving stability for production-adjacent workflows
- Go 1.26 and a set of CLI utilities ship in the default image

**Why do I care:**

For anyone building or evaluating AI-assisted development workflows, the shift from ephemeral to durable agent environments is a meaningful architectural milestone. Persistent packages and persistent identity aren't just conveniences — they're the infrastructure that makes agents viable for anything beyond throwaway demos. The browser-in-the-box addition is particularly relevant for frontend automation and testing scenarios where you previously had to bring your own Playwright or Puppeteer setup. None of this is revolutionary, but the cumulative effect of reducing setup overhead is that you spend more time on the actual problem and less time fighting the environment.

**Link:** [KiloClaw Updates: Persistent Packages, Browser Support, and Connected Accounts](https://blog.kilo.ai/p/kiloclaw-updates-persistent-packages?publication_id=4363009&post_id=191132707&isFreemail=true&triedRedirect=true)
