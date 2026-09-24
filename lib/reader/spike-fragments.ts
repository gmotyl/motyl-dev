/**
 * The fixed text the carrier spike speaks.
 *
 * These are read aloud on a phone with the screen off, in a loop, for ten
 * minutes per carrier mode while someone watches whether playback survives.
 * Three properties matter, and all three are asserted next door:
 *
 * 1. Eight fragments, indices 0..7 — the index is what the diagnostic log
 *    carries, so it has to be stable and dense.
 * 2. Distinct prose. The operator identifies the fragment BY EAR, so a repeat
 *    in the log has to mean a real repeat, not a copy-paste. Eight paraphrases
 *    of one sentence would make a loop indistinguishable from a stall.
 * 3. Long enough not to be a one-liner. The test floors each fragment at 240
 *    characters, and that floor is exactly what it says — a rejection of prose
 *    so short that the run would be mostly boundaries. It is NOT a guarantee
 *    of twenty seconds: 240 was derived from the SLOWEST plausible speech rate,
 *    which is the direction that makes fragments pass, while guaranteeing
 *    twenty seconds means dividing by the FASTEST rate (~350 characters).
 *    These eight run 288–303, no real synth has been measured yet, and the
 *    seam report's `expectedDuration` will settle the true durations on the
 *    first screen-on bench run. See `MIN_FRAGMENT_CHARS` next door.
 *
 * Text only, deliberately: no audio is committed. Synthesis happens at runtime
 * through the production pipeline so the encoder headers under test are the
 * real ones.
 *
 * The content is neutral on purpose — it is heard dozens of times per session.
 */

export interface SpikeFragment {
  /** Stable id used in log details: 0..7 */
  index: number
  /** Fixed Polish text, ~20 s when spoken. */
  text: string
}

// Polish prose; the surrounding comments stay English per repo convention.
const TEXTS: readonly string[] = [
  'Poranek nad jeziorem zaczyna się od mgły, która leży na wodzie tak nisko, że widać tylko czubki trzcin. Powietrze jest chłodne i pachnie wilgotnym drewnem. Gdzieś przy drugim brzegu odzywa się ptak, a po chwili odpowiada mu drugi. Woda jest zupełnie gładka, dopóki nie przepłynie po niej pierwsza łódka.',
  'Las pod koniec lata bywa cichszy, niż się go pamięta z czerwca. Ścieżka robi się miękka od igieł, a między drzewami stoi ciepłe, nieruchome powietrze. Idzie się wolno, bo co kilka kroków trzeba się schylić i sprawdzić, czy to, co bieleje pod liściem, jest grzybem, czy tylko kawałkiem suchej kory.',
  'Szlak w górach zaczyna się łagodnie, szeroką drogą, którą można iść i spokojnie rozmawiać. Potem las się kończy i zostaje sam kamień, a rozmowa cichnie, bo oddech jest potrzebny do czegoś innego. Na grani wiatr bywa zimny nawet w lipcu, a dolina w dole wygląda na mniejszą, niż była rano.',
  'Zima w mieście wygląda najlepiej pierwszej nocy po śniegu, zanim ktokolwiek zdąży go rozjeździć. Ulice są jaśniejsze niż zwykle, bo światło odbija się od wszystkiego naraz. Kroki są głośne i głuche jednocześnie, a powietrze jest tak suche i zimne, że szczypie w policzki i pachnie dymem z kominów.',
  'Bałtyk rzadko bywa spokojny i chyba właśnie dlatego się go lubi. Wiatr wieje wzdłuż plaży, niesie piasek tuż nad ziemią i zmusza, żeby iść lekko bokiem. Fala wraca co kilka sekund, zawsze trochę inaczej, i zostawia ciemną linię, którą następna zmywa, zanim zdąży się ją porządnie obejrzeć.',
  'W ogrodzie wiosna dzieje się szybciej, niż da się ją zauważyć. Jednego dnia gałęzie są jeszcze nagie, a po tygodniu nie widać przez nie płotu. Pod drzewem leżą płatki, których nikt nie zamiata, bo szkoda. Wieczorem pachnie ziemią po podlewaniu i słychać pszczoły, chociaż dawno powinny już spać.',
  'Rzeka z kajaka wygląda zupełnie inaczej niż z mostu. Nurt niesie sam, więc wiosło służy raczej do poprawiania kierunku niż do płynięcia. Brzegi są blisko, gałęzie czasem trzeba odsunąć ręką, a woda pod dnem robi cichy, równy dźwięk, przy którym łatwo stracić rachubę czasu i minąć swoje miejsce.',
  'Wieczór z deszczem za oknem jest najlepszym powodem, żeby nigdzie nie wychodzić. Herbata stygnie wolniej, niż się ją pije, a krople spływają po szybie nierówno, zatrzymują się i ruszają dalej. Z ulicy dochodzi szum opon, coraz rzadszy, aż w końcu zostaje tylko deszcz i światło jednej lampy.',
]

export const SPIKE_FRAGMENTS: readonly SpikeFragment[] = TEXTS.map((text, index) => ({
  index,
  text,
}))
