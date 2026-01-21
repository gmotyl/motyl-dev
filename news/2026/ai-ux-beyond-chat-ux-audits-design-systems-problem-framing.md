---
title: "AI UX Beyond Chat, UX Audits, Design Systems, and Problem Framing"
excerpt: "A deep dive into intent-driven AI interfaces, comprehensive UX audit practices, building design systems for engineers, and the lost art of problem framing in product teams."
publishedAt: "2026-01-21"
slug: "ai-ux-beyond-chat-ux-audits-design-systems-problem-framing"
hashtags: "#unicornclub #ux #ai #design-systems #frontend #architecture #product #teams #generated #en"
---

## Beyond Chat: 8 Core User Intents Driving AI Interaction

**TLDR:** The chat box is becoming AI's single biggest UX limitation. A comprehensive framework identifies eight distinct user intents — Know, Create, Delegate, Oversee, Monitor, Find, Play, and Connect — each demanding different interfaces, workflows, and success metrics instead of one-size-fits-all conversational UI.

The article by Taras Bakusevych argues that the industry has become overly dependent on chat interfaces for AI products, when in reality, professional workflows demand purpose-built experiences tailored to what users actually want to accomplish. This is a significant blindspot in current product thinking.

The framework breaks down into eight fundamental modes. "Know/Learn" is about reducing uncertainty — users want sense-making, not essays. Success here means comprehension speed with verifiable sources. "Create" focuses on generating or transforming artifacts while maintaining authorship control — the key insight being that iteration, not one-shot perfection, should drive the design. "Delegate" handles multi-step workflow automation where transparency and safety become paramount. "Oversee" provides human intervention points for high-stakes decisions where AI confidence is low.

The remaining modes cover "Monitor" for continuous awareness without notification fatigue, "Find/Explore" for navigating multi-dimensional option spaces, "Play" for entertainment and immersion, and "Connect" for emotional presence and companionship. Each mode implies different metrics — from "time to verified insight" for learning, to "session length" for play, to "relational trust" for connection.

What makes this framework particularly valuable for architects is the concept of meta-intent axes: personalization, initiative, autonomy, tone, transparency, and risk appetite. These become configuration parameters that tune AI behavior across any of the eight modes. A medical documentation system might dial up transparency and down risk appetite, while a creative writing tool might invert those settings.

The critique here is warranted but incomplete. While the framework elegantly categorizes user intent, it sidesteps the messier reality of intent-switching within single sessions. Users often flow from "Know" to "Create" to "Delegate" in rapid succession, and designing for that fluidity remains an unsolved challenge.

**Key takeaways:**
- Chat is a starting point, not an endpoint for AI interfaces
- Each user intent demands distinct UI patterns, success metrics, and workflow designs
- Meta-intent axes (personalization, autonomy, transparency, etc.) should be tunable system parameters
- The framework helps product teams move from "where can we add AI" to "what intent are we serving"

**Tradeoffs:**
- Purpose-built interfaces increase development complexity but improve task completion rates
- High AI autonomy speeds workflows but sacrifices user control and auditability
- Proactive AI initiative reduces friction but risks notification fatigue

