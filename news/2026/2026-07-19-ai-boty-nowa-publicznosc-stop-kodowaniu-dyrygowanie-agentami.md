---
title: "AI boty jako nowa publiczność: stop kodowaniu, czas na dyrygowanie agentami"
excerpt: "Dwa artykuły o tym, jak AI zmienia rolę inżyniera i wydawcy treści w 2026 roku."
publishedAt: "2026-07-19"
slug: "ai-boty-nowa-publicznosc-stop-kodowaniu-dyrygowanie-agentami"
hashtags: "#hackernoon #tech #programming #ai #software-engineering #publishing #analytics #generated #pl"
source_pattern: "HackerNoon"
---

## Stop Coding, Start Directing: The Paradigm Shift for Every Software Engineer

**TLDR:** Artykuł opisuje fundamentalną zmianę mentalną, przez którą musi przejść każdy inżynier oprogramowania w erze agentów AI. Nie chodzi o to, żeby pisać mniej kodu, ale żeby przestać myśleć o sobie jako o osobie piszącej kod, a zacząć myśleć jak dyrektor, który kieruje agentami. Autor, David Lozzi, senior architect z ponad dekadą doświadczenia, twierdzi, że ta zmiana nie oznacza lenistwa ani utraty umiejętności.

**Summary:**

David Lozzi zaczyna od nostalgii. Opisuje swoją drogę od VBA w MS Access w późnych latach 90. przez JavaScript, C#, .Net, ReactJS aż do dziś, kiedy od 9 miesięcy nie napisał ani jednej linii kodu samodzielnie. Wszystko idzie przez agenta. Dla kogoś, kto kochał debugowanie do późna w nocy i poczucie własności nad każdą linią, to brzmi jak strata. Ale Lozzi przekonuje, że to ewolucja, a nie regres.

Serce artykułu to cztery filary zmiany paradygmatu. Po pierwsze, ciekawość. Branża zmienia się za szybko, żeby można było trzymać się jednego podejścia przez miesiące. Nie trzeba być na bieżąco od pierwszego dnia, ale trzeba się poruszać do przodu. Po drugie, rola dyrektora. Zamiast budować komponenty samodzielnie, kierujesz agentami, które to robią za ciebie. Lozzi porównuje to do roli lead developera, który tworzy historyjki na tyle szczegółowe, żeby zespół mógł je realizować, a potem robi code review. Teraz tym "zespołem" są agenty. Po trzecie, zmiana z "jak" na "co". Pytanie nie brzmi już "jak napisać ten kod", ale "co buduję dla użytkownika". Kod staje się szczegółem implementacyjnym, a nie centrum zainteresowania. I po czwarte, AI jako pilot, nie kopilot. Microsoft zawłaszczył nazwę "Copilot" do granic absurdu, ale koncepcja jest też błędna. Inżynier powinien być kontrolą naziemną, a AI pilotem.

Lozzi przyznaje, że wczesnokarierowi inżynierowie będą się bardziej zmagać z tą zmianą, bo brakuje im doświadczenia, które pozwala myśleć o pięć kroków do przodu. Ale to nie powód, żeby się poddawać, to powód, żeby aktywnie szukać mentorów. Interesująca jest też obserwacja o seniorach, którzy łapią ten styl szybciej właśnie dlatego, że mają doświadczenie w planowaniu architektury i mogą szybko powiedzieć agentowi, czego chcą.

Na końcu artykuł rozprawia się z mitem lenistwa. Autor porównuje przejście z biegania do kulturystyki. Nowe mięśnie, nowy ból, nowy wzrost. To nie jest odpoczynek, to jest transformacja wymagająca zaangażowania.

**Key takeaways:**
- Zmiana paradygmatu to nie utrata umiejętności, ale konieczność myślenia na wyższym poziomie abstrakcji: od "jak napisać" do "co budować"
- Doświadczenie seniorskie staje się ważniejsze niż kiedykolwiek, bo to senior wie, co powiedzieć agentowi
- Bycie "product engineerem" z myśleniem o użytkowniku przechodzi z differentiator do baseline requirement
- Złej jakości kod z agenta to zazwyczaj problem złego promptowania i braku planu, nie wady AI

**Why do I care:**

To jest artykuł, który mi rezonuje bardziej niż większość. Widzę tę zmianę na własnych projektach. Ale mam też zastrzeżenia. Lozzi trochę za łatwo odpuszcza kwestię jakości kodu. "Loosen your own high standards" to rada, która u niedoświadczonego inżyniera może prowadzić do prawdziwych problemów w produkcji. Rozumiem intencję, ale to wymaga więcej niuansów. Artykuł też milczy o tym, co dzieje się z wiedzą domenową w firmie, gdy nikt już nie czyta kodu naprawdę uważnie. Dług techniczny zaciągany przez agenty może być subtelniejszy i trudniejszy do wykrycia niż ten tradycyjny. I jeszcze jedno: idea "AI-first thinking" jest słuszna, ale zakłada, że masz dobrze zdefiniowane wymagania. W praktyce requirement gathering to połowa problemu.

