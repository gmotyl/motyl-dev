---
title: "Lokalne LLM-y na 8 GB, koniec klienta Git i prawo w repozytorium"
excerpt: "HackerNoon: pomiary lokalnego modelu na małej karcie graficznej, raport o tym, jak agenci zmieniają źródło prawdy w kontroli wersji, katalog 49 umiejętności dla agentów, całe chilijskie prawo w Gicie, test CAD generowanego przez LLM i pięć lekcji o AI w SDLC."
publishedAt: "2026-11-04"
slug: "lokalne-llm-8gb-git-klient-agenci-prawo-w-gicie"
hashtags: "#hackernoon #ai #llm #git #agents #devtools #architecture #performance #open-source #generated #pl"
source_pattern: "HackerNoon"
---

## Jak uruchomić lokalny model na karcie z 8 GB pamięci

**TLDR:** Drugi odcinek serii o małych kartach graficznych uczy mierzyć zamiast zgadywać. Autor ustawia stałą konfigurację llama.cpp z modelem Qwen2.5-7B-Instruct i zmienia po jednym ustawieniu naraz. Najważniejsza lekcja dotyczy pamięci na cache KV, a nie samych wag.

**Summary:** Punkt wyjścia jest praktyczny. Model radzi sobie z krótkim pytaniem, ale ma kłopot z całym dokumentem, bo czekasz dwa razy. Najpierw przy przetwarzaniu promptu, czyli prefillu, a potem przy generowaniu odpowiedzi słowo po słowie. Jeśli dokument mieli się kilka sekund, szybkie generowanie tego nie naprawi. Autor każe więc mierzyć osobno czas do pierwszego tekstu, szybkość generowania, całkowity czas żądania i liczbę wyjściowych tokenów.

Najbardziej użyteczny jest rachunek pamięci. Plik z modelem to tylko część wymagań, bo podczas generowania runtime trzyma też klucze i wartości uwagi dla już przetworzonych tokenów. Dla tego modelu, z 28 warstwami, czterema głowami KV i wymiarem głowy 128, obliczony cache w FP16 to 224 MiB przy 4096 tokenach, a 1,75 GiB przy 32768. Przejście z 4K na 32K dokłada więc około 1,5 GiB, i to samo z siebie może przesądzić, czy całość zmieści się na karcie. Kwantyzacja wag i kwantyzacja cache to dwie osobne decyzje, a druga może pogorszyć jakość lub opóźnienia przy krótkim kontekście.

Eksperyment ma pięć wariantów, w których zmienia się włączenie Flash Attention, precyzję cache, rozmiar kontekstu i wielkość partii. Skrypt benchmarkowy używa tylko standardowej biblioteki Pythona, wyłącza ponowne użycie prefiksu, żeby powtórzenia nie oszukiwały, i przerywa się, jeśli żądanie zostało obcięte. Jest też rozsądna uwaga o jakości. Szybsza konfiguracja, która wymyśla kwotę budżetu, której nie ma w notatkach, oblewa test. Na końcu autor zaleca odchudzić prompt, zanim kupisz więcej sprzętu, na przykład przez usunięcie duplikatów fragmentów i starych tur rozmowy.

**Key takeaways:**

- Mierz osobno prefill i generowanie, bo wymagają różnych poprawek.
- Cache KV rośnie liniowo z kontekstem i może zająć gigabajty, niezależnie od kwantyzacji wag.
- Zmieniaj jedno ustawienie na raz i zapisuj wersję silnika, hashe modeli i surowe odpowiedzi.

**Why do I care:** Jeśli wpinasz lokalny model do narzędzia dla programistów albo do prywatnego asystenta dokumentów, ten sposób myślenia oszczędzi ci tygodnia zgadywania. Tekst sam zastrzega, że liczby pamięci są wyliczone, a nie zmierzone, i że nie ma tu żadnego twierdzenia o przyspieszeniu. Szkoda, że autor nie pokazuje wyników własnego pomiaru, bo seria zapowiada tylko metodę. Dla architekta ważniejszy jest wniosek, że budżet tokenów to decyzja produktowa, nie parametr serwera.

**Link:** [Making Local LLMs Usable on 8GB GPUs](https://hackernoon.com/making-local-llms-usable-on-8gb-gpus)

## Agenci zabijają klienta Git, a nie samego Gita

**TLDR:** Długi raport przekonuje, że Git jako protokół przetrwa, ale jego model z pełnymi klonami i obliczeniami po stronie klienta przestaje pasować do świata, w którym głównymi klientami są agenci. Wartość przesuwa się na serwer, a dowodem ma być Scion Anthropic i forge Cursor Origin.

**Summary:** Autor zaczyna od liczb z wpisu Anthropic z 13 października 2026. Dzienna liczba merge'y wzrosła z około 2500 w maju do ponad 30 tysięcy we wrześniu. Historia głównej gałęzi sięga 100 GB, a samo CI robi około 25 milionów checkoutów dziennie. Siedmiu inżynierów w pięć miesięcy zastąpiło Gita w całym monorepo systemem Scion, w którym serwer liczy diff, blame i merge, klient trzyma ograniczony cache, a kopia robocza jest opcjonalna. Wynik to ponad 99 procent trafień w cache, infrastruktura około 200 razy mniejsza i checkouty w sekundach zamiast minut. Anthropic sam pisze, że to nie zamiennik Gita dla ogółu.

Drugi bohater to Cursor Origin, forge z Gitem jako protokołem, który atakuje GitHub od strony agentów. Edytor, agenci w chmurze, automatyzacje, stosy PR-ów i kolejka merge'y mają być w jednym miejscu, a przejęte Graphite dało gotową warstwę przeglądu i łączenia zmian. Autor wskazuje słabości, czyli brak publicznych repozytoriów, brak własnego CI i niejasne zasady retencji danych. Dla porównania opisuje GitHuba z jego problemami z dostępnością i planami wydajności, a także GitLaba z platformą agentów.

Najbardziej użyteczna jest tabela progów. Do mniej więcej stu inżynierów Git na hostowanym forge'u zostaje bez zmian. Od stu do dwóch tysięcy protokół zostaje, ale serwer ma się zachowywać jak Scion, z diffem i blame jako wywołaniami API oraz CI, które nie klonuje. Powyżej dwóch tysięcy albo przy ponad pięciu tysiącach merge'y dziennie własny system staje się racjonalny. Raport zaleca ścieżkę środka, czyli Git na brzegu i bogatsze API pod spodem, i tłumaczy, dlaczego jedyny precedens, który się uogólnił, to wysiłek Microsoftu włożony z powrotem w samego Gita.

**Key takeaways:**

- Granicą nie jest liczba ludzi, tylko liczba merge'y i checkoutów wykonywanych przez klientów niebędących ludźmi.
- Scion działa dla ogromnych monorepo, a dla reszty rada brzmi, żeby przenosić jego pomysły do forge'ów.
- Warstwa przeglądu i merge'a jest miejscem, gdzie kontrola wersji pęka pierwsza.

**Why do I care:** To tekst analityczny, a nie relacja z wdrożenia, i opiera się w dużej mierze na jednym wpisie jednej firmy. Autor sam przyznaje, że wzrost merge'y może być po części artefaktem pomiaru, bo mniejsze zmiany to nie to samo co więcej użytecznych zmian. Praktyczna lekcja dla zespołu frontendowego jest skromniejsza. Zmierz, ile twoich checkoutów w CI robi człowiek, a ile maszyna, i zobacz, czy płytkie klony i cache zależności nie dają ci połowy tego zysku za ułamek wysiłku.

**Link:** [AI Agents Are Killing the Git Client, Not Git: What Anthropic's Scion and Cursor's Origin Show](https://hackernoon.com/ai-agents-are-killing-the-git-client-not-git-what-anthropics-scion-and-cursors-origin-show)

## Awesome Agent Skills, czyli 49 umiejętności do pracy z agentami kodującymi

**TLDR:** Kolekcja zamienia powtarzalne zadania inżynierskie na procedury w plikach Markdown, od przeglądu kodu i debugowania po audyt dokumentacji. Wyróżnia ją nacisk na dowody i raporty zamiast automatycznych poprawek.

**Summary:** Agent potrafi skończyć funkcję, przejść testy i zostawić po sobie zbędne abstrakcje, mylące komentarze albo README, które nie zgadza się z produktem. Polecenie "sprawdź wszystko" daje mu za mało wskazówek. Kolekcja ma 49 umiejętności, każda w osobnym katalogu z plikiem SKILL.md, bez skryptów, na istniejących narzędziach agenta. Uzupełniają one pliki AGENTS.md i CLAUDE.md, bo tamte trzymają stałe reguły projektu, a umiejętność daje metodę na jedno zadanie.

Trzy zasady przewijają się przez całość. Ustalenia muszą mieć oparcie w kodzie, prześledzonej ścieżce wykonania albo wyniku polecenia, a potwierdzone błędy odróżnia się od założeń. Badanie jest oddzielone od naprawy, więc wiele audytów kończy się raportem, zanim ktokolwiek zmieni kod. Raport mówi też, czego nie dało się sprawdzić. Autor porównuje zbiór z popularnymi alternatywami, jak Superpowers, zestawy Matta Pococka i Addy'ego Osmaniego czy Trail of Bits, i uczciwie zaznacza, że gwiazdki mówią o widoczności, a nie o jakości. Nie ma też żadnego porównania, które dowodziłoby, że ta kolekcja znajduje więcej błędów.

**Key takeaways:**

- Umiejętność to proces plus oczekiwany wynik, na przykład lista luk w testach albo audyt deklaracji publicznych.
- Rozdzielenie raportu od poprawek zostawia właścicielowi decyzję, co naprawiać.
- Wartość trzeba sprawdzić na własnym kodzie, bo brak porównań head-to-head.

**Why do I care:** Autor jest jednocześnie twórcą kolekcji, więc czytam to jak opis produktu. Sama zasada jest jednak dobra i warto ją ukraść do własnych plików. Wymagaj od agenta dowodu przy każdym ustaleniu i każ mu napisać, czego nie sprawdził. To jedyny sposób, żeby wynik przeglądu dało się ocenić w pięć minut, a nie w pięć godzin.

**Link:** [Awesome Agent Skills: 49 Skills for Better AI-Assisted Coding](https://hackernoon.com/awesome-agent-skills-49-skills-for-better-ai-assisted-coding)

## Całe prawo Chile w Gicie, ponad 300 tysięcy dokumentów od 1810 roku

**TLDR:** Autor zbudował repozytorium z ponad 300 tysiącami aktów prawnych, z jednym commitem na publikację, tak by tekst każdej ustawy można było odczytać na dowolną datę. Git okazał się dobrym źródłem prawdy i fatalną bazą danych.

**Summary:** Punkt wyjścia to obserwacja, że prawnicy używają historii wersji z Worda, której brakuje blame, gałęzi i selektywnego cofania. Istniejące repozytoria nie spełniały wymagań. Amerykański kodeks ma tylko 16 commitów, bo zbudowano go z migawek, a repozytorium z Legalize ma w chilijskiej części około trzech tysięcy aktów. Autor pobiera dane z endpointu SPARQL Biblioteki Kongresu i z serwisu LeyChile przez cztery idempotentne skrypty, a całość działa co trzy godziny w GitHub Actions, z ośmioma równoległymi runnerami, żeby obejść limity po adresach IP.

Najlepsza część to lista rzeczy, które się zepsuły. Zapora serwera zwracała kod 200 ze stroną blokady, gdy zapytanie szło z adresów Azure. Dwie uchwały o tym samym numerze nadpisały się w jednym katalogu. GitHub odrzucił blob powyżej 100 MB, więc cache trafił do plików gzip. Obiekty drzew rozrosły się do 375 GiB nieskompresowanych, bo każdy commit przepisywał ogromne listingi katalogów, choć na dysku całość zajmuje 7,8 GB. Git nie przyjmuje też dat sprzed 1970 roku w repozytorium akceptowanym przez GitHub, więc stare commity trafiły do pierwszych sekund 1970, a prawdziwa data siedzi w metadanych i w temacie commita.

Na wierzchu stoi interfejs webowy, API z parametrem daty obowiązywania i serwer MCP z ośmioma narzędziami. Wyszukiwanie zaczęło się od Meilisearch dla około 8 procent najczęściej czytanych ustaw, ale zajmowało szesnaście razy więcej dysku niż indeks Postgresa dla całości, a jego awaria po migracji wyłączyła wyszukiwanie dla wszystkich zapytań. Całość wylądowała w Postgresie. Zapytanie o rzadkie słowo skróciło się z 21 sekund do 114 milisekund.

**Key takeaways:**

- Jeden commit na publikację pozwala zobaczyć zmianę prawa jako jedno zdarzenie z diffem słowo po słowie.
- Git jest źródłem prawdy, a wyszukiwanie, indeksy i interfejs to dane pochodne, które można odbudować.
- Limity Gita i GitHuba, czyli szerokie katalogi, rozmiar blobów i daty, wyszły dopiero przy skali.

**Why do I care:** Dla mnie to najciekawszy tekst w tym numerze, bo pokazuje, gdzie kończy się wygoda Gita jako uniwersalnego magazynu. Wniosek autora, że Git to silnik, a nie interfejs, dotyczy też naszych projektów z dokumentacją i treściami w repozytorium. Zastrzeżenie, którego brakuje, to aktualność. Jeśli pobierasz dane z cudzego, nieoficjalnie otwartego API, twój pipeline jest tylko tak dobry, jak cierpliwość operatora zapory.

**Link:** [I Put My Country's Entire Legal Code in Git: 300,000+ Documents Since 1810](https://hackernoon.com/i-put-my-countrys-entire-legal-code-in-git-300000-documents-since-1810)

## Czy AI napisze CAD, plan testu manufacturability

**TLDR:** Student mechaniki publikuje metodę testu, zanim zna wyniki. Chce sprawdzić, czy LLM generujący skrypty CadQuery daje części, które da się wydrukować lub obrobić, a nie tylko takie, które się uruchamiają.

**Summary:** Pomysł wyrasta z rozróżnienia, że skrypt, który się wykonuje, to nie to samo co poprawna część. Może powstać wspornik ze ścianką 0,3 milimetra, otwory wychodzące poza krawędź albo koło zębate, które z niczym nie zazębi. Autor opisuje pięć części o rosnącej trudności, od wspornika w kształcie litery L, przez sprzęgło z wpustem i koło zębate, po obudowę z zatrzaskiem i zestaw śruba, nakrętka i płyta.

Najlepszy element to dyscyplina. Kryteria są ustalone przed testem, więc nie da się ich dopasować do wyników. Skrypt musi wykonać się bez edycji, dać jedną poprawną bryłę o objętości zgodnej z ręcznym rachunkiem, mieć wymiary w tolerancji, a po zmianie kluczowych parametrów o 25 procent nadal działać. Osobno liczy się wynik z pierwszej próby, po maksymalnie trzech poprawkach z komunikatem błędu i po ręcznej korekcie, która nigdy nie liczy się jako sukces modelu. Autor wymienia też znane ryzyka, na przykład wymyślone wywołania funkcji, pomylenie płaszczyzn roboczych, dryf jednostek i zaszyte na sztywno liczby, które udają parametryczność.

W tym tekście nie ma żadnych wyników, co autor podkreśla. To dopiero część pierwsza. Próba jest mała, dotyczy jednej biblioteki i trzeba pamiętać, że manufacturability jest tu oceniana cyfrowo, chyba że część faktycznie wydrukowano.

**Key takeaways:**

- Kryteria sukcesu są zapisane przed pierwszym uruchomieniem, więc nie da się ich naginać.
- Części zaczynają od prostego wspornika i kończą na kole zębatym oraz zespole z nakrętką i śrubą.
- Brak wyników, więc na razie to plan, a nie dowód.

**Why do I care:** To niszowy temat dla frontendowca, ale wzorzec ewaluacji przeniesiesz na własną pracę. Jeśli oceniasz, czy model potrafi wygenerować komponent albo test, zdefiniuj kryteria wcześniej, mierz po zmianie parametrów i licz osobno poprawki ręczne. Poczekajmy z oceną na część drugą, bo zapowiedź metody nie jest wynikiem.

**Link:** [Can AI Write CAD? Testing LLM-Generated 3D Models for Manufacturability](https://hackernoon.com/can-ai-write-cad-testing-llm-generated-3d-models-for-manufacturability)

## Pięć lekcji o AI w cyklu życia oprogramowania dla zespołów DevSecFinOps

**TLDR:** Autor opisuje, co zmienia się, gdy w dużej firmie zastępuje się klasyczny SDLC wersją z AI. Dług poznawczy zastępuje dług techniczny, tokeny stają się metryką inżynierską, a bramki bezpieczeństwa ustępują hookom działającym na żywo.

**Summary:** Pierwsza lekcja to dług poznawczy. Agent wrzuca setki linii, kod się kompiluje, testy przechodzą, a człowiek zatwierdza, bo śledzenie logiki męczy. Tak powstaje zespół kruchych ekspertów, którzy gubią się przy błędzie w stanowym backendzie. Zespół autora zmienił więc przeglądy tak, że trzeba ręcznie prześledzić logikę, a jeśli nie umiesz opisać architektonicznego "dlaczego", PR nie przechodzi.

Druga lekcja dotyczy kosztów. Jedno złożone zadanie wieloagentowe potrafi zużyć tysiąc razy więcej tokenów niż zwykły prompt, a niekontrolowana pętla rekurencyjna zjada marżę. Autor traktuje więc zużycie tokenów jak metrykę pierwszej kategorii, z budżetami, twardymi limitami i rachunkiem kosztu jednostkowego na funkcję. Trzecia lekcja to topologia agentów. Hub w centrum szybko staje się wąskim gardłem, pełne połączenia równorzędne generują szum, a drzewo hierarchiczne dobrze izoluje stan.

Czwarta lekcja mówi, żeby wyrzucić bramki fazowe i przepuszczać każdy ruch agenta przez centralną bramę z hookami wejścia, wyjścia i przed wywołaniem narzędzia, razem z generowaniem SBOM w pipeline'ie. Piąta, że rygor przesuwa się w górę strumienia, na projektowanie systemu i szukanie sposobów, by go zepsuć. Autor odróżnia przerzucanie na maszynę składni i boilerplate'u od zlecania jej myślenia.

**Key takeaways:**

- Wymagaj od autora PR-a, żeby potrafił opisać architektoniczne uzasadnienie zmiany.
- Wpisz limity i budżety tokenów w platformę, zanim przyjdzie pierwszy rachunek.
- Zamiast bramek przed wydaniem postaw hooki sprawdzające wejście, wyjście i wywołania narzędzi.

**Why do I care:** Tekst jest zbiorem tez bez pomiarów, więc traktuję go jak listę kontrolną, a nie badanie. Mocna jest teza o długu poznawczym, bo odpowiada temu, co widać w każdym zespole, który zatwierdza diffy bez czytania. Słabsza jest rada o drzewie agentów, bo przedstawiona bez żadnego porównania z innymi topologiami. Najbardziej przydatne z perspektywy architekta są hooki przed wywołaniem narzędzia, bo to jedyne miejsce, w którym możesz zatrzymać destrukcyjne polecenie, zanim się wykona.

**Link:** [Architecting AI-SDLC: Five Lessons For DevSecFinOps Teams](https://hackernoon.com/architecting-ai-sdlc-five-lessons-for-devsecfinops-teams)
