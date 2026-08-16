---
title: "Serwery z 1999 roku, SEO na własnej skórze i agentowe testowanie: przegląd HackerNoon"
excerpt: "Przegląd sześciu tekstów z HackerNoon: od architektury serwerów WWW z lat 90., przez pułapki indeksowania w Google, po agentowe testowanie i AI w codziennym kodowaniu."
publishedAt: "2026-08-01"
slug: "serwery-1999-seo-agentowe-testowanie-hackernoon"
hashtags: "#HackerNoon #architecture #seo #testing #ai #php #generated #pl"
---

## Architektura AMPED, czyli jak w 1999 roku rozwiązano problem, który wciąż nas dotyka

**TLDR:** Praca "Flash: An Efficient and Portable Web Server" z 1999 roku opisała architekturę AMPED, w której główna pętla obsługuje routing, a wolne operacje dyskowe oddaje pomocniczym procesom. Autor artykułu na HackerNoon odświeża tę pracę i pokazuje, że jej wnioski wciąż pasują do Nginx, Node.js czy nowoczesnych runtime'ów.

**Summary:** Cały artykuł to w gruncie rzeczy recenzja starego paperu akademickiego, ale akurat takiego, który się nie zestarzał. W 1999 roku Vikram Pai, Peter Druschel i Wolfgang Zwaenepoel próbowali odpowiedzieć na pytanie, jak obsłużyć tysiące jednoczesnych połączeń bez zamiany serwera w maszynę do przełączania kontekstu albo bez zakleszczania się na operacjach dyskowych. Ówczesny rynek miał trzy odpowiedzi: pojedyncza pętla zdarzeń, która jest szybka, dopóki nie trafi na coś wolnego; wiele procesów, co daje izolację kosztem pamięci; oraz wątki, które współdzielą pamięć, ale wprowadzają wyścigi i blokady. AMPED, czyli Asymmetric Multi-Process Event-Driven, zaproponował rozwiązanie pośrednie: jedna pętla zajmuje się routingiem i parsowaniem protokołu, a wolne operacje, takie jak odczyt z dysku, trafiają do lekkich procesów pomocniczych.

Najciekawszy fragment artykułu dotyczy tego, gdzie te same wzorce projektowe pojawiają się dzisiaj. Cache'owanie ścieżek plików, oddzielanie nagłówków odpowiedzi od dynamicznej treści, mapowanie plików do pamięci przez mmap, wreszcie asynchroniczne procesy pomocnicze, to wszystko brzmi znajomo każdemu, kto kiedykolwiek czytał kod źródłowy Nginx albo zastanawiał się, dlaczego Node.js tak bardzo unika blokujących operacji I/O w głównym wątku. Autor słusznie zauważa, że Flash nie był przywiązany do jednego systemu operacyjnego, bo korzystał wyłącznie ze standardowych mechanizmów systemowych, i to właśnie ta przenośność architektoniczna okazała się jego najtrwalszą zasługą, nie same liczby z benchmarków.

Druga część tekstu to już bardziej krytyczne spojrzenie, i tu robi się interesująco. Benchmarki z 1999 roku porównywały jednoprocesową wersję Flash z wieloprocesową konkurencją, co dzisiaj każdy recenzent rozerwałby na strzępy jako nieuczciwe porównanie. Autor zwraca też uwagę, że FreeBSD i Solaris z tamtej epoki radziły sobie z operacjami asynchronicznymi inaczej niż współczesne jądra, więc różnica między pomocniczym procesem aplikacji a natywnym I/O systemu zmalała, choć nie zniknęła. Ciekawe jest też przypomnienie, że sam problem obciążenia dyskowego nigdy nie został rozwiązany, tylko przesunięty w stronę warstwowego cache'owania i mądrzejszego routingu do baz danych.

Podoba mi się, że artykuł kończy się nie morałem, tylko pytaniem zwrotnym do czytelnika: które komponenty w twoim systemie blokują, które multipleksują, gdzie są ukryte przełączenia kontekstu. To jest dokładnie ten rodzaj lektury, po której człowiek otwiera kod produkcyjnego serwisu i zaczyna go oglądać innymi oczami.

