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
  // Polish reads "ch" as /x/, so an unmapped "chunk" comes out as "hunk"
  chunk: 'czank',

  // Product / library names
  ai: 'ej aj',
  spacexai: 'spejs eks ej aj',
  openai: 'oupen ej aj',
  gpt: 'dżi pi ti',
  chatgpt: 'czat dżi pi ti',
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
  nvidia: 'en widia',
  'node.js': 'noud dżej es',
  npm: 'en-pi-em',
  nodejs: 'noud dżej es',

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
  'type-aware': 'tajp ełer',
  'js/ts': 'dżej es / ti es',

  // Multi-word phrases (safe: longest-key-first beats the component words;
  // the phrase also avoids the `face`→"facet" collision of a bare `face` stem)
  'pull request': 'pul rikłest',
  'open source': 'oupen sors',
  'hugging face': 'haging fejs',
})

/**
 * Whole-word acronym pronunciations. Unlike PRONUNCIATION_MAP (which is
 * stem-based and re-appends any trailing Polish inflection), these match ONLY as
 * a standalone word (optionally with a trailing plural "s"). That is required
 * for short acronyms that are a PREFIX of real words — e.g. `cli` starts
 * "client"/"click", `api` could start "apis" — where the stem map would corrupt
 * those words.
 *
 * Values are lowercase Polish phonetic spellings. Letter-by-letter acronyms use
 * commas so the voice paces them like an acronym instead of blurring into one
 * word; word-style acronyms (e.g. JSON → "jay-son") are spelled as one token.
 * The Polish-phonetic spelling reads correctly on BOTH the Polish voices and the
 * multilingual voices (verified by ear: API/SDK came out right on William).
 */
export const ACRONYM_MAP: Readonly<Record<string, string>> = Object.freeze({
  cli: 'si-el-aj',
  api: 'ej-pi-aj',
  sdk: 'es-di-kej',
  gpu: 'dżi-pi-ju',
  cpu: 'si-pi-ju',
  ui: 'ju-łaj,',
  json: 'dżej-son',

  // More known acronyms (English letter names, Polish phonetic, hyphen-paced)
  ux: 'ju-eks',
  url: 'ju-ar-el',
  html: 'ejcz-ti-em-el',
  css: 'si-es-es',
  xml: 'eks-em-el',
  sql: 'es-kju-el',
  llm: 'el-el-em',
  jwt: 'dżej-dabl-ju-ti',
  npm: 'en-pi-em',
  ide: 'aj-di-i',
  ssh: 'es-es-ejcz',
  dns: 'di-en-es',
  tts: 'ti-ti-es',
  pr: 'pi-ar',
  mr: 'em-ar',
  qa: 'kju-ej',
  'ci/cd': 'si-aj-si-di',
})
