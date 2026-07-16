---
title: "Czy frontend nadal potrzebuje narzędzi budowania? Frontend Focus #750"
excerpt: "Przegląd najważniejszych tematów ze świata frontendu: debata o build tools, nowe specyfikacje CSS, animacje, optymalizacja obrazów i prawo zagrażające infinite scroll."
publishedAt: "2026-07-16"
slug: "frontend-focus-750-build-tools-css-animacje"
hashtags: "#frontend #css #webdev #html #performance #pwa #animation #frontendfocus #generated #pl"
source_pattern: "Frontend Focus"
---

## Czy nadal potrzebujemy narzędzi budowania?

**TLDR:** Ollie Williams przeanalizował stan build tools w 2026 roku i doszedł do wniosku, że podejście „no-build" jest możliwe na małą skalę, ale na większych projektach pozostaje niepraktyczne z powodu problemów z zależnościami, minifikacją i waterfall requestów.

**Summary:** Artykuł zaczyna się od pytania, które powraca w branży co kilka lat: czy narzędzia budowania są jeszcze naprawdę niezbędne? W 2026 roku CSS rozwinął się na tyle, że wiele funkcji Sass-a jest już zbędna. Nesting, custom properties, `color-mix()` czy `light-dark()` działają natywnie w przeglądarkach od dawna. Autoprefixer pobrano prawie 50 milionów razy w tygodniu, choć dla większości nowoczesnych projektów jest już zupełnie niepotrzebny.

Po stronie JavaScript sytuacja jest bardziej złożona. Import maps mają pełne wsparcie przeglądarek od 2023 roku, a ESM to już standard. Mimo to zarządzanie zależnościami bez bundlera pozostaje bolesne. Lea Verou przypomina, że wdrożenie całego katalogu `node_modules` jest marnotrawstwem i ryzykiem bezpieczeństwa, a pisanie import map ręcznie dla wszystkich zależności przechodnich to koszmar. Autor artykułu sam przyznaje, że realność jest taka: „po prostu użyj bundlera jak esbuild lub Rolldown". Pozostają jednak miejsca, gdzie narzędzia mogą się uprościć, jeśli standardy webowe będą się rozwijać w dobrym kierunku. Typowy projekt z TypeScriptem, JSX i Tailwindem nie ucieknie od build step i to nie zmieni się w najbliższym czasie. Satysfakcja z build tools w branży nie zmieniła się od 2016 roku i wynosi 3.6/5. To mówi samo za siebie.

**Key takeaways:**
- CSS w 2026 roku eliminuje większość zastosowań Sass i Autoprefixera
- Zarządzanie zależnościami bez bundlera pozostaje trudne mimo import maps i ESM
- Bundlowanie nadal wygrywa dzięki kompresji, eliminacji nieużywanego kodu i spłaszczeniu waterfalli

**Why do I care:** To jeden z tych artykułów, które uczciwie odpowiadają na pytanie „czy mogę zrezygnować z build step?" bez ideologicznego podejścia. Odpowiedź brzmi: zależy od skali. Na małym projekcie bez frameworka i z kilkoma plikami CSS — tak, można. Na typowej aplikacji produkcyjnej z React, TypeScript i 200 zależnościami — absolutnie nie. Warto jednak śledzić te zmiany, bo niektóre kroki w pipeline za kilka lat mogą być zbędne.

