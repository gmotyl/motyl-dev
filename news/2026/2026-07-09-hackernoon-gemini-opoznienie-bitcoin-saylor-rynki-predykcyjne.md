---
title: "Google opóźnia Gemini 3.5 Pro, rynki predykcyjne biją rekordy, a Bitcoin stawia Saylora pod ścianą"
excerpt: "Przegląd najciekawszych tekstów z HackerNoon: od dramatycznych decyzji Google DeepMind, przez analizę struktury finansowej Strategy, po techniczne case study migracji routingu iMessage i autoskalowania workloadów AI."
publishedAt: "2026-07-09"
slug: "hackernoon-gemini-opoznienie-bitcoin-saylor-rynki-predykcyjne"
hashtags: "#hackernoon #technology #programming #ai #bitcoin #cryptography #devops #burnout #imessage #autoscaling #pl"
source_pattern: "HackerNoon"
---

## Google opóźnia Gemini 3.5 Pro do 17 lipca: strategia czy porażka?

**TLDR:** Google DeepMind porzuciło bazowy model Gemini 3.5 Pro kilka dni przed planowanym wdrożeniem i przesunęło premierę na 17 lipca 2026. Przyczyną był zbyt mały margines wydajności nad tańszym modelem Flash oraz problemy z rozumowaniem matematycznym.

Sundar Pichai na Google I/O zapowiedział Gemini 3.5 Pro jako model dostępny "w przyszłym miesiącu". Kilka dni przed wdrożeniem DeepMind wyciągnął wtyczkę z całego pipeline'u produkcyjnego. Wewnętrzne ewaluacje ujawniły dwa poważne problemy: model nie dawał rady z rekurencyjnym wywoływaniem narzędzi w złożonych środowiskach oraz generowaniem wielowarstwowych struktur matematycznych. To nie był błąd marginsu - to był błąd fundamentu.

Kontekst rynkowy jest brutalny. Flash 3.5 osiągnął 76,2% na Terminal-Bench 2.1, bijąc starszego Pro 3.1 przy ułamku kosztów. Gdyby nowy Pro wyszedł na stałym fundamencie, nie uzasadniałby cennika enterprise przy takiej różnicy możliwości. To tzw. paradoks Pro-to-Flash: kiedy tańszy model bije droższy, cały argument za premium przestaje działać. DeepMind wybrał opóźnienie zamiast kompromitacji przy porównaniach benchmarkowych.

Artykuł słusznie wskazuje, że prawdziwe ryzyko dla Google to nie spóźnienie, ale pułapka benchmark engineeringu - optymalizowanie modelu pod sterylne testy zamiast pod realne, nieuporządkowane środowisko enterprise. To problem całej branży. Liczby w laboratorium pięknie się układają, a potem model traci spójność strukturalną na prawdziwym zadaniu użytkownika. Artykuł trafnie nazywa ten mechanizm, choć przedstawia go głównie jako ryzyko, nie jako diagnozę istniejącego stanu rzeczy.

Z perspektywy architekta, który integruje modele językowe w aplikacjach, decyzja DeepMind jest symptomatyczna. Rynek frontieru przyspieszył do punktu, gdzie "incremental iteration" jest strategicznym samobójstwem. Gemini 3.5 Flash jako bufor dla pipeline'ów enterprise to uczciwa rekomendacja - model robi robotę i jest tani. Przesunięcie do GPT-5.6 czy Fable 5 przy zero-tolerancji na błędy w refaktoringu to też rozsądna porada. Tyle że artykuł omija jeden istotny temat: ryzyko vendor lock-in przy nagłym przestawieniu routingu na konkurencję tuż przed debiutem nowego modelu Google.

**Key takeaways:**
- Gemini 3.5 Pro przesunieto na 17 lipca 2026 po rezygnacji z bazowego modelu w ostatniej chwili
- Przyczyną były braki w rozumowaniu matematycznym i generowaniu złożonych struktur
- Flash 3.5 pozostaje solidnym modelem dla wysokiej przepustowości przy cenach 1,50/9,00 USD za milion tokenów
- Google stosuje agresywne rabaty na cache promptów (90% redukcja) jako narzędzie retencji deweloperów podczas przejścia

**Why do I care:** Jako architect integrujący LLM w aplikacjach, ten przypadek przypomina, że nie można planować roadmapy produktu wokół konkretnego modelu od konkretnego dostawcy. Multi-provider redundancy to nie paranoja - to inżynierska konieczność. DeepMind cofnął cały model dzień przed wdrożeniem. Twój harmonogram nie pyta, czy to wygodne.

