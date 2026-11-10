---
title: "AINews: Fable 5.2 wraca na pierwsze miejsce, a roadshow IPO Anthropic rusza"
excerpt: "Anthropic wypuścił Claude Fable 5.2 i Mythos 5.2 z tańszym tokenem, ale większym kosztem na zadanie. Oto wyniki niezależnych testów, anomalia poziomów wysiłku i ograniczenia subskrypcji."
publishedAt: "2026-11-10"
slug: "ainews-fable-5-2-wyniki-koszty-roadshow-ipo"
hashtags: "#ainews #ai #llm #agents #ml #generated #pl"
source_pattern: "AINews"
---

## Claude Fable 5.2 i Mythos 5.2: wyniki, koszty i ograniczenia

**TLDR:** Fable 5.2 odzyskał pierwsze miejsce w rankingach po Gemini 4 Carbon, mając o dwadzieścia procent niższą cenę za token, ale zużywa więcej tokenów, więc koszt zadania wzrósł. Wysoki poziom wysiłku wypada często lepiej niż maksymalny.

**Summary:** Premiera zbiegła się z początkiem roadshow IPO Anthropic. Anthropic twierdzi, że modele są o stopień wyżej od Opus 5.5 prawie we wszystkich ocenianych zdolnościach. Cena to osiem i czterdzieści dolarów za milion tokenów wejścia i wyjścia, wobec dziesięciu i pięćdziesięciu dla Fable 5.1. Domyślnym poziomem wysiłku w aplikacjach i Claude Code jest medium.

Niezależne testy potwierdzają przewagę. W indeksie Artificial Analysis Fable 5.2 ma 65 punktów, Gemini 4 Carbon 60, Opus 5.5 59, a GPT-6 Astra 57. Rekordy padły w kilku testach, między innymi HLE-Diamond z wynikiem osiemdziesiąt procent. Słabsze miejsca to Terminal-Bench 4.0, gdzie model ma sześćdziesiąt procent i przegrywa z kilkoma konkurentami. Na GDPx od SemiAnalysis jest pierwszy z wynikiem 16,4 procent, ale koszt zadania wzrósł z 67,16 do 88,15 dolara, czyli o trzydzieści jeden procent mimo tańszego tokena. Logi pokazują, że Fable pisze setki albo tysiące przypadków testowych tam, gdzie poprzednicy kończyli na dwudziestu, i uruchamia subagentów do niezależnej weryfikacji.

Dziwny jest wątek wysiłku. Kilka testów, w tym Vals i widok kodowy Artificial Analysis, pokazuje, że xhigh i max wypadają gorzej od high, a tylko modele Fable mają taki spadek. Dyskusja w sieci ma też wątek kosztowy. Według jednej analizy subskrypcja za dwieście dolarów daje około piętnastu tysięcy dolarów wartości Opusa 5.5 miesięcznie, ale tylko około trzech tysięcy Fable 5.2, a Fable może zużyć tylko połowę tygodniowego limitu. Model wymaga domyślnie retencji danych, żeby działały klasyfikatory bezpieczeństwa, a zerowa retencja jest dla wybranych klientów firmowych. Anthropic celowo ograniczył też zdolności związane z samodoskonaleniem AI, a najpotężniejszy model pozostaje według system card wewnętrzny.

Czego brakuje? Liczby pochodzą głównie od dostawcy i kilku niezależnych firm, które same zarabiają na mierzeniu modeli. Nikt nie pokazuje wyników dla zwykłych zespołów, które nie mają tysiąca subagentów.

**Key takeaways:**
- Tańszy token nie znaczy tańszego zadania, bo model sprawdza własną pracę setkami testów.
- Wysoki poziom wysiłku często dorównuje maksymalnemu przy mniejszym koszcie.
- Fable zjada limity subskrypcji i wymaga retencji danych, co ogranicza zastosowania w firmach.

**Why do I care:** Zanim przełączysz zespół na nowy model, zmierz koszt na zadanie na własnym repozytorium i zacznij od domyślnego wysiłku. Zaufaj własnym testom bardziej niż tabeli z premiery.

**Link:** [Fable 5.2 retakes World #1 LLM spot as $ANT IPO roadshow begins](https://www.latent.space/)