**Key takeaways:**
- AMPED łączy jedną pętlę zdarzeń do routingu z pomocniczymi procesami do wolnych operacji dyskowych, unikając wad zarówno modelu jednoprocesowego, jak i wielowątkowego
- Wzorce z 1999 roku (cache ścieżek, mmap, asynchroniczni helperzy) są dziś obecne w Nginx, Node.js i nowoczesnych CDN-ach
- Oryginalne benchmarki porównywały nierówne konfiguracje, co osłabia niektóre wnioski liczbowe z pracy
- Problem konkurencji o pamięć między cache'em aplikacji a cache'em systemu operacyjnego pozostaje otwarty i zależy od konkretnego obciążenia

**Why do I care:** Z perspektywy architektury frontendowej to może wyglądać na temat z innej bajki, ale każdy, kto projektował middleware w Node.js albo edge function na Vercelu, w praktyce odtwarza ten sam kompromis: co zostawić w pamięci procesu, a co oddać platformie. Jak ktoś projektuje własny warstwowy cache w aplikacji SSR i jednocześnie nie myśli o tym, że system operacyjny albo runtime robi dokładnie to samo pod spodem, to prędzej czy później się zderzy z limitem pamięci albo z niewytłumaczalnym spowolnieniem. Ten tekst to dobra okazja, żeby przypomnieć sobie, że architektura serwera to nie tylko wybór frameworka, tylko decyzja o tym, kto blokuje, a kto czeka.

