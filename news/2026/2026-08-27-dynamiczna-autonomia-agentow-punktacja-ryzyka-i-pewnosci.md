---
title: "Dynamiczna autonomia agentów: punktacja ryzyka i pewności zamiast sztywnych bramek"
excerpt: "Zamiast na stałe wpisywać w proces miejsca, gdzie wkracza człowiek, oceniaj każdy przebieg pod kątem ryzyka i pewności, a wynik niech decyduje o autonomii."
publishedAt: "2026-08-26"
slug: "dynamiczna-autonomia-agentow-punktacja-ryzyka-i-pewnosci"
hashtags: "#refactoring #agents #ai #workflow #architecture #engineering #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Dawanie agentom dynamicznej autonomii

**TLDR:** Popularna koncepcja suwaka autonomii zakłada, że dla każdego procesu projektujesz raz, ile swobody dostaje agent, a ile kontroli zostaje przy człowieku. Zespół opisany w tym studium przypadku poszedł dalej i uczynił ten suwak dynamicznym: każdy przebieg dostaje ocenę ryzyka i pewności, a ta ocena decyduje o autonomii tu i teraz.

**Summary:** Autor od jakiegoś czasu odchodzi od pisania o tym, jak powinno być, na rzecz opisywania, jak konkretne firmy naprawdę pracują z agentami. To dobry ruch, bo w tej dziedzinie mamy nadmiar rozważań i niedobór obserwacji. Tym razem opisuje zespół, który buduje produkt zamieniający kod, dokumentację, zgłoszenia i rozmowy w kontekst dla agentów, więc używa własnego narzędzia codziennie. Ich część opisanych praktyk jest publiczna w postaci otwartego zbioru przepisów, czyli gotowych umiejętności do skopiowania.

Sedno pomysłu jest takie. Zwykły suwak autonomii jest statyczny: projektujesz proces i wpisujesz w niego na stałe miejsca, w których człowiek musi coś zatwierdzić. Problem polega na tym, że w ramach jednego procesu mieszczą się skrajnie różne sytuacje, więc sztywne bramki zawsze prowadzą do jednego z dwóch złych efektów. Albo bezpieczna praca niepotrzebnie czeka w kolejce na czyjeś kliknięcie, albo ryzykowna praca przechodzi, choć powinna zostać zatrzymana i obejrzana. Oba efekty widziałem w każdym zespole, który próbował wpiąć agenta w istniejący proces.

Rozwiązanie polega na zadaniu dwóch pytań przy każdym przebiegu. Na ile agent jest pewny, że zadanie jest realne i że potrafi je wykonać? I na ile ryzykowna jest ta zmiana? Z połączenia tych dwóch wymiarów powstaje wynik, który decyduje o następnym kroku. Przy wysokim ryzyku i niskiej pewności agent po prostu spisuje zgłoszenie i oddaje je człowiekowi. W strefie pośredniej, mniej więcej między pięćdziesięcioma a siedemdziesięcioma procentami, agent pisze na komunikatorze do osoby, która może odpowiedzieć na dodatkowe pytania, z gotowym kontekstem w załączeniu. Przy niskim ryzyku i wysokiej pewności pisze kod i otwiera propozycję zmian.

Ten sam schemat stosują do przeglądu kodu. Zmiana oceniona jako niskiego ryzyka może przejść bez ludzkiego przeglądu, a wysokiego ryzyka wciąga recenzenta do procesu. Podoba mi się w tym jedna rzecz szczególnie: strefa pośrednia nie kończy się blokadą ani przepuszczeniem, tylko rozmową. To jest dokładnie to, co robi dobry inżynier, który nie jest pewny, i zaskakująco rzadko projektuje się to wprost w procesy zautomatyzowane.

Warto zauważyć, co ten model zakłada w tle, bo o tym w tekście nie ma ani słowa. Ocena pewności pochodzi od tego samego systemu, który ma wykonać pracę, a modele językowe notorycznie są zbyt pewne siebie. Ocena ryzyka jest łatwiejsza, bo można ją oprzeć na sygnałach obiektywnych, takich jak liczba zmienionych plików, dotknięcie migracji bazy danych czy modyfikacja kodu obsługującego płatności. Gdybym wdrażał ten wzorzec, zbudowałbym ryzyko z reguł deterministycznych, a modelowi zostawił wyłącznie ocenę pewności, i to z zapasem bezpieczeństwa. Sam tekst jest częściowo płatny, więc szczegóły dwóch studiów przypadku oraz liczby dostawcze są dostępne tylko dla subskrybentów.

**Key takeaways:**
- Statyczne bramki dla człowieka albo blokują bezpieczną pracę, albo przepuszczają ryzykowną
- Dwa wymiary oceny: pewność agenta co do zadania i ryzyko związane ze zmianą
- Trzy wyjścia zamiast dwóch: zgłoszenie dla człowieka, pytanie na komunikatorze z kontekstem, gotowa propozycja zmian
- Ten sam mechanizm da się zastosować do przeglądu kodu, obsługi zgłoszeń błędów i reagowania na awarie
- Ocena pewności pochodzi od modelu, który zwykle przecenia własne możliwości, więc warto ryzyko liczyć regułami

**Why do I care:** To jest wzorzec, który mogę wdrożyć w poniedziałek i nie potrzebuję do tego żadnego nowego narzędzia. Wystarczy zbiór reguł liczących ryzyko zmiany z samego diffa, plus trzy różne ścieżki wyjścia zamiast jednej. Największą wartością jest dla mnie ta środkowa ścieżka, bo dziś w większości zespołów niepewność agenta kończy się albo cichym przepuszczeniem, albo porzuceniem zadania. Wysłanie pytania z gotowym kontekstem do konkretnej osoby zamienia niepewność w informację, i to jest realna oszczędność czasu po obu stronach.

**Link:** [Giving agents dynamic autonomy](https://refactoring.fm/p/giving-agents-dynamic-autonomy)
