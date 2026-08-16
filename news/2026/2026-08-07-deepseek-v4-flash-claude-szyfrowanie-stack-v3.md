---
title: "DeepSeek-V4-Flash bije Pro, Claude znajduje dziurę w szyfrowaniu odpornym na kwanty, a Hugging Face zalewa świat kodem"
excerpt: "Przegląd najnowszego numeru The Batch: nowy model DeepSeek, atak Claude na kandydata do post-kwantowej kryptografii, gigantyczny zrzut kodu z GitHub i system automatycznie generujący bezpieczniejsze prompty dla modeli piszących kod."
publishedAt: "2026-08-07"
slug: "deepseek-v4-flash-claude-szyfrowanie-stack-v3"
hashtags: "#thebatch #ai #deepseek #claude #cybersecurity #opensource #generated #pl"
source_pattern: "The Batch"
---

## Tokenmaxxing, czyli pułapka spalania tokenów na zapas

**TLDR:** Autor otwierającego listu zauważa, że moda na "tokenmaxxing", czyli przekonanie, że firmy i ludzie powinni zużywać jak najwięcej tokenów LLM, wreszcie przygasa. Więcej tokenów bywa korelowane z większą produktywnością, ale po przekroczeniu pewnego progu zwroty maleją, a dostawcy modeli mają oczywisty finansowy interes w tym, żeby nas przekonać, że jest inaczej.

**Summary:** Punktem wyjścia jest obserwacja, że hype wokół AI zwykle zawiera ziarno prawdy, tylko rozdmuchane do granic absurdu. Większe zużycie tokenów rzeczywiście koreluje z większą ilością pracy wykonanej przez model, a w miarę jak modele i harnessy się poprawiają, granica użytecznego zużycia tokenów też się przesuwa. Problem zaczyna się wtedy, gdy dostawcy modeli organizują wręcz zawody na to, kto spali najwięcej tokenów, traktując to jako cel sam w sobie, a nie efekt uboczny realnej pracy.

Autor porównuje to do klasycznych trików branż usługowych: warsztaty samochodowe rekomendujące wymianę oleju co 3000 mil, choć większość aut wymaga tego rzadziej, albo reklamy past do zębów pokazujące ogromne wstążki pasty, gdy dentyści zalecają porcję wielkości grochu. Token i agent są użyteczne, tak jak olej i pasta są użyteczne, ale to nie znaczy, że więcej zawsze oznacza lepiej. Rekomendacja, żeby używać mniej niż maksymalnie dużo, jest trudna do wygłoszenia dla firmy, która sprzedaje tokeny, i to jest dokładnie ten konflikt interesów, na który trzeba uważać.

Konkretne rady są dwie: mierzyć koszt działania aplikacji per zapytanie, żeby móc liczyć na kartce, ile kosztuje skalowanie, oraz projektować architekturę tak, by nie być zablokowanym u jednego dostawcy modelu, włącznie z opcją przejścia na modele open weight. To brzmi jak oczywistość dla każdego, kto już budował produkty na LLM-ach, ale w praktyce wciąż widzę projekty, gdzie jeden provider jest wpisany na sztywno w każdą warstwę kodu.

**Key takeaways:**
- Zużycie tokenów koreluje z produktywnością tylko do pewnego punktu, dalej mamy malejące zwroty
- Dostawcy modeli mają finansowy interes w promowaniu maksymalnego zużycia tokenów, więc ich rady trzeba filtrować
- Mierzenie kosztu per zapytanie i unikanie lock-inu u jednego providera to konkretne, praktyczne zabezpieczenia
- Historia biznesu pełna jest analogicznych zachęt do nadmiernej konsumpcji, token burn nie jest tu wyjątkiem

**Why do I care:** Z perspektywy kogoś, kto projektuje architektury frontendowe i integracje z LLM-ami, to jest rada, którą powinienem mieć wypisaną nad biurkiem. Widziałem już zespoły, które mierzyły sukces integracji AI liczbą wywołań API, a nie realną wartością dla użytkownika, i kończyło się to fakturami, które trudno wytłumaczyć zarządowi. Trzymanie architektury elastyczną względem dostawcy modelu to nie jest paranoja, to podstawowa higiena inżynierska, taka sama jak nieblokowanie się na jednym dostawcy bazy danych.

