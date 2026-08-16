---
title: "Astro 7.2, szybszy Next.js i prawdziwy koszt szkoleń z AI"
excerpt: "Przegląd pięciu tekstów z daily.dev: nowości w Astro i Next.js, wyniki ankiety State of CSS 2026, refleksja o code review w erze agentów AI oraz historia zwolnienia po ukończeniu szkolenia z AI."
publishedAt: "2026-08-07"
slug: "astro-72-nextjs-163-ai-treningi-podsumowanie"
hashtags: "#dailydev #astro #nextjs #css #codereview #aicareer #generated #pl"
source_pattern: "daily.dev"
---

## Astro 7.2

**TLDR:** Astro 7.2 wprowadza eksperymentalne przyrostowe budowanie stron statycznych, opcję całkowitego wyłączenia sesji w SSR oraz tryb działania w tle dla `astro preview`. Żadna z tych zmian nie jest rewolucyjna, ale razem realnie skracają czas builda i rozmiar bundla.

**Summary:** Największą nowością jest przyrostowe budowanie stron statycznych. Każda trasa może teraz zwrócić z `getStaticPaths()` własny klucz cache, a Astro dodatkowo liczy hash całego grafu modułów, czyli szablonu, layoutów, komponentów i zasobów. Strona jest ponownie renderowana tylko wtedy, gdy zmienił się albo hash grafu, albo klucz cache. Dla kolekcji treści zespół Astro poleca użycie `entry.digest` jako klucza, co w praktyce oznacza, że strona artykułu blogowego nie zostanie przebudowana, jeśli nie zmienił się sam wpis ani nic z jego zależności. Cache trafia domyślnie do `node_modules/.astro/`, więc nie trzeba nic konfigurować, żeby zacząć z tego korzystać.

Druga zmiana dotyczy sesji w projektach SSR. Ustawienie `session: false` w konfiguracji usuwa całą logikę sesji z bundla i sprawia, że adaptery Cloudflare, Netlify i Node nie podłączają domyślnego sterownika. `Astro.session` staje się `undefined`, co i tak było dozwolone przez typy, więc istniejące sprawdzenia w stylu `if (Astro.session)` dalej działają bez zmian w kodzie. Ciekawe jest to, że projekty bez skonfigurowanego sterownika i tak zyskują na tym automatycznie dzięki tree-shakingowi, nawet bez ustawiania tej flagi.

Trzecia zmiana jest bardziej kosmetyczna, ale przyjemna dla ludzi obsługujących deploye. `astro preview` dostaje ten sam tryb działania w tle, który wprowadzono dla `astro dev` w Astro 7, wraz z logowaniem do plików i komendami do zarządzania takim procesem. Do tego `logger.entrypoint` przyjmuje teraz zwykły relatywny string, a nie tylko obiekt URL, co jest drobiazgiem, ale mniej boilerplate'u to mniej boilerplate'u.

**Key takeaways:**
- Przyrostowe budowanie stron statycznych opiera się na parze: kluczu cache z `getStaticPaths()` i haszu całego grafu modułów.
- `session: false` usuwa runtime sesji z bundla SSR, a projekty bez sterownika zyskują automatycznie przez tree-shaking.
- `astro preview` może teraz działać w tle, podobnie jak `astro dev` od Astro 7.
- `logger.entrypoint` przyjmuje teraz zwykły string, nie tylko URL.

**Why do I care:** Przyrostowe budowanie to dokładnie ten typ optymalizacji, na który czekałem w każdym większym projekcie z Astro, bo rebuild całego contentowego serwisu przy jednej zmianie w jednym MDX-ie zawsze wydawał się absurdalny. Podoba mi się też, że zespół Astro nie idzie w stronę dodawania kolejnej abstrakcji, tylko rozwiązuje realny problem wydajności builda przy zachowaniu prostego modelu mentalnego. Flaga `session: false` to z kolei dobry przykład tego, jak framework powinien się zachowywać: dawać kontrolę nad tym, co trafia do bundla, bez zmuszania mnie do przepisywania kodu.

