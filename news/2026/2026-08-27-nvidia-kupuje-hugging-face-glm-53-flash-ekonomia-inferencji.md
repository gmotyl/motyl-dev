---
title: "NVIDIA kupuje Hugging Face za trzynaście miliardów, a GLM-5.3-Flash wywraca ekonomię inferencji"
excerpt: "Największa platforma otwartych modeli trafia do producenta układów, a chiński model o otwartych wagach dogania czołówkę przy koszcie niższym o rząd wielkości."
publishedAt: "2026-08-27"
slug: "nvidia-kupuje-hugging-face-glm-53-flash-ekonomia-inferencji"
hashtags: "#AINews #ai #llm #agents #open-source #architecture #generated #pl"
source_pattern: "AINews"
---

## NVIDIA kupuje Hugging Face za trzynaście miliardów dolarów

**TLDR:** Producent układów graficznych przejmuje platformę, na której mieszka praktycznie cały ekosystem otwartych modeli. Kwota to około osiemdziesięciokrotność rocznych przychodów powtarzalnych, czyli stu pięćdziesięciu milionów, i prawie dwukrotność pierwotnej oferty z początku roku.

**Summary:** Liczby same w sobie są ciekawe, ale kontekst jest ciekawszy. Siedem miliardów zaoferowane w styczniu, trzynaście miliardów w sierpniu. Podwojenie wyceny w siedem miesięcy przy podwojonej bazie klientów w tym samym roku. Mnożnik osiemdziesiąt razy przychód to poziom, który normalnie zarezerwowany jest dla firm rosnących wykładniczo albo dla przejęć strategicznych, gdzie nie chodzi o przepływy finansowe, tylko o pozycję.

Tu chodzi wyraźnie o to drugie. Hugging Face jest miejscem, gdzie ludzie znajdują, pobierają i publikują modele o otwartych wagach. Producent układów przejmujący warstwę dystrybucji modeli to ruch analogiczny do przejęcia sklepu z aplikacjami przez producenta telefonów. Formalnie wszystko może zostać po staremu, praktycznie zmienia się to, kto ustala domyślne ścieżki. Które modele są polecane, na jakim sprzęcie mają zoptymalizowane ścieżki inferencji, jaki format wag jest pierwszą klasą obywatelską. Żadna z tych rzeczy nie musi być ogłoszona, żeby zaczęła działać.

Redakcja newslettera kwituje to zdaniem, że lubi, gdy wygrywają dobrzy, i rozumiem ten sentyment, bo Hugging Face zrobił dla otwartości modeli więcej niż ktokolwiek inny. Ale warto zapytać, co się stanie z tą neutralnością, gdy właścicielem będzie firma sprzedająca sprzęt. Zwłaszcza w momencie, gdy w tle wybrzmiewa temat modeli obsługiwanych w całości na chińskich układach, o czym za chwilę. Platforma neutralna wobec sprzętu i platforma należąca do producenta sprzętu to dwie różne rzeczy, nawet jeśli przez pierwsze dwa lata nikt tego nie zauważy.

**Key takeaways:**
- Trzynaście miliardów dolarów przy stu pięćdziesięciu milionach rocznego przychodu powtarzalnego
- Wycena podwoiła się od styczniowej oferty siedmiu miliardów
- Producent układów przejmuje warstwę dystrybucji otwartych modeli
- Neutralność platformy wobec sprzętu przestaje być oczywista
- Zmiany domyślnych ścieżek i optymalizacji nie wymagają żadnego ogłoszenia

**Why do I care:** Jeśli budujesz cokolwiek na modelach o otwartych wagach, właśnie zmienił się właściciel twojego kanału dystrybucji. Nie panikowałbym, ale zapisałbym to jako ryzyko w rejestrze i sprawdził, czy twój proces budowania nie zależy od jednego źródła wag. Pobieranie modelu z jednej platformy przy każdym uruchomieniu środowiska ciągłej integracji było złym pomysłem także wcześniej, a teraz ma dodatkowy argument. Poza tym warto obserwować, czy pojawią się alternatywne rejestry, bo historycznie każde takie przejęcie rodziło konkurencję w ciągu roku.

