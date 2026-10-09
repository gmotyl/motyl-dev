---
title: "Claude Haiku 5.5 o 75 procent taniej, Mistral Large 4 i Surface Laptop Ultra"
excerpt: "Anthropic obniża ceny małego modelu, Mistral wypuszcza model z bilionem parametrów, a Microsoft dodaje kontenery do izolowania agentów w Windows 11."
publishedAt: "2026-10-09"
slug: "claude-haiku-5-5-mistral-large-4-surface-laptop-ultra"
hashtags: "#theaibreak #ai #llm #agents #security #open-source #generated #pl"
source_pattern: "The AI Break"
---

## Claude Haiku 5.5 kosztuje dziesięć centów za milion tokenów wejścia

**TLDR:** Anthropic wypuściło Haiku 5.5 z ceną 0,10 dolara za milion tokenów wejścia, co daje obniżkę o około 75 procent. To najtańszy model w rodzinie.

**Summary:** Newsletter podaje tylko nagłówek, ale inne źródła tego samego dnia dodają szczegóły. Model ma kontekst miliona tokenów i do 128 tysięcy tokenów odpowiedzi, a cena wyjścia to 0,50 dolara za milion. Anthropic pozycjonuje go do zadań o dużej skali, jak streszczanie, klasyfikacja, wsparcie na żywo, praca w przeglądarce i rola pod-agenta do kodowania obok Opusa i Sonneta.

Trzeba uważać na liczby. Niezależne pomiary pokazują, że cena rośnie pięciokrotnie powyżej stu tysięcy tokenów kontekstu, a model często myśli dłużej, więc koszt na zadanie bywa wyższy niż w Haiku 4.5. Cena za token to nie cena za zadanie i to jest główny błąd w czytaniu takich nagłówków.

**Key takeaways:**
- Haiku 5.5 kosztuje 0,10 dolara za milion tokenów wejścia.
- Powyżej 100 tysięcy tokenów kontekstu cena rośnie pięciokrotnie.
- Koszt na zadanie zależy od liczby kroków rozumowania, nie tylko od ceny tokenu.

**Why do I care:** Tanie małe modele to idealni kandydaci na warstwę routingu i klasyfikacji w aplikacji, przed droższym modelem. Ale policz koszt na zadanie, nie na token, na własnych danych. Nagłówek o 75 procentach nic nie mówi o twoim rachunku.

**Link:** [Claude Just Got 75% Cheaper!, The AI Break](https://theaibreak.substack.com/p/claude-just-got-75-cheaper)

## Mistral Large 4 z bilionem parametrów w podglądzie API

**TLDR:** Mistral otworzył publiczny podgląd API dla Large 4, modelu o bilionie parametrów. Wagi mają trafić do otwartego dostępu pod koniec miesiąca.

**Summary:** Według dyskusji w społeczności model to rzadka architektura mixture of experts z bilionem parametrów łącznie i 49 miliardami aktywnych. Jeśli wagi faktycznie się ukażą, będzie to duży ruch europejskiego laboratorium w wyścigu modeli otwartych, którym do tej pory rządziły głównie chińskie firmy.

Komentatorzy od razu wskazują praktyczny problem. Bilion parametrów w modelu otwartym oznacza klaster, nie laptop. Jeden z testujących stwierdził, że w analizie kodu, klasyfikacji obrazów i szachach model wypada przeciętnie i zbliża się do wyniku Mistral Large 2 z listopada 2024. To pojedyncza opinia, ale warto ją zapamiętać przed fascynacją skalą.

**Key takeaways:**
- Large 4 jest dostępny w publicznym podglądzie API.
- Wagi otwarte mają się pojawić pod koniec miesiąca.
- Rozmiar bilionowy wyklucza samodzielny hosting dla większości zespołów.

**Why do I care:** Model otwarty, którego nie uruchomisz u siebie, jest otwarty głównie w nazwie. Dla firm z wymogami co do lokalizacji danych sensownym kandydatem będą mniejsze modele, a duże pojadą przez dostawcę hostingu.

**Link:** [Claude Just Got 75% Cheaper!, The AI Break](https://theaibreak.substack.com/p/claude-just-got-75-cheaper)

## Surface Laptop Ultra z chipem Nvidia i kontenerami dla agentów

**TLDR:** Microsoft pokazał Surface Laptop Ultra z chipem Nvidia RTX Spark od 2600 dolarów. Windows 11 dostaje Execution Containers do piaskownicowania agentów AI.

**Summary:** Sprzęt jest celowany w lokalne uruchamianie modeli. Ciekawsza dla mnie jest druga informacja, czyli kontenery wykonawcze w Windows 11, które mają izolować agentów. Skoro systemy operacyjne zaczynają dostarczać sandbox jako funkcję standardową, to znaczy, że agenci działający na maszynie użytkownika przestali być ciekawostką.

Tego samego dnia Microsoft opublikował na otwartym kodzie mxc, międzyplatformowy sandbox, o czym piszą inne źródła. Kierunek jest czytelny. Izolacja agentów ma być częścią platformy, nie dodatkiem.

**Key takeaways:**
- Surface Laptop Ultra z RTX Spark kosztuje od 2600 dolarów.
- Windows 11 dostaje Execution Containers do izolowania agentów.

**Why do I care:** Jeśli twoje narzędzie deweloperskie pozwala agentowi odpalać polecenia, sandbox przestaje być opcjonalny. Sprawdź, co dziś może zrobić twój agent z domyślnymi uprawnieniami, zanim zrobi to za ciebie pomyłka.

**Link:** [Claude Just Got 75% Cheaper!, The AI Break](https://theaibreak.substack.com/p/claude-just-got-75-cheaper)
