---
title: "Postgres 19, Appwrite w Go, React Native 0.87 i Lottie zamiast WebGL"
excerpt: "Cztery newsy z ekosystemu deweloperskiego: natywny REPACK w Postgresie, przepisanie CLI Appwrite na Go, nowości w React Native 0.87 oraz projekt UX oparty na Lottie zamiast silnika fizyki."
publishedAt: "2026-08-12"
slug: "postgres-19-appwrite-go-react-native-087-lottie"
hashtags: "#dailydev #frontend #webdev #postgres #golang #reactnative #typescript #lottie #generated #pl"
source_pattern: "daily.dev"
---

## Postgres 19 dorzuca REPACK, ale to nie jest przycisk "napraw wszystko"

**TLDR:** Postgres 19 wprowadza wbudowaną komendę REPACK do odzyskiwania miejsca po rozdętych tabelach bez blokowania, nowy zapis ON CONFLICT DO SELECT do atomowego "znajdź albo utwórz" oraz domyślnie wyłączony JIT. Brzmi jak same plusy, ale REPACK ma pułapkę, o której trzeba wiedzieć zanim wjedzie na produkcję.

**Summary:** Do tej pory, kiedy tabela w Postgresie robiła się rozdęta od martwych krotek, mieliście do wyboru VACUUM FULL, które blokuje tabelę na czas działania, albo zewnętrzne rozszerzenie pg_repack, które trzeba było doinstalować i utrzymywać osobno. Postgres 19 w końcu daje natywną komendę REPACK z opcją CONCURRENTLY, która robi to samo bez blokady. To realna wygoda operacyjna, bo mniej ruchomych części w stacku to mniej rzeczy, które mogą się zepsuć o trzeciej w nocy. Haczyk tkwi we FILLFACTOR. Jeśli parametr ten jest źle skonfigurowany, REPACK nie eliminuje bloatu, tylko przesuwa go w inne miejsce tabeli. Innymi słowy, dostajecie narzędzie, które wygląda na rozwiązanie problemu, a w rzeczywistości potrafi go tylko zamaskować, jeśli ktoś odpali je bez zrozumienia parametrów. To dokładnie ten typ nowej funkcji, którą ludzie włączają na produkcji, bo "przecież to tylko defragmentacja", a potem dziwią się, że tabela dalej rośnie.

Druga zmiana jest moim zdaniem ciekawsza niż REPACK, mimo że dostaje mniej uwagi. ON CONFLICT DO SELECT rozwiązuje problem, z którym każdy, kto pisał logikę upsert, mierzył się na piechotę. Wcześniej, żeby dostać z powrotem wiersz przy konflikcie klucza, trzeba było albo robić bezsensowny UPDATE tylko po to, żeby wywołać RETURNING, albo pogodzić się z tym, że DO NOTHING nic nie zwraca. Teraz zapytanie w jednej atomowej operacji zwraca konfliktujący wiersz, opcjonalnie z blokadą na poziomie wiersza. To jest właśnie ten rodzaj usprawnienia, które nie trafia na pierwsze strony, ale realnie upraszcza kod aplikacyjny i eliminuje race condition, które wcześniej trzeba było łatać na poziomie logiki biznesowej.

Trzecia zmiana to wyłączenie JIT-a domyślnie. Kompilacja just-in-time miała przyspieszać ciężkie zapytania analityczne, ale w praktyce dla sporej części typowych obciążeń OLTP powodowała więcej problemów niż zysków, głównie przez narzut na kompilację przy prostych zapytaniach. Wyłączenie tego domyślnie to cicha, ale sensowna zmiana, która najpewniej poprawi wydajność wielu instalacji bez żadnej akcji ze strony administratorów. Ciekawe, że artykuł nie wspomina, co się dzieje z workloadami, które faktycznie korzystały z JIT-a z automatu, czyli głównie hurtowniami danych i ciężką analityką. Ci administratorzy będą musieli świadomie włączyć JIT z powrotem, a pytanie, ile z nich w ogóle wie, że taka zmiana nastąpiła, zostaje bez odpowiedzi.

