---
title: "daily.dev: React 19.3 bez Framer Motion, dlaczego LLM-y oblewają quiz z HTML-em, agent OpenMuse i triggery plikowe w Neon"
excerpt: "Pięć nowości w React 19.3 do animacji bez zewnętrznych bibliotek, eksperyment pokazujący, że modele językowe wciąż gubią się w prostych pytaniach o standardy webowe, open-source'owy agent osobisty OpenMuse oraz nowy trigger w Neon, który odpala kod przy wgraniu pliku."
publishedAt: "2026-09-23"
slug: "dailydev-react-19-3-llm-html-quiz-openmuse-neon-triggery"
hashtags: "#dailydev #react #webdev #llm #postgresql #architecture #generated #pl"
source_pattern: "daily.dev"
---

## React 19.3: animacje wbudowane we frameworku, bez Framer Motion

**TLDR:** React 19.3, wydany rok po 19.2, dokłada pięć funkcji związanych głównie z animacjami: wbudowane przejścia wejścia i wyjścia przez View Transition, API `addTransitionType` do animacji kierunkowych w karuzelach, połączenie Suspense z View Transition, referencje na fragmentach oraz API do odczytu strefy czasowej urządzenia poza SSR.

**Summary:** Materiał wideo, na którym opiera się ten wpis, przechodzi przez wszystkie pięć funkcji po kolei, zaczynając od najbardziej praktycznej: wbudowanych animacji wejścia i wyjścia elementów opartych na View Transition. Do tej pory ten efekt wymagał w praktyce Framer Motion albo ręcznego żonglowania klasami CSS przy odmontowywaniu komponentów, teraz React robi to natywnie.

Drugą nowością jest `addTransitionType`, API pozwalające nadać animacji kierunek, na przykład żeby karuzela wiedziała, czy przejście ma iść w lewo czy w prawo, zamiast zawsze animować w tę samą stronę niezależnie od kontekstu. Trzecia funkcja łączy Suspense z View Transition, więc stan ładowania może się animować tak samo płynnie jak pojawienie się gotowej treści, zamiast twardo przeskakiwać ze spinnera do wyniku.

Fragment refs to zmiana bardziej strukturalna niż wizualna: pozwalają użyć Intersection Observer na rodzeństwie komponentów bez dodawania sztucznego diva-wrappera tylko po to, żeby mieć jeden węzeł DOM do obserwowania. Ostatnia funkcja, czytanie lokalnej strefy czasowej urządzenia, wymaga wyłączenia danego poddrzewa z SSR, bo ta informacja z definicji nie istnieje po stronie serwera.

**Key takeaways:**
- View Transition trafia do Reacta jako wbudowany mechanizm animacji wejścia/wyjścia, bez potrzeby sięgania po Framer Motion do podstawowych przypadków
- `addTransitionType` daje kontrolę nad kierunkiem animacji, przydatną w karuzelach i podobnych komponentach
- Fragment refs eliminują potrzebę sztucznych wrapperów DOM tylko po to, żeby podłączyć Intersection Observer

**Why do I care:** Jeśli twój zespół do tej pory ciągnął Framer Motion wyłącznie po to, żeby dostać sensowne przejścia wejścia i wyjścia, to teraz warto sprawdzić, czy natywne View Transition w React 19.3 nie wystarczą, bo to jedna zależność mniej i jeden mechanizm animacji bliżej silnika przeglądarki zamiast biblioteki JS. Fragment refs to z kolei ta rzadka kategoria zmiany, która nie robi hałasu w release notes, ale usuwa realny irytujący workaround z kodu.

