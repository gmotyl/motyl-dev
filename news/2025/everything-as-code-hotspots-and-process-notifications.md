---
title: "Everything as Code, Code Hotspots, and Process Notifications"
excerpt: "A look at the benefits of an 'everything as code' approach, how to prioritize tech debt by focusing on code 'hotspots', and a strategy for using notifications to improve team accountability."
publishedAt: "2025-12-22"
slug: "everything-as-code-hotspots-and-process-notifications"
hashtags: "#substack #refactoring #ai #architecture #devops #cicd #automation #techdebt #management #generated #en"
---

## Everything as Code
**TLDR:** With AI being better at writing code than navigating GUIs, the 'everything as code' strategy is more viable than ever. It offers reproducibility, version control, and automation, while AI mitigates the traditional usability challenges.

**Summary:**
The principle of managing infrastructure and configuration through code has been around for a while, but the rise of powerful AI assistants has fundamentally changed the trade-offs. Historically, adopting a configuration-as-code approach meant sacrificing user-friendly graphical interfaces for the power of reproducibility, version control, and automation. This often required teams to learn complex domain-specific languages (DSLs), creating a steep learning curve.

This article argues that AI effectively eliminates this downside. Since models like GPT-4 are incredibly proficient at writing code and configuration files, the need for a human to master the syntax of every tool is greatly reduced. This allows teams to reap the benefits of an 'everything as code' world—where your entire system is self-documenting, versioned in Git, and easily automated—without the traditional friction. For architects, this is a nudge to lean more heavily into code-based configuration for everything from cloud infrastructure to application settings. The author is perhaps overly optimistic about the current state of AI, as it can still produce subtle errors in complex configurations, and it doesn't eliminate the need for a deep understanding of the underlying systems when things go wrong.

**Key takeaways:**
- AI's proficiency at writing code makes the 'everything as code' approach more attractive.
- This strategy provides benefits like reproducibility, version control, and automation.
- AI helps overcome the traditional usability challenges of code-based configuration.
- Teams can now get the upside of this approach with less of the historical pain.

**Link:** [Everything as code, hotspots, and process notifications 💡](https://refactoring.fm/p/everything-as-code-hotspots-and-process?publication_id=64099&post_id=182002377&isFreemail=true&triedRedirect=true)

## Focusing Tech Debt on 'Hotspots'
**TLDR:** Not all bad code is created equal. Tech debt efforts should be laser-focused on 'hotspots'—areas of the codebase that are both poorly written and frequently changed. Intuition is a poor guide for identifying these areas.

**Summary:**
The author makes a crucial point about prioritizing technical debt. It's easy to fall into the trap of wanting to refactor any code that looks messy or outdated. However, the true cost of bad code is realized only when it needs to be modified. If a piece of legacy code is ugly but stable and rarely touched, the return on investment for refactoring it is likely negative.

The concept of 'hotspots,' as defined by Adam Tornhill, provides a powerful mental model for this. Teams should use data and tooling to identify the parts of their codebase that see the most frequent changes and are also of low quality. This data-driven approach is far more effective than relying on developer intuition, which is often biased towards either the most recent pain points or pet projects. The article recounts a story of a failed M&A deal where the acquiring company's due diligence team failed to appreciate this distinction, penalizing the company for messy but inactive code. For engineering leaders, the lesson is to be strategic and data-informed about where you invest your refactoring budget. The author misses an opportunity to discuss the tools that can be used to identify these hotspots, which would have made the advice more actionable.

**Key takeaways:**
- Prioritize tech debt work on code that is both problematic and frequently changed.
- Humans are bad at intuitively judging these 'hotspots'.
- In most codebases, a small fraction of the code (~5%) accounts for the vast majority of changes (~90%).
- A data-driven approach to identifying hotspots is more effective than relying on gut feeling.

**Link:** [Everything as code, hotspots, and process notifications 💡](https://refactoring.fm/p/everything-as-code-hotspots-and-process?publication_id=64099&post_id=182002377&isFreemail=true&triedRedirect=true)

## Tactical Notifications for Process Accountability
**TLDR:** A manager at Duolingo created a system of 'system accountability' by using automated, public notifications that tag two stakeholders at a time, fostering mutual responsibility for moving tasks forward.

**Summary:**
This section details a clever management strategy from Antonia Scheidel at Duolingo for improving team processes without resorting to micromanagement. The core idea is to use automated notifications to create what she calls "system accountability." Instead of the manager personally chasing down updates, an automated system posts a public message in a team channel when a task is ready to move to the next stage, tagging both the person handing off the work and the person receiving it.

This simple act shifts the dynamic. The responsibility is no longer a top-down mandate from the manager but a shared, transparent commitment between peers to keep the process moving. It's like a "classroom pet" that everyone has a shared duty to care for. The system follows a few key principles: always tag two people to create mutual accountability, use public but focused channels, escalate with reminders if needed, and strictly limit the volume of notifications to avoid alert fatigue. For managers, this is a great example of how to build automated, scalable processes that empower the team rather than creating a culture of surveillance. The author doesn't discuss the initial setup cost or the potential for team members to simply ignore the notifications, which is a real risk if the underlying team culture isn't healthy.

**Key takeaways:**
- Use automated, public notifications to create 'system accountability'.
- Tagging two stakeholders at once fosters mutual responsibility.
- This shifts the dynamic from top-down commands to peer-to-peer collaboration.
- Limiting notification volume is critical to prevent alert fatigue.

**Link:** [Everything as code, hotspots, and process notifications 💡](https://refactoring.fm/p/everything-as-code-hotspots-and-process?publication_id=64099&post_id=182002377&isFreemail=true&triedRedirect=true)
