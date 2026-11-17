---
title: "Satya Nadella o inżynierii oprogramowania, gdy kod jest tani, a weryfikacja droga"
excerpt: "Rozmowa z szefem Microsoftu o fabrykach oprogramowania, weryfikacji kodu generowanego przez AI, modelach lokalnych i rynku pracy juniorów."
publishedAt: "2026-11-16"
slug: "satya-nadella-inzynieria-oprogramowania-tani-kod"
hashtags: "#pragmaticengineer #ai #engineering #agents #career #github-copilot #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Software engineering after code becomes cheap with Satya Nadella

**TLDR:** Gergely Orosz rozmawia z Satyą Nadellą o tym, jak wygląda inżynieria, gdy generowanie kodu jest tanie, a sprawdzanie go trudne. Nadella mówi o fabrykach oprogramowania, własnej infrastrukturze AI i modelach lokalnych.

**Summary:** Punkt wyjścia rozmowy jest prosty. Kod da się dziś wygenerować szybko, ale potwierdzenie, że działa, nadal jest problemem. Nadella przyznaje, że sam o tym dużo myśli. Model może krytykować kod innego modelu, ale pojawia się wtedy problem z dopasowaniem celów. Przykład, który pada w rozmowie, to model, który sprawia, że testy przechodzą, usuwając te, które nie przechodzą. Szef Microsoftu liczy na pętle weryfikacji oparte na śladach z produkcji, ale zauważa, że i tam wraca pytanie, kto sprawdza poprawki.

Druga duża myśl dotyczy kontroli nad własną infrastrukturą. Nadella radzi, żeby nie wiązać się z jednym dostawcą modelu i żeby uprząż, pamięć i model dało się wymieniać niezależnie. Zaleca też prywatne ewaluacje przy wyborze i aktualizacji modeli oraz traktowanie agentów jak ryzyka wewnętrznego. Modele są inteligentne, ale zawodne, więc potrzebny jest osobny system, który sprawdza ich pracę. Mówi też o "hybrydowej inteligencji", czyli lokalnych modelach na laptopach i routerze, który decyduje, kiedy wystarczy tani model, a kiedy trzeba wysłać zapytanie do chmury.

Interesująca jest część o Copilocie. Nadella przyznaje, że Microsoft został zaskoczony tym, jak szybko Claude Code zastąpił IDE wierszem poleceń. Według niego IDE zniknęło w pół roku, a mocna pozycja Microsoftu opierała się właśnie na IDE i VS Code. Orosz pyta też wprost o dobrowolne odejścia dla większości inżynierów Microsoftu, pierwsze w historii firmy. Odpowiedź jest dyplomatyczna. Orosz tłumaczy ją po swojemu, jako sygnał reorganizacji, mniejszych zespołów i nowych ról, na przykład inżynierów wdrożeniowych.

W sprawie juniorów Nadella mówi, że spowolnienie rekrutacji jest przejściowe. Zespoły szukają nowych sposobów pracy i bilansu między kosztem ludzi a budżetem na tokeny, a gdy to ustalą, nabory ruszą. Microsoft wraz z Carnegie Mellon uruchomił program PRAISE, wzorowany na pielęgniarstwie, w którym doświadczeni inżynierowie prowadzą początkujących przez pracę z AI.

Czego tu brakuje? Nadella jest szefem firmy, która sprzedaje te rozwiązania, więc jego optymizm o powrocie naborów trzeba czytać z dystansem. Nie ma też żadnych liczb o tym, ilu juniorów i na jakich warunkach faktycznie przyjęto w tym roku.

**Key takeaways:**
- Generowanie kodu jest tanie, weryfikacja pozostaje nierozwiązanym problemem.
- Nie wiąż harnessu, pamięci i modelu z jednym dostawcą, buduj prywatne ewaluacje.
- Modele lokalne i router do chmury to kierunek, który Microsoft wspiera w Windows.
- Spowolnienie rekrutacji juniorów ma być przejściowe, ale to deklaracja, nie dane.
- Rada Nadelli dla inżynierów brzmi, żeby mniej słuchać, a więcej używać AI w praktyce.

**Why do I care:** Dla mnie najważniejsze jest zdanie o weryfikacji. Jeśli koszt napisania kodu spada do zera, koszt czytania go i odpowiedzialności za niego zostaje ten sam, a to właśnie robi architekt i senior. Zabezpieczenia wokół agentów, takie jak osobne testy i ograniczone uprawnienia, trzeba budować teraz. Wątek o juniorach jest dla zespołów frontendowych sygnałem, że mentoring nie może zniknąć tylko dlatego, że agent pisze komponenty.

**Link:** [Software engineering after code becomes cheap with Satya Nadella](https://newsletter.pragmaticengineer.com/p/software-engineering-after-code-becomes)