**Link:** [React 19.3 Explained (5 Features You Need)](https://daily.dev/posts/NO9jRZDAF)

## Modele językowe wciąż nie radzą sobie z prostym pytaniem o domeny i znaczniki HTML

**TLDR:** Roczny eksperyment sprawdzał, czy popularne modele (Gemini Flash ze wzmocnionym trybem myślenia, Claude, Perplexity oraz nienazwany model GPT) potrafią poprawnie odpowiedzieć, które domeny najwyższego poziomu pokrywają się z nazwami prawidłowych elementów HTML5. Każdy model, poza Siri kopiującą gotową ludzką odpowiedź, pomylił się na swój sposób: zmyślał nieistniejące domeny, gubił trafne dopasowania albo dopisywał nietrafione przykłady, żeby brzmieć dokładniej.

**Summary:** Haczyk w pytaniu polega na tym, że standard HTML5 pozwala na własne, niestandardowe elementy pod jednym warunkiem: nazwa musi być pisana małymi literami i zawierać myślnik. To automatycznie kwalifikuje mnóstwo domen zapisanych w Punycode, na przykład końcówki dla nazw międzynarodowych, jako technicznie poprawne nazwy elementów niestandardowych. Do tego dochodzą elementy MathML osadzane w HTML, jak `mn`, `mo`, `ms` czy `mtr`, które też liczą się jako dopasowania. W sumie ponad 150 domen najwyższego poziomu pokrywa się z jakimś prawidłowym elementem HTML5, licząc elementy niestandardowe.

Domyślny model Gemini Flash zmyślił nieistniejącą domenę `.a` (domeny muszą mieć co najmniej dwa znaki) i wskazał `art`, `app` oraz `bar` jako rzekome standardowe elementy HTML, którymi nigdy nie były. Włączenie rozszerzonego trybu myślenia w Gemini ograniczyło halucynacje, ale model wciąż gubił realne trafienia, jak `data`, `map`, `select` czy `search`.

Autor wyciąga z tego wniosek szerszy niż sama ciekawostka o TLD-ach: ludzie ufają odpowiedziom LLM-ów na nudne, sprawdzalne pytania właśnie dlatego, że zakładają, iż żaden rozsądny model nie popełni tam błędu. Tymczasem modele coraz sprawniej maskują niepewność pewnym siebie, rozwlekłym tonem, który brzmi jak odpowiedź eksperta, nawet gdy jest kompletnie zmyślony.

**Key takeaways:**
- Ponad 150 domen najwyższego poziomu pokrywa się z jakąś prawidłową nazwą elementu HTML5, głównie dzięki regule niestandardowych elementów wymagającej myślnika
- Domyślny model Gemini Flash zmyślał domeny i elementy, które nigdy nie istniały, tryb rozszerzonego myślenia ograniczył halucynacje, ale wciąż gubił realne trafienia
- Modele coraz częściej maskują błędne odpowiedzi pewnym siebie, rozwlekłym tonem zamiast przyznać się do niepewności

**Why do I care:** To dobry test na własny użytek, zanim zaufasz modelowi w czymś, co wygląda na nudny fakt do sprawdzenia, jak wersja API, nazwa parametru czy specyfikacja standardu. Jeśli LLM gubi się w czymś tak wąskim i sprawdzalnym jak lista elementów HTML5, warto założyć podobny margines błędu przy każdym pytaniu o szczegóły specyfikacji, których model nie może po prostu wyliczyć z pamięci treningowej.

**Link:** [Are LLMs still surprisingly bad at some simple tasks?](https://daily.dev/posts/4I7VllOCg)

## OpenMuse: open-source'owy agent osobisty z przeglądarką i terminalem

**TLDR:** OpenMuse to szablon agenta osobistego na licencji MIT, zbudowany na CopilotKit i AG-UI, oferujący trwałą przeglądarkę, opcjonalny terminal linuksowy, obsługę plików oraz zadania działające w tle na iOS, Androidzie i w przeglądarce.

**Summary:** Projekt integruje się z Gmailem i kalendarzem przez Google OAuth, obsługuje wypełnianie formularzy PDF oraz podsumowywanie transakcji finansowych, a do utrzymania stanu rozmowy w wdrożeniach produkcyjnych korzysta z CopilotKit Intelligence. To układanka bardziej zbliżona do asystenta typu „zrób to za mnie w tle" niż do klasycznego chatbota odpowiadającego na pojedyncze pytania.

Autorzy oznaczyli projekt jako alfa, a na mapie drogowej mają graficzne środowiska desktopowe, autonomiczny checkout w sklepach internetowych oraz kolejne konektory do zewnętrznych usług. To sygnał, że traktują to jako fundament pod szerszą kategorię agentów osobistych, a nie zamknięty produkt.

**Key takeaways:**
- OpenMuse łączy trwałą przeglądarkę, terminal i obsługę plików w jednym szablonie agenta na licencji MIT
- Integracja z Gmailem i kalendarzem przez OAuth oraz wypełnianie formularzy PDF pokazują nastawienie na realne zadania biurowe, nie na demo
- Projekt jest wczesną alfą z ambitną mapą drogową, w tym autonomicznym checkoutem i graficznym środowiskiem desktopowym

**Why do I care:** Warto śledzić tę kategorię projektów, jeśli budujesz cokolwiek z agentami działającymi w tle na urządzeniu użytkownika, bo pokazuje, jak wygląda dziś stan sztuki w kwestii utrzymania trwałej sesji przeglądarki i terminala poza jednorazowym wywołaniem modelu. To też dobry punkt odniesienia architektonicznego, zanim zdecydujesz się budować podobny mechanizm od zera.

**Link:** [GitHub - CopilotKit/openmuse](https://daily.dev/posts/O154EymE8)

## Neon: kod odpala się sam, gdy ktoś wgra plik do bucketa

**TLDR:** Neon Object Storage i Neon Functions osiągnęły ogólną dostępność, a nowy trigger `storage_object_created` pozwala uruchomić funkcję Neon automatycznie, gdy plik pojawi się w buckecie, bez konieczności odpytywania w pętli.

**Summary:** Funkcja otrzymuje nazwę bucketa i klucz obiektu, działa wystarczająco długo, by wykonać realną pracę, i może obudzić uśpioną do zera bazę Postgres, jeśli w trakcie działania odpyta bazę danych. Sugerowane zastosowania obejmują katalogowanie wgranych plików w Postgresie, generowanie pochodnych obrazów, dodawanie metadanych generowanych przez AI przez Neon AI Gateway, zamianę dokumentów i audio na przeszukiwalne embeddingi oraz moderację lub redagowanie wgranych treści.

Triggery są, podobnie jak reszta backendu Neon, zakresowane na gałęzie: gałąź potomna dziedziczy kopię triggera rodzica, ale startuje z nim wyłączonym, żeby uniknąć ponownego przetworzenia plików, które rodzic już obsłużył. To szczegół, który łatwo przeoczyć, a który ratuje przed podwójnym przetworzeniem danych przy tworzeniu środowiska testowego z gałęzi produkcyjnej.

Konfigurację można zapisać deklaratywnie w pliku `neon.ts`, a `neon deploy` provisionuje bucket, funkcję i trigger razem. Razem z triggerem plikowym pojawił się też trigger typu `schedule`, pozwalający uruchamiać funkcje cyklicznie, na wzór cron joba, bez osobnej infrastruktury do tego celu.

**Key takeaways:**
- Trigger `storage_object_created` odpala funkcję Neon automatycznie przy wgraniu pliku do bucketa, bez pollingu po stronie aplikacji
- Zapytanie do uśpionej bazy Postgres wewnątrz funkcji budzi bazę automatycznie, więc scale-to-zero nie koliduje z eventami plikowymi
- Gałęzie potomne dziedziczą triggery rodzica, ale wyłączone domyślnie, co chroni przed ponownym przetworzeniem odziedziczonych plików

**Why do I care:** Jeśli trzymasz pliki użytkowników w S3 czy podobnym buckecie obok bazy Postgres, ten trigger eliminuje osobną warstwę infrastruktury typu Lambda-plus-kolejka tylko po to, żeby zareagować na nowy plik. Warto jednak pilnować zachowania na gałęziach deweloperskich, dziedziczenie wyłączonego triggera jest bezpieczne domyślnie, ale łatwo zapomnieć włączyć go świadomie tam, gdzie naprawdę jest potrzebny.

**Link:** [When a file is uploaded, run the job on Neon](https://daily.dev/posts/R0FjCIMoy)
