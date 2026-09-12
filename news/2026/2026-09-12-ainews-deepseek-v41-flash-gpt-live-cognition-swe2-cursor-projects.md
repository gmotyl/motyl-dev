---
title: "AINews: DeepSeek V4.1-Flash wraca z nową architekturą, OpenAI uruchamia głos w API, a Cursor dostaje trwałe projekty"
excerpt: "DeepSeek zaskakuje nową architekturą kodera-dekodera w 'małej' aktualizacji V4.1-Flash, OpenAI wypuszcza pełnodupleksowy głos GPT-Live-1 i publiczne beta Agents API, Cognition wydaje SWE-2, a Cursor wprowadza trwałe wątki projektowe z współdzieloną pamięcią agentów."
publishedAt: "2026-09-12"
slug: "ainews-deepseek-v41-flash-gpt-live-cognition-swe2-cursor-projects"
hashtags: "#AINews #ai #llm #agents #deepseek #openai #generated #pl"
source_pattern: "AINews"
---

## DeepSeek V4.1-Flash: nowa architektura kodera-dekodera w przebraniu małej aktualizacji

**TLDR:** DeepSeek nazwał to "V4.1-Flash", ale pod maską kryje się zupełnie nowa architektura przyczynowego kodera-dekodera, z rozdzieleniem 8B parametrów aktywnych przy prefillu i 16B przy dekodowaniu. Sebastian Raschka twierdzi, że powinni to byli nazwać V5.

**Summary:** Po roku, w którym DeepSeek pozwolił GLM-owi i Kimi przejąć inicjatywę na rynku modeli otwartych, firma wraca z modelem, który na pierwszy rzut oka wygląda jak kosmetyczna aktualizacja, a w rzeczywistości retiruje V4 Pro i stawia wszystko na zupełnie nowy szkielet. Kluczowa nowość to asymetryczna architektura koder-dekoder: 8 miliardów parametrów aktywnych obsługuje wejście (prefill), a 16 miliardów wyjście (dekodowanie), przy 763 miliardach parametrów całkowitych. Ta asymetria w połączeniu z nowymi sztuczkami w rodzaju Sliding-Window Attention Bounded Replay daje footprint KV cache nawet ośmiokrotnie mniejszy niż w poprzedniej generacji Flash, co bezpośrednio przekłada się na koszt i szybkość długo działających agentów.

Niezależne benchmarki potwierdzają, że model jest tani i skuteczny jednocześnie: Artificial Analysis umieszcza go tuż poniżej GLM-5.3-Flash w swoim indeksie inteligencji, ale przy cenie 0,30 dolara za milion tokenów wejściowych i 1,20 dolara za wyjściowe. Vals Index stawia go na pierwszym miejscu wśród modeli otwartych po koszcie 0,30 dolara za test. Cena okupiona jest jednak gadatliwością: model zużywa średnio 89 tysięcy tokenów na zadanie w Intelligence Index, czyli więcej niż GLM-5.3, Fable 5.1 czy nawet Claude Opus 5. Społeczność inżynierska szybko odkryła też, że dzięki agresywnej kompresji KV cache model daje się uruchomić lokalnie przy pełnej precyzji na czterech kartach z zaledwie 64 GB RAM systemowego, odciążając 200 GB tablicy Engram/hash na dysk NVMe, co dla wielu było większą sensacją niż same liczby benchmarków.

**Key takeaways:**
- Nowa architektura koder-dekoder z asymetrią 8B (prefill) / 16B (dekodowanie) i 763B parametrów całkowitych.
- Redukcja KV cache do 890 bajtów na token pozwala odciążyć duże modele na SSD i uruchamiać je lokalnie na sprzęcie konsumenckim.
- DeepSeek soft-retiruje V4 Pro: ruch tego modelu automatycznie trafia na tańszy V4.1-Flash, bo Pro nie uzasadniał już swojego kosztu obliczeniowego.

**Why do I care:** To kolejny dowód, że w 2026 roku przewaga konkurencyjna modeli coraz częściej rozgrywa się nie na surowej jakości, tylko na servability, czyli jak tanio i jak blisko urządzenia da się je uruchomić przy zachowanej jakości. Dla architektów systemów agentowych redukcja KV cache jest ważniejsza niż punkt więcej na benchmarku, bo to ona decyduje, czy długo działający agent zmieści się w budżecie.

