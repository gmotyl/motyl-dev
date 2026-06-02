---
title: "NPM Trusted Publishing: The Supply Chain Fix That Was Right Under Our Noses"
excerpt: "NPM's Trusted Publishing feature, combined with basic security hygiene, addresses most supply chain attack vectors without requiring exotic tooling."
publishedAt: "2026-06-01"
slug: "npm-trusted-publishing-supply-chain-security"
hashtags: "#oskar-dudycz #architecture #security #npm #supply-chain #javascript #generated #en"
source_pattern: "OskarDudycz"
---

## NPM Trusted Publishing: The Supply Chain Fix That Was Right Under Our Noses

**TLDR:** NPM has quietly shipped a "Trusted Publishing" feature that ties package publishing to your existing CI/CD identity in GitHub Actions, GitLab, or CircleCI, removing the need for long-lived access tokens entirely. Combined with provenance statements and mandatory 2FA, this meaningfully shrinks the attack surface for most supply chain compromises without requiring any exotic tooling.

**Summary:**

Every few months the JavaScript ecosystem gets reminded that npm package security is a disaster, and then nothing changes. The Axios supply chain attack was the latest entry in a long list of compromises that all share the same basic shape: credentials leaked, malicious publish, thousands of downstream projects silently compromised before anyone notices. It is a pattern so familiar it has become background noise.

What Oskar Dudycz points out this week is that NPM has actually shipped real mitigations, and most of us simply have not noticed or have not bothered. Trusted Publishing is the one worth understanding. The mechanism is clean: instead of generating a long-lived access token and storing it as a CI secret (a token that can be stolen from your CI logs, your laptop, your dotfiles, your coworker's clipboard), you configure a trust relationship between your npm package and a specific GitHub Actions workflow or GitLab pipeline. When that workflow runs a publish step, OIDC tokens handle authentication automatically. There is no token to steal because there is no token.

This is the same pattern that cloud providers like AWS and GCP have been pushing for ages with OIDC federation. The idea is not new. What is new is that it is now available for npm package publishing, which is one of the highest-value targets in the JavaScript ecosystem. Pair that with provenance statements, which record a signed attestation of which exact workflow produced which exact package version, and you now have a forensic trail that makes supply chain detective work dramatically easier after an incident.

Oskar is appropriately pragmatic about what this does not solve. Provenance statements do not stop a determined attacker who has already compromised your CI environment. They make attribution easier, not prevention stronger. But most supply chain attacks are opportunistic, not sophisticated. They target the easy paths: leaked tokens in git history, access tokens sitting in developer dotfiles, packages maintained by someone who handed out publish rights five years ago and forgot about it. Closing those paths eliminates the vast majority of realistic attack vectors.

The one genuine frustration he flags is worth noting: the NPM UI forces you to configure Trusted Publishing package by package, even in a monorepo. That is a real operational burden and a genuine gap in the tooling. But given that the alternative is leaving long-lived publish tokens scattered around your environment indefinitely, the manual setup cost is worth paying. The security improvement is not proportional to the effort required. It is much larger.

**Key takeaways:**

- NPM Trusted Publishing removes the need for long-lived access tokens by using OIDC federation with GitHub Actions, GitLab CI/CD, and CircleCI
- Provenance statements create a signed audit trail linking each package version to the exact CI workflow that produced it
- Most supply chain attacks exploit lazy credential management, not sophisticated infrastructure compromises, so basic hygiene eliminates most realistic risk
- The NPM UI requires per-package configuration even in monorepos, which is a real pain point but not a reason to skip setup
- Overly complex security procedures and overly casual ones both create holes; the middle path is boring, repeatable, and actually works

**Why do I care:** I have seen way too many teams treat npm publish tokens as permanent fixtures in their CI secrets, never rotated, shared across projects, occasionally committed to dotfiles by accident. Trusted Publishing is the kind of change that should have happened five years ago, and it is here now. If you maintain any public npm package and you are already using GitHub Actions, there is no excuse not to set this up this week. The attack surface we are eliminating is not theoretical. It is the exact vector used in real compromises against projects that were otherwise well-run. The manual per-package setup in NPM is annoying, yes, but the right response to that annoyance is to file a bug against NPM's tooling, not to skip the security improvement.

**Link:** [NPM unsafe and vulnerable for supply chain. Well, not quite...](https://architectureweekly.substack.com)
