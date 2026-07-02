---
title: "Brain2Qwerty v2, Cursor na iOS i DSpark: tydzień dużych skoków w sprzęcie, narzędziach i inferencji"
excerpt: "Meta dekoduje zdania z sygnałów mózgowych w czasie rzeczywistym, Cursor trafia na iPhone'a z zawsze włączonymi agentami, DeepSeek pokazuje nowy SoTA w speculative decoding, a Devin Fusion obniża koszty agentowego kodowania o 35%."
publishedAt: "2026-06-30"
slug: "ainews-brain2qwerty-cursor-ios-dspark-devin-fusion"
hashtags: "#ainews #ai #llm #agents #ml #generated #pl"
source_pattern: "AINews"
---

## Brain2Qwerty v2: Meta dekoduje słowa z sygnałów mózgowych w czasie rzeczywistym

**TLDR:** Meta opublikowała Brain2Qwerty v2, system dekodujący zdania z surowych sygnałów mózgowych w czasie rzeczywistym, bez żadnych elektrod wszczepanych do czaszki. Osiąga 61% dokładności na poziomie słów, a dla najlepszego uczestnika testu 78%. Kod treningowy dla v1 i v2 idzie do publicznego dostępu, a BCBL udostępnia dataset v1.

**Summary:** Przez lata brain-computer interfaces kojarzył się wyłącznie z inwazyjnymi implantami w stylu Neuralink, gdzie dokładność była dobra, bo elektrody siedzą milimetry od neuronów. Meta idzie inną drogą: nieinwazyjne nagrania, prawdopodobnie fMRI lub MEG, i dekodowanie w czasie rzeczywistym. Wyniki v2 to skok, który trudno zbagatelizować. 61% dokładności słów w warunkach kontrolowanego pisania, i 78% dla najlepszego uczestnika z dziewięciu badanych, to liczby, które zacierają granicę między tym, co dotychczas wymagało chirurgii, a tym, co da się osiągnąć nieinwazyjnie.

To, co mnie tu interesuje, to nie sama dokładność, ale co system dekoduje. Brain2Qwerty v2 podobno rozumie słowa i semantykę, nie tylko kolejność naciśniętych klawiszy. To jakościowa zmiana w stosunku do wcześniejszych systemów, które potrafiły odtworzyć tekst, ale jako sekwencję znaków, a nie jako reprezentację znaczeń. Jeśli to trzyma się kupy przy niezależnej replikacji, mamy do czynienia z innym poziomem abstrakcji w dekodowaniu sygnału neuronowego.

Decyzja o otwartym wydaniu kodu treningowego to dobry ruch ze strony Mety. Badania BCI są blokowane przez bariery sprzętowe i dostęp do danych od lat. Udostępnienie datasetu v1 przez BCBL otwiera tę dziedzinę dla akademickich grup, które nie mają budżetu na zbieranie własnych nagrań. To może przyspieszyć całe pole bardziej niż kolejna iteracja modelu od jednej firmy.

Oczywiście jest całe mnóstwo zastrzeżeń: dane zbierane w kontrolowanych warunkach pisania, dziewięciu uczestników, zadania strukturyzowane. Przeskoczenie stąd do naturalnego myślenia w otwartym środowisku to wciąż ogromny problem badawczy. Ale v2 wyraźnie przesuwa punkt odniesienia dla tego, co jest możliwe bez otwierania czaszki.

**Key takeaways:**
- Brain2Qwerty v2 osiąga 61% dokładności słów i 78% dla najlepszego uczestnika z 9 badanych
- System dekoduje semantykę, nie tylko sekwencje znaków, co to jakościowa zmiana
- Meta otwiera kod treningowy v1/v2, BCBL udostępnia dataset v1
- Wyniki zbliżają nieinwazyjne BCI do dokładności systemów inwazyjnych

**Why do I care:** Jako developer nie buduję systemów BCI, ale ta publikacja ma znaczenie dla całej branży AI. Meta pokazuje, że duże modele i zaawansowane metody dekodowania sygnałów można zestawić z domeną, gdzie wcześniej dominował sprzęt inwazyjny. To wzorzec, który widzimy w AI od kilku lat: podejście end-to-end z dużą ilością danych bije wyspecjalizowane systemy budowane przez dekady. Otwarty dataset i kod treningowy to też sygnał, że Meta liczy na zewnętrzną weryfikację i poprawę wyników, a nie na ukrycie metody za murem IP.

