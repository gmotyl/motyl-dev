/**
 * English → Polish phonetic pronunciation map for TTS.
 *
 * HOW TO EDIT: add `'englishStem': 'polishPhonetic'` entries below. Matching is
 * case-insensitive and stem-based: the key is matched at a word start and any
 * trailing Polish inflection is preserved. E.g. 'benchmark':'benczmark' turns
 * "benchmarki" into "benczmarki". Values should be lowercase Polish phonetic spelling.
 */
export const PRONUNCIATION_MAP: Readonly<Record<string, string>> = Object.freeze({
  summary: ',,',
  benchmark: 'benczmark',
  react: 'reakt',
  microsoft: 'mikrosoft',

  // Leading "c": a Polish voice reads it as "ts", so English c-words are the
  // most mangled. Note: matching is longest-key-first, so `cloudflare` wins over
  // `cloud`, and phrase keys win over their component words. (`code` is too short
  // to be a stem — it lives in ACRONYM_MAP — but `codex` still beats it because
  // the word pass cannot match a prefix.)
  claude: 'klod',
  cursor: 'kersor',
  cache: 'kesz',
  cloud: 'klałd',
  cloudflare: 'klałdfler',
  commit: 'komit',
  codex: 'kodeks',
  copilot: 'kopajlot',
  checkout: 'czekałt',
  checkpoint: 'czekpojnt',
  compliance: 'komplajens',
  chrome: 'krołm',
  // Polish reads "ch" as /x/, so an unmapped "chunk" comes out as "hunk"
  chunk: 'czank',

  // Product / library names
  spacexai: 'spejs eks ej aj',
  openai: 'oupen ej aj',
  chatgpt: 'czat dżi pi ti',
  macbook: 'makbuk',
  macos: 'makos',
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
  nodejs: 'noud dżej es',
  turbopack: 'turbo pak',
  turbopacku: 'turbo paku',
  tubopacka: 'turbo pak',
  turbopackiem: 'turbo pakiem',
  trace: 'trejs',
  traców: 'trejsuf',
  tracem: 'trejsem',
  tracami: 'trejsemi',
  tracu: 'trejsu',
  tracach: 'trejsach',

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
  source: 'sors',
  gateway: 'gejtłej',
  provider: 'prowajder',
  layout: 'lejałt',
  payload: 'pejloud',
  storage: 'storidż',
  design: 'dizajn',
  sandbox: 'sendboks',
  exploit: 'eksplojt',
  reasoning: 'rizoning',
  'type-aware': 'tajp ełer',
  'js/ts': 'dżej es / ti es',
  'key takeaways': 'kluczowe wnioski:',
  "pipeline'y": 'pajplajny',
  worker: 'łerker',

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
  ndjson: 'en-di-dżej-es-on',

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

  // Demoted from PRONUNCIATION_MAP: each is shorter than MIN_STEM_KEY_LENGTH, so
  // as a stem it swallowed every longer word it merely prefixed — `mac` turned
  // "machine" into "makhine", `code` turned "codebase" into "koudbase".
  // (`npm` was already here; its duplicate stem entry was deleted, not moved.)
  ai: 'ej aj',
  aws: 'ej dablju es',
  gpt: 'dżi pi ti',
  ios: 'aj os',
  mac: 'mak',
  macu: 'maku',
  code: 'koud',
  bug: 'bag',
  hook: 'huk',
  edge: 'edż',
  tldr: '..',
  vram: 'fał ram',

  // Inflections the demotion above lost. As a stem, `bug`/`hook` also caught
  // every Polish ending; word mode matches the bare word only, so each form
  // that actually occurs in the corpus needs its own entry (base value + the
  // written ending). Only measured forms are listed — a speculative entry is a
  // future collision. English plurals ("bugs", "hooks") need nothing: the
  // `(s?)` group of the base key already covers them.
  bugi: 'bagi',
  bugów: 'bagów',
  buga: 'baga',
  bugiem: 'bagiem',
  buggy: 'bagi',
  hooki: 'huki',
  hooków: 'huków',
  hooka: 'huka',
  hookami: 'hukami',
  hookach: 'hukach',
  // Not a missing match — `edge` + the `(s?)` group already yields "edżs" — but
  // a phonetic fix: a Polish voice has no vowel to land on in "edżs", so the
  // explicit spelling gives it one.
  edges: 'edżes',
})

/**
 * A key shorter than this may not match as a stem — it would swallow longer
 * words. Stem matching re-appends any trailing letters, so a 3-letter key like
 * `ai` turns every word starting with "ai" into "ej aj" + the rest. Short keys
 * belong in ACRONYM_MAP (whole word) or EXACT_ACRONYMS (whole word, uppercase).
 */
export const MIN_STEM_KEY_LENGTH = 5

/**
 * Acronyms whose lowercase form is an ordinary Polish word — matched
 * case-SENSITIVELY as a whole word, so only the uppercase spelling is replaced.
 * `ACRONYM_MAP` cannot hold these: it is case-insensitive, so it would also
 * rewrite the ordinary Polish word.
 *
 * Keys MUST be uppercase (a lowercase key could never match). Values are
 * lowercase Polish phonetic spellings, same as the other maps.
 */
export const EXACT_ACRONYMS: Readonly<Record<string, string>> = Object.freeze({})
