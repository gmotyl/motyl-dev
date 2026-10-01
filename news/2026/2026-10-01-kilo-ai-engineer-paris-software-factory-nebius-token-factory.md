---
title: "Co Kilo zabrało z AI Engineer Paris o fabrykach software'u, i jak podłączyć Nebius Token Factory"
excerpt: "Software factory to gorący temat konferencji, ale nikt jeszcze nie rozwiązał, kto decyduje co budować: człowiek czy agent. Plus krótki tutorial, jak podłączyć Nebius Token Factory do Kilo w trzech miejscach naraz."
publishedAt: "2026-09-30"
slug: "kilo-ai-engineer-paris-software-factory-nebius-token-factory"
hashtags: "#kilo #ai #agents #devtools #security #generated #pl"
source_pattern: "Kilo"
---

## Co zostaje po dwóch dniach na bleeding edge AI: software factory, review jako wąskie gardło i pytanie o suwerenność

**TLDR:** Z relacji z Mistralowego AI Engineer Paris wyłania się jeden temat dominujący rozmowy: "software factory", czyli mocno zautomatyzowany proces wytwórczy, w którym agenty AI pracują proaktywnie przez cały cykl życia oprogramowania pod nadzorem ludzi, na razie wciąż ludzi.

**Streszczenie:** W klasycznym, prowadzonym przez człowieka SDLC przechodzi się przez pętlę pomysł, specyfikacja, implementacja, wdrożenie. Software factory ma przyspieszyć tę pętlę, podnieść jakość kodu i obniżyć koszt tokenów na feature, co w praktyce oznacza na przykład agenta, który sam reaguje na incydent, przechodzi przez logi i metryki, dzieli się wnioskami na Slacku i otwiera PR do review przez człowieka. Dowody na to, że to działa, są konkretne: Stripe zbudował Minions, swojego jednostrzałowego agenta kodującego end-to-end, wewnętrzny agent Rampa napędza 30% ich pull requestów inżynierskich, a Codex OpenAI podobno "przejął" ich inżynierię. Branża przeszła przy tym od tokenmaxxingu i rozdmuchanych budżetów rocznych do bardziej rozsądnego podejścia: firmowych polityk pisania i rozwoju z automatyzacją agentową w CI/CD, żeby zatrzymać "slop grenades", czyli zrzucanie AI-owego bubla na kolegów do posprzątania.

Nikolay Rodionov z Alpic opisał porażkę: jego zespół próbował zautomatyzować całą pętlę SDLC, ale agent zawodził przy pracy nad wymaganiami produktowymi, każdy wypróbowany skill dawał gorsze myślenie niż człowiek przechodzący przez problem, a jedyne, co pomagało, to agent badawczy ciągnący raporty konkurencji, feedback użytkowników i analitykę. Wszędzie indziej, od strategii po QA i rollout, agenty dodawały realną wartość. Matt Pocock z kolei rozłożył "fabrykę" na akceleratory (wejścia: bugi, zgłoszenia supportu, wolne zapytania, logi) i hamulce, które spowalniają fabrykę, ale podnoszą jakość wyjścia: najpierw deterministyczne, zautomatyzowane sprawdzenia (linting, testy, typechecking) przed tym, jak człowiek w ogóle zobaczy PR, potem zautomatyzowany review, który powinien pchać commity zamiast zasypywać ludzi komentarzami, z cotygodniowym retro decydującym, jakie nowe reguły dopisać.

Każdy hamulec kosztuje tokeny, co napina trzeci cel fabryki: koszt na feature. TypeSafe wypuściło Jev dwa tygodnie przed konferencją, "model decyzyjny" zwracający decyzję z prawdopodobieństwem zamiast tekstu, tani i niemal natychmiastowy, idealny np. do lintowania PR-ów językiem naturalnym. Kilo stawiało na ten sam trend wcześniej przez Auto Efficient, które rozpoznaje typ zadania i kieruje je do najtańszego modelu, który na benchmarkach Kilo udowodnił, że potrafi je wykonać. Na koniec bezpieczeństwo: zautomatyzowane sprawdzenia nie łapią agenta wklejającego klucz API do promptu albo wykonującego instrukcję ukrytą w zgłoszeniu supportu, które miał tylko przetriagować. Mistral zaproponował trzy warstwy obrony: wzmocnienie modelu, ograniczenie dostępu agenta tylko do tego, co potrzebne (w praktyce: sandbox), i guardraile blokujące naruszenie w trakcie, nie po fakcie.

