---
title: "Bytes #536: Parcel 3 w Rauście, utwardzanie GitHub Actions i Remix 3.2"
excerpt: "Parcel 3 alpha jest do 100 razy szybszy od dwójki, Socket opisuje dziewięć zabezpieczeń dla GitHub Actions, a Remix dostaje CSP z nonce."
publishedAt: "2026-11-07"
slug: "bytes-536-parcel-3-github-actions-remix-3-2"
hashtags: "#uidev #frontend #javascript #rust #security #github-actions #nodejs #remix #ai #generated #pl"
source_pattern: "ui.dev"
---

## Parcel 3 alpha, czyli przepisanie bundlera w całości na Rusta

**TLDR:** Zespół Parcela wypuścił pierwszą wersję alfa trójki. To samodzielny plik binarny napisany w Ruście, bez zależności od Node, i według autorów nawet 100 razy szybszy od Parcela 2. Wtyczki można pisać w Ruście, Go, Swifcie albo C, a dla prostych przypadków jest wbudowany silnik JavaScript.

**Summary:** W Parcelu 2 w Ruście przepisano tylko wybrane elementy, na przykład kompilator JavaScript oparty na SWC i Lightning CSS. Rdzeń nadal działał w JavaScripcie, więc rozmiar pamięci, wyrzucanie śmieci i serializacja danych między procesami ograniczały wydajność. Trójka usuwa ten problem, bo CLI, serwer deweloperski, transformery i bundler to jeden natywny program. Autorzy podają zimne buildy w dużym monorepo React Spectrum. Storybook buduje się w 572 milisekundy zamiast 16,6 sekundy, strona z dokumentacją w 810 milisekund zamiast prawie 88 sekund, a build biblioteki w 2,7 sekundy zamiast 131. Zużycie pamięci spada od 2,5 do 6,6 raza.

Ciekawsza jest decyzja o rezygnacji z cache'owania na dysku. Autorzy twierdzą, że gdy zimny build jest szybki, śledzenie wszystkich plików, zmiennych środowiskowych i opcji do unieważniania cache'u kosztuje więcej, niż daje, i jest źródłem wielu błędów. Zmiany we wtyczkach czy konfiguracji po prostu wywołują pełny rebuild. Dochodzi do tego wbudowana obsługa Tailwinda bez PostCSS, React Compiler, MDX i importów z globami, scentralizowana konfiguracja w jednym pliku oraz lepszy algorytm dzielenia kodu. Na stronie z 450 podstronami daje to o 64 procent mniej żądań HTTP na stronę.

Wtyczki JavaScript działają na wbudowanym silniku QuickJS, który startuje szybko, ale ma mniejszą wydajność szczytową niż V8 i celowo nie ma dostępu do sieci. Do ciężkich zadań autorzy zalecają wtyczki natywne ładowane jako biblioteki dynamiczne przez stabilne C ABI. Brakuje jeszcze generowania plików d.ts, programistycznego API i własnych bundlerów.

**Key takeaways:**
- Parcel 3 to jeden plik binarny poniżej 30 MB bez zależności npm.
- Zamiast cache'u na dysku wybrano szybkie zimne buildy i pełny rebuild przy zmianie konfiguracji.
- Wtyczki JavaScript działają na QuickJS, więc część istniejących wtyczek będzie wymagała poprawek.
- Generowanie d.ts jeszcze nie działa, więc autorzy bibliotek muszą poczekać.

**Why do I care:** Liczby z benchmarków pochodzą od autorów, na jednym dużym monorepo, więc traktuję je jako górną granicę, nie obietnicę. Ale kierunek jest jasny. Bundler w Ruście przestaje być ciekawostką, a decyzja o porzuceniu cache'u pokazuje, że przy takiej prędkości cała klasa błędów z nieaktualnym cache'em znika. Wdrożyłbym to dopiero po wyjściu z alfy, głównie przez brak d.ts i API programistycznego, ale warto już sprawdzić, czy twoje wtyczki przeżyją migrację na QuickJS.

