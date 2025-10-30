---
title: "React Native's New Architecture Goes Default & The CSS Grid Masonry Debate"
excerpt: "React Native 0.76 makes the New Architecture default after 6 years of development, plus debates over CSS grid masonry syntax"
publishedAt: "2024-11-01"
slug: "react-native-new-architecture-css-masonry-debate"
hashtags: "#generated #pl #react-native #react #css #frontend #architecture #performance #mobile #javascript"
---

## React Native's New Architecture jest domyślne w wersji 0.76

**TLDR:** Po 6 latach przebudowy, React Native 0.76 wprowadza New Architecture jako domyślną opcję, eliminując asynchroniczny bridge na rzecz synchronicznej komunikacji z platformą natywną. To fundamentalna zmiana w sposobie działania React Native.

**Summary:**

Zespół React Native oficjalnie ogłosił, że po sześciu latach intensywnej pracy, New Architecture staje się domyślną opcją w React Native 0.76. To nie jest zwykły update - to kompletna przebudowa fundamentów platformy, która zmienia sposób komunikacji JavaScript z kodem natywnym.

Stara architektura opierała się na asynchronicznym bridge'u, który wymagał serializacji wszystkich wywołań do JSON i przesyłania ich przez jeden kanał komunikacyjny. Brzmi znajomo? To klasyczny bottleneck, który każdy architekt rozpozna - jeden punkt awarii, który staje się wąskim gardłem pod obciążeniem. Gdy aplikacja stawała się bardziej złożona, ten bridge zaczynał pękać w szwach.

New Architecture wprowadza trzy kluczowe zmiany: nowy system modułów natywnych umożliwia synchroniczną komunikację przez C++ API, nowy system renderowania wspiera wielowątkowe drzewa komponentów, a nowa pętla zdarzeń pozwala React przerywać renderowanie dla priorytetowych interakcji użytkownika. To oznacza koniec z opóźnieniami, które sprawiały, że aplikacje React Native czuły się jak webowe w porównaniu do natywnych.

Dla zespołów architektów to oznacza możliwość budowania bardziej responsywnych aplikacji mobilnych bez kompromisów w wydajności. React Native może teraz konkurować bezpośrednio z natywnymi aplikacjami pod względem płynności animacji i czasu odpowiedzi. Zespoły mogą także korzystać z nowoczesnych funkcji React 18, w tym Suspense i Transitions, co otwiera nowe możliwości w zarządzaniu stanem i ładowaniem danych.

**Key takeaways:**
- New Architecture eliminuje asynchroniczny bridge na rzecz synchronicznej komunikacji C++
- Pełne wsparcie dla React 18 włączając Suspense, Transitions i automatyczne batching
- Wsteczna kompatybilność z bibliotekami napisanymi dla starej architektury
- Nowe React Native DevTools z debuggerem opartym na Chrome DevTools

**Tradeoffs:**
- Synchroniczna komunikacja zwiększa responsywność ale może blokować główny wątek przy intensywnych operacjach
- Nowa architektura oferuje lepszą wydajność kosztem większej złożoności implementacji

**Link:** [React Native 0.76 - New Architecture by default](https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture)

## Debata nad składnią CSS Masonry - część gridu czy osobny moduł?

**TLDR:** CSS Working Group debatuje czy masonry powinno być częścią CSS Grid (`grid-template-rows: masonry`) czy osobnym modułem layoutu (`display: masonry`). Autor argumentuje za integracją z gridem ze względów praktycznych.

**Summary:**

Isha Deedwania porusza fascynującą debatę toczącą się w CSS Working Group - czy masonry layout powinno być rozszerzeniem CSS Grid, czy kompletnie nowym modułem layoutu. To nie jest tylko akademicka dyskusja o składni - ma realne konsekwencje dla tego, jak będziemy budować layouty w przyszłości.

Obecna propozycja Chrome'a sugeruje `display: masonry` jako nowy typ layoutu, podczas gdy WebKit preferuje `grid-template-rows: masonry` jako rozszerzenie istniejącego gridu. Autor przekonująco argumentuje, że w rzeczywistych aplikacjach rzadko mamy statyczny masonry layout. Częściej potrzebujemy responsywnych designów, które na mobilnych urządzeniach używają zwykłego gridu, a na większych ekranach przełączają się na masonry.

Z perspektywy architektury to kluczowa różnica. Jeśli masonry to osobny moduł, każda zmiana layoutu wymaga przepisania całego systemu pozycjonowania. Jeśli to rozszerzenie gridu, możemy płynnie przechodzić między trybami w media queries. To jak różnica między refaktoryzacją całej aplikacji a dodaniem jednej flagi feature.

