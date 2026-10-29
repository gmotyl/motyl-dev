---
title: "This Week In React #303: koszt AI frameworków, Vinext 1.4, TanStack DB i wyrocznie, bundle optimizer w Next.js"
excerpt: "Benchmark frameworków z agentem, Vinext 1.4 szybszy od Next.js na jednym teście, TanStack DB 1.0 RC1, agent do odchudzania bundli i optymalizacja TanStack Start."
publishedAt: "2026-10-29"
slug: "this-week-in-react-303-koszt-ai-frameworkow-vinext-tanstack-db-nextjs-bundle"
hashtags: "#thisweekinreact #react #reactnative #nextjs #tanstack #performance #ai #agents #generated #pl"
source_pattern: "This Week In React"
---

## The AI cost of JavaScript frameworks

**TLDR:** Nolan Lawson kazał agentowi zbudować tę samą aplikację z Pokémonami w dwunastu frameworkach i zmierzył koszt, czas, tokeny i jakość. Najtańsze były Hono z htmx, Astro i Nuxt, najdroższe Angular.

**Summary:** Autor irytuje się, że decyzje w frontendzie opierają się na wrażeniach. Teraz, gdy kod pisze agent, widzi tę samą wiarę w to, że jakiś framework jest lepszy dla agentów. Zbudował więc benchmark. Opus 5.5 z wysokim wysiłkiem miał zrobić aplikację z listą Pokémonów, wyszukiwaniem i filtrami, przy każdym frameworku z jego oficjalnym MCP lub skillem, o ile istniał. Wynik sprawdzał zestaw testów zgodności oparty na drzewie dostępności, a potem Lighthouse. Każdy framework zbudowano pięć razy, tylko Angular trzy razy, bo dwie próby nie dały działającej aplikacji.

Koszt medianowy wahał się od 2,67 dolara dla Hono z htmx do 4,97 dolara dla Angulara. Next.js wyszedł na 3,14, TanStack Start na 3,54, React Router na 3,81, SvelteKit na 4,28. Autor tłumaczy, że SvelteKit mógł kosztować więcej, bo agenci czytali przewodnik migracji do wersji 3, której model jeszcze nie znał. Czyste Vite bez frameworka wypadło gorzej od kilku frameworków. Wyniki Lighthouse dla wydajności i dostępności są prawie nasycone, więc różnicę widać w ilości JavaScriptu. Astro wysłało 0 kilobajtów, Next.js 142, a Total Blocking Time to 0 milisekund dla Astro i 71 dla Next.js. Najmniej kodu miało Hono z htmx, 1370 linii, a najwięcej Angular, 2009 linii.

Autor uczciwie wymienia ograniczenia. Aplikacja jest prosta i oparta na treści, Lighthouse z natury faworyzuje aplikacje wielostronicowe, a wyniki są stochastyczne. Podejrzewa też, że obecne MCP i skille mogą szkodzić bardziej, niż pomagać, bo agenci często w ogóle z nich nie korzystali.

**Key takeaways:**
- Koszt buildu waha się od około 2,70 do około 5 dolarów, a rozrzut w ramach jednego frameworka bywa większy niż różnica między sąsiadami.
- Mniej kodu oznacza mniej tokenów także przy późniejszych zmianach.
- Skille i MCP często nie były używane przez agentów, więc ich wartość jest niepewna.

**Why do I care:** Cenię, że ktoś w ogóle próbuje mierzyć zamiast zgadywać. Wniosku o React jako najlepszym albo najgorszym stąd nie wyciągnę. Aplikacja z treścią to jeden przypadek, a w dashboardzie wynik mógłby wyglądać odwrotnie. Autor nie testuje utrzymania po roku, a to w kodzie pisanym przez agenta kosztuje najwięcej.

