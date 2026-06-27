---
title: "Next.js 16.3 z natychmiastową nawigacją, nub.js dla Node.js i port Flow do Rusta — przegląd tygodnia"
excerpt: "Przegląd najważniejszych nowości ze świata frontendu: Next.js 16.3 z Instant Navigations, nub.js jako all-in-one toolchain dla Node.js, port Flow z OCaml do Rusta, FokosDB na Cloudflare Durable Objects, GitHub Actions z równoległymi krokami oraz podgląd GPT-5.6 Sol."
publishedAt: "2026-06-26"
slug: "nextjs-163-nubjs-flow-rust-port-github-actions-parallel-steps"
hashtags: "#uidev #javascript #frontend #webdev #nodejs #nextjs #rust #githubactions #cloudflare #openai #generated #pl"
source_pattern: "ui.dev"
---

## Next.js 16.3: Instant Navigations — koniec z powolnymi przejściami

**TLDR:** Next.js 16.3 wprowadza Instant Navigations, czyli zestaw narzędzi, które sprawiają, że aplikacje server-driven działają tak responsywnie jak single-page apps. Nowe mechanizmy prefetchowania i cache'owania likwidują długo krytykowany problem powolnych nawigacji w aplikacjach opartych na Server Components.

**Summary:**

Jedną z najczęstszych i najbardziej uzasadnionych krytyk pod adresem Next.js była zawsze ta sama bolączka: nawigacja w aplikacjach opartych na serwerze po prostu nie czuje się responsywnie. Klikasz w link, czekasz, czekasz trochę dłużej, aż w końcu pojawia się nowa strona. To podejście sprawdza się świetnie w przypadku stron contentowych, takich jak blogi czy serwisy informacyjne, ale dla aplikacji, które mają działać jak produkty, to po prostu nie wystarcza. Zespół Next.js wyraźnie to usłyszał i w wersji 16.3 odpowiada nową funkcją o nazwie Instant Navigations.

Serce całego rozwiązania opiera się na trzech wzajemnie uzupełniających się mechanizmach. Pierwszym jest Cache Components — flaga, która włącza nowe zachowania i staje się domyślna w przyszłej wersji major. Gdy trasa awaituje dane na serwerze, programista dostaje teraz świadomy wybór: może osadzić daną operację w Suspense i streamować interfejs z loading state, może oznaczyć dane jako cacheable przy użyciu dyrektywy use cache, albo explicite zablokować nawigację dla tras, gdzie migawka loading state nie ma sensu semantycznie. To nie jest nowe podejście do cacheowania — to nowe podejście do nawigacyjnej odpowiedzialności.

Drugim mechanizmem jest zmiana w sposobie prefetchowania. Dotychczas Next.js wysyłał osobne zapytanie prefetch dla każdego linka widocznego w viewporcie, co skutkowało burzą requestów podczas scrollowania. Teraz framework przechodzi na model Partial Prefetching, w którym pobierany jest jeden wielokrotnie używalny shell per trasa, a nie per link. To koncepcyjnie bardzo zbliżone do code splitting w single-page apps, gdzie kod dla danej trasy jest pobierany raz i reużywany. Shell trasy jest cachowany na kliencie przez całą sesję, co eliminuje zbędne requesty i kładzie podwaliny pod nawigację offline w przyszłości.

Trzecim elementem jest zestaw narzędzi dla programistów: Navigation Inspector w Next.js DevTools pozwala na zatrzymanie nawigacji na etapie shella i inspekcję tego, co jest prefetchowane, a helper Instant Insights w trybie deweloperskim podnosi nienatychmiastowe nawigacje do poziomu błędów, ułatwiając ich wyłapywanie przed produkcją. Dodano też helper do testów Playwright, który pozwala asertować granularnie, co musi być widoczne natychmiast po kliknięciu linka.

