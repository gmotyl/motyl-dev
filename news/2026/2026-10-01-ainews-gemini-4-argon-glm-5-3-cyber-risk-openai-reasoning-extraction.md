---
title: "Gemini 4 Argon wraca do czołówki, GLM-5.3 przekracza próg cyberbezpieczeństwa, a OpenAI oskarża Moonshot o kradzież rozumowania"
excerpt: "Google wraca do gry modelem, który wygrywa 13 z 19 benchmarków, ale dostępnym na razie tylko rządom i zaufanym testerom, podczas gdy Anthropic ostrzega przed otwartym GLM-5.3 jako realnym narzędziem cyberofensywnym."
publishedAt: "2026-10-01"
slug: "ainews-gemini-4-argon-glm-5-3-cyber-risk-openai-reasoning-extraction"
hashtags: "#ai #llm #gemini #security #generated #pl"
source_pattern: "AINews"
---

## Gemini 4 Argon: Google wraca do czołówki, ale na razie tylko dla rządu i cyberobrońców

**TLDR:** Google DeepMind wypuścił Gemini 4 Argon, pierwszy od lutego model większy niż Flash, z wynikiem SOTA na 13 z 19 wiarygodnych benchmarków i przełomowym limitem miliona tokenów wyjścia, ale dostęp na start mają tylko użytkownicy rządowi i zaufani obrońcy cybernetyczni w programie Fairwind.

**Streszczenie:** Po serii przyrostowych wersji Flash i dużej przetasowaniu w zarządzie GDM, największym pytaniem było, kiedy Google dogoni konkurencję, która w międzyczasie wypuściła modele klasy Fable i Astra. Argon wprowadza eksperymentalny Long Decode Continuation, funkcję API, która pozwala wstrzymać długą odpowiedź i wznowić ją w kolejnych wywołaniach, co w praktyce daje limit wyjścia do miliona tokenów, pierwszy taki w branży (dla porównania: Vals mierzy realnie 262 tysiące tokenów maksymalnego wyjścia). Standardowa cena to 4 i 20 dolarów za milion tokenów wejścia i wyjścia, z wprowadzającą 50-procentową zniżką bez zapowiedzianej daty końca, a cache'owany input ma 95-procentową zniżkę.

Wyniki są mocne, ale nie bezdyskusyjne. Argon wygrywa 13 z 19 opublikowanych benchmarków przeciwko GPT-6 Astra i Claude Opus 5.5, osiągając 77,9% na DeepSWE wobec 74,2% dla Opus 5.5 i 74,1% dla Astry, i zajmuje pierwsze miejsce zarówno w Text Arena, jak i na indeksie Vals (68,9%). Wewnętrznie Google twierdzi, że agenty na Argonie uwolniły ponad 300 TiB pamięci data center i migrują ponad 800 tysięcy linii kodu jądra C/C++ do Rusta, zastępując 32 tysiące linii kodu SIMD bezpiecznym Rustem i przyspieszając istniejący port Rusta 2,7-krotnie przy identycznym wyjściu. Krytycy zwracają jednak uwagę na rozbieżności: na benchmarku prawniczym Harveya Argon zgłasza 19,6%, podczas gdy Muse Spark 1.2 deklaruje 25,42%, a część komentatorów podejrzewa optymalizację pod preferencje oceniających (benchmaxxing) zamiast realnej poprawy jakości.

Równolegle OpenAI ogłosiło GPT-6.1 Sol, nowy lider MathAreny, kosztujący według Artificial Analysis 0,72 dolara za zadanie przy maksymalnym wysiłku, wobec 3,26 dolara dla Astry i 1,04 dolara dla GPT-6 Sol, głównie dzięki mniejszej liczbie tur i tańszemu odczytowi z cache. OpenAI poprawiło też błąd kodowania obrazów w GPT-6 Luna (plus jeden punkt Intelligence Index) i chwali się prędkością do 300 tokenów na sekundę, choć SemiAnalysis zauważa, że to działa na GPU Nvidii przy niskich batch size'ach, nie na Cerebrasie, a realne zyski prędkości w zadaniach agentowych end-to-end to 2-4x, nie 8x, bo latencja narzędzi wciąż dominuje całość.

**Kluczowe wnioski:**
- Gemini 4 Argon wygrywa 13 z 19 benchmarków przeciwko GPT-6 Astra i Claude Opus 5.5, ale na start jest dostępny tylko rządom i zaufanym obrońcom cybernetycznym w programie Fairwind.
- Long Decode Continuation daje do miliona tokenów wyjścia jako pierwszy taki limit w branży, choć niezależne pomiary (Vals) notują realnie 262 tysiące.
- Krytycy wskazują rozbieżności w wynikach Argona (19,6% na benchmarku prawniczym Harveya wobec 25,42% deklarowanych przez Muse Spark 1.2) i podejrzewają optymalizację pod oceniających.
- GPT-6.1 Sol kosztuje 0,72 dolara za zadanie przy maksymalnym wysiłku wobec 3,26 dolara dla Astry, głównie dzięki mniejszej liczbie tur i tańszemu cache.

