---
title: "Frontend Focus: dziesięć funkcji CSS wartych głosu w Interop 2027, JPEG XL kontra AVIF, WCAG 3, koniec unload i CSS random()"
excerpt: "Przegląd Interop 2027 według Josha Comeau, porównanie JPEG XL z AVIF, nowy model zgodności WCAG 3, wycofanie zdarzenia unload w Chrome, przyszłość web components i funkcja random() w CSS."
publishedAt: "2026-10-22"
slug: "frontend-focus-interop-2027-jpeg-xl-avif-wcag-3-unload-web-components-css-random"
hashtags: "#frontendfocus #css #html #frontend #performance #accessibility #web-components #wcag #generated #pl"
source_pattern: "Frontend Focus"
---

## Interop 2027, dziesięć funkcji CSS, na które warto zagłosować

**TLDR:** Mozilla zbiera głosy na funkcje do Interop 2027, a Josh W. Comeau pokazuje swoją dziesiątkę, od funkcji CSS po zapytania o stan sticky. Większość da się już dziś stosować jako progresywne ulepszenie.

**Summary:** Interop to wspólny projekt przeglądarek, który zwykle w ciągu roku doprowadza wybraną funkcję do niemal pełnego wsparcia. Subgrid trafił do Interop 2023 i do końca roku działał wszędzie. Comeau opisuje, co może przynieść kolejna edycja.

Najbardziej obiecująca jest możliwość definiowania własnych funkcji w CSS, już działająca w Chromium. Autor chce jej użyć do konwersji współrzędnych biegunowych na kartezjańskie w animacjach. Drugie miejsce zajmuje corner-shape, który zmienia kształt samego pola obramowania, więc obramowania, kontury i cienie podążają za ściętym albo wygładzonym rogiem. W przeciwieństwie do clip-path nie ucina to efektów. Dalej są border-shape do rysowania własnych obramowań, zapytania kontenerowe dla zakotwiczonych elementów, które mówią, czy tooltip przeskoczył na zapasową pozycję, oraz animacje wyzwalane przewijaniem, czyli CSS-owa alternatywa dla IntersectionObservera.

W pozostałych punktach są reading-flow, który naprawia kolejność tabulatora w układach responsywnych, interpolate-size do animowania wysokości do auto, dekoracje szczelin w siatce, zapytania o stan sticky i przewijania oraz nieistniejąca jeszcze funkcja inherit, która pozwala zmodyfikować odziedziczoną wartość, na przykład zmniejszyć zaokrąglenie wewnętrznego pudełka. Comeau kończy mocnym argumentem. Skoro delegujemy pracę modelom, to musimy znać nowoczesny CSS, bo dane treningowe są sprzed lat i modele same po niego nie sięgną.

**Key takeaways:**
- Wszystkie funkcje poza inherit działają w Chromium, w Firefoxie i Safari brakuje.
- corner-shape, interpolate-size i reading-flow nadają się do progresywnego ulepszenia już teraz.
- Głosować może każdy w rankingu Mozilli.

**Why do I care:** Ten tekst jest praktyczną listą rzeczy, które warto sprawdzić w kodzie przed następnym redesignem. Najbardziej cenię reading-flow, bo dotyczy dostępności, a ta zwykle przegrywa w sprzedaży funkcji.

