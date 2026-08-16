---
title: "Mapa umiejętności AI inżyniera od Andrew Nga i tydzień pełen niespodzianek: dane za rabat, roboty z nogami i chatbot na złamane serce"
excerpt: "Andrew Ng publikuje mapę czterech kluczowych umiejętności AI engineeringu, Meta kusi tańszym coding agentem w zamian za dane treningowe, Google uczy humanoidalne roboty chodzić i chwytać jednym modelem, MiniMax wypuszcza otwarty model wideo z zaskakującymi ograniczeniami terytorialnymi, a badacze pokazują, że jedna rozmowa z chatbotem potrafi złagodzić ból po rozstaniu."
publishedAt: "2026-08-14"
slug: "mapa-umiejetnosci-ai-engineering-i-nowosci-tygodnia"
hashtags: "#thebatch #ai #codingagents #robotics #videogeneration #llm #generated #pl"
---

## Cztery umiejętności, które faktycznie się liczą w AI engineeringu

**TLDR:** Andrew Ng przeanalizował ponad 10 tysięcy ofert pracy i przeprowadził dziesiątki wywiadów, żeby wyłonić cztery fundamentalne umiejętności AI engineeringu: budowanie i wdrażanie aplikacji AI, solidne podstawy inżynierii oprogramowania, sprawne korzystanie z agentów kodujących oraz umiejętność kształtowania samego zadania, a nie tylko jego implementacji. To nie jest lista modnych narzędzi, tylko próba odpowiedzi na pytanie, czego uczyć się w perspektywie kilku lat, nie kilku miesięcy.

Ng zaczyna od rozróżnienia, które wielu osobom umyka: nie chodzi o rolę "AI Engineera", tylko o zestaw umiejętności, których będzie potrzebował każdy programista, tak jak dziś każdy programista musi ogarniać podstawy chmury, mimo że tylko część z nich ma to w tytule stanowiska. Pierwsza umiejętność, budowanie i wdrażanie aplikacji AI, sprowadza się do świadomości, że wyniki modeli są z natury nieprzewidywalne, więc trzeba umieć mierzyć, sterować i ograniczać tę nieprzewidywalność przez ewaluacje i analizę błędów. Druga, podstawy inżynierii oprogramowania, brzmi jak truizm, ale Ng trafnie zauważa, że to właśnie brak tych podstaw sprawia, że ktoś "vibe koduje" rozwiązanie bez świadomości kompromisów, jakie po cichu robi za niego agent. Trzecia umiejętność to praca z agentami kodującymi: wiedza, kiedy zostawić agenta samego, a kiedy wejść z korektą, jak zarządzać kontekstem i jak układać zadania tak, by agent mógł je domknąć bez nadzoru. Czwarta, najciekawsza moim zdaniem, to "kształtowanie builda", czyli przesunięcie roli inżyniera z realizatora gotowej specyfikacji w stronę osoby, która tę specyfikację współtworzy, rozumiejąc kontekst biznesowy i potrzeby użytkownika.

**Key takeaways:**
- Cztery umiejętności to: budowa i wdrażanie aplikacji AI, fundamenty inżynierii oprogramowania, sprawne sterowanie agentami kodującymi i współtworzenie specyfikacji zadania.
- Analiza opiera się na ponad 10 tysiącach ofert pracy oraz wywiadach z ekspertami, rekruterami i menedżerami zatrudniającymi.
- Ng planuje rozwijać ten materiał w kolejnych listach i zaprasza społeczność do wypełnienia ankiety współtworzącej mapę.

**Why do I care:** Z perspektywy kogoś, kto od lat układa architekturę frontendową i doradza zespołom, ten podział trafia w sedno tego, co obserwuję na co dzień. Najsłabszym ogniwem w zespołach korzystających z agentów kodujących nie jest brak dostępu do narzędzi, tylko brak solidnych fundamentów inżynierskich, które pozwalają ocenić, czy sugestia agenta w ogóle ma sens. Czwarty punkt, kształtowanie builda, to dokładnie to, czego uczę architektów: jeśli potrafisz tylko implementować cudzy pomysł, agent kodujący prędzej czy później zrobi to szybciej i taniej od ciebie. Wartość dodana przesuwa się w stronę osób, które potrafią zadać właściwe pytanie, zanim padnie pierwsza linijka kodu.

## Meta oferuje tańszy coding agent w zamian za twój kod

**TLDR:** Meta wypuściła Muse Code, terminalowego agenta kodującego, oraz model Muse Spark 1.2, który go napędza. Firma oferuje dwie stawki cenowe: standardową i znacznie tańszą "contributor tier", w zamian za zgodę na trenowanie modelu na promptach i wynikach użytkownika.