**Link:** [Do we still need build tools?](https://olliewilliams.xyz/blog/no-build/)

---

## Firefox przyspiesza: przejście na dwutygodniowy cykl wydań

**TLDR:** Mozilla planuje skrócić cykl wydań Firefox z 4 tygodni do 2 tygodni, zaczynając od września 2026 roku, co ma przyspieszyć dostarczanie gotowych funkcji użytkownikom.

**Summary:** Sylvestre Ledru ogłosił na liście mailingowej dev-platform, że Firefox Desktop i Android przejdą z czterotygodniowego na dwutygodniowy cykl wydań. Pierwsze wydanie w nowym rytmie to Firefox 155, planowany na 1 września 2026 roku, dwa tygodnie wcześniej niż przy poprzednim harmonogramie. Mozilla jasno zaznacza, że to eksperyment i nie oznacza, że wszystkie funkcje muszą powstawać dwa razy szybciej. Praca, która nie jest gotowa, po prostu nie trafia do wydania. Celem jest zmniejszenie presji na uplift requestów i danie gotowym funkcjom szybszej drogi do użytkowników.

**Key takeaways:**
- Firefox przechodzi na dwutygodniowy cykl wydań od września 2026
- To eksperyment, który Mozilla będzie monitorować i w razie potrzeby korygować
- Szybsze wydania zmniejszają presję na uplift i przyspieszają dostęp do nowych API

**Why do I care:** Krótszy cykl wydań Firefoksa to dobra wiadomość dla deweloperów webowych, bo nowe API i bugfixes trafiają do użytkowników szybciej. Przy dwutygodniowym rytmie czas, który upłynie od wylądowania funkcji w Nightly do wersji stabilnej, pozostaje taki sam, ale nowe wersje będą trafiać do rzeczywistych użytkowników dwukrotnie częściej. To zbliża Firefox do tempa Chrome.

**Link:** [Firefox release cadence experiment: moving to 2 weeks starting in September](https://groups.google.com/a/mozilla.org/g/dev-platform/c/qlaQ1YSlOP8?pli=1)

---

## CSS Linked Parameters: parametryzowanie zewnętrznych zasobów SVG

**TLDR:** W3C opublikowało pierwsze Working Draft specyfikacji CSS Linked Parameters, która pozwala przekazywać CSS custom properties do zewnętrznych zasobów SVG bez konieczności ich inline'owania.

**Summary:** Jeden z długotrwałych problemów frontendowego workflow to stylowanie SVG osadzonych przez `<img>` lub `<iframe>`. Kiedy SVG jest inline w HTML, można na nim używać CSS kaskadowego, zmiennych i selectorów. Gdy jest zewnętrznym plikiem, ta możliwość znika i trzeba albo duplikować pliki, albo stosować inline SVG wszędzie. Specyfikacja CSS Linked Parameters rozwiązuje ten problem elegancko: pozwala przekazywać wartości przez fragment URL, przez właściwość `link-parameters` na elemencie, lub przez modyfikator w funkcji `url()`. Wewnątrz SVG wartości są dostępne przez `env()` jako custom environment variables.

Przykład: obraz `<img src="icon.svg#param(--color,green)">` przekazuje kolor do wnętrza SVG, które może go używać jako `fill: env(--color, black)`. Można też pisać to w CSS: `.foo { background-image: url("image.svg" param(--color, var(--primary-color))); }`. To otwiera nowe możliwości dla systemów ikon opartych na plikach SVG — jeden plik, wiele wariantów kolorystycznych bez duplikacji.

**Key takeaways:**
- Specyfikacja pozwala przekazywać CSS custom properties do zewnętrznych SVG przez URL fragment lub właściwość CSS
- Wewnątrz SVG wartości są dostępne przez `env()` z opcjonalnym fallbackiem
- Specyfikacja jest na etapie First Public Working Draft, implementacje w przeglądarkach jeszcze nie istnieją

**Why do I care:** To jedna z tych specyfikacji, na które środowisko czekało od lat. Zewnętrzne SVG jako ikonki to nadal powszechna praktyka, a niemożność ich stylowania to realne ograniczenie. Jeśli implementacje pojawią się w przeglądarkach, można będzie porzucić SVG sprite'y i inline SVG jako workaroundy. Warto tę specyfikację obserwować.

**Link:** [CSS Linked Parameters Module Level 1](https://www.w3.org/TR/2026/WD-css-link-params-1-20260714/)

---

## Zasady wizualnego designu, które możesz stosować zawsze

**TLDR:** Anthony Hobday zebrał sprawdzone zasady projektowania wizualnego, od kontrastu przez typografię po cienie, które są bezpieczne do zastosowania w każdym projekcie.

**Summary:** Lista zasad Hobdaya to coś pomiędzy checklistą a przewodnikiem stylu. Nie ma tu miejsca na „to zależy" — każda zasada jest sformułowana tak, żeby można ją było stosować bez zastanowienia. Kilka wyróżnia się szczególnie. Zamiast czystej czerni i czystej bieli warto używać bliskich odpowiedników, bo pure white jest zbyt jaskrawy a pure black tworzy zbyt wysoki kontrast. Neutralne kolory powinny być nasycone małą ilością koloru dominującego w interfejsie, żeby paleta była spójna. Kontrast powinien być wysoki dla elementów ważnych i niski dla strukturalnych.

Są też zasady typograficzne: odstępy między literami i wysokość linii powinny maleć wraz ze wzrostem rozmiaru czcionki, a nie rosnąć. Tekst body poniżej 16px to ryzyko czytelności. Długość linii powinna wynosić około 70 znaków. W kwestii cieni: wartość blur powinna być dwa razy większa niż offset, i należy unikać cieni w ciemnych interfejsach w ogóle. To zasady wyciągnięte z analizy dziesiątek dobrze zaprojektowanych stron.

**Key takeaways:**
- Nasycaj neutralne kolory odcieniem dominującym, żeby paleta była spójna
- Blur cieni powinien być dwukrotnie większy niż ich offset
- Tekst body minimum 16px, długość linii około 70 znaków

**Why do I care:** Jako deweloper pracujący z designem, mam tendencję do pytania „czy to wygląda dobrze?" zamiast „czy to jest poprawne?". Ta lista daje konkretne kryteria oceny. Szczególnie przydatna przy code review interfejsu lub przy tworzeniu komponentów bez wsparcia designera.

**Link:** [Visual design rules you can safely follow every time](https://anthonyhobday.com/sideprojects/saferules/)

---

## Bug, który dotyczył wyłącznie leworęcznych użytkowników

**TLDR:** Terence Eden odkrył i naprawił siedmioletni bug w WordPressie, który powodował przypadkowe otwieranie formularza komentarzy podczas scrollowania strony lewym kciukiem na smartfonie.

**Summary:** Ten artykuł to świetny przykład tego, jak różne wzorce użytkowania odsłaniają ukryte błędy. Autor bloga nie zauważył buga przez lata, bo scrolluje prawym kciukiem. Leworęczny czytelnik scrolluje lewym kciukiem po lewej stronie ekranu i przypadkowo dotykał linka „reply" do komentarzy. Przyczyną był `touchstart` listener dodany do linków w 2017 roku, który w tamtych czasach miał sens jako obejście 300ms opóźnienia kliknięcia na mobilnych przeglądarkach. To opóźnienie przestało być problemem już około 2013 roku, ale kod pozostał przez kolejną dekadę.

Naprawa to usunięcie kilku linii kodu. Moralną historii jest to, że wcześniejsze obejścia problemów przeglądarek, które długo temu zostały naprawione, nadal siedzą w bazach kodu i powodują subtelne, trudne do wykrycia błędy. Szczególnie takie, które dotykają tylko określonych grup użytkowników.

**Key takeaways:**
- Stare workaroundy na problemy przeglądarek mogą powodować nowe bugi po latach
- `touchstart` na linkach był obejściem 300ms tap delay, który nie istnieje od 2013 roku
- Warto regularnie audytować event listenery dodane jako tymczasowe rozwiązania

**Why do I care:** Ta historia to argument za regularnym audytem „historycznych" fragmentów kodu, zwłaszcza tych dotyczących event handlerów. Widziałem podobne wzorce w projektach produkcyjnych wiele razy. Kod, który ktoś napisał jako „tymczasowe" rozwiązanie, żyje latami i powoduje problemy w najmniej oczekiwanych momentach.

**Link:** [A bug which only affected left-handed users](https://shkspr.mobi/blog/2026/07/a-bug-which-only-affected-left-handed-users/)

---

## Magiczny przycisk 3D w HTML i CSS

**TLDR:** Josh W. Comeau pokazuje krok po kroku jak zbudować realistyczny przycisk 3D używając wyłącznie HTML i CSS, z animacjami opartymi na `transform` zamiast drogich właściwości jak `box-shadow`.

**Summary:** Comeau zaczyna od obserwacji, że przyciski to dosłownie „killer feature" internetu — każda ważna akcja online wymaga kliknięcia w przycisk. A jednak większość z nich jest płaska i pozbawiona charakteru. Proponuje budowę przycisku z iluzją głębi przez trzy warstwy: cień, krawędź i front. Kluczowy trick: zamiast animować `box-shadow` (co jest kosztowne renderingowo), przesuwa warstwy `transform: translate`, które mogą być obsługiwane przez GPU.

Artykuł szczegółowo omawia obsługę focusu przez `:focus-visible`, różne krzywe Beziera dla każdego stanu (hover, active, wyjście kursora), filtr `brightness()` dla efektu rozjaśnienia przy hover, oraz poprawki dla iOS (usunięcie tap highlight i wyłączenie zaznaczania tekstu). Szczególnie cenne jest wyjaśnienie dlaczego różne stany interakcji powinny mieć różne prędkości animacji — kliknięcie ma być natychmiastowe (34ms), a powrót do stanu spoczynkowego powolny (600ms).

**Key takeaways:**
- Animacje oparte na `transform` są znacznie wydajniejsze niż animowanie `box-shadow` czy `border`
- Każdy stan interakcji przycisku (hover, active, powrót) powinien mieć inne timing funkcje
- `:focus-visible` pozwala pokazywać outline tylko przy nawigacji klawiaturą

**Why do I care:** To wzorcowy tutorial z jednej strony, bo idzie dalej niż „oto efekt, oto kod". Comeau tłumaczy dlaczego każda decyzja techniczna jest taka, a nie inna. Szczególnie wartościowe jest to, że cały efekt powstaje bez JavaScriptu i bez zewnętrznych bibliotek, tylko z dobrze przemyślanym CSS.

**Link:** [Building a Magical 3D Button with HTML and CSS](https://www.joshwcomeau.com/animation/3d-button/)

---

## CSS `zoom` vs `transform: scale` — różnica, która ma znaczenie

**TLDR:** Stefan Judis odkrył, że właściwość CSS `zoom` skaluje element razem z jego layout footprint, podczas gdy `transform: scale` zmienia tylko wygląd wizualny, pozostawiając zajmowaną przestrzeń bez zmian.

**Summary:** To klasyczne „today I learned" z praktycznym zastosowaniem. `transform: scale()` to powszechnie używana metoda skalowania, która jest wydajna renderingowo i nie wpływa na układ strony. Element wygląda na większy lub mniejszy, ale nadal zajmuje tę samą przestrzeń w layout. `zoom` działa inaczej — skaluje element i jego rzeczywistą przestrzeń w layout, co może być przydatne w specyficznych przypadkach, gdy chcemy żeby otaczające elementy reagowały na zmianę rozmiaru.

Wsparcie przeglądarek jest praktycznie pełne. Caveat: nie należy animować `zoom`, bo powoduje to layout shifts. Dodatkowy szczegół z Safari: `getBoundingClientRect()` na elemencie ze `zoom` zwraca oryginalne rozmiary, a nie zaktualizowane, co jest rozbieżnością z zachowaniem Chrome i Firefox.

**Key takeaways:**
- `zoom` skaluje element i jego layout, `transform: scale` skaluje tylko wizualnie
- Nie animuj `zoom`, bo powoduje layout shifts
- Safari ma bug z `getBoundingClientRect()` na elementach ze `zoom`

**Why do I care:** Wiem, że większość z nas sięga domyślnie po `transform: scale`, bo jest „szybkie". Ale są scenariusze, np. miniaturki komponentów w dokumentacji lub podgląd skali interfejsu, gdzie `zoom` jest dokładnie tym, czego szukamy. Warto mieć tę właściwość z tyłu głowy.

**Link:** [How to scale elements and their layout with CSS "zoom"](https://www.stefanjudis.com/today-i-learned/css-zoom-to-scale-elements/)

---

## AVIF nie zawsze jest mniejszy niż WebP — przypadek z transparentnością

**TLDR:** Andy Clarke odkrył konwertując obrazy portfolio, że AVIF może być znacznie większy niż WebP dla grafik z dużymi obszarami złożonej transparentności alfakanału, co obala przekonanie o bezwzględnej wyższości AVIF.

**Summary:** Powszechna narracja mówi, że AVIF to ulepszona wersja WebP: mniejsze pliki, lepsza jakość, koniec historii. Clarke postanowił zamienić wszystkie WebP na swojej stronie na AVIF i pierwsze wyniki były imponujące. Folder z ogólnymi obrazkami: oszczędność 65%, niektóre pliki o 90% mniejsze. Potem przyszedł czas na portfolio z prawie 300 obrazami i 18 z nich po konwersji było... większe. Jeden przykład: z 63KB do 181KB, prawie trzy razy więcej.

Wspólnym mianownikiem powiększonych plików były grafiki z tekstem i dużymi obszarami złożonej transparentności alfakanału. Te obrazy były już wyjątkowo dobrze skompresowane w WebP i AVIF nie dał rady zrobić tego lepiej. Wniosek: format obrazu nie jest absolutną decyzją, lecz zależy od zawartości. Fotografie z detalami — AVIF wygrywa zdecydowanie. Grafiki z kompleksową transparentnością — warto sprawdzić oba formaty przed zamianą.

**Key takeaways:**
- AVIF świetnie kompresuje fotografie, ale może przegrywać z WebP przy grafice z transparentnością alfa
- Zawsze weryfikuj rozmiary po konwersji, zanim wdrożysz nowy format masowo
- Optymalizacja obrazów wymaga podejścia case-by-case, nie ogólnej reguły

**Why do I care:** To świetny przykład pułapki, w którą można łatwo wpaść przy ślepym podążaniu za „nowym lepszym standardem". Automatyczna konwersja wszystkich obrazów do AVIF w pipeline CI brzmi jak dobry pomysł, ale bez weryfikacji wyników może skutkować wolniejszą stroną niż przed optymalizacją.

**Link:** [I thought AVIF would make every image smaller. It didn't.](https://stuffandnonsense.co.uk/blog/webp-to-avif-gotcha/)

---

## Animacje staggered w CSS dzięki `sibling-index()` i `sibling-count()`

**TLDR:** Nowe funkcje CSS `sibling-index()` i `sibling-count()` umożliwiają tworzenie animacji staggered bez JavaScript i bez hacków, z dobrym wsparciem przeglądarek już teraz.

**Summary:** Animacje staggered, gdzie elementy pojawiają się jeden po drugim z opóźnieniem, były do niedawna albo robione przez JavaScript, albo przez generowanie powtarzalnych reguł CSS w preprocessorze. Teraz CSS dostał dwie funkcje, które zmieniają to fundamentalnie. `sibling-index()` zwraca indeks elementu wśród rodzeństwa, `sibling-count()` zwraca całkowitą liczbę rodzeństwa. Wystarczy napisać `animation-delay: calc((sibling-index() - 1) * 100ms)` żeby każdy element listy animował się z innym opóźnieniem.

Artykuł omawia nie tylko podstawy, ale też animacje w odwrotnej kolejności przez `sibling-count() - sibling-index()`, kwestię nakładania się animacji (overlap tworzy bardziej naturalne ruchy niż brak overlap), dostępność przez `prefers-reduced-motion`, a także sytuacje gdy JavaScript jest nadal potrzebny, np. przy animacjach wyjścia z DOM. Wsparcie przeglądarek: Chromium i Safari, czyli około 75%.

**Key takeaways:**
- `sibling-index()` i `sibling-count()` pozwalają na staggered animations bez JavaScriptu
- Opóźnienia nakładające się tworzą bardziej naturalne animacje niż sekwencyjne
- Dostępność: zawsze dodaj `prefers-reduced-motion` fallback

**Why do I care:** To jeden z tych momentów, gdy CSS zyskuje coś, za czym sięgałem do JavaScriptu lub Sass od lat. Wsparcie na 75% przeglądarek oznacza, że można to używać jako progressive enhancement już teraz, z prostym fallbackiem przez `@supports not`. Warto to wdrożyć zanim stanie się oczywistością.

**Link:** [How to create awesome staggered animations in CSS](https://blog.logrocket.com/css-staggered-animations/)

---

## Infinite scroll i parallax z GSAP i Lenis

**TLDR:** Tutorial pokazujący jak zbudować seamless infinite scroll z paralaksą i snap-based kontrolą przy użyciu GSAP i Lenis, z omówieniem pułapek Safari na iOS.

**Summary:** Autor opisuje projekt zrealizowany dla klienta: strona, która nagradza ciągłe scrollowanie przez bezszwową pętlę sekcji z efektem parallax. Trick z pętlą jest prosty koncepcyjnie: powiel pierwszą sekcję na końcu listy, włącz `infinite: true` w Lenis. Przeglądarka widzi sprytnie zamaskowaną pętlę, użytkownik czuje płynną ciągłość. Parallax to przesuwanie mediów od `-50%` do `50%` przez GSAP ScrollTrigger w trybie scrub. Ten niewielki offset między scrollem a ruchem obrazu tworzy poczucie głębi.

Interesująca jest sekcja o iOS fix. Safari na mobilnym Chrome nie jest problemem, ale Safari na iOS ma własny problem: pasek adresu expanduje i zwija się podczas scrollowania, co obnaża szew pętli. Rozwiązanie: własny scroll container zamiast window, z `height: 100svh` i `overflow: hidden`. Wymaga to przepisania konfiguracji Lenis i ScrollTrigger, ale efekt końcowy jest naprawdę seamless.

**Key takeaways:**
- Pętla infinite scroll działa przez duplikację pierwszej sekcji i `infinite: true` w Lenis
- Parallax efekt to przesunięcie mediów od -50% do 50% przez GSAP ScrollTrigger
- iOS Safari wymaga własnego scroll containera zamiast window dla prawdziwej seamless pętli

**Why do I care:** Infinite scroll ze świetną fizyką to jedno z tych doświadczeń, które wyróżniają produkt. Artykuł jest dobrze napisany: tłumaczy nie tylko co robić, ale dlaczego pewne decyzje techniczne są konieczne. Sekcja o iOS fix jest szczególnie wartościowa, bo to typ buga, który wychodzi dopiero w produkcji.

**Link:** [Building a Seamless Infinite Scroll Experience with GSAP & Lenis](https://tympanus.net/codrops/2026/05/28/the-never-ending-story-building-a-seamless-infinite-scroll-experience-with-gsap-lenis/)

---

## Kalifornia chce zakazać addictive features dla nastolatków

**TLDR:** Projekt ustawy AB 1709 w Kalifornii wymaga, żeby platformy społecznościowe stworzyły mniej uzależniające wersje swoich feedów dla użytkowników poniżej 16 lat, włącznie z infinite scroll i autoplay.

**Summary:** Assemblymember Josh Lowenthal początkowo proponował zakaz mediów społecznościowych dla dzieci poniżej 16 lat, wzorując się na australijskim prawie. Po dyskusjach z ustawodawcami i grupami praw cyfrowych zmienił podejście: zamiast zakazu, ustawa wymaga od firm stworzenia alternatywnych, mniej uzależniających wersji swoich platform. Firmy mają czas do 2028 roku na dostosowanie się. Jeśli tego nie zrobią, dzieci poniżej 16 lat nie będą mogły zakładać kont.

Definicja „addictive feature" w ustawie to „psychologicznie eksploatacyjne funkcje zaprojektowane w celu maksymalizacji zaangażowania". Konkretnie: addictive feeds, autoplay, i inne funkcje określone przez prokuratora generalnego. Lowenthal powiedział wprost: „infinite scroll, autoplay, algorytmy rekomendacji i push notifications to funkcje produktu. To nie jest mowa." Ustawa idzie teraz do Senate Appropriations Committee.

**Key takeaways:**
- Ustawa wymaga od platform alternatywnych feedów bez uzależniających mechanizmów dla dzieci poniżej 16 lat
- Termin: 2028 rok, sankcja to blokada rejestracji dla niepełnoletnich
- Infinite scroll i autoplay są wprost wymienione jako potencjalnie uzależniające mechanizmy

**Why do I care:** Jako ktoś budujący interfejsy, warto wiedzieć, że regulatory zaczyna interesować to, jak projektujemy engagement. Jeśli Kalifornia przejdzie tę ustawę, duże platformy będą musiały implementować alternatywne tryby wyświetlania, co może stworzyć nowe wzorce projektowe lub wymagania w specyfikacjach produktowych.

**Link:** [The infinite scroll may become endangered if controversial Calif. law passes](https://www.sfgate.com/politics/article/meta-social-media-teenagers-22337724.php)

---

## Color.js 0.7.0: gamut-relative przestrzenie kolorów i nowe możliwości

**TLDR:** Wydanie Color.js 0.7.0 wprowadza gamut-relative warianty przestrzeni OKLCH i LCH, nową metodę gamut mapping przez ray tracing i inteligentniejszy fallback w metodzie `display()`.

**Summary:** Color.js, biblioteka Lea Verou i Chrisa Lilleya, przekroczyła 240 milionów pobrań i wydała wersję 0.7.0 z kilkoma znaczącymi nowościami. Najważniejsza to gamut-relative przestrzenie kolorów: oklch-p3, oklch-srgb, oklch-rec2020 i ich LCH odpowiedniki. W tych nowych przestrzeniach wartość `c = 1` oznacza najbardziej nasycony kolor w gamut przy danej jasności i barwie, eliminując problem wychodzenia poza gamut przy pracy z OKLCH. Wygodne, nawet jeśli kosztem jest częściowa utrata perceptual uniformity.

Inna nowość to inteligentniejszy `display()` fallback: gdy kolor nie jest natywnie obsługiwany przez przeglądarkę, biblioteka teraz szuka najbliższego obsługiwanego przodka w hierarchii przestrzeni kolorów, zamiast zawsze skakać do najszerszego domyślnego. Zmiany breaking: usunięto pre-built ESM bundles ze `dist/` (pliki w `src/` są teraz bezpośrednimi eksportami ESM) i usunięto minifikowane pliki `.min.*`.

**Key takeaways:**
- Nowe gamut-relative przestrzenie OKLCH i LCH ułatwiają pracę bez wychodzenia poza gamut
- `display()` teraz wybiera nearest supported ancestor zamiast najszerszego fallbacku
- Breaking: przebudowane `dist/`, ESM bundles usunięte

**Why do I care:** OKLCH staje się coraz bardziej popularny w systemach kolorów, ale faktycznie irregular gamut shape to realna bariera przy pracy. Gamut-relative warianty to praktyczne rozwiązanie tego problemu. Jeśli używasz Color.js w projekcie, sprawdź breaking changes przed aktualizacją.

**Link:** [Release v0.7.0 · color-js/color.js](https://github.com/color-js/color.js/releases/tag/v0.7.0)

---

## pwa-check: narzędzie do audytu PWA

**TLDR:** `pwa-check` to CLI tool, który automatycznie sprawdza czy aplikacja webowa spełnia wymagania PWA: manifest, service worker, viewport, iOS splash screens i osiągalność zasobów.

**Summary:** Progressive Web Apps mają wiele wymagań, które łatwo pominąć: odpowiednie pola w manifeście, zarejestrowany service worker z właściwymi handlerami, viewport meta tag z `viewport-fit=cover`, splash screens dla iOS. `pwa-check` to narzędzie CLI, które skanuje podany URL i raportuje co jest OK (`pass`), co jest ostrzeżeniem (`warn`) i co jest krytycznym brakiem (`fail`). Proces kończy się non-zero exit code jeśli znajdzie jakiekolwiek `fail`, co pozwala na integrację z CI.

Narzędzie obsługuje zarówno statyczne manifesty, jak i te wstrzykiwane przez JavaScript. Wspiera Workbox-style service workers. Flagi `--fail-on-warn` i `--ignore-warn` dają kontrolę nad stopniem surowości. Wyjście JSON umożliwia przetwarzanie wyników przez inne narzędzia. Prosty przykład użycia: `npx pwa-check https://example.com`.

**Key takeaways:**
- Automatyczny audyt PWA przez prosty `npx pwa-check <url>`
- Integracja z CI przez non-zero exit code przy błędach krytycznych
- Obsługuje dynamiczne manifesty i Workbox service workers

**Why do I care:** Audit PWA to jeden z tych kroków, które łatwo zaniedbać między sprintami. Mając to jako krok w CI, można wykryć regresję zanim dotrze do użytkowników. Szczególnie przydatne gdy wiele osób pracuje nad serwisem i ktoś mógł przypadkowo usunąć pole z manifestu lub zepsuć service worker.

**Link:** [pwa-check: An automated PWA health check tool](https://github.com/pwa-today/pwa-check)

---

## Vint Cerf, „ojciec internetu", przechodzi na emeryturę

**TLDR:** Vinton Cerf, twórca TCP/IP i długoletni Chief Internet Evangelist Google, ogłosił przejście na emeryturę w wieku 83 lat, kończąc jeden z najbardziej wpływowych rozdziałów w historii technologii.

**Summary:** Vinton Cerf i Robert Kahn stworzyli TCP/IP w latach 70. XX wieku, definiując fundamenty internetu jakim go znamy. Od 2005 roku Cerf pełnił rolę Vice Presidenta i Chief Internet Evangelist w Google. Ogłoszenie emerytury padło podczas konferencji Open Frontier, gdzie dyskutowano o otwartych protokołach i ich roli w epoce AI.

Interesująca jest prognoza Cerfa dotycząca agentów AI: jego zdaniem modele agentowe wymuszą powrót do standaryzowanych protokołów komunikacji. Nie wierzy, żeby natural language między agentami był wystarczający ze względu na niejednoznaczność. Zdaniem Cerfa, tak jak TCP/IP zdominowało komunikację między maszynami przez precyzję, tak agenci AI będą potrzebować formalnych protokołów, nie angielskiego. „Pamiętacie zabawę w głuchy telefon? Wyobraźcie sobie agentów rozmawiających ze sobą w naturalnym języku — to jest przerażające."

**Key takeaways:**
- Vint Cerf, współtwórca TCP/IP, kończy 20 lat w Google
- Cerf przewiduje, że AI agenci wymuszą formalne standardy interoperabilności, nie natural language
- Wczesne platformy definiujące protokoły agentowe mogą mieć przyszłość analogiczną do wczesnych protokołów internetowych

**Why do I care:** Perspektywa Cerfa na agentic AI jest wartościowa bo pochodzi od kogoś, kto widział jak wyglądały pierwsze dni internetu. Argument o konieczności formalnych protokołów między agentami AI jest przekonujący — i brzmi jak coś, co za 10 lat będzie brzmieć oczywistością.

**Link:** [The 'Father of the Internet' is finally retiring](https://techcrunch.com/2026/06/30/the-father-of-the-internet-is-finally-retiring/)
