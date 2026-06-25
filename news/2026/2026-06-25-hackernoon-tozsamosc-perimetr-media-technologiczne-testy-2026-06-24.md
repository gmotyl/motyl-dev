---
title: "Tożsamość jako nowy perimetr, śmierć mediów technologicznych i piękno sensownych testów"
excerpt: "HackerNoon z 24 czerwca 2026 przynosi trzy tematy warte uwagi: zmianę paradygmatu w cyberbezpieczeństwie, rozpad klasycznego modelu mediów technologicznych i problem testów pokrywających kod, lecz nieweryfikujących niczego."
publishedAt: "2026-06-24"
slug: "hackernoon-tozsamosc-perimetr-media-technologiczne-testy-2026-06-24"
hashtags: "#hackernoon #cybersecurity #testing #tech-media #generated #pl"
source_pattern: "HackerNoon"
---

## Tożsamość zastąpiła firewall jako rzeczywisty perimetr bezpieczeństwa

**TLDR:** Salt Typhoon potrzebował lat, niestandardowych rootkitów i zasobów państwowych, żeby włamać się do infrastruktury. Grupa Scattered Spider (znana też jako UNC3944 lub Octo Tempest) osiągnęła porównywalne efekty, po prostu rozmawiając z helpdeskiem. Identity stało się głównym polem bitwy w cyberbezpieczeństwie.

Przez lata branża bezpieczeństwa myślała w kategoriach sieci. Firewall, DMZ, segmentacja, IDS/IPS - to wszystko rozwiązania zakładające, że atakujący musi gdzieś wejść fizycznie przez jakiś protokół sieciowy. Scattered Spider udowodnił, że ten model jest zbyt drogi dla atakującego tylko wtedy, gdy ten nie umie rozmawiać z ludźmi.

Metody tej grupy to klasyczny vishing połączony z sim-swappingiem: dzwonisz do helpdesku, podajesz się za pracownika zablokowanego z konta, prosisz o reset MFA. Atakujesz nie systemy, lecz procedury, które te systemy chronią. Jeśli polityka bezpieczeństwa mówi "zresetuj MFA po potwierdzeniu przez telefon", to właśnie ta polityka jest podatnością.

Artykuł zwraca uwagę, że tożsamość stała się całym polem bitwy. Organizacje zainwestowały miliony w EDR, SIEM i SOAR, a potem pada ich helpdesk bo ktoś był miły w słuchawce. Zero Trust to nie tylko technologia - to przede wszystkim filozofia weryfikacji, którą trzeba wdrożyć w każdym procesie, nie tylko w infrastrukturze technicznej.

Z perspektywy architekta IT patrzę na to jako na potwierdzenie czegoś, o czym mówię od lat: najsłabszym ogniwem bezpieczeństwa rzadko jest kod. Częściej jest to człowiek wykonujący procedurę, która teoretycznie istnieje po to, żeby pomóc.

**Key takeaways:**
- Grupy takie jak Scattered Spider włamują się przez social engineering, nie przez exploity techniczne
- MFA reset procedures są częstym wektorem ataku - wymagają równie mocnych zabezpieczeń jak same systemy
- Zero Trust musi obejmować procesy organizacyjne, nie tylko infrastrukturę sieciową

**Why do I care:** Jako frontend developer słyszę "to nie nasz obszar, to security". Nieprawda. Każdy, kto pisze kod obsługujący autentykację, zarządza sesjami albo ma dostęp do production deploymentu, jest częścią tej powierzchni ataku. Rozumienie, jak działają ataki na tożsamość, powinno być standardową wiedzą w każdym zespole inżynierskim.