**Kluczowe wnioski:**
- Ramp's internal agent napędza 30% pull requestów inżynierskich firmy, a Stripe zbudował własnego end-to-end agenta kodującego, Minions.
- "Hamulce" fabryki (deterministyczne sprawdzenia, potem zautomatyzowany review) kosztują tokeny, co napina trzeci cel: koszt na feature.
- TypeSafe's Jev to tani, niemal natychmiastowy "model decyzyjny" zwracający decyzję z prawdopodobieństwem zamiast tekstu.
- Trzywarstwowa obrona Mistrala: wzmocnienie modelu, ograniczony dostęp (sandbox), guardraile blokujące naruszenie w locie.

**Dlaczego mi na tym zależy:** Case Alpica jest tu najcenniejszy, bo to rzadki przykład szczerej relacji o porażce: agent dobry wszędzie poza pracą nad wymaganiami produktowymi, gdzie potrzebny był człowiek plus agent badawczy ciągnący kontekst z zewnątrz. To konkretna granica, na której warto się zatrzymać przy projektowaniu własnej fabryki softwarowej, zamiast zakładać, że automatyzacja skaluje się jednakowo na każdym etapie SDLC.

**Link:** [What I Learned at AI Engineer Paris](https://blog.kilo.ai/p/what-i-learned-at-ai-engineer-paris)

## Jak podłączyć Nebius Token Factory do Kilo na trzy sposoby

**TLDR:** Krótki tutorial pokazujący, jak podpiąć klucz Nebius Token Factory do Kilo lokalnie, w chmurze (do współdzielenia w zespole) i na poziomie organizacji, w ramach hackathonu Nebius x NVIDIA wciąż otwartego dla chętnych.

**Streszczenie:** Najszybsza droga to wzięcie klucza z Nebius Token Factory i dodanie go bezpośrednio w ustawieniach Kilo (VS Code: Settings → Providers → Show more providers → Nebius Token Factory → Add API key), z analogicznym flow w JetBrains i CLI przez komendę `/connect`. Ten sam klucz można dodać pod Bring Your Own Key w Kilo Cloud, co odblokowuje Cloud Agents, albo dodać na poziomie organizacji, żeby cały zespół korzystał ze wspólnej puli użycia zamiast każdy miał swój osobny klucz. Kilo Gateway wspiera ponad 500 modeli od ponad 60 dostawców, więc włączenie Nebius Token Factory na poziomie zespołu pozwala jeszcze dodatkowo ograniczyć, które konkretne modele i regiony są dozwolone dla danej organizacji.

**Kluczowe wnioski:**
- Klucz Nebius Token Factory można podłączyć na trzech poziomach: lokalnym, chmurowym (zespołowym) i organizacyjnym.
- Kilo Gateway wspiera ponad 500 modeli od ponad 60 dostawców.
- Konfiguracja na poziomie organizacji pozwala ograniczyć dozwolone modele i regiony dla całego zespołu.

**Dlaczego mi na tym zależy:** Drobna, ale praktyczna informacja dla zespołów już korzystających z Kilo i rozważających Nebius jako dodatkowego dostawcę modeli, zwłaszcza że konfiguracja na poziomie organizacji od razu adresuje pytanie o kontrolę kosztów i wyboru regionu, które wcześniej czy później i tak trzeba rozwiązać.

**Link:** [Kilo x Nebius: powering the software factory](https://blog.kilo.ai/p/kilo-x-nebius)
