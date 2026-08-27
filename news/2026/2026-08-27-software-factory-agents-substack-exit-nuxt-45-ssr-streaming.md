---
title: "Fabryka oprogramowania z agentami, ucieczka z Substacka i Nuxt 4.5 ze streamingiem SSR"
excerpt: "Trzy historie o tym, jak zmienia się warsztat: równoległe agenty kodujące, powrót do własnej strony i nowe możliwości renderowania w Nuxt."
publishedAt: "2026-08-26"
slug: "software-factory-agents-substack-exit-nuxt-45-ssr-streaming"
hashtags: "#dailydev #agents #typescript #nuxt #vite #ssr #architecture #webdev #generated #pl"
source_pattern: "daily.dev"
---

## Anatomia fabryki oprogramowania: jak baro uruchamia równoległe agenty kodujące na Mozaiku

**TLDR:** Autor opisuje narzędzie wiersza poleceń o nazwie baro, zbudowane na runtime TypeScript o nazwie Mozaik, w którym planista, wykonawca, krytyk i bramkarz działają równolegle na wspólnej magistrali zdarzeń zamiast w sztywnej pętli orkiestracji. Najciekawsze są nie obietnice, tylko liczby: czterdzieści pięć procent czasu na zadanie idzie na dowodzenie poprawności, a nie na pisanie kodu.

**Summary:** Zacznijmy od tego, co odróżnia ten tekst od dziesiątek podobnych. Większość opisów systemów wieloagentowych kończy się na diagramie ze strzałkami i zdaniem, że agenty współpracują. Tutaj autor pokazuje sześć mechanizmów, z których każdy powstał po konkretnej, zmierzonej porażce. To zupełnie inny gatunek pisania o architekturze, bo mechanizm bez opisu awarii, która go wymusiła, jest tylko dekoracją.

Sercem systemu jest rynek pracy z dzierżawami. Zamiast przydzielać zadania odgórnie, agenty biorą je z kolejki na określony czas, a jeśli nie zdążą albo umrą, dzierżawa wygasa i zadanie wraca do puli. To wzorzec znany z systemów rozproszonych, przeniesiony na poziom pojedynczego procesu deweloperskiego. Do tego dochodzą samoogłaszające się granice egzekwowania reguł, czyli mechanizm, w którym komponent sam deklaruje, jakich zasad pilnuje, zamiast polegać na centralnym rejestrze, który zawsze się rozjeżdża z rzeczywistością.

Najbardziej techniczny fragment dotyczy natywnego, wewnątrzprocesowego pasa inferencji. Chodzi o to, żeby model mógł dostawać aktualizacje reguł na żywo i żeby dało się udowodnić stan spoczynku systemu, czyli moment, w którym nic już się nie dzieje i można bezpiecznie przejść dalej. Ktokolwiek próbował zbudować pętlę agentową, wie, że rozpoznanie momentu zakończenia jest trudniejsze niż samo generowanie kodu. Łańcuch niezależnych bramek weryfikacyjnych zamyka całość, bo każda z nich sprawdza coś innego i żadna nie ufa poprzedniej.

Teraz liczby, bo one mówią najwięcej. Czas realizacji zadania spadł z około dwudziestu pięciu minut do poniżej czterech. Brzmi świetnie, dopóki nie doczytamy, że czterdzieści pięć procent czasu system spędza na dowodzeniu, a nie na pisaniu. I dopóki nie dojdziemy do przebiegu, który kosztował sześć dolarów, trwał sto osiemnaście minut i nie scalił ani jednego commita, bo popsuł się cache npm. Ta jedna anegdota jest warta więcej niż cała reszta metryk, bo pokazuje kruchość całej konstrukcji.

Czego autor unika? Pytania o to, czy porównanie dwudziestu pięciu minut do czterech mierzy tę samą rzecz. Jeśli po drodze zmieniła się definicja ukończonego zadania albo zakres tego, co bramki akceptują, to przyspieszenie może być artefaktem pomiaru. Brakuje też odpowiedzi, ile z tych czterdziestu pięciu procent czasu na dowodzenie to realna wartość, a ile podatek od nieufności wobec generatora. Tekst kończy się promocją hackathonu wokół Mozaika, co warto mieć z tyłu głowy przy czytaniu metryk.

**Key takeaways:**
- Architektura oparta na wspólnej magistrali zdarzeń i rynku zadań z dzierżawami zamiast sztywnej pętli orkiestracji
- Prawie połowa czasu pracy systemu idzie na weryfikację, a nie na generowanie kodu
- Przebieg za sześć dolarów bez ani jednego scalonego commita pokazuje, jak kruche są takie pipeline'y
- Mechanizmy opisane po konkretnych awariach są wiarygodniejsze niż mechanizmy opisane po diagramie

