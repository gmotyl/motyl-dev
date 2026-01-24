---
title: 'This Week In React #265: Agent Skills, Firefox 147, View Transitions, Node.js 25.4, React Native Harmony'
excerpt: 'AI agent skills ecosystem emerges, Firefox 147 unlocks View Transitions and CSS anchor positioning, Node.js marks require(esm) stable, React Native expands to HarmonyOS'
publishedAt: '2026-01-21'
slug: 'this-week-in-react-265-agent-skills-firefox-147-view-transitions-nodejs'
hashtags: '#thisweekinreact #react #react-native #javascript #nodejs #firefox #css #ai #agents #frontend #webdev #generated #en'
---

## TLDR

The React ecosystem sees major developments across multiple fronts. A new AI agent skills specification gains traction with platforms like Skills.sh, Firefox 147 finally enables View Transitions and CSS anchor positioning across all browsers, Node.js 25.4 marks `require(esm)` as stable, and React Native expands to HarmonyOS. The convergence of AI tooling with established frameworks signals an interesting shift in how developers will interact with their tools.

---

## AI Agent Skills: A New Ecosystem Emerges

The Anthropic skills specification is reshaping how AI agents acquire capabilities. Rather than loading everything upfront, skills enable progressive disclosure—lazy-loading only what's needed to keep context efficient. This week saw explosive growth:

**Skills.sh** launched as a discovery platform, already tracking thousands of installations across React, Expo, marketing, and security domains. The leaderboard shows `vercel-react-best-practices` leading with 25.9K installs, followed by `web-design-guidelines` at 19.6K.

Notable skill collections:
- **Vercel**: React and Next.js best practices
- **Expo**: Development client, API routes, deployment workflows
- **Callstack**: React Native optimization techniques
- **Remotion**: Video generation with React (3.7K installs and trending)

The implications for developer workflow are significant—agents can now acquire domain-specific knowledge on demand rather than relying on generic training data.

---

## Firefox 147: Three APIs Now Universal

Firefox 147 may be the most consequential browser release for React developers in recent memory. Three previously experimental APIs are now available across all major browsers:

### View Transition Types
React's `<ViewTransition>` component relies on `document.startViewTransition({update, types})` to conditionally enable transitions. While still canary in React, the browser support is now complete.

### CSS Anchor Positioning
This addition should eliminate the need for JavaScript positioning libraries that many React apps depend on for dropdowns and tooltips—think Tether, Popper.js, or Floating UI. Elements can now be tethered directly in CSS with their size and position set relative to anchor elements.

### Navigation API
A complete reimagining of client-side routing primitives. The Navigation API provides centralized navigation interception, replacing the clunky history API. Every React router will likely adopt this eventually.

Additional Firefox 147 highlights:
- WebGPU support on Apple Silicon
- ES modules in service workers
- CSS Module Scripts for importing stylesheets via JavaScript module system
- Brotli format support in CompressionStream/DecompressionStream

---

## Node.js 25.4: require(esm) Goes Stable

Node.js 25.4 marks several features as stable, with `require(esm)` being the headline change. This ends years of module system friction:

**Now Stable:**
- `require(esm)` - Use require() to load ES modules
- Module compile cache
- `--heapsnapshot-near-heap-limit` flag
- `--build-snapshot` and `--build-snapshot-config`
- `v8.queryObjects()`

**New Features:**
- `http.setGlobalProxyFromEnv()` for global proxy configuration
- `events.listenerCount()` now accepts EventTargets
- Subpath imports starting with `#/` now allowed
- `util.convertProcessSignalToExitCode()` utility

The release also updates root certificates to NSS 3.117 and includes npm 11.7.0.

---

## React Native Expands to HarmonyOS

Software Mansion announced collaboration with Huawei to bring React Native support to HarmonyOS NEXT, which already powers 27 million devices. The integration ensures their core libraries—Reanimated, Screens, Gesture Handler—work on the platform.

### Other React Native Highlights

**React Native Windows/macOS 0.81** enables the New Architecture by default for out-of-tree platforms.

**Brownie** introduces type-safe shared state for brownfield apps, creating a single source of truth on the native side accessible from both TypeScript and Swift.

**React Navigation 8.0 alpha** brings:
- Native Bottom Tabs by default
- Automatic deep links
- SFSymbols/Material Symbols support
- Improved screen preloading

**Teleport** fills a gap as the native portal implementation for React Native.

---

## Framework and Library Updates

### shadcn/ui and React 19
Full support for React 19 and Tailwind v4 landed. For npm users, the CLI now prompts for `--force` or `--legacy-peer-deps` to handle peer dependency resolution. Most core packages (Radix UI, Lucide, React Hook Form, Sonner) have updated their peer dependencies.

The recharts workaround requires overriding `react-is`:
```json
{
  "overrides": {
    "react-is": "^19.0.0-rc-69d4b800-20241021"
  }
}
```

### Base UI 1.1
New features for Autocomplete, Combobox, Select, and Field components. Base UI components are now officially documented and supported in shadcn.

### TanStack Updates
- **TanStack Router 1.152**: Custom `fetch()` implementation for server functions
- **TanStack Builder alpha**: Visual website for assembling TanStack configurations

### GTKX
Build native GTK4 desktop apps with React and TypeScript—an interesting expansion of React's reach beyond web and mobile.

---

## Ecosystem News

**Astro joins Cloudflare** as another popular framework finds a home with a tech giant. It will remain free, open source, and MIT-licensed.

**TC39 Progress**: The 112th meeting saw `map.getOrInsert()` reach stage 4 and `import.sync()` advance to stage 2.

**jQuery 4.0** shipped, removing IE11 support and deprecated methods for a slimmer package.

---

## Key Takeaways

1. **AI + Frameworks Integration** is accelerating. The skills ecosystem provides a clean abstraction for agents to acquire framework-specific knowledge.

2. **Browser parity matters**. Firefox 147's additions mean React's View Transitions and modern positioning patterns can ship without fallbacks.

3. **Module system unification** continues. Node.js making require(esm) stable removes a major pain point for library authors.

4. **React Native platform expansion** shows the framework's relevance beyond iOS and Android.

---

## Tradeoffs and Considerations

**Agent Skills**
- Pro: Progressive disclosure keeps context efficient
- Con: Skill quality varies; verification remains community-driven

**CSS Anchor Positioning**
- Pro: Eliminates JavaScript positioning library dependencies
- Con: Migration from Floating UI requires rewriting positioning logic

**require(esm) Stability**
- Pro: Simplifies dual CJS/ESM package maintenance
- Con: May reduce incentive to fully migrate to ESM

---

## Links

- [This Week In React #265](https://thisweekinreact.com/newsletter/265)
- [Skills.sh - Agent Skills Directory](https://skills.sh/)
- [Firefox 147 Release Notes](https://www.mozilla.org/en-US/firefox/147.0/releasenotes/)
- [Node.js 25.4.0 Release](https://nodejs.org/en/blog/release/v25.4.0)
- [shadcn/ui React 19 Guide](https://ui.shadcn.com/docs/react-19)
