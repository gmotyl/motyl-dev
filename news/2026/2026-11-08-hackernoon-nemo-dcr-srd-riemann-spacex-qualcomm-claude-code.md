---
title: "HackerNoon: odświeżanie wag w RL za 150 sekund, retrospekcja agentów, model za 4 tysiące dolarów i sieć 5G od SpaceX"
excerpt: "Przegląd tekstów HackerNoon o skalowaniu RL dla agentów, treningu 13B za grosze, planach SpaceX z Qualcommem i dwóch dniach pracy z Claude Code."
publishedAt: "2026-11-08"
slug: "hackernoon-nemo-dcr-srd-riemann-spacex-qualcomm-claude-code"
hashtags: "#HackerNoon #ai #ml #llm #agents #open-source #nvidia #claude-code #workflow #generated #pl"
source_pattern: "HackerNoon"
---

## NeMo-DCR: odświeżanie wag biliona parametrów w 150 sekund

**TLDR:** Zespół NVIDIA pokazuje, jak synchronizować wagi między klastrem treningowym a klastrami rollout bez wysyłania całego checkpointu. Wysyła się tylko zmiany i odświeżenie modelu 1T spada z 87,5 minuty do 150 sekund.

**Summary:** W agentowym uczeniu ze wzmocnieniem ponad siedemdziesiąt procent czasu zajmuje rollout, więc trening i generowanie odpowiedzi rozdziela się na osobne klastry, czasem w różnych centrach danych. Po każdym kroku optymalizatora nowa polityka musi dotrzeć do odbiorców. Przesłanie pełnego checkpointu modelu o skali Kimi K2 między dwoma regionami AWS trwa 87,5 minuty. Tymczasem w jednym kroku zmienia się tylko około jednego procenta wag w BF16, bo ośmiobitowa mantysa zaokrągla większość drobnych aktualizacji. Pełny transfer marnuje więc dziewięćdziesiąt osiem do dziewięćdziesięciu dziewięciu procent bajtów.

Samo wysyłanie różnic jest łatwe do wymyślenia, trudne do zrobienia poprawnie. Autorzy wskazują trzy problemy. Położenie zmian w układzie odbiorcy nie pokrywa się z układem treningowym. Wynik musi być zgodny co do bitu, bo niedopasowanie między treningiem a rollout destabilizuje RL. No i przesył musi się nakładać na budowanie delty bez kolektywnej operacji między klastrami, która przy awarii kończy się timeoutami. NeMo-DCR rozwiązuje to maskami XOR dla zmian afinicznych, nadpisaniami dla reszty, natywnym loaderem środowiska serwującego i wspólnym commitem wiążącym politykę z bazową wersją. Przy trzyprocentowej zmianie odświeżenie modeli od 30B do 1T jest od dwunastu do czterdziestu razy szybsze.

**Key takeaways:**
- Około jednego procenta wag zmienia się w kroku, więc reszta transferu jest zbędna.
- Dokładność co do bitu ma znaczenie, bo rozjazd trening-rollout psuje stabilność RL.
- Odzyskiwanie po awarii w trakcie odświeżania to część projektu, nie dodatek.

**Why do I care:** To raczej wiadomość dla ludzi od infrastruktury ML niż dla frontendowców. Dotyczy mnie tylko pośrednio, bo pokazuje, że wąskim gardłem agentów jest dziś sieć i logistyka wag, a nie sama moc obliczeniowa. Warto pamiętać, że to tekst o własnym artykule naukowym NVIDIA i liczby pochodzą z ich środowiska.

