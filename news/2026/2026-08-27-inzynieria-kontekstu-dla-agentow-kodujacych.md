---
title: "Inżynieria kontekstu dla agentów kodujących: pamięć, umiejętności, serwer LSP i kompakcja"
excerpt: "Rozbiór cyklu życia kontekstu w agencie kodującym, z konkretnymi progami, limitami i najtańszą pętlą zwrotną, jaką masz w systemie."
publishedAt: "2026-08-25"
slug: "inzynieria-kontekstu-dla-agentow-kodujacych"
hashtags: "#decodingai #agents #ai #llm #devtools #architecture #python #generated #pl"
source_pattern: "Decoding AI"
---

## Inżynieria kontekstu dla agentów kodujących

**TLDR:** Czwarta lekcja kursu budowania agenta kodującego od zera rozkłada na części cztery mechanizmy zarządzania kontekstem: pamięć, umiejętności, serwer protokołu językowego i kompakcję. Punkt wyjścia jest mocny: w jednym eksperymencie zmiana samej obudowy przy niezmienionym modelu przesunęła agenta z okolic trzydziestego miejsca do pierwszej piątki.

**Summary:** Zacznijmy od tezy, która powinna być punktem wyjścia każdej rozmowy o agentach. To obudowa, a nie model, decyduje o tym, czy agent kodujący jest dobry. Autor przywołuje eksperyment, w którym zmiana wyłącznie warstwy otaczającej model, przy tym samym modelu pod spodem, przesunęła wynik o dwadzieścia kilka pozycji w rankingu. Jeśli to prawda, a wygląda wiarygodnie, to znaczy, że większość naszych rozmów o wyborze modelu dotyczy niewłaściwej zmiennej.

Sam problem inżynierii kontekstu autor sprowadza do czterech pytań: co włożyć do okna kontekstu, czego nie wkładać, jak je przycinać i jak stworzyć jak najwięcej pętli zwrotnych. Ta ostatnia część jest najczęściej pomijana, a moim zdaniem najważniejsza. Cel formułuje ładnie: najmniejszy możliwy zbiór tokenów o wysokiej wartości informacyjnej.

Pamięć dzieli się na dwie warstwy. Plik z instrukcjami projektu wstrzykuje kontekst biznesowy, powody istnienia komponentów, stos technologiczny i procesy wokół niego. Kod jest źródłem prawdy, więc nie należy go duplikować, tylko dodawać metadane i odsyłacze, których agent nie wywnioskuje bez ciężkiego rozumowania. Zalecany limit to trzysta linii z twardą barierą około sześciuset, a każda linia powinna powstać w odpowiedzi na zaobserwowany błąd. Druga warstwa to pamięć wyciągana automatycznie z rozmów: przy każdym wyjściu z sesji jedno tanie wywołanie modelu streszcza sesję w jedno zdanie i dopisuje je jako datowany punkt. Plik ma twardy limit dwustu linii albo dwudziestu pięciu tysięcy bajtów, ze zrzucaniem najstarszych wpisów, plus osobny mechanizm kompresji scalający notatki zduplikowane i unieważnione.

Rozdział o umiejętnościach zawiera liczbę, którą warto zapamiętać. Popularne serwery udostępniające narzędzia agentowi zjadają od siedmiu do dziewięciu procent okna kontekstu, zanim w ogóle zaczniesz pracować, bo schematy narzędzi ładują się z góry. Umiejętności rozwiązują ten problem z dwóch stron, przez stopniowe odsłanianie na trzech poziomach. Na pierwszym w kontekście siedzi tylko katalog: jedna linia z nazwą i opisem na umiejętność, z opcjonalnym limitem około procenta okna. Na drugim wywołanie umiejętności ładuje treść jej pliku głównego. Na trzecim agent sam decyduje, czy przeczytać dołączone dokumenty albo uruchomić dołączone skrypty. Sedno tego mechanizmu jest banalnie proste i dlatego działa: wystawiasz agentowi manifest dołączonych plików z dokładnymi ścieżkami względem katalogu roboczego, a on korzysta z narzędzi do czytania i uruchamiania.