**Dlaczego mi na tym zależy:** Ograniczony dostęp na start (rząd i cyberobrona, nie deweloperzy) to sygnał, że Google traktuje Argona jako model na tyle zdolny ofensywnie w cyberbezpieczeństwie, że chce go najpierw przetestować w kontrolowanych rękach. Dla zespołów wybierających model do produkcji ważniejszy jest w tej chwili GPT-6.1 Sol: realna przewaga kosztowa przy porównywalnej jakości to więcej niż punkt procentowy wyżej na jednym benchmarku.

**Link:** [Gemini 4 Argon: GDM's answer to Astra/Fable, with 1M output](https://www.latent.space/p/ainews-gemini-4-argon-gdms-answer)

## GLM-5.3 przekracza próg autonomicznych zdolności cyberofensywnych, ostrzega Anthropic

**TLDR:** Anthropic opublikował analizę pokazującą, że otwarty, tani i słabo zabezpieczony przed jailbreakami model GLM-5.3 od Zhipu/Z.ai zbliża się do granicznych zdolności cyberofensywnych, z 50 na 410 kompletnych exploitów end-to-end na ExploitBench, blisko wyniku 56/410 wewnętrznego modelu Claude Mythos Preview, a społeczność open-source odpowiada mieszanymi reakcjami.

**Streszczenie:** Anthropic ramuje ryzyko jako iloczyn zdolności i dostępności: GLM-5.3 jest szeroko dostępny do pobrania, relatywnie tani i słabo dostrojony pod kątem odmowy wykonania szkodliwych poleceń, a proste jailbreaki podobno działają w 64-100% przypadków, przy czym "abliteracja" (technika usuwająca mechanizm odmowy z wag modelu) zbija odsetek odmów do pojedynczych procent przy niewielkiej mierzonej utracie zdolności. Model osiąga też pełne przejęcie kontroli przepływu na 4% wewnętrznych zadań Anthropic z zakresu binary exploitation, gdzie wcześniejsze modele notowały wyniki bliskie zeru.

Reakcja społeczności na Reddicie była w dużej mierze wroga wobec ramowania Anthropic, z zarzutami, że to próba stłumienia tańszego, otwartego chińskiego modelu zbliżającego się do czołówki. Jeden z komentujących podkreślił legalne zastosowania obronne, nazywając GLM-5.3 swoim jedynym praktycznym narzędziem do testów bezpieczeństwa i poprawy własnego oprogramowania, a inny przywołał wcześniejszą wersję GLM-5.2 jako pomocną przy łagodzeniu ataku na Hugging Face, w kontraście do rzekomej odmowy pomocy przez Claude'a w podobnej sytuacji. Równolegle społeczność llama.cpp zmaga się z dodaniem wsparcia dla GLM-5.3-Flash (320-miliardowy model hybrydowy tekst plus wizja), co wymaga bespoke loadera z nowymi mechanizmami DSA indexing, hybrydową pamięcią indeksowaną i ścieżką preprocessing wizji glm5v, przy czym komentatorzy zauważają niespójność nazewnictwa architektury między kwantyzacjami Unsloth (`glm5next`) a mainline (`glm5-next`), która może uniemożliwić załadowanie istniejących kwantów bez konwersji.

**Kluczowe wnioski:**
- GLM-5.3 osiąga 50/410 kompletnych exploitów end-to-end na ExploitBench, blisko wyniku 56/410 wewnętrznego Claude Mythos Preview.
- Proste jailbreaki na GLM-5.3 podobno działają w 64-100% przypadków, a "abliteracja" zbija odmowy do pojedynczych procent przy niewielkiej utracie zdolności.
- Część społeczności broni modelu jako jedynego praktycznego narzędzia do legalnych testów bezpieczeństwa, kontrastując to z rzekomą nadmierną ostrożnością Claude'a.
- Wsparcie GLM-5.3-Flash w llama.cpp jest opóźnione z powodu niespójności nazewnictwa architektury między kwantyzacjami Unsloth a mainline.

**Dlaczego mi na tym zależy:** To konkretny przykład napięcia, które będzie się powtarzać coraz częściej: model wystarczająco otwarty i tani, żeby był realnie użyteczny defensywnie, jest siłą rzeczy też dostępny ofensywnie, i nie ma oczywistego sposobu rozdzielenia tych dwóch zastosowań na poziomie samego modelu. Jeśli twoja firma rozważa lokalne, otwarte modele do zadań związanych z bezpieczeństwem, warto śledzić tę dyskusję, bo regulacje i polityki dostawców chmurowych wobec takich modeli mogą się zmienić szybko.

**Link:** [GLM-5.3 and the Spread of Advanced Cyber Capabilities](https://www.latent.space/p/ainews-gemini-4-argon-gdms-answer)
