---
title: "CSS przejmuje kolejne obowiązki JavaScriptu: progress(), overflow: clip i asystent AI, który zna dokumentację"
excerpt: "Tydzień z nowym overflow: clip, funkcją progress() zamiast kalkulacji w JS, garścią sprawdzonych zasad projektowania UI i serwerem MCP od MDN, który poprawia wiedzę asystentów kodu o wsparciu przeglądarek."
publishedAt: "2026-08-09"
slug: "css-progress-overflow-clip-mdn-mcp-server"
hashtags: "#tailwind #frontend #css #mdn #ai #uidesign #webplatform #javascript #generated #pl"
source_pattern: "Tailwind Weekly"
---

## overflow: clip zamiast overflow: hidden, czyli o co naprawdę chodziło

**TLDR:** overflow: hidden tworzy tak zwany scrollbox, więc obcinając jedną oś, w praktyce ruszamy też drugą i wciąż można ten element przewinąć programowo. overflow: clip robi dokładnie to, co większość z nas zakładała, że robi hidden, czyli obcina tylko wskazaną oś, i jest już wspierane wszędzie bez fallbacków.

**Summary:** Ile razy pisałeś overflow: hidden i zakładałeś, że to po prostu obetnie zawartość, która wystaje poza kontener? Otóż nie do końca tak to działa. hidden tworzy scrollbox, czyli formalnie przewijalny kontener, tylko z ukrytym paskiem przewijania. Konsekwencja jest taka, że ograniczenie jednej osi automatycznie wpływa na drugą, bo obie osie żyją w tym samym mechanizmie przewijania. Do tego dochodzi rzecz, która potrafi zaskoczyć nawet doświadczonych devów: taki element wciąż można przewinąć programowo, na przykład przez scrollTo, mimo że wizualnie nie widać żadnego paska ani żadnej wskazówki, że to możliwe.

overflow: clip powstało właśnie po to, żeby rozdzielić te dwie sprawy. Obcina tylko tę oś, którą mu wskażesz, więc możesz mieć element, który przycina w pionie, ale swobodnie rozciąga się w poziomie, albo odwrotnie. Nie tworzy przy tym kontekstu przewijania, więc żadne programowe sztuczki nie zdziałają cudów, treść po prostu nie istnieje poza granicą przycięcia. To jest dokładnie ten model mentalny, który większość z nas miała w głowie, kiedy pierwszy raz uczyła się overflow, tylko przez lata sięgaliśmy po niewłaściwą właściwość.

Klasyczny przykład z życia to hero image, które ma wystawać poza dolną krawędź sekcji, żeby dać efekt głębi, ale nie może wprowadzać poziomego scrolla na stronie. Z overflow: hidden na całym kontenerze łatwo się nadziać na przycięcie w złej osi albo na dziwne zachowanie przy responsywnym layoutcie. Z overflow: clip ustawionym tylko tam, gdzie trzeba, problem znika bez żadnych hacków w stylu negatywnych marginesów kompensujących nieszczelności.

Dobra wiadomość jest taka, że overflow: clip ma już status Baseline, czyli działa we wszystkich aktualnych przeglądarkach bez żadnych warunków czy fallbacków. To nie jest eksperymentalna nowinka, na którą trzeba czekać kolejny rok, tylko właściwość gotowa do użycia od zaraz w produkcyjnym kodzie.

**Key takeaways:**
- overflow: hidden tworzy scrollbox, więc obcięcie jednej osi wpływa też na drugą
- element z overflow: hidden nadal można przewinąć programowo mimo braku widocznego paska
- overflow: clip obcina tylko wskazaną oś i nie tworzy kontekstu przewijania
- overflow: clip jest już Baseline, więc nie wymaga żadnych fallbacków

**Why do I care:** To jeden z tych drobiazgów, które potrafią latami siedzieć w kodzie jako źródło dziwnych bugów, bo nikt nie zadał sobie pytania, dlaczego akurat ten kontener da się przewinąć mimo overflow: hidden. Jak robisz cokolwiek z hero image, kartami wystającymi poza kontener czy animacjami, które mają się kończyć twardo na krawędzi, warto od razu sięgać po clip zamiast hidden i mieć jedną zmartwienie mniej.

