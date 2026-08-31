---
title: "Refactoring: onboarding ruletka Graphite'a i cotygodniowe \"aha\" spotkania o AI"
excerpt: "CTO Graphite'a co miesiąc losowo kasuje konta pracowników, żeby cały zespół regularnie przechodził przez onboarding, a Lara Hogan wprowadziła cykliczne spotkania, na których każdy dzieli się jedną rzeczą, jaką odkrył o AI w tym tygodniu."
publishedAt: "2026-08-31"
slug: "refactoring-onboarding-roulette-ai-aha-meetings"
hashtags: "#refactoring #onboarding #teams #ai #management #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Onboarding ruletka: dlaczego Graphite regularnie kasuje konta własnych pracowników

**TLDR:** Greg Foster, CTO Graphite'a, losowo kasuje konto jednego pracownika co miesiąc, żeby cały zespół regularnie przechodził przez pełny proces onboardingu i wyłapywał regresje, których nikt inny by nie zauważył.

**Summary:** To jeden z tych pomysłów, który brzmi ekstremalnie, dopóki nie zrozumiesz, jaki problem faktycznie rozwiązuje. Onboarding testuje się zwykle raz, może dwa lata temu, i potem nikt do niego nie wraca, mimo że nowi użytkownicy trafiają na niego codziennie. Zespół, który sam nie przechodzi przez ten proces regularnie, traci wyczucie tego, jak wygląda pierwsze wrażenie z produktu. Graphite rozwiązuje to brutalnie prosto: losowo wybrany pracownik dostaje skasowane konto i przy następnym logowaniu przechodzi cały onboarding od zera, linkowanie repozytoriów, ustawienia, całość.

Efekt jest taki, że każdy w zespole czuje onboarding mniej więcej raz w miesiącu, więc szorstkie krawędzie wychodzą na jaw szybko i są na bieżąco polerowane, zamiast czekać na kolejny audyt UX. Foster przyznaje, że reakcja na wprowadzenie tego rytuału była mieszana, część zespołu to znienawidziła, ale dziś, gdy cały onboarding trwa około trzech minut, przeważa akceptacja. Autor od razu zaznacza zastrzeżenie, którego nie da się pominąć: to nie jest pomysł do skopiowania jeden do jednego, jeśli budujecie system dla szpitala, ale sama zasada, że zespół powinien regularnie robić to, co regularnie robią użytkownicy, przenosi się dobrze na inne konteksty, jak logowanie się na świeże konto raz na kwartał, przechodzenie przez własny support, kiedy coś się psuje, czy używanie aplikacji mobilnej na wolnym łączu.

**Key takeaways:**
- Regularne, wymuszone przechodzenie przez onboarding wyłapuje regresje, których jednorazowy test dwa lata temu nie złapie
- Zasada przenosi się na inne rytuały: świeże konto raz na kwartał, własny support, wolne łącze
- Rytuał, który początkowo budzi opór, może stać się akceptowaną praktyką, gdy realnie skraca tarcie (tu: onboarding zajmuje już tylko trzy minuty)

**Why do I care:** To konkretny, tani sposób na wymuszenie empatii produktowej w zespole bez kolejnego warsztatu UX czy ankiety satysfakcji. Jeśli wasz onboarding też nie był testowany od dawna, nie musicie od razu kasować kont, ale warto znaleźć swój odpowiednik, np. wymusić na nowym członku zespołu zalogowanie się jak klient przed pierwszym dniem pracy nad kodem.

## Cotygodniowe spotkania "aha" o AI: dzielenie się odkryciami, zanim się zdezaktualizują

**TLDR:** Lara Hogan wprowadziła cykliczne spotkania, na których cały zespół, łącznie z menedżerami, dzieli się jedną rzeczą odkrytą tego tygodnia o AI, na wzór lżejszego i częstszego postmortemu.

**Summary:** Częstotliwość jest tu kluczowa, nie sama forma spotkania. To, co ktoś odkrył w tym tygodniu o konkretnym narzędziu AI, może być nieaktualne już za tydzień, więc bez ciasnej pętli feedbacku ludzie dalej pracują na podstawie zeszłomiesięcznych, przestarzałych intuicji. Format jest prosty: co tydzień albo co dwa tygodnie każdy dzieli się jedną rzeczą, wygraną, porażką, zaskoczeniem albo czymś po prostu dziwnym, i nikt nie ma prawa się wymigać, menedżerowie też muszą coś wnieść.

To rozwiązuje realny problem z tym, jak szybko dziś zmieniają się narzędzia AI: ktoś testuje model przez tydzień, wyciąga wnioski, a te wnioski są bezużyteczne, jeśli nie trafią do reszty zespołu, zanim narzędzie się zaktualizuje albo ktoś inny popełni ten sam błąd od nowa. Autor przyznaje, że wdrożył własną wersję tego pomysłu w społeczności Refactoring pod nazwą AI Club, co samo w sobie jest niezłym dowodem, że koncepcja rzeczywiście działa, skoro ktoś, kto pisze o niej z zewnątrz, zaimplementował ją u siebie zamiast tylko ją opisać.

**Key takeaways:**
- Cotygodniowe dzielenie się odkryciami o AI zapobiega pracy na podstawie przestarzałych intuicji z zeszłego miesiąca
- Format jest lekki i częsty, bliższy krótkiemu rytuałowi niż formalnemu postmortemowi
- Obowiązkowy udział wszystkich, łącznie z menedżerami, wymusza realną wymianę, nie tylko dobrowolne zgłoszenia chętnych

**Why do I care:** W zespołach, które szybko adaptują nowe narzędzia AI do własnego workflow, brak takiej pętli feedbacku oznacza, że każdy uczy się tych samych lekcji osobno i po cichu. To tańsza wersja retro poświęconego wyłącznie AI, którą można wprowadzić od przyszłego tygodnia bez zmiany żadnego procesu poza kalendarzem.

**Link:** [Onbarding roulette, "Aha" AI meetings, and weekly readings](https://refactoring.fm/p/onbarding-roulette-aha-ai-meetings)