**Link:** [Trillion-Parameter RL Weight Syncs Drop From 87 Minutes to 150 Seconds](https://hackernoon.com/trillion-parameter-rl-weight-syncs-drop-from-87-minutes-to-150-seconds)

## Self-Retrospection Distillation: uczenie agenta przewidywania z własnych porażek

**TLDR:** Metoda Salesforce AI Research wykorzystuje ukończone trajektorie do uczenia agenta tego, co mógł przewidzieć przed działaniem. Dla modelu 2B, gdzie czysty RLVR utknął na 0 procentach sukcesu, dodanie SRD daje 60,6 procent.

**Summary:** W RLVR sygnał uczący to skalarna nagroda po fakcie. Przy grupowo względnych celach znika on, gdy wszystkie rollouty w grupie dostają tę samą nagrodę, a w długich zadaniach większość prób się nie udaje. Agent pokazał wtedy dużo o zadaniu i środowisku, ale uczy się z tego zero. Autorzy proponują uczenie prospektywne. Z gotowej trajektorii powstaje wiedza, która by się przydała, oraz pułapki do uniknięcia, i ta wiedza służy jako nadzór dla przewidywań robionych przed interakcją.

Technicznie to destylacja własnej polityki. Dla każdej trajektorii porównuje się przewidywanie z samego zadania z przewidywaniem uwarunkowanym na ukończoną interakcję i wyrównuje rozkłady na poziomie tokenów. Wynik przy inferencji nie musi być generowany. Na dziesięciu zadaniach z narzędziami i długim horyzontem zysk sięga 24,2 punktu procentowego, a największy jest tam, gdzie kontrast nagród jest rzadki, czyli gdzie od 37 do 98 procent grup ma jednakowy wynik.

**Key takeaways:**
- Porażki bez kontrastu nagród też niosą informację i można ją wyciągnąć.
- Przewidywanie jest tylko celem treningowym, więc koszt inferencji się nie zmienia.
- Największy efekt jest przy rzadkim sygnale, w skrajnym przypadku z 0 do 60,6 procenta.

**Why do I care:** Dla kogoś, kto buduje produkty na agentach, a nie trenuje ich, wniosek jest taki, że agenci sprawdzą się lepiej tam, gdzie ktoś zadał sobie trud wyciągnięcia nauki z porażek. Nie wiemy z tekstu, jak metoda działa poza dziesięcioma benchmarkami autorów, i tego bym się trzymał.

**Link:** [Self-Retrospection Distillation Lifts AI Agent Success From 0% to 60.6% When Every Rollout Fails](https://hackernoon.com/self-retrospection-distillation-lifts-ai-agent-success-from-0percent-to-606percent-when-every-rollout-fails)

## Riemann Computing: model 13B za mniej niż 4 tysiące dolarów i walka z OpenAI

**TLDR:** Założyciel Riemann Computing opisuje wstępny trening modelu 13B za około 3 tysiące dolarów sprzętu i 640 dolarów chmury. Drugi tekst tego autora to manifest przeciwko centralizacji AI.

**Summary:** Andrew Kamal opisuje pre-release modelu My Name is Riemann z linii OpenPeer AI. Wstępny etap poszedł na lokalnym sprzęcie za około trzy tysiące dolarów, a etapy od drugiego do szóstego na węźle DigitalOcean z ośmioma kartami AMD MI325X za 30,40 dolara za godzinę. Łącznie 21 godzin węzła, czyli 168 godzin GPU, dało koszt około 640 dolarów. Model bazuje na OpenPeerLLM i trenerze NTK. Autor zaznacza, że nie jest to chatbot ani produkt komercyjny, tylko fundament do rozbudowy.

Drugi tekst jest już czystą publicystyką. Autor chce zdetronizować OpenAI, wymienia obawy o prywatność, centralizację, reklamy w ChatGPT i sprawę Suchira Balaji, a jednocześnie promuje własny SDK i modele na Hugging Face. Sprzedawane mają być zastrzeżone kodeki i systemy dla firm.

**Key takeaways:**
- Koszt treningu podaje się tylko dla jednego, mało opisanego etapu i bez jakości wyników.
- Teksty mieszają informację z promocją własnej firmy.

**Why do I care:** Nie dostaję żadnego benchmarku, a bez niego liczba 4 tysięcy dolarów nic nie znaczy. Trenować coś za grosze umie każdy, kto nie sprawdza, czy to działa. To raczej lekcja czytania tekstów, które łączą naukę z marketingiem.

**Link:** [Building a 13B Parameter Model for Under $4K](https://hackernoon.com/building-a-13b-parameter-model-for-under-$4k-how-riemann-computing-could-change-everything)

## SpaceX i Qualcomm budują ogólnokrajową sieć 5G

**TLDR:** 4 listopada 2026 SpaceX i Qualcomm ogłosiły wieloletnią umowę na sieć naziemną pod marką Starlink Mobile. Budowa wież zaczyna się w 2027, a daty startu usługi nikt nie podał.

**Summary:** Qualcomm dostarczy krzem i warstwę pierwszą oprogramowania z linii Dragonwing, a SpaceX zbuduje urządzenia i napisze resztę stosu. Skala to dziesiątki tysięcy lokalizacji, a niepotwierdzone doniesienia mówią o rozmowach dotyczących nawet osiemdziesięciu tysięcy. SpaceX zebrało pasma za około 28 miliardów dolarów, głównie od EchoStar i Grain Management, ale łącznie ma około 80 MHz przy blisko 400 MHz T-Mobile. Wszystkie jego pasma są parowane FDD, a masywne MIMO na FDD jest trudniejsze niż na TDD.

Autor tekstu, Bruce Li, dokłada kontekst rynkowy. W USA średni przychód na użytkownika jest 2,8 raza wyższy niż w Europie, a poprzednia próba czwartego operatora, Dish, skończyła się upadłością. Szacunki kosztu sieci rozjeżdżają się od 10 do 500 miliardów dolarów, zależnie od tego, kogo zapytać, a samo SpaceX wydaje też ogromne kwoty na centra danych AI po przejęciu xAI.

**Key takeaways:**
- Technologia jest wiarygodna, ale pasma są wąskie i pochodzą tylko z FDD.
- Najtrudniejsze są pozwolenia, ekipy, backhaul i certyfikacja telefonów.
- Budżet SpaceX konkuruje z wydatkami na infrastrukturę AI.

**Why do I care:** To raczej opowieść biznesowa niż techniczna dla programisty. Interesuje mnie jedna rzecz. Zgodnie z tekstem, najtrudniejsza część nie jest technologią, tylko logistyką i prawem, i to samo widać w większości projektów softwarowych, które utknęły na integracji.

**Link:** [SpaceX Teams Up With Qualcomm to Build a Nationwide 5G Network](https://hackernoon.com/spacex-teams-up-with-qualcomm-to-build-a-nationwide-5g-network)

## Mój workflow z Claude Code: przebudowa strony w dwa dni

**TLDR:** Autor napisał 32 784 linii kodu w dwa dni, przebudował stronę na Next.js 16 i przepisał 228 postów, ale najważniejsze wnioski dotyczą osądu, nie szybkości pisania. Najlepszą rzeczą, jaką wysłał, było usunięcie kodu.

**Summary:** Autor sam podkreśla, że liczba linii to słaba metryka. W praktyce koszt produkcji kodu spadł mu prawie do zera, a koszt decydowania, co w ogóle powinno istnieć, nie zmienił się wcale. Praca składała się z pełnej przebudowy z Astro na Next.js 16 z Cache Components, przepisania 228 wpisów według danych o słowach kluczowych, 543 testów i zera zepsutych URL-i. Dało to około stu commitów i jedenaście zmergowanych pull requestów.

Zasady, które się sprawdziły, są proste. Ograniczenia zapisuje się przed pierwszym promptem, bo agent złamie wszystko, o czym nie wspomniano. Testy działają jak kontrakt, a każdy złapany błąd zamienia się w nowy test. Merge'e są na tyle małe, żeby dało się je przejrzeć. Audyty to pętla, w której człowiek decyduje, które znaleziska są prawdziwe. Najlepszy przykład z tekstu to publiczne JSON API, które agent zbudował wraz z wersjonowaniem i nagłówkami deprecacji, a autor po kilku godzinach je usunął, bo nic nie dawało. Liczba stron statycznych spadła z 1093 do 596.

Agent też się mylił. Przekierował paginację i zamienił ukryte projekty w 404, co z perspektywy designu miało sens, a z perspektywy SEO było błędem. Po tym autor dodał stałą regułę zachowania każdego URL-a i sprawdzanie starego sitemapu względem nowych tras. Dane słów kluczowych z DataForSEO kosztowały 4,37 dolara przy 313 zapytaniach, a frazę z około 720 wyszukiwań miesięcznie autor świadomie pominął, bo mu nie pasowała.

**Key takeaways:**
- Ograniczenia napisz przed promptem, a nie po pierwszym błędzie.
- Każdy złapany błąd agenta powinien stać się testem.
- Pytanie "czy to powinno istnieć" nie jest pytaniem dla agenta.
- Przebudowa bez automatycznego sprawdzania starych URL-i grozi utratą zaindeksowanych stron.

**Why do I care:** Najbardziej lubię tu historię z usuniętym API, bo to dokładnie to, co widzę na projektach. Agent dowiezie czysto zrobioną rzecz, której nikt nie potrzebuje. Autor omija jedno niewygodne pytanie, a mianowicie ile z tych dwóch dni to rzeczywista praca, a ile to wcześniejsze lata przygotowania treści i wiedzy o własnym serwisie. Wynik 32 tysięcy linii na dwa dni jest efektem właśnie tego.

**Link:** [My Claude Code Workflow: Lessons From Rebuilding a Website in Two Days](https://hackernoon.com/my-claude-code-workflow-lessons-from-rebuilding-a-website-in-two-days)
