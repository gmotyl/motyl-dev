---
title: "React Compiler robi za darmo to, po co sięgaliśmy po useContextSelector, a kompilator Rusta przyspieszył o 4,57% w dwa miesiące"
excerpt: "Z Bytes #527: benchmark pokazujący, że React Compiler radzi sobie z 5000 rerenderującymi się radiobuttonami równie dobrze jak ręczny useSyncExternalStore, seria raportów o przyspieszaniu kompilatora Rusta, SvelteKit 3.0, nowy generator kodu Erlang w Gleam i esej o dostępności w internecie coraz bardziej zdominowanym przez boty."
publishedAt: "2026-10-07"
slug: "bytes527-react-compiler-context-rust-compiler-sveltekit3-gleam"
hashtags: "#uidev #react #react-compiler #rust #svelte #accessibility #gleam #generated #pl"
source_pattern: "ui.dev"
---

## React Compiler robi to, po co ludzie chcieli useContextSelector

**TLDR:** Autor buduje benchmark z 5000 radiobuttonami w jednym kontekście Reacta i porównuje trzy podejścia do wydajności: zewnętrzny store przez `useSyncExternalStore`, kontekst z memoizowanym komponentem podrzędnym, i zwykły kontekst skompilowany przez React Compiler. Wszystkie trzy lądują w praktycznie tym samym czasie kliknięcia, mimo że kompilator nie robi nic poza tym, co community od lat robiło ręcznie.

**Summary:** Punktem wyjścia jest znany ból: React nie ma `useContextSelector`, więc zmiana jednej wartości w kontekście rerenderuje wszystkich konsumentów, nawet jeśli interesuje ich tylko mały wycinek stanu. Autor buduje grupę radiobuttonów trzymającą zaznaczoną wartość w kontekście, gdzie kliknięcie jednego przycisku powoduje rerender wszystkich 5000 elementów. React miał kiedyś mechanizm `calculateChangedBits` pozwalający kontrolować, którzy konsumenci się odświeżają, ale usunięto go w PR #20953, a RFC na selektory kontekstu z 2019 roku nigdy nie doczekało się oficjalnej implementacji.

Zamiast tego autor testuje trzy podejścia na tym samym demie, mierząc p95 czasu montowania i kliknięcia na MacBooku Pro M3 Pro, w trybie produkcyjnym, z i bez czterokrotnego spowolnienia CPU w DevTools. Store oparty na `useSyncExternalStore` (wzorowany na wewnętrznym store Base UI) renderuje tylko dwóch konsumentów przy jednym kliknięciu i osiąga 19,2 ms. Kontekst z zewnętrznym komponentem memoizowanym przez `React.memo`, gdzie zewnętrzny odczyt konteksu zostaje, ale wewnętrzny widok renderuje się tylko przy zmianie propsów, osiąga niemal identyczne 18,9 ms, mimo że technicznie renderuje się tam wszystkich 5000 komponentów zewnętrznych. Trzecia wersja, zwykły kontekst bez żadnego ręcznego memoizowania, przepuszczony przez React Compiler, wychodzi najszybsza: 18,4 ms, bo kompilator sam ponownie wykorzystuje JSX i wartości pośrednie tam, gdzie wejścia się nie zmieniły.

Wniosek, do którego dochodzi autor, cytując odpowiedź Josepha Savony z zespołu Reacta na RFC selektorów kontekstu, jest taki, że kompilator już teraz osiąga większość tego, czego ludzie oczekiwali od selektorów, tylko robi to w trakcie renderu konsumenta, zamiast w osobnym komponencie. Liczba rerenderów przestaje być dobrą metryką, skoro prawie żaden z 5000 "zrenderowanych" komponentów nie ma w praktyce nic do zrobienia. Artykuł kończy się praktycznym wnioskiem dla osób jeszcze bez kompilatora: wzorzec `React.memo` z wydzielonym widokiem działa bez build stepu, autor pokazuje nawet małą abstrakcję `withContextSelector` opakowującą ten wzorzec, choć zaznacza, że to fabryka komponentów, której lintery Reacta raczej nie polecają na stałe.

