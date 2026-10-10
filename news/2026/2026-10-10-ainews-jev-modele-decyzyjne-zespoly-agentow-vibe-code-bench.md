---
title: "TypeSafe Jev z 100 mln dolarów ARR, modele decyzyjne jako nowa kategoria i drużyny agentów"
excerpt: "AINews: wyścig klonów Jev, dynamiczne workflow w Claude Managed Agents, test zespołów agentów na Vibe Code Bench i nowe modele otwarte."
publishedAt: "2026-10-10"
slug: "ainews-jev-modele-decyzyjne-zespoly-agentow-vibe-code-bench"
hashtags: "#ainews #latentspace #ai #llm #agents #ml #generated #pl"
source_pattern: "AINews"
---

## Modele decyzyjne stają się kategorią produktu

**TLDR:** Kilku dostawców wypuściło w tym samym czasie modele "decyzyjne", które zwracają typowane odpowiedzi w jednym przebiegu zamiast swobodnego tekstu. Jev jest punktem odniesienia, a TypeSafe ma według przecieku z Sequoia przekroczyć 100 mln dolarów ARR.

**Summary:** Newsletter otwiera uwaga, że wszyscy sklonowali API Jev, ale kategorię może stworzyć tylko jedna firma. TypeSafe ogłosiło rundę "Series AI", a Sequoia ujawniło, że firma przekroczyła 100 mln dolarów rocznego przychodu w pierwszym tygodniu. Autorzy odnotowują też oskarżenia o astroturfing.

Lista konkurentów jest długa. OpenAI Decisions API przyjmuje trzy typy zapytań: prawdopodobieństwo spełnienia warunku, wybór z listy i ocena względem poziomów. Działa na GPT-6 Luna, kosztuje 0,10 dolara za milion tokenów wejściowych, nie ma opłaty za wyjście, a szybkość "do 10 razy" to deklaracja samego OpenAI. Perplexity twierdzi, że jego model uzyskał 94,5 procent na Decision Bench przy 1071 przypadkach. Cloudflare ma clef, w tym wariant omni przyjmujący audio, wideo, obraz i tekst, oraz clef-flash tańszy od Jev. Microsoft pozycjonuje swój model dla sędziów LLM, ale wczesny ewaluator zauważa problemy ze spójnością. LangSmith używa Jev jako sędziego zwracającego osobne odpowiedzi o trudności i poprawności każdego śladu. Unsloth wypuścił notebook, który zamienia Qwen3.5-4B w model decyzyjny na 8 GB VRAM.

Uzasadnienie jest rozsądne: wiele kroków agenta to tak lub nie, a nie generowanie. LangChain podaje, że kierowanie każdego zadania do najtańszego wystarczającego modelu obniżyło medianę kosztu zadania Open SWE o 64 procent.

## Agenci: orkiestracja i test zespołów

**TLDR:** Claude Managed Agents dostały dynamiczne workflow z flotą do 1000 agentów, ale test Vals AI pokazuje, że zespoły agentów rzadko się opłacają.

**Summary:** Agent prowadzący pisze fazowy plan, rozdziela go na maksymalnie tysiąc agentów na uruchomienie i scala wyniki. Anthropic radzi zaczynać od wąskich zadań, bo zużycie tokenów bywa wysokie. Vals AI sprawdził GPT-6 Sol i Opus 5.5 na Vibe Code Bench, solo i w zespołach. Zespoły kosztowały 1,8 do 5,1 raza więcej, a istotną poprawę, o 7,3 punktu, dał tylko Sol na średnim wysiłku. Sol delegował równolegle według granic architektury, a Opus pracował falami sekwencyjnymi, średnio około 6,8 podagentów i około 1140 wywołań narzędzi na aplikację, bez znaczącego zysku. Prime Intellect pokazał rój ponad 2000 agentów, który przepisał Prime Agent na Rusta, z wejściem użytecznym około 13 razy szybciej i 83 procent mniejszym zużyciem pamięci na starcie.

**Key takeaways:**
- Modele decyzyjne zastępują generowanie tam, gdzie krok agenta to wybór.
- Zespoły agentów kosztują wielokrotnie więcej, a zysk jest rzadki.
- Deklaracje szybkości i dokładności pochodzą głównie od samych dostawców.

**Why do I care:** Jeśli twój agent ma dziesięć kroków i osiem z nich to klasyfikacja, to w tym kierunku warto iść już teraz, bo oszczędność jest realna. Z drugiej strony cała kategoria ma jeden problem: benchmarki Decision Bench i podobne są młode, a spójność, na którą narzekał pierwszy ewaluator, to dokładnie to, co w produkcji boli. Autorzy newslettera, jak zwykle, zbierają wypowiedzi z Twittera bez weryfikacji, więc przeciek o 100 mln ARR traktuję ostrożnie.

**Link:** [AINews: TypeSafe/Jev at >$100M ARR, $7.5B valuation 3 weeks after launch](https://www.latent.space/p/ainews-typesafejev-at-100m-arr-75b)
