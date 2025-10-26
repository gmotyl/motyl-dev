---
title: 'Release V430 Honojshono Creating A Pointer Friendly Submenu Experience Remix For Nextjs Developers'
excerpt: 'Przegląd 5 artykułów z ui.dev'
publishedAt: '2025-10-26'
slug: 'release-v430-honojshono-creating-a-pointer-friendly-submenu-experience-remix-for-nextjs-developers'
hashtags: '#generated #pl #react #typescript'
---

## Release v4.3.0 · honojs/hono

No, to mamy nową wersję Hono 4.3.0 i ludzie, to jest solidny update! Największa zmiana dotyczy trybu RPC, który teraz jest znacznie bardziej type-safe. Wcześniej gdy używaliście `c.text()`, dostawaliście zwykły Response object bez typowania. Teraz Hono zwraca TypedResponse, więc wasz klient stworzony przez `hc` wie dokładnie jaki typ danych dostanie. To znaczy, że jeśli endpoint zwraca string "Me!", to TypeScript wie, że to jest string, a nie jakiś tam any. 

Kolejna rzecz - pełne wsparcie dla JSON primitives. Teraz możecie zwracać stringi, numbery, booleany i wszystko jest poprawnie typowane po stronie klienta. Dodali też typowanie dla status codes - jeśli explicitly zwracacie 404 czy 200, klient może sprawdzić status i dostać odpowiedni typ danych.

**Key takeaways:**
- RPC mode z pełnym typowaniem dla c.text() i c.json()
- Wsparcie dla wszystkich JSON primitives z poprawnym typowaniem
- Status codes są teraz częścią systemu typów
- Znacznie lepsza developer experience przy budowaniu API

**Link:** https://github.com/honojs/hono/releases/tag/v4.3.0

Kluczowe wnioski:
- - RPC mode z pełnym typowaniem dla c.text() i c.json()
- Wsparcie dla wszystkich JSON primitives z poprawnym typowaniem
- Status codes są teraz częścią systemu typów
- Znacznie lepsza developer experience przy budowaniu API
- https://github.com/honojs/hono/releases/tag/v4.3.0

Link: ** https://github.com/honojs/hono/releases/tag/v4.3.0

## Creating a pointer-friendly submenu experience

Adobe React Spectrum team pokazuje jak zrobić submenu, które nie wkurza użytkowników. Problem jest klasyczny - user hover na item, submenu się otwiera, ale gdy próbuje przejść do submenu, kursor mija oryginalny element i submenu się zamyka. Frustracja level maksymalny.

Ich rozwiązanie jest genialnie proste - trackują kierunek i prędkość ruchu kursora. Wyobrażacie sobie dwie linie: jedna od kursora do górnej części submenu, druga do dolnej. To tworzy "strefę intencji" - jeśli kursor porusza się w tym obszarze, to znaczy że user idzie do submenu, więc nie zamykamy go. Używają atan2 do obliczenia kąta ruchu i sprawdzają czy mieści się w bezpiecznej strefie.

Plus trackują prędkość - users zazwyczaj przyspieszają idąc do submenu, potem zwalniają gdy browsują opcje. To pozwala jeszcze lepiej przewidzieć intencje.

**Key takeaways:**
- Problem z zamykającymi się submenu podczas nawigacji kursorem
- Rozwiązanie przez tracking kierunku i prędkości kursora
- Użycie atan2 do obliczenia kąta ruchu
- Definicja "strefy intencji" dla lepszego UX

**Link:** https://react-spectrum.adobe.com/blog/creating-a-pointer-friendly-submenu-experience.html

Kluczowe wnioski:
- - Problem z zamykającymi się submenu podczas nawigacji kursorem
- Rozwiązanie przez tracking kierunku i prędkości kursora
- Użycie atan2 do obliczenia kąta ruchu
- Definicja "strefy intencji" dla lepszego UX
- https://react-spectrum.adobe.com/blog/creating-a-pointer-friendly-submenu-experience.html

Link: ** https://react-spectrum.adobe.com/blog/creating-a-pointer-friendly-submenu-experience.html

## Remix for Next.js Developers

