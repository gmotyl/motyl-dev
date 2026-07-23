---
title: "Fabryki oprogramowania: jasne i ciemne strony automatyzacji z AI"
excerpt: "Addy Osmani analizuje koncepcję software factory, czyli zautomatyzowanego procesu wytwarzania kodu przez agentów AI, i wskazuje, kiedy człowiek musi pozostać w pętli."
publishedAt: "2026-07-22"
slug: "fabryki-oprogramowania-jasne-i-ciemne-strony-automatyzacji"
hashtags: "#AddyOsmani #performance #frontend #AI #agenci #softwareFactory #generated #pl"
source_pattern: "Addy Osmani"
---

## Fabryki oprogramowania: jasne i ciemne strony automatyzacji z AI

**TLDR:** Koncepcja "software factory" to nie futurystyczna wizja, lecz realna zmiana w sposobie, w jaki zespoły już dziś wytwarzają kod przy pomocy agentów AI. Addy Osmani, opierając się na doświadczeniach Dexa Horthy'ego z HumanLayer, tłumaczy, dlaczego "ciemna fabryka" (dark factory), w której żaden człowiek nie czyta generowanego kodu, to prosta droga do katastrofy. Kluczem jest umiejętne decydowanie, gdzie zostawić włączone światło.

Pomysł, by wytwarzanie oprogramowania działało jak linia montażowa, pojawił się już w 1968 roku, w artykule Boba Bemera zatytułowanym "The economics of program production." Przez dekady pozostawał marzeniem niemożliwym do zrealizowania, bo oprogramowanie to w gruncie rzeczy utrwalone myśli, a myśli nie da się stemplować jak części samochodowe. Ostatnie dwa lata zmieniły jednak rachunek na tyle, że warto do tego pomysłu wrócić, tym razem poważnie.

Osmani rozkłada fabrykę oprogramowania na trzy warstwy. Pierwsza to pętla (loop): agent wykonuje pojedyncze zadanie w kółko, zbierając kontekst, podejmując akcję, sprawdzając wynik i powtarzając proces. Druga to harness: środowisko, w którym pętla działa, ze swoimi narzędziami, pamięcią i bramkami decydującymi o tym, co oznacza "gotowe." Trzecia to sama fabryka: wiele spiętych pętli działających równolegle, zasilanych kolejką zadań i odfiltrowywanych przez bramkę recenzji przed trafieniem na produkcję. Metafora jest trafna i od razu widać, gdzie jest wąskie gardło. Każdy element jest dziś niemal darmowy, generowanie, testy, skanowanie. Jest jeden kosztowny zasób, który nie skaluje się razem z resztą: ludzki osąd.

"Ciemna fabryka" bierze swoją nazwę od fabryk produkcji fizycznej, w których roboty pracują bez włączonych świateł, bo ich nie potrzebują. W oprogramowaniu chodzi o to samo: kod, który żaden człowiek nie przeczytał, zweryfikowany wyłącznie przez maszyny. Dex Horthy prowadził taką fabrykę przez cztery miesiące i opisał efekty wprost: po tym czasie nikt w zespole nie rozumiał już systemu, który sam zbudował. Testy były zielone. Architektura była martwą materią. Tak działa "comprehension debt", czyli narastająca przepaść między ilością istniejącego kodu a tym, ile z niego ktokolwiek naprawdę rozumie. Ciemna fabryka tego długu nie spłaca, ona bierze go na kredyt z odsetkami.

Prawdziwym wąskim gardłem nigdy nie było generowanie. Botlenekiem jest weryfikacja. Osmani formułuje to jako regułę "back pressure": agentowi można dać tyle autonomii, ile jesteś w stanie tanio i niezawodnie zweryfikować, i ani trochę więcej. Skrócenie pętli i budowanie z nich grafów (nie knowledge grafów, lecz skierowanych grafów przepływu pracy) to sposób na zachowanie kontroli bez rezygnowania z prędkości. Dex podaje konkretny przykład dobrego "ciemnego" zadania: nightly job w GitHub Actions, który naprawia dokładnie jeden lint violation, otwiera jedno małe PR i czeka na recenzję. Człowiek budzi się rano z minimalnym diffem do przeczytania. Takie pętle zasługują na autonomię, bo ich weryfikacja jest tania i natychmiastowa.

Tam, gdzie błąd jest drogi, długotrwały i trudny do wykrycia przez maszyny, np. w decyzjach architektonicznych, systemach autentykacji czy publicznych kontraktach API, musi zostać człowiek. Jednak "jasna fabryka" nie oznacza, że inżynier siada do każdego diffa. Oznacza, że ludzki osąd wchodzi wcześniej, na etapie planu, przed wygenerowaniem dwóch tysięcy linii kodu. Godzina spędzona na recenzji dwustustronicowego planu oszczędza dni spędzone na śledzeniu błędów w wygenerowanym bałaganie.

**Key takeaways:**
- Fabryka oprogramowania to nie jedno narzędzie, lecz organizacja pracy: pętla, harness i system pętli połączonych w przepływ pracy.
- "Ciemna fabryka" generuje pozorne przyspieszenie, ale buduje comprehension debt, który prędzej czy późnej niszczy zdolność zespołu do utrzymania systemu.
- Prawdziwym ograniczeniem nie jest szybkość generowania kodu, lecz zdolność do jego weryfikacji.
- Reguła back pressure: autonomii agenta nie może być więcej niż to, co można tanio i niezawodnie sprawdzić.
- Dobra architektura (typy, szwydkości testów, krótkie stosy wywołań, czyste granice komponentów) przestała być akademickim ideałem, stała się aktywną siatką bezpieczeństwa przeciwko błędom agentów.

**Why do I care:** To najważniejszy artykuł o agentach AI, jaki przeczytałem w tym roku, właśnie dlatego, że nie mówi o możliwościach, lecz o ograniczeniach. Pracuję z dużymi, dojrzałymi systemami i doskonale wiem, co znaczy "codebase z dekadą historii." Pokusa, by puścić agenta bez nadzoru na kolejkę zadań i cieszyć się zielonymi testami, jest realna. Ale zielone testy przy zero rozumieniu architektury to nie sukces, to odliczanie do wybuchu. Osmani i Horthy dają tu konkretne narzędzie decyzyjne: czy ten loop mogę tanio zweryfikować, czy nie? Jeśli tak, zgaś światło. Jeśli nie, zostaw włączone. To proste. Trudne jest tylko konsekwentne stosowanie tej zasady, bo skrócenie etapu recenzji zawsze wygląda jak oszczędność do czasu, gdy nie wygląda jak nic.

**Link:** [Software Factories, Light and Dark](https://addyo.substack.com/p/software-factories-light-and-dark)
