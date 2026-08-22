---
title: "Tajemniczy Owl Alpha okazał się modelem od firmy dostarczającej jedzenie, teraz jest darmowy w Kilo"
excerpt: "LongCat 2.0 od Meituan, wcześniej znany jako anonimowy stealth model Owl Alpha, bije referencyjnego Claude Opusa na kilku benchmarkach i kosztuje mniej niż połowę tego, co flagowy model DeepSeeka za zadanie, a teraz jest darmowy w Kilo na czas promocji."
publishedAt: "2026-08-22"
slug: "kilo-longcat-20-owl-alpha-meituan-free-promo"
hashtags: "#kilo #llm #openweights #ai #agents #generated #pl"
source_pattern: "Kilo"
---

## LongCat 2.0 jest darmowy w Kilo na ograniczony czas

**TLDR:** Owl Alpha, tajemniczy stealth model, który tygodniami wspinał się po rankingach OpenRoutera i Kilo, okazał się być LongCat-2.0 od Meituan, firmy znanej głównie z dostarczania jedzenia. Model jest teraz darmowy w Kilo bez limitów, na czas promocji.

**Summary:** Przez cały okres, gdy Owl Alpha działał anonimowo, internet zgadywał, skąd pochodzi: część twierdziła, że to najnowszy model GLM od Z.ai, inni byli pewni, że to wariant Kimi od MoonshotAI. Nikt nie zgadł, że to 1,6-bilionowy monster od firmy zamawiania jedzenia. Meituan twierdzi, że LongCat 2.0 to pierwszy na świecie bilionowy model, który przeszedł pełny trening i inferencję na krajowym klastrze 50 000 kart.

Architektura robi kilka sprytnych rzeczy, żeby ta skala była opłacalna. LSA sparse attention rozszerza długi kontekst bez typowego kwadratowego wybuchu kosztów, Zero-Compute Experts trzymają aktywację na token między 33 a 56 miliardami parametrów, a schemat routingu dzieli pracę na osobne grupy ekspertów Agent, Reasoning i Interaction, więc model nie marnuje cykli na ekspertów niezwiązanych z zadaniem. Meituan raportuje, że model bije referencyjnego Claude Opusa na IFEval (90,0 wobec 86,0) i IMO-AnswerBench (81,8 wobec 75,3), przegrywając za to na SWE-bench Pro (59,5 wobec 69,2).

Cena za milion tokenów to pułapka, bo to, ile faktycznie zapłacisz, zależy od tego, ile tokenów model zużywa, żeby skończyć zadanie: rozwlekłość, narzut rozumowania, powtórki. Licząc kosztem za zadanie w metryce Artificial Analysis, LongCat 2.0 wypada na 0,12 dolara za zadanie z Intelligence Index, podczas gdy najnowszy flagowy model DeepSeeka, V4 Pro 0813, kosztuje 0,25 dolara, ponad dwa razy więcej, przy tej samej klasie otwartych wag i podobnych ambicjach kontekstu na milion tokenów. Model jest dostępny na Hugging Face na czystej licencji MIT.

**Key takeaways:**
- LongCat 2.0 to 1,6-bilionowy model mixture-of-experts aktywujący około 48 miliardów parametrów na token, zbudowany pod agentyczne kodowanie.
- LSA sparse attention i Zero-Compute Experts pozwalają na długi kontekst bez kwadratowego wzrostu kosztów obliczeniowych.
- Kosztuje 0,12 dolara za zadanie w Artificial Analysis Intelligence Index, mniej niż połowę tego, co flagowy DeepSeek V4 Pro (0,25 dolara).
- Model jest dostępny na Hugging Face na licencji MIT i darmowy w Kilo na czas trwającej promocji.

**Why do I care:** Historia z Owl Alpha to dobra ilustracja tego, jak mało obecnie znaczy marka laba przy ślepym teście: model wygrywał, zanim ktokolwiek wiedział, kto go zbudował, i wciąż wygrywa po ujawnieniu producenta. Dla kogoś budującego agentyczne workflow kodowania koszt za ukończone zadanie, nie cena za token, jest metryką, którą warto śledzić, bo różnica w wydajności modelu w praktyce kumuluje się przy każdej turze, gdy agent przetwarza realny task. Warto też pamiętać, że model-agnostic setup, taki jak w Kilo, ma realną wartość właśnie w takich momentach: możesz wypróbować mocnego kandydata bez przepisywania konfiguracji edytora czy przełączania narzędzia.

**Link:** [LongCat 2.0 Is Free in Kilo for a Limited Time](https://blog.kilo.ai/p/longcat-20-is-free-in-kilo-for-a)
