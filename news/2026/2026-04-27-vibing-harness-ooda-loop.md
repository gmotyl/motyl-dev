---
title: "Vibing, Harness, and the OODA Loop"
excerpt: "Oskar Dudycz explores why vibe coding feels fast but often creates problems, and how a proper harness can close the feedback loop."
publishedAt: "2026-04-27"
slug: "vibing-harness-ooda-loop"
hashtags: "#architecture-weekly #engineering #coding #ai #observability #generated #en"
source_pattern: "OskarDudycz"
---

## The Weekend Beer Energy

I had some time, grabbed a beer, turned on the computer and tried to code this feature. If I could do so much during the weekend, how much could you and your team do with it in 2 weeks?

It's almost a 1:1 quote of what I heard from the startup founder I worked with over 10 years ago. We all know the annoying type of person who doesn't code anymore but thinks, "I still got it!" Then they threw a piece of stuff at you to "just fine-tune it a bit and do final touches." Then they're the first ones to ask "Why so long?"

Nowadays, the Internet is full of such people. They shout about what they did with Claude or how much progress LLM tools have made. Some even predict the end of coding. Vibing isn't new and isn't always an issue. LLM tools are an appraisal for ignorance. The more ignorant we are of the topic we're working with, the better we see the outcomes. And that, by itself, is not always bad, as there's power in ignorance if we focus on getting it done with the simplest tools we have.

Still, this can be terrible if we fall in love too much with what we've vibed.

## The OODA Loop

To understand why that weekend beer energy is both a superpower and a liability, we need to look at the OODA Loop. Military strategist John Boyd developed the OODA loop (Observe, Orient, Decide, Act) for fighter pilots. In a dogfight, the pilot who cycles through these four stages the fastest and most accurately survives. In software, the dogfight is the gap between your intent and the production-ready feature.

Observe is the intake of raw, unfiltered information. In our world, this means looking at the state of the system. Orient is the most critical and difficult stage. It's where you filter your observations through your experience, culture, and technical knowledge. Decide is based on your orientation, you formulate a hypothesis. Act is when you execute.

The reason the founder could build a PoC in a weekend while the team needed more than two weeks is that he bypassed the Observe and Orient phases. He went straight from a vague idea to Act. If we skip or brush past the observation step, it feels like lightning speed. If the fancy UI grid is there and it does something we wanted, we move on. We've outsourced Orientation to our own ego. It's too easy to assume that because we wrote it, it works.

Observation is the intake of raw data. In a professional environment, our eyes aren't enough. We need a harness. If we don't have automations, tests, integration tests, and pristine traces, we aren't observing the system; we're just looking at it. If the inputs are messy, our observation is clouded.

## The Harness

But real engineering, the kind that takes those two weeks, is about closing the loop properly. That's also where we need different perspectives and knowledge sharing. Orientation is where you process those observations. This is the part where LLMs make us feel smarter than we are. If we don't understand how a database handles concurrent connections, our orientation of a generated script will be shallow. We'll see code that looks right, decide it's fine, and act by deploying it.

The problem is that the faster we Act, the faster we need to Observe. If our Act phase takes seconds but our Observe phase requires a manual weekend of clicking around and drinking beer, our OODA loop is broken. We're just generating a pile of stuff that we haven't actually verified. That's why the team usually needs more than an imaginary two weeks. They are not fine-tuning the single-brilliant-dude masterpiece. They are building the infrastructure required to make the OODA loop sustainable.

Oskar gives this advice: start simple. We may ask LLMs to give us shell scripts, and we may ask them to run them multiple times. We also need experience and knowledge of what we want to achieve and the tools we use. It's fine not to remember all the YAML config to set up the Grafana stack, but it's not fine not to understand why you even use it, how it relates, and how to set it up.

Still, our first loop can close on the first working solution, even a manually vibed one. But that's not even a PoC. We need to automate them.

## Key Takeaways

- The OODA loop (Observe, Orient, Decide, Act) explains why vibe coding feels fast but often creates technical debt
- The faster we Act, the faster we need to Observe, or the OODA loop breaks
- A harness is a mechanical way to observe and orient, so you don't steer the whole project into a wall
- Vibing isn't the problem; skipping the full loop is the problem

## Why Do I Care

This piece resonates because it names something I've experienced but never articulated well. The feeling of moving fast with AI tools, only to realize later that I have no idea what actually happens when the code runs.

The harness concept is useful. It's not about being slower; it's about building the feedback mechanisms that let you go faster safely. Tests, observability, automation, all the boring stuff that lets you iterate with confidence.

The point about LLMs making us feel smarter than we are is particularly sharp. I can read generated code and think it looks right, but without proper verification, I'm just trusting my own shallow orientation. The code looks fine to someone who doesn't understand what's actually happening.

**Link:** [Vibing, Harness and OODA loop](https://www.architecture-weekly.com/p/vibing-harness-and-ooda-loop?publication_id=579466&post_id=195546923&isFreemail=true&triedRedirect=true)