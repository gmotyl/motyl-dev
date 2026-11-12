---
title: "HackerNoon: model danych Medium na ScyllaDB, workflow z Claude Code, Syncthing zamiast Dysku i koszty AWS"
excerpt: "Lista funkcji zamiast cech relacyjnych dla 1M operacji na sekundę, dwa dni z Claude Code, synchronizacja bazy KeePass i narzędzia do pilnowania rachunku AWS."
publishedAt: "2026-11-11"
slug: "hackernoon-medium-scylladb-claude-code-workflow-syncthing-koszty-aws"
hashtags: "#hackernoon #database #ai #agents #devops #aws #generated #pl"
source_pattern: "HackerNoon"
---

## Jak Medium obsługuje rekomendacje na 1M operacji na sekundę

**TLDR:** Medium zmieniło model cech w sklepie cech z relacyjnego na listowy. Zamiast dwóch tabel i wielu zapytań jest jedna partycja i jedno zapytanie.

**Summary:** Stary model rozdzielał identyfikatory encji i wartości na dwie tabele. Pierwsze zapytanie zwracało identyfikatory i polegało na ALLOW FILTERING, a potem trzeba było wykonać po jednym zapytaniu na każdy identyfikator. Monitoring pokazał, że 90,2 procent odczytanych wierszy było odrzucanych.

W nowym modelu cecha listowa ma wartość będącą kolekcją elementów z wartością i znacznikiem czasu. Wszystko leży w jednej tabeli list_items. Klucz partycji to klucz cechy i identyfikator encji, a klucz klastrujący to znacznik czasu połączony z hashem MD5 wartości, co pozwala trzymać wiele elementów z tą samą sekundą. Kolejność malejąca ułatwia pobieranie najnowszych N elementów. Wygasanie robi TTL w bazie, bez własnego sprzątania. Usuwanie po wartości używa lokalnego indeksu wtórnego, a usunięcie całej listy to porzucenie partycji.

W testach na danych produkcyjnych ScyllaDB miała P50 poniżej 1,5 ms przy dodawaniu, a DynamoDB poniżej 5 ms. P99 w ScyllaDB było stabilnie jednocyfrowe, a w DynamoDB 40 do 120 ms. DynamoDB testowano bez warstwy cache, więc autor sam zastrzega, że porównanie jest niepełne.

**Key takeaways:**
- Model danych decyduje o skalowalności bardziej niż tuning.
- Hash MD5 jako część klucza działa w praktyce bez kolizji, ale to założenie.
- Porównanie z DynamoDB bez cache jest niepełne.

**Why do I care:** Artykuł pochodzi z blogu ScyllaDB, więc wynik porównania ma właściciela. Lekcja o modelu danych jest za to uniwersalna i dotyczy też frontendu, bo zapytania pod dany ekran często wymuszają kształt danych.

