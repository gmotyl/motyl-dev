---
title: "A network state, a jailbroken Kindle and how Tor actually works"
excerpt: "A city council dismantled the most influential political theory in Silicon Valley in 24 hours, someone put Tailscale on a Kindle, and a clear walkthrough of onion routing."
publishedAt: "2026-09-09"
slug: "network-state-jailbroken-kindle-tor-architecture"
hashtags: "#HackerNoon #security #privacy #web3 #networking #linux #open-source #architecture #generated #en"
source_pattern: "HackerNoon"
---

## Balaji Srinivasan has no army

**TLDR:** A long essay on the network state, built around one fact. On July 22, 2026, a municipal council in Johor revoked the licence of Balaji Srinivasan's Network School and took the signs down. A two year civilization was disassembled in about a day, using a stamped notice about approved use of premises.

**Summary:** The setup is deliberately unfair to the subject and then the essay spends several thousand words being fair to him, which is why it works. Srinivasan had everything a country has except one thing. Four hundred people who had flown in. A campus with beds and a canteen. A currency no central bank issued and a coin bounty paid daily for shipping code before lunch. A curriculum, a gym, biometric dashboards on four hundred wrists, a vocabulary, in jokes an outsider could not parse, millions of followers and hundreds of millions in capital. No army. He would say that is the entire moral innovation, and the essay agrees that it is the point. It is also the reason men on ladders took his signs away.

The author is careful to establish that Srinivasan is not a grifter, and this matters because the caricature is what keeps getting him underestimated. Stanford several times over, former a16z general partner, former Coinbase CTO, once on a shortlist to run the FDA. He read the pandemic early and read the collapse of institutional credibility early. His actual gift is looking at a system everyone treats as furniture and asking why it is there.

The theory rests on the distinction between political truth and technological truth. A political truth is true because enough people believe it. The dollar has value, that border is real, that man is president. Withdraw belief and the fact evaporates. A technological truth holds whether or not anyone believes it. The hash matches or it does not. The argument is that the twenty-first century belongs to institutions built on the second kind, and legacy states are running on borrowed faith. The essay grants that this is a genuinely profound observation and then names the sleight of hand precisely. It is perfectly true that a signature verifies or it does not. It is not remotely true that whether a piece of land belongs to you is that kind of fact. A blockchain is a perfect record of a claim, not a claim on reality. It cannot prove the seller had title, that the sale was legitimate, or that the villagers who farmed the plot for four generations were consulted.

The One Commandment section is where the political critique lands hardest. The legacy state, in Srinivasan's telling, staples three hundred million people who agree on nothing to a landmass and demands a single policy on abortion, producing a permanent low grade civil war conducted quarterly in prime time. The network state's answer is one founding proposition from which the whole culture derives. Reduce the number of camps to one and the friction vanishes. The essay's reply is that a polity organized around total ideological alignment has no mechanism for the person who changes their mind, and that pluralism is not an inefficiency a better protocol optimizes away. Legacy democracies are ugly, slow and full of people you cannot stand, and that is the load bearing wall.

What makes the piece worth your time is that it does not end on the critique. Twenty-four hours after the council acted, Srinivasan announced a five year memorandum of understanding with Kazakhstan's Ministry of Artificial Intelligence and Digital Development. Expedited visas, corporate redomiciliation, a global AI hub. Cloud first, land last, and when the land is repossessed you requisition new land in a country with more electricity and fewer opinions. The essay is honest that this is either the most impressive or the most damning fact in the story depending on what you think a country is. The works cited list runs to dozens of sources including the arbitration filings from the Prospera case in Honduras, which is the part most coverage of this movement skips.

**Key takeaways:**
- The Network School's licence was revoked and its signs removed on July 22, 2026, by the Iskandar Puteri City Council
- The theory's core move is treating land title as a technological truth when it is a political one
- Srinivasan swapped the lone sovereign of The Sovereign Individual for a sovereign collective, which is what makes the idea durable
- The One Commandment removes internal conflict by removing the possibility of internal disagreement
- The relocation to Kazakhstan was announced the same day, which either vindicates or refutes the whole thesis

