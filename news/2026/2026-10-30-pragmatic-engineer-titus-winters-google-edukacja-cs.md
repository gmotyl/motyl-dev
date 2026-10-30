---
title: "Titus Winters o inżynierii w Google, testach, refaktoryzacji 250 milionów linii i edukacji informatycznej"
excerpt: "Rozmowa z głównym autorem Software Engineering at Google: wielka refaktoryzacja C++, obowiązkowe testy, program readability i dlaczego większość programu studiów informatycznych trzeba spalić."
publishedAt: "2026-10-29"
slug: "pragmatic-engineer-titus-winters-google-edukacja-cs"
hashtags: "#pragmaticengineer #engineering #testing #refactoring #ai #career #architecture #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Inżynieria oprogramowania w Google i edukacja informatyczna z Titusem Wintersem

**TLDR:** Titus Winters, autor Abseil i współautor Software Engineering at Google, opowiada o refaktoryzacji ponad 250 milionów linii C++ i o testach jako obowiązku. Uważa, że amerykański program informatyki jest przestarzały od około 2000 roku i trzeba go w większości przebudować.

**Summary:** W 2010 roku Titus z dwunastoosobowym zespołem sprzątał kod C++ w Google, który liczył blisko 250 milionów linii i był edytowany przez 10 tysięcy inżynierów. Porównuje to do wymiany fundamentów Empire State Building bez zamykania budynku, przy czym w piwnicy znaleziono odpady jądrowe. Zrobili to bez LLM-ów. MapReduce parsował każdy cel budowania do drzewa składni, dopasowywał dokładne wzorce wywołań, generował edycje, uruchamiał stare i nowe API obok siebie, dzielił zmiany na paczki po katalogach, blokował powrót starego wzorca i na końcu usuwał stare API. Z tego powstał clang-format.

Około 2007 roku Search nie był w stanie wypuszczać co miesiąc, tylko co kwartał, bo prawie każda zmiana w firmie dotykała jego kodu. Google wymusiło test przy każdej zmianie i tempo wróciło. Program readability, w którym zmianę akceptuje właściciel i certyfikowany recenzent języka, miał jednocześnie ponad 10 tysięcy uczestników. Strach według Titusa to zły fundament inżynierii: baza kodu jest nie do utrzymania, jeśli nie da się bezpiecznie wprowadzić wartościowej zmiany.

O AI mówi dwoma głosami. Z rozmów z inżynierami z innych firm wynika, że kod rośnie mocno, awarii jest o około 30 procent więcej, a liczba funkcji stoi w miejscu. Z drugiej strony AI umożliwia projekty tak ambitne, że wcześniej nie miały sensu. Titus siedział w komitecie wytycznych ACM/IEEE/AAAI jako jedyny praktyk i uważa, że w programie brakuje testowania i weryfikacji. Profesorowie dzielą studentów na trzy grupy: najlepsi są lepsi niż kiedykolwiek, środek się załamał, a najsłabsi gonią środek, produkując głównie śmieci z AI. Proponuje oceniać prompty i testy zamiast kodu. Dla juniorów ma radę o siekierze Andrzeja: to Andrzej ścina drzewo, a AI jest narzędziem, więc nie należy go uczłowieczać. I jeszcze jedno: sukces rzadko przychodzi z robienia tego, co wszyscy.

Brakuje tu twardych liczb. Wzrost awarii o 30 procent to wrażenie z rozmów, nie pomiar, a opinia o programie CS opiera się na jednym komitecie.

**Key takeaways:**
- Refaktoryzacja 250 milionów linii C++ powstała bez LLM-ów, na parsowaniu AST i MapReduce.
- Obowiązkowe testy przywróciły Search miesięczne wydania.
- Awarie rosną o około 30 procent, a liczba funkcji stoi w miejscu.
- Studenci ze środka stawki mają największy problem z AI.

**Why do I care:** Uderzyło mnie to, że największe wygrane z refaktoryzacji w skali Google to zwykłe narzędzia: AST, dopasowanie wzorców i małe paczki zmian. Przed zleceniem agentowi masowej zmiany zadaj pytanie, czy da się ją zrobić deterministycznie i zweryfikować testami.

**Link:** [Software engineering at Google & CS education with Titus Winters](https://newsletter.pragmaticengineer.com/p/software-engineering-at-google-and)
