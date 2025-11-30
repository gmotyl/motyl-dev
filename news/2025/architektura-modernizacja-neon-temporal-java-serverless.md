---
title: "Architektura w praktyce: modernizacja systemów, serverless Postgres na Azure, serverless storage jako baza, Java JEPy i Durable Execution"
excerpt: "Podsumowanie praktycznych prezentacji i wiadomości o architekturze: modernizacja legacy, Neon na Azure, serwerlessowe podejście do baz, najważniejsze JEPy w JDK 25 oraz Temporal na AWS."
publishedAt: "2025-05-16"
slug: "architektura-modernizacja-neon-temporal-java-serverless"
hashtags: "#generated #pl #architecture #ai #postgresql #azure #aws #temporal #database #java #performance"
---

## Renovate to Innovate: Fundamentals of Transforming Legacy Architecture
**TLDR:** Rashmi Venugopal przekonuje, że legacy to naturalny efekt sukcesu i proponuje podejście ewolucyjne do modernizacji: małe, mierzalne kroki, priorytetyzacja deprecjacji i organizacyjna struktura wspierająca zmiany. Klucz to systematyczna praktyka, nie wielka migracja „big bang”.

**Summary:**
Rashmi zaczyna od prostej, ale ważnej obserwacji — legacy często pojawia się, bo system był dostatecznie dobry, by firma urosła. To zmienia perspektywę: legacy nie jest tylko hańbą czy dowodem złych wyborów, to efekt sukcesu i ewolucji wymagań. Jej definicja: system jest legacy, gdy przestaje realizować bieżące cele biznesowe. To przesuwa fokus z „starych technologii” na dopasowanie do potrzeb biznesu.

Zamiast jednorazowych migracji autorka rekomenduje „renowację” ewolucyjną — inkrementalne zmiany, które redystrybuują odpowiedzialność i ryzyko. Praktyki obejmują: wycinanie wąskich gardeł, tworzenie warstw migracyjnych, deprecjację funkcji z jasnymi terminami, automatyzację testów i wdrożeń oraz świadome projektowanie kontraktów API. Szczególny nacisk kładzie na decyzje organizacyjne: kto ma mandat do refaktoringu, jak mierzyć postęp i kiedy zamykać („zapomnieć”) stare ścieżki.

Challenging assumptions: Venugopal zakłada, że organizacja ma zasoby i kulturę pozwalającą na ciągłe, małe prace remontowe. To rzadko bywa prawdą w firmach z presją krótkoterminowych wyników — autorka nie rozpisuje wystarczająco, jak negocjować budżet i czas na te prace z biznesem. Brakuje też konkretnego planu dla przypadków, gdzie kluczowy komponent jest stale „rozgrzebany” przez wiele zespołów i żaden nie ma motywacji do zamknięcia pracy.

Czego autor unika: stereotypu, że modernizacja = zmiana stacku. Mniej mówi o kosztach mentalnych i szkoleniowych przy wprowadzaniu nowych paradygmatów (np. migracja do event-driven lub do RDBMS → Cloud-native). Również brakuje konkretów dotyczących mierników sukcesu poza ogólnymi wskaźnikami typu „szybkość dostarczania”.

Dla architektów i zespołów: planujcie „małe deprecjacje” z terminami i właścicielami. Ustalcie rutynę: refaktoring jako część Definition of Done, nie jako osobny projekt. Mierzcie wpływ na lead time i MTTR — to najłatwiejsze argumenty przed zarządem.

**Key takeaways:**
- Legacy jest nieuniknione; traktujcie je jako zasób do zarządzania, nie klęskę.
- Preferujcie ewolucję i deprecjację nad jednorazowymi migracjami.
- Organizacja i mierniki (kto, kiedy, jakie KPI) są równie ważne jak technika.

**Tradeoffs:**
- Incremental renovation means lower immediate risk but sacrifices the speed of achieving an ideal architecture.
- Prioritizing deprecation reduces long-term maintenance but requires disciplined governance now.

