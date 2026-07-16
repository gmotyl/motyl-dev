---
title: "Inkling od Thinking Machines Lab: najlepszy amerykański model open-weights w historii"
excerpt: "Thinking Machines Lab wypuściła Inkling — model MoE o 975 miliardach parametrów z licencją Apache 2.0, multimodalny i open-weights, który według ekspertów ustanawia nowy standard dla amerykańskich modeli open-source."
publishedAt: "2026-07-16"
slug: "inkling-thinking-machines-lab-open-weights-975b-moe"
hashtags: "#ai #llm #openweights #moe #multimodal #inkling #thinkingmachines #AINews #generated #pl"
source_pattern: "AINews"
---

## Inkling: 975B MoE od Thinking Machines Lab debiutuje jako nowy lider wśród amerykańskich modeli open-source

**TLDR:** Thinking Machines Lab (TML) wypuściła Inkling, model Mixture-of-Experts z 975 miliardami parametrów (41B aktywnych), trenowany od zera na 45 bilionach tokenów tekstu, obrazów, audio i wideo. Licencja Apache 2.0, kontekst do 1M tokenów, wsparcie dla wiodących frameworków inferecji od pierwszego dnia.

**Summary:** Thinking Machines Lab to startup założony przez weteranów OpenAI — między innymi Mirę Murati i Johna Schulmana — i przez długi czas operował w trybie stealth. Inkling to ich pierwsze publiczne wydanie modelu, wyczekiwane przez społeczność od miesięcy. Nie jest to model nastawiony wyłącznie na maksymalizację wyników benchmarkowych. TML wprost komunikuje, że celem jest stworzenie solidnej, szerokopasmowej bazy, którą można dostosowywać i dalej trenować, zamiast wypychania liczb na tabelach porównawczych.

Architektura modelu przyciągnęła niemałą uwagę ze strony badaczy. Inkling nie używa RoPE (Rotary Positional Encoding), lecz relative positional bias, co przy tej skali to rzadkość. Oprócz tego model zawiera krótkie warstwy splotowe (short convolution) wplatane wokół bloków attention i FFN, podejście MoE z dwoma shared expert sinks (zamiast jednego, jak w większości nowszych modeli) oraz 8 głowic MTP dla speculative decoding. Aaron Defazio potwierdził, że TML używa jego wariantu poprawionego weight decay, który sam ochrzcił MuonC/AdamC. To wszystko wskazuje, że lab nie boi się podejmować niestandardowych decyzji architektonicznych na dużą skalę.

Wsparcie ekosystemu od dnia zerowego zrobiło wrażenie. vLLM, SGLang, Modal, Baseten, Databricks i Hugging Face były gotowe w chwili ogłoszenia. vLLM raportuje do 380 tokenów/s/użytkownika na 4× GB200 z MTP. Modal wdrożył własny spekulatywny dekodar DFlash, który według Soumitha Chintali bije zwykłe MTP pod względem szybkości. Unsloth wypuścił kwantyzacje 1-bit GGUF redukujące rozmiar o 86% (z 1.9TB do 270GB) przy zachowaniu 74.2% dokładności top-1%. Pretraining zaczął się zimą, a od połowy stycznia mały zespół budował na tym stack do kodowania, reasoningu i zadań agentowych.

Wyniki plasują Inkling jako najsilniejszy ameryk ański model open-weights. Artificial Analysis daje mu 41 punktów w Intelligence Index, co stawia go powyżej Nemotron 3 Ultra (38), Gemma 4 31B (29) i gpt-oss-120b (24). W Design Arena Inkling wszedł na 9. miejsce w Agentic Web App Arena z Elo 1257, w tej samej strefie co Claude Opus 4.6 i Gemini 3.5 Flash. Ale obraz nie jest jednorodny: na niektórych benchmarkach agentowych GLM-5.2 i Kimi K2.6 wciąż są z przodu. Krytycy takie jak Scaling01 twierdzą, że Inkling to w praktyce "kolejny Kimi K2.6" i spekulują, że premiera mogła być przyspieszona w anticipation na nowe chińskie wydania.

Warto też odnotować dyskusję wokół kwestii dystylacji. Wczesne tweety chwaliły Inkling jako "jedyny model open-weights nietrenowany na distillation z zamkniętych modeli." Potem okazało się, że pewne ślady SFT z Kimi 2.5 jednak się pojawiają, a Andrew Carr potwierdził użycie danych z Kimi. TML nie promuje tej narracji aktywnie, ale hype stworzony przez społeczność zdążył ją podchwycić przed korektą.

**Key takeaways:**
- Inkling to 975B/41B active MoE, Apache 2.0, multimodalny (tekst, obraz, audio), kontekst 1M tokenów na open-weights i 256K przez Tinker API
- Architektura zawiera niestandardowe wybory: relative positional bias zamiast RoPE, large-scale short convolutions, 8 głowic MTP i MuonC/AdamC optimizer
- Wsparcie frameworków inferecji (vLLM, SGLang, Modal) było dostępne od dnia premiery z konkretnymi optymalizacjami kernelowymi
- Inkling jest nowym liderem wśród amerykańskich modeli open-source, ale część chińskich modeli open-weights i wiodące modele zamknięte wciąż są mocniejsze na wybranych benchmarkach
- Strategia TML to "solidna baza + ekosystem dostosowania" przez Tinker, nie wyścig o miejsce na Chatbot Arenie

**Why do I care:** Z perspektywy architekta budującego systemy oparte na LLM, Inkling jest interesujący przede wszystkim z jednego powodu: Apache 2.0 przy tej jakości modelu to poważna zmiana dla europejskich firm, które mają ograniczenia co do danych wychodzących do zamkniętych API. 975B MoE z 41B aktywnymi parametrami to coś, co można uruchomić na własnej infrastrukturze bez licencyjnych niespodzianek. Controllable reasoning i silne tool-calling to cechy, które bezpośrednio przekładają się na systemy agentowe — nie musisz walczyć z modelem, żeby trzymał format narzędzi. Cieszy mnie też podejście TML do komunikacji: transparentny ton, przyznanie się do ograniczeń, szczegółowa dokumentacja techniczna. To sygnał, że lab traktuje deweloperów poważnie, a nie tylko goni za rankingami. Backendy inferecji rozwijają się w tempie, który rok temu byłby nie do pomyślenia: day-0 support dla modelu tej architektury z optymalizacjami kernelowymi wskazuje, że ekosystem open-weights dojrzewa szybciej niż zakładano.

**Link:** [[AINews] Thinky's Inkling: 975B-A41B multimodal, new best American Apache 2.0 open model](https://www.latent.space/p/ainews-thinkys-inkling-975b-a41b?publication_id=1084089&post_id=207247810&isFreemail=true&triedRedirect=true)
