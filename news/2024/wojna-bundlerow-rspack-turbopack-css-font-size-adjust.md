---
title: "Wojna bundlerów: Rspack 1.0 alpha, przeprowadzka Turbopack i nowe narzędzia CSS"
excerpt: "Przegląd najnowszych wydarzeń w świecie bundlerów JavaScript - od wydania Rspack 1.0 alpha po przeprowadzkę Turbopack do repozytorium Next.js"
publishedAt: "2024-07-25"
slug: "wojna-bundlerow-rspack-turbopack-css-font-size-adjust"
hashtags: "#generated #pl #frontend #bundlers #rspack #turbopack #webpack #rust #css #font-size-adjust #nuxt #migration #nodejs #performance"
---

## Rspack 1.0 Alpha - Nowa era bundlerów opartych na Rust

**TLDR:** Rspack wydał wersję 1.0 alpha z optymalizacjami wyjścia, wbudowanym Lightning CSS i obietnicą stabilnego wydania w sierpniu. To znaczący krok w kierunku płynnej migracji z Webpack z lepszą wydajnością.

**Summary:**

Rspack osiągnął ważny kamień milowy, wydając wersję 1.0 alpha, która oznacza implementację głównych funkcji i API Webpack. To nie jest tylko kolejna aktualizacja - to sygnał, że tysiące projektów Webpack może w końcu wykonać płynną migrację przy jednoczesnym osiągnięciu znacznych popraw wydajności.

Kluczową nowością jest włączenie optymalizacji concatenateModules domyślnie w buildach produkcyjnych. Ta optymalizacja, znana również jako scope hoisting, łączy wiele modułów w jedną funkcję, redukując narzut związany z parsowaniem i wykonywaniem kodu JavaScript w przeglądarce. Dzięki temu rozmiar bundle'a może zostać zmniejszony o 4-10% przed kompresją Gzip. To może wydawać się niewiele, ale w kontekście dużych aplikacji enterprise może oznaczać znaczące oszczędności w transferze danych i czasie ładowania.

Druga ważna zmiana to wbudowana integracja z Lightning CSS - niezwykle szybkim parserem, transformerem i minifierem CSS napisanym w Rust. Lightning CSS stał się domyślnym minifierem CSS w Rspack, zastępując poprzednio używany SWC CSS minimizer. Co więcej, Lightning CSS umożliwia bardziej zaawansowane optymalizacje, jak eliminowanie nieużywanych deklaracji w plikach CSS Modules, włączając w to ID, keyframes, zmienne CSS i inne identyfikatory.

Dla architektów i zespołów deweloperskich Rspack 1.0 alpha oznacza możliwość rozpoczęcia planowania migracji z Webpack bez ryzyka utraty funkcjonalności. Kompatybilność API oznacza, że istniejące konfiguracje będą działać z minimalnymi zmianami, podczas gdy korzyści wydajnościowe będą natychmiastowe. To szczególnie istotne dla dużych organizacji, gdzie czas budowania może być znaczącym wąskim gardłem w procesie CI/CD.

**Key takeaways:**
- Rspack 1.0 alpha implementuje główne funkcje Webpack z lepszą wydajnością
- Domyślne włączenie scope hoisting redukuje rozmiar bundle'a o 4-10%
- Lightning CSS jako domyślny minifier zapewnia lepsze optymalizacje CSS

