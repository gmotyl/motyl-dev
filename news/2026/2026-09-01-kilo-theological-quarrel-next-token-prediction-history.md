---
title: "Od teologicznego sporu do przewidywania kolejnego tokenu: historia LLM-ów"
excerpt: "Kilo o tym, jak next-token prediction wywodzi się ze spory teologicznego dwóch rosyjskich matematyków z początku XX wieku, przez teorię informacji Shannona, modele n-gramowe, sieci neuronowe, aż do transformera i ChatGPT."
publishedAt: "2026-09-01"
slug: "kilo-theological-quarrel-next-token-prediction-history"
hashtags: "#kilo #ai #llm #ml #generated #pl"
source_pattern: "Kilo"
---

## Od teologicznego sporu do przewidywania kolejnego tokenu

**TLDR:** Idea next-token prediction, na której opierają się dzisiejsze LLM, wywodzi się ze sporu teologicznego między dwoma rosyjskimi matematykami z początku XX wieku o to, czy zdarzenia zależne mogą podlegać prawom statystycznym. Artykuł prowadzi tę linię przez Markowa, Shannona, modele n-gramowe, sieci neuronowe, mechanizm uwagi i transformer aż do ChatGPT.

**Summary:** Andriej Markow, ateista i krytyk cerkwi, prowadził spór z Pawłem Niekrasowem, matematykiem wykształconym teologicznie, który próbował użyć teorii prawdopodobieństwa do udowodnienia niezależności ludzkich wyborów, a więc wolnej woli. Markow chciał pokazać, że zdarzenia zależne od siebie, jak litery w tekście, wciąż mogą podlegać wzorcom opisywalnym matematycznie. W 1913 roku zademonstrował to analizując ręcznie 20 tysięcy liter z "Eugeniusza Oniegina" Puszkina, klasyfikując je jako samogłoski i spółgłoski i licząc, jak często jedna litera następuje po drugiej. Prawdopodobieństwo samogłoski zależało od tego, czy poprzedzała ją samogłoska czy spółgłoska, co dowodziło istnienia mierzalnych łańcuchów zależności w języku pisanym. To była tylko demonstracja matematycznego argumentu, nie próba generowania tekstu, ale postawiła pytanie, które ciągnie się przez całą historię modeli językowych: ile możemy powiedzieć o tym, co będzie dalej, na podstawie tego, co było wcześniej.

Kilka dekad później to samo pytanie wróciło w pracy Claude'a Shannona w Bell Labs, który badał, ile informacji można przesłać przez kanał komunikacyjny i jak wiele wiadomości da się zrekonstruować z kontekstu. W swojej fundamentalnej pracy o teorii informacji z 1948 roku Shannon pokazał, że losowe litery wyglądają jak szum, litery dobrane według częstości w angielskim wyglądają odrobinę bardziej znajomo, a kiedy wybór każdego symbolu bierze pod uwagę symbole poprzednie, fragmenty zaczynają przypominać prawdziwy angielski. Więcej kontekstu oznaczało wynik bardziej przypominający język. Markow pokazał, że symbole w sekwencji mogą być zależne, Shannon pokazał, że tę zależność można zmierzyć jako informację.

Przez pół wieku statystyczna technologia językowa była budowana na zliczaniu: jeśli "masło orzechowe i" było często followowane przez "dżem", model przypisywał "dżemowi" wysokie prawdopodobieństwo jako kolejnemu słowu. Takie modele n-gramowe trafiły do rozpoznawania mowy, korekty pisowni, wczesnego tłumaczenia maszynowego i autouzupełniania w telefonach, na długo przed ChatGPT. Problemem było to, że język produkuje niemal nieskończoną liczbę kombinacji, więc wiele sensownych fraz nigdy nie pojawiało się w danych treningowych, a modele nie rozpoznawały podobieństwa między "dog" i "puppy" jako dwoma osobnymi wpisami w tabeli zliczeń.

