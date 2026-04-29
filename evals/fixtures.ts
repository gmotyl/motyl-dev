export const FIXTURE_NEWSLETTER = {
  name: 'JavaScript Weekly',
  uid: 'eval-001',
  date: new Date('2026-04-29T00:00:00.000Z').toISOString(),
  hashtags: ['#jsweekly', '#javascript'],
};

export const FIXTURE_ARTICLES = [
  {
    url: 'https://example-eval.dev/turbopack-build-performance',
    title: 'Turbopack reaches stable: what changed in build performance',
    content: `Turbopack has reached its stable release after nearly two years in beta. The Vercel team announced that Turbopack now ships as the default bundler for Next.js 15 production builds. In benchmarks on large codebases, Turbopack delivers up to 10x faster cold start times compared to Webpack, with 700ms vs 7s on a 50,000-module project. The key architectural decision was treating the module graph as a persistent data structure rather than rebuilding it from scratch on each change. Webpack migration is supported via a compatibility layer that handles most common loader configurations automatically. The remaining incompatibilities involve custom Webpack plugins that directly mutate the compiler internals.`,
  },
  {
    url: 'https://example-eval.dev/react-19-compiler-internals',
    title: 'React 19 compiler internals: how auto-memoization works',
    content: `The React 19 compiler, formerly known as React Forget, is now shipping as part of the stable React 19 release. The compiler performs static analysis of your components and hooks to automatically insert useMemo and useCallback calls where they would help. The core mechanism works by tracking value identities through the component render path. When the compiler detects a value whose identity is stable across renders, it wraps it in a memo boundary. Auto-memoization targets the common pattern where object literals and function definitions are recreated on every render, breaking referential equality checks downstream. The compiler is opt-in per file via a directive and integrates with Babel and SWC transform pipelines.`,
  },
];

export const FIXTURE_CONFIG = {
  narratorPersona: 'Sherlock Holmes',
  outputLanguage: 'EN',
  maxArticlesPerNewsletter: 5,
};
