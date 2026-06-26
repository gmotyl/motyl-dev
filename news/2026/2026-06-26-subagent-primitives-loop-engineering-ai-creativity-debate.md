---
title: "Prymitywy subagentów, inżynieria pętli i debata o kreatywności AI"
excerpt: "Przegląd artykułów z HackerNoon obejmujący architekturę agentów AI, koniec inżynierii promptów, skupienie jako projektowanie środowiska, PowerShell i Markdown jako nieoczekiwane duo, oraz krytyczne spojrzenie na kontrowersje AI wokół A24."
publishedAt: "2026-06-25"
slug: "subagent-primitives-loop-engineering-ai-creativity-debate"
hashtags: "#HackerNoon #agents #architecture #typescript #powershell #productivity #llm-ops #generated #pl"
source_pattern: "HackerNoon"
---

## Wyścig o właściwy prymityw subagenta

**TLDR:** Subagenty stają się jednym z najważniejszych prymitywów w systemach agentowych, ale nie ma jeszcze konsensusu co do ich poprawnej implementacji. Każdy buduje je inaczej i to właśnie ta fragmentaryczność jest głównym problemem.

**Podsumowanie:** Gdy zaczynasz budować agenty wykonujące realne zadania, szybko odkrywasz, że pojedynczy agent przetwarzający zadania w pętli to nie jest architektura, której szukasz. Potrzebujesz kompozycyjnych, wyspecjalizowanych subagentów, którymi koordynator może dysponować. W teorii brzmi to czysto. W praktyce każdy większy framework i każda platforma agentowa podchodzi do tego inaczej. Claude Code robi to w jeden sposób. LangGraph w inny. CrewAI ma własne podejście. Nie ma wspólnego prymitywu, standardowego interfejsu ani uzgodnionego protokołu komunikacji między agentem nadrzędnym a jego podrzędnymi.

Autor piszący pod pseudonimem @anson stawia tezę, którą uważam za naprawdę istotną: ponieważ narzędzia do subagentów są tak rozproszone, orkiestratory nie mogą zakładać niczego na temat zachowania swoich subagentów. Nie można polegać na spójnym przekazywaniu okna kontekstu, spójnym raportowaniu błędów ani spójnej semantyce anulowania. To nie jest tylko problem z doświadczeniem programisty, to problem architektoniczny, który nasila się wraz ze skalą systemu.

Artykuł omija jednak trudniejsze pytanie, czy standaryzacja jest w ogóle pożądana na tym etapie. Różnorodność implementacji może być zdrowa. Różne przypadki użycia mają radykalnie odmienną tolerancję na opóźnienia, wymagania dotyczące kontekstu i tryby awarii. Prymityw subagenta dopasowany do wszystkich mógłby zbyt wcześnie utrwalić błędną abstrakcję. Z drugiej strony brak jakiejkolwiek historii interoperacyjności to realny koszt, z którym branża będzie musiała się zmierzyć.

Warto zauważyć, że autorzy artykułu opisują "harness engineering" jako odrębną dyscyplinę. Przez lata rozmawialiśmy o inżynierii promptów jako samodzielnej umiejętności. Teraz jesteśmy już za tym etapem, rozmawiamy o inżynierii strukturalnej systemów uruchamiających prompty. To postęp, nawet jeśli wiąże się z nową złożonością.

**Kluczowe wnioski:**
- Implementacje subagentów znacznie różnią się między frameworkami, co dziś niemal uniemożliwia interoperacyjność
- Brak standardowego prymitywu oznacza, że orkiestratory muszą defensywnie uwzględniać różne zachowania agentów
- Harness engineering, czyli dyscyplina projektowania rusztowania wokół wywołań LLM, staje się własną specjalnością
- Fragmentaryczność może być zbyt wcześnie, by ją naprawić, ale koszt jej ignorowania rośnie wraz ze złożonością systemu

**Dlaczego mnie to interesuje:** Jako osoba dużo myśląca o architekturze systemów, właśnie tej rozmowy oczekuję od branży. Przez 18 miesięcy obsesyjnie skupialiśmy się na tym, który model wywoływać. Prawdziwa dźwignia leży teraz w tym, jak strukturyzować te wywołania, jak kierować awariami, jak łączyć kontekst między agentami bez wysadzania budżetu tokenowego. Projektowanie subagentów to miejsce, w którym systemy agentowe stają się albo niezawodne, albo zamieniają się w bałagan logiki ponownych prób i cichych awarii.