**Link:** [Google Delays Gemini 3.5 Pro to July 17: The Strategic Play Behind the Scrapped Base Model](https://hackernoon.com/google-delays-gemini-35-pro-to-july-17-the-strategic-play-behind-the-scrapped-base-model)

---

## Rynki predykcyjne wchodzą w erę infrastruktury

**TLDR:** Rynki predykcyjne osiągnęły rekordowe 44,8 miliarda dolarów wolumenu w czerwcu 2026, napędzane w dużej mierze przez Mistrzostwa Świata w Piłce Nożnej. Jednocześnie sektor mierzy się z problemami regulacyjnymi, atakiem na front-end Polymarket i rosnącą fragmentacją prawną między stanami.

Kalshi zebrało 31,5 mld USD wolumenu w samym czerwcu, przy czym rywalizacja o to, kto kontroluje "stack" - od relacji z klientem, przez giełdę, po rozstrzyganie kontraktów - stała się główną osią strategiczną. Meta buduje Arena jako produkt punktowy bez prawdziwych pieniędzy, DraftKings otworzył własną platformę DKeX, Plus500 podłączył się pod Kalshi, a World integruje rynki predykcyjne bezpośrednio w portfelu Phantom. Każde podejście reprezentuje inną tezę o tym, gdzie leży wartość w tej układance.

Równolegle CFTC otworzyło "rozległe śledztwo" wobec Polymarket po doniesieniach o fałszywych stronach z wirtualnymi zakładami i ukrytych płatnościach dla twórców treści. Bipartisane pismo senatorów Curtisa i Schiffa do szefa CFTC zadaje pytanie, które może zmienić cały sektor: czy marketing platform predykcyjnych ma wyglądać jak marketing instrumentów finansowych, czy jak agresywna reklama zakładów hazardowych? To nie jest pytanie retoryczne - w tym pytaniu leży cały argument federalny, który przez lata budował Polymarket.

Z perspektywy technicznej i prawnej najpoważniejszy sygnał to atak na front-end Polymarket przez skompromitowanego dostawcę zewnętrznego. Straty oszacowano na około 3,1 mln USD, a platforma deklaruje pełny zwrot. Sektor generujący prawie 45 mld USD miesięcznego wolumenu nadal bazuje na infrastrukturze front-endowej podatnej na atak łańcucha dostaw. To nie jest egzotyczne ryzyko - to fundamentalny problem dojrzałości inżynieryjnej całej przestrzeni.

**Key takeaways:**
- Czerwcowy wolumen rynków predykcyjnych wyniósł 44,8 mld USD, wzrost o 75% względem maja
- Rywalizacja toczy się o to, kto kontroluje warstwę relacji z klientem, giełdę i dane
- CFTC wszczęło śledztwo wobec Polymarket; Michigan i Nevada zablokowały Kalshi
- Atak na front-end Polymarket skompromitował ok. 3,1 mln USD mimo gigantycznych wolumenów

**Why do I care:** Regularna ekspozycja na te sektory jako architekt to przede wszystkim case study supply chain security. Sektor finansowy z dziesiątkami miliardów wolumenu i podatnym front-endem trzeciej strony to dokładnie ten sam problem, który istnieje w każdej aplikacji webowej łączącej zewnętrzne SDK z operacjami finansowymi. Tutaj po prostu konsekwencje są widoczne w ciągu godzin, nie tygodni.

**Link:** [Prediction Markets Are Entering Their Infrastructure Era](https://hackernoon.com/prediction-markets-are-entering-their-infrastructure-era)

---

## Michael Saylor lepiej uważaj, żeby Bitcoin nie urósł za bardzo

**TLDR:** Strategy (dawny MicroStrategy) odnotował 80-procentowy spadek akcji i 13,6 mld USD niezrealizowanej straty na Bitcoinie. Artykuł rozkłada na czynniki pierwsze strukturę finansową spółki i pokazuje, że "42% dyskonto do Bitcoina" to błąd ramowania, nie diagnoza Ponziego.

Artykuł jest jednym z lepszych analitycznych tekstów o MSTR od dawna - rzadkość w przestrzeni, gdzie dominują albo kult Saylora, albo bezrefleksyjny niedźwiedź. Autor poprawnie rozróżnia trzy sposoby liczenia mNAV: prosty (0,58 - nagłówkowy), skorygowany o dług (0,99), i perspektywa wspólnego akcjonariusza (1,03). Narracja "42% taniej niż Bitcoin" opisuje matematykę lewara, nie oszustwo. To fundamentalna różnica.

Struktura długu Strategy jest celowo zbudowana tak, żeby unikać margin call. Obligacje zamienne są niezabezpieczone Bitcoinem, kupony wahają się od 0% do 2,25%, a harmonogram zapadalności rozłożony jest do 2032. Preferenty są wieczyste, więc nie ma dat przymusowego zwrotu kapitału. Firma może przetrwać bessę bez spieniężenia rezerw - pod warunkiem, że Bitcoin nie zostanie uśpiony w kanalikach bocznych przez cały 2027-2028, kiedy okno put'ów na zamienne papiery opiewa na ok. 5,9 mld USD gotówki.

Ale autor identyfikuje też coś, co konsensus przeoczył: prawy szczęk imadła. Jeśli Bitcoin mocno wzrośnie, CAMT - podatek 15% od "dochodu z wyceny rynkowej" - może wymusić realne płatności gotówkowe od niezrealizowanych zysków papierowych. Ta sama reguła ASU 2023-08, którą Saylor lobbował latami, jest teraz potencjalną pułapką podatkową przy silnych wzrostach. Firma, której struktura nie może przeżyć ani zbyt niskiego, ani zbyt wysokiego Bitcoina, to naprawdę niezwykły konstrukt finansowy.

Artykuł nie jest rekomendacją zakupu - i to właściwe podejście. Dostarcza coś cenniejszego: zestaw konkretnych sygnałów do śledzenia, od poziomu rezerwy USD, przez mNAV, po przywrócenie parytetu STRC. Sprzedaż 3588 BTC w tydzień po artykule spowodowała 3-procentowy ruch zamiast 20%, co autor interpretuje jako "szczepienie rynku" na te operacje. Teza jest falsyfikowalna i datowana. Rzadkie.

**Key takeaways:**
- "42% dyskonto do Bitcoina" to efekt lewara, nie sygnał Ponziego - właściwy wskaźnik dla akcjonariusza to mNAV 1,03
- Dług Strategy jest niezabezpieczony BTC i tani (0-2,25% kupon), więc brak margin call'a przy spadkach
- Okno cash demands w 2027-2028 wynosi ok. 5,9 mld USD - Bitcoin musi odrobić koszt zakupu zanim te terminy nastąpią
- CAMT (15% podatek od papierowych zysków) to ukryte ryzyko przy silnych wzrostach Bitcoina

**Why do I care:** Nie jako inwestor, ale jako inżynier rozumiejący złożone systemy z ukrytymi pętlami sprzężeń zwrotnych. Sama architektura tej struktury finansowej - gdzie oba kierunki rynku mogą być zabójcze, ale z różnych powodów - jest fascynującym przykładem tego, jak można zbudować system odporny na jeden scenariusz kosztem wrażliwości na inny. Każda decyzja architektoniczna w oprogramowaniu robi to samo.

**Link:** [Michael Saylor Better Hope Bitcoin Doesn't Rise Too Much](https://hackernoon.com/michael-saylor-better-hope-bitcoin-doesnt-rise-too-much)

---

## Kolejna aplikacja do medytacji nie rozwiąże wypalenia w pracy

**TLDR:** Badanie 46 336 pracowników wykazało, że programy wellbeing w firmach nie poprawiają samopoczucia uczestników. Wypalenie zawodowe to problem organizacyjny, nie problem odporności jednostki. Artykuł koncentruje się na IT jako sektorze, gdzie mechanizmy wypalenia są wyjątkowo widoczne.

WHO w ICD-11 zdefiniowało wypalenie jako "syndrom wynikający z chronicznego stresu w miejscu pracy, który nie został skutecznie zarządzony" i wprost zaznacza, że to zjawisko wyłącznie zawodowe. Trzy wymiary: wyczerpanie, cynizm wobec pracy i rozpadające się poczucie kompetencji. Mimo to firmy kupują subskrypcje aplikacji oddechowych zamiast zmieniać warunki pracy. Fleming zbadał ponad 46 000 osób i nie znalazł efektu po żadnej z interwencji indywidualnych. Metaanaliza Panagioti z JAMA Internal Medicine wykazała, że interwencje organizacyjne redukują wypalenie 2,5 raza skuteczniej niż indywidualne.

W IT mechanizmy wypalenia mają nazwy i właścicieli. ISC2 informuje, że 48% specjalistów czuje się wyczerpanych tempem zmian i AI, 47% przeciążonych objętością pracy. Globalna luka zatrudnienia w cybersecurity wynosi 4,76 mln osób. Dyżury SRE: prawie 70% podaje je jako bezpośrednią przyczynę wypalenia, a rotacje poniżej pięciu inżynierów tworzą pętlę samonapędzającą się - im mniej osób, tym więcej alertów na osobę, tym szybciej kolejna osoba odchodzi. Autor opisuje to jako "on-call death spiral" i ma rację.

Artykuł trafnie identyfikuje pułapkę zarządczą: menedżerowie mają zdyscyplinować wypalenie, ale sami wypalają się równie intensywnie. Badanie UKG wykazało, że menedżerowie wpływają na zdrowie psychiczne pracowników w takim samym stopniu jak partnerzy życiowi (69%). Wypalony, niezaangażowany menedżer nie jest neutralny - jest wektorem transmisji. Jednak rzeczywistym lewarem jest struktura pracy, nie szkolenie menedżerów.

**Key takeaways:**
- Interwencje wellbeing (aplikacje, szkolenia z resilience) nie wykazują mierzalnego efektu w badaniach populacyjnych
- WHO klasyfikuje wypalenie jako zjawisko czysto zawodowe, nie medyczne
- W IT: dług techniczny, cienkie rotacje dyżurne i zbyt małe budżety na headcount to strukturalne przyczyny wypalenia
- Interwencje organizacyjne są 2,5x skuteczniejsze niż indywidualne

**Why do I care:** Każdy senior developer i architekt prędzej czy później zarządza innymi lub ma wpływ na to, jak praca jest zorganizowana. Artykuł daje konkretne narzędzia - capping toil na wzór SRE, rotacja dyżurna z minimalną liczbą osób, authority aligned z accountability - zamiast ogólnikowych rad "zadbaj o siebie". To różnica między diagnozą a receptą.

**Link:** [Another Meditation App Is Not the Fix to Workplace Burnout](https://hackernoon.com/another-meditation-app-is-not-the-fix-to-workplace-burnout)

---

## Dlaczego Google zastępuje RSA przez ECDSA (i dlaczego to nie jest o quantum)

**TLDR:** Google Trust Services przechodzi na certyfikaty ECDSA dla liści TLS w Q2 2026. Powód jest banalny: mniejsze certyfikaty, mniej bajtów do przesłania. Nie chodzi o kryptografię post-kwantową - wbrew temu, co sugeruje większość nagłówków.

Artykuł zaczyna od postawienia sprawy jasno: ECDSA P-256 jest bardziej podatna na atak kwantowy niż RSA-2048. Algorytm Shora na krzywych eliptycznych 256-bitowych potrzebuje około 2330 logicznych kubitów, podczas gdy dla RSA-2048 to około 4100. Jeśli czytasz zmianę Google jako "przygotowanie do ery kwantowej", czytasz ją wstecznie. To jest optymalizacja klasyczna, nie post-kwantowa.

Właściwe pytanie to: dlaczego autentykacja TLS jest na wolnym zegarze, podczas gdy wymiana kluczy już dawno przeszła na hybrydowe podejście post-kwantowe? Odpowiedź leży w różnicy między zagrożeniami. Wymiana kluczy musi być bezpieczna teraz, bo ataki "harvest now, decrypt later" są realne już dziś. Certyfikat uwierzytelniający musi być bezpieczny w momencie weryfikacji, a ta weryfikacja dzieje się podczas handshake'u - który już się skończył, zanim komputery kwantowe staną się problemem. Certyfikaty TLS rotują szybko (CA/Browser Forum ustaliło docelowy czas życia 47 dni od marca 2029), więc migracja jest możliwa zanim zagrozą nam kwantowe maszyny.

Problem z migracją sygnatur post-kwantowych do TLS to bity. ML-DSA-44 produkuje sygnatury 2420 bajtów versus 64 bajty dla ECDSA. Szacunki Cloudflare mówią o podwojeniu liczby bajtów per connection przy przejściu na post-kwantowe sygnatury. Dlatego Google pracuje nad Merkle Tree Certificates (PLANTS working group w IETF) - format, który zamiast długich łańcuchów sygnatur przesyła jedną sygnaturę, jeden klucz publiczny i dowód inkluzji Merkle. Let's Encrypt zapowiedział wsparcie dla MTC w staging pod koniec 2026, produkcja w 2027.

**Key takeaways:**
- Zmiana Google RSA na ECDSA to optymalizacja bajtów, nie przygotowanie post-kwantowe
- ECDSA P-256 jest łatwiejszym celem dla komputerów kwantowych niż RSA-2048
- Wymiana kluczy (X25519MLKEM768) jest już post-kwantowa w Chrome, Firefox, Safari i Edge
- Sygnatury TLS czeka zupełnie nowy format (Merkle Tree Certificates), bo drop-in ML-DSA jest za duży
- Chrome jawnie mówi, że nie ma planu dodawania post-kwantowych certyfikatów X.509 do root store

**Why do I care:** Każda aplikacja wysyłająca TLS - czyli każda aplikacja webowa - będzie dotknięta tą migracją. Kluczowa rada z artykułu: nie kupuj "quantum-safe certificates" dla publicznej sieci w 2026, bo żaden browser root program ich nie akceptuje. Natomiast jeśli piszesz firmware, kod do podpisywania pakietów albo dokumenty z długim terminem ważności - migracja sygnatur post-kwantowych jest pilna już teraz, bo moment weryfikacji jest w przyszłości.

**Link:** [Why Google Is Replacing RSA With ECDSA (And Why It Isn't About Quantum)](https://hackernoon.com/why-google-is-replacing-rsa-with-ecdsa-and-why-it-isnt-about-quantum)

---

## Jak Photon przebudował routing iMessage do obsługi 10M+ wiadomości dziennie

**TLDR:** Photon zmigrował runtime z Bun do Node.js, naprawił wyciek pamięci Promise.race baloonujący pody do 5 GB, usunął bug w cache bindingów cicho gubący wiadomości i zastąpił fan-out per-request trwałym event logiem w Postgres. Efekt: usunięto 5207 linii kodu.

Architektura bazowa Photon to wspólne numery iMessage dla użytkowników free i pro, gdzie każda wiadomość przychodzi z informacją o numerze Photon i numerze nadawcy, a system musi rozstrzygnąć, który projekt jest właścicielem rozmowy. Przy 10M+ wiadomości dziennie oryginalny model fan-out - gdzie każda replika proxy otwierała gRPC stream do każdej instancji relay i rozwiązywała ownership per event - stał się fundamentalnie kruchy.

Wyciek pamięci był klasycznym przykładem Promise.race. Przy łączeniu 20 backendowych streamów gRPC przez Promise.race, 19 przegrywających obietnic przy każdej iteracji dostawało nową reakcję (przez ponowne wywołanie .then()) i trzymało pełny payload wiadomości. Przy 73 subskrypcjach pod był na 287 MB z 2,2 mln obiektów SlimPromiseReaction w linked list. Po naprawie - stały narzut per-source zamiast nieograniczonego łańcucha - zużycie pamięci poda spadło z gigabajtów do ~90 MB.

Migracja z Bun do Node to nie była decyzja o wydajności - to była decyzja o obserwowalności. Bun nie eksponuje wewnętrznych hooki diagnostics_channel Node, przez co OpenTelemetry nie mógł śledzić wychodzących wywołań HTTP. Dwa z trzech podów produkcyjnych były kompletnie niewidoczne dla monitoringu po tym, jak eksporter OTLP przez HTTP zaczął cicho tracić połączenie po restarcie collectora (half-close na socket keep-alive). Rozwiązanie: przełączenie eksportera na gRPC, który zarządza cyklem życia kanału transparentnie.

Trójstanowy wynik bindingów (resolved / none with reason / TransientBindingError) to jedna z lepszych decyzji architektonicznych opisanych w artykule. Wcześniej timeout upstream i definitywna odpowiedź "brak bindingu" były nieodróżnialne dla cache'a - obydwie skutkowały cichym porzuceniem wiadomości przez cały TTL.

**Key takeaways:**
- Promise.race leak: 19 przegrywających obietnic akumuluje reakcje bez końca - naprawiane przez single-producer queue z jedną obietnicą wakeup
- Obserwowalność to nie nice-to-have: Bun blokował OpenTelemetry, przez co 2/3 podów były martwe dla monitoringu
- Cache z dwoma stanami (true/false) jest złym projektem w systemach rozproszonych - potrzeba trzeciego stanu dla błędów przejściowych
- Durable event log z rozwiązaniem ownership przy ingeście usunął całe Redisowe koordynowanie i 5207 linii kodu

**Why do I care:** Ten artykuł to rzadki przypadek production postmortem, który nie ukrywa błędów i opisuje dokładne mechanizmy każdej porażki. Jako architekt systemów eventowych widzę tu trzy lekcje: runtime jest decyzją infrastrukturalną (nie tylko deweloperską), cache musi modelować niepewność a nie tylko wyniki pozytywne/negatywne, i "resolve once, persist, read many" to zasada, która czyni systemy asynchroniczne dramatycznie prostszymi.

**Link:** [How We Rebuilt Photon's Shared iMessage Routing to Handle 10M+ Messages a Day](https://hackernoon.com/how-we-rebuilt-photons-shared-imessage-routing-to-handle-10m-messages-a-day)

---

## Dobór właściwych sygnałów autoskalowania dla workloadów AI

**TLDR:** CPU-based HPA na podach GPU jest błędem architektonicznym, nie kwestią tuningu. CPU nie jest na tej samej ścieżce krytycznej co GPU. Właściwym podejściem jest KEDA z kolejką jako sygnałem wiodącym i GPU utilization jako zabezpieczeniem.

Autor opisuje konkretny incydent: HPA z targetCPUUtilizationPercentage: 70 zachowywał spokój przy CPU na 35%, podczas gdy GPU były na 100%, kolejka miała 47 requestów w tle, a p99 latency szło w pionie. Autoscaler działał poprawnie - raportował dokładnie to, co mierzył. Problem polegał na tym, że mierzył zły zasób. CPU na podzie GPU obsługuje tokenizację, HTTP i batch assembly. Praca, która nasyca system, żyje na akceleratorze.

Distinction między CPU-low/GPU-pinned (requesty kolejkują się wewnątrz serving engine) a CPU-high/GPU-idle (burst małych requestów napędza marshalling, ale GPU czeka między batchami) pokazuje, że te dwie metryki nie mają stabilnej korelacji. Obniżanie progu CPU nie rozwiązuje problemu zdekompensowanego sygnału - przesuwa tylko poziom szumu.

Właściwy model: backlog kolejki (SQS, Kafka, RabbitMQ) jako sygnał wiodący, GPU utilization z DCGM jako guardrail. KEDA ScaledObject z dwoma wyzwalaczami - aws-sqs-queue i prometheus na DCGM_FI_DEV_GPU_UTIL - oblicza oba i skaluje do największej rekomendacji. Skalo-do-zera jest realnym dźwignią kosztową dla workloadów batch i bursty, ale cold start (scheduling + model load + CUDA warmup) może potrwać dziesiątki sekund. Dla synchronicznego inferencji z SLO na time-to-first-token lepiej trzymać minReplicaCount: 1.

Artykuł jest technicznie precyzyjny i nie wpada w pułapkę ogólnych rad. Zwraca uwagę na jeden ważny szczegół: trigger does not equal placement. KEDA decyduje o liczbie replik, cluster autoscaler i scheduler decydują, gdzie je umieścić. Mieszanie tych dwóch warstw to typowy błąd przy pierwszych wdrożeniach GPU na Kubernetes.

**Key takeaways:**
- CPU na podzie GPU to zdekompensowany proxy - nie mierzy zasobu, który nasyca się jako pierwszy
- Backlog kolejki to sygnał wiodący, GPU utilization to zabezpieczenie przed nasyceniem
- KEDA umożliwia scale-to-zero i obsługuje zewnętrzne sygnały poza cgroup (czego vanilla HPA nie robi)
- Cold start przy scale-from-zero może trwać sekundy do dziesiątek sekund dla dużych modeli
- Trigger (ile replik) i placement (gdzie je umieścić) to dwie oddzielne warstwy

**Why do I care:** Autoskalowanie workloadów ML to coraz częstszy temat w rozmowach o infrastrukturze aplikacji z AI. Artykuł dostarcza konkretny kontrprzykład (incydent na produkcji) i gotowy pattern (ScaledObject z dwoma sygnałami). To jest rodzaj treści, który oszczędza kilka godzin debugowania przy pierwszym spotkaniu z problemem na własnym klastrze.

**Link:** [Choosing the Right Autoscaling Signals for AI Workloads](https://hackernoon.com/choosing-the-right-autoscaling-signals-for-ai-workloads)