Zespół Vercel testował te zmiany na v0 jeszcze przed tym wydaniem i wyniki mówią same za siebie — czasy nawigacji zbliżyły się do zera. Co ważne, obie flagi, cacheComponents i partialPrefetching, są na razie opt-in i mają stać się domyślne w kolejnym major release.

**Key takeaways:**
- Instant Navigations to trzy powiązane mechanizmy: Stream z Suspense, Cache z use cache i explicite Block — programista wybiera per trasa
- Partial Prefetching zastępuje prefetchowanie per link prefetchowaniem per trasa (jeden shell, wielokrotne użycie), drastycznie redukując liczbę requestów
- Nowy Navigation Inspector i Instant Insights w DevTools pomagają wychwycić wolne nawigacje w czasie dewelopmentu

**Why do I care:** To wreszcie adresuje fundamentalną słabość Next.js, na którą wskazywałem od lat. Wybór między SPA a server-driven app nie powinien oznaczać wyboru między responsywnością a korzyściami serwerowymi. Niepokoi mnie jednak jedno: wprowadzenie kolejnej pary flag opt-in pogłębia już i tak skomplikowany model konfiguracyjny Next.js. Zanim te mechanizmy staną się domyślne, ekosystem przejdzie przez kolejny etap "czy masz X i Y włączone?" podczas debugowania. Dobrze, że to idzie w dobrym kierunku, ale kosztem dodatkowej złożoności, którą każdy senior developer będzie musiał rozumieć i tłumaczyć swojemu zespołowi.

