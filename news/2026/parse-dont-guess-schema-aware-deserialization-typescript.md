---
title: "Parse, Don't Guess: Why Schema-Aware Deserialization Beats Regex Hacks in TypeScript"
excerpt: "A deep dive into replacing global regex-based JSON parsing with explicit upcast/downcast patterns for bigints and dates in TypeScript event stores and document databases."
publishedAt: "2026-03-02"
slug: "parse-dont-guess-schema-aware-deserialization-typescript"
hashtags: "#substac #typescript #javascript #architecture #nodejs #postgresql #performance #backend #database #generated #en"
---

## Parse, Don't Guess: Schema-Aware Deserialization in TypeScript

**TLDR:** A global regex hack for converting JSON strings to bigints caused CPU freezes in a Node.js event store and document database. The fix was not a better regex but a fundamental shift: moving type conversion from the database driver layer to an explicit upcast/downcast pattern where the schema lives, which also unlocked schema versioning for free.

**Summary:**

Here is a story about one of those shortcuts that seems fine until it bites you. JSON has exactly six data types, and neither bigints nor dates are among them. If you work in a strongly typed language like C# or Java, your serializer handles the mapping from strings to proper types behind the scenes. In JavaScript and TypeScript, you are on your own. Types exist only at compile time and get erased at runtime, which is precisely where parsing happens. This gap between what JSON can represent and what your application actually needs is where the trouble started.

The author was building Emmett, an event store, and Pongo, a document database that uses PostgreSQL and SQLite as document stores with MongoDB-like query syntax. Both libraries need to handle bigints for stream positions and global positions in event logs. The initial approach was clever in a dangerous way: plug a custom reviver into JSON.parse that tests every string with a regex to see if it looks like a number, and if so, convert it to a BigInt. This ran globally at the database driver level, meaning every single string field in every document and every event on every concurrent request went through that regex check. A user named Dawid ran benchmarks and discovered the approach was freezing the Node.js event loop. The JavaScript runtime does not appreciate CPU-heavy work scattered across every deserialization path.

The real mistake was not the regex itself but the attempt to solve a schema problem without any schema. The database driver has no idea whether the string "928391" is a bigint representing a stream position or a zip code that happens to be numeric. Guessing at that level will always produce wrong answers for some cases. The author considered several band-aids: replacing the regex with a simpler string check, encoding bigints with a prefix like "_bigint:928391", or wrapping them in nested objects. All would fix performance. All would perpetuate the same fundamental error.

The proper solution was upcast and downcast functions defined at the collection or event stream level, where the schema is actually known. In Pongo, you declare the stored shape and the application shape as separate TypeScript types, then provide a plain function that maps between them. Instead of running a regex against every string, you call new Date or BigInt only on the specific fields you declared. This is cheap, targeted, and does not touch the event loop. For documents, you get both directions: upcast on read, downcast on write. For events in an append-only log, upcasting is the primary tool since you never modify stored events.

What the author is not fully confronting is the broader TypeScript ecosystem problem this exposes. The community has largely settled on runtime validation libraries like Zod and Valibot for the parse-dont-validate pattern at API boundaries, but the same rigor is rarely applied at the database boundary. Most TypeScript developers trust their ORM or driver to handle the mapping and never think about what happens when JSON's six types meet their application's richer type system. The upcast/downcast pattern described here is essentially what every database access layer should provide, yet it remains a custom solution rather than a standard expectation. Kent Beck's "make it work, make it right, make it pretty" progression is a good framing, but it also serves as a convenient rationalization for shipping known shortcuts. The discipline is in actually coming back to make it right, which most teams never do.

For architects and teams: the pattern of separating stored shape from application shape with explicit transformation functions is applicable far beyond this specific bigint problem. It is the same pattern you need for API versioning, event schema evolution, and any situation where your data outlives the code that wrote it. If your team is doing any form of event sourcing or document storage in TypeScript, consider making upcast/downcast a first-class concept in your data access layer rather than treating serialization as a solved problem.

**Key takeaways:**

- JSON has only six data types; bigints and dates require explicit handling that should live at the schema level, not the driver level
- Global regex-based type conversion in JSON.parse revivers can freeze the Node.js event loop under concurrent load
- The upcast/downcast pattern moves type conversion to where schema knowledge exists, making it both faster and correct
- The same upcast mechanism that fixes type mapping also enables structural schema versioning with backward and forward compatibility
- Backward compatibility (upcast) lets new code read old data; forward compatibility (downcast) lets old code read new data
- Shortcuts are acceptable if you actually come back and replace them, but most teams never do

**Tradeoffs:**

- Explicit upcast/downcast per collection gives correctness and performance but sacrifices the convenience of automatic global type conversion
- Opt-in bigint/date parsing preserves backward compatibility for existing users but requires new users to discover and configure the feature
- Storing both V1 and V2 field shapes in downcasted documents enables gradual migration but increases storage size and document complexity

**Link:** [Parse, Don't Guess](https://www.architecture-weekly.com/p/parse-dont-guess)