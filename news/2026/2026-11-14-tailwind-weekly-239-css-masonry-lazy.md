---
title: "Tailwind Weekly #239: przyszłość CSS, natywny masonry i lazy loading bez pułapek"
excerpt: "Wydanie o funkcjach CSS, które mogą trafić do Interop 2027, grid-lanes, dobrych praktykach lazy loadingu, zmianach w daisyUI i regułach ESLint dla Tailwinda."
publishedAt: "2026-11-14"
slug: "tailwind-weekly-239-css-masonry-lazy"
source_pattern: "Tailwind Weekly"
hashtags: "#tailwindweekly #tailwindcss #css #frontend #performance #webdev #generated #pl"
---

## Przyszłość CSS w Interop 2027

**TLDR:** Josh Comeau omawia dziesięć funkcji CSS, na które autorzy zagłosowali do Interop 2027. Część z nich, na przykład corner-shape, już działa w Chromium, a inne, jak inherit(), są na razie tylko propozycjami.

**Summary:** Interop to wspólny projekt przeglądarek, który po dodaniu funkcji zwykle doprowadza ją blisko stuprocentowego wsparcia w ciągu roku. Subgrid jest tego dobrym przykładem. Mozilla przygotowała ranking, w którym każdy może zagłosować na funkcje. Autor wybrał między innymi funkcje CSS, które pozwalają zamieniać współrzędne biegunowe na kartezjańskie, kształty z corner-shape i border-shape, a także anchored container queries, dzięki którym tooltip wie, czy został odwrócony. Dodaje też reading-flow, który pozwala ustawić kolejność nawigacji klawiaturą zgodnie z układem wizualnym, oraz animacje zależne od słów kluczowych takich jak auto. Wszystkie te funkcje można już stosować jako progressive enhancement, o ile zabezpieczy się je przez @supports.

**Key takeaways:**
- Interop zwykle sprawia, że funkcje trafiają do wszystkich przeglądarek w ciągu roku.
- Corner-shape: bevel działa już w Chromium i nie psuje obramowań.
- Reading-flow pomaga, gdy układ na mobile różni się od kolejności w DOM.

**Dlaczego mnie to obchodzi:** Autor trafnie zauważa, że agenci AI uczą się na starszych danych, więc nie wybiorą nowoczesnych funkcji sami. Trzeba je wskazać w prompcie, a to wymaga, by samemu je znać.

