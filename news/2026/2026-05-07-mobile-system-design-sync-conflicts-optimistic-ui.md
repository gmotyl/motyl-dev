---
title: "Mobile System Design: Sync, Conflicts, and the Art of Lying to Your Users"
excerpt: "A deep dive into 20 mobile system design concepts covering conflict resolution, delta sync, eventual consistency, background retry queues, and optimistic UI updates."
publishedAt: "2026-05-07"
slug: "mobile-system-design-sync-conflicts-optimistic-ui"
hashtags: "#neokim #mobiledev #systemdesign #sync #offlinefirst #generated #en"
source_pattern: "NeoKim"
---

## Conflict Resolution Strategies in Mobile Apps

**TLDR:** When users edit data offline on multiple devices simultaneously, conflicts arise. Mobile systems resolve these with last-write-wins, versioning, or CRDTs, each carrying real tradeoffs around data loss and implementation complexity.

**Summary:** The conflict problem sounds theoretical until you actually lose two hours of work because two users edited the same document and the system silently picked one version over the other. This is the unglamorous reality of distributed mobile systems, and it's one of those areas where the naive solution ships fast and the bug reports arrive six months later.

Last-write-wins is exactly what it sounds like: whoever has the most recent timestamp wins. Simple to build, dangerous in practice. Timestamps on client devices are notoriously unreliable. Users travel across time zones, devices drift, and nobody told their phone to sync with NTP before they went offline on a plane. The implementation looks clean until you realize you're trusting data from the same devices you're trying to sync.

Versioning adds a layer of honesty. Each update carries a version counter or device identifier, so the system can at least acknowledge that two different histories exist and either merge them automatically or surface the conflict to the user. Figma and Notion went further, adopting CRDTs, conflict-free replicated data types, which use mathematical guarantees to merge concurrent changes without any conflict in the first place. CRDTs are genuinely clever, but they're also complex to implement correctly and don't apply cleanly to every data shape. A collaborative text editor and a financial transaction record have very different consistency needs.

Dropbox took a pragmatic middle path: it produces a "conflicted copy" file when it can't merge cleanly, which puts the resolution burden on the user. That's sometimes the right call. Surfacing ambiguity is more honest than silently overwriting it.

**Key takeaways:**
- Last-write-wins is fast to implement but loses data when client clocks are unreliable
- CRDTs provide automatic merging for collaborative data but carry significant implementation complexity
- Surfacing conflicts explicitly to the user is sometimes the most correct option, not a cop-out

**Why do I care:** In my experience, conflict resolution is where product decisions and engineering decisions collide. Engineering can implement any of these strategies, but which one is right depends entirely on what data loss means for your specific app. Financial apps cannot accept silent overwrites. Collaborative editors cannot afford blocking UX. The mistake I see most often is choosing a strategy based on implementation convenience rather than data semantics. Get alignment on acceptable loss before you write a line of code.