**Link:** [The AI cost of JavaScript frameworks](https://nolanlawson.com/2026/10/28/the-ai-cost-of-javascript-frameworks/)

## Vinext 1.4: mniej pracy serwera, szybsza hydratacja, lżejszy prefetching

**TLDR:** Na stronie historii z Hacker News Vinext 1.4 zużywa o 43 procent mniej CPU na żądanie niż wersja 1.3 i trochę mniej niż Next.js. Na większym prototypie Next.js nadal wygrywa w części metryk.

**Summary:** Zespół profilował Vinext na aplikacji Hacker News i znalazł mnóstwo zbędnej pracy. Każda strumieniowana odpowiedź była owijana kilka razy, a każde owinięcie przepuszczało treść przez własny strumień transformujący. Teraz owinięcia czytają strumień bezpośrednio i łączą się w jedno. Na Node renderowanie używa builda React dla Node, a nie dla edge, który alokuje bufor na każdy węzeł tekstowy. Efekt to CPU na żądanie 31,1 milisekundy zamiast 54,4, a Next.js ma 33,7. Przepustowość rośnie o 40 procent.

W przeglądarce chunki potrzebne na starcie dostają jawną podpowiedź kompilacji V8, więc Chrome 136 i nowsze kompilują je w tle. Hydratacja strony z około 650 komponentami klienckimi spadła ze 104 do 87 milisekund. Prefetching przestał renderować całe strony dla każdego linku. Na prototypie dużego serwisu treści otwarcie jednej strony pobierało 3,9 megabajta, a teraz 10,7 kilobajta. Layouty uruchamiają się raz na żądanie.

Autorzy nie ukrywają, że na większym prototypie Next.js maluje pierwszy o około pół sekundy, bo Vite zostawia jeden plik CSS na chunk i strona linkuje 15 arkuszy zamiast 4. Next.js zużywa też około piątej części CPU mniej. Sprawdzili też TanStack Redact. Zmniejsza on JavaScript o jedną czwartą, ale na stronie z 1500 komentarzy Total Blocking Time rośnie z 56 do 666 milisekund, bo Redact w produkcji porównuje każdą właściwość z atrybutem z HTML.

**Key takeaways:**
- CPU na żądanie spadło o 43 procent, a przepustowość wzrosła o 40 procent względem 1.3.
- Prefetch dla stron dynamicznych ściąga tylko stan ładowania trasy.
- Na dużej stronie z wieloma komponentami Vinext nadal przegrywa pierwsze malowanie.

**Why do I care:** Pomiary są szczegółowe i uczciwie pokazują, gdzie Next.js jest lepszy, co rzadko się zdarza w ogłoszeniach wydania. To jednak testy autorów na wybranych aplikacjach. Zanim przeniesiesz produkcję, odpal własny ciężki ekran. Wynik z Redactem pokazuje, że mniejszy bundle nie wygrywa zawsze z kosztem hydratacji.

**Link:** [Vinext 1.4: less server work, faster hydration, and lighter prefetching](https://vinext.dev/blog/vinext-1-4)

## TanStack DB 1.0 RC1 i wyrocznie zamiast testów jednostkowych

**TLDR:** Kandydat do wydania 1.0 kończy półtora roku prac. Autor opisuje, jak przez trzy miesiące z agentami i testami opartymi na modelach referencyjnych, zwanymi wyroczniami, dodał około 420 tysięcy linii testów.

**Summary:** TanStack DB to reaktywna baza po stronie klienta, w której rekordy z API stają się typowanymi kolekcjami. Można ją wdrażać stopniowo, od istniejących zapytań REST po trwałość lokalną i synchronizację w czasie rzeczywistym. Rdzeń ma ponad milion pobrań tygodniowo, a wzrost w ciągu roku to około dziesięciokrotność.

Najciekawsza część dotyczy testowania. Zwykły test jednostkowy zapisuje jeden przykład. Wyrocznia to prosty model referencyjny, który dla dowolnej historii zmian wylicza poprawny wynik od zera, na przykład trzymając dane w zwykłej mapie, filtrując i sortując. Generator zmian z fast-check porównuje potem wynik prawdziwej bazy z modelem po każdej partii. Autor opisuje historię jednego błędu. Użytkownik zgłosił usunięcie i ponowne wstawienie wiersza z tym samym kluczem w jednej turze, a subskrybent nie dostawał wstawienia. Kolejne wyrocznie ujawniały następne luki, na przykład zduplikowane wstawienia po odświeżeniu z serwera, a sama wyrocznia musiała być zaostrzona, żeby odróżniała wstawienie od aktualizacji. Repozytorium ma teraz 211 plików z wyroczniami w 15 pakietach, a agenci uczą się z nich projektu, bo test mówi im, że ich pomysł łamie zasadę.

**Key takeaways:**
- Wyrocznia to niezależny model, który oblicza oczekiwany wynik dla dowolnej historii zmian.
- Samodzielne testy przykładowe są w DB wygaszane, a po naprawie błędu koduje się zasadę, nie tylko przykład.
- Wyrocznie trzeba same testować, na przykład celowo psując kod i sprawdzając, czy test to wykryje.

**Why do I care:** To jest najlepszy tekst o pracy z agentami w tym numerze, bo opisuje metodę, a nie wrażenia. Autor pomija koszt. Mówi o miliardach tokenów i trzech miesiącach, więc nie każdy zespół to powtórzy. Sam wzorzec modelu referencyjnego z generatorem przypadków zadziała jednak także przy zwykłej logice synchronizacji w aplikacji.

**Link:** [TanStack DB 1.0 RC1: Going All In on Oracles](https://tanstack.com/blog/tanstack-db-1.0-rc1-going-all-in-on-oracles)

## Next.js 16.4 i agent do odchudzania bundli, plus zapowiedź poprawek bezpieczeństwa

**TLDR:** Next.js dodał skill next-bundle-optimizer, który korzysta z grafu modułów Turbopacka. Agenci Vercela usunęli albo odroczyli prawie dwa megabajty JavaScriptu w v0 i vercel.com. Poprawki bezpieczeństwa wyjdą 3 listopada.

**Summary:** Skill działa na zapisanych migawkach analizatora, które eksportuje się jako JSON. Agent odtwarza graf modułów i chunków, wyszukuje duże grupy powiązanych modułów, śledzi łańcuchy importów i szuka minimalnego cięcia, czyli małego zbioru granic importu, które odroczyłyby ładowanie. Przykład z artykułu jest prosty. Jeśli ciężki komponent jest ładowany leniwie w jednym miejscu, ale statycznie importowany gdzie indziej w tym samym bundlu, to leniwe ładowanie nie ma żadnego efektu.

Konkretne oszczędności w v0 to 150 kilobajtów po wyłączeniu eksperymentalnego edytora, od 40 do 650 kilobajtów po leniwym ładowaniu rejestru dialogów i do 61 kilobajtów po usunięciu nieużywanego komponentu. Na vercel.com dashboard zaoszczędził 255 kilobajtów, bo renderowanie markdownu i kolorowanie składni dla agenta ładowały się bez otwartego panelu. Analizator dla ludzi dostał widok najcięższych tras, porównywanie migawek i filtr krytycznej ścieżki renderowania. Osobno Next.js zapowiedział wydanie bezpieczeństwa na 3 listopada, które naprawi siedem luk o średniej wadze.

**Key takeaways:**
- Skill wymaga Turbopacka i Next.js 16.4.
- Domyślnie raportuje, a poprawki stosuje dopiero polecenie fix.
- Siedem średnich luk zostanie załatanych 3 listopada, więc warto zaplanować aktualizację.

**Why do I care:** Ręczne polowanie na przypadkowe statyczne importy to nudna robota, więc automatyzacja ma sens. Dowody pochodzą jednak od samego Vercela na własnych aplikacjach i każdą zmianę ktoś zweryfikował na podglądzie. Nie zakładałbym, że agent bezpiecznie przeniesie komponent za granicę asynchroniczną bez przeglądu.

**Link:** [Ship less JavaScript in Next.js with your AI agent](https://nextjs.org/blog/ship-less-javascript-with-ai)

## Optymalizacja TanStack Start od 73 do 100 punktów

**TLDR:** Autor strony osobistej podniósł wynik mobilnego PageSpeed z 73 do 100, głównie przez niewczytywanie rzeczy, których strona nie potrzebuje.

**Summary:** Element LCP był akapitem, który był już w HTML, a mimo to pojawiał się po 5,2 sekundy. Największe wygrane przyniosło wycięcie manifestu 117 obrazów, który ładował się na każdej stronie, leniwe ładowanie dialogów, ukrycie obrazów nawigacji, których telefon nie widział, i odchudzenie fontów. Font Inter spadł z około 342 kilobajtów do 47 dla głównego pliku łacińskiego po usunięciu osi optycznej. Dodał też zapasową czcionkę z dopasowanymi metrykami, bo szybsza podmiana przesuwała treść i dawała CLS około 0,21.

Krytyczny CSS wyciągany Beasties i opóźniony start aplikacji zmniejszyły blokujący CSS z około 20 do 30 kilobajtów do 7 do 15 na stronę, ale autor nie potrafi przypisać im końcowego wyniku. Utrzymanie listy dozwolonych selektorów kosztowało więcej, niż dało. Wynik 91 do 95 na trzech przebiegach pokazuje, że pojedynczy pomiar niewiele mówi. Całość robił z Claude Code i Codexem, a decyzje o tym, co zostawić, zostały po jego stronie. Na koniec ustawił budżety rozmiarów i testy w przeglądarce.

**Key takeaways:**
- Najpierw ustal element LCP, a dopiero potem optymalizuj.
- Największe zyski dało niewczytywanie zbędnych danych, a nie wyrafinowane techniki.
- Krytyczny CSS i opóźniona hydratacja kosztowały utrzymanie, a wpływ na wynik jest niejasny.

**Why do I care:** Szczerość co do tego, czego nie da się przypisać, jest tu cenna. Pamiętaj tylko, że to strona osobista z 71 prerenderowanymi stronami, a nie aplikacja z logowaniem. Samo odkrycie, że jedna importowana mapa obrazów trafiała na każdą stronę, ma sens jako szybki audyt każdego projektu.

**Link:** [Optimizing the sh*t out of TanStack Start](https://sarthakmishra.com/blog/optimizing-tanstack-start)