**Link:** [The Future of CSS, Josh W. Comeau](https://www.joshwcomeau.com/css/interop-2027/)

## Natywny masonry w CSS z grid-lanes

**TLDR:** display: grid-lanes to nowy tryb układu, który pakuje elementy w kolumny lub wiersze bez ręcznego liczenia wysokości. Działa w Safari 26.4 i nowszych, a w pozostałych przeglądarkach wsparcie wciąż ewoluuje.

**Summary:** Masonry od lat było wyzwaniem dla CSS. Pierwszy pomysł z 2017 roku, czyli hack z grid, wymagał znania wysokości każdego elementu. Po długich sporach w CSS Working Group ustalono, że masonry korzysta z właściwości track z Grida, a tryb nazywa się grid-lanes. Przeglądarka sama wybiera najkrótszą kolumnę dla kolejnego elementu. Właściwość fit-tolerance decyduje, czy różnice wysokości między kolumnami mają znaczenie. Wartość 0 upakowuje najciaśniej, a infinite trzyma się kolejności źródła. Autor pokazuje też, że subgrid działa wewnątrz takiego układu. Specyfikacja jest wciąż wersją roboczą, więc szczegóły mogą się zmienić.

**Key takeaways:**
- Układ masonry nie wymaga już ręcznego liczenia wysokości elementów.
- Kolejność w DOM pozostaje zgodna z czytnikami ekranu, nawet gdy wizualnie jest inaczej.
- Trzeba przygotować prosty fallback dla przeglądarek bez wsparcia.

**Dlaczego mnie to obchodzi:** Galerie i siatki kart to częsty przypadek w projektach. Jeśli zespół używa biblioteki JavaScript tylko do masonry, warto za jakiś czas sprawdzić, czy da się ją usunąć, ale dopiero po sprawdzeniu wsparcia w przeglądarkach, z których korzystają użytkownicy.

**Link:** [Native masonry layouts with CSS grid lanes, Piccalilli](https://piccalil.li/blog/native-masonry-layouts-with-css-grid-lanes/)

## Lazy loading: kiedy pomaga, a kiedy szkodzi

**TLDR:** Atrybut loading="lazy" przyspiesza pierwszy ekran, ale 17 procent stron stosuje go też do obrazu LCP, co go opóźnia. Autor podaje zasady: LCP eager z fetchpriority, a reszta poniżej ekranu lazy, z wymiarami zapisanymi w HTML lub CSS.

**Summary:** Artykuł Calibre opiera się na danych z Chrome. Atrybut loading jest stosowany na obrazach w 26 procentach wczytań, ale rzadko na iframe i wideo. Każda przeglądarka pobiera obrazy lazy z innym marginesem: Chrome zależnie od łącza, Firefox stałe 600 pikseli, a Safari cały viewport. Autor opisuje trzy błędy: lazy na obrazie LCP, brak wymiarów, które powodują przesunięcia układu, i lazy na wszystkim. Pokazuje też content-visibility: auto z contain-intrinsic-size, które pomija renderowanie sekcji poza ekranem bez skakania scrollbara. Na końcu opisuje IntersectionObserver, który pozwala ładować ciężkie widgety dopiero przed wejściem w ekran.

**Key takeaways:**
- Obraz LCP nie powinien mieć loading="lazy", a fetchpriority="high" pomaga.
- Każdy lazy obraz, wideo i iframe potrzebuje wymiarów, żeby nie przesuwać treści.
- Lazy rendering przez content-visibility to osobna optymalizacja, uzupełniająca lazy loading.

**Dlaczego mnie to obchodzi:** Zdarza mi się widzieć szablony, w których lazy dodano do każdego obrazu, włącznie z hero. Taki błąd jest łatwy do przeoczenia, a kosztuje wyniki Core Web Vitals. Warto go sprawdzić w DevTools, zakładka Network, po odznaczeniu cache.

**Link:** [Lazy Loading Images: How loading="lazy" and eager Work, Calibre](https://calibreapp.com/blog/native-lazy-loading)

## daisyUI 5.8.0: poprawki dla wymuszonych kolorów i ruchu

**TLDR:** Wydanie daisyUI 5.8.0 dodaje obsługę prefers-reduced-motion w wielu komponentach i poprawia wygląd w trybie forced-colors. Dodano też nowe opcje dla megamenu, menu i OTP.

**Summary:** Changelog pokazuje, że większość zmian dotyczy dostępności. Komponenty takie jak alert, avatar, btn, menu, modal czy tooltip zyskały poprawki widoczności w trybie wymuszonych kolorów, na przykład zachowanie strzałek w menu, obramowań modali i statusów. Przybyły też animacje z ograniczeniem ruchu, transitions dla menu paged i nowe opcje dla selektorów :root:has(). Pojawiły się także poprawki dla tailwindowych prefiksów i duplikowanych reguł CSS przy Tailwind 4.3.3.

**Key takeaways:**
- Forced-colors wymaga osobnego testu, bo wiele komponentów znika w tym trybie.
- Wersja 5.8.0 respektuje prefers-reduced-motion w większej liczbie miejsc.
- Poprawki prefiksów są ważne, jeśli projekt używa własnego prefiksu klas.

**Dlaczego mnie to obchodzi:** Sam nie zawsze testuję forced-colors, a to jest prosty sposób na wykrycie problemów z dostępnością. Dobrze sprawdzić, czy zespół ma taki test w przeglądarce, zanim zaktualizuje bibliotekę.

**Link:** [daisyUI Changelog](https://daisyui.com/docs/changelog/)

## eslint-plugin-better-tailwindcss 4.11.0

**TLDR:** Nowa wersja wtyczki ESLint pozwala selektorom rozszerzać domyślne selektory, a także poprawia opisy reguł sortowania klas. Dla projektów z Tailwindem to rutynowa aktualizacja.

**Summary:** Wydanie zawiera jedną funkcję: selektory mogą rozszerzać domyślne. Poprawiono opisy reguł enforce-consistent-class-order oraz obsługę duplikatów i klas numerycznych w ścisłym sortowaniu. Changelog jest krótki, a autor wydania wymienia tylko jednego kontrybutora.

**Key takeaways:**
- Ścisłe sortowanie klas radzi sobie teraz lepiej z duplikatami.
- Selektory mogą dziedziczyć domyślne ustawienia zamiast je zastępować.

**Dlaczego mnie to obchodzi:** Porządek klas w Tailwindzie to temat, który wraca przy każdym code review. Jeśli reguła sortowania jest włączona w projekcie, aktualizacja zmniejsza szum w diffach, ale warto przejrzeć zmiany w configu.

**Link:** [Release v4.11.0, eslint-plugin-better-tailwindcss](https://github.com/schoero/eslint-plugin-better-tailwindcss/releases/tag/v4.11.0)
