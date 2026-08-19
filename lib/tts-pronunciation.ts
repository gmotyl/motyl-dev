/**
 * English → Polish phonetic pronunciation map for TTS.
 *
 * HOW TO EDIT: add `'englishStem': 'polishPhonetic'` entries below. Matching is
 * case-insensitive and stem-based: the key is matched at a word start and any
 * trailing Polish inflection is preserved. E.g. 'benchmark':'benczmark' turns
 * "benchmarki" into "benczmarki". Values should be lowercase Polish phonetic spelling.
 */
export const PRONUNCIATION_MAP: Record<string, string> = {
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
  github: 'githab',
  gemini: 'dżemini',
  vercel: 'wersel',
  deepseek: 'dipsik',
  tailwind: 'tejlłind',
  typescript: 'tajpskrypt',

  // Jargon
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

  // Multi-word phrases (safe: longest-key-first beats the component words;
  // the phrase also avoids the `face`→"facet" collision of a bare `face` stem)
  'pull request': 'pul rikłest',
  'open source': 'oupen sors',
  'hugging face': 'haging fejs',
}
