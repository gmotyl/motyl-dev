---
title: "Lilian Weng podsumowuje 35 prac o Harness Engineering dla RSI, Meta wypuszcza Muse Image i Muse Video"
excerpt: "Przegląd najważniejszych wydarzeń w AI z 6-7 lipca 2026: od nowej analizy Lilian Weng dotyczącej harness engineeringu dla rekurencyjnego samodoskonalenia modeli, przez multimodalne premiery Meta, po nowości w inferencji i interpretowalności."
publishedAt: "2026-07-08"
slug: "ainews-lilian-weng-harness-engineering-rsi-meta-muse"
hashtags: "#ainews #ai #llm #agents #harness-engineering #rsi #generated #pl"
source_pattern: "AINews"
---

## Lilian Weng o Harness Engineering dla rekurencyjnego samodoskonalenia modeli

**TLDR:** Lilian Weng, współzałożycielka Thinky i wcześniej badaczka w OpenAI, opublikowała obszerną analizę podsumowującą 35 prac naukowych na temat roli harness engineeringu w kontekście rekurencyjnego samodoskonalenia modeli AI (RSI). Jej teza jest prosta: nawet jeśli wiele ulepszeń harnessu zostanie z czasem wchłoniętych przez sam model, potrzeba precyzyjnego definiowania celów i kontekstu nigdy nie zniknie.

**Summary:** Weng opisuje harness engineering jako zestaw sprawdzonych wzorców projektowania systemów otaczających modele językowe, które umożliwiają im samodoskonalenie bez bezpośredniej modyfikacji wag. To odejście od wyobrażenia o AI "samorepisującej swój kod" w stronę bardziej przyziemnej, ale praktycznej architektury: model plus środowisko plus zestaw narzędzi sterujących procesem.

Post Weng zyskał szerokie zainteresowanie społeczności, bo porządkuje literaturę, która do tej pory była rozsiana po wielu repozytoriach i konferencjach. Omawia znane już podejście ACE (Automated Code Evolution) oraz nowsze trendy jak Meta-Harnesses, gdzie jeden harness zarządza innymi. Tekst jednocześnie sugeruje kierunek, w którym podąża Thinky, nowy startup Weng skupiony na modelach interakcji.

LangChain zareagował podobnie: wypuścił nowy kurs Deep Agents oraz projekt open-source skupiony na harnessach. Google poszło dalej i dodało do Gemini API Managed Agents obsługę background execution, zdalnych serwerów MCP, niestandardowego function calling oraz odświeżania poświadczeń. To już nie akademicka dyskusja, ale realna konwergencja produktowa wokół tej samej idei: model to tylko część systemu, a harness to równoprawny element architektury.

Znamienne jest, że ta debata odbywa się w momencie, gdy Anthropic wypuścił Claude Cowork na urządzenia mobilne i web, pozycjonując Claude'a jako "agenta działającego w tle", a nie chatbota. Greg Brockman już wcześniej cicho popierał tę filozofię. Weng nadaje jej intelektualną legitymizację. Mam wrażenie, że harness engineering stanie się w ciągu roku jedną z najbardziej poszukiwanych specjalizacji w całej branży.

**Key takeaways:**
- Weng argumentuje, że potrzeba precyzyjnego definiowania celów i kontekstu dla modeli AI nie zniknie, nawet gdy modele same będą w stanie ulepszać swoje harnessy
- Ekosystem szybko konwerguje: LangChain, Google Gemini API i Anthropic Claude Cowork wszystkie jednocześnie przesuwają się w stronę agentów działających w tle z harnesami jako centralnymi komponentami
- Meta-Harnesses, czyli harnessy zarządzające innymi harnesami, pojawiają się jako nowy wzorzec architektoniczny w literaturze badawczej