## DeepSeek-V4-Flash wyprzedza własny flagowy model

**TLDR:** DeepSeek wydał odświeżoną wersję swojego mniejszego modelu, V4-Flash-0731, która na niezależnych testach wyprzedziła większego DeepSeek-V4-Pro, kosztując przy tym znacznie mniej za zadanie niż porównywalne modele własnościowe. Firma nie zmieniła architektury, tylko przeprowadziła kolejną rundę fine-tuningu.

**Summary:** Model ma 284 miliardy parametrów w architekturze mixture-of-experts, z czego tylko 13 miliardów aktywnych na token, a opcjonalny moduł spekulacyjnego dekodowania podnosi checkpoint do 304 miliardów. Na Intelligence Index od Artificial Analysis model uzyskał 50 punktów, punkt mniej niż GPT-5.6 Luna ustawiony na maksymalne rozumowanie, i wylądował na granicy Pareto, czyli w miejscu, gdzie żaden śledzony model nie jest jednocześnie mądrzejszy i tańszy w przeliczeniu na zadanie. Wagi są darmowe do użytku komercyjnego i niekomercyjnego na licencji MIT, a przez API DeepSeek koszt to 0,14 dolara za milion tokenów wejściowych i 0,28 dolara za milion wyjściowych.

Trening przebiegał w dwóch etapach: najpierw firma zbudowała odrębne modele specjalistyczne dla domen takich jak matematyka, kod czy zadania agentowe, każdy trenowany metodą supervised fine-tuning, a potem reinforcement learning z Group Relative Policy Optimization. Drugi etap to destylacja on-policy, w której połączony model pisał własne odpowiedzi, a trening korygował je w stronę tego, jak odpowiedziałby dany specjalista. Ciekawy szczegół techniczny to sposób trzymania historii rozumowania: podczas zadań agentowych model zachowuje cały łańcuch myślowy w kontekście przez wszystkie tury, także między wiadomościami użytkownika, czego wcześniejsza wersja V3.2 nie robiła.

Na testach agentowych skoki są spore. Terminal-Bench 2.1, czyli zadania w środowisku wiersza poleceń, model rozwiązał w 82,7 procenta przypadków, około 21 punktów więcej niż wersja preview. Na GDPval-AA v2, gdzie modele porównuje się parami na zadaniach z finansów, prawa czy zdrowia, DeepSeek-V4-Flash uzyskał 1558 Elo, drugi wynik wśród modeli open weight, za Kimi K3. Cały ten ruch wpisuje się w szerszy trend cenowy: OpenAI dzień wcześniej obniżył ceny GPT-5.6 Luna o 80 procent, a Google tydzień wcześniej wypuścił Gemini 3.6 Flash i Gemini 3.5 Flash-Lite z naciskiem na szybkość i koszt, nie na czystą moc.

**Key takeaways:**
- Sama zmiana fine-tuningu, bez zmiany architektury, wystarczyła, żeby mniejszy model wyprzedził flagowy
- Model trafia na granicę Pareto intelligence versus cost, czyli nikt śledzony przez Artificial Analysis nie jest jednocześnie lepszy i tańszy
- Kwantyzowana wersja 3-bitowa działa na maszynie z 110 gigabajtami pamięci, co otwiera lokalne wdrożenia bez wysyłania danych do API
- Cały rynek modeli średniej wielkości (Gemini Flash, GPT-5.6 Luna, DeepSeek-V4-Flash) zbiega w stronę taniej, szybkiej inteligencji zamiast maksymalnej mocy