**Why do I care:** Jeśli budujesz cokolwiek z agentami w firmie, ten tekst daje ci gotową listę pytań do zadania własnemu zespołowi. Nie „czy agenty działają", tylko „ile kosztuje nas dowodzenie, że działają" i „co się dzieje, gdy padnie infrastruktura pod spodem". Z perspektywy architekta najważniejszy jest tu wzorzec dzierżaw, bo to jedyny znany mi sposób, żeby równoległe agenty nie deptały sobie po palcach bez centralnego koordynatora, który staje się wąskim gardłem. Reszta to inspiracja, nie przepis.

**Link:** [Anatomy of a Software Factory: How baro Runs Concurrent Coding Agents on Mozaik](https://daily.dev/posts/RsJnqeevD)

## Wyprowadzka z Substacka i LinkedIna

**TLDR:** Bloger piszący o Pythonie przenosi się na własny hosting i wycofuje z publikowania na LinkedInie, Substack Notes, Reddicie, Lobsters i Hacker News. Powód: słabe zaangażowanie i moderacja, która jego zdaniem uderza w małych twórców. Newsletter i RSS zostają na Substacku.

**Summary:** To jest tekst o czymś większym niż jedna przeprowadzka. Autor zostawia platformy dystrybucji, ale zostawia sobie kanały, które sam kontroluje, czyli RSS i mailing. Rozróżnienie jest istotne. Nie chodzi o odejście od internetu, tylko o odzyskanie kontroli nad tym, co się wyświetla czytelnikowi i w jakiej kolejności.

Nowa strona ma być pozbawiona JavaScriptu, śledzenia i ścianek zachęcających do subskrypcji. Do tego poprawiona typografia kodu, co dla bloga technicznego jest mniej trywialne, niż brzmi. Zła typografia listingów potrafi zabić czytelność tekstu, który poza tym jest dobry. Najciekawszy plan to wykonywalne fragmenty Pythona przez Pyodide, czyli uruchamianie interpretera skompilowanego do WebAssembly bezpośrednio w przeglądarce. Ironia jest oczywista: strona bez JavaScriptu, która ma uruchamiać Pythona w przeglądarce. Autor będzie musiał ten kompromis jakoś rozegrać, prawdopodobnie ładując Pyodide tylko na żądanie.

Argument o moderacji stronniczej wobec małych twórców podaję dalej z zastrzeżeniem, bo w tekście nie ma na to twardych danych. Za to argument o słabym zaangażowaniu jest łatwo weryfikowalny i pokrywa się z tym, co obserwuję sam. Platformy zmieniły algorytmy tak, że treść z linkiem na zewnątrz dostaje wyraźnie mniejszy zasięg. Publikowanie tam długich tekstów technicznych przestało się opłacać, bo koszt czasowy jest wysoki, a zwrot spadł.

Autor rozważa też rozszerzenie na YouTube i TikToka, co jest zabawnym zwrotem akcji w tekście o odzyskiwaniu niezależności. Wychodzi z platform, żeby wejść na inne platformy, tylko z większym zasięgiem. Nie mówię, że to zła decyzja, ale spójność narracji tu pęka. Prawdziwa niezależność to strona i mailing, reszta to kanały akwizycji.

**Key takeaways:**
- Własna strona plus RSS i newsletter to jedyne kanały, których nikt ci nie odbierze algorytmem
- Rezygnacja z JavaScriptu i śledzenia to decyzja produktowa, nie tylko techniczna
- Pyodide pozwala uruchamiać Pythona w przeglądarce, ale kosztuje sporo pobranych bajtów
- Wyjście z platform i jednoczesne wejście na YouTube i TikToka to sprzeczność, którą warto sobie nazwać

**Why do I care:** Jako ktoś, kto pisze technicznie i doradza zespołom, widzę tu wzorzec do skopiowania w firmie. Blog inżynierski na własnej domenie, z RSS-em i mailingiem, buduje aktywo, którego nie skasuje zmiana algorytmu. Warto też zauważyć decyzję o braku JavaScriptu, bo to najprostszy sposób na stronę, która ładuje się natychmiast i działa wszędzie. Większość korporacyjnych blogów technicznych waży kilka megabajtów, żeby pokazać dwa tysiące słów tekstu, i to jest kompromitacja, biorąc pod uwagę, kto je pisze.

**Link:** [Moving out of Substack and Linkedin](https://daily.dev/posts/uIfzQMWh7)

## Nuxt 4.5: eksperymentalny streaming SSR, Vite 8 i builder oparty na Rspacku

**TLDR:** Nuxt 4.5 przechodzi na Vite 8, dodaje nowy builder oparty na Rsbuildzie i Rspacku 2, wprowadza eksperymentalny streaming SSR oraz stabilny system kodów błędów. Nuxt 3 kończy życie trzydziestego pierwszego lipca dwa tysiące dwudziestego szóstego roku.

**Summary:** Największa zmiana architektoniczna dotyczy warstwy budowania. Nuxt daje teraz wybór między Vite 8 a nowym builderem opartym na Rsbuildzie, który pod spodem używa Rspacka 2. To ta sama strategia, którą widzieliśmy w innych metaframeworkach: nie stawiamy wszystkiego na jeden bundler, tylko trzymamy warstwę abstrakcji i pozwalamy zespołom wybrać. Dla dużych projektów, w których Vite ma problemy z czasem zimnego startu, opcja Rspacka może realnie zmienić komfort pracy.

Streaming SSR to funkcja, na którą czekało sporo osób. Włącza się ją flagą eksperymentalną w konfiguracji i polega na tym, że serwer natychmiast wypycha szkielet HTML-a, a resztę dosyła w miarę renderowania przez Vue. Efekt to lepszy Time to First Byte, czyli szybszy pierwszy bajt odpowiedzi. Nuxt zachował się tu rozsądnie i wyłączył streaming dla botów oraz crawlerów, bo streamowany HTML bywa dla nich problematyczny. Trasy używające przekierowań, cache'owania, ISR albo SWR wracają do renderowania buforowanego, co jest logiczne, bo trudno cache'ować coś, co dopiero płynie.

Stabilny system kodów błędów w stylu NUXT_E1001 to zmiana pozornie nudna, a w praktyce jedna z najbardziej praktycznych w tym wydaniu. Kod błędu, który się nie zmienia między wersjami, można wygooglować, można na nim oprzeć alert w monitoringu i można go wpisać do dokumentacji wewnętrznej. Komunikaty tekstowe zmieniają się co release i wszystko oparte na nich się psuje. Do tego dochodzi nowe useLayout, nazwane widoki pozwalające na wiele wyjść NuxtPage oraz reaktywna opcja enabled w useFetch i useAsyncData, która wreszcie pozwala warunkowo włączać zapytania bez kombinowania.

Przy aktualizacji jest jedna pułapka. Trzeba uruchomić nuxt upgrade z flagą dedupe, bo Nuxt 4.5 podbija unhead do wersji trzeciej i unctx do wersji trzeciej. Unhead v3 wprowadza zawężanie typów w useHead, co formalnie jest zmianą łamiącą i potrafi wysypać kompilację w projektach, które przekazywały tam luźno typowane obiekty. Jeśli macie własne pluginy Vite, przewodnik migracji Vite też trzeba przeczytać.

Data końca wsparcia Nuxta 3 jest już blisko. Trzydziesty pierwszy lipca dwa tysiące dwudziestego szóstego to mniej niż rok. Zespoły, które jeszcze nie zaczęły migracji, powinny wpisać to do planu na następny kwartał, bo migracje frameworków nigdy nie idą tak gładko, jak obiecuje changelog.

**Key takeaways:**
- Wybór między Vite 8 a builderem opartym na Rspacku 2 przez Rsbuild
- Eksperymentalny streaming SSR poprawia Time to First Byte, ale wyłącza się dla botów i tras z cache'owaniem
- Stabilne kody błędów w formacie NUXT_E1001 nadają się do monitoringu i dokumentacji
- Aktualizacja wymaga dedupe, a unhead v3 może złamać typy w useHead
- Nuxt 3 kończy życie trzydziestego pierwszego lipca dwa tysiące dwudziestego szóstego

**Why do I care:** Streaming SSR i wybór bundlera to rzeczy, które bezpośrednio wpływają na to, ile czekasz przy każdym zapisie pliku i ile czeka twój użytkownik na pierwszy piksel. Ale najbardziej podoba mi się tu system kodów błędów, bo to sygnał dojrzałości frameworka. Kiedy zespół narzędzia zaczyna myśleć o tym, że ktoś będzie te błędy monitorował w produkcji, znaczy że przestali projektować dla dema, a zaczęli dla utrzymania. Jeśli jesteś na Nuxcie 3, potraktuj datę końca wsparcia jako termin, nie sugestię.

**Link:** [Nuxt 4.5: Experimental SSR Streaming, Vite 8 and an Rsbuild-Powered Rspack Builder](https://daily.dev/posts/qNnzApzfF)