**Link:** [How Medium Powers Real-Time Recommendations at 1M OPS](https://hackernoon.com/how-medium-powers-real-time-recommendations-at-1m-ops)

## Dwa dni z Claude Code i przebudowa strony

**TLDR:** Autor przebudował stronę na Next.js 16, przepisał 228 wpisów i dodał 543 testy w dwa dni. Najważniejsza lekcja to to, że koszt pisania kodu spadł, a koszt decydowania, co zbudować, nie.

**Summary:** Autor sam zaznacza, że 32 784 linie to słaba miara. Efekt to około 100 commitów, 11 scalonych PR-ów i zero zepsutych adresów. Wypracował zestaw nawyków. Ograniczenia zapisuje przed pierwszym promptem. Każdy błąd agenta zamienia w test. Scala małe kawałki. Audyty traktuje jako pętlę, w której to człowiek decyduje, co jest prawdziwe. Pracę równoległą dzieli tylko tam, gdzie pliki się nie pokrywają.

Najlepszy ruch to usunięcie publicznego API JSON, które agent chwilę wcześniej zbudował z wersjonowaniem i nagłówkami deprecacji. Dla portfolio nie miało wartości, a generowało około 500 statycznych stron. Po usunięciu zostało 596 zamiast 1093. Agent popełnił też błąd, który autor opisuje uczciwie, bo przekierował stronicowanie i ukrył projekty, choć były zaindeksowane. Dane słów kluczowych kosztowały 4,37 dolara w 313 wywołaniach API, a frazę o 720 wyszukiwaniach miesięcznie autor świadomie pominął ze względów gustu.

**Key takeaways:**
- Ograniczenia zapisane tam, gdzie agent je czyta, i testy jako kontrakt.
- Pytanie "czy to powinno istnieć" nie jest pytaniem dla agenta.
- Test zachowania wszystkich zaindeksowanych adresów warto mieć od pierwszego dnia.

**Why do I care:** Zgadzam się z główną tezą. Ale to doświadczenie jednej osoby przy własnej stronie, z jednym właścicielem i bez zespołu, więc problem przeglądu cudzego kodu praktycznie nie występuje. W większej organizacji wąskim gardłem będzie ten przegląd, nie decyzje produktowe.

**Link:** [My Claude Code Workflow: Lessons From Rebuilding a Website in Two Days](https://hackernoon.com/my-claude-code-workflow-lessons-from-rebuilding-a-website-in-two-days)

## Syncthing i Tailscale zamiast Dysku Google dla bazy KeePass

**TLDR:** Autor przeniósł tylko plik .kdbx na Syncthing przez Tailscale, z NAS jako centralnym węzłem. Resztę zostawił na Dysku Google.

**Summary:** Dysk śledzi pliki po identyfikatorze, a KeePassXC zapisuje przez plik tymczasowy, usunięcie i zmianę nazwy, więc KeePassium wskazywał na usunięty plik. Ponowne dodanie bazy wymagało klucza sprzętowego. Autor przyznaje, że dopiero przy pisaniu dowiedział się o bezpiecznym zapisie w KeePassXC.

Konfiguracja to Syncthing z SynoCommunity na Synology, Homebrew na macOS i aplikacja Sync Anything na iOS. Globalne wykrywanie, przekaźniki i NAT traversal są wyłączone, a urządzenia łączą się po nazwach MagicDNS Tailscale. Topologia to gwiazda wokół NAS. Wady są opisane jawnie. Możliwe są konflikty plików, iOS opóźnia synchronizację w tle, awaria NAS zatrzymuje synchronizację, a cztery identyczne kopie nie są backupem.

**Key takeaways:**
- Problemem był sposób zapisu pliku, nie sam Dysk.
- Syncthing przez Tailscale nie potrzebuje serwerów wykrywania ani przekaźników.
- Kopie synchronizowane nie zastępują kopii zapasowej.

**Why do I care:** To tekst dla osób, które lubią własną infrastrukturę. Dla mnie interesujący jest wniosek, że problem był w semantyce zapisu pliku, a nie w narzędziu. Autor poświęca sporo uwagi prywatności, ale i tak zostaje przy Tailscale jako stronie trzeciej, co opisuje uczciwie.

**Link:** [Why I Ditched Google Drive for Syncthing and Tailscale](https://hackernoon.com/why-i-ditched-google-drive-for-syncthing-and-tailscale)

## Jak pilnować kosztów AWS, zanim będzie za późno

**TLDR:** Przegląd narzędzi AWS do kontroli wydatków, od dashboardów z raportami e-mail po agenta FinOps w podglądzie.

**Summary:** Dashboardy z raportami mówią, co już się stało, bez progów. Alarm CloudWatch na EstimatedCharges działa tylko w us-east-1, wymaga włączenia alertów w preferencjach i jest alarmem sufitowym. AWS Budgets ma prognozy, które ostrzegają przed przekroczeniem, i potrafi uruchamiać akcje, na przykład zatrzymać instancje. Dwa budżety z akcjami są darmowe, kolejne kosztują 0,10 dolara dziennie, a prognozy potrzebują około pięciu tygodni danych. Data Exports daje szczegóły z CUR 2.0 do S3, ale konfiguracji tabeli nie zmienisz po utworzeniu. AWS FinOps Agent, ogłoszony w czerwcu 2026, jest w podglądzie i odpowiada na pytania o rachunek, ale wywołania API na twoim koncie kosztują.

**Key takeaways:**
- Alarm sufitowy mówi, że przekroczyłeś, a budżet z prognozą, że przekroczysz.
- Budżety z akcjami mogą zatrzymać zasoby, co bywa tańsze niż awaria rachunku.
- Konfiguracji eksportu nie da się zmienić po utworzeniu.

**Why do I care:** Dla zespołów frontendowych na Vercelu lub w chmurze to temat poboczny, ale każdy, kto wystawia backend na AWS, powinien mieć przynajmniej jeden budżet z prognozą. Zanim zaufasz agentowi FinOps, sprawdź jego rekomendacje ręcznie.

**Link:** [Keeping Track of Your AWS Costs Before You End up Being Blasted Into the Shadow Realm](https://hackernoon.com/keeping-track-of-your-aws-costs-before-you-end-up-being-blasted-into-the-shadow-realm)