**Why do I care:** To dokładnie ten segment modeli, który interesuje mnie najbardziej w codziennej pracy: nie flagowce do pokazowych demo, ale modele, które można wstawić w pipeline CI, w automatyczny code review albo w agenta triagującego zgłoszenia, bez obawy, że rachunek za API przewyższy wartość zadania. Fakt, że model tej klasy da się odpalić lokalnie w wersji skwantyzowanej na sprzęcie kosztującym tyle co dobra stacja robocza, jest dla mnie ważniejszy niż punkt różnicy na benchmarku wobec GPT.

## Claude znajduje słabość w kandydacie na szyfrowanie odporne na komputery kwantowe

**TLDR:** Model Claude Mythos Preview, pracujący pod nadzorem badacza bez specjalistycznej wiedzy kryptograficznej, znalazł realną słabość w HAWK, jednym z kandydatów NIST na podpis cyfrowy odporny na komputery kwantowe. Projektanci HAWK wycofali go z konkursu po dwóch rundach i około dwóch latach recenzji eksperckiej.

**Summary:** Historia zaczęła się od dwóch agentów pracujących nad tym samym problemem: jeden odrzucił atak jako niewykonalny, drugi znalazł sposób na jego przeprowadzenie. Dla wariantu HAWK-512 atak Claude obniżył szacowany koszt wykradnięcia tajnego klucza z 2 do potęgi 150 do co najwyżej 2 do potęgi 108, co oznacza spadek kosztu o czynnik liczony w bilionach, mimo że obie liczby wciąż daleko przekraczają możliwości jakiejkolwiek istniejącej maszyny. Problem w tym, że nowy wynik ląduje poniżej poziomu bezpieczeństwa deklarowanego przez projektantów HAWK, a to w konkursie kryptograficznym jest wyrokiem.

Anthropic opisuje swój wkład w kierowanie atakiem jako project management, nie kryptografię, co jest o tyle znaczące, że badacz stojący za eksperymentem miał tło w teoretycznej informatyce, ale nie w tej konkretnej dziedzinie. Atak został zgłoszony 28 lipca na publiczną listę pqc-forum wraz z działającym kodem odzyskującym klucz, a kryptograf Daniel Apon potwierdził poprawność redukcji tego samego wieczoru. Następnego dnia Léo Ducas, jeden z projektantów HAWK, ogłosił wycofanie schematu, uznając, że proste poprawki, jak podwojenie parametrów, uczyniłyby go niekonkurencyjnym.

Co ciekawe, HAWK był atakowany z trzech niezależnych stron w tym samym okresie: jeden atak powstał z pomocą Codex od OpenAI, drugi wyprowadzili ręcznie akademiccy kryptografowie z niewielką pomocą LLM. Mimo to notatka o wycofaniu wskazuje atak Anthropic jako czynnik decydujący. Kryptograf z Johns Hopkins, Matthew Green, ocenił, że atak na HAWK nie wymyślił żadnej fundamentalnie nowej matematyki, tylko połączył istniejące narzędzia w sposób, na który wcześniej nikt nie był wystarczająco dokładny. Całość zajęła około 60 godzin i około 100 tysięcy dolarów w kosztach API.

**Key takeaways:**
- Model znalazł realną słabość w kandydacie NIST na podpis post-kwantowy, prowadząc do jego wycofania z konkursu
- Kluczowy przełom powstał z interakcji dwóch agentów, z których jeden odrzucał hipotezę, a drugi ją potwierdził
- Atak na AES dotyczył tylko sztucznie osłabionej wersji siedmiorundowej, nie produkcyjnego AES-128, więc nie ma żadnego zagrożenia dla obecnej infrastruktury
- Znalezienie słabości zajęło około 60 godzin pracy i sto tysięcy dolarów, co wciąż jest niewielkim kosztem wobec skali potencjalnych strat, gdyby wadliwy standard trafił do produkcji