**Link:** [Astro 7.2](https://daily.dev/posts/RYlSV9nOk)

## Wąskim gardłem nie jest już pisanie kodu. Jest nim jego rozumienie.

**TLDR:** Autor argumentuje, że wraz z agentami generującymi kod w ogromnym tempie, prawdziwym wąskim gardłem stało się zrozumienie tego kodu i wzięcie za niego odpowiedzialności. Recenzowanie kodu napisanego przez AI jest trudniejsze niż recenzowanie kodu ludzkiego, bo kontekst trzeba budować od zera, a nie odtwarzać z pamięci autora.

**Summary:** Punkt wyjścia jest prosty: jeśli kod można wygenerować w kilka sekund, to generowanie już nie jest ograniczeniem. Ograniczeniem jest to, czy ktokolwiek w zespole rozumie, co ten kod robi, dlaczego robi to w ten sposób i co się stanie, gdy coś pójdzie nie tak na produkcji. Autor zwraca uwagę, że przegląd kodu wygenerowanego przez agenta jest trudniejszy niż przegląd kodu kolegi z zespołu, bo w drugim przypadku często mamy już jakiś kontekst z rozmów, standupów czy wcześniejszych PR-ów, a w pierwszym trzeba ten kontekst zbudować od zera, czytając sam kod.

Z tego wynika główna teza tekstu: zasady w stylu Domain-Driven Design czy Clean Architecture nie tracą na znaczeniu, tylko zmienia się ich adresat. Wcześniej pisało się czytelny kod dla następnego programisty, teraz pisze się go dla programisty, który musi zweryfikować coś, czego sam nie napisał, ale za co bierze odpowiedzialność, gdy trafi na produkcję. Czytelność, dobre nazewnictwo i jasne granice modułów przestają być kwestią stylu, a stają się warunkiem tego, że przegląd kodu w ogóle jest możliwy w rozsądnym czasie.

Autor rozdziela też wprost dwa światy: szybkie prototypy tworzone metodą vibe coding i systemy produkcyjne, na których zależy biznes. Nie każdy fragment kodu wymaga tego samego poziomu rygoru, ale problem zaczyna się, gdy zespoły przenoszą podejście z prototypu na produkcję, bo pomijanie code review przy dużej skali generowanego kodu prowadzi do awarii i długofalowego spowolnienia zespołu, nie do przyspieszenia.

**Key takeaways:**
- Generowanie kodu przestało być ograniczeniem, teraz ograniczeniem jest jego zrozumienie i wzięcie za niego odpowiedzialności.
- Przegląd kodu AI wymaga budowania kontekstu od zera, więc czytelność i dobre nazewnictwo są ważniejsze niż wcześniej.
- DDD i Clean Architecture wciąż mają sens, tyle że jako narzędzia dla ludzi weryfikujących kod, nie dla maszyny go piszącej.
- Pomijanie code review przy kodzie generowanym masowo prowadzi do awarii i spowolnienia zespołu w dłuższej perspektywie.

**Why do I care:** To jest jeden z niewielu tekstów o AI w kodzie, który nie próbuje mnie przekonać, że code review jest już przeżytkiem. Sam zauważam, że przegląd PR-a z kodem od agenta zajmuje mi więcej czasu niż przegląd PR-a od juniora, bo u juniora chociaż wiem, jakim tropem myślowym doszedł do rozwiązania, a u agenta muszę to odtworzyć wyłącznie z samego kodu. Zgadzam się z tezą, że architektura i czytelność nie są kosmetyką dla estetów, tylko realnym mechanizmem obronnym zespołu, i mam wrażenie, że zespoły, które to zignorują, zapłacą za to w postaci przewlekłych, trudnych do zdiagnozowania awarii.

**Link:** [The bottleneck isn't writing code anymore. It's understanding it.](https://daily.dev/posts/OqEfvQhF8)

## App Router w Next.js 16.3 wreszcie działa szybko

**TLDR:** Next.js 16.3 przynosi domyślne przyspieszenia bez zmian w kodzie, między innymi znacznie niższe zużycie pamięci przez Turbopack i szybsze powtórne buildy, a do tego opcjonalne Instant Navigations, które wprowadzają cache po stronie klienta do App Routera.

**Summary:** Część zmian w tej wersji działa od razu, bez żadnej konfiguracji. Turbopack dostał mechanizm eksmisji z pamięci, który ma zmniejszyć zużycie RAM przez dev server nawet o 90 procent, co przy większych monorepo bywało realnym problemem. Do tego pojawia się cache systemu plików w Turbopacku, przyspieszający powtórne buildy nawet 5,5-krotnie, natywne strumienie Node.js podnoszące throughput SSR o 22 procent oraz wsparcie dla TypeScript 7, które ma dawać dziesięciokrotnie szybsze sprawdzanie typów.

Główną, opcjonalną nowością są Instant Navigations, włączane dwiema flagami konfiguracyjnymi. Mechanizm ten wprowadza do App Routera cache po stronie klienta oparty na dyrektywie `'use cache'` oraz częściowe prefetchowanie, dzięki czemu nawigacja między stronami ma odczucie natychmiastowej, zamiast czekania na kolejny round-trip do serwera. To odpowiedź na jedną z najczęstszych krytyk App Routera od jego premiery, czyli wrażenie, że nawigacja jest wolniejsza niż w starym Pages Routerze.

Poza tym w tej wersji pojawiają się nowe API: `root-params`, dające dostęp do parametrów layoutu bez przekazywania ich przez propsy w dół drzewa komponentów, `catchError` do obsługi odzyskiwalnych błędów po stronie serwera, oraz importy typu glob w Turbopacku. Eksperymentalnie dostępny jest też oparty na Rust React Compiler oraz tryb odporności na problemy sieciowe. Zespół Next.js podkreśla, że wydanie nie zawiera żadnych breaking changes i zaleca aktualizację wszystkim projektom od razu.

**Key takeaways:**
- Turbopack zyskuje eksmisję z pamięci, redukując zużycie RAM przez dev server nawet o 90 procent.
- Instant Navigations wprowadzają cache po stronie klienta w App Routerze przez dyrektywę `'use cache'` i częściowy prefetching.
- Nowe API to `root-params`, `catchError` oraz importy glob w Turbopacku.
- Wydanie nie ma breaking changes, więc aktualizacja jest bezpieczna dla większości projektów.

**Why do I care:** App Router od premiery ciągnął za sobą reputację frameworka, w którym nawigacja jest odczuwalnie wolniejsza niż w Pages Routerze, i miałem wrażenie, że ta krytyka była w dużej mierze uzasadniona. Instant Navigations wygląda na pierwszą poważną odpowiedź na ten problem, a nie kolejną łatkę na łatce. Redukcja zużycia pamięci przez Turbopack o 90 procent też nie jest liczbą do zignorowania, bo w większych projektach dev server pożerający kilkanaście gigabajtów RAM to codzienność, z którą walczy niejeden zespół frontendowy. Brak breaking changes w tak dużej aktualizacji to dodatkowy plus, bo pozwala aktualizować bez tygodni testów regresyjnych.

**Link:** [The App Router finally feels fast in Next.js 16.3](https://daily.dev/posts/y9Z1uEekK)

## State of CSS 2026 i State of Devs 2026

**TLDR:** Ankieta State of CSS 2026 pokazuje, że kod CSS generowany przez AI wciąż jest używany rzadko, zadowolenie z CSS trzyma się na poziomie 4 na 5 od lat, a anchor positioning i `:has()` to zdecydowani liderzy wśród nowych funkcji. Równolegle otwarto ankietę State of Devs 2026, poświęconą karierze, zdrowiu i życiu poza kodem.

**Summary:** Najciekawszy wynik dotyczy stosunku deweloperów do AI w kontekście CSS. Wśród ponad trzech tysięcy respondentów większość zadeklarowała, że korzysta z kodu generowanego przez AI w mniej niż połowie przypadków, a tylko 721 osób robi to częściej niż w połowie sytuacji. Autorzy ankiety zaznaczają, że wynik może być przesunięty w stronę osób, które i tak piszą CSS ręcznie częściej niż przeciętny developer, bo to właśnie taka grupa chętniej wypełnia ankiety branżowe.

Zadowolenie z CSS jako technologii utrzymuje się na bardzo stabilnym poziomie 4 na 5, identycznym jak rok wcześniej, o 0,1 niższym niż w 2024 i o 0,2 wyższym niż w najstarszym pomiarze z 2020 roku. Ta stabilność jest sama w sobie ciekawa, bo sugeruje, że ostatnia fala nowych funkcji CSS, w tym container queries, `:has()` czy anchor positioning, jest odbierana jako coś ekscytującego, a nie przytłaczającego natłoku nowości do nauczenia.

Wśród konkretnych funkcji, anchor positioning i selektor `:has()` zebrały najwięcej głosów jako ulubione nowości, przy czym `:has()` jest też najczęściej faktycznie używaną funkcją w praktyce. Anchor positioning chwalone jest za to, że pozwala pozycjonować tooltipy i podobne elementy bez ani jednej linijki JavaScriptu. Warto dodać, że gdyby wyniki dla różnych poziomów CSS Color Level 4 zliczyć razem jako jedną kategorię, mogłyby wyprzedzić wszystko inne na liście. W tle ankieta odnotowuje też, że różnorodność płciowa i etniczna w społeczności CSS wciąż pozostaje problemem, a CSS-Tricks zajmuje trzecie miejsce wśród zasobów o platformie webowej, za MDN i Can I Use.

**Key takeaways:**
- Większość deweloperów korzysta z CSS generowanego przez AI w mniej niż 50 procentach przypadków.
- Zadowolenie z CSS trzyma się na poziomie 4 na 5 od kilku lat, co świadczy o stabilnym, pozytywnym odbiorze zmian w języku.
- Anchor positioning i `:has()` są zdecydowanymi liderami wśród ulubionych i najczęściej używanych nowych funkcji CSS.
- Otwarto nową ankietę State of Devs 2026, dotyczącą kariery, zdrowia i życia poza pracą, nie technologii.

**Why do I care:** Cieszy mnie, że anchor positioning i `:has()` wygrywają w tej ankiecie, bo to dwie funkcje, które realnie zmieniły mój sposób pisania CSS w ostatnim roku, głównie przez to, że eliminują całe kategorie hacków opartych na JavaScripcie. Niski poziom użycia AI do generowania CSS też mnie nie zaskakuje: CSS jest dziedziną, w której precyzja i znajomość specyfiki przeglądarek wciąż biją szybkość generowania, a modele językowe nierzadko proponują rozwiązania, które wyglądają dobrze w izolacji, ale rozjeżdżają się przy realnym responsywnym layoucie. To dobre przypomnienie, że nie każda część frontendu jest jednakowo podatna na automatyzację przez AI.

**Link:** [2026 State of CSS, Devs Surveys](https://daily.dev/posts/SQwXV0vB3)

## Skończyli szkolenie z AI. Jedenaście dni później nie mieli już pracy.

**TLDR:** Tekst opisuje złożoną z wielu prawdziwych rozmów historię specjalistów baz danych zwolnionych krótko po zakończeniu firmowego szkolenia z AI, w tym osobę z 14-letnim stażem, ocenianą jako "kluczową dla ciągłości działania firmy", zwolnioną 11 dni po ukończeniu 200-godzinnego planu przekwalifikowania. Autor dowodzi, że to nie AI zabrało tę pracę, tylko decyzja o redukcji kosztów, a "transformacja AI" była tylko słownictwem, które miało to ładniej nazwać.

**Summary:** Historia jest zbudowana wokół siedmiu sygnałów ostrzegawczych, które osobno miały zawsze jakieś rozsądne wyjaśnienie: zamrożenie rekrutacji tłumaczone dyscypliną finansową, reorganizacja pod nowym wiceprezesem, z którym nikt się nawet nie spotkał, prośba o udokumentowanie wszystkich systemów w ramach "odporności operacyjnej", kuluarowe pytanie o to, jak szybko ktoś inny mógłby przejąć czyjąś pracę, kurczące się i odwoływane spotkania jeden na jeden, konsultanci oceniający procesy, i wreszcie samo szkolenie z AI. Każdy z tych sygnałów z osobna dało się wyjaśnić normalnym funkcjonowaniem firmy, dopiero razem, z perspektywy czasu, układały się w jasny wzór.

Centralna teza tekstu jest brutalnie prosta: to nie sztuczna inteligencja zabrała tę pracę, zabrało ją cięcie kosztów, a "transformacja AI" była po prostu słownictwem, które pozwoliło to nazwać postępem, a nie zwykłą redukcją etatów. Autor, Pinal Dave, nie stawia się poza tym mechanizmem, tylko sam przyznaje, że bywał tym konsultantem, który przychodził do firmy i zbierał wiedzę od ludzi, którzy niedługo później stracili pracę. To rzadka szczerość w tekście, który równie łatwo mógłby zostać czystym moralizowaniem.

Z tej historii wynika kilka praktycznych wniosków, które autor formułuje jako coś, co "powiedziałby sobie z przeszłości". Zapisywanie prywatnych kontaktów do kolegów z zespołu, zanim zostaną potrzebne, bo po zwolnieniu dostęp do firmowego Slacka czy maila znika z dnia na dzień. Rozumienie, co właściwie sygnalizuje prośba o dokumentację, bo dokumentacja bywa przygotowaniem do przekazania czyjejś wiedzy dalej. Traktowanie szkolenia finansowanego przez firmę jako własnej, osobistej wartości, nie jako dowodu, że firma planuje kogoś zatrzymać. I trzymanie przynajmniej jednej umiejętności całkowicie poza systemami firmowymi, żeby nie być zależnym wyłącznie od dostępu, który w każdej chwili można odebrać.

**Key takeaways:**
- Siedem drobnych, osobno niepodejrzanych sygnałów złożyło się w retrospektywie w jasny wzór prowadzący do zwolnienia.
- Firmowe szkolenie z AI nie jest dowodem na to, że firma planuje kogoś zatrzymać, bo kosztuje relatywnie mało i może być inicjowane przez zupełnie inny zespół niż ten decydujący o redukcjach.
- Autor stawia tezę, że winne jest cięcie kosztów, a "transformacja AI" jest tylko słownictwem maskującym redukcję etatów.
- Praktyczne wnioski: zbieraj prywatne kontakty do kolegów wcześniej, traktuj szkolenie jako swoją własność, trzymaj przynajmniej jedną umiejętność poza systemami firmy.

**Why do I care:** Ten tekst trafia w coś, o czym większość z nas wolałaby nie myśleć, czyli w to, że dokumentowanie własnej wiedzy i uczestnictwo w szkoleniach może być jednocześnie dobre dla naszego rozwoju i wygodne dla firmy planującej się nas pozbyć. Nie jestem zwolennikiem paranoi wobec każdej prośby o dokumentację, bo dobra dokumentacja broni też nas samych, ale zgadzam się z główną tezą: szkolenie z AI samo w sobie nie jest żadną gwarancją zatrudnienia, a traktowanie go jako takiej jest naiwne. Rada, żeby trzymać przynajmniej jedną umiejętność poza systemami firmowymi, jest moim zdaniem najbardziej uniwersalna z całego tekstu, niezależnie od tego, czy pracujemy z bazami danych, frontendem czy czymkolwiek innym.

**Link:** [They Finished the AI Training. Eleven Days Later, the Job Was Gone](https://daily.dev/posts/5111PsN0g)
