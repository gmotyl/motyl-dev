---
title: "Sampling w llama-server: jak naprawdę kontrolować lokalne modele językowe"
excerpt: "Głęboki przegląd parametrów próbkowania w llama.cpp — od Temperature i MinP po DRY, XTC i Mirostat — z praktycznym przewodnikiem kiedy i jak je stosować."
publishedAt: "2026-07-02"
slug: "sampling-args-llama-server-lokalne-modele"
hashtags: "#engineering #llm #ai #llama #localAI #AlexEwerlöf #generated #pl"
source_pattern: "AlexEwerlöf"
---

## Sampling args in llama-server

**TLDR:** llama.cpp daje znacznie więcej kontroli nad lokalnym modelem niż LM Studio czy Ollama — a odpowiednie ustawienie parametrów próbkowania potrafi dosłownie podwoić jakość wyników. Ten artykuł to kompletny przewodnik po tych parametrach, napisany przez kogoś, kto sam przez to przechodził.

**Summary:**

Alex zaczyna od obserwacji, która pewnie zaskoczy wielu: ten sam model może generować 10 lub 20 tokenów na sekundę zależnie od konfiguracji próbkowania. Ale to nie tylko kwestia szybkości — parametry próbkowania bezpośrednio wpływają na jakość generacji, wyniki benchmarków i skuteczność ewaluacji. Mimo to większość użytkowników lokalnych modeli w ogóle ich nie rusza.

Artykuł identyfikuje cztery główne tryby awarii lokalnych (szczególnie kwantyzowanych) modeli. Pierwszy to "probability collapse" — model wpada w nieskończoną pętlę powtarzając tę samą sekwencję, na przykład tabele Markdown albo puste nawiasy JSON. Drugi to halucynacje i łamanie składni przy zbyt wysokiej losowości. Trzeci to degradacja gramatyki, gdy stare mechanizmy karania powtórzeń ślepo karzą słowa strukturalne jak "the", "a" czy znaki przestankowe. Czwarty to "szum kwantyzacji" — artefakty statystyczne wprowadzane przez kwantyzację, z którymi statyczne samplery sobie nie radzą.

Alex szczegółowo omawia cały stos parametrów. Temperature to podstawa — niskie wartości (0.0–0.3) dla kodu i RAG, wysokie (0.8–1.2+) dla twórczego pisania. Top-P (nucleus sampling) dynamicznie ogranicza pulę tokenów, ale artykuł ostrzega, że jest to w dużej mierze przestarzałe narzędzie. Min-P okazuje się znacznie bardziej eleganckim rozwiązaniem — zamiast sztywnego progu sumowania, odcina tokeny na podstawie względnej różnicy względem tokena o najwyższym prawdopodobieństwie. Top-K jest wprost określony jako "legacy" i jego stosowanie jest odradzane.

Bardziej interesująca część dotyczy nowoczesnych mechanizmów. DRY (Don't Repeat Yourself) analizuje sekwencje tokenów zamiast pojedynczych tokenów, co pozwala zapobiegać katastrofalnym pętlom bez niszczenia gramatyki. XTC (Exclude Top Choices) to interwencyjny sampler, który dosłownie usuwa z puli tokeny o najwyższym prawdopodobieństwie, gdy model utknął — co zmusza go do wyboru z alternatyw. Dynatemp dynamicznie dostosowuje temperaturę na podstawie entropii rozkładu logitów. Adaptive-P śledzi bieżącą pewność modelu przez ruchomą średnią wykładniczą i adaptuje próg selekcji. Mirostat jest pełnymi stanowym algorytmem utrzymującym docelowy poziom "zaskoczenia" tekstu.

Artykuł zawiera też ważną wskazówkę o kolejności samplerów — parametr `--samplers` definiuje graf wykonania, i ta kolejność ma znaczenie matematyczne. Na przykład, karanie za powtórzenia powinno następować przed obcięciem puli tokenów, a nie odwrotnie.

**Key takeaways:**

- Ten sam model może działać drastycznie inaczej zależnie od parametrów próbkowania — to nie jest kosmetyczna zmiana
- `repeat_penalty` jest ogólnie odradzane na rzecz DRY lub Presence/Frequency Penalty
- Min-P jest bardziej eleganckim rozwiązaniem niż Top-P dla większości przypadków użycia
- Top-K jest przestarzały — jeśli go używasz, ustaw wysoką wartość (40–100)
- XTC i Mirostat są szczególnie przydatne dla małych lub mocno kwantyzowanych modeli
- Kolejność samplerów w grafie wykonania ma realne konsekwencje matematyczne
- Dynatemp z wysokim eksponentem (np. 2.0) to dobre rozwiązanie "ustaw i zapomnij" dla środowisk mieszanych

**Why do I care:**

Z perspektywy architekta frontendowego, który coraz częściej integruje lokalne modele językowe w narzędziach deweloperskich i pipeline'ach CI, ten artykuł dotyka czegoś, co jest systematycznie pomijane. Większość poradników o lokalnych LLM zatrzymuje się na "pobierz model, uruchom Ollama" — ale gdy zaczynasz budować coś produkcyjnego, albo choćby chcesz mieć deterministyczne wyniki w testach automatycznych, musisz zejść na ten poziom. Warto jednak zauważyć, że Alex skupia się wyłącznie na llama.cpp i nie adresuje tego, jak te parametry przekładają się (albo nie przekładają) na API kompatybilne z OpenAI przy użyciu innych runtimeów. Brakuje też porównania z podejściem "structured outputs" przez gramatyki, które sam artykuł tylko wzmiankuje na końcu — a to jest często znacznie skuteczniejsza alternatywa dla deterministycznych zadań.

**Link:** [Sampling args in llama-server](https://blog.alexewerlof.com/p/sampling-args-in-llama-server)