**Link:** [The Future of CSS, Josh W. Comeau](https://www.joshwcomeau.com/css/interop-2027/)

## JPEG XL kontra AVIF w zastosowaniach webowych

**TLDR:** Jake Archibald zmierzył oba formaty teraz, gdy JPEG XL działa we wszystkich głównych przeglądarkach. AVIF prawie zawsze daje mniejsze pliki.

**Summary:** Dla zdjęć stratnych najlepsza wersja JPEG XL jest przy domyślnym wysiłku kodera zwykle o 15 do 25 procent większa niż AVIF. Przy maksymalnym wysiłku różnica spada do 6 do 20 procent. Zdarzają się wyjątki, więc dla jednego ważnego obrazu warto przetestować oba formaty.

Duże znaczenie ma koder. Nowszy jixel zwykle wygrywa z libjxl, ale w kilku przykładach autor widzi, że "oszukuje" metrykę i wizualnie wypada gorzej. Przy zrzutach ekranu i ilustracjach AVIF jest dużo lepszy, bo JPEG XL bywa większy o 30 do 90 procent. Przy przezroczystości różnica jest jeszcze większa, bo jixel zawsze koduje alfę bezstratnie, co daje pliki dwa do trzech razy większe. AVIF jest też zwykle szybszy w kodowaniu i oszczędniejszy pamięciowo.

**Key takeaways:**
- Dla zdjęć AVIF jest zwykle mniejszy o 6 do 25 procent.
- Dla ilustracji, zrzutów ekranu i przezroczystości przewaga AVIF jest duża.
- Wybór kodera wpływa na wynik bardziej niż się zakłada.

**Why do I care:** Jeśli ktoś w zespole proponuje migrację z AVIF na JPEG XL "bo nowszy", masz teraz liczby, żeby tę rozmowę zakończyć. JPEG XL zostaje ciekawy do bezstratnej konwersji istniejących JPEG-ów, ale tego tekst nie testuje, więc nie wyciągam z niego więcej.

**Link:** [JPEG XL vs AVIF for web use-cases](https://jakearchibald.com/2026/jpeg-xl-vs-avif/)

## WCAG 3, czyli zgodność jako podłoga, a nie sufit

**TLDR:** Léonie Watson z TetraLogical tłumaczy, że WCAG 3 zamienia binarne zaliczenie na model z wymaganiami podstawowymi, dodatkowymi i deklaracjami. Zgodność ma być minimum, a nie celem.

**Summary:** Punktem wyjścia jest efekt kotwiczenia. Gdy karta kredytowa pokazuje minimalną spłatę, ludzie płacą o około 70 procent mniej niż bez niej. Watson przekłada to na dostępność. Prawie 30 lat testów zaliczone-niezaliczone nauczyło branżę optymalizować pod "przechodzi", zamiast pod "da się używać". Poziomy A, AA i AAA odziedziczono po priorytetach z WCAG 1, które wynikały z triażu błędów, a nie z analizy, gdzie powinna leżeć granica prawna.

WCAG 3 to pierwsza przebudowa od 1999 roku. Zamiast pytać, czy obraz ma tekst alternatywny, pyta, czy niewidomy może skorzystać z treści obrazu. Zgodność oznacza spełnienie wymagań podstawowych, co ma być z grubsza równoważne WCAG 2.2 AA, a wyższy poziom dojrzałości organizacje pokazują przez wymagania dodatkowe i brąz, srebro lub złoto. Watson widzi w tym gamifikację, czyli motywację zewnętrzną, która już dziś skłania BBC do robienia więcej, niż wymaga prawo. Duże ryzyko, które autorka sama nazywa, to prawo. Prawie każda ustawa odwołuje się do konkretnej wersji WCAG, więc zmiana modelu oceny zmienia to, na co wskazują sądy i działy zakupów.

**Key takeaways:**
- Dotychczasowe poziomy A, AA, AAA wynikały z triażu, nie z prawa.
- WCAG 3 ma wymagania podstawowe, dodatkowe i deklaracje procesowe.
- Podstawa ma odpowiadać mniej więcej WCAG 2.2 AA.
- Największe ryzyko to dopasowanie do przepisów.

**Why do I care:** Jeśli odpowiadasz za dostępność, nie czekaj na finalną specyfikację, tylko zacznij testować z ludźmi, bo to jedyna praktyka, która przeżyje zmianę standardu. Tekst jest za to zbyt optymistyczny co do tego, że regulatorzy sprawnie przyjmą stopniowaną skalę. Przy braku odpowiedzi, kto dziś zapłaci za brąz i srebro, to na razie obietnica.

**Link:** [WCAG 3: a different future for accessibility](https://tetralogical.com/blog/2026/10/15/wcag3/)

## Chrome wycofał zdarzenie unload

**TLDR:** Od Chrome 155 procedury unload domyślnie nie są wywoływane. Użycie spadło z 18 do poniżej 4 procent nawigacji, a dodatkowe 5 procent nawigacji zyskało bfcache.

**Summary:** Zdarzenie unload powstało, gdy strony otwierano, czytano i zamykano. Dzisiaj na telefonach system często po cichu zabija strony w tle bez uruchamiania obsługi unload, a w połączeniu z bfcache zdarzenie powodowało niespójne zachowania. Chrome wdrażał zmianę etapami od marca 2025 do września 2026, uważnie monitorując zgłoszenia awarii.

Efekt jest wymierny. Unload przestał być jedyną przyczyną blokady bfcache dla 6 procent nawigacji, spadł do około 1 procenta. Strony mogą wyłączyć zmianę przez Permissions Policy, a zespół Chrome nie planuje usuwać tej możliwości, ale zachęca do porzucenia zdarzenia. Inne przeglądarki mogą pójść tą samą drogą.

**Key takeaways:**
- Zdarzenie unload nie odpala się już domyślnie w Chromium.
- Zamiast niego używaj pagehide lub visibilitychange do zapisywania stanu i wysyłania analityki.
- Odblokowanie bfcache przyspiesza nawigację wstecz i do przodu.

**Why do I care:** Sprawdź w kodzie zewnętrznych skryptów analitycznych i widgetów, czy coś nadal wysyła dane w unload. To ciche zepsucie, które nie rzuci błędem, tylko zniknie ci po cichu kawałek metryk.

**Link:** [Unload event deprecated in Chrome](https://developer.chrome.com/blog/unload-deprecated-in-chrome)

## Czy web components mają przyszłość, jeśli nikt ich nie pisze

**TLDR:** Nolan Lawson, który lata pracował nad frameworkiem opartym na web components, przyznaje, że kodowanie agentowe osłabiło ich podstawową obietnicę. Zostają mu dwa słabe argumenty i jedno solidne zwycięstwo standardowe.

**Summary:** Punktem wyjścia jest Modern Web Guidance od Google'a, zestaw umiejętności, który prowadzi agenta ku nowoczesnym funkcjom przeglądarki. Lawson sprawdził kod i stwierdził, że web components są tam przypisem, a sekcja "zdecyduj, czy w ogóle potrzebujesz elementu niestandardowego" brzmi wręcz zniechęcająco. Jego diagnoza jest taka, że web components powstały dla świata, w którym ludzie piszą HTML ręcznie, kod jest rzadki, więc ponowne użycie jest koniecznością. Dziś żadne z tych założeń nie jest już prawdziwe.

Wskazuje też, że szkodzi to frameworkom, bo coraz więcej zespołów przepisuje frontend z jednego frameworka na inny "bo lepszy dla agentów". Jeśli warstwa frameworka jest jednorazowa, to warstwa pod nią tym bardziej. Dwa ratunki to mikrofrontendy, gdzie web components izolują style i zdarzenia, choć iframe daje jeszcze twardszą granicę, oraz komponenty samodzielne, jak jego emoji-picker. Zostaje zwycięstwo standardowe, bo pojęcia z web components, jak parts i sloty, trafiły do Open UI i dały customizable select, popovery i invoker commands. Lawson zauważa też, że renderowanie po stronie serwera, współdzielenie arkuszy stylów i dostępność wciąż są nierozwiązane.

**Key takeaways:**
- Modern Web Guidance prawie nie poleca web components.
- Argument "ponowne użycie" słabnie, gdy przepisanie to jeden prompt.
- Najlepsze przypadki to samodzielne komponenty i izolacja mikrofrontendów.
- SSR, współdzielone style i dostępność pozostają niezałatwione.

**Why do I care:** Szczerze, to najbardziej uczciwy tekst o web components, jaki ostatnio czytałem. Autor nie pisze jednak, co z tym zrobić w istniejącej bibliotece komponentów. Jeśli masz design system na web components, nie przepisuj go z paniki, ale przestań zakładać, że standard sam cię obroni.

**Link:** [Do web components have a future if nobody is writing them?](https://nolanlawson.com/2026/10/19/do-web-components-have-a-future-if-nobody-is-writing-them/)

## Funkcja random() w CSS, czyli kontrolowany nieład

**TLDR:** Natywna funkcja random() jest w Safari i trafia do Chrome 156. Brecht De Ruyte pokazuje w Smashing Magazine, gdzie niedoskonałość ma sens, a gdzie nie.

**Summary:** Funkcja losuje wartość z zakresu, opcjonalnie z krokiem, a granice muszą mieć tę samą jednostkę. Jeśli szerokość i wysokość mają być zgodne, używa się klucza buforowania z modyfikatorem element-scoped, inaczej każdy element dostanie niezależną wartość, a wspólny klucz globalny zrobiłby wszystkie karty identycznymi. Dla bezpieczeństwa eksperymenty owija się w zapytanie supports.

Autor pokazuje lekko przekrzywione litery, które prostują się po najechaniu, skaczące litery z indywidualnym czasem i opóźnieniem, karty rozkładane przy przewijaniu oraz rozmycie jak bokeh. Praktyczne wskazówki są ważniejsze od demonstracji. Losowość pasuje do dekoracji, tła i desynchronizacji pętli ambientowych. Nie powinna dotykać siatki, szerokości pól formularzy, tekstu ciągłego ani małych celów kliknięcia. Przy rozbijaniu słowa na spany trzeba ukryć je przed czytnikiem ekranu i dodać pełną etykietę, a animacje wyłączyć przy ustawieniu prefers-reduced-motion.

**Key takeaways:**
- Losowanie w czystym CSS bez JavaScriptu i bez pętli preprocesora.
- Klucz z element-scoped utrzymuje spójność wartości wewnątrz jednego elementu.
- Losowość tylko dla dekoracji, nigdy dla układu i treści.

**Why do I care:** W design systemie to funkcja niszowa. Niemniej zabawny efekt "organicznych" nagłówków kończy się tak jak każdy efekt, czyli wchodzi na strony, gdzie nikt go nie sprawdził z czytnikiem ekranu. Ustaw regułę review, zanim ktoś ją wypróbuje na przycisku.

**Link:** [Embracing Playful Imperfection With The CSS random() Function](https://www.smashingmagazine.com/2026/10/embracing-playful-imperfection-css-random-function/)
