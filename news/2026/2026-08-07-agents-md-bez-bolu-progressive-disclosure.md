---
title: "AGENTS.md bez bólu: jak nie utopić agenta w milionie instrukcji"
excerpt: "Matt Pocock tłumaczy, dlaczego rozrośnięty plik AGENTS.md szkodzi wydajności agentów AI i jak go uporządkować metodą progressive disclosure."
publishedAt: "2026-08-07"
slug: "agents-md-bez-bolu-progressive-disclosure"
hashtags: "#MattPocock #AGENTSmd #AIagents #CodingWorkflow #DeveloperTools #generated #pl"
source_pattern: "Matt Pocock (AI Hero)"
---

## AGENTS.md bez bólu: jak nie utopić agenta w milionie instrukcji

**TLDR:** AGENTS.md to plik konfiguracyjny dla agentów kodujących, ale z czasem zbiera się w nim tyle reguł, że zaczyna szkodzić, nie pomagać. Matt Pocock proponuje trzymać go maksymalnie krótkim i przenosić resztę do osobnych plików, które agent wczytuje tylko wtedy, gdy faktycznie ich potrzebuje.

**Summary:** AGENTS.md to plik markdown trzymany w repozytorium, który siada tuż pod system promptem i mówi agentowi, jak ma się zachowywać w danym projekcie. Może zawierać wskazówki dwojakiego rodzaju, osobiste preferencje dotyczące stylu commitów czy kodu oraz informacje o samym projekcie, jak architektura albo używany package manager. To standard wspierany przez wiele narzędzi, choć nie przez wszystkie, Claude Code na przykład czyta CLAUDE.md, więc w praktyce robi się symlink między obydwoma plikami, żeby nie duplikować treści.

Problem zaczyna się od naturalnej pętli, którą autor opisuje bardzo trafnie. Agent robi coś, co nam się nie podoba, dopisujemy regułę, która ma to zablokować, i powtarzamy ten schemat setki razy przez wiele miesięcy. Do tego różni programiści dorzucają własne, czasem sprzeczne opinie, nikt nie robi porządnego przeglądu całości, i po roku dostajemy plik, który sam autor nazywa kulą błota. Drugim winowajcą są automatycznie generowane AGENTS.md ze skryptów inicjalizacyjnych, które z definicji wolą być kompletne niż zwięzłe, więc od razu ładują masę treści przydatnych "w większości scenariuszy", zamiast pozwolić agentowi odkrywać je dopiero, gdy będą potrzebne.

Kluczowy koncept, który przywołuje Pocock, to budżet instrukcji zaczerpnięty z artykułu Kyle'a z Humanlayer. Modele frontierowe z myśleniem są w stanie sensownie trzymać się około 150-200 instrukcji naraz, mniejsze modele mniej, modele bez myślenia jeszcze mniej. Problem w tym, że każdy token z AGENTS.md ładuje się przy każdym zapytaniu, niezależnie od tego, czy jest w danym momencie potrzebny. Im większy i bardziej rozdmuchany plik, tym mniej miejsca zostaje na instrukcje faktycznie związane z konkretnym zadaniem, a agent zaczyna się gubić.

Osobnym zagrożeniem jest starzenie się dokumentacji, i tu autor punktuje coś, co moim zdaniem jest sedno sprawy. Człowiek czytający nieaktualne docsy ma wbudowaną nieufność i zwykle to wychwyci, agent czytający je na każdym requeście po prostu je zjada jako fakt. Jeśli AGENTS.md mówi, że logika autoryzacji jest w src/auth/handlers.ts, a plik dawno przeniesiono, agent będzie szukał z pełnym przekonaniem w złym miejscu. Rozwiązaniem jest opisywanie możliwości i ogólnego kształtu projektu, a nie sztywnej struktury katalogów, bo nazwy plików zmieniają się często, a pojęcia domenowe, choć też mogą dryfować, są zdecydowanie stabilniejsze.

Realna rekomendacja jest brutalnie minimalistyczna: jedno zdanie opisujące projekt, package manager jeśli inny niż npm, i niestandardowe komendy do budowania czy typecheckingu. Reszta, konwencje TypeScript, zasady testowania, wzorce API, powinna trafić do osobnych plików w katalogu docs, do których root AGENTS.md tylko linkuje jednym spokojnym zdaniem, bez "always" i wersalików. Ta hierarchia może się zagłębiać jeszcze bardziej, jeden plik odsyła do drugiego, agent i tak sprawnie się po tym poruszy. W monorepo to się skaluje naturalnie, root AGENTS.md opisuje cel monorepo i sposób nawigacji po pakietach, a każdy pakiet ma swój własny plik z lokalnymi konwencjami, bo agent widzi wszystkie scalone pliki naraz i nie warto przeładowywać żadnego poziomu.

**Key takeaways:**
- Root AGENTS.md powinien zawierać tylko opis projektu w jednym zdaniu, package manager (jeśli nie npm) i niestandardowe komendy budowania, resztę trzeba wynieść do osobnych plików
- Progressive disclosure oznacza, że agent wczytuje szczegółowe reguły (TypeScript, testy, API) tylko wtedy, gdy faktycznie pracuje w danym obszarze, co oszczędza budżet instrukcji
- Dokumentowanie struktury plików jest ryzykowne, bo ścieżki się zmieniają i stają się nieaktualne, lepiej opisywać możliwości i pojęcia domenowe
- W monorepo warto rozdzielić root AGENTS.md (cel monorepo, wspólne narzędzia) od AGENTS.md w poszczególnych pakietach (lokalna architektura i konwencje)

**Why do I care:** Rozpoznaję ten wzorzec, bo widziałem go już w README, w Confluence i w każdej innej formie dokumentacji, która miała być "źródłem prawdy" dla ludzi. Różnica jest taka, że człowiek doda sobie w głowie znak zapytania przy podejrzanie starym zapisie, a agent bierze każdą linijkę AGENTS.md za aktualny fakt i buduje na niej decyzje. To zmienia priorytety pisania dokumentacji z "opisz wszystko, na wszelki wypadek" na "opisz minimum, które się nie zdezaktualizuje". Osobiście przechodzę teraz przez własny plik CLAUDE.md w tym repo i widzę tam właśnie ten sam mechanizm kuli błota, każda reguła dodana po jednym incydencie, żadna nigdy usunięta. Progresywne odsłanianie treści przez osobne pliki w docs/ brzmi jak najprostsza droga wyjścia, i planuję to faktycznie wdrożyć, zamiast dalej dopisywać kolejne wyjątki na końcu jednego wielkiego pliku.

**Link:** [A Complete Guide To AGENTS.md](https://www.aihero.dev/s/S8IqdG)
