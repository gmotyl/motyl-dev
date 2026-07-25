---
title: "Statyczna analiza TypeScript, spory o open source AI i malware w SVG-kach: przegląd Bytes #506"
excerpt: "Przegląd siódmego wydania Bytes: od statycznych dowodów na poprawność layoutu w TypeScript, przez debatę o otwartych modelach AI i halucynacje nazw pakietów, po nowy sposób DPRK na ukrywanie malware w plikach SVG."
publishedAt: "2026-07-25"
slug: "typescript-freerange-pretext-ai-security-recap-506"
hashtags: "#uidev #typescript #github #security #ai #generated #pl"
---

## Freerange: statyczne dowody na to, że twój layout się nie wysypie

**TLDR:** Freerange to narzędzie od Chenglou, twórcy dawnego Reason/ReasonML, które analizuje statycznie kod TypeScript i wyłapuje potencjalne dzielenia przez zero, NaN, Infinity oraz wyjścia poza zakres tablicy, zanim jeszcze cokolwiek uruchomimy w przeglądarce. Działa w oparciu o oficjalne API TypeScript, bez adnotacji, bez nowego języka i bez narzutu czasowego porównywalnego do samego tsc. Projekt jest wprost zaprojektowany z myślą o kodzie pisanym przez agentów AI.

**Podsumowanie:** Pomysł jest prosty, choć rzadko realizowany w praktyce: Freerange śledzi zakres wartości liczbowych przepływających przez funkcje w tym samym pliku i wykrywa sytuacje, w których na przykład dzielenie może dać w wyniku zero jako dzielnik, mimo że sam TypeScript widzi tylko typ number i nic więcej. W dokumentacji projektu jest przykład z siatką elementów UI, gdzie funkcja licząca liczbę kolumn dla kontenera o szerokości 200 pikseli i komórkach 240-pikselowych zwraca zero, a kolejna funkcja dzieli przez ten wynik. TypeScript przepuści taki kod bez mrugnięcia okiem, Freerange zgłosi błąd już na etapie budowania.

Ciekawszym elementem jest statyczna analiza console.assert. Zamiast być tylko narzędziem do debugowania w runtime, asercje umieszczone na początku funkcji stają się wymaganiami wobec wywołujących, a te umieszczone dalej są dowodzone statycznie albo zgłaszane jako błąd kompilacji. To znaczy, że można pisać rzeczy typu "ten element nie może nachodzić na tamten" albo "lista widocznych elementów nigdy nie przekroczy limitu wirtualizacji" i mieć to zweryfikowane bez odpalania przeglądarki.

Autor jest szczery co do ograniczeń: Freerange celowo obsługuje wąski podzbiór TypeScript, głównie synchroniczne funkcje najwyższego poziomu operujące na liczbach, obiektach, tablicach i taggowanych unionach, bez any, castów i komentarzy wyłączających sprawdzanie typów. Zamiast rozszerzać zakres analizy o coraz to bardziej egzotyczne konstrukcje językowe, twórcy proponują coś odwrotnego: niech agenty AI refaktoryzują kod do postaci, którą Freerange umie udowodnić, korzystając z komendy `fr --audit`, która pokazuje wymagania i gwarancje każdej funkcji.

To podejście jest w duchu podobnym do narzędzi typu Infer od Facebooka, tylko przycięte specyficznie pod obliczenia layoutu w UI, czyli dokładnie ten rodzaj kodu, który najczęściej psuje się po cichu, bez wyjątku, po prostu renderując coś krzywo.

**Kluczowe wnioski:**
- Freerange analizuje zakresy liczbowe statycznie, w czasie kompilacji, bez uruchamiania aplikacji
- Statyczne `console.assert` pozwala definiować wymagania funkcji i mieć je dowiedzione albo zgłoszone jako błąd
- Narzędzie celowo obsługuje ograniczony, przewidywalny podzbiór TypeScript i oczekuje, że agenty AI dostosują kod do tego podzbioru

**Dlaczego mnie to obchodzi:** Przez lata powtarzałem zespołom, że bugi w layoutcie to najgorszy typ błędu, bo nie wyrzuca wyjątku, po prostu coś wygląda źle na jednym z dziesięciu ekranów i nikt tego nie zauważy do produkcji. Freerange nie rozwiąże wszystkiego, ale pomysł, żeby przenieść tę klasę błędów z runtime do buildu, jest dokładnie tym kierunkiem, w którym powinniśmy iść, zwłaszcza teraz, gdy coraz więcej kodu UI piszą agenty, a nie ludzie z intuicją co do edge case'ów.

