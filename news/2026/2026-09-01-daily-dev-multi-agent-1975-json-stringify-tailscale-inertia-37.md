---
title: "Architektura agentów z 1975 roku, JSON który okłamuje, Tailscale jako platforma i Inertia.js 3.7"
excerpt: "Cztery tematy z daily.dev: blackboard system z lat 70. jako pierwowzór multi-agentów, problem z JSON.stringify, Tailscale jako platforma do budowania, oraz nowości w Inertia.js 3.7."
publishedAt: "2026-09-01"
slug: "daily-dev-multi-agent-1975-json-stringify-tailscale-inertia-37"
hashtags: "#dailydev #ai #agents #architecture #javascript #typescript #networking #generated #pl"
source_pattern: "daily.dev"
---

## Najlepsza architektura multi-agentowa 2026 roku została zaprojektowana w 1975

**TLDR:** Autor dowodzi, że dzisiejsze najlepsze architektury multi-agentowe AI odtwarzają system tablicowy HEARSAY-II z 1975 roku i model aktorów Carla Hewitta. Oba pomysły umarły, bo wymagały ręcznego programowania modułów ekspertowych, a to jest właśnie ograniczenie, które usuwają duże modele językowe.

**Summary:** HEARSAY-II był systemem rozpoznawania mowy budowanym w Carnegie Mellon w latach 70. Jego twórcy wymyślili architekturę tablicową: wspólną przestrzeń, na którą niezależne moduły ekspertowe wpisywały hipotezy, obserwowały się nawzajem i reagowały na zmiany. Równolegle Carl Hewitt opracowywał model aktorów, w którym niezależne jednostki komunikują się wyłącznie komunikatami, bez współdzielonego stanu. Autor artykułu, twórca runtime'u agentowego Mozaik i autonomicznego agenta kodującego baro, zestawia własne doświadczenia z tymi dwoma pomysłami i dochodzi do wniosku, że różnica między porażką z lat 70. a sukcesem dzisiejszych systemów multi-agentowych nie leży w architekturze, tylko w tym, kto pisze moduły ekspertowe.

W HEARSAY-II każdy moduł ekspertowy (rozpoznawanie fonemów, słów, składni) trzeba było ręcznie zaprogramować i zestroić. To była fizyczna bariera skalowania: więcej wiedzy domenowej oznaczało więcej programistów piszących kod eksperta. LLM usuwają tę barierę, bo sam model może odgrywać rolę dowolnie wielu ekspertów, generowanych na żądanie przez prompt, a nie przez tygodnie inżynierii. Autor przeprowadza tę architekturę przez tetradę Marshalla McLuhana (co wzmacnia, co unieważnia, co przywraca, co odwraca), żeby pokazać, że multi-agentowość jako medium wzmacnia współbieżność i świadomość kontekstu, unieważnia rolę pojedynczego dużego modelu monolitycznego, przywraca ideę wyspecjalizowanych, współpracujących ekspertów znaną z systemów eksperckich lat 80., i przy nadużyciu odwraca się w chaos komunikacyjny, gdy agentów jest zbyt wiele bez dyscypliny protokołu.

Tekst jest częściowo materiałem promującym hackathon, ale sama teza historyczna trzyma się dobrze: jeśli ktoś zajmuje się teraz projektowaniem systemów wieloagentowych, dobrze zrobi, sięgając po literaturę o blackboard systems i actor model, bo tam są rozwiązane już problemy z synchronizacją, priorytetyzacją hipotez i unikaniem zapętleń komunikacyjnych, które wiele zespołów odkrywa teraz na nowo metodą prób i błędów.

**Key takeaways:**
- HEARSAY-II (1975) i model aktorów Hewitta miały współbieżność, świadomość kontekstu i adaptowalność, ale wymagały ręcznie programowanych modułów ekspertowych.
- LLM usuwają barierę ręcznego programowania ekspertów, bo model sam odgrywa rolę dowolnej liczby wyspecjalizowanych agentów.
- Literatura o blackboard systems i actor model zawiera już rozwiązania problemów synchronizacji i komunikacji, które dzisiejsze zespoły odkrywają od nowa.

**Why do I care:** Jako architekt frontendowy, który ostatnio częściej projektuje przepływy agentowe niż komponenty UI, traktuję to jako przypomnienie, że najwięcej dobrych wzorców do orkiestracji agentów już istnieje, tylko nazywało się inaczej i leżało w podręcznikach z lat 70. i 80. Zamiast wymyślać własny protokół komunikacji między agentami od zera, warto najpierw sprawdzić, jak to rozwiązywał blackboard system, bo tam problem "kto ma priorytet do zapisu" był już raz dogłębnie przemyślany.

