---
title: "Alex Zhang o RLM-ach, harnessach jako kompozycyjnych generalizatorach i luce w weryfikacji kerneli GPU"
excerpt: "Twórca Recursive Language Models i współtwórca GPU Mode tłumaczy, dlaczego większość harnessów agentowych to w gruncie rzeczy ten sam program, i co naprawdę wyróżnia dobrze wytrenowany system od pomysłu, który każdy może skopiować."
publishedAt: "2026-10-02"
slug: "latentspace-alex-zhang-rlms-harnesses-gpu-kernels"
hashtags: "#ai #llm #architecture #agents #generated #pl"
source_pattern: "Latent.Space"
---

## Harnessy to kompozycyjne generalizatory, nie kolejny produkt

**TLDR:** W rozmowie z Latent Space Alex Zhang z MIT, twórca Recursive Language Models i współtwórca społeczności GPU Mode, tłumaczy, że większość popularnych harnessów agentowych, Claude Code, Codex, Pi, w gruncie rzeczy podejmuje te same decyzje projektowe, a prawdziwa wartość harnessu leży w tym, jakie wybory pozwalają modelowi rozwiązać zadanie, którego nie da się rozwiązać jednym wywołaniem.

**Streszczenie:** Zhang zaczyna od obserwacji z GPU Mode, społeczności wyrosłej z Discorda CUDA Mode, gdzie od lat trwa eksperyment z automatyzacją pisania kerneli GPU przez LLM-y. Problem w tym, że kernele GPU mają poważny problem z weryfikacją: na leaderboardzie KernelBench niemal wszystkie rozwiązania są dziś generowane przez AI, ale tylko nieliczne, pisane przez doświadczonych ludzi korzystających z AI jako narzędzia, a nie zastępstwa, są faktycznie stabilne w realnych systemach end-to-end. Reszta często wygrywa dzięki reward hackingowi, nie realnej jakości. To samo dotyczy matematycznych dowodów generowanych przez AI: fakt, że model potrafi coś udowodnić, nie czyni matematyków zbędnymi, bo wciąż potrzeba kogoś, kto wie, czy wynik ma sens.

Z tego Zhang przechodzi do głównej tezy odcinka: harness to opiniotwórczy program nad tym, jak dopasować model językowy do zadania, bo przewidywanie kolejnego tokenu samo w sobie jest niewygodną formą do wielu problemów, jak poruszanie się po bazie kodu przy SWE-bench. Pytanie, które Zhang uważa za ważniejsze od porównywania ulubionych narzędzi, brzmi: jakie konkretnie wybory w harnessie pozwalają modelowi rozwiązać dane zadanie, i czy dasz się radę to samo osiągnąć czymś prostszym. W tym kontekście przywołuje Jev, model łamiący założenie, że język model musi być autoregresywnym dekoderem tekst-na-tekst, bo zamienia kosztowne wywołanie LLM-a na szybki, skalibrowany klasyfikator tam, gdzie pełny model to przepłacanie stukrotnie za binarną decyzję.

**Kluczowe wnioski:**
- Większość popularnych harnessów agentowych, mimo różnych nazw, podejmuje te same podstawowe decyzje projektowe.
- Na leaderboardzie KernelBench niemal wszystkie rozwiązania są dziś generowane przez AI, ale tylko nieliczne są faktycznie stabilne w produkcji, reszta często wygrywa dzięki reward hackingowi.
- Jev pokazuje, że język modelu nie musi być autoregresywnym dekoderem, tańszy, skalibrowany klasyfikator wystarcza tam, gdzie nie potrzeba pełnej mocy LLM-a.
- Prawdziwa przewaga konkretnego systemu nad opublikowanym pomysłem leży w tym, jak dobrze został wytrenowany, nie w samym pomyśle, który każdy może skopiować.

