---
title: "Fable 5 wraca, GLM-5.2 rośnie w siłę, a agenci uczą się pamiętać"
excerpt: "Przegląd wydarzeń ze świata AI z 1 lipca 2026: powrót Claude Fable 5, ekspansja chińskich modeli open-source, nowe wzorce pamięci agentów i przełom NVIDIA w szybkości generowania."
publishedAt: "2026-07-02"
slug: "fable-5-wraca-glm-52-agenci-pamiec-ainews-2026-07-02"
hashtags: "#ai #llm #agents #claude #fable5 #glm #openmodels #inference #engineering #generated #pl"
source_pattern: "AINews"
---

## Powrót Claude Fable 5 i ewolucja strategii doboru modeli

**TLDR:** Anthropic przywrócił dostęp do Fable 5 po przerwie, ale z nowymi ograniczeniami dotyczącymi bezpieczeństwa. Społeczność natychmiast dostosowała swoje podejście, przechodząc na orchestrację wielu modeli zamiast polegania na jednym.

**Summary:** Fable 5 jest z powrotem, ale historia, która mnie naprawdę interesuje, to nie samo uruchomienie modelu. Anthropic ogłosił powrót Fable 5 wraz z informacją, że zaktualizowane zabezpieczenia cyberbezpieczeństwa mogą w niektórych przypadkach kierować zapytania do Opus 4.8, a klasyfikatory dla biologii i chemii są na razie zbyt szerokie. Cursor od razu odnotował, że Fable 5 prowadzi ich wewnętrzne ewaluacje, ale jest jednocześnie najdroższy per zadanie. Devin od Cognition dodał go na wszystkich platformach, Perplexity przywrócił go jako model orkiestratora.

Jednak najciekawszy wątek wyniknął nie z samego ogłoszenia, lecz z reakcji ekosystemu. Theo opisał swoje podejście: Fable służy wyłącznie do bardziej wymagającego rozumowania i planowania, a implementacja, weryfikacja i computer-use trafiają do innych modeli. Efekt jest mierzalny w postaci lepszej skuteczności PR-ów. Omar Sehrawat przekonywał, że zespoły powinny projektować strategie kombinacji modeli zamiast budować wszystko wokół jednego frontier model. To nie jest nowe myślenie, ale jest to myślenie, które staje się powszechne dopiero teraz.

Pojawił się też ciekawy głos krytyczny. Mikhail Parakhin zwrócił uwagę, że routing na podstawie prostego klasyfikatora zadań często wymaga de facto rozwiązania zadania, żeby wiedzieć, jak je sklasyfikować. To jest prawdziwy problem praktyczny, który znają wszyscy, którzy próbowali budować systemy wielomodelowe na serio. Pre-klasyfikacja brzmi sensownie w teorii, ale w praktyce granica między prostym a złożonym zadaniem jest często płynna.

Na froncie ewaluacji, Fable 5 uzyskał 16.10% na Remote Labor Index, a Sonnet 5 zajął drugie miejsce na AA-Briefcase, ale przy znacznie wyższej liczbie iteracji i słabszym stosunku kosztu do efektu przy niższych ustawieniach. Dane o efektywności kosztowej modeli przy różnych poziomach zadań zaczynają być ważniejsze niż czyste benchmarki dokładności.

**Key takeaways:**
- Fable 5 wrócił z nowymi ograniczeniami bezpieczeństwa; część zapytań może trafiać do Opus 4.8
- Strategia multi-model orchestration staje się standardem wśród profesjonalnych użytkowników
- Problem pre-klasyfikacji zadań do routingu jest realny i nierozwiązany
- Cursor twierdzi, że Fable 5 wygrywa ich evale, ale koszt per zadanie jest najwyższy

**Why do I care:** Z perspektywy architekta frontendowego budującego narzędzia z AI w tle, przejście na orchestrację wielomodelową to coś, co musimy wziąć pod uwagę już na etapie projektowania. Nie chodzi tylko o zamianę jednego API na drugie. To decyzja architektoniczna dotycząca tego, gdzie mieści się logika routingu, jak zarządzamy kosztami i jak debugujemy system, w którym różne modele mogą zachowywać się inaczej dla pozornie podobnych zapytań.