**Link:** [Renovate to Innovate: Fundamentals of Transforming Legacy Architecture](https://www.infoq.com/presentations/renovate-to-innovate)

---

## Neon Serverless Postgres Now Generally Available as an Azure Native Integration
**TLDR:** Neon udostępnił Serverless Postgres jako natywną integrację w Azure, oferując automatyczne skalowanie, instant branching i integrację z Azure identity i billing. To opcja atrakcyjna dla zespołów AI wymagających elastyczności i izolacji danych.

**Summary:**
Neon to alternatywa dla klasycznych managed Postgres/Aurora, która rozdziela storage i compute i zastosowuje własną warstwę przechowywania rozkładającą dane po klastrze. Integracja z Azure ma uprościć provisioning, CI/CD i zarządzanie — provisioning z poziomu Azure Portal, obsługa przez Azure CLI/SDK i integracja z Microsoft Entra ID oraz unified billing.

Dla zespołów AI autorzy podkreślają dwie zalety: skalowanie dopasowane do obciążeń i możliwość „database-per-customer” z szybkim provisionowaniem branchy, co ułatwia RAG-pipeline i izolację danych. GA dorzuca też integrację z Semantic Kernel, co sugeruje ukierunkowanie na zastosowania RAG i wewnętrzne platformy AI.

Krytyczne spojrzenie: zapewnienia o prywatności i izolacji brzmią dobrze na papierze, ale nie rozstrzygają istoty problemów: latencja przy separation of storage/compute, koszty przy wielu branchach, oraz konsekwencje backup/restore i zgodności (compliance) przy rozproszonym layerze storage. Integracja z Azure ułatwia użycie, ale też przybliża model do vendor lock-in — warto policzyć TCO i scenariusze awaryjne.

Dla architektów i zespołów: rozważcie Neon, jeśli potrzebujecie elastycznego środowiska deweloperskiego (branching) i łatwego provisioningu dla środowisk testowych lub per-tenant DB. Testujcie presję I/O i wzorce kosztowe dla waszych profilów zapisu, a także scenariusze odzyskiwania danych.

**Key takeaways:**
- Neon oferuje serverless Postgres z oddzieleniem storage/compute i natywną integracją Azure.
- Instant branching ułatwia developer experience i wzorce DB-per-customer.
- Sprawdźcie koszty, latencję i scenariusze backup/restore przed migracją produkcyjną.

**Tradeoffs:**
- Branchable, serverless Postgres improves developer velocity but sacrifices predictable latency and potentially increases storage-related costs.

**Link:** [Neon Serverless Postgres Now Generally Available as an Azure Native Integration](https://www.infoq.com/news/2025/05/neon-serverless-postgres-azure)

---

## QCon London 2025: How to Build a Database without a Server
**TLDR:** Man Group opisał zastąpienie rozbudowanego MongoDB farm serverlessowym rozwiązaniem opartym na object storage i bibliotece ArcticDB, z zastosowaniem CRDT i mechanizmów wersjonowania do obsługi danych finansowych. To praktyczny przypadek, kiedy „software library + object storage” wystarcza jako baza.

**Summary:**
Prezentacja Alexandra Seatona opisywała migrację systemu tradingowego od kompletu narzędzi opartych na MongoDB i Pandas do podejścia opartego na object storage + ArcticDB (native C++ + Python). Motywacja była prosta: skala i koszty farmy MongoDB stały się niekontrolowane, a wymagania na wersjonowanie danych i poprawki vendorów komplikowały przepływy przetwarzania.

Seaton proponuje prostą definicję „serverless database”: to połączenie biblioteki i object storage. Implementacja opiera się na strukturze drzewiastej obiektów, gdzie tylko najwyższe warstwy są mutowalne, a reszta jest immutable. Zastosowano CRDT tam, gdzie rozproszone aktualizacje muszą konwergować bez koordynacji, oraz mechanizmy radzenia sobie z dryftem zegara i opóźnieniami storage.

Krytyka i ograniczenia: podejście świetnie działa w kontekście czytelnym (read-heavy, deterministyczne operacje), ale jest mniej oczywiste przy wysokiej częstotliwości zapisu, transakcjach silnych czy potrzebie skomplikowanych zapytań ad-hoc. Autor nie rozwodzi się nad konsekwencjami dla ACID ani nad integracją z istniejącymi ekosystemami analytics/BI. Problem clock drift i wyboru „system clock vs storage clock” został zasygnalizowany, ale wymaga gruntownego testowania w produkcji.

Dla architektów i zespołów: rozważcie object storage + biblioteka (ArcticDB) gdy profil aplikacji to wersjonowane, dużych wolumenów, read-optimized dane i kiedy możecie zaakceptować ograniczenia w konsystencji i wzorcach zapisu. Projektujcie mechanizmy korekcyjne i testy odporności na dryft czasu i sieciowe opóźnienia.

**Key takeaways:**
- Serverless DB może oznaczać połączenie biblioteki + object storage, niekoniecznie usługę managed.
- CRDT i wersjonowanie pomagają rozwiązać rozproszone aktualizacje i korekty danych.
- Należy dokładnie przetestować zachowanie przy zapisie, latencji i scenariuszach odzyskiwania.

**Tradeoffs:**
- Using object storage for database storage reduces operational overhead but sacrifices strong transactional guarantees and predictable latency.

**Link:** [QCon London 2025: How to Build a Database without a Server](https://www.infoq.com/presentations/build-database-without-server-qcon-london-2025)

---

## Java News Roundup: OpenJDK JEPs, Hibernate Reactive, Infinispan, JHipster, Gatherers4j
**TLDR:** JDK 25 zbliża się z kilkoma ważnymi JEPami (m.in. Structured Concurrency, Flexible Constructor Bodies, Vector API), pojawiają się też aktualizacje ekosystemu (Hibernate Reactive 3.0 RC, Infinispan 16, JHipster). Dla backendów Java to miesiąc zmian wpływających na wydajność i model programowania współbieżnego.

**Summary:**
Przegląd informuje o przesunięciach statusu kilku JEPów do Targeted dla JDK 25: Structured Concurrency (fifth preview), Flexible Constructor Bodies, Scoped Values, Vector API i inne. Ruch ten pokazuje, że Java intensyfikuje pracę nad lepszym wsparciem dla współbieżności strukturalnej, wydajnych operacji wektorowych i ulepszeń startupu/warmup (Ahead-of-Time caching).

Dodatkowo JEPy typu JFR Cooperative Sampling i Ahead-of-Time Object Caching sugerują nacisk na obserwowalność i wydajność uruchamiania. W praktyce oznacza to lepsze narzędzia do profilowania oraz krótszy cold-start, co ma znaczenie w środowiskach serverless i mikroserwisach.

W ekosystemie pojawiły się też wersje Hibernate Reactive i Infinispan oraz kolejne wydania narzędzi takich jak JHipster. To sygnał, że tradycyjny stack Java dostosowuje się do wymagań niskiej latencji, re-aktywności i integracji z nowoczesnymi runtime’ami.

Dla architektów i zespołów: śledźcie JEPy, które faktycznie trafią do finalnego JDK; testujcie vector API i AOT caching w swoich profilach aplikacji. Nowe JEPy mogą zmienić wybory dotyczące GC, startupu i modeli współbieżności — zaplanujcie migracyjne POCy.

**Key takeaways:**
- JDK 25 wprowadza dużą ilość eksperymentalnych i docelowych JEPów dot. współbieżności i wydajności.
- Ekosystem (Hibernate Reactive, Infinispan) aktywnie adaptuje się do nowych wymagań.
- Warto testować wpływ JEPów na realne aplikacje przed adopcją w produkcji.

**Tradeoffs:**
- Adopting new JVM features (e.g., Structured Concurrency) can improve correctness and clarity but sacrifices immediate portability and requires team learning.

**Link:** [Java News Roundup: OpenJDK JEPs, Hibernate Reactive, Infinispan, JHipster, Gatherers4j](https://www.infoq.com/news/2025/05/java-roundup-jdk25)

---

## Temporal on AWS Aims to Ease Building Resilient Distributed Systems
**TLDR:** Temporal Cloud jest dostępny w AWS Marketplace, co ułatwia adopcję Durable Execution dla systemów rozproszonych — model Workflow/Activity z immutable event history ułatwia odzyskiwanie i utrzymanie spójności przy awariach.

**Summary:**
Temporal to platforma do orkiestracji durable execution: Workflows definiują długotrwałą logikę, Activities to wykonywalne kroki z retry policies, a Temporal Service przechowuje niezmienialną historię zdarzeń, co pozwala na wznowienie po awarii. Umieszczenie Temporal Cloud w AWS Marketplace ma uprościć zakup, integrację z AWS i deployment dla zespołów, które chcą skorzystać z durable execution bez samodzielnego hostingu.

Artykuł podkreśla typowe problemy rozproszonych systemów — od timeoutów usług zewnętrznych po przepełnione kolejki — i argumentuje, że durable execution redukuje ryzyko niespójnych stanów, pozwalając systemom „wznawiać” działanie od ostatniego kroku. Temporal utrzymuje event history, co ułatwia debuggowanie i audyt.

Co autor pomija lub upraszcza: koszt mentalny i architektoniczny wprowadzenia durable execution: zmiana sposobu myślenia o błędach, idempotency, retry i zarządzaniu stanem. Nie jest jasne, kiedy durable workflows są overkill — np. proste cronowe zadania czy krótkie transakcje mogą nie potrzebować takiego poziomu trwałości. Równie ważne: operationalne aspekty korzystania z Temporal Cloud (latencja, integracje z istniejącymi monitoringami, polityki retencji eventów) wymagają testów.

Dla architektów i zespołów: użyjcie Temporal dla procesów wieloetapowych, które muszą być odporne na błędy i odtworzalne, np. płatności, provisioning, długie pipeline’y. Zaplanujcie szkolenia deweloperów w modelu Workflows/Activities oraz scenariusze kosztowe i retencyjne.

**Key takeaways:**
- Durable execution upraszcza budowanie odpornych procesów rozproszonych dzięki pamiętaniu historii i możliwości wznowienia.
- Temporal Cloud w AWS ułatwia adopcję, ale trzeba przetestować integracje i koszty operacyjne.
- Nie każdy workflow wymaga durable execution — wybierajcie świadomie.

**Tradeoffs:**
- Durable Execution ensures reliability and resumability but sacrifices simplicity and introduces operational overhead and learning cost.

**Link:** [Temporal on AWS Aims to Ease Building Resilient Distributed Systems](https://www.infoq.com/news/2025/05/temporal-cloud-aws-marketplace)



---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by gpt-5-mini LLM. While we strive for accuracy, please verify critical information independently.
