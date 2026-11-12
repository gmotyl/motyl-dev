---
title: "Kilo: jak uczciwie porównać Fable 5.2 i GPT-6.1 Sol na stronie docelowej"
excerpt: "Przepis na test dwóch modeli kodujących na tym samym briefie, z ośmioma sprawdzalnymi wymaganiami i oceną wyglądu bez znajomości modelu."
publishedAt: "2026-11-11"
slug: "kilo-fable-5-2-vs-gpt-6-1-sol-test-strony-docelowej"
hashtags: "#kilo #ai #llm #testing #agents #devtools #generated #pl"
source_pattern: "Kilo"
---

## Sprawdź stronę, nie jej zrzut ekranu

**TLDR:** Kilo proponuje porównanie Claude Fable 5.2 i GPT-6.1 Sol na jednym briefie, fikcyjnym warsztacie rowerowym. Liczy się to, co działa na stronie, a nie to, jak ładnie wygląda na obrazku.

**Summary:** Strona może wyglądać na skończoną, a formularz odrzuca poprawny adres e-mail albo główny przycisk prowadzi donikąd. Dlatego test zakłada, że oba modele dostają identyczny brief, identyczne narzędzia i ten sam projekt w Kilo. Zapisujesz identyfikator modelu, dostawcę, ustawienie rozumowania i datę. Autor zwraca uwagę, że poziom "high" u różnych dostawców nie oznacza tej samej ilości obliczeń.

Brief jest dokładny. Jeden plik index.html, czysty HTML, CSS i JavaScript, bez bibliotek, fontów, obrazków i żądań sieciowych. Przegląd cen, godziny otwarcia od wtorku do soboty, formularz z widocznymi etykietami, walidacja pustych i samych białych znaków pól oraz niepoprawnego adresu. Po poprawnym wypełnieniu strona pokazuje komunikat, że to demo i nic nie wysłano. Do tego widoczny fokus, logiczna kolejność tabulatora i brak przewijania poziomego przy 390 pikselach.

Ocena to osiem punktów za wymagania, które da się zaobserwować. Wygląd oceniasz osobno, przez recenzenta, który nie widzi nazw modeli. Potem powtarzasz zadanie w czystym katalogu i liczysz, ile poprawek trzeba na końcu.

**Key takeaways:**
- Ta sama konfiguracja, ten sam brief i zapisane ustawienia każdej próby.
- Osiem wymagań punktowanych oddzielnie od oceny wyglądu.
- Wynik zależy też od tego, ile pracy naprawczej zostaje po generacji.

**Why do I care:** To porządna metodologia i właśnie dlatego warto zauważyć, czego nie obejmuje. Jedna strona z jednego promptu mówi niewiele o dużym repozytorium z istniejącą architekturą. Wezmę z tego sam schemat, czyli ślepą ocenę i liczenie poprawek, ale brief zastąpię zadaniem z własnego backlogu. Autor sam to zresztą zaleca na końcu.

**Link:** [Fable 5.2 vs GPT-6.1 Sol: a fair landing page test](https://blog.kilo.ai/p/fable-52-vs-gpt-61-sol-a-fair-landing)
