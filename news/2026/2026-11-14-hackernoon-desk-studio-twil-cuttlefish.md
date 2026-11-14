---
title: "Desk Studio, TwIL-8B i Cuttlefish.MD: agenci AI w projektowaniu, modelach i bibliotekach"
excerpt: "Trzy teksty z HackerNoon o studiu projektowym dla agentów, modelu matematycznym webAI i bibliotece skilli dla agentów programistycznych."
publishedAt: "2026-11-14"
slug: "hackernoon-desk-studio-twil-cuttlefish"
source_pattern: "HackerNoon"
hashtags: "#HackerNoon #ai #agents #devtools #design #frontend #llm #generated #pl"
---

## Desk Studio: 42 biurka w agencie programistycznym

**TLDR:** Desk Studio rozdziela pracę nad projektem graficznym na role: szkice, wybór przez dyrektora artystycznego, poprawki przez tańsze modele, sprawdzenie pikseli przez skrypt i akceptację przez dyrektora kreatywnego. Autor podaje, że gotowa karta launchowa kosztowała 1,34 dolara.

**Summary:** Autor miał dość tego, że zwykła prośba w rodzaju "powiększ nagłówek" dawała zupełnie nowy projekt. Desk Studio dzieli zadanie na trzy poziomy modeli. Dyrektorzy, czyli trzy biurka na modelu Opus, wybierają kierunek i akceptują wynik. Seniorzy, czyli siedemnaście biurek na Sonnet, tworzą szkice i research. Budowniczowie, czyli dwadzieścia jeden biurek na Haiku, wykonują kolejne poprawki. Skrypt renderuje plik w Chrome i sprawdza kontrast, przepełnienia i zgodność z marką, bez udziału modelu. Plik przechodzi, gdy każda z ośmiu ocen ma co najmniej 8, a średnia wynosi co najmniej 8,5. W przykładzie trzecia runda dała 8,9, ale zatrzymała się na oryginalności ocenionej na 6 w innym przebiegu, więc autor pokazuje też przypadki niezaliczone.

**Key takeaways:**
- Rozdzielenie wyboru i poprawek sprawia, że każda runda dotyczy jednej projektu.
- Sprawdzanie pikseli skryptem jest tanie i powtarzalne, więc modele mogą skupić się na ocenie estetycznej.
- Koszty podzielono wyraźnie: większość poszła na decyzje, a poprawki kosztowały mało.

**Dlaczego mnie to obchodzi:** Jako frontendowiec doceniam pomysł, żeby kontrole techniczne oddać skryptowi. Nie wiem jednak, czy oceny z modeli recenzentów będą wiarygodne poza własnym projektem, a autor sam to przyznaje.

**Link:** [I Put a 42-Desk Design Studio Inside My Coding Agent](https://hackernoon.com/i-put-a-42-desk-design-studio-inside-my-coding-agent)

## TwIL-8B: model do matematyki, kodu i instrukcji

**TLDR:** TwIL-8B to model z 8,79 mld parametrów, dostrojony z bazy IBM Granite 4.2 8B pod zadania matematyczne, kodowanie i wykonywanie instrukcji. Ma wariant zrównoważony i rozbudowany. Licencja to niekomercyjna licencja webAI.

**Summary:** Model dostaje 131 072 tokeny kontekstu i działa w języku angielskim. Autorzy podają wyniki, w których wyprzedza Qwen3.5-9B na MATH-500 i LiveCodeBench, ale przegrywa w wiedzy ogólnej, na przykład w GPQA Diamond, gdzie wynosi 70,2. Część wyników, w tym LiveCodeBench i IFBench, mierzono na wariancie rozbudowanym, a nie zrównoważonym. Porównania pochodzą z publikacji konkurentów, a nie z własnych powtórzeń. Opis licencji wskazuje, że model jest niekomercyjny, a baza ma licencję Apache 2.0.

**Key takeaways:**
- Model jest mocny w matematyce i kodzie, a słabszy w wiedzy ogólnej.
- Wyniki nie zawsze dotyczą wariantu, który ktoś uruchomi domyślnie.
- Licencja niekomercyjna wyklucza użycie w produkcie płatnym.

**Dlaczego mnie to obchodzi:** Jako architekt zwracam uwagę na licencję, bo to ona decyduje o możliwości wdrożenia. Dla zadań związanych z matematyką w narzędziach dla programistów model może być ciekawy, ale wyniki warto sprawdzić na własnym zestawie testów.

**Link:** [Meet TwIL-8B, webAI's AI Model for Math, Coding, and Reasoning](https://hackernoon.com/meet-twil-8b-webais-ai-model-for-math-coding-and-reasoning)

## Cuttlefish.MD: biblioteka skilli dla agentów

**TLDR:** Cuttlefish.MD to biblioteka plików SKILL.md, z których większość jest dostępna do instalacji w dziewięciu wtyczkach. Każdy skill ma licencję sprawdzoną osobno, a skille bez licencji zostają tylko jako linki do autorów.

**Summary:** Repozytorium hackernoon/cuttlefish-agent-skills zawiera 2 806 skilli, które można zainstalować w Claude Code, a w innych agentach skopiować do katalogu skilli. Każdy skill ma autora, źródło, commit i licencję zapisane w pliku katalogu. Skille z licencjami MIT, Apache 2.0, BSD lub CC-BY są kopiowane bez zmian, a pozostałe pozostają na stronie HackerNoon jako odnośniki. Autor tekstu wymienia kategorie, na przykład development, pisanie, bezpieczeństwo i testy, oraz dwadzieścia jeden skilli wartych wypróbowania. Zaznacza też, że licencja nie jest audytem bezpieczeństwa, dlatego warto przeczytać skill przed użyciem albo uruchomić skill-scanner od Sentry.

**Key takeaways:**
- Licencja każdego skilla sprawdzana jest osobno, a nie na poziomie repozytorium.
- Skill to instrukcja z uprawnieniami agenta, więc przed instalacją trzeba go przeczytać.
- Agent ładuje z początku tylko nazwy i opisy skilli, więc biblioteka nie zapycha kontekstu.

**Dlaczego mnie to obchodzi:** Z zasady nie instaluję skilli, których nie przeczytałem. Biblioteka jest wygodna, ale działa jak zewnętrzny kod z dostępem do narzędzi. Najpierw przejrzałbym wybrane skille, a dopiero potem dodał cały plugin.

**Link:** [Cuttlefish.MD Skills Library](https://hackernoon.com/cuttlefishmd-skills-library-puts-2806-license-checked-agent-skills-to-work)