**Link:** [Nobody Hacked the Firewall: Inside the Year Identity Became the Whole Battlefield](https://hackernoon.com/nobody-hacked-the-firewall-inside-the-year-identity-became-the-whole-battlefield)

---

## Śmierć mediów technologicznych i to, co przychodzi po nich

**TLDR:** Google AI zabija serwisy technologiczne. Były właściciel grupy medialnej tłumaczy, dlaczego klasyczny model online-media jest zepsuty i co go zastępuje. Ruch organiczny z wyszukiwarek spada dramatycznie od czasu wdrożenia AI Overviews.

Przez lata model był prosty: piszesz o technologii, Google przyciąga czytelników przez wyszukiwarkę, reklamodawcy płacą za ten ruch. Działało przez dwadzieścia lat, z różnymi zawirowaniami algorytmicznymi. AI Overviews zmieniło to fundamentalnie - zamiast klikać w wyniki, użytkownicy dostają odpowiedź bezpośrednio na stronie wyników Google.

Autorka prowadzi dawniej grupę medialną i pisze z perspektywy kogoś, kto obserwował ten proces od środka. Nie chodzi tylko o spadek ruchu - chodzi o to, że model ekonomiczny stracił sens. Jeśli Google udziela odpowiedzi z twoich treści bez kierowania użytkowników do ciebie, to twoja praca subsydiuje ich produkt.

Co powstaje w miejsce tradycyjnych mediów technologicznych? Przede wszystkim twórcy niezależni z silną marką osobistą, newslettery płatne, społeczności z subskrypcją. HackerNoon samo w sobie jest przykładem tego przejścia - model platformy, gdzie autorzy piszą, a platforma buduje dystrybucję inaczej niż przez SEO.

Obserwuję to samo z perspektywy konsumenta treści o frontendzie. Serwisy, które jeszcze trzy lata temu byłem w stanie wymienić z pamięci jako wartościowe źródła, albo znikły, albo zrobiły pivot na clickbait. Zostały newslettery, YouTube i DevRel od firm produktowych. Pytanie, czy DevRel jest niezależnym dziennikarstwem czy marketingiem w przebraniu, pozostaje otwarte.

**Key takeaways:**
- AI Overviews Google radykalnie zmniejsza ruch z wyszukiwarek do serwisów treści
- Klasyczny model reklamowy online-media przestał być opłacalny dla większości serwisów
- Newslettery, płatne subskrypcje i marki osobiste przejmują rolę tradycyjnych mediów technologicznych

**Why do I care:** Jako ktoś, kto regularnie czyta i czasem pisze o technologii, to nie jest tylko problem wydawców. To problem z ekosystemem wiedzy. Jeśli dobra treść techniczna przestaje być opłacalna do tworzenia, to wszyscy tracimy - zostają tylko sponsorowane artykuły i treści tworzone przez firmy produktowe z określonym interesem.

**Link:** [The End of Tech Media as We Knew It and What Is Replacing It](https://hackernoon.com/the-end-of-tech-media-as-we-knew-it-and-what-is-replacing-it)

---

## Code Smell 320: testy, które niczego nie weryfikują

**TLDR:** Piszesz testy dotykające każdej linii kodu, lecz niesprawdzające żadnych rezultatów. To tworzy fałszywe poczucie bezpieczeństwa w zepsutym systemie. Code coverage to metryka, którą można sfałszować bez żadnego wysiłku.

Maksymiliano Contieri kontynuuje serię o code smells tematem, który znam z niemal każdego projektu, w którym pracowałem. Zespół ustawia próg coverage na 80% lub 90%, potem deweloperzy piszą testy, które wywołują metody, lecz nie sprawdzają zwracanych wartości. Coverage rośnie, CI jest zielone, produkcja się psuje.

Problem jest strukturalny. Coverage mierzy, które linie kodu zostały wykonane podczas testów, nie to, czy te testy cokolwiek weryfikują. Możesz wywołać `processPayment()` w teście, nie sprawdzić ani kwoty, ani statusu, ani efektu ubocznego i linia zostanie zaliczona jako pokryta. To nie test - to przepalanie cykli CPU.

Dobry test ma trzy części: setup stanu, akcję i asercję. Bez asercji masz tylko "ta funkcja nie rzuca wyjątku przy tym wywołaniu". To może być wartościowe jako smoke test, lecz nie jako specyfikacja zachowania. Jeśli refaktoryzujesz metodę i zmienisz jej wynik, zepsute testy powinny od razu powiedzieć, co się popsuło. Testy bez asercji tego nie powiedzą.

Contieri proponuje zastąpić komentarze testami - to dobry kierunek. Zamiast pisać `// oblicza podatek` w kodzie produkcyjnym, napisz test `calculatesTaxForEUCustomers()`, który weryfikuje konkretne liczby dla konkretnych przypadków. Kod staje się samodokumentujący przez zestaw wykonywalnych specyfikacji.

**Key takeaways:**
- Wysoka wartość code coverage nie gwarantuje jakości testów - można ją osiągnąć bez żadnych asercji
- Test bez asercji to tylko uruchomienie kodu, nie weryfikacja jego zachowania
- Testy z konkretnymi asercjami zastępują komentarze jako lepsza forma dokumentacji

**Why do I care:** W TypeScript/React codebasach widzę ten problem szczególnie często w testach komponentów - `render(<MyComponent />)` i żadnej asercji, bo "przynajmniej nie crashuje". To nie jest testowanie, to marnowanie czasu CI i budowanie fałszywej pewności siebie. Zacząłem wymagać w code review, żeby każdy test miał przynajmniej jeden `expect` sprawdzający konkretny stan lub output.

**Link:** [Code Smell 320 - Brushing Over Real Problems](https://hackernoon.com/code-smell-320-brushing-over-real-problems)
