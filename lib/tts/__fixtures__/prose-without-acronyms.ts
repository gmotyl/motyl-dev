/**
 * Ordinary prose that must survive the pronunciation maps byte-for-byte.
 *
 * Every sentence here contains NO term that should be pronounced, so
 * `applyPronunciation` must return it unchanged. The maps match case-
 * insensitively and — in the stem pass — on a word PREFIX, which is exactly how
 * a new entry silently starts rewriting ordinary Polish: `mac` once turned
 * "macierz" into "makierz", `code` turned "codebase" into "koudbase", and
 * `macos` turned the idiom "po macoszemu" into "po makoszemu".
 *
 * HOW TO USE THIS FILE: when the guard test fails, the offending sentence has
 * found a REAL collision. Fix it in `pronunciation.ts` — usually by adding an
 * explicit longer entry, which wins under longest-key-first — and never by
 * editing or deleting the sentence. A fixture trimmed to fit the code proves
 * nothing.
 *
 * Add a sentence here whenever you add a map key, especially a short one.
 */
export const PROSE_WITHOUT_ACRONYMS: readonly string[] = Object.freeze([
  // Homographs of the case-sensitive acronyms (EXACT_ACRONYMS): the lowercase
  // form is an ordinary Polish word and must stay one.
  'mówię ci to teraz',
  'cd. nastąpi w kolejnym wpisie',
  'ide do domu',
  'idę do domu',
  'Mówię Ci to',
  'to jest idealne rozwiązanie',
  'prawda jest taka, że nie wiem',
  'ciasto stygnie na parapecie',
  'cisza przed burzą trwała długo',

  // Polish and English words that merely START with a short ACRONYM_MAP key
  // (`mac`, `code`, `ai`, `ui`, `url`, `hook`, `cli`, `api`, `edge`, `mr`).
  // Word mode is what keeps these intact — a stem would eat every one of them.
  'macierz kowariancji rośnie',
  'mając to na uwadze',
  'macie rację',
  'machine learning działa',
  'Nasz codebase rośnie',
  'powietrze i czyste air quality',
  'to jest codzienna praca',
  'macierzyństwo to ciężka praca',
  'machamy ręką na pożegnanie',
  'ośmiornica chwyta zdobycz mackami',
  'codziennie rano piję kawę',
  'musimy uiścić opłatę do piątku',
  'urlop zaczyna się w lipcu',
  'hokej to nie mój sport',
  'apteka jest zamknięta w niedzielę',
  'edukacja jest ważna dla każdego',
  'mrówki maszerują po trawie',
  'mrok zapadł nad miastem',
  'click the button twice',
  'the client waits for a reply',

  // Near misses on the stem keys, where one letter is all that separates
  // ordinary Polish from a rewrite: `trace`, `react`, `build`, `codex`.
  'nie tracę na to czasu',
  'tracimy godzinę na dojazd',
  'reakcja była natychmiastowa',
  'budujemy dom od podstaw',
  'kodeks pracy znowu się zmienia',
  // A measured collision, not a hypothetical: the `macos` stem used to make
  // this idiom "po makoszemu". It occurs in the published corpus.
  'traktować kogoś po macoszemu',

  // Plain Polish with nothing special about it — the baseline that catches a
  // careless new key before anything else does.
  'aktualnie pracuję nad czymś innym',
  'gdzie idziemy dziś wieczorem',
  'nowy rower stoi w garażu',
  'pracuję nad tym od rana',
  'trzeba to przemyśleć spokojnie',
])
