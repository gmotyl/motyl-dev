---
title: "Tańsze LLM-y, szybsze bazy i XP za skupienie: przegląd inżynierski z HackerNoon"
excerpt: "Od continuous aggregates w TimescaleDB, przez transformery na iOS, po benchmark tanich modeli językowych w produkcyjnym pipeline agentów. Sześć tematów, które warto znać, jeśli budujesz systemy działające na produkcji, a nie tylko w slajdach."
publishedAt: "2026-08-08"
slug: "tanie-llm-timescaledb-onnx-ios-xp-system"
hashtags: "#HackerNoon #TimescaleDB #LLM #iOS #AdversarialML #generated #pl"
---

## TimescaleDB 2.28: mniej blokad, szybsze zapytania na skompresowanych danych

**TLDR:** TimescaleDB 2.28 rozwiązuje trzy bolączki, które każdy, kto operuje na dużych tabelach time-series, zna z bólu: refresh continuous aggregate blokujący cały hypertable, brak możliwości dodania kolumny bez przebudowy widoku oraz zapytania "ostatnia wartość" wymagające dekompresji całych batchy tylko po to, żeby wyciągnąć jedną liczbę. Do tego kończy się wsparcie dla PostgreSQL 15.

**Summary:** Jeśli kiedykolwiek próbowałeś dodać nową metrykę do istniejącego continuous aggregate w Postgresie, wiesz, że do niedawna oznaczało to najczęściej dropnięcie widoku i przeliczenie całej historii od zera. Przy dużych zbiorach danych to godziny przestoju albo skomplikowana choreografia z tabelami tymczasowymi. TimescaleDB 2.28 wprowadza ADD COLUMN bezpośrednio na materializowanym widoku, z GENERATED ALWAYS AS i możliwością dogrania danych historycznych w tle, bez zrywania kontraktu z konsumentami widoku. To dokładnie ten rodzaj zmiany, który nie trafia na pierwsze strony, ale realnie zmienia codzienną pracę zespołu danych.

Drugą rzeczą, która rzuca się w oczy, jest przejście z blokady na poziomie całej tabeli na blokadę wiersza w katalogu continuous aggregate. Wcześniej odświeżenie agregatu blokowało wszystkie równoległe operacje na tej samej hypertable, więc zespoły musiały wybierać między świeżością danych na dashboardzie a możliwością robienia bulk loadów w tym samym czasie. Teraz refresh i bulk load mogą działać równolegle, bo blokowany jest tylko wpis katalogowy, a nie cała zmaterializowana tabela. Do tego doszło batchowanie dużych okien odświeżania, więc trzydziestodniowe okno można podzielić na mniejsze kawałki zamiast trzymać jedną, ciężką transakcję, która potrafiła się wywalić w połowie i zablokować vacuum na kilka godzin.

Trzeci wątek to przyspieszenie zapytań first() i last() na danych skompresowanych. To jest chyba najbardziej niedoceniana zmiana w tym release. Każdy dashboard monitoringowy pyta bez przerwy o "ostatnią wartość per seria", a wcześniej baza dekompresowała cały batch tylko po to, żeby wyciągnąć wartość, która i tak leżała w metadanych sortowanego batcha. Teraz TimescaleDB czyta to bezpośrednio z sparse indexu, bez dekompresji, i to samo dotyczy wyrażeń CASE w agregacjach, które wcześniej wybijały zapytanie z trybu wektoryzowanego na przetwarzanie wiersz po wierszu.

Ostatnia rzecz do zapamiętania, jeśli masz cokolwiek na PostgreSQL 15: to jest ostatni release, który go wspiera. Migracja na PG16, 17 albo 18 zwykle zajmuje sekundy do minut przy logical replication, ale trzeba ją zaplanować, zanim zacznie się robić problem.

**Key takeaways:**
- ADD COLUMN na continuous aggregate pozwala ewoluować schemat bez przebudowy i przestoju.
- Blokada przeniesiona z całej tabeli na wiersz katalogu, refresh i bulk load działają równolegle.
- Zapytania first()/last() na skompresowanych danych czytane bezpośrednio z metadanych, bez dekompresji.
- Wsparcie dla PostgreSQL 15 kończy się razem z 2.28, migracja na PG16+ do zaplanowania w najbliższych dwóch miesiącach.