**Link:** [DeepSeek v4.1-Flash: 763B-P8B-D16B novel causal Encoder–Decoder architecture with vision marks the Return of the Whale](https://www.latent.space/p/ainews-deepseek-v41-flash-763b-p8b)

## OpenAI stawia na głos w czasie rzeczywistym i hostowane środowiska agentowe

**TLDR:** OpenAI wprowadziło do API model GPT-Live-1, pełnodupleksowy interfejs głosowy, który słucha podczas mówienia i deleguje rozumowanie do modelu zaplecza, razem z publiczną wersją beta Agents API opartą na harnessie Codex i hostowanymi sandboxami do wykonywania kodu.

**Summary:** GPT-Live-1 pozycjonowany jest jako warstwa głosowa, którą deweloperzy mogą kontrolować pod kątem tonu, tempa, ekspresji, długości odpowiedzi i języka, a model backendowy (np. GPT-6 Astra) przejmuje właściwe rozumowanie. Własne benchmarki OpenAI mówią o 83,6% skuteczności przy pierwszej próbie na Tau3, 97,3% na Artificial Analysis Conversational Dynamics i czasie odpowiedzi rzędu 0,8 sekundy na Full Duplex Bench. Wokół modelu od razu pojawiła się integracja partnerów (LiveKit, HeyGen, Telnyx, Speak i Devin Voice od Cognition), co sugeruje, że GPT-Live-1 może stać się domyślnym fundamentem produkcyjnych agentów głosowych szybciej, niż zrobił to wcześniejszy stack realtime.

Równolegle OpenAI ogłosiło Data agenta w ChatGPT Work, obiecującego dashboardy i akcje na danych firmowych połączonych z produktem, a Box zapowiedziało integrację pozycjonowaną jako "system plików dla AI". Razem z podobnym ruchem Google w stronę dokumentów dla agentów i nowymi trwałymi workspace'ami w Cursorze, trend jest wyraźny: branża przechodzi od bezstanowych endpointów modelu do stanowych, świadomych organizacji środowisk agentowych.

**Key takeaways:**
- GPT-Live-1 to pełnodupleksowy model głosowy w API, delegujący rozumowanie do modelu zaplecza (np. GPT-6 Astra).
- Publiczna beta Agents API z harnessem Codex i hostowanymi sandboxami zbiera model, runtime i środowisko wykonawcze w jedną powierzchnię.
- Integracje partnerskie (LiveKit, HeyGen, Cognition) pojawiły się natychmiast po starcie, przyspieszając adopcję w produkcyjnych agentach głosowych.

**Why do I care:** Konsolidacja modelu, runtime'u i sandboxa w jeden hostowany produkt to coś, co bezpośrednio wpływa na decyzje "build vs. buy" w zespołach budujących własnych agentów głosowych. Jeśli OpenAI oferuje to gotowe i dobrze zintegrowane z partnerami, coraz trudniej uzasadnić budowanie własnego stacku realtime od zera.

**Link:** [DeepSeek v4.1-Flash: 763B-P8B-D16B novel causal Encoder–Decoder architecture with vision marks the Return of the Whale](https://www.latent.space/p/ainews-deepseek-v41-flash-763b-p8b)

## Cognition wydaje SWE-2, Cursor wprowadza trwałe projekty agentowe

**TLDR:** Cognition wypuściło SWE-2, opisywane jako "najbliższy frontierowi model", z parytetem na czołowych benchmarkach kodowania przy nawet 70% niższym koszcie, a Cursor wprowadził "Projects", trwałe wątki z agentem-koordynatorem i współdzieloną pamięcią między subagentami.

**Summary:** SWE-2 od Cognition powstał w całości na wewnętrznej infrastrukturze (algorytm, infra i dane budowane in-house), a trening RL przeskalowano do wielu bilionów parametrów. Jedna z ciekawszych technicznych uwag dotyczy prostej kary liniowej za długość odpowiedzi, która zachowała kształt krzywej Pareto training-time na różnych poziomach wysiłku obliczeniowego, drobny, ale praktyczny trik do zarządzania kosztem inferencji bez utraty jakości. Cognition rozszerza też stack Devin o warstwę głosową opartą na GPT-Live (Devin Voice) i przyjmuje do zespołu Dioxus Labs, który ma pracować nad VM Devina, computer use i testowaniem, kontynuując wsparcie dla Dioxusa i pokrewnych projektów Rust.

Cursor idzie w podobnym kierunku od strony IDE: nowa funkcja "Projects" wprowadza trwałe wątki z agentem-koordynatorem, współdzieloną pamięcią i artefaktami między agentami, synchronizowane między urządzeniami użytkownika. To odejście od modelu "jeden czat na jedno zadanie" na rzecz długo żyjącego środowiska projektowego, w którym subagenci gromadzą stan w czasie. Razem z nowymi panelami sesji w Claude Code, rynek zbiega do tego samego wniosku: agenci kodujący potrzebują trwałego kontekstu, możliwych do zbadania sesji i jawnych mechanizmów orkiestracji, a nie tylko lepszych podpowiedzi.

**Key takeaways:**
- SWE-2 od Cognition twierdzi parytet z czołowymi modelami kodującymi przy nawet 70% niższym koszcie, trenowany w całości na własnej infrastrukturze.
- Prosta liniowa kara za długość odpowiedzi zachowała kształt krzywej Pareto na różnych poziomach wysiłku treningowego.
- Cursor "Projects" i Devin Voice to część szerszego trendu: agenci kodujący przechodzą z pojedynczych czatów na trwałe, stanowe środowiska projektowe.

**Why do I care:** Przejście od "jednego czatu na zadanie" do trwałych projektów z pamięcią między agentami to zmiana, którą warto śledzić przy wyborze narzędzi dla zespołu. Jeśli Cursor i Claude Code zbiegają do tego samego wzorca niezależnie od siebie, prawdopodobnie oznacza to, że stanowe środowiska agentowe staną się standardem szybciej, niż większość zespołów zdąży zaktualizować swój workflow.

**Link:** [DeepSeek v4.1-Flash: 763B-P8B-D16B novel causal Encoder–Decoder architecture with vision marks the Return of the Whale](https://www.latent.space/p/ainews-deepseek-v41-flash-763b-p8b)

## Harness jako cel optymalizacji: badania nad agentami długoterminowymi

**TLDR:** Kilka nowych prac badawczych zgodnie punktuje ten sam temat: to harness (rusztowanie narzędzi i procesu wokół modelu), a nie sam model, staje się głównym celem optymalizacji w treningu agentów długoterminowych.

**Summary:** Praca Salesforce pokazuje coś nieintuicyjnego: trenowanie słabszego modelu na pełnych trajektoriach silniejszego eksperta może pogorszyć wyniki o 4-30 punktów po ewolucji harnessu, bo dostrojony model przejmuje niekompatybilny styl planowania. Proponowana poprawka, czyli przepisywanie tylko nieudanego kroku we własnym rollout słabszego modelu, zachowuje dopasowanie modelu do harnessu zamiast je psuć. Równolegle HarnessDev od ByteDance opisuje agentów budujących i iteracyjnie poprawiających własne, uruchamialne harnesse, choć generalizacja jest mieszana: tylko 34 z 64 zmian przeniosło się kierunkowo na zadania odłożone na bok do testów.

Inne prace atakują problem długiego horyzontu wprost: Qwen zaprezentował Elastic Horizon, kontroler w pętli zamkniętej śledzący 90-ty percentyl długości udanych trajektorii, żeby dynamicznie dostrajać maksymalny horyzont interakcji, poprawiając skuteczność przy oszczędności do 25% tokenów trajektorii. PARSER zastępuje sekwencyjne czytanie fragmentów równoległymi, zamrożonymi subagentami plus jednym agentem-liderem trenowanym przez RL nad iteracyjnymi rundami scatter-gather, raportując +12 punktów przy kontekście 896K i nawet 11-krotnie niższą latencję. Całość sugeruje przesunięcie pola badawczego od "promptuj mocniej" w stronę zamkniętej pętli optymalizacji rusztowań, budżetów trajektorii, dokumentów umiejętności i śladów użycia narzędzi.

**Key takeaways:**
- Trenowanie słabszego modelu na pełnych trajektoriach silniejszego eksperta może pogorszyć wyniki: lepiej przepisywać tylko nieudany krok we własnym rollout modelu.
- Elastic Horizon od Qwen dynamicznie dostraja maksymalny horyzont interakcji na podstawie 90. percentyla udanych trajektorii, oszczędzając do 25% tokenów.
- PARSER zamienia sekwencyjne czytanie długiego kontekstu na równoległe subagenty plus agenta-lidera, dając nawet 11x niższą latencję.

**Why do I care:** Dla każdego, kto projektuje własne pipeline'y agentowe, to sygnał, żeby przestać traktować harness (system promptów, narzędzi, budżetów tokenowych) jako stały element infrastruktury i zacząć go traktować jako coś, co trzeba iterować i mierzyć tak samo rygorystycznie jak sam model, bo jak pokazuje badanie Salesforce, niedopasowanie modelu do harnessu potrafi zjeść więcej jakości niż zmiana samego modelu.

**Link:** [DeepSeek v4.1-Flash: 763B-P8B-D16B novel causal Encoder–Decoder architecture with vision marks the Return of the Whale](https://www.latent.space/p/ainews-deepseek-v41-flash-763b-p8b)
