---
title: "Grok 4.6 i Grok Bot od SpaceXAI otwierają nowy rozdział wyścigu agentów AI"
excerpt: "Przegląd najważniejszego dnia modeli frontier: Grok 4.6 i Grok Bot, Qwen3.8-Max, DeepSeek V4 Pro, nowe narzędzia dla agentów oraz niewidzialne znaki wodne w tekstach Claude."
publishedAt: "2026-08-13"
slug: "grok-4-6-spacexai-grok-bot-frontier-models"
hashtags: "#AINews #grok #llm #agents #ai #generated #pl"
source_pattern: "AINews"
---

## Grok Bot i Grok 4.6: SpaceXAI wchodzi do gry o agentów AI

**TLDR:** SpaceXAI (dawniej zespół Cursor) uruchomiło Grok Bota, wersję beta AI teammate'a, który loguje się do narzędzi użytkownika i wykonuje za niego pracę. Napędza go Grok 4.6, model wydany tego samego dnia, opisywany jako drugi najlepszy model do pracy umysłowej na świecie, a przy tym najbardziej efektywny kosztowo.

**Summary:** Rynek agentów wielozadaniowych, czyli tak zwanych AI teammates, od dłuższego czasu szuka lidera. Claude Tag wystartował z mieszanymi recenzjami, Buzz od Blocka wymaga zbyt technicznego użytkownika, więc pole było otwarte dla kogoś, kto poskłada to porządniej. Zrobił to zespół, który wcześniej stał za Cursorem, a teraz działa pod szyldem SpaceXAI. Grok Bot w wersji beta loguje się do narzędzi tak jak zrobiłby to człowiek i wraca z gotową pracą, co w praktyce oznacza próbę zamknięcia pętli między delegowaniem zadania a odbiorem wyniku bez ciągłego nadzorowania każdego kroku.

Silnikiem tego bota jest Grok 4.6, model o skali 1,5 biliona parametrów, wydany równolegle z premierą bota. xAI opisuje go jako rozwinięcie Groka 4.5 z naciskiem na długo trwające zadania agentowe oraz bardziej ambitną pracę interaktywną i wizualną. Artificial Analysis odnotowało duże skoki w AA-Briefcase, prywatnym benchmarku do zadań agentowych z pracy umysłowej, przy koszcie wyraźnie niższym niż u konkurencji. To istotne, bo dotychczas wysoka jakość szła w parze z wysoką ceną za token, a tutaj te dwie zmienne się rozjeżdżają na korzyść xAI.

Opis procesu treningowego jest zaskakująco konkretny jak na komunikat firmowy. xAI przeprowadziło dłuższy dodatkowy trening niż w przypadku Groka 4.5, z wyselekcjonowanymi danymi generowanymi przez model do zagadnień rozumowania i zaawansowanych koncepcji technicznych, danymi inżynierskimi wysokiej jakości oraz ulepszonym optymalizatorem. Następnie użyto Groka 4.5 do wygenerowania na nowo trajektorii SFT w różnych trybach rozumowania, harnessach agentowych i domenach takich jak STEM, inżynieria oprogramowania czy praca umysłowa, odfiltrowując przy tym problematyczne ślady. Sam etap RL objął szeroki zakres zadań agentowych, od pracy biurowej przez kodowanie ogólne po środowiska specyficzne dla optymalizacji kernela, tworzenia stron i projektowania wspomaganego komputerowo.

Ciekawym, choć żartobliwym akcentem w źródłowym materiale jest uwaga, że brak incydentów ucieczki z sandboksa podczas trenowania Groka 4.6 można czytać dwojako, albo jako sukces inżynierów infrastruktury, albo jako coś, co mówi więcej o samych badaczach niż chcieliby przyznać. To żart nawiązujący do bieżących wydarzeń w branży, ale pokazuje, że temat bezpieczeństwa agentów działających w realnych środowiskach przestaje być teoretyczny.

**Key takeaways:**
- Grok Bot to AI teammate w becie, który loguje się do narzędzi użytkownika i zwraca gotową pracę, zamiast działać wyłącznie w oknie czatu.
- Grok 4.6 to model 1,5T, trenowany z naciskiem na długo trwające zadania agentowe i pracę wizualną, wydany tego samego dnia co Grok Bot.
- Trening obejmował regenerację trajektorii SFT przez Groka 4.5 oraz szeroki zestaw środowisk RL, od kodowania po CAD i optymalizację kernela.
- Elon Musk zapowiedział już Groka 4.7, z ukończonym treningiem wstępnym i planowanym dodatkowym treningiem na wewnętrznych danych SpaceX.

