---
title: "Parse, Don't Guess: Why Your JSON Deserializer Shouldn't Be Making Decisions For You"
excerpt: "A deep dive into why automatic type coercion in JSON parsing leads to performance nightmares, and how explicit upcasting and downcasting patterns solve both type mapping and schema versioning in one elegant move."
publishedAt: "2026-03-02"
slug: "parse-dont-guess-json-deserializer-upcasting-schema-versioning"
hashtags: "#substac #typescript #javascript #architecture #performance #backend #engineering #open-source #event-sourcing #databases #generated #en"
---

## Parse, Don't Guess

**TLDR:** Automatically converting all numeric strings to BigInts during JSON deserialization caused CPU freezes in production because regex checks ran against every string in every document on every request. The fix was not a better regex but removing the guessing entirely and replacing it with explicit upcast/downcast functions that only transform the fields you declare, which also unlocked proper schema versioning for free.

**Summary:**

Here is a story that should make every developer who has ever written a "clever" shortcut feel both seen and slightly uncomfortable. Oskar Dudycz, the author behind Emmett and Pongo (event store and document database tools for TypeScript), ran into a problem that most JavaScript developers have danced around: JSON only has six data types, and none of them are BigInt or Date. When you are working with event sourcing and need to track stream positions as big integers stored as strings, you eventually need to get those values back out as actual BigInts. The quick solution was a JSON reviver function that ran a regex against every string value during deserialization, checking if it looked like a number and converting it to a BigInt. This was plugged into the node-postgres driver, meaning it ran on every JSONB column on every query on every concurrent request. A user benchmarked it and found CPU freezes.

The instinct here would be to optimize the regex or replace it with a simpler string check. But that is treating the symptom. The actual mistake was asking the deserializer to guess what your schema looks like. The database driver has no idea whether "90210" is a zip code or a BigInt. There is no right guess at that level. The article makes an excellent point that this is fundamentally a schema problem being solved without a schema.

The solution was upcasting: explicit functions that define the stored shape and the application shape separately, with a transformation function between them. For Pongo (the document database layer), this means you declare upcast and downcast functions per collection. The upcast converts stored strings to Dates or BigInts only for the fields you specify. The downcast writes both old and new shapes for backward and forward compatibility. For Emmett (the event store), upcasting runs per event type when reading streams, handling both type coercion and structural schema changes in the same code path.

What makes this story worth paying attention to is the compounding effect. The regex hack was occupying the architectural slot where upcasting should have lived. Once it was removed, the performance problem disappeared and the door opened to proper schema versioning, backward compatibility, and forward compatibility, all using the same pattern. The simple string-to-Date mapping and a full structural migration from flat fields to nested objects flow through the same function signature. Right decisions stack in ways you cannot predict upfront.

The author is honest about something that many architecture writers avoid: the shortcut was not entirely wrong. It followed Kent Beck's "make it work, make it right, make it pretty" sequence. The regex made it work. Living with the shortcut built the understanding needed to design the proper solution. The danger is not in taking shortcuts but in never coming back to fix them.

**Key takeaways:**

- JSON has only six data types (string, number, boolean, object, array, null), so BigInts and Dates must always be explicitly handled during deserialization
- Running regex checks on every string in every JSON document at the driver level causes CPU event loop freezes under concurrent load
- The "parse, don't validate" principle means making type expectations explicit in code rather than guessing from raw data shapes
- Upcast functions transform stored data into application types on read; downcast functions write backward-compatible shapes on write
- Storing both old and new field structures simultaneously enables rolling deployments without breaking older consumers
- For event sourcing, upcasting is especially critical because events are immutable and cannot be migrated in place
- The same upcast/downcast pattern handles simple type coercion (string to Date) and full structural schema migrations (flat to nested)
- Right architectural decisions compound: fixing the parsing approach also unlocked schema versioning for free
- Shortcuts are acceptable as long as you treat them as temporary and come back to do it properly

**Tradeoffs:**

- Gain explicit control over type mapping and schema versioning but sacrifice the convenience of automatic type detection across all fields
- Gain runtime performance by only transforming declared fields but sacrifice the "it just works" developer experience for users who must now opt in to BigInt and Date parsing
- Gain backward and forward compatibility through dual-shape storage but sacrifice storage efficiency by writing redundant fields during the migration period

**Link:** [Parse, Don't Guess](https://www.architecture-weekly.com/p/parse-dont-guess)