**Why do I care:** Jako ktoś, kto projektuje systemy z myślą o bezpieczeństwie, traktuję to jako mocny argument za tym, żeby modele językowe stały się standardowym elementem audytu kryptograficznego, zanim jakikolwiek nowy standard trafi do przeglądarek i bibliotek, z których korzystamy na froncie. To nie jest historia o tym, że AI złamała internet, to historia o tym, że proces recenzji eksperckiej zadziałał tak, jak powinien, tylko szybciej i z nowym rodzajem uczestnika. Zdecydowanie chciałbym, żeby taki proces stał się rutyną przy każdym nowym standardzie kryptograficznym, zamiast czekać na następny SIKE.

## The Stack v3: nowy, gigantyczny zrzut kodu z GitHub dla modeli programistycznych

**TLDR:** Hugging Face wydał The Stack v3, najnowszy i najbardziej aktualny otwarty zbiór kodu źródłowego do trenowania modeli LLM, zawierający całe repozytoria razem z plikami, a nie tylko identyfikatory jak poprzednia wersja. Zbiór szkoleniowy to 15,9 terabajta i około 4,9 biliona tokenów z 713 języków programowania.

**Summary:** Największa różnica względem The Stack v2 to sposób zbierania danych: zamiast pobierać pliki z archiwum Software Heritage, zespół Hugging Face crawlował GitHub bezpośrednio, pomijając pliki większe niż 5 megabajtów, pliki binarne i forki z mniej niż pięciu gwiazdkami. Wynikowy crawl obejmował 43,9 miliarda plików. Do wykrywania licencji użyto narzędzia ScanCode, które skanowało pliki z nazwami wskazującymi na treść prawną i mapowało znalezione licencje na cały katalog, a pliki bez zgodnej licencji wykluczono ze zbioru szkoleniowego.

Deduplikacja zmieniła podejście z poprzedniej wersji: zamiast usuwać duplikaty per język programowania, nowy proces działa na wszystkich językach naraz i grupuje pliki w klastry o co najmniej 70-procentowym pokryciu, wybierając do zbioru szkoleniowego plik z repozytorium o największej liczbie gwiazdek. Przy budowie tego pipeline'u zespół odkrył, że błąd w The Stack v2 powodował odrzucanie zbyt wielu plików, co nowa wersja koryguje. Do wykrywania danych osobowych użyto modelu StarPII, który zamienia e-maile, klucze, nazwiska, hasła i adresy IP na placeholdery, choć autorzy uczciwie przyznają, że część takich danych może wciąż zostać w zbiorze, bo trafiła tam już wcześniej jako publiczna.

Skala wzrostu jest wymowna: surowy korpus rósł z 6,4 terabajta w 2022 roku, przez 67,5 terabajta w wersji drugiej z 2024 roku, do 113,7 terabajta teraz, a zbiór treningowy z około 200 miliardów do 4,9 biliona tokenów. Punkt odcięcia danych to 7 sierpnia 2025, co oznacza, że modele trenowane na tym zbiorze będą znały frameworki i API o dwa lata nowsze niż poprzednia generacja. Warto pamiętać, że znaczna część tego kodu z 2025 roku sama została napisana z pomocą AI, więc kolejna generacja modeli programistycznych uczy się częściowo na wytworach poprzedniej.

**Key takeaways:**
- The Stack v3 dostarcza całe repozytoria z plikami, nie tylko identyfikatory, co ułatwia trenowanie modeli rozumiejących zależności między plikami w projekcie
- Zbiór jest dostępny na licencji Open Data Commons Attribution, z możliwością opt-outu dla właścicieli repozytoriów
- Deduplikacja działa teraz między językami programowania, a nie osobno dla każdego z nich, co poprawia jakość danych względem The Stack v2
- Punkt odcięcia danych na sierpień 2025 oznacza świeższą wiedzę o frameworkach i API niż w poprzednich wersjach zbioru

**Why do I care:** Jako frontendowiec zwracam uwagę na to, że modele trenowane na tym zbiorze powinny wreszcie lepiej znać nowsze wersje frameworków, z którymi pracuję codziennie, bo dwa lata w świecie frontendu to cała epoka. Jednocześnie mam mieszane uczucia co do tego, że coraz większa część danych treningowych to kod wygenerowany przez wcześniejsze modele. To trochę jak trenowanie następnej generacji na echo poprzedniej, i nie jestem przekonany, że to zawsze prowadzi do lepszej jakości, czasem prowadzi tylko do powielania tych samych nawyków i błędów w nowej skali.

