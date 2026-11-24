---
title: "Ile kosztuje zaakceptowana zmiana od AI i jak prowadzić siedmiu agentów marketingowych w Kilo Desktop"
excerpt: "Kilo pokazuje, jak liczyć koszt na zaakceptowaną zmianę zamiast ceny za token, oraz jak zbudować zespół siedmiu agentów z plików Markdown."
publishedAt: "2026-11-23"
slug: "kilo-koszt-zaakceptowanej-zmiany-siedmiu-agentow-marketingowych"
hashtags: "#kilo #ai #agents #llm #devtools #productivity #generated #pl"
source_pattern: "Kilo"
---

## Ile kosztuje zaakceptowana zmiana kodu od AI

**TLDR:** Cena tokenów nie mówi, który model jest tańszy. Kilo proponuje liczyć całkowity koszt wszystkich prób, w tym nieudanych, podzielony przez liczbę zmian, które przeszły twoje kryteria akceptacji.

**Summary:** Punkt wyjścia jest prosty. Tani model może wypuścić łatkę wymagającą dwóch poprawek, a droższy skończy zadanie za pierwszym razem. Same ceny tokenów nie rozstrzygną, który wyszedł taniej, bo liczą się opłaty za każdą próbę i czas, który spędziłeś na przeprowadzeniu zmiany przez review.

Kilo opisuje test porównujący tryb Auto Efficient, który dobiera model do trudności zapytania i kontekstu sesji, ze stałym modelem. Najpierw trzeba zdefiniować, czym jest zaakceptowana zmiana. Bierzesz kilka rozwiązanych zgłoszeń z repozytorium, cofasz kod do stanu sprzed poprawki, ukrywasz wszystko, co zdradza rozwiązanie, i piszesz sprawdzalne kryteria. Z góry ustalasz też, co dyskwalifikuje łatkę, na przykład wyłączenie testu albo dodanie niezatwierdzonej zależności.

Potem uruchamiasz oba warianty w świeżych sesjach, z tymi samymi plikami, uprawnieniami i regułą zatrzymania, na przykład dwadzieścia minut i jedna runda z wynikiem nieudanych testów. Koszt dzielisz przez liczbę zaakceptowanych zmian i nigdy nie wyrzucasz nieudanych prób z rachunku. W przykładzie z tekstu setup A wydaje 1,20 dolara na cztery zaakceptowane zmiany, a B wydaje 2,40 dolara na dwanaście. A kosztuje 0,30 dolara za akceptację, B tylko 0,20, choć wydaje dwa razy więcej. Autorzy zaznaczają, że to ilustracja arytmetyki, nie wyniki benchmarku.

Osobno zapisujesz minuty własnej uwagi, bo model pracujący dziesięć minut w tle to co innego niż dziesięć minut tłumaczenia. Na końcu ustalasz domyślny model dla każdego typu zadań i budżet poprawek, a po przekroczeniu limitu przekazujesz kolejnemu modelowi dowody porażki.

**Key takeaways:**
- Mierz koszt na zaakceptowaną zmianę, wliczając nieudane próby.
- Kryteria akceptacji i dyskwalifikacje definiuj przed pierwszym uruchomieniem.
- Czas człowieka raportuj osobno od czasu zegarowego modelu.

**Why do I care:** Ta metoda jest warta stosowania nawet bez Kilo, bo mało który zespół wie, ile naprawdę kosztuje jego asystent kodowania. Autor nie dotyka jednak jednej rzeczy: osiem zadań to próbka, w której jedna dziwna sprawa zmienia wynik. Traktuj to jako szablon eksperymentu, nie jako dowód.

**Link:** [What Does an Accepted AI Code Change Cost?](https://blog.kilo.ai/p/what-does-an-accepted-ai-code-change)

## Siedmiu agentów marketingowych w Kilo Desktop

**TLDR:** Nikola Vuckovic z Kilo prowadzi zespół siedmiu agentów zdefiniowanych jako pliki Markdown, z jednym plikiem routingu i ręcznym wyborem modelu na każdym etapie. Nic nie jest publikowane bez człowieka.

**Summary:** Zadanie takie jak "zbadaj, jak founderzy zdobywają pierwszych użytkowników, i napisz post oraz serię na LinkedIn" trafia do czterech agentów po kolei. Badacz zbiera dane ze źródłami, strateg wybiera kąt, autor bloga pisze z pliku badawczego, a drugi autor tnie artykuł na posty. Każdy zostawia plik, od którego startuje następny. Prostsze prośby uruchamiają jednego agenta.

Agenci to pliki w katalogu .kilo/agents. Nazwa pliku jest nazwą agenta, nagłówek mówi, kiedy go użyć, a reszta to instrukcje. Główny agent czyta te opisy, żeby zdecydować o routingu, więc jaśniejszy opis to lepszy podział pracy. Reguły ruchu trzyma jeden plik AGENTS.md w korzeniu projektu, który zapisuje też typowe łańcuchy. Każda reguła kończy się tym, czego agent nie robi. Analityk danych, który przez dwa serwery MCP czyta Google Analytics i Search Console, ma jawnie zakaz tworzenia treści.

Pamięć to po prostu folder z notatkami. Kilo Desktop nie ma pamięci per agent, więc pięciu agentów dostaje w instrukcji polecenie czytania notatek przed zadaniem i aktualizowania ich po nim. Model wybierasz ręcznie z ponad pięciuset w pickerze. Sesja startuje na Auto Efficient, badania i brief powstają tanio, autor czyta oba pliki i poprawia kąt, a dopiero potem przełącza się na Opus 5.5 do pisania. To najtańsze miejsce na korektę: jeden brief zamiast artykułu i całej serii.

Autor tekstu dodaje własną lekcję. Agent od obrazów zawiódł, bo kontekst i gust były tylko w jego głowie. Dlatego każde zlecenie niesie teraz handoff z preferencjami, przykładami i odrzuconymi pomysłami. Jego agenci proponują lekcję i czekają na zatwierdzenie, bo "zatwierdzone dla tego posta" to nie to samo co "zawsze tak rób".

**Key takeaways:**
- Jeden agent, jedno zadanie, i jawna lista rzeczy, których agent nie robi.
- Kontekst przekazuj plikami ze źródłami, a pamięć trzymaj w czytelnym folderze.
- Wybór modelu to decyzja per etap, a zatrzymanie po briefie jest najtańszym punktem kontroli.

**Why do I care:** Dla mnie to dobry opis wzorca, który działa też w zespole inżynierskim: małe agenty z wąskim zakresem, kontrakt przez pliki, człowiek na bramce. Zwróć uwagę, że brak narzędzi publikacji to jedyne zabezpieczenie, a autor sam przyznaje, że nie ma reguły technicznej. To uczciwe, ale też słabe. Przy agentach z prawem zapisu ograniczenia muszą żyć poza modelem.

**Link:** [How to Run a Seven-Agent Marketing Team in Kilo Desktop](https://blog.kilo.ai/p/how-to-run-a-seven-agent-marketing)
