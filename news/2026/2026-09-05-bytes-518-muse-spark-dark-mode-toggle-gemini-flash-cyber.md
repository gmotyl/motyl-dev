---
title: "Bytes #518: prawdziwy koszt Muse Spark, koniec z dark mode toggle'em i Gemini 3.8 Flash Cyber"
excerpt: "Meta dogania frontier z Muse Spark 1.3, Lea Verou zmienia zdanie na temat dark mode toggle'i, a Google wypuszcza trzeci model Flash w sześć tygodni, tym razem ze specjalizacją cyberbezpieczeństwa."
publishedAt: "2026-09-05"
slug: "bytes-518-muse-spark-dark-mode-toggle-gemini-flash-cyber"
hashtags: "#uidev #ai #llm #css #performance #rust #generated #pl"
source_pattern: "ui.dev"
---

## Muse Spark 1.3: Meta w końcu ma model na poziomie frontier

**TLDR:** Meta wypuściła Muse Spark 1.3, model skupiony na zadaniach agentowych i kodowaniu, razem z nowym modelem do transkrypcji głosu w czasie rzeczywistym opartym na tym samym rdzeniu. Model jest 2 do 3 razy szybszy niż konkurencyjne Sol i Fable, a nowa cenowa opcja "contributor" pozwala Mecie trenować na danych klienta w zamian za cenę niższą o rząd wielkości.

**Summary:** Przez ostatni rok Meta miała nieograniczony budżet na dane, moc obliczeniową i rekrutację najlepszych badaczy AI z rynku, a mimo to nie była w stanie utrzymać tempa z Anthropic, OpenAI czy chińskimi laboratoriami. Muse Spark 1.3 to pierwszy sygnał, że coś się zmieniło. Model radzi sobie z bardziej otwartymi, długotrwałymi zadaniami agentowymi, potrafi zadawać pytania doprecyzowujące zamiast zgadywać intencję użytkownika, i lepiej trzyma się złożonych, wieloetapowych instrukcji bez gubienia wcześniej ustalonych ograniczeń. Meta chwali się też, że model dokładniej rozpoznaje własne ograniczenia zamiast halucynować wyniki, kiedy trafia na zadanie, którego nie potrafi rozwiązać.

Na warstwie kosztowej Meta wprowadza dwupoziomowe cennik: standardowa stawka to 4,25 dolara za milion tokenów, a nowa stawka "contributor" schodzi do 0,20 dolara, w zamian za zgodę na trenowanie przyszłych modeli na przesyłanych danych. To bezpośrednia próba podbicia adopcji wśród zespołów wrażliwych na koszt, kosztem prywatności danych, którą trzeba świadomie zaakceptować. Do tego dochodzi wydajność: Spark 1.3 jest around dwa razy szybszy od Sol i dwa do trzech razy szybszy od Fable, co czyni go sensownym kandydatem do zadań w rodzaju automatycznego review kodu w CI, gdzie liczy się balans między dokładnością, szybkością i kosztem, a nie sam szczyt jakości.

Razem ze Spark 1.3 Meta wypuściła model transkrypcji głosu działający w czasie rzeczywistym, zbudowany na tym samym rdzeniu co Spark. To pociągnięcie ma sens strategicznie: jeśli agenty mają docelowo działać przez rozmowę głosową zamiast pisanego promptu, tania i szybka transkrypcja to warunek wstępny, a nie dodatek.

**Key takeaways:**
- Muse Spark 1.3 to pierwszy model Mety, który realnie konkuruje z czołówką w zadaniach agentowych i kodowaniu.
- Cennik "contributor" (0,20 USD/mtok) w zamian za zgodę na trening na danych klienta to agresywna próba przechwycenia rynku kosztem prywatności.
- Model jest 2-3x szybszy od Sol i Fable, co realnie liczy się przy zadaniach wymagających wielu iteracji, jak review kodu.