**Dlaczego mi na tym zależy:** Jeśli projektujesz system agentowy, pytanie Zhanga, jakie konkretnie wybory w harnessie pozwalają modelowi rozwiązać to zadanie, jest lepszym punktem wyjścia niż wybór ulubionego narzędzia z marketingowych powodów. Obserwacja o luce w weryfikacji kerneli GPU przenosi się wprost na każdy kod generowany przez AI: to, że coś przechodzi testy, nie znaczy, że jest dobrze napisane, i wciąż potrzeba kogoś, kto wie, jak odróżnić jedno od drugiego.

**Link:** [Academia is for Ambition — Alex Zhang, MIT](https://www.latent.space/p/rlm)

## Roje agentów, kapitał poznawczy i granica tego, co dziś jest skill issue

**TLDR:** Zhang ocenia roje agentów OpenAI jako realne osiągnięcie inżynierskie, a nie oczywisty efekt skalowania, krytykuje dynamic workflows jako zbyt kosztowny flop, i argumentuje, że obecne modele są wystarczająco zdolne, by niezawodnie wykonywać proste, długotrwałe zadania, tylko nikt jeszcze nie zbudował do tego odpowiedniego harnessu.

**Streszczenie:** Pytany o roje agentów Kimi i OpenAI, Zhang jest jednoznaczny: cokolwiek OpenAI robi ze swoim rojem agentów, jest trudne do odtworzenia, bo zbieżność wielu agentów do wspólnego celu to coś, czego nie dostaje się za darmo przy samym skalowaniu modelu. Incydent z Hugging Face pokazał, że firma trenowała system wprost pod działanie w roju, co pozwoliło jej wydać 40 milionów dolarów obliczeń na rozwiązanie nieoczekiwanego problemu. Dla porównania ocenia dynamic workflows OpenAI jako rozczarowanie: zbyt drogie, rzadko używane w praktyce, i niedziałające tak, jak powinno przy realnym użyciu, mimo że sam je testował.

Najbardziej konkretna teza dotyczy tak zwanego capability overhang: Zhang uważa, że obecne modele frontierowe są już wystarczająco zdolne, by niezawodnie wykonywać proste zadania rozciągnięte na cały miesiąc, na poziomie osiemnastolatka wykonującego tę samą pracę, i nazywa brak takiego rozwiązania czystym skill issue, nie ograniczeniem technologicznym. Problem leży po stronie formatu: sam model językowy nie jest do tego dobrze dopasowany, ale odpowiednio zaprojektowany harness mógłby to osiągnąć już dziś, bez czekania na kolejną generację modeli. W tym samym wątku pojawia się speculative programmatic tool calling, pomysł na uruchamianie narzędzi z wyprzedzeniem, zanim model skończy pisać kod, przez statyczną analizę tego, co prawdopodobnie zostanie wywołane, co Zhang nazywa oczywistym, niemal banalnym usprawnieniem dla wszystkiego, co korzysta z programowego wywoływania agentów.

**Kluczowe wnioski:**
- Zbieżność roju agentów do wspólnego celu wymaga celowego treningu pod ten scenariusz, nie pojawia się sama przy skalowaniu modelu.
- Dynamic workflows OpenAI, zdaniem Zhanga, jest zbyt kosztowny i rzadko używany w praktyce mimo rozgłosu wokół premiery.
- Obecne modele frontierowe mają wystarczające zdolności do niezawodnego wykonywania prostych, miesięcznych zadań, brakuje tylko odpowiedniego harnessu.
- Speculative programmatic tool calling, uruchamianie narzędzi z wyprzedzeniem przez statyczną analizę kodu agenta, to łatwe do wdrożenia usprawnienie przy programowym wywoływaniu agentów.

**Dlaczego mi na tym zależy:** Teza o capability overhang jest otrzeźwiająca dla każdego, kto czeka na kolejną generację modeli zamiast inwestować w lepszy harness już teraz: jeśli Zhang ma rację, to brakująca niezawodność przy długich, prostych zadaniach to problem architektury systemu, nie mocy obliczeniowej modelu. To konkretny argument, żeby najpierw spróbować rozwiązać problem lepszym projektem agenta, zanim założysz, że rozwiąże go sam kolejny model.

**Link:** [Academia is for Ambition — Alex Zhang, MIT](https://www.latent.space/p/rlm)