**Key takeaways:**
- REPACK w Postgresie 19 działa bez blokowania tabeli, ale źle ustawiony FILLFACTOR sprawia, że tylko przesuwa bloat zamiast go usuwać
- ON CONFLICT DO SELECT daje atomowe get-or-create bez sztuczek z RETURNING po UPDATE
- JIT jest teraz domyślnie wyłączony, co powinno pomóc typowym obciążeniom OLTP, ale wymaga uwagi od zespołów analitycznych, które na nim polegały
- Native REPACK zastępuje potrzebę trzymania pg_repack jako zewnętrznej zależności

**Why do I care:** Jako ktoś, kto niejednokrotnie musiał tłumaczyć zespołowi, dlaczego VACUUM FULL zablokował im bazę na godzinę w środku dnia, cieszę się z natywnego REPACK, ale traktuję go z dużą rezerwą. Nowe, wygodne narzędzia w bazach danych mają to do siebie, że ludzie sięgają po nie bez czytania dokumentacji do końca, a defragmentacja tabel to nie jest miejsce na zgadywanie parametrów. ON CONFLICT DO SELECT to za to zmiana, na którą czekałem od dawna i którą wdrożę przy najbliższej okazji, bo eliminuje cały klaster workaroundów, które trzymałem w kilku projektach.

