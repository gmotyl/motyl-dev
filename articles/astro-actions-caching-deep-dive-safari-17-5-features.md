---
title: "Astro Actions, Caching Deep Dive, and Safari 17.5 Features"
excerpt: "Nowy release Astro z Actions, głęboka analiza cachingu w aplikacjach webowych, oraz nowości w Safari 17.5."
publishedAt: "2024-05-13"
slug: "astro-actions-caching-deep-dive-safari-17-5-features"
hashtags: "#generated #pl #frontend #astro #css #safari #webkit #caching #performance #react #javascript #typescript #text-wrap #masonry #liveview #phoenix #elixir"
---

## Astro Actions - rewolucja w komunikacji frontend-backend

**TLDR:** Astro 4.8 wprowadza eksperymentalną funkcję Actions, która umożliwia definiowanie i wywoływanie funkcji backendowych z kodu klienta z pełną type safety. To znaczący krok w kierunku uproszczenia full-stack developmentu.

**Summary:**

To jest naprawdę fascynujące, co Astro robi z Actions. Przez lata obserwowaliśmy, jak różne frameworki próbują rozwiązać ten fundamentalny problem - jak w prosty sposób łączyć frontend z backendem, zachowując przy tym type safety. Astro podchodzi do tego w bardzo elegancki sposób.

Kluczowa idea polega na tym, że definiujesz swoje akcje w globalnym handlerze używając funkcji `defineAction()`, a następnie możesz je wywoływać z dowolnego komponentu klienta używając obiektu `actions` z `astro:actions`. Co mnie szczególnie fascynuje, to że Astro automatycznie parsuje żądania formularzy do obiektów używając schematu Zod - nie musisz już ręcznie rzutować wyników `formData.get()`.

To podejście przypomina mi to, co widzimy w Remix czy SvelteKit, ale Astro dodaje swój własny twist. Szczególnie interesujące jest to, jak eliminuje boilerplate code - nie musisz już pisać kodu do bezpiecznego parsowania request body na podstawie Content-Type czy do pobierania wartości z form data.

Z perspektywy biznesowej to ma ogromny sens. Astro inwestuje w swoją platformę bazodanową i widzi, jak społeczność przechodzi od statycznych treści do bardziej dynamicznych przypadków użycia. Actions to naturalny krok w tej ewolucji.

Myślę, że to może być game changer dla developerów, którzy chcą budować full-stack aplikacje bez kompleksowości, którą zwykle niosą ze sobą tradycyjne podejścia. Type safety z automatu, minimalna konfiguracja, progressive enhancement - to wszystko brzmi bardzo obiecująco.

**Key takeaways:**
- Astro Actions umożliwiają definiowanie backend funkcji z pełną type safety
- Automatyczne parsowanie form data eliminuje boilerplate code
- Podejście podobne do Remix i SvelteKit, ale z unikalnym Astro twist

