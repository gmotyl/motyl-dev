---
title: "Kod jest tani, review jest drogi"
excerpt: "Artykuł Kilo pokazuje, jak agenci AI odwrócili starą kalkulację open source: pisanie patcha przestało być rzadkim zasobem, a stał się nim ludzki osąd przy przeglądzie."
publishedAt: "2026-08-01"
slug: "kod-jest-tani-review-jest-drogi"
hashtags: "#kilo #opensource #codereview #agentyai #maintainerstwo #generated #pl"
---

## Kod jest tani, review jest drogi

**TLDR:** Zespół Kilo opisuje, jak agenci kodujący wywrócili starą ekonomię open source: kiedyś przyjęcie pull requesta oszczędzało czas maintainera, dziś recenzja wygenerowanego diffa potrafi zająć więcej niż napisanie zmiany od zera. Autorzy proponują przesunięcie ciężaru z samego kodu na dowód intencji i przetestowania, zanim ktokolwiek w ogóle zacznie pisać implementację.

**Summary:** Przez dekadę open source działał na prostej wymianie. Napisanie działającego patcha było trudne i czasochłonne, więc kontrybutor oddawał maintainerowi coś realnie wartościowego, a przejrzenie tego było tańsze niż napisanie od nowa. Artykuł z bloga Kilo pokazuje, że ten układ się odwrócił. Wygenerowanie diffa jest dziś tanie i szybkie, natomiast ocena, czy zmiana faktycznie ma sens, pozostała droga jak zawsze. W efekcie kontrybucja, która kiedyś oszczędzała czas, dziś potrafi go pochłaniać, bo przejrzenie wiarygodnie wyglądającego PR-a wygenerowanego przez agenta zajmuje więcej niż samodzielne napisanie tej zmiany.

Najbardziej przekonujący fragment tekstu dotyczy właśnie tej wiarygodności. Autorzy opisują PR-y z gładkim opisem, screenshotem i pewną siebie notatką "przetestowane", podczas gdy kod w środku odpytywał hurtownię danych, do której kontrybutor prawie na pewno nie miał lokalnego dostępu. Prezentacja była bez zarzutu, ale nikt nie wiedział, czy to w ogóle działa. To jest dokładnie ten moment, w którym stara heurystyka "czy ten diff wygląda sensownie" przestaje wystarczać, bo wygląda sensownie prawie każdy diff.

Autorzy wymieniają kilka mechanizmów, przez które ten problem narasta. Agent rozwiązuje dokładnie ten jeden przypadek, który ma przed sobą, i nie wie, że analogiczna zmiana powinna trafić też do drugiego modułu, albo że jednolinijkowy "fix" to w rzeczywistości łatanie objawu, a nie przyczyny. Do tego dochodzi starzenie się PR-ów w szybko zmieniającym się repozytorium, gdzie rebase i naprawa konfliktów potrafi kosztować więcej niż sama zmiana, oraz fakt, że przy większym wolumenie łatwiej przeoczyć PR-a, który celowo albo przypadkiem osłabia coś w zabezpieczeniach. Cytowane badanie Faros AI o zespołach wdrażających narzędzia AI pokazuje ten sam wzorzec do wewnątrz organizacji: czas review rośnie szybciej niż liczba i rozmiar PR-ów, więc bez odpowiedniego skalowania procesu przepustowość realnie spada.

Ciekawe jest to, że autorzy nie piszą, że kontrybucje straciły wartość, tylko że ta wartość się przesunęła. Sygnałem, któremu dziś ufają, nie jest już sam kod, tylko dowód, że ktoś naprawdę usiadł ze zmianą, przetestował przypadki brzegowe i rozumie, jak to pasuje do reszty produktu. Kontrybutor, który robi to konsekwentnie, buduje zaufanie i jego PR-y są mergowane szybciej. Ktoś, kto w jeden dzień otwiera osiem PR-ów, wysyła sygnał odwrotny, nawet jeśli każdy z osobna wygląda poprawnie.

Propozycje na koniec są konkretne i, moim zdaniem, dość rozsądne: najpierw issue, potem PR, żeby nie palić czasu na implementację, której nikt nie chce zmergować; jasne rozgraniczenie między "source available" a "open source" z pełnym wsparciem maintainerów, bo udawanie, że to to samo, kończy się poczuciem zignorowania po stronie kontrybutorów; automatyzacja minimalnego progu wejścia (powiązane issue, testy, walidacja), żeby to maszyna pilnowała formalności, a nie maintainer tracił na to popołudnie; i wreszcie trzymanie osądu przy ludziach, bo ocena, czy zmiana w ogóle pasuje do produktu, to dokładnie to, w czym agenci są słabi. Osobiście najbardziej podoba mi się zdanie o komunikacji: jeśli ktoś włożył pracę w PR, zasługuje na szczerą odpowiedź, nawet jeśli brzmi "nie, nie teraz", zamiast odbicia się od bota.

**Key takeaways:**
- Stara heurystyka review "czy diff wygląda sensownie" przestała działać, bo wygenerowany kod prawie zawsze wygląda sensownie
- Wartościowym zasobem w kontrybucji przestał być sam kod, a stał się dowód, że ktoś go realnie przetestował i rozumie kontekst zmiany
- PR-y starzeją się szybciej niż kiedyś, bo rebase w żywym repozytorium potrafi kosztować więcej niż oryginalna zmiana
- Warto rozdzielać model "issue-first" (najpierw uzgodnienie intencji) od pisania implementacji na chybił trafił
- Minimalny próg wejścia (linkowane issue, testy, walidacja) da się i warto wymuszać automatycznie, żeby nie obciążać tym maintainerów

**Why do I care:** To nie jest tekst o frontendzie wprost, ale dotyka czegoś, z czym mierzę się w praktyce jako architekt przy każdym review kodu wygenerowanego przez agentów: koszt przeniósł się z pisania na weryfikację. W projektach frontendowych, gdzie klepnięcie kolejnego komponentu czy hooka agentowi jest banalne, prawdziwym wąskim gardłem staje się dokładnie to samo co w open source, czyli czy ktoś faktycznie sprawdził, że zmiana działa na realnych danych, obsługuje edge case'y i nie psuje sąsiednich ekranów. Zespoły, które traktują review jak formalność do przeklikania, bo "kod wygląda ok", będą tonąć w tym samym problemie co maintainerzy z artykułu, tylko szybciej, bo u nas wolumen PR-ów rośnie jeszcze bardziej gwałtownie niż w publicznych repozytoriach.

**Link:** [Code Is Cheap. Review Is Expensive.](https://blog.kilo.ai/p/code-is-cheap-review-is-expensive?publication_id=4363009&post_id=209267810&isFreemail=true&triedRedirect=true)
