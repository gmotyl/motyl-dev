---
title: "daily.dev: StyleX kontra Tailwind w erze agentów, złudzenie rozumienia kodu i uzdrowienie frontendu przez Solid 2 i HTMX 4"
excerpt: "Dlaczego niektóre zespoły wracają do StyleX zamiast Tailwinda pod presją agentów AI, co Peter Naur ma wspólnego z vibe codingiem, jak Solid 2 i HTMX 4 rozwiązują asynchroniczność i dlaczego architektura nie powinna zależeć od mody na mikroserwisy."
publishedAt: "2026-09-08"
slug: "daily-dev-stylex-tailwind-codebase-illusions-solid2-htmx4"
hashtags: "#dailydev #frontend #css #tailwind #stylex #architecture #htmx #solidjs #ai #generated #pl"
source_pattern: "daily.dev"
---

## StyleX kontra Tailwind: dlaczego agenty AI zmieniają rachunek zysków i strat

**TLDR:** Coraz więcej zespołów, w tym Polar i sam Meta, wybiera StyleX zamiast Tailwinda właśnie dlatego, że jego typowane, obiektowe podejście do CSS trzyma agenty AI na krótszej smyczy niż luźne stringi klas narzędziowych. Tailwind wciąż wygrywa dzięki ekosystemowi, ale to pierwsza poważna rysa na jego dominacji, która ma konkretne, techniczne uzasadnienie.

**Summary:** Argument nie dotyczy estetyki składni, tylko tego, co się dzieje, kiedy większość kodu stylującego piszą modele językowe zamiast ludzi. Tailwind pozwala LLM-owi wygenerować składniowo poprawny, ale niespójny styl, bo nic w systemie nie wiąże nazwy klasy z zatwierdzoną decyzją projektową, więc drift w stronę losowych odcieni szarości jest łatwy i niewidoczny na pierwszy rzut oka. StyleX odwraca tę relację: obiektowa składnia z typowanymi tokenami projektowymi ogranicza to, co model może w ogóle wyrazić, więc błąd zamienia się w błąd kompilacji, a nie w subtelną niespójność, którą ktoś wyłapie dopiero na produkcji. Przykład z dynamicznymi wartościami dobrze pokazuje różnicę: w Tailwindzie zmieniający się procent szerokości paska postępu zwykle wymaga inline style'u, bo generator klas działa tylko na tym, co znajdzie dosłownie w kodzie, podczas gdy StyleX pozwala zdefiniować funkcję stylu przyjmującą liczbę i interpolować ją wprost w wygenerowanym stylu.

StyleX powstał w Meta przy przebudowie facebook.com, żeby okiełznać CSS w gigantycznej aplikacji z dziesiątkami zespołów bez konfliktujących reguł i bez rozdętego rozmiaru wysyłanego CSS. Open source od końca 2023 roku, dziś standard w Facebooku, Instagramie, WhatsAppie, Messengerze i Threads, a na zewnątrz używają go też Figma i Snowflake. Mimo to Tailwind broni pozycji dzięki ekosystemowi: Shadcn UI, setki gotowych bibliotek komponentów, góra dokumentacji i tutoriali, których StyleX na razie nie ma, choć własny port w stylu Shadcn oraz ponad 170 komponentów design systemu Mety w StyleX już istnieją.

**Key takeaways:**
- StyleX ogranicza możliwy błąd modelu do błędu kompilacji dzięki typowanym tokenom projektowym, Tailwind pozwala na syntaktycznie poprawny, ale niespójny styl.
- StyleX jest standardem w produktach Mety od 2023 roku i używają go też firmy zewnętrzne jak Figma i Snowflake.
- Tailwind broni przewagi dzięki ekosystemowi (Shadcn, biblioteki, dokumentacja), a nie przewadze technicznej samego mechanizmu generowania stylów.

