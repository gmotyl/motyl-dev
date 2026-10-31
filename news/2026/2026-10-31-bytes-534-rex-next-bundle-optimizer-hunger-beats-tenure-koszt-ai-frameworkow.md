---
title: "Bytes #534: multiplekser Rex, analiza bundla przez agenta w Next.js 16.4, rada dla juniorów i benchmark frameworków"
excerpt: "Rex jako multiplekser terminali dla agentów, skill next-bundle-optimizer, Felix Rieseberg o tym, że głód bije staż, oraz Nolan Lawson o koszcie tokenów w różnych frameworkach."
publishedAt: "2026-10-31"
slug: "bytes-534-rex-next-bundle-optimizer-hunger-beats-tenure-koszt-ai-frameworkow"
hashtags: "#uidev #frontend #javascript #agents #nextjs #performance #career #react #generated #pl"
source_pattern: "ui.dev"
---

## Rex, czyli tmux dla agentów

**TLDR:** Rex to multiplekser terminali z architekturą klient-serwer i własną aplikacją terminalową opartą na libghostty. Pozwala jednemu agentowi czytać wyjście z jednego terminala i wysyłać dane do drugiego.

**Summary:** Autor Bytesa dostał dostęp do publicznej bety Rexa, jednego z dwunastu tysięcy szczęśliwców, i od razu zrobił z tego opowieść o tym, jak to jest patrzeć, gdy agenty po raz pierwszy się multipleksują. Multiplekser łączy wiele strumieni danych w jeden kanał, a Rex robi to dla sesji terminalowych. W planach jest podpięcie także innych narzędzi deweloperskich, a nawet Slacka czy przeglądarki.

Dziś Rex potrafi trzy rzeczy. Po pierwsze, tworzy nazwane sesje terminalowe sterowane komendami i API, więc skrypt albo agent może uruchomić program, odczytać jego wyjście i wysłać dane do konkretnego terminala. Dzięki temu Codex może wysyłać prompty do Claude'a i zatwierdzać jego komendy, a Claude robi to samo w drugą stronę. Po drugie, sesje żyją na hoście niezależnie od połączenia, więc można się rozłączyć i wrócić do tej samej pracy z innego urządzenia. Po trzecie, Rex pokazuje aktywność programów, w tym postęp i stany zablokowane, jeśli program to zgłasza.

Autor kończy przewidywaniem, że w 2027 roku multipleksowanie stanie się mainstreamem. To śmiała teza po jednym dniu z betą. Brakuje tu pytania o bezpieczeństwo. Agent, który zatwierdza komendy innego agenta, to dokładnie ten układ, w którym żaden człowiek nie patrzy na to, co faktycznie się wykonuje.

**Key takeaways:**
- Rex to multiplekser z serwerem i klientem, zbudowany na libghostty.
- Agenci mogą czytać wyjście i wysyłać wejście do cudzych terminali.
- Sesje przeżywają rozłączenie klienta.
- Na razie to beta, z dostępem dla około 12 tysięcy osób.

**Why do I care:** Jeśli już dziś odpalasz kilka agentów w osobnych oknach, narzędzie do koordynacji terminali to naturalny następny krok. Ale agent zatwierdzający komendy innego agenta to pętla bez człowieka, i to ja bym od razu sprawdził, jakie uprawnienia dostają te sesje, zanim cokolwiek podepnę do repo z sekretami.

