---
title: "Meta-harness lato: agenty AI zmieniają architekturę pracy zespołowej"
excerpt: "AINews z 24-25 czerwca 2026: OpenAI prezentuje własny chip Jalapeño, Anthropic osadza Claude w Slacku z pełną tożsamością agenta, Qwen wypuszcza language world models, a otwarte chińskie modele zamykają lukę do zachodnich frontierów."
publishedAt: "2026-06-25"
slug: "meta-harness-lato-agenty-ai-architektura-pracy-2026-06-25"
hashtags: "#ainews #ai #agents #llm #openai #anthropic #qwen #chips #generated #pl"
source_pattern: "AINews"
---

## OpenAI Jalapeño: własny chip i wyścig o pełny stos infrastruktury

**TLDR:** OpenAI ogłosiło Jalapeño - swój pierwszy chip AI do inferencji LLM, zbudowany we współpracy z Broadcom. To strategiczny krok w kierunku pełnej kontroli nad stosem obliczeniowym: od krzemu przez kernele po deployment. Równolegle Qualcomm przejął Modular, a NVIDIA ogłosiła 3.4-3.7x wyższy throughput treningowy dla modeli MoE.

OpenAI od dawna zależało na dostawcach GPU, głównie NVIDIA, i Jalapeño jest wyraźnym sygnałem, że ten stan rzeczy ma się zmienić. Chip jest przeznaczony do obsługi ChatGPT, Codex, ruchu API i przyszłych produktów agentowych. Celem nie jest pobicie NVIDIA na rynku - celem jest uniezależnienie się od niej w kontekście własnej ekonomiki obliczeniowej.

Społeczność techniczna szybko wzięła się za reverse engineering. Według wstępnych analiz Jalapeño wygląda jak TPU: bliskie reticle die, około 216 GB HBM3E, przepustowość pamięci 7.1-7.4 TB/s i około 10 PFLOPS FP4. Warto podkreślić, że cały cykl od projektu do tapeout zajął zaledwie 9 miesięcy - co jak na ASIC klasy high-performance jest rekordowym tempem, przypisywanym częściowo własnemu use'owi modeli OpenAI w procesie projektowania.

W tym samym czasie Chris Lattner ogłosił przejęcie Modular przez Qualcomm, przy czym open-sourcing języka Mojo ma pozostać zgodnie z planem. To interesujące posunięcie - Qualcomm zyskuje kompilator/runtime dla AI, a Mojo nie umiera jako projekt. Dla ekosystemu inferencji poza CUDA/NVIDIA to dobra wiadomość. Więcej graczy z własnymi toolchainami to więcej presji na NVIDIA.

Na poziomie serving/throughput: NVIDIA ogłosiła NeMo AutoModel z 3.4-3.7x wyższym throughputem treningowym dla MoE przez Expert Parallelism i TransformerEngine. SkyPilot wypuścił Endpoints dla zunifikowanej inferencji na klastrach własnych. Modal twierdzi, że open-source'owe setupy inferencji biją proprietary providerów na latency. Lokalne optymalizacje też idą do przodu - @jon_durbin raportuje 30-50% realne zyski z decode'u przez custom modele DFLASH.

**Key takeaways:**
- OpenAI Jalapeño: własny chip inferencyjny zbudowany z Broadcom, 9 miesięcy od projektu do tapeout
- Szacowane parametry: ~216 GB HBM3E, ~7.1-7.4 TB/s bandwidth, ~10 PFLOPS FP4
- Qualcomm przejmuje Modular; Mojo open-source ma pozostać
- NVIDIA NeMo AutoModel: 3.4-3.7x wyższy throughput treningowy dla MoE

**Why do I care:** Własny chip to jeden z najpoważniejszych ruchów strategicznych, jakie OpenAI mogło wykonać. Zależność od NVIDIA oznaczała, że ekonomika skali była w rękach zewnętrznego gracza. Teraz OpenAI buduje swoją własną vertical integration - i to zmienia kalkulację dla całej branży. Jeśli jeden z największych klientów NVIDIA odchodzi w kierunku własnego krzemu, reszta rynku to zauważy.

