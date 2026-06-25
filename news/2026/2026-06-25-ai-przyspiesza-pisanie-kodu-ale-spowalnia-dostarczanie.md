---
title: "AI przyspiesza pisanie kodu, ale spowalnia jego dowiezienie do produkcji"
excerpt: "Raport Faros AI z 22 tys. deweloperów pokazuje rosnący paradoks: AI zwiększa aktywność kodowania, ale lead time wzrósł o 480%, a deploymenty spadły o 12%."
publishedAt: "2026-06-24"
slug: "ai-przyspiesza-pisanie-kodu-ale-spowalnia-dostarczanie"
hashtags: "#refactoring #ai #engineering #productivity #codereview #dora #generated #pl"
source_pattern: "🌀 Refactoring"
---

## AI i paradoks produktywności: więcej kodu, mniej deploymentów

**TLDR:** Faros AI opublikował raport oparty na danych z ponad 22 tys. deweloperów i 4 tys. zespołów. Wynik jest zaskakujący: aktywność kodowania rośnie, ale deploymentów jest mniej, lead time eksplodował o 480%, a jakość kodu trafiającego na produkcję wyraźnie spadła.

Luca Rossi z newslettera Refactoring od jakiegoś czasu śledzi, co naprawdę dzieje się z wydajnością inżynierów w erze AI. Robi to na trzy sposoby: sam pisze kod (pracuje nad projektem Tolaria), rozmawia ze specjalistami i analizuje raporty branżowe. Raport Faros AI, który miał okazję zobaczyć przed publikacją, jest według niego jednym z najpoważniejszych opracowań na ten temat, jakie widział.

Co wyróżnia ten raport? Skala i metodologia. 22 tysiące deweloperów, ponad 4 tysiące zespołów. Ale też zakres pytań: raport nie mierzy tylko aktywności (commits, PRy, linie kodu), lecz śledzi downstream impact AI na cały SDLC -- od otwarcia taska po deployment na produkcję. To rzadkość. Większość podobnych badań zatrzymuje się na liczeniu pracy wejściowej.

Jedno z ważniejszych odkryć: mityczna teza o tym, że AI jest "amplifikatorem" i że złe wyniki to tylko efekt słabych zespołów, przestaje się bronić. Faros wprost pisze, że high-performing teams doświadczają tej samej degradacji co przeciętne. Wolumen pracy rośnie, jakość spada, i ta luka się pogłębia wraz z rosnącą adopcją. Nie ma miejsca na optymizm płynący z "my robimy to dobrze, więc nas to nie dotyczy".

Konkretne liczby są twarde. Deweloperzy dotykają o 67% więcej PRów dziennie, pracują nad o 18% więcej osobnymi taskami, kończą o 33% więcej zadań mierzonych otwarciem finalnego PRa. Problem w tym, że ta praca nie trafia szybciej do produkcji -- wręcz przeciwnie. Tasków stojących przez 7+ dni jest o 26% więcej. Restartów pracy na deweloperza przybyło o 14%. A deploymentów tygodniowo jest o 12% mniej. Kiedy zestawiamy te liczby razem, widać klasyczny efekt Little's Law: WIP rośnie, throughput stoi w miejscu, lead time eksploduje. +480% to nie błąd w pomiarze.

Rossi wskazuje na code review jako "słonia w pokoju". Tego fragmentu pełna analiza jest za paywallem, ale teza jest czytelna: gdy AI generuje więcej kodu szybciej, review staje się wąskim gardłem. Recenzenci nie nadążają za wolumenem, a jakość kodu generowanego przez AI jest nierówna -- co sprawia, że review staje się trudniejsze, nie łatwiejsze. To błędne koło: więcej kodu, wolniejszy review, dłuższy lead time, mniej deploymentów.

To nie jest odosobniona obserwacja. Zarówno State of Software Delivery, jak i raport DORA o AI-assisted development z końca 2025 roku wskazują na podobne trendy. Faros dokłada jedynie bardziej dramatyczne liczby po obu stronach równania: zarówno po stronie aktywności, jak i po stronie opóźnień.

**Key takeaways:**
- Aktywność kodowania rośnie (+67% PRów/dzień, +18% tasków), ale deploymentów jest o 12% mniej tygodniowo
- Lead time wzrósł o 480% -- bezpośrednia konsekwencja rosnącego WIP przy stałym throughput
- Nawet najlepsze zespoły notują degradację jakości, nie tylko przeciętne
- Code review stał się głównym wąskim gardłem w pipeline'ie z AI
- Dane Faros potwierdzają kierunek z raportów DORA i State of Software Delivery, ale pokazują jeszcze głębszą polaryzację

**Why do I care:** Przez ostatnie dwa lata słyszałem dziesiątki wersji narracji "AI przyspiesza nasz team". Tymczasem dane Faros pokazują, że przyspieszenie jest realne -- ale tylko na etapie pisania kodu. Reszta pipeline'u nie daje rady. Jako ktoś, kto pracuje z większymi organizacjami frontendowymi, widzę to na co dzień: backlog PRów oczekujących na review rośnie, zespoły spędzają coraz więcej czasu na weryfikowaniu AI-generated code, a cycle time dla każdego pojedynczego feature'a wcale nie maleje. Problem nie jest w modelu AI -- problem jest w tym, że organizacje optymalizują jeden etap produkcji kodu bez patrzenia na cały system.

**Link:** [Acceleration whiplash - Refactoring by Luca Rossi](https://refactoring.fm/p/acceleration-whiplash)