**Link:** [AINews: not much happened today](https://www.latent.space/p/ainews-not-much-happened-today-900)

---

## GLM-5.2 i ekspansja chińskiego ekosystemu open-source

**TLDR:** Z.ai buduje pełen ekosystem produktowy wokół GLM-5.2, nie tylko wypuszcza checkpoint modelu. GLM-5.2 jako pierwszy open model wygrał kategorię w APEX-SWE, a prędkość wnioskowania rośnie dzięki specjalistycznym implementacjom.

**Summary:** To, co robi Z.ai z GLM-5.2, jest strategicznie interesujące. ZCode to oficyjne środowisko deweloperskie dla tego modelu, z BYOK (bring-your-own-key), dostępnością cross-platform i bonusem kwotowym dla subskrybentów planu kodowania. LangChain opublikował przewodniki używania GLM-5.2 w przepływach kodowania, a Harrison Chase z LangChain wprost mówił o deweloperach, którzy przechodzą na GLM-5.2 jako swój codzienny model.

Wyniki benchmarków są konkretne i warte uwagi. GLM-5.2 jako pierwszy open model wygrał kategorię w APEX-SWE, osiągając 55.3% Pass@1 w Integrations i zajmując pierwsze miejsce wśród modeli open source testowanych w tym benchmarku. Kimi K2.7 uplasował się tuż za nim. To nie jest twierdzenie o ogólnej dominacji nad frontier models — scaling01 słusznie przestrzegał przed nadmiernym optymizmem w tym zakresie — ale specyficzna luka w kodowaniu wyraźnie się zmniejsza.

Na poziomie infrastruktury wnioskowania dzieje się równie dużo. vLLM otrzymał natywne wsparcie dla DSpark speculative decoding dla modeli DeepSeek, co przekłada się na około 250 tokenów na sekundę na układzie 8×B300 z lepszą akceptacją niż MTP. Opublikowany preview GLM-5.2 DSpark twierdzi o około 1.5× szybszym dekodowaniu. Ktoś inny raportował o 50% wyższej przepustowości na Qwen3-32B dzięki własnemu drafter w stylu dflash. Liczby są zachęcające, choć zawsze warto czekać na niezależne potwierdzenie.

**Key takeaways:**
- Z.ai buduje pełny produkt wokół GLM-5.2: IDE, BYOK, ekosystem narzędzi
- GLM-5.2 pierwszy open model prowadzący w kategorii na APEX-SWE (55.3% Pass@1 w Integration)
- DSpark speculative decoding w vLLM dla DeepSeek: ~250 tok/s na 8×B300
- Luka między open a frontier models w kodowaniu się zmniejsza, ale nie zniknęła

**Why do I care:** Jako developer, który czasem uruchamia modele lokalnie lub szuka alternatyw dla API z rosnącymi cenami, konsolidacja ekosystemu wokół konkretnego open modelu (własne IDE, integracje z frameworkami, tooling) to sygnał, że GLM-5.2 jest wart przetestowania jako alternatywa. To nie jest już tylko "model do pobrania z HuggingFace" — to platforma deweloperska, podobnie jak Cursor jest platformą, a nie tylko edytorem.

**Link:** [ZCode launch](https://substack.com/redirect/a112ee96-fa7e-428d-90ef-bbae310ec417?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

---

## Pamięć agentów: od wyszukiwania do zarządzania wiedzą

**TLDR:** Wzorzec "wiki memory" dla agentów zyskuje popularność jako praktyczne rozwiązanie problemu utraty kontekstu między sesjami. LangChain wypuścił OpenWiki, a Weaviate prezentuje Engram jako system reconciliacji wspomnień.

**Summary:** Sydney Runkle zaproponowała wiki-strukturowaną pamięć jako prosty, rozszerzalny substrat dla agentów i pomysł błyskawicznie zamienił się w konkretne produkty. LangChain wypuścił OpenWiki — narzędzie generujące i utrzymujące dokumentację kodu czytelną dla agentów, uruchamiane przez openwiki --init. Motywacja jest spójna: agenci tracą kontekst pracy między wątkami i potrzebują utrzymywanej, inspektowalnej warstwy wiedzy zamiast surowych logów.

To, co mnie interesuje w tej dyskusji, to przesunięcie od pamięci jako wyszukiwania do pamięci jako reconciliacji. Engram od Weaviate to dobry przykład: kandydujące wspomnienia są wyodrębniane, transformowane względem istniejącej pamięci i dopiero wtedy zatwierdzane, tak żeby sprzeczności były rozwiązywane raz, a nie przy każdym zapytaniu. To jest architektonicznie dużo dojrzalsze niż proste RAG na plikach markdown.

Balin Palit rozszerzył ten argument na kontekst enterprise: pamięć agenta w firmie musi być zarządzana, świadoma uprawnień i współdzielona. To nie jest folder plików, to system, który musi respektować granice organizacyjne. Takie wymagania bardzo szybko prowadzą do pytań o governance i audit trail, które są znacznie bardziej złożone niż same algorytmy pamięci.

SkillComposer idzie w podobnym kierunku ale dla narzędzi: zamiast dawać modelowi wszystkie narzędzia naraz, traktuje wybór umiejętności jako wspólny problem autoregresywnej kompozycji. Wyniki to +23.1pp i +18.2pp na SkillsBench względem podstawy bez umiejętności. Deep Agents dodał wsparcie dla rekurencyjnych przepływów LLM, a wzorzec Agentic MapReduce (fan-out/fan-in) pojawia się coraz częściej jako struktura dla bardziej złożonych zadań.

**Key takeaways:**
- Wiki-structured memory wyłania się jako dominujący wzorzec pamięci długoterminowej dla agentów
- OpenWiki od LangChain: generowanie dokumentacji kodu czytelnej dla agentów
- Engram (Weaviate): reconciliacja wspomnień przy zapisie zamiast przy każdym zapytaniu
- SkillComposer: +23.1pp na SkillsBench przez traktowanie wyboru narzędzi jako problemu kompozycji

**Why do I care:** Buduję narzędzia, w których agent ma kontekst sesji pracy użytkownika. Problem utraty kontekstu między sesjami jest bardzo realny i rozwiązania oparte na surowych logach albo prostym RAG nie skalują się dobrze. OpenWiki jako narzędzie generujące dokumentację kodu dla agentów jest tym, co chciałbym zintegrować ze swoim setup'em — szczególnie przy pracy z dużymi codebasami gdzie agent traci wątek po kilku iteracjach.

**Link:** [OpenWiki by LangChain](https://substack.com/redirect/09557729-d6ae-4bf0-be5e-807fc5764e21?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

---

## Devin Security Swarm i wzorzec Agentic MapReduce

**TLDR:** Cognition zaprezentował Security Swarm oparty na Agentic MapReduce do analizy bezpieczeństwa kodu na dużą skalę. Pilotaż Fortune 500 wykrył ponad tysiąc podatności w produkcyjnych repozytoriach.

**Summary:** Security Swarm od Cognition to jeden z bardziej klarownych przykładów tego, jak architektura agentów specjalizuje się wokół realnego przepływu pracy enterprise. System używa Agentic MapReduce do dystrybucji ograniczonych agentów po całym kodzie, agregacji wyników i walidacji exploitowalności przed wyniesieniem potwierdzonych podatności. Cognition twierdzi, że podejście jest zarówno tańsze, jak i dokładniejsze od alternatyw, a pilotaż z firmą z Fortune 500 doprowadził do wykrycia i naprawienia ponad tysiąca podatności w produkcyjnych repozytoriach.

Reakcja społeczności była przewidywalna, ale w pozytywnym sensie: budujący jak Jake Luo czy Aaron Levie wskazali, że ten wzorzec uogólni się na duże dokumenty, kod i przepływy wiedzy. Mają rację. Fan-out/fan-in z walidacją przed agregacją to elegancka odpowiedź na problem, który pojawia się wszędzie tam, gdzie zadanie jest zbyt duże na pojedynczy kontekst modelu ale ma wystarczającą strukturę, żeby dało się je podzielić.

Na froncie ewaluacji agentów: Agent Arena przywrócił Fable 5 w trybie agentowym, Artificial Analysis opublikował AA-AgentPerf mierzący agenty-na-megawat jako benchmark systemowy, a WorldModelGym od Reka sprawdza czy world model faktycznie wspiera dobre podejmowanie decyzji zamiast tylko generować wiarygodne symulacje. Ocena agentów staje się odrębną subdyscypliną i to jest właściwy kierunek.

Osobna inicjatywa warta odnotowania: FLARE-AI, koalicja badaczy cyberbezpieczeństwa i bezpieczeństwa AI, zmierza do standaryzacji raportowania błędów i incydentów w systemach AI, żeby problemy trafiały do właściwych deweloperów i rejestrów zamiast znikać w silosowanych formularzach.

**Key takeaways:**
- Devin Security Swarm używa Agentic MapReduce do analizy podatności w dużych codebasach
- Pilotaż Fortune 500: ponad 1000 wykrytych i naprawionych podatności
- Wzorzec fan-out/fan-in z walidacją przed agregacją uogólnia się na wiele domenów
- FLARE-AI: standaryzacja raportowania incydentów AI między organizacjami

**Why do I care:** Wzorzec Agentic MapReduce jest dla mnie bezpośrednio użyteczny. Kiedy buduję narzędzia do analizy kodu lub dokumentacji, naturalne pytanie to jak podzielić duży codebase na kawałki, które agent może przetworzyć równolegle, a potem scalić wyniki w sensowny raport. Security Swarm jest dobrym case study tego, jak to zrobić w sposób, który faktycznie działa w produkcji.

**Link:** [Devin Security Swarm](https://substack.com/redirect/a7620f8a-424d-45b5-8155-30a9969a6cb0?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

---

## TwoTower od NVIDIA i nowe podejścia do architektury inference

**TLDR:** NVIDIA zaprezentowało Nemotron-Labs-TwoTower, architekturę diffusion-style do generowania tokenów równolegle, uzyskując 2.42x szybkość przy zachowaniu 98.7% jakości. Inne projekty pokazują przyspieszenia inference na urządzeniach i w przeglądarce.

**Summary:** Wynik TwoTower wyróżnia się jako konkretny kompromis szybkości i jakości w architekturze generowania. NVIDIA przystosował model 30B do działania w stylu diffusion, generując tokeny równolegle przez konfigurację z dwoma kopiami. Zadeklarowany wynik: 2.42x szybsze generowanie przy zachowaniu 98.7% jakości oryginalnego modelu. Lior zawarł to zwięźle: jedno zamrożone model kontekstu plus wytrenowany model pisania, bez konieczności pełnego treningu od zera.

WebGPU Gemma 4 osiąga 255 tokenów na sekundę na M4, a atrybutuje to jądrom napisanym przez Fable 5 — co jest interesującym meta-przykładem modelu używanego do optymalizacji własnego inference runtime. Oddzielnie, zaprezentowano w pełni open-source stack głosowy w czasie rzeczywistym wokół Gemma 4 31B z inference od Cerebras, jako drop-in alternatywa dla realtime API OpenAI.

Na poziomie kerneli, biblioteka Hugging Face kernels udostępniła teraz kernel MSA od MiniMax. Triton-on-Mac przyciąga uwagę jako możliwość pisania kerneli ML na sprzęcie Apple. To wszystko są sygnały, że stack inference pod LLM dojrzewa i różnicuje się: nie ma już jednej ścieżki, jest wiele warstw optymalizacji, od architektury modelu przez speculative decoding po kernele GPU.

W obszarze architektury research pojawił się AdaJEPA (podejście world-model prowadzone przez LeCun z test-time adaptation przez predykcję błędu stanu ukrytego), NEO uczący się reużywalnych przyczynowych "programów" zamiast tylko predykcji następnej klatki, oraz dyskusja o "trenowaniu w wyobraźni" jako aktywnym paradygmacie.

**Key takeaways:**
- NVIDIA TwoTower: 2.42x szybsze generowanie przy 98.7% zachowanej jakości na architekturze diffusion-style
- WebGPU Gemma 4: 255 tok/s na M4 dzięki jądrom napisanym przez Fable 5
- Open-source realtime voice stack: Gemma 4 31B + Cerebras jako alternatywa dla OpenAI realtime API
- Together Computer zebrało 800M dolarów w rundzie Series C przy wycenie 8.3B dolarów

**Why do I care:** TwoTower to dla mnie interesujące nie dlatego, że jutro zastosuję diffusion-style generation w swoich projektach, ale dlatego że pokazuje, że architektura generowania tokenów jest otwartym polem badań. Przez lata zakładaliśmy, że autoregresja jest jedyną realną ścieżką dla LLM. Jeśli generowanie równoległe da się skalować przy zachowaniu jakości, ma to ogromne konsekwencje dla latencji w aplikacjach interaktywnych, gdzie każda milisekunda ma znaczenie dla UX.

**Link:** [AINews: not much happened today](https://www.latent.space/p/ainews-not-much-happened-today-900)
