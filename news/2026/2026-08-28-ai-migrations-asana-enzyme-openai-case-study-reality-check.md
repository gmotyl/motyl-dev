---
title: "Migracje z AI: dlaczego liczby OpenAI o Asanie są zawyżone, a rzeczywisty efekt wciąż imponujący"
excerpt: "Gergely Orosz rozkłada na czynniki pierwsze case study OpenAI o migracji Asany z Enzyme do React Testing Library za 12 tysięcy dolarów, zestawiając je z podobnymi migracjami Airbnb, Ubera i Buna."
publishedAt: "2026-08-28"
slug: "ai-migrations-asana-enzyme-openai-case-study-reality-check"
hashtags: "#pragmaticengineer #frontend #testing #react #testing-library #architecture #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Migracje z AI trzeba w końcu przemyśleć na spokojnie

**TLDR:** OpenAI opublikowało case study, w którym Asana rzekomo skróciła pięcioletni projekt migracji testów z Enzyme na React Testing Library do dwóch tygodni za 12 tysięcy dolarów, zamiast szacowanych 6 milionów. Gergely Orosz sprawdził te liczby u źródła i wyszło, że są mocno naciągane, choć sam efekt AI wciąż robi wrażenie.

**Summary:** Punktem zapalnym był marketingowy case study OpenAI chwalący się, że Codex pomógł Asanie usunąć Enzyme, przestarzały system testowy, w dwa tygodnie kalendarzowe (1,5 tygodnia realnej pracy inżynierskiej) za około 12 tysięcy dolarów kosztów modelu i infrastruktury, w porównaniu do szacowanych pięciu lat i sześciu milionów dolarów w podejściu tradycyjnym. Orosz od razu zauważa, że te liczby wyglądają podejrzanie: cztery osoby po 300 tysięcy dolarów rocznie pracujące pięć lat nad jedną migracją testów to skala, która budzi wątpliwości na pierwszy rzut oka.

Żeby zrozumieć, jak w ogóle wygląda taka migracja, autor pokazuje prosty przykład testu przycisku zliczającego kliknięcia w Enzyme i w React Testing Library. Kod robi to samo, ale składnia jest zupełnie inna, bo Enzyme testuje instancję komponentu, a React Testing Library operuje na wyrenderowanym DOM, widząc całą stronę, nie tylko komponent, dla którego test został napisany. To fundamentalna różnica podejścia, która sprawia, że automatyzacja tej migracji nie jest trywialnym przepisaniem składni.

Kontekst historyczny robi tu najwięcej roboty. Airbnb w marcu 2025 roku, gdy modelem frontier było jeszcze Claude 3.7 Sonnet, zmigrowało 3500 plików testów Enzyme w sześć tygodni, przy szacunku 1,5 roku pracy ręcznej. Zespół zbudował pętle ponawiające migrację, które w cztery godziny obsłużyły 75% plików, a potem bardziej wyrafinowany pipeline dla pozostałych, kończąc 97% w cztery dni, resztę w tydzień z pomocą LLM. Skoro Airbnb zrobiło to w sześć tygodni rok wcześniej, słabszym modelem, to dwa tygodnie Asany rok później, z lepszymi modelami jak GPT-5.6 Sol czy Claude Fable 5, brzmią całkiem wiarygodnie.

Orosz skontaktował się bezpośrednio z Danem Ubillą z Asany, który wyjaśnił, skąd wzięły się te liczby. Migracja zaczęła się w 2024 roku, mieli ponad 4000 plików Enzyme, pierwsze podejście z LLM-ami zmigrowało około 25% (te najłatwiejsze i najczęściej aktualizowane). Reszta stała się priorytetem "opportunistic", czyli miło by było, ale nie pilne, i przy takim priorytecie realistyczny szacunek dokończenia to było właśnie pięć lat. Szacunek 6 milionów dolarów powstał metodą "od czapy": oszacuj czas migracji jednego pliku ręcznie (hojnie), pomnóż przez liczbę plików, dodaj czas na usunięcie śladów frameworka, pomnóż przez stawkę godzinową inżyniera. Ta metoda nie uwzględnia, że migrowanie dziesięciu plików ręcznie zajmuje mniej niż dziesięciokrotność jednego pliku (uczysz się po drodze), ani nie zakłada w ogóle użycia LLM.

Artykuł zestawia to z innymi migracjami przyspieszonymi przez AI: Uber przeniósł 600 tysięcy testów jednostkowych (15 milionów linii kodu) z JUnit 4 na JUnit 5 w cztery miesiące, dwoma inżynierami. Migracja Buna z Ziga na Rusta objęła 530 tysięcy linii kodu w dwa tygodnie za 165 tysięcy dolarów kosztu API. Wspólny mianownik wszystkich tych przypadków to potrzeba zaprojektowania pętli weryfikacyjnych i zaangażowania inżynierów przez cały proces, AI nie robi tego bez nadzoru.

**Key takeaways:**
- Liczby w marketingowych case studies AI firm warto weryfikować u źródła, bo metodologia szacunku bazowego (bez AI) bywa naciągana
- Realny efekt LLM w migracjach testów jest imponujący nawet po odjęciu marketingowego przerysowania, potwierdzają to niezależnie Airbnb, Uber i Bun
- Kluczowy element sukcesu to zaprojektowane pętle weryfikacyjne i priorytetyzacja plików o najwyższym zwrocie, nie ślepe puszczenie agenta na cały kodebase

**Why do I care:** Migracje testów to dokładnie ten typ "soul-sucking" pracy, którą każdy senior odkłada latami, bo nic w niej nie buduje kariery ani produktu. Fakt, że AI realnie skraca czas takich projektów z lat do tygodni, zmienia kalkulację, które długi techniczne w ogóle warto spłacać. Ale ostrzeżenie Orosza, żeby nie ufać ślepo liczbom z case studies dostawców modeli, jest równie ważne: jeśli planujecie budżet na podobną migrację, zróbcie własny pilot na próbce plików, zanim uwierzycie w cudzy slajd z "6M dolarów oszczędności".

**Link:** [The Pulse: We need to talk about migrations with AI](https://newsletter.pragmaticengineer.com/p/the-pulse-we-need-to-talk-about-migrations-b3d?publication_id=458709&post_id=212546097&isFreemail=true&triedRedirect=true)
