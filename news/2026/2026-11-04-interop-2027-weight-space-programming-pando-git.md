---
title: "Głosowanie na Interop 2027, LLM-y piszące wagi sieci i Pando, czyli Git OpenAI"
excerpt: "Bytes #535: lista CSS-owych życzeń do Interop 2027, eksperymenty z programowaniem w przestrzeni wag, biblioteka do silników inferencji, panele zmieniające rozmiar w Reakcie, własny backend Git w OpenAI i CLI do sterowania Chrome."
publishedAt: "2026-11-04"
slug: "interop-2027-weight-space-programming-pando-git"
hashtags: "#uidev #css #browsers #ai #llm #react #git #architecture #devtools #agents #generated #pl"
source_pattern: "ui.dev"
---

## Głosowanie na funkcje CSS do Interop 2027

**TLDR:** Zespół Firefoksa zbiera rankingi propozycji do Interop 2027, a autorzy Bytes wskazują trzy rzeczy, które chcą zobaczyć w CSS. To animowanie do height auto, prawdziwy line-clamp i przejścia dla display oraz content-visibility.

**Summary:** Interop to wspólna inicjatywa producentów przeglądarek, która ustala, jakie nowe funkcje HTML, CSS i JavaScriptu mają zacząć działać tak samo wszędzie. Różnicę widać gołym okiem. W czasach Bootstrapa na flexbox zamiast floatów czekaliśmy latami, a dzięki Interop 2023 selektor has, zapytania kontenerowe i subgrid trafiły do wszystkich głównych przeglądarek w ciągu jednego roku.

Firefox prowadzi drugi rok z rzędu otwarty ranking propozycji. Zeszłoroczne ponad 1900 głosów realnie wpłynęło na to, co zespół popierał w procesie i co dostało priorytet w samej przeglądarce. Wystarczy zalogować się przez GitHub i uszeregować około dziesięciu pozycji, które oceniasz pozytywnie. Niczego, co ci obojętne albo nieznane, nie rankuje się wcale, bo każdy wpis liczy się jako pozytywny sygnał. Lista jest długa. Są na niej rzeczy od funkcji losowych w CSS, przez API Temporal, po element-scoped view transitions i sanitizer API.

Autorzy newslettera stawiają na trzy rzeczy. Pierwsza to animowanie do automatycznej wysokości, bo każdy akordeon na świecie nadal ma gdzieś ukryte mierzenie w JavaScripcie. Chrome ma to od 2024 roku, więc brakuje tylko pozostałych silników. Druga to normalny line-clamp zamiast hacka z webkit-box, który przetrwał z innej epoki. Trzecia to możliwość przejść dla display i content-visibility, żeby dialogi, popovery i toasty miały wreszcie animację wyjścia bez żonglowania timeoutami.

**Key takeaways:**

- Interop skrócił czas wdrażania nowych funkcji CSS z lat do miesięcy.
- Ranking Firefoksa przyjmuje tylko pozytywne sygnały i wystarczy około dziesięciu pozycji.
- Animowanie do height auto, line-clamp i przejścia display to realne bóle codziennej pracy.

**Why do I care:** Głosowanie zajmuje piętnaście minut i jest jednym z niewielu momentów, w których frontendowiec bezpośrednio wpływa na platformę. Zanim jednak klikniesz trzy swoje ulubione funkcje, zadaj sobie pytanie, czy czekasz na przeglądarkę, czy wymówkę, żeby nie upraszczać komponentu. Autorzy nie wspominają o koszcie drugiej strony medalu. Każda nowa funkcja to kolejne rzeczy do testowania i fallbacków, a polyfille z tych list rzadko się opłacają.

