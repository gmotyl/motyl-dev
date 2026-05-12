---
title: "How ML Systems Actually Work: From Data to Deployment"
excerpt: "A plain-English walkthrough of the building blocks behind real-world machine learning systems, from raw data through features, training, and embeddings."
publishedAt: "2026-05-12"
slug: "how-ml-systems-actually-work-from-data-to-deployment"
hashtags: "#neokim #machinelearning #systemdesign #mlops #embeddings #generated #en"
source_pattern: "NeoKim"
---

## How ML Systems Actually Work: From Data to Deployment

**TLDR:** This is a field guide to machine learning system design written for people who want to understand how these systems actually function in production, not just the math. It walks through the full pipeline from raw data to model training, tracing how systems like Netflix, Spotify, and Uber work under the hood.

There's a pattern I've noticed in how ML systems are explained to engineers who don't specialize in AI: people jump straight to algorithms and model architectures, skipping the part that actually determines whether the whole thing works. That part is data. Traditional software runs on rules you write by hand. ML systems work differently. You feed the system examples, millions of them, and it figures out the rules on its own. Show it a billion watch sessions and it learns which movie to recommend next. It sounds like magic, but it's data engineering all the way down.

Features are the atomic unit of this whole pipeline. A feature is a single, measurable piece of information the model uses to make predictions, think of them as columns in a spreadsheet describing each example. If you're predicting whether someone clicks an ad, your features might include user age, time of day, device type, and how many ads they've already seen. Spotify's Discover Weekly doesn't "hear" music. It reads features like your most-played genres, your typical listening time, and your skip rate. The model never actually processes audio. That's a genuinely counterintuitive thing that's worth sitting with.

Feature engineering is where raw data gets transformed into something useful. Uber's raw data has a timestamp like "2024-12-25 08:47:32 UTC." Feature engineering turns that into: day of week, time of day, whether it's a holiday, and current weather. Each transformation gives the model a more actionable signal. The most powerful features often don't exist in the raw data at all. Something like "average rides per week for this user" requires aggregating across many records, and that kind of creativity is what separates competent feature work from excellent feature work.

Labels are the ground truth the model trains against. For a spam filter, it's "spam" or "not spam." For home price prediction, it's the actual sale price. This sounds straightforward, but defining ground truth is often one of the hardest parts of the job. When Netflix asks whether a user enjoyed a movie, what does that actually mean? Did they watch to the end? Did they rate it? Did they immediately watch something similar? Different definitions of success lead the model to optimize for different things. Choose wrong, and you've built a system that's very good at the wrong objective.

Data splitting, class imbalance, and data leakage are three problems that trip up real production systems constantly. The standard train/validation/test split exists so you're not testing a student with questions they've already practiced on. Netflix trains on January-through-October viewing data, validates on November, and tests on December, because time-based splits matter when the real world changes over time. Class imbalance is the problem where 1 in 10,000 transactions is fraudulent, and a model that always predicts "not fraud" scores 99.99% accuracy while being completely useless. Data leakage is subtler: if your training data includes a "customer complaint filed" column, and complaints only exist because a delivery was already late, you've accidentally trained the model on the answer. If your model scores above 95% on the first try, check for leakage.

Model training is the process of showing the model examples and letting it adjust its internal numbers until predictions get closer to ground truth. The loss function measures how wrong the model is, and after each batch, the model adjusts to reduce that number. Different problems need different loss functions. Predicting Uber's ETA might use mean squared error, which penalizes big misses more than small ones. Classifying spam uses cross-entropy, which measures how confident the model was in the wrong answer. These choices have real downstream effects on behavior, not just accuracy numbers.

Embeddings are probably the concept that appears most often in system design interviews and gets explained worst. An embedding is a way to represent something (a word, a user, a product) as a list of numbers that captures its meaning and relationships. "Cat" and "kitten" end up close together in embedding space because they're related. "Comedy" and "rom-com" are neighbors. "Accounting" is in a different universe. Spotify uses song embeddings to find tracks that are musically similar to what you've been listening to. Netflix uses both movie embeddings and user embeddings to match viewers with films. Once everything is a vector, similarity becomes a distance calculation. That's a powerful idea.

**Key takeaways:**
- Feature quality matters more than model sophistication; the pipeline that produces and transforms data is where most production ML work actually happens
- Ground truth definition shapes what the model optimizes for, and getting it wrong means building a system that's very good at the wrong thing
- Embeddings are the mechanism by which ML systems make sense of real-world entities like users, products, and content by representing them as vectors in a shared space

**Why do I care:** From an architecture standpoint, the most important thing in this piece is the emphasis on data pipelines and the lifecycle around data, not models. Dropped rows, null values, a late pipeline run produce no errors but silently degrade predictions. Data versioning (knowing exactly which dataset version trained which model) enables reproducibility and makes debugging regressions possible. If you're building any system that incorporates ML features, the reliability engineering around the data pipeline is at least as important as model selection.

**Link:** [How ML Systems Actually Work: From Data to Deployment](https://newsletter.systemdesign.one/p/machine-learning-system-design-interview?publication_id=1511845&post_id=195463236&isFreemail=true&triedRedirect=true)
