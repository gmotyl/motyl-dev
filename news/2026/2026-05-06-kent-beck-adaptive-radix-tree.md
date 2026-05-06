---
title: "Kent Beck Walks Us Through the Adaptive Radix Tree, One Decision at a Time"
excerpt: "A forthcoming book by Kent Beck introduces the Adaptive Radix Tree data structure by building it incrementally from a naive trie through seven chapters of deliberate design decisions."
publishedAt: "2026-05-04"
slug: "kent-beck-adaptive-radix-tree"
hashtags: "#engineering #architecture #generated #en #datastructures #golang #performance #kentbeck"
source_pattern: "Kent Beck"
---

## Adaptive Radix Tree: Sorted Maps for Fun and Profit

**TLDR:** Kent Beck is writing a book that teaches the Adaptive Radix Tree (ART) data structure by building it incrementally in Go, starting with the simplest possible naive trie and adding one optimization per chapter until the result matches a production-quality implementation. The primer sets up the motivation: why tries are worth knowing, what they trade off compared to hash maps and balanced BSTs, and what the chapter-by-chapter design journey looks like.

**Summary:** The excerpt opens with a simple, honest framing: if you're a Go programmer who has reached for a sorted map, maybe grabbed google/btree or a red-black tree library, and wondered whether there's something better suited to byte-keyed workloads, this book is for you. Kent starts not with the ART itself but with the foundational question of what a sorted map even is. The answer matters because the three common approaches, hash maps with a manually maintained sorted index, self-balancing binary search trees, and tries, make radically different tradeoffs that are worth understanding before you reach for any one of them.

The trie's core insight is elegant: stop comparing keys. Where a B-tree reads both bytes of a key and compares them as opaque blobs, a trie walks keys byte-by-byte and follows labeled edges. There is no comparison operation at all. This gives you sorted iteration automatically, because you just visit children in ascending byte order, and it gives you shared work for shared prefixes, because a lookup of "help" and "hello" traverse the same four edges before diverging. These are real properties, not marketing language. Kent names the two scholars who invented and named the structure in 1959 and 1960, which I appreciate. Origin stories ground ideas in their historical context rather than presenting them as timeless truths floating in the void.

The honest tradeoffs are also named directly. A 16-byte key means 16 pointer dereferences. If the tree exceeds your L1 cache, that is 16 cache misses per lookup. A sparse key set produces a lot of wasted nodes, and the naive chapter-one implementation takes roughly 33 megabytes to store a thousand random 16-byte keys. Kent calls this "a useful disaster," which is one of the better teaching framings I've seen. The disaster is instructive because it makes the problem visible before any solution is applied.

The book's structure follows David Parnas and Paul Clements's 1986 paper on faking a rational design process, meaning the chapters are written as if each optimization was chosen in a clean, logical sequence, even though real design rarely works that way. That's an intellectually honest thing to acknowledge upfront, and it means the book is teaching design reasoning alongside data structure mechanics. The seven chapters after the naive baseline each introduce exactly one decision: lazy expansion, path compression, a small node type for sparse branches, polymorphism to prepare for more node sizes, two intermediate node sizes trading space for compute, and finally a polish pass that drops allocations per key to roughly one.

The original ART paper by Leis, Kemper, and Neumann from ICDE 2013 is cited and linked directly. This is a proper technical introduction, not a blog post that gestures at academic work without naming it. The framing "by chapter 8 you will have built it, decision by decision, and you will have measured what each decision was worth" is exactly the kind of outcome a reader wants to know upfront.

**Key takeaways:**
- Tries eliminate key comparisons entirely by walking keys byte-by-byte along labeled edges, which gives sorted iteration and shared prefix traversal for free.
- The naive trie is intentionally wasteful, roughly 33 MB for a thousand 16-byte keys, and each of the seven subsequent chapters addresses one specific performance or memory problem.
- The book is structured as a fake rational design process, acknowledging that real design is messier but teaching through a clean incremental sequence.
- The original ART paper (Leis, Kemper, Neumann, ICDE 2013) is freely available at db.in.tum.de and is cited directly.
- Path compression and polymorphic node sizing are the two biggest levers for collapsing memory waste and pointer-chasing overhead.

**Why do I care:** For frontend architects working on applications at scale, most of the time a hash map or a library B-tree is the right call and you move on. But if you're building an in-memory index, a routing table, a prefix-search autocomplete, or any structure where key iteration order matters and keys share prefixes, the ART is the kind of structure that can change your performance story meaningfully. More than the specific data structure, though, what's worth stealing from this preview is the pedagogical pattern: build the thing that obviously fails, measure it, then fix exactly one thing per iteration. That's a transferable discipline for any system design work, and seeing it applied to something as concrete as a trie makes it easier to internalize.

**Link:** [Adaptive Radix Tree](https://tidyfirst.substack.com/p/adaptive-radix-tree)
