---
title: "Bending Spoons obniżyło koszt AI na pull request o połowę dzięki mieszance modeli"
excerpt: "Więcej niż czterokrotnie więcej PR-ów na inżyniera przy połowie kosztu inferencji na PR: open-weight do rutyny, zamknięte modele do trudnych zadań."
publishedAt: "2026-11-25"
slug: "kilo-bending-spoons-koszt-pr-mieszanka-modeli"
hashtags: "#kilo #ai #llm #agents #devtools #productivity #generated #pl"
source_pattern: "Kilo"
---

## Bending Spoons i stos modeli za połową kosztu

**TLDR:** Według raportu kwartalnego z 19 listopada Bending Spoons dostarcza ponad czterokrotnie więcej pull requestów na inżyniera niż w styczniu, płacąc za inferencję na PR około połowy. Przepis to modele open-weight do większości zadań, zamknięte do najtrudniejszych i własny harness niezależny od dostawcy.

**Summary:** Bending Spoons przejmuje firmy programistyczne, przebudowuje ich zespoły i technologię własnymi ludźmi. Firma ma własny harness AI zbudowany na komponentach open source, a dla każdego zadania wybiera model, równoważąc jakość i koszt. Większość zadań trafia do samodzielnie hostowanych modeli open-weight, a najtrudniejsze i najbardziej ryzykowne do droższych modeli zamkniętych, które dodatkowo nadzorują słabsze. Od początku 2026 roku liczba PR-ów na inżyniera wzrosła ponad czterokrotnie, koszt inferencji na PR spadł o około 50 procent, a względem szczytu z połowy roku o ponad 90 procent.

Autorzy Kilo liczą, że wydatek na inżyniera wzrósł co najmniej dwukrotnie: to koszt jednostki pracy spadł, nie rachunek. Z wykresu tygodniowego wynika, że szacowany koszt na PR wzrósł do około 7,5 razy wartości z pierwszego tygodnia w okresie intensywnego użycia modeli zamkniętych przez API, a po przejściu na modele open-weight spadł do około 0,5. Sam autor zastrzega, że obie linie liczono inaczej: wcześniejsza to szacunek na podstawie cen tokenów, późniejsza to rzeczywisty koszt GPU.

Uzasadnienie jest proste: większość pracy nie wymaga modelu z czołówki, a mocny model sprawdzający wynik słabszego wyłapuje błędy, zanim zobaczy je człowiek. Dochodzi unikanie uzależnienia od dostawcy, a dla europejskich zespołów także kontrola nad tym, gdzie trafiają kod i prompty. Dalsza część tekstu reklamuje Kilo: router Auto Model, benchmark KiloBench i politykę dostawców w wersji Enterprise. Wskazówki do skopiowania są rozsądne: domyślnie tańszy model, zamknięty do trudnych spraw i review, mierzenie kosztu na PR zamiast ceny za token oraz wymienialna warstwa modeli.

**Key takeaways:**
- Ponad 4x więcej PR-ów na inżyniera od stycznia.
- Koszt inferencji na PR spadł o około połowę, o ponad 90% względem szczytu.
- Wydatek na inżyniera i tak wzrósł co najmniej dwukrotnie.
- Dwie linie kosztu mierzono różnie: szacunek API kontra rzeczywisty koszt GPU.
- Mierz koszt na PR, nie cenę za token.

**Why do I care:** Mierzenie kosztu na PR jest sensowną metryką, ale zaznaczam, że liczba PR-ów nie mówi nic o ich jakości ani o czasie review. Źródłem jest blog sprzedawcy narzędzia i cytat z raportu spółki, więc nie traktowałbym 4x jako wyniku do powtórzenia u siebie. Pomysł na router po trudności zadania jest jednak wart małego eksperymentu na własnych zadaniach.

**Link:** [Bending Spoons cut AI cost per PR in half](https://blog.kilo.ai/p/bending-spoons-cut-ai-cost-per-pr)