**Link:** [OpenAI Jalapeño chip announcement](https://openai.com)

---

## Claude w Slacku: agent z tożsamością, uprawnieniami i własnym audit trail

**TLDR:** Anthropic szczegółowo opisało model tożsamości agenta - Claude embedded w Slacku dostaje własne poświadczenia, wszystkie akcje są audytowalne pod tą tożsamością, a dostęp można centralnie cofnąć. To wywołało zarówno zainteresowanie jak i poważną debatę o bezpieczeństwie, lock-in i kosztach.

Andrej Karpathy zauważył coś, co umknęło większości: Claude w Slacku to nie "feature" ani "Slack bot" - to harness na poziomie organizacyjnym. Ta zmiana perspektywy jest ważna. Kiedy jeden agent ma dostęp do całej historii rozmów, zadań i decyzji organizacji, przestajemy mówić o narzędziu, a zaczynamy o kooperancie z pełną pamięcią instytucjonalną.

@gallabytes opisał to trafnie: przejście od Claude Code jako "partnera parowania" do @Claude Tags jako "zarządzania zespołem." @dabit3 poszedł dalej - w przyszłości możliwe, że w ogóle nie będziemy musieć tagować agentów, bo sami będą wiedzieć kiedy powinni się włączyć.

Model tożsamości agenta Anthropic to próba odpowiedzi na realne obawy enterprise. @KentonVarda kontrargumentował, że explicit per-agent permissioning nie skaluje się i że lepszą odpowiedzią jest capability-based security z fine-grained, task-scoped access. @random_walker trafnie opisał Claude Tag jako "kolegę, który pamięta wszystko i liczy per myśl" - co rodzi pytania o tacit-knowledge lock-in, prompt injection risk i budget opacity.

Hugging Face odpowiedziało na to z innej strony: opisali własnego wewnętrznego agenta Moon Bot - self-hostowany, z custom tools, audytowalnymi sesjami i zerem lock-in. Integracje produkcyjne obejmują GitHub, Athena, analytics, MongoDB, Elasticsearch i HF Buckets. Przekaz jest jasny: chcemy agent-native UX, ale wolimy posiadać harness i warstwę pamięci sami.

**Key takeaways:**
- Claude w Slacku ma własne poświadczenia i audit trail per akcja
- Główne obawy: lock-in na wiedzę organizacyjną, prompt injection, nieprzewidywalne koszty
- Capability-based security jako alternatywa dla per-agent explicit permissioning
- Hugging Face Moon Bot jako open-source'owa odpowiedź na vendor lock-in

**Why do I care:** To jest fundamentalna zmiana w tym, czym jest "agent" w kontekście pracy zespołowej. Kiedy agent ma tożsamość, uprawnienia i pamięć, nie jesteś już tylko użytkownikiem narzędzia - zaczynasz zarządzać nowym typem pracownika. A pytania o bezpieczeństwo, uprawnienia i koszty stają się kwestiami organizacyjnymi, nie tylko technicznymi.

**Link:** [Claude w Slacku - thread o modelu tożsamości](https://twitter.com)

---

## Qwen-AgentWorld i OpenThoughts-Agent: memory jako nowa oś skalowania agentów

**TLDR:** Alibaba Qwen wypuścił Qwen-AgentWorld jako "language world model" dla agentów, symulujący 7 środowisk wewnątrz jednego modelu (35B MoE, 256K kontekst). Równolegle OpenThoughts-Agent publikuje open-source'owy pipeline treningowy z 100K przykładów. Debata o pamięci agentów zaczyna traktować ją jak warstwę zarządzania danymi.

Qwen-AgentWorld to interesująca apuesta architektoniczna. Zamiast trenować agenta osobno od symulatora środowiska, Qwen twierdzi, że można to scalić w jeden model, który sam w sobie symuluje środowiska MCP, Search, Terminal, SWE, Web, OS i Android. Wynik: single-turn environment prediction transferuje się na multi-turn agent tasks z zyskami zarówno in-domain jak i out-of-domain. Model jest otwarty - Qwen-AgentWorld-35B-A3B z 3B aktywnych parametrów.

OpenThoughts-Agent robi coś innego, ale równie wartościowego. To 100K-przykładowy dataset treningowy z ponad 100 kontrolowanymi ablacjami. Fine-tuning Qwen3-32B daje 44.8% średniej dokładności na 7 agentic benchmarkach. Kluczowe obserwacje praktyczne: wybór instrukcji ma nieproporcjonalny wpływ, najlepszy teacher na benchmarku nie jest najlepszym teacherm ogólnie, dłuższe execution traces pomagają, a diversity źródeł bije repetycję przy skalowaniu.

Ale najbardziej żywa dyskusja dotyczyła pamięci. Weaviate wypuścił Engram GA, który traktuje pamięć jako infrastrukturę asynchroniczną - ekstrahuje, deduplikuje, reconcyluje i scopuje wspomnienia zamiast wrzucać wszystko do kontekstu. @hwchase17 pokazał workflow LangSmith/Context Hub dla "sleep-time compute" - analiza traces offline i zapisywanie wyników z powrotem jako pamięć. @dair_ai zwrócił uwagę na paper argumentujący, że pamięć agenta powinna być oceniana jak pełna warstwa zarządzania danymi: storage, retrieval, update, consolidation, lifecycle.

**Key takeaways:**
- Qwen-AgentWorld-35B-A3B: 7 środowisk w jednym modelu, 256K kontekst, open-source
- OpenThoughts-Agent: 100K training set, 100+ ablacji, 44.8% na 7 agentic benchmarkach
- Engram GA (Weaviate): pamięć jako asynchroniczna infrastruktura z deduplication i scoping
- Sleep-time compute: przetwarzanie traces offline i aktualizacja pamięci pomiędzy sesjami

**Why do I care:** Pamięć to nadal nierozwiązany problem w agentach i dobrze, że wreszcie podchodzi się do niej poważnie jako do warstwy systemowej. "Wrzucić wszystko do kontekstu" to nie jest architektura - to chwilowe obejście. Kiedy agenci będą obsługiwać miesiące pracy organizacyjnej, potrzebujemy czegoś co naprawdę deduplikuje, reconcyluje i zarządza cyklem życia wiedzy. Engram i sleep-time compute to pierwsze próby naprawdę traktowania tego problemu poważnie.

**Link:** [Qwen-AgentWorld na Hugging Face](https://huggingface.co/Qwen)

---

## GLM-5.2 i chińskie modele open-source zamykają lukę

**TLDR:** GLM-5.2 jest teraz najsilniejszym otwartym modelem w wielu rankingach - prowadzi na Artificial Analysis, Agent Arena i Code Arena Frontend. @nutlope porównał go z Opus 4.8 na web tasks: podobna jakość, 2x więcej tokenów w output, szybszy i ~3x tańszy. Moonshot Kimi API trafia na AWS Marketplace, a Huawei podobno pokazuje klaster 950 SuperPOD.

Rozmowa o otwartych modelach w ostatnich tygodniach coraz częściej kręci się wokół chińskich projektów. GLM-5.2 pojawia się w benchmarkach obok zachodnich frontierów i nie wypada blado. @fchollet określił wynik GLM-5.2 na ARC-AGI-2 (22.8%) jako najsilniejszy dotychczasowy wynik open-source'owego modelu - choć debata o tym, co ten wynik faktycznie oznacza, trwa.

Kimi API na AWS Marketplace to interesujący ruch komercyjny. Enterprise procurement przez consolidated billing i EDP drawdown to coś, czego brakowało przy bezpośrednim dostępie. To odróżnia dojrzały produkt od projektu badawczego.

Na poziomie infrastruktury: @teortaxesTex raportuje, że Huawei może demonstrować system klasy 950 SuperPOD z własnymi NPU. Jeśli prawda, to oznacza, że chińska produkcja własnego sprzętu AI wchodzi w fazę dużej skali. To materialna zmiana w ekonomice i resilience chińskiego ekosystemu model-serving, niezależnie od zachodnich sankcji.

**Key takeaways:**
- GLM-5.2: prowadzi w otwartych rankingach, porównywalne z Opus 4.8 przy ~3x niższych kosztach
- ARC-AGI-2: 22.8% to najlepszy wynik open-source do tej pory
- Kimi API na AWS Marketplace z consolidated billing
- Huawei podobno demonstruje 950 SuperPOD z własnymi NPU

**Why do I care:** Luka między zachodnimi frontierami a chińskimi open-source'owymi modelami zamyka się szybciej niż większość się spodziewa. GLM-5.2 jest teraz "w pokoju" przy rozmowach o coding, agents i knowledge work - i jest znacznie tańszy. Dla developera w Polsce, który decyduje o tym którego modelu używa w produkcji, stosunek jakości do ceny ma duże znaczenie. GLM-5.2 zaczyna tę kalkulację komplikować.

**Link:** [GLM-5.2 na Hugging Face](https://huggingface.co/THUDM/GLM-4)

---

## Polityka, talenty i geopolityka AI: eksport controls, distylacja i nowe laboratoria

**TLDR:** Pierwsze poważne wyzwanie prawne dla Trump-era AI export controls. Anthropic oskarżył operatorów powiązanych z Alibaba o użycie ~25 tys. fałszywych kont i 28.8 mln wymian z Claude do destylacji możliwości frontierowych do modeli klasy Qwen. W UK nowe laboratoria BOLD i SOFAIR dostają 60 mln funtów seed funding.

Sprawa Legion vs. kontrole eksportowe to interesujący test prawny: czy dostęp do hosted modelu jest równoznaczny z eksportem wag lub danych technicznych? Argument "nie eksportujesz modelu, tylko korzystasz z API" ma swoją logikę, ale regulatorzy od dawna szukają sposobów, by tej linii nie uznać.

Oskarżenie Anthropic o adversarial distillation przez operatorów powiązanych z Alibaba to poważna sprawa. 25 tys. fałszywych kont i 28.8 miliona wymian to skalowana, przemyślana operacja - nie przypadkowe naruszenie ToS. Jeśli to potwierdzone, dyskusja o "distylacji" przestaje być akademicka i staje się kwestią enforcement i statecraft.

Nowe laboratorium Mirendil AI zebrało 200 mln dolarów seed z tezą o self-accelerating AI R&D dla nauki. W UK rząd finasuje BOLD Lab i SOFAIR - 60 mln funtów seed na dwa nowe narodowe laboratoria fundamentalnego AI, z fuzją UCL DARK z BOLD. Jednocześnie Bloomberg raportuje odpływ talentów z Google DeepMind do Anthropic.

**Key takeaways:**
- Pierwsze wyzwanie prawne dla export controls: czy API access = eksport modelu?
- Anthropic vs. Alibaba-linked operators: 25K fałszywych kont, 28.8M wymian do distylacji
- Mirendil AI: $200M seed na self-accelerating AI R&D for science
- UK: BOLD Lab i SOFAIR - 60 mln funtów seed, UCL DARK łączy się z BOLD
- Odpływ talentów z Google DeepMind do Anthropic

**Why do I care:** Adversarial distillation to problem, który będzie narastał. Jeśli frontier capabilities można "wykraść" przez skalowane API calls, to model biznesowy firm AI staje pod znakiem zapytania. A implikacje geopolityczne są jasne: jeśli eksport controls obejmą dostęp do API, to zmieni warunki gry dla developerów na całym świecie - w tym w Polsce.

**Link:** [AINews na Latent Space](https://www.latent.space/p/ainews-its-meta-harness-summer)
