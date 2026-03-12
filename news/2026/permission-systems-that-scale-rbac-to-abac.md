---
title: "Permission Systems That Scale: From Scattered If Checks to a Single Can() Function"
excerpt: "A deep dive into centralizing permission logic, migrating from Role-Based Access Control to Attribute-Based Access Control, and building authorization systems that actually scale with your application."
publishedAt: "2026-03-11"
slug: "permission-systems-that-scale-rbac-to-abac"
hashtags: "#frontend-masters #frontend #typescript #architecture #security #auth #generated #en"
---

## Permission Systems That Scale: From RBAC to ABAC

**TLDR:** Every app starts with simple permission checks, but they inevitably spiral into scattered, duplicated, bug-prone logic. The path forward runs through centralizing authorization into a services layer, then evolving from Role-Based Access Control to Attribute-Based Access Control, and the difference between getting it right and getting it wrong is the difference between a system that scales and one that silently lets users do things they should never be allowed to do.

Look, here is the thing that nobody talks about at the beginning of a project. You start with a simple if statement. "If user is admin, show the delete button." Done. Ship it. Move on. And for a while, that is genuinely fine. But then your product manager comes along and says "editors should be able to edit documents but only in their department," and suddenly that one if statement has seventeen cousins scattered across your pages, your components, and your API routes, each slightly different, and you are one forgotten check away from a security incident.

Kyle Cook, who many of you know from Web Dev Simplified, put together a comprehensive walkthrough of exactly this problem and how to solve it properly. The approach is methodical and starts where most of us actually are: with a messy codebase full of inconsistent permission checks that technically work but are a maintenance nightmare waiting to happen.

The first critical insight is about centralization. Before you even think about RBAC or ABAC or any other acronym, you need to get your permission logic out of your pages and components and into a services layer. This is the "eat your vegetables" step that most developers skip because it is not glamorous. But it is the foundation everything else rests on. When your authorization, validation, and database calls all live in one place, you get single responsibility, better security, and the ability to actually test your permissions without spinning up your entire application.

Once you have that services layer in place, you can implement proper Role-Based Access Control. The idea is straightforward: define roles like admin, editor, author, and viewer, map specific permissions to each role, and then create a single "can" function that checks whether a user has a given permission. One function. One place to look. One place to change. When you update a permission in your RBAC configuration, it propagates everywhere instantly. That is a massive improvement over the scattered if-check approach.

But here is where it gets interesting, and where most tutorials stop but real-world applications keep going. RBAC breaks down the moment your permissions depend on attributes beyond just the user's role. Can this user edit this specific document? Well, it depends: are they the owner? Is the document locked? Is it still in draft state? Are they in the right department? RBAC simply does not have a good answer for these questions without devolving into the same kind of sprawling conditional logic you were trying to escape in the first place.

That is where Attribute-Based Access Control comes in. ABAC evaluates permissions by combining four things: the subject (who is asking), the resource (what they are asking about), the action (what they want to do), and the environment (the context around the request). Instead of a flat lookup table, you have a policy engine that can express things like "editors can update documents in their department, but only if the document is not locked." The permission definition is declarative, type-safe with TypeScript, and lives in a single configuration that drives everything from your UI component visibility to your database query filtering.

That last point deserves emphasis. One of the most powerful patterns covered here is building a function that automatically converts your ABAC permission conditions into database query syntax. This eliminates the classic problem where you have one set of permission logic in your application code and a completely different set of WHERE clauses in your database queries. Change a permission once, and both your access control and your data filtering update together. That is the kind of architectural win that pays dividends for years.

The evaluation also covers CASL, a popular third-party authorization library. The tradeoff is real: CASL gives you built-in support for advanced conditions and less TypeScript boilerplate, but it relies heavily on classes, which creates friction in React Server Components and modern Next.js environments. It also provides less type safety compared to a hand-rolled system. There is no universally correct answer here, and that honesty is refreshing.

One thing worth calling out that does not get enough attention: the "fail closed" principle. Your permission system should deny access by default and only grant it when explicitly allowed. This sounds obvious, but the natural tendency when writing scattered if checks is to fail open, to forget a check and accidentally give users access they should not have. A centralized system makes fail-closed the default behavior, which is exactly what you want.

For architects and team leads, the practical takeaway is this: if your application has outgrown simple role checks and you are finding permission logic duplicated across your codebase, it is time to invest in a proper authorization architecture. Start with centralizing into a services layer, implement RBAC as your baseline, and migrate to ABAC when your permission requirements start depending on resource attributes. The upfront investment is significant, but the alternative is a permission system that becomes increasingly fragile and insecure as your application grows.

**Key takeaways:**
- Centralize all permission logic into a services layer before implementing any access control pattern -- this is the non-negotiable foundation
- RBAC works well for simple role-based scenarios but breaks down when permissions depend on resource attributes like ownership, status, or department
- ABAC combines subject, resource, action, and environment to express fine-grained permissions declaratively with full type safety
- Converting ABAC conditions directly into database queries eliminates duplicate permission logic between application code and data access
- Field-level permissions let you control not just whether a user can access a resource, but which specific fields they can read or modify
- The "fail closed" principle -- deny by default -- is much easier to enforce with a centralized permission system
- CASL offers a solid third-party alternative with tradeoffs around class-based architecture and React Server Component compatibility

**Tradeoffs:**
- ABAC provides fine-grained, attribute-aware permissions but introduces significantly more TypeScript complexity and may be overkill for smaller applications
- Using a third-party library like CASL reduces implementation effort but sacrifices type safety and creates compatibility issues with React Server Components
- Centralizing permissions into a services layer improves security and maintainability but adds an abstraction layer that increases initial development time

**Link:** [Permission Systems that Scale](https://frontendmasters.com/courses/permission-systems/)
