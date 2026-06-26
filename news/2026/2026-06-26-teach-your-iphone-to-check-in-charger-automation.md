---
title: "Teach Your iPhone to Check In: Building a Charger-Triggered Location Automation"
excerpt: "A practical iPhone Shortcuts automation that sends your phone's location and a front-camera photo whenever it gets plugged into a charger."
publishedAt: "2026-06-26"
slug: "teach-your-iphone-to-check-in-charger-automation"
hashtags: "#TechTiff #iPhone #Shortcuts #Automation #Privacy #iOSTips #MobileProductivity #generated #en"
source_pattern: "TechTiff"
---

## Teach Your iPhone to Check In When Plugged In

**TLDR:** Using the iPhone Shortcuts app, you can build an automation that fires the moment your phone gets plugged into a charger. It takes a front-camera photo, grabs your current location, and sends both to you or an emergency contact. You flip it on before a trip, off when you get home.

**Summary:**

Your iPhone already knows where it is. It has a camera, a GPS chip, and multiple ways to send you a message. What it lacks, by default, is a protocol. This shortcut gives it one.

The automation is straightforward in concept. You create a new automation in the Shortcuts app, set the trigger to "Charger: Is Connected," and configure it to run immediately in the background with no notification to the user. The first two actions intentionally override network state: they turn Airplane Mode off and turn Cellular Data on. This is the clever part. If someone swiped your phone and tried to cut off its signal before plugging it in to charge, these steps silently undo that before anything else runs. If nothing was tampered with, they just fire and cost you nothing. It is a small piece of defensive engineering that takes about two seconds to think through and zero seconds to regret including.

From there, the shortcut takes a front-camera photo with the preview hidden, so the process is invisible to whoever is holding the phone. Location gets pulled either from the photo's embedded EXIF data (if you have Location Services enabled for the Camera app) or from a separate Get Current Location action set to Best precision. Then the shortcut fires off an email, a text, a note, or an iCloud upload, whatever channel makes sense to you. The author sends herself an email with location and photo attached. That is a completely reasonable choice.

One thing worth calling out: iOS now shows a notification when an automation accesses the camera in the background. Apple added that transparency feature intentionally, and it means anyone picking up your phone will see a brief system alert. That is actually fine. The automation is not trying to be covert in a harmful way; it is trying to document who handled your device. The notification is a small side effect you accept.

The mental model for using this is important. This is not something you leave enabled at all times. It runs while you travel. Before a trip, enable it. When you land back home, disable it. That operating discipline keeps it purposeful and avoids accumulating a pile of location-and-photo emails from your own kitchen counter.

**Key takeaways:**
- The "turn off Airplane Mode and turn on Cellular Data" steps at the start are the smartest part of the whole automation. They pre-empt the most obvious theft countermeasure.
- iOS will show a camera-access notification when the shortcut runs in the background. This is expected behavior, not a bug.
- You only need one of two location methods: pull coordinates from the photo's EXIF data if Camera location is enabled, or use Get Current Location if it is not.
- This shortcut is intentionally manual to enable and disable. Treat it as travel mode, not always-on surveillance of yourself.
- The Shortcuts app supports sending the result to texts, notes, shared albums, or iCloud in addition to email.

**Why do I care:** As someone who has spent time thinking about automation and developer experience, I find this shortcut genuinely interesting for a reason that goes beyond the travel use case. It is a clean example of composing basic primitives, network state, camera, location, messaging, into a meaningful behavior without writing a single line of code. The network reset step at the beginning is the kind of defensive thinking that a good developer would call "handling the unhappy path first." Most Shortcuts tutorials skip the edge cases. This one addresses the exact scenario the feature was built for. If you are building automation workflows for non-technical users, this is the pattern worth studying: short, single-purpose, with a clear on/off operating model and no ambient data collection. I would use this.

**Link:** [Teach Your iPhone to Check In](https://techtiff.substack.com/p/iphone-charger-automation?publication_id=4799331&post_id=203637488&isFreemail=true&triedRedirect=true)