**Link:** [Bytes #534 - The masculine urge to multiplex everything](https://bytes.dev/archives/534)

## Next.js 16.4 i agent, który odchudza bundle

**TLDR:** Next.js 16.4 ma skill next-bundle-optimizer, który daje agentowi dostęp do grafu modułów Turbopacka. Vercel twierdzi, że agent wyciął prawie dwa megabajty skompresowanego JavaScriptu w v0 i na vercel.com.

**Summary:** Zmiany w tym, jak moduły importują się nawzajem, potrafią mocno wpłynąć na czas ładowania aplikacji. Turbopack Bundle Analyzer pojawił się w Next.js 16.1, a teraz dostał warstwę dla agentów. Po aktualizacji do 16.4 i dodaniu skilla uruchamia się go komendą w agencie. Agent eksportuje zapisane snapshoty analizy do JSON-a, odtwarza graf modułów i chunków, szuka dużych grup powiązanych modułów, a potem metodą minimalnego cięcia wskazuje niewielki zestaw granic importów, które pozwoliłyby odroczyć ich ładowanie.

Klasyczny przykład to leniwe ładowanie ciężkiego komponentu, które nic nie daje, bo inny moduł w tym samym bundlu importuje go statycznie. Człowiek takie miejsca znajduje powoli, agent z grafem robi to szybko. Skill szuka też okazji do przeniesienia logiki do React Server Components, zdublowanych wersji dużych zależności i miejsc, gdzie tree shaking nie zadziałał. Domyślnie raportuje, a z opcją fix stosuje poprawki, ponownie analizuje i porównuje snapshoty.

Vercel podaje konkretne przypadki. W v0 eksperymentalny edytor kodu ładował się wszędzie, nawet u użytkowników spoza eksperymentu, co kosztowało 150 KB. Rejestr dialogów ładował ciężkie okna z góry, co dawało od 40 do 650 KB zależnie od strony. Na vercel.com renderowanie markdownu, podświetlanie składni i wykresy dla Vercel Agent jechały nawet bez otwartego panelu, 255 KB na dashboardzie. Ludzie dostali też nowy widok tabelaryczny tras, porównywanie snapshotów i filtr ścieżki krytycznej.

**Key takeaways:**
- Skill wymaga Turbopacka, domyślnego bundlera od Next.js 16.
- Agent proponuje poprawki, a człowiek dostaje diff snapshotów, żeby zmierzyć efekt.
- Typowe winy to statyczny import psujący lazy loading i zdublowane zależności.
- Liczby pochodzą od Vercela z własnych aplikacji, nie z niezależnego testu.

**Why do I care:** To rzadki przypadek agenta, któremu daje się narzędzie z prawdziwymi danymi, a nie samą prośbę o optymalizację. Zanim jednak ktokolwiek zaufa tym 2 MB, warto pamiętać, że to aplikacje autorów frameworka. Ja puściłbym skilla w trybie raportu na własnym projekcie i przejrzał propozycje ręcznie, bo odroczenie ładowania potrafi zepsuć interakcję, której agent nie zobaczy.

**Link:** [Ship less JavaScript in Next.js with your AI agent](https://nextjs.org/blog/ship-less-javascript-with-ai)

## Głód bije staż

**TLDR:** Felix Rieseberg, manager w Anthropic, przestał dawać kandydatom klasyczne zadania kodowania i radzi juniorom, żeby budowali prototypy zamiast czekać na zgodę. Jego zdaniem nowi inżynierowie coraz częściej wyprzedzają bardziej doświadczonych.

**Summary:** Autor pisze, że w tym miesiącu pochował tradycyjny coding interview. Małe zadanie w Reakcie nie ma dziś większego sensu niż pytanie o assembler, bo Claude robi jedno i drugie lepiej. Najbardziej wpływowi twórcy w jego zespole odnoszą sukcesy niezależnie od wyniku w takich testach. Zamiast narzekać na los juniorów, zauważa, że wpływ coraz mniej zależy od lat zebranej wiedzy o frameworkach i bibliotekach.

Argument opiera się na świeżym spojrzeniu. W Notion jedna z jego rozmów dotyczyła projektu trybu offline, który firma uważała za niemożliwy. Okazało się, że złożony model danych rzeczywiście to utrudnia, ale opór założyciela był mitem, bo nikt go nigdy nie sprawdził. Rok później nowy pracownik zapytał o duże telewizory z dashboardami, które autor sam wcześniej próbował wprowadzić i odpuścił. Telewizory pojawiły się następnego dnia. Przez ten rok autor sam został starym wygą.

Rady są konkretne. Wybieraj wpływ na biznes zamiast backlogu, wymyśl kilka odważnych pomysłów, zbuduj działający prototyp przez weekend i trzymaj się jednego dobrego pomysłu, a nie dwudziestu słabych. Przykład z Anthropic to graficzny interfejs dla Claude Code, który dwóch stosunkowo nowych inżynierów złożyło w jeden weekend, a pierwsza publiczna wersja wyszła po około ośmiu dniach.

**Key takeaways:**
- Wykonanie przestało być drogie, więc brak statusu przestaje być wymówką.
- Prototyp komunikuje pomysł lepiej niż dokument wymagań.
- Jeden pomysł w prototypie, nie kilka.
- Rekruterzy szukają teraz małych projektów pokazujących gust i empatię.

**Why do I care:** Z perspektywy zespołu to dobra wiadomość, ale też test dla seniorów, bo tłumienie pomysłów juniorów staje się droższe. Autor nie mówi jednak o tym, co się dzieje z weekendowym prototypem, gdy trzeba go utrzymać, zabezpieczyć i zrozumieć za rok. Szybkie zbudowanie to początek roboty, nie koniec, i to ja bym powiedział juniorom wprost.

**Link:** [Hunger beats tenure: Advice for junior engineers](https://felixrieseberg.com/hunger-beats-tenure-advice-for-junior-engineers/)

## Ile tokenów kosztuje framework

**TLDR:** Nolan Lawson zbudował benchmark, w którym agent (Opus 5.5) pisze tę samą aplikację z Pokémonami w dwunastu stosach technologicznych. Najtańsze wyszły Hono z htmx, Astro i Nuxt, najdroższe Angular.

**Summary:** Lawson od dawna narzeka, że decyzje frontendowe opierają się na wrażeniach, a nie na dowodach. W erze agentów widzi to samo. Frontendy przepisuje się, bo jakiś framework jest "lepszy dla agentów", choć nikt nie zapytał agentów i nie zmierzył. Zrobił więc test. Każdy stos dostał tę samą specyfikację, oficjalne MCP lub skille, jeśli istniały, i zestaw testów zgodności opartych na drzewie dostępności. Wynik to mediana z pięciu uruchomień, a dla Angulara z trzech, bo dwa razy agent nie dostarczył działającej aplikacji.

Koszt jednego przebiegu wyniósł od 2,67 dolara dla Hono z htmx do 4,97 dolara dla Angulara. Astro i Nuxt były tuż za liderem, a vanilla z Vite kosztowała 2,98 dolara, czyli wypadła gorzej niż kilka frameworków. SvelteKit wyszedł drogo między innymi dlatego, że agenci za każdym razem czytali przewodnik migracji do wersji 3, której nie było w danych treningowych. Jeśli chodzi o jakość, wyniki Lighthouse dla wydajności i dostępności były prawie wszędzie nasycone, więc różnice widać w bajtach JavaScriptu. Astro wysłał niemal zero, Next.js 142 KiB, TanStack Start 118 KiB. Najmniej kodu wyszło w Hono z htmx, około 1370 linii, a najwięcej w Angularze, ponad 2000.

Autor sam wylicza ograniczenia. Aplikacja jest mała i bardziej przypomina Wikipedię niż Figmę, Lighthouse faworyzuje strony wielostronicowe, a wyniki są stochastyczne. Podejrzewa nawet, że obecne skille i MCP mogą szkodzić bardziej, niż pomagać, bo w kilku stosach agent ich w ogóle nie użył.

**Key takeaways:**
- Koszt przebiegu mieścił się między około 2,70 a 5 dolarów, rozrzut w obrębie jednego frameworka bywał duży.
- Rozmiar kodu przekłada się na tokeny, a więc na koszt przyszłych edycji.
- Wyniki Lighthouse faworyzują MPA, więc nie mówią o aplikacjach z dużą interakcją.
- Benchmark jest na GitHubie i można go powtórzyć.

**Why do I care:** Podoba mi się samo podejście, bo mierzenie zamiast czucia to rzadkość. Ale jedna aplikacja o niskiej interaktywności to za mało, żeby wybierać stos dla dashboardu albo narzędzia produktowego. Autor pomija też, że tańszy w budowie niekoniecznie znaczy tańszy w utrzymaniu przez trzy lata, kiedy ludzie muszą czytać ten kod.

**Link:** [The AI cost of JavaScript frameworks](https://nolanlawson.com/2026/10/28/the-ai-cost-of-javascript-frameworks/)

## Krótko z Cool Bits

**TLDR:** Szybki parser HTML od Luke'a Edwardsa, badanie Cartesii nad sieciami hierarchicznymi działającymi na bajtach i wersjonowanie dla agentów zbudowane na Ruście i Durable Objects.

**Summary:** Luke Edwards opublikował parser HTML, który według opisu jest od trzech do sześciu razy szybszy od innych parserów w JavaScripcie, ma offsety źródłowe i selektory CSS. Cartesia Research opisała pierwszą część prac nad skalowaniem sieci hierarchicznych. Skrót z newslettera mówi, że h-nety używają bajtów zamiast tokenów, zużywają około dziesięć razy mniej mocy obliczeniowej i działają na różnych typach danych. To deklaracje z newslettera, bez sprawdzenia na własnych danych.

Antonio Scandurra opisał, jak zbudował drobnoziarniste wersjonowanie dla agentów w Ruście z użyciem CRDT i Durable Objects. Bytes żartuje, że wykorzystał każdy modny skrót z bingo Hacker News. Pomysł jest jednak rozsądny, bo agent edytujący pliki równolegle potrzebuje czegoś lepszego niż gałęzie Gita pisane dla ludzi.

**Key takeaways:**
- Parser lukeed/html ma offsety źródłowe i selektory CSS.
- Cartesia stawia na bajty zamiast tokenów w sieciach hierarchicznych.
- Delta.dev pokazuje wersjonowanie pod agentów oparte na CRDT.

**Why do I care:** Niewiele z tego zmieni mi poniedziałek, ale parser z offsetami przyda się każdemu, kto pisze narzędzia do transformacji kodu. Resztę wrzuciłbym na listę do przejrzenia, nie do wdrożenia.

**Link:** [GitHub - lukeed/html: A fast HTML parser with source offsets and CSS selectors](https://github.com/lukeed/html)