**Link:** [Bytes #535 - The CSS ballot for Interop 2027](https://bytes.dev/archives/535)

## Programowanie w przestrzeni wag, czyli LLM czyta i pisze wagi sieci neuronowych

**TLDR:** Badacze pokazują, że GPT-6 Astra potrafi odczytać z surowych wag, do czego sieć została wytrenowana, napisać małe sieci od zera, a nawet poprawić Qwen3.5-0.8B przez zmianę 0,016 procent wag. Efekty są obiecujące, ale ograniczone.

**Summary:** Autorzy nazywają to Weight-Space Programming. Model ogólnego przeznaczenia dostaje wagi jako tekst, bez gradientów i bez własnej pętli treningowej, i na podstawie opisu zadania w języku naturalnym czyta je albo zapisuje. W pierwszych eksperymentach Astra z samych wag, bez ujawnionej listy gier, rozpoznała, na jakiej grze trenowano każdą z czterech sieci. W innym eksperymencie ze środkowych warstw małego modelu językowego, bez warstwy wejściowej i wyjściowej, odgadła, czy sieć uczono na kodzie Pythona, romaji czy angielskiej Wikipedii. Odnalazła przy tym głowy kopiujące zgodnie z pomiarami.

Dalej jest pisanie. Astra z jednej odpowiedzi napisała sieci grające w trzy gry MinAtar, które pobiły PPO trenowane przez sto milionów kroków. W Go na planszy 9 na 9 sieć napisana jako program, warstwa po warstwie, w jednym uruchomieniu Pythona wygrywała z małymi sieciami PPO, a z pięćdziesięcioma przebiegami do przodu pobiła sieć o takim samym rozmiarze trenowaną na dwudziestu milionach partii.

Najgłośniejszy wynik dotyczy Qwen3.5-0.8B. Wynik na MATH-500 wzrósł z 7,9 do 48,1 procent, a na IFEval z 21 do 62,3. Zmieniono 131 072 wag. Trzeba jednak przeczytać drobny druk. Bazowy model wpadał w pętle myślenia i w 93 procentach odpowiedzi dobijał do limitu tokenów. Astra znalazła kierunek odpowiedzialny za pętle i go odjęła. To usunięcie przeszkody, a nie dodanie umiejętności, co sami autorzy potwierdzają. Na Gemma 3 270M, która rzadko się zapętla, nic nie wskórała. Nie rozpoznała też bez dodatkowej pomocy, który z dwóch modeli jest służalczy.

**Key takeaways:**

- LLM odczytuje przeznaczenie sieci z surowych wag, ale tylko w małej skali i w warunkach laboratoryjnych.
- Skok na MATH-500 wynika z naprawienia pętli, a nie z nauczenia modelu matematyki.
- Przy pytaniu o służalczość z samych wag Astra poległa, pomogły dopiero wzorce uwagi.

**Why do I care:** Dla frontendowca to tło, a nie narzędzie na jutro. Jeśli jednak ta droga się utrzyma, audyt modelu bez uruchamiania go, na przykład szukanie backdoorów, może zmienić sposób oceniania zewnętrznych modeli w produktach. Autorzy omijają jedną kwestię. Wszystkie wyniki pochodzą od jednego dostawcy modelu, który jest też współautorem zestawu zadań. Dopóki ktoś niezależny tego nie powtórzy, traktuję to jak ciekawy wstępny raport.

**Link:** [Sparks of Weight-Space Programming: LLMs can natively read & write neural network weights](https://rikiyat.github.io/blog/weight-space-programming/)

## Resin, biblioteka klocków do silników inferencji

**TLDR:** Resin to nie silnik inferencji, tylko zestaw klocków do jego budowy. Rdzeń to szybki scheduler w Rust, cache KV i serwer metryk, a model piszesz jako własne kernele.

**Summary:** Autor od razu ostrzega, że to nie jest oprogramowanie produkcyjne. Kto potrzebuje prawdziwego silnika, ma sięgnąć po SGLang albo vLLM. Resin jest dla ludzi, którzy chcą hakować systemy inferencji, nowe modele albo nowy sprzęt. Rdzeń przyjmuje identyfikatory tokenów, planuje partię i przekazuje ją runnerowi napisanemu w Pythonie, a ten zwraca kolejne tokeny.

Chwalipięta część README to twierdzenie, że w dwanaście godzin zbudowano z Resin samodzielne silniki dla dwóch dużych modeli na GPU Blackwell, które mają rywalizować z vLLM i SGLang. W przypadku prefillu i decode dla DeepSeek V4.1 wynik ma mieścić się w 5 do 10 procentach od DeepInfer. Repozytorium dostarcza też umiejętności dla agentów, jedną do dodawania nowego modelu, drugą do iteracyjnego poprawiania wydajności w pętli typu autoresearch.

Z ciekawszych szczegółów wbudowany serwer wystawia kompatybilne API OpenAI i Anthropic, a runnery nie są przywiązane do CUDA, bo jest też runner MLX dla Apple Silicon. Brakuje mi w opisie jednej rzeczy, czyli tego, jak wyglądały te dwanaście godzin. Ile z nich to praca agenta, a ile człowieka, który wiedział, czego szukać.

**Key takeaways:**

- Resin to biblioteka klocków, a nie gotowy silnik, i autor sam odradza użycie produkcyjne.
- Twierdzenie o silnikach zbudowanych w 12 godzin pochodzi z README, bez niezależnej weryfikacji.
- Jest wbudowany serwer zgodny z API OpenAI i Anthropic oraz runner dla Apple Silicon.

**Why do I care:** Dla większości zespołów frontendowych to temat poboczny, bo i tak korzystamy z gotowego API. Ale wzorzec jest ciekawy architektonicznie. Wąski, dobrze zdefiniowany interfejs między schedulerem a kernelem pozwala agentowi generować kod w jednym miejscu, nie ryzykując całości. Warto go podpatrzeć przy własnych systemach, w których chcemy oddać część pracy agentom.

**Link:** [GitHub - ekzhang/resin: Experimental library for building inference engines](https://github.com/ekzhang/resin)

## react-resizable-panels dostaje komponent Workspace

**TLDR:** Biblioteka Briana Vaughna do paneli zmieniających rozmiar obsługuje teraz trzy rodzaje układów, w tym przestrzeń roboczą z zakładkami, które użytkownik przeciąga.

**Summary:** Biblioteka react-resizable-panels powstała do układów, w których użytkownik przeciąga separator między panelami. Według strony dokumentacji są teraz trzy rodzaje układów. Pierwszy to klasyczne panele w wierszu lub kolumnie. Drugi to siatka komórek zmieniających rozmiar w dwóch wymiarach. Trzeci to przestrzeń robocza ze zbiorami zakładek, które użytkownicy mogą układać, przeciągając karty.

Ten trzeci wariant to nowość i to on zasługuje na uwagę. Do tej pory układ typu edytor kodu z przeciąganymi kartami wymagał albo ciężkiej biblioteki, albo samodzielnej implementacji, która zawsze kończyła się pękającymi przypadkami brzegowymi. Instalacja to jeden pakiet z npm, a definicje TypeScript są w paczce. Z krótkiej strony startowej nie dowiemy się niczego o dostępności klawiaturowej ani o zapisywaniu układu.

**Key takeaways:**

- Trzy rodzaje układów, czyli panele, siatka i przestrzeń robocza z zakładkami.
- Nowy komponent Workspace pozwala przeciągać karty między zestawami zakładek.
- Dokumentacja startowa nie mówi nic o dostępności ani o persystencji układu.

**Why do I care:** Jeśli budujesz narzędzie wewnętrzne, dashboard albo cokolwiek, co przypomina IDE, to jest coś, co ci oszczędzi kilka tygodni. Mój pierwszy test byłby prosty. Sprawdzę, czy da się całym układem sterować z klawiatury i czy jego stan zapisuje się w adresie lub w pamięci przeglądarki, bo to dwie rzeczy, których użytkownicy oczekują, a których autorzy bibliotek często nie dowożą.

**Link:** [react-resizable-panels](https://react-resizable-panels.vercel.app/)

## Scaling Git w OpenAI i system Pando

**TLDR:** OpenAI zbudowało Pando, nowy backend dla repozytoriów Git, który zachowuje zgodność z protokołem i klientem. Po wdrożeniu mediana opóźnienia pusha spadła o prawie 80 procent, a system serwuje blisko petabajt danych dziennie.

**Summary:** Punktem wyjścia była skala. Codex pozwala inżynierom pracować równolegle, więc przybywa gałęzi, pushów, merge'y i pobrań z CI oraz środowisk badawczych. Pod koniec zeszłego roku systemy obsługujące monorepo zaczęły się dusić. Pobrania i pushe były wolne, merge'e się wykładały, a niezawodność momentami spadała poniżej 90 procent.

Rozwiązanie opiera się na dwóch decyzjach, które łamią założenia typowych serwerów Git. Po pierwsze, spójność jest przyczynowa, a nie globalna. Pushe do niezwiązanych gałęzi nie czekają na siebie, a konflikt występuje tylko przy równoczesnym pushu do tej samej gałęzi. Cena jest taka, że klient czytający kilka gałęzi może zobaczyć je w różnych momentach. Po drugie, paczki packfile są używane ponownie, zamiast generowania osobnej dla każdego klienta. Serwer nie rozpakowuje pusha, tylko strumieniuje go do magazynu blobów i zapisuje wersję referencji w magazynie metadanych. Przy pobieraniu wybiera gotowe paczki, a klient ściąga je przez identyfikatory URI, z pamięci podręcznych z trafieniami powyżej 99 procent.

Dwie dalsze rzeczy są sprytne. Pando reklamuje klientowi tylko wybraną gałąź bazową, zwykle trunk, żeby ogłoszenie nie rosło wraz z liczbą gałęzi. W monorepo mediana paczki to poniżej 20 KiB. A w tle paczki są łączone w poziomy w stylu kompaktowania w drzewach LSM, dzięki czemu planowanie pobrania rośnie logarytmicznie. Całość zbudowano w dziesięć tygodni z pomocą Codexa, a rdzeń zaprojektował jeden inżynier. Część poprawek trafiła do upstreamowego Gita.

**Key takeaways:**

- Spójność przyczynowa zamiast globalnej pozwala pushować równolegle do różnych gałęzi.
- Ponowne użycie paczek zamiast generowania ich dla każdego klienta daje trafienia w cache powyżej 99 procent.
- Mediana opóźnienia pusha spadła o prawie 80 procent, a część poprawek trafiła do Gita.

**Why do I care:** Niewielu z nas ma monorepo na skalę OpenAI, ale wniosek jest uniwersalny. Narzędzia, które działały dla ludzi, pękają, gdy agenci zaczynają pushować na potęgę. Autorzy nie mówią, co się stanie z ludźmi, którzy chcą widzieć spójny obraz wszystkich gałęzi, i czy zaostrzy to problemy z debugowaniem. Jeśli twoje CI już teraz jest wąskim gardłem, sprawdź, ile z tego czasu to pobieranie, a ile naprawdę testy.

**Link:** [Scaling Git at OpenAI](https://openai.com/index/scaling-git-at-openai/)

## faster-chrome-devtools-skill, czyli CLI do sterowania Chrome dla agentów

**TLDR:** Zeke Sikelianos zrobił umiejętność dla agentów i narzędzie wiersza poleceń, które steruje Chrome bezpośrednio przez Chrome DevTools Protocol, bez MCP, Puppeteera i Playwrighta.

**Summary:** Narzędzie jest skryptem w Node.js bez zależności, który łączy się z Chrome przez WebSocket. Pozwala wylistować i otworzyć karty, odczytać zwarty snapshot drzewa dostępności ze stabilnymi referencjami do elementów, klikać i wypełniać pola, czekać na tekst lub selektor, robić skompresowane zrzuty ekranu oraz podglądać konsolę i nieudane żądania. Można też wywołać dowolną metodę protokołu. W tle działa demon nasłuchujący tylko lokalnie, który trzyma połączenie przez dwadzieścia minut, więc Chrome nie pyta ciągle o zgodę.

Autor uzasadnia wybór CLI zamiast MCP czterema argumentami. Działa wszędzie, gdzie agent umie uruchomić powłokę. Daje pełny protokół, a nie ustalony zestaw narzędzi. Nie zajmuje kontekstu opisami dziesiątek narzędzi przez całą sesję. I zapisuje zrzuty do pliku, zamiast wkładać je do modelu, co oszczędza kontekst i omija problem ze zrzutami, które potrafią zepsuć sesję.

Jest tu też opcja pracy w chmurze na Cloudflare Browser Run, z przekazaniem sterowania człowiekowi przy logowaniu, MFA albo CAPTCHA. Jedno zastrzeżenie. Pierwszy tryb pracy każe włączyć zdalne debugowanie w swojej zalogowanej przeglądarce i oddać agentowi dostęp do wszystkich kont. Autor nie omawia tego ryzyka szerzej, a przy wstrzyknięciu promptu przez stronę to realny wektor ataku.

**Key takeaways:**

- Narzędzie nie wymaga MCP, Puppeteera ani Playwrighta, wystarczy Node.js.
- Wyniki trafiają do plików, więc kontekst modelu nie puchnie od zrzutów ekranu.
- Podpięcie zalogowanej przeglądarki daje agentowi dostęp do wszystkich twoich sesji.

**Why do I care:** Jeśli automatyzujesz testy ręczne albo debugujesz z agentem, zwarty snapshot dostępności jest dokładnie tym, czego potrzebujesz zamiast surowego HTML. Uruchamiałbym to jednak na osobnym profilu, a nie na przeglądarce z dostępem do poczty i repozytoriów. Wygoda nie powinna wygrywać z izolacją.

**Link:** [faster-chrome-devtools-skill](https://github.com/zeke/faster-chrome-devtools-skill)
