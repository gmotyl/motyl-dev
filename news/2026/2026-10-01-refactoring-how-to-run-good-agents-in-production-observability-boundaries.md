---
title: "Jak uruchamiać dobre agenty na produkcji: obserwowalność, granice i człowiek w pętli"
excerpt: "Luca z Refactoring rozkłada dobre praktyki uruchamiania agentowych workflow na produkcji na pięć filarów, od tego, co faktycznie warto logować, po to, kiedy postawić bramkę zatwierdzenia przez człowieka."
publishedAt: "2026-09-30"
slug: "refactoring-how-to-run-good-agents-in-production-observability-boundaries"
hashtags: "#refactoring #agents #ai #observability #architecture #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Jak uruchamiać dobre agenty na produkcji

**TLDR:** Po rozmowach z zespołami, które faktycznie uruchamiają agentowe workflow na produkcji (nie tylko w demo), autor rozkłada temat na obserwowalność, granice między danymi wrażliwymi a resztą systemu, decyzję kiedy postawić człowieka w pętli, oraz jak w ogóle zacząć bez przepisywania wszystkiego naraz.

**Streszczenie:** Punktem wyjścia jest obserwacja, którą autor już widział wcześniej: podobnie jak w 2022 roku, gdy połowa zespołów budowała własne, prowizoryczne narzędzia do mierzenia metryk inżynierskich zamiast kupować gotowe, dziś wiele zespołów samodzielnie loguje podstawowe dane o przebiegach agentów, zazwyczaj zużycie tokenów i finalną odpowiedź. To dobry pierwszy krok, bo zmusza do zrozumienia, czego faktycznie potrzeba, ale takie prowizoryczne rozwiązania przestają wystarczać, gdy trzeba zejść do konkretnego kroku w długim, kosztownym przebiegu, który nagle się wywalił w połowie.

Autor definiuje pięć rzeczy, które dobra obserwowalność agentowych workflow powinna dawać z jednego systemu: wyniki pośrednich kroków, nie tylko finalny blob (pobrany rekord, klasyfikacja, szkic, który o mało nie został wysłany), tokeny i koszt rozbite per krok, model i narzędzie, informację które serwery i narzędzia MCP zostały wywołane z jakimi wejściami i wyjściami, kto lub co wyzwoliło dany przebieg (człowiek ręcznie, harmonogram, webhook, inny agent), oraz stan w momencie awarii: który krok zawiódł, co zostało już zatwierdzone, co bezpiecznie powtórzyć. Bez tego ostatniego punktu długi, kosztowny job, który pada w połowie, zmusza albo do ślepego powtarzania całości, albo do ręcznego grzebania w logach, żeby ustalić, od którego miejsca bezpiecznie wznowić.

**Kluczowe wnioski:**
- Logowanie tylko tokenów i finalnej odpowiedzi wystarcza do startu, ale nie skaluje się do długich, kosztownych przebiegów padających w połowie.
- Dobra obserwowalność agentowego workflow pokazuje wyniki pośrednich kroków, nie tylko wynik końcowy.
- Informacja o tym, kto lub co wyzwoliło dany przebieg (człowiek, harmonogram, webhook, inny agent) ma znaczenie przy późniejszym audycie.
- Stan w momencie awarii (który krok zawiódł, co jest bezpieczne do powtórzenia) pozwala wznawiać zamiast powtarzać całość od zera.

**Dlaczego mi na tym zależy:** To pragmatyczna checklista dla każdego, kto właśnie zaczyna wprowadzać agentowe workflow do produkcyjnego systemu i zastanawia się, co logować, zanim zacznie boleć. Paralela z metrykami inżynierskimi sprzed kilku lat jest trafna: prowizoryczne rozwiązanie sklejone samemu jest dobre jako nauka, ale kosztowne jako długoterminowa strategia, więc lepiej świadomie zaplanować te pięć punktów od początku, niż dochodzić do nich metodą prób i błędów po pierwszej poważnej awarii na produkcji.

**Link:** [How To Run Good Agents In Production](https://refactoring.fm/p/how-to-run-good-agents-in-production)