## SecureForge: automatyczne dopracowywanie system promptów, żeby modele pisały bezpieczniejszy kod

**TLDR:** Badacze ze Stanford opracowali SecureForge, metodę automatycznego optymalizowania system promptu modelu tak, by generował mniej podatności bezpieczeństwa w kodzie Python. Sam prompt "pisz bezpieczny kod" nie wystarcza, ale iteracyjna optymalizacja przy użyciu statycznego analizatora kodu i algorytmu genetycznego GEPA daje wymierną poprawę.

**Summary:** Metoda działa w kilku krokach: LLM generuje realistyczne żądanie kodu na podstawie katalogu typowych błędów bezpieczeństwa MITRE CWE, drugi model pisze kod na to żądanie, statyczny analizator Semgrep sprawdza, czy wynik ma podatności, a kolejny model modyfikuje system prompt tak, żeby unikać tej konkretnej klasy błędu. Cykl powtarza się iteracyjnie. Autorzy zebrali 500 żądań kodu, które prowokowały niebezpieczny kod u co najmniej jednego z testowanych modeli, obejmujących między innymi CodeLlama, Qwen2.5-Coder, Kimi K2, Claude Sonnet 4.6 i kilka wariantów GPT-5.4.

Ciekawy detal to sposób rozbudowy zbioru treningowego: z 250 zarezerwowanych żądań autorzy wygenerowali 80 tysięcy wariantów, powtarzając prośbę o przepisanie zadania na nieco inne, sprawdzając odsetek podatnych wyników po każdej mutacji i zachowując te warianty, które statystycznie częściej prowokowały błędy niż ich poprzednicy. Na tym zbiorze algorytm GEPA iteracyjnie poprawiał system prompt, dostając od Semgrepa informację, gdzie i jaki błąd wystąpił, i proponując coraz lepsze wersje instrukcji dla modelu piszącego kod.

Wyniki są przekonujące, choć nie rewolucyjne: średnio po SecureForge modele generowały podatny kod w 11,8 procenta przypadków, wobec 20,1 procenta przy prostym poleceniu "pisz bezpiecznie" z listą błędów do uniknięcia. Dla GPT-5.4 spadek był z 15,8 do 10,1 procenta. Ograniczenie tej metody jest jasne: system prompt optymalizowany jest tylko wobec znanych klas podatności z katalogu CWE, więc jego skuteczność wobec nieznanych wcześniej typów błędów pozostaje niesprawdzona.

**Key takeaways:**
- Samo poinstruowanie modelu, żeby pisał bezpieczny kod, nie działa, potrzebna jest iteracyjna optymalizacja promptu na konkretnych przykładach błędów
- Metoda testowana na dziewięciu różnych modelach, od małych open source po Claude Sonnet 4.6 i GPT-5.4, ze stabilną redukcją podatności w każdym przypadku
- Skuteczność ograniczona do znanych klas błędów z katalogu MITRE CWE, nieznane podatności mogą pozostać niewykryte
- Metoda i kod są darmowe do użytku komercyjnego i niekomercyjnego, co ułatwia wdrożenie w istniejących pipeline'ach

**Why do I care:** To jest dokładnie ten rodzaj pracy, którą chciałbym widzieć częściej w zespołach korzystających z asystentów kodu: nie kolejny benchmark, tylko praktyczny sposób na zaszycie bezpieczeństwa w domyślną konfigurację, zamiast liczyć na to, że każdy programista pamięta o SQL injection przy każdym prompcie. System prompt jest tanim punktem interwencji, bo nie wymaga fine-tuningu modelu, więc mogę sobie wyobrazić wdrożenie takiej optymalizacji jako standardowy krok w konfiguracji każdego asystenta kodu w firmie, obok linterów i testów.