**Key takeaways:**
- React nigdy nie dostał oficjalnego `useContextSelector`, bo usunięto mechanizm `calculateChangedBits` w PR #20953
- Store z `useSyncExternalStore`, kontekst z memoizowanym widokiem i zwykły kontekst pod React Compiler dają niemal identyczny czas kliknięcia na 5000 elementach
- React Compiler reużywa JSX i wartości pośrednie podczas renderu konsumenta, osiągając efekt zbliżony do fine-grained updates bez osobnego API
- Liczenie rerenderów jako metryka wydajności traci sens, gdy prawie żaden z "zrenderowanych" komponentów nie wykonuje realnej pracy

**Why do I care:** Jeśli twój zespół wciąż odkłada migrację na React Compiler, bo "nie ma w tym nic rewolucyjnego", ten benchmark pokazuje konkretny, policzalny powód, żeby to zrobić: znika potrzeba ręcznego dzielenia komponentów na zewnętrzny-odczytujący i wewnętrzny-memoizowany tylko po to, żeby kontekst nie bolał na większej skali. To mniej kodu do utrzymania bez utraty wydajności, co w praktyce oznacza mniej miejsc do popełnienia błędu przy review.

**Link:** [Making React Context Cheap with React Compiler](https://jjenzz.com/making-react-context-cheap/)

## Kompilator Rusta przyspieszył o 4,57% w dwa miesiące, a to i tak "morze zieleni"

**TLDR:** Comiesięczny raport o wydajności kompilatora Rusta podsumowuje okres od końca lipca do końca września 2026: średni spadek czasu kompilacji o 4,57%, 555 z 629 zmierzonych benchmarków poprawionych, nowy borrow checker i trait solver trafiające na Nightly, oraz seria drobnych, ale mierzalnych usprawnień w analizie danych i generowaniu kodu.

**Summary:** Autor zestawia tu serię konkretnych usprawnień zamiast jednej dużej zmiany. Nowy renderer dokumentacji rustdoc dostał ogromne przyspieszenie opisane w osobnym poście, Clippy zyskał PGO (profile-guided optimization) dające do 18% poprawy czasu w najlepszym przypadku, a aktualizacja LLVM do wersji 23 dała średnio 1,2% redukcji czasu w całym kompilatorze, co przy pojedynczym PR-ze jest wynikiem robiącym wrażenie. Nowy borrow checker, Polonius Alpha, trafił na Nightly i jest bardziej precyzyjny niż stary, akceptując programy, które wcześniej były odrzucane, kosztem nieco wyższego zużycia czasu w mniejszości przypadków, w tym w popularnym crate serde, gdzie seria poprawek od Jacka Hueya zredukowała liczbę instrukcji o 3-5%.

Równolegle na Nightly wylądował nowy trait solver, autor żartobliwie nazwany w poście "Penelope Hammertime" (w rzeczywistości nosi nazwę Pineapple Häagen-Dazs, co redakcja wyjaśnia dopiero w przypisie), który w mniejszości przypadków też bywa wolniejszy niż stary, ale seria PR-ów autora artykułu zredukowała czasy kompilacji niektórych crate'ów o 50%, 25% czy 15%. Nowy kontrybutor o pseudonimie xmakro kontynuuje serię dobrych usprawnień, optymalizując obsługę specializacji, ładowanie danych kompilacji przyrostowej i unikanie alokacji w gorącej ścieżce przetwarzania obligacji, z redukcjami liczby instrukcji sięgającymi 6%.

Najciekawszy pojedynczy wynik dotyczy crate'a cranelift-codegen, który ma jedną ogromną funkcję z ponad 18 tysiącami bloków bazowych. Zmiana algorytmu przechodzenia grafu przepływu sterowania (CFG) zredukowała liczbę wywołań potrzebnych do osiągnięcia punktu stałego w analizie z 1,5 miliona do 90 tysięcy, co dało około 30% redukcji czasu kompilacji tego konkretnego crate'a. Autor wspomina też o użyciu LLM-ów jako wsparcia analitycznego przy części z tych PR-ów, zastrzegając, że cały kod i tekst wciąż pisze sam, bo tak wymaga polityka projektu.

**Key takeaways:**
- Średni spadek czasu kompilacji Rusta o 4,57% w okresie od końca lipca do końca września 2026, 555 z 629 benchmarków poprawionych
- Nowy borrow checker Polonius Alpha i nowy trait solver trafiły na Nightly, oba bywają wolniejsze w mniejszości przypadków, ale ogólny bilans jest wyraźnie dodatni
- Zmiana algorytmu przechodzenia grafu przepływu sterowania dała około 30% redukcji czasu kompilacji dla crate'a z jedną funkcją o ponad 18 000 bloków bazowych
- Autor korzystał z LLM-ów jako wsparcia analitycznego, ale cały kod i tekst napisał sam, zgodnie z polityką projektu

**Why do I care:** Dla każdego, kto narzeka na czas kompilacji w większym projekcie Rustowym, to przypomnienie, że ten ból jest aktywnie i systematycznie adresowany, a nie ignorowany, oraz że warto regularnie aktualizować toolchain, bo większość tych usprawnień trafia użytkownikom "za darmo" wraz z nową wersją kompilatora, bez żadnej zmiany w kodzie projektu.

**Link:** [How to speed up the Rust compiler in September 2026](https://nnethercote.github.io/2026/09/30/how-to-speed-up-the-rust-compiler-in-september-2026.html)

## SvelteKit 3.0: mniej configu, remote functions tuż za rogiem

**TLDR:** SvelteKit 3.0 trafia do użytkowników z migracją config z `svelte.config.js` do `vite.config.ts`, aliasem `#lib` zamiast `$lib`, prostszymi service workerami i lepszą obsługą błędów. Flagowa funkcja, remote functions do bezpiecznej, typowanej komunikacji klient-serwer, jest wciąż eksperymentalna i wymaga Async Svelte.

**Summary:** Zespół Svelte opisuje wersję 3.0 jako "ten sam framework, trochę więcej polish, trochę więcej bezpieczeństwa typów, trochę mniej śmieci", podkreślając, że migracja z wcześniejszych wersji powinna być w większości automatyczna dzięki komendzie `sv migrate sveltekit-3 --tasks all --confirm`, która przepisuje kod i generuje listę TODO dla reszty. Najbardziej zauważalna zmiana to przeniesienie konfiguracji z dedykowanego `svelte.config.js` do `vite.config.ts`, co ujednolica config z resztą ekosystemu opartego na Vite, oraz zmiana aliasu `$lib` na standardowy subpath import `#lib`.

Remote functions, zapowiadane jako zestaw narzędzi do bezpiecznej, wydajnej i typowanej komunikacji klient-serwer, nie są jeszcze gotowe w pełni, mimo że zespół deklaruje je jako swój najwyższy priorytet. Wymagają włączenia eksperymentalnej flagi Async Svelte, więc na razie są bardziej zapowiedzią kierunku niż gotową do produkcji funkcją. Zespół zapowiada też Svelte Summit w Lublanie w listopadzie, połączony z dziesiątymi urodzinami frameworka.

**Key takeaways:**
- Migracja do SvelteKit 3.0 jest w dużej mierze zautomatyzowana komendą `sv migrate sveltekit-3`
- Konfiguracja przenosi się z `svelte.config.js` do `vite.config.ts`, alias `$lib` zmienia się na `#lib`
- Remote functions do typowanej komunikacji klient-serwer wciąż wymagają eksperymentalnej flagi Async Svelte
- Svelte Summit w Lublanie w listopadzie połączy się z obchodami dziesiątych urodzin frameworka

**Why do I care:** Dla zespołów na Svelcie to sygnał, że warto zaplanować migrację wcześniej niż później, skoro narzędzie do automatycznego przepisania kodu już istnieje, ale jeszcze nie warto budować architektury wokół remote functions, dopóki nie wyjdą z flagi eksperymentalnej.

**Link:** [SvelteKit 3 is here](https://svelte.dev/blog/sveltekit-3-is-here)

## Dostępność staje się priorytetem, bo boty też jej potrzebują

**TLDR:** Osobisty esej zauważa, że dostępność coraz częściej jest traktowana poważnie nie dlatego, że firmy zaczęły dbać o ludzi z niepełnosprawnościami, tylko dlatego, że agenci AI też potrzebują stron zbudowanych zgodnie z otwartymi standardami, żeby móc po nich poruszać się tak samo jak człowiek. Cloudflare raportuje, że ponad połowa ruchu w internecie pochodzi dziś od botów.

**Summary:** Autorka, pracująca w GitHubie, gdzie dostępność jest traktowana poważnie, zauważa, że branża jako całość historycznie nie poświęcała jej aż tyle uwagi, mimo że deweloperzy regularnie pytają, jak przekonać szefostwo, żeby w ogóle zajęło się tym tematem. Teraz coś się zmienia, ale z dwóch powodów, z czego tylko jeden jest tym "dobrym". Pierwszy to narzędzia AI, które realnie ułatwiają wdrażanie poprawnych, zgodnych z WCAG wzorców szybciej niż kiedykolwiek. Drugi, bardziej nieoczywisty, to fakt, że jeśli strona jest niedostępna dla człowieka, może być równie niedostępna dla agenta próbującego ją obsłużyć, a to zaczyna realnie wpływać na biznes.

Esej wpisuje ten fakt w szerszy kontekst zmieniającego się modelu internetu. Dotychczasowy model opierał się na tym, że "darmowa" treść jest opłacana uwagą użytkownika, co napędzało reklamy, clickbaitowe tytuły, twórców schodzących w ragebait i artykuły kulinarne z akapitami historii przed samym przepisem. Ten model działa tylko wtedy, gdy odwiedzającym jest człowiek. Dane Cloudflare pokazują, że ponad połowa ruchu w internecie pochodzi już z botów, które nie klikają w reklamy, rzadko podejmują decyzje zakupowe i nie spędzają na stronie więcej czasu niż muszą.

Autorka deklaruje się jako optymistka: jeśli internet zdominowany przez boty oznacza bardziej uproszczone aplikacje, lepsze otwarte standardy i dostępność jako domyślny stan rzeczy, to ludzie zyskują lepsze doświadczenia zamiast tych projektowanych pod przechwytywanie uwagi. Kończy żartem, że alternatywą jest po prostu pójście dotknąć trawy, ale ton całego tekstu sugeruje, że traktuje tę scenerię na poważnie, jako realny, choć dziwny sposób, w jaki dostępność w końcu dostaje należne jej miejsce.

**Key takeaways:**
- Ponad połowa ruchu w internecie pochodzi dziś od automatycznych botów, według danych Cloudflare
- Strony niedostępne dla ludzi bywają równie niedostępne dla agentów AI próbujących z nich korzystać, co zaczyna mieć konsekwencje biznesowe
- Narzędzia AI realnie przyspieszają wdrażanie zgodnych z WCAG wzorców w kodzie
- Model internetu finansowanego uwagą użytkownika zakłada, że odwiedzający jest człowiekiem, co przestaje być prawdą

**Why do I care:** To dobry argument do rozmowy z product ownerem, który od lat odkłada pracę nad dostępnością jako "nice to have": skoro agenci AI reprezentujący waszych użytkowników też muszą umieć nawigować po stronie, dostępność przestaje być kwestią wyłącznie etyczną czy prawną, a staje się warunkiem działania produktu w świecie, gdzie znacząca część ruchu nie pochodzi od człowieka siedzącego przed ekranem.

**Link:** [Accessibility and the new model of the internet](https://cassidoo.co/post/accessibility-and-the-internet/)

## Gleam przestaje generować kod źródłowy Erlanga

**TLDR:** Gleam 1.19.0 wprowadza przepisany generator kodu dla Erlanga, który zamiast tekstu źródłowego produkuje bezpośrednio "abstract forms", binarną reprezentację pośrednią kompilatora Erlanga. Efekt to szybsza kompilacja, dokładniejsze numery linii w stack traceach oraz szereg mniejszych usprawnień dla kompilacji do JavaScriptu i komunikatów błędów.

**Summary:** Dotychczas kompilator Gleam generował zwykły tekst źródłowy Erlanga, który następnie przechodził przez tokenizer i parser kompilatora Erlanga, zanim trafił do faktycznej kompilacji. Nowy generator, autorstwa Giacoma Cavalieriego, pomija tę front-endową część i produkuje od razu "Erlang abstract forms", metadanymi opisane drzewo składniowe, zakodowane w binarnym formacie zewnętrznym Erlanga, które można załadować bezpośrednio. Benchmark oparty na projekcie langcompilebench Joségo Valima pokazuje wyraźną poprawę czasu pełnej kompilacji od zera między wersją 1.17 a 1.19, choć autor zastrzega, że to kompilacja bez cache'owania, a typowy development korzysta z kompilacji przyrostowej i będzie jeszcze szybszy.

Dodatkową korzyścią jest dokładność metadanych lokalizacji: numery linii w crash reportach i stack traceach na BEAM-ie teraz wskazują dokładnie na oryginalny kod Gleam, zamiast na wygenerowany kod Erlanga, gdzie wcześniej mogły wskazywać jedynie na najbliższą funkcję. To otwiera też drogę do pełnego wsparcia Gleam w debuggerach takich jak edb, choć zespół zaznacza, że sam tej pracy jeszcze nie wykonał. Autor żartuje przy okazji, że teraz nikt już nie będzie mógł używać słowa "transpiler" jako obelgi wobec kompilatora Gleam, skoro front-end Erlanga i tak jest teraz pomijany.

Przy okazji dostało się też kompilacji do JavaScriptu: dopasowywanie wzorców (pattern matching) generuje teraz płaskie warunki zamiast zagnieżdżonych `if`-ów, krótkie literały list kompilują się do bezpośrednich wywołań `prepend()` zamiast konwersji z tablicy JavaScript, a deklaracje TypeScript dla funkcji sprawdzających warianty typu zachowują teraz parametr generyczny zamiast zawężać go do `unknown`. Dorzucono też lepsze komunikaty błędów, między innymi dla pozostawionych znaczników konfliktu mergowania w kodzie oraz nieprawidłowej kolejności argumentów w składni aktualizacji rekordu.

**Key takeaways:**
- Nowy generator kodu dla Erlanga produkuje bezpośrednio binarne "abstract forms" zamiast tekstu źródłowego, przyspieszając kompilację
- Numery linii w crash reportach i stack traceach na BEAM-ie są teraz dokładne względem oryginalnego kodu Gleam
- Kompilacja do JavaScriptu generuje płaskie warunki zamiast zagnieżdżonych `if`-ów przy dopasowywaniu wzorców
- Deklaracje TypeScript dla funkcji sprawdzających warianty typu zachowują teraz informację o typie generycznym

**Why do I care:** Dla zespołów rozważających Gleam jako alternatywę dla Elixira czy Erlanga na BEAM-ie to konkretny argument praktyczny: szybsza kompilacja i dokładne stack trace'y bezpośrednio wpływają na codzienną pętlę feedbacku, a nie są tylko kosmetyczną zmianą pod maską.

**Link:** [Gleam doesn't compile to Erlang source anymore](https://gleam.run/news/gleam-doesnt-compile-to-erlang-source-anymore/)
