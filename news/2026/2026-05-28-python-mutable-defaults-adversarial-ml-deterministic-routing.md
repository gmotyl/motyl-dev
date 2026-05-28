---
title: "Python's Mutable Default Arguments and Other Subtle Bugs That Will Drive You Crazy"
excerpt: "A look at Python's mutable default argument trap, how adversarial inputs can fool AI models, and what deterministic routing does for distributed systems performance."
publishedAt: "2026-05-28"
slug: "python-mutable-defaults-adversarial-ml-deterministic-routing"
hashtags: "#HackerNoon #Python #MachineLearning #DistributedSystems #SoftwareEngineering #generated #en"
source_pattern: "HackerNoon"
---

## Why Your Python Functions Are Secretly Changing Data You Never Passed to Them

**TLDR:** Python's mutable default argument trap causes functions to silently modify shared state across calls. The logic looks right, the data looks fine, but every call corrupts the output a little more, and figuring out why takes longer than it should.

**Summary:** There is a particular kind of debugging session that feels like gaslighting. You trace through the logic three times on paper. It checks out. You run it, and the output is wrong. You run it again, and the output is different. You didn't change anything. The data you passed in looks fine. This is exactly what happens with Python's mutable default arguments, and it catches developers at every experience level.

The issue comes down to how Python handles default argument values. When you define a function with a default argument like an empty list or dictionary, Python evaluates that default once, at function definition time, not at call time. That single object is shared across every call that uses the default. So when your function appends to it, adds a key, or mutates it in any way, the next call to that function starts with the already-modified version. No warnings. No errors. Just quietly wrong results that get worse over time.

I find this trap particularly interesting because it runs counter to intuition. Most developers assume default values work like reset-to-zero values, starting fresh each time. The mental model is wrong from the start, and Python does nothing to correct it. The fix is simple once you know about it: use None as the default and create a new mutable object inside the function body on each call. But knowing to do that requires knowing the trap exists in the first place.

This is the kind of thing that separates developers who have been burned by it from those who haven't. Once you've spent two hours hunting a bug caused by a shared list accumulating values across calls, you never forget. The lesson sticks. But until then, it's invisible. The article by Sohel Alam is a good reminder that some of the most expensive bugs in Python aren't about complex algorithms or architectural mistakes. They are about the small, quiet assumption that a function starts clean.

**Key takeaways:**
- Python evaluates mutable default arguments once at function definition, not on each call
- A list or dict used as a default will persist its state across all calls that use that default
- The fix is to default to None and instantiate the mutable inside the function body
- This pattern causes bugs that grow progressively worse with each function call, making them hard to trace
- Even experienced Python developers hit this because the mental model most people carry is incorrect

**Why do I care:** As a senior frontend developer who sometimes writes Python tooling and build scripts, this is exactly the category of bug that kills an afternoon. I've seen it in data processing utilities, in test fixtures, in CLI tools. The danger is that it doesn't crash immediately. It degrades. And degrading bugs are the hardest to pin down because you're not looking for the moment it breaks, you're looking for why it was never right. Knowing this pattern cold is worth more than knowing ten framework APIs.