Autor także krytykuje nazwę "masonry" jako zbyt specjalistyczną - sugeruje alternatywy jak "packed" czy "collapse", które lepiej opisują funkcjonalność. To ważna obserwacja o tym, jak nazewnictwo w CSS wpływa na adopcję i zrozumienie przez deweloperów.

Dla zespołów frontend to oznacza konieczność przemyślenia strategii migracji. Jeśli wygra propozycja Chrome'a, będziemy musieli czekać lata na pełne wsparcie przeglądarek zanim będziemy mogli używać masonry w produkcji. Integracja z gridem daje przynajmniej fallback - layout będzie działał, tylko bez efektu masonry.

**Key takeaways:**
- Dwie konkurujące propozycje: `display: masonry` vs `grid-template-rows: masonry`
- Integracja z gridem umożliwia lepsze responsywne designy i fallbacki
- Nazwa "masonry" może być zbyt specjalistyczna - "packed" lub "collapse" byłyby lepsze
- Praktyczne zastosowania wymagają kombinacji zwykłego gridu i masonry w różnych breakpointach

**Tradeoffs:**
- Nowy moduł `display: masonry` daje czystszą składnię kosztem kompatybilności i responsywności
- Integracja z gridem zapewnia fallbacki ale może być myląca dla deweloperów