**Why do I care:** Cennik "contributor" to warty obserwowania precedens: jeśli inne laboratoria pójdą tą drogą, decyzja o tym, którego dostawcę LLM wybrać, przestanie być wyłącznie kwestią jakości i kosztu, tylko zacznie wymagać osobnej rozmowy z działem prawnym o tym, co dokładnie firma zgadza się oddać w zamian za tańsze tokeny. Prędkość 2-3x wobec Sol i Fable to z kolei konkretny argument, żeby dodać Spark 1.3 do listy modeli testowanych pod kątem automatyzacji code review, zanim ktoś inny w zespole zrobi to za was i będzie się zastanawiał, czemu nikt wcześniej na to nie wpadł.

**Link:** [Introducing Muse Spark 1.3](https://research.meta.ai/blog/introducing-muse-spark-1-3)

## Lea Verou zmienia zdanie: najlepszy dark mode toggle to żaden toggle

**TLDR:** Miesiąc po opublikowaniu artykułu rekomendującego dwustanowy toggle dark mode (system/przeciwieństwo systemu zamiast system/light/dark), Lea Verou wraca z kontynuacją i twierdzi, że dla większości stron internetowych nie warto mieć trwale widocznego toggle'a w ogóle. Kluczowym argumentem jest to, że dark mode toggle to problem, który obchodzi głównie deweloperów, nie zwykłych użytkowników.

**Summary:** Poprzedni artykuł Verou wywołał falę dyskusji, w tym publiczną polemikę z Bramusem, który bronił trójstanowego przełącznika (system/light/dark) argumentem, że dwustanowy toggle łamie się w konkretnym scenariuszu: użytkownik z automatycznym przełączaniem systemu według pory dnia, który w ciągu dnia przełączy stronę na dark, a w nocy zobaczy dark mimo że "wybrał" wcześniej light. Verou punktuje ten argument jako rzadki, tani do naprawienia jednym kliknięciem i w praktyce niezauważalny dla przeciętnego użytkownika, powołując się na zasadę, że priorytety w usability powinna wyznaczać częstość razy wpływ razy trwałość problemu, nie teoretyczna elegancja modelu danych.

Przełomowy moment przyszedł, kiedy Verou pokazała swój artykuł koleżance z doktoratem z HCI, która skupia się na ludziach, nie na szczegółach technicznych webu, a ta w ogóle nie wiedziała, o jaki kontrolce mowa. Z tego wyszedł wniosek: praktycznie każdy trwały dark mode toggle, jaki Verou widziała, występował na stronach kierowanych do deweloperów. Serwisy konsumenckie, z których ludzie korzystają godzinami dziennie, jak Gmail czy Facebook, chowają tę opcję w osobnym panelu ustawień, nie w headerze widocznym dla każdego odwiedzającego.

Dyskusja urodziła też serię alternatywnych projektów, od przemyślanego "3-in-2 toggle" Vale, przez wersję z przyciskiem cofania od Toni, po żartobliwe próby zaprojektowania najgorszego możliwego przełącznika dark mode. Verou ocenia większość z nich jako dopracowane rozwiązania nieistniejącego problemu i rekomenduje prostą zasadę: podążaj za ustawieniem systemowym jako domyślne, a jeśli komuś zależy na trwałym wymuszeniu jasnego lub ciemnego motywu, niech szuka tego w ustawieniach, nie w headerze.

**Key takeaways:**
- Scenariusz, w którym dwustanowy toggle "psuje się" (auto-switch systemu + zmiana w trakcie sesji + powrót po czasie), jest rzadki i tani w naprawie jednym kliknięciem.
- Trwałe dark mode toggle'e występują niemal wyłącznie na stronach deweloperskich, nie konsumenckich, co sugeruje, że to problem deweloperów, nie użytkowników.
- Rekomendacja: podążaj za ustawieniem systemu jako domyślne, a wymuszenie trybu schowaj w osobnym panelu ustawień zamiast w widocznym headerze.

**Why do I care:** To dobry przykład na to, żeby kwestionować problem, zanim zacznie się go rozwiązywać: całe środowisko frontendowe spędziło tygodnie na dyskusji o najlepszym kształcie kontrolki, której przeciętny użytkownik może w ogóle nie zauważyć. Warto przy okazji projektowania własnego ustawienia motywu zapytać, czy to realnie potrzebna funkcja w headerze, czy tylko coś, co deweloperzy chcą mieć, bo sami często przełączają motywy w edytorze kodu.

**Link:** [The best dark mode toggle is probably none](https://lea.verou.me/blog/2026/dark-mode-toggles-2/)

## Speed: co się stanie z interfejsami, kiedy agenty przestaną kazać nam czekać

**TLDR:** Charlie Deets porównuje nagranie z 1996 roku, w którym zakup aparatu przez internet zajmuje prawie dziesięć minut, do własnego zakupu tego samego aparatu z telefonu w 2026, który zajął mu poniżej 30 sekund. Wyciąga z tego wniosek, że dzisiejsze oczekiwanie na agenty AI to ten sam etap cierpliwości, przez który przeszliśmy z wczesnym internetem, i że gdy modele staną się naprawdę szybkie, zmieni się nasza relacja do technologii i całe interfejsy, których dziś używamy.

**Summary:** Autor zaczyna od konkretnego kontrastu: w archiwalnym nagraniu użytkownik przegląda kategorie produktów zamiast wyszukiwać, trafia na błędy, czeka minutami na załadowanie strony i z trudem dociera do konkretnej podstrony produktu. Trzydzieści lat później to samo zadanie zajmuje sekundy. Deets twierdzi, że jesteśmy dziś w analogicznym momencie z agentami LLM: siedzimy i czekamy, aż agent skończy pracę, z tymi samymi frustracjami co użytkownik z 1996 roku.

Kluczowa teza artykułu dotyczy tego, co zniknie, kiedy ta cierpliwość przestanie być potrzebna. Zarządzanie wieloma zadaniami naraz stanie się rzadsze, bo przy braku czasu oczekiwania nie ma po co żonglować kilkoma wątkami jednocześnie, tak jak ludzie na telefonie zwykle trzymają jedną kartę przeglądarki, w przeciwieństwie do dziesiątek kart na desktopie. Dominacja mobile ma z tego powodu dalej rosnąć, bo główna przewaga desktopu, czyli wielozadaniowość dzięki dużemu ekranowi i wielu oknom, traci sens, gdy model sam zarządza przełączaniem kontekstu za użytkownika. Trzecia zmiana to przejście z tekstowego "promptowania" na płynną, głosową konwersację, w której komunikujemy ogólny cel, a nie precyzyjne kroki, bo będziemy mogli korygować kierunek na bieżąco.

Deets nie twierdzi, że to jest dobre albo złe, tylko nieuniknione, jeśli tempo rozwoju LLM się utrzyma. Jego rada to zacząć świadomie projektować pod tę przyszłość już teraz, decydując, które dzisiejsze przyzwyczajenia warto zachować, a które są tylko efektem ograniczeń, które i tak wkrótce znikną.

**Key takeaways:**
- Analogia z internetem z 1996 roku: dziesięć minut na zakup wtedy, poniżej 30 sekund dzisiaj, to model tego, co czeka relację człowieka z agentami AI.
- Kiedy agenty przestaną wymagać czekania, wielozadaniowość i interfejsy wielookienkowe stracą sens, a dominacja mobile ma dalej rosnąć.
- Tekstowe promptowanie ma ustąpić płynnej rozmowie głosowej, w której komunikujemy cel, nie kroki do jego wykonania.

**Why do I care:** Jeśli ta prognoza się sprawdzi choć częściowo, warto już teraz zadawać sobie pytanie, ile z obecnego designu produktu (zakładki, wielookienkowe dashboardy, formularze z wieloma polami) jest tam wyłącznie dlatego, że dotychczas ktoś musiał ręcznie zarządzać kontekstem, a nie dlatego, że to najlepszy sposób na osiągnięcie celu użytkownika. Prognozowanie przyszłości interfejsów zawsze jest ryzykowne, ale sama praktyka kwestionowania "dlaczego to wygląda tak, jak wygląda" jest przydatna niezależnie od tego, czy głosowe interfejsy faktycznie przejmą dominację.

**Link:** [Speed](https://charliedeets.com/posts/2026-09-01-speed/)

## HTML dostaje wbudowane deklaratywne strumieniowanie poza kolejnością

**TLDR:** WHATWG zmergowało do specyfikacji HTML nowy atrybut `for` na elemencie `template`, pozwalający wstawiać treść w miejsce wcześniej wyrenderowanych placeholderów w odpowiedzi strumieniowanej z serwera, bez potrzeby JavaScriptu po stronie klienta.

**Summary:** Do tej pory streaming HTML "poza kolejnością", czyli wysyłanie najpierw szkieletu strony, a potem dosyłanie wolniej ładujących się fragmentów w dowolnej kolejności, wymagał JavaScriptu albo frameworkowej magii w rodzaju React Suspense z hydratacją po stronie klienta. Nowy atrybut `for` na elemencie `template` pozwala przeglądarce robić to natywnie: znacznik `<?marker>` albo `<?start>` w initial response oznacza miejsce docelowe, a późniejszy `<template for="...">` w tym samym strumieniu każe przeglądarce podmienić placeholder na finalną treść, bez żadnego skryptu.

To rozwiązuje realny problem architektoniczny: serwery renderujące strony po stronie serwera od dawna chcą wysyłać szybkie części strony natychmiast, a wolniejsze, na przykład wyniki zapytań do bazy danych albo wywołania zewnętrznego API, dosyłać później, bez blokowania całej odpowiedzi. Mechanizm ten istniał już w meta-frameworkach jak Next.js czy Remix, budowany na runtime'owym JavaScripcie, ale teraz trafia bezpośrednio do platformy webowej jako natywna funkcja przeglądarki.

**Key takeaways:**
- Nowy atrybut `for` na `<template>` pozwala na deklaratywne, poza-kolejnościowe strumieniowanie HTML bez JavaScriptu po stronie klienta.
- Mechanizm celuje w te same problemy, które dziś rozwiązują runtime'owe rozwiązania w Next.js czy Remix, ale jako funkcja natywna przeglądarki.
- Zmiana jest już zmergowana do specyfikacji WHATWG i pojawiają się pierwsze testy web-platform-tests.

**Why do I care:** Jeśli ta funkcja trafi do przeglądarek w rozsądnym tempie, część logiki streamingu, którą dziś trzeba pisać ręcznie albo importować z frameworka, przestanie być potrzebna dla prostszych przypadków użycia. To nie zastąpi Suspense w złożonych aplikacjach React, ale dla mniej skomplikowanych stron server-rendered to potencjalnie duże uproszczenie stacku bez dokładania kolejnej zależności JS.

**Link:** [Add `<template for>` for declarative out-of-order streaming](https://github.com/whatwg/html/pull/11818)

## Rslib trafia do wersji 1.0

**TLDR:** Rslib, narzędzie do budowania bibliotek JavaScript zbudowane na Rsbuild (część ekosystemu Rspack), osiągnęło wersję 1.0, oferując prostszy sposób konfigurowania builda biblioteki niż ręczne składanie Rollupa czy tsup.

**Summary:** Rslib pozycjonuje się jako narzędzie skupione wyłącznie na jednym zadaniu: budowaniu paczek npm gotowych do publikacji, w przeciwieństwie do bardziej ogólnych bundlerów, które trzeba samemu konfigurować pod ten konkretny przypadek użycia. Korzystając z tego samego silnika co Rsbuild, projekt obiecuje szybszy build dzięki Rust-owemu rdzeniowi, przy zachowaniu prostszej konfiguracji niż bezpośrednie użycie Rollupa.

**Key takeaways:**
- Rslib to Rsbuild-based narzędzie dedykowane do budowania bibliotek JS/TS, teraz w wersji 1.0.
- Konkuruje z tsup i ręcznymi konfiguracjami Rollupa jako prostsza alternatywa oparta o Rust.

**Why do I care:** Jeśli aktualnie utrzymujecie bibliotekę npm zbudowaną na ręcznie sklejonym Rollupie albo tsup, warto sprawdzić, czy Rslib nie skróci wam konfiguracji builda, szczególnie jeśli reszta stacku już korzysta z ekosystemu Rspack. To niewielka zmiana, ale w projekcie z wieloma paczkami w monorepo różnica w czasie builda potrafi się sumować.

**Link:** [Rslib - Rsbuild-based library development tool](https://rslib.rs/)

## Gemini 3.8 Flash i Flash Cyber: trzeci Flash w sześć tygodni

**TLDR:** Google wypuściło Gemini 3.8 Flash, model do długotrwałych zadań kodowania i agentów, oraz Gemini 3.8 Flash Cyber, wyspecjalizowany model do wykrywania podatności i automatycznego łatania kodu, dostępny na razie tylko zaufanym zespołom defensywnym przez program Fairwind.

**Summary:** Trzy tygodnie po 3.7 Flash i sześć tygodni po poprzednim wydaniu Google wypuszcza trzeci model Flash z rzędu, przy tej samej cenie co 3.7 Flash (0,75 dolara za milion tokenów wejścia, 3,75 dolara za milion tokenów wyjścia). 3.8 Flash notuje wyraźne postępy względem 3.7 Flash w inżynierii oprogramowania, zadaniach agentowych i wieloetapowym rozumowaniu w wyspecjalizowanych dziedzinach, momentami zbliżając się do modeli frontier o dużo wyższej cenie. Na benchmarku DeepSWE v1.1, testującym długotrwałe, autonomiczne rozwiązywanie problemów inżynierskich, model wyprzedza większość droższych, większych modeli frontier.

Google przypisuje ten skok jednemu wyborowi projektowemu: model "pracuje ciężej", wykonując dodatkowe kroki rozumowania i częściej wywołując narzędzia iteracyjnie na złożonych zadaniach, co oznacza wyższe zużycie tokenów przy wyższych poziomach wysiłku, z opcją obniżenia poziomu dla zastosowań, gdzie liczy się efektywność kosztowa bardziej niż szczyt jakości.

Flash Cyber to osobna wersja wytrenowana specyficznie pod cyberbezpieczeństwo, dostępna wyłącznie zaufanym zespołom defensywnym przez nowy program Fairwind. Na benchmarku CyberGym model przewyższa zarówno swojego poprzednika 3.5 Flash Cyber, jak i znacznie większe modele frontier w autonomicznym wykrywaniu podatności, a na wewnętrznym benchmarku Google obejmującym 20 języków programowania osiąga skuteczność przekraczającą 70 procent. Zespół Chrome Security zgłosił, że model wygenerował 2,6 razy więcej poprawnych łatek na podatności w Chrome niż najlepsze komercyjne modele, znacznie większe od Flash Cyber. Google podkreśla, że świadomie postawiło na łatanie podatności przed zdolnościami ofensywnymi, dając defensywie przewagę nad atakującymi zamiast odwrotnie.

**Key takeaways:**
- Gemini 3.8 Flash to trzeci model Flash w sześć tygodni, przy tej samej cenie co 3.7 Flash, z wyraźną poprawą w kodowaniu i zadaniach agentowych.
- Gemini 3.8 Flash Cyber to specjalizowany model do wykrywania podatności i automatycznego łatania, na razie dostępny tylko zaufanym zespołom defensywnym.
- Zespół Chrome Security zgłosił 2,6x więcej poprawnych łatek na podatności względem większych modeli komercyjnych.

**Why do I care:** Tempo wydań Google (trzeci Flash w sześć tygodni) pokazuje, że okno, w którym warto trzymać się jednego dostawcy modeli, robi się coraz krótsze: warto mieć w zespole proces regularnego retestowania nowych wydań pod kątem kosztu i jakości, zamiast raz wybrać model i zostać przy nim z przyzwyczajenia. Flash Cyber jako osobny, ograniczony dostępowo model do bezpieczeństwa to też sygnał, że laboratoria zaczynają traktować obronę i ofensywę jako osobne produkty z osobnymi zasadami dostępu, co ma sens, ale warto śledzić, jak długo taka separacja faktycznie się utrzyma.

**Link:** [Introducing Gemini 3.8 Flash and 3.8 Flash Cyber](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/)