**Why do I care:** Z perspektywy architekta frontend'owego harness engineering to odpowiednik wzorców kompozycji w UI, tyle że dla modeli AI. Tak jak React Server Components zmieniły sposób, w jaki myślimy o podziale logiki między serwer a klienta, tak harnessy redefiniują granicę między tym, co robi model, a tym, co robi infrastruktura wokół niego. Jeśli budujesz produkt oparty na AI, projekt harnessu determinuje możliwości skalowania, debugowalność i bezpieczeństwo w takim samym stopniu jak sam model. To nie jest detal implementacyjny - to decyzja architektoniczna.

**Link:** [[AINews] Lilian Weng summarizes 35 papers on Harness Engineering for RSI](https://www.latent.space/p/ainews-lilian-weng-summarizes-35?publication_id=1084089&post_id=205984146&isFreemail=true&triedRedirect=true)

---

## Meta Superintelligence wypuszcza Muse Image i Muse Video

**TLDR:** Meta Superintelligence Labs zaprezentowała Muse Image i zapowiedziała Muse Video, dwa modele generowania mediów z pętlą agentyczną: planowanie, wyszukiwanie, użycie narzędzi i samo-refinement przed renderowaniem. Muse Image od razu zajął drugie miejsce na Image Arena, zaraz za GPT Image 2.

**Summary:** Premiera Muse Image jest technicznie interesująca nie ze względu na samą jakość obrazów, choć ta jest wysoka, ale ze względu na architekturę. Meta wprost opisuje generowanie jako pętlę agentyczną: model planuje zadanie, przeszukuje sieć, wykonuje kod, weryfikuje wyniki i dopiero wtedy renderuje obraz. Samo-refinement nie był ręcznie zaprojektowany, lecz wyłonił się podczas treningu RL. To ważna informacja, bo sugeruje, że skalowanie czasu testowania (test-time compute) działa tu podobnie jak w modelach rozumowania.

Muse Video zadebiutował na trzecim miejscu na Video Arena, co przy tak wczesnej fazie projektu jest solidnym wynikiem. Meta podkreśla, że oba modele biją wcześniejsze modele MAI od Microsoftu, choć bez żadnych szczegółów technicznych, bez paperu, bez opisu architektury. Wyniki mówią same za siebie, ale brak przejrzystości to krok w tył przy ocenie, co faktycznie się zmieniło.

**Key takeaways:**
- Generowanie obrazów i wideo przez Muse opiera się na agentycznej pętli z planowaniem i samo-refinementem, który wyłonił się podczas RL, a nie był zaprojektowany ręcznie
- Muse Image zajął drugie miejsce na Image Arena (za GPT Image 2), Muse Video trzecie na Video Arena przy debiucie
- Brak jakiegokolwiek papieru technicznego lub szczegółów architektonicznych utrudnia niezależną ocenę

**Why do I care:** Dla programisty budującego interfejsy z generowaniem mediów ważna jest informacja, że skalowanie compute w czasie inferencji poprawia jakość. To oznacza, że API tego typu modeli będzie miało parametr "głębokości" refinementu z bezpośrednim przełożeniem na koszt i czas odpowiedzi. Projektując UX, trzeba będzie decydować: szybki podgląd czy finalne rendery? Ten dylemat nie jest nowy, ale agentyczna pętla sprawia, że staje się bardziej złożony do zarządzania po stronie klienta.

**Link:** [[AINews] Lilian Weng summarizes 35 papers on Harness Engineering for RSI](https://www.latent.space/p/ainews-lilian-weng-summarizes-35?publication_id=1084089&post_id=205984146&isFreemail=true&triedRedirect=true)

---

## Liquid AI's Antidoom: koniec pętli śmierci w małych modelach rozumowania

**TLDR:** Liquid AI opublikowało Antidoom, metodę treningową open-source, która redukuje problem "doom loops", czyli zapętlania tokenów przez małe modele rozumowania aż do wyczerpania kontekstu. Wyniki są imponujące: LFM2.5-2.6B spada z 10.2% do 1.4% przypadków zapętlenia.

**Summary:** Doom loops to konkretny, powtarzalny problem w małych modelach rozumowania: model wpada w pętlę powtarzając te same tokeny, dopóki nie wypełni okna kontekstowego, nie dając żadnej użytecznej odpowiedzi. Liquid AI identyfikuje dokładnie token, który wyzwala pętlę, i relabeluje go metodą FTPO (Final Token Preference Optimization), redistrybuując prawdopodobieństwo na alternatywne tokeny.

Podejście jest eleganckie i chirurgiczne. Zamiast przebudowywać architekturę lub dokładać dane treningowe, autorzy lokalizują konkretną patologię i ją naprawiają. Qwen3.5-4B przechodzi z 22.9% do 1% przypadków zapętlenia przy greedy sampling. To rodzaj pracy, której efekty widać natychmiast w produkcji, nie tylko na benchmarkach.

**Key takeaways:**
- FTPO (Final Token Preference Optimization) identyfikuje token wyzwalający pętlę i redistrybuuje jego prawdopodobieństwo na alternatywne kontynuacje
- LFM2.5-2.6B: 10.2% → 1.4%, Qwen3.5-4B: 22.9% → 1% przypadków zapętlenia przy greedy sampling
- Metoda jest open-source i ilustruje trend eliminowania konkretnych trybów awarii zamiast tylko skalowania parametrów

**Why do I care:** Każda aplikacja używająca małych modeli lokalnie lub w edge deploymencie ma potencjalny problem z doom loops, bo greedy sampling jest tam domyślny z uwagi na koszty. Antidoom to praktyczna poprawka, którą można zastosować do fine-tuned modeli. Jeśli używasz małych modeli do zadań strukturalnych, na przykład parsowania JSON lub generowania zapytań, ta technika może wyeliminować całą klasę produkcyjnych błędów.

**Link:** [[AINews] Lilian Weng summarizes 35 papers on Harness Engineering for RSI](https://www.latent.space/p/ainews-lilian-weng-summarizes-35?publication_id=1084089&post_id=205984146&isFreemail=true&triedRedirect=true)

---

## Tencent wypuszcza Hy3: 295B model MoE na licencji Apache 2.0

**TLDR:** Tencent opublikował Hy3 na Hugging Face, model MoE z 295B parametrami (21B aktywnych), tym razem na licencji Apache 2.0. Poprzednia licencja "community" wykluczała użycie w Korei Południowej, Wielkiej Brytanii i UE, co czyniło model praktycznie bezużytecznym dla europejskich deweloperów.

**Summary:** Zmiana licencji jest tutaj ważniejsza niż ewentualne ulepszenia benchmarkowe. Apache 2.0 usuwa geograficzne i komercyjne bariery, które czyniły poprzednią wersję Hunyuan trudną do wdrożenia poza Chinami. Społeczność z ostrożnym optymizmem podchodzi do deklarowanych ulepszeń nad HY3-Preview, czekając na niezależne testy i dostępność kwantyzacji w formacie GGUF.

Model z 21B aktywnymi parametrami w architekturze MoE jest interesującą propozycją dla lokalnych instalacji na wysokiej klasy sprzęcie. Porównania z Qwen i MiniMax będą możliwe po pojawieniu się GGUF, które znacznie obniżają wymagania sprzętowe. Na razie benchmark Tencenta jest na poziomie deklaracji własnej, co w tej branży jest podstawą do zdrowego sceptycyzmu.

**Key takeaways:**
- Zmiana licencji z "community" (z geograficznymi ograniczeniami) na Apache 2.0 to najważniejsza zmiana, umożliwiająca wdrożenia w UE, UK i Korei Południowej
- 295B parametrów, 21B aktywnych w architekturze MoE, potencjalnie interesujący dla lokalnych deploymentów na wysokiej klasy sprzęcie po pojawieniu się GGUF
- Deklarowane ulepszenia benchmarkowe nad HY3-Preview wymagają niezależnej weryfikacji

**Why do I care:** Apache 2.0 to sygnał, że Tencent poważnie myśli o globalnej adopcji. Dla europejskich zespołów, które z powodów compliance muszą trzymać modele lokalnie, każdy nowy silny open-weight model z liberalną licencją poszerza opcje. Hy3 jest tego przykładem, choć dopiero po pojawieniu się kwantyzacji i niezależnych testów będzie wiadomo, czy faktycznie konkuruje z Qwen3 w realnych zastosowaniach.

**Link:** [[AINews] Lilian Weng summarizes 35 papers on Harness Engineering for RSI](https://www.latent.space/p/ainews-lilian-weng-summarizes-35?publication_id=1084089&post_id=205984146&isFreemail=true&triedRedirect=true)

---

## Interpretowalność modeli: debata o J-space i struktura warstw w 38 modelach

**TLDR:** Praca Anthropic o "J-space" zdominowała dyskusje o interpretowalności, jednocześnie wywołując ostrą krytykę co do framing'u świadomości. Silniejszym technicznym wynikiem jest odkrycie, że geometria J-lens jest zaskakująco uniwersalna nawet między niespokrewnionymi rodzinami modeli jak Llama i OLMo.

**Summary:** Eliezer Bakouch obliczył podobieństwo CKA na geometrii J-lens dla 38 otwartych modeli i znalazł zaskakująco spójną organizację warstw i głębokości, nawet między modelami z różnych rodzin. To sugeruje, że transformery zbiegają do podobnych wewnętrznych reprezentacji niezależnie od konkretnych wyborów architektonicznych podczas treningu. Anthropic i Neuronpedia udostępniły wagi J-lens dla otwartych modeli, co umożliwia dalsze badania.

Goodfire przedstawił Block-Sparse Featurizers, które argumentują, że wiele konceptów wizualnych jest z natury wielowymiarowych i wymaga bloków 2-4 wymiarowych w przestrzeni aktywacji, a nie pojedynczych kierunków. To ma konsekwencje dla sposobu, w jaki budujemy narzędzia do analizy i sterowania zachowaniem modeli.

Kontrowersje wokół framing'u świadomości w pracy Anthropic nie powinny przesłaniać tych konkretnych wyników. Zarzuty od Buromlina, Paula Cala i scaling01 wskazują, że wektory są przyczynowe "z definicji" przez soczewkę Jacobiana, co jest metodologicznym problemem, ale sam fenomen organizacji warstw między modelami pozostaje ciekawy i wartościowy do dalszego zbadania.

**Key takeaways:**
- Geometria J-lens jest zaskakująco spójna między niespokrewnionymi rodzinami modeli (Llama, OLMo i inne) na próbie 38 modeli, co sugeruje konwergencję wewnętrznych reprezentacji
- Goodfire's Block-Sparse Featurizers pokazują, że niektóre koncepty (szczególnie wizualne) są wielowymiarowe i wymagają bloków w przestrzeni aktywacji, a nie pojedynczych kierunków
- Debata o świadomości w pracy Anthropic odciąga uwagę od solidniejszych, konkretnych wyników technicznych

**Why do I care:** Narzędzia do interpretowalności, takie jak J-lens i Block-Sparse Featurizers, to w przyszłości debugging modeli osadzonych w produktach. Jeśli model zachowuje się dziwnie w produkcji, interpretowalność pozwoli zrozumieć dlaczego, tak jak profiler pozwala znaleźć wąskie gardło w aplikacji. Jeszcze nie ma to bezpośredniego przełożenia na codzienny development, ale ta infrastruktura badawcza staje się fundamentem pod praktyczne narzędzia deweloperskie.

**Link:** [[AINews] Lilian Weng summarizes 35 papers on Harness Engineering for RSI](https://www.latent.space/p/ainews-lilian-weng-summarizes-35?publication_id=1084089&post_id=205984146&isFreemail=true&triedRedirect=true)
