---
title: "Kilo: test piramidy dla GPT-6.2 Astra i Sol oraz iteracja jako umiejętność, której nikt nas nie uczył"
excerpt: "Kilo porównuje Astrę i Sol na jednym dużym zadaniu 3D, a w drugim tekście przekonuje, że szybkość i jakość nie muszą się wykluczać, jeśli umie się zmniejszać zakres."
publishedAt: "2026-11-20"
slug: "kilo-gpt-62-astra-sol-test-piramidy-iteracja"
hashtags: "#kilo #ai #llm #agents #devtools #productivity #engineering #generated #pl"
source_pattern: "Kilo"
---

## GPT-6.2 Astra kontra Sol w Kilo: test wielkiej piramidy

**TLDR:** Kilo dało obu nowym modelom OpenAI ten sam duży prompt, czyli interaktywną scenę 3D z robotnikami budującymi piramidę i łodziami z kamieniami. Astra wygrała wyglądem, Sol jest prostszy, ale czytelniejszy w panelu.

**Summary:** Astra kosztuje 8 dolarów za milion tokenów wejściowych i 40 za wyjściowe, Sol 2 i 10. Cena Astry spadła o 20 procent względem poprzedniej wersji, z 60-procentowym rabatem na cache. Obie wersje są w ChatGPT Work i Codex oraz w API. Według OpenAI na FrontierCode 2.0 Sol traci do Astry tylko 0,5 punktu przy kosztach około pięć razy niższych.

W teście kolegi z Kilo, Mariusa Wichtnera, oba modele wybrały Three.js, Vite i TypeScript i oba zbudowały piramidę z 204 kamieni w ośmiu warstwach. Z bliska widać różnicę. Astra ma lepiej dopracowane sanie, liny i pomosty, a Sol rysuje prostszą scenę, ale pokazuje w panelu dokładnie, co robi każda ekipa. To jeden przebieg na model, więc autorzy sami nazywają to pierwszym wrażeniem. Radzą uruchomić każdy model co najmniej trzy razy i mierzyć czas oraz zużycie planu.

Kilo Desktop jest już ogólnie dostępny, a każde zadanie dostaje własną sesję w osobnym git worktree, więc dwa modele nie nadpisują sobie plików. Można zalogować się kontem ChatGPT i użyć wliczonego limitu Codex zamiast płacić za tokeny. Wspierane są też plany Business, a admin może ustawić limit na całą organizację.

**Key takeaways:**
- Sol na zwykłą pracę, Astra tam, gdzie liczy się jakość, jak 3D i długie projekty.
- Jeden przebieg to za mało na wniosek, trzeba powtarzać.
- Logowanie kontem ChatGPT nie daje Kilo dostępu do waszych rozmów.

**Why do I care:** Porównywanie modeli na własnych zadaniach w osobnych worktree to praktyka, którą warto przejąć niezależnie od narzędzia. Test piramidy mówi jednak więcej o marketingu niż o pracy zespołu. Moje zadania to refaktoryzacje i przeglądy kodu, a nie sceny 3D.

**Link:** [GPT-6.2 Astra vs. Sol in Kilo: The Great Pyramid Test](https://blog.kilo.ai/p/gpt-62-astra-vs-sol-in-kilo-the-great-pyramid)

## Iteracja jest umiejętnością, której większość z nas nie nauczono

**TLDR:** Autor uważa, że szybkość i jakość nie są w konflikcie, bo najszybsze zespoły tną zakres, a nie rogi. Proponuje pytanie "jaka jest godzinna wersja tego zadania?".

**Summary:** Inżynierowie uczą się rozbijać problem techniczny i planować architekturę, ale rzadziej pytają, jaka jest najmniejsza zmiana, która poprawi doświadczenie klienta. To dwa różne pytania. Pierwsze zakłada, że znamy stan końcowy, drugie wymusza myślenie o wartości.

Przykład to integracja dwóch aplikacji. Pełna wymaga uwierzytelniania, API, synchronizacji i testów, ale godzinną wersją może być zwykły link do właściwej strony w drugiej aplikacji. Klient ma łatwiej niż wczoraj, a nie obcięto żadnej jakości, tylko zakres. Autor zaznacza, że celem nie jest zmieszczenie się w godzinie, bo inżynierowie i tak źle szacują. Chodzi o to, żeby zauważyć, że istnieje dużo mniejsza wersja problemu.

Rozróżnia też iterację od rozwoju przyrostowego. Baza w poniedziałek, API we wtorek, frontend w środę i połączenie w czwartek to wciąż plan wykonywany po kawałku, bo do czwartku klient nic nie zobaczył i nic się nie nauczyliśmy. Iteracja to dostarczenie wartości, nauka z niej i dopiero decyzja, co dalej. Największa korzyść to odkrycie, że planowana funkcja nie była potrzebna. Mniejsze zmiany łatwiej też przeglądać, testować i debugować, więc jakość kodu często rośnie.

**Key takeaways:**
- Tnij zakres, nie jakość.
- Drobne PR-y bez dostarczenia wartości to nie iteracja.
- Zapytaj o godzinną wersję zadania, żeby wrócić do problemu klienta.

**Why do I care:** Moja ocena jest taka, że to dobra rada, której zespoły nie stosują, bo kusi je specyfikacja uzgodniona z góry. Z agentami AI problem się nasila, bo łatwo wygenerować całą integrację, zanim ktokolwiek sprawdzi, czy link by nie wystarczył. Autor pomija koszt kontekstu w dużych firmach, gdzie wypuszczenie "linka" wymaga trzech zatwierdzeń.

**Link:** [Iteration Is a Skill. Most of Us Never Learned It.](https://blog.kilo.ai/p/iteration-is-a-skill-most-of-us-never)
