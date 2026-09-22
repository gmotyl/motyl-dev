---
title: "AINews: Xiaomi wchodzi do gry modelem MiMo-V2.6-Pro, a wąskie modele decyzyjne w stylu Jev zmieniają architekturę agentów"
excerpt: "Xiaomi wypuszcza otwarty, natywnie omnimodalny model MiMo-V2.6-Pro trenowany w dużej mierze dzięki nowej architekturze RL, a społeczność AI zaczyna traktować szybkie, wąskie modele decyzyjne jako osobną warstwę architektury obok dużych modeli językowych."
publishedAt: "2026-09-22"
slug: "ainews-xiaomi-mimo-v26-jev-decyzyjne-modele"
hashtags: "#ainews #ai #ml #architecture #agents #generated #pl"
source_pattern: "AINews"
---

## Xiaomi, dotąd kojarzone z telefonami, wypuszcza czołowy otwarty model

**TLDR:** Xiaomi, dotąd niezaliczane do grona sześciu chińskich „tygrysów AI", pokazało MiMo-V2.6-Pro, natywnie omnimodalny model, który według Artificial Analysis debiutuje jako najlepszy otwarty model na ich Intelligence Index, przy 1,02 biliona parametrów całkowitych i 42 miliardach aktywnych, na licencji MIT.

**Summary:** MiMo-V2.6 to rodzina trzech wariantów: Pro jako najbardziej zaawansowany, Flash jako kompromis między inteligencją, kosztem i szybkością, oraz Pro-UltraSpeed z podobno dwudziestokrotnie szybszym generowaniem przy tej samej jakości dla przypadków wymagających ekstremalnej szybkości. Cena, 0,435 dolara za milion tokenów wejściowych i 0,87 dolara za wyjściowe, plasuje go jako bardzo konkurencyjny kosztowo jak na model tej klasy. Xiaomi zwróciło na siebie uwagę już kilka dni wcześniej, kiedy Fuli Luo, była gwiazda inżynierska DeepSeek, zaczęła publikować na żywo finalne przebiegi treningu RL, pokazując nietypowo wysoki poziom przejrzystości wewnętrznych metryk.

Techniczny raport opisuje skalowanie mocy obliczeniowej RL na trzech osiach: większe batche i wyższą przepustowość (1568 próbek na aktualizację przy w pełni asynchronicznej architekturze i kontekście do miliona tokenów), więcej zadań i bogatsze środowiska (multi-task suite obejmujący kodowanie, ogólnych agentów, zadania wizualne i cybernetyczne), oraz więcej mocy obliczeniowej po stronie oceniającej, co daje bardziej precyzyjny i zróżnicowany sygnał nagrody przy zadaniach długoterminowych. Całe to tooling, wliczając środowiska treningowe, ma zostać open source, choć pełny zbiór ponad 7 tysięcy zadań jeszcze nie został udostępniony.

Reakcje społeczności skupiają się bardziej na infrastrukturze RL wokół modelu niż na samym modelu. Xiaomi ma udostępnić około 7 tysięcy środowisk RL generowanych z otwartych repozytoriów, z „agentami w pętli" dbającymi o odporność na oszukiwanie modelu podczas treningu. Padają liczby: 130 godzin, 75 miliardów tokenów i 2,6 miliona dolarów za sam przebieg RL, skalowany na JAX i TPU, gdzie zwiększanie skali ma być, według jednego z komentujących, „głównie zmianą konfiguracji, nie przepisywaniem kodu". Jeśli te liczby się potwierdzą, post-trening i RL stają się znacznie tańszą drogą do wyników zbliżonych do najlepszych modeli, niż dotąd zakładano.

**Key takeaways:**
- MiMo-V2.6-Pro debiutuje jako najlepszy otwarty model na Intelligence Index Artificial Analysis, 1,02 bln parametrów całkowitych / 42 mld aktywnych, licencja MIT
- Xiaomi zapowiada open source całego stosu RL, w tym docelowo około 7 tysięcy środowisk treningowych generowanych z otwartych repozytoriów
- Padające liczby (130 godzin, 75 mld tokenów, 2,6 mln dolarów za przebieg RL na JAX/TPU) sugerują, że post-trening RL może być znacznie tańszą drogą do wyników klasy frontier niż dotychczas zakładano

**Why do I care:** Tempo, w jakim chińskie laby wypuszczają otwarte modele klasy frontier, realnie zmienia kalkulację kosztową dla zespołów, które rozważają hosting własnego modelu zamiast płacenia za API zamkniętych dostawców. Jeśli architektura waszego produktu zakłada na stałe jednego dostawcę LLM, ten news jest kolejnym argumentem za budowaniem warstwy abstrakcji, która pozwoli przełączyć się na tańszy, otwarty model, gdy ekonomia się zmieni, a nie dopiero wtedy, gdy rachunek za API zacznie boleć.

**Link:** [AINews: Xiaomi MiMo-V2.6-Pro, the new top Open Weights model](https://www.latent.space/p/ainews-xiaomi-mimo-v26-pro-1t-a42b)

## Wąskie modele decyzyjne stają się osobną warstwą architektury agentów

**TLDR:** Model Jev od TypeSafe AI, opisywany jako klasyfikator zero-shot z inteligencją zbliżoną do modeli frontier, ale bez „myślenia" i przy pojedynczym tokenie odpowiedzi, zdominował dyskusje w tym tygodniu, a społeczność coraz wyraźniej mówi o wąskich modelach decyzyjnych jako osobnej kategorii obok dużych modeli generatywnych.

**Summary:** Andrej Karpathy określił tego typu modele jako punkt na froncie Pareto dla przypadków „brak myślenia, jeden token, akceptowalne niskie opóźnienie, wystarczająca inteligencja", a inni komentatorzy podkreślają, że to w praktyce klasyfikacja i routing, tylko z nowoczesną jakością modelu i dużo lepszym opóźnieniem i kosztem niż klasyczne podejścia. Ekosystem wokół Jev rozrósł się szybko: LangChain dodał Jev jako sędziego do LangSmith, powstało rozszerzenie do Chrome dobierające narzędzia WebMCP na bieżąco przy każdym naciśnięciu klawisza, a jeden z użytkowników opisał retagowanie około 2300 artykułów naukowych w 83 sekundy za 0,14 dolara, z 579 zmianami o wysokiej pewności zweryfikowanymi ręcznie.

Najbardziej trwały wniosek z tej dyskusji ma charakter architektoniczny, nie tylko kosztowy. Jeden z komentujących porównał pytanie frontierowego agenta do zarządzania ludźmi, a ręczne pisanie programów w modelu decyzyjnym do pisania w asemblerze: oba skrajne podejścia są użyteczne, ale zawodne, jeśli nadużywane. Kilka głosów wskazywało konkretne miejsca, gdzie takie wąskie modele sprawdzają się najlepiej: routing, bramki zatwierdzające, ocena śladów wykonania (trace scoring), wybór narzędzi, decyzje o dyskretnych dokumentach oraz tani nadzór wewnątrz większych pętli agentowych, zamiast pełnić rolę samodzielnego „inteligentnego agenta".

Ten wątek łączy się z szerszym tematem tygodnia, czyli bezpieczeństwem systemów agentowych z dostępem do komputera. Patrick Wardle opisał poważną lukę typu local-hijack w asystencie Muse, argumentując, że szeroki dostęp do systemu operacyjnego czyni takie narzędzia atrakcyjnym celem ataku, podczas gdy DeepLearningAI przedstawiło filozofię projektową Meta dla podobnych agentów: zakładać, że wstrzyknięcie promptu się wydarzy, trzymać prawdziwe dane uwierzytelniające z dala od modelu, izolować narzędzia w kontenerach i mieć niezależnego strażnika wywołań wychodzących.

**Key takeaways:**
- Jev i podobne wąskie modele decyzyjne zyskują status osobnej warstwy architektury agentów, obok dużych modeli generatywnych, dedykowanej routingowi, bramkom i klasyfikacji wysokowolumenowej
- Społeczność wskazuje konkretne zastosowania: routing, bramki zatwierdzające, ocena śladów wykonania, wybór narzędzi i tani nadzór wewnątrz pętli agentowych, nie samodzielne działanie jako pełny agent
- Bezpieczeństwo agentów z dostępem do systemu operacyjnego (jak w przypadku luki w Muse) to równoległy temat tygodnia, z rekomendacją izolacji narzędzi w kontenerach i niezależnego strażnika wywołań wychodzących

**Why do I care:** Jeśli budujecie systemy agentowe i każde wywołanie decyzyjne, routing, bramka uprawnień, klasyfikacja intencji, ląduje jako pełne zapytanie do dużego modelu językowego, płacicie za to zarówno w opóźnieniu, jak i w koszcie, bez realnej potrzeby. Warto potraktować ten temat jako sygnał, żeby świadomie rozdzielić warstwę „myślenia" od warstwy „decydowania" w architekturze własnego agenta, niezależnie od tego, czy sięgniecie po Jev, czy po odpowiednik od innego dostawcy.

**Link:** [AINews: Xiaomi MiMo-V2.6-Pro, the new top Open Weights model](https://www.latent.space/p/ainews-xiaomi-mimo-v26-pro-1t-a42b)
