---
title: "AI Skills z Matt Pocockiem: dlaczego umiejętność 'grill me' zrobiła taką karierę"
excerpt: "Matt Pocock, twórca Total TypeScript i autor popularnej AI skill 'grill-me', tłumaczy w rozmowie dla The Pragmatic Engineer, czemu dobrze dobrane słowo w prompcie, na przykład 'tracer bullet', zmienia jakość kodu agenta bardziej niż sam model."
publishedAt: "2026-09-18"
slug: "2026-09-18-ai-skills-z-matt-pocock"
hashtags: "#pragmaticengineer #ai #claudecode #typescript #generated #pl"
source_pattern: "Pragmatic engineer"
---

## AI Skills z Matt Pocockiem: skąd się wzięła umiejętność "grill-me"

**TLDR:** Matt Pocock, twórca kursu Total TypeScript i autor popularnej AI skill "grill-me", opowiada w rozmowie z The Pragmatic Engineer o swojej drodze od nauczyciela emisji głosu do twórcy narzędzi dla agentów kodujących. Rozmowa krąży wokół "strategicznego programowania", projektowania skilli dla Claude Code i innych agentów oraz tego, dlaczego klasyczne książki o inżynierii oprogramowania nagle stały się przydatne w pracy z AI.

**Summary:** Droga Pococka do programowania zaczęła się od czegoś odległego od typowego CV inżyniera: uczył emisji głosu, akcentu i Szekspira w szkołach aktorskich, a JavaScript nauczył się sam, żeby zbudować analizator spektrogramu głosu dla swoich uczniów śpiewu. Z Total TypeScript zrobił biznes wart ponad 2,5 miliona dolarów przychodu, budując go stopniowo przez warsztaty, kursy i mnóstwo darmowych materiałów, w tym krótkie dwuminutowe filmiki z poradami TypeScript, które w pewnym momencie zaczęły przyciągać uwagę. Po ofercie pełnego etatu w Vercelu wynegocjował pracę na trzy dni w tygodniu jako kontraktor, żeby dokończyć kurs w pozostałym czasie, a gdy Total TypeScript nabrał rozpędu, odszedł z Vercela całkowicie.

Najciekawszy wątek dotyczy skilla "grill-me", który każe agentowi bezlitośnie przepytywać użytkownika o temat rozmowy, zanim cokolwiek zostanie zbudowane. Pomysł nie jest autorstwa Pococka, tylko Thariqa Shihipara z Anthropic, który zauważył, że taka rola agenta jako przepytującego, a nie tylko wykonawcy, daje zaskakująco dobre efekty. Pocock rozwinął ten koncept we własny skill, i to on właśnie stał się jednym z najczęściej używanych w społeczności wokół agentów kodujących.

Drugi wątek to rozróżnienie programowania taktycznego i strategicznego, zapożyczone od Johna Ousterhouta. Pocock uważa, że agenty świetnie radzą sobie z taktyką, czyli faktycznym pisaniem kodu, a to zwalnia programistom czas na warstwę strategiczną, decyzje o kształcie systemu. Powiązany z tym pomysł to "leading words", czyli konkretne słowa instrukcji, które zauważalnie zmieniają jakość kodu generowanego przez agenta. Pocock zauważył, że agenty budują oprogramowanie warstwa po warstwie i przez to gubią spójność między warstwami, a instrukcja użycia "tracer bullet", pojęcia z książki The Pragmatic Programmer, czyli zbudowania najpierw wąskiej, działającej ścieżki od początku do końca systemu, wyraźnie poprawiła wyniki. Od tego czasu sięga po klasyczne książki inżynierskie właśnie w poszukiwaniu takich słów kluczy dla agentów.

Pocock opisuje też przejście z lokalnego uruchamiania agentów na środowiska chmurowe, bo agent w chmurze pracuje dalej, gdy zamyka laptopa, i może działać w trybie wieloosobowym, czego lokalna sesja nie daje. Ciekawa jest jego metafora "memento-driven development": kodujesz tak, jakby kolega budzący się co rano bez pamięci miał od zera zrozumieć cały projekt, bo agent właśnie tak działa, zaczyna każdą sesję bez kontekstu poprzedniej. Do TDD z agentami ma stosunek mieszany, uważa że testy jednostkowe pomagają głównie ludziom z krótką pamięcią roboczą, a agenty z dużym oknem kontekstu lepiej reagują na prośbę o dowód, że kod faktycznie działa, niż na sam rygor pisania testu przed implementacją.

**Key takeaways:**
- Skill "grill-me" każe agentowi przepytywać użytkownika o temat, zanim zacznie działać, pomysł pochodzi od Thariqa Shihipara z Anthropic.
- Agenty dobrze radzą sobie z programowaniem taktycznym, więc programiści mogą skupić się na warstwie strategicznej.
- Konkretne "leading words" w instrukcjach, na przykład "tracer bullet" z The Pragmatic Programmer, zauważalnie poprawiają jakość kodu generowanego przez agenta.
- Agenty w chmurze działają dalej po zamknięciu laptopa i mogą pracować w trybie wieloosobowym, czego lokalna sesja nie zapewnia.
- "Memento-driven development": kod trzeba pisać tak, jakby czytał go ktoś bez pamięci poprzedniej sesji, czyli właśnie tak jak agent.

**Why do I care:** Skill "grill-me" i cała idea "leading words" pokazują coś, co architekci pracujący z agentami kodującymi już czują intuicyjnie, ale rzadko nazywają wprost: jakość promptu nie polega na długości instrukcji, tylko na trafieniu w konkretne, dobrze udokumentowane pojęcie z inżynierii oprogramowania, które agent już "rozumie" z danych treningowych. "Tracer bullet" działa lepiej niż opis tego samego podejścia własnymi słowami, bo model widział to pojęcie tysiące razy w tym samym kontekście. To praktyczna wskazówka: zamiast wymyślać własny żargon dla zespołu, warto sprawdzić, czy klasyczna literatura inżynierska ma już na to nazwę, i użyć jej wprost w promptach i dokumentacji projektu. Metafora "memento-driven development" też trafia w sedno, bo czytelność kodu dla kogoś bez kontekstu przestała być tylko postulatem z książek o dobrych praktykach, a stała się twardym wymogiem, bo agent naprawdę zaczyna każdą sesję od zera.

**Link:** [AI Skills with Matt Pocock](https://newsletter.pragmaticengineer.com/p/ai-skills-with-matt-pocock)
