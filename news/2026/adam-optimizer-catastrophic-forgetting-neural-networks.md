---
title: 'Does the Adam Optimizer Make Neural Networks Forget? A Deep Dive'
excerpt: 'A research series on HackerNoon explores how optimizer choice dramatically affects catastrophic forgetting in neural networks, with surprising findings about vanilla SGD outperforming Adam.'
publishedAt: '2026-03-19'
slug: 'adam-optimizer-catastrophic-forgetting-neural-networks'
hashtags: '#hackernoon #ai #ml #architecture #engineering #generated #en'
---

## Does the Adam Optimizer Amplify Catastrophic Forgetting?

**TLDR:** Research by Dylan Ashley, Sina Ghiassian, and Richard Sutton shows that the choice of optimizer has a significant impact on catastrophic forgetting in neural networks, and surprisingly, vanilla SGD often outperforms Adam. The findings also reveal that how you measure forgetting can completely change your conclusions.

Catastrophic forgetting remains one of the stubborn unsolved problems in neural network research. It is the tendency for artificial neural networks to forget previously learned information when exposed to new information, and it is a severe hindrance to the broad application of ANNs in online learning and continual learning settings. Despite decades of work on the problem, a research paper published on HackerNoon by the Adam Optimizer channel argues that the field still does not understand the phenomenon well enough to measure it reliably, let alone fix it.

The core finding is striking. The choice of which modern gradient-based optimization algorithm is used to train an ANN has a significant impact on the amount of catastrophic forgetting. And the surprise is that classical algorithms such as vanilla SGD frequently experience less catastrophic forgetting than more modern algorithms such as Adam. The researchers compared vanilla SGD, SGD with Momentum, RMSProp, and Adam across different testbeds from both reinforcement learning and supervised learning literature. The results ground previous observations about why vanilla SGD is often favored in continual learning settings with strong empirical evidence for the first time.

But the measurement problem is arguably more important than the optimizer finding. The paper compares four different existing metrics for quantifying catastrophic forgetting: retention, relearning, activation overlap, and pairwise interference. The result is disturbing for the research community. The degree to which learning systems experience catastrophic forgetting is sufficiently sensitive to the metric used that a change from one principled metric to another is enough to change the conclusions of a study dramatically. The relative ranking of algorithms varies wildly between metrics. This means that most existing research into methods to mitigate catastrophic forgetting, which rarely looks at more than one metric, may be drawing conclusions that depend entirely on which measurement they chose rather than on actual algorithm performance.

The authors recommend that work looking at inter-task forgetting in supervised learning must consider both retention and relearning metrics concurrently. For intra-task forgetting in reinforcement learning, they recommend at the very least measuring with pairwise interference. This is a much more rigorous experimental methodology than the current standard.

The significance of this work extends beyond academic measurement debates. As neural networks continue to drive major AI breakthroughs, from computer vision to natural language processing to reinforcement learning agents, the ability to learn continuously without catastrophic forgetting becomes critical. If the field has been measuring the problem incorrectly, then the solutions people have been building may be solving the wrong version of the problem.

The paper also raises important questions about why Adam, which is the default optimizer for most deep learning practitioners, might be worse for continual learning. The adaptive learning rate mechanism that makes Adam converge faster on new tasks may simultaneously be more aggressively overwriting the parameters that encode previously learned information. This is a fundamental tension between fast learning and stable memory that the optimizer choice brings into sharp focus.

The related work section traces the problem back to its origins in McCloskey and Cohen in 1989 and connects to numerous mitigation methods proposed over the years. The authors note that despite all this work, catastrophic forgetting continues to be an unsolved issue, and recent work is still uncovering fundamental connections about what contributes to it.

**Key takeaways:**

- Optimizer choice significantly impacts catastrophic forgetting, with vanilla SGD often outperforming Adam
- The metric used to measure forgetting can completely change the conclusions of a study
- Most existing research uses only one metric, which means findings may be measurement-dependent rather than reflecting actual algorithm performance
- The field needs more rigorous experimental methodology with multiple concurrent metrics

**Why do I care:** If you are training neural networks for any production system where the model needs to learn from new data over time, this research matters directly. The default choice of Adam as an optimizer may be hurting your model's ability to retain previously learned information. And if you are evaluating continual learning methods, the measurement critique is essential reading. The fact that switching metrics can invert your algorithm rankings means you cannot trust single-metric comparisons. For anyone building AI systems that need to improve over time without degrading on existing capabilities, this is foundational work.

**Link:** [Does the Adam Optimizer Amplify Catastrophic Forgetting?](https://hackernoon.com/does-the-adam-optimizer-amplify-catastrophic-forgetting) | [Study Finds Optimizer Choice Significantly Impacts Model Retention](https://hackernoon.com/study-finds-optimizer-choice-significantly-impacts-model-retention) | [Measuring Catastrophic Forgetting in AI](https://hackernoon.com/measuring-catastrophic-forgetting-in-ai) | [This Is How Your Model Forgets What It Just Learned](https://hackernoon.com/this-is-how-your-model-forgets-what-it-just-learned) | [Teaching Machines to Remember Means Choosing What They Forget](https://hackernoon.com/teaching-machines-to-remember-means-choosing-what-they-forget) | [Why Adam May Be Hurting Your Neural Network's Memory](https://hackernoon.com/why-adam-may-be-hurting-your-neural-networks-memory) | [The Fragile Memory of Neural Networks, and the Metrics We Trust](https://hackernoon.com/the-fragile-memory-of-neural-networks-and-the-metrics-we-trust)
