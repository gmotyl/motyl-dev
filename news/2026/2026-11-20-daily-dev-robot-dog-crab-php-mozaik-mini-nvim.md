---
title: "daily.dev: psy-roboty w czterech przedziałach cenowych, Crab dla PHP, silnik reguł Mozaik i mini.nvim na Tangled"
excerpt: "Przegląd czterech wpisów z daily.dev, od cen robotów kroczących, przez framework PHP z długo żyjącym serwerem, po silnik reguł dla agentów AI i bibliotekę modułów Neovim."
publishedAt: "2026-11-20"
slug: "daily-dev-robot-dog-crab-php-mozaik-mini-nvim"
hashtags: "#dailydev #frontend #php #typescript #agents #devtools #open-source #generated #pl"
source_pattern: "daily.dev"
---

## Robot dog na sprzedaż: który przedział cenowy pasuje do twojego zastosowania

**TLDR:** Roboty kroczące dzielą się na cztery przedziały cenowe i nie są wymienne. Autor radzi porównywać ładowność, teren, czujniki, wsparcie SDK i koszt pierwszego roku, a nie samą cenę.

**Summary:** Tekst z dev.to rozkłada rynek na cztery półki. Najtańsze są zabawkowe czworonogi, na przykład Petoi Bittle od około 300 dolarów, kupowany przez hobbystów i nauczycieli. Wyżej stoją platformy dla programistów, a tu przykładem jest Unitree Go2 Air za około 1600 dolarów, z obsługą ROS 2. Roboty badawcze, jak Deep Robotics Lite3, kosztują od 8 do 16 tysięcy dolarów i służą do pilotaży inspekcyjnych. Na górze jest Boston Dynamics Spot, wyceniany indywidualnie, a skonfigurowane wdrożenia łatwo dochodzą do 150 tysięcy dolarów.

Autor prostuje też popularną liczbę 74,5 tysiąca dolarów. To przestarzała cena bazowa z 2020 roku, która dziś niewiele mówi o realnym koszcie. Główna rada jest praktyczna. Nie porównuj modeli po cenie, tylko po tym, czy udźwig, teren i SDK pasują do twojego zadania, i licz wszystko, co wydasz w pierwszym roku.

**Key takeaways:**
- Cztery półki cenowe nie są zamiennikami.
- Spot kosztuje zwykle ponad 150 tysięcy dolarów, nie 74,5 tysiąca.
- Do wyboru liczą się SDK i ładowność, nie sama cena.

**Why do I care:** Dla mnie to raczej ciekawostka niż temat frontendowy. Warto jednak zapamiętać schemat, bo tak samo dobiera się każdą platformę sprzętową. Zespół, który kupuje po cenie, kończy z robotem bez SDK, którego nikt nie umie zaprogramować.

**Link:** [Robot Dog for Sale: Which Price Tier Fits Your Use Case?](https://daily.dev/posts/RQ5cNyPr2)

## Crab, szybkie PHP dla API i usług

**TLDR:** Crab to nowy framework PHP, który działa jako długo żyjący serwer zamiast na PHP-FPM. W teście "Hello" obsłużył ponad 108 tysięcy żądań, a Laravel z Octane około 2 tysięcy.

**Summary:** Crab łączy routing, walidację, bazy danych, kolejki, harmonogram, uwierzytelnianie i WebSockets w jednej podstawie. Jedna komenda startuje serwer HTTP, workery kolejki i scheduler razem. Do tego dochodzi polecenie describe, które drukuje trasy i konfigurację całej aplikacji, tak żeby czytał je i człowiek, i agent kodujący.

Autorzy pokazują benchmark na współdzielonym hoście z dwoma procesorami i 2 GiB pamięci. Crab 0.6.4 obsłużył 108 522 żądania, Laravel 13.40.0 z Octane i FrankenPHP 2179, a Symfony 8.1.11 z FrankenPHP 6114. Różnica jest tak duża, że sama prosi o sprawdzenie metodyki. Test "Hello" mierzy narzut frameworka, a nie prawdziwą aplikację z bazą i serializacją.

**Key takeaways:**
- Długo żyjący serwer zamiast PHP-FPM.
- Jedna komenda uruchamia HTTP, kolejki i scheduler.
- Benchmark "Hello" na dwóch rdzeniach nie przekłada się wprost na produkcję.

**Why do I care:** Nie piszę w PHP na co dzień, ale zainteresował mnie pomysł polecenia describe dla agentów. Jeśli framework potrafi opisać sam siebie w jednym wyjściu, agent nie musi zgadywać struktury projektu. To wzorzec do skopiowania w każdym backendzie.

**Link:** [Crab, fast, easy PHP for APIs and services](https://daily.dev/posts/F2LZA56PG)

## Mozaik, silnik reguł dla TypeScripta

**TLDR:** Mozaik decyduje w czasie działania, co program ma wykonać, na podstawie warunków, komend i reguł z priorytetem. Powstał, żeby zmieniać zachowanie agenta AI w środku pętli.

**Summary:** Warunki, komendy i resolvery wejścia definiuje się dekoratorami, a potem łączy w reguły z priorytetem. Wygrywa mniejsza liczba, brak priorytetu oznacza zero, a remis rozstrzyga wcześniejsza reguła. Silnik używa standardowych dekoratorów JavaScript, więc opcja experimentalDecorators musi zostać wyłączona.

Autorzy podają konkretny przykład. Agent zaczyna edytować plik, a reguła wstrzymuje edycję, jeśli inny agent zmienił ten plik od momentu odczytu. To rozsądne zastosowanie, bo wyścigi między agentami są dziś realnym problemem.

**Key takeaways:**
- Mniejszy numer priorytetu wygrywa.
- Wymaga standardowych dekoratorów.
- Pierwszy przypadek użycia to kontrola agentów w trakcie pętli.

**Why do I care:** Reguły w deklaratywnym silniku są łatwiejsze do przejrzenia niż rozsypane ify w pętli agenta. Nie wiem jednak, jak to się skaluje przy kilkudziesięciu regułach, i to bym sprawdził przed wdrożeniem.

**Link:** [mozaik-rule-engine na GitHubie](https://daily.dev/posts/smMoefadv)

## Mini.nvim przenosi się na Tangled

**TLDR:** Biblioteka ponad 45 niezależnych modułów Lua dla Neovima trafiła do organizacji nvim-mini i ma lustra na Tangled i Codeberg.

**Summary:** Każdy moduł działa osobno i nie dodaje czasu startu. Biblioteka obejmuje edycję tekstu, workflow i wygląd, a wymaga Neovima 0.10 lub nowszego. Instaluje się przez vim.pack na Neovimie 0.12 i wyżej, przez git clone albo lazy.nvim. W zestawie są też gotowe schematy kolorów, między innymi minischeme i miniblue. Projekt przeniesiono z konta autora do osobnej organizacji dla stabilności na lata.

**Key takeaways:**
- Ponad 45 modułów, każdy samodzielny.
- Nowy dom w organizacji nvim-mini, lustra na Tangled i Codeberg.
- Wymaga Neovima 0.10+.

**Why do I care:** Dla osób żyjących w edytorze to dobra wiadomość o ciągłości projektu. Przeniesienie do organizacji to ważniejszy sygnał niż sam hosting, bo zmniejsza ryzyko, że biblioteka umrze razem z jednym kontem.

**Link:** [Mini.nvim Is Now on Tangled](https://daily.dev/posts/lO0mxpAYM)