**Link:** [Postgres 19's REPACK looks simple. It isn't, and the community is noticing.](https://daily.dev/posts/V4FjlmUdD)

## Appwrite przepisało CLI z TypeScriptu na Go i przyspieszyło start dwadzieścia dwa razy

**TLDR:** Appwrite zamienił swoje CLI z Node.js na Go, dostając pojedynczy natywny binarny plik bez zależności runtime. Czas startu spadł z 207 milisekund do 11, a instalacja skurczyła się z 330 pakietów npm do dwóch.

**Summary:** Liczby w tym case study robią wrażenie same w sobie. Czas startu spadł ponad dwudziestokrotnie, z 207,6 milisekundy do 11,1 milisekundy. Instalacja, która wcześniej ściągała 330 pakietów npm o wadze 209 megabajtów, teraz to dwa pakiety i 13 megabajtów. Szczytowe zużycie pamięci podczas operacji push spadło z 283,5 megabajta do 28, dzięki temu, że archiwa są teraz strumieniowane przez io.SectionReader zamiast buforowane w całości w pamięci. Sam binarny plik zmalał z 66 megabajtów przy Bun do 14 megabajtów w Go. To nie jest kosmetyczna optymalizacja, to jest różnica między CLI, które czuć jak własny proces systemowy, a CLI, które czuć jak uruchamianie kolejnej warstwy Node.js za każdym razem, gdy chcecie coś wdrożyć.

Ciekawszy od samych liczb jest sposób, w jaki podjęto decyzję między Go a Rustem, bo to pytanie, które pojawia się w każdej takiej dyskusji, a rzadko dostaje konkretną odpowiedź zamiast wojny religijnej. Zespół wybrał Go z kilku praktycznych powodów: gorutyny naturalnie pasują do równoległego obciążenia sieciowego, którym CLI głównie się zajmuje, istniał już gotowy SDK w Go, cross-kompilacja jest prostsza, a próg wejścia dla kontrybutorów niższy niż przy Rust. To brzmi jak decyzja podjęta przez ludzi, którzy musieli utrzymywać ten projekt, a nie przez ludzi, którzy chcieli sobie poeksperymentować z najnowszym trendem. Szanuję to, bo w połowie takich case study Rust wygrywa z automatu, jakby to była domyślna odpowiedź na każde pytanie o wydajność.

To, co robi z tego artykułu coś więcej niż marketingowy wpis, to opis samego procesu migracji. Dziewięciofazowy proces z bramką go/no-go w fazie zerowej, uruchomienie istniejącego, liczącego 2754 linie zestawu testów E2E napisanego w TypeScript przeciwko nowemu binarnemu plikowi, i wreszcie porównanie komenda po komendzie, które wyłapało konkretne błędy krytyczne, takie jak flaga --enabled false, która w praktyce wysyłała true, oraz brakujące podpisy kodu na darwin/amd64. To pokazuje coś, co często ginie w dyskusjach o przepisywaniu projektów na inny język: prawdziwa robota nie polega na napisaniu nowego kodu, tylko na udowodnieniu, że zachowuje się identycznie jak stary, łącznie z jego dziwactwami.

**Key takeaways:**
- Start CLI przyspieszył z 207,6 ms do 11,1 ms, a instalacja z 209 MB do 13 MB
- Peak pamięci podczas push spadł z 283,5 MB do 28 MB dzięki strumieniowaniu przez io.SectionReader
- Go wybrano nad Rustem ze względu na gorutyny, gotowy SDK, prostszą cross-kompilację i niższy próg wejścia dla kontrybutorów
- Migrację zwalidowano istniejącym zestawem testów E2E (2754 linie) uruchomionym przeciwko nowemu binarnemu plikowi, co wyłapało realne regresje

**Why do I care:** Ten artykuł jest dobrym przykładem tego, jak powinno się dokumentować przepisanie narzędzia na inny stack, bo skupia się na dowodach, a nie na deklaracjach. Zbyt wiele takich case study kończy się na "jest szybciej", bez pokazania, jak sprawdzono, że nic się nie zepsuło. Command-by-command diff, który złapał błąd z odwróconą wartością flagi boolowskiej, to dokładnie ten rodzaj szczegółu, który przekonuje mnie, że ktoś naprawdę przetestował migrację, a nie tylko ją zbudował.

**Link:** [The Appwrite CLI is now written in Go](https://daily.dev/posts/p5sCAtC6c)

## React Native 0.87: Strict TypeScript API staje się domyślne, Metro przyspiesza, Swift Package Manager wchodzi eksperymentalnie

**TLDR:** React Native 0.87 wprowadza Strict TypeScript API jako domyślne, aktualizuje Metro do wersji z dwukrotnie szybszym generowaniem source mapów, dodaje eksperymentalne wsparcie Swift Package Managera dla iOS oraz obsługę Android Gradle Plugin 9.

**Summary:** Najważniejsza zmiana w tej wersji to Strict TypeScript API, które zastępuje ręcznie utrzymywane definicje typów typami generowanymi automatycznie z kodu źródłowego. To ma dwa realne skutki. Po pierwsze, głębokie importy do wewnętrznych ścieżek typu react-native/Libraries/cokolwiek stają się błędami typów, co uderzy w każdy projekt, który przez lata sięgał po prywatne API, bo publiczne czegoś nie oferowało. Po drugie, część nazw typów się zmieniła, referencje mają teraz dedykowane typy instancji, takie jak ViewInstance czy TextInputInstance. Zespół dał sobie furtkę w postaci pakietu react-native-legacy-deep-imports, który pozwala opóźnić migrację do wersji 0.88, ale to tylko odroczenie problemu, nie jego rozwiązanie. Jeśli macie w projekcie choćby jedną bibliotekę trzecią, która robi głębokie importy, właśnie dostaliście dług techniczny do spłacenia w ciągu jednej wersji.

Metro, czyli bundler React Native, dostał aktualizację, która brzmi niepozornie, ale w praktyce ma znaczenie przy większych projektach: dwukrotnie szybsze generowanie source mapów i pięćdziesiąt procent niższe zużycie pamięci. To akurat ten typ zmiany, którego nikt nie zauważy w changelogu, dopóki nie zestawi czasu builda przed i po, a różnica w dużym monorepo potrafi być odczuwalna każdego dnia pracy.

Eksperymentalne wsparcie Swift Package Managera jako alternatywy dla CocoaPods to zmiana, na którą część zespołów iOS czekała od dawna. Komenda npx react-native spm wstrzykuje referencje do pakietów Swift bezpośrednio do istniejącego pliku .xcodeproj, nie zastępując go, więc podpisywanie kodu, capabilities i fazy budowania zostają nietknięte. Nie trzeba Rubiego, Bundlera ani CocoaPods. Brzmi ładnie, ale artykuł sam zaznacza, że to rozwiązanie eksperymentalne i niezalecane na produkcję, co jest uczciwe, choć jednocześnie trochę rozczarowujące, bo CocoaPods od lat jest źródłem frustracji w projektach React Native, a to wciąż nie jest moment, żeby się go pozbyć na dobre. Do tego dochodzi wsparcie Android Gradle Plugin 9 wraz z podniesieniem minimalnych wymagań toolchainu do Node.js 22, Kotlin 2.0 i compileSdk 34, czyli kolejna wersja, która wymusza aktualizację środowiska, zanim w ogóle zaczniecie migrować kod aplikacji.

**Key takeaways:**
- Strict TypeScript API jest teraz domyślne, blokuje głębokie importy do react-native/Libraries i zmienia niektóre nazwy typów referencji
- Pakiet react-native-legacy-deep-imports daje tymczasową furtkę tylko do wersji 0.88
- Metro generuje source mapy dwukrotnie szybciej i zużywa o połowę mniej pamięci
- Eksperymentalne wsparcie Swift Package Managera (npx react-native spm) działa obok istniejącego .xcodeproj bez naruszania podpisywania kodu
- Minimalne wymagania toolchainu rosną do Node.js 22, Kotlin 2.0+ i compileSdk 34

**Why do I care:** Strict TypeScript API to dobry kierunek, bo ręcznie utrzymywane definicje typów w projekcie tej wielkości zawsze prędzej czy później rozjeżdżają się z rzeczywistą implementacją. Ale każda migracja, która karze projekt za korzystanie z głębokich importów, w praktyce karze biblioteki trzecie, które te importy robiły, bo publiczne API nie dawało im tego, czego potrzebowały. Jeśli utrzymujecie zależność, która sięga do wnętrza React Native, macie teraz jasny sygnał, żeby to naprawić, zanim skończy się okres przejściowy.

**Link:** [Strict TypeScript API, Metro Update, Swift Package Manager, AGP 9 Support · React Native](https://daily.dev/posts/n4G0WM71v)

## Jak zespół zbudował dotykowy interfejs stresowej gry bez WebGL, opierając całość na Lottie

**TLDR:** Zespół z agencji Isadora zbudował gamifikowane doświadczenie do odreagowywania stresu wyłącznie na programowym API Lottie, zdarzeniach DOM i matematyce odległości, bez silnika fizyki ani WebGL. Wynik to precyzyjna, zaprojektowana klatka po klatce animacja, której fizyka by nie odtworzyła.

**Summary:** Uzasadnienie architektoniczne w tym artykule jest ciekawsze niż sama implementacja. Zespół świadomie zrezygnował z silnika fizyki, bo animatorzy stworzyli intencjonalny, precyzyjny co do klatki ruch, a silnik fizyki zastąpiłby go algorytmicznym przybliżeniem. To jest argument, który rzadko pada w dyskusjach o animacjach webowych, gdzie domyślnym odruchem jest sięgnięcie po fizykę, bo "wygląda naturalniej". Tutaj naturalność nie była celem, celem była kontrola nad każdą klatką, a to coś, czego żaden silnik fizyki oparty na symulacji nie da wam za darmo.

Techniczne rozwiązanie interakcji jest sprytne i dobrze opisane. Mapowanie promieniowe wejścia wykorzystuje twierdzenie Pitagorasa do stworzenia koncentrycznych stref punktacji: obliczacie środek elementu w jego własnym układzie współrzędnych, odejmujecie przesunięcie dokumentu od współrzędnych kliknięcia, żeby dostać pozycję lokalną, a potem Math.hypot daje wam odległość w linii prostej od środka. Odległość mniejsza niż dziesięć to bullseye, sto czterdzieści pięć i więcej to pudło, a wszystko pomiędzy mapuje się na kolejne progi punktowe. To daje czysty okrągły hitbox niezależnie od wizualnego kształtu elementu, co jest eleganckim rozwiązaniem problemu, który normalnie rozwiązuje się przez SVG albo canvas z ręcznym rysowaniem stref.

Kontrola segmentów animacji przez playSegments() to druga część układanki. Zatrzymujecie bieżący segment, wyłączacie loop, wywołujecie playSegments z zakresem klatek startowej i końcowej z flagą wymuszającą natychmiastowe przejście, a po zakończeniu w callbacku onComplete wracacie do pętli spoczynkowej. To jest wzorzec, który każdy, kto kiedykolwiek próbował zsynchronizować animację Lottie z akcją użytkownika, doceni, bo standardowa dokumentacja Lottie rzadko pokazuje, jak to zrobić porządnie bez migotania klatek.

Najbardziej praktyczna część to optymalizacje mobilne, bo tutaj widać, że projekt musiał realnie działać na słabszym sprzęcie, a nie tylko wyglądać dobrze na demo. Ustawienie setQuality na 0,5 zaraz po załadowaniu animacji przepoławia liczbę obliczeń interpolacji, zmniejszenie prędkości odtwarzania przez setSpeed ogranicza liczbę obliczanych klatek na sekundę, a ładowanie animacji sekwencyjnie parami zamiast wszystkich naraz rozkłada obciążenie w czasie. Do tego dochodzi niszczenie ciężkich jednorazowych animacji, jak eksplozje, zaraz po użyciu i odtwarzanie ich na żądanie, żeby pamięć w stanie spoczynku była niska. Konkretny przykład z dwudziestoma jeden postaciami na półce w obniżonej jakości kontra jedna grywalna postać w pełnej jakości pokazuje, że ktoś faktycznie mierzył zużycie pamięci, a nie zgadywał.

**Key takeaways:**
- Rezygnacja z silnika fizyki na rzecz Lottie pozwoliła zachować precyzyjny, zaprojektowany klatka po klatce ruch zamiast algorytmicznego przybliżenia
- Mapowanie promieniowe przez twierdzenie Pitagorasa i Math.hypot daje okrągłe strefy trafień niezależnie od kształtu elementu DOM
- playSegments() z flagą natychmiastowego przejścia i callbackiem onComplete pozwala precyzyjnie sterować segmentami animacji z poziomu interakcji użytkownika
- setQuality(0.5) i setSpeed() ograniczają obciążenie obliczeniowe przy wielu równoległych animacjach na mobile
- Sekwencyjne ładowanie w parach i niszczenie jednorazowych animacji po użyciu utrzymuje niską pamięć w stanie spoczynku

**Why do I care:** To dobry przykład artykułu, który nie idzie za modą na WebGL i silniki fizyki tylko dlatego, że są dostępne. Wybór narzędzia podyktowany wymaganiami projektowymi, a nie tym, co jest aktualnie popularne, to coś, czego brakuje w wielu wpisach o animacjach webowych. Jedyne, czego mi zabrakło, to bardziej konkretne liczby dotyczące realnego zużycia baterii na słabszych telefonach, bo optymalizacje pamięci to nie to samo co optymalizacja zużycia energii, a przy dwudziestu jeden równoległych animacjach to różnica, która może zaboleć.

**Link:** [Building Tactile UX: Honoring Intentional Design With Lottie](https://daily.dev/posts/YvOKqRlPs)
