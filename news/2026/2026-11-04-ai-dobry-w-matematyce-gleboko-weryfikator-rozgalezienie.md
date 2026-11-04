---
title: "Dlaczego modele nagle dobrze radzą sobie z matematyką: poszukiwanie w głąb, weryfikator i współczynnik rozgałęzienia"
excerpt: "Esej z Latent Space tłumaczy, jakie problemy matematyczne są podatne na LLM-y, na przykładzie kontrprzykładu do hipotezy o jednostkowych odległościach, i dlaczego bezpieczeństwo padło pierwsze."
publishedAt: "2026-10-23"
slug: "ai-dobry-w-matematyce-gleboko-weryfikator-rozgalezienie"
hashtags: "#latent #ai #llm #agents #ml #generated #pl"
source_pattern: "Latent Space"
---

## AI is getting good at math

**TLDR:** Autor szuka wspólnej cechy problemów, które modele ostatnio rozwiązały, od kontrprzykładu do hipotezy Erdősa po dowody dla równań Naviera i Stokesa. Odpowiedź brzmi, że ludzie przeszukują możliwości wszerz i oszczędnie, a modele w głąb i rozrzutnie, o ile mają automatyczny weryfikator. Dlatego wygrywają tam, gdzie liczba możliwych kolejnych kroków jest mała.

**Summary:** Punkt wyjścia to seria wydarzeń. W maju wewnętrzny model OpenAI znalazł kontrprzykład do hipotezy o jednostkowych odległościach, otwartej od 1946 roku. Potem przyszły dowód problemu podwójnego pokrycia cyklami, rozwiązania kolejnych dziesięciu problemów i dowód dotyczący Naviera i Stokesa we wrześniu, a po stronie Anthropic formalizacja wielkiego twierdzenia Fermata i oszacowania dla hipotezy Riemanna. Autor pyta, czy da się przewidzieć, które problemy modele rozwiążą.

Model myślowy zaczyna od Gowersa. Trudność dowodu to najkrótsza sekwencja wskazówek, z której eksperci odtworzą rozwiązanie, a koszt rośnie wykładniczo z liczbą potrzebnych olśnień, plus praca między nimi. Dla kontrprzykładu były to trzy wskazówki. Szukaj kontrprzykładu, uogólnij najlepszą znaną konstrukcję i próbuj ciał liczbowych o rosnącym stopniu. Kolejność ma znaczenie, bo trzecia wskazówka jest bezużyteczna bez dwóch pierwszych. Ludzie przeszukują takie drzewo wszerz. Rozważają kilka kierunków, szybko porzucają większość i zostają przy nielicznych, bo rozwijanie pomysłu trwa miesiące, więc poprzeczka na wejście jest wysoka. Jacob Tsimerman, dziś w OpenAI, rozważał dokładnie ten kontrprzykład i przestał. Opisuje to jako przerażającą dynamikę, która pochłania czas i często nic nie daje. Psychologia mówi to samo. Przy problemach wymagających olśnienia poczucie postępu nie rośnie aż do rozwiązania.

Model robi odwrotnie. Idzie w głąb jedną ścieżką, a równoległe agenty dają dziesięć takich prób. Bez weryfikatora wychodzą piękne fałszywe dowody, z weryfikatorem opłaca się zainwestować ogromne moce w niepewne pomysły, bo w ciągu minut wiadomo, czy zadziałały. Poprzeczka dla pojedynczej wskazówki prawie znika, a nieudane próby wracają do modelu jako negatywne wskazówki. Autor pokazuje to na uprząży z trzech elementów, czyli drafterze piszącym prompty, solverze i weryfikatorze, oraz na prompcie OpenAI dla problemu podwójnego pokrycia. Każda linijka tego promptu to opisana jako instrukcja nieudana ścieżka, na przykład zakaz uznawania dowodów dla szczególnych klas grafów. Do tego dochodzi zdanie, które każe nie wracać tylko dlatego, że obecne podejścia zawodzą.

Wniosek ma postać współczynnika rozgałęzienia. Przy b możliwych wskazówkach na krok i k krokach masz b do potęgi k ścieżek. Ludzie utrzymują b małe dzięki gustowi, modele muszą iść prawie każdą gałęzią, ale robią to szybko. Dlatego bezpieczeństwo padło pierwsze, bo rozwiązania mają znane kształty i b wynosi około 1 do 2. Dlatego też kontrprzykład był tak skuteczny, bo zawęził przestrzeń rozwiązań. Dowód dla Naviera i Stokesa dokańcza program Córdoby i Martínez-Zoroi, a mimo to kosztował 10 tysięcy agentów, 300 miliardów tokenów i 88 godzin. Ludzie zachowają przewagę tam, gdzie drzewo jest głębokie i bardzo rozgałęzione, a intuicja nadal się liczy.

**Key takeaways:**

- Modele zamieniają czas na moc obliczeniową i potrafią pójść w ślepą uliczkę bez utraty morale.
- Automatyczny weryfikator jest warunkiem opłacalności takiej strategii.
- Spodziewaj się sukcesów tam, gdzie olśnienia już były i zostaje żmudna matematyka, czyli małe k i małe b.

**Why do I care:** To najlepsze wyjaśnienie, dlaczego agent kodujący potrafi rozwiązać jedne zadania w godzinę, a inne wcale. Zadania z weryfikatorem, czyli testami, kompilatorem i typami, mają małe b w twoim sensie, bo błąd wychodzi w minutę. Zadania architektoniczne takiego sygnału nie mają, więc agent będzie z pełnym przekonaniem budował piękny, błędny dowód. Autor słusznie zauważa też, że rozwiązanie bez widocznych porażek ukrywa najcenniejszą wiedzę, i tak samo jest z diffem, którego nikt nie przeczytał. W eseju brakuje jednej rzeczy, czyli szacunku, ile z tego sukcesu to zasługa uprzęży i człowieka, który pisał prompt, a ile samego modelu. Skoro prompt dla problemu CDC to katalog błędów, to wiedza ekspercka siedzi już w instrukcji.

**Link:** [AI is getting good at math](https://lspace.beehiiv.com/p/ai-is-getting-good-at-math)
