---
title: "Uczciwe funkcje, dwa wydania Node.js i wzorzec propose-validate-commit"
excerpt: "O projektowaniu funkcji, które da się przetestować, o tym co realnie przynoszą Node 24.20 i 26.8, oraz o prostym wzorcu na ruch po siatce."
publishedAt: "2026-08-27"
slug: "honest-functions-nodejs-24-20-26-8-propose-validate-commit"
hashtags: "#dailydev #nodejs #javascript #architecture #testing #dx #webdev #generated #pl"
source_pattern: "daily.dev"
---

## Jak napisać idealną funkcję

**TLDR:** Czterdziestosiedmiominutowy materiał o filozofii projektowania funkcji, w którym autor twierdzi, że funkcje istnieją po to, by umożliwić lokalne rozumowanie, abstrakcję i testowalność, a nie żeby unikać powtórzeń. Wprowadza podział na funkcje uczciwe i nieuczciwe, gdzie nieuczciwość jest zaraźliwa i trzeba ją wypychać jak najwyżej w drzewie wywołań.

**Summary:** Zacznę od tezy, która mnie ucieszyła, bo od lat próbuję ją przemycać na warsztatach. Ponowne użycie kodu to najsłabszy powód, żeby wydzielić funkcję. Najmocniejszy to lokalne rozumowanie, czyli możliwość zrozumienia fragmentu kodu bez trzymania w głowie reszty systemu. Kiedy zaczniesz myśleć w ten sposób, wiele twoich decyzji o podziale kodu zmieni się, bo nagle funkcja wywoływana raz w całym projekcie przestaje być błędem.

Podział na funkcje uczciwe i nieuczciwe jest praktycznym narzędziem. Funkcja uczciwa komunikuje się ze światem wyłącznie przez swoją sygnaturę, czyli przez argumenty i wartość zwracaną. Nieuczciwa sięga po ukryty stan globalny. Kluczowa obserwacja brzmi: nieuczciwość jest zaraźliwa. Jeśli funkcja A wywołuje nieuczciwą funkcję B, to A też staje się nieuczciwa, bo jej zachowanie zależy od czegoś, czego nie widać w sygnaturze. Wniosek praktyczny to wypychanie nieuczciwości jak najwyżej, do samego brzegu aplikacji, żeby cała środkowa warstwa pozostała czysta.

Przykład jest w C++ i dotyczy symulacji cząstek, ale przenosi się jeden do jednego na JavaScript i TypeScript. Symulacja używa globalnego generatora liczb pseudolosowych, przez co wyniku nie da się powtórzyć, a więc nie da się napisać sensownego testu. Rozwiązanie polega na przekazaniu generatora jako parametru. To dokładnie ten sam problem, który mamy w kodzie frontendowym z bezpośrednim wołaniem Math.random, Date.now albo sięganiem po window. Każde takie wywołanie w środku logiki biznesowej to zadeklarowanie, że tej logiki nie będziesz testować.

Druga część materiału dotyczy projektowania sygnatur, które autor nazywa empatycznymi. Chodzi o używanie struktur zamiast długich list argumentów, mocnych typów zamiast gołych liczb i widoków na dane zamiast kopiowanych kolekcji. Najciekawszy pomysł to typy fantomowe kodujące warunki wstępne, czyli sytuacja, w której typ argumentu sam mówi, że mutex jest już zablokowany albo że wektor jest znormalizowany. W TypeScripcie robi się to markami na typach i jest to jedna z najbardziej niedocenianych technik, jakie ten język oferuje.

Całość zamyka złota zasada: każda linia w ciele funkcji powinna leżeć na tym samym poziomie abstrakcji. Autor pokazuje to na refaktoryzacji funkcji wyszukującej zasoby, rozbijając ją na warstwy. To najstarsza rada w tym zestawie, znana z literatury o czystym kodzie, ale wciąż najczęściej łamana. Mieszanie w jednej funkcji wywołania HTTP, parsowania odpowiedzi i formatowania daty do wyświetlenia to codzienność w większości projektów, które oglądam.