**Link:** [GitHub - chenglou/freerange: Static @fit checks for ordinary TypeScript layout code](https://github.com/chenglou/freerange)

## Pretext: mierzenie tekstu bez dotykania DOM-u

**TLDR:** Pretext to biblioteka od tego samego autora co Freerange, która mierzy wielolinijkowy tekst i liczy jego layout bez odwoływania się do DOM-owych operacji typu getBoundingClientRect czy offsetHeight. Wykorzystuje silnik fontów przeglądarki jako źródło prawdy, ale samą kalkulację robi w czystej arytmetyce, co czyni ją znacznie szybszą niż wymuszanie reflow.

**Podsumowanie:** Każdy, kto kiedykolwiek próbował policzyć wysokość akapitu przed jego wyrenderowaniem, wie, jak bolesne jest odwoływanie się do DOM-u w tym celu. offsetHeight i getBoundingClientRect wymuszają reflow, czyli jedną z najdroższych operacji w przeglądarce, a przy wirtualizowanych listach czy masonry layoutach robi się to setki razy na sekundę. Pretext rozwiązuje to inaczej: raz mierzy segmenty tekstu na canvasie w funkcji prepare(), a potem cała reszta, czyli funkcja layout(), to już tylko arytmetyka na zapamiętanych szerokościach. Przy resize wystarczy przeliczyć layout(), bez ponownego mierzenia tekstu.

Biblioteka ma dwa tryby pracy. Pierwszy to szybka ścieżka zwracająca po prostu wysokość i liczbę linii, przydatna do wirtualizacji list czy sprawdzania w czasie developmentu, czy etykieta na przycisku się nie zawinie. Drugi, bardziej rozbudowany, pozwala samodzielnie układać linie tekstu, na przykład żeby oblewać nimi pływający obrazek, zmieniając szerokość kolumny w zależności od pozycji w pionie. Jest też osobny moduł do inline rich-text, obsługujący rzeczy typu wzmianki czy chipsy z niestandardową szerokością.

Autor wprost przyznaje, że nie jest to pełny silnik renderujący fonty i ma ograniczenia, na przykład font systemowy system-ui bywa niedokładny na macOS. Ale zakres, który pokrywa, czyli normalne zawijanie tekstu, łamanie CJK w trybie keep-all, dzielenie wyrazów miękkim myślnikiem, obejmuje zdecydowaną większość realnych przypadków w interfejsach webowych.

Ciekawostka historyczna: w credits projekt odwołuje się do pracy Sebastiana Markbage'a nad text-layout sprzed dekady, łącząc pomysł mierzenia canvasem z obsługą bidi zapożyczoną z pdf.js. To pokazuje, że problem mierzenia tekstu bez DOM-u nie jest nowy, po prostu wcześniej nikt nie doprowadził go do końca w formie gotowej biblioteki.

**Kluczowe wnioski:**
- Pretext liczy wysokość i układ tekstu bez wymuszania reflow w przeglądarce
- Rozdziela drogi, kosztowny krok pomiaru (prepare) od taniej, czystej arytmetyki (layout)
- Wspiera dwustronne obsługiwanie linii tekstu, w tym oblewanie pływających elementów i rich-text inline

**Dlaczego mnie to obchodzi:** Ile razy widziałem w kodzie hacki w stylu "zmierz element w ukrytym divie, potem go usuń", żeby dowiedzieć się, ile miejsca zajmie tekst? Dziesiątki. Pretext atakuje realny, powtarzający się problem wydajnościowy, a nie wymyśloną niszę, i robi to bez magii frameworkowej, samym canvas measureText plus rozsądną architekturą. To jest dokładnie ten rodzaj biblioteki, którą chętnie wrzucę do projektu z listami wirtualizowanymi czy edytorami tekstu, bo oszczędza realne milisekundy tam, gdzie boli najbardziej.

**Link:** [GitHub - chenglou/pretext: Fast, accurate & comprehensive text measurement & layout](https://github.com/chenglou/pretext)

## Argumenty przeciwko otwartym modelom AI są bardzo słabe

**TLDR:** Autor bloga rozprawia się z falą krytyki wobec otwartych modeli AI, która pojawiła się po wydaniu Kimi K3, argumentując, że strach przed "AI komunizmem" czy chińskim dumpingiem nie wytrzymuje konfrontacji z historią oprogramowania open source. Jego zdaniem otwarte modele są nie do zatrzymania z tych samych powodów, dla których nie dało się zatrzymać eksportu szyfrowania w latach dziewięćdziesiątych.

**Podsumowanie:** Punktem wyjścia jest wypowiedź Deana Balla z OpenAI, sugerująca, że świat zdominowany przez otwarte wagi modeli prowadzi do "pełnego AI komunizmu", bo model przestaje być produktem rynkowym, a staje się dobrem publicznym. Autor odpowiada na to przypomnieniem oczywistego faktu, że całe komercyjne oprogramowanie, łącznie z modelami frontier, stoi na fundamencie open source. Firmy od dawna kooperują na niższych warstwach stosu technologicznego i konkurują na wyższych, więc argument, że akurat modele językowe muszą być inne, jest wygodny dla laboratoriów, które chcą pozostać "toll collectorami", ale niekoniecznie prawdziwy.

Najmocniejszy fragment tekstu to analogia historyczna z eksportem szyfrowania. Gdy Phil Zimmermann stworzył PGP w 1991 roku, rząd USA traktował kryptografię jak technologię wojskową i wszczął przeciwko niemu śledztwo. Netscape mogło eksportować tylko osłabioną wersję SSL, co skończyło się tym, że nawet Amerykanie ściągali wersję "międzynarodową", bo była łatwiej dostępna. Kontrole eksportowe nie ograniczyły niczego poza konkurencyjnością własnych firm, aż w końcu sądy uznały publikację kodu szyfrującego za chronioną wolność słowa. Autor twierdzi, że próby ograniczenia chińskich modeli AI skończą się identycznie: definicja "chińskości" modelu jest rozmyta, a regulacje tylko utrudnią życie amerykańskim deweloperom.

Autor rozprawia się też punkt po punkcie z popularnymi strachami: że Chiny robią "AI dumping" jak wcześniej z panelami słonecznymi (ale oprogramowanie nie ma fizycznego łańcucha dostaw, więc analogia nie działa), że otwarte modele będą propagandą (ale każdy może dotrenować własną, "zamerykanizowaną" wersję) oraz że będą zawierać backdoory (ale otwarty kod jest łatwiejszy do audytu niż zamknięty, więc to argument za, nie przeciw otwartości). Wspomina też, że motywacja do budowania otwartych modeli nie ogranicza się do Chin: producenci chipów jak Nvidia chcą po prostu maksymalizować liczbę przetwarzanych tokenów niezależnie od tego, czyj to model, a amerykańskie startupy stawiają na komodyzację samych modeli i budowanie fosy wokół usług dodatkowych.

**Kluczowe wnioski:**
- Cały komercyjny software, w tym modele frontier, jest zbudowany na fundamencie open source
- Historia eksportu szyfrowania pokazuje, że próby ograniczenia otwartego oprogramowania zwykle szkodzą głównie krajowi, który je wprowadza
- Argumenty o "dumpingu", propagandzie i backdoorach w chińskich modelach nie wytrzymują konfrontacji z tym, jak faktycznie działa rynek oprogramowania

**Dlaczego mnie to obchodzi:** Jako ktoś, kto codziennie korzysta i z modeli zamkniętych, i z otwartych, mam wrażenie, że debata "otwarte kontra zamknięte AI" jest w dużej mierze zastępczą wojną interesów, a nie realną troską o bezpieczeństwo. Argument autora o backdoorach trafia w sedno: to właśnie zamknięty kod jest tym, w którym trudniej znaleźć złośliwe zachowanie, nie łatwiej. Jeśli mam wybierać, wolę móc zajrzeć pod maskę modelu, którego używam w produkcji, niż ufać marketingowi laboratorium, które sprzedaje mi dostęp przez API.

**Link:** [The Arguments Against Open Source AI are Very Bad](https://tombedor.dev/arguments-against-open-source-ai-are-very-bad/)

## 53 nazwy pakietów, które halucynują wszystkie frontier modele naraz

**TLDR:** Nowe badanie na blisko 200 tysiącach odpowiedzi generowanych przez pięć czołowych modeli LLM znalazło 53 nazwy pakietów, które nie istnieją ani na PyPI, ani na npm, a które każdy z badanych modeli wymyślił niezależnie. To realne cele do tak zwanego slopsquattingu, czyli rejestrowania złośliwego pakietu pod nazwą, którą model AI regularnie podsuwa deweloperom.

**Podsumowanie:** Badacz Aleksandr Churilov powtórzył metodologię pracy prezentowanej na USENIX Security 2025, tym razem testując pięć nowszych modeli: Claude Sonnet 4.6, Claude Haiku 4.5, GPT-5.4-mini, Gemini 2.5 Pro i DeepSeek V3.2. Wskaźniki halucynacji pakietów wahały się od 4,62 do 6,10 procent, czyli znacznie bliżej siebie niż w poprzednim badaniu, gdzie rozstrzał między modelami komercyjnymi a open source sięgał kilkunastu punktów procentowych. Żaden z nowych modeli nie pobił jednak najlepszego wyniku z poprzedniej edycji badania.

Najciekawszy wynik to nie same wskaźniki, tylko przecięcie zbiorów: 127 nazw pakietów pojawiło się w wynikach wszystkich pięciu modeli jednocześnie. Po weryfikacji przez zespoły PyPI Security i Socket okazało się, że 53 z nich, 41 na PyPI i 12 na npm, wciąż są wolne do zarejestrowania. To oznacza, że jedna rejestracja złośliwego pakietu potencjalnie trafia w użytkowników modeli od Anthropic, OpenAI, Google i DeepSeek naraz, bo wszystkie te modele podsuwają tę samą, nieistniejącą nazwę.

Warto docenić rzetelność metodologiczną: zespół Socket ręcznie zweryfikował kandydatów z npm i odkrył, że cztery z najczęściej halucynowanych nazw to w rzeczywistości poprawne importy z ekosystemu Ember.js, które rozwiązują się przez pakiet ember-source, a nie istnieją jako samodzielne pakiety npm. To pokazuje ograniczenie samej metody ekstrakcji: sam brak wpisu w rejestrze nie zawsze oznacza halucynację, bo frameworki potrafią udostępniać wirtualne moduły i aliasy. Po odjęciu takich fałszywych trafień zostało 12 rzeczywiście pustych nazw na npm, w tym css-color-stop, dns-sd i dom-ains.

Badanie ma swoje ograniczenia: testowano pojedynczą odpowiedź na prompt, a nie pełne workflow agentów kodujących, które często weryfikują pakiety przed instalacją. Mimo to wniosek końcowy jest jasny: deweloperzy powinni traktować każdą zależność zasugerowaną przez AI tak, jakby proponował ją nieznany zewnętrzny kontrybutor, dopóki nie zweryfikują nazwy, wydawcy i historii pakietu.

**Kluczowe wnioski:**
- Wszystkie pięć testowanych modeli (Claude, GPT, Gemini, DeepSeek) niezależnie wygenerowało te same 53 nieistniejące nazwy pakietów
- Wskaźniki halucynacji pakietów zbliżyły się między modelami, ale żaden ich nie wyeliminował, wciąż mieszczą się w przedziale 4,6 do 6,1 procent
- Sam brak nazwy w rejestrze nie dowodzi halucynacji, bo frameworki jak Ember udostępniają moduły wirtualne bez odpowiadającego im pakietu npm

**Dlaczego mnie to obchodzi:** Slopsquatting to dla mnie jeden z tych zagrożeń, które są kompletnie oczywiste z perspektywy bezpieczeństwa, a mimo to wciąż zaskakują zespoły, które ślepo kopiują sugestie z asystenta AI do package.json. To, że pięć różnych modeli od pięciu różnych firm zgadza się co do tej samej, fałszywej nazwy pakietu, to gotowy przepis na atak o zasięgu wielu ekosystemów naraz. W praktyce oznacza to jedno: code review przed merge musi obejmować także nowe zależności, nie tylko logikę biznesową, a lockfile to za mało, jeśli nikt nie sprawdził, kto w ogóle opublikował dany pakiet.

**Link:** [New Study Identifies 53 Slopsquatting Targets Across 5 Frontier LLMs](https://socket.dev/blog/slopsquatting-targets-across-frontier-llms)

## Angular przechodzi na roczny cykl wydań

**TLDR:** Zespół Angulara zaktualizował dokumentację, dodając daty wydań v22.x i v23 oraz ogłaszając zmianę cyklu wydawniczego z dotychczasowego na roczny. Decyzja to odpowiedź na wieloletnie prośby społeczności o rzadsze duże wydania.

**Podsumowanie:** Pull request jest krótki, ale znaczenie zmiany jest spore dla każdego, kto utrzymuje aplikację w Angularze na dużą skalę. Częste major release'y oznaczają częste breaking changes, a te z kolei generują koszty utrzymania, zwłaszcza w środowiskach enterprise, gdzie proces aktualizacji zależności bywa żmudny i wymaga akceptacji wielu zespołów. Roczny cykl ma dać deweloperom więcej czasu na spokojną migrację, zamiast gonienia za kolejnym wydaniem co pół roku.

W uzasadnieniu PR pojawia się też argument, który jeszcze kilka lat temu byłby nie na miejscu w dokumentacji frameworka: dłuższy cykl wydań ma zapewnić większą stabilność API dla deweloperów pracujących w trybie agentowym. To subtelna, ale wymowna zmiana w sposobie myślenia zespołów maintainerów, dłuższa stabilność API zaczyna być traktowana jako wymóg nie tylko dla ludzi, ale i dla agentów AI, które muszą operować na przewidywalnym, niezmieniającym się kontrakcie.

Sam PR to tylko dokumentacja, nie zmiana kodu frameworka, więc nie niesie ze sobą ryzyka regresji technicznej. Ale jako sygnał dla planowania długoterminowego jest istotny: zespoły, które planują migracje Angulara, mogą teraz projektować roadmapy z założeniem stabilniejszego rytmu wydań, zamiast reagować na każde kolejne major w ciągu kilku miesięcy.

**Kluczowe wnioski:**
- Angular przechodzi z częstszego cyklu wydawniczego na wydania roczne, zaczynając od v23
- Społeczność od dawna zgłaszała, że częste breaking changes utrudniają utrzymanie dużych aplikacji enterprise
- Dłuższy cykl ma też zapewnić stabilniejsze API dla narzędzi i agentów pracujących w trybie autonomicznym

**Dlaczego mnie to obchodzi:** Pracowałem przy niejednym projekcie enterprise na Angularze, gdzie sama migracja o dwie wersje w górę zajmowała tygodnie, bo zespół musiał ręcznie przechodzić przez kolejne breaking changes zamiast pisać nowe funkcje. Roczny cykl to krok w dobrą stronę, choć szczerze mówiąc, uważam, że to spóźniona reakcja na to, co reszta ekosystemu, łącznie z React, dawno zauważyła: częstotliwość wydań powinna wynikać z realnej gotowości, a nie z kalendarza marketingowego frameworka.

**Link:** [docs: add v23 release and change to yearly release cycle](https://github.com/angular/angular/pull/69817)

## TSRX w TanStack Start: co się podoba i trzy zgłoszone błędy

**TLDR:** Zespół JXD przetestował TSRX, spadkobiercę JSX kompilujący się do Reacta, w połączeniu z TanStack Start i opisał, dlaczego po stronie klienta rozwiązanie im się podoba, a po stronie SSR znaleźli trzy realne problemy na styku obu narzędzi. Wszystkie trzy zgłosili jako jedno zgłoszenie do TanStack Router.

**Podsumowanie:** TSRX odchodzi od fundamentalnego ograniczenia JSX, w którym komponent musi zwracać wyrażenie, więc każdy warunek zamienia się w ternary, a każda lista w wywołanie map(). W TSRX elementy JSX są instrukcjami, a nie wyrażeniami, więc if, for, switch i try stają się prawdziwą kontrolą przepływu wewnątrz szablonu, a bloki stylów mogą siedzieć bezpośrednio przy znaczniku, który stylują. Autorzy pokazują to na przykładzie listy użytkowników z odznakami statusu: w klasycznym JSX kończy się to osobnymi obiektami mapującymi status na klasę CSS, osobnym komponentem Badge tylko po to, żeby pomieścić tę logikę, i osobnym plikiem CSS modułowym. W TSRX to wszystko mieści się w jednej funkcji, jednym pliku, z warunkami wpisanymi wprost jako @switch i stylami w bloku obok znaczników.

Co ciekawe, argumentacja za tym podejściem nie kończy się na czytelności dla ludzi. Autorzy zauważyli, że modele AI, w tym Claude Code, generują mniej przypadkowego prop-drillingu i rzadziej sięgają po prowizoryczne obiekty mapujące, gdy cała logika komponentu, jego stylowanie i kontrola przepływu znajdują się fizycznie blisko siebie w jednym pliku. To wpisuje się w szerszy trend projektowania narzędzi z myślą o tym, jak modele językowe faktycznie przetwarzają kontekst, im bliżej siebie leżą powiązane fragmenty kodu, tym mniej błędów popełnia agent edytujący ten kod.

Integracja z TanStack Start jest prosta: cztery kroki obejmujące plugin Vite, plugin TypeScript, wpis w tsconfig.json i rozszerzenie edytora do podświetlania składni. Ale prawdziwa wartość tekstu leży w części poświęconej błędom znalezionym podczas stress-testu każdej funkcji językowej TSRX na realnym pipeline SSR. Pierwszy problem to znikające style CSS w trybie deweloperskim: scoped style TSRX nie renderują się w początkowym HTML-u z SSR podczas vite dev, dopiero po hydratacji po stronie klienta, co daje efekt migotania niestylowanej treści. Produkcyjny build nie ma tego problemu, więc winne jest to, jak dev server TanStack Start rozwiązuje CSS z modułów wirtualnych.

Drugi problem to fakt, że pliki .tsrx nie mogą być plikami tras, bo file-walker TanStack Router rozpoznaje tylko ustalony zestaw rozszerzeń. Obejście jest tanie: trzymać trasy jako zwykłe .tsx i importować z nich komponenty .tsrx. Trzeci i najciekawszy problem dotyczy @try/@catch, które kompiluje się do standardowego error boundary Reacta, a error boundary działa wyłącznie po stronie klienta. Komponent, który rzuca wyjątek wewnątrz @try podczas renderowania na serwerze, wywala cały dokument, a nie tylko granicę błędu, i React przechodzi w tryb pełnego renderowania po stronie klienta dla całej strony. To nie wina TSRX, tylko standardowe zachowanie Reacta, ale warto o tym wiedzieć, zanim ktoś potraktuje @try/@catch jako siatkę bezpieczeństwa dla SSR.

**Kluczowe wnioski:**
- TSRX pozwala pisać if, for, switch i try jako prawdziwe instrukcje wewnątrz JSX zamiast obchodzić to ternary i map()
- Kolokacja struktury, stylów i logiki w jednym pliku redukuje liczbę błędów generowanych przez agentów AI edytujących kod
- Trzy zgłoszone błędy dotyczą wyłącznie styku z SSR w TanStack Start (znikające style w dev, brak obsługi .tsrx jako plików tras, @try/@catch nieaktywny podczas renderowania na serwerze), nie samego języka TSRX

**Dlaczego mnie to obchodzi:** Spędziłem sporo czasu, tłumacząc zespołom, dlaczego prosty warunek w JSX zamienia się w łańcuch ternary trudny do czytania po trzecim zagnieżdżeniu. TSRX atakuje realny problem ergonomii, nie kosmetyczny. To, co szczególnie mnie przekonuje, to argument o AI: skoro coraz więcej kodu frontendowego powstaje przy współudziale agentów, warto projektować składnię pod kątem tego, jak dobrze się ją analizuje i edytuje maszynowo, a nie tylko pod estetykę czytania przez człowieka. Trzy zgłoszone bugi na styku z SSR to akurat dokładnie to, czego oczekuję od dojrzałego zespołu testującego nowe narzędzie, zamiast cichego obchodzenia problemu, transparentne zgłoszenie upstream i jasny opis obejścia.

**Link:** [TSRX in TanStack Start: what we like, and three bugs we filed](https://www.jxd.dev/blog/tsrx-tanstack-start)

## DPRK ukrywa malware w plikach SVG, celując w deweloperów przez fałszywe rekrutacje

**TLDR:** Elastic Security Labs opisało nową kampanię grupy powiązanej z Koreą Północną, nazwaną REF9403, w ramach szerszej operacji Contagious Interview, w której złośliwy kod ukrywany jest wewnątrz plików SVG z flagami państw przy użyciu steganografii. Ofiary werbowane są fałszywymi ofertami pracy, a "zadanie rekrutacyjne" to w rzeczywistości trojanizowane repozytorium instalujące czterostopniowy payload zbliżony do malware OTTERCOOKIE.

**Podsumowanie:** Kampania zaczęła się od kogoś podającego się za "Maxwella", kto na Slacku społeczności Elastic zaoferował pracę przy platformie e-commerce, po czym przeniósł rozmowę do wiadomości prywatnych i poprosił potencjalnych kandydatów o wykonanie testu rekrutacyjnego. Repozytorium wyglądało jak w pełni działający szablon Next.js do e-commerce, skopiowany z prawdziwego, publicznego projektu GoCart. Atakujący wstrzyknęli do niego niewielkie fragmenty złośliwego kodu, ukryte pod niewinnie brzmiącymi nazwami zmiennych.

Najciekawszy technicznie element to sposób ukrycia payloadu. Zamiast trzymać złośliwy kod jawnie w JavaScripcie, atakujący podzielili go na fragmenty zakodowane w Base64 i wstawili jako komentarze HTML wewnątrz plików SVG z flagami państw w katalogu assets, plików wyglądających całkowicie normalnie dla każdego, kto by je otworzył. Osobny skrypt, uruchamiany przy każdym starcie serwera deweloperskiego, odczytuje wszystkie pliki SVG w porządku alfabetycznym, wyciąga z komentarzy zakodowane fragmenty, łączy je w całość, dekoduje własną funkcją zamiast standardowego atob(), i wykonuje przez eval(). Taki łańcuch omija proste heurystyki wykrywające podejrzane wywołania Buffer.from czy atob.

Payload po odpaleniu instaluje cztery moduły: złodzieja danych logowania z przeglądarek i portfeli kryptowalut (z osobnym priorytetowym traktowaniem ośmiu najważniejszych rozszerzeń portfeli), moduł kradnący pliki pasujące do wzorców takich jak .env, .pem czy pliki historii powłoki, trojana zdalnego dostępu opartego na Socket.IO dającego atakującemu interaktywny dostęp do powłoki ofiary, oraz moduł kradnący schowek systemowy, odpytywany co 500 milisekund. Co ciekawe, lista wykluczeń plikowych w module kradzieży danych świadomie pomija katalogi narzędzi AI takich jak .claude, .cursor czy .gemini, co sugeruje, że autorzy malware dobrze rozumieją, z jakich narzędzi korzystają współcześni deweloperzy i celowo minimalizują szum w skradzionych danych.

Elastic powiązał kampanię z wcześniej udokumentowanym malware OTTERCOOKIE po analizie kodu, zachowania i infrastruktury, w tym pokrywających się endpointów API wcześniej łączonych z tą samą grupą przez zespół JFrog Security. W momencie publikacji żadne z trojanizowanych repozytoriów nie było wykrywane przez skanery antywirusowe, a część ofiar nieświadomie wypchnęła zainfekowany kod do własnych repozytoriów na GitHubie.

**Kluczowe wnioski:**
- Malware był ukryty w komentarzach HTML wewnątrz plików SVG z flagami państw, łączonych w jeden payload przy starcie serwera
- Cztery moduły malware obejmują kradzież danych logowania i portfeli krypto, kradzież plików, RAT oparty na Socket.IO i złodzieja schowka
- Lista wykluczeń w module kradzieży plików świadomie omija katalogi narzędzi AI, co pokazuje, jak dobrze atakujący rozumieją współczesny warsztat dewelopera

**Dlaczego mnie to obchodzi:** Fałszywe zadania rekrutacyjne to jeden z tych wektorów ataku, przed którym najtrudniej się bronić, bo uderza dokładnie w moment, w którym deweloper jest najbardziej skłonny odpalić nieznany kod bez zastanowienia, czyli podczas procesu rekrutacyjnego. Ukrycie payloadu w plikach SVG to szczególnie podstępny trik, bo większość code review skupia się na plikach .js i .ts, a nikt nie czyta komentarzy w assetach graficznych. Praktyczna lekcja dla każdego zespołu: traktujcie "zadania rekrutacyjne" i przykładowe repozytoria z takim samym poziomem nieufności jak dowolny nieznany pull request, najlepiej odpalajcie je w izolowanym środowisku, nigdy na maszynie z dostępem do prawdziwych sekretów i portfeli.

**Link:** [Contagious Interview malware in SVG images: DPRK campaign](https://www.elastic.co/security-labs/contagious-interview-malware-svg-steganography)