Najciekawszy technicznie jest fragment o serwerze protokołu językowego i zgadzam się z autorem, że to najbardziej niedoceniany element takich narzędzi. Taki serwer utrzymuje żywy indeks symboli w bazie kodu: zmiennych, funkcji, klas, definicji, odwołań i błędów typów. Twoje środowisko programistyczne już go uruchamia. Agent karmiony jest z dwóch kanałów. Pierwszy to aktywne zapytania z czterema operacjami: definicja, odwołania, podpowiedź i diagnostyka. Jedno wywołanie zwraca precyzyjną odpowiedź w formacie plik, linia, kolumna zamiast trzech spekulacyjnych odczytów plików. Drugi kanał jest pasywny i to on mi się podoba najbardziej: po każdym udanym zapisie albo edycji pliku do wyniku narzędzia dopisywany jest blok z samymi błędami, maksymalnie dziesięcioma, i milknący przy czystym pliku. Agent widzi błąd typu natychmiast, w tej samej turze, bez dodatkowego wywołania i bez uruchamiania testów.

Kompakcja domyka całość i tu też są konkretne liczby. Autor opisuje własne doświadczenie z listopada zeszłego roku, gdy żądania zaczynały się degradować w okolicach stu osiemdziesięciu tysięcy tokenów wejściowych, przy oficjalnie deklarowanym milionie. Ponad trzy minuty na żądanie albo przekroczenia czasu i rozłączenia. Pełne okno pogarsza działanie modelu na długo przed osiągnięciem twardego limitu. Stąd trzy mechanizmy: całkowite wyczyszczenie okna z zapisem wniosków do pamięci, mikrokompakcja wyzwalana przy sześćdziesięciu procentach zapełnienia i pełna kompakcja przy osiemdziesięciu. Przy pełnej model streszcza rozmowę według sześcioczęściowego szablonu obejmującego cel, ograniczenia i preferencje, postęp, kluczowe decyzje, następne kroki i krytyczny kontekst, a starsze wiadomości znikają. Zostaje prompt systemowy, streszczenie i ogon około dwudziestu tysięcy tokenów, przycięty równo na granicy tak, żeby wywołania narzędzi zostały sparowane ze swoimi wynikami.

**Key takeaways:**
- Obudowa agenta, a nie model, decyduje o jakości agenta kodującego
- Plik z instrukcjami projektu do trzystu linii, każda linia w odpowiedzi na zaobserwowany błąd
- Schematy narzędzi z popularnych serwerów zjadają siedem do dziewięciu procent okna przed rozpoczęciem pracy
- Stopniowe odsłanianie na trzech poziomach: katalog, treść umiejętności, dołączone zasoby na żądanie
- Pasywne dopisywanie błędów typów po każdej edycji to najtańsza pętla zwrotna w całym systemie
- Degradacja modelu zaczyna się długo przed twardym limitem okna, więc kompakcja jest konieczna
- Przycinanie kontekstu musi zachować parowanie wywołań narzędzi z ich wynikami

**Why do I care:** Dwie rzeczy z tej lekcji zabieram do własnych konfiguracji. Pierwsza to pasywne wzbogacanie wyniku edycji o błędy typów. To jest tak oczywiste po fakcie, że aż irytujące: zamiast czekać, aż agent sam uruchomi kompilator, wsadź mu błędy prosto do odpowiedzi narzędzia. Skraca to pętlę z kilku tur do zera i kosztuje kilkadziesiąt tokenów. Druga to liczba o kosztach schematów narzędzi, bo pokazuje, że podłączanie wszystkiego, co się da, jest realnym podatkiem płaconym w każdej sesji. Warto to raz zmierzyć we własnej konfiguracji, bo podejrzewam, że u większości ludzi ten procent jest dużo wyższy niż dziewięć. Cały kurs jest w Pythonie, ale opisane mechanizmy są całkowicie niezależne od języka.

**Link:** [Context Engineering for Coding Agents](https://www.decodingai.com/p/context-engineering-for-coding-agents)