Ktoś zrobił kompletny przewodnik dla Next.js devów, którzy chcą przeskoczyć na Remix. I szczerze mówiąc, różnice są mniejsze niż myślicie, ale filozofia jest zupełnie inna.

Routing w Remix używa kropek zamiast folderów - więc `concerts.trending.tsx` to route `/concerts/trending`. Dynamic routes używają dolara zamiast nawiasów kwadratowych - `$city` zamiast `[city]`. Catch-all routes to po prostu `$` zamiast `[...slug]`.

Ale najważniejsza różnica to podejście do data loading. Next.js ma getServerSideProps, getStaticProps i cały ten mess. Remix ma loader functions bezpośrednio w route components. Chcesz data? Export loader function. Chcesz handle form submission? Export action function. Koniec.

Layout system też jest prostszy - zamiast _app.tsx masz root.tsx, a nested layouts to po prostu components z Outlet.

**Key takeaways:**
- Routing syntax różni się ale jest logiczny (kropki zamiast slashów)
- Dynamic routes używają $ zamiast []
- Prostszy data loading z loader/action functions
- Cleaner layout system z Outlet component

**Link:** https://remixfornextdevs.com/

Kluczowe wnioski:
- - Routing syntax różni się ale jest logiczny (kropki zamiast slashów)
- Dynamic routes używają $ zamiast []
- Prostszy data loading z loader/action functions
- Cleaner layout system z Outlet component
- https://remixfornextdevs.com/

Link: ** https://remixfornextdevs.com/

## GitHub - mhkeller/layercake

Layer Cake to headless visualization framework dla Svelte, i wygląda naprawdę interesująco. Idea jest taka - dostajesz wrapper component i puste layout components (Svg, Html, Canvas), a ty wypełniasz je swoimi chart components.

Co mi się podoba, to że nie narzuca konkretnych chart types. Zamiast tego daje ci building blocks - scales, dimensions, data binding - a ty budujesz co chcesz. Możesz mieszać SVG, HTML i Canvas w jednym wykresie. Chcesz SVG line chart z HTML labels i Canvas scatter points? No problem.

Wspiera Svelte 5 z Rune syntax, ale starsze wersje też działają. Documentation wygląda solidnie z dużą ilością examples.

**Key takeaways:**
- Headless approach - ty budujesz komponenty, framework daje tools
- Możliwość mieszania SVG, HTML i Canvas
- Dobra integracja z Svelte ecosystem
- Flexible i nie narzuca konkretnych chart types

**Link:** https://github.com/mhkeller/layercake

Kluczowe wnioski:
- - Headless approach - ty budujesz komponenty, framework daje tools
- Możliwość mieszania SVG, HTML i Canvas
- Dobra integracja z Svelte ecosystem
- Flexible i nie narzuca konkretnych chart types
- https://github.com/mhkeller/layercake

Link: ** https://github.com/mhkeller/layercake

## Text Manipulation Kung Fu for the Aspiring Black Belt

Zed editor team napisał guide o text manipulation, który brzmi jak martial arts manual. I szczerze, podejście mają dobre - zamiast uczyć setek komend, uczą building blocks, które można kombinować.

Podstawy to directional keys (left, right, up, down) plus modifiers: cmd dla jumping do boundaries (cmd-left = beginning of line), alt dla word boundaries, shift żeby zrobić selection zamiast move. Kombinując te modifiers dostajesz potężny system nawigacji.

Najważniejsze to command palette (cmd-shift-p) - fuzzy search po wszystkich dostępnych komendach. Zamiast pamiętać wszystkie shortcuts, po prostu typujesz co chcesz zrobić.

**Key takeaways:**
- Learning building blocks zamiast memorizing wszystkich komend
- Modifiers system: cmd (boundaries), alt (words), shift (selection)
- Command palette jako primary way of discovery
- Kombinowanie basic movements dla complex operations

**Link:** https://zed.dev/blog/text-manipulation

Kluczowe wnioski:
- - Learning building blocks zamiast memorizing wszystkich komend
- Modifiers system: cmd (boundaries), alt (words), shift (selection)
- Command palette jako primary way of discovery
- Kombinowanie basic movements dla complex operations
- https://zed.dev/blog/text-manipulation

Link: ** https://zed.dev/blog/text-manipulation