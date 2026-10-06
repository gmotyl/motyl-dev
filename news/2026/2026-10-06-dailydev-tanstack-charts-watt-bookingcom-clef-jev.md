---
title: "TanStack Charts, Watt zamiast pm2 u Booking.com i pojedynek dwóch szybkich klasyfikatorów AI"
excerpt: "Jak Booking.com zbił koszty Node.js o 38% dzięki Watt, czym jest nowa biblioteka wykresów TanStack, oraz test pokazujący, że tańszy klasyfikator Jev wciąż bije darmowy model Cloudflare."
publishedAt: "2026-10-06"
slug: "dailydev-tanstack-charts-watt-bookingcom-clef-jev"
hashtags: "#dailydev #react #typescript #nodejs #performance #css #ai #architecture #generated #pl"
source_pattern: "daily.dev"
---

## TanStack Charts dochodzi do wersji 1.0

**TLDR:** Tanner Linsley wypuścił stabilną wersję biblioteki wykresów TanStack Charts, zbudowanej wokół składanych "marks" (linie, słupki, punkty) zamiast gotowych typów wykresów. Biblioteka renderuje domyślnie do SVG, ma opcjonalny renderer Canvas i pełne typowanie TypeScript od początku do końca.

**Summary:** Zamiast wybierać z listy gotowych typów wykresów, TanStack Charts każe komponować wykres z mniejszych elementów: linii, słupków, punktów, skal i osi. W praktyce oznacza to, że dodanie słupków pod istniejącą linią albo własnego tooltipa nie wymaga przeskakiwania na inny typ wykresu, tylko dołożenia kolejnego marka do tej samej kompozycji. To podejście jest wprost inspirowane Grammar of Graphics i Observable Plot, czyli koncepcjami znanymi raczej ze świata wizualizacji danych niż typowych bibliotek frontendowych.

Linsley przyznaje otwarcie, że część pracy nad 1.0 przyspieszyło wsparcie AI, co pozwoliło mu w końcu zaimplementować pomysły zbierane od lat przy okazji pracy nad Chart.js, D3 i react-charts. SVG jest domyślnym rendererem, a Canvas jest dostępny jako osobny, opcjonalny import na sytuacje, gdy dane są na tyle duże, że wydajność SVG zaczyna szwankować. Taki podział pozwala trzymać podstawowy bundle lekkim, a jednocześnie dać deweloperom wyjście awaryjne, gdy go potrzebują.

**Key takeaways:**
- Kompozycja marków zamiast gotowych typów wykresów ułatwia łączenie różnych wizualizacji w jednym komponencie.
- SVG jest domyślny, Canvas to osobny, opcjonalny import do dużych zbiorów danych.
- 1.0 to deklaracja stabilności API, nie tylko numerek wersji.

**Why do I care:** Ekosystem TanStack konsekwentnie buduje warstwę narzędzi, które współdzielą tę samą filozofię typowania i kompozycji co React Query czy Table, więc dorzucenie wykresów do tej rodziny obniża koszt poznawczy dla zespołów, które już z niej korzystają. Dla architekta to sygnał, żeby przy kolejnym wyborze biblioteki do wizualizacji danych sprawdzić, czy kompozycyjne podejście nie zaoszczędzi później przepisywania wykresu przy zmianie wymagań produktowych.