**Link:** [Beyond chat: 8 core user intents driving AI interaction](https://uxdesign.cc/beyond-chat-8-core-user-intents-driving-ai-interaction-4f573685938a)

---

## Everything I Know About Running UX Audits

**TLDR:** UX audits are not design critiques or lists of personal opinions — they're methodological research approaches combining heuristic evaluation, behavioral analytics, and user data. The article distills two years of auditing global brands into a practical, context-aware framework.

Ricardo Dias shares an extensive guide covering when to apply audits, how to communicate with stakeholders, the tools of the trade, and common pitfalls to avoid. The core insight is that understanding context shapes everything — an audit triggered by dropping KPIs differs fundamentally from one preparing for A/B testing or a full redesign.

The article categorizes six common audit scenarios, each requiring different approaches. "Our KPIs are dropping" calls for targeted investigation and cross-validation of data sources. "User complaints increasing" starts from qualitative signals and uses session replays to validate hypotheses. "We want to redesign" allows comprehensive evaluation with visual recommendations. "We want to do A/B testing" focuses on measurable hypotheses and quick wins. "We simply want to optimize" is paradoxically the hardest because you don't know what you're looking for.

The data sources hierarchy is particularly useful: heatmaps and interaction maps for granular page-level behavior, session replays for understanding "why" behind the numbers, journey analysis for spotting funnel friction, longitudinal analytics for trends over time, and voice-of-user data (surveys, reviews, complaints) for sentiment and motivation. The author emphasizes that combining these sources — not relying on any single one — produces the most defensible findings.

For architects and team leads, the process breakdown is instructive: start with website-wide behavioral analytics to establish baseline, then drill into page and section specifics, then layer on heuristic evaluation and competitive benchmarking, and finally translate findings into numbered, prioritized observations with clear recommendations. The "after the audit" work is equally important — creating action plans, designing executive summaries, and following up to ensure recommendations don't die in someone's inbox.

The honest admission about AI is refreshing: it's neither enemy nor savior. AI excels at processing large data volumes, categorizing comments, and refining wording, but cannot think strategically, understand nuance, or take responsibility for recommendations.

**Key takeaways:**
- Context determines audit approach — understand why you're auditing before how
- Combine quantitative analytics with qualitative data for defensible findings
- Structure observations as: problem → insight → recommendation with clear prioritization
- Keep stakeholder communication continuous, not just at delivery
- AI assists efficiency but cannot replace strategic judgment

**Tradeoffs:**
- Comprehensive audits provide deeper insights but require significantly more time and resources
- Tool-agnostic skills transfer across projects but require learning new tools for each client
- Including every observation demonstrates thoroughness but overwhelms stakeholders and dilutes impact

**Link:** [Everything I know about running UX Audits](https://uxplanet.org/everything-i-know-about-running-ux-audits-86fd317b85fb)

---

## Design Systems for Software Engineers

**TLDR:** Building a design system library is significantly more complex than most teams anticipate — even a simple button requires dozens of decisions about colors, states, accessibility, and localization. The payoff is faster delivery, higher quality, and enabling full-stack engineers to contribute to frontend work without CSS expertise.

Michael Abernethy from Rubrik shares the journey from a "college project" looking UI to an award-winning interface through their Aura Design System. The catalyst was refreshingly honest: the CTO remarked that the product looked amateur during a team meeting. That single observation launched a systematic UI overhaul.

The article walks through the surprising depth of decisions required for even basic components. A button alone requires calls on background color, text color, height, border radius, shadows, font — and that's before addressing hover states, disabled states, loading animations, mobile adaptations, accessibility requirements, and localization for right-to-left languages. Multiply this across 50-100 components in a complex design system, and the scope becomes apparent.

The workflow at Rubrik involves three key roles: UX researchers gather requirements and create rough sketches, designers convert these into Figma designs considering all states and variations, and design system engineers then translate Figma into production code while catching implementation constraints, scalability issues, and edge cases. The back-and-forth between designers and engineers to iron out details is where much of the value is created.

The technical deep-dive covers areas often overlooked: analytics integration (Rubrik added tracking code to components themselves, achieving 4x more events without developers adding any code), async React patterns for snappier interfaces, and loading states for server components. The testing strategy — unit tests (now heavily AI-assisted), Storybook for visual documentation, and Chromatic for visual regression testing — has prevented 100+ bugs from shipping.

On AI, the assessment is clear-eyed: it cannot create a complete design system from a prompt today, but it excels at writing unit tests with high coverage and hitting edge cases. AI-generated tests have become a significant productivity multiplier for the team.

**Key takeaways:**
- Design systems are brand identity translated into reusable code components
- Even simple components require extensive decision-making on states, accessibility, and localization
- The collaboration between UX researchers, designers, and engineers is where quality emerges
- Analytics and loading states should be built into components, not added by consuming teams
- Visual regression testing (Chromatic) catches bugs that manual review misses

**Tradeoffs:**
- Custom design systems provide perfect brand fit but require substantial upfront investment
- Embedding analytics in components increases observability but couples tracking to UI library
- Pre-built systems like Material UI accelerate startups but limit differentiation

**Link:** [Design Systems for Software Engineers](https://newsletter.pragmaticengineer.com/p/design-systems-for-software-engineers)

---

## Your Problem Framing is Sabotaging Your Strategy

**TLDR:** The industry has atrophied its problem design skills by rushing to "build, measure, learn" without first thinking about what customer problems actually need solving. LLMs can't help here — shared understanding emerges from collaborative problem framing, not from generating outputs.

Pavel's first-anniversary piece tackles why so much product work feels hollow despite sophisticated strategy discussions and taste debates. The root cause: teams frame problems around technologies ("put AI in it") rather than customer needs ("I want to buy my juice"). The resulting feedback loop optimizes for usage metrics rather than value delivery.

The observation about user fatigue is pointed: people aren't just tired from their lives, they're tired of products designed to extract optimal pain, of deliberately poor experiences, of pages claiming one thing while designed to make the opposite happen. This is the backdrop against which all strategy and taste discussions occur.

The proposed test is simple: can you articulate your solution without referencing specific technology? Can you describe expected behavior change from your intervention? If answers amount to "users will click our widget," you've failed to frame the problem correctly.

The article advocates "sell to learn" over "build to learn" — finding problems painful enough that customers don't care which widgets you use to solve them. But critically, this learning gets thrown away the moment it's packaged into Jira tickets with acceptance criteria like "as a user I want to click the button to go to the next page."

The key insight for teams: as soon as anyone responsible for solving a problem lacks holistic understanding of that problem, you're building toward products users hate. Contractual, mercenary checklists produce contractual, mercenary experiences. Problem framing done separately doesn't work — the shared mental model emerges from doing the work together.

This has implications for AI's role in product work. LLMs cannot do collaborative problem framing because the value is in the doing, not the artifact. Tools can help create shared understanding, but they cannot replace the process and culture that makes it happen.

**Key takeaways:**
- Problem design skills have atrophied as teams optimize for technology deployment over customer value
- Test problem framing by articulating solutions without technology references
- "Sell to learn" reveals problems worth solving; "build to learn" optimizes for wrong metrics
- Shared problem understanding must include everyone responsible for the solution
- LLMs cannot replace collaborative problem framing — the doing creates the understanding

**Tradeoffs:**
- Deep problem framing takes time upfront but prevents wasted implementation effort
- Involving everyone in problem definition slows initial velocity but improves solution quality
- Usage metrics are easy to measure but often proxy for value extraction rather than delivery

**Link:** [Your problem framing is sabotaging your strategy](https://productpicnic.beehiiv.com/p/your-problem-framing-is-sabotaging-your-strategy)

---

## Workshopping Ideas for Our Future in Quality Engineering

**TLDR:** Quality Engineers are strategic contributors who lead teams toward better software, not just testers with expanded scope. Skills required include leading continuous improvement, next-level communication across organizations, and balancing business with user needs — all while maintaining technical awareness.

Lisa Crispin and Jen Cook share outcomes from their Agile Testing Days workshop on the evolution from testing roles to Quality Engineering. The groups brainstormed skills, learning paths, and organizational transformation strategies, producing a wealth of practical insights.

The leadership skills identified are substantial: empowering teams, fostering quality culture, promoting continuous improvement, explaining time requirements to stakeholders, shielding teams from impossible goals, managing sustainable pace, and maintaining empathy to see problems from multiple perspectives. QEs need to design experiments, form hypotheses, measure progress — but also "just do stuff and try things."

Communication gets elevated to "next-level" status for QEs. They facilitate communication across roles throughout organizations, not just within delivery teams. Building common domain-specific language, maintaining documentation accessible to all, and having courage to ask uncomfortable questions become core competencies. Good listening skills — not just question-asking — are essential.

The technical awareness section is balanced: understanding system architecture, tools, deployment pipelines, and test automation frameworks is valuable, but "knowing enough to collaborate with coders is key" rather than requiring deep coding expertise. The hybrid skillset — technical enough to understand constraints, communicative enough to bridge gaps — defines the role.

For organizations considering this transition, the workshop participants suggested: establish quick feedback loops, promote visibility and transparency, lead by example, facilitate risk assessment workshops, focus on end goals over quality gates, and practice value stream management. The underlying theme is that QE provides testing professionals a leadership role with more visibility and equal footing with other roles.

**Key takeaways:**
- QEs lead quality transformations, not just execute testing tasks
- Communication skills must span organizations, not just delivery teams
- Technical awareness matters but collaboration skills matter more
- Learning paths include mentoring, communities of practice, and cross-functional team activities
- The role provides a leadership career path for testing professionals

**Link:** [Workshopping ideas for our future in Quality Engineering](https://lisacrispin.com/2026/01/18/becoming-a-qe/)

---

## TBM 401: Solving Problems the Hard Way

**TLDR:** The most formative team experiences come from leaders who shape clear workstreams, assign real ownership, and relentlessly build good habits and tempo. The "lanes" approach — small sets of strategic focus areas with regular cadence — sounds simple but requires sustained effort to avoid drift into performative process.

John Cutler reflects on a career-defining experience working for a leader who invested in shaping how the team worked, not just what they built. The results were exceptional, and former team members still reference it years later as possibly their best professional experience.

The "lanes" framework is deceptively simple: 3-5 relatively independent focus areas, not too vague but not too specific, each with real owners (one to three people), short intent statements (direction, not tasks), and just enough information to reason well. Teams copy forward last week's lanes weekly, adding current work and carrying over what matters. It's intentionally manual because the migration forces attention on drift.

What made it work: the leader's behind-the-scenes advocacy defending the approach when results weren't immediate, patience in modeling good habits and coaching back on track when things diverged, and critically, letting team members be heroes in their own stories rather than pulling all the air out of the room.

The honest additions from former colleagues add texture. One noted that even this leader slipped when influence waned and personal circumstances changed. Another observed that as seniority increases, lanes get broader and distance from actual work grows — skills partially translate but it becomes about leading people who lead people who lead lanes.

The philosophical note at the end resonates: you can shape "right" lanes that are durable yet strategic, but surrender to the reality that working lanes eventually change and go away. The opportunity to get in the zone with a great team isn't guaranteed — when you have it, seize it.

**Key takeaways:**
- Lanes need to be stable enough for groove but flexible enough to evolve
- Weekly cadence with manual copy-forward forces attention on drift
- Real ownership means one to three people who genuinely co-own, not ceremonial representation
- Leaders must do hard work behind scenes while letting teams be heroes
- Frameworks pretend things are more stable than reality; actual practice is messier

**Tradeoffs:**
- Manual processes force attention but don't scale
- Stable lanes enable momentum but risk becoming rigid when reality shifts
- Clear ownership improves accountability but can create bottlenecks

**Link:** [TBM 401: Solving Problems the Hard Way](https://cutlefish.substack.com/p/tbm-401-solving-problems-the-hard)

---

*This article was compiled from the Unicorn Club newsletter. The opinions and summaries presented are interpretations of the original sources — always read the linked articles for complete context.*