**Link:** [The Race to Build the Right Subagent Primitive](https://hackernoon.com/the-race-to-build-the-right-subagent-primitive)

---

## Inżynieria promptów umarła. Niech żyje inżynieria pętli

**TLDR:** Inżynieria promptów jako samodzielna umiejętność jest zastępowana przez inżynierię pętli, czyli praktykę projektowania przepływu sterowania, pętli zwrotnych i strategii ponownych prób otaczających wywołania LLM. Autor przekonuje, że to właśnie tutaj leży dziś prawdziwa dźwignia.

**Podsumowanie:** Roma Armstrong, piszący z perspektywy architekta AI, stawia tezę, która może irytować niektórych: era starannie opracowanych jednorazowych promptów dobiegła końca. Nie dlatego, że prompty nie mają znaczenia, ale dlatego, że są teraz tylko jednym węzłem w większym systemie. Liczy się to, jak strukturyzujesz pętlę wokół tego węzła.

Argument jest taki, że systemy agentowe to systemy sprzężenia zwrotnego. Wysyłasz prompt, dostajesz odpowiedź, oceniasz tę odpowiedź, decydujesz, co zrobić dalej. Jakość tej logiki decyzyjnej, warunki, w których ponawiasz próbę, przekierowujesz, eskalujesz lub kończysz, determinuje niezawodność systemu znacznie bardziej niż sformułowanie jakiegokolwiek pojedynczego promptu. Armstrong nazywa to inżynierią pętli i uważam, że sformułowanie jest trafne, nawet jeśli nazwa jest nieco świeża.

Czego artykuł nie mówi wystarczająco głośno, to że inżynieria pętli to po prostu inżynieria przepływu sterowania zastosowana do systemów probabilistycznych. Programiści, którzy pisali logikę ponownych prób, circuit breakery lub maszyny stanów, znają już większość tego, czego wymaga inżynieria pętli. Nowatorskimi elementami są obsługa wrodzonej niedeterministyczności wyników LLM oraz zarządzanie kontekstem między iteracjami bez nadmiernego rozbudowywania promptu.

Artykuł jest uczciwy w jednej niekomfortowej kwestii: większość osób budujących dziś systemy agentowe nie uprawia inżynierii pętli celowo. Robi to przypadkowo, dodając ponowne próby i gałęzie warunkowe w miarę postępów, bez żadnej zasadniczej struktury. To produkuje systemy działające na demonstracjach i rozpadające się w produkcji.

**Kluczowe wnioski:**
- Jakość promptu ma mniejsze znaczenie niż przepływ sterowania otaczający wywołania LLM
- Inżynieria pętli oznacza projektowanie jawnych pętli zwrotnych, ewaluacji i logiki rozgałęzień dla systemów agentowych
- Większość programistów już robi ad-hoc inżynierię pętli, nie zdając sobie z tego sprawy
- Niedeterministyczność to fundamentalne wyzwanie odróżniające inżynierię pętli od klasycznego przepływu sterowania

**Dlaczego mnie to interesuje:** To bezpośrednio mapuje się na mój sposób myślenia o budowaniu niezawodnych narzędzi. Systemy, które przetrwały produkcję, to nie te z najlepszymi promptami, ale te, w których ktoś starannie przemyślał, co się dzieje, gdy model daje coś nieoczekiwanego, a to zawsze nastąpi. Jeśli budujesz cokolwiek agentowego, przeczytaj ten artykuł, a potem sprawdź swoją logikę ponownych prób i zapytaj siebie, czy ją zaprojektowałeś, czy po prostu nagromadziłeś.

**Link:** [Prompt Engineering Is Dead. Long Live Loop Engineering](https://hackernoon.com/prompt-engineering-is-dead-long-live-loop-engineering-or-fractera-blog)

---

## Są dwa sposoby na ulepszenie czegoś

**TLDR:** Każda strategia ulepszania należy do jednego z dwóch obozów: przyrostowej iteracji lub radykalnej wymiany. Matt Trifiro przekonuje, że to nie są po prostu różne prędkości, ale fundamentalnie niekompatybilne podejścia wymagające odmiennego zaangażowania organizacyjnego.

**Podsumowanie:** Matt Trifiro, redaktor The Intent Layer, zaczyna od pozornie prostej obserwacji: są dwa sposoby na ulepszenie czegoś i nie lubią się ze sobą. Jeden to iteracja, wzięcie tego, co istnieje, i stopniowe ulepszanie. Drugi to zastąpienie, wychodzenie od innych założeń i budowanie czegoś nowego. Obydwa kosztują więcej niż nierobienie niczego, ale niosą zupełnie inne profile ryzyka, a traktowanie ich zamiennie to kosztowny błąd.

Ścieżka iteracji jest bezpieczna w tym sensie, że zawsze masz działający system. Nigdy nie zaczynasz od zera. Pętle zwrotne są ciasne. Ale iteracja jest też ograniczona przez oryginalne decyzje projektowe wbudowane w to, od czego zacząłeś. Możesz bez końca optymalizować powóz i nigdy nie dostaniesz samochodu. Ścieżka wymiany usuwa to ograniczenie. Pozwala przemyśleć założenia. Ale wprowadza realne ryzyko zbudowania czegoś, co nie działa, nie zostaje zaadoptowane lub rozwiązuje niewłaściwy problem.

To, co uważam za przenikliwe w tym artykule, to implikacje organizacyjne. Firmy domyślnie wybierają iterację, bo wydaje się odpowiedzialna. Jest mierzalna, odwracalna i nie wymaga przyznania, że obecna rzecz jest fundamentalnie ograniczona. Zastąpienie wymaga kogoś z wystarczającym autorytetem, by powiedzieć, że obecny kierunek to sufit, nie podłoga. Ta rozmowa jest politycznie trudniejsza niż jakiekolwiek wyzwanie techniczne.

Artykuł nie poświęca wystarczająco dużo miejsca trzeciej opcji, czyli wiedzy, kiedy nie robić ani jednego, ani drugiego. Czasem właściwym ruchem jest zaprzestanie ulepszania czegoś i pozwolenie mu umrzeć. Ale dwuścieżkowy framework jest nadal użyteczną funkcją wymuszającą dla zespołów, które utknęły.

**Kluczowe wnioski:**
- Iteracja i zastąpienie to nie ten sam rodzaj zakładu, a mylenie ich prowadzi do źle przydzielonych wysiłków
- Iteracja jest ograniczona przez oryginalne założenia projektowe, zastąpienie usuwa te granice, ale dodaje ryzyko wykonania
- Organizacje domyślnie wybierają iterację, bo jest politycznie bezpieczniejsza, a nie dlatego, że jest strategicznie słuszna
- Wybór między nimi wymaga uczciwej oceny, czy istniejące założenia stanowią sufit

**Dlaczego mnie to interesuje:** Każda duża frontendowa baza kodu, z którą pracowałem, w końcu napotykała dokładnie tę decyzję. Czy migrować bibliotekę komponentów przyrostowo, czy wysadzić ją w powietrze i przebudować przy użyciu aktualnych wzorców? Zespoły, które to zrobiły dobrze, to te, które nazwały decyzję wprost i dokonały świadomego wyboru. Te, które zrobiły to źle, to te, które kontynuowały iterację poza punkt, w którym iteracja mogła jeszcze pomóc.

**Link:** [There Are Two Ways To Make Something Better](https://hackernoon.com/there-are-two-ways-to-make-something-better)

---

## Sprzeciw wobec AI w A24 to stary twórczy argument w nowych szatach

**TLDR:** Kiedy A24 użyło AI do wspomagania storyboardingu, środowisko twórcze zareagowało ostrą krytyką. Vanna W przekonuje, że ta reakcja nie jest nowa, to ten sam argument, który pojawiał się, gdy fotografia zagrażała malarstwu, gdy cyfrowa edycja zagrażała filmowi i gdy sampling zagrażał kompozycji.

**Podsumowanie:** Vanna W, Developer Relations Engineer w IBM, przyjmuje celowo historyczną perspektywę na kontrowersje wokół A24. Studio filmowe podobno użyło storyboardów generowanych przez AI w swoim procesie produkcyjnym, a reakcja części środowiska twórczego była ostra. Teza autora jest taka, że emocjonalna struktura tego sprzeciwu jest identyczna z dziesiątkami wcześniejszych sporów o technologię twórczą.

Fotografia nie zabiła malarstwa. Zmieniła to, do czego malarstwo służy. Cyfrowe stacje robocze do nagrywania dźwięku nie zabiły muzyków. Zmieniły to, jak wyglądało muzykostwo. Za każdym razem początkową reakcją było to, że maszyny zastępują ludzki osąd, że automatyzowana rzecz to ta, która niesie prawdziwą wartość. I za każdym razem argument ostatecznie rozwiązywał się nie przez zwycięstwo jednej strony, ale przez zmianę definicji rzemiosła.

To, co artykuł dobrze obsługuje, to rozróżnienie między używaniem AI jako narzędzia w procesie twórczym a używaniem AI do zastąpienia osądu, który nadaje twórczym decyzjom sens. Storyboarding to konkretna umiejętność, ale to też narzędzie do myślenia. Storyboard jest sposobem, w jaki reżyser eksternalizuje swoje przestrzenne rozumowanie o scenie. Jeśli AI może wygenerować wstępny storyboard szybciej niż człowiek, pytanie nie brzmi, czy to oszustwo. Pytanie brzmi, czy reżyser nadal wykonuje myślenie, czy akceptuje wynik AI jako substytut.

Autor nie rozwiązuje tego w pełni i nie jestem pewien, czy da się to rozwiązać w abstrakcji. Kontekst ma znaczenie. Kto podejmuje twórcze decyzje i co zleca na zewnątrz? To są prawdziwe pytania i nie mają uniwersalnych odpowiedzi.

**Kluczowe wnioski:**
- Twórczy sprzeciw wobec AI podąża za dobrze ugruntowanym historycznym wzorcem widocznym przy każdej ważnej technologii twórczej
- Istotne pytanie nie brzmi, czy AI jest używane, ale czy ludzki osąd twórczy pozostaje w pętli
- Definicje rzemiosła zmieniają się w czasie w odpowiedzi na nowe narzędzia, to nie jest porażka dziedziny
- Sytuacja A24 uwypukla, że transparentność procesu ma takie samo znaczenie jak same narzędzia

**Dlaczego mnie to interesuje:** Jako osoba budująca narzędzia dla programistów, myślę o tym stale. Jest wersja programowania wspomaganego AI, w której programista nadal myśli, podejmuje decyzje architektoniczne, rozumie, co robi kod. I jest wersja, w której programista jest autorem promptów, który dostarcza wyniki, których w pełni nie rozumie. Jedna z nich to używanie AI do lepszego wykonywania pracy. Drugą nie czuję się komfortowo nazywać inżynierią.

**Link:** [A24's AI Backlash Is an Old Creative Argument in New Clothes](https://hackernoon.com/a24s-ai-backlash-is-an-old-creative-argument-in-new-clothes)

---

## Markdown i PowerShell to zaskakująco dobrane duo

**TLDR:** PowerShell ma wbudowany parser Markdown, który sprawia, że zbudowanie prostego generatora stron statycznych w zaledwie kilku linijkach skryptu jest proste. Autor MrPowerShell przeprowadza przez to połączenie i wyjaśnia, dlaczego działa lepiej niż można by się spodziewać.

**Podsumowanie:** MrPowerShell, określający siebie mianem inżyniera platformy i polimatysta, zaczyna od stwierdzenia, z którym w pełni się zgadzam: Markdown jest wszędzie i jest wszędzie, ponieważ jest prosty i działa. Czysty tekst, minimalna składnia, czytelny nawet przed renderowaniem. Artykuł przekonuje, że PowerShell jest niedocenianym towarzyszem do pracy z plikami Markdown, częściowo dlatego, że język ma natywne parsowanie Markdown wbudowane w cmdlet ConvertFrom-Markdown, a częściowo dlatego, że model potokowy PowerShell naturalnie mapuje się na rodzaj pracy z plikami, jakiego wymaga generowanie stron statycznych.

Opis jest praktyczny. Przechodzisz w pętli przez katalog plików Markdown, każdy konwertujesz na HTML, zapisujesz dane wyjściowe do odpowiedniego pliku i masz generator stron statycznych. Brak środowiska uruchomieniowego Node, brak łańcucha narzędzi do budowania, brak npm install. Tylko PowerShell i system plików. Dla stron z dokumentacją, wewnętrznych wiki lub dowolnego kontekstu, w którym chcesz zamienić folder Markdown w przeglądalne HTML bez wciągania pełnego frameworka, to jest legalna opcja.

Gdzie artykuł nieco zawodzi, to brak bezpośredniego omówienia ograniczeń. ConvertFrom-Markdown nie obsługuje frontmatter, nie zajmuje się przepisywaniem linków względnych i nie ma gotowego rozwiązania do szablonowania. Dla prawdziwego generatora stron statycznych potrzebujesz tego wszystkiego. Tu dostajesz podstawową pętlę renderowania, która jest niezłym fundamentem, ale luka między nią a użytecznym narzędziem to realna praca.

Mimo to szerszy punkt dotyczący PowerShell jako środowiska skryptowego ogólnego przeznaczenia do przetwarzania tekstu i plików zasługuje na więcej uwagi, niż dostaje. PowerShell działa teraz na Linux i Mac. To nie jest tylko narzędzie do administracji Windows. Jeśli już uruchamiasz skrypty w PowerShell, dodanie przetwarzania Markdown do tego przepływu pracy jest naprawdę mało skomplikowane.

**Kluczowe wnioski:**
- PowerShell zawiera natywny cmdlet ConvertFrom-Markdown obsługujący podstawową konwersję HTML bez zewnętrznych zależności
- Zbudowanie minimalnego generatora stron statycznych w PowerShell wymaga bardzo małej ilości kodu, jeśli potrzebujesz tylko podstawowego renderowania
- Podejście ma realne ograniczenia: brak parsowania frontmatter, brak przepisywania linków, brak szablonowania po wyjęciu z pudełka
- PowerShell jest teraz wieloplatformowy i bardziej zdolny jako ogólne środowisko skryptowe, niż sugeruje jego reputacja

**Dlaczego mnie to interesuje:** Mam słabość do narzędzi, które robią jedną rzecz z minimalnym ceremoniałem. Najlepsza wewnętrzna dokumentacja, jaką widziałem, to często ta, która działa bez kroku budowania. Jeśli twój zespół pisze Markdown i musisz go gdzieś opublikować, 20-liniowy skrypt PowerShell konwertujący i kopiujący pliki to doskonale rozsądne rozwiązanie. Nie zawsze potrzebujesz Astro.

**Link:** [Markdown and PowerShell Are a Surprisingly Good Match](https://hackernoon.com/markdown-and-powershell-are-a-surprisingly-good-match)

---

## Skupienie to nie siła woli. To projektowanie środowiska

**TLDR:** Matt Trifiro przekonuje, że zdolność do głębokiego skupienia nie jest cechą charakteru, którą albo masz, albo nie. To wynik środowiska, w którym pracujesz, a środowiska można projektować.

**Podsumowanie:** To drugi artykuł Matta Trifiro w tym newsletterze, co mówi coś o jego tempie tworzenia. Artykuł o skupieniu porusza problem, który większość pracowników wiedzy zinternalizowała jako osobistą słabość: niemożność wykonywania głębokiej pracy przez dłuższe okresy. Trifiro przeformułowuje to w taki sposób: jeśli nie możesz się skupić, problem leży prawdopodobnie nie w twojej dyscyplinie, ale w twoim środowisku, a w przeciwieństwie do dyscypliny, środowiska można inżynierować.

Argument czerpie z dobrze znanych obszarów. Macierz Eisenhowera zostaje wspomniana. Pojawia się zmęczenie spotkaniami. AI burnout, specyficzne wyczerpanie wynikające z pracy w kontekście, gdzie narzędzia zmieniają się szybciej niż można się ich nauczyć, zostaje nazwany jako odrębne zjawisko warte uwzględnienia. Żaden z tych tematów nie jest nowym terenem, ale synteza jest czysta.

To, co uważam za naprawdę użyteczne w artykule, to ujęcie dotyczące domyślnych ustawień. Większość środowisk pracy jest zaprojektowanych pod kątem dostępności, nie skupienia. Optymalizują czas odpowiedzi. Slack, email, biura z otwartą przestrzenią, spotkania zaplanowane w 30-minutowych fragmentach, to wszystko cechy środowiska i wszystkie działają przeciwko utrzymanej uwadze. Zmiana ich wymaga traktowania warunków pracy jako systemu z celowymi wyborami projektowymi, a nie jako neutralnego tła, które trzeba pokonać siłą woli.

Artykuł jest skąpy w szczegółach dotyczących faktycznego przeprojektowania środowiska, czyli tam, gdzie większość takich tekstów wyczerpuje swój użyteczny potencjał. Dobrze diagnozuje, ale przepisuje mgliście. Jednak podstawowe przeformułowanie, z osobistej porażki na problem projektowania systemu, to coś, co wielu programistów w środowiskach pełnych zakłóceń naprawdę musi usłyszeć.

**Kluczowe wnioski:**
- Niemożność skupienia jest częściej problemem systemowym niż wadą charakteru
- Środowiska optymalizujące pod kątem dostępności aktywnie działają przeciwko głębokiej pracy
- AI burnout to realna i odrębna forma przeciążenia poznawczego warta osobnego nazwania
- Poprawa skupienia wymaga celowego przeprojektowania warunków pracy, a nie więcej siły woli

**Dlaczego mnie to interesuje:** Widziałem, jak bardzo zdolni inżynierowie stawali się stopniowo mniej produktywni, gdy ich obciążenie komunikacyjne rosło, a niezakłócony czas pracy malał. Odpowiedzią nigdy nie jest mówienie im, by skupiali się mocniej. Chodzi o ochronę warunków, które umożliwiają skupienie. To decyzja zarządcza i architektoniczna, a nie osobista.

**Link:** [Focus Is Not Willpower. It's Environment Design](https://hackernoon.com/focus-is-not-willpower-its-environment-design)

---

## Augmented Reality i Web3: infrastruktura czekająca na swój moment

**TLDR:** Pierwsza fala konwergencji AR-Web3 nie powiodła się nie dlatego, że wizja była błędna, ale dlatego, że infrastruktura nie była gotowa. Autor przekonuje, że infrastruktura nadgoniła i tworzy się druga fala.

**Podsumowanie:** Ten artykuł, napisany przez @quinnhillerich i prezentujący OVR jako case study, przyjmuje rewizjonistyczne spojrzenie na przestrzeń AR-Web3. Pierwsza fala firm próbujących budować na tym skrzyżowaniu napotykała spójny zestaw problemów: sprzęt był zbyt drogi i zbyt ograniczony, opóźnienia były zbyt duże dla doświadczeń przestrzennych w czasie rzeczywistym, a koszty transakcji blockchain sprawiały, że mikrointerakcje były ekonomicznie niepraktyczne. Wizja trwałych, należących do użytkowników cyfrowych nakładek na przestrzeń fizyczną była spójna. Środowisko wykonawcze nie było na to gotowe.

Autor wskazuje na OVR jako przykład firmy, która przetrwała pierwszą falę, budując działający model biznesowy zamiast polegać wyłącznie na spekulatywnej infrastrukturze. To rozróżnienie ma znaczenie. Firmy, które postawiły wszystko na gotowość infrastruktury do określonej daty, w większości nie przetrwały. Firmy, które znalazły krótkoterminową użyteczność, czekając na nadgonienie infrastruktury, miały lepszy wskaźnik przeżycia.

Kluczowe twierdzenie jest takie, że obliczenia, łączność i sprzęt poprawiły się na tyle, że druga próba jest realna. Sprzętowe platformy do spatial computing od Apple i innych producentów, sieci o niższym opóźnieniu i dojrzalsze narzędzia do smart contracts usunęły część blokad, które zabiły firmy pierwszej fali. Czy to wystarczy, jest naprawdę niejasne, ale analiza tego, dlaczego pierwsza fala poniosła porażkę, jest solidna.

Artykuł unika jednak problemu adopcji przez użytkowników, który nie jest przede wszystkim problemem infrastrukturalnym. Ludzie potrzebują przekonujących powodów, by nosić lub nosić przy sobie sprzęt AR w codziennym życiu. Lepsza infrastruktura automatycznie nie tworzy tych powodów.

**Kluczowe wnioski:**
- Pierwsza fala AR-Web3 poniosła porażkę z powodu infrastruktury, a nie wizji, sprzęt, opóźnienia i koszty były czynnikami ograniczającymi
- OVR wyróżnia się jako ocalały, budując realny model biznesowy zamiast czekać na dojrzałość infrastruktury
- Ulepszony sprzęt do spatial computing i sieci usunęły część blokad z pierwszej fali
- Adopcja przez użytkowników pozostaje odrębnym, nierozwiązanym problemem, którego lepsza infrastruktura sama nie rozwiązuje

**Dlaczego mnie to interesuje:** Z perspektywy architektury webowej pytanie o to, co spatial computing robi z frontendem, jest interesujące i niedostatecznie zbadane. Jeśli trwałe nakładki AR staną się rzeczywistością, problemy z renderowaniem i zarządzaniem stanem są naprawdę nowe. Jestem jednak sceptyczny wobec harmonogramów. Argument o infrastrukturze był już wcześniej stawiany i brakującym elementem nigdy nie była tylko infrastruktura.

**Link:** [Augmented Reality and Web3: The Infrastructure Waiting for Its Moment](https://hackernoon.com/augmented-reality-and-web3-the-infrastructure-waiting-for-its-moment)