Muse Spark 1.2 sam w sobie robi wrażenie kosztowo, wypadając blisko czołówki rankingów Artificial Analysis i zajmując pierwsze miejsce w teście Vals AI Finance Agent v2, przy koszcie zadania kilkukrotnie niższym niż konkurenci pokroju Claude Opus czy GPT-5.6 Sol. Ciekawsza od samych liczb jest architektura Muse Code: główny agent deleguje pracę do subagentów, które nie znikają po zakończeniu zadania, tylko trwają przez cały czas sesji i pracują równolegle w osobnych kopiach repozytorium (worktrees), dzięki czemu nie muszą za każdym razem na nowo poznawać kodu. Agent zapisuje też każdy krok, wywołanie modelu i edycję pliku do logu, więc po awarii wraca dokładnie tam, gdzie skończył, zamiast zaczynać od zera. To rozwiązuje realny problem długich, wieloetapowych zadań agentowych, które dziś często się gubią po restarcie.

Prawdziwa historia jest jednak w cenniku. Standardowa stawka to 1,25 dolara za milion tokenów wejściowych i 4,25 za wyjściowe, bez trenowania na danych użytkownika. Stawka "contributor" schodzi do 0,10 i 0,20 dolara, czyli poniżej cen OpenAI czy DeepSeeka, ale w zamian Meta zyskuje prawo do uczenia się na każdym repozytorium i każdej sesji przepuszczonej przez agenta. Limit żądań na minutę dla tej stawki jest przy tym wyraźnie niższy, co w praktyce kieruje ją do pojedynczych deweloperów i małych zespołów, czyli grup najmniej skłonnych czytać regulamin linijka po linijce.

**Key takeaways:**
- Muse Code to terminalowy agent kodujący z trwałymi subagentami działającymi równolegle w osobnych worktrees.
- Muse Spark 1.2 wypada blisko czołówki rankingów przy wyraźnie niższym koszcie za zadanie niż konkurenci.
- Tańsza stawka "contributor" oznacza zgodę na trenowanie modelu na kodzie i sesjach użytkownika, z niższym limitem żądań na minutę.

**Why do I care:** Jako ktoś, kto ocenia ryzyko dla klientów korporacyjnych, patrzę na ten model cenowy z podejrzliwością, jakiej nie budzi żaden benchmark. Meta w praktyce sprzedaje dwie różne umowy pod tą samą nazwą produktu, a wybór między nimi sprowadza się do wpisania innej nazwy modelu, bez podpisywania żadnego dodatkowego dokumentu. Dla freelancera czy małego startupu tania stawka może wyglądać jak okazja, dopóki nie policzy realnej wartości kodu, który oddaje w zamian, zwłaszcza jeśli w tym repozytorium leży całe know-how firmy. Rekomendowałbym każdemu zespołowi jasną politykę, który tier wolno używać do jakich projektów, zanim ktoś z zespołu podejmie tę decyzję przypadkiem, klikając w zły model.

## Google uczy jeden model chodzić, kucać i chwytać żarówkę

**TLDR:** Gemini Robotics 2 to pierwszy model z rodziny Google, który steruje nogami, torsem, ramionami i dłońmi humanoidalnego robota z jednego zestawu wag, zamiast osobnych modeli do każdej części ciała. Wyniki są solidne, ale dalekie od ideału, a sam Google przyznaje, że żaden system, łącznie z jego własnym, nie potrafi jednocześnie unikać niepotrzebnych zatrzymań i wyłapywać każde zagrożenie dla człowieka w pobliżu.

Największą nowością nie są same liczby skuteczności, tylko fakt, że jeden checkpoint obsługuje trzy różne konfiguracje sprzętowe: humanoida Apollo 2 z dłońmi Sharpa, tego samego Apollo 2 z dłońmi Inspire, oraz ramię Franka Duo z prostym chwytakiem Robotiq. To dzięki mechanizmowi transferu ruchu, który trenuje jeden model na danych zebranych z robotów o różnych kształtach, czujnikach i liczbie stopni swobody, dzięki czemu dane z jednej maszyny stają się użytecznym materiałem uczącym dla zupełnie innej. Wyniki wahają się mocno w zależności od zadania: od 92 procent skuteczności przy odkręcaniu żarówki po zaledwie 36 procent przy jej wkręcaniu, bo ustawienie żarówki w gnieździe wymaga dużo precyzyjniejszej koordynacji niż sam chwyt i obrót. Google testuje wszystko na własnym sprzęcie i własnych zadaniach, więc te liczby trzeba traktować jako punkt odniesienia firmy do samej siebie, nie jako niezależny benchmark.

