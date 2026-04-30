---
title: "Token Spend Is Breaking Budgets. Now What?"
excerpt: "Companies are watching their AI token costs explode 10-15x in six months, and the industry is splitting into two camps: spend freely and measure later, or clamp down before things get out of hand."
publishedAt: "2026-04-30"
slug: "pragmatic-engineer-20260430b"
hashtags: ["#softwareengineering", "#AI", "#programming", "#developertools"]
---

## TLDR

Token spend at software companies is rising at a pace that's catching leadership off guard. Gergely Orosz talked to developers at 15 businesses of various sizes, and the pattern is consistent: costs are up 10x to 15x in six months, and nobody quite has a handle on where it goes from here. Two camps are forming: those letting developers run wild and measuring impact afterward, and those trying to pull back before finance notices the bill.

## The Numbers Are Real and They're Uncomfortable

One company went from $200 per developer per month to $3,000. Another has engineers burning $500 a day on Claude Code alone. Someone at a seed-stage startup hit $10K in a single week from a misconfigured caching setup. These aren't outliers being gossiped about at conferences. These are people talking to a reporter, anonymized, describing their actual April.

The thing that gets me is how predictable the pattern is. You roll out AI tools, devs love them, usage compounds, and then someone in finance pulls up the monthly cloud bill and there's a very awkward meeting. What's less predictable is how different the responses are. Some CTOs look at $2K per engineer per month and shrug: that's $24K per year, and engineers cost $300K all-in anyway. Others are scrambling to block Opus access in Cursor before the next billing cycle.

Both reactions are rational. The problem is that almost nobody actually knows yet whether the productivity gains justify the spend, because measuring developer productivity is notoriously hard and most companies haven't set up the right instrumentation before the costs started piling up.

**Link:** [The Pulse: token spend breaks budgets – what next?](https://newsletter.pragmaticengineer.com/p/the-pulse-token-spend-breaks-budgets?publication_id=458709&post_id=196007666&isFreemail=true&triedRedirect=true)

## The "Tokenmaxxing" Problem Nobody Wanted

There's a dynamic described in the issue that I find genuinely troubling: internal leaderboards ranking developers by token usage, with performance reviews including an AI adoption score. When you attach career advancement to a consumption metric, you get exactly what you'd expect. Devs run agents not to ship better software, but to look like they're running agents.

One engineer put it directly: leadership added an AI section to performance reviews, so everyone uses it as much as they can. That's not a productivity story. That's Goodhart's Law playing out in real time. The measure becomes the target, and the actual goal drifts.

There's a difference between a team that ships 10x more because AI helps them move fast, and a team that generates 10x more tokens because their manager checks the dashboard. The companies that figure out how to distinguish between those two things will be in much better shape than the ones that just keep watching the usage meter go up and calling it a win.

## Two Strategies, Both with Obvious Risks

The piece lands on a clean binary. Strategy one: let it rip, start measuring. Strategy two: curb spending now, optimize for cost. Most companies that are actually seeing impact have gone with option one, but they've added the "start measuring" part belatedly, which is the uncomfortable part of that sentence.

The curb-spending camp isn't wrong to worry. One company found that switching the default model dropped costs by 30% with no obvious change in output quality. That's real money, and for a company with 200 engineers, that's not nothing. The counterargument, which I think holds more weight right now, is that you don't want to optimize a thing you don't yet understand. If you put spending caps on AI tools before you've seen what developers can actually do with them unconstrained, you might be killing the compounding effect before it gets interesting.

What strikes me about the smarter-sounding respondents is that they're not choosing between these strategies permanently. They're sequencing. Spend now, measure seriously, then optimize. The companies that jump straight to model restrictions and spending caps without data are guessing. The companies spending freely with zero measurement are also guessing, just in a more expensive direction.

## Model Selection Is Still Being Done Badly

Multiple sources flagged the same thing: developers are defaulting to the most expensive models for tasks that don't need them. One company's estimate was that Opus gives single-digit percentage gains over Sonnet in practice, but exhausts token budgets almost immediately. Another found that their engineers had switched to a high-effort Claude mode for routine PRs, tripling the cost per review.

This is a tooling and defaults problem as much as a behavior problem. If the UI defaults to Opus, and the setting doesn't persist between sessions, and there's no friction in the workflow that makes you think twice, you're going to get Opus usage by default. One company handles this well: they set cheaper models as defaults, actively guide devs on model selection, and treat open-source model experiments as a bottom-up option rather than a mandate.

The discount situation is also worth noting. Cursor will negotiate after $1M in spend. Anthropic, based on the accounts here, doesn't seem to offer discounts even at $5M+ per year, which is a bold position to hold while positioning yourself as the provider of choice for enterprise AI development. That could change, but right now the leverage is pretty clearly on Anthropic's side.

## Key Takeaways

- Token costs are rising 10-15x in six months across companies of all sizes, and the pace isn't slowing
- Two responses are emerging: uncapped spending with retroactive measurement, or proactive cost controls. Most companies with positive results are doing the former, but adding measurement infrastructure now
- Performance review metrics tied to AI usage create perverse incentives. Be careful what you measure
- Default model selection matters more than most companies realize. Defaulting to expensive models for routine tasks is a significant and fixable cost driver
- Cursor will negotiate discounts above $1M in spend. Anthropic doesn't appear to, at least not yet
- The companies that seem most grounded are treating token spend like any other infrastructure cost: not panicking, not ignoring it, but tying spend decisions to measurable outcomes
