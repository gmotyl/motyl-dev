---
title: "HackerNoon: Why Your Agents Should Stop Doing Math, and Open Source as the Great Equalizer in Vision AI"
excerpt: "Two HackerNoon stories on handing math back to classical ML inside agent pipelines, and why Ultralytics bet its vision models on open source."
publishedAt: "2026-06-11"
slug: "hackernoon-classical-ml-tools-for-agents-and-open-source-vision-ai"
hashtags: "#hackernoon #ai #agents #python #scikit-learn #ml #open-source #architecture #generated #en"
---

## LLMs Shouldn't Do Math: Why Your Agents Need Classical ML Tools

**TLDR:** This is an engineering guide to auto-generating LLM tool schemas for scikit-learn models using an open-source library called predikit. The argument is simple. Stop asking a language model to estimate credit risk or churn probability, and instead let it call a real model that was trained to do exactly that.

**Summary:** The piece opens by poking at the current mood in AI, where the default answer to every problem seems to be "prompt an LLM." Need to evaluate credit risk? Prompt it. Need to predict customer churn? Give it a few-shot example and hope. The author, a data scientist who builds production systems at a Fortune 500 company, has clearly watched this pattern play out and wants to push back. The point is not that language models are useless. The point is that numerical prediction is a solved problem with decades of tooling behind it, and a transformer guessing at a number is the wrong tool dressed up as the exciting one.

The proposed fix is to keep the classical model where it belongs, as a trained scikit-learn estimator, and expose it to the agent as a callable tool. The friction in doing that today is glue code. Every time you want an agent to use a model, you hand-write a schema that describes the inputs, the types, the expected ranges, and you keep that schema in sync with the model as it changes. That is tedious and it rots fast. The predikit library is pitched as the thing that removes that manual step by generating the tool schema directly from the model, so the agent gets a clean, typed interface without a human stitching it together each time.

What I find interesting is the architectural stance underneath the tooling. The author is drawing a line between reasoning and computation. The LLM orchestrates, decides what to do, talks to the user, and routes work. The classical model does the actual number crunching with known error bounds and a training history you can audit. That separation matters because a logistic regression scoring credit risk can be explained, validated, and regulated. An LLM hallucinating a probability cannot, at least not in a way a risk committee will accept.

The article is short, around a four minute read, so it leans more toward "here is the technique and here is the library" than a deep theoretical treatment. I would have liked more on where the boundary gets blurry. There are genuinely tasks where an LLM extracting structure from messy text feeds into a classical model, and the handoff between those two is where production systems get fragile. The piece seems to assume the inputs to your scikit-learn model arrive clean and typed, which in the real world they rarely do.

The thing the author is mostly avoiding is the validation story for the generated schemas. Auto-generating a tool schema from a model is convenient, but if the schema is wrong or too permissive, the agent will happily feed garbage into the model and get a confident garbage answer back. Pydantic gets a mention in the tags, which suggests the typing is taken seriously, but the trust boundary between "the agent decided to call this" and "the model actually got valid inputs" is the part I would want to see hardened before shipping.

**Key takeaways:**
- Numerical prediction like credit risk and churn is better handled by trained classical models than by prompting a language model.
- The predikit library auto-generates LLM tool schemas from scikit-learn models, removing hand-written glue code.
- The pattern keeps the LLM as an orchestrator and the classical model as the auditable, regulated computation layer.
- The unaddressed risk is input validation; a convenient auto-generated schema can still let bad data reach the model.

**Why do I care:** If you are building anything agentic on the frontend or wiring an LLM into a product, this is the right mental model to steal. The temptation is always to let the model "just figure it out," and that is exactly how you end up with a feature that demos beautifully and fails an audit. Treating the LLM as a router that calls deterministic, testable tools is also far easier to reason about as an architect, because you can unit test the tools and you can put real boundaries around the non-deterministic part. The predikit angle is Python-side, so it is less about your day-to-day TypeScript work and more about how you design the contract between your UI, your agent, and the services behind it. I would push my team to think about which decisions in a product genuinely need a language model and which are just math we already know how to do.

**Link:** [LLMs Shouldn't Do Math: Why Your Agents Need Classical ML Tools](https://hackernoon.com/llms-shouldnt-do-math-why-your-agents-need-classical-ml-tools)

## Ultralytics Founder and CEO: Democratizing Vision AI for Everyone

**TLDR:** An interview with Ultralytics founder and CEO Glenn Jocher about building what he describes as the world's most widely deployed vision AI, and his argument that open source is the great equalizer that pulled computer vision out of research labs and into real products.

**Summary:** This is part of HackerNoon's Writers Spotlight interview series, and the subject is Glenn Jocher, the person behind Ultralytics and the YOLO family of vision models that a huge number of developers have run at some point. The framing is "vision AI for everyone," and the story he tells is about timing and access. Computer vision existed for a long time, but for most of that history it lived in research labs. It worked in controlled conditions and was painful to actually deploy in the messy real world. The interview is about what changed and why open source was the lever.

Jocher's core claim is that open source is the great equalizer. When the models, the weights, and the tooling are freely available, a solo developer in any country gets the same starting point as a well-funded lab. That is a strong position for someone running a company, because the obvious tension is how you build a business on something you give away. The interview leans into the philosophy more than the business model, which is fine for an inspiration piece but leaves the most interesting commercial question lightly touched.

The "deploy in the real world" thread is the part worth sitting with. The reason YOLO style models spread so widely is not only that they were free, it is that they were fast and small enough to run on hardware people actually had. A model that needs a data center is a research artifact. A model that runs on a phone or an edge device is a product. That practical bar, real time inference on modest hardware, is what turned vision AI from a demo into something embedded in cameras, robots, and apps.

As an interview it is light on technical depth by design, around a five minute read, and it is clearly meant to celebrate a contributor and the open source ethos rather than to teach you how the models work. I would treat the "most widely deployed" claim as marketing language rather than a measured fact, since nobody is auditing global deployment counts. The interesting unspoken topic is licensing. Ultralytics models have shifted licensing terms over the years in ways that caught some commercial users off guard, and a piece celebrating "open source for everyone" that does not engage with the licensing reality is leaving out the part that actually bites teams in production.

**Key takeaways:**
- Glenn Jocher of Ultralytics argues open source is what moved computer vision from research labs into deployable products.
- The practical enabler was models small and fast enough to run on real hardware, not just free weights.
- The piece is an inspirational contributor interview, light on technical and commercial detail.
- It sidesteps licensing, which is the question that most affects teams shipping these models commercially.

**Why do I care:** Most frontend and product engineers will not train a vision model, but plenty of us end up integrating one, whether it is on-device detection in a web app or a service behind an API. The lesson that matters here is the deployment bar. A model that runs in real time on the hardware your users have is the difference between a feature and a science project, and that constraint should shape your architecture decisions early. The bigger flag I would raise to any team leaning on Ultralytics models is licensing. "Open source" is doing a lot of work in this interview, and before you build a commercial product on these weights, read the actual license terms, because the equalizer story and the legal story are not always the same thing.

**Link:** [Ultralytics Founder and CEO: Democratizing Vision AI for Everyone](https://hackernoon.com/ultralytics-founder-and-ceo-democratizing-vision-ai-for-everyone)
