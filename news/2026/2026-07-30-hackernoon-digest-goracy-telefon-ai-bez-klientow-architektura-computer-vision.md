---
title: "Cztery historie z HackerNoon: gorący telefon, sztuczna inteligencja bez klientów i architektura widzenia komputerowego"
excerpt: "Przegląd czterech tekstów z lipcowego digestu HackerNoon: naprawa zarządzania energią na starym OnePlus, krytyka bezrefleksyjnego budowania z AI, eksperyment z RAG na notatkach z sesji RPG oraz architektoniczna historia computer vision."
publishedAt: "2026-07-30"
slug: "hackernoon-digest-goracy-telefon-ai-bez-klientow-architektura-computer-vision"
hashtags: "#HackerNoon #computer-vision #rag #retrieval-augmented-generation #linux-kernel #ai-development #architecture #generated #pl"
source_pattern: "HackerNoon"
---

## Jak naprawiłem zarządzanie energią na mainline'owym OnePlus 3T

**TLDR:** Autor uruchomił czysty, mainline'owy Linux na kilkuletnim OnePlus 3T i odkrył, że telefon grzeje się do siedemdziesięciu stopni Celsjusza w spoczynku, bez żadnego obciążenia procesora. Tekst opisuje żmudne dochodzenie do przyczyny w warstwie zarządzania energią na urządzeniu, które producent porzucił na długo przed tym, zanim ktokolwiek pomyślał o niezależnym jądrze systemu.

**Summary:** Siedemdziesiąt stopni w telefonie, który nie ma wentylatora ani radiatora, a jedyną drogą ucieczki ciepła jest tylna klapka, to nie jest usterka kosmetyczna, to jest wyrok śmierci dla baterii i dla całego urządzenia w perspektywie miesięcy. Autor pisze, że ta temperatura nie pojawiała się pod obciążeniem, tylko trzymała się non stop, we dnie i w nocy, co od razu podpowiada, że winny nie jest kod aplikacji, tylko coś dużo niżej, w sterownikach albo w konfiguracji regulatorów napięcia i zegarów.

Praca nad mainline'owym Linuksem na telefonie z układem Snapdragon sprzed niemal dekady to w praktyce archeologia. Producent nie utrzymuje już tego SoC, dokumentacja jest fragmentaryczna albo jej po prostu nie ma, a każdy driver trzeba było kiedyś napisać od zera na podstawie odwróconego inżyniersko kodu z Androida. Czterdzieści cztery minuty czytania sugerują, że autor nie idzie na skróty i pokazuje realny proces debugowania, łącznie ze ślepymi uliczkami, a nie tylko finałowy patch, który magicznie wszystko naprawia.

Podoba mi się, że tego typu teksty w ogóle jeszcze powstają. Cały ekosystem postmarketOS i pokrewnych projektów żyje z ludzi, którzy traktują stary sprzęt jako coś więcej niż elektroodpad i są gotowi spędzić czterdzieści cztery minuty czyjegoś czasu na opisanie, dlaczego governor CPU trzymał niewłaściwy stan albo dlaczego thermal throttling w ogóle się nie uruchamiał. To dokładnie ten rodzaj pracy, który nigdy nie trafia na konferencje, bo nie ma w nim żadnego błyszczącego frameworka, a mimo to bez niej żadne urządzenie nie dostaje drugiego życia.

Czego w takim tekście zwykle brakuje, to szerszego kontekstu ekonomicznego. Ile osób realnie skorzysta z tej łatki? Czy to jest praca dla dziesięciu entuzjastów, czy realny wkład w coś większego, jak wsparcie dla całej rodziny układów? Bez tej perspektywy trudno ocenić, czy to fascynująca ciekawostka inżynierska, czy praca o realnym znaczeniu dla utrzymania sprzętu przy życiu.

**Key takeaways:**
- Stała, niezmienna temperatura w spoczynku to sygnał problemu w warstwie zarządzania energią, a nie w aplikacjach czy obciążeniu
- Praca nad mainline'owym wsparciem dla porzuconych układów SoC to w dużej mierze odwrotna inżynieria bez dokumentacji producenta
- Tego rodzaju łatki rzadko trafiają do mediów głównego nurtu, mimo że wydłużają życie realnego sprzętu

