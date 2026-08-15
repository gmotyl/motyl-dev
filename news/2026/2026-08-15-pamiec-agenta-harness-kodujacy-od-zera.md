---
title: "Pamięć, którą masz na własność, i harness kodującego agenta budowany od zera"
excerpt: "Decoding AI zestawia dwa podejścia do pamięci agenta, plikowe i grafowe, z nowym kursem budowy agenta kodującego od podstaw oraz praktycznymi wskazówkami na co dzień."
publishedAt: "2026-08-15"
slug: "pamiec-agenta-harness-kodujacy-od-zera"
hashtags: "#decodingai #agents #ai #architecture #coding #generated #pl"
---

## Drugi mózg zamieniony w pamięć agenta, bez jednej linijki bazy danych

**TLDR:** Autor przez osiemnaście miesięcy przerabiał swoje archiwum niemal jedenastu tysięcy notatek w pamięć dla agenta AI, opierając całość wyłącznie na plikach tekstowych i strukturze PARA, bez żadnej bazy danych, wektorowej czy grafowej. Efekt trafił do sieci jako otwarty plugin do Claude Code.

**Podsumowanie:** Punktem wyjścia było pytanie, ile infrastruktury naprawdę potrzebuje pamięć agenta, żeby działała w praktyce, a nie tylko w prezentacji. Autor miał już swój "drugi mózg", czyli wieloletnie archiwum notatek w metodzie PARA (Projects, Areas, Resources, Archives), ale w praktyce większość z tych notatek leżała martwa, bo żaden człowiek nie jest w stanie regularnie przeglądać dziesięciu tysięcy plików. Zamiast budować kolejną warstwę wyszukiwania semantycznego czy bazę wektorową, zdecydował się zostawić notatki dokładnie tam, gdzie są, i dopisać do nich jedną rzecz: plik index.yaml, który agent czyta jako pierwszy przy każdym uruchomieniu.

Ten plik pełni rolę mapy całego archiwum, ale bez ładowania treści. Agent widzi strukturę katalogów, tytuły, tagi i krótkie opisy, i dopiero na tej podstawie decyduje, które pliki źródłowe warto otworzyć w całości. To mechanizm progresywnego ujawniania szczegółów, czyli progressive disclosure, zaimportowany wprost z projektowania interfejsów do projektowania kontekstu dla modelu językowego. Zamiast wrzucać agentowi cały korpus do okna kontekstu, daje mu się najpierw szkielet, a szczegóły dociąga się na żądanie, warstwa po warstwie.

Ważnym ograniczeniem konstrukcyjnym jest to, że sam magazyn notatek pozostaje wyłącznie do odczytu. Agent nie ma prawa nadpisywać ani czyścić oryginalnych plików, bo w metodzie PARA to człowiek jest kustoszem archiwum, a agent tylko z niego korzysta. To rozróżnienie wydaje się drobne, ale w praktyce chroni przed scenariuszem, w którym automatyczne porządkowanie notatek psuje coś, czego nie da się łatwo odtworzyć. Cała logika dostępu, indeksowania i priorytetyzacji siedzi poza samymi danymi, w osobnej warstwie, którą można iterować bez ryzyka dla źródła.

Całość została opublikowana jako plugin do Claude Code, więc każdy może wziąć własny zbiór notatek w Obsidianie czy zwykłych plikach Markdown i podłączyć go w podobny sposób. Nie ma tu żadnej bazy danych do utrzymania, żadnego indeksu wektorowego do ponownego liczenia, tylko pliki i jeden plik-mapa nad nimi.

**Kluczowe wnioski:**
- Pamięć agenta da się zbudować bez bazy wektorowej czy grafowej, na samych plikach i jednym pliku indeksującym
- Progresywne ujawnianie treści (index najpierw, szczegóły na żądanie) ogranicza zużycie kontekstu bez utraty dostępu do pełnych danych
- Trzymanie źródła notatek w trybie tylko do odczytu chroni archiwum przed przypadkowym uszkodzeniem przez agenta
- Rozwiązanie jest dostępne jako otwarty plugin do Claude Code, więc można je przetestować na własnym archiwum

