---
title: "OpenTelemetry's One-Tip Success Rule and GitHub's AI Training Controversy"
excerpt: "HackerNoon covers a pragmatic minimum-change approach to OpenTelemetry adoption and GitHub's controversial move to train AI on private repository code."
publishedAt: "2026-04-04"
slug: "opentelemetry-success-tip-github-ai-training-controversy"
hashtags: "#hackernoon #opentelemetry #observability #java #ai #github #security #generated #en"
source_pattern: "HackerNoon"
---

## Want to Have Successful OpenTelemetry Projects? Implement This One Tip

**TLDR:** Nicolas Fränkel argues that the primary reason OpenTelemetry projects fail is trying to change too much at once. His core tip: minimize the number of changes in any single step, using a real-world Java and JMX use case to demonstrate the principle.

**Summary:** OpenTelemetry has become the dominant standard for distributed tracing and observability, but adoption is notoriously uneven. Projects get kicked off with enthusiasm and stall out halfway through because the instrumentation effort turns out to be far more disruptive than anyone estimated. Nicolas Fränkel, a developer advocate with a long track record in Java and distributed systems, has a simple diagnosis: teams take on too much scope at once.

His one tip is deceptively straightforward — minimize changes. The fewer things you change in a single step, the higher your probability of success. This isn't a philosophical observation, it's a practical constraint that shapes how you break down an observability migration. Fränkel uses a Java application leveraging JMX, or Java Management Extensions, as his worked example. JMX beans are the traditional monitoring interface for Java applications, and bridging them to OpenTelemetry metrics is a common migration challenge. The OpenTelemetry Collector's JMX receiver allows you to pull JMX metrics into the telemetry pipeline without modifying your application code — a clean example of his principle in action. You change the infrastructure layer, leave the application layer alone, and validate each step before moving on.

The broader insight is one that experienced platform engineers already know intuitively but rarely state explicitly: observability migrations fail the same way most large refactoring efforts fail — by trying to boil the ocean. The discipline of incremental change isn't just about reducing risk; it's about creating checkpoints where you can validate that the system is still behaving correctly before the next increment. When something breaks, you know exactly which change caused it.

What Fränkel is really advocating for is treating an observability rollout the same way you'd treat a database migration or a major dependency upgrade: break it into the smallest possible atomic steps, ship each one, verify, repeat. The tooling in the OpenTelemetry ecosystem — particularly the Collector and its receiver plugins — is well-suited to this approach, precisely because it acts as an intermediary layer that can translate between legacy monitoring formats and modern telemetry standards without requiring application-level changes.

**Key takeaways:**
- The most common reason OpenTelemetry projects fail is scope — trying to instrument everything at once instead of incrementally
- The OpenTelemetry Collector's JMX receiver allows Java applications to emit metrics without modifying application code, enabling zero-touch migration for a critical step
- Treat each instrumentation change as a deployable increment with validation between steps

**Why do I care:** This is the kind of practical advice that gets lost in the documentation. The OpenTelemetry ecosystem has a lot of depth, and it's easy to look at the architecture diagrams and think you need to rewire everything simultaneously. The minimum-change principle is genuinely useful guidance for teams trying to introduce observability into production systems that can't afford extended instability. If you're planning an OpenTelemetry migration, this framing alone could save you significant debugging time.

**Link:** [Want to Have Successful OpenTelemetry Projects? Implement This One Tip](https://hackernoon.com/want-to-have-successful-opentelemetry-projects-implement-this-one-tip)

---

## GitHub Wants Your Private Code to Train AI. What's Your Move?

**TLDR:** GitHub announced it will use Copilot interaction data — including code from private repositories — to train AI models by default starting April 24th. The same week, Copilot was caught injecting advertisements into over 1.5 million pull requests.

**Summary:** It's a rough week to be a GitHub Copilot enthusiast. Two separate developments landed back to back, and together they paint a picture of a platform that is increasingly treating its developer user base as a resource to be extracted rather than a community to be served.

The first development is the announcement that GitHub will use Copilot interaction data — which includes code from your private repositories — to train AI models, and this will be enabled by default starting April 24th. The opt-out exists, but the decision to default-enable data collection from private code is a significant trust boundary to cross. Private repositories contain proprietary algorithms, unreleased product code, internal tooling, compliance-sensitive systems, and in many cases code subject to NDAs or other contractual obligations. The assumption that developers consented to this use when they signed up for Copilot is a stretch, and the developer community's reaction on Hacker News and elsewhere has been blunt.

The second development compounds the first. Copilot was caught injecting advertisements into over 1.5 million pull requests. This is a qualitatively different violation — it's not about data collection policy, it's about the tool actively manipulating the developer workflow to insert marketing content. Pull requests are a collaborative communication space; introducing ad content there is the kind of behavior that would get a third-party tool immediately pulled from consideration at most organizations.

The combination of these two events in the same week has given rise to what developers are calling "peak enshittification" — a reference to Cory Doctorow's framework for how platforms degrade over time as they shift value extraction from users toward shareholders. GitHub's market position as the default home for both open-source and enterprise code gives it enormous leverage, but leverage exercised this way tends to accelerate the search for alternatives.

The opt-out clock is ticking. If you or your organization use GitHub Copilot and have not reviewed your data-sharing settings, April 24th is the deadline.

**Key takeaways:**
- GitHub's default opt-in for private code AI training takes effect April 24th — audit your Copilot settings before then
- Copilot ad injection into pull requests represents a direct manipulation of the developer workflow, distinct from the data collection issue
- The combination of both events in the same week is likely to accelerate enterprise evaluation of alternative platforms and coding assistants

**Why do I care:** This is primarily a trust and governance story, but it has direct implications for anyone on a team that uses Copilot. Two things to do now: check your organization's Copilot data-sharing settings and opt out if private code training isn't acceptable, and flag the pull request ad injection to your security and tooling review process. From a longer-term architecture standpoint, the trend toward platforms extracting value from the developer workflow is worth tracking — the tooling choices you make now are harder to unwind once workflows and muscle memory have formed around them.

**Link:** [GitHub Wants Your Private Code to Train AI. What's Your Move?](https://hackernoon.com/polls/github-wants-your-private-code-to-train-ai.-whats-your-move)
