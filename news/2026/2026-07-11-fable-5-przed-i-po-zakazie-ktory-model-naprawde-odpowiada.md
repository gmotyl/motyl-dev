---
title: "Fable 5 przed i po zakazie: który model naprawdę odpowiada na Twoje zapytania?"
excerpt: "Kilo AI przeprowadziło testy benchmark Fable 5 przed i po interwencji rządu USA, ujawniając zaskakującą różnicę w tym, jak często użytkownicy faktycznie rozmawiają z modelem, o który prosili."
publishedAt: "2026-07-11"
slug: "fable-5-przed-i-po-zakazie-ktory-model-naprawde-odpowiada"
hashtags: "#ai #llm #agents #productivity #generated #pl #anthropic #fable #benchmark #safety #policy"
source_pattern: "Kilo"
---

## Fable 5 przed i po zakazie: który model naprawdę odpowiada na Twoje zapytania?

**TLDR:** Kilo AI uruchomiło identyczny zestaw benchmarków na Fable 5 przed i po tym, jak rząd USA nakazał Anthropic wycofać model i przetraining klasyfikatora bezpieczeństwa. Liczba interwencji zmieniła się nieznacznie, ale ich charakter całkowicie się odwrócił. Dziś zamiast odmów dostajesz ciche przełączenia na inny model, często bez wiedzy o tym, że Fable nigdy nie dotknął Twojego zadania.

**Summary:**

Kiedy Fable 5 pojawił się 9 czerwca, Kilo natychmiast uruchomiło swój zestaw testów KiloBench. Trzy dni później Departament Handlu USA nakazał Anthropic zdjąć model ze względu na raport badaczy Amazon, którzy wykazali technikę obejścia zabezpieczeń pozwalającą identyfikować luki w oprogramowaniu. Model wrócił 1 lipca z nowym, celowo bardziej konserwatywnym klasyfikatorem. To rzadka sytuacja: te same zadania, ten sam zestaw testów, dwa różne momenty w historii polityki AI.

Wyniki na papierze wyglądają prawie identycznie. W obu uruchomieniach pokryto 445 sesji. Przed zakazem 88 sesji (około 20%) wywołało interwencję klasyfikatora. Po powrocie było to 98 sesji (około 22%). Dwie liczby, które na pierwszy rzut oka mówią: "nic się nie zmieniło". Ale to kompletnie mija się z prawdą.

W czerwcowym uruchomieniu każda z 88 interwencji była odmową. Klasyfikator powiedział nie i na tym koniec, żadna sesja nie dostała odpowiedzi od Opus 4.8. Co więcej, 76 z 88 flagowanych sesji zakończyło się po jednym kroku. Prymitywne, ale uczciwe. W lipcowym uruchomieniu obraz się odwrócił: tylko 17 sesji zobaczyło odmowę, natomiast 92 skończyły się przełączeniem na Opus. Na poziomie poszczególnych kroków 861 z 5408 kroków obsłużył Opus, mniej więcej co szósty. W 53 sesjach każdy krok bez wyjątku trafił do Opus, włącznie z sesjami liczącymi 31, 27 i 25 kroków. Prosiłeś o Fable, sesja przebiegła od początku do końca i Fable ani razu nie dotknął Twojego zadania.

To jest fundamentalna różnica pod względem transparentności. Odmowa jest ordynarna, ale przynajmniej wiesz, gdzie stoisz. Możesz przekierować zadanie gdzie indziej. Ciche przełączenie jest inne. Zadanie się kończy, wynik wygląda sensownie, i jeśli nie śledzisz powiadomień albo logów użycia, możesz nigdy nie wiedzieć, że inny model wykonał całą pracę. Dla długo działającego agenta oznacza to, że model może się zmienić w połowie zadania, a nikt w pętli tego nie zauważy. Twoje koszty, latencja, ewaluacje i standardy przeglądu wszystkie zależą od tego, który model faktycznie pracował.

Jest też szerszy wymiar tej historii, którego nie można zbagatelizować. To pierwszy raz, kiedy model frontierowy został wycofany z rynku przez rząd i wrócił z wynegocjowanym zachowaniem. Precedens nie polega na tym, że Fable stał się gorszy, bo gdy go dostaniesz, wydaje się tym samym modelem co w czerwcu. Precedens polega na tym, że odpowiedź na pytanie "z którym modelem rozmawiam?" jest teraz częściowo kwestią polityczną, rozstrzyganą między laboratiorium a regulatorem, egzekwowaną przez klasyfikator, którego nie możesz zbadać ani przetestować z wyprzedzeniem.

**Key takeaways:**

- Łączna liczba interwencji klasyfikatora przed i po zakazie zmieniła się marginalnie (88 vs 98 sesji na 445), ale ich charakter odwrócił się całkowicie.
- Przed zakazem: wszystkie interwencje to odmowy. Po zakazie: głównie ciche przełączenia na Opus 4.8.
- W 53 sesjach po powrocie Fable, każdy krok obsłużył Opus, a użytkownik mógł tego nie zauważyć.
- Zewnętrzne benchmarki "Fable 5" opublikowane w tym miesiącu mogą częściowo mierzyć Opus 4.8, co tłumaczy dramatyczne spadki wyników u niektórych ewaluatorów.
- To pierwszy przypadek modelu frontierowego wycofanego przez rząd i przywróconego z wynegocjowanymi zachowaniami.
- Jeśli dana kategoria zadań regularnie wywołuje przełączenie, warto wprost przypiąć te zadania do Opus i uniknąć niepewności.

**Why do I care:**

Z perspektywy architekta budującego systemy AI, to jest właśnie ten rodzaj szczegółu operacyjnego, który robi różnicę między systemem produkcyjnym a prototypem. Gdy wdrażamy agenty, zakładamy określony model z określonymi właściwościami: kosztem, latencją, stylem rozumowania, ograniczeniami kontekstu. Ciche przełączenie w połowie agentycznego zadania niszczy te założenia bez żadnego sygnału błędu. Ewaluacje regresji, które śledzisz, mogą mierzyć coś innego niż myślisz. Koszty mogą być inne niż zaplanowałeś. To nie jest problem bezpieczeństwa, to problem inżynierii systemów i obserwowalności. Każde środowisko produkcyjne musi logować, który model faktycznie obsłużył każdy krok, nie tylko który model był żądany.

**Link:** [We Ran Fable 5 Before and After the Ban. Here's How Often You Actually Get Fable.](https://blog.kilo.ai/p/fable-before-and-after)
