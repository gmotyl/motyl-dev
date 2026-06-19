---
title: "Server-Driven UIs in PHP and Why Your Smart Fridge is a Liability"
excerpt: "Lattice flips the client-server contract by making PHP the UI truth, and a cheap Zigbee plug might be smarter than your $1200 refrigerator."
publishedAt: "2026-06-19"
slug: "server-driven-ui-lattice-php-smart-plugs-2026-06-19"
hashtags: "#dailydev #laravel #inertia #smarthome #zigbee #php #react #homeassistant #generated #en"
source_pattern: "daily.dev"
---

## Lattice: Describe Your Entire UI in PHP, Let React Just Draw It

**TLDR:** Lattice is a new Laravel package that lets you define pages, forms, tables, and actions as PHP classes, serialize them to a typed component tree, and ship that tree over Inertia to a React renderer. The server owns the shape of every screen. React just draws whatever it receives.

**Summary:**

I want to be upfront: this pattern is genuinely interesting and also a little philosophically aggressive. Lattice's premise is that the server should be the single source of truth for what a UI screen *is*, not just what data it contains. You write a PHP class decorated with `#[AsPage]`, build a tree of component definitions, and Lattice serializes that to a typed payload that travels over Inertia like any normal page visit. On the React side, one component receives the tree and resolves each node against a registry. That's it. The client does no logic.

What you actually get from this: forms backed by Laravel validation, Precognition live validation support baked in, Eloquent-backed tables with sorting, filtering, and pagination, and server-side actions that return typed effects. An effect might be a toast notification, a redirect, or a component refresh. The client knows how to handle those effects. It doesn't decide when to trigger them.

The model this reminds me of most is LiveView in Elixir, or server-side Turbo in Rails, but the interesting twist is that Lattice targets React specifically. You're not abandoning React components. You're just demoting the JavaScript layer from "application logic home" to "rendering engine." Whether that tradeoff suits your team depends entirely on how much of your application complexity actually lives in UI orchestration versus domain logic. For internal admin tools, CRMs, dashboards, and anything where the Laravel developer is also the UI developer, I think this is genuinely compelling.

I do want to register one skeptical note. The moment your design team wants something the PHP component tree doesn't support, you're in trouble. Escape hatches exist in every framework like this, but they're always awkward. Lattice is clearly version-zero software, so whether the component registry stays flexible enough to grow with real product needs is an open question. If you've been waiting for a reason to stop writing the same CRUD scaffold for the fortieth time, though, Lattice looks worth an afternoon.

**Key takeaways:**
- Pages are PHP classes with an `#[AsPage]` attribute that build component definition trees
- Inertia ships the serialized tree to a single React entry-point component
- Forms, tables, and actions are all first-class server-defined constructs
- Server-side actions return typed effects (toasts, redirects, refreshes), not raw responses
- The client has zero application logic, it is a pure renderer
- This is early software, escape hatch ergonomics are unproven

**Why do I care:** As a frontend architect, this pattern inverts a bet I see teams make constantly. They put UI structure in React, then spend months syncing that structure with server-side validation, permissions, and state. Lattice bets that for a large class of applications, the PHP developer should own the UI contract entirely. I find that defensible, particularly for teams where the frontend boundary is really just "the thing that makes Laravel data look good." It's not the right model for a product with a dedicated design system team and complex interaction requirements, but it's honest about the tradeoff in a way most frameworks are not.

**Link:** [Lattice: Describe Inertia UIs in PHP](https://laravel-news.com/lattice-describe-inertia-uis-in-php)

---

## Stop Buying Smart Appliances. Seriously. Buy a Dumb Machine and a $15 Plug.

**TLDR:** A Zigbee smart plug attached to a 15-year-old mechanical washing machine gives you everything a $900 "smart" washer does, runs locally, costs $15 to replace, and won't get bricked when the manufacturer shuts down their cloud backend in 2028.

**Summary:**

I have been saying a version of this for years and I am glad Jasmine at XDA put it plainly. The smart appliance industry is, in large part, a scheme to monetize your laundry habits. That $800 washer with Wi-Fi connectivity costs 30% more than the mechanical equivalent, runs on firmware that will receive security patches for two or three years against a hardware lifespan measured in decades, and depends on a cloud backend that the manufacturer can shut down whenever the subscription model stops penciling out. When that happens, your appliance doesn't become "not smart." It may stop working at all.

The smart plug approach is different in kind, not just in degree. You buy any mechanical, durable appliance. You attach a Zigbee or ESPHome plug, which runs locally with no cloud dependency. Then you use the plug's power monitoring to infer machine state from electrical signatures. A washing machine doing a hot wash draws around 1200W. Tumbling is about 300W. Idle is 4W. That signature is consistent enough that Home Assistant can track cycle start and end, calculate your electricity cost per load, and cut power if a leak sensor fires. No cloud. No subscription. The plug costs $15 and is replaceable by anyone.

The amperage detail matters and is worth calling out because people skip it: high-draw appliances need plugs rated for 15A or 16A. A plug rated for a lamp will not survive a dryer. Check the spec sheet before you order. Beyond that, the setup is genuinely straightforward. Map wattage thresholds through a manual cycle run, set your Home Assistant automations, and you're done.

I want to be fair to the counterargument. Some smart appliances do things a plug cannot replicate. A smart dishwasher that delays its cycle until off-peak electricity rates is using firmware logic that monitors your utility's time-of-use pricing. A smart plug doesn't know your electricity rate schedule unless you tell Home Assistant about it explicitly. Most people don't need that feature, but it exists. The broader point from the article still holds: the default should be dumb appliance plus local automation, and you should buy smart appliances only when the specific feature justifies the specific tradeoff. Right now, most people are buying them for app control and then getting app control plus a permanent security vulnerability plus a dependency on a company's continued existence.

**Key takeaways:**
- Smart appliances carry a 30% price premium for connectivity that degrades over the appliance's lifetime
- Cloud-dependent firmware means a manufacturer decision can brick a working appliance
- Mechanical appliances plus a local Zigbee or ESPHome smart plug replicate the core automation use cases
- Power monitoring infers machine state from wattage signatures without any firmware integration
- Always check amperage ratings: high-draw appliances need 15A/16A rated plugs
- Local-first protocols (Zigbee, ESP32 with Tasmota/ESPHome) work offline and are not subject to cloud shutdowns
- Home Assistant can track cycles, calculate costs, and integrate with leak sensors using this data

**Why do I care:** This is a systems design argument as much as a home automation one. The principle of owning your own infrastructure, keeping dependencies replaceable, preferring local state to remote state, preferring open protocols to vendor lock-in: those are the same principles I apply to software architecture. A $15 plug I can swap in ten minutes is better than a $200 "smart" component that requires a vendor relationship to function. The appliance industry learned to charge for connectivity without committing to maintaining it. The response is to treat connectivity as your own concern, not theirs.

**Link:** [Smart plugs are replacing smart appliances](https://www.xda-developers.com/stop-buying-smart-appliances-and-start-buying-smart-plugs)
