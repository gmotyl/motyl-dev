---
title: "Pragmatic Engineer: fabryki oprogramowania, 5000 PR-ów miesięcznie i koniec ręcznego code review w CodeRabbit"
excerpt: "Harjot Gill z CodeRabbit wypchnął ponad 5000 pull requestów w miesiąc, wydaje na AI około 250 tysięcy dolarów i twierdzi, że ludzkie code review umarło."
publishedAt: "2026-11-18"
slug: "pragmatic-engineer-fabryki-oprogramowania-code-review-coderabbit"
hashtags: "#pragmaticengineer #ai #agents #engineering #productivity #architecture #devops #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Fabryki oprogramowania i code review z Harjotem Gillem

**TLDR:** Założyciel CodeRabbit opowiada, jak jego zespół pracuje z agentami na skalę, która większości firm wyda się szalona. Wydatki na AI idą u niego w miliony dolarów miesięcznie, a człowiek przestaje czytać pojedyncze PR-y.

**Summary:** Harjot Gill, od trzydziestu lat piszący oprogramowanie i zakładający startupy infrastrukturalne, wypchnął w ostatnim miesiącu ponad pięć tysięcy pull requestów. Duża część to prace porządkowe: poprawianie CI, naprawa niestabilnych testów, dopracowywanie cache'owania. Wiele z nich powstaje w drodze do pracy albo wieczorami, kiedy agenci pracują sami. Z większych rzeczy pojawia się write-ahead log na obiektowym storage napisany w Rust, nad którym agent pracował sześć tygodni i który działa już produkcyjnie, oraz przeniesienie wszystkich usług na Bun w jeden weekend.

Liczby wydatków robią wrażenie. CodeRabbit z zespołem około czterdziestu inżynierów wydaje na AI miliony dolarów miesięcznie, a sam Gill szacuje swój osobisty rachunek na 250 do 275 tysięcy dolarów, czyli mniej więcej 150 dolarów za jeden PR. Gergely Orosz zwraca uwagę, że w większości firm mówi się raczej o 200 do 2000 dolarów miesięcznie na dewelopera. Gill odpowiada, że to dla niego forma R&D: jeśli agenci pozwalają szybciej wypuszczać nowe produkty, koszt się zwraca. Podaje też przykład CI. Wycena gotowego rozwiązania na ich wolumen PR-ów wyniosła 13 milionów dolarów rocznie, więc zbudował własne za pomocą agentów w tydzień, za połowę ceny i z podobną wydajnością.

Najciekawsza jest część o weryfikacji. Gill uważa, że agent musi mieć sposób, żeby sprawdzić własną pracę, i buduje to warstwami. Są modele formalne, TLA+ znalazło wyścigi, które code review przeoczyło, a teraz eksperymentuje z Lean. Są lokalne deterministyczne symulacje, które fuzzują różne przeploty operacji współbieżnych, emulatory prawdziwych API chmurowych, środowiska deweloperskie, w których agent stawia usługi i sprawdza, że działają, oraz stopniowe wdrożenia za feature flagami, które obserwuje agent i dopiero przy stabilnych metrykach poszerza rollout.

Z tego wynika jego główna teza: ludzkie code review jest martwe, żyje za to przegląd ludzki. Inżynierowie w CodeRabbit przeglądają całe wydania, czyli wiele PR-ów naraz, plan i końcowy efekt, a nie pojedyncze diffy. Firma ma listę osób zwolnionych z przeglądu. Kto psuje produkcję, dostaje strike, a po kilku zaczyna znowu potrzebować recenzji kolegów. Dopracowywanie własnych modeli przestało się opłacać, bo modele frontierowe zmieniają się za szybko. Do dużych inicjatyw zbierają się w war roomach, gdzie inżynierowie, produktowcy i projektanci razem sterują agentami. Rekrutuje osoby z agency, szerokim doświadczeniem i myśleniem systemowym, a w ogłoszeniu prosił o tysiąc sensownych PR-ów w 30 dni albo 500 godzin w Civilization czy Factorio.

Warto od razu zapytać o to, czego Gill unika. CodeRabbit sprzedaje narzędzia dla firm AI-native, więc wydatki na AI są jednocześnie kosztem i badaniem rynku. Firma z ustalonym produktem i stałym przychodem nie ma takiej dźwigni. Nie słychać też nic o kosztach utrzymania tej masy kodu, o długu, który powstaje, kiedy nikt go nie czyta, ani o tym, ile z pięciu tysięcy PR-ów to realna wartość, a ile hałas. Gill przyznaje zaburzony sen, bo budzi się w nocy, żeby poprawić agentów. Orosz nazywa to efektem Draculi.

**Key takeaways:**
- Wydatki na AI na poziomie 250 tysięcy dolarów miesięcznie mają sens głównie dla firm, które sprzedają narzędzia AI.
- Agent potrzebuje warstw weryfikacji: modele formalne, symulacje, emulatory API i stopniowe rollouty.
- Przegląd przesuwa się z pojedynczych PR-ów na plany i całe wydania, a zaufanie do dewelopera można odbierać strike'ami.

**Why do I care:** Nie musisz wydawać ćwierć miliona, żeby wziąć stąd to, co użyteczne: weryfikację bez człowieka w pętli. Symulacje, emulatory i rollouty z obserwacją agenta to rzeczy, które da się dołożyć do zwykłego pipeline'u frontendowego. Reszta to pokaz skrajnego przypadku. Nie traktowałbym go jako standardu, tylko jako sygnał, w którą stronę idzie koszt pracy.

**Link:** [Software factories and code reviews with Harjot Gill](https://newsletter.pragmaticengineer.com/p/software-factories-and-code-reviews)