**Link:** [AINews](https://www.latent.space/p/ainews-not-much-happened-today-07e)

---

## Cursor na iOS z zawsze włączonymi agentami w chmurze

**TLDR:** Cursor wypuścił aplikację na iOS z funkcją zdalnego sterowania agentami działającymi na komputerze oraz zawsze aktywnymi agentami w chmurze. Można teraz przeglądać diffy i zatwierdzać zmiany z telefonu, a Live Activities trzymają cię w pętli na bieżąco.

**Summary:** Krok, który byłoby łatwo zbagatelizować jako marketing, ale tu faktycznie coś się dzieje. Cursor nie zrobił aplikacji do przeglądania kodu na telefonie, to zrobili już inni. Zamiast tego postawili na sterowanie agentami, które działają asynchronicznie, niezależnie od tego, czy masz otwarty laptop. Agent startuje na twoim komputerze lub w chmurze, robi swoje, a ty dostajesz powiadomienie i możesz przejrzeć diff bezpośrednio na telefonie.

To jest model pracy, który zmienia relację między programistą a agentem. Do tej pory agenci byli mniej więcej "uruchom i patrz jak pracuje". Teraz stają się czymś bliższym procesowi CI/CD, gdzie kick-off jest delegowany, wykonanie jest asynchroniczne, a ty reagujesz tylko na wyniki. Live Activities na iOS to szczegół implementacyjny, ale dobry przykład jak integracja z systemem operacyjnym może zrobić sporą różnicę w praktycznej użyteczności.

Mnie zastanawia, co to oznacza dla produktywności w stylu "deep work". Jeśli mogę odpalić agenta na poważnym zadaniu i wrócić do niego z telefonu za godzinę, to zmienia rachunek kosztów przełączania kontekstu. Ale jednocześnie tworzy nowe pytanie: jak zarządzać kilkoma równoległymi agentami, kiedy każdy może wyprodukować diff wymagający twojej uwagi? To problem, którego Cursor jeszcze nie rozwiązał, ale warto obserwować jak UI ewoluuje w tym kierunku.

**Key takeaways:**
- Cursor iOS pozwala zdalnie sterować agentami działającymi na komputerze lub w chmurze
- Live Activities informują na bieżąco o postępie agenta
- Recenzja diffów i zatwierdzanie zmian bezpośrednio z telefonu
- Agenci są zawsze aktywni, niezależnie od tego, czy laptop jest otwarty

**Why do I care:** Jako ktoś, kto spędza sporo czasu na pracy w trybie konsultingowym, gdzie kontext jest często przerywany spotkaniami i rozmowami, model asynchronicznych agentów z mobilną kontrolą brzmi praktycznie użytecznie. Nie musi to być killer feature dla każdego, ale dla osób już głęboko w ekosystemie Cursor to naturalne rozszerzenie workflow. Obserwuję też, jak "agent on your computer" staje się osobną kategorią produktową, obok SaaS i lokalnych narzędzi.

**Link:** [AINews](https://www.latent.space/p/ainews-not-much-happened-today-07e)

---

## DSpark: DeepSeek pokazuje nowy SoTA w speculative decoding na jednym GPU

**TLDR:** DeepSeek opublikował DSpark, nową metodę speculative decoding osiągającą 30,9% wyższy accepted length niż Eagle3 i 16,3% wyższy niż DFlash na Qwen3-4B. System trafił już do preview inference engines dla DeepSeek-V4-Flash i V4-Pro. Wygląda na nowy punkt odniesienia dla single-GPU spec decode.

**Summary:** Speculative decoding to jedna z tych technik inferencji, o których łatwo powiedzieć "przyspiesza generację tokenów" i zostawić to jako ciekawostkę. Ale liczby z DSpark są na tyle konkretne, że warto się zatrzymać. 30,9% wyższy accepted length w stosunku do Eagle3, przy lepszym harmonogramowaniu weryfikacji i lepszym generowaniu draftu, to nie marginalny postęp.

Dwa komponenty DSpark to lepsza generacja draftu i inteligentniejsze harmonogramowanie weryfikacji. W speculative decoding draft model generuje kilka tokenów naraz, a duży model weryfikuje je zbiorczo. Im więcej tokenów draft model trafi, tym mniej wywołań dużego modelu potrzebujesz. DSpark poprawia obydwie strony tego procesu, i to widać w wynikach na Qwen3-4B. Fakt, że wylądował w production preview engines dla V4-Flash i V4-Pro to dobry sygnał, że wyniki nie są tylko z benchmarków akademickich.

Dla mnie interesujący jest kontekst: DeepSeek systematycznie atakuje każdą warstwę stosu inferencji. Flash attention, różne warianty quantization, speculative decoding. Każda publikacja to kolejny kawałek układanki, który albo trafia bezpośrednio do production, albo staje się bazą dla następnego kroku. To odróżnia ich podejście od wielu academic releases, gdzie połowa pracy kończy się na arxivie.

**Key takeaways:**
- DSpark osiąga 30,9% wyższy accepted length vs Eagle3 i 16,3% vs DFlash na Qwen3-4B
- Dwa kluczowe usprawnienia: lepsze generowanie draftu i inteligentniejsze harmonogramowanie weryfikacji
- Wdrożony w production preview dla DeepSeek-V4-Flash i V4-Pro
- Prawdopodobnie nowy SoTA dla single-GPU speculative decoding

**Why do I care:** Jako developer budujący na modelach, nie piszę inference kerneli, ale efekty tych prac są bezpośrednio odczuwalne w kosztach i latencji. Każde usprawnienie speculative decoding przekłada się na tańsze wywołania API lub możliwość uruchomienia większego modelu przy tym samym budżecie. DSpark to sygnał, że granica tego, co da się wycisnąć z single-GPU setup, jest wciąż daleko od wyczerpania.

**Link:** [AINews](https://www.latent.space/p/ainews-not-much-happened-today-07e)

---

## Devin Fusion, LangChain i dynamiczne subagenty: harness engineering jako nowe pole bitwy

**TLDR:** Cognition wypuściło Devin Fusion, hybrydowy harness modelowy obniżający koszty o 35% przy zachowaniu jakości na poziomie "Fable". Cline uruchomił miesięczny pass za 9,99 dolarów dający dostęp do GLM 5.2, DeepSeek, Kimi, MiniMax i Qwen. LlamaIndex zaprezentował Retrieval Harness łączący semantic search, grep, listowanie plików i czytanie w jednej pętli agenta.

**Summary:** Przez ostatni rok dyskusja o agentach AI kręciła się wokół wyboru modelu: który model jest najlepszy do danego zadania. To pytanie nie zniknęło, ale centrum ciężkości przesuwa się gdzie indziej. Devin Fusion to dobry przykład tej zmiany. Zamiast stawiać na jeden najlepszy model, Cognition zbudował harness, który dynamicznie dobiera model do sub-zadania, i twierdzi, że dzięki temu osiąga jakość porównywalną z Fable przy 35% niższym koszcie. Tak sformułowane twierdzenie jest trudne do weryfikacji z zewnątrz, ale kierunek jest jasny.

LangChain pokazuje podobny wzorzec od innej strony. Zamiast agenta wywołującego narzędzia, mamy głównego agenta piszącego kod orkiestracji. To subtelna, ale istotna różnica. Agent, który może napisać własny workflow zamiast wywoływać predefiniowane narzędzia, ma znacznie większą elastyczność w radzeniu sobie z niestandardowymi przypadkami. To też przesuwa ciężar odpowiedzialności w stronę jakości kodu generowanego przez model, nie tylko jakości samych odpowiedzi.

LlamaIndex Retrieval Harness to pragmatyczny przykład myślenia o agentach jako o systemach, nie o pojedynczych wywołaniach modelu. Łączenie semantic search z grepem i file listingiem w jednej pętli to odpowiedź na realne ograniczenia RAG: kiedy nie wiesz z góry, czy szukasz konceptu (semantic) czy konkretnego ciągu znaków (grep), potrzebujesz obu. Taki harness nie jest glamorous, ale wygląda użytecznie.

Cline Pass za 9,99 to osobna historia. Przez długi czas "open routing" oznaczało API key management i trochę prometryki. Cline idzie w stronę produktyzacji dostępu do wielu modeli pod jedną miesięczną opłatą. To interesujące z perspektywy adopcji: niski próg wejścia do eksperymentowania z różnymi modelami bez konieczności zakładania kont u każdego dostawcy.

**Key takeaways:**
- Devin Fusion: hybrydowy harness modelowy z 35% niższym kosztem przy jakości "Fable-level"
- Cline Pass 9,99 dolarów miesięcznie za dostęp do GLM 5.2, DeepSeek, Kimi, MiniMax, Qwen
- LangChain promuje wzorzec gdzie główny agent pisze kod orkiestracji zamiast wywoływać narzędzia
- LlamaIndex Retrieval Harness łączy semantic search, grep i file operations w jednej pętli

**Why do I care:** Harness engineering to obszar, który bezpośrednio dotyka pracy senior developerów i architektów. Kiedy buduję wewnętrzne narzędzia oparte o LLM, muszę rozstrzygnąć, ile orchestration logiki umieszczam w kodzie aplikacji, a ile deleguje do modelu. Wzorzec dynamicznych subagentów i orkiestracji pisanej przez model przesuwa ten balans. To ma konkretne konsekwencje dla debugowania, obserwowalności i przewidywalności zachowania systemu, i te kwestie nie są jeszcze dobrze rozwiązane. Warto obserwować jak narzędzia takie jak Devin Fusion i LlamaIndex Retrieval Harness podchodzą do tych problemów w praktyce.

**Link:** [AINews](https://www.latent.space/p/ainews-not-much-happened-today-07e)