**Link:** [Mobile System Design Concepts](https://newsletter.systemdesign.one/p/mobile-system-design-concepts)

---

## Delta Sync: Only Sync What Changed

**TLDR:** Delta sync sends only new or changed records since the last sync, using server-issued tokens to track state, dramatically reducing bandwidth and battery usage compared to full dataset downloads.

**Summary:** The first-pass solution for syncing a contacts app is to download all contacts every time. It works, it's simple, and it absolutely destroys performance at scale. When your user has 5,000 contacts and the app syncs in the background every 15 minutes, you're burning battery and bandwidth on data that hasn't changed. Delta sync is the grown-up answer.

The mechanism is straightforward. On first sync, the app downloads everything. The server then returns a sync token or timestamp representing the current state. Every subsequent sync sends that token back to the server, which returns only the records that changed since then. Google Contacts uses a syncToken for exactly this purpose. Apple CloudKit uses a serverChangeToken. The concept is identical; only the naming differs.

The tricky part is deletions. You cannot simply delete a record from the server and expect clients to notice its absence. Instead, you keep tombstone records, markers that say "this thing used to exist and was deleted." Clients read the tombstone, remove the item locally, and eventually the tombstone itself can be cleaned up. It's extra storage and extra logic, but there's no clean alternative.

One detail worth emphasizing: the sync token or timestamp must come from the server, not the client. Client clocks are untrustworthy. If you let clients define their own timestamps, you will eventually have a device with a misconfigured clock that either skips updates or re-downloads everything from the beginning of time. Server-controlled sequencing is not optional, it's load-bearing.

**Key takeaways:**
- Delta sync uses server-issued tokens to track what changed, not client timestamps
- Deletions require tombstone records so clients know to remove locally cached items
- The efficiency gains compound quickly as dataset size grows

**Why do I care:** Delta sync is one of those patterns that looks like an optimization but is actually a correctness requirement. If you're building an offline-capable app and you're doing full dataset downloads, you're going to have problems at scale that are hard to fix after the fact. The sync token pattern should be in the architecture from day one, not added as a performance patch when users start complaining about battery drain.

**Link:** [Mobile System Design Concepts](https://newsletter.systemdesign.one/p/mobile-system-design-concepts)

---

## Eventual Consistency: Accepting Temporary Truth

**TLDR:** Mobile apps embrace eventual consistency by updating the local UI immediately while server sync happens in the background, accepting that different devices may temporarily show different data.

**Summary:** Eventual consistency is one of those concepts that sounds like a failure mode but is actually the deliberate design. The alternative, waiting for server confirmation before showing anything to the user, makes apps feel sluggish in ways that are hard to explain but immediately noticeable. Users abandon slow apps. So we accept temporary divergence.

WhatsApp's check mark system is the canonical illustration. A single tick appears the moment you send a message from your device. A double tick arrives when delivery is confirmed. The message shows up in your chat immediately, before any server has confirmed anything. That's eventual consistency made visible. The UI is confidently showing you something that hasn't been globally agreed upon yet, and it corrects itself as the system catches up.

The real engineering work in eventual consistency is handling the cases where catch-up doesn't go smoothly. The server might reject a change. Two updates might conflict. A sync might fail three times before succeeding. Apps need to express these intermediate states clearly, showing pending, confirmed, or failed status without confusing users. The worst outcome is silent correction, where the UI snaps to a different state without explaining why. Users perceive this as the app "forgetting" their input.

The underlying principle is that responsiveness is a user experience requirement, not a nice-to-have. The engineering work is making the eventual part invisible whenever possible and graceful when it isn't.

**Key takeaways:**
- Eventual consistency trades immediate global accuracy for local responsiveness
- UI states like pending, confirmed, and failed are necessary, not optional
- Silent corrections after sync failures erode user trust faster than visible error states

**Why do I care:** I've seen teams treat eventual consistency as a compromise or a temporary workaround, planning to "fix it properly" later with stronger consistency guarantees. That's usually the wrong framing. For mobile apps operating on unreliable networks, eventual consistency isn't a limitation, it's the architecture. Building around it intentionally produces better software than pretending you can achieve strong consistency and discovering at runtime that you can't.

**Link:** [Mobile System Design Concepts](https://newsletter.systemdesign.one/p/mobile-system-design-concepts)

---

## Background Sync and Retry Queues

**TLDR:** When network requests fail, a retry queue stores the failed operation locally and replays it when connectivity returns, using platform tools like WorkManager on Android and BGTaskScheduler on iOS.

**Summary:** Users do not care that your network request failed. They tapped "send message" and they expect that message to get sent. If the app silently drops the action because WiFi was spotty for three seconds, that's a product failure, not a network failure. Retry queues exist to bridge the gap between user intent and network reality.

The pattern is straightforward. When a user action triggers a network request and that request fails, the operation goes into a local queue rather than being discarded. When connectivity returns, a background process works through the queue, retrying each operation in order. Once the server confirms success, the item leaves the queue. Gmail and Outlook have done this for years, queuing outgoing emails when offline and sending them automatically when the connection restores.

The platform constraints are real. Android's WorkManager and iOS's BGTaskScheduler are the right tools here, but both impose strict limits on background execution time. The operating system controls how long your app can run in the background, and it is not generous. This means you cannot assume the background sync will complete. The queue must also drain when the user actively opens the app, not only when the background task fires.

There's also a failure mode worth thinking about: what happens when an operation in the queue becomes stale or invalid? If a user queued a message deletion and then the item was deleted server-side by someone else, replaying the deletion might error or conflict. Retry queues need expiry logic and idempotency guarantees on the server side, or you will spend time debugging ghost operations that replay long after they should have been discarded.

**Key takeaways:**
- Retry queues preserve user intent across network failures and replay operations when connectivity returns
- Background sync windows are constrained by the OS; apps must also drain queues on foreground launch
- Operations in the queue need expiry logic and server-side idempotency to avoid stale replays

**Why do I care:** The retry queue is one of those architectural decisions that's much cheaper to add at the start than to retrofit. If your data layer doesn't have a queue abstraction, adding one later means touching every place in the app that makes a network request. I've seen this problem solved with increasingly fragile workarounds instead of properly addressed, and the result is always a patchwork of app-specific retry logic that nobody fully understands. Build the queue. Make it boring. Make it reliable.

**Link:** [WorkManager on Android](https://substack.com/redirect/817535bd-6524-4ccf-bf2e-3c41fbcef045?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

---

## Optimistic UI Updates: Lying Confidently to the User

**TLDR:** Optimistic UI assumes a network request will succeed and updates the interface immediately, rolling back only if the server rejects the operation, making apps feel faster without sacrificing data accuracy.

**Summary:** Calling it optimistic UI always struck me as slightly euphemistic. What you're actually doing is lying to the user, confidently, about something you don't yet know is true. You're showing them the result of an action before any server has confirmed it happened. It works because the optimistic assumption is almost always correct. Most likes do succeed. Most comments do post. The small percentage that fail can be handled with a rollback and a polite error message.

Twitter animates the heart icon the moment you tap it. Instagram shows your comment in the thread immediately. Slack puts your message in the chat before any server has touched it. In all three cases, the app is betting that the operation will succeed, updating the local state and the visible UI, and quietly syncing with the server in the background. If the server agrees, nothing visibly changes. If it doesn't, the UI rolls back.

The rollback is where this pattern earns its complexity cost. A well-executed rollback is smooth and informative: the count reverts, a small notification explains what happened, and the user understands the situation. A poorly executed rollback is confusing and trust-destroying: something changes on screen without explanation, and the user wonders whether their device or the app is malfunctioning. Getting the rollback right is as important as getting the optimistic update right.

This is also why optimistic UI is explicitly not appropriate for irreversible or high-stakes operations. You should not optimistically show a payment as complete before the server confirms it. You should not optimistically delete data that cannot be recovered. The pattern is for low-stakes, high-frequency interactions where speed matters and errors are recoverable. Using it outside those boundaries is where teams get into trouble.

**Key takeaways:**
- Optimistic UI updates the interface immediately and rolls back only on server rejection
- The rollback experience must be smooth and informative, not silent or confusing
- This pattern is inappropriate for irreversible actions like payments, deletions, or financial transactions

**Why do I care:** Optimistic UI is one of the highest-leverage UX improvements you can make to a mobile app, and it's surprisingly underused. Teams default to showing loading spinners because it feels "honest," but users experience that honesty as slowness. The honest thing is to build an app that behaves like the user's actions matter and that handles the rare failure gracefully. That's what optimistic UI does when implemented well. The engineering cost is real but bounded. The UX improvement is immediate and measurable.

**Link:** [Mobile System Design Concepts](https://newsletter.systemdesign.one/p/mobile-system-design-concepts)
