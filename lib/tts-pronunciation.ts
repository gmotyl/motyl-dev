/**
 * English → Polish phonetic pronunciation map for TTS.
 *
 * HOW TO EDIT: add `'englishStem': 'polishPhonetic'` entries below. Matching is
 * case-insensitive and stem-based: the key is matched at a word start and any
 * trailing Polish inflection is preserved. E.g. 'benchmark':'benczmark' turns
 * "benchmarki" into "benczmarki". Values should be lowercase Polish phonetic spelling.
 */
export const PRONUNCIATION_MAP: Readonly<Record<string, string>> = Object.freeze({
  tldr: '..',
  summary: ',,',
  benchmark: 'benczmark',
  react: 'reakt',
  microsoft: 'mikrosoft',

  // Leading "c": a Polish voice reads it as "ts", so English c-words are the
  // most mangled. Note: matching is longest-key-first, so `codex` and
  // `cloudflare` win over `code` / `cloud`, and phrase keys win over their words.
  claude: 'klod',
  cursor: 'kersor',
  cache: 'kesz',
  cloud: 'klałd',
  cloudflare: 'klałdfler',
  commit: 'komit',
  codex: 'kodeks',
  code: 'koud',
  copilot: 'kopajlot',
  checkout: 'czekałt',
  checkpoint: 'czekpojnt',
  compliance: 'komplajens',
  chrome: 'krołm',

  // Product / library names
  spacexai: 'spejs eks ej aj',
  OpenAI: 'oupen ej aj',
  gpt: 'dżi pi ti',
  chatgpyt: 'czat dżi pi ti',
  mac: 'mak',
  macu: 'maku',
  macbook: 'makbuk',
  macos: 'makos',
  ios: 'aj os',
  android: 'endroid',
  windows: 'łindous',
  linux: 'linuks',
  github: 'git chab',
  gemini: 'dżemini',
  vercel: 'wersel',
  deepseek: 'dipsik',
  tailwind: 'tejlłind',
  typescript: 'tajpskrypt',
  usememo: 'juz memo',
  usecallback: 'juz kolbek',
  useeffect: 'juz efekt',
  usestate: 'juz stejt',
  useref: 'juz ref',
  compiler: 'kompajler',

  // Jargon
  githuba: 'git chaba',
  framework: 'frejmłerk',
  workflow: 'łerkflou',
  runtime: 'rantajm',
  feature: 'ficzer',
  review: 'rywju',
  build: 'bild',
  bundler: 'bandler',
  bundle: 'bandel',
  pipeline: 'pajplajn',
  deploy: 'diploj',
  release: 'rilis',
  update: 'apdejt',
  dashboard: 'daszbord',
  endpoint: 'endpojnt',
  merge: 'merdż',
  hook: 'huk',
  source: 'sors',
  gateway: 'gejtłej',
  provider: 'prowajder',
  layout: 'lejałt',
  payload: 'pejloud',
  storage: 'storidż',
  design: 'dizajn',
  sandbox: 'sendboks',
  exploit: 'eksplojt',
  edge: 'edż',
  bug: 'bag',
  reasoning: 'rizoning',
  vram: 'fał ram',

  // Multi-word phrases (safe: longest-key-first beats the component words;
  // the phrase also avoids the `face`→"facet" collision of a bare `face` stem)
  'pull request': 'pul rikłest',
  'open source': 'oupen sors',
  'hugging face': 'haging fejs',
})
