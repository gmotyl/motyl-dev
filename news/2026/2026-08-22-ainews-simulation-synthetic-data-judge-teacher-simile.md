---
title: "Sędzia, nauczyciel, środowisko, a teraz i badany: jak model po modelu zastępuje człowieka w pętli AI"
excerpt: "Latent Space rysuje siatkę, w której kolejne elementy pipeline'u trenującego AI, sędzia, nauczyciel, curriculum, eksperymentator, a teraz i człowiek jako badany podmiot, zamieniają się z ludzkich na syntetyczne, gdy tylko pojawi się sposób na weryfikację jakości tej syntezy."
publishedAt: "2026-08-22"
slug: "ainews-simulation-synthetic-data-judge-teacher-simile"
hashtags: "#AINews #ai #llm #syntheticdata #agents #ml #generated #pl"
source_pattern: "AINews"
---

## 10 procent gorzej, 100 razy taniej, 10000 razy szybciej: dlaczego symulacja przejmuje pipeline AI

**TLDR:** Od 2022 roku co roku kolejny element pipeline'u produkującego inteligencję maszynową przechodzi z ludzkiego na syntetyczny: najpierw sędzia oceniający jakość, potem nauczyciel dostarczający dane treningowe, potem curriculum decydujące, czego model uczy się dalej, potem eksperymentator projektujący badania, a teraz nawet człowiek jako źródło preferencji i zachowań.

**Summary:** Pierwszą rzeczą, która stała się syntetyczna, był sędzia, co brzmi nieintuicyjnie. InstructGPT ustanowił trik: zbierz ludzkie preferencje raz, wytrenuj model nagrody, i pozwól polityce optymalizować względem modelu, nie względem ludzi. Constitutional AI poszło dalej i kazało AI krytykować samo siebie względem zestawu zasad, a do czasu, gdy LLM-as-judge stał się domyślną metodologią ewaluacji (MT-Bench, AlpacaEval), cały aparat aprobaty, nagroda, krytyka, ewaluacja, działał na modelach oceniających modele.

Kolejny etap to nauczyciel. Seria Phi od Microsoftu udowodniła tytułem swojego artykułu, że wystarczą podręczniki: mały model wytrenowany na danych syntetyzowanych przez LLM w jakości podręcznikowej bił daleko powyżej swojej wagi parametrów. Apple WRAP poszło dalej: nie generuj tylko danych, sparafrazuj cały internet LLM-em, a pretrening staje się około trzy razy bardziej efektywny. DeepSeek-R1 uczynił "nauczyciel jest modelem" domyślnym założeniem dla każdego małego modelu wydawanego od tamtej pory. Potem pętla zaczęła się zamykać na sobie: Self-Rewarding Language Models od Mety i SPIN pokazały, że model może generować własne zadania, oceniać własne wyjścia i poprawiać się ponad sufit swoich ludzkich danych preferencji, a projektowanie curriculum, historycznie najbardziej rzemieślnicza część ML, stało się czymś, co modele robią same sobie.

Era asystencji (Copilot, potem agenty SWE) wciąż zostawiała człowieka wybierającego eksperymenty. Era odkrycia już nie. AlphaEvolve od DeepMind ewoluowało w 2025 roku genialnie nowe algorytmy, a wielkim momentem był autoresearch Karpathy'ego z marca 2026: minimalistyczna pętla, w której agent kodujący modyfikuje realny setup treningowy LLM-a, uruchamia pięciominutowy eksperyment, zachowuje zmianę tylko jeśli poprawia się validation loss, i powtarza to całą noc. Jego własny przebieg ułożył 700 eksperymentów w 20 zachowanych usprawnień, skracając czas do osiągnięcia poziomu GPT-2 z 2,02 do 1,80 godziny, realne, przenośne zmiany w kodzie znalezione, podczas gdy spał.

Jeśli modele mogą być sędzią, nauczycielem i środowiskiem, ostatnią ludzką rolą w pętli pozostaje badany podmiot, źródło preferencji, zachowań i popytu. To jest warstwa, którą zastępuje Simile, post-trenując modele na wywiadach, danych transakcyjnych i zarejestrowanych randomizowanych badaniach kontrolowanych z Open Science Framework, specjalnie po to, by odzyskać ludzkie odchylenie, niespójność i przyczynową fakturę, której modele agentyczne z natury nie mają. Autor zwraca uwagę na wzorzec pod wzorcem: każdy z tych zwrotów poprzedzał ten sam zarzut (model collapse, halucynacje, garbage in garbage out) i za każdym razem zwrot następował mimo tego, dokładnie w momencie, gdy pojawił się mechanizm weryfikacji czyniący syntetyczną wersję godną zaufania. Synteza nie postępuje, gdy generacja się poprawia. Postępuje, gdy poprawia się weryfikacja.

**Key takeaways:**
- Kolejne elementy pipeline'u AI (sędzia, nauczyciel, curriculum, eksperymentator, badany podmiot) przechodzą z ludzkich na syntetyczne, gdy pojawia się sposób weryfikacji jakości syntezy.
- Autoresearch Karpathy'ego z marca 2026 pokazał w pełni autonomiczną pętlę badawczą: 700 eksperymentów, 20 zachowanych usprawnień, realny skrócony czas treningu.
- Simile post-trenuje modele na wywiadach i danych z RCT, żeby symulować ludzkie preferencje i zachowania z dokładnością 85 procent względem oryginalnych osób.
- Ostatni, wciąż niesyntetyzowany element to fizyczny eksperyment i ucieleśniona rzeczywistość, gdzie weryfikacja jest najwolniejsza i najdroższa.

**Why do I care:** Ten artykuł jest wart przeczytania nie dla żadnej pojedynczej wiadomości produktowej, tylko dla mentalnego modelu, który daje: każda kolejna fala automatyzacji w AI nie czeka na lepszą generację, czeka na tańszy i szybszy sposób weryfikacji, czy wygenerowana rzecz jest wystarczająco dobra. Dla kogoś budującego evale, pipeline'y RLHF czy systemy agentyczne to bezpośrednia wskazówka: inwestycja w mechanizm weryfikacji, nie w kolejny generator, jest tym, co realnie odblokowuje następny etap automatyzacji. Warto też zauważyć, że ten sam wzorzec dotyczy softwarowych zespołów: coraz więcej pracy programisty przesuwa się z pisania kodu w stronę definiowania, jak zweryfikować, że wygenerowany kod robi to, co powinien.

**Link:** [10% worse, 100x cheaper, 10000x faster: Why Simulation is taking over](https://www.latent.space/p/ainews-10-worse-100x-cheaper-10000x)