**Link:** [Announcing Parcel 3 alpha](https://v3.parceljs.org/blog/v3-alpha/)

## Dziewięć zabezpieczeń GitHub Actions przed atakami z zewnątrz

**TLDR:** Socket opisuje dziewięć konkretnych zabezpieczeń dla pipeline'ów CI, na tle głośnych ataków na łańcuch dostaw z lat 2025 i 2026. Wspólny wniosek jest taki, że złośliwy kod trafiał do legalnych paczek podczas wydania, a samo wydanie działało na GitHub Actions.

**Summary:** Tekst zaczyna od listy incydentów, między innymi tj-actions/changed-files, Nx s1ngularity, Shai-Hulud, trivy-action, axios i TanStack Router. Wzorzec się powtarza. Atakujący nie publikują podejrzanej paczki z literówką w nazwie, tylko przejmują proces wydawniczy albo jego poświadczenia i dostarczają złośliwy kod pod znaną nazwą pakietu.

Pierwsze zalecenie dotyczy przypinania akcji. Tag w Gicie to ruchomy wskaźnik, więc użycie wersji czwartej akcji nie gwarantuje, że uruchomisz ten sam commit, który przejrzałeś. W ataku na tj-actions przestawiono tagi na złośliwy commit i około 23 tysiące repozytoriów uruchomiło cudzy kod przy następnym buildzie, a te przypięte do SHA zostały nietknięte. Autor poleca nowy plik blokady dla workflowów, który zapisuje commity także dla akcji zagnieżdżonych, oraz okres karencji na nowe wersje, bo według szacunków Wiz opóźnienie o 7 do 14 dni wyłapuje 80 do 90 procent ataków.

Dalej są domyślny token bez uprawnień, zakaz budowania niezaufanego kodu w pull_request_target, przekazywanie danych z zdarzeń przez zmienne środowiskowe zamiast wstawiania ich do skryptu, kontrola cache'u, jednorazowe runnery self-hosted, instalacje bez skryptów cyklu życia, weryfikacja pobieranych skryptów i ograniczenie ruchu wychodzącego. Ważna data na koniec. GitHub wymusi blokadę pull_request_target w publicznych repozytoriach od 2 grudnia 2026. Do tego czasu działa tryb ewaluacji, który pokazuje, co zostałoby zablokowane.

**Key takeaways:**
- Przypinaj akcje do commita albo użyj pliku blokady, bo tagi można przestawić.
- Ustaw domyślny token na brak uprawnień i nadawaj je per job.
- Nigdy nie wstawiaj tytułów PR ani nazw gałęzi bezpośrednio do kroków run.
- Instaluj zależności z zamrożonym lockfile'em i bez skryptów, z karencją na świeże wersje.
- Do 2 grudnia sprawdź, czy twoje workflowy polegają na pull_request_target.

**Why do I care:** To jest lista kontrolna, którą da się przejść w jedno popołudnie na każdym repozytorium. Najbardziej bolesne jest to, że większość tych błędów to wygoda, nie złośliwość, na przykład cache włączony domyślnie przez akcję setup. Autor sam przyznaje, że kontrola ruchu wychodzącego nie powie ci, że atak się wydarzył, tylko ograniczy szkody. Zacząłbym od uprawnień tokena i od audytu pull_request_target, bo termin 2 grudnia jest twardy.

**Link:** [Hardening GitHub Actions Against Outside Threats](https://socket.dev/blog/hardening-github-actions-against-outside-threats)

## Remix 3.2, aktualizacje bezpieczeństwa Node.js i Gemini Omni 1.2 Flash

**TLDR:** Remix 3.2 dodaje middleware dla Content Security Policy z automatycznym nonce. Node.js zapowiada na 11 listopada wydania z poprawkami o wysokiej wadze dla linii 26, 24 i 22. Google obniżyło cenę generowania wideo w Gemini Omni 1.2 Flash o 30 procent.

**Summary:** W Remiksie nowy middleware generuje nonce dla każdego żądania i pasującą politykę, a importmapy, preloady modułów i style z css() dostają nonce automatycznie. Działa to także przy renderowaniu ramek na serwerze i przy HMR, również w polityce bez unsafe-eval. Wydanie poprawia też hydratację, serializację stylów i daje spadek czasu ponownego renderu css() o połowę w benchmarkach autorów. Część zmian łamie dotychczasowe wyniki, na przykład liczby w niektórych właściwościach CSS nie dostają już automatycznie jednostki px, a nazwy klas rmxc zmieniają się, więc testy z zakodowanymi selektorami trzeba poprawić.

Node.js ogłosił datę wydań bezpieczeństwa na 11 listopada. Najwyższa waga poprawek to HIGH dla wszystkich trzech aktywnych linii, a wersje po końcu wsparcia są zawsze podatne. Szczegółów jeszcze nie ma, więc warto zaplanować aktualizację z wyprzedzeniem.

Gemini Omni 1.2 Flash jest już ogólnie dostępny. Generuje klipy do 15 sekund, pozwala edytować je w kolejnych turach rozmowy, trzyma spójność postaci i kosztuje 0,07 dolara za sekundę wideo 720p. Wśród linków numeru jest też repozytorium BUI, czyli wyodrębniony z Blendera akcelerowany na GPU interfejs, który na Hacker News zdobył ponad 697 punktów. Strona nie podaje szczegółów poza hasłem reklamowym, więc zostawiam to jako ciekawostkę.

**Key takeaways:**
- Remix 3.2 ma gotowe CSP z nonce, ale zmienia wynik niektórych stylów i nazwy klas.
- Node.js wyda poprawki bezpieczeństwa 11 listopada dla wersji 26, 24 i 22.
- Gemini Omni 1.2 Flash jest tańszy o 30 procent i wspiera klipy do 15 sekund.

**Why do I care:** Dla frontendowca najpilniejsza jest data 11 listopada, bo każdy serwer Node z SSR dostanie poprawki o wysokiej wadze. CSP z nonce w frameworku to dobra wiadomość, bo ta konfiguracja zwykle jest ręczną robotą i często ląduje w trybie report-only na zawsze. Wideo z Gemini traktuję jako temat dla produktu i marketingu, a nie dla architektury.

**Link:** [Release remix v3.2.0](https://github.com/remix-run/remix/releases/tag/remix%403.2.0)