**Dlaczego mnie to obchodzi:** Jako ktoś, kto też ma zbyt wiele notatek i za mało czasu, żeby je przeglądać, doceniam to podejście dokładnie za to, że nie próbuje sprzedać kolejnej bazy danych jako rozwiązania każdego problemu. Widziałem zbyt wiele projektów, w których zespół najpierw stawiał Pinecone czy Weaviate, a dopiero potem zastanawiał się, czy w ogóle potrzebuje wyszukiwania semantycznego. Tutaj ograniczenie do plików i jednego pliku-mapy wymusza prostotę, którą łatwo utrzymać i którą łatwo debugować, kiedy coś pójdzie nie tak, bo wystarczy otworzyć plik tekstowy, a nie odpytywać silnik grafowy.

**Link:** [Your Second Brain Is a Graveyard. Make It Agent Memory.](https://substack.com/redirect/8951b416-e6a2-45c9-9dd5-d0a317a32b1c?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

## Kiedy graf wiedzy sam wymyśla sobie schemat

**TLDR:** Ten sam problem pamięci agenta, ale rozwiązany po trudniejszej stronie: LangChain przetestował MongoDBGraphStore, który z pięciu dokumentów w dziesięć minut zbudował graf wiedzy, ale przy okazji wymyślił siedemnaście typów węzłów i trzydzieści cztery typy relacji. Odpowiedzią było wprowadzenie sztywnej ontologii jako kontraktu, według wzorca POLE+O, na jednej kolekcji MongoDB.

**Podsumowanie:** Budowa grafu wiedzy z surowego tekstu brzmi kusząco, bo teoretycznie model językowy sam wyciąga encje i relacje, a programista dostaje gotową strukturę bez ręcznego modelowania danych. Eksperyment opisany w artykule pokazuje jednak, dlaczego ta swoboda jest problemem, a nie zaletą. Z zaledwie pięciu dokumentów wejściowych MongoDBGraphStore w LangChain wygenerował graf z siedemnastoma różnymi typami węzłów i trzydziestoma czteroma typami relacji. Przy takiej skali danych to jest nadmiarowa złożoność, która nie wynika z rzeczywistej struktury informacji, tylko z tego, że model za każdym razem interpretuje kategorie na nowo.

Efekt praktyczny takiej dowolności jest bolesny przy każdym kolejnym zapytaniu do grafu. Jeśli raz encja trafia do węzła typu "Organization", a innym razem ten sam rodzaj bytu ląduje jako "Company" albo "Institution", to każde zapytanie Cypher trzeba pisać z myślą o wszystkich możliwych wariantach nazewnictwa, albo pogodzić się z tym, że część danych po prostu nie zostanie znaleziona. Graf, który miał być źródłem prawdy, staje się źródłem niepewności.

Rozwiązaniem, które opisuje artykuł, jest odwrócenie kolejności: zamiast pozwalać modelowi projektować schemat na bieżąco, najpierw definiuje się ontologię jako twardy kontrakt, a model tylko wypełnia jej pola. Konkretnie zastosowano wzorzec POLE+O, czyli podział na osoby, obiekty, lokalizacje i zdarzenia plus warstwę ontologiczną spinającą je w spójny model, wzorzec używany też w systemach analityki śledczej. Cała ta struktura żyje na jednej kolekcji MongoDB, bez potrzeby osobnej bazy grafowej.

To podejście jest bardziej pracochłonne na starcie, bo trzeba usiąść i faktycznie zaprojektować, jakie typy encji i relacji mają sens dla danej domeny, zamiast liczyć, że model sam to odkryje. W zamian dostaje się graf, który da się zapytać w sposób przewidywalny, i który nie rośnie w nieskończoność liczbą przypadkowych kategorii wraz z każdym nowym dokumentem.

**Kluczowe wnioski:**
- Pozwolenie modelowi na swobodne wymyślanie schematu grafu wiedzy prowadzi do eksplozji typów węzłów i relacji, nawet przy małej liczbie dokumentów wejściowych
- Ontologia zdefiniowana z góry, jako kontrakt, który musi wypełnić model, daje przewidywalną strukturę zamiast losowej
- Wzorzec POLE+O (osoby, obiekty, lokalizacje, zdarzenia plus ontologia) sprawdza się jako szkielet do modelowania relacji w grafie
- Graf wiedzy nie wymaga osobnej bazy grafowej, da się go trzymać na jednej kolekcji dokumentowej w MongoDB

**Dlaczego mnie to obchodzi:** To jest dokładnie ten typ problemu, który wygląda dobrze na demie i fatalnie na produkcji. Widziałem podobny wzorzec przy schematach baz relacyjnych generowanych automatycznie z opisu w języku naturalnym, gdzie każda kolejna migracja dokładała nowe, niespójne nazwy kolumn. Ontologia jako kontrakt to w gruncie rzeczy to samo, co typowanie w TypeScript zamiast `any` wszędzie, czyli mniej wolności na starcie w zamian za dużo mniej niespodzianek trzy miesiące później, kiedy ktoś próbuje coś odpytać.

**Link:** [Agent Memory From Scratch](https://substack.com/redirect/95381280-ad4c-42e3-be05-824850c51d29?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

## Harness, nie model, decyduje o jakości agenta kodującego

**TLDR:** Nowy kurs otwarto od eksperymentu z Terminal-Bench, w którym sama zmiana harnessu przy tym samym modelu przesunęła agenta kodującego z około trzydziestego miejsca w rankingu do pierwszej piątki. Pierwsza lekcja pokazuje pełną architekturę agenta o nazwie Decode, prześledzoną krok po kroku, zanim padnie choćby jedna linijka kodu.

**Podsumowanie:** Wniosek z eksperymentu, od którego zaczyna się kurs, jest prosty do wypowiedzenia, ale trudny do zaakceptowania dla kogoś, kto ciągle śledzi nowe wersje modeli: to nie model robi różnicę między słabym a dobrym agentem kodującym, tylko harness, czyli cała otoczka wokół pojedynczego wywołania modelu. Ten sam model, przełożony z jednego harnessu do drugiego, skoczył z okolic trzydziestego miejsca w rankingu Terminal-Bench do pierwszej piątki. Model językowy w tym eksperymencie był stały, zmieniało się tylko to, jak dostarczano mu kontekst, jak obsługiwano narzędzia i jak sterowano jego pętlą działania.

Pierwsza lekcja kursu nie zaczyna się więc od kodu, tylko od narysowania całej architektury agenta o nazwie Decode, zanim ktokolwiek napisze jakąkolwiek klasę czy funkcję. To podejście samo w sobie jest wskazówką: architektura harnessu to decyzja projektowa, którą trzeba podjąć świadomie, a nie coś, co wyłania się przypadkiem z kolejnych commitów.

Najbardziej wymowny fragment lekcji to porównanie rozmiarów. Sama pętla agenta, czyli kod odpowiedzialny za wywołanie modelu, odebranie odpowiedzi i ewentualne wywołanie narzędzia, zajmuje około dwudziestu linii w bibliotece Pydantic AI. To wszystko, co większość ludzi ma na myśli, mówiąc "agent". Cała reszta systemu, czyli zarządzanie narzędziami, historią rozmowy, kontekstem, sesją, interfejsem użytkownika i tak dalej, to już harness, i to właśnie tam mieszka realna złożoność projektu.

To rozróżnienie porządkuje myślenie o tym, gdzie faktycznie warto inwestować czas przy budowie własnego agenta. Skoro pętla modelu to dwadzieścia linijek gotowego kodu z biblioteki, to cała praca inżynierska i tak przenosi się na warstwę wokół niej, a kurs zapowiada, że kolejne lekcje właśnie tę warstwę będą rozwijać krok po kroku.

**Kluczowe wnioski:**
- Zmiana samego harnessu, przy identycznym modelu, potrafi przesunąć wynik agenta kodującego z trzydziestego miejsca do pierwszej piątki w benchmarku Terminal-Bench
- Rdzeń pętli agenta w Pydantic AI to około dwudziestu linii kodu, cała reszta systemu to harness
- Świadome zaprojektowanie architektury przed napisaniem kodu jest traktowane jako pierwszy, obowiązkowy krok budowy agenta
- Kurs zapowiada rozwijanie właśnie warstwy harnessu w kolejnych lekcjach, a nie samej pętli modelu

**Dlaczego mnie to obchodzi:** To jest coś, co powtarzam zespołom od miesięcy, kiedy ktoś pyta, czy przejść na nowszy model, żeby poprawić jakość agenta. Zwykle problem nie leży w modelu, tylko w tym, jak fatalnie zaprojektowany jest kontekst, jakie narzędzia agent dostaje i jak radzi sobie z błędami po drodze. Fajnie widzieć to potwierdzone konkretnym eksperymentem, a nie tylko moim wrażeniem z pracy przy kilku wdrożeniach. Dwadzieścia linijek na samą pętlę też stawia sprawę we właściwej perspektywie, bo pokazuje, że cała trudność projektu siedzi w rzeczach, które programiści już znają z budowy zwykłych aplikacji: zarządzanie stanem, obsługa błędów, UX.

**Link:** [Lesson 1: Building a Coding Agent From Scratch](https://substack.com/redirect/dfd432d2-cb41-46b7-90f8-1c727b66ab7c?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

## Pętla bez limitu kroków i kolejka na wpisywany w locie tekst

**TLDR:** Druga lekcja kursu pokazuje gołą pętlę agenta kodującego, z dziewięcioma narzędziami i interfejsem tekstowym, na poziomie funkcjonalnym zbliżonym do narzędzia Pi. Pętla nie ma limitu liczby kroków, bo model sam sygnalizuje zakończenie zadania, a wpisywanie tekstu w trakcie pracy agenta jest buforowane w osobnej kolejce, żeby nie zepsuć wywołania narzędzia w locie.

**Podsumowanie:** Po architekturze z pierwszej lekcji przychodzi czas na implementację najprostszej możliwej wersji agenta: jedna pętla, dziewięć narzędzi i interfejs tekstowy (TUI), które razem dają funkcjonalność porównywalną z narzędziem Pi. To świadomie minimalny zestaw, mający pokazać, ile w ogóle potrzeba, żeby coś działającego postawić na nogi, zanim dojdzie się do bardziej zaawansowanych mechanizmów z kolejnych lekcji.

Jeden szczegół implementacyjny wybija się na pierwszy plan: co się dzieje, kiedy użytkownik zaczyna pisać kolejną wiadomość, zanim agent skończy bieżące wywołanie narzędzia. Naiwna implementacja po prostu wstrzyknęłaby ten tekst do strumienia w dowolnym momencie, co realnie potrafi uszkodzić wywołanie narzędzia w trakcie jego wykonywania. Rozwiązaniem jest kolejka sterująca, do której trafia wpisywany tekst, a faktyczne wstrzyknięcie go do kontekstu modelu następuje dopiero w bezpiecznym punkcie granicznym pętli, czyli wtedy, gdy żadne narzędzie nie jest w trakcie wykonania.

Drugi szczegół, równie praktyczny, dotyczy tego, kiedy pętla w ogóle się kończy. Wiele prostszych implementacji agentów ma sztywny limit liczby kroków albo iteracji, żeby uniknąć nieskończonej pętli w razie błędu. Tutaj takiego limitu celowo nie ma, bo model sam, w swojej odpowiedzi, sygnalizuje, że zadanie zostało wykonane i pętla może się zatrzymać. To decyzja, która przenosi odpowiedzialność za zakończenie pracy z twardo zakodowanej liczby z powrotem na sam model, co brzmi ryzykownie, ale wynika z założenia, że dobrze zaprojektowany harness powinien ufać sygnałom z modelu, a nie zabezpieczać się przed nim domyślnie.

Dziewięć narzędzi to niewiele, ale to wystarczy, żeby pokryć operacje na plikach, wykonywanie poleceń i podstawową nawigację po projekcie, czyli dokładnie ten zestaw, który w praktyce najczęściej jest używany przy codziennej pracy z kodem.

**Kluczowe wnioski:**
- Minimalna, w pełni działająca wersja agenta kodującego zamyka się w jednej pętli, dziewięciu narzędziach i prostym interfejsie tekstowym
- Wpisywanie tekstu w trakcie działania agenta wymaga buforowania w kolejce sterującej, żeby nie zepsuć wywołania narzędzia w locie
- Brak sztywnego limitu kroków w pętli, bo model sam sygnalizuje zakończenie zadania, jest świadomym wyborem projektowym, a nie przeoczeniem
- Nawet minimalny zestaw dziewięciu narzędzi wystarcza do osiągnięcia funkcjonalności porównywalnej z istniejącym narzędziem

**Dlaczego mnie to obchodzi:** Problem z wpisywaniem tekstu w trakcie działania agenta to dokładnie ten rodzaj detalu, który wygląda banalnie, dopóki się z nim nie zmierzysz, a potem okazuje się, że pół dnia schodzi na debugowanie wyścigu warunków w strumieniu wejściowym. Cieszy mnie, że kurs w ogóle o tym mówi, bo większość materiałów o budowie agentów skupia się na promptach i narzędziach, a pomija warstwę interakcji w czasie rzeczywistym, która w codziennym użyciu jest równie istotna. Rezygnacja z limitu kroków na rzecz zaufania do sygnału z modelu to z kolei decyzja, którą bym testował bardzo ostrożnie w środowisku produkcyjnym, bo model, który nie zgłasza zakończenia z powodu błędu w promptcie, potrafi kręcić się w kółko bez końca, jeśli nic go nie zatrzyma z zewnątrz.

**Link:** [Lesson 2: The Bare-Bones Coding Agent Loop](https://substack.com/redirect/9723d95b-b9c6-4240-9d2c-f62c089ccd4c?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

## Jak nie zapłacić więcej za agenta, którego już masz

**TLDR:** Zbiór jedenastu praktycznych wskazówek do codziennej pracy z agentami kodującymi w ramach jednej subskrypcji, bez konieczności budowania własnego harnessu. Kluczowe pomysły to podział ról między droższym modelem do planowania i tańszym do wykonania oraz agresywne przycinanie tego, co trafia do okna kontekstu.

**Podsumowanie:** Ten artykuł jest przeciwwagą dla reszty numeru: nie każdy musi budować własnego agenta od zera, żeby wyciągnąć więcej z narzędzi, które już ma. Autor spisał jedenaście wskazówek z własnego, codziennego użycia, napisanych krótko i, jak sam podkreśla, w trakcie urlopu, co samo w sobie mówi coś o tym, jak bardzo te narzędzia zintegrowały się z jego codzienną pracą.

Spora część wskazówek kręci się wokół podziału ról między modelami w zależności od kosztu i etapu pracy. Planowanie, czyli rozbicie zadania na kroki i podjęcie decyzji architektonicznych, warto powierzyć najsilniejszemu dostępnemu modelowi, bo błąd na tym etapie kosztuje najwięcej w dalszej części pracy. Samo wykonanie już zaplanowanych kroków można natomiast oddać tańszemu modelowi, bo tam ryzyko błędu jest mniejsze, a oszczędność w tokenach większa. To podejście, mówiąc wprost, przypomina to, jak w zespole programistycznym senior projektuje rozwiązanie, a implementację wykonuje ktoś mniej doświadczony, pod nadzorem.

Obok tego autor opisuje delegowanie czytania. Zamiast samemu przeglądać cały plik czy log błędów i wklejać go w całości do rozmowy z głównym agentem, wysyła tanie podagenty, których jedynym zadaniem jest przeczytać całość i zwrócić zwięzłe podsumowanie. To odciąża główny wątek rozmowy od surowego, nieprzetworzonego tekstu i pozwala mu skupić się na decyzjach, a nie na przeglądaniu treści.

Najbardziej konkretna liczba w artykule dotyczy samego rozmiaru kontekstu. Autor podaje, że przy oknie kontekstu na milion tokenów, realny payload, który stale nosi ze sobą w rozmowie, to zaledwie dwadzieścia jeden i cztery dziesiąte tysiąca tokenów. To pokazuje, jak duża część teoretycznie dostępnego okna kontekstu w praktyce jest marnowana przez systemowe komunikaty, historię narzędzi i inne rzeczy, których użytkownik nigdy nie widzi, a które da się przyciąć, jeśli się o to świadomie zadba.

**Kluczowe wnioski:**
- Silniejszy, droższy model warto rezerwować do planowania, a tańszy do wykonania już rozpisanych kroków
- Delegowanie czytania długich plików i logów do tanich podagentów, które zwracają tylko podsumowanie, odciąża główny wątek rozmowy
- Realny rozmiar payloadu w kontekście da się przyciąć znacząco poniżej nominalnego limitu okna, co bezpośrednio obniża koszty
- Poprawa efektywności pracy z agentem nie zawsze wymaga budowy własnego harnessu, czasem wystarczy zmienić nawyki w istniejącym narzędziu

**Dlaczego mnie to obchodzi:** Liczba dwadzieścia jeden i cztery dziesiąte tysiąca tokenów przy oknie na milion zapadła mi w pamięć, bo dokładnie pokazuje, jak łatwo płacić za kontekst, którego w ogóle nie potrzeba. Sam łapię się na tym, że wklejam całe logi buildów czy stack trace'y do rozmowy z agentem, zamiast najpierw je przefiltrować albo skrócić, a potem dziwię się, że odpowiedź przychodzi wolniej i kosztuje więcej. Podział na model do planowania i model do wykonania też pasuje do tego, jak i tak organizujemy pracę w zespołach, więc przeniesienie tego wzorca na warstwę modeli wydaje się naturalnym, a nie sztucznym krokiem.

**Link:** [11 Tips to Run Coding Agents 24/7 on One Subscription](https://substack.com/redirect/7e9651d2-b640-4630-82da-e622361a0a4a?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)