**Link:** [TanStack Charts 1.0](https://daily.dev/posts/RFRxDV6yP)

## Jak Booking.com obniżył koszty Node.js o 38%, przechodząc z pm2 na Watt

**TLDR:** Booking.com opublikował case study migracji głównego serwisu renderującego z pm2 na Platformatic Watt. Efekt: 38% niższe koszty obliczeniowe, 30% mniej podów, 20% mniej pamięci na pod i niższe opóźnienia na p75, p99 i p99.9.

**Summary:** Migracja polegała na zastąpieniu modułu klastra pm2 i jego nadzorcy opartego o IPC wątkami roboczymi Watt, gdzie każdy wątek przyjmuje połączenia bezpośrednio z jądra systemu przez SO_REUSEPORT, eliminując jeden przeskok sieciowy. Brzmi to jak drobna zmiana infrastrukturalna, ale w skali ruchu Booking.com przełożyło się na wymierne pieniądze i wyraźnie niższe opóźnienia w ogonie rozkładu.

Problem pojawił się przy okazji: SO_REUSEPORT rozdziela połączenia poprzez hashowanie adresów źródłowych i docelowych, a ponieważ tcp_tw_reuse pozwala reużywać połączenia z loopbacka, ten sam wątek regularnie dostawał powtarzający się ruch, co potrafiło obciążyć jeden wątek nawet o 40% bardziej niż pozostałe. Rozwiązaniem było przypisanie każdemu wątkowi osobnego portu i oddanie równoważenia obciążenia istniejącej już warstwie nginx, korzystając z opcji portAssignment w Watt. Test prowadzono jako produkcyjny eksperyment A/B z identyczną liczbą podów i zasobów po obu stronach, a dodatkowy zapas mocy wykorzystano do dostrojenia garbage collectora V8.

**Key takeaways:**
- SO_REUSEPORT potrafi nierówno rozdzielać ruch między wątkami przez sposób hashowania połączeń.
- Przeniesienie load balancingu z poziomu kernela na istniejący nginx rozwiązało problem bez zmiany kodu aplikacji.
- Test A/B na identycznej infrastrukturze dał twarde liczby: mniej podów, mniej pamięci, niższe opóźnienia.

**Why do I care:** To rzadki przypadek, gdzie migracja runtime'u daje tak wyraźne liczby bez dotykania kodu serwisu, a sama historia z SO_REUSEPORT jest dobrym przypomnieniem, że "kernel sam to ogarnie" nie zawsze jest prawdą przy load balancingu. Zespoły skalujące Node.js w klastrach warto, żeby najpierw zmierzyły rozkład obciążenia między wątkami, zanim uznają, że kolejne pody rozwiążą problem wydajności.

**Link:** [How Booking.com cut Node.js costs by 38% with Watt](https://daily.dev/posts/tbbNjYj52)

## Shiki kontra TanStack Highlight: synchroniczne podświetlanie składni bez hydratacji

**TLDR:** Deweloper opisuje migrację podświetlania kodu w dokumentacji z Shiki na TanStack Highlight. Zysk to synchroniczny tokenizer renderujący się już podczas SSR, bez dodatkowego kroku hydratacji, kosztem nieco mniejszej dokładności gramatyk w porównaniu do Shiki.

**Summary:** Stary setup oparty o Shiki wymagał asynchronicznej funkcji serwerowej TanStack Start, granic hydratacji, stanów ładowania i dangerouslySetInnerHTML, czyli całego zestawu obejść typowych dla narzędzi, które renderują się asynchronicznie w środowisku SSR. TanStack Highlight rozwiązuje to inaczej: tokenizer jest synchroniczny i działa już w trakcie renderowania po stronie serwera, a stylowanie opiera się na semantycznych klasach CSS zamiast customowych transformerów.

Liczby z własnego porównania TanStack są wymowne: rozgrzane podświetlanie zajęło 4.6 ms w porównaniu do 182 ms dla Shiki na 334 przypadkach testowych, a wygenerowany HTML był wyraźnie mniejszy. Shiki zachowuje jednak przewagę w dokładności gramatyk i wierności tokenizacji na poziomie zbliżonym do VS Code, więc wybór zależy od tego, czy priorytetem jest surowa wydajność SSR, czy maksymalna precyzja podświetlania w rzadkich przypadkach składniowych.

**Key takeaways:**
- Synchroniczny tokenizer eliminuje hydratację i stany ładowania przy SSR.
- Różnica wydajności jest rzędu 40-krotności na testowanym zbiorze.
- Shiki wciąż wygrywa dokładnością gramatyk tam, gdzie liczy się wierność tokenizacji.

**Why do I care:** Podświetlanie składni w dokumentacji technicznej to jeden z tych elementów, które rzadko trafiają na radar architektoniczny, dopóki strona z dokumentacją nie zaczyna się wlec przy każdym odświeżeniu. Jeśli zespół buduje własną dokumentację na TanStack Start, ten kompromis warto świadomie rozważyć zamiast kopiować domyślny setup z tutoriala.

**Link:** [Moving from Shiki to TanStack Highlight](https://daily.dev/posts/NSfe1f43b)

## CSS @starting-style: animacje wejścia bez JavaScriptu

**TLDR:** Reguła @starting-style pozwala zdefiniować stan początkowy elementu, zanim stanie się widoczny, umożliwiając płynne animacje wejścia, włącznie z przejściem z display: none do widocznego, na przykład dla elementu dialog.

**Summary:** Mechanizm można zagnieździć wewnątrz zestawu reguł albo zadeklarować osobno, ale nie zadziała zagnieżdżony wewnątrz pseudoelementów takich jak ::before czy ::after. Ponieważ @starting-style i oryginalna reguła mają tę samą specyficzność, blok @starting-style musi znaleźć się po oryginalnej regule w kodzie, inaczej po prostu nie zadziała, co jest typową pułapką przy pierwszym kontakcie z tą funkcją.

Animacje wyjścia są celowo poza zakresem tej reguły i wymagają transition-behavior, więc @starting-style rozwiązuje tylko połowę klasycznego problemu z animowaniem pojawiania się i znikania elementów w czystym CSS, bez pomocniczych bibliotek JavaScript.

**Key takeaways:**
- @starting-style definiuje stan przed pojawieniem się elementu, włącznie z przejściem z display: none.
- Kolejność reguł w kodzie ma znaczenie, bo specyficzność jest identyczna z regułą bazową.
- Animacje wyjścia wymagają osobno transition-behavior, to nie jest ta sama funkcja.

**Why do I care:** To kolejny element układanki, która powoli zabiera JavaScriptowi monopol na interakcje, jakie wcześniej wymagały bibliotek typu Framer Motion do najprostszych przypadków typu modal czy toast. Warto już teraz testować to w projektach, które i tak celują w nowsze przeglądarki, zamiast czekać, aż stanie się to oczywistym standardem.

**Link:** [Entry Animations with CSS @starting-style](https://daily.dev/posts/0tB7kUt9n)

## Cloudflare Clef kontra Jev: czy darmowy klasyfikator bije płatny, ale tańszy model

**TLDR:** Test porównawczy 200 prawdziwych komentarzy z YouTube z Claude Opus 5.5 jako sędzią pokazał, że Jev od TypeSafe AI osiąga 86% zgodności wobec 83% dla nowego modelu Cloudflare Clef, będąc przy tym szybszym i około 6,5 razy tańszym za komentarz, mimo że Clef działa za darmo w ramach dziennego limitu neuronów Cloudflare.

**Summary:** Oba modele to klasyfikatory typu "system one", używane do zadań takich jak wykrywanie spamu, ocena toksyczności czy analiza tonu wypowiedzi, czyli dokładnie ten segment, gdzie liczy się szybkość i koszt bardziej niż głębia rozumowania. Clef wygrał na 3 z 5 mierzonych metryk, ale wyraźnie zawodził przy wykrywaniu tonu wypowiedzi, często domyślnie klasyfikując komentarze jako "neutralne" zamiast rozpoznać faktyczny sentyment.

Dodatkowym testem była analiza obrazów na miniaturkach z YouTube, unikalna zdolność Clefa, której Jev nie oferuje. Wyniki okazały się tu niejednoznaczne, bez wyraźnej przewagi predykcyjnej względem samej wydajności wideo. To ciekawe zestawienie, bo pokazuje, że "darmowe w ramach limitu" nie zawsze oznacza lepszy rachunek ekonomiczny, jeśli liczyć realny koszt czasu inżynierskiego na dostrajanie gorszego modelu.

**Key takeaways:**
- Jev wygrał dokładnością, szybkością i kosztem mimo braku darmowego limitu jak u Clefa.
- Clef systematycznie zaniżał wykrywanie tonu wypowiedzi, często defaultując do "neutralny".
- Unikalna analiza obrazu w Clef dała mieszane rezultaty jako predyktor popularności wideo.

**Why do I care:** Klasyfikatory bez generowania tekstu, takie jak Jev, zaczynają wypierać pełne LLM-y z miejsc, gdzie liczy się przede wszystkim opóźnienie i koszt za request, a nie jakość prozy. Dla architektów budujących pipeline moderacji treści albo routing wiadomości to sygnał, żeby sprawdzić ten segment modeli, zanim automatycznie sięgnie się po kolejne wywołanie pełnego LLM-a tam, gdzie wystarczy klasyfikacja.

**Link:** [Cloudflare Just Challenged Jev, So I Tested Their New Model (Clef)](https://daily.dev/posts/It1i2iHgR)