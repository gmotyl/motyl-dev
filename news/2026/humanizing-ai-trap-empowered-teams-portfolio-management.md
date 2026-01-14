---
title: "Stop Humanizing AI, Why Teams Aren't Really Empowered, and Strategic Portfolio Management Myths"
excerpt: "NN/g argues humanizing AI is a trap that reduces utility, while most 'empowered' product teams are actually feature factories fighting coordination wars."
publishedAt: "2026-01-14"
slug: "humanizing-ai-trap-empowered-teams-portfolio-management"
hashtags: "#unicornclub #ai #ux #product #teams #management #architecture #leadership #generated #en"
---

## Humanizing AI Is a Trap

**TLDR:** Adding personality, emotional language, and conversational pleasantries to AI systems increases user engagement but reduces accuracy, utility, and trust. Design real tools, not fake friends.

**Summary:**

Nielsen Norman Group drops a truth bomb here that cuts against the prevailing industry trend. Every major AI company has been racing to make their chatbots more personable, more warm, more human-like. And NN/g is saying this is fundamentally the wrong direction.

The core insight is about anthropomorphization versus humanization. Users naturally anthropomorphize things - we do it with pets, with Roombas, with anything that moves or responds. LLMs are particularly prone to this because they carry on conversations, remember context, and generate responses that sound like they came from a person. This happens regardless of what designers do.

Humanization is what happens when organizations deliberately amplify this tendency. ChatGPT's personality modes, the sycophantic opening phrases like "Love this brief!", the conversational pleasantries that waste tokens and add nothing. A 2025 study found that warm or empathetic models had error rates 10-30% higher than their original versions. System prompts designed to add warmth produced 12-14% drops in reliability.

The concerning part is the incentive structure. AI companies are under pressure to increase engagement, and humanization works for that metric. Users spend more time with chatbots they perceive as companions. But recent research found that when people attribute emotional traits to AI systems, they become less likely to accept advice from those systems. You're literally making your tool less useful by making it friendlier.

For teams building AI features, this suggests a contrarian approach: strip out the pleasantries, focus on utility, and resist the temptation to make your AI "friendly" just because competitors are doing it. The Brexit Bot example in the article - a tool for serious political questions that opens with casual banter and suggests "Tell me a joke" - is a perfect illustration of how wrong this can go.

**Key takeaways:**
- LLMs are naturally prone to anthropomorphization; humanization amplifies this deliberately
- Warm/empathetic AI models have 10-30% higher error rates than neutral versions
- Users who perceive AI as emotional become less likely to accept its advice
- Design AI as practical tools focused on utility rather than artificial friendship

**Tradeoffs:**
- Higher engagement metrics but lower accuracy and utility
- User comfort with friendly AI but reduced trust in its output

