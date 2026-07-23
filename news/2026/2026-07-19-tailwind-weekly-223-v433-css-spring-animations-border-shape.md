---
title: "Tailwind Weekly #223: łatka v4.3.3, natywne animacje sprężynowe w CSS i magia border-shape"
excerpt: "Przegląd najważniejszych nowości z ekosystemu Tailwind CSS: łatka v4.3.3, nowe możliwości IntelliSense, funkcja linear() dla fizycznych animacji, dark mode bez JavaScript i potężna właściwość border-shape."
publishedAt: "2026-07-19"
slug: "tailwind-weekly-223-v433-css-spring-animations-border-shape"
hashtags: "#tailwind #css #frontend #webdev #animation #darkmode #cssshapes #generated #pl"
source_pattern: "Tailwind Weekly"
---

## Tailwind CSS v4.3.3 — patch z poważnymi poprawkami

**TLDR:** Wersja v4.3.3 to łatka naprawiająca kilkanaście konkretnych błędów, od obsługi systemu plików po poprawność kolorów. Nie ma tu nowych funkcji, ale kilka poprawek dotyczy naprawdę irytujących edge case'ów.

**Summary:** Wydanie v4.3.3 to zbiór poprawek zgłoszonych przez społeczność, które trafiły do jednej łatki. Jedna z nich dotyczy porównywania arbitralnych kolorów hex w sposób niezależny od wielkości liter, co oznacza, że klasy takie jak `bg-[#fff]` i `bg-[#FFF]` są teraz traktowane jako identyczne i mapowane na `bg-white`. To subtelny, ale irytujący błąd, który mógł powodować duplikaty w generowanym CSS.

Kolejna ważna poprawka dotyczy ułamkowych modyfikatorów opacity przy nazwanych rozmiarach cienia, na przykład `shadow-sm/12.5`. Wcześniej ta składnia po prostu nie działała. Naprawiono też problem z parserem selektorów, który błędnie interpretował wyrażenia w stylu `[data-foo]div` jako jeden selektor zamiast dwóch.

Istotna zmiana dotyczy też fontów systemowych na Windows. Tailwind przestał polegać na `system-ui` i `ui-sans-serif`, przełączając się na explicite zdefiniowane fonty platformy. To oznacza, że tekst CJK będzie teraz poprawnie respektować atrybut `lang` strony na Windows, gdzie wcześniej zdarzały się problemy z renderowaniem znaków chińskich, japońskich i koreańskich. To poprawka, która przeszła pewnie niezauważona przez większość zachodnich deweloperów, ale dla aplikacji wielojęzycznych jest naprawdę ważna.

Poprawiono też zachowanie wtyczki Vite, która wyzwalała pełne przeładowania strony przy plikach przetwarzanych przez Vite, lecz nienaładowanych jeszcze jako moduły. Jeśli korzystacie z Vite i zauważaliście nieoczekiwane przeładowania podczas developmentu, ta poprawka może was dotyczać.

**Key takeaways:**
- Porównywanie kolorów hex jest teraz case-insensitive, eliminując duplikaty w CSS.
- Naprawiono ułamkowe modyfikatory opacity dla nazwanych rozmiarów cienia.
- Fonty na Windows są teraz poprawne dla tekstu CJK dzięki przełączeniu na explicite fonty platformy.

**Why do I care:** Patch release na pozór nieinteresujący, ale kilka z tych poprawek mogło powodować realne problemy w produkcji. Szczególnie zwróciłbym uwagę na fix dotyczący fontów CJK na Windows oraz poprawkę selektora parsera. W projektach z internacjonalizacją i złożonymi selektorami CSS te błędy mogły być trudne do debugowania.

**Link:** [Release v4.3.3 · tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.3.3)

---

## Tailwind CSS IntelliSense v0.16.0 — lepsza wydajność i nowe diagnostyki

**TLDR:** Nowa wersja rozszerzenia VS Code skupia się na wydajności w dużych plikach i dodaje kilka przydatnych ulepszeń dla użytkowników Tailwind v4. Oznaczono też `@variant` jako przestarzałą składnię.

