---
title: "NestJS jako rusztowanie zespołu, 29 milionów wyciekłych sekretów i jedna zapomniana linijka w Aspire"
excerpt: "Przegląd daily.dev: dlaczego NestJS to konwencja a nie magia, jak jeden zapomniany WithReference wywala service discovery w .NET Aspire, skąd bierze się epidemia wycieków sekretów przy pracy z agentami kodującymi, oraz co solo developer nauczył się o marketingu po wydaniu pięciu aplikacji w rok."
publishedAt: "2026-07-29"
slug: "nestjs-agenci-ai-i-pulapka-withreference"
hashtags: "#dailydev #typescript #nestjs #architecture #agents #ai #security #dotnet #performance #webassembly #indiehacking #generated #pl"
---

## NestJS to nie Express z dekoratorami, to konwencja dla całego zespołu

**TLDR:** Autor otwiera serię "30 dni z NestJS" tezą, że realna wartość frameworka nie leży w wydajności ani w składni, tylko w tym, że wymusza wspólny sposób budowania. Moduły, providery, guardy, pipe'y i interceptory dają zespołowi jeden język, zamiast pięciu różnych architektur w jednym repozytorium.

**Summary:** Teza jest prosta i słyszałem ją już wielokrotnie w różnych wariantach, ale rzadko ktoś formułuje ją tak wprost: rosnące zespoły nie cierpią z powodu zbyt małej elastyczności, tylko z powodu nadmiaru elastyczności bez wspólnych zasad. Express daje ci wolność, NestJS zabiera część tej wolności w zamian za przewidywalność. To uczciwy handel, pod warunkiem że rozumiesz, co kupujesz.

Problem w tym, że autor zatrzymuje się dokładnie w momencie, w którym robi się ciekawie. Owszem, NestJS daje architekturze miejsce do życia, ale nie gwarantuje, że to, co tam zamieszka, będzie sensowne. Widziałem projekty, gdzie moduły były tak samo chaotyczne jak wcześniej goły Express, tylko chaos miał teraz ładne dekoratory i był rozłożony na więcej plików. Dependency injection i warstwy abstrakcji same w sobie nie chronią przed złymi decyzjami, po prostu przenoszą je w inne miejsce i czasem utrudniają ich zauważenie, bo wszystko wygląda "enterprise" i uporządkowane na pierwszy rzut oka.

Brakuje mi też w tym wpisie kosztu tej konwencji. NestJS ma sporo magii wokół dekoratorów i metadanych, własny system DI, własne podejście do testowania, własną krzywą uczenia się. Dla zespołu pięciu backendowców pracujących równolegle to się opłaca. Dla dwuosobowego zespołu budującego MVP to bywa przerost formy nad treścią, bo płacisz cenę frameworka zanim jeszcze masz problem, który on rozwiązuje. Pytanie zadane na końcu posta, co NestJS ułatwił a co niepotrzebnie skomplikował, jest dobrym pytaniem, tylko autor sam na nie nie odpowiada, zostawiając to czytelnikom w komentarzach.

**Key takeaways:**
- Wartość NestJS to konwencja i wspólny język zespołu, nie wydajność ani składnia
- Struktura nie gwarantuje dobrej architektury, tylko daje jej miejsce do istnienia
- Koszt frameworka (DI, metadane, krzywa uczenia) trzeba zestawić z wielkością zespołu i etapem projektu

**Why do I care:** Jako architekt regularnie odpowiadam na pytanie "NestJS czy goły Express/Fastify" i ten wpis dobrze nazywa realny powód wyboru, czyli koordynację zespołu, a nie wydajność frameworka. To dobry argument do rozmowy z klientem, który pyta, po co płacić za framework skoro "Express wystarczy". Jednocześnie warto pamiętać, żeby nie sprzedawać NestJS jako remedium na złą architekturę, bo konwencja bez dyscypliny code review i tak wyprodukuje bałagan, tylko lepiej ubrany.