**Link:** [NVIDIA buys HuggingFace for $13B](https://www.latent.space/p/ainews-nvidia-buys-huggingface-for)

## GLM-5.3-Flash: siedemdziesiąt pięć razy taniej za zadanie przy porównywalnej inteligencji

**TLDR:** Model o otwartych wagach na licencji MIT, trzysta dwadzieścia miliardów parametrów przy osiemnastu aktywnych, kontekst miliona tokenów, obsługiwany w całości na chińskich układach. Niezależna analiza daje mu wynik pięćdziesiąt siedem przy koszcie dziewięciu centów za zadanie, czyli remis z modelami kosztującymi kilkakrotnie więcej.

**Summary:** Zacznę od liczby, która robi największe wrażenie: dziewięć centów za zadanie wobec sześćdziesięciu ośmiu centów za mocniejszy wariant tego samego rodu. To siedmiokrotna różnica przy trzech punktach straty w indeksie inteligencji. Wobec zachodnich konkurentów o tym samym wyniku różnica wynosi od czterech do prawie sześciu razy. Cennik to piętnaście centów za milion tokenów wejściowych i pięćdziesiąt za wyjściowych, z niemal trzydziestokrotną zniżką za wejście z pamięci podręcznej.

Ale najważniejsza jest analiza, która to relatywizuje, i cieszę się, że redakcja ją wyeksponowała. Model zużył sto czterdzieści dziewięć milionów tokenów wyjściowych na przejście całego zestawu testów, wobec stu sześćdziesięciu ośmiu milionów dla mocniejszego wariantu, ale więcej niż dwa konkurencyjne modele o podobnym wyniku. Z tych stu czterdziestu dziewięciu milionów aż dziewięćdziesiąt procent to tokeny rozumowania. Wniosek jest ostry: ekonomia tego modelu wygląda świetnie głównie dlatego, że tokeny są ekstremalnie tanie, a nie dlatego, że model jest oszczędny w ich zużyciu. To rozróżnienie ma ogromne znaczenie przy planowaniu opóźnień, bo tanie tokeny nadal trzeba wygenerować, a to zajmuje czas.

Druga rzecz, którą warto rozdzielić, to profil możliwości. Na testach agentowych i terminalowych model wypada bardzo dobrze, a na jednym z nich nawet minimalnie lepiej niż mocniejszy wariant. Za to na wiedzy o świecie wypada wyraźnie słabiej: dwadzieścia osiem procent trafności przy dwudziestu ośmiu procentach halucynacji, wobec czterdziestu siedmiu procent trafności u najlepszego zachodniego konkurenta. Powtarzający się motyw w reakcjach brzmi więc tak: znacznie mocniejszy w praktycznych przepływach programistycznych niż w szerokiej wiedzy faktograficznej. Do kodowania i pracy agentowej świetny, do odpowiadania na pytania o świat zdecydowanie nie.

Architektura tłumaczy oszczędności i wpisuje się w wyraźny trend. Zejście z siedmiuset czterdziestu czterech miliardów parametrów w poprzedniej generacji do trzystu dwudziestu, z aktywnych trzydziestu dwóch do osiemnastu, z dziewięćdziesięciu dwóch warstw do czterdziestu pięciu. Hybryda uwagi w proporcji trzy do jednego, gdzie zdecydowana większość warstw używa wariantu liniowego, a mniejszość rzadkiego i utajonego. Do tego wielostrumieniowa ścieżka rezydualna i natywny koder obrazu. Jeden z komentujących zwraca uwagę, że to hybryda podwójnie efektywna, bo oba główne komponenty uwagi są już wariantami oszczędnymi, a nie mieszanką oszczędnego z pełnym. Szerszy komentarz mówi, że praktycznie wszystkie chińskie modele czołowe idą teraz w tę samą stronę: uwaga liniowa, uwaga rzadka z kompresją indeksu, wymyślne ścieżki rezydualne i ten sam optymalizator.

Najbardziej dyskutowana była jednak strona sprzętowa. Twierdzenie, że model działa w całości na chińskich układach, plus doniesienie o stu bilionach tokenów obsługiwanych dziennie na tym sprzęcie. Ktoś zrobił szacunek na kolanie: przy realistycznych dziesięciu tysiącach tokenów na sekundę na układ wychodzi około stu szesnastu tysięcy układów. To wyliczenie jest spekulacyjne, ale pokazuje, jak inżynierowie odczytali tę deklarację, czyli nie jako marketing, tylko jako informację o dojrzałej flocie akceleratorów i zoptymalizowanym stosie inferencyjnym.

Warto na koniec odnotować głosy krytyczne, bo redakcja porządnie oddziela fakty od opinii. Jedna osoba twierdzi, że model wypada słabo na kilku zadaniach wizyjnych, mimo natywnej obsługi obrazu, co jest bezpośrednim podważeniem jednej z głównych tez premiery. Inna zarzuca użycie kont rozdmuchujących szum, co pozostaje niezweryfikowane. Doszło też do dwóch potknięć technicznych: niezależna analiza najpierw podała czterysta tysięcy tokenów kontekstu zamiast miliona i musiała się poprawić, a inżynier twórcy poprosił wczesnych pobierających o ponowne pobranie modelu po korekcie szablonu rozmowy. Drobiazgi, ale mówią coś o tempie tej premiery.

**Key takeaways:**
- Dziewięć centów za zadanie przy wyniku remisującym z modelami kosztującymi cztery do sześciu razy więcej
- Dziewięćdziesiąt procent zużytych tokenów wyjściowych to tokeny rozumowania, więc taniość bierze się z cennika, nie z oszczędności
- Mocny na zadaniach agentowych i terminalowych, wyraźnie słabszy na wiedzy faktograficznej
- Halucynacje na poziomie dwudziestu ośmiu procent przy dwudziestu ośmiu procentach trafności
- Chińskie modele czołowe zbiegają się na tych samych wyborach architektonicznych
- Deklaracja obsługi w całości na chińskich układach to informacja infrastrukturalna, nie tylko marketingowa

**Why do I care:** Rozdzielenie kosztu tokenów od oszczędności w ich zużyciu to najważniejszy wniosek praktyczny. Jeśli planujesz pracę z równoległymi agentami, tani model generujący dużo tokenów rozumowania będzie tani, ale niekoniecznie szybki, a przy interaktywnym użyciu opóźnienie boli bardziej niż rachunek. Druga rzecz to profil możliwości: model dobry w zadaniach agentowych i słaby w wiedzy o świecie to dokładnie ten model, który chcesz mieć do refaktoryzacji i pisania testów, a którego nie chcesz mieć do odpowiadania użytkownikom na pytania. Dobór modelu do zadania przestaje być kwestią budżetu, a staje się kwestią profilu, i to jest zmiana w sposobie projektowania systemów z wieloma modelami.

**Link:** [AINews: GLM-5.3-Flash launch and reactions](https://www.latent.space/p/ainews-nvidia-buys-huggingface-for)