Tu wchodzą sieci neuronowe: w 2003 roku Yoshua Bengio i współpracownicy opisali sieć, która uczyła się numerycznych reprezentacji słów podczas uczenia się przewidywania kolejnego słowa, dzięki czemu "Paris", "London" i "Rome" mogły mieć podobne cechy bez konieczności występowania w identycznych kontekstach. Kluczowa zmiana to przejście od zapamiętywania fraz w ogromnych tabelach zliczeń do uczenia się wzorców, które da się przenieść na nowe, niewidziane wcześniej zdania. Kolejnym ograniczeniem była trudność przenoszenia informacji przez długie sekwencje, co rozwiązał mechanizm uwagi, początkowo zastosowany w tłumaczeniu maszynowym, pozwalający modelowi patrzeć na różne części tekstu wejściowego i przypisywać im różną wagę zamiast ściskać całe zdanie w jedną, zanikającą reprezentację.

W 2017 roku zespół Google opublikował pracę "Attention Is All You Need", wprowadzającą transformer, architekturę zbudowaną wokół mechanizmu uwagi, którą dało się trenować znacznie efektywniej na współczesnym sprzęcie niż starsze podejścia rekurencyjne. Od publikacji pracy naukowej do GPT i BERT w 2018, przez GPT-2 w 2019, GPT-3 w 2020, aż do ChatGPT w 2022 minęło zaledwie kilka lat: transformer potrzebował około trzech lat, żeby przejść z pracy naukowej do komercyjnie użytecznej platformy, i około pięciu lat, żeby stać się produktem masowym. To tempo wyjaśnia, czemu w AI pięć lat wydaje się prehistorią.

Model GPT-owy jest trenowany na zadaniu, które brzmi rozczarowująco prosto: widzi część tekstu i przewiduje następny token. Nazywanie tego "autouzupełnianiem" nie jest błędem, ale zaciera skalę trudności: żeby kontynuować przepis kulinarny, model musi nauczyć się wzorców przepisów, żeby kontynuować dokument prawny, musi wchłonąć język prawniczy, żeby kontynuować kod, musi nauczyć się powtarzających się struktur programistycznych. Sama zdolność do dobrego przewidywania kolejnego tokenu w wielu typach tekstu zmusza model do budowania wewnętrznych reprezentacji gramatyki, stylu, koncepcji i wzorców rozumowania, mimo że formalnie jest trenowany tylko do przewidywania tokenów.

Artykuł zaznacza jedną ważną różnicę, o której łatwo zapomnieć: model trenowany do przewidywania tekstu jest silnikiem kontynuacji. Sam trening next-token nie mówi modelowi, że powinien być pomocny, przestrzegać intencji użytkownika czy unikać szkodliwych instrukcji. Dodatkowy trening, w którym ludzie oceniają i porównują odpowiedzi, jest tym, co zamienia surowy model bazowy w coś bliższego asystentowi, i to właśnie ta warstwa w dużej mierze odpowiada za "osobowość" produktów konwersacyjnych, które znamy.

**Key takeaways:**
- Idea next-token prediction wywodzi się ze sporu teologicznego Markowa i Niekrasowa o to, czy zdarzenia zależne mogą podlegać prawom statystycznym.
- Shannon połączył przewidywalność języka z teorią informacji, a modele n-gramowe zamieniły to w praktyczną technologię zliczania.
- Sieci neuronowe (Bengio, 2003) wprowadziły uczone reprezentacje słów, mechanizm uwagi rozwiązał problem długich zależności, a transformer (2017) uczynił to skalowalnym.
- Trening next-token tworzy silnik kontynuacji, nie asystenta; dodatkowy trening na ludzkiej ocenie odpowiedzi dodaje "pomocność" i przestrzeganie intencji.

**Why do I care:** Znajomość tej historii pomaga mi tłumaczyć zespołom, czemu LLM czasem "halucynuje" z pełnym przekonaniem: model jest w gruncie rzeczy silnikiem kontynuacji, wyuczonym na przewidywaniu prawdopodobnego następnego tokenu, a nie systemem weryfikującym fakty. Kiedy ktoś pyta, czemu model tak dobrze pisze kod, a czasem zmyśla nieistniejące API, odpowiedź leży właśnie w tym rozróżnieniu między przewidywaniem prawdopodobnej kontynuacji i sprawdzaniem prawdy.

**Link:** [From a Theological Quarrel to Next-Token Prediction](https://blog.kilo.ai/p/from-a-theological-quarrel-to-next)