**Link:** [Practical Use-Cases for overflow: clip](https://tailwindweekly.com/issue-225/?attribution_id=6a766686f8ba0900019d8e18&attribution_type=post)

## Nowa funkcja progress() w CSS wywala kolejne media queries

**TLDR:** progress() liczy, jak daleko dana wartość znajduje się między dwoma granicami, i zwraca liczbę od 0 do 1, którą można wykorzystać do płynnych efektów wizualnych bez media queries i bez JavaScriptu. Działa też na mieszanych jednostkach, czego calc() zwyczajnie nie potrafi.

**Summary:** CSS od kilku lat systematycznie zabiera JavaScriptowi zadania, które kiedyś wymagały nasłuchiwania na resize albo scroll i ręcznego przeliczania wartości w skrypcie. progress() to kolejny taki krok. Składnia jest prosta: podajesz wartość, dolną granicę i górną granicę, a funkcja zwraca liczbę od zera do jedynki mówiącą, jak daleko ta wartość zaszła między tymi granicami. Poniżej dolnej granicy dostajesz zero, powyżej górnej jedynkę, a pomiędzy nimi płynne przejście.

To, co robi z tego coś więcej niż ciekawostkę, to fakt, że progress() radzi sobie z mieszanymi jednostkami. Możesz napisać progress(100vw, 480px, 1200px) i to po prostu zadziała, mimo że pierwsza wartość jest w viewport units, a granice w pikselach. calc() tego nie potrafi, bo wymaga zgodności jednostek albo przynajmniej możliwości ich matematycznego połączenia. Dzięki temu progress() staje się uniwersalnym interpolatorem, którym można podpiąć się pod szerokość okna, scroll, a nawet niestandardowe zmienne CSS reprezentujące cokolwiek, na przykład poziom baterii czy ocenę w gwiazdkach.

Praktyczne zastosowania robią wrażenie, kiedy zobaczysz je jedno po drugim. Przygasanie hero image w miarę zwężania się viewportu, żeby tekst nałożony na obrazek zostawał czytelny, delikatne skalowanie karty w górę na większych ekranach, płynna typografia, przejścia motywów kolorystycznych z color-mix() sterowane tą samą wartością progress, a nawet mikrointerakcje typu subtelny tilt karty przy hover. Wszystko to bez pojedynczej media query, bo cała logika siedzi w jednej deklaracji CSS.

Wsparcie na razie jest ograniczone do Chromium i Safari 26, Firefox jeszcze tego nie ma, więc jeśli zależy ci na pełnym pokryciu przeglądarek, trzymaj obok fallback oparty na clamp() albo calc(). Ale kierunek jest jasny i to kolejny dowód na to, że coraz więcej rzeczy, które wcześniej wymagały JavaScriptu albo biblioteki do scroll-driven animations, da się dziś zrobić samym CSS.

**Key takeaways:**
- progress(wartość, start, koniec) zwraca liczbę od 0 do 1 opisującą postęp między dwiema granicami
- działa na mieszanych jednostkach, np. progress(100vw, 480px, 1200px), czego calc() nie umie
- świetnie nadaje się do płynnej typografii, przejść motywów i efektów sterowanych scrollem bez media queries
- wsparcie mają Chromium i Safari 26, Firefox jeszcze nie, więc warto trzymać fallback z clamp()

**Why do I care:** Zamiana media queries na progress() to nie jest kosmetyka, tylko realna redukcja liczby breakpointów, które trzeba utrzymywać i testować. Jeśli robisz dużo responsywnych efektów wizualnych, warto zacząć eksperymentować z tym już teraz w projektach, gdzie Firefox nie jest twardym wymogiem, a tam gdzie jest, trzymać prosty fallback i po prostu progresywnie ulepszać.

**Link:** [The new progress() function in CSS](https://www.amitmerchant.com/the-progress-function-css/)

## Trzydzieści zasad projektowania UI, które można stosować bez zastanowienia

**TLDR:** Anthony Hobday zebrał listę konkretnych, praktycznych zasad wizualnych, takich jak używanie prawie-czerni zamiast czystej czerni czy podwajanie rozmycia cienia względem jego przesunięcia, które można zastosować w niemal każdym projekcie bez ryzyka, że coś popsują. To lista, którą warto mieć zakładkę w przeglądarce.

**Summary:** Większość poradników o designie kończy się na ogólnikach w stylu "zachowaj spójność" albo "myśl o hierarchii". Ta lista jest inna, bo każda zasada jest konkretna i da się ją zastosować w pięć minut bez konsultacji z projektantem. Zamiast czystej czerni i bieli używaj prawie-czerni i prawie-bieli, bo czysty kontrast bywa nieprzyjemny dla oka. Do neutralnych szarości dodaj odrobinę koloru z twojej palety akcentów, żeby całość czuła się spójna, a nie jak sklejka z dwóch różnych systemów kolorów.

Kilka zasad dotyczy geometrii i przestrzeni, i akurat te najbardziej przypadły mi do gustu, bo tłumaczą zjawiska, które intuicyjnie czułem, ale nigdy nie umiałem nazwać. Rozmycie cienia powinno być dwa razy większe niż jego przesunięcie, więc cień przesunięty o cztery piksele w dół powinien mieć rozmycie na poziomie ośmiu pikseli. Zewnętrzny padding kontenera powinien być równy lub większy niż wewnętrzny odstęp między elementami, bo elementy wewnątrz kontenera są ze sobą bardziej powiązane niż z samym kontenerem. A jeśli masz zagnieżdżone zaokrąglone rogi, promień wewnętrznego rogu powinien być równy promieniowi zewnętrznemu pomniejszonemu o odległość między nimi, inaczej te rogi po prostu nie będą wyglądały jak jedna spójna forma.

Jest też garść zasad, które ratują życie w code review, kiedy coś "wygląda nie tak" i nikt nie potrafi wskazać dlaczego. Obramowania kontenerów powinny kontrastować zarówno z kontenerem, jak i z tłem pod nim, inaczej krawędź traci ostrość. Tekst podstawowy nie powinien schodzić poniżej 16 pikseli, długość linii najlepiej trzymać w okolicach 70 znaków, a padding poziomy w przyciskach powinien być dwa razy większy niż pionowy, żeby przycisk faktycznie wyglądał jak przycisk, a nie jak losowy prostokąt z tekstem.

Autor jest szczery, że te reguły nie są święte i czasem warto je złamać, jeśli masz dobry powód. Ale wartość tej listy polega właśnie na tym, że w większości przypadków nie masz dobrego powodu, a stosowanie tych zasad domyślnie po prostu podnosi jakość interfejsu bez żadnego ryzyka.

**Key takeaways:**
- używaj prawie-czerni i prawie-bieli zamiast czystych wartości, i lekko nasyć neutralne szarości kolorem akcentu
- rozmycie cienia ustawiaj na dwukrotność jego przesunięcia
- zewnętrzny padding kontenera powinien być równy lub większy niż wewnętrzny odstęp między elementami
- promień wewnętrznego zaokrąglenia w zagnieżdżonych rogach to promień zewnętrzny minus odległość między nimi
- tekst podstawowy nie mniejszy niż 16px, długość linii około 70 znaków, padding poziomy w przyciskach dwa razy większy niż pionowy

**Why do I care:** Jako developer, który regularnie musi ubierać komponenty w CSS bez wsparcia projektanta pod ręką, mam wrażenie, że ta lista to coś w rodzaju eslint reguł dla wizualnego smaku. Nie zastąpi dobrego designera, ale eliminuje te drobne niedoróbki, które sprawiają, że interfejs "czuje się nie tak", a nikt nie potrafi wskazać dlaczego. Warto trzymać ją pod ręką przy każdym PR-ze dotykającym UI.

**Link:** [Visual design rules you can safely follow every time](https://anthonyhobday.com/sideprojects/saferules/)

## MDN wypuściło własny serwer MCP i asystenci kodu w końcu przestają zmyślać o wsparciu przeglądarek

**TLDR:** MDN uruchomiło eksperymentalny serwer MCP, który podaje asystentom AI aktualną dokumentację i dane o wsparciu przeglądarek zamiast polegać na tym, co model zapamiętał podczas treningu. W testach MDN Claude Code bez MCP poprawnie ocenił wsparcie przeglądarek tylko w jednym z czterech przypadków, z MCP trafiał za każdym razem.

**Summary:** Problem, który MDN opisuje, jest znajomy każdemu, kto choć raz zapytał asystenta AI o wsparcie jakiejś nowej funkcji CSS czy API. Model odpowiada z pełnym przekonaniem, że dana rzecz nie jest wspierana w danej przeglądarce, mimo że wsparcie pojawiło się kilka miesięcy wcześniej. To nie jest wina modelu w sensie moralnym, po prostu wiedza treningowa ma datę odcięcia, a platforma webowa zmienia się szybciej niż cykle treningowe dużych modeli językowych. MDN MCP server rozwiązuje to najprościej jak się da: zamiast liczyć na pamięć modelu, podaje mu aktualne dane wprost z dokumentacji MDN w momencie zapytania.

Serwer działa z całym ekosystemem narzędzi, które dziś realnie są używane do pisania kodu z pomocą AI: VS Code, Zed, Cursor, Claude Code, Codex CLI i Claude Desktop. Instalacja to dosłownie jedna komenda w terminalu, więc próg wejścia jest minimalny, co akurat cieszy, bo wiele narzędzi deweloperskich w tym obszarze wymaga więcej zachodu niż jest to warte.

Najciekawsza część to test, który MDN samo przeprowadziło. Wzięli cztery funkcje, które trafiły do Firefoksa 151, i zapytali Claude Code o sposób użycia oraz wsparcie przeglądarek, raz z MCP, raz bez. Bez MCP model poprawnie ocenił wsparcie tylko w jednym przypadku na cztery. Najgorszy błąd dotyczył Web Serial API, gdzie model bez MCP twierdził, że Firefox nie planuje wsparcia i cytował rzekome stanowisko Mozilli mówiące, że funkcja jest "szkodliwa", podczas gdy Firefox faktycznie wysłał tę funkcję w maju. Z MCP model od razu podał poprawną informację zgodną z release notes.

Poza samą trafnością MDN zauważyło też, że odpowiedzi z MCP były z grubsza dwa razy szybsze, bo model nie musiał sam scrapować i parsować stron HTML w poszukiwaniu aktualnych informacji, tylko dostawał je bezpośrednio ze strukturalnego źródła. To pokazuje coś ważnego o tym, dokąd zmierza cały ekosystem narzędzi AI dla developerów: zamiast polegać na tym, co model "wie", coraz więcej wartości będzie dawało podłączanie go do źródeł prawdy w czasie rzeczywistym.

**Key takeaways:**
- MDN MCP server podaje asystentom AI aktualne dane o dokumentacji i wsparciu przeglądarek zamiast polegać na wiedzy treningowej modelu
- działa z VS Code, Zed, Cursor, Claude Code, Codex CLI i Claude Desktop, instalacja to jedna komenda
- w testach MDN Claude Code bez MCP poprawnie ocenił wsparcie przeglądarek tylko w jednym z czterech przypadków
- odpowiedzi z włączonym MCP były około dwa razy szybsze, bo model nie musiał samodzielnie scrapować dokumentacji
- serwer jest na razie eksperymentalny, ale warto go już teraz podłączyć do swojego workflow

**Why do I care:** To dokładnie ten typ narzędzia, który powinien być domyślnie włączony w każdym środowisku pracy z asystentem AI, bo koszt instalacji jest bliski zeru, a ryzyko dostania błędnej informacji o wsparciu przeglądarek w kodzie produkcyjnym jest realne i kosztowne. Jeśli używasz Claude Code, Cursora czy Codex CLI na co dzień, to jest dosłownie jedna komenda w terminalu, która potrafi zaoszczędzić ci godzinę debugowania, dlaczego coś nie działa w przeglądarce, w której teoretycznie miało działać.

**Link:** [Introducing the MDN MCP server](https://developer.mozilla.org/en-US/blog/introducing-mdn-mcp-server/)
