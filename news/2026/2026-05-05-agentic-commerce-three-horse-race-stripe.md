---
title: "Agentic Commerce's Three-Horse Race: Why Stripe Might Win Without Anyone Noticing"
excerpt: "OpenAI and Google dominate the headlines in agentic commerce, but Stripe is quietly building the infrastructure layer that makes all of it run."
publishedAt: "2026-05-05"
slug: "agentic-commerce-three-horse-race-stripe"
hashtags: "#thecircuit #ai #agenticcommerce #stripe #fintech #payments #generated #en"
source_pattern: "TheCircuit"
---

## Agentic Commerce's Three-Horse Race: Why Stripe Might Win Without Anyone Noticing

**TLDR:** Most people frame the agentic commerce battle as OpenAI versus Google, but Stripe has been quietly positioning itself as the infrastructure beneath both. At its Sessions 2026 event, Stripe shipped a Link agent wallet, an Agentic Commerce Suite with Google and Meta partnerships, and Machine Payments Protocol support via the standard Payment Intents API. This is not a company chasing headlines. This is a company building the rails.

**Summary:**

There is a particular pattern in platform transitions that keeps repeating itself, and I think we are watching it happen again right now in agentic commerce. Everyone is focused on the flashy storefronts and the AI interfaces. ChatGPT lets you buy from Walmart and Target. Google has AP2 and UCP stitching together Gemini and Search into something that looks like a shopping layer. Sixty partners on day one, including Mastercard and Shopify. Big announcements. Real momentum. And yet, when I look at the actual structure of what is being built, I find myself thinking about Stripe more than either of them.

OpenAI co-built the Agentic Commerce Protocol with Stripe back in September 2025. "Buy it in ChatGPT" went live for US users in February, and by March they had smartly dialed back the ambition — instead of completing transactions inside ChatGPT, merchants now own the checkout. The AI handles discovery, the brand handles the till. That is a sensible adjustment. It is also still US-only, with international rollout planned for later this year. Google's bet is the opposite: open standards, global partners, patient long-game energy. Their AP2 protocol launched with 60+ partners and they have already planted a flag in Southeast Asia through Sea Limited and Shopee, a region where early agentic AI adopters are reportedly seeing more than 3x ROI according to the E-Conomy SEA 2025 report.

So you have one horse running fast in North America, and another grinding out the long international stretch. That framing makes it look like a two-horse race. But here is the thing that the Sessions 2026 announcements made clearer than ever: Stripe co-authored OpenAI's ACP, is interoperable with Google's AP2 through Visa's Intelligent Commerce Connect, and its Treasury rails are what actually settle the payments in both stacks. The Link agent wallet — one-time virtual cards per agent task, user approval per transaction, riding on top of Link's 250 million existing users — is not a product you build if you are trying to win one protocol war. It is infrastructure you build when you plan to be useful regardless of which protocol wins.

I keep coming back to what Checkout.com is seeing in the real world: merchants supporting both ACP and UCP get roughly 40% more agentic traffic than those picking just one side. That data point says everything. The protocol war is already collapsing into "support both." And when merchants need to support both, they reach for the payment layer that works across both. Which, by deliberate design, is Stripe. The historical analogy writes itself. In every previous platform transition — desktop to mobile, retail to e-commerce — the winner was not the one with the prettiest interface. It was the one whose plumbing was already installed when everyone else woke up.

One more thing worth watching: the Asia angle. Sea Limited is hedging both Google and OpenAI simultaneously through its Shopee platform. The first place where AI-assisted shopping stops feeling like a demo and starts feeling like normal behavior is probably not going to be the US or Western Europe. It is going to be somewhere with mobile-first commerce habits, high smartphone penetration, and a population that was already comfortable with super-apps doing everything. Southeast Asia fits that description. If you are building agentic commerce tooling right now, the roadmap question is not just "which protocol" but "which geography first."

**Key takeaways:**

- Stripe co-authored OpenAI's ACP and is interoperable with Google's AP2, making it the neutral infrastructure layer beneath both agentic commerce protocols
- At Sessions 2026, Stripe shipped the Link agent wallet (one-time virtual cards per agent task), an expanded Agentic Commerce Suite with Google and Meta, and MPP integration via the Payment Intents API
- Merchants supporting both ACP and UCP see ~40% more agentic traffic than single-protocol merchants, making dual-protocol support the practical default
- The Microsoft/OpenAI restructuring is significant: the IP license becomes non-exclusive through 2032, and GPT-5.5 was on AWS Bedrock within 24 hours of the announcement
- The four AI hyperscalers (Alphabet, Amazon, Microsoft, Meta) reported combined 2026 AI capex guidance of $650-700B; three of four are showing AI spend converting to revenue
- Southeast Asia, via Sea Limited/Shopee and Google's AP2, may be where agentic commerce goes from demo to habit first

**Why do I care:**

The reason this matters to me as someone who thinks about software infrastructure is that it illustrates a principle I believe in deeply: the boring layer wins. Payments are not glamorous. Nobody is writing breathless blog posts about Treasury rails or Shared Payment Tokens. But when AI agents start handling purchasing decisions autonomously, someone has to verify the transaction, issue the virtual card, settle the payment, and handle the refund when the agent buys the wrong thing. That is not a problem that gets solved by a better language model. It gets solved by the company that has spent fifteen years making payment infrastructure reliable across 100+ countries. Stripe positioned itself here deliberately, and the Sessions 2026 announcements confirm they are executing the plan.

**Link:** [Agentic Commerce's Three-Horse Race](https://metacircuits.substack.com/p/agentic-commerce-three-horse-race)