**Link:** [Astro 4.8 Release](https://astro.build/blog/astro-480/)

## Głęboka analiza cachingu - więcej niż tylko "przyspiesza rzeczy"

**TLDR:** Jamie Turner z Convex przedstawia dogłębną definicję cache'a jako "nieautorytatywnej reprezentacji danych utrzymywanej dla wydajności" i wyjaśnia wszystkie implikacje tego pozornie prostego konceptu.

**Summary:**

To jest jeden z najlepszych artykułów o cachingu, jakie czytałem od dawna. Jamie Turner nie zadowala się powierzchownym "cache przyspiesza rzeczy", ale zagłębia się w fundamentalne koncepty, które naprawdę pomagają zrozumieć, kiedy i jak używać cache'ingu.

Definicja "nieautorytatywnej reprezentacji danych utrzymywanej dla wydajności" może brzmieć jak buzzword soup, ale każde słowo ma głębokie znaczenie. "Nieautorytatywna" oznacza, że zawsze istnieje jedno źródło prawdy - twoja baza danych, API, czy cokolwiek innego. Cache to tylko kopia, którą można bezpiecznie utracić.

Co mnie szczególnie uderzyło, to jak Turner wyjaśnia różne sposoby, w jakie cache może zapewnić wydajność. Nie chodzi tylko o szybszy hardware - choć Redis w RAM vs Postgres na dysku to klasyczny przykład. Czasami chodzi o fizyczną odległość, jak w przypadku browser cache. Twój laptop może nie mieć szybszego dysku niż serwer, ale połączenie sieciowe i latencja robią całą różnicę.

Artykuł świetnie pokazuje też, dlaczego cache invalidation to jeden z najtrudniejszych problemów w informatyce. Kiedy masz nieautorytatywną kopię danych, musisz wiedzieć, kiedy ta kopia przestaje być aktualna. To nie jest tylko techniczny problem - to fundamentalny trade-off między wydajnością a konsystencją.

Turner omawia również koncepcję "reprezentacji", która jest subtelna ale ważna. Cache nie musi przechowywać danych w dokładnie tej samej formie co źródło. Może być to skompresowana wersja, pre-computed rezultat, czy nawet całkowicie inna struktura danych zoptymalizowana pod konkretne use case.

**Key takeaways:**
- Cache to nieautorytatywna kopia danych, co ma głębokie implikacje dla architektury
- Wydajność może pochodzić z szybszego hardware, mniejszej latencji, czy lepszej lokalizacji
- Cache invalidation pozostaje jednym z najtrudniejszych problemów w programowaniu

**Link:** [The Ultimate Caching Definition](https://stack.convex.dev/caching-in/?ref=bytes)

## Safari 17.5 - text-wrap balance i inne CSS nowości

**TLDR:** Safari 17.5 wprowadza `text-wrap: balance`, funkcję `light-dark()`, `@starting-style`, oraz możliwość używania feature queries z regułami `@import`. Szczególnie text-wrap balance rozwiązuje długoletni problem typografii webowej.

**Summary:**

Safari 17.5 to naprawdę solidny update z perspektywy CSS. Najbardziej ekscytującą nowością jest `text-wrap: balance`, która rozwiązuje problem, z którym zmagamy się od początków webu - jak unikać sytuacji, gdzie ostatnia linia tekstu składa się z jednego lub dwóch słów.

Przez dekady web developerzy próbowali różnych hacków - od manipulacji w JavaScript, przez sztuczki w HTML, po skomplikowane systemy CMS. Żadne z tych rozwiązań nie działało dobrze i zawsze było kruche. `text-wrap: balance` to elegancka odpowiedź CSS Working Group na ten problem.

Co fascynujące, każda przeglądarka implementuje własny algorytm balansowania. Chromium balansuje maksymalnie 6 linii, Firefox 10, a Safari nie ma limitu. To pokazuje, jak standard pozostawia miejsce na innowacje w implementacji, zachowując przy tym konsystentny API.

Funkcja `light-dark()` to kolejny krok w kierunku lepszego wsparcia dla dark mode w CSS. Zamiast pisać media queries dla `prefers-color-scheme`, możesz teraz bezpośrednio w wartościach kolorów określić warianty dla jasnego i ciemnego motywu.

`@starting-style` rozwiązuje długoletni problem z animacjami elementów, które pojawiają się w DOM. Do tej pory nie było sposobu na zdefiniowanie stylów początkowych dla animacji wejścia. Teraz możesz określić, jak element powinien wyglądać przed animacją.

WebKit konsekwentnie dostarcza solidne implementacje nowych CSS features. To pokazuje, jak ważne jest mieć różnorodność w silnikach przeglądarek - każdy wnosi własną perspektywę do implementacji standardów.

**Key takeaways:**
- text-wrap: balance rozwiązuje długoletni problem orphaned words w typografii webowej
- light-dark() upraszcza implementację dark mode bez media queries
- @starting-style umożliwia lepszą kontrolę nad animacjami wejścia elementów

**Link:** [WebKit Features in Safari 17.5](https://webkit.org/blog/15383/webkit-features-in-safari-17-5/)

## CSS Masonry i problemy z tabbingiem

**TLDR:** Andy Bell ostrzega przed problemami z dostępnością w CSS masonry, szczególnie z kolejnością tabulacji, która może stać się chaotyczna gdy elementy są przepakowane dla uzyskania efektu kamiennej ściany.

**Summary:**

Andy Bell porusza naprawdę ważny punkt o CSS masonry, który często jest pomijany w dyskusjach o składni i implementacji. Problem z tabbingiem to poważna kwestia dostępności, która może sprawić, że jedna linia CSS stworzy znaczące problemy dla użytkowników klawiatury.

Masonry layouts z natury zmieniają wizualną kolejność elementów, żeby uzyskać efekt "kamiennej ściany". Elementy są pakowane w dostępne miejsca, co oznacza, że kolejność wizualna może drastycznie różnić się od kolejności w DOM. Dla użytkowników klawiatury, którzy nawigują przez tabulację, może to być bardzo dezorientujące.

Bell pokazuje przykład, gdzie kolejność tabulacji staje się całkowicie chaotyczna, szczególnie w Firefoxie. To nie jest tylko teoretyczny problem - to rzeczywisty barrier dla dostępności, który może sprawić, że strona stanie się praktycznie nieużywalna dla niektórych użytkowników.

Co do debaty między WebKit a Google o składni masonry - Bell ma pragmatyczne podejście. Nie obchodzi go czy to będzie część Grid czy osobny layout system, ale martwi się o to, co się stanie z istniejącymi implementacjami. Masonry jest już dostępne jako eksperymentalna wartość grid, więc propozycja Google wymagałaby znaczących refaktorów.

To jest doskonały przykład tego, jak ważne jest myślenie o dostępności na wczesnych etapach rozwoju nowych CSS features. Łatwo jest skupić się na wizualnych efektach i zapomnieć o tym, jak nowe funkcje wpłyną na użytkowników z różnymi potrzebami.

**Key takeaways:**
- CSS masonry może tworzyć poważne problemy z kolejnością tabulacji i dostępnością
- Jedna linia CSS może wprowadzić znaczące bariery dla użytkowników klawiatury
- Ważne jest testowanie nowych CSS features pod kątem dostępności, nie tylko efektów wizualnych

**Link:** [CSS masonry and tabbing concerns](https://piccalil.li/blog/masonry-and-tabbing/)

## Phoenix LiveView 1.0 - sześć lat ewolucji

**TLDR:** Phoenix LiveView osiąga milestone 1.0 po sześciu latach rozwoju. Chris McCord opowiada o motywacji za stworzeniem LiveView - chęci budowania dynamicznych aplikacji serwerowych bez pisania JavaScript.

**Summary:**

To jest naprawdę inspirująca historia o tym, jak jedna frustracja może prowadzić do rewolucyjnego rozwiązania. Chris McCord stworzył LiveView, bo miał dość ballooning complexity, którą niosła ze sobą praca z JavaScript w tradycyjnych stackach.

Pomyślcie o tym - realtime form validation, aktualizacja ilości w koszyku, streaming updates. W tradycyjnym stacku to wymaga HTTP glue, GraphQL schemas, shared validation logic, localization na kliencie, data serializers, WebSocket configuration. Lista problemów do rozwiązania jest nieskończona.

LiveView podchodzi do tego radykalnie - co jeśli po prostu usuniemy te problemy całkowicie? Zamiast walczyć z kompleksowością, eliminujemy ją u źródła. Serwer obsługuje całe renderowanie i dynamiczne aktualizacje. To brzmi jak heavy approach, ale Elixir i Phoenix są idealnie dopasowane do tego zadania.

Co mnie fascynuje w LiveView, to jak real-time foundation odblokowuje "superpowers". Kiedy każdy użytkownik i UI ma real-time, bidirectional connection jako standard, nagle możesz robić rzeczy, które w innych platformach wydają się niemożliwe. Real-time server logs w js console podczas developmentu? Hot code upgrades w production bez utraty stanu? Clustering work z real-time aggregation? To wszystko staje się naturalne.

McCord wspomina aplikację deployed planet-wide z clustering i real-time aggregation, która ma tylko 350 linii kodu włączając template markup i RPC calls. To pokazuje moc tego podejścia - nie tylko piszesz mniej kodu, ale myślisz o mniejszej liczbie rzeczy podczas implementacji features.

**Key takeaways:**
- LiveView eliminuje kompleksowość full-stack developmentu zamiast ją zarządzać
- Real-time foundation jako standard odblokowuje możliwości niemożliwe w innych platformach
- Sześć lat rozwoju pokazuje, jak ważne jest cierpliwe budowanie solidnych fundamentów

**Link:** [Phoenix LiveView 1.0.0 Release](https://phoenixframework.org/blog/phoenix-liveview-1.0-released)