**Why do I care:** Z perspektywy architekta systemów danych to jest dokładnie ten typ release'u, który nie robi wrażenia na demo, ale odchudza listę incydentów na produkcji. Blokady na continuous aggregate to klasyczny przykład problemu, który wygląda niegroźnie w środowisku deweloperskim, a na produkcji przy większym ruchu zamienia się w kaskadę timeoutów. Jeśli macie w stosie TimescaleDB i dashboardy oparte na agregatach czasowych, warto zaplanować upgrade nie tylko dla nowych funkcji, ale dla samej redukcji ryzyka operacyjnego, zwłaszcza że migracja z PG15 i tak jest nieunikniona.

**Link:** [TimescaleDB 2.28: Faster Queries, Lighter Operations, and Better Schema Evolution](https://hackernoon.com/timescaledb-228-faster-queries-lighter-operations-and-better-schema-evolution)

## Transformery ONNX na iOS: jak uruchomić model językowy offline w Swift

**TLDR:** Artykuł pokazuje, krok po kroku, jak wczytać model transformerowy w formacie ONNX (np. DistilBERT) w aplikacji iOS, uruchomić inferencję przez ONNX Runtime i przygotować tokenizację przez pakiet Swift Transformers od Hugging Face. Całość działa lokalnie, bez wywołań do chmury.

**Summary:** Przez lata integracja AI w aplikacjach iOS sprowadzała się do jednego wzorca: wysyłasz prompt do API, czekasz na odpowiedź, płacisz za każde zapytanie i modlisz się, żeby użytkownik miał zasięg. Autor przypomina, że to się zmieniło wraz z rozwojem Apple Neural Engine, Core ML i całego ekosystemu narzędzi do lokalnej inferencji, takich jak llama.cpp, MLX czy ONNX Runtime. Dla wielu zastosowań, klasyfikacji tekstu, wyszukiwania semantycznego, prostych asystentów, model wcale nie musi siedzieć w chmurze.

Sam proces techniczny jest bardziej przyziemny niż mogłoby się wydawać. Model wyeksportowany z PyTorcha do formatu .onnx trafia do bundle'a aplikacji albo do zasobu pakietu Swift, a Microsoft dostarcza oficjalny pakiet Swift Package Manager do uruchamiania inferencji. Trzy elementy budują sesję: ORTEnv do konfiguracji środowiska i logowania, ORTSessionOptions do dostrojenia wykonania i ORTSession, która faktycznie ładuje model do pamięci. Ciekawszy jest etap przygotowania danych wejściowych, bo transformer nie przyjmuje surowego tekstu, tylko tensory input_ids i attention_mask wygenerowane przez tokenizer, który musi być identyczny z tym użytym podczas trenowania modelu. Autor słusznie podkreśla, że nawet drobna różnica w tokenizacji potrafi wywrócić jakość predykcji, mimo że sam model jest poprawny.

To, co mnie w tym tekście przekonuje, to brak przesadnego marketingu wokół AI on-device. Autor nie twierdzi, że lokalna inferencja zastąpi duże modele chmurowe, tylko pokazuje konkretną niszę: klasyfikacja, embeddingi, lekkie zadania NLP, gdzie prywatność, koszt operacyjny i brak zależności od sieci są ważniejsze niż surowa moc największych modeli.

**Key takeaways:**
- ONNX to format pośredni, który pozwala wytrenować model w PyTorchu i uruchomić go bez zmian na iOS, Androidzie czy desktopie.
- Sesja inferencji w Swift wymaga trzech obiektów: ORTEnv, ORTSessionOptions i ORTSession.
- Tokenizer użyty podczas inferencji musi być identyczny z tym z treningu, inaczej predykcje się rozjadą mimo poprawnego modelu.
- Pakiet Swift Transformers od Hugging Face upraszcza tokenizację bez pisania własnego kodu od zera.

**Why do I care:** Z punktu widzenia frontendowca, który zajmuje się też mobile, to jest dobry przykład na to, że lokalna inferencja przestała być ciekawostką dla entuzjastów, a stała się realną opcją architektoniczną. Jeśli projektujecie feature, który wymaga klasyfikacji nastroju, prostego wyszukiwania semantycznego albo moderacji treści, warto policzyć koszt zapytań do zewnętrznego API kontra jednorazowy koszt osadzenia modelu w aplikacji. Różnica w opóźnieniu i braku zależności od sieci potrafi być argumentem decydującym, zwłaszcza w aplikacjach, które mają działać także offline.

**Link:** [How to Run ONNX Transformer Models on iOS With Swift](https://hackernoon.com/how-to-run-onnx-transformer-models-on-ios-with-swift)

## Projektowanie systemu XP dla prawdziwych umiejętności

**TLDR:** Twórca aplikacji Levely, timera skupienia inspirowanego RPG, opisuje, jak zaprojektował system poziomów doświadczenia dla realnych umiejętności życiowych. Zamiast udawać, że aplikacja mierzy kompetencję, zdecydował, że XP mierzy konsekwencję i zaangażowanie, a krzywa wymagań XP musi być nieliniowa, żeby początkowe poziomy szły szybko, a poziom 100 pozostał realnym, ale wymagającym celem.

**Summary:** Punkt wyjścia autora jest szczery i rzadko spotykany w tekstach o gamifikacji: przyznaje wprost, że aplikacja nie jest w stanie zweryfikować, czy ktoś faktycznie robi postępy w grze na gitarze czy w programowaniu. Nie ma kamery śledzącej jakość ćwiczeń, nie ma AI oceniającego technikę, bo to wymagałoby zbierania danych, których autor świadomie nie chce zbierać. Zamiast próbować rozwiązać nierozwiązywalny problem pomiaru kompetencji, przeformułował definicję: XP mierzy czas spędzony w stanie skupienia, nic więcej i nic mniej.

Najciekawsza część tekstu to matematyka za krzywą poziomów. Prosty wzór kwadratowy, gdzie całkowite wymagane XP rośnie z kwadratem poziomu, szybko okazuje się bezużyteczny w praktyce: przy stałej dobranej tak, żeby poziom 2 wymagał 25 minut skupienia, poziom 10 wymaga już około 10 godzin, poziom 20 to 41 godzin, a poziom 50 to prawie 260 godzin. Autor przyznaje, że pierwotnie chciał, żeby poziom 100 odpowiadał symbolicznym 10 tysiącom godzin z książki Gladwella, po czym policzył, że przy 50-minutowej sesji dziennie przez dwa lata użytkownik i tak dobije ledwie do 600 godzin. Ostatecznie wylądował na tysiącu godzin jako granicy dla poziomu 100, uznając, że to wystarczająco ambitne, żeby było znaczące, i wystarczająco osiągalne, żeby nie zniechęcało.

Rozwiązaniem na połączenie szybkiego wzrostu na początku z sensowną skalą na końcu jest przełączenie z krzywej kwadratowej po poziomie 20 na interpolację splajnem kwadratowym, żeby uniknąć widocznego skoku w tempie zdobywania poziomów. To szczegół, który większość twórców aplikacji by pominęła albo rozwiązała na oko, a tutaj dostajemy pełne uzasadnienie decyzji, łącznie z przyznaniem, że autor sam nie jest pewien, czy punkt przełączenia powinien być na poziomie 20 czy 50.

**Key takeaways:**
- Systemy gamifikacyjne dla realnego życia nie powinny udawać, że mierzą kompetencję, tylko uczciwie mierzyć to, co da się zweryfikować, czyli czas i konsekwencję.
- Liniowa krzywa XP jest zła dla motywacji, bo każdy poziom zajmuje tyle samo czasu niezależnie od etapu nauki.
- Krzywa kwadratowa dobrze radzi sobie na początku, ale eksploduje przy wyższych poziomach, stąd potrzeba przejścia na inną funkcję po pewnym progu.
- Świadome ograniczenie zakresu tego, co produkt próbuje mierzyć, bywa lepszą decyzją produktową niż dorzucanie AI do każdego problemu.

**Why do I care:** To jest bardziej temat produktowy i UX niż stricte inżynierski, ale warto o nim wspomnieć, bo dotyka czegoś, co często pomijamy przy projektowaniu funkcji gamifikacyjnych w naszych własnych produktach: uczciwości wobec użytkownika co do tego, co system faktycznie wie. Widziałem niejeden dashboard progresu w aplikacjach firmowych, który sugerował więcej, niż dane pozwalały stwierdzić. Decyzja autora, żeby nie sięgać po AI tylko dlatego, że jest modne, i zamiast tego przyznać się do ograniczeń pomiaru, to dobry przykład dyscypliny produktowej, którą warto mieć z tyłu głowy przy projektowaniu własnych metryk sukcesu.

**Link:** [Designing an XP System for Real-Life Skills](https://hackernoon.com/designing-an-xp-system-for-real-life-skills)

## Benchmark tanich LLM-ów do generowania digestów śladów agentów w produkcji

**TLDR:** Zespół Glassray, platformy do ewaluacji agentów AI, przetestował cztery tańsze modele jako zamiennik dla Claude Sonnet 4.6 w zadaniu generowania krótkich, przeszukiwalnych podsumowań śladów agentowych. Wygrał gpt-4o-mini, trzydzieści razy tańszy przy zachowaniu takich samych wyników wyszukiwania, a dwa modele, które na papierze wyglądały najtaniej, ostatecznie zawiodły.

**Summary:** Punkt wyjścia jest prosty i bardzo konkretny: firma uruchamia jedno wywołanie LLM na każdy przechwycony ślad agenta, żeby zredukować go do krótkiego podsumowania, tematu, tagu językowego i embeddingu. Ponieważ to wywołanie dzieje się dla każdego śladu każdego klienta, jest to najczęstsze i najszybciej rosnące źródło kosztów w całym systemie. Sonnet 4.6 kosztuje około 3,45 dolara za tysiąc digestów, więc naturalne pytanie brzmi, czy tańszy model poradzi sobie tak samo dobrze.

Najciekawsza część tego tekstu to nie sama tabela kosztów, tylko metodologia weryfikacji. Autorzy słusznie zauważają, że tańszy model może pisać podsumowania, które czytają się świetnie, a mimo to subtelnie zmieniają wyniki wyszukiwania semantycznego, bo embedding liczony jest z treści summary, a nie z surowego śladu. Jeśli model zmienia styl czy akcent w opisie, embedding przesuwa się w przestrzeni wektorowej, sąsiedzi w wyszukiwaniu się przetasowują, a błąd nigdzie się nie pojawia, po prostu wyszukiwarka zaczyna zwracać inne wyniki. Dlatego test nie kończy się na ocenie jakości tekstu, tylko sprawdza, czy te same zapytania wyszukiwania zwracają te same ślady co przy modelu bazowym.

Wyniki są pouczające, bo cena okazuje się słabym predyktorem jakości. Najtańszy model na liście, Gemini 2.5 Flash-Lite, złamał wszystkie siedem reguł jakości i dodatkowo zwracał coraz więcej niepoprawnego JSON-a w kolejnych przebiegach. Kimi K2.5 pisał dziesięciokrotnie więcej tokenów wyjściowych niż inne modele, co czyniło go i wolniejszym, i droższym niż Haiku mimo niższej ceny za token. Zwycięzca, gpt-4o-mini, utrzymał sześć z siedmiu reguł, z jedynym realnym regresem w subiektywnej regule stylu językowego, przy koszcie tysiąca digestów rzędu jedenastu centów zamiast trzech i pół dolara.

Zespół nie ukrywa ograniczeń własnego eksperymentu: przy śladach dwujęzycznych sędzia LLM akceptował różne odpowiedzi na temat języka jako poprawne, a subiektywne reguły stylistyczne okazały się wrażliwe na zmiany infrastrukturalne niezwiązane z samym modelem. To rzadka i cenna szczerość w tekstach benchmarkowych, gdzie zwykle dostajemy tylko wygraną tabelkę bez opisu, gdzie metoda mogła zawieść.

**Key takeaways:**
- Cena modelu nie koreluje z jakością, dwa najtańsze modele na liście zawiodły, a średnio drogi Kimi pisał dziesięć razy więcej tokenów niż konkurencja.
- Ocena jakości samego tekstu podsumowania nie wystarcza, trzeba sprawdzić, czy system, który konsumuje ten tekst (wyszukiwanie, klastrowanie), nadal działa tak samo.
- Pasmo szumu (plus minus 4 punkty na regułę) wyznaczone przez porównanie modelu bazowego z samym sobą pozwala odróżnić realny regres od naturalnej wariancji między przebiegami.
- Zmiana na gpt-4o-mini dała redukcję kosztu digestu z 3,45 dolara do 0,11 dolara za tysiąc wywołań przy zachowaniu tych samych wyników wyszukiwania.

**Why do I care:** To jest jeden z lepszych tekstów inżynierskich o LLM-ach, jakie ostatnio widziałem, bo pokazuje dokładnie to, czego brakuje w większości wewnętrznych dyskusji o kosztach AI: konkretną, powtarzalną metodę oceny, a nie subiektywne wrażenie z kilku promptów w czacie. Jeśli macie w swoim systemie choćby jedno wywołanie LLM uruchamiane na dużą skalę, ten artykuł jest gotowym przepisem na to, jak bezpiecznie zejść na tańszy model bez ryzyka, że coś po cichu przestanie działać. Szczególnie cenię podejście "zamrożony zestaw danych plus kontrola modelu przeciwko samemu sobie", bo eliminuje pokusę wyciągania wniosków z jednorazowego porównania.

**Link:** [Benchmarking Cheap LLMs for Production Agent Traces](https://hackernoon.com/benchmarking-cheap-llms-for-production-agent-traces)

## Adversarial machine learning: jak oszukać system AI

**TLDR:** Krótki wprowadzający tekst o adversarial machine learning, dziedzinie zajmującej się celowym oszukiwaniem modeli uczenia maszynowego przez subtelne zmiany w danych wejściowych. Autor opisuje ataki typu evasion (np. przełamanie Face ID przez maskę 3D) oraz data poisoning (np. przypadek chatbota Tay), a na koniec wspomina o wykorzystaniu tych technik do testowania odporności systemów AI.

**Summary:** Punktem zaczepienia jest historia z premiery iPhone'a X, gdzie badacze z Wietnamu przełamali Face ID za pomocą starannie zaprojektowanej maski 3D, mimo że technologia była reklamowana jako bezpieczniejsza od Touch ID. Autor wykorzystuje to jako wejście do wyjaśnienia mechanizmu adversarial examples: niewielkie, często niewidoczne dla ludzkiego oka zaburzenie obrazu potrafi sprawić, że model klasyfikacyjny pomyli jabłko z pomarańczą, mimo że dla człowieka obie fotografie wyglądają identycznie. To zjawisko opisane pierwotnie przez Iana Goodfellowa w słynnym przykładzie z pandą pozostaje jednym z najbardziej przystępnych sposobów tłumaczenia, dlaczego sieci neuronowe nie "widzą" świata tak, jak nam się wydaje.

Tekst rozróżnia dwa główne typy ataków. Evasion attacks działają w momencie inferencji, na przykład przez naklejki na znakach drogowych, które człowiek odczyta bez problemu, a autonomiczny samochód może zinterpretować zupełnie inaczej, z potencjalnie tragicznym skutkiem. Data poisoning działa wcześniej, na etapie treningu, wstrzykując spreparowane przykłady do zbioru uczącego, tak jak stało się to z chatbotem Tay od Microsoftu, który w ciągu jednego dnia interakcji z użytkownikami Twittera zamienił się w źródło rasistowskich wypowiedzi.

Ostatnia część, choć krótka, jest chyba najważniejsza z perspektywy praktycznej: te same techniki, które służą do atakowania modeli, coraz częściej wykorzystywane są przez inżynierów testowania oprogramowania do generowania danych testowych, które celowo sprawdzają granice odporności modelu przed wdrożeniem produkcyjnym. To przesuwa adversarial ML z kategorii ciekawostki bezpieczeństwa do praktycznego narzędzia w cyklu życia systemów AI.

**Key takeaways:**
- Adversarial examples to dane wejściowe zmienione tak subtelnie, że człowiek nie zauważy różnicy, a model klasyfikacyjny się myli.
- Evasion attacks działają na etapie inferencji (np. naklejki na znakach drogowych), data poisoning zatruwa dane treningowe (przypadek chatbota Tay).
- Face ID w iPhonie X zostało przełamane maską 3D wkrótce po premierze, mimo deklarowanego bezpieczeństwa technologii.
- Techniki adversarialne znajdują zastosowanie pozytywne, jako sposób testowania odporności modeli przed wdrożeniem.

**Why do I care:** Ten tekst jest bardziej wprowadzeniem niż głęboką analizą, ale przypomina o czymś, co łatwo zapomnieć przy budowaniu produktów wykorzystujących modele klasyfikacyjne czy systemy rozpoznawania: bezpieczeństwo modelu ML to osobna kategoria ryzyka, różna od klasycznych podatności aplikacyjnych, i wymaga osobnego myślenia przy projektowaniu systemu. Jeśli w waszym produkcie model podejmuje decyzje o realnych konsekwencjach, na przykład w moderacji treści czy weryfikacji tożsamości, warto mieć w zespole kogoś, kto rozumie choćby podstawy adversarial ML, zamiast zakładać, że dokładność zmierzona na zbiorze testowym przekłada się jeden do jednego na odporność w warunkach rzeczywistych.

**Link:** [Adversarial Machine Learning and Its Role in Fooling AI](https://hackernoon.com/adversarial-machine-learning-and-its-role-in-fooling-ai-3z4k3447)

## DevRel na konferencji: jak skłonić ludzi do przetestowania software'u na stoisku

**TLDR:** Weteran DevRel opisuje sprawdzoną w praktyce technikę zachęcania uczestników konferencji do faktycznego pobrania i skonfigurowania oprogramowania na stoisku, zamiast zbierania kolejnych naklejek. Metoda polega na opakowaniu narzędzia monitoringowego w prostą grę retro, pokazaniu danych z gry na żywym dashboardzie i nagradzaniu tych, którzy sami zainstalują całość u siebie.

**Summary:** Autor zaczyna od uczciwego postawienia problemu, którego chyba każdy, kto kiedyś stał przy stoisku targowym, doświadczył na własnej skórze: nikt o zdrowych zmysłach nie otwiera laptopa na korytarzu konferencyjnym tylko dlatego, że przedstawiciel firmy ładnie o czymś opowiedział. Rozwiązaniem, które testował przez trzy lata na około dwudziestu wydarzeniach, było opakowanie narzędzia do monitoringu w dwuwymiarową grę w stylu lat 90., zinstrumentowaną tak, żeby zbierała statystyki CPU, RAM, sieci, a przy okazji liczbę zebranych klejnotów czy najwyższy osiągnięty poziom.

Kluczowym krokiem było zbudowanie widocznego dashboardu pokazującego te dane na żywo, a potem umożliwienie uczestnikom pobrania całego pakietu (gry razem z agentem monitorującym) do domu, wraz z instrukcją krok po kroku zakładania darmowego konta i podłączenia konfiguracji. Autor podkreśla, że celem nie było stworzenie zagadki czy quizu, tylko maksymalne uproszczenie configu, łącznie z gotowymi przykładowymi ustawieniami, żeby proces instalacji trwał jak najkrócej. Nagroda za powrót na stoisko z działającym dashboardem nie musiała być drogim gadżetem, liczył się raczej efekt "na pewno coś dostanę" połączony z elementem rywalizacji o najwyższy wynik w grze.

Najciekawszy fragment dotyczy tego, co autor nazywa "ukrytym poziomem": część uczestników modyfikowała kod gry, żeby sztucznie zawyżyć swój wynik, na przykład zmieniając mnożnik w procesie zbierania danych. Zamiast traktować to jako oszustwo do ukarania, autor od razu przygotował osobną nagrodę dla takich osób, bo w praktyce ktoś, kto samodzielnie edytuje i modyfikuje działającą konfigurację monitoringu, jest znacznie bardziej zaangażowanym i wartościowym leadem niż ktoś, kto po prostu zebrał najwyższy wynik zgodnie z zasadami.

Cała technika opisana jest bez zbędnego owijania w bawełnę i z konkretnymi liczbami: około 10 procent uczestników danego wydarzenia decydowało się na pełną instalację, z górnym pułapem skuteczności przy wydarzeniach do około pięciu tysięcy osób, powyżej którego mechanizm przestawał się skalować liniowo.

**Key takeaways:**
- Opakowanie nudnego, technicznego narzędzia w prostą grę usuwa naturalny opór przed "kupowaniem czegoś" na stoisku targowym.
- Maksymalne uproszczenie procesu instalacji (gotowe konfiguracje, instrukcje krok po kroku) jest ważniejsze niż wartość samej nagrody.
- Uczestnicy, którzy samodzielnie modyfikują dostarczony kod, są bardziej wartościowymi leadami niż ci, którzy grają zgodnie z zasadami, warto nagradzać obie grupy osobno.
- Technika skalowała się dobrze do około pięciu tysięcy uczestników wydarzenia, powyżej tego progu skuteczność spadała.

**Why do I care:** To akurat nie jest temat inżynierski, tylko czysto marketingowo-produktowy, więc jeśli interesuje was wyłącznie kod, możecie go pominąć. Warto go jednak przeczytać z perspektywy kogoś, kto czasem musi zaprezentować swoje narzędzie deweloperskie na wewnętrznym demo albo meetupie, bo mechanizm "pokaż grywalną wersję zamiast slajdów" działa też poza konferencjami sprzedażowymi. Sam pomysł nagradzania osób, które modyfikują dostarczony kod, jest zresztą niezłą metaforą tego, jak rozpoznawać najbardziej zaangażowanych użytkowników wewnętrznych narzędzi deweloperskich w firmie.

**Link:** [HOW TO DEVREL: The Most Un-Natural Act](https://hackernoon.com/how-to-devrel-the-most-un-natural-act)
