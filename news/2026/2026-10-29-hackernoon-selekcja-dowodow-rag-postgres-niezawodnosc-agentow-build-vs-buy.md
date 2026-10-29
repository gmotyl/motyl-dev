---
title: "AI, które myli bez kłamania, prosty RAG na jednej tabeli Postgresa, pięć zasad niezawodnych agentów i dlaczego warto wynająć kozy"
excerpt: "Selekcja dowodów jako źródło wprowadzania w błąd, jedna tabela zamiast złożonego pipeline'u RAG, zasady pętli agenta i decyzja build czy buy."
publishedAt: "2026-10-29"
slug: "hackernoon-selekcja-dowodow-rag-postgres-niezawodnosc-agentow-build-vs-buy"
hashtags: "#hackernoon #ai #agents #llm #architecture #postgresql #testing #observability #generated #pl"
source_pattern: "HackerNoon"
---

## AI nie musi zmyślać, żeby wprowadzić cię w błąd

**TLDR:** Autor pokazuje, że prawdziwe fakty ułożone w odpowiedniej kolejności potrafią zasugerować wniosek, którego żaden z nich nie dowodzi. Proponuje pytać nie tylko, czy fakt jest prawdziwy, ale dlaczego wybrano akurat te fakty.

**Summary:** Tekst zaczyna się od sztuczki. Trzy cytaty, od Huxleya, Nietzschego i Blake'a, ułożone razem wyglądają jak jeden spójny argument, choć ich autorzy nie współpracowali. Potem przykład z pięcioma zdaniami o relacjach Rosji i Iranu. Cztery są sprawdzalne, a piąte, o bogactwie rosyjskich elit, opiera się wyłącznie na obiegowej opinii, ale przez sąsiedztwo z faktami zyskuje autorytet. Co więcej, nawet bez piątego zdania układ pozostałych czterech sugeruje skoordynowaną strategię, której nikt nie udowodnił.

Z tego wynika pojęcie pochodzenia selekcji. Pochodzenie źródła mówi, skąd jest informacja, a pochodzenie selekcji pyta, jak informacja trafiła do odpowiedzi i co pominięto. Model może przytoczyć każde źródło poprawnie i nadal dobrać dowody jednostronnie, bo wybór zależy od danych treningowych, promptu i tego, co wyszukał retriever. Nie wystarczy zapytać modelu, dlaczego wybrał te fakty, bo uzasadnienie może być wiarygodne i nieprawdziwe. Autor proponuje eksperyment, czyli ten sam korpus faktów dla kilku modeli, zapis tego, co każdy wybrał i pominął, a potem powtórzenie z wymogiem rozważenia dowodów przeciwnych.

**Key takeaways:**
- Prawdziwe zdania mogą tworzyć fałszywe wrażenie przez dobór i kolejność.
- Poprawność faktów nie dowodzi bezstronności analizy.
- Selekcję da się testować, porównując dostępne dowody z przedstawionymi.

**Why do I care:** Dla zespołów budujących streszczenia, analizy ryzyka czy oceny wniosków to realne ryzyko, bo audyt sprawdza zwykle źródła, a nie dobór. Brakuje w tekście liczb, czyli żadnego wyniku z proponowanego eksperymentu. Jest to więc na razie dobry pomysł na test, a nie dowód.

**Link:** [AI Doesn't Have to Make Things Up to Mislead You](https://hackernoon.com/ai-doesnt-have-to-make-things-up-to-mislead-you)

## Złożoność RAG to zakład przeciwko modelowi

**TLDR:** Jedna tabela w Postgresie z dwoma indeksami i serwer MCP wyprzedziły opublikowane pipeline'y RAG na MuSiQue i zajęły trzecie miejsce na BRIGHT.

**Summary:** Teza jest taka, że każdy dodatek w pipeline'ie, jak planista zapytań, graf wiedzy czy reranker, to zakład, że model nadal będzie potrzebował tej pomocy. Kiedy model się poprawi, dodatek staje się długiem. Cały system to tabela z indeksem wektorowym HNSW i indeksem BM25 oraz narzędzie MCP z trzema trybami wyszukiwania, czyli semantycznym, pełnotekstowym i grep. Wyniki łączy się przez Reciprocal Rank Fusion. Claude sam decyduje, co i ile razy szukać.

Na MuSiQue z Haiku wynik to 0,418 EM i 0,564 trafności, a najlepszy porównywany system, PAR-RAG, miał 0,33 i 0,43. Co ciekawe, każda z pięciu prób ulepszeń, na przykład wymuszenie hybrydowego wyszukiwania albo dekompozycja podpytań, pogarszała wynik, a to zostało zachowane jako główna lekcja. Na BRIGHT średnia nDCG@10 to 0,556. Przeważyły tu prompty dopasowane do rodzaju korpusu i dla dwóch domen dodatkowa kolumna z krótkim opisem dokumentu, tak zwanym szkicem pojęciowym. Oba są usuwalne, jeśli kolejny model je zastąpi.

Autorzy uczciwie piszą o cenie. Zapytanie kosztuje około 0,65 dolara przy Opusie, a wyspecjalizowany retriever około 0,0001. Punkt zwrotu przy 50 tysiącach dolarów treningu wypada koło 77 tysięcy zapytań.

**Key takeaways:**
- Prosty stos z dobrym modelem dorównuje złożonym pipeline'om albo je przewyższa.
- Metoda polega na tym, że każdą zmianę mierzy się na parach zapytań, a po trzech nieudanych wariantach hipotezę zamyka się.
- Cienki stos jest tani w budowie, ale droższy w użyciu na zapytanie.

**Why do I care:** Wynik jest imponujący, ale tekst pochodzi od zespołu Tiger Data i testy odbyły się na ich platformie, a podpowiedzi dla korpusów dostrajano na tym samym zbiorze, który oceniano. Autorzy sami to przyznają. Zakład na tańsze modele w przyszłości to prognoza, nie fakt. Dla systemu z milionami zapytań miesięcznie wyspecjalizowany retriever wciąż wygrywa kosztowo.

**Link:** [RAG Complexity Is a Bet Against the Model](https://hackernoon.com/rag-complexity-is-a-bet-against-the-model)

## Pięć zasad niezawodnych agentów produkcyjnych

**TLDR:** Autor budujący agenta obsługi posprzedażowej Kept wyciąga pięć zasad. Maszyna stanów przed kodem, osobny host dla pętli, błędy jako wyniki, atomowa historia i trzy poziomy asercji w testach.

**Summary:** Pierwsza zasada to rozpisanie maszyny stanów przed napisaniem kodu. Zdarzenia, stany i stany końcowe tworzą tabelę, a każda komórka staje się fikstura testową. Druga to oddzielenie pętli od hosta, który zapewnia, że w danej rozmowie biegnie jedno żądanie naraz, trzyma blokadę, zapisuje historię i zamyka ślady. Trzecia mówi, żeby błędy zamieniać w wyniki. Przepełnienie kontekstu, które w API wraca jako błąd 400, trzeba przekształcić w stan zakończenia, żeby host mógł zamknąć rozmowę. Zbiór rodzajów porażek ma być zamknięty i nie wolno wrzucać wszystkiego do kategorii ogólnej.

Czwarta zasada to atomowość historii. Tura zapisuje wszystkie wiadomości albo żadnej, więc nieudana tura nie psuje rozmowy, bo na przykład obcięte wywołanie narzędzia bez odpowiedzi sprawiałoby, że dostawca odrzuca każde kolejne wywołanie. Limit rund trzeba sprawdzać przed wywołaniem narzędzia, a nie po. Piąta zasada to testy, które sprawdzają wynik, zapisaną historię i kształt śladu. Do tego wspólny zestaw testów kontraktowych dla każdego dostawcy modelu.

**Key takeaways:**
- Rozpisz wszystkie sposoby zakończenia tury, zanim napiszesz pętlę.
- Zamiast rzucać wyjątki, zwracaj wyniki, które host potrafi obsłużyć.
- Nieudana tura zwraca historię nietkniętą, a porzucone wiadomości zostają w śladzie.

**Why do I care:** To użyteczna lista kontrolna do przeglądu tego, co napisał twój agent kodujący. Autor zaznacza, że narzędzia są największym źródłem zawodności, ale w tym tekście ich nie omawia. Obiecuje osobny artykuł, więc na razie obraz jest niepełny.

**Link:** [Five Reliability Principles for Production AI Agents](https://hackernoon.com/five-reliability-principles-for-production-ai-agents)

## Dyktowanie projektów do Codexa i druk 3D

**TLDR:** Autor, który trzy miesiące temu nie miał drukarki 3D, dyktuje projekty Codexowi przez Wispr Flow i drukuje uchwyty dopasowane do swojego głośnika, tablicy ściennej i mierników.

**Summary:** Pierwsze wersje wkładek na mierniki wchodziły, ale nie dawały się wyjąć, a bardziej złożona kołyska pozwalała okrągłemu miernikowi się obracać. Autor powiedział więc po prostu, że woli coś w rodzaju pierwszej wersji, tylko ze szczelinami do wyciągania. Dopiero po kilku iteracjach, z uchwytem pośrednim między zbyt luźnym a zbyt ciasnym, oba wkłady trzymały i dawały się wyjąć. Zmiana usuwająca niewygodny cokół jest sprawdzona cyfrowo, ale jeszcze nie wydrukowana.

**Key takeaways:**
- Iteracja z prawdziwym obiektem w ręku działa jak rozmowa projektowa.
- Modyfikowanie istniejących projektów jest równie przydatne jak tworzenie od zera.

**Why do I care:** To jest miły tekst o hobby i nie ma wniosków dla architektury. Pokazuje jednak, że pętla opisz, wydrukuj, popraw działa także poza kodem, o ile masz fizyczny test, który mówi, kiedy jest dobrze.

**Link:** [How I Use Codex and Wispr Flow to Create Custom 3D Prints](https://hackernoon.com/how-i-use-codex-and-wispr-flow-to-create-custom-3d-prints)

## Kiedy budować, a kiedy wynająć kozy

**TLDR:** VP of Product z Learnosity porównuje pochłaniające czas budowanie niezwiązanych z rdzeniem komponentów do chwastów, które odrastają, i radzi zapytać, ile kosztuje utrzymanie, a nie tylko zbudowanie.

**Summary:** Punktem wyjścia jest historia o ogrodzie i wynajętych kozach, które w tydzień zjadły zarośla. Potem autorka opisuje, jak sama zdecydowała się zbudować własne uwierzytelnianie w produkcie administracyjnym. Zajęło to całemu zespołowi trzy miesiące, a nikt nie cieszył się z możliwości zresetowania hasła. Zespoły budują, bo mają szczególne potrzeby i chcą elastyczności, bo inżynierowie lubią wyzwania i boją się kosztu integracji. Koszty budowy są niewidoczne od początku, a roczne szacunki zamieniają się w trzyletnie projekty.

Przykładem są zadania przeciągania w ocenach. Zgodność z WCAG wymaga trzech sposobów interakcji, czyli przeciągania, kliknięcia i klawiatury, a nowoczesne biblioteki nie dają tego z automatu razem ze spójnym punktowaniem. Z AI autorka zgadza się tylko częściowo. Kod powstaje szybko, ale ktoś musi go przeglądać i utrzymywać, więc pytanie brzmi, czy to twoi inżynierowie, czy cudzy.

**Key takeaways:**
- Zapytaj, ile potrwa zbudowanie, a przede wszystkim ile potrwa utrzymanie na skalę.
- Zgodność i dostępność zmieniają się i same są stałym kosztem.
- AI przyspiesza pisanie, ale nie zdejmuje kosztu utrzymania.

**Why do I care:** Autorka sprzedaje gotowe komponenty ocen, więc ma interes w odpowiedzi kup. Sama rada jest jednak rozsądna, tylko trzeba uczciwie liczyć także koszt zależności od cudzej mapy drogowej. Nie należy czytać tego jako uniwersalnej reguły. Dla własnego uwierzytelniania i płatności wynajęcie rozwiązania zwykle się opłaca.

**Link:** [Overgrowth in your product garden? Send in the goats](https://hackernoon.com/overgrowth-in-your-product-garden-send-in-the-goats)