Ciekawy i uczciwy jest fragment o bezpieczeństwie: Google wprowadził benchmark ASIMOV-Agentic i sam przyznał, że żaden testowany system nie potrafi jednocześnie utrzymać liczby fałszywych alarmów poniżej 5 procent i wykrywać ponad 60 procent sytuacji, w których człowiek znajduje się zbyt blisko robota. To rzadka szczerość w komunikacie prasowym, i firma otwarcie rekomenduje traktowanie tych modeli jako uzupełnienie, nie zamiennik, fizycznych zabezpieczeń.

**Key takeaways:**
- Jeden checkpoint Gemini Robotics 2 steruje trzema różnymi konfiguracjami sprzętowymi robotów, w tym nogami i dłońmi.
- Wyniki różnią się drastycznie zależnie od zadania, od 92 procent przy prostych chwytach po 32-36 procent przy zadaniach wymagających precyzji.
- Google przyznaje, że żaden testowany model, także jego własny, nie radzi sobie równocześnie z unikaniem fałszywych alarmów i wykrywaniem realnych zagrożeń dla ludzi.

**Why do I care:** Transfer ruchu między różnymi konfiguracjami sprzętowymi to dokładnie ten sam wzorzec, który znamy z transferu wiedzy w modelach językowych, tylko przeniesiony na fizyczny świat, gdzie błąd oznacza uszkodzony sprzęt albo, gorzej, kontuzję. Jako architekt systemów zwracam uwagę na jedną rzecz: Google testuje swój produkt na swoich zasadach i nikt zewnętrzny tego jeszcze nie zweryfikował, więc entuzjazm trzeba trzymać na wodzy, dopóki nie pojawią się niezależne testy. Fragment o bezpieczeństwie jest jednak wart pochwały, bo firma nie chowa słabości pod dywan, tylko wprost mówi, gdzie technologia jeszcze zawodzi, co w branży robotyki zdarza się rzadziej, niż powinno.

## MiniMax wypuszcza czołowy model wideo, ale nie każdemu

**TLDR:** MiniMax H3 to model generowania i edycji wideo w wysokiej rozdzielczości, który zajmuje pierwsze miejsce w rankingu edycji wideo Artificial Analysis, jednak jego licencja wymaga od użytkowników w USA, Wielkiej Brytanii, Unii Europejskiej i Korei Południowej składania osobnego wniosku o zgodę na korzystanie z modelu.

Architektura H3 składa się z trzech modułów: systemu przetwarzania kontekstu, głównego modelu generującego wideo i audio, oraz osobnego modułu podbijającego rozdzielczość do 2K. Tylko środkowy moduł jest udostępniony do pobrania, reszta pozostaje zamknięta, co samo w sobie już podważa hasło "open weights" używane w komunikacji marketingowej. Model przyjmuje na wejściu do dwunastu plików różnych typów naraz, w tym obrazy, audio i wideo, i potrafi łączyć je w jedną scenę na podstawie instrukcji tekstowej, na przykład zaczynając od jednego zdjęcia, przejmując ruch kamery z dwóch filmów i ścieżkę dźwiękową z trzeciego. Licencja zabrania destylowania innych modeli na podstawie wyników H3 i wymaga wyraźnego oznaczenia nazwy modelu w produktach komercyjnych, co jest standardową klauzulą w tej branży. Nietypowe jest za to wykluczenie całych regionów geograficznych, zmuszające deweloperów z bogatszych rynków do dodatkowej weryfikacji, podczas gdy reszta świata korzysta bez przeszkód.

Pod względem jakości wyników H3 rzeczywiście robi wrażenie i plasuje się w ścisłej czołówce obok Gemini Omni Flash od Google i Seedance 2.0 od Bytedance, co przy darmowych wagach bazowego modułu jest atrakcyjną ofertą dla większości świata. Sam fakt, że firma zdecydowała się trenować model na "prawdziwych, naturalnych danych" zamiast syntetycznych, tłumaczy częściowo, dlaczego rezultaty wyglądają spójniej niż u części konkurencji korzystającej z generowanych transkryptów wideo.

**Key takeaways:**
- H3 zajmuje pierwsze miejsce w rankingu edycji wideo i mieści się w ścisłej czołówce w generowaniu tekst-na-wideo i obraz-na-wideo.
- Tylko środkowy z trzech modułów architektury jest udostępniony publicznie, reszta pozostaje zamknięta mimo etykiety "open weights".
- Licencja wymaga dodatkowej zgody od użytkowników z USA, Wielkiej Brytanii, Unii Europejskiej i Korei Południowej, co jest rzadkim i kontrowersyjnym ograniczeniem geograficznym.