**Link:** [Stop Coding, Start Directing: The Paradigm Shift for Every Software Engineer](https://hackernoon.com/stop-coding-start-directing-the-paradigm-shift-for-every-software-engineer)

---

## The Biggest Audience on My Website Never Clicks

**TLDR:** Nico Dudli, prowadzący małą dwujęzyczną stronę TechNovice, odkrył, że przez 89 dni jego witryna zebrała 95 394 trafień od botów AI użytkowników. To więcej niż konwencjonalnych sesji ludzkich. Ruch referralny z AI był przy tym bliski zeru. Artykuł analizuje, co to oznacza dla wydawców.

**Summary:**

Punkt wyjścia jest prosty i intrygujący. Dudli otworzył raport ruchu botów w swojej platformie i zobaczył coś nieoczekiwanego. User-associated AI bots, głównie sklasyfikowane jako "OpenAI user bot", pobierały setki stron dziennie. Nie sporadycznie, ale każdego dnia. W pewnych okresach ruch AI przewyższał liczbę ludzkich sesji. Pierwsza reakcja? Nie ekscytacja, ale dezorientacja. Bo jeśli tyle botów odwiedza stronę, dlaczego ruch referralny z ChatGPT i podobnych jest niemal zerowy?

Tu zaczyna się najciekawsza część. Dudli wyjaśnia ważne rozróżnienie: nie każde trafienie bota to osobna osoba ani jedna interakcja. Jeden prompt w asystencie AI może wygenerować wiele zapytań HTTP do różnych stron. Ale nawet z tą poprawką skala jest znacząca. Witryna obsługuje więcej żądań od user-associated AI retrieval niż rejestruje konwencjonalnych sesji przeglądania.

Autor wprowadza "referral paradox". Pomiędzy 13 maja a 11 lipca 2026 roku Microsoft Clarity's AI visibility dashboard odnotował 5108 cytowań strony i Share of Authority 21,36%. A jednak mniej niż 0,1% ruchu referralnego. Strona jest pobierana, cytowana, a użytkownicy prawie nigdy nie klikają. W tradycyjnym modelu analitycznym to wygląda jak katastrofa. Dudli proponuje inne spojrzenie: treść dociera do ludzi bez wymagania wizyty na stronie.

To prowadzi do centralnej tezy artykułu. Strona internetowa tradycyjnie była celem. Teraz jest też źródłem danych, które interfejsy AI mogą odpytywać. Wydawca traci kontrolę nad interfejsem, ale nie musi tracić kontroli nad informacją. Jeśli twój artykuł zawiera oryginalne pomiary, konkretne rekomendacje, przejrzyste warunki testowania i rozpoznawalnego autora, to te elementy mogą "przeżyć" w odpowiedzi AI. Generyczny artykuł po summarizacji nie zostawia nic. Dobrze ustrukturyzowane źródło zostawia ślad: autora, wniosek, powód do zaufania.

Dudli kończy praktyczną sekcją o tym, co mierzyć teraz. Poza standardową analityką proponuje warstwy: aktywność retrieval po kategorii botów, skuteczność odpowiedzi, widoczność cytowań w AI, ruch referralny i downstream business outcomes. Żadna pojedyncza metryka nie wystarczy. Cel to obserwacja systemu jako lejka: retrieval, interpretacja, cytowanie, wpływ, mierzalny wynik. Tradycyjna analityka łapie tylko końcowe etapy.

**Key takeaways:**
- AI retrieval boty mogą generować więcej żądań do strony niż ludzkie sesje, przy prawie zerowym ruchu referralnym
- Strona staje się źródłem danych dla AI, a nie tylko celem dla użytkowników, i to zmienia co i jak powinno się publikować
- Treści z oryginalnymi pomiarami, konkretnymi rekomendacjami i rozpoznawalnym autorem lepiej "przeżywają" w odpowiedziach AI
- Potrzebne są nowe metryki mierzące wpływ przez AI: od retrieval activity przez citation visibility do downstream outcomes

**Why do I care:**

To jest jeden z tych artykułów, które zadają właściwe pytanie, ale nie do końca odpowiadają na nie. Dudli diagnozuje problem trafnie: nasze narzędzia analityczne zbudowano na założeniu, że wpływ zaczyna się od wizyty użytkownika na stronie. To założenie się sypie. Ale mam pewne wątpliwości co do optymizmu autora. Owszem, "content carries expertise into the answer" brzmi atrakcyjnie, ale wydawca traci w tym równaniu bardzo dużo: nie tylko ruch, ale też możliwość monetyzacji, budowania relacji z czytelnikami, zbierania danych. "Distributed visibility" bez możliwości zamienienia jej na przychód to słabe pocieszenie. Artykuł też za mało mówi o tym, co dzieje się z mniejszymi wydawcami, którzy nie mają luksusu "original measurements" i po prostu produkują content agregacyjny. Dla nich ta zmiana to po prostu koniec modelu biznesowego.

**Link:** [The Biggest Audience on My Website Never Clicks](https://hackernoon.com/the-biggest-audience-on-my-website-never-clicks)