**Why do I care:** This is primarily a politics and governance story, and developers should read it anyway because the technological truth argument is one we make constantly in weaker forms. Every time someone claims a system is trustless, or that a signature settles a dispute, or that code is law, they are running the same move the essay dismantles. Cryptographic certainty about a record is not certainty about the world the record describes, and that gap is where every real system fails. If you build anything involving identity, ownership or provenance, this is the clearest writeup of that gap I have read.

**Link:** [Balaji Srinivasan Has No Army](https://hackernoon.com/balaji-srinivasan-has-no-army)

## Putting Tailscale on a jailbroken Kindle

**TLDR:** A walkthrough of jailbreaking a Kindle and running Tailscale on it, which gets you SSH access, Taildrop file transfers straight into the documents folder, and KOReader. The author wrote part of the article on the Kindle itself with a Bluetooth keyboard.

**Summary:** The proof is buried in the middle and it is the best part. The author wrote two paragraphs of the article on an eleventh generation Kindle using the open source Textadept editor, a Bluetooth keyboard and Tailscale to move the draft file around. On a stock Kindle none of that is possible, including the file transfer.

Jailbreaking here means removing manufacturer software restrictions, typically by gaining root, so you can run unapproved software. The Kindle keeps the standard reading experience including the Amazon store and Libby delivery, and gains everything else. The current unlocking method is called AdBreak and works through Amazon's own lockscreen ads on firmware from 15.18.1 through 5.18.5.0.1, with WinterBreak covering older versions. If your Kindle has been on wifi it may have already updated past both, and the advice is to put it in airplane mode immediately if you think it still has a chance. The usual warnings apply about bricking the device and voiding the warranty.

Tailscale is not required for a jailbroken Kindle, it just removes most of the friction. You get a persistent 100.x address instead of another 192.168 number to remember, SSH by MagicDNS so you can type ssh root@kindle, and Taildrop for pushing files into whatever directory you choose. The setup involves installing KUAL, the Kindle Unified Application Launcher, plus the MobileRead Package Installer, a hotfix that disables over the air updates so the jailbreak survives, and a simple USB networking package. Then you pick between the standard Tailscale repository and a fork that adds Taildrop, drop the arm binaries into the extension folder, paste a reusable pre-approved auth key into a text file, and set the Taildrop directory to the documents folder. Once the Kindle shows up in the admin console the last step is disabling key expiry, otherwise you get to edit a text file on an e-ink screen every few months.

What you get out of it is worth more than the novelty. KOReader replaces the reading experience with something configurable and handles epub, PDF, comic archives and DjVu. The Kindle can serve as a Home Assistant dashboard through the Shortcut Browser, or pull books from a self hosted Calibre-Web instance, both of which need a proxy mode added in a later update. The author's favorite moment is the small one. He bought a DRM free epub on his phone at a train station, and when he got home he sent it to the Kindle over Taildrop and tapped receive. No cable, no email to kindle address, no Amazon in the loop at all.

**Key takeaways:**
- AdBreak covers firmware 15.18.1 through 5.18.5.0.1, WinterBreak covers older, and an auto updated Kindle may be past both
- Tailscale gives you a persistent address, ssh root@kindle by MagicDNS, and Taildrop into any directory
- The Taildrop enabled fork of the Tailscale KUAL repository is the one worth starting with
- The device stays a normal Kindle, including the Amazon store and Libby delivery

**Why do I care:** Nothing here changes how you build software, and it is a good weekend reminder that a device you own can be a computer rather than a store terminal. The practical value for a developer is the DRM free workflow, since buying an epub directly and dropping it onto the device removes a middleman from something you do often. Read the documentation for each tool before you start rather than following any single guide, including that one. Firmware version is the whole game and getting it wrong is how you brick the thing.

**Link:** [Let's put Tailscale on a jailbroken Kindle](https://hackernoon.com/lets-put-tailscale-on-a-jailbroken-kindle)

## How Tor actually hides you

**TLDR:** Part three of a series, and the clearest explanation of onion routing I have read. It covers circuits, the three relay roles, the telescoping key exchange, exit policies, and how hidden services give the destination anonymity too.

**Summary:** The structure comes straight from the name. Tor is a router and an onion, and the article takes them in that order. As a router, your Onion Proxy first asks the Directory Authorities, a set of semi trusted servers holding the list of every relay, then picks three at random and builds a circuit through them. The roles are guard, middle and exit. Each relay knows only the one before it and the one after. The guard knows who you are and not where you are going. The middle knows neither, it just forwards. The exit knows where you are going and not who you are, and it is the only relay that touches the public internet, which is why anyone watching it sees the exit node making the request. Since every relay carries hundreds of users at once, everyone looks the same.

The onion half is the encryption. Tor uses TCP with an extra block called a relay cell attached, and that cell is the thing wrapped in layers. The clever part is how the keys get established without revealing you. The Onion Proxy telescopes the connection outward, extending it one hop at a time, and runs a separate Diffie-Hellman exchange with each relay. The obvious problem is that Diffie-Hellman normally needs both public keys, which would expose you. Tor solves this with single entity authentication, where only the relay proves its identity and you use its public key rather than your own. To reach the middle node, the proxy sends a relay cell instructing the guard to extend the connection, with the key exchange contents encrypted to the middle node's public key so the guard cannot read it. Repeat once more for the exit. You end up with three separate symmetric keys and independent control of every relay in the circuit.

That independent control produces something called the leaky pipe topology. Because you hold a separate key for each node, you can instruct the middle node to exit the connection before it ever reaches the exit node, turning a three hop circuit into two. The design intent was to frustrate anyone watching the exit, since a connection that ends early gives them nothing. The cost is that you become unusual by taking two hops instead of three, which draws exactly the attention you were avoiding. So it is not offered as a general feature. The article explains one legitimate use, which is bypassing an exit node whose exit policy refuses to route where you are going. Exit policies exist because exit node operators are the ones who look connected to a crime when something illegal passes through, and that discourages people from running exits at all.

The hidden services section answers the question everyone actually has, which is where the dark web comes from. Everything above protects the visitor. If Bob runs a site, the exit node reveals his server even while Alice stays hidden. Hidden services fix that with a rendezvous. Bob's proxy generates a long term public key, picks relays to act as introduction points, and publishes a signed descriptor to a distributed lookup service indexed by the hash of that key. Alice gets the .onion address out of band, queries the lookup service through a circuit, picks an idle relay as a rendezvous point, and generates a one time cookie. She sends the rendezvous details, half a Diffie-Hellman handshake and the cookie to one of Bob's introduction points. Bob can respond or ignore it. If he responds, he builds his own circuit to the rendezvous point, completes the handshake and presents the cookie, and the rendezvous point splices both circuits into one stream. Neither side learns where the other is. And because the traffic never leaves the Tor network, there is no exit node, so the rendezvous point sits where the exit would be. That is the leaky pipe topology used on purpose.

**Key takeaways:**
- Each relay in a circuit knows only its immediate neighbours, and the exit is the only one that touches the public internet
- Telescoping runs a separate Diffie-Hellman exchange with each relay using single entity authentication, so you never present a key of your own
- Three separate symmetric keys give you independent control of every hop, which is what enables the leaky pipe topology
- Exit policies exist because exit operators carry the legal exposure for everything that passes through them
- Hidden services use introduction points plus a rendezvous point, so both visitor and host stay anonymous, and that dual anonymity is the dark web
- Ephemeral keys mean the session keys are gone when the circuit closes, which is where perfect forward secrecy comes from

**Why do I care:** This is background reading rather than something you will apply on Monday, and the telescoping key exchange is worth understanding regardless of what you build. It is a genuinely elegant answer to establishing shared secrets with several parties where none of them may learn who you are, and that shape of problem shows up in privacy preserving systems well outside Tor. The exit policy section is also a useful corrective if you have ever thought about running a relay, since it explains why exit nodes are the scarce resource and what running one actually exposes you to.

**Link:** [How TOR Hides You - Onion Routing, Circuits and Hidden Services](https://hackernoon.com/how-tor-hides-you-onion-routing-circuits-and-hidden-services-down-the-rabbit-hole-part-3)