**Why do I care:** Nazywanie czegoś modelem otwartym, podczas gdy dwa z trzech kluczowych komponentów pozostają zamknięte, a dodatkowo cztery duże rynki muszą przejść osobną procedurę zgody, to erozja samego pojęcia "open weights", które dotąd oznaczało po prostu możliwość pobrania i uruchomienia modelu bez pytania nikogo o pozwolenie. Dla zespołów planujących produkty oparte o generowanie wideo oznacza to konieczność czytania licencji równie uważnie jak dokumentacji technicznej, bo pozornie darmowy model może w praktyce wymagać miesięcy oczekiwania na zgodę regulacyjną, zanim trafi do produkcji w Europie czy USA.

## Jedna rozmowa z chatbotem potrafi złagodzić ból po rozstaniu

**TLDR:** Naukowcy z Politechniki Monachijskiej i Uniwersytetu Cambridge zbudowali aplikację czatową o nazwie overit, opartą na Claude Sonnet 4.5, która w jednej dwudziestominutowej rozmowie znacząco obniżała poziom cierpienia po rozstaniu w porównaniu do grupy kontrolnej, i efekt utrzymywał się przez co najmniej miesiąc.

Cały koncept opiera się na teorii rekonsolidacji pamięci: przywołanie bolesnego wspomnienia, nazwanie ograniczającego przekonania na jego temat, a następnie zaproponowanie interpretacji, która to przekonanie podważa, może trwale zmienić sposób, w jaki dana osoba przechowuje tę pamięć. Aplikacja prowadziła użytkownika przez cztery fazy rozmowy: pytania otwarte o samo rozstanie, identyfikację ograniczającego przekonania, zaproponowanie alternatywnej interpretacji, i na końcu podsumowanie tego, czego użytkownik się nauczył. To, co uważam za najciekawsze technicznie, to sposób sterowania modelem: przy każdej wypowiedzi użytkownika model najpierw oceniał, na jakim etapie znajduje się rozmowa, sprawdzając trzy ostatnie tury pod kątem pięciu konkretnych kamieni milowych, a dopiero potem generował właściwą odpowiedź. Rozdzielenie oceny stanu rozmowy od generowania treści to prosty, ale skuteczny sposób na obejście typowej sycophancji modeli językowych, czyli tendencji do bezkrytycznego przytakiwania użytkownikowi.

W randomizowanym badaniu z 171 uczestnikami z USA i Wielkiej Brytanii grupa korzystająca z aplikacji odnotowała spadek wskaźnika cierpienia z 35,3 do 26,6 punktu po tygodniu, podczas gdy grupa kontrolna spadła z 35,9 zaledwie do 32,2. Po miesiącu różnica wciąż była widoczna. Prawie 62 procent użytkowników aplikacji zgłosiło doświadczenie "nagłego olśnienia" na temat swojego rozstania, w porównaniu do niespełna 20 procent w grupie kontrolnej.

**Key takeaways:**
- Aplikacja overit, oparta na Claude Sonnet 4.5, prowadzi użytkownika przez cztery fazy rozmowy opartej na teorii rekonsolidacji pamięci.
- Model najpierw ocenia stan rozmowy względem pięciu kamieni milowych, a dopiero potem generuje odpowiedź, co ogranicza sycophancję.
- W badaniu z 171 uczestnikami jedna dwudziestominutowa rozmowa dała istotnie większy spadek cierpienia niż brak interwencji, efekt utrzymywał się miesiąc.

**Why do I care:** To jeden z niewielu przykładów wykorzystania LLM-ów w kontekście emocjonalnym, gdzie architektura promptu, a nie sama moc modelu, robi całą robotę. Wzorzec "najpierw oceń stan, potem generuj odpowiedź" da się przenieść do zupełnie innych domen, na przykład do agentów wspierających onboarding użytkowników albo prowadzących złożone procesy sprzedażowe, gdzie zbyt uległy model psuje efekt równie łatwo jak w terapii. Trzymałbym się jednak ostrożnego entuzjazmu: 171 uczestników i jedna sesja to za mało, żeby wyciągać wnioski o bezpieczeństwie takich narzędzi w trudniejszych, bardziej ryzykownych przypadkach niż rozstanie, ale sam pomysł rozdzielenia oceny i generowania zasługuje na uwagę każdego, kto projektuje agentowe przepływy konwersacyjne.
