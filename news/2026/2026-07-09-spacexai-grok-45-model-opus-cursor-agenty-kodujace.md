---
title: "SpaceXAI wypuszcza Grok 4.5 – model klasy Opus po przejęciu Cursora"
excerpt: "xAI i Cursor wspólnie trenowali Grok 4.5, pierwszą flagową odpowiedź SpaceXAI na rynek agentów kodujących. Model oferuje zbliżoną jakość do Opus 4.8 przy znacznie niższych kosztach i większej szybkości."
publishedAt: "2026-07-09"
slug: "spacexai-grok-45-model-opus-cursor-agenty-kodujace"
hashtags: "#ai #ml #llm #technology #grok #xai #cursor #agenty #modele #pl"
source_pattern: "AINews"
---

## SpaceXAI i Cursor wspólnie trenują Grok 4.5 – pierwszy model flagowy nowej generacji

**TLDR:** xAI wypuściło Grok 4.5, model 1,5 biliona parametrów stworzony specjalnie pod kątem kodowania i agentów. Powstał we współpracy z Cursorem i jest pozycjonowany jako Opus-class, ale szybszy i tańszy. GPT-5.6 ma wyjść już jutro, więc timing jest celowy.

**Podsumowanie:**

Grok 4.5 pojawił się na rynku 8 lipca 2026 roku, czyli dzień przed potwierdzonym startem GPT-5.6. Zbieżność dat raczej nie jest przypadkowa – xAI wybrało moment, kiedy uwaga branży skupia się na porównaniach, i wprost zanegowało narrację "najlepszy we wszystkim" na rzecz propozycji wartości opartej na stosunku jakości do ceny.

Model ma 1,5 biliona parametrów, co według Artificial Analysis stanowi trzykrotny wzrost względem Grok 4.3. To nie jest mały skok. W praktyce oznacza wejście xAI do segmentu, w którym wcześniej walczyły wyłącznie Anthropic i OpenAI. Elon Musk porównał Grok 4.5 do Opus 4.7, ale szybszego i bardziej ekonomicznego. Framing "dla inżynierów Tesli i SpaceX" to oczywiście PR, ale jednocześnie wskazuje na konkretny przypadek użycia: długie sesje agentyczne, gdzie koszty tokenów naprawdę mają znaczenie.

Współpraca z Cursorem idzie dalej niż tylko integracja API. Cursor trenował ten model razem z xAI, co oznacza, że dane z sesji kodowania najprawdopodobniej trafiły do procesu treningowego. Dla użytkowników Cursora jest to informacja dwuznaczna: z jednej strony model rozumie workflow IDE, z drugiej – pytanie o prywatność kodu pozostaje otwarte, bo żadna ze stron nie ujawniła szczegółów dotyczących danych treningowych.

Cenowo Grok 4.5 wychodzi na $2 za milion tokenów wejściowych i $6 za wyjściowe, przy 75% rabacie na cache hity. Dla porównania GPT-5.6 kosztuje $5/$30, a Opus 4.8 $5/$25. Przy podobnej jakości to poważna różnica dla zastosowań agentycznych, gdzie modele generują miliony tokenów na sesję. Artificial Analysis policzył koszt per zadanie w Coding Agent Index na $2,59, wobec $7+ u konkurencji.

Zewnętrzne benchmarki plasują Grok 4.5 na czwartym miejscu Intelligence Index Artificial Analysis z wynikiem 54 punktów, za Fable 5, GPT-5.5 i Opus 4.8. Na τ³-Banking model zajął pierwsze miejsce z wynikiem 33%, wyprzedzając GPT-5.5 o dwa punkty. Co równie istotne: średnia liczba tokenów wyjściowych na zadanie Intelligence Index wynosi 14 tys., ponad 60% mniej niż u Opus 4.8. Model jest po prostu bardziej zwięzły, co przy stawkach per token bezpośrednio przekłada się na rachunek.

**Główne wnioski:**
- Grok 4.5 to 1,5T parametrów, trzykrotny wzrost względem Grok 4.3
- Cennik: $2/$6 na milion tokenów (input/output), cache hits -75%
- Okno kontekstu 500k tokenów (Musk zapowiedział powrót do 1M "w przyszłym tygodniu")
- Miejsce #4 w Intelligence Index Artificial Analysis, wynik 54
- Pierwsze miejsce na τ³-Banking (33%)
- Koszt na zadanie agentyczne ~3-4x niższy niż GPT-5.5 czy Claude Code
- Day-0 support w Hermes Agent, OpenRouter, Grok API i Cursor

**Dlaczego mnie to obchodzi:**

Z perspektywy architekta budującego systemy z agentami, stosunek ceny do jakości ma bezpośrednie przełożenie na to, co w ogóle można zbudować opłacalnie. Grok 4.5 przesuwa granicę wykonalności dla aplikacji, które wymagają wielu iteracji modelu – pipeline'y weryfikacji kodu, systemy z wieloma agentami, automatyczne code review. Jeśli jakość rzeczywiście zbliża się do Opus przy jednej trzeciej ceny, to dla wielu zastosowań architektonicznych rozmowa o wyborze modelu zaczyna się od Groka, nie od Anthropic czy OpenAI. Pytanie o prywatność danych i brak transparentności dotyczącej procesu treningowego to jednak realne obawy dla firm, które nie chcą, żeby ich kod trafiał do xAI.

**Link:** [AINews: SpaceXAI launches Grok 4.5, first Opus-class model post Cursor acquisition](https://www.latent.space/p/ainews-spacexai-launches-grok-45?publication_id=1084089&post_id=206247062&isFreemail=true&triedRedirect=true)