**Link:** [Should masonry be part of CSS grid?](https://ishadeed.com/article/css-grid-masonry/)

## Przewodnik po renderowaniu w React - interaktywne wyjaśnienie

**TLDR:** ui.dev publikuje interaktywny przewodnik wyjaśniający kiedy i jak React renderuje komponenty, z wizualizacjami procesu tworzenia snapshotów i aktualizacji widoku.

**Summary:**

Tyler McGinnis z ui.dev stworzył kompleksowy przewodnik po renderowaniu w React, który wreszcie w przystępny sposób wyjaśnia jeden z najbardziej mylących aspektów tej biblioteki. Mimo że React można opisać prostym równaniem v = f(s), nadal wielu deweloperów ma błędne wyobrażenia o tym, kiedy dokładnie funkcja f jest wywoływana.

Przewodnik rozpoczyna się od fundamentalnego wyjaśnienia czym jest renderowanie - to po prostu wywołanie komponentu funkcyjnego przez React w celu aktualizacji widoku. Proces składa się z dwóch kroków: React tworzy snapshot komponentu zawierający props, state, event handlery i opis UI, a następnie używa tego snapshotu do aktualizacji widoku.

Kluczowa insight dotyczy tego, kiedy React re-renderuje komponenty. Wbrew intuicji, React nie renderuje tylko wtedy gdy zmienia się state danego komponentu - renderuje także wszystkie komponenty dzieci. To oznacza, że zmiana state w komponencie rodzicu może wywołać lawinę re-renderów w całym poddrzewie, nawet jeśli dzieci nie używają zmienionych danych.

Przewodnik używa interaktywnych wizualizacji, które pokazują jak React tworzy snapshoty i aktualizuje DOM. To szczególnie wartościowe dla deweloperów, którzy uczą się wizualnie - mogą zobaczyć dokładnie co dzieje się pod maską podczas renderowania.

Dla zespołów to oznacza lepsze zrozumienie optymalizacji wydajności. Zamiast ślepo dodawać React.memo wszędzie, deweloperzy mogą świadomie decydować gdzie są potrzebne optymalizacje na podstawie zrozumienia procesu renderowania. To także pomaga w debugowaniu problemów wydajnościowych - gdy wiesz jak działa renderowanie, łatwiej znaleźć źródło niepotrzebnych re-renderów.

**Key takeaways:**
- Renderowanie to tworzenie snapshotu komponentu i aktualizacja widoku na jego podstawie
- React re-renderuje komponenty gdy zmienia się ich state lub re-renderuje się komponent rodzic
- Zmiana state w rodzicu powoduje re-render wszystkich dzieci, niezależnie od tego czy używają zmienionych danych
- Zrozumienie tego procesu jest kluczowe dla świadomych optymalizacji wydajności

**Link:** [The Interactive Guide to Rendering in React](https://ui.dev/why-react-renders)

## Abstrakcje UI: headless, boneless, skinless i lifeless

**TLDR:** Nerd.dev wprowadza nową terminologię dla abstrakcji UI: headless (funkcjonalność bez stylów), boneless (same style bez struktury), skinless (struktura bez stylów) i lifeless (logika bez UI).

**Summary:**

Ten artykuł wprowadza świeżą perspektywę na abstrakcje UI, które stały się standardem w nowoczesnym frontend developmencie. Autor kreatywnie klasyfikuje różne podejścia używając metafor anatomicznych, co może brzmieć dziwacznie, ale faktycznie pomaga zrozumieć różnice między podejściami.

Headless UI, jedyna powszechnie używana nazwa z tej listy, to komponenty z pełną funkcjonalnością ale bez stylów - jak HeadlessUI czy Radix Primitives. Autor słusznie zauważa, że nazwa jest myląca, bo te komponenty wcale nie są "bez głowy" - mają pełną logikę i strukturę.

"Boneless UI" to biblioteki stylów bez struktury - jak Tailwind CSS. Dostarczają "skórę" ale wymagają własnej "struktury kostnej". To interesujące spojrzenie na utility-first CSS - nie masz gotowych komponentów, ale masz system do ich stylowania.

"Skinless UI" to czysta struktura HTML bez stylów, a "Lifeless UI" to logika bez interfejsu. Te kategorie są mniej powszechne, ale pomagają zrozumieć spectrum abstrakcji dostępnych deweloperom.

Kluczowa obserwacja dotyczy tego, że różne zespoły potrzebują różnych poziomów abstrakcji w zależności od swoich potrzeb. Startupy mogą preferować "fully loaded" biblioteki jak Chakra UI dla szybkości, podczas gdy zespoły z własnymi design systemami mogą wolieć kompozycję różnych warstw abstrakcji.

Dla architektów to oznacza konieczność świadomego wyboru poziomu abstrakcji. Każda warstwa dodaje elastyczności kosztem złożoności. Zespoły muszą znaleźć balans między szybkością dostarczania a kontrolą nad designem i funkcjonalnością.

**Key takeaways:**
- Headless UI to komponenty z funkcjonalnością bez stylów (HeadlessUI, Radix)
- Boneless UI to style bez struktury (Tailwind CSS)
- Skinless UI to struktura bez stylów, Lifeless UI to logika bez interfejsu
- Różne zespoły potrzebują różnych poziomów abstrakcji w zależności od potrzeb

**Tradeoffs:**
- Wyższy poziom abstrakcji zwiększa elastyczność kosztem złożoności implementacji
- Gotowe biblioteki przyspieszają rozwój ale ograniczają kontrolę nad designem

**Link:** [Headless, boneless, skinless & lifeless UI](https://nerdy.dev/headless-boneless-and-skinless-ui)

## Vanilla JavaScript implementacja React od podstaw

**TLDR:** GitHub gist pokazuje implementację podstawowych konceptów React (komponenty, hooks, virtual DOM, diffing) w czystym JavaScript w jednym pliku.

**Summary:**

Ten fascynujący gist na GitHubie demonstruje jak zaimplementować podstawowe funkcjonalności React używając tylko vanilla JavaScript. To nie jest kolejny tutorial "zbuduj własny React" - to kompaktowa, ale kompletna implementacja pokazująca jak działają kluczowe koncepty.

Implementacja zawiera useState hook z mechanizmem śledzenia aktualnego komponentu, system virtual DOM z funkcjami createElement i diff, oraz algorytm patching do aktualizacji rzeczywistego DOM. Kod jest zaskakująco krótki - mieści się w jednym pliku HTML z około 200 liniami JavaScript.

Szczególnie interesujący jest sposób implementacji useState - używa globalnej zmiennej currentComponent do śledzenia kontekstu i indeksu state. To eleganckie rozwiązanie problemu, który w prawdziwym React wymaga znacznie bardziej skomplikowanego mechanizmu fiber.

Virtual DOM jest uproszczony ale funkcjonalny - reprezentuje elementy jako obiekty z tag, props i children. Algorytm diffing porównuje stare i nowe drzewo, generując listę zmian, które są następnie aplikowane do prawdziwego DOM.

Dla zespołów to doskonały materiał edukacyjny do zrozumienia fundamentów React. Wielu deweloperów używa React nie rozumiejąc jak działa pod spodem. Ten kod pokazuje, że podstawowe koncepty nie są magiczne - to logiczne rozwiązania konkretnych problemów.

Jednocześnie kod pokazuje dlaczego prawdziwy React jest tak skomplikowany. Ta implementacja nie obsługuje edge cases, optymalizacji wydajności, error boundaries, czy współbieżności. To dobra lekcja o tym, że prostota w API często ukrywa ogromną złożoność implementacji.

**Key takeaways:**
- Podstawowe funkcjonalności React można zaimplementować w ~200 liniach JavaScript
- useState używa globalnego kontekstu i indeksów do śledzenia state
- Virtual DOM to proste obiekty JavaScript reprezentujące strukturę DOM
- Algorytm diffing porównuje drzewa i generuje listę zmian do aplikacji

**Link:** [React from scratch in vanilla JavaScript](https://gist.github.com/faustinoaq/b19da758fc45155a0b3b10d9f578c5ce)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