**Key takeaways:**
- Funkcje istnieją dla lokalnego rozumowania i testowalności, nie dla unikania powtórzeń
- Funkcja uczciwa komunikuje się ze światem tylko przez sygnaturę, nieuczciwa sięga po stan globalny
- Nieuczciwość zaraża wywołujących, więc wypychaj ją na brzeg aplikacji
- Typy fantomowe pozwalają zakodować warunki wstępne w systemie typów
- Wszystkie linie w ciele funkcji powinny być na tym samym poziomie abstrakcji

**Why do I care:** To jest materiał, który dałbym każdemu deweloperowi przed rozmową o architekturze. Rozróżnienie uczciwa kontra nieuczciwa jest lepszym narzędziem komunikacji niż akademickie gadanie o czystości funkcyjnej, bo pozwala prowadzić konkretną rozmowę na code review. Zamiast „to nie jest czyste" mówisz „ta funkcja jest nieuczciwa, bo sięga po zegar systemowy, i przez to zaraża wszystko powyżej". W kodzie frontendowym z Reactem ten sam problem wraca pod postacią komponentów czytających kontekst w połowie drzewa i potem dziwiących się, dlaczego nie da się ich wyrenderować w teście.

**Link:** [How to write the perfect function](https://daily.dev/posts/AxI9COmZA)

## Node.js 24.20.0 LTS

**TLDR:** Wydanie LTS o nazwie Krypton dorzuca zakresy using dla AsyncLocalStorage, API permission.drop wraz z flagą audytu uprawnień, obsługę map pakietów w loaderze, nowy moduł strumieniowych iteratorów oraz włączone WebAssembly JSPI. Do tego aktualizacja certyfikatów głównych i długa lista poprawek.

**Summary:** Dla mnie najciekawsze w tym wydaniu jest połączenie zakresów using z AsyncLocalStorage. Składnia using to mechanizm automatycznego zwalniania zasobów przy wyjściu z zakresu, znany z innych języków, a teraz obecny w JavaScripcie. Podpięcie go pod magazyn kontekstu asynchronicznego oznacza, że kontekst żądania czyści się sam, gdy wyjdziesz z bloku, zamiast wymagać ręcznego zawijania w wywołanie run. Kto budował tracing albo przekazywanie identyfikatora korelacji przez warstwy aplikacji, wie, ile błędów bierze się z zapomnianego czyszczenia kontekstu.

Druga rzecz warta uwagi to permission.drop i flaga audytu uprawnień. Model uprawnień w Node dojrzewa i zmierza w stronę tego, co znamy z Deno, tylko dokładniej. Możliwość porzucenia uprawnień w trakcie działania procesu to wzorzec bezpieczeństwa z Uniksa: startujesz z szerokimi prawami, robisz to, co wymaga dostępu, i schodzisz do minimum na resztę życia procesu. Flaga audytu pozwala natomiast zobaczyć, czego program faktycznie potrzebuje, zanim zaczniesz zaciskać śrubę. To dokładnie ta kolejność, w jakiej powinno się wprowadzać ograniczenia, bo zgadywanie kończy się produkcyjną awarią o trzeciej w nocy.

Obsługa map pakietów w loaderze i nowy moduł node:stream/iter to sygnały, że Node porządkuje warstwę rozwiązywania modułów i pracy ze strumieniami. Iteratory nad strumieniami wreszcie pozwalają traktować strumień jak zwykłą kolekcję asynchroniczną, bez ręcznego sklejania obsługi zdarzeń. Do tego doszła metoda context.log w wbudowanym runnerze testów, co brzmi banalnie, ale kto próbował zdiagnozować test w Node bez sensownego logowania, ten wie.

WebAssembly JSPI, czyli integracja obietnic JavaScriptu z WebAssembly, zostało włączone domyślnie. To pozwala kodowi WebAssembly wstrzymać się na asynchronicznej operacji JavaScriptu bez przepisywania go na tryb asynchroniczny. Dla portowanych bibliotek napisanych w C czy Ruście to różnica między działa i nie działa.

Reszta to higiena: certyfikaty główne zaktualizowane do NSS 3.125, npm do wersji 11.19.0, biblioteki sieciowe, sqlite i dane stref czasowych podbite, plus poprawki w crypto, buffer, http, http2, quic i net.

**Key takeaways:**
- Zakresy using dla AsyncLocalStorage upraszczają zarządzanie kontekstem asynchronicznym
- permission.drop pozwala zejść do minimalnych uprawnień w trakcie działania procesu
- Flaga audytu uprawnień pokazuje, czego program faktycznie potrzebuje
- Nowy moduł strumieniowych iteratorów pozwala traktować strumień jak kolekcję asynchroniczną
- WebAssembly JSPI włączone domyślnie ułatwia portowanie bibliotek natywnych

**Why do I care:** LTS to wydanie, na którym realnie stoi produkcja, więc te zmiany trafią do twoich projektów szybciej, niż myślisz. Model uprawnień jest tym, na co patrzyłbym najuważniej, bo za chwilę pojawi się jako wymóg w audytach bezpieczeństwa, a przygotowanie aplikacji do działania z zaciśniętymi uprawnieniami to praca, której nie da się zrobić w tydzień przed audytem. Zakresy using dla kontekstu asynchronicznego z kolei rozwiązują realny ból każdego, kto buduje obserwowalność w aplikacji serwerowej.

**Link:** [Node.js 24.20.0 (LTS)](https://daily.dev/posts/cbB6DLboe)

## Node.js 26.8.0 (Current)

**TLDR:** Gałąź bieżąca dostaje stabilne API TracingChannel do diagnostyki, tryby szyfrowania SIV i GCM-SIV, podświetlanie składni w REPL, nowe klasy do obsługi archiwów ZIP w module zlib oraz przyspieszone net.BlockList. Do tego metody zamykające przygotowane zapytania w wbudowanym sqlite.

**Summary:** Ustabilizowanie TracingChannel to najważniejsza pozycja na tej liście. To mechanizm kanałów diagnostycznych, przez który biblioteki mogą publikować zdarzenia o swoim działaniu, a narzędzia obserwowalności mogą je konsumować bez małpiego łatania prototypów. Dopóki API było eksperymentalne, twórcy narzędzi typu APM nie mogli na nim polegać. Teraz mogą, i spodziewam się, że w ciągu kilku miesięcy zobaczymy migrację całej branży z brzydkich technik przechwytywania na ten kanał.

Wbudowany moduł sqlite dostał metody close i wsparcie dla wzorca zasobów jednorazowych na przygotowanych zapytaniach. To znowu ta sama historia, co z using w wydaniu LTS: JavaScript uczy się deterministycznego zwalniania zasobów, a wbudowane moduły dostosowują się jedna po drugiej. Przygotowane zapytania trzymają zasoby natywne, więc zostawienie ich do zebrania przez odśmiecacz to prosta droga do wycieku deskryptorów.

Nowe klasy do pracy z archiwami ZIP w module zlib są ciekawe strategicznie. Node powoli wchłania funkcje, dla których dotąd sięgało się po zależności z npm. Wcześniej sqlite, teraz ZIP. Każda taka absorpcja to o kilka zależności mniej w drzewie i o kilka wektorów ataku łańcucha dostaw mniej. Nie mam wątpliwości, że to dobry kierunek, choć rozumiem irytację autorów bibliotek, którym runtime zjada rynek.

Tryby SIV i GCM-SIV w module crypto to szyfrowanie odporne na powtórne użycie tego samego wektora inicjalizującego. W praktyce oznacza to, że jeden z najczęstszych błędów implementacyjnych w kryptografii przestaje być katastrofą. Jeśli twój zespół szyfruje cokolwiek własnymi rękami, to jest tryb, o który powinniście zapytać.

Podświetlanie składni w REPL i tryb analizy w narzędziu benchmarkowym to drobiazgi jakości życia. Ale to właśnie po nich poznaje się, że projekt ma zasoby na dbanie o komfort pracy, a nie tylko na gaszenie pożarów.

**Key takeaways:**
- TracingChannel jest już stabilny, co odblokowuje porządną integrację narzędzi obserwowalności
- Metody zamykające przygotowane zapytania w sqlite chronią przed wyciekiem zasobów natywnych
- Obsługa archiwów ZIP wbudowana w zlib zmniejsza liczbę zależności z npm
- Tryby SIV i GCM-SIV ograniczają skutki błędów w użyciu wektora inicjalizującego
- Przyspieszone net.BlockList i szybsze kończenie odpowiedzi HTTP o znanej długości

**Why do I care:** Gałąź bieżąca to podgląd tego, co za rok trafi do LTS, więc czytam ją jak mapę drogową. Stabilny TracingChannel wpłynie na to, jak instrumentujemy aplikacje serwerowe, a wbudowany ZIP i sqlite to kolejny krok w stronę runtime'u, w którym typowa aplikacja ma kilkanaście zależności zamiast kilkuset. Z perspektywy konsultanta wchodzącego do cudzych projektów każda usunięta zależność to jedna rzecz mniej, która może się zepsuć w najgorszym momencie.

**Link:** [Node.js 26.8.0 (Current)](https://daily.dev/posts/XAu63clZX)

## Poruszanie się po siatce z poszanowaniem granic

**TLDR:** Tutorial dla początkujących pokazuje, jak przesuwać postać po dwuwymiarowej siatce w JavaScripcie, pilnując, żeby nie wyszła poza planszę. Przedstawia wzorzec zaproponuj, sprawdź, zatwierdź i buduje działające demo z obsługą klawiatury, przycisków i gestów dotykowych.

**Summary:** Tekst jest kierowany do początkujących, ale wzorzec, który opisuje, wart jest przypomnienia każdemu. Zaproponuj, sprawdź, zatwierdź to trzy oddzielne kroki. Najpierw wyliczasz kandydata na nową pozycję z kierunku ruchu, nie dotykając stanu. Potem sprawdzasz, czy kandydat mieści się w granicach. Dopiero jeśli test przejdzie, aktualizujesz rzeczywistą pozycję.

Wartość tego rozbicia widać dopiero, kiedy popatrzysz na alternatywę. Typowy kod początkującego przesuwa postać, a potem sprawdza, czy wyszła za planszę, i cofa ruch. Wygląda podobnie, a jest znacznie gorszy, bo stan przez chwilę jest niepoprawny. Jeśli w tym momencie coś się wyrenderuje, coś zapisze do bazy albo poleci zdarzenie do analityki, masz błąd, którego nie odtworzysz. To dokładnie ten sam problem, co z walidacją formularza po zapisaniu wartości do stanu zamiast przed.

W szerszym kontekście ten wzorzec to po prostu niezmiennik stanu chroniony przez funkcję strażnika. W aplikacjach frontendowych rozpoznasz go w reducerach, które odrzucają niepoprawne akcje zamiast wchodzić w niepoprawny stan, i w maszynach stanowych, gdzie przejście po prostu nie istnieje, jeśli nie jest dozwolone. Autor tłumaczy przy okazji jedną rzecz, na której początkujący regularnie się przewracają: dla siatki dziesięć na dziesięć poprawne współrzędne to zakres od zera do dziewięciu, bo dolna granica jest domknięta, a górna otwarta.

Demo obsługuje trzy rodzaje wejścia: klawiaturę, przyciski na ekranie i przesunięcie palcem. To dobra decyzja dydaktyczna, bo pokazuje, że logika ruchu jest zupełnie niezależna od tego, skąd przyszedł kierunek. Warstwa wejścia tłumaczy zdarzenie na kierunek, a reszta systemu nie wie i nie musi wiedzieć, czy ktoś nacisnął strzałkę, czy machnął palcem. To ta sama separacja, o którą walczy się w większych aplikacjach i której najczęściej brakuje.

**Key takeaways:**
- Zaproponuj, sprawdź, zatwierdź chroni przed chwilowym niepoprawnym stanem
- Sprawdzanie po fakcie i cofanie ruchu wygląda podobnie, ale wpuszcza błędy trudne do odtworzenia
- Dla siatki dziesięć na dziesięć poprawny zakres współrzędnych to zero do dziewięciu
- Logika ruchu powinna być niezależna od źródła wejścia, czy to klawiatura, przycisk czy gest

**Why do I care:** Poziom jest podstawowy, ale wzorzec przenosi się bezpośrednio na kod, który piszemy zawodowo. Reducer, który sprawdza akcję przed zmianą stanu, formularz walidujący przed zapisem, maszyna stanowa odrzucająca niedozwolone przejście, to wszystko ten sam mechanizm. Jeśli szkolisz juniorów, ten tekst jest dobrym punktem wyjścia do rozmowy o niezmiennikach, bo pokazuje je na przykładzie, który da się narysować na kartce.

**Link:** [Moving Around a Grid and Respecting Boundaries](https://daily.dev/posts/mqSynAI0V)