**Why do I care:** Z perspektywy kogoś, kto na co dzień patrzy na architektury frontendowe i integracje, najciekawsze nie jest tu samo LLM, tylko to, że Grok Bot loguje się do narzędzi jak człowiek, czyli przez interfejsy, które wcześniej projektowaliśmy z myślą o ludziach klikających myszką. To rodzi realne pytania o autoryzację, sesje i audyt działań, bo agent działający "jak użytkownik" potrzebuje innego modelu uprawnień niż zwykły klucz API. Jeśli ta kategoria produktów faktycznie wystrzeli, zespoły frontendowe będą musiały projektować UI z myślą o dwóch typach aktorów jednocześnie, a to zmienia więcej niż tylko warstwę backendową.

**Link:** [AINews: SpaceXAI Grok 4.6 and Grok @Bot](https://www.latent.space/p/ainews-spacexai-grok-46-and-grok)

## Dzień modeli frontier: Grok 4.6, Qwen3.8-Max, DeepSeek V4 Pro i MAI-Thinking-1

**TLDR:** W ciągu jednej doby pojawiło się kilka istotnych modeli: Grok 4.6 z bardzo dobrym stosunkiem ceny do wydajności, otwarte wagi Qwen3.8-Max od Alibaby, tania generalna dostępność DeepSeek V4 Pro oraz pierwszy model rozumujący Microsoftu, MAI-Thinking-1. Do tego Upstage podbiło swój Solar Pro 4 o kilkadziesiąt punktów w rankingu Artificial Analysy.

**Summary:** Grok 4.6 osiąga według niezależnych ocen Artificial Analysy wynik 61 w Intelligence Index, co plasuje go mniej więcej na poziomie GPT-5.6 Sol Max, za Claude Opus i Fable, ale z bardzo mocnymi wynikami agentowymi: 88,4 procent w Terminal-Bench v2.1 oraz 1753 punktów Elo w GDPval-AA v2. W arenie kodu Code Arena model plasuje się blisko GPT-5.6 Sol i Claude Fable na zadaniach webdevowych. Najważniejszy jest jednak cennik, 2 dolary za milion tokenów wejściowych i 6 dolarów za wyjściowe, co jest wyraźnie poniżej konkurencji na tym poziomie jakości. Praktycy od razu zaczęli mówić o nim jako o nowym domyślnym wyborze do kodowania i wyszukiwania błędów, a Cognition udostępniło go w Devinie tego samego dnia.

Alibaba w tym samym oknie czasowym wypuściła Qwen3.8-Max jako otwarte wagi, model MoE o łącznej skali 2,4 biliona parametrów przy 95 miliardach aktywnych. vLLM zapewniło wsparcie od dnia zero, wraz z dedykowanymi checkpointami 4-bitowymi pod NVIDIA B300 i AMD MI355X, a Together AI i Baseten ogłosiły natychmiastowe wsparcie hostingowe. Jedno istotne zastrzeżenie, na które zwrócili uwagę użytkownicy: udostępniona wersja jest tekstowa, bez wejścia wizyjnego w pierwszym wydaniu, co może rozczarować zespoły liczące na multimodalność od razu po starcie.

DeepSeek zaskoczył mniej samym benchmarkiem, a bardziej ekonomią. V4 Pro w wersji generalnie dostępnej kosztuje około 0,435 dolara za milion tokenów wejściowych i 0,87 dolara za wyjściowe, co Cline określiło jako mniej więcej 57 razy taniej niż Fable 5, przy jednoczesnym wzroście wyniku Terminal Bench o 15,8 procent względem wersji preview. Reakcje na możliwości modelu są bardziej mieszane, część użytkowników uznała go za solidny, ale niekoniecznie lepszy od Kimi czy Flash we wszystkich zadaniach, co sugeruje, że kolejne skoki DeepSeeka będą zależeć bardziej od pracy nad środowiskami RL niż od samego skalowania.

Microsoft dołączył do tej listy z MAI-Thinking-1, pierwszym modelem rozumującym firmy zbudowanym od podstaw, dostępnym już w Foundry. Mustafa Suleyman ogłosił go osobiście, a zespół od razu prosił o informację zwrotną dotyczącą użycia narzędzi, co sugeruje pozycjonowanie produktu jako praktycznego narzędzia stosowanego, a nie kolejnego wpisu do tabeli benchmarków. Upstage tymczasem podniosło swój Solar Pro 4 z pozycji 14 na 42 w Intelligence Index, z dużymi skokami w zadaniach agentowych i długokontekstowych, choć model wciąż zostaje w tyle za liderami zarówno pod względem samego wyniku, jak i ceny.

**Key takeaways:**
- Grok 4.6 łączy dobry wynik jakościowy z bardzo niską ceną, 2 dolary za milion tokenów wejściowych i 6 za wyjściowe.
- Qwen3.8-Max to otwarte wagi 2,4T z 95B aktywnych, ale bez wejścia wizyjnego w pierwszej wersji.
- DeepSeek V4 Pro GA jest znacząco tańszy od konkurencji, choć niekoniecznie lepszy jakościowo na każdym zadaniu.
- MAI-Thinking-1 to pierwszy model rozumujący Microsoftu budowany od zera, pozycjonowany pod praktyczne użycie narzędzi.

**Why do I care:** Cennik Groka 4.6 i DeepSeeka V4 Pro robi coś, co bezpośrednio dotyka projektów, którymi się opiekuję, mianowicie zmienia rachunek ekonomiczny funkcji opartych na LLM w produkcji. Jeśli agent do przeglądu kodu czy generowania testów kosztuje ułamek tego, co kosztował rok temu, to przestaje to być decyzja budżetowa na poziomie zarządu, a staje się czymś, co można włączyć do pipeline'u CI bez większego wahania. Z drugiej strony brak wejścia wizyjnego w Qwen3.8-Max przypomina, że "otwarte wagi" i "gotowe do produkcji" to wciąż dwie różne rzeczy, i warto to sprawdzać przed obietnicami składanymi klientowi.

**Link:** [AINews: SpaceXAI Grok 4.6 and Grok @Bot](https://www.latent.space/p/ainews-spacexai-grok-46-and-grok)

## Otwarte modele multimodalne: wideo, wizja i mowa na urządzeniach

**TLDR:** Tydzień przyniósł mocny zestaw otwartych modeli multimodalnych, od generowania wideo z dźwiękiem w LTX-2.5, przez małe modele wizyjne od Cohere i Liquid AI, po tłumaczenie języka migowego od Google DeepMind i szybką syntezę mowy od Deepgram.

**Summary:** LTX-2.5 od Lightricks trafiło do biblioteki Diffusers z zestawem funkcji, które realnie ułatwiają lokalną pracę: wspólne generowanie wideo i dźwięku w 48 kHz, kontrolowaną promptem długość klipu, tryb dwuprzebiegowy poprawiający jakość, renderowanie kafelkowe obniżające zużycie pamięci oraz preprocessing rekompresujący obrazy wejściowe tak, aby lepiej pasowały do danych treningowych. Ostris AI Toolkit dodał wsparcie tego samego dnia, co pokazuje, jak szybko otwarte narzędzia potrafią dziś nadążać za nowymi modelami. Obserwatorzy określili ten tydzień jako wyjątkowo silny dla otwartych mediów, wskazując obok LTX-2.5 również MiniMax H3, LFM2.5-VL-3B i North Micro Vision.

Cohere wypuściło North Micro Vision na licencji Apache 2.0, mały model wizyjno-językowy skierowany do rozumienia dokumentów, z deklarowanymi wynikami lepszymi niż Gemma 4 E2B i Ministral 3B na szerokim zestawie benchmarków wizualnych. Liquid AI regularnie wraca w rozmowach jako twórca LFM2.5-VL-3B, kompaktowego modelu wizyjnego, który dobrze sprawdza się w hybrydowych stackach łączących zdalne i lokalne wnioskowanie. Przykład takiego podejścia to Hermes Agent korzystający z DeepSeek V4 Flash do planowania i z LFM2.5-VL-3B do lokalnej analizy obrazu, co pokazuje praktyczny podział pracy między dużym modelem w chmurze a małym modelem działającym na urządzeniu.

Na froncie mowy i dostępności pojawiły się dwie ciekawe rzeczy. Google DeepMind ogłosiło SL2T, system tłumaczący język migowy na tekst, który zasila wejście ASL na Androidzie i Pixelu 11. Śledzenie pozy ciała odbywa się na urządzeniu, samo tłumaczenie działa po stronie serwera, a system jest zoptymalizowany pod realne ograniczenia, takie jak migowanie jedną ręką. Deepgram z kolei wypuściło Flux TTS, model syntezy mowy o niskim opóźnieniu, z deklarowanym czasem odpowiedzi rzędu 80 milisekund i adaptacją w trakcie trwania rozmowy, co ma znaczenie dla agentów głosowych działających w czasie rzeczywistym.

**Key takeaways:**
- LTX-2.5 dodaje wspólne generowanie wideo i dźwięku 48 kHz oraz renderowanie kafelkowe obniżające zużycie pamięci.
- North Micro Vision od Cohere to otwarty, mały VLM do dokumentów, konkurujący z Gemmą 4 E2B i Ministralem 3B.
- Hybrydowe stacki łączące duży model w chmurze z małym modelem lokalnym stają się realnym wzorcem projektowym.
- SL2T od Google DeepMind tłumaczy język migowy na tekst z lokalnym śledzeniem pozy i tłumaczeniem po stronie serwera.

**Why do I care:** To, co zwraca moją uwagę najbardziej, to hybrydowy podział pracy między modelem lokalnym a zdalnym, bo dokładnie taki podział trzeba dziś projektować w aplikacjach webowych i mobilnych, które chcą korzystać z AI bez wysyłania każdego piksela do chmury. Małe modele wizyjne w rozmiarze 3B otwierają drzwi do funkcji działających offline lub z niskim opóźnieniem, co dla frontendu oznacza nowy typ komponentu, mianowicie taki, który musi obsłużyć zarówno wynik lokalny, jak i zdalny, i płynnie przełączać się między nimi bez psucia doświadczenia użytkownika.

**Link:** [AINews: SpaceXAI Grok 4.6 and Grok @Bot](https://www.latent.space/p/ainews-spacexai-grok-46-and-grok)

## Infrastruktura inferencji: vLLM, kwantyzacja i planowanie na GPU

**TLDR:** vLLM dodało wsparcie dla Azure Blob i szybszego ładowania wag, LLM Compressor i Unsloth poszły dalej z kwantyzacją modeli MoE, a nowe narzędzia do pisania kerneli GPU pozwalają wychwytywać błędy synchronizacji jeszcze przed uruchomieniem kodu.

**Summary:** vLLM zyskało obsługę ścieżek Azure Blob zarówno do ładowania modeli, jak i do łączników KV cache, co w praktyce oznacza operacyjną poprawę dla bardzo dużych modeli i długich promptów. Przepis stworzony wspólnie przez Microsoft i NVIDIA obejmuje szybsze ładowanie wag dzięki Dynamo ModelExpress, do 7,3 razy szybciej na H100 i A100, oraz cache KV wspierany przez blob storage za pomocą LMCache i NIXL, co pozwala zamienić ponowne przeliczanie na pobieranie danych przy pracy z bardzo długimi kontekstami. Dla zespołów operujących modele w skali produkcyjnej to konkretna oszczędność czasu przy każdym zimnym starcie.

Kompresja modeli też nie stoi w miejscu. LLM Compressor w wersji 0.13.0 dodał REAP, technikę przycinania ekspertów w modelach MoE, która usuwa całe eksperty na podstawie istotności wyliczonej podczas kalibracji, jeszcze zanim dojdzie do kwantyzacji, a do tego dorzucił dowolną kwantyzację na 3, 5, 6 lub 7 bitach. Unsloth poszło o krok dalej i zmniejszyło Qwen3.8 w wariancie 2,4T-A95B z 4,9 terabajta do 397 gigabajtów przy pomocy dynamicznej kwantyzacji 1-bitowej, co sprawia, że lokalne uruchomienie na maszynach z 410 gigabajtami i więcej pamięci RAM lub VRAM staje się realną opcją. Ten sam zespół pokazał też setup 2-bitowy dla Nemotron 3.5 Lightning, utrzymujący długie sesje z użyciem narzędzi w zaledwie 22 gigabajtach VRAM.

Pisanie kerneli GPU staje się bardziej deklaratywne i bezpieczniejsze. CuTeDSL 4.7.0 wprowadził kernele Task Scheduling, które pozwalają jawnie zadeklarować role warpów, zasoby, zależności i harmonogramy, dzięki czemu można statycznie wychwycić zakleszczenia, wyścigi i błędną inicjalizację barier zanim kod trafi do faktycznego wykonania na GPU. Do tego doszedł zwięzły materiał wyjaśniający wymagania techniczne stojące za asynchronicznym kopiowaniem TMA, semantykę acquire/release, mbarriers i krotki arytmetyczne CuTe, co jest przydatne dla każdego, kto próbuje rozumieć nowoczesne prymitywy przesuwania pamięci w NVIDIA.

Nie zabrakło też przypomnienia, że klasyczne stacki rankingowe wciąż przynoszą wymierne korzyści. François Chollet opisał migrację Expedii na nowoczesny setup oparty na Keras 3, raportując 30 procent szybszy trening i 70 procent niższe opóźnienie inferencji dla modeli rankingowych, z dodatkowym argumentem, że backendowo-agnostyczne API Kerasa obniżają ryzyko uzależnienia od jednego dostawcy, gdyby zespół musiał później przejść na PyTorch lub JAX.

**Key takeaways:**
- vLLM z obsługą Azure Blob i Dynamo ModelExpress skraca czas ładowania wag nawet 7,3 raza na H100/A100.
- REAP w LLM Compressor 0.13.0 pozwala usuwać całe eksperty w modelach MoE przed kwantyzacją.
- Unsloth ścieżką kwantyzacji 1-bitowej sprowadziło Qwen3.8-2.4T-A95B z 4,9 TB do 397 GB.
- Migracja rankingu Expedii na Keras 3 dała 30 procent szybszy trening i 70 procent niższą latencję inferencji.

**Why do I care:** Ta część newslettera jest dla mnie bardziej praktyczna niż jakikolwiek benchmark modelowy, bo pokazuje, że koszt uruchomienia dużego modelu przestaje być barierą architektoniczną. Jeśli model wielkości 2,4 biliona parametrów da się realnie postawić lokalnie w niecałych 400 gigabajtach, to nagle pytanie "chmura czy on-prem" wraca na stół w rozmowach z klientami, którzy mają wymogi dotyczące danych. Dla architekta systemów to oznacza konieczność aktualizacji założeń kosztowych sprzed roku, bo wiele z nich po prostu przestało być prawdziwych.

**Link:** [AINews: SpaceXAI Grok 4.6 and Grok @Bot](https://www.latent.space/p/ainews-spacexai-grok-46-and-grok)

## Agenci i narzędzia deweloperskie: harness ponad model

**TLDR:** Coraz więcej głosów w branży twierdzi, że realne postępy w agentach biorą się z inżynierii harnessu, pamięci i bezpieczeństwa, a nie z samego trenowania modeli. GitHub, LangChain i Hermes Agent wypuściły narzędzia idące w tym kierunku, a W&B i Turing Post zwrócili uwagę na ryzyka bezpieczeństwa związane z tożsamością agentów.

**Summary:** Scott Stevenson przedstawił argument, że RAG i inżynieria harnessu wygrywają z trenowaniem modelu w większości praktycznych zastosowań, bo pozwalają personalizować rozwiązanie pod konkretnego klienta, unikać ryzyk prywatności związanych z fine-tuningiem na cudzych danych, poprawiać się w czasie rzeczywistym oraz automatycznie korzystać z postępu bazowego modelu bez dodatkowej pracy. Random Walker dorzucił przydatne rozróżnienie produktowe między agentami delegującymi a agentami współpracującymi, gdzie te dwie kategorie mają zupełnie inne cele optymalizacyjne, jedne stawiają na weryfikowalność wyniku, inne na niską latencję i stały udział człowieka w pętli.

Ta zmiana perspektywy widać też w konkretnych wydaniach narzędzi. GitHub wprowadził Agent Plugins 1.0, pakujące razem umiejętności, serwery MCP i rozszerzenia AI, a przy okazji poprawił drobne rzeczy w interfejsie, jak przewijanie przyklejone do aktywnej sekcji czy lepszą obsługę sesji. Po stronie OpenAI i Codexa również widać ruch, między innymi Codex trafił na Linuksa. LangChain przebudowało dashboardy LangSmith pod bardziej użyteczną analizę śladów wykonania i raportowanie, co sugeruje, że obserwowalność agentów zaczyna być traktowana równie poważnie jak obserwowalność klasycznych aplikacji backendowych.

Pamięć i przenośny stan agenta stają się standardowym oczekiwaniem, a nie dodatkiem premium. Hermes Agent zebrał kilka aktualizacji ekosystemowych naraz, od możliwości wdrożenia na Raspberry Pi, przez łatwy eksport i import profilu, po nowe umiejętności takie jak generowanie reużywalnych API na podstawie zaobserwowanego ruchu sieciowego. LangChain pokazał z kolei przykłady zarządzanych Deep Agents skupionych wyraźnie na trwałej pamięci i powtarzalnych przepływach pracy, jak agenci obsługujący social media w sposób ciągły, a nie jednorazowo.

Bezpieczeństwo agentów przestaje być tematem czysto teoretycznym. W&B pokazało przykład dwóch agentów obsługujących pocztę obok siebie, gdzie jeden wyciekł numer SSN i dane karty, a drugi zablokował próbę wstrzyknięcia promptu i zredagował poufne dane zanim trafiły do modelu. Turing Post podniósł bardziej architektoniczny problem związany z tożsamością delegowaną, jeśli agent używa bezpośrednio poświadczeń użytkownika do usług SaaS, to odwołanie dostępu i audyt działań stają się trudne do jednoznacznego rozliczenia.

**Key takeaways:**
- Harness engineering, pamięć i ewaluacje coraz częściej dają większy zwrot niż dodatkowy trening modelu.
- Rozróżnienie na agentów delegujących i współpracujących pomaga dobrać właściwe metryki sukcesu dla produktu.
- GitHub Agent Plugins 1.0 łączy umiejętności, serwery MCP i rozszerzenia AI w jednym pakiecie.
- Agenci używający bezpośrednio poświadczeń użytkownika tworzą realny problem z odwołaniem dostępu i audytem.

**Why do I care:** Ten fragment trafia dokładnie w to, czym zajmuję się zawodowo na co dzień, czyli architekturę integracji, a nie sam model. Rozróżnienie na agentów delegujących i współpracujących powinno wejść do słownika każdego zespołu projektującego funkcje oparte na AI, bo bez niego łatwo zbudować produkt, który optymalizuje niewłaściwą metrykę. Problem tożsamości delegowanej też mnie niepokoi, bo widziałem już projekty, w których agent dostawał pełne poświadczenia użytkownika bez żadnego osobnego mechanizmu odwołania dostępu, a to prędzej czy później skończy się incydentem, który trafi na pierwszą stronę jakiegoś serwisu technologicznego.

**Link:** [AINews: SpaceXAI Grok 4.6 and Grok @Bot](https://www.latent.space/p/ainews-spacexai-grok-46-and-grok)

## Benchmarki i badania: matematyka, długi kontekst i medycyna

**TLDR:** Tydzień przyniósł głośną historię o rozwiązaniu otwartego problemu matematycznego przez rezydenta neurochirurgii wspieranego przez ChatGPT, nowe benchmarki mierzące odkrywanie i rozumowanie pojęciowe, a także badania pokazujące, jak łatwo zepsuć wydajność długiego kontekstu wyborami architektonicznymi, których efekt nie widać na krótkich testach.

**Summary:** Najbardziej angażującym wątkiem technicznym tygodnia była historia opowiedziana przez Stevena Strogatza o rezydencie neurochirurgii, który podobno użył ChatGPT 5.6 do rozwiązania istotnego otwartego problemu z zakresu numerycznej algebry liniowej. Równolegle kilka kont odnotowało, że kolejny otwarty problem z listy EpochAI został rozwiązany, co razem sugeruje, że modele językowe coraz częściej trafiają do rąk ludzi spoza tradycyjnych ośrodków badawczych i realnie im pomagają w konkretnej pracy naukowej, a nie tylko w demonstracjach.

Na poziomie samych benchmarków pojawiły się propozycje mierzące coś innego niż standardowe pytania czy zadania z kodem. Zespół z Princeton i MIT wypuścił DiG-bench, tekstowy test skupiony na odkrywaniu, który Tri Dao pochwalił za to, że ma coś z ducha ARC bez wprowadzania problemów związanych z percepcją wizualną. Redwood razem z Anthropic zaproponowali Conceptual Reasoning Index, celujący w argumentację związaną z ryzykiem AI i rozumowanie pojęciowe tam, gdzie informacja zwrotna jest rzadka i trudna do zautomatyzowania. Vals ogłosiło z kolei SRE-Bench, skupiony na inżynierii wsteczniej kodu binarnego, a nie na zadaniach cyberbezpieczeństwa operujących na poziomie kodu źródłowego.

Efektywność post-treningu i praca nad długim kontekstem też zasłużyły na uwagę. Lewis Tunstall opisał Direct On-Policy Distillation, gdzie uczenie ze wzmocnieniem przeprowadza się na mniejszym modelu, a następnie przenosi zmianę polityki na większy model za pomocą gęstej, niejawnej nagrody, co w opisanym eksperymencie pozwoliło zmniejszyć koszt całego pipeline'u mniej więcej o połowę. Podsumowanie nowych prac nad OLMo, Llama i Qwen od dair.ai argumentuje, że cztery wybory architektoniczne, normalizacja, GQA, długość kontekstu użyta w pretreningu i uwaga typu sliding window, potrafią razem odpowiadać nawet za 47 procent utraconej wydajności długiego kontekstu, mimo że walidacja na krótkim kontekście wygląda w porządku.

Badania kliniczne i domenowe z użyciem uczenia ze wzmocnieniem też pokazały konkretne liczby. Wątek podsumowujący pracę Google o nazwie ResidencyRL wskazuje, że trenowanie Gemini 3.5 Flash na 49 870 symulowanych konsultacjach telemedycznych podniosło dokładność diagnostyczną w warunkach adwersarialnych z 81 do 88 procent i zredukowało liczbę przeoczonych sygnałów ostrzegawczych o 31 procent. Snowflake pokazało z kolei dobry kontrargument dla tezy, że większy model zawsze wygrywa, ich nowy model 4B do autouzupełniania SQL pobił poprzedni model MoE o skali 30B-A3B, poprawiając akceptację sugestii przez użytkowników i jednocześnie obniżając medianę opóźnienia o 71 procent.

**Key takeaways:**
- Rezydent neurochirurgii miał użyć ChatGPT 5.6 do rozwiązania otwartego problemu z numerycznej algebry liniowej.
- Nowe benchmarki, takie jak DiG-bench i Conceptual Reasoning Index, celują w odkrywanie i rozumowanie pojęciowe zamiast klasycznych QA.
- Cztery wybory architektoniczne, w tym normalizacja i sliding window attention, mogą kosztować do 47 procent wydajności długiego kontekstu.
- Mniejszy model 4B od Snowflake pobił model 30B-A3B w zadaniu autouzupełniania SQL, obniżając latencję o 71 procent.

**Why do I care:** Historia z mniejszym modelem Snowflake bijącym znacznie większy model MoE jest dla mnie ważniejsza niż jakikolwiek nagłówek o rekordowym wyniku benchmarku, bo pokazuje coś, co powtarzam klientom od dawna, mianowicie że dobrze dobrany, wąski model potrafi wygrać z uniwersalnym olbrzymem w konkretnym zadaniu produkcyjnym. To samo dotyczy pracy nad długim kontekstem, gdzie łatwo zbudować demo, które wygląda świetnie na krótkich promptach, a rozpada się przy realnym obciążeniu z dużą ilością tokenów, dokładnie tam, gdzie klienci najczęściej testują system dopiero po wdrożeniu na produkcję.

**Link:** [AINews: SpaceXAI Grok 4.6 and Grok @Bot](https://www.latent.space/p/ainews-spacexai-grok-46-and-grok)

## Niewidzialne znaki wodne w tekstach Claude

**TLDR:** Anthropic zaczęło wbudowywać niewidzialny znak wodny w tekstowe odpowiedzi Claude oraz podpisane metadane C2PA w generowanych plikach graficznych. Dotyczy to modeli wydanych od 2 sierpnia 2026 roku, a mechanizm ma przetrwać kopiowanie i drobne edycje, choć nie jest odporny na poważne przeformułowanie.

**Summary:** Anthropic opisuje to rozwiązanie jako oznaczanie treści wygenerowanej lub edytowanej przez AI za pomocą sygnałów metadanych i pochodzenia, a nie jako widoczny znak wodny w tekście. Trwałość i sam mechanizm zależą od typu pliku i sposobu jego dalszej obróbki, a sygnał może zostać utracony po edycji, eksporcie albo przejściu przez inną platformę. Modele Claude wydane od 2 sierpnia 2026 roku mają wbudowywać niepostrzegalny znak wodny na poziomie modelu w tekście, zaprojektowany tak, aby przetrwał kopiowanie i wklejanie oraz część edycji, bez wpływu na czytelność czy znaczenie tekstu. Pliki graficzne, takie jak .png, .jpg czy .svg, mają dodatkowo nosić podpisane cyfrowo metadane C2PA, a narzędzia do wykrywania trzecich stron mają dopiero powstać, przy czym starsze modele mają zostać zaktualizowane w okresie przejściowym.

Techniczne wyjaśnienie tego, jak taki niewidzialny znak wodny w ogóle może działać, sprowadza się do schematu opartego na kluczu, stosowanego już w trakcie generowania tekstu. Model lekko faworyzuje pseudolosowo wybrany podzbiór tokenów w zależności od poprzedzającego kontekstu i tajnego klucza, co tworzy ukryty wzorzec statystyczny, zachowując przy tym płynność tekstu. Wykrywanie polega na ponownym przeliczeniu tej samej tajnej reguły na tekście i sprawdzeniu, czy faworyzowane tokeny występują częściej niż wynikałoby to z przypadku, zwykle za pomocą statystyki podobnej do z-score. Jedno z przywoływanych odniesień technicznych to praca Google opublikowana w Nature pod tytułem "Scalable watermarking for identifying large language model outputs", opisująca pokrewne podejście oparte na próbkowaniu turniejowym stosowanym w SynthID-Text.

Sceptycyzm w komentarzach koncentruje się na dwóch punktach. Po pierwsze, robustność takiego znaku wodnego dla tekstu budzi wątpliwości, bo przeformułowanie treści przez inny model, zwłaszcza lokalny model open source, może zniszczyć statystyczne wzorce na poziomie tokenów, na których opiera się wykrywanie. Po drugie, część komentujących postrzega samą możliwość powiązania tekstu z Claude jako argument prywatnościowy przemawiający za wyborem modeli open source, gdzie takiego mechanizmu po prostu nie ma. Nie jest to zresztą unikalne dla Anthropic, bo OpenAI od dawna prowadzi własną pracę nad pochodzeniem i znakowaniem treści.

Pojawił się też ważny problem techniczny związany z fałszywymi alarmami. Jeśli wykrywanie opiera się wyłącznie na statystyce, naturalnie napisany tekst teoretycznie może przypadkowo nadużywać tokenów z listy faworyzowanej, co prowadzi do fałszywego rozpoznania jako tekst wygenerowany przez AI. To oznacza, że praktyczne wdrożenia detektorów wymagają skalibrowanych progów, wystarczająco długich próbek tekstu i rzetelnie zmierzonego kompromisu między fałszywymi pozytywami a fałszywymi negatywami, a nie traktowania wyniku detekcji jako jednoznacznej odpowiedzi tak lub nie.

**Key takeaways:**
- Modele Claude wydane od 2 sierpnia 2026 roku wbudowują niewidzialny znak wodny w tekście, odporny na kopiowanie i drobne edycje.
- Pliki graficzne z Claude niosą podpisane cyfrowo metadane C2PA, ale narzędzia detekcji trzecich stron dopiero powstają.
- Mechanizm opiera się na faworyzowaniu tokenów podczas próbkowania i wykrywaniu tego wzorca statystyką typu z-score.
- Poważne przeformułowanie tekstu przez inny model może zniszczyć wzorzec, a fałszywe alarmy pozostają realnym ryzykiem technicznym.

**Why do I care:** Jako ktoś, kto ocenia projekty pod kątem zgodności i ryzyka, patrzę na to znakowanie z dużą rezerwą, bo obietnica "przetrwa kopiowanie i wklejanie" brzmi solidnie w komunikacie prasowym, a rozpada się przy pierwszym przepuszczeniu tekstu przez inny model do parafrazy. Realna wartość tego mechanizmu będzie widoczna dopiero wtedy, gdy pojawią się niezależne narzędzia do detekcji i ktoś przetestuje je na tekstach poddanych typowej edycji redakcyjnej, a nie na czystym kopiowaniu z okna czatu. Do tego czasu traktowałbym to bardziej jako gest w stronę regulatorów niż jako coś, na czym da się oprzeć proces weryfikacji treści w firmie.

**Link:** [AINews: SpaceXAI Grok 4.6 and Grok @Bot](https://www.latent.space/p/ainews-spacexai-grok-46-and-grok)
