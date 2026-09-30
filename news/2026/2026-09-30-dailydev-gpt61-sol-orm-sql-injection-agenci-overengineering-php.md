---
title: "GPT-6.1 Sol podcina własną Astrę, SQL injection wraca przez ORM-y, i połowa agentów AI to if-y z rachunkiem za GPU"
excerpt: "Z daily.dev: OpenAI wypuszcza GPT-6.1 Sol tydzień po poprzedniku i tanim kosztem depcze po piętach własnemu flagowcowi, ORM-y jak Prisma czy Sequelize wciąż zostawiają furtki na SQL injection, tekst o agentach AI budowanych tam, gdzie wystarczyłby regex, i minimalistyczny PHP bez żadnych zależności."
publishedAt: "2026-09-30"
slug: "dailydev-gpt61-sol-orm-sql-injection-agenci-overengineering-php"
hashtags: "#dailydev #ai #llm #nodejs #sql #appsec #architecture #php #generated #pl"
source_pattern: "daily.dev"
---

## GPT-6.1 Sol podcina cenę własnej Astry

**TLDR:** OpenAI wypuściło GPT-6.1 Sol tydzień po GPT-6 Sol, oferując wyniki bliskie flagowej Astrze za jedną piątą jej ceny tokenów. Model trafia od razu do API oraz do ChatGPT Work i Codex, a nowy tryb Ultrafast generuje tekst nawet ośmiokrotnie szybciej.

**Summary:** Tempo wydawania modeli u OpenAI od jakiegoś czasu przypomina wyścig z samym sobą. GPT-6.1 Sol pojawia się zaledwie tydzień po GPT-6 Sol i podważa sens kupowania droższej Astry do większości codziennych zadań agentowych: ceny zostają na poziomie 2 i 10 dolarów za milion tokenów wejścia i wyjścia, a cache'owane wejście kosztuje jedyne 10 centów za milion. Model jest dostępny przez API oraz w ChatGPT Work i Codex na planach Plus, Pro, Business, Enterprise i Edu, choć jeszcze nie w zwykłym Chat.

Liczby, którymi chwali się OpenAI, są konkretne. Na benchmarku DeepSWE 1.1 GPT-6.1 Sol zyskuje 6,4 punktu względem poprzednika i dogania Astrę. Przeciwko Opusowi 5.5 od Anthropic wygrywa na teście GDP.pdf, choć wyniki względem Claude Sonnet 5.5 są mieszane: Sol bije go na DeepSWE, ale przegrywa na AutomationBench, i tak przy zauważalnie niższym koszcie za zadanie. OpenAI deklaruje też spadek błędów faktograficznych z 11,4% do 7,7% względem GPT-6 Sol oraz poprawę w testach dopasowania do oczekiwań (alignment).

Najciekawszy jest tu sam mechanizm cenowy. Astra kosztuje pięć razy więcej, a według testów OpenAI różnica w jakości na typowych zadaniach agentowych i pracy biurowej jest niewielka. To klasyczny ruch: nowy model tańszy o rząd wielkości podcina sens płacenia za flagowca, zanim ten zdąży się nasycić rynkiem. Tryb Ultrafast w Codex, generujący tokeny do ośmiu razy szybciej, dokłada do tego kolejny argument za migracją zadań agentowych z Astry na Sol.

**Key takeaways:**
- GPT-6.1 Sol kosztuje 2 dolary za milion tokenów wejścia i 10 za wyjście, z cache'em za 10 centów
- Dogania Astrę na DeepSWE 1.1 i wygrywa z Opusem 5.5 na GDP.pdf, przy dużo niższym koszcie
- Tryb Ultrafast w Codex generuje tokeny do 8 razy szybciej
- Błędy faktograficzne spadły z 11,4% do 7,7% względem GPT-6 Sol

**Why do I care:** Dla zespołów spinających agentowe pipeline'y (Codex, CI, code review) to sygnał, żeby raz na kwartał przeliczać koszt na zadanie zamiast trzymać się jednego modelu z przyzwyczajenia. Astra wciąż ma sens tam, gdzie liczy się ostatni procent jakości na trudnych zadaniach wizji czy computer use, ale do codziennego "napraw buga, przepisz test" różnica w cenie robi się trudna do obronienia przed CFO.