**Link:** [Why Your Python Functions Are Secretly Changing Data You Never Passed to Them](https://hackernoon.com/why-your-python-functions-are-secretly-changing-data-you-never-passed-to-them)

---

## Adversarial Machine Learning and Its Role in Fooling AI

**TLDR:** Adversarial machine learning studies how carefully crafted inputs can cause AI models to produce wrong outputs with high confidence. Understanding these attacks is important for anyone building AI systems that need to be reliable in the real world.

**Summary:** AI models feel solid until you realize how fragile they can be when someone is actively trying to break them. Adversarial machine learning is the field that examines exactly this: what happens when inputs are deliberately designed to mislead a model. The core insight is unsettling. You can take an image that a human would clearly identify correctly, add imperceptible noise to it, and the model will confidently classify it as something completely different.

These attacks come in different shapes. White-box attacks assume the attacker has access to the model architecture and weights. Black-box attacks assume they don't, but adversarial examples often transfer between models anyway, which is what makes them practically dangerous. An attacker doesn't need your exact model to fool it. They can craft examples against a substitute model and use those same examples against yours. That transferability is what moves adversarial ML from a theoretical curiosity to an actual security concern.

The implications go beyond image classification. Text models, audio models, and code analysis tools all have adversarial blind spots. A model that flags malicious code can be fooled by adding benign-looking obfuscation. A spam filter can be manipulated by carefully chosen word substitutions. As AI moves deeper into medical diagnosis, fraud detection, and autonomous systems, these vulnerabilities stop being academic. They become something an attacker will actively probe.

Defense is genuinely hard. Adversarial training, where you include adversarial examples in the training set, helps but doesn't eliminate the problem. Certified defenses offer mathematical guarantees for small perturbations but don't scale well. The field is still catching up to the attack surface. What strikes me is that this mirrors traditional security: attackers iterate faster than defenders, and the right mental model is treating adversarial robustness as an ongoing engineering problem, not a solved checkbox.

**Key takeaways:**
- Adversarial examples are inputs slightly modified to fool a model while looking normal to humans
- Adversarial examples often transfer between different models, making black-box attacks practical
- Defenses include adversarial training and certified robustness, but neither fully solves the problem
- Text, audio, and code models are just as vulnerable as image models
- Treating adversarial robustness as a security engineering discipline, not a one-time fix, is the correct approach

**Why do I care:** The more AI components show up in the tools I use and build, the more I need to think about how they fail under adversarial conditions. If a CI pipeline uses an AI model to flag security issues, that model is a potential attack surface. If a design tool uses image AI, someone will find ways to manipulate its outputs. This isn't paranoia. It's the same security mindset we apply to everything else in software. Understanding adversarial ML is part of being a responsible consumer of AI infrastructure.

**Link:** [Adversarial Machine Learning and Its Role in Fooling AI](https://hackernoon.com/adversarial-machine-learning-and-its-role-in-fooling-ai-3z4k3447)

---

## Deterministic Routing: The Hidden Key to Low Latency

**TLDR:** In distributed systems, unpredictable routing paths cause latency spikes and make performance hard to reason about. Deterministic routing assigns requests to the same nodes consistently, reducing variance and making systems easier to debug.

**Summary:** Latency in distributed systems is never just about raw speed. It's about variance. A system that occasionally takes 500 milliseconds on a request that usually takes 5 milliseconds is often worse in practice than a slower but consistent one. The unpredictability is what breaks user experiences and makes SLAs impossible to meet reliably. Deterministic routing is one technique that attacks variance directly.

The idea is straightforward. Instead of load balancing requests randomly or round-robin across a pool of nodes, you route based on a property of the request itself, typically a hash of a user ID, session ID, or some other stable key. The same key always goes to the same node. This means that if a particular user's data is cached on a node, their subsequent requests consistently hit that cached version. You stop paying the penalty of cache misses from routing variance.

Ritvik Pandya, an engineering leader at JPMorgan Chase, writes about this in the context of low-latency payment systems, which is a domain where latency is not just a user experience concern but a compliance and financial one. The combination of Kubernetes service mesh, Istio for traffic management, and CockroachDB for distributed storage creates a stack where deterministic routing can be configured and enforced across services.

What I find useful about this framing is that it connects a routing technique to a broader principle: predictability is a feature. Random or round-robin load balancing looks like it should be fair and efficient, and it often is when requests are stateless. But once you introduce any form of affinity, whether that's local cache state, session data, or node-specific computation, randomness becomes your enemy. Deterministic routing gives you back the ability to reason about what your system is doing.

**Key takeaways:**
- Deterministic routing hashes a request property to always map the same requests to the same nodes
- This improves cache hit rates for session-affine or stateful requests
- Reduced routing variance lowers latency spikes and makes p99 performance more predictable
- Service meshes like Istio make deterministic routing configurable without application-level changes
- Predictability in routing is especially important when node-local state matters

**Why do I care:** As someone who works on frontend systems that depend on distributed APIs, I care about where requests go even if I don't control the infrastructure. Latency spikes from cache misses caused by random routing are invisible until they show up in your performance traces. Understanding deterministic routing helps me have better conversations with backend teams about why something feels inconsistent, and it informs how I think about session handling and data fetching patterns in apps that run at scale.

**Link:** [Deterministic Routing: The Hidden Key to Low Latency](https://hackernoon.com/deterministic-routing-the-hidden-key-to-low-latency)