**Link:** [Humanizing AI Is a Trap](https://www.nngroup.com/articles/humanizing-ai/)

---

## Why Most Product Teams Aren't Really Empowered

**TLDR:** Despite what company handbooks claim, most product teams function as feature factories because true empowerment is incompatible with how large organizations actually work.

**Summary:**

This piece names something that many product managers feel but rarely say out loud. The gap between the empowerment promised by Marty Cagan's vision - teams given problems to solve, authority to decide how, accountability for outcomes - and the reality of coordination hell, top-down mandates, and 47-page alignment documents.

The article does something valuable by identifying the structural reasons empowerment fails at scale. The scale problem: when you have dozens of teams working on the same product, everyone genuinely cannot just do their own thing. Shared systems, shared components, shared screens create dependencies that no amount of autonomy can eliminate.

The organizational structure problem is particularly incisive. Consider an ecommerce company where one team owns reviews, another owns images and description, a third owns Add to Cart, a fourth owns recommendations. None of these teams can make meaningful improvements to the product detail page without coordinating with the others. The reviews team can "choose" the sort order or filtering options, but that's not real empowerment - it's permission to optimize one rectangle within very narrow parameters.

Then there's the certainty problem. Executives, boards, investors want to know what's being built and when. Sales needs release dates. Marketing needs campaign timelines. But empowered teams work iteratively, changing direction based on what they learn. You cannot have both certainty and empowerment. Most companies choose certainty, then call the teams "empowered" while telling them exactly what to ship by when.

The practical advice at the end is actually useful: minimize dependencies ruthlessly, build relationships before you need them, be the person who solves coordination problems, choose your battles, and most importantly - find the spaces where you do have agency and use them strategically.

**Key takeaways:**
- True empowerment conflicts with coordination needs at scale
- Teams organized around components rather than customer journeys have very limited real autonomy
- The demand for certainty from leadership directly conflicts with iterative, empowered teams
- PMs often become "connective tissue" spending 70% of time coordinating rather than understanding users

**Tradeoffs:**
- Team autonomy but fractured, inconsistent product experience
- Business certainty but loss of iteration and responsiveness to user feedback

**Link:** [Why Most Product Teams Aren't Really Empowered](https://www.nngroup.com/articles/teams-arent-empowered/)

---

## Strategic Portfolio Management Meets Product-Centricity

**TLDR:** Traditional portfolio management metaphors assume liquidity and fungibility that don't exist in software organizations - you can't reallocate teams and systems like you rebalance stocks.

**Summary:**

This is TBM's 400th issue, and it tackles a question that cuts to the heart of how we think about strategy execution in software companies: if the people responsible for strategic portfolio management cannot design the organization, shape strategy, or make prioritization decisions, what are they actually managing?

The insight starts with two concepts from finance: liquidity and fungibility. In a stock portfolio, assets can be easily converted to cash and substituted for one another. Real estate is less liquid but still tradeable. A vineyard requires multi-year, largely irreversible changes to reallocate. The question is: where do software products sit on this spectrum?

The answer, which the industry doesn't want to hear, is that software products are closer to vineyards than stocks. Products become entangled with teams, architecture, data, operations, and customer workflows. The product is a long-lived socio-technical system. Shifting investment is slow and risky. Stopping a product rarely frees capacity in a clean, reversible way.

This creates an awkward truth about Lean Portfolio Management. It implicitly rejects the idea that people are fungible by stabilizing teams, but it still assumes that flow can be redirected. It moves fungibility from people to flow, but flow itself is far less liquid than the portfolio metaphor suggests.

In truly product-centric companies, portfolio decisions aren't handled by a separate PMO acting as a buffer. They're part of product leadership itself and sit with the executive team. The people deciding strategy are also accountable for how teams, products, and systems evolve. Portfolio management isn't a function - it's just what leadership does.

**Key takeaways:**
- Portfolio metaphors from finance assume liquidity and fungibility that software doesn't have
- Software products are more like vineyards than stocks - changes are slow and often irreversible
- Lean Portfolio Management moves fungibility from people to flow, but flow isn't actually liquid either
- In product-centric companies, portfolio management is just leadership responsibility, not a separate function

**Tradeoffs:**
- Stable teams enable deep expertise but reduce ability to rapidly reallocate capacity
- Clear portfolio processes provide visibility but create false confidence in reallocation ability

**Link:** [TBM 400: Strategic Portfolio Management Meets Product-Centricity](https://cutlefish.substack.com/p/tbm-400-strategic-portfolio-management)

---

## Who's Spotting You When You Automate

**TLDR:** Effective automation requires clear boundaries and temporal awareness - engineers need to understand what happened, what's happening, and what will happen to trust systems they delegate to.

**Summary:**

This piece uses a weightlifting analogy that actually works. A good spotter positions themselves close enough to help, doesn't interfere with your lift, and watches to step in if needed. This certainty allows you to feel safe. When you don't trust your spotter, you pull back because the risk feels too high.

Automation in software systems faces the same trust dynamic. The article cites that automation spots trouble 30-40% faster and machine learning-based anomaly detection improved diagnostic accuracy by 25%. These are meaningful improvements. But the technology gains only matter if engineers actually trust the automation enough to delegate to it.

When automation intervenes too early, too late, or at the wrong moment, mental models fracture and engineers default to manual control. This is the same feeling as lifting with a spotter who doesn't know your patterns. The article identifies this as a common flaw when transparency hasn't been established.

The practical framework is around temporal awareness UX - creating experiences that provide transparency across past, present, and future. Historical traces let engineers understand what happened and why. Real-time observability watches system behavior as it happens. Trend analysis and prediction detect drift before it becomes an incident. Without these temporal contexts, approval gates default to rigid binary rules that hinder trust rather than reinforcing it.

For architects designing automated systems, this suggests that the UX around automation matters as much as the automation itself. Clear boundaries, explicit error handling, integration with existing governance workflows, and visibility across time dimensions determine whether engineers will actually trust and use what you build.

**Key takeaways:**
- Trust in automation develops the same way trust in a spotter does - through reliable, predictable behavior
- Engineers need temporal awareness: what happened (past), what's happening (present), what will happen (future)
- When mental models diverge from automated behavior, engineers default to manual control
- Boundaries and time visibility together foster the psychological safety needed for automation adoption

**Tradeoffs:**
- More automation visibility but higher development complexity
- Clear governance gates but potential friction in deployment speed

**Link:** [Who's Spotting You When You Automate](https://uxdesign.cc/whos-spotting-you-when-you-automate-84f1556b3023)

---

*The summaries provided are based on newsletter content and represent interpretations of the original articles. Readers should consult the original sources for complete technical details and authoritative information.*