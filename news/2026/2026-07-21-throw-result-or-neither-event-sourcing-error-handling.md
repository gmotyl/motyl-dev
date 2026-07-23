---
title: "Throw, Result, czy coś zupełnie innego? O obsłudze błędów w Event Sourcing"
excerpt: "Oskar Dudycz tłumaczy, dlaczego w Event Sourcing odpowiedź na pytanie o obsługę błędów jest często: 'ani throw, ani Result'."
publishedAt: "2026-07-21"
slug: "throw-result-or-neither-event-sourcing-error-handling"
hashtags: "#oskardudycz #architecture #backend #event-sourcing #cqrs #domain-driven-design #error-handling #generated #pl"
source_pattern: "OskarDudycz"
---

## Throw, Result, czy coś zupełnie innego?

**TLDR:** Oskar Dudycz odpowiada na pytanie, które często dostaje od czytelników: dlaczego w kodzie event-sourcingowym rzuca wyjątkami zamiast używać Result? Odpowiedź jest bardziej zniuansowana niż "jedno jest lepsze od drugiego" — wszystko zależy od tego, czym dana awaria jest w kontekście biznesowym. Czasem właściwą odpowiedzią jest zdarzenie, nie wyjątek ani nie typ Result.

**Summary:**

Dudycz zaczyna od prostej obserwacji: gdy ktoś widzi wyjątek w jego kodzie event-sourcingowym, natychmiast pojawia się pytanie "dlaczego nie używasz Result?". To uczciwe pytanie, ale typ zwracany to tylko część odpowiedzi. W rzeczywistości Dudycz używa trzech strategii: rzucania wyjątku, zwracania Result oraz — co najciekawsze — zwracania zdarzenia biznesowego. Wybór zależy od tego, co dana awaria oznacza semantycznie i co aplikacja powinna z nią zrobić.

Kluczowy insight polega na tym, że niektóre "awarie" mają wartość jako dane biznesowe. Żądanie na produkt, którego nie ma na stanie, to nie tylko błąd — to informacja o niezaspokojonym popycie. Odmowa płatności może zainicjować inny proces. Przekroczenie limitu produktów w koszyku może wyjaśniać, dlaczego klienci porzucają operację. Gojko Adzic nazywa systematyczne wykorzystywanie nieoczekiwanych wzorców użycia do ulepszania produktu "lizard optimization". Event Sourcing daje nam tutaj przewagę: możemy modelować negatywne wyniki jako zdarzenia, tak samo jak pozytywne. Biznes logic informuje nas o tym, co się stało, a nie o tym, czy to sukces czy błąd.

Dudycz pokazuje, że gdy mamy zdarzenia takie jak `ProductItemOutOfStock`, `ShoppingCartItemLimitReached` czy `ProductItemAdded`, typ Result tak naprawdę nie dodaje wiele poza klasyfikacją sukces/porażka. Klasyfikacja ta i tak istnieje w samych typach zdarzeń — po prostu trzeba napisać więcej kodu, żeby ją wyciągnąć, a na dodatek łatwo ją przeoczyć. Widział wiele codebases, gdzie ludzie ślepo wyciszali wszystkie błędy bez żadnego zysku, zaśmiecając kod. Do tego nadal trzeba owijać kod w try/catch i mieć konwencjonalną warstwę mapowania.

Szczególnie interesujący jest fragment o imporcie wsadowym. To tu widać największą wartość podejścia opartego na zdarzeniach. W scenariuszu importu zewnętrznego systemu e-commerce nie możemy po prostu rzucić wyjątkiem, gdy jeden produkt nie jest dostępny — to zatrzymałoby cały import. Zamiast tego każda linia importu może zakończyć się inaczej: akceptacją, pominięciem, zatrzymaniem, lub odrzuceniem całego wsadu. Emmett, framework Dudycza, pozwala na definiowanie tych reguł jako middleware wokół handlera komend, co sprawia, że logika biznesowa pozostaje czysta, a decyzje o persystencji i kontynuowaniu są oddzielone.

Wyjątki nadal mają swoje miejsce: nieprawidłowe operacje, niedostępność event store, błędy deserializacji. To sytuacje, gdzie nie ma biznesowego wyniku do zaraportowania. Ale projekcje i reaktory działające asynchronicznie nie mają nad sobą nic, co mogłoby złapać wyjątek — tam rzucenie wyjątku tylko zatrzymuje procesor i pozostawia późniejsze zdarzenia nieprzetworzene. Projekcja nie może cofnąć zdarzenia, które już zostało zapisane; może tylko zbudować z niego jak najlepszy model odczytu.

**Key takeaways:**
- Nie ma jednej właściwej odpowiedzi między throw, Result i zdarzeniem — wybór zależy od semantyki awarii w kontekście biznesowym
- Zdarzenia biznesowe (jak `ProductItemOutOfStock`) mogą być cenniejsze niż wyjątki lub Result, bo zawierają dane o tym, co się stało, i mogą być konsumowane przez projekcje, workflow i inne procesy
- W scenariuszach asynchronicznych i batch-owych rzucanie wyjątków jest często złym wyborem, bo zatrzymuje przetwarzanie bez możliwości odzyskania stanu
- Result w popularnych językach jak TypeScript, Java, C# nie jest natywnym idiomem i dodaje szum do kodu bez zastąpienia warstwy obsługi wyjątków
- Projekcje nie mogą zapobiec zapisaniu zdarzenia — błędy w projekcjach są za późne; walidacja należy do logiki biznesowej przed persystencją

**Why do I care:**

To jest artykuł, który warto przeczytać nie dlatego, że daje prostą odpowiedź, ale dlatego, że pokazuje, że dobre pytanie brzmi nie "throw czy Result?", ale "co ta awaria oznacza biznesowo?". W praktyce często widzę, że zespoły przyjmują Result jako modę bez zastanowienia się, co wnosi w konkretnym kontekście. Szczególnie cenny jest insight o imporcie wsadowym — to rzeczywisty scenariusz, gdzie rzucanie wyjątkami jest zwyczajnie złym narzędziem. Z drugiej strony, trochę brakuje mi bardziej krytycznej analizy kosztów cognitive load związanego z API Emmett; gdy logika middleware staje się złożona, czytelność może ucierpieć. Niemniej, centralna teza — że zdarzenie jako wynik jest często lepszym narzędziem niż throw lub Result — jest przekonująca i dobrze uzasadniona.

**Link:** [Throw, Result, or neither?](https://www.architecture-weekly.com/p/throw-result-or-neither?publication_id=579466&post_id=207805592&isFreemail=true&triedRedirect=true)