**Summary:** Wersja v0.16.0 rozszerzenia IntelliSense przynosi poprawki wydajności, które mogą być odczuwalne w naprawdę dużych plikach. Dodano też źródła do wszystkich emitowanych diagnostyk, co oznacza, że komunikaty o błędach będą teraz lepiej wskazywać, skąd pochodzi problem.

Dwie zmiany szczególnie warte uwagi. Po pierwsze, rozszerzenie zacznie teraz pokazywać równoważniki pikselowe dla reguły `@container`, tak jak już to robiło dla breakpointów. To małe udogodnienie, ale przydatne przy pracy z container queries. Po drugie, `@variant` jest teraz oznaczone jako deprecated przy definiowaniu własnych wariantów. To zgodne z kierunkiem ewolucji Tailwind v4 i sygnał, że warto migrować na aktualną składnię.

Naprawiono też błąd, który powodował, że podpowiedzi klas nie działały poprawnie w plikach Vue, gdy blok `<script>` znajdował się po bloku `<template>`. To klasyczny błąd parsera, który mógł być frustrujący przy standardowej strukturze komponentów Vue.

**Key takeaways:**
- Poprawa wydajności w dużych plikach może skrócić czas ładowania podpowiedzi.
- `@variant` jest teraz oznaczone jako deprecated, czas zaktualizować własne warianty.
- Pokazywanie równoważników pikselowych dla `@container` ułatwia pracę z container queries.

**Why do I care:** Rozszerzenie IntelliSense to jeden z tych narzędzi, które po prostu muszą działać szybko. Poprawki wydajności w dużych plikach są zawsze mile widziane, szczególnie w projektach enterprise, gdzie pliki komponentów mogą być naprawdę duże. Deprecacja `@variant` to też sygnał do audytu własnych konfiguracji.