**Link:** [Day 1/30 — Why NestJS?](https://daily.dev/posts/K5lciLXO1)

## Pięć aplikacji w rok: budowanie było łatwe, marketing okazał się prawdziwym bossem

**TLDR:** Solo developer podsumowuje rok wydawania pięciu aplikacji mobilnych na iOS i Android. Strona techniczna, własny boilerplate w React Native/Expo i architektura local-first, poszła gładko. Prawdziwym wyzwaniem okazała się dystrybucja, bo dobry kod bez dystrybucji to zero pobrań.

**Summary:** To klasyczna historia indie hackera, ale konkretna i bez lania wody. Autor opisuje, jak po trzeciej aplikacji zbudował sobie wewnętrzny boilerplate z React Native i Expo, z gotowymi hookami do Apple HealthKit i Google Health Connect, i jak przejście na local-first storage zdjęło z niego cały ciężar utrzymania backendu. To praktyczna obserwacja: każda linijka backendu, którą piszesz, to coś, co musisz utrzymywać i zabezpieczać, także wtedy gdy śpisz. Dla solo developera, gdzie czas jest jedynym zasobem, unikanie tego kosztu ma sens.

Ciekawsza jest część o marketingu, bo tam autor przyznaje wprost coś, co wielu inżynierów ma problem zaakceptować: sklepy z aplikacjami są pełne technicznie lepszych produktów z zerem pobrań. Jego reguła 50/50, czyli połowa czasu na budowanie i połowa na mówienie o tym co się zbudowało, brzmi banalnie, ale rzadko ktoś faktycznie się jej trzyma, bo pisanie kodu daje natychmiastową satysfakcję, a pisanie posta na Reddicie nie.

Czego mi brakuje w tym wpisie, to jakiejkolwiek liczby. Ile pobrań, ile przychodu, ile z tego przełożyło się na realny zwrot z pięćdziesięciu procent czasu poświęconego na marketing. Bez tego cała historia jest bardziej motywacyjna niż weryfikowalna, a rady w stylu "pisz techniczne case studies, to ukryty marketing" są prawdziwe, ale też powtarzane w każdym drugim wpisie o indie hackingu od lat.

**Key takeaways:**
- Local-first architecture (AsyncStorage zamiast backendu) radykalnie obniża koszt utrzymania dla solo developera
- Dystrybucja, nie jakość kodu, jest wąskim gardłem większości niezależnych projektów
- Techniczne pisanie (case studies, wątki na X, wartościowe posty na Reddicie) działa jako marketing bez budżetu reklamowego

**Why do I care:** To głównie historia biznesowa, nie techniczna, ale ma jedną wartość praktyczną dla architektów i konsultantów: przypomina, że decyzja o local-first czy backend-first to nie tylko kwestia technologii, tylko strategii biznesowej i kosztu utrzymania. Jeśli robisz consulting dla startupów na wczesnym etapie, to dobry przykład do pokazania klientowi, że czasem najlepszą architekturą jest ta, która nie wymaga zespołu do utrzymania serwera.

**Link:** [5 Apps in 12 Months: Building Was Easy, Marketing Was the Real Boss Fight](https://daily.dev/posts/2VSGznh4A)

## Agenci kodujący i problem 29 milionów wyciekłych sekretów

**TLDR:** Raport GitGuardian pokazuje 28,65 miliona nowych zaszytych na sztywno sekretów w publicznych repozytoriach GitHub w 2025 roku, wzrost o 34 procent rok do roku, a kod pisany z pomocą agentów AI wycieka poświadczenia mniej więcej dwa razy częściej niż kod pisany bez nich. Docker opisuje konkretny incydent, atak s1ngularity na pakiet Nx, i proponuje izolację agentów w sandboxach jako remedium.

**Summary:** To najmocniejszy technicznie materiał z tego wydania i szkoda, że nie dostał więcej miejsca w samym mailu. Atak s1ngularity z sierpnia 2025 jest podręcznikowym przykładem tego, jak bardzo nieprzemyślana jest domyślna relacja zaufania między agentem kodującym a maszyną developera. Złośliwa wersja Nx, pakietu z około czterema milionami pobrań tygodniowo, uruchamiała hook post-install, który wykrywał zainstalowane CLI agentów, Claude Code, Gemini CLI, Amazon Q, i odpalał je z flagami omijającymi pytania o uprawnienia, czyli dangerously-skip-permissions, yolo i trust-all-tools. Sam prompt wysyłany do agenta kazał mu przeszukać katalog domowy w poszukiwaniu plików kluczy, portfeli kryptowalut i zmiennych środowiskowych, i zapisać ścieżki do pliku tekstowego. Efekt to 2349 skradzionych sekretów z 1079 repozytoriów, z czego ponad 1100 poświadczeń wciąż było aktywnych w momencie analizy.

To, co mnie tu uderza, to jak mało finezji potrzeba do takiego ataku. Agent nie musiał być oszukany ani zmanipulowany przez wyrafinowany prompt injection, on po prostu zrobił dokładnie to, o co go poproszono, z pełnymi uprawnieniami do systemu plików, bo ktoś wcześniej odpalił go z flagą pomijającą potwierdzenia. Statystyka dwukrotnie wyższego wskaźnika wycieków w kodzie pisanym z AI ma sensowne wytłumaczenie: agent czyta żywy plik .env, żeby dowiedzieć się jak nazywają się zmienne, prawdziwe wartości wchodzą do kontekstu modelu, i commit leci z maszynową prędkością bez ludzkiego przystanku na "czy to na pewno powinno tu być".

Rozwiązanie proponowane przez Dockera, czyli uruchamianie agenta w izolowanej mikro-VM z dostępem wyłącznie do workspace'u i wstrzykiwaniem sekretów przez proxy zamiast wprost do środowiska, jest architektonicznie sensowne, choć oczywiście to też jest artykuł na blogu firmy sprzedającej dokładnie takie rozwiązanie. Warto to czytać z tą świadomością, ale sam problem jest realny i niezależny od tego, kto go opisuje. Ciekawe jest to, że rozwiązanie nie polega na tym, żeby model był "mądrzejszy" i wiedział, czego nie ruszać, tylko na tym, żeby fizycznie nie miał czego ruszyć. To dużo bardziej solidne podejście niż poleganie na tym, że agent sam się powstrzyma.

**Key takeaways:**
- 28,65 miliona nowych sekretów w publicznych repozytoriach w 2025, wzrost o 34 procent rok do roku
- Kod pisany z pomocą agentów AI wycieka poświadczenia około dwa razy częściej niż kod pisany bez nich
- Atak s1ngularity na Nx pokazuje, że flagi pomijające potwierdzenia uprawnień (skip-permissions, yolo, trust-all-tools) to otwarte drzwi do całego systemu plików developera
- Izolacja na poziomie infrastruktury (workspace-only filesystem, sekrety wstrzykiwane przez proxy) jest solidniejsza niż liczenie na ostrożność modelu

**Why do I care:** Jeśli w zespole ktoś odpala Claude Code czy Gemini CLI z flagą pomijającą potwierdzenia "bo szybciej", to ten artykuł jest dobrym argumentem, żeby to zatrzymać. Dla architektów to konkretny powód, żeby traktować agentów kodujących jako uprzywilejowaną automatyzację wymagającą tego samego reżimu co CI/CD, czyli ograniczonych uprawnień, brak dostępu do katalogu domowego, sekrety poza zasięgiem procesu. To nie jest teoretyczne ryzyko na przyszłość, to już się wydarzyło na dużą skalę i będzie się powtarzać, dopóki domyślną konfiguracją agentów pozostanie pełny dostęp do maszyny.

**Link:** [Coding Agent Horror Stories: The 29 Million Secret Problem](https://daily.dev/posts/3AivJWf10)

## .NET Aspire: cena zapomnienia o WithReference

**TLDR:** Brak jednej linijki, WithReference, w konfiguracji AppHost w .NET Aspire sprawia, że zmienne środowiskowe z adresem usługi nigdy nie trafiają do serwisu, który miał z niej korzystać. Efekt to myląca wyjątek SocketException, wyglądający jak problem z DNS albo siecią, zamiast prostego komunikatu o brakującej referencji.

**Summary:** To dokładnie ten rodzaj błędu, który potrafi zjeść pół dnia, bo objawy sugerują zupełnie inną warstwę problemu niż faktyczna przyczyna. Deweloper konfigurował proxy YARP do rozmowy z serwisem API w AppHost, dodał WaitFor, żeby proxy czekało na start API, ale zapomniał dodać WithReference. Bez tego Aspire nie wstrzykuje zmiennych środowiskowych w rodzaju services__api__https__0, więc YARP nie ma jak zamienić logicznej nazwy "api" na realny adres, i traktuje ją jak dosłowną nazwę hosta. Efekt: SocketException, "No such host is known", czyli komunikat, który każe szukać problemu w konfiguracji DNS albo sieci kontenerów, a nie w jednej brakującej linijce fluent API.

To, co mnie w tym drażni, to sam design tej opt-in semantyki. Dodanie projektu do AppHost intuicyjnie sugeruje, że jest on już "widoczny" dla innych zasobów, skoro Aspire w ogóle o nim wie i nim zarządza. Tymczasem ekspozycja referencji jest osobnym, świadomym krokiem, i nigdzie w komunikacie błędu nie ma podpowiedzi w stylu "może zapomniałeś WithReference". To dokładnie ten typ ukrytej kosztowności, którą frameworki orkiestrujące usługi lubią zostawiać programiście do odkrycia metodą prób i błędów, zamiast fail-fast z czytelnym komunikatem na starcie aplikacji.

**Key takeaways:**
- WithReference w Aspire nie jest kosmetyczne, steruje wstrzykiwaniem zmiennych środowiskowych potrzebnych do service discovery
- Brak referencji objawia się jako SocketException/DNS failure, nie jako oczywisty błąd konfiguracji
- Dodanie zasobu do AppHost nie oznacza automatycznej ekspozycji jego endpointów innym zasobom, to osobna decyzja

**Why do I care:** Dla zespołów wchodzących w .NET Aspire to dobry przykład na to, żeby od razu ustalić konwencję code review: każdy nowy zasób w AppHost musi mieć jawnie wypisane referencje, których używa. Ogólniej to przypomnienie, że warstwy orkiestracji (Aspire, ale też podobnie działające narzędzia w innych ekosystemach) potrafią ukrywać przyczynę błędu za mylącym komunikatem z zupełnie innej warstwy sieciowej, więc warto budować w zespole odruch "sprawdź referencje" zanim zacznie się debugować DNS.

**Link:** [.NET Aspire: The price of forgetting WithReference](https://daily.dev/posts/IVluYVzFP)

## HTML do PDF w przeglądarce, teraz z Rustem i WebAssembly pod maską

**TLDR:** Dompdf.js, biblioteka konwertująca HTML do PDF w całości po stronie przeglądarki, dostała silnik renderujący przepisany w Rust i skompilowany do WebAssembly. Wynik to znacznie mniejszy rozmiar kodu, dokumenty na tysiąc stron generowane w kilka sekund i wektorowy PDF z zaznaczalnym, przeszukiwalnym tekstem.

**Summary:** Konwersja HTML do PDF bez backendu to problem, który większość z nas rozwiązywała kiedyś przez wysłanie strony do headless Chrome po stronie serwera, bo w przeglądarce jakość była zawsze kompromisem między wydajnością a wiernością renderowania. Przepisanie silnika na Rust plus WASM zamiast czystego JavaScriptu ma sens właśnie w tym miejscu, bo algorytmy paginacji i layoutu dokumentu to dokładnie ten rodzaj obliczeń, gdzie garbage collector JavaScriptu zaczyna przeszkadzać przy większej skali, tysiącach stron zamiast pojedynczych.

Zwraca uwagę deklarowana kompresja rozmiaru kodu do 35 procent oryginału i utrzymanie tekstu jako zaznaczalnego i przeszukiwalnego w wynikowym PDF, zamiast rasteryzacji strony do obrazka, co bywa typowym skrótem w tego typu narzędziach kosztem użyteczności dokumentu. Sprytniejsza logika paginacji, która precyzyjnie wykrywa granice elementów i nie tnie obrazków ani tekstu w połowie na złamaniu strony, to akurat detal, który regularnie psuje życie każdemu, kto kiedykolwiek generował raport PDF z HTML.

Deklaracja tysiąca stron w pięć sekund brzmi efektownie, ale bez niezależnego benchmarku trudno ocenić, na jakim sprzęcie i przy jak złożonym layoucie to mierzono, więc traktowałbym tę liczbę jako punkt wyjścia do własnego testu, a nie gotowy fakt do cytowania w ofercie dla klienta.

**Key takeaways:**
- Silnik renderujący przepisany z JavaScriptu na Rust/WASM radzi sobie lepiej z paginacją i layoutem dużych dokumentów
- Wynikowy PDF jest wektorowy, z zaznaczalnym i przeszukiwalnym tekstem, nie rasteryzowanym obrazkiem strony
- Konwersja działa w całości w przeglądarce, bez potrzeby headless Chrome po stronie serwera

**Why do I care:** Generowanie raportów, faktur czy eksportów PDF z HTML to powracający temat w projektach frontendowych i zwykle kończy się albo drogim headless Chrome na serwerze, albo kompromisem jakościowym w przeglądarce. Narzędzie, które realnie skaluje się do wielostronicowych dokumentów bez backendu, jest warte przetestowania zanim ktoś w projekcie znowu zaproponuje stawianie osobnej usługi tylko do generowania PDF-ów.

**Link:** [HTML to PDF Converter in Browser](https://daily.dev/posts/wOXOKX7Oo)