**Link:** [The Best Multi-Agent Architecture of 2026 Was Designed in 1975](https://daily.dev/posts/WOQZTduc5)

## Encode, don't stringify - jak JSON.stringify cię okłamuje

**TLDR:** JSON.stringify potrafi po cichu psuć dane: Infinity i NaN zamienia w null, gubi nieznane klucze, niszczy Mapy i Sety, a na BigInt się wywala. Autor proponuje podejście "encode, don't stringify", czyli enkoder oparty na schemacie zamiast surowego JSON.stringify, i prezentuje własną bibliotekę Sury jako najszybszą i najbardziej kompletną opcję.

**Summary:** Problem jest znany każdemu, kto choć raz serializował obiekt z datą, Mapą albo liczbą Infinity i dostał na wyjściu coś zupełnie innego, niż się spodziewał, bez żadnego ostrzeżenia. JSON.stringify nie tylko milczy przy takich stratach danych, ale też nie mówi, w którym miejscu struktury coś poszło nie tak, gdy walidacja się nie powiedzie. Autor porównuje to do sytuacji, którą kilka lat temu rozwiązało hasło "parse, don't validate" w kontekście danych wejściowych: zamiast walidować i liczyć na to, że programista pamięta o wszystkich przypadkach brzegowych, lepiej mieć typ, który fizycznie nie pozwala na błędny stan.

Analogicznie "encode, don't stringify" oznacza użycie enkodera zbudowanego wokół schematu danych, który wie, czego się oczekuje na wyjściu, i dzięki temu potrafi poprawnie obsłużyć BigInt, Mapy, Sety czy pola, których w ogóle nie zadeklarowano w typie. Artykuł przegląda istniejące na rynku rozwiązania tego problemu: compile-json-stringify, json-accelerator, devalue, superjson, typia, fast-json-stringify, kodeki Zod i Effect Schema, porównując je pod kątem poprawności, rozmiaru bundla i wydajności w konkretnych benchmarkach.

Na tym tle autor przedstawia Sury, własną bibliotekę schematów, jako opcję najszybszą i najbardziej kompletną z benchmarkami i przykładami kodu. To jest oczywiście też forma promowania własnego projektu, ale sam problem, który opisuje, jest realny i dotyka każdego zespołu wysyłającego dane przez API, cache czy localStorage bez świadomości, że domyślny serializator w JavaScripcie ma twarde ograniczenia.

**Key takeaways:**
- JSON.stringify zamienia Infinity/NaN na null, gubi nieznane klucze, niszczy Mapy i Sety, a przy BigInt się wywala.
- Podejście "encode, don't stringify" wykorzystuje enkoder schema-driven, analogicznie do "parse, don't validate" dla danych wejściowych.
- Sury, biblioteka autora, ma wypadać najlepiej w benchmarkach poprawności, rozmiaru bundla i wydajności wśród porównywanych rozwiązań (compile-json-stringify, devalue, superjson, typia, Zod, Effect Schema).

**Why do I care:** To jest jeden z tych problemów, które ujawniają się dopiero w produkcji, kiedy klient zgłasza, że jego dane "gdzieś zniknęły", a debugowanie prowadzi do jednej linijki JSON.stringify(payload). Jeżeli w projekcie już używam Zoda albo Effect Schema do walidacji wejścia, sensowne jest sprawdzenie, czy te same biblioteki oferują też enkodowanie wyjścia, zamiast zostawiać to domyślnemu, milczącemu JSON.stringify.

**Link:** [Encode, don't stringify - how JSON.stringify lies to you](https://daily.dev/posts/J6h30gG2Z)

## Budowanie z Tailscale: tsnet, API i automatyczne udostępnianie

**TLDR:** Tailscale przechodzi z bycia siecią, którą się konfiguruje, w platformę, na której się buduje. Biblioteka tsnet pozwala wbudować łączność Tailscale bezpośrednio w aplikację, a Tailnets API umożliwia programowe tworzenie izolowanych tailnetów na żądanie.

**Summary:** Dotychczas Tailscale był po prostu klientem VPN, który instalowałeś na maszynie i który dawał jej jedną, wspólną tożsamość sieciową. Biblioteka tsnet w Go zmienia ten model, bo pozwala zaimportować łączność Tailscale prosto do kodu aplikacji: każda aplikacja dostaje własną tożsamość w tailnecie, własną nazwę MagicDNS i automatycznie wystawiony certyfikat TLS, bez otwierania portów i bez proxy. Praktyczny przykład z artykułu to Ollama, która domyślnie nasłuchuje tylko na 127.0.0.1, a dzięki tsnet można ją bezpiecznie wystawić do własnego tailnetu bez żadnego reverse proxy i bez otwierania portu na świat.

Na horyzoncie jest też tailscale-rs w fazie pre-alpha, obiecujące bindingi dla Rust, Pythona, Elixira i C, co sugeruje, że Tailscale traktuje to jako strategiczny kierunek, a nie eksperyment ograniczony do jednego ekosystemu. Równolegle rozwija się warstwa automatyzacji: Tailnets API pozwala zespołom tworzyć izolowane tailnety na żądanie przez proste żądanie POST z tokenem OAuth, co ma sens dla izolacji per-klient albo per-środowisko testowe, gdzie sieć powstaje i jest sprzątana automatycznie wraz z cyklem życia testu.

Nowy panel administracyjny korzysta z tych samych API, więc rotacja kluczy, aktualizacje ACL i provisioning mogą być skryptowane, a nie klikane ręcznie w konsoli. Ostatnia nowość, Declarative Node Sharing, zamienia ręczne udostępnianie zasobów między tailnetami w politykę zarządzaną w stylu GitOps, choć na razie jest dostępna tylko przez listę oczekujących.

**Key takeaways:**
- tsnet w Go daje aplikacji własną tożsamość w tailnecie, MagicDNS i automatyczny certyfikat TLS bez otwierania portów.
- Tailnets API pozwala programowo tworzyć izolowane tailnety per klient, środowisko czy test, z automatycznym sprzątaniem po zakończeniu.
- Declarative Node Sharing wprowadza zarządzanie udostępnianiem zasobów w stylu GitOps, obecnie dostępne przez listę oczekujących.

**Why do I care:** Ekipy DevOps i backendowe regularnie walczą z tym samym problemem: jak bezpiecznie wystawić wewnętrzną usługę bez tuneli SSH i bez otwierania portów na firewall. tsnet rozwiązuje to elegancko na poziomie aplikacji, a nie infrastruktury, co oznacza mniej ruchomych części do utrzymania. Jeśli mój zespół używa Tailscale do łączenia środowisk deweloperskich, warto już teraz przeanalizować migrację z klasycznego klienta VPN na tsnet, zwłaszcza dla usług, które i tak trzeba było owijać w reverse proxy.

**Link:** [Build with Tailscale using tsnet, APIs, and automated sharing](https://daily.dev/posts/gmYBVeUTl)

## Anulowanie żądań formularzy w Inertia.js 3.7

**TLDR:** Inertia.js 3.7.0 dodaje atrybut cancelOnUnmount i metodę cancel do komponentu Form, dzięki czemu można przerwać wysyłkę formularza przy odmontowaniu komponentu albo kliknięciem przycisku. usePoll dostaje reaktywną wartość informującą, czy odpytywanie jest aktywne.

**Summary:** Do teraz zamknięcie modala z formularzem w trakcie wysyłki nie przerywało żądania, więc serwer i tak kończył przetwarzanie w tle, mimo że użytkownik już dawno zobaczył inny ekran. Nowy atrybut cancelOnUnmount w komponencie Form, dostępny w adapterach Vue, React i Svelte, domyślnie ma wartość false, więc istniejące formularze zachowują się tak jak dotychczas, ale programista może świadomie włączyć automatyczne anulowanie przy odmontowaniu.

Do tego dochodzi nowa metoda cancel, wystawiona przez slot props, ref i kontekst komponentu Form, którą można podłączyć bezpośrednio pod przycisk "Anuluj" przy dużym uploadzie. Wcześniej komponent Form korzystał wewnętrznie z useForm(), ale nigdy nie udostępniał tej metody na zewnątrz, więc każdy zespół musiał wymyślać własne obejścia z ręcznym śledzeniem kontrolera żądania.

Zmienił się też sposób działania usePoll: wcześniej hook zwracał tylko funkcje start i stop, co zmuszało programistów do trzymania osobnego boolowskiego stanu zsynchronizowanego z autoStart, żeby zbudować UI z pauzą i wznowieniem odpytywania. Teraz usePoll zwraca reaktywną wartość polling, która odzwierciedla, czy odpytywanie faktycznie działa, a nie tylko czy jest w danym momencie żądanie w toku, więc wartość zostaje true między poszczególnymi requestami. Poza tym naprawiono trzy błędy: nieaktualne propsy po użyciu przycisku wstecz/dalej w React, problemy z identycznością propsów w replaceProp/appendToProp/prependToProp oraz crash przy odmontowaniu Form w React.

**Key takeaways:**
- cancelOnUnmount i metoda cancel w komponencie Form pozwalają przerwać wysyłkę formularza przy odmontowaniu albo ręcznie.
- usePoll zwraca teraz reaktywną wartość polling, która trzyma się true między żądaniami, więc UI pauzy/wznowienia nie wymaga własnego stanu.
- Naprawiono błąd stale props po back/forward w React oraz crash Form przy odmontowaniu.

**Why do I care:** To są dokładnie te drobne, praktyczne API, których brak zawsze wychodzi w produkcji przy dużych uploadach albo formularzach w modalach. Jeśli mój zespół pracuje z Laravelem i Inertia.js, warto od razu zaktualizować i podłączyć cancelOnUnmount tam, gdzie formularze żyją w modalach, bo koszt tej zmiany jest minimalny, a eliminuje realny problem wisienia requestów po zamknięciu widoku.

**Link:** [Cancel In-Flight Form Submissions in Inertia.js v3.7](https://daily.dev/posts/BWNGCqLPR)