**Link:** [Announcing Rspack 1.0 alpha](https://www.rspack.dev/blog/announcing-1-0-alpha)

## Turbopack przeprowadza się do repozytorium Next.js

**TLDR:** Vercel przenosi kod źródłowy Turbopack z repozytorium vercel/turbo do vercel/next.js, aby przyspieszyć iteracje i szybciej osiągnąć stabilne wydanie z obsługą buildów produkcyjnych.

**Summary:**

Turbopack, bundler JavaScript/TypeScript rozwijany przez Vercel jako następca Webpack, przechodzi znaczącą reorganizację. Decyzja o przeniesieniu kodu źródłowego do monorepo Next.js może wydawać się techniczną, ale ma głębokie implikacje dla przyszłości tego narzędzia i całego ekosystemu bundlerów.

Pierwotnie Turbopack i Turborepo były umieszczone w tym samym repozytorium z myślą o współdzieleniu kodu, szczególnie po migracji Turborepo z Go na Rust. W praktyce okazało się jednak, że Next.js, jako główny użytkownik Turbopack w fazie rozwoju, częściej wpływa na zmiany w bundlerze niż Turborepo. Synchronizacja zależności i koordynacja zmian między oddzielnymi repozytoriami stała się znaczącym narzutem operacyjnym.

Turbopack już teraz przechodzi 100% testów deweloperskich Next.js i wszystkie przykłady Next.js działają z Turbopack. Zespół zweryfikował również, że top 300 pakietów npm używanych w aplikacjach Next.js kompiluje się poprawnie. Co więcej, Vercel używa Turbopack codziennie do rozwoju vercel.com, osiągając znacznie lepszą wydajność niż webpack zarówno przy starcie serwera, jak i aktualizacjach kodu.

Dla zespołów rozważających Turbopack ta zmiana oznacza bardziej skupione podejście do rozwoju. Zamiast próbować być uniwersalnym bundlerem od razu, Turbopack koncentruje się na doskonałości w kontekście Next.js. To może być mądrzejsza strategia niż próba konkurowania z webpack na wszystkich frontach jednocześnie. Historia pokazuje, że narzędzia, które najpierw doskonale rozwiązują jeden przypadek użycia, mają większe szanse na sukces w szerszym ekosystemie.

**Key takeaways:**
- Turbopack przenosi się do monorepo Next.js dla szybszych iteracji
- 100% kompatybilność z testami Next.js i top 300 pakietami npm
- Fokus na doskonałość w Next.js przed ekspansją na inne frameworki

**Link:** [Turbopack updates: Moving homes](https://vercel.com/blog/turbopack-moving-homes)

## CSS font-size-adjust w Baseline - rozwiązanie problemu fallback fontów

**TLDR:** Właściwość CSS font-size-adjust jest teraz dostępna we wszystkich głównych przeglądarkach, pozwalając na lepsze dopasowanie fontów zastępczych i zapobieganie przesunięciom layoutu podczas ładowania fontów.

**Summary:**

Właściwość font-size-adjust w CSS to rozwiązanie długotrwałego problemu web developmentu - różnic w wyglądzie i zajmowanej przestrzeni między fontami głównymi a zastępczymi. Kiedy porównujemy dwa fonty ustawione na ten sam rozmiar, w zależności od kształtu i wielkości glifów, wyświetlany tekst może zajmować bardzo różną ilość miejsca.

Problem ten wynika z różnic w aspect value - stosunku wysokości małych liter do wielkich w danym foncie. Na przykład Verdana i Arial ustawione na 16 pikseli będą wyglądać zupełnie inaczej pod względem zajmowanej przestrzeni. To może powodować dwa problemy: po pierwsze, zmianę ilości miejsca zajmowanego przez tekst, po drugie, gorszą czytelność fontu zastępczego, szczególnie przy małych rozmiarach.

Font-size-adjust pozwala dostosować font zastępczy tak, aby lepiej pasował do głównego fontu. Właściwość używa domyślnie metryki ex-height - stosunku wysokości małej litery "x" do rozmiaru fontu. Można również określić konkretną metrykę fontową, na przykład ch-width dla normalizacji szerokości znaków.

Dla architektów i zespołów frontend'owych to narzędzie oznacza możliwość tworzenia bardziej spójnego doświadczenia użytkownika. W kontekście Core Web Vitals i optymalizacji wydajności, font-size-adjust może pomóc w redukcji Cumulative Layout Shift (CLS), szczególnie istotnego w e-commerce i aplikacjach biznesowych. Warto przeanalizować swoje strony używając fontów zastępczych i sprawdzić, czy drobne dostrojenie z font-size-adjust może poprawić doświadczenie użytkowników korzystających z fontów fallback.

**Key takeaways:**
- Font-size-adjust pozwala na lepsze dopasowanie fontów zastępczych
- Pomaga w redukcji przesunięć layoutu i poprawie czytelności
- Dostępne we wszystkich głównych przeglądarkach jako część Baseline

**Link:** [CSS font-size-adjust is now in Baseline](https://web.dev/blog/font-size-adjust)

## Migracja do Nuxt w Malt - 83% aplikacji zmigrowanych po 18 miesiącach

**TLDR:** Malt Engineering osiągnął 83% postępu w migracji z własnego stacku do Nuxt po 18 miesiącach pracy, migrując około jednej aplikacji miesięcznie przy użyciu dedykowanego zespołu i współpracy z zespołami produktowymi.

**Summary:**

Historia migracji Malt z własnego rozwiązania do Nuxt to fascynujący przypadek dużej migracji technicznej w skali enterprise. Po rozpoczęciu projektu "Singapore" w czwartym kwartale 2022 roku, zespół osiągnął znaczący postęp - z 10% aplikacji zmigrowanych w styczniu 2023 do 83% w lipcu 2024. To oznacza około 800 tysięcy linii kodu z miliona całkowitego codebase'u frontend'owego.

Kluczowym elementem sukcesu było strategiczne podejście organizacyjne. Zamiast polegać na zespołach produktowych pracujących w trybie "best effort", Malt stworzył tymczasowy zespół Singapore w ramach platform tribe. Zespół składał się z sześciu osób: byłego CTO, dwóch backend developerów i trzech frontend developerów, którzy zajmowali się migracją w pełnym wymiarze czasu przez 2023 rok.

Zespół Singapore zmigrował około 35% aplikacji między 2023 a pierwszym kwartałem 2024, co pozwoliło uniknąć całkowitego zamrożenia rozwoju produktu na kilka miesięcy. Jednocześnie zespoły produktowe zostały poproszone o włączenie migracji technicznych do swoich roadmap, co wymagało intensywnej komunikacji z dyrektorami produktu i managerami.

Dla organizacji planujących podobne migracje, doświadczenie Malt pokazuje znaczenie dedykowanych zasobów i jasnej komunikacji celów biznesowych. Migracja do Nuxt miała na celu znaczne uproszczenie developer experience i zwiększenie velocity zespołu. Mimo że nie udało się osiągnąć pierwotnego celu zakończenia migracji do końca pierwszego kwartału 2024, tempo około jednej aplikacji miesięcznie pokazuje, że systematyczne podejście może przynieść przewidywalne rezultaty.

**Key takeaways:**
- 83% aplikacji zmigrowanych w 18 miesięcy przy tempie około 1 aplikacji/miesiąc
- Dedykowany zespół migracyjny pozwolił uniknąć zamrożenia rozwoju produktu
- Kluczowa była komunikacja z zespołami produktowymi i włączenie migracji do roadmap

**Link:** [Migration to Nuxt: where are we Today?](https://blog.malt.engineering/migration-to-nuxt-where-are-we-today-9f98c2ad9b58)

## Node.js v22.5.0 - post-mortem poważnego błędu w V8 Fast API

**TLDR:** Node.js v22.5.0 zawierał krytyczny błąd w implementacji V8 Fast API dla fs.closeSync, który powodował awarie aplikacji i problemy z NPM. Incident pokazuje potrzebę lepszego testowania optymalizacji wydajnościowych.

**Summary:**

Node.js v22.5.0 stał się przypadkiem studyjnym tego, jak optymalizacje wydajnościowe mogą nieoczekiwanie złamać cały ekosystem. Dodanie V8 Fast API do funkcji fs.closeSync miało znacznie poprawić wydajność tej funkcji i przyspieszyć aplikacje takie jak NPM. Niestety, implementacja zawierała dwa krytyczne błędy, które praktycznie uniemożliwiły używanie tej wersji Node.js.

Pierwszy błąd powodował crash z komunikatem "ERROR: v8::Object::GetCreationContextChecked No creation context available". Problem leżał w destrukturyzacji wyniku internalBinding('fs'), co powodowało niedostępność kontekstu tworzenia funkcji. Rozwiązanie wymagało zmiany z destrukturyzacji na bezpośrednie użycie obiektu binding.

Drugi, bardziej podstępny błąd, dotyczył nieprawidłowego wyzwalania V8 Fast API. Mimo że Fast API miał być dodany tylko do fs.closeSync(), pod optymalizacją wyzwalał się również dla fs.close(fd, req), co powodowało niepowodzenie NPM z komunikatem "npm error Exit handler never called!". Problem wynikał z faktu, że FastClose nie otrzymywał funkcji jako parametru, więc nie wykonywał callback'a oczekiwanego przez asynchroniczną wersję funkcji.

Ten incident ujawnił również problem z CITGM (Canary in the gold mine) - projektem Node.js mającym wychwytywać niezamierzone błędy wpływające na ekosystem. Okazało się, że nawet przy występujących błędach, zadania CI były oznaczane jako udane, co oznacza, że system ostrzegawczy nie działał prawidłowo.

Dla zespołów deweloperskich ten przypadek pokazuje, jak ważne jest dokładne testowanie optymalizacji wydajnościowych, szczególnie tych operujących na niskim poziomie jak V8 Fast API. Nawet pozornie proste zmiany mogą mieć nieoczekiwane konsekwencje w złożonym ekosystemie JavaScript.

**Key takeaways:**
- Optymalizacje V8 Fast API wymagają bardzo dokładnego testowania
- Problemy z systemem CITGM pokazały słabości w wykrywaniu błędów ekosystemowych
- Potrzeba lepszych procesów review dla zmian na niskim poziomie

**Tradeoffs:**
- V8 Fast API może znacznie poprawić wydajność, ale zwiększa ryzyko błędów
- Optymalizacje niskopoziomowe są trudne do debugowania i testowania
- Szybkie wydania mogą kolidować z potrzebą dokładnego testowania

**Link:** [Fix the bug caused by fast api changes in v22.5.0 and have a post-mortem](https://github.com/nodejs/node/pull/53934)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.