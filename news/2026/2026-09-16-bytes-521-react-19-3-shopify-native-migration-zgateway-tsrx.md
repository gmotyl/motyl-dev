---
title: "Bytes #521: React 19.3, agenci na produkcji i koniec React Native w Shopify"
excerpt: "React 19.3 stabilizuje View Transitions i Fragment Refs, Shopify przechodzi z React Native na kod natywny, Meta opisuje proxy ZGateway, a do tego workflow zarządzania agentami, cache-mode w GitHub Actions, plugin Convex i nowy język TSRX."
publishedAt: "2026-09-16"
slug: "bytes-521-react-19-3-shopify-native-migration-zgateway-tsrx"
hashtags: "#uidev #react #react-19 #nodejs #architecture #agents #github-actions #convex #generated #pl"
source_pattern: "ui.dev"
---

## React 19.3

**TLDR:** React 19.3 stabilizuje View Transitions i Fragment Refs, dodaje wsparcie dla Trusted Types i pozwala renderować Context bezpośrednio w Server Components bez dodatkowego komponentu Provider.

**Summary:** Komponent ViewTransition pozwala animować wejście, wyjście, przesunięcie i zmianę rozmiaru elementów przy użyciu natywnego View Transition API przeglądarki, i po roku bycia eksperymentalnym API trafia teraz do stabilnej wersji. Animacje uruchamiają się tylko dla aktualizacji oznaczonych jako Transition, więc pilne zmiany stanu nie zaczynają nagle migać animacjami, których nikt nie chciał. Nowa funkcja addTransitionType pozwala różnicować animację w zależności od przyczyny tej samej zmiany stanu, na przykład karuzela idąca do przodu animuje się od prawej, a do tyłu od lewej, mimo że oba przypadki ustawiają ten sam numer slajdu.

Fragment Refs rozwiązują problem, który każdy, kto pracował z komponentami renderującymi rodzeństwo bez wspólnego rodzica, dobrze zna: jak podpiąć nasłuchiwacz zdarzeń albo przenieść fokus, gdy nie ma jednego elementu DOM do podpięcia refa. Przekazanie refa bezpośrednio do Fragment daje dostęp do FragmentInstance z metodami takimi jak focus, observeUsing czy getClientRects, które działają na grupie dzieci fragmentu jako całości.

Do tego dochodzi wsparcie dla przeglądarkowego API Trusted Types, które pomaga zapobiegać atakom XSS opartym na DOM, oraz możliwość renderowania Context bezpośrednio w Server Components bez pisania osobnego komponentu Provider, który wcześniej służył wyłącznie do przekazania jednej propsy dalej.

**Key takeaways:**
- View Transitions i Fragment Refs są teraz stabilne, po roku w wersji eksperymentalnej.
- addTransitionType pozwala różnicować animację w zależności od kontekstu tej samej zmiany stanu.
- Server Components mogą teraz renderować Context bezpośrednio, bez dodatkowego komponentu Provider.

**Why do I care:** Fragment Refs to konkretna odpowiedź na coś, co wcześniej wymagało dokładania zbędnego diva tylko po to, żeby mieć gdzie podpiąć ref, co psuło layout albo stylowanie. Jeśli pracujesz z bibliotekami komponentów, które nie eksponują własnego prop ref, to jest realne narzędzie, a nie kosmetyka. Usunięcie boilerplate'owego Providera w Server Components też jest małą, ale odczuwalną zmianą w codziennej pracy.