**Link:** [Release v0.16.0 · tailwindlabs/tailwindcss-intellisense](https://github.com/tailwindlabs/tailwindcss-intellisense/releases/tag/v0.16.0)

---

## Sprężyny i odbicia w natywnym CSS — funkcja linear()

**TLDR:** Josh W. Comeau pokazuje, jak za pomocą funkcji `linear()` w CSS można osiągnąć fizyczne animacje sprężynowe bez żadnego JavaScriptu. To potężna, choć niedoceniana możliwość nowoczesnego CSS.

**Summary:** Josh Comeau napisał jeden z lepszych artykułów o animacjach CSS, jakie widziałem w ostatnim czasie. Chodzi o funkcję `linear()`, która pozwala definiować niestandardowe krzywe czasowe poprzez podanie zestawu punktów na płaszczyźnie kartezjańskiej zamiast krzywych Béziera. Efekt? Możemy symulować fizykę sprężyn, odbicia i inne zachowania, które wcześniej wymagały bibliotek JavaScriptowych takich jak React Spring czy Framer Motion.

Kluczowy insight z artykułu jest taki: Bézier curves mają fundamentalne ograniczenia matematyczne, które uniemożliwiają im modelowanie sprężyn. Funkcja `linear()` obchodzi ten problem, rysując krzywą jako serię odcinków prostych. Przy odpowiednio dużej liczbie punktów, powiedzmy czterdziestu do pięćdziesięciu, wynik wygląda płynnie i naturalnie.

Comeau jest uczciwy w kwestii ograniczeń. Animacje CSS są zawsze oparte na czasie, co oznacza, że sprężyna musi mieć z góry określony czas trwania. To fundamentalnie różni się od bibliotek JavaScript, gdzie sprężyna zatrzymuje się sama, gdy energia kinetyczna opada do zera. Nie można też modelować sprężyny o zerowym tarciu. Drugie ograniczenie dotyczy przerwań. Jeśli animacja zostanie przerwana w połowie, CSS nie uwzględnia bieżącego pędu elementu i natychmiast zmienia kierunek, co wygląda sztucznie. React Spring radzi sobie z tym znacznie lepiej.

Mam jednak pewne zastrzeżenia wobec podejścia Comeau. Artykuł skupia się na tym, że `linear()` jest darmowy i natywny, ale pomija kwestię tego, kiedy naprawdę potrzebujemy sprężynowych animacji. W większości aplikacji biznesowych standardowe krzywe Béziera całkowicie wystarczają. Sprężyny mają sens w interfejsach mobilnych, grach czy bardzo interaktywnych aplikacjach. Comeau jest entuzjastą animacji i pisze dla podobnych sobie, ale warto zachować trzeźwość w kwestii tego, czy każdy projekt naprawdę potrzebuje tej funkcji.

Praktyczna rada z artykułu: warto korzystać z narzędzi takich jak Linear Easing Generator Jake'a Archilda i Adama Argyle'a lub Easing Wizard, zamiast ręcznie wpisywać kilkadziesiąt punktów. I przechowywać wartości `linear()` w zmiennych CSS, zamiast kopiować długie stringi w całym projekcie.

**Key takeaways:**
- Funkcja `linear()` pozwala na natywne animacje sprężynowe bez JavaScriptu, działa głównie w głównym wątku przeglądarki.
- Ograniczenia są realne: animacje są time-based, a przerwania nie uwzględniają pędu.
- Narzędzia do generowania wartości `linear()` są niezbędne, nie piszemy ich ręcznie.

**Why do I care:** To ważna ewolucja CSS, ale nie rewolucja. Dla większości projektów komercyjnych to ciekawostka, nie konieczność. Prawdziwa wartość polega na tym, że eliminuje zależność od bibliotek animacyjnych w przypadkach prostszych interakcji. Warto znać, warto rozumieć ograniczenia, ale nie warto wprowadzać na siłę do każdego projektu.

**Link:** [Springs and Bounces in Native CSS • Josh W. Comeau](https://www.joshwcomeau.com/animation/linear-timing-function/)

---

## Dark mode z web standards — bez frameworków, bez magii

**TLDR:** Ollie Williams pokazuje, jak zaimplementować dark mode używając tylko standardowych mechanizmów web: metatagu `color-scheme`, właściwości CSS i localStorage. Artykuł jest rzetelny i uczciwy w kwestii ograniczeń tej metody.

**Summary:** Artykuł Ollie Williamsa to solidny przewodnik po implementacji dark mode opartej wyłącznie na standardach webowych, bez bibliotek ani frameworków. Kluczowym elementem jest metatag `color-scheme` w nagłówku dokumentu. Ustawienie go na wartość `light dark` pozwala przeglądarce automatycznie dostosować domyślne style elementów HTML, scrollbary, formularze i inne komponenty do preferencji systemowych użytkownika.

Do nadpisania systemowej preferencji na poziomie strony Williams zaleca aktualizację atrybutu `content` metatagu przez JavaScript, co różni się od podejścia opartego na klasach CSS na elemencie `html`, które jest popularniejsze w społeczności Tailwind. Wybór między tymi podejściami ma realne konsekwencje i Williams dobrze to wyjaśnia.

Najważniejszy wgląd z artykułu: istnieje fundamentalny problem z media query `prefers-color-scheme`. To media query odzwierciedla preferencje systemowe użytkownika, nie aktualną wartość `color-scheme` na stronie. Jeśli użytkownik ma ciemny motyw systemowy, ale przełączył się na jasny na naszej stronie, `prefers-color-scheme: dark` nadal zwróci `true`. To oznacza, że nie możemy używać `prefers-color-scheme` do sterowania stylami, jeśli implementujemy własny toggle. Jedynym wyjątkiem są iframes i SVG, gdzie ta zależność działa zgodnie z oczekiwaniami.

Williams prezentuje też sprytne obejście z użyciem CSS style queries i zmiennej `--dark`, które pozwala warunkować style inne niż kolory w zależności od aktywnego motywu. To hack, ale elegancki. Na horyzoncie jest też JavaScript API do nadpisywania `prefers-color-scheme` bezpośrednio, choć Safari jest mu przeciwne.

Czego Williams nie omawia? Nie wspomina o problemie Flash of Unstyled Content podczas ładowania strony, gdy preferencja jest zapisana w localStorage. To realne wyzwanie w implementacjach SSR, gdzie serwer nie zna preferencji klienta. Każdy, kto implementował dark mode w Next.js czy Remix, wie, jak bolesny może być ten problem.

**Key takeaways:**
- Metatag `color-scheme` to właściwy punkt wyjścia, nie klasy CSS na elemencie `html`.
- `prefers-color-scheme` media query nie reaguje na zmiany `color-scheme` w dokumencie, tylko na ustawienia systemowe.
- Style queries z zmienną `--dark` to aktualnie jedyna metoda warunkowania nie-kolorowych właściwości.

**Why do I care:** Implementacja dark mode to pozornie prosty problem, który kryje mnóstwo edge case'ów. Artykuł Williams jest uczciwy w kwestii ograniczeń i aktualnego stanu wsparcia przeglądarek. Brakuje mi jednak dyskusji o SSR i hydration, co w 2026 roku powinno być standardową częścią każdego artykułu o dark mode. Podejście oparte na standardach jest właściwe, ale nie kompletne.

**Link:** [Dark mode with web standards](https://olliewilliams.xyz/blog/dark-mode/)

---

## CSS border-shape — nowa właściwość, która zmienia sposób tworzenia kształtów

**TLDR:** Właściwość `border-shape` w CSS pozwala na dekorowanie elementów o dowolnych kształtach obramowaniami, cieniami i innymi dekoracjami, czego `clip-path` nie potrafi. Aktualnie działa tylko w Chrome.

**Summary:** Temani Afif na CSS-Tricks opisuje nadchodzącą właściwość `border-shape`, która rozwiązuje jeden z najbardziej irytujących problemów w CSS: dodawanie obramowań do niestandardowych kształtów. `clip-path` tnie cały element łącznie z dekoracjami, więc border jest niemożliwy. `border-shape` zamiast tego formuje element, pozwalając dekoracjom podążać za kształtem.

Właściwość przyjmuje te same wartości co `clip-path`, w tym nową funkcję `shape()`. Podstawowe użycie jest proste: zamiast `clip-path: polygon(...)` piszemy `border-shape: polygon(...)` i nagle możemy dodać obramowanie do kształtu wielokąta. To fundamentalna zmiana w podejściu do tworzenia niestandardowych kształtów w CSS.

Szczególnie interesująca jest składnia dwuwartościowa. Gdy podamy dwa kształty, `border-shape` renderuje obramowanie jako obszar między nimi. Pierwszy kształt definiuje zewnętrzną granicę, drugi wewnętrzną. To otwiera zupełnie nowe możliwości, na przykład tworzenie kształtów wycięciowych, gdzie element jest prostokątem, ale z dziurą w środku o dowolnym kształcie. Afif pokazuje też efekt breakout, gdzie tło elementu rozciąga się poza jego granice do krawędzi ekranu, bez żadnych hacków z margin czy padding.

Co więcej, `border-shape` obsługuje animacje. Można animować wartość `border-width` by tworzyć efekty reveal, albo animować same kształty dla bardziej złożonych transformacji. Afif pokazuje kilka imponujących dem, w tym drgające obramowanie i podkreślenie rysowane ręcznie.

Moje zastrzeżenie: artykuł jest pełen entuzjazmu, ale Afif mógłby mocniej podkreślić, że aktualnie mamy do czynienia z funkcją dostępną wyłącznie w Chrome. Wsparcie przeglądarek dla całego ekosystemu właściwości kształtujących, `shape()`, `corner-shape` i `border-shape`, jest fragmentaryczne. Zanim wprowadzite to na produkcję, upewnijcie się, że rozumiecie obecne ograniczenia. To wciąż funkcja eksperymentalna i warto śledzić jej postępy, ale nie planować produkcyjnych implementacji bez solidnego fallbacku.

**Key takeaways:**
- `border-shape` pozwala na dodawanie obramowań i innych dekoracji do niestandardowych kształtów, czego `clip-path` nie umożliwia.
- Składnia dwuwartościowa tworzy dekorację jako obszar między dwoma kształtami, otwierając nowe możliwości projektowe.
- Aktualnie tylko Chrome, nie nadaje się do produkcji bez fallbacku.

**Why do I care:** Ta właściwość rozwiązuje prawdziwy problem, który frustrował frontend developerów od lat. Dodawanie obramowań do kształtów CSS było zawsze hackowane przez `outline`, `box-shadow` czy pseudo-elementy. `border-shape` to właściwe rozwiązanie. Kiedy wsparcie przeglądarek dojrzeje, zmieni podejście do tworzenia dekoracyjnych elementów UI.

**Link:** [Get Ready For the Powerful CSS border-shape Property! | CSS-Tricks](https://css-tricks.com/get-ready-for-the-powerful-css-border-shape-property/)

---

## tw-fade — zanikanie krawędzi obszarów przewijania w Tailwind CSS v4

**TLDR:** `tw-fade` to plugin dla Tailwind CSS v4, który dodaje efekt zanikania na krawędziach obszarów scroll, używając wyłącznie CSS i scroll-driven animations. Zero JavaScriptu, jeden class.

**Summary:** `tw-fade` to elegankie rozwiązanie jednego konkretnego problemu UX: pokazywania użytkownikowi, że w obszarze przewijania jest więcej treści. Klasyczne podejście z gradientowym overlayem jest zawsze widoczny niezależnie od pozycji scrolla i maluje fałszywy kolor tła. Plugin Pete'a rozwiązuje to elegancko za pomocą CSS mask na samym kontenerze scroll.

Kluczowa różnica techniczna: `tw-fade` używa scroll-driven animations do animowania maski. To oznacza, że zanikanie pojawia się tylko wtedy, gdy rzeczywiście jest więcej treści do przewinięcia, i znika gdy dotrze się do krawędzi. Maska działa na poziomie samego kontenera, bez dodatkowych elementów DOM, i jest przezroczysta dla tła za elementem, co eliminuje problem z fałszywym kolorem.

API pluginu jest przemyślane i composable. Klasy takie jak `fade-y`, `fade-x`, `fade-top` czy `fade-bottom` kontrolują kierunek. Osobne klasy `fade-size-*` i `fade-travel-*` kontrolują odpowiednio grubość pasa zanikania i szybkość jego pojawiania się podczas scrollowania. Dodatkowe `fade-clear-*` tworzą strefy bez zanikania, przydatne przy sticky headerach wewnątrz kontenera scroll.

Wsparcie przeglądarek jest realistycznie udokumentowane. Pełna animowana wersja wymaga scroll-driven animations, których Safari dodało wsparcie w wersji 26. Firefox w wersji release nie obsługuje ich domyślnie. Fallback to statyczne, zawsze włączone zanikanie, co jest rozsądnym kompromisem.

Warto zauważyć, że plugin pochodzi od jednego z twórców `tw-shimmer`, który ma ponad 500 tysięcy pobrań tygodniowo z npm. To daje pewność co do jakości i długoterminowego wsparcia.

**Key takeaways:**
- Scroll-aware fading bez JavaScriptu, oparty na CSS mask i scroll-driven animations.
- Composable API z osobnymi utilities dla kierunku, rozmiaru i strefy buforowej.
- Pełna funkcjonalność wymaga nowoczesnych przeglądarek z scroll-driven animations, fallback jest statyczny.

**Why do I care:** To dobry przykład pluginu, który robi jedną rzecz i robi ją dobrze. Scroll edge fading to jeden z tych detali UX, które są trudne do zrobienia poprawnie, a `tw-fade` usuwa całą złożoność. Dla projektów używających Tailwind v4 to oczywisty wybór zamiast własnej implementacji. Jedyne co mnie lekko niepokoi to zależność od scroll-driven animations, która w Firefox release nadal wymaga flagi, ale dla większości użytkowników webowych to akceptowalny kompromis.

**Link:** [tw-fade - Tailwind CSS scroll-edge fading](https://pete.design/tw-fade)