**Why do I care:** Z perspektywy kogoś, kto na co dzień zajmuje się architekturą oprogramowania, ten tekst jest przypomnieniem, że najtrudniejsze błędy często nie leżą w warstwie, w której ich szukamy najpierw. To bardziej materiał dla inżynierów systemowych i entuzjastów Linuksa mobilnego niż dla frontendowców, ale warto go znać jako lekcję o cierpliwym trzymaniu się jednej hipotezy, aż dane ją potwierdzą albo obalą.

**Link:** [How I Fixed Power Management on a Mainline OnePlus 3T](https://hackernoon.com/p/7-29-2026-newsletter)

## Przestańcie używać AI do budowania rzeczy, których nikt nie potrzebuje

**TLDR:** Autor stawia tezę, że tanie budowanie oprogramowania dzięki AI nie rozwiązuje prawdziwego problemu, jakim jest brak wiedzy, czy ktokolwiek zapłaci za to, co budujemy. Proponuje podejście nazwane rozwojem sterowanym stawką, w którym tanie tworzenie ma służyć szybszemu uczeniu się o rynku, a nie produkowaniu kolejnych niepotrzebnych funkcji.

**Summary:** Teza jest prosta i dość bezlitosna dla całej narracji wokół AI jako przyspieszacza produktywności: jeśli budowanie kosztuje ułamek tego, co kiedyś, to firmy nie stają się nagle mądrzejsze w wybieraniu, co budować, tylko szybciej produkują rzeczy, których nikt nie chce. AI nie naprawia problemu walidacji pomysłu, ono tylko obniża koszt porażki na jednostkę, co część zespołów myli z sukcesem.

Rozwój sterowany stawką, jak rozumiem z opisu, ma być odwróceniem priorytetów. Zamiast pytać, co możemy zbudować najszybciej, pytamy, jakie założenie o kliencie jest najbardziej ryzykowne, i budujemy najmniejszą możliwą rzecz, która to założenie testuje, korzystając z taniości AI właśnie po to, żeby ten test był jeszcze tańszy i szybszy. To nie jest nowa idea, lean startup mówił o tym samym dekadę temu, ale osadzenie jej w kontekście generatywnego kodu ma sens, bo pokusa, żeby budować dla samego budowania, jest teraz większa niż kiedykolwiek.

Trzy minuty czytania to sygnał, że to bardziej manifest niż studium przypadku, i rzeczywiście brakuje mi tutaj twardych przykładów, konkretnej firmy, konkretnej metryki, momentu, w którym ktoś realnie zmienił kurs dzięki temu podejściu. Bez tego teza brzmi słusznie, ale pozostaje sloganem, który każdy konsultant produktowy powtarza od lat, tylko teraz z dopiskiem AI.

Czego autor unika, to odpowiedzi na pytanie, kto ponosi koszt tych wszystkich eksperymentów, kiedy generowanie kodu jest tanie, ale utrzymanie dziesiątek porzuconych prototypów już nie. Dług techniczny nie znika dlatego, że pierwsza wersja powstała szybciej, a decyzja o zamknięciu nieudanego eksperymentu bywa trudniejsza politycznie niż decyzja o jego rozpoczęciu, zwłaszcza gdy ktoś zdążył już pochwalić się nim na spotkaniu zarządu.

**Key takeaways:**
- Tanie budowanie dzięki AI nie rozwiązuje problemu wyboru właściwej rzeczy do zbudowania, tylko obniża koszt błędu
- Rozwój sterowany stawką proponuje testowanie najbardziej ryzykownych założeń najmniejszym możliwym kosztem
- Tekst pozostaje na poziomie manifestu bez konkretnych danych liczbowych czy studiów przypadku

**Why do I care:** To akurat dotyczy każdego, kto pracuje przy budowie produktu, nie tylko programistów, bardziej product managerów i konsultantów. Z perspektywy architekta software'u zgadzam się z diagnozą, ale traktowałbym ją jako oczywistość dla każdego, kto choć raz widział zespół, który dostarczył świetnie zbudowaną funkcję, na którą nikt nie czekał. Prawdziwe pytanie brzmi, czy organizacja ma odwagę zamykać eksperymenty równie szybko, jak je zaczyna, a to zależy od kultury, nie od narzędzia.

**Link:** [Stop Using AI to Build Things No One Needs](https://hackernoon.com/p/7-29-2026-newsletter)

## Moje notatki z kampanii RPG przypadkiem trafiły w nową specyfikację RAG od Google

**TLDR:** Autor testował wyszukiwanie w swoich notatkach z kampanii RPG i zauważył, że ich naturalna struktura, ta, którą tworzą ludzie do własnego użytku, przypomina graf wymagany przez nową specyfikację RAG od Google. Prosty wniosek z eksperymentu: dla pytań typu wyszukaj fakt wystarczy zwykłe wyszukiwanie wektorowe, ale dla pytań wymagających syntezy informacji z wielu miejsc trzeba przejścia po grafie.

**Summary:** To jest mój ulubiony typ tekstu technicznego, taki, który zaczyna się od czegoś zupełnie niepoważnego, notatek z sesji Dungeons and Dragons, i kończy realnym wnioskiem inżynierskim o architekturze wyszukiwania informacji. Autor miał zestaw pytań testowych podzielonych na tak zwane q, część z nich, jak q12 czy q13, nie ruszała się z miejsca mimo dwóch rund poprawek, co jest bardzo szczerym przyznaniem, że nie każdy problem naprawia się kolejną iteracją tego samego podejścia.

Tabela porównująca warianty wyszukiwania wektorowego przy różnych wartościach k, czyli liczbie zwracanych fragmentów, z podejściem opartym na przejściu po grafie z ograniczonym zasięgiem, pokazuje coś, co osoby pracujące z RAG-iem znają z doświadczenia, tylko rzadko widzą to tak jasno rozdzielone na kategorie. Dla zadań typu lookup, czyli zwykłego znalezienia jednego faktu, wszystkie metody osiągają wynik bliski stu procentom, k równe pięć radzi sobie tak samo dobrze jak k równe piętnaście. Różnica pojawia się dopiero przy zadaniach syntezy, gdzie trzeba połączyć informacje rozproszone w kilku miejscach dokumentu, i tam wyszukiwanie wektorowe zaczyna zawodzić, spadając wyraźnie poniżej metody opartej na grafie.

Sedno wniosku autora jest praktyczne i moim zdaniem trafne: jeśli twoje dane mają strukturę, którą rozumie tylko człowiek czytający dokument, ale nie rozumie jej twój kod odpowiedzialny za wyszukiwanie, to masz lukę między tym, co wygląda jak graf, a tym, co faktycznie jest grafem używanym przez system. To rozróżnienie brzmi banalnie, dopóki nie spróbuje się je zaimplementować, bo ekstrakcja relacji z tekstu naturalnego, żeby zbudować z niego faktyczny graf wiedzy, jest dużo trudniejsza niż samo indeksowanie embeddingów.

Co autor pomija, to koszt utrzymania takiego grafu w miarę jak dane rosną i się zmieniają. Notatki z kampanii RPG są statyczne i mają rozsądny rozmiar, a produkcyjna baza wiedzy firmy rośnie codziennie i wymaga aktualizacji relacji w grafie, nie tylko dodawania nowych wektorów. Eksperyment na małą skalę udowadnia koncepcję, ale nie mówi nic o tym, jak bardzo boli utrzymanie takiego systemu w warunkach ciągłych zmian danych, a to jest pytanie, które faktycznie decyduje, czy warto iść w tę stronę produkcyjnie.

**Key takeaways:**
- Dla prostych zapytań o pojedynczy fakt wyszukiwanie wektorowe działa niemal identycznie dobrze jak przejście po grafie
- Dla zadań syntezy informacji z wielu źródeł przejście po grafie wyraźnie wygrywa z czystym wyszukiwaniem wektorowym
- Prawdziwym wyzwaniem nie jest samo wyszukiwanie, tylko zbudowanie i utrzymanie grafu, który faktycznie odzwierciedla strukturę danych

**Why do I care:** Dla każdego, kto projektuje systemy oparte na RAG w produkcji, to konkretna, praktyczna wskazówka architektoniczna, nie tylko ciekawostka. Jeśli twoja aplikacja odpowiada głównie na pytania o pojedyncze fakty, nie inwestuj czasu w budowę grafu wiedzy, bo zwrot z inwestycji będzie żaden. Jeśli natomiast użytkownicy regularnie zadają pytania wymagające łączenia informacji z kilku dokumentów, ten tekst daje ci konkretny powód, żeby zacząć myśleć o warstwie grafowej, zanim klienci sami ci powiedzą, że wyszukiwarka nie rozumie kontekstu.

**Link:** [My DD Campaign Notes Accidentally Matched Google's New RAG Spec](https://hackernoon.com/p/7-29-2026-newsletter)

## Architektoniczna historia computer vision

**TLDR:** Tekst prowadzi przez historię widzenia komputerowego jako ciąg zmian architektonicznych, nie tylko wzrost mocy obliczeniowej: od ręcznie projektowanych cech obrazu, przez sieci konwolucyjne, po transformery i promptowalną segmentację. Każda era przenosiła coraz więcej ludzkiej wiedzy z ręcznie zakodowanych reguł do parametrów uczonych na danych.

**Summary:** To jest dokładnie ten rodzaj artykułu, który lubię najbardziej, bo pokazuje, że postęp w AI to nie magiczne skoki, tylko konsekwentne przesuwanie granicy między tym, co projektuje inżynier, a tym, co wyłania się z danych. Era ręcznie projektowanych cech, ta z algorytmami w rodzaju wykrywania krawędzi czy deskryptorów punktów charakterystycznych, wymagała, żeby człowiek dokładnie wiedział, jaka cecha obrazu jest istotna, i zakodował ją wprost. To była architektura w sensie dosłownym, budowana cegła po cegle przez ludzi rozumiejących optykę i geometrię.

Przejście do sieci konwolucyjnych nie usunęło projektowania architektonicznego, tylko przeniosło je na wyższy poziom abstrakcji. Zamiast projektować konkretne filtry, inżynierowie projektowali strukturę sieci, liczbę warstw, sposób łączenia map cech, a to, jakie konkretne wzorce sieć faktycznie się nauczy wykrywać, zostawiali procesowi uczenia na dużych zbiorach danych. Transformery poszły o krok dalej, redukując jeszcze więcej założeń architektonicznych specyficznych dla obrazu na rzecz ogólnego mechanizmu uwagi, który wcześniej sprawdził się w przetwarzaniu języka, a promptowalna segmentacja domyka ten kierunek, pozwalając opisać, co chcemy wyodrębnić z obrazu, zamiast trenować osobny model do każdego konkretnego zadania.

Autor pisze, że projektowanie przez człowieka nie zniknęło, tylko przesunęło się w stronę danych, celów treningowych, architektury i sposobu ewaluacji, i to jest chyba najbardziej trzeźwe zdanie w całym tekście. Zbyt często w dyskusjach o AI słyszę narrację o zastąpieniu inżyniera przez model, podczas gdy w rzeczywistości inżynier po prostu przesuwa się o piętro wyżej i projektuje teraz proces, który wytwarza rozwiązanie, zamiast projektować samo rozwiązanie.

Czego mi w takim ujęciu brakuje, to bardziej krytycznego spojrzenia na koszt tej ewolucji. Każde przejście do bardziej ogólnej architektury oznaczało też większe zapotrzebowanie na dane i moc obliczeniową, a to nie jest neutralna zmiana, tylko realne przesunięcie władzy w stronę organizacji, które stać na trenowanie modeli na tę skalę. Historia architektoniczna bez historii ekonomicznej, kto może sobie pozwolić na budowę kolejnej ery, jest opowieścią niepełną, choćby najbardziej elegancką technicznie.

**Key takeaways:**
- Każda era computer vision przenosiła więcej ludzkiej wiedzy z ręcznie kodowanych reguł do parametrów uczonych na danych
- Realne systemy produkcyjne często łączą elementy z kilku er naraz, zamiast trzymać się jednego czystego podejścia
- Wzrost ogólności architektury wiąże się z rosnącym zapotrzebowaniem na dane i moc obliczeniową, co ma realne konsekwencje ekonomiczne

**Why do I care:** Nawet jeśli nie budujesz modeli widzenia komputerowego na co dzień, ten sposób myślenia, oddzielenie tego, co projektuje człowiek, od tego, co wyłania się z danych, przydaje się w każdej rozmowie o tym, gdzie AI faktycznie zastępuje pracę inżynierską, a gdzie tylko przesuwa ją w inne miejsce. To materiał bardziej dla architektów i osób podejmujących decyzje technologiczne niż dla kogoś szukającego gotowego przepisu do wdrożenia w poniedziałek rano.

**Link:** [The Architectural History of Computer Vision](https://hackernoon.com/p/7-29-2026-newsletter)