**Link:** [OpenAI's new GPT-6.1 Sol undercuts its own Astra flagship](https://daily.dev/posts/0ZElNP4Tw)

## SQL injection wciąż przecieka przez ORM-y

**TLDR:** Sequelize, Prisma, TypeORM i Knex parametryzują zapytania automatycznie, ale injection wraca w czterech konkretnych miejscach: surowych zapytaniach, dynamicznych identyfikatorach jak kolumna sortowania, danych z bazy używanych ponownie bez ponownej parametryzacji i funkcjach typu `literal()`, które przemycają surowy SQL do wnętrza ORM-a.

**Summary:** ORM to nie tarcza, tylko domyślne ustawienie, które można ominąć na kilka konkretnych sposobów. Pierwszy to ucieczka do surowego zapytania przez coś w rodzaju `sequelize.query()` sklejanego ze stringów, gdzie parametryzacja z automatu przestaje działać, bo programista sam ją wyłączył. Drugi dotyczy identyfikatorów: nazw kolumn czy tabel, których nie da się związać jako parametr tak jak wartości. Klasyczny przykład to dynamiczne `ORDER BY` sterowane parametrem z URL-a, gdzie jedynym bezpiecznym rozwiązaniem jest allowlist dopuszczalnych nazw, nie sanityzacja.

Trzeci wzorzec jest podstępniejszy, bo dotyczy danych, które teoretycznie już przeszły przez bezpieczną ścieżkę. Injection drugiego rzędu polega na tym, że wartość zapisana kiedyś poprawnie sparametryzowana trafia później do surowego zapytania bez ponownego zabezpieczenia, na przykład w panelu admina albo wyszukiwarce wewnętrznej. Fakt, że dana wartość pochodzi z własnej bazy, nie oznacza, że jest bezpieczna, bo jeśli u źródła pochodziła od użytkownika, wciąż jest pod jego kontrolą. Czwarty wzorzec to funkcje w rodzaju `literal()` w Sequelize, które pozwalają przemycić fragment surowego SQL-a do wywołania, które wygląda jak zwykłe, bezpieczne użycie ORM-a.

Każdy z tych czterech przypadków ma ten sam kształt: developer wychodzi poza ścieżkę, którą ORM zabezpiecza z automatu, zwykle po to, żeby zrobić coś, czego builder zapytań nie obsługuje wprost. Rozwiązania też są powtarzalne, allowlisty dla identyfikatorów, bindingi zamiast sklejania stringów, operator API ORM-a zamiast `literal()`. Problem nie znika wraz z przejściem na ORM, tylko przenosi się w miejsca, gdzie nikt go się nie spodziewa.

**Key takeaways:**
- ORM-y parametryzują zapytania z automatu, ale nie chronią przed czterema konkretnymi ucieczkami z tej ścieżki
- Dynamiczne identyfikatory (jak kolumna sortowania) trzeba zabezpieczać allowlistą, nie sanityzacją, bo nie da się ich związać jako parametr
- Dane z własnej bazy nie są automatycznie bezpieczne, jeśli u źródła pochodziły od użytkownika
- Funkcje typu `literal()` w Sequelize przemycają surowy SQL do wnętrza normalnego wywołania ORM-a

**Why do I care:** Dla mnie to przypomnienie, żeby przy code review traktować każdy `literal()`, `raw()` czy ręcznie sklejany `ORDER BY` jako czerwoną flagę wymagającą osobnego spojrzenia, niezależnie od tego, jak bezpiecznie wygląda reszta pliku. Zespoły często audytują tylko miejsca z surowym SQL-em na pierwszy rzut oka i pomijają injection drugiego rzędu, bo dane "przecież już są w bazie", a to akurat najtrudniejszy przypadek do złapania w standardowym przeglądzie kodu.

**Link:** [How ORMs Still Let SQL Injection Through (and How to Close the Gaps)](https://daily.dev/posts/UWxttXmZ8)

## Połowa agentów AI w produkcji to if-y z rachunkiem za GPU

**TLDR:** Tekst punktuje trzy konkretne przypadki, w których zespoły sięgnęły po LLM-a, agenta albo bazę wektorową tam, gdzie wystarczyłby regex, zapytanie SQL albo drzewo decyzyjne, i proponuje pięciopytaniową listę kontrolną do oceny, kiedy AI faktycznie jest uzasadnione.

**Summary:** Punktem wyjścia jest obserwacja, że złożoność bywa dodawana do systemów dla efektu CV, nie z konieczności. Pierwszy przykład to ekstrakcja numeru faktury o stałym formacie, na przykład `INV-` plus osiem cyfr, przez wywołanie LLM-a zamiast regexa. Regex jest deterministyczny, testowalny, praktycznie darmowy i działa w mikrosekundach, podczas gdy wywołanie modelu kosztuje, dodaje opóźnienie i i tak potrafi zawieść w około 2% przypadków, po cichu przeformatowując albo błędnie odczytując wartość.

Drugi przypadek dotyczy zapytań typu "wszystkie niezapłacone zamówienia danego klienta z ostatnich 30 dni", które trafiają do wyszukiwania wektorowego i podsumowania przez LLM-a zamiast do zwykłego SQL-a. To zapytanie faktograficzne, nie semantyczne, więc wyszukiwanie wektorowe zwraca top-k podobnych fragmentów bez gwarancji, że złapało wszystkie pasujące rekordy, podczas gdy indeksowane zapytanie SQL daje dokładny, kompletny i możliwy do zaudytowania wynik. Trzeci przypadek to budowa pełnego autonomicznego agenta do decyzji o routingu zgłoszeń wsparcia z czterema gałęziami, na przykład "problem z fakturą od klienta enterprise trafia do account managementu", gdzie zwykła funkcja z czterema warunkami zrobiłaby to samo, tylko deterministycznie i bez potrzeby debugowania pętli agenta.

Autor proponuje pięć pytań, które warto sobie zadać przed sięgnięciem po AI: czy logikę da się w pełni wypisać jako skończoną liczbę gałęzi, czy zadanie jest faktograficzne czy semantyczne, czy deterministyczne rozwiązanie już istnieje i działa, ile kosztuje błąd modelu w tym konkretnym miejscu, i czy ktoś w zespole potrafi to zadanie zrobić prościej za pomocą istniejących narzędzi. Tekst kończy się otwartym pytaniem do czytelników o ich własne przykłady przekombinowanego AI.

**Key takeaways:**
- Regex bije LLM-a przy ekstrakcji danych o stałym, przewidywalnym formacie, jest darmowy i nie myli się losowo
- Zapytania faktograficzne (filtr, dokładna lista) należą do SQL-a, nie do wyszukiwania wektorowego, które nie gwarantuje kompletności wyniku
- Logikę możliwą do w pełni wypisania jako skończoną liczbę gałęzi warto zostawić jako zwykły kod, nie autonomicznego agenta
- Pięć pytań z checklisty pomaga odróżnić sytuacje, gdzie AI faktycznie coś wnosi, od tych, gdzie dokłada tylko koszt i niepewność

**Why do I care:** To dokładnie ten rodzaj tekstu, który warto podesłać zespołowi przed kolejnym sprintem planowania architektury, bo presja, żeby wszędzie "dodać trochę AI", jest dziś realna i często niezwiązana z faktyczną potrzebą biznesową. Najdroższe błędy tego typu nie ujawniają się od razu, tylko miesiąc później, gdy ktoś próbuje zdebugować agenta, który w 2% przypadków cichutko psuje numer faktury, i nikt nie potrafi powiedzieć dlaczego.

**Link:** [Half the AI agents in production are if-statements with a GPU bill](https://daily.dev/posts/l3xKU3olk)

## Strona z PHP, markdownem i bez jednej zależności

**TLDR:** Autor projektuje stronę podróżniczą romantic-weekend.com na minimalistycznym stosie: pliki markdown jako treść, struktura katalogów jako hierarchia, czysty PHP jako szablon, bez bazy danych i bez CMS-a, rozważając napisanie własnego, mikroskopijnego parsera markdown zamiast sięgania po gotową bibliotekę.

**Summary:** Zamiast league/commonmark albo innej dojrzałej biblioteki do markdown, autor rozważa napisanie parsera obsługującego tylko to, czego faktycznie potrzebuje: nagłówki, pogrubienie, kursywę, linki i listy. Do metadanych proponuje prosty czytnik klucz:wartość zamiast pełnego YAML-a, bo strona nie potrzebuje elastyczności, jakiej wymagałby generyczny system. Cała treść żyje jako pliki markdown na dysku, a struktura katalogów sama staje się hierarchią nawigacji, bez potrzeby osobnej bazy danych czy panelu administracyjnego.

Krok budowania generuje indeks treści jako tablicę PHP, wykorzystywaną potem do routingu, breadcrumbów, sitemapy i linkowania powiązanych treści. Autor szkicuje też własne tokeny w stylu `[[paris]]` czy `[[related]]`, które pozwalają na linkowanie wewnętrzne i dynamiczne sekcje bezpośrednio z poziomu treści markdown, bez pisania osobnego systemu zarządzania relacjami między stronami.

To podejście stoi w opozycji do domyślnego odruchu sięgania po framework i bibliotekę do każdego zadania, nawet gdy skala projektu tego nie wymaga. Pisanie własnego, celowo ograniczonego parsera zamiast instalowania paczki z tysiącem funkcji, których nikt nie użyje, jest tu świadomym kompromisem między czasem wdrożenia a długoterminową kontrolą nad kodem.

**Key takeaways:**
- Treść żyje jako pliki markdown na dysku, struktura katalogów pełni rolę hierarchii nawigacji
- Zamiast league/commonmark autor rozważa własny, mikroskopijny parser obsługujący tylko potrzebne elementy
- Krok budowania generuje tablicę PHP jako indeks treści do routingu, breadcrumbów i sitemapy
- Własne tokeny w stylu `[[paris]]` obsługują linkowanie wewnętrzne bez osobnego systemu relacji

**Why do I care:** Ten rodzaj projektu jest dobrym przypomnieniem, że nie każda strona potrzebuje Next.jsa, CMS-a i bazy danych, a czasem najszybszą drogą do czegoś, co da się utrzymać przez lata, jest świadome ograniczenie zależności do zera. Zanim ktoś doda kolejną paczkę do package.json, warto zapytać, czy projekt faktycznie urośnie do skali, która ją uzasadni, czy to tylko odruch.

**Link:** [PHP, markdown and no dependencies](https://daily.dev/posts/CWXBivIQ1)
