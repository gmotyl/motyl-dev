---
title: "Casey Muratori o tym, dlaczego wydajność ma znaczenie, a wszyscy ją ignorują"
excerpt: "Rozmowa o profilerach prowadzących w ślepy zaułek, o czytaniu asemblera, o krytyce czystego kodu i o tym, dlaczego branża gier przeżyła swój moment ze sztuczną inteligencją dwadzieścia lat temu."
publishedAt: "2026-08-26"
slug: "casey-muratori-dlaczego-wydajnosc-ma-znaczenie"
hashtags: "#pragmaticengineer #performance #architecture #testing #engineering #career #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Dlaczego wydajny kod ma znaczenie, choć wszyscy go ignorują

**TLDR:** Rozmowa z twórcą gier i ewangelistą wydajności, który od lat zbiera dowody na to, że szybkie oprogramowanie przekłada się na wynik finansowy, i od lat słyszy w odpowiedzi wymówki. Najmocniejsze tezy dotyczą optymalizacji prowadzonej profilerem, krytyki czystego kodu i tego, dlaczego przedwczesna optymalizacja stała się wygodną wymówką.

**Summary:** Zacznę od tezy, która wywróciła mi sposób myślenia o optymalizacji. Standardowa procedura wygląda tak: profilujesz aplikację, poprawiasz najgorętsze miejsca, sprawdzasz, czy liczby się poprawiły, i powtarzasz. Gość podcastu twierdzi, że to metoda znajdowania minimum lokalnego i nic więcej. Każdy naprawdę dobry optymalizator, z jakim pracował, zaczynał od czegoś zupełnie innego: od ustalenia, co sprzęt teoretycznie potrafi, i nie przestawał, dopóki nie zamknął luki do tego poziomu. Różnica jest fundamentalna. Profiler mówi ci, gdzie jest wolno w twojej architekturze. Nie powie ci, że twoja architektura jest z gruntu wolna.

Z tego wynika bezpośrednio jego atak na najczęściej cytowany frazes naszej branży, czyli że przedwczesna optymalizacja jest źródłem wszelkiego zła. Argument brzmi tak: odkładanie wydajności na później oznacza, że później da się poprawić tylko punktowe wąskie gardła, a nie problemy architektoniczne, które je tworzą. Struktura danych wybrana na początku decyduje o tym, ile razy procesor będzie musiał sięgnąć do pamięci głównej, a tego nie naprawisz optymalizacją funkcji. Naprawisz to przepisaniem. Wydajność jest właściwością projektu, nie fazą po nim.

Fragment o czytaniu asemblera jest zaskakująco praktyczny. Nie chodzi o pisanie w nim, tylko o czytanie, i wystarczy do tego dwadzieścia do trzydziestu instrukcji. Podobnie z rozumieniem procesora, które według niego sprowadza się do trzech rzeczy: jak dane wpływają i wypływają, czyli jednostki ładowania i zapisu oraz kolejne poziomy pamięci podręcznej, jak instrukcje przepływają przez potoki, czyli przewidywanie skoków i pamięć podręczna instrukcji, oraz jak planowane są jednostki wykonawcze. Znając te trzy filary, z każdej zapowiedzi nowego procesora wyczytasz mniej więcej, jak będzie się sprawował. To bardzo zwięzła mapa i podoba mi się, że nie udaje kompletności.

Najbardziej kontrowersyjna jest jego krytyka rozwoju sterowanego testami, gdzie problemem jest dla niego część z testami. Uważa, że testy powinny być decyzją opartą na rachunku kosztów i korzyści, a nie domyślnym odruchem. W niektórych projektach pisanie testów z góry, albo w ogóle pisanie testów, jest po prostu złym wyborem. Nie zgadzam się z tym w kontekście, w którym pracuję, ale rozumiem, skąd to się bierze. W grach kryterium poprawności jest często wizualne i behawioralne, a nie logiczne, i test jednostkowy niewiele tam mówi. Warto jednak zauważyć, że autor uogólnia doświadczenie z bardzo specyficznej domeny na całą branżę, i to jest dokładnie ten rodzaj rozumowania, który sam gdzie indziej krytykuje.

Za to jego ogólna zasada jest znakomita i podpisuję się pod nią bez zastrzeżeń. Cechą prawie każdego świetnego inżyniera jest odmowa przyjmowania odziedziczonej mądrości programistycznej bez sprawdzenia jej w praktyce. Mówi wprost, że mnóstwo tej mądrości to nonsens, którego najwyraźniej nikt nigdy nie przetestował, a żeby coś zasłużyło na miano powszechnie przyjętej zasady, powinno mieć wykazane konkretne korzyści, czego zwykle nie da się zrobić. To zdanie warto powiesić nad biurkiem.

Wątek o branży gier jest osobną perełką i ma bezpośrednie przełożenie na naszą sytuację. Kiedy silniki gier stały się dostępne na licencji, każdy mógł zbudować i wydać grę. Początkowo dało to nowym twórcom niesamowitą siłę. Potem rynek zalało dziesiątki tysięcy premier rocznie i organiczne odkrywanie gier przestało istnieć. Dziś bez strategii marketingowej szanse gry na przebicie się są praktycznie zerowe. Autor stawia to jako lustro dla obecnej sytuacji z generowaniem kodu: bariera wejścia znika, produkcja rośnie wykładniczo, a dystrybucja staje się jedynym wąskim gardłem. Dorzuca do tego smutną obserwację, że stare gry przestały wyglądać staro, więc nowe premiery konkurują z tytułami sprzed dekady.

**Key takeaways:**
- Optymalizacja prowadzona profilerem znajduje minimum lokalne, a nie realny sufit możliwości sprzętu
- Dobrzy optymalizatorzy zaczynają od ustalenia teoretycznej przepustowości sprzętu i zamykają lukę do niej
- Przedwczesna optymalizacja jako frazes zasłania fakt, że wydajność jest właściwością architektury
- Do czytania asemblera wystarczy dwadzieścia do trzydziestu instrukcji, pisać nie trzeba umieć
- Rozumienie procesora sprowadza się do przepływu danych, przepływu instrukcji i planowania jednostek wykonawczych
- Branża gier przeszła własny kryzys nadprodukcji po udostępnieniu silników na licencji

**Why do I care:** Krytyka optymalizacji prowadzonej profilerem jest tym, co zabieram z tej rozmowy do własnej pracy. We frontendzie robimy dokładnie to samo: patrzymy na wykres wskaźników wydajnościowych, poprawiamy najgorszy i cieszymy się z kilku procent, zamiast zapytać, ile w ogóle powinno zajmować wyrenderowanie tej listy. Odpowiedź na to pytanie zwykle jest o rząd wielkości niższa niż to, co mamy, i wtedy okazuje się, że problemem nie jest funkcja, tylko decyzja o pobieraniu wszystkich danych na raz albo o strukturze stanu. Wydajność zaprojektowana kontra wydajność dostrojona to dwie zupełnie różne dyscypliny i większość zespołów zna tylko drugą.

**Link:** [Why performance actually matters (but gets widely ignored), with Casey Muratori](https://newsletter.pragmaticengineer.com/p/why-performant-code-matters-but-gets)