**Link:** [Next.js 16.3: Instant Navigations](https://nextjs.org/blog/next-16-3-instant-navigations)

---

## Nub.js — all-in-one toolchain dla Node.js, który nie chce zastąpić Node

**TLDR:** Nub.js to nowe narzędzie Colina McDonnella (twórcy Zod i tRPC) będące kompleksowym toolchainem dla Node.js. Zamiast zastępować środowisko uruchomieniowe, augmentuje istniejące Node.js o runner TypeScriptu, menedżer pakietów, zarządcę wersji Node i szybszy odpowiednik npx — wszystko w jednym binarnym pliku napisanym w Rust.

**Summary:**

Gdy Bun pojawił się w 2021 roku jako obietnica szybszego, łatwiejszego w użyciu środowiska uruchomieniowego, wielu deweloperów odczuło entuzjazm. Ale z czasem ta ekscytacja zetknęła się z realiami: firmy używają Node.js, ekosystem jest na Node.js, a migracja całego toolingu na nowe runtime to ryzyko i koszty, których nikomu nie chce się podejmować. Colin McDonnell zauważył tę lukę i zamiast próbować przekonywać kogokolwiek do zmiany środowiska, zapytał: co by się stało, gdybyśmy dali programistom Node.js to wszystko, co czyni Bun atrakcyjnym, bez zmiany samego Node?

Odpowiedzią jest nub.js — narzędzie, które Colin opisuje jako "everything but the runtime". Nub to pojedynczy binarny plik napisany w Rust, który dostarcza pięć głównych komponentów naraz. File runner, który może uruchamiać pliki TypeScript, TSX i JSX z pełnym wsparciem dla tsconfig.json, automatycznym ładowaniem zmiennych środowiskowych i obsługą dekoratorów. Script runner kompatybilny z pnpm, który jest podobno dwadzieścia cztery razy szybszy od npm run i wspiera workspaces. Zamiennik npx o nazwie nubx, który jest szybszy dziewiętnaście razy, ponieważ wywołuje binarki bezpośrednio bez dodatkowego procesu Node. Menedżer pakietów, który potrafi czytać i zapisywać locki npm, pnpm i Bun. Oraz zarządca wersji Node, który zastępuje nvm i fnm, czytając konfigurację z .node-version lub .nvmrc.

Kluczową decyzją architektoniczną jest to, że nub nie jest własnym środowiskiem uruchomieniowym. Transpilacja TypeScriptu dzieje się w pamięci przez natywny addon Rusta oparty na oxc, a następnie kod jest uruchamiany na prawdziwym, zainstalowanym binarnym Node.js. To eliminuje wszelkie problemy z kompatybilnością — nub przechodzi 4315 z 4368 testów kompatybilności z Node.js (nieliczne braki wynikają z automatycznego włączania eksperymentalnych funkcji). Benchmarki startu pliku TypeScript pokazują, że nub i plain Node mają ten sam czas startowy, podczas gdy tsx jest prawie trzy razy wolniejszy.

Szczególnie warta uwagi jest domyślna ochrona przed atakami supply-chain. Nub blokuje uruchamianie skryptów instalacyjnych zależności do czasu, aż programista explicite je zatwierdzi, sprawdza bazę CVE przy każdym resolve i wstrzymuje paczki młodsze niż 24 godziny. W świecie, gdzie postinstall scripts były wektorem wielu ataków, to podejście deny-by-default jest krokiem w dobrym kierunku.

**Key takeaways:**
- Nub augmentuje Node.js zamiast go zastępować — brak własnego runtime, pełna kompatybilność binarna z Node
- Obejmuje pięć narzędzi jednocześnie: file runner, script runner, package runner, package manager i Node version manager
- Domyślna ochrona supply-chain: skrypty instalacyjne są blokowane do czasu ręcznego zatwierdzenia

**Why do I care:** Jestem sceptyczny co do "all-in-one" narzędzi, bo historia JavaScript nauczyła nas, że takie projekty albo stają się zbyt grube i trudne w utrzymaniu, albo znikają po roku. Ale tutaj mam powody do umiarkowanego optymizmu: Colin ma sprawdzone track record z Zod i tRPC, a Rust jako fundament zmniejsza ryzyko regresu wydajnościowego. Prawdziwym testem będzie to, co się stanie, gdy Node zmieni swoje API load hooks — nub opiera się na module.registerHooks(), które jest jeszcze eksperymentalne. Warto obserwować, ale nie migrować całego monorepo w tym miesiącu.

**Link:** [Nub — an all-in-one toolkit for Node.js](https://nubjs.com/)

---

## Flow port z OCaml do Rusta — jak AI pomogło przepisać type checker w cztery miesiące

**TLDR:** Zespół Flow w Meta zakończył port całego type checkera TypeScript z OCaml na Rust. Od wersji 0.319 nub opakowanie npm jest zasilane binarnym plikiem Rust, który jest dwa razy szybszy od poprzednika. Historia tego portu to również opowieść o tym, jak AI stało się faktycznym narzędziem inżynieryjnym, nie tylko hype'em.

**Summary:**

Kiedy TypeScript ogłosił port do Go z obietnicą dziesięciokrotnego przyspieszenia, a Pyrefly (port Pyre w Rust) osiągnął trzydziestokrotne przyspieszenie wewnątrz Meta, dla zespołu Flow stało się jasne, że nie da się odkładać rewritu w nieskończoność. Pytaniem nie było już "czy", tylko "jak" i "kiedy". Zdecydowali na Rust zamiast Go czy Kotlin, bo poza samym odejściem od OCaml chcieli otworzyć się na integrację z rosnącym ekosystemem Rust-based JS toolchain, takim jak SWC i oxlint.

Kluczową decyzją projektową był wybór line-by-line port zamiast rewrite. Rewrity są ekscytujące, ale ryzykowne — zmiana zachowania type checkera to lawina nieoczekiwanych efektów dla milionów plików. Mechaniczny port jeden-do-jednego daje gwarancję, że produkt końcowy będzie drop-in replacement. Wadą jest to, że przeniesione zostają też złe decyzje i techniczny dług, który nagromadziły się przez lata, ale jak piszą autorzy — zawsze łatwiej refaktoryzować niż przepisywać. Jedynym miejscem, gdzie odstąpiono od zasady line-by-line, był system współdzielonej pamięci, gdzie zamiast portować obejście C-based zastąpiono go czystym rozwiązaniem Rust.

To, co wyróżnia tę historię spośród wielu opowieści o migracjach, to szczera i precyzyjna relacja o roli AI. Parser był portowany przez jedną osobę w cztery tygodnie przy pomocy ówczesnego Sonnet 4.5. Checker — znacznie bardziej skomplikowany — portowany przez agent teams z Opus 4.5 i 4.6 w jeden miesiąc. AI nie działało samo: miało ściśle egzekwowane zasady (zakaz unsafe, obowiązek inline komentarzy z oryginalnym OCaml kodem, weryfikacja przez reviewer agents), a każda zmiana przechodziła przez ostateczną weryfikację człowieka. Gdy AI utknęło w wielodniowych optymalizacjach bez postępu, to człowiek dostrzegał systemowe okazje — jak wprowadzenie work-stealing schedulera czy naprawa cicho powielanych obliczeń.

Wynik? Rust binary jest przeciętnie dwa razy szybszy od OCaml we wszystkich etapach type-checkingu i od trzydziestu do stu procent szybszy w najbardziej obliczeniowo intensywnym kroku. Port jest kompletny i dostępny dla wszystkich użytkowników flow-bin od wersji 0.319.

**Key takeaways:**
- Wybór line-by-line port zamiast rewrite zminimalizował ryzyko zmiany zachowania i umożliwił pracę bez code freeze
- AI było realnym narzędziem inżynieryjnym, ale wymagało ścisłych zasad, weryfikacji człowieka i nie rozwiązało wszystkich problemów wydajnościowych samodzielnie
- Wynik to 2x szybszy type-checker i nowe możliwości integracji z Rust-based toolchainem JS

**Why do I care:** To najrzetelniejszy opis użycia AI w poważnym projekcie inżynieryjnym, jaki czytałem w tym roku. Żadnego hype'u, żadnego "AI napisało cały kompilator". Uczciwe "AI było przydatne, ale wymagało scaffoldingu, nadzoru i nie rozwiązało wszystkich problemów". Warto też zwrócić uwagę na to, czego artykuł nie mówi wprost: ich sukces opierał się na bardzo dobrej dokumentacji własnych wzorców (claude.md guidelines), bez której AI generowałoby poprawny Rust, ale nie ich Rust. To lekcja, którą wiele zespołów pomija.

**Link:** [Flow's OCaml to Rust Port](https://medium.com/flow-type/flows-ocaml-to-rust-port-78b95bcf49e9)

---

## Formisch v1 RC — schema-first, framework-agnostic biblioteka formularzy

**TLDR:** Formisch, type-safe biblioteka do zarządzania stanem formularzy oparta na schemacie Valibot, weszła w fazę Release Candidate. Core API jest już stabilne, a biblioteka działa natywnie na React, Vue, Solid, Qwik, Svelte i Preact bez adaptera i bez dodatkowych warstw w bundlu.

**Summary:**

Fabian Hiller, twórca zarówno Valibot jak i wcześniejszego Modular Forms, połączył te dwa projekty w Formisch — bibliotekę, która próbuje rozwiązać problem, z którym mierzył się prawdopodobnie każdy frontend developer: formularze, które zaczynają się proste i niepostrzeżenie stają się setkami linii powtarzalnego, kruchego kodu. Nazwa nie jest przypadkowa — to niemieckie pseudo-słowo od "form" z sufiksem "-isch", co można przetłumaczyć jako "formikowy", co jest bezpośrednim kłuciem się w tytulaturze z Formikiem, legendarną biblioteką Jared Palmera.

Filozofia Formisch jest schema-first: opisujesz formularz jeden raz za pomocą schematu Valibot, który jednocześnie napędza walidację runtime i typy TypeScript. Nie ma osobnych definicji typów do synchronizowania, nie ma resolverów do konfigurowania. Każde pole eksponuje wartość, błędy i propsy do podpięcia do inputu, a ścieżki są w pełni typowane względem schematu — zmiana nazwy pola sprawia, że TypeScript flaguje każde miejsce, które przestało być poprawne.

Architektura używa fine-grained signals, co oznacza, że tylko pola, które faktycznie się zmieniają, są re-renderowane. Rozmiar bundla zaczyna się od około 2.5 kB. Co jednak najciekawsze z perspektywy architektonicznej, to mechanizm wieloframeworkowości: zamiast adaptera, który dodaje warstwę abstrakcji, Formisch w czasie budowania zamienia właściwy reactivity primitive danego frameworka. Otrzymujesz prawdziwe React updates, prawdziwe Solid signals, natywną wydajność bez żadnej warstwy pośredniczącej.

Release Candidate oznacza, że core API i design są stabilne — nie będzie breaking changes przed wersją 1.0. RC harduje prace nad nested fields, field arrays i tuplesami, poprawia obsługę stanów dirty, touched i nowego stanu edited, a także dodaje convenience helpers takie jak isValid, isDirty i getDeepErrors.

**Key takeaways:**
- Schema-first z Valibot: jeden schemat generuje zarówno typy TypeScript jak i walidację runtime
- Zero adaptera — framework-specific reactivity jest wstrzykiwana w build time, nie w runtime
- Bundle startuje od 2.5 kB, granularne sygnały zapewniają, że renderują się tylko zmienione pola

**Why do I care:** Podejście "jeden schemat — sześć frameworków bez adaptera" jest technicznie imponujące i warte uwagi, szczególnie dla tych z nas, którzy budują design systemy lub biblioteki UI mające działać w różnych stackach. Pytanie, które zawsze zadaję przy bibliotekach formularzy, brzmi: czy sprawdza się przy naprawdę złożonych formularzach wielostronicowych z walidacją krzyżową między polami? Artykuł harduje edge case'y z RC, ale nie widzę jeszcze produkcyjnych case studies. Warto obserwować po 1.0.

**Link:** [Formisch v1 RC is now available](https://formisch.dev/blog/formisch-v1-release-candidate/)

---

## FokosDB — mocno spójna baza danych na Cloudflare Durable Objects

**TLDR:** Lambros Petrou zbudował bazę danych FokosDB na szczycie Cloudflare Durable Objects, inspirowaną Amazon DynamoDB. Oferuje silną spójność, nieograniczoną przestrzeń dyskową, automatyczne skalowanie i transakcje rozproszone — wszystko bez opuszczania platformy Cloudflare Workers.

**Summary:**

Cloudflare oferuje kilka rozwiązań storage: D1, Workers KV, R2, Hyperdrive i Durable Objects. Każde z nich ma swoje ograniczenia i żadne z nich nie spełniało jednocześnie wymagań silnej spójności, nieograniczonej pojemności, automatycznego skalowania i dobrych latencji. Lambros, który na co dzień pracuje w Cloudflare Developer Platform, postanowił zbadać granice własnej platformy i odpowiedzieć pytaniem: czy da się zbudować bazę klasy DynamoDB wyłącznie z Durable Objects?

FokosDB organizuje dane w B+tree partycji. Każda partycja to pojedynczy Durable Object, który może działać jako partycja hash lub range. Partycje hash kierują requesty do dzieci na podstawie klucza hash, partycje range na podstawie klucza sortowania. Gdy pojedyncza partycja przekroczy skonfigurowany próg pojemności, planowany jest podział na partycje potomne — partycja-rodzic staje się routerem i nie obsługuje już bezpośrednio operacji na danych. Gdy konkretny klucz hash odpowiada za zbyt duży udział w storage partycji, jest promowany do własnej root range partition, co pozwala na dalszy podział po kluczach sortowania.

Topologia partycji jest enkodowana za pomocą sukcyntowej struktury danych LOUDS (Level-Ordered Unary Degree Sequence), która całe drzewo hash partycji zapisuje w zaledwie dwa N plus jeden bitach, gdzie N to liczba partycji. Klient cache'uje ten kompaktowy encoding w Workers KV i może wysyłać requesty bezpośrednio do właściwej partycji, omijając traversal drzewa. Transakcje rozproszone zaimplementowane są na podstawie protokołu timestamp ordering z papieru Amazon DynamoDB USENIX ATC 2023.

Projekt jest nadal prototypem, nie przeznaczonym do produkcji. Autor uczciwie wymienia braki: brak optymalizacji z sekcji czwartej wspomnianego papieru DynamoDB, problemy z clock skew ograniczające przepustowość do jednej transakcji per kilka milisekund na element, brak stateless transaction coordinators. To jednak imponujące ćwiczenie architektoniczne, które przesuwa granice tego, co można zbudować na platformie serverless.

**Key takeaways:**
- B+tree hierarchia Durable Objects daje silną spójność i nieograniczone skalowanie storage bez zarządzania infrastrukturą
- Topologia enkodowana jest sukcyntowo w LOUDS, co pozwala Workers na bezpośredni routing do właściwej partycji z jednym hopem sieciowym
- Transakcje rozproszone implementują TSO z papier DynamoDB USENIX ATC 2023, choć brakuje jeszcze kilku kluczowych optymalizacji

**Why do I care:** To architektonicznie jeden z najciekawszych postów technicznych, które czytałem w tym kwartale. Ktoś zmusił Cloudflare Workers do zachowywania się jak DynamoDB, używając tylko prymitywów platformy. Ale jest jedno istotne zastrzeżenie, którego artykuł nie akcentuje wystarczająco mocno: latencja Durable Objects jest ograniczona lokalizacją, w której DO "wylądował" przy pierwszym requescie. W Europie jest lepiej, ale globalnie możesz trafić na DO w odległym regionie. Dopóki platforma nie doda API do przenoszenia lub klonowania DOs, ten problem jest strukturalny, a nie do obejścia w kodzie aplikacji.

**Link:** [FokosDB: A strongly consistent bottomless storage database ontop of Cloudflare Durable Objects](https://www.lambrospetrou.com/articles/fokosdb/)

---

## GitHub Actions: kroki w równoległe — koniec z sekwencyjnym wąskim gardłem

**TLDR:** GitHub Actions wprowadza obsługę równoległych kroków w ramach jednego joba, zastępując chaotyczne background shelling za pomocą ampersanda czterema nowymi słowami kluczowymi z oddzielnymi logami i kontrolowanym cyklem życia.

**Summary:**

Do tej pory każdy krok w GitHub Actions workflow wykonywał się sekwencyjnie — drugi krok nie zaczynał się, dopóki pierwszy nie skończył. Można było obejść to ograniczenie przez shell backgrounding z operatorem ampersand, ale takie rozwiązanie mieszało logi z wielu procesów w jeden strumień, co czyniło debugowanie koszmarnym doświadczeniem. Nowa funkcja usuwa to ograniczenie bez kompromisu na czytelność.

Wprowadzono cztery nowe słowa kluczowe. Słowo kluczowe background ustawione na true uruchamia krok asynchronicznie i natychmiast przechodzi do kolejnego kroku. Słowo kluczowe wait zatrzymuje wykonanie do momentu zakończenia jednego lub więcej konkretnych kroków działających w tle, a wait-all czeka na wszystkie poprzednie kroki działające w tle jednocześnie. Słowo kluczowe cancel gracefulnie kończy krok w tle, gdy nie jest już potrzebny — co jest szczególnie przydatne do zarządzania długo działającymi serwisami. Wreszcie parallel przyjmuje grupę kroków i konwertuje je do kroków tła z automatycznym wait po ich zakończeniu, co jest składniowym cukrem dla wzorca "uruchom te kroki jednocześnie, potem kontynuuj".

Praktyczne zastosowania są oczywiste: niezależne buildy uruchamiane równolegle, uruchomienie serwisu bazy danych w tle podczas kompilacji i testów, przesyłanie telemetrii w tle podczas pakowania artefaktów. To zmiany, na które wiele zespołów CI czekało od lat.

**Key takeaways:**
- Cztery nowe słowa kluczowe: background, wait, wait-all, cancel i parallel zapewniają pełną kontrolę nad równoległością kroków
- Kroki równoległe zachowują oddzielne logi, eliminując chaos mieszanych strumieni wyjścia
- parallel to syntactic sugar dla najpopularniejszego wzorca: uruchom kilka kroków jednocześnie, poczekaj na wszystkie

**Why do I care:** To długo oczekiwana zmiana, która sprawia, że GitHub Actions przestaje być first-class citizen tylko dla prostych pipeline'ów. Dotychczas każdy, kto potrzebował równoległości w ramach jednego joba, albo walczył z ampersandem i mieszanymi logami, albo rozbijał job na wiele jobów i płacił za to overhead startupowy każdego runnera. Nowe API jest czyste i przemyślane — szczególnie cancel dla serwisów tła to coś, czego brakowało mi w praktycznych scenariuszach testów integracyjnych.

**Link:** [Actions steps can now be run in parallel](https://github.blog/changelog/2026-06-25-actions-steps-can-now-be-run-in-parallel/)

---

## GPT-5.6 Sol — nowa generacja OpenAI z 700 000 godzin GPU przeznaczonych na red teaming

**TLDR:** OpenAI rozpoczęło ograniczony podgląd serii GPT-5.6 z trzema modelami: Sol (flagship), Terra (balanced) i Luna (fast/affordable). Sol to ich najmocniejszy model z nowym poziomem rozumowania max i trybem ultra, który wykorzystuje subagentów do równoległego przetwarzania złożonych zadań.

**Summary:**

OpenAI ogłosiło podgląd serii GPT-5.6, wprowadzając jednocześnie nowy schemat nazewnictwa: numer identyfikuje generację modelu, a nazwy Sol, Terra i Luna identyfikują trwałe warstwy możliwości, które mogą rozwijać się we własnym tempie. Sol to flagship, Terra to "balanced" odpowiednik GPT-5.5 w dwukrotnie niższej cenie, a Luna to model "fast and affordable" o mocno obniżonym koszcie.

Technicznie GPT-5.6 Sol wprowadza dwa nowe mechanizmy. Pierwszy to max reasoning effort, który daje modelowi więcej czasu na głębokie rozumowanie. Drugi to ultra mode, który wykracza poza możliwości pojedynczego agenta przez wykorzystanie subagentów do równoległego przyspieszenia złożonych zadań — co brzmi jak bezpośrednia konkurencja dla rozproszonych frameworków agentycznych. W benchmarkach Terminal-Bench 2.1, który testuje workflow wiersza poleceń wymagające planowania i koordynacji narzędzi, Sol ustawia nowy state of the art.

Inaczej niż przy poprzednich wydaniach, OpenAI zdecydowało na ograniczony phased release z udziałem rządu USA. Firma twierdzi, że nie uważa tego za pożądany długoterminowy model dystrybucji, ale uzasadnia go pracą nad ramami Executive Order dotyczącymi cyberbezpieczeństwa. Na bezpieczeństwo sol przeznaczono ponad 700 000 godzin A100-equivalent GPU na automatyczny red teaming, skupiony na znajdowaniu universal jailbreaks — ataków działających w wielu kontekstach, nie tylko w jednym wąskim ustawieniu.

Cennik: Sol to 5 dolarów za milion tokenów wejściowych i 30 za milion wyjściowych; Terra to 2.50 i 15 odpowiednio; Luna to 1 i 6. Nowe podejście do cache'owania wprowadza explicit cache breakpoints i minimalny czas życia cache wynoszący 30 minut.

**Key takeaways:**
- Trzy modele: Sol (flagship, $5/$30 per 1M tokenów), Terra (balanced, $2.50/$15) i Luna (fast, $1/$6)
- Ultra mode pozwala Sol na orkiestrację subagentów dla złożonych zadań — nowe podejście do możliwości agentycznych
- 700 000 godzin GPU na automated red teaming, skupiony na universal jailbreaks, a nie tylko na znanych failure modes

**Why do I care:** Nowy schemat nazewnictwa jest czytelniejszy niż dotychczasowy chaos z numerkami, o i mini i turbo. Ultra mode z subagentami to sygnał, że OpenAI przenosi orkiestrację agentów z warstwy aplikacji do warstwy modelu — co może wywrócić do góry nogami ekosystem framework agentycznych, które robią to samodzielnie. Phased release z rządową koordynacją to natomiast precedens, który warto obserwować uważnie: granica między "odpowiedzialnym wydaniem" a regulacyjną kontrolą jest tutaj bardzo wąska.

**Link:** [Previewing GPT-5.6 Sol: a next-generation model](https://openai.com/index/previewing-gpt-5-6-sol/)

---

## Spot the Bug: Intl.Collator zamiast operatorów porównania stringów

**TLDR:** Sortowanie tablicy obiektów po imieniu z użyciem standardowych operatorów porównania stringów daje wyniki poprawne technicznie, ale błędne kulturowo — znaki diakrytyczne jak Émile, Beyoncé czy Ólafur trafiają w nieoczekiwane miejsca. Rozwiązaniem jest Intl.Collator z sensitivity base.

**Summary:**

Zadanie z tego wydania Bytes to klasyczna pułapka JavaScript na programistów, którzy nie czytają specyfikacji do końca. Masz tablicę osób z imionami zawierającymi znaki diakrytyczne — Émile, Beyoncé, Ólafur, Zoë — i chcesz posortować ją alfabetycznie. Piszesz funkcję sortującą z operatorami mniejszości i większości do porównywania stringów. Kod wygląda poprawnie, działa bez błędów, ale wynik jest zły.

Problem polega na tym, że domyślne porównywanie stringów w JavaScript nie jest wrażliwe na język. Sortuje według code points Unicode, co oznacza, że litery z akcentami i diakrytykami trafiają poza zakres ASCII i lądują w miejscach zupełnie nieoczekiwanych dla użytkownika. Émile nie wyląduje obok Aarona ani nawet blisko E — bo jego bajt jest zupełnie inny niż zwykłego E.

Rozwiązaniem jest globalny obiekt Intl.Collator z flagą sensitivity ustawioną na base, który zapewnia locale-aware porównywanie stringów. To jeden z tych przypadków, gdzie platforma dostarcza właściwe narzędzie, ale trzeba wiedzieć, że istnieje — większość junior developerów o nim nie słyszała, a code review może to przeoczyć, bo kod jest syntaktycznie poprawny.

**Key takeaways:**
- Domyślne porównywanie stringów w JavaScript używa code points Unicode, nie reguł językowych
- Intl.Collator zapewnia locale-aware sortowanie, poprawnie obsługując znaki diakrytyczne i akcenty
- To subtelny bug, który nie wyrzuca błędu, ale produkuje błędne wyniki dla treści wielojęzycznej

**Why do I care:** To jeden z tych bugów, które można wdrożyć na produkcję i przez miesiące nie zauważyć, dopóki ktoś o imieniu Ólafur nie poskarży się, że jego konto zawsze ląduje gdzieś na dole listy. Intl jest dostępny natywnie we wszystkich nowoczesnych przeglądarkach i Node.js, więc nie ma żadnego usprawiedliwienia dla używania naiwnego porównywania stringów w interfejsach użytkownika, które obsługują treść wielojęzyczną. Warto to dodać do listy rzeczy, które sprawdzamy podczas code review.

**Link:** [Bytes #499 - Everything but the runtime](https://bytes.dev/archives/499)
