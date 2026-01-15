---
title: "The Mechanics of Enshittification: Why Metrics-Driven Development Fails Users"
excerpt: "Kent Beck explains how individual metric optimization creates products that slowly turn hostile to users—one 'engagement optimization' at a time."
publishedAt: "2026-01-15"
slug: "mechanics-of-enshittification-metrics-driven-development"
hashtags: "#substack #product #ux #management #engineering #generated #en"
---

## My Fitbit Buzzed and I Understood Enshittification

**TLDR:** Enshittification isn't companies deciding to make products worse—it's the cumulative result of individuals optimizing for metrics to keep their jobs. Each step is locally rational, but the system produces progressively hostile user experiences.

Kent Beck's observation about his Fitbit notification cuts to something fundamental about modern product development. A device meant to help him exercise instead interrupts him to announce he's exercising. It's absurd on its face, yet perfectly logical within the incentive structure that created it.

The mechanism he identifies deserves careful attention from anyone building products. A product owner has a feature: "Automatic Exercise Detection." Reasonable feature. But how do you prove it works? How do you keep your job? You need metrics. So you add a notification. Now you can measure engagement. Users respond. Numbers go up. Feature succeeds. Job secured.

Then users get annoyed. You add a setting to disable it, but default it to "on" because that preserves your numbers. Most users won't find the buried setting. They'll just tolerate the friction. The product owner isn't evil—they're playing the only game available to them. The company's incentive structure rewards exactly this behavior.

This cascade is devastatingly consistent across the industry. Individual contributors need to demonstrate value. Value requires metrics. Metrics create incentives. Incentives shape behavior. Behavior optimizes for the metric, not the user. Each step is locally rational. Each person is doing their job. The cumulative result is products that progressively turn against their users.

The call button example is painfully relatable. In messaging apps, the call button sits conveniently where your thumb might accidentally tap it. Why? Because someone's job depends on "calls initiated" going up. A harder-to-find button means lower numbers. Lower numbers means maybe losing your job. So the button stays prominent. Users keep accidentally calling people at 2 AM.

Some suggest adding more metrics to counteract gaming—track "calls immediately hung up" and subtract from "calls initiated." But you'll never win this race. People will be extremely clever about gaming whatever measurement system you create. Add complexity, and eventually nobody understands what "good" even means anymore.

The antidote Beck proposes is principles, not metrics. "Don't interrupt the user unless they explicitly asked you to." "Don't put buttons where they'll be accidentally pressed." These can't be dashboarded. You can't A/B test them—well, you can, but you'll lose to the variant that violates them, because that variant's numbers will be better.

Principles require someone to say "We just don't do this, and I don't have to give you a reason" and then defend that line against metrics-driven arguments. This feels arbitrary. It feels like leaving value on the table. But the alternative is products that slowly, inexorably, turn against their users.

For architects and team leads, this frames a critical organizational challenge. How do you create structures where people can succeed without gaming metrics? How do you measure what matters without the measurement itself becoming the goal? The answer might be accepting that some things shouldn't be measured—trusting human judgment about what's right even when you can't prove it in a dashboard.

**Key takeaways:**
- Enshittification results from locally rational metric optimization, not malicious intent
- Each individual is doing their job; the system produces hostile outcomes
- Adding more metrics to counteract gaming creates complexity without solving the problem
- Principles require defending unmeasurable values against metrics-driven arguments

**Tradeoffs:**
- Principle-based development preserves user trust but sacrifices measurable "engagement"
- Metrics provide legibility and accountability but incentivize gaming over genuine improvement

**Link:** [My Fitbit Buzzed and I Understood Enshittification](https://tidyfirst.substack.com/p/my-fitbit-buzzed-and-i-understood)