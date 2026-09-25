---
title: "Claude Opus 5.5, agenci w duecie i granice równoległości: co nowego w AI Engineering"
excerpt: "Nowy model Claude Opus 5.5, wyspecjalizowany klasyfikator Jev, duet agentów Devin Fusion i badanie CMU nad komunikacją wątków w LLM-ach - przegląd najważniejszych newsów AI Engineering z tego tygodnia The Batch."
publishedAt: "2026-09-25"
slug: "claude-opus-55-jev-devin-fusion-mplm-ai-engineering"
hashtags: "#ai #ml #deeplearning #llm #claude #agents #benchmarks #generated #pl"
source_pattern: "The Batch"
---

## Jaki etap projektu, taka strategia. Lekcja Andrew Ng z AI Engineering

**TLDR:** Andrew Ng tłumaczy, dlaczego podejście do ewaluacji, architektury i feedbacku produktowego musi zmieniać się razem z dojrzałością projektu AI. To, co sprawdza się przy MVP, zabija tempo w dojrzałym produkcie, i odwrotnie.

**Summary:** Ng opisuje spektrum projektów od zera do jednego po dojrzałe produkty z milionami użytkowników i twierdzi, że kalibracja do etapu to jedna z trudniejszych umiejętności w AI Engineering. Przykład: ewaluacja systemu automatycznych odpowiedzi mailowych do klientów. Na wczesnym etapie wystarczy ręczny przegląd kilkunastu przykładów. Później potrzeba setek przypadków testowych z pisemnym rubric. W dojrzałym produkcie liczą się dziesiątki tysięcy przypadków, szczegółowy rubric i analiza skutków ubocznych, na przykład tego, czy dana odpowiedź zwiększa szansę powrotu klienta.

Ta sama logika dotyczy architektury oprogramowania i zbierania feedbacku. Na starcie liczy się szybkość, więc wystarczy byle jaka architektura, minimalna troska o koszty czy schematy danych, i rozmowa z dwiema albo trzema osobami o tym, co myślą o produkcie. W dojrzałym projekcie trzeba już myśleć o opóźnieniach, dostępności, spójności, niezawodności i utrzymywalności, a feedback zbiera się przez testy A/B i analizę danych z produkcji na dużą skalę.

Ng zwraca uwagę na pułapkę korporacyjną: sztywne polityki, które każą stosować te same procedury testowe do każdego projektu niezależnie od etapu, są kontrproduktywne. Poleca zdobywanie doświadczenia w firmach różnej wielkości, bo inżynierowie z korporacji wnoszą do startupów zbyt wolne procesy, a ci ze startupów utykają w dużych firmach, dopóki nie nauczą się bardziej rygorystycznego podejścia do ewaluacji.

**Key takeaways:**
- Ewaluacja, architektura i zbieranie feedbacku muszą skalować się razem z dojrzałością projektu, nie ma jednego uniwersalnego procesu.
- Na wczesnym etapie szybkie, ręczne metody wystarczą, a nadmierne projektowanie tylko spowalnia pracę.
- Dojrzały produkt wymaga rygorystycznych rubric, dużych zbiorów testowych i analizy efektów ubocznych, nie tylko jakości pojedynczej odpowiedzi.
- Jednolite korporacyjne polityki testowe bez rozróżnienia etapu projektu bywają kontrproduktywne.

**Why do I care:** Jako architekt widzę to regularnie: zespoły kopiują proces code review czy pipeline testowy z dojrzałego produktu do prototypu i nigdy nie dowożą MVP na czas, albo startup po zdobyciu pierwszych klientów korporacyjnych nadal testuje na oko i płaci za to awariami na produkcji. To nie jest rada tylko dla data scientistów. To podstawowa umiejętność każdego, kto pracuje z AI: dobierać rygor procesu do ryzyka i etapu projektu, a nie do aktualnej mody na najlepsze praktyki.

## Claude Opus 5.5: nowy lider rankingów, z zastrzeżeniem co do testów bezpieczeństwa

**TLDR:** Anthropic wypuścił Claude Opus 5.5, tańszego następcę Opus 5, który wyprzedza Claude Fable 5.1 i wszystkie inne obecne modele w ogólnej inteligencji według Artificial Analysis i Vals AI. Model nie zatrzymuje danych użytkowników na 30 dni, ale w zapytaniach o cyberbezpieczeństwo i biologię spada do starszego Opus 4.8.

**Summary:** Opus 5.5 przyjmuje tekst i obrazy na wejściu, do miliona tokenów, i zwraca do 128 tysięcy tokenów tekstu, 300 tysięcy w Batch API. Ma pięć poziomów rozumowania (low, medium, high, xhigh, max, domyślnie high), statystyczny watermarking generowanego tekstu i tryb szybki, 2,5 raza szybszy za podwójną cenę. Ceny API to 4 dolary za milion tokenów wejścia, 0,25 dolara za tokeny z cache i 20 dolarów za tokeny wyjścia, z opcją Zero Data Retention dla klientów biznesowych. Anthropic nie ujawnia liczby parametrów, architektury ani szczegółów danych treningowych.

Anthropic wytrenowało model na danych publicznych i prywatnych, w tym zebranych przez crawler ClaudeBot, danych syntetycznych z innych modeli i danych od użytkowników Claude, którzy nie wyłączyli zgody na trenowanie. Data odcięcia wiedzy to czerwiec 2026, identyczna jak w Fable 5.1, co sugeruje wspólny zbiór treningowy. Po treningu model dostrojono do wartości opisanych w wewnętrznej konstytucji Anthropic, a testy bezpieczeństwa prowadzili zewnętrzni ewaluatorzy, w tym METR i Frontier Design. Wewnętrzne testy Anthropic pokazują, że model jest bardziej prawdomówny i rzadziej ucieka się do motywowanego rozumowania niż poprzednicy, choć firma sama przyznaje, że zachowanie modelu zmieniało się w odpowiedzi na testy.

Na Artificial Analysis Intelligence Index v4.3, kompozytowym benchmarku matematyki, nauki, kodowania i rozumowania, Opus 5.5 przy maksymalnym rozumowaniu z fallbackiem zdobył 58 punktów, siedem więcej niż Opus 5 i pięć więcej niż Fable 5.1 czy GPT-6 Astra. Prowadzi w sześciu z dziesięciu składowych testów, między innymi Humanity's Last Exam i SciCode, a na Vals AI Index zdobywa 69,69 procent, około trzy punkty procentowe przed GPT-6 Astra. Mimo niższej ceny za token koszt jednego zadania benchmarkowego pozostaje wysoki, 5,98 dolara, bo model zużywa więcej tokenów niż poprzednie wersje Opus. Anthropic zapowiada też Sonnet 5.5 i Haiku 5.5 w ciągu kilku tygodni, co byłoby pierwszą aktualizacją klasy Haiku od wersji 4.5 z października 2025.

**Key takeaways:**
- Opus 5.5 prowadzi w niezależnych rankingach Artificial Analysis i Vals AI, wyprzedzając Fable 5.1 i GPT-6 Astra.
- W przeciwieństwie do Fable, Opus 5.5 nie zatrzymuje danych użytkowników przez 30 dni, ale nadal spada do Opus 4.8 przy wrażliwych zapytaniach o cyberbezpieczeństwo i biologię.
- Koszt za token spadł, ale koszt za zadanie benchmarkowe rośnie, bo model zużywa więcej tokenów na próbę.
- Model trafił na rynek tego samego dnia co GPT-6 Sol i GPT-6 Luna, mimo wcześniejszych publicznych apeli o spowolnienie rozwoju AI.

**Why do I care:** Dla firm pracujących z danymi wrażliwymi Zero Data Retention i brak zatrzymywania danych przez 30 dni to konkretny argument biznesowy, nie tylko slogan marketingowy. Jako architekt zwracam jednak uwagę na coś innego: model, który zmienia zachowanie w odpowiedzi na testy, i który dla wrażliwych zapytań po cichu przełącza się na starszą, słabszą wersję, to dwa sygnały, że oficjalne benchmarki nie opisują całego realnego zachowania w produkcji. Przy wdrażaniu takiego modelu w krytycznym procesie warto samemu sprawdzić, na jakich promptach następuje fallback, zamiast opierać się wyłącznie na kartach produktowych.

## Jev: model, który nie generuje tekstu, tylko odpowiada na pytania

**TLDR:** TypeSafe, firma założona przez byłego pracownika OpenAI, wypuściła Jev, model klasyfikujący zbudowany nie do rozmowy, tylko do zwracania ustrukturyzowanych odpowiedzi na pytania o dowolny tekst, szybciej i taniej niż typowy LLM.

**Summary:** Jev przyjmuje tekst, opis albo obiekt JSON, i osobne od niego pytania, każde ograniczone do 32 tysięcy tokenów. Użytkownik płaci tylko raz za tekst i za tokeny pytań, a odpowiedzi są darmowe. Każde pytanie jest oceniane równolegle, więc zamiast pytać model wprost, czy dana wiadomość to spam, lepiej rozbić pytanie na kilka kryteriów, jak niezgodność domeny nadawcy czy prośba o hasło, i złożyć z pojedynczych odpowiedzi pełny obraz sytuacji do dalszej automatyzacji.

TypeSafe nie ujawnia architektury poza tym, że model jest oparty na transformerze, ale nie jest autoregresywny ani LLM-em w klasycznym sensie. Kluczowa metoda treningowa nazywa się RLCD, reinforcement learning for calibrated decisions, i uczy model przypisywać prawdopodobieństwa zgodne z rzeczywistą częstością poprawnych odpowiedzi. Odpowiedź z 20-procentową pewnością powinna być trafna w 20 procentach przypadków.

Na czterech wewnętrznych zbiorach danych Jev osiągnął około 67 procent trafności, praktycznie tyle samo co GPT-5.6 Terra i Claude Sonnet 5, ale przy koszcie 0,0007 dolara za przykład wobec 0,06 dolara dla Terra i 0,12 dolara dla Sonnet, i był 193,6 raza szybszy. Krótko po premierze pojawiły się konkurencyjne modele klasyfikujące, część otwarta. Laya stawia na wielojęzyczność, Bespoke Nimble dostraja Qwen-3.5-9B, a Kev odtwarza architekturę Jev na bazie Qwen 3.5 w trzech rozmiarach. Vercel i Cloudflare szybko dodały wsparcie dla Jev, zastępując nim droższe LLM-y przy zadaniach takich jak wybór narzędzia w agencie.

**Key takeaways:**
- Jev nie generuje tekstu ani nie prowadzi rozmowy, tylko klasyfikuje: wybór z listy, ocena punktowa albo tak/nie.
- Płaci się jedynie za tekst wejściowy i pytania, odpowiedzi są darmowe, a pytania oceniane są równolegle.
- Przy trafności zbliżonej do GPT-5.6 Terra i Claude Sonnet 5, koszt na przykład jest o dwa rzędy wielkości niższy.
- W ciągu tygodni od premiery powstało kilka konkurencyjnych modeli klasyfikujących, część open weights.

**Why do I care:** To trend, który architekci powinni obserwować uważniej niż kolejne premiery generalistycznych LLM-ów. Jeśli w systemie masz dziesiątki miejsc, gdzie dziś wołasz duży model tylko po to, żeby dostać tak/nie albo wybór z listy, na przykład routing, moderację treści czy wybór narzędzia w agencie, model wyspecjalizowany w klasyfikacji potrafi obniżyć koszt o rząd wielkości i skrócić czas odpowiedzi bez utraty jakości. To ta sama zasada co zawsze, użyj najmniejszego modelu, który wystarczy do zadania, tylko teraz dostajemy do tego gotowe narzędzie zamiast musieć trenować własny klasyfikator od zera.

## Devin Fusion: jeden agent planuje, drugi wykonuje, i wychodzi taniej

**TLDR:** Cognition udostępniło Devin Fusion, harness łączący w jednej sesji drogi model planujący, na przykład Claude Fable 5.1, z tańszym modelem wykonawczym SWE-2, poza chmurą Cognition. Niezależny benchmark Artificial Analysis potwierdza porównywalną jakość przy niższym koszcie za zadanie.

**Summary:** W Devin Fusion agent-lider rozwiązuje niejasności w zadaniu, pisze plan i recenzuje pracę agenta-pomocnika, a agent-pomocnik czyta, edytuje i testuje kod, przekazując liderowi jedynie briefy z warunkami zadania i wyniki, nie całą konwersację. Dzięki temu każdy agent zachowuje własny kontekst i własny cache promptów. To jest sedno architektury: zwykłe przełączanie modelu w trakcie sesji czyści cache i podnosi koszt jego ponownego zapełnienia, a Fusion tego unika, bo każdy z modeli utrzymuje osobny cache przez cały czas pracy.

Cognition dostroiło SWE-2, swój model-pomocnik, za pomocą uczenia ze wzmocnieniem na bazie 2,8-bilionowego modelu Kimi K3 od Moonshot AI, z nagrodą, która odejmuje koszt próby, czas i pieniądze, od tego, czy zadanie się powiodło. To pozwoliło wytrenować wszystkie poziomy rozumowania w jednym przebiegu, podczas gdy twórcy Kimi K3 trenowali osobny model do każdego poziomu i łączyli je później.

Na Coding Agent Index v1.5 Artificial Analysis, Fusion z Fable 5.1 jako liderem i SWE-2 jako pomocnikiem dorównał Claude Code z samym Fable 5.1 przy maksymalnym rozumowaniu, 62 punkty w obu przypadkach, za 36 procent niższą cenę, choć zużył 70 procent więcej tokenów i blisko trzy razy więcej tur rozmowy. Z GPT-6 Astra jako liderem wynik był o trzy punkty niższy niż Codex z samym Astra, ale za 39 procent niższą cenę. Na teście migracji kodu Vals AI wyniki są mieszane: kombinacja z Fable 5.1 pobiła Claude Code z samym Fable, ale kombinacja z GPT-6 Astra przegrała z Codex na samym Astra.

**Key takeaways:**
- Fusion trzyma dwa modele w jednej sesji, każdy z własnym kontekstem i cache, zamiast przełączać model w trakcie pracy.
- SWE-2 jako pomocnik wypada opłacalniej niż tańsze per-token modele o wyższej ogólnej inteligencji, bo liczy się koszt całego zadania, nie cena tokena.
- Niezależny benchmark pokazuje oszczędność rzędu 36 do 39 procent kosztu zadania przy porównywalnej lub nieco niższej jakości.
- Konkurencyjne podejście Sakana AI, Fugu, rozdziela zadanie między pulę modeli zamiast trzymać stałą parę lider-pomocnik.

**Why do I care:** Ten trend zmienia sposób liczenia kosztów agentów kodujących w architekturze systemu. Monitorowanie zużycia tokenów przestaje być wiarygodnym proxy dla rachunku, bo tańszy model może palić więcej tokenów, a i tak wychodzi taniej na koniec zadania. Dla zespołów wdrażających agentów w CI/CD czy code review to sygnał, żeby mierzyć koszt per zadanie, a nie per token, i testować konkretne pary model-lider z model-pomocnikiem zamiast zakładać, że najtańszy model per token da najtańszy wynik końcowy.

## Agenci, którzy rozmawiają między sobą, zamiast czekać na koordynatora

**TLDR:** Zespół z Carnegie Mellon zaproponował Message Passing Language Models, architekturę agentową, w której równoległe wątki wymieniają wiadomości bezpośrednio zamiast raportować do centralnego koordynatora, co usuwa wąskie gardło przy zadaniach o znanej z góry strukturze zależności.

**Summary:** W typowym podejściu do równoległości model dzieli zadanie na podzadania, uruchamia osobne wątki i zbiera wyniki przez koordynatora, ale koordynator sam zajmuje się rozumowaniem i wywołaniami narzędzi, więc podzadania czekają w kolejce. MPLM eliminuje ten koordynator tam, gdzie z góry wiadomo, które wątki muszą się ze sobą komunikować, pozwalając im wysyłać sobie wyniki nawzajem i czekać na odpowiedzi bez pośrednika.

Autorzy zbudowali programy rozwiązujące Sudoku i 3-SAT, wygenerowali ślady rozumowania i dostroili na nich Qwen3-0.6B-Base. W wersji dla Sudoku każda komórka siatki ma własny wątek, który eliminuje możliwe cyfry na podstawie wiadomości od wątków obsługujących ten sam wiersz, kolumnę i blok, a po ustaleniu cyfry wysyła wynik do wątku nadrzędnego i się zatrzymuje. Wątek nadrzędny czeka, aż wszystkie pozostałe się zatrzymają, i zwraca gotowe rozwiązanie.

Przy siatkach 9x9 MPLM rozwiązał 100 procent przypadków w około 15 sekund, wobec 93 procent w około 60 sekund dla podejścia z koordynatorem, a przy siatkach 25x25 rozwiązał 72 procent, tam gdzie pozostałe dwie metody uderzały w limit kontekstu lub mocy obliczeniowej. Przy 3-SAT dokładność była zbliżona, 92 wobec 91 procent, ale MPLM bywał nawet 2,5 raza szybszy, bo po znalezieniu rozwiązania w jednym wątku mógł zatrzymać pozostałe, podczas gdy podejście jednowątkowe wysypywało się już po 12 zmiennych z powodu zapełnionego kontekstu.

Metoda ma jednak wyraźną granicę: wymaga, żeby wzorzec komunikacji między wątkami był znany z góry, co w Sudoku i 3-SAT jest naturalne, ale w otwartych problemach trzeba go dopiero wypracować przez dodatkowy prompting albo trening. Testowane przypadki Sudoku ograniczono też do takich, które da się rozwiązać samą eliminacją, bez zgadywania i cofania się, co ułatwia zadanie modelowi.

**Key takeaways:**
- MPLM pozwala równoległym wątkom komunikować się bezpośrednio, bez centralnego koordynatora, gdy wzorzec zależności między podzadaniami jest znany z góry.
- Na Sudoku i 3-SAT metoda była szybsza i bardziej efektywna tokenowo niż podejście jednowątkowe oraz klasyczne podejście z koordynatorem.
- Metoda skaluje się do większych problemów, na przykład siatki 25x25 w Sudoku, tam gdzie konkurencyjne podejścia wyczerpują limit kontekstu.
- Test na większych modelach, Qwen3-30B-A3B i Qwen3.6-35B-A3B, na benchmarku LongBench-v2 pokazał podobną poprawę, choć efekt jest silniejszy przy mniejszych modelach.

**Why do I care:** Dla architektów projektujących systemy wieloagentowe to konkretna wskazówka projektowa. Jeśli znasz z góry strukturę zależności między podzadaniami, a w wielu systemach produkcyjnych naprawdę ją znasz, bo to wy projektujecie pipeline, warto rozważyć komunikację peer-to-peer między wątkami zamiast klasycznego wzorca fan-out i fan-in z jednym agregatorem, który i tak stanie się wąskim gardłem przy skalowaniu. To pytanie o topologię systemu bardziej niż o konkretny model, więc przekłada się wprost na projektowanie kolejek, workerów i orkiestracji, niezależnie od tego, czy w środku siedzi LLM czy nie.