**Why do I care:** Jeśli w waszym zespole coraz większy odsetek commitów CSS-owych powstaje przez agenta, a nie ręcznie, warto policzyć, ile czasu code review pochłania wyłapywanie driftu wizualnego, zanim odrzucicie StyleX jako niszę. To nie jest wybór estetyczny tylko architektoniczny: czy wolicie ograniczyć przestrzeń błędów modelu kosztem trochę cięższej składni, czy zostać przy wygodzie Tailwinda i płacić za to w code review. Na razie ekosystem wciąż przeważa szalę, ale to pierwszy sygnał, że dobór narzędzi stylowania zaczyna być projektowany pod agenty, a nie tylko pod ludzi.

**Link:** [Tailwind CSS vs StyleX: Why People Are Switching](https://daily.dev/posts/3vVlJQTPf)

## Nikt nie rozumie całego swojego kodu i to jest w porządku

**TLDR:** Reakcja na esej kwestionujący tezę Petera Naura o "programowaniu jako budowaniu teorii" argumentuje, że w dużych bazach kodu nikt nie ma pełnego zrozumienia całości, i że to normalny stan rzeczy, a nie porażka. Autor łączy to z przepisywaniem systemów od zera, które prawie zawsze kończy się źle, oraz z pracą agentów AI, które zaczynają każdą sesję z zerowym kontekstem historycznym.

**Summary:** Punktem wyjścia jest teza Naura z lat 80., że oprogramowanie to przede wszystkim teoria w głowach programistów, a kod źródłowy jest tylko jej częściowym, niepełnym zapisem. Materiał reagujący na krytykę tej tezy przyznaje twórcom dużych systemów w big techu rację empiryczną: rzeczywiście nikt nie trzyma w głowie całej teorii systemu liczącego miliony linii, i traktowanie tego jako wstydliwego sekretu tylko szkodzi, bo prowadzi do udawania kompetencji, której nikt nie ma. Stąd prosta, ale niewygodna konsekwencja: przepisania dużych systemów od zera prawie zawsze zawodzą, nie dlatego że zespół jest niekompetentny, tylko dlatego że nagromadzone przez lata przypadki brzegowe i dziwactwa są częścią wymaganej funkcjonalności, nawet jeśli nikt już nie pamięta, po co je dodano.

Ciekawszy wątek pojawia się przy rozróżnieniu "czystej" i "nieczystej" motywacji inżynierskiej, czyli tego, czy ktoś dba o system, bo chce zrozumieć go do końca, czy dlatego że chce dowieźć wynik biznesowy przy akceptowalnym ryzyku. To rozróżnienie ląduje wprost w dyskusji o kodowaniu wspomaganym AI i vibe codingu: skoro nawet doświadczony inżynier nie ma pełnej teorii systemu, to agent AI, który zaczyna każdą sesję z zerowym kontekstem historycznym, nie jest gorszy w jakiejś fundamentalnej kategorii, tylko inny w sposób, który da się zrekompensować dobrą strukturą kodu. Dobrze zorganizowana baza kodu, z jasnymi granicami i czytelnymi konwencjami, kompensuje brak pamięci historycznej zarówno nowemu człowiekowi w zespole, jak i agentowi bez kontekstu z poprzedniej sesji.

**Key takeaways:**
- Nikt w dużych zespołach nie ma pełnej "teorii" całego systemu w rozumieniu Naura, i to normalny stan, a nie porażka do ukrycia.
- Przepisania dużych systemów od zera zawodzą głównie przez nagromadzone przypadki brzegowe, których sens dawno przestał być oczywisty.
- Agent AI bez pamięci historycznej z poprzednich sesji działa produktywnie tylko wtedy, gdy baza kodu ma jasną strukturę kompensującą ten brak kontekstu.

**Why do I care:** To dobre antidotum na poczucie winy, które łapie część zespołów, gdy audyt architektury pokazuje, że nikt nie potrafi wytłumaczyć całego systemu na pamięć. Ważniejsze pytanie brzmi, czy struktura kodu wystarcza, żeby ktoś nowy, człowiek albo agent, odtworzył potrzebny fragment teorii wystarczająco szybko, żeby bezpiecznie wprowadzić zmianę. Jeśli planujecie rewrite dużego systemu, warto zapytać wprost, ile z obecnej złożoności to faktycznie potrzebne przypadki brzegowe, a nie dług, zanim ktoś obieca dowiezienie w kwartał.

**Link:** [Stop Pretending You Understand Your Codebase](https://daily.dev/posts/t6XmmQ6EG)

## Solid 2 i HTMX 4: dwie różne odpowiedzi na to samo pytanie o asynchroniczność

**TLDR:** Solid 2 wbudowuje obsługę promisów wprost w graf reaktywny, automatycznie rozwiązując race conditiony i zastępując Suspense granicą Loading, która nie czyści UI podczas odświeżania. HTMX 4 po ośmiu miesiącach rozwoju przechodzi z XMLHttpRequest na fetch, wprowadza jawne dziedziczenie atrybutów jako breaking change i dorzuca tryb podmiany oparty na DOM-diffingu, który zachowuje fokus i pozycję scrolla.

**Summary:** Solid 2 traktuje wartości asynchroniczne jako pełnoprawnych obywateli grafu reaktywnego, a nie osobny system doklejony obok. Memo może teraz bezpośrednio zwracać promise, a framework sam śledzi, który wynik asynchroniczny należy do bieżącego stanu reaktywnego, więc typowy problem szybkiej zmiany zdjęcia profilowego, gdzie dwa żądania ścigają się o to, które dotrze pierwsze, rozwiązuje się bez ręcznych identyfikatorów żądań, kontrolerów przerwania i osobnych flag ładowania. Loading zastępuje Suspense jako granica, która podczas odświeżania zachowuje istniejący interfejs zamiast go czyścić, a nowy komponent Reveal, następca SuspenseList, koordynuje kolejność pojawiania się wielu asynchronicznych sekcji na stronie, żeby wynik wyglądał jak jedna zaplanowana całość zamiast losowej kolejności wyskakujących elementów. Do tego dochodzi przeprojektowanie efektów, które rozdziela śledzenie zależności od efektów ubocznych, oraz batchowanie aktualizacji przez mikrotaski z ręcznym wyjściem awaryjnym do natychmiastowego flush.

HTMX 4 idzie inną drogą, bo to wciąż narzędzie server-driven, nie framework reaktywny, ale zmiany są równie fundamentalne na swoim poziomie. Migracja z XMLHttpRequest na fetch to wewnętrzna przebudowa, ale jawne dziedziczenie atrybutów to realny breaking change względem HTMX 2, gdzie pewne atrybuty na rodzicu automatycznie działały na potomkach na wzór dziedziczenia w CSS, co utrudniało śledzenie, skąd bierze się zachowanie w większych szablonach. Nowy tryb podmiany oparty na DOM-diffingu zachowuje fokus i pozycję scrolla, czego brakowało w prostszych trybach podmiany całych fragmentów, a nowy element hx-partial pozwala zaktualizować wiele regionów strony jedną odpowiedzią serwera zamiast wielu osobnych żądań. Rozszerzone wsparcie dla streamingu przez SSE, WebSockety i odpowiedzi multipart domyka obraz frameworka, który bierze na poważnie wszystko to, co wcześniej wymagało doklejania JavaScriptu obok.

**Key takeaways:**
- Solid 2 rozwiązuje race conditiony między współbieżnymi żądaniami automatycznie, bez ręcznych ID żądań i abort controllerów.
- Reveal w Solid 2 koordynuje kolejność pojawiania się asynchronicznych sekcji strony, zastępując SuspenseList.
- HTMX 4 wymaga jawnego dziedziczenia atrybutów (breaking change) i dodaje DOM-diffing zachowujący fokus oraz scroll przy podmianie treści.
- hx-partial w HTMX 4 pozwala zaktualizować kilka regionów strony jedną odpowiedzią serwera.

**Why do I care:** Jeśli macie w kodzie ręcznie pisane abort controllery i flagi ładowania do walki z race conditionami, model asynchroniczności Solid 2 jest wart śledzenia jako wzorzec do skopiowania, nawet jeśli nie migrujecie frameworka. Zespoły siedzące na HTMX powinny zaplanować czas na przegląd szablonów pod kątem jawnego dziedziczenia atrybutów przed upgrade'em, bo to nie jest zmiana kosmetyczna, tylko coś, co może cicho popsuć zachowanie w głębiej zagnieżdżonych komponentach.

**Link:** [Web dev is finally healing](https://daily.dev/posts/ZgtiuTZNQ)

## Pragmatyczna architektura: kompas zamiast mody na mikroserwisy czy monolit

**TLDR:** Decyzje architektoniczne powinny wynikać z rzeczywistych potrzeb operacyjnych systemu, a nie z aktualnego trendu, czy to "microservices-first", czy z obecnego odwrotu w stronę monolitu. Na konkretnym przykładzie pięciu serwisów autor pokazuje, kiedy podział jest uzasadniony, a kiedy prowadzi do rozproszonego monolitu.

**Summary:** Przykładem jest system złożony z czterech adapterów i jednego serwisu domenowego, gdzie różne profile ruchu, ryzyko zewnętrznych zależności i potrzeba izolacji promienia awarii uzasadniały fizyczny podział na osobne serwisy. To nie była decyzja podjęta z góry według szablonu, tylko wynik analizy tego, co faktycznie różni się między poszczególnymi częściami systemu pod względem obciążenia i ryzyka. Autor przestrzega przed najczęstszym błędem po drugiej stronie tej samej monety: dzieleniem systemu według rzeczowników, czyli tworzeniem osobnego serwisu dla każdej encji domenowej bez sprawdzenia, czy rzeczywiście ma ona inny profil operacyjny niż reszta, co w praktyce daje rozproszony monolit, gorszy od zwykłego monolitu, bo dochodzi jeszcze koszt sieci i deploymentu.

Ostatni akapit dodaje warstwę aktualną dla 2026 roku: agenty kodujące AI sprawiają, że postawienie kolejnego serwisu jest dziś praktycznie darmowe pod względem czasu pisania kodu, więc pokusa nadmiernej dekompozycji rośnie, a nie maleje. To jednak nie zdejmuje z architekta odpowiedzialności za faktyczny osąd dotyczący granic, skalowania i izolacji awarii, bo koszt złej decyzji przenosi się z czasu implementacji na czas utrzymania, gdzie agent już nie pomoże tak łatwo.

**Key takeaways:**
- Podział na serwisy uzasadniają różnice w profilu ruchu, ryzyku zależności zewnętrznych i potrzebie izolacji awarii, nie sam fakt istnienia osobnej encji.
- Dzielenie systemu według rzeczowników domenowych bez analizy operacyjnej prowadzi do rozproszonego monolitu.
- Tanie tworzenie kodu serwisów dzięki agentom AI zwiększa pokusę nadmiernej dekompozycji, nie usprawiedliwia jej.

**Why do I care:** To dobry test na własny zespół: czy potraficie wskazać konkretny profil ruchu albo ryzyko, które uzasadnia każdy istniejący serwis, czy większość podziałów powstała, bo "tak się robi mikroserwisy". W erze, gdy agent AI potrafi w kilka minut wystawić nowy serwis z pełnym CI/CD, presja żeby dzielić system rośnie szybciej niż presja żeby to uzasadnić, więc rola architekta przesuwa się bardziej w stronę pilnowania granic niż pisania kodu.

**Link:** [Pragmatic Architecture: Finding Your Architectural Compass](https://daily.dev/posts/8RYx9YW8I)
