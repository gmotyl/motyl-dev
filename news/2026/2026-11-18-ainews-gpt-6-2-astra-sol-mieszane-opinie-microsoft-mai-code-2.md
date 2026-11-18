---
title: "AINews: GPT-6.2 Astra i Sol, mieszane opinie testerów i modele MAI Code 2 od Microsoftu"
excerpt: "OpenAI wypuściło GPT-6.2 Astra i Sol, które są znacznie tańsze od konkurencji, ale influencerzy ostro się o nie pokłócili, a Microsoft pokazał własne modele do kodowania."
publishedAt: "2026-11-18"
slug: "ainews-gpt-6-2-astra-sol-mieszane-opinie-microsoft-mai-code-2"
hashtags: "#latent #ai #llm #agents #openai #microsoft #github-copilot #performance #generated #pl"
source_pattern: "Latent Space"
---

## GPT-6.2 Astra i Sol: tańsze, ale z mieszanymi recenzjami

**TLDR:** OpenAI wypuściło dwa modele, GPT-6.2 Astra i Sol, dwa dni przed spodziewanym pierwszym dniem notowań Anthropic na giełdzie. Według Artificial Analysis Sol dorównuje wrześniowej Astrze przy około 15 procentach kosztu na zadanie.

**Summary:** Nowa Astra dostaje 62 punkty w Intelligence Index, czyli niewiele mniej niż Fable 5.2 z wynikiem 65. Autorzy newslettera podsumowują to tak: Anthropic nadal ma najlepszy model świata, ale OpenAI ma modele najbardziej efektywne pod względem inteligencji na dolara. Modele są dostępne w ChatGPT Work i Codex oraz przez API. Astra kosztuje osiem dolarów za milion tokenów wejściowych i czterdzieści za wyjściowe, a Sol zachowuje ceny poprzednika, czyli dwa i dziesięć dolarów. Oba mają milion tokenów kontekstu.

Wyniki benchmarków wyglądają dobrze. W teście OpenWorldEngineer od Mercor Astra ma 67,2 procent, Fable 5.2 ma 54,6, a poprzedni GPT-6 Astra 44,2. W wielotur­owym Vibe Code Bench Astra była pierwsza, a Sol trzeci. Epoch zweryfikował siedem rozwiązań w Lean na sześćdziesięciu ośmiu problemach FrontierMath Erdős, a poprzedni rekord to trzy. Osobna ciekawostka: OpenAI uznało Astrę za model o wysokim poziomie ryzyka w kategorii samodoskonalenia AI, pierwszy raz dla modelu udostępnianego publicznie.

Jest też druga strona. Reakcje influencerów są wyjątkowo negatywne. Matt Shumer nazwał modele praktycznie bezużytecznymi po tygodniach testów, a jego agenci na Opusie i Fable odrzucali dużą część pracy subagentów Astry. Pietro Schirano winił za część problemów samą uprząż, czyli harness. Autorzy newslettera uważają, że część krytyki to zwykłe przesadzanie w obie strony, ale przyznają, że artefakty po uczeniu ze wzmocnieniem są zauważalne i czasem dziwaczne. Mimo to sami używają modelu do automatyzacji pracy.

Reszta wydania dotyczy infrastruktury agentów. Microsoft na Ignite pokazał MAI Code 2 do wieloetapowego kodowania i MAI Code 2 Flash do szybkich edycji, dostępne w GitHub Copilot, Copilot Fusion i Foundry. Fusion ma według Microsoftu 71,2 procent w Terminal-Bench 4.1 przy koszcie niższym o 88 procent niż Fable 5.2. Baseten zmierzył nawet 4,4-krotną różnicę kosztu na zdany test między 22 harnessami. Hugging Face opisał przebieg z tysiącem agentów, w którym naraz model woła tylko 40 do 60 z nich, bo reszta czeka na scalanie i testy. SemiAnalysis podaje, że 1,8 procent niecache'owanych zapytań odpowiadało za około 15 procent wydatków.

Na marginesie: NVIDIA pierwszy raz po zmianie CEO pokazała 115,8 mld dolarów kwartalnego przychodu, a zarząd zapowiedział, że nie zamierza przywracać Jensena Huanga. Isomorphic Labs zebrało 5 mld dolarów, a Genesis AI 500 mln.

**Key takeaways:**
- Sol to nowy kandydat na konia roboczego, bo daje jakość poprzedniej Astry za ułamek ceny.
- Ranking po cenie za zadanie, a nie za token, zmienia wnioski o opłacalności modeli.
- Koszt agenta zależy od harnessa, rozrzut sięga ponad czterokrotności.
- Przy tysiącu agentów wąskim gardłem jest koordynacja, a nie model.

**Why do I care:** Dla mnie to przypomnienie, że wybór modelu to dziś decyzja budżetowa i architektoniczna, a nie fanowska. Jeśli wasze agenty chodzą na jednym drogim modelu, warto zmierzyć na własnych zadaniach, czy Sol nie załatwia sprawy za dziesiątą część ceny. Entuzjazm i hejt w sieci są równie mało użyteczne, liczy się prywatny zestaw ewaluacji. I uwaga na to, co autorzy przemilczają: wyniki z benchmarków publikuje głównie sam producent.

**Link:** [AINews: GPT-6.2 Astra, the #2 Frontier Model is better and 20%-600% cheaper](https://lspace.beehiiv.com/p/ainews-gpt-6-2-astra-the-2-frontier-model-is-better-and-20-600-cheaper-but-has-mixed-reviews-6-2-sol)