**Link:** [The AMPED Architecture: An Enduring Blueprint for Efficient Web Servers from 1999](https://hackernoon.com/the-amped-architecture-an-enduring-blueprint-for-efficient-web-servers-from-1999)

## Dwa niemal identyczne serwisy z ofertami pracy, dwa zupełnie inne losy w Google

**TLDR:** Autor uruchomił dwa job boardy na tej samej infrastrukturze technicznej. Jeden zaindeksował się bez większych problemów, drugi stracił niemal wszystkie strony kilka tygodni po starcie. Wniosek: Google ocenia nie tylko treść strony, ale też historię i tempo wzrostu całej domeny.

**Summary:** To jest ten rodzaj artykułu, który lubię najbardziej, bo to nie jest teoria SEO z bloga agencji marketingowej, tylko czysty eksperyment na żywym organizmie. Autor w lutym 2026 odpalił job board dla prawników, który rósł stopniowo, i który Google zaindeksował bez dramatów. W maju, korzystając z tego samego systemu, tej samej architektury, tego samego sitemapa i tej samej struktury linkowania wewnętrznego, uruchomił drugi serwis, tym razem dla księgowych. Google z początku zaindeksował sporo stron, a potem, kilka tygodni później, prawie wszystko usunął z indeksu. Zostały dwie strony, i tak jest do dziś, od dwóch miesięcy.

Techniczna strona obu projektów jest praktycznie identyczna, więc autor odrzuca standardowe rady w stylu "popraw treść" albo "napraw kanoniczne tagi", bo to akurat nie może być problem, skoro jeden serwis działa bez zarzutu. Jego teza jest taka, że nowa domena, która pojawia się od razu z tysiącami zaindeksowanych stron, wygląda dla Google podejrzanie, jakby ktoś próbował oszukać system, a nie budował coś wartościowego dla użytkowników. Pierwszy serwis rósł organicznie, drugi odziedziczył od razu dojrzałą architekturę informacji, i to podobno wystarczyło, żeby wywołać reakcję obronną algorytmu.

Najbardziej przydatna część tekstu to plan naprawczy, jaki autor by zastosował, gdyby zaczynał od nowa. Zamiast puszczać do indeksu tysiące stron programistycznych naraz, oznaczyłby większość z nich jako noindex, zostawiając w sitemapie tylko stronę główną, kilka kategorii i garść naprawdę wartościowych artykułów redakcyjnych. Dopiero po tym, jak Google zacznie te strony indeksować i pokazywać w wynikach, stopniowo dorzucałby kolejne partie. To jest strategia, która wygląda na wolniejszą, ale według autora w praktyce może być szybsza, bo unika ryzyka utraty całego serwisu na miesiące.

Ciekawy jest też fragment o celowaniu w najmniejsze możliwe frazy kluczowe zamiast w te z największym wolumenem wyszukiwań. Dziesięć kliknięć z niszowej frazy jest więcej warte niż zero kliknięć z frazy, w której nowa domena i tak nie ma szans z ugruntowanymi konkurentami. To pozwala też Google zaobserwować realny ruch i realną satysfakcję użytkowników, zanim w ogóle zacznie ufać całej domenie.

**Key takeaways:**
- Dwa serwisy o identycznej architekturze technicznej dostały skrajnie różne traktowanie od Google, co sugeruje wpływ historii i reputacji domeny, nie tylko jakości pojedynczej strony
- Zbyt szybkie udostępnienie tysięcy stron na nowej domenie może wyglądać na sygnał ryzyka, nie na sygnał wartości
- Rekomendowana strategia to stopniowe odkrywanie stron przed Google: noindex na start, potem partiami po kilkanaście-kilkadziesiąt stron
- Celowanie w wąskie, niskokonkurencyjne frazy na starcie daje realny ruch szybciej niż walka o duże słowa kluczowe
- Strona może być przez Google przeczytana i zrozumiana, a mimo to świadomie wykluczona z indeksu, co nie jest tym samym co bycie nieznaną

**Why do I care:** Jako ktoś, kto odpowiada też za architekturę frontendową dużych serwisów z generowaną treścią, widzę tu bezpośrednie przełożenie na pracę z Next.js czy Astro, gdzie łatwo jest wygenerować tysiące stron programistycznie w dniu premiery i uznać to za sukces techniczny. Ten tekst to dobre przypomnienie, że decyzja o tym, co trafia do sitemap.xml i kiedy, to nie jest wyłącznie kwestia SEO specjalisty, tylko część architektury wdrożenia, którą powinien współprojektować frontend. Warto rozmawiać o stopniowym odsłanianiu stron już na etapie planowania ISR czy SSG, zamiast traktować to jako coś, co się naprawia po fakcie.

**Link:** [I Launched Two Similar Job Boards: Google Indexed One and Rejected the Other](https://hackernoon.com/i-launched-two-similar-job-boards-google-indexed-one-and-rejected-the-other)

## Agentowe tworzenie testów kontra generowanie testów przez AI: to nie jest to samo

**TLDR:** Autor rozróżnia dwa podejścia sprzedawane pod tą samą etykietą "AI test generation": zwykłe opakowanie promptu w LLM oraz prawdziwego agenta, który najpierw analizuje istniejącą bibliotekę testów, zanim cokolwiek wygeneruje. Różnica w praktyce oznacza mniej duplikatów i realną identyfikowalność względem wymagań.

**Summary:** Autor od lat siedzi w tematyce QA z różnych stron, jako developer czekający na zespół testowy, jako tech lead patrzący, jak sprint capacity znika na ręczne przepisywanie historyjek z Jiry na przypadki testowe, i jako architekt audytujący repozytorium z czterema tysiącami testów, których nikt już nie rozumie. Kiedy więc "AI test generation" zaczęło pojawiać się w każdym narzędziu testowym, podszedł do tego z mieszanką zainteresowania i podejrzliwości, i po czasie doszedł do wniosku, że pod tą samą nazwą kryją się dwie zupełnie różne architektury.

Pierwsza to zwykły LLM za promptem. Wklejasz historyjkę z Jiry, narzędzie owija ją w prompt, wysyła do modelu ogólnego przeznaczenia i zwraca wynik jako listę przypadków testowych. Autor przetestował to na dojrzałym zestawie testów regresyjnych dla koszyka zakupowego z kodem promocyjnym i wynik był pouczający: siedem z dwunastu wygenerowanych przypadków już istniało, prawie słowo w słowo, dwa odnosiły się do przycisku, który w ogóle nie istnieje w interfejsie, a żaden nie był powiązany z konkretnym wymaganiem, więc identyfikowalność trzeba było robić ręcznie. Model zrobił dokładnie to, o co go poproszono, tylko nie miał żadnego kontekstu.

Agentowe tworzenie testów działa inaczej, bo to pętla, nie pojedyncze wywołanie funkcji. Agent zbiera kontekst z wymagania i załączników, analizuje istniejącą bibliotekę testów, ustala co już jest pokryte, i dopiero wtedy generuje przypadki wypełniające realne luki, każdy powiązany z konkretnym wymaganiem. Autor przywołuje tu formalizację ReAct oraz materiały Anthropic o budowaniu efektywnych agentów jako najlepsze źródła do zrozumienia tej różnicy. W praktycznym przykładzie z tą samą historyjką o kodzie promocyjnym agent znalazł czterdzieści powiązanych testów, rozpoznał siedem jako już pokrywające scenariusz, i zaproponował sześć nowych przypadków na realne luki, na przykład łączenie kodu promocyjnego z kartą podarunkową.

Nie jest to jednak rozwiązanie bez wad. Pętla kontekstu kosztuje więcej i trwa dłużej, bo płacisz za zapytania do biblioteki testów i wiele wywołań modelu zamiast jednego. Mapowanie pokrycia jest tak dobre, jak samo repozytorium testów, więc bałagan na wejściu daje bałagan na wyjściu. I wreszcie sama brama recenzji ludzkiej działa tylko wtedy, gdy recenzenci faktycznie się angażują, a nie klikają "zatwierdź" w piątek po południu na trzydziestu przypadkach naraz. Rola inżyniera QA zmienia się z autora na recenzenta, co według autora jest zmianą mniejszą, niż sugeruje marketing, ale realną.

**Key takeaways:**
- Zwykłe "AI test generation" to LLM bez kontekstu o istniejących testach, co prowadzi do masowych duplikatów i braku identyfikowalności
- Agentowe tworzenie testów najpierw analizuje bibliotekę testów i wymaganie, a dopiero potem generuje przypadki wypełniające realne luki
- Wdrożenie można kupić jako gotowy produkt (na przykład qTest od Tricentis) albo złożyć samemu z narzędzi typu Playwright MCP
- Dobre pytanie do dostawcy: "co czyta twoje narzędzie, zanim coś wygeneruje", jeśli odpowiedzią jest tylko prompt, to nie jest podejście agentowe
- Rola inżyniera QA przesuwa się z pisania przypadków testowych na recenzję i decydowanie, co w ogóle powinno być testowane

**Why do I care:** Dla frontendowego architekta to temat bliższy, niż się wydaje, bo dokładnie ten sam problem dotyczy testów E2E w Playwright czy Cypress pisanych dla komponentów UI, gdzie duplikaty i testy odnoszące się do nieistniejących już elementów DOM to codzienność każdego większego zespołu. Warto już teraz pytać dostawców narzędzi do generowania testów E2E dokładnie o to, co opisuje autor, bo różnica między realnym wypełnianiem luk w pokryciu a kolejną warstwą szumu w repozytorium testów to różnica między oszczędnością czasu a nowym długiem technicznym.

**Link:** [Agentic Test Creation vs. AI Test Generation: What's the Difference?](https://hackernoon.com/agentic-test-creation-vs-ai-test-generation-whats-the-difference)

## Czy początkujący iOS developer wypuści aplikację w dwa miesiące? Pierwszy odcinek dziennika

**TLDR:** Radu, deweloper full-stack z web developmentu, postanawia wystartować w dwumiesięcznym hackathonie Shipaton, mimo że praktycznie nie zna Swifta. Buduje aplikację do budowania koncentracji opartą na mechanice XP z gier RPG, i zapowiada relacjonowanie całej podróży w kolejnych wpisach.

**Summary:** To jest wpis bardzo różny od reszty newslettera, bo to nie jest analiza techniczna, tylko osobisty dziennik na początku pewnego wyzwania. Autor przedstawia się jako deweloper full-stack z niebranżowym backgroundem, który przez pół roku planował naukę iOS, a w praktyce obejrzał kilka tutoriali o Swift i tyle. Impulsem do działania stała się reklama Shipaton, dwumiesięcznego hackathonu, w którym trzeba faktycznie wypuścić działającą aplikację mobilną na AppStore, a nagrodę główną dostaje projekt z największym wzrostem i trakcją użytkowników, nie tylko najlepszym kodem.

Autor otwarcie przyznaje, że startuje z pozycji praktycznie zerowej widoczności w internecie, bez żadnej publiczności, do tego jako ojciec półtorarocznego dziecka z pracą na pełny etat, więc realistycznie liczy godziny nocne i wczesnoranne jako swój główny czas produkcyjny. Sama koncepcja aplikacji to kolejny "focus app" na rynku przesyconym pomodoro-timerami i wirtualnymi roślinkami rosnącymi w nagrodę za skupienie. Autor twierdzi, że jego pomysł różni się tym, że mechanika nagrody nie jest oderwana od realnego postępu użytkownika, tylko oparta na systemie umiejętności i punktów doświadczenia znanym z gier RPG, konkretnie inspirowanym Morrowind.

Trudno ocenić na tym etapie, czy pomysł się obroni, bo cały artykuł to w zasadzie zapowiedź serii, nie analiza wykonania. Nie ma tu jeszcze ani jednej linijki architektury aplikacji, ani planu marketingowego, ani nawet nazwy appki. Jest za to szczera deklaracja, że autor od dwóch dni dopiero zdecydował się wystartować, i że kolejny wpis ma zawierać plan projektowania systemu XP.

Jako czytelnik czuję tu głównie ciekawość, czy deklaracja "będę relacjonować wygrane i porażki" przetrwa zderzenie z realnym brakiem czasu rodzica pracującego na etacie. To jest dobry test na to, czy szczerość w budowaniu w miejscu publicznym faktycznie działa jako motywacja, czy szybko wyparuje po pierwszym trudnym tygodniu.

**Key takeaways:**
- Shipaton to dwumiesięczny hackathon wymagający realnego wypuszczenia aplikacji na AppStore, z nagrodą zależną od trakcji użytkowników, nie tylko jakości kodu
- Autor zaczyna praktycznie od zera ze Swift i bez żadnej publiczności online, co czyni to zadanie bardziej wyzwaniem marketingowym niż czysto technicznym
- Pomysł na aplikację to focus app z mechaniką XP i skilli inspirowaną grami RPG, mającą odróżnić go od typowych pomodoro-timerów
- Artykuł jest pierwszym z zapowiedzianej serii, więc nie zawiera jeszcze żadnych konkretów technicznych ani wyników

**Why do I care:** Dla frontendowego architekta to nie jest materiał techniczny, tylko historia z gatunku "build in public", ale warto ją śledzić z jednego powodu: pokazuje, jak duży ciężar w sukcesie projektu mobilnego ma dystrybucja i budowanie audytorium, a nie sama jakość kodu Swift czy architektura aplikacji. To dobre przypomnienie dla zespołów frontendowych myślących o własnych produktach, że najlepszy stack technologiczny niczego nie gwarantuje, jeśli nikt o produkcie nie wie, zanim jeszcze zacznie działać.

**Link:** [Can a New iOS Developer Ship an App in Two Months?](https://hackernoon.com/can-a-new-ios-developer-ship-an-app-in-two-months)

## Przewodnik leniwego programisty po AI-wspomaganym kodowaniu

**TLDR:** Weteran pracujący z generatorami kodu na długo przed LLM-ami opisuje, jak AI wpasowuje się w jego "leniwą" filozofię dostarczania wartości biznesowej mniejszym wysiłkiem. Wniosek jest ambiwalentny: AI dobrze radzi sobie z dodawaniem kodu zgodnego z SOLID, ale prawie w ogóle nie potrafi kodu usuwać i upraszczać.

**Summary:** Autor zaczyna od cytatu z "Code Complete" o trzech rodzajach lenistwa: odkładaniu nieprzyjemnego zadania, szybkim robieniu go z głowy, oraz napisaniu narzędzia, żeby nigdy więcej nie trzeba było go robić ręcznie. Sam siebie opisuje jako programistę praktykującego tę trzecią, najbardziej produktywną formę lenistwa, autora kilku generatorów kodu klienckiego dla API jeszcze sprzed epoki LLM-ów. Zanim przejdzie do samej AI, robi długi przegląd historii generowania kodu, od generatorów C++ Template, przez model-driven development i narzędzia takie jak ModelMaker dla Delphi, po całą kategorię czwartej generacji języków z lat 80. i 90., czyli dBase, Visual FoxPro czy PowerBuilder.

Ta historyczna dygresja nie jest przypadkowa, bo autor dochodzi do wniosku, że hasło "Application Development Without Programmers" z książki Jamesa Martina z 1981 roku to dokładnie ta sama obietnica, którą dzisiaj sprzedają dostawcy agentów kodujących AI. Różnica jest jednak fundamentalna: tradycyjny generator kodu jest deterministyczny i przewidywalny, kod się kompiluje i działa bez poprawek, podczas gdy kod generowany przez AI bywa nieprzewidywalny i regularnie zawiera błędy składniowe albo logiczne. Autor twierdzi, że w jego doświadczeniu wygenerowany kod dla nietrywialnej funkcjonalności jest zazwyczaj trzy do pięciu razy dłuższy niż powinien być, niezależnie jak precyzyjny był prompt.

Najciekawsza teza całego tekstu dotyczy asymetrii między "plusem" a "minusem" w pracy z kodem. Agenci AI są, zdaniem autora, dobrzy w dodawaniu kodu poprawnego politycznie względem SOLID i wzorców projektowych, dokładnie jak junior uzbrojony w wiedzę akademicką, ale bez doświadczenia potrzebnego do kompromisów biznesowych. Niemal zerowa jest za to ich zdolność do robienia "minusa", czyli usuwania kodu i upraszczania projektu. Autor przywołuje tu Roberta C. Martina i jego uwagę, że zasady SOLID powinno się stosować reaktywnie, dopiero przy pierwszym sygnale bólu, a nie proaktywnie z góry, i twierdzi, że AI w ogóle nie potrafi wyczuć tego bólu, bo dysponuje praktycznie nieograniczoną mocą obliczeniową.

W praktyce autor opisuje konkretne, zmierzone wskaźniki trafności dla różnych zastosowań: konwersja JSON na CSV w dziewięćdziesięciu pięciu procentach, generowanie klas POCO z atrybutami w dziewięćdziesięciu procentach, ale ze słabszą obsługą typów dat, migracja testów z Karmy czy Jesta do Vitest w dziewięćdziesięciu pięciu procentach, proste skrypty CI/CD w PowerShell w dziewięćdziesięciu dziewięciu procentach. To jest rzadki przypadek artykułu o AI, który zamiast ogólników podaje konkretne liczby oparte na własnym doświadczeniu, nawet jeśli sam przyznaje, że są subiektywne.

**Key takeaways:**
- Wygenerowany przez AI kod dla nietrywialnych funkcji bywa trzy do pięciu razy dłuższy, niż powinien być, niezależnie od jakości promptu
- AI dobrze radzi się z "dodawaniem" kodu zgodnego z SOLID, ale ma bliską zeru zdolność do "odejmowania", czyli usuwania i upraszczania
- Najwyższą trafność (90-99%) autor odnotowuje przy zadaniach mechanicznych: konwersje formatów, generowanie klas z JSON, migracje testów, skrypty CI/CD
- Zasady projektowe typu SOLID powinny być stosowane reaktywnie, przy pierwszym sygnale bólu, a AI nie potrafi tego sygnału rozpoznać
- Historia generatorów kodu sprzed LLM-ów (4GL, model-driven development) pokazuje, że obietnica "programowania bez programistów" nie jest nowa

**Why do I care:** To jest artykuł, z którym rezonuję najbardziej w tym zestawieniu, bo obserwacja o asymetrii między dodawaniem a usuwaniem kodu pokrywa się z tym, co widzę w code review generowanego przez agentów kodu frontendowego: więcej abstrakcji, więcej warstw, więcej "poprawności" względem wzorców, a rzadko odwaga, żeby coś wywalić. Dla architektów frontendowych to konkretna wskazówka do procesu: agent AI może przyspieszyć pisanie hooków, testów czy boilerplate'u komponentów, ale to wciąż człowiek musi pilnować, żeby projekt się nie rozrastał w nieskończoność, bo maszyna sama z siebie nigdy nie zapyta, czy tej warstwy abstrakcji w ogóle potrzeba.

**Link:** [The Lazy Programmer's Guide to AI-Assisted Development](https://hackernoon.com/the-lazy-programmers-guide-to-ai-assisted-development)

## Wschody i zachody słońca w PHP, czyli astronomia dla zaawansowanych zastosowań religijnych

**TLDR:** Autor kończy swoją serię o obliczeniach czasu w PHP, pokazując jak biblioteka PHP Zmanim (port KosherJava) liczy pozycję słońca względem horyzontu, a stąd momenty istotne dla praktyk religijnych, takie jak świt, zmierzch czy pojawienie się trzech gwiazd na niebie.

**Summary:** To jest bardzo niszowy, ale solidnie napisany tekst techniczny, zamykający dłuższą serię bloga o obliczeniach związanych z czasem. Rdzeń problemu jest prosty do sformułowania: dla danej lokalizacji, czyli szerokości i długości geograficznej plus strefy czasowej, oraz danej daty, znaleźć moment, w którym słońce znajduje się na określonej wysokości nad horyzontem. Autor pokazuje to na bibliotece PHP Zmanim, porcie znanej w świecie Java biblioteki KosherJava, zaczynając od podstawowego przykładu z obiektem lokalizacji i obiektem kalendarza, przez które oblicza się wschód słońca oraz moment, w którym słońce jest, powiedzmy, dwadzieścia stopni nad horyzontem.

Ciekawa jest tu drobna pułapka konwencji: funkcja liczy stopnie od zenitu, czyli punktu najwyższego, w dół, a nie od horyzontu w górę, więc dwadzieścia stopni nad horyzontem to w kodzie siedemdziesiąt stopni od zenitu. To akurat świetny przykład tego, jak łatwo o pomyłkę przy pracy z bibliotekami astronomicznymi, jeśli nie doczyta się dokumentacji do końca. Autor od razu przechodzi do praktycznego zastosowania religijnego: zarówno w judaizmie, jak i w islamie istnieje koncepcja świtu jako pierwszego widocznego rozjaśnienia nieba na wschodzie, odpowiednio alot hashachar i fajr, umownie przyjmowanego jako moment, gdy słońce jest osiemnaście stopni pod horyzontem.

Najbardziej rozbudowany fragment dotyczy obliczenia "Tzeit haKochavim", czyli momentu nocy, w którym można dostrzec trzy duże gwiazdy na niebie. Metoda jest zaskakująco okrężna: bierze się dzień równonocy, liczy czas zachodu słońca i czas, gdy słońce jest 3,86 stopnia pod horyzontem po zachodzie, oblicza różnicę w minutach, potem dla bieżącego dnia dzieli czas między wschodem a zachodem na dwanaście "sezonowych godzin", każdą na sześćdziesiąt "sezonowych minut", i dopiero mnożąc te dwie skale przez siebie, dodaje wynik do dzisiejszego zachodu słońca. Autor przechodzi przez ten łańcuch krok po kroku w kodzie, kończąc konkretnym przykładem liczbowym dla 10 czerwca 2025 roku w Cleveland.

Nie jest to tekst, który zmieni czyjeś życie zawodowe, ale jest dobrym przypomnieniem, że obliczenia "prostego" czasu potrafią kryć naprawdę nietrywialną matematykę, gdy w grę wchodzi precyzja istotna dla realnych ludzi, nie tylko ładny widget z porą dnia w rogu aplikacji.

**Key takeaways:**
- Biblioteka PHP Zmanim (port KosherJava) pozwala liczyć czas, w którym słońce znajduje się na dowolnej zadanej wysokości nad lub pod horyzontem
- Konwencja biblioteki liczy stopnie od zenitu w dół, więc trzeba pamiętać o przeliczeniu względem horyzontu
- Obliczenie "nightfall" wymaga referencyjnego pomiaru w dniu równonocy i przeskalowania go przez "sezonowe minuty" bieżącego dnia
- Precyzyjne obliczenia astronomiczne w kodzie aplikacyjnym mają realne zastosowania religijne w judaizmie i islamie, nie tylko dekoracyjne

**Why do I care:** To zdecydowanie nie jest temat frontendowy w sensie architektury komponentów czy stanu aplikacji, ale warto to przeczytać jako ćwiczenie z dokładności bibliotek domenowych: ten sam rygor, z jakim autor podchodzi do stopni i sezonowych minut, przydałby się każdemu, kto w aplikacji webowej liczy strefy czasowe, DST czy lokalizację dat, bo błędy w tej warstwie są ciche i ujawniają się dopiero przy konkretnej dacie granicznej, często dużo później niż testy jednostkowe.

**Link:** [A Developer's Guide to Sunrise and Sunset Calculations in PHP](https://hackernoon.com/a-developers-guide-to-sunrise-and-sunset-calculations-in-php)