**Link:** [React 19.3 – React](https://react.dev/blog/2026/09/09/react-19-3)

## Jak zarządzam flotą agentów

**TLDR:** Autor opisuje swój system zarządzania flotą agentów kodujących: plany jako pliki markdown w repozytorium, długo działający koordynatorzy zamiast pojedynczych agentów, oraz cykliczny retro, który uczy się na błędach i sam proponuje zmiany w skillach.

**Summary:** System zaczyna się od jednej komendy plan-init, która tworzy strukturę katalogów: drafts, next, open, done, discarded, plus plik README.md jako indeks. Każdy pomysł albo zgłoszenie trafia najpierw do drafts przez plan-add, bez żadnych decyzji, tylko po to, żeby nie zgubić myśli. Gdy przychodzi czas na działanie, plan-write zamienia szkic w plan, który agent może zrealizować bez dopytywania o decyzje projektowe, po czym plan trafia do next, a plan-dispatch przekazuje go do wykonania.

Ciekawsza część to koordynatorzy, długo działający agenci wprowadzeni w Cursor Projects, którzy sami nie piszą kodu, tylko kierują agentami, które to robią. Koordynator ma dostęp do notes.md jako dynamicznego README swojego projektu, folderu docs dla ludzi, internal na notatki robocze agenta oraz globalnego User Context ze wspólnymi preferencjami i skillami. Koordynatorzy subskrybują pull requesty, kanały Slacka i harmonogramy, więc budzą się, gdy CI się kończy albo przychodzi komentarz recenzenta, i wysyłają agenta z powrotem do poprawek.

Ponieważ koordynatorzy nie mogą się ze sobą komunikować bezpośrednio ani czytać nawzajem swojego kontekstu, zostawiają sobie wiadomości w repozytorium git, w plikach inbox z czterema obowiązkowymi liniami: od kogo, do kogo, kiedy i dlaczego. Domyka to wszystko plan-retro, które przegląda zakończone plany i transkrypty rozmów, szuka powtarzających się nieporozumień i proponuje konkretną zmianę w skillu, zamiast zostawiać wnioski tylko w czyjejś głowie.

**Key takeaways:**
- Plany jako pliki markdown w repozytorium dają historię za darmo i pozwalają agentom oraz ludziom współpracować nad tym samym artefaktem.
- Długo działający koordynatorzy subskrybują PR-y, kanały i harmonogramy, więc reagują sami, bez ręcznego odpytywania.
- plan-retro zamyka pętlę zwrotną, przeglądając zakończone plany i proponując konkretne zmiany w skillach na podstawie powtarzających się błędów.

**Why do I care:** To pierwszy opis workflow z agentami, który traktuje "co zrobić, gdy mam już dziesiątki równoległych zadań" jako realny problem inżynierski, a nie tylko demo na jedno zadanie naraz. Mechanizm handoffów w git między koordynatorami, które nie mogą się komunikować bezpośrednio, to konkretny wzorzec, który da się skopiować bez czekania na konkretne narzędzie od Cursora, wystarczy replikować strukturę katalogów i konwencję nazewnictwa.

**Link:** [How I manage my agents](https://arslan.io/2026/09/11/how-i-manage-my-agents/)

## Migracja Shop app z React Native do kodu natywnego

**TLDR:** Shopify przeniosło aplikację Shop z React Native na w pełni natywny kod, Swift i Kotlin, bo agenci kodujący sprawili, że osobne budowanie dla iOS i Androida przestało być kosztem nie do przyjęcia. Efekt: krótszy czas startu, dziesięciokrotny spadek liczby awarii sesji i mniejsza binarka na Androidzie.

**Summary:** Shop app korzystał z React Native od swojego powstania w 2020 roku, obsługując setki milionów klientów i miliony sprzedawców. Bezpośrednim wyzwalaczem migracji było to, że kolejna duża inwestycja w React Native, przejście na New Architecture, wymagałaby przebudowy integracji z modułami natywnymi i granic między kodem współdzielonym a platformowym. Zanim zdecydowano się na pełną migrację, jeden inżynier spędził tydzień, sprawdzając z agentami kodującymi, ile da się odtworzyć z istniejącej aplikacji React Native bezpośrednio w SwiftUI. Wynik nie był gotowy do produkcji, ale wystarczył, żeby przekonać zespół do dalszych kroków.

Sześciu inżynierów zbudowało natywne fundamenty i główne ścieżki użytkownika, a zespoły funkcjonalne dołączyły w połowie procesu, żeby zweryfikować swoje obszary. Priorytetem było zachowanie zarówno zachowania funkcji, jak i zdarzeń analitycznych, od których zależały systemy działające dalej w łańcuchu, na przykład rekomendacje.

Liczby są konkretne: czas startu na zimno spadł o 23% na iOS i o 50% na Androidzie, stabilność sesji wzrosła z 99,5% do ponad 99,95%, co oznacza dziesięciokrotny spadek liczby awarii. Wielkość binarki na Androidzie spadła o 109 MB, czyli 37%, a na iOS wzrosła nieznacznie o 1 MB. Czas budowania na Androidzie spadł o około 75%.

Zespół zbudował też własne narzędzie do debugowania o nazwie Tardis, które daje agentom strukturalny dostęp do zdarzeń, logów i stanu żywej aplikacji, oraz możliwość wysyłania do niej komend, dzięki czemu porównania React Native kontra wersja natywna mogły być weryfikowane automatycznie zamiast ręcznie. Autorzy podkreślają jednocześnie, że wygenerowany kod potrafił spełniać wymagania funkcjonalne, a mimo to wprowadzać duplikację albo problemy z wydajnością, więc wiedza platformowa, lintowanie, testy i code review zostały, tylko przesunęły się w inne miejsce procesu.

**Key takeaways:**
- Postęp w agentach kodujących zmienił bilans kosztów: osobne budowanie dla iOS i Androida stało się opłacalne, mimo utraty współdzielonego kodu.
- Wyniki są mierzalne: 23-50% krótszy czas startu, dziesięciokrotny spadek awarii sesji, mniejsza binarka na Androidzie o 37%.
- Ekspertyza platformowa i tradycyjne praktyki jakości pozostały niezbędne, tylko zmieniły miejsce w procesie.

**Why do I care:** To rzadki przypadek studium migracji z twardymi liczbami zamiast anegdot o tym, że AI zmieniło wszystko. Warto zwrócić uwagę na szczegół: agenci byli najskuteczniejsi, gdy mieli istniejącą implementację jako punkt odniesienia, a nie gdy budowali coś od zera. To praktyczna wskazówka dla każdego, kto planuje podobną migrację: nie oczekuj takiej samej skuteczności agenta przy projekcie od zera, jak przy przepisywaniu czegoś, co już działa.

**Link:** [Migrating Shop app from React Native to native (2026)](https://shopify.engineering/shop-app-migration)

## ZGateway: proxy przed ZippyDB w Meta

**TLDR:** Meta opisuje ZGateway, bezstanowy proxy postawiony przed ZippyDB, ich najczęściej używanym key-value store, który redukuje liczbę połączeń o niemal 98% na parę host-host i dodaje batchowanie, izolację tenantów oraz odporność międzyregionalną w jednym miejscu zamiast w milionie klientów.

**Summary:** ZippyDB obsługuje miliardy operacji na sekundę na w pełni rozproszonej flocie, a jego klientem może być dowolny z ponad miliona hostów należących do setek zespołów, których nie da się szybko zmienić. W modelu bezpośredniego dostępu każdy klient łączył się z każdym potrzebnym hostem bazy, co tworzyło gęstą siatkę połączeń TLS: pojedynczy klient utrzymywał dziesiątki tysięcy połączeń wychodzących, a pojedynczy host bazy przyjmował podobną liczbę połączeń przychodzących. To marnotrawstwo i kruchość, bo każde otwarte połączenie zużywa pamięć, CPU i deskryptor pliku, głównie w bezczynności, a nagły spadek liczby ponownie wykorzystywanych połączeń uderza we flotę falą nowych połączeń. Meta prześledziła awarie hostów z powodu wyczerpania deskryptorów plików i OOM dokładnie do tego mechanizmu.

ZGateway to bezstanowy proxy między klientami a flotą baz, obsługujący ponad miliard operacji na sekundę i przenoszący około 40% całego ruchu ZippyDB, z projekcją wzrostu powyżej 60%, przy koszcie obliczeniowym rzędu 6%. Kluczowa jest asymetria liczby połączeń: klient potrzebuje tylko puli połączeń do swojego regionalnego ZGateway, a każdy serwer bazy widzi połączenia wyłącznie z floty ZGateway, której rozmiar Meta kontroluje bezpośrednio. Model matematyczny pokazuje spadek liczby połączeń na hosta o 97-98%, a łączna liczba trwałych połączeń w całym systemie spada około 19-krotnie.

Poza samą redukcją połączeń, ZGateway grupuje żądania kierowane do tego samego shardu w jeden backendowy RPC i łączy jednoczesne żądania o ten sam klucz w jedno zapytanie, dzięki czemu nawet bardzo popularny klucz nie zamienia się w lawinę zapytań do jednej repliki. Dochodzi do tego Discriminant Load Shedding, który izoluje hałaśliwych tenantów: w kontrolowanym teście przeciążenia przy ponad 90% CPU i około 1350 aktywnych kubełkach tenantów, tylko 6 rzeczywiście hałaśliwych zaczęło tracić żądania, a pozostałe 1344 wykonały 99,9% swoich żądań bez odrzuceń.

**Key takeaways:**
- Proxy w jednym miejscu rozwiązuje problem, którego nie da się naprawić po stronie klienta, bo dwie floty, klientów i baz, zmieniają się niezależnie od siebie.
- Batching i coalescing na poziomie proxy łączą pracę wielu niepowiązanych klientów, czego biblioteka po stronie klienta nigdy nie mogła zrobić.
- Discriminant Load Shedding izoluje hałaśliwych tenantów strukturalnie, a nie na zasadzie szczęścia: w teście przeciążenia tylko rzeczywiści winowajcy tracili żądania.

**Why do I care:** Ten artykuł jest wartościowy nawet jeśli nigdy nie zbudujesz systemu tej skali, bo pokazuje ogólny wzorzec: kiedy masz dużą, zróżnicowaną populację klientów rozmawiającą ze współdzielonym zasobem, proxy jest jedynym miejscem, w którym da się rozwiązać problem raz, zamiast rozwiązywać go w każdym kliencie z osobna. To ten sam argument, który stoi za service mesh, poolerem połączeń do bazy czy API gateway, tylko podany z liczbami z produkcji na skalę Meta.

**Link:** [ZGateway: Learnings from Putting a Proxy in Front of ZippyDB](https://engineering.fb.com/2026/09/03/core-infra/zgateway-proxy-zippydb-meta/)

## GitHub Actions dodaje cache-mode

**TLDR:** GitHub Actions dodaje cache-mode, który pozwala ograniczyć dostęp do cache'u na poziomie workflow albo joba do odczytu, zapisu, tylko zapisu albo braku dostępu, co ogranicza ryzyko cache poisoning przy zdarzeniach niskiego zaufania jak pull_request_target.

**Summary:** Ustawienia na poziomie joba nadpisują ustawienia na poziomie workflow, a wybrany tryb jest egzekwowany przez sam serwis cache'u i przenosi się przez reużywalne workflow, gdzie wywoływany workflow nie może dostać większego dostępu do cache'u niż przyznał mu wywołujący. Domyślnie zdarzenia niskiego zaufania jak pull_request_target dostają tryb read, a zdarzenia zaufane jak push dostają write. Jawne zadeklarowanie write albo write-only dla zdarzeń niskiego zaufania podnosi ryzyko cache poisoning, więc GitHub Actions dodaje wtedy ostrzeżenie w logu.

**Key takeaways:**
- cache-mode przyjmuje wartości read, write, write-only i none, konfigurowalne na poziomie workflow lub joba.
- Reużywalne workflow nie mogą dostać większego dostępu do cache'u niż przyznał im wywołujący workflow.
- Funkcja jest już ogólnie dostępna na wszystkich planach GitHub.

**Why do I care:** To drobna, ale konkretna poprawka bezpieczeństwa łańcucha dostaw. Jeśli twój workflow reaguje na pull_request_target, a wiele integracji z forkami tego wymaga, warto świadomie ustawić cache-mode zamiast polegać na domyślnych ustawieniach, bo to jeden z tych mechanizmów, o których pamięta się dopiero po incydencie.

**Link:** [Control GitHub Actions cache access with cache-mode](https://github.blog/changelog/2026-09-10-control-github-actions-cache-access-with-cache-mode/)

## Oficjalny plugin Convex dla agentów kodujących

**TLDR:** Convex wydało oficjalny plugin dla Cursora i Claude Code z 18 regułami dobrych praktyk, 6 wyspecjalizowanymi skillami i hookami, które automatycznie sprawdzają typy przed uznaniem zadania za zakończone, choć w Cursorze mechanizm ten jest pętlą ponawiania, a nie twardą blokadą.

**Summary:** Plugin dostarcza 18 reguł aktywnych przez cały czas, dotyczących optymalizacji zapytań, walidacji argumentów, kontroli dostępu, projektowania schematu i podobnych tematów, plus 6 skilli na żądanie: quickstart, budowanie schematu, tworzenie funkcji, konfigurację autoryzacji i migracje. Najciekawsza część to hooki deweloperskie: sprawdzenie przed commitem, blokujące, łapie użycie Date.now() wewnątrz zapytań i łańcuchowe filter zamiast indeksów, a hook końca tury uruchamia sprawdzenie typów kompilatora i jeśli się nie powiedzie, automatycznie wysyła agentowi kolejną turę z błędami do naprawienia.

Dokumentacja jest niezwykle szczera co do ograniczeń tego mechanizmu: Cursor nie ma hooka blokującego zakończenie tury tak, jak robi to Stop hook w Claude Code, więc końcowa weryfikacja to pętla ponawiania ograniczona do dwóch prób, a nie twarda brama. Użytkownik, który zignoruje wiadomość zwrotną albo wyczerpie limit pętli, może i tak zakończyć sesję z niedziałającym buildem.

**Key takeaways:**
- Plugin łączy stałe reguły, skille na żądanie i dwa hooki Cursora, w tym blokujące sprawdzenie przed commitem.
- Weryfikacja końca tury uruchamia sprawdzenie typów i automatycznie odsyła agenta do poprawek, ale to pętla ponawiania z limitem, nie twarda blokada.
- Dokumentacja projektu wprost porównuje siłę tego mechanizmu do Stop hooka w Claude Code i blokującego wywołania narzędzia w Codexie, i przyznaje, że Cursor wypada tu słabiej.

**Why do I care:** Szczerość dokumentacji co do ograniczeń tego mechanizmu jest rzadka i warta odnotowania, bo większość marketingu narzędzi AI-dev udaje, że każdy hook jest twardą gwarancją. Jeśli pracujesz z Convex i Cursorem, warto wiedzieć, że koniec tury nie oznacza tu "zweryfikowane", tylko "zaproponowano poprawkę, którą można zignorować".

**Link:** [GitHub - get-convex/convex-agent-plugins](https://github.com/get-convex/convex-agent-plugins)

## TSRX: TypeScript dla deklaratywnych UI

**TLDR:** TSRX to rozszerzenie języka TypeScript do pisania deklaratywnych UI, spadkobierca JSX, które kompiluje się do Reacta, Preacta, Solida, Vue i innych celów, i stawia na współlokalizację logiki, stylów i struktury w jednym pliku, żeby ułatwić pracę zarówno ludziom, jak i modelom językowym.

**Summary:** TSRX zachowuje pełną kompatybilność wsteczną z TypeScript i JSX, ale przenosi kontrolę przepływu, zakresowe style i kontenery instrukcji do szablonu jako składnię pierwszej klasy, zamiast wciskać je przez sloty wyrażeń. Kompiluje się dziś do Octane, Reacta, Preacta, Ripple, Solida i Vue, z możliwością dodawania kolejnych celów, i można importować moduły tsrx bezpośrednio z plików JS, TS i TSX.

Autorzy wprost powołują się na badanie "Lost in the Middle", pokazujące, że modele językowe nierówno rozkładają uwagę na długi kontekst i radzą sobie lepiej, gdy powiązane informacje leżą blisko siebie, a nie są rozrzucone po całym pliku. Strukturalna zasada TSRX, najpierw setup w TypeScript, potem jeden węzeł wyjściowy, ma dokładnie to wymuszać: mniej trójargumentowych operatorów, mniej łańcuchów map i pomocniczych funkcji renderujących.

Projekt ma już serwer językowy do diagnostyki i nawigacji w edytorze, wtyczki Prettier i ESLint, rozszerzenie do Zeda, a wtyczka do JetBrains czeka na recenzję w ich marketplace.

**Key takeaways:**
- TSRX to nadzbiór TypeScript i JSX, kompilujący się do wielu frameworków z jednego źródła.
- Projekt wprost odwołuje się do badań nad ograniczeniami uwagi LLM w długim kontekście jako uzasadnienia dla współlokalizacji kodu.
- Narzędzia edytorskie są już gotowe, JetBrains w toku.

**Why do I care:** To kolejna próba rozwiązania tego samego problemu co Svelte czy Vue SFC, tylko z jawnie wymienionym argumentem, że to też ułatwia pracę agentom AI. Warto to obserwować z dystansu: dodawanie kolejnej warstwy kompilacji nad JSX to spory koszt utrzymania dla zespołu, i na razie nie widać, czy zyski przewyższą ryzyko związania się z jeszcze jednym niszowym językiem.

**Link:** [TSRX | TypeScript Language Extension for Declarative UI](https://tsrx.dev/)
