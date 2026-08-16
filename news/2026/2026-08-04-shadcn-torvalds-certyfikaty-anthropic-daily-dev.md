---
title: "ShadCN, Torvalds i certyfikaty od Anthropic: przegląd daily.dev"
excerpt: "Biblioteka do morfowania ikon, framework mający leczyć AI-owy slop w frontendzie, Sitepins na wolności, kłótnia o AI w Linuksie i certyfikaty Claude w czterech odmianach."
publishedAt: "2026-08-04"
slug: "shadcn-torvalds-certyfikaty-anthropic-daily-dev"
hashtags: "#dailydev #frontend #opensource #ai #claude #generated #pl"
source_pattern: "daily.dev"
---

## Morphicons: ikony, które naprawdę się przeobrażają, a nie tylko migają

**TLDR:** Morphicons to biblioteka JS, która animuje przejście jednej ikony w drugą bez ręcznego ustawiania rotacji dla każdej pary. Liczy sobie około 7 KB po gzipie, nie ma zależności i działa z Lucide, Tabler czy Heroicons. Cały trik polega na matematyce, nie na przygotowanych z góry animacjach.

**Summary:** Morfowanie ikon brzmi jak kosmetyczny detal, ale każdy, kto próbował animować przejście między ikoną menu a krzyżykiem zamknięcia, wie, że zwykłe cross-fade wygląda jak awaria. Autor tej biblioteki poszedł inną drogą i sięgnął po analizę Procrustesa w dwóch wymiarach, czyli metodę znajdowania optymalnego przekształcenia podobieństwa między dwoma kształtami. Jeśli dwie ikony są kongruentne po obrocie, biblioteka to wykryje i po prostu obróci jedną w drugą. Jeśli nie są, dogeometryzuje różnicę w tak zwanej przestrzeni polarnej, rozkładając ruch na część związaną z podobieństwem i resztę, która zostaje jako deformacja.

Cały proces zaczyna się od normalizacji wszystkich prymitywów SVG do krzywych Béziera trzeciego stopnia, potem próbkuje ścieżki z równym rozstawem punktów wzdłuż długości łuku, kotwicząc rogi, żeby nie ucinać kątów. Dalej biblioteka próbuje dopasować podścieżki między dwiema ikonami i wybrać najlepszy punkt startowy oraz orientację. Na końcu interpolacja skali jest log-liniowa, a rotacji liniowa, co w praktyce daje ruch, który wygląda naturalnie, a nie jak naciągana animacja liniowa między dwoma zestawami punktów.

Do tego doszedł tłumiony oscylator harmoniczny jako silnik animacji, więc morfowanie ma sprężystość fizyczną, a nie sztywne easingi. Biblioteka udostępnia bindingi do React i Vue, ale sam core jest bezstanowy i można go użyć w czystym JS albo w każdym innym frameworku przez `createMorph()`. Warunkiem działania jest to, żeby ikony były rysowane obrysem, czyli `fill="none"` i kolor przez `stroke`, bo cały algorytm operuje na centralnej linii kształtu, nie na wypełnieniu.

To jeden z tych projektów, które pokazują, że w 2026 roku wciąż jest miejsce na bibliotekę zrobioną porządnie, matematycznie, a nie przez wrzucenie dziesiątek gotowych plików Lottie. Zero zależności i 7 KB to konkretna deklaracja, że autor rozumie, na czym polega dobry frontendowy pakiet.

**Key takeaways:**
- Analiza Procrustesa pozwala automatycznie wykryć, czy dwie ikony da się po prostu obrócić, bez ręcznego mapowania punktów
- Interpolacja w przestrzeni polarnej i tłumiony oscylator harmoniczny dają animacji fizyczną sprężystość, a nie sztywny easing
- Biblioteka działa tylko z ikonami rysowanymi jako obrys (stroke), więc nie zadziała z ikonami wypełnionymi

**Why do I care:** Jako ktoś, kto latami patrzył na animacje ikon robione przez podmianę SVG z opacity transition, doceniam, że ktoś usiadł i policzył to porządnie, a nie poszedł w stronę gotowych presetów Lottie, które puchną w bundle'u. Ciekawe jest ograniczenie do ikon rysowanych obrysem, bo to pokazuje, że autor wybrał wąską, dobrze zdefiniowaną niszę, zamiast obiecywać, że rozwiąże wszystko. To dokładnie taki rodzaj biblioteki, którą wstawiam do projektu i zapominam, że istnieje, bo działa.

**Link:** [morphicons: Any icon morphs into any other](https://github.com/guillermolg00/morphicons)

## Linus Torvalds znów mówi wprost o AI w Linuksie

**TLDR:** Linus Torvalds powiedział otwarcie, że Linux nie jest projektem antyAI i że kod generowany przez modele ma być oceniany tak samo jak każdy inny patch, przez code review, a nie przez to, kto go napisał. To sparowało się z krytyką polityki Codeberga wobec kodu LLM-owego i wywołało kolejną rundę sporu w społeczności open source.

**Summary:** Torvalds w lipcu 2026 przyznał, że AI bywa dla maintainerów bolesnym narzędziem, bo zwiększa liczbę zgłoszeń i patchy do przejrzenia, ale jednocześnie powtórzył, że chowanie głowy w piasek nie jest rozwiązaniem. Jego argument jest prosty: liczy się to, co trafia do repozytorium po code review, nie to, jak dany fragment kodu powstał. Kto się nie zgadza z tym podejściem do rozwoju jądra, może zrobić fork, taki jest sens open source od zawsze.

Kontrastuje to z decyzją Codeberga, który poszedł w drugą stronę i ograniczył udział kodu generowanego przez LLM w swoich projektach. To zderzenie dwóch filozofii, jedna mówi "oceniajmy efekt", druga "oceniajmy proces", i akurat w tym przypadku to Torvalds ze swoją pozycją i historią 30 lat prowadzenia największego projektu open source na świecie ma dużo większą siłę przebicia w dyskusji.

Reakcja w newsletterze, tytułowana krótko jako uznanie dla postawy Torvaldsa, to typowy przykład tego, jak szybko toczy się dyskurs wokół AI w kodzie. Nie ma tu żadnego nowego argumentu technicznego, jest raczej potwierdzenie, że jedna z najbardziej wpływowych postaw w świecie open source stawia na pragmatyzm, a nie na ideologiczny zakaz.

To bardziej historia społeczna i polityczna niż inżynierska, ale ma znaczenie dla każdego, kto maintainuje choć jeden większy projekt open source i musi teraz decydować, jak traktować pull requesty, które ewidentnie przeszły przez model.

**Key takeaways:**
- Torvalds ocenia kod po jego jakości i wyniku code review, nie po tym, czy narzędziem był człowiek czy model
- Codeberg poszedł w stronę restrykcji wobec kodu LLM-owego, co stworzyło wyraźny kontrast filozofii
- To spór kulturowy w społeczności open source, nie techniczny przełom

**Why do I care:** To zdecydowanie bardziej temat społeczny niż inżynierski, więc traktuję to jako plotkę z korytarza open source, a nie coś, co zmienia mój warsztat. Mimo to podejście Torvaldsa wydaje mi się zdrowsze niż blankietowy zakaz, bo w praktyce i tak nie da się skontrolować, ile procent linijek w danym PR-ze wyszło z modelu. Wolę maintainerów, którzy pilnują jakości review, od tych, którzy próbują pilnować metadanych o pochodzeniu kodu.

**Link:** [Linus Torvalds tells AI haters to fork off](https://www.theregister.com/ai-and-ml/2026/07/15/linus-torvalds-tells-ai-haters-to-fork-off/)

## Taste Skill: framework, który ma nauczyć agentów AI gustu

**TLDR:** Taste Skill to zbiór plików instrukcji w formacie SKILL.md, bez żadnego kodu wykonywalnego, które mają nauczyć agentów typu Cursor, Claude Code czy Codex projektować frontend inaczej niż domyślny wygenerowany "slop": wyśrodkowany hero, fioletowy gradient, trzy równe karty funkcji i font Inter na slate-900. Instalacja to `npx skills add`, a same skille można też wkleić bezpośrednio do rozmowy z modelem.

**Summary:** Problem, który autorzy Taste Skill opisują, każdy widział choćby raz: poprosisz agenta o landing page i dostajesz właściwie ten sam układ co zawsze, tylko z inną nazwą produktu. Modele językowe są dobre w składni, w zgodności typów, w poprawnym CSS-ie, ale nie mają żadnego wewnętrznego poczucia estetyki, więc domyślnie idą w stronę najbardziej statystycznie prawdopodobnego układu, jaki widziały w danych treningowych. Taste Skill nie próbuje tego naprawić kodem, bo nie da się zaprogramować gustu. Zamiast tego dostarcza instrukcje w naturalnym języku, które kierują agenta w stronę konkretnych decyzji projektowych, dotyczących typografii, odstępów, ruchu i gęstości wizualnej.

Format SKILL.md jest kluczowy, bo to nie biblioteka do zaimportowania, to zestaw plików tekstowych, które agent czyta jako kontekst przed generowaniem kodu. Można je skopiować do folderu `skills/` w projekcie, można je wkleić bezpośrednio do czatu z modelem, można używać CLI, które skanuje repozytorium. Zero zależności runtime, zero npm install w sensie technicznym, bo to nie jest paczka do budowania, to zestaw wytycznych.

Ciekawym elementem jest workflow image-first, gdzie zamiast od razu generować kod, agent najpierw generuje obraz referencyjny przez ChatGPT Images albo Codex image mode, analizuje ten obraz, a potem implementuje frontend, który do niego pasuje. To odwraca zwykły proces, w którym model najpierw pisze kod i dopiero potem ktoś ocenia, jak wygląda efekt. Skille mają też pokrętła, jak nazywają to autorzy, do wariancji projektowej, intensywności ruchu i gęstości wizualnej w skali od jednego do dziesięciu, co pozwala trochę kontrolować, jak bardzo odjechany ma być efekt.

Framework jest agnostyczny co do frameworka frontendowego, bo reguły dotyczą intencji projektowej, nie konkretnego API, więc działa niezależnie, czy agent generuje React, Vue czy Svelte.

**Key takeaways:**
- Skille to pliki tekstowe SKILL.md czytane jako kontekst, nie kod do importu, więc integracja jest bezinwazyjna
- Workflow image-first generuje obraz referencyjny przed kodem, co odwraca typowy proces "napisz i oceń"
- Parametry jak wariancja projektowa czy gęstość wizualna są regulowane w skali liczbowej, co daje pewną kontrolę nad efektem

**Why do I care:** Sam projektowałem sporo layoutów po tym, jak agent najpierw wygenerował swoją wersję, i rozpoznaję ten schemat: gradient, trzy karty, Inter, myślnik w każdym nagłówku. Podoba mi się, że ktoś zaadresował to nie kodem, a promptami zorganizowanymi w konkretny format, bo to jest realistyczne rozwiązanie problemu, którego nie da się rozwiązać samym fine-tuningiem modelu. Jestem sceptyczny, czy to faktycznie da unikalne, dopracowane designy na poziomie senior designera, ale jako narzędzie do wyjścia poza domyślny szablon na pewno ma sens, zwłaszcza dla zespołów, które nie mają dedykowanego designera przy każdym mniejszym projekcie.

**Link:** [Taste Skill: The Anti-Slop Frontend Framework for AI Agents](https://github.com/tasteskill/tasteskill)

## Sitepins otwiera kod swojego CMS-a dla Hugo i Astro

**TLDR:** Sitepins, headless CMS oparty na Git dla stron statycznych zrobionych w Hugo, Astro czy Next.js, przeszedł na licencję AGPL-3.0. Można teraz czytać kod, hostować go samodzielnie za darmo albo dalej korzystać z wersji chmurowej. To bardziej decyzja biznesowa niż techniczna nowość.

**Summary:** Historia zaczyna się od traumy zespołu, który wcześniej działał pod marką Themefisher i budował ponad sto szablonów dla Hugo. Ich dostawca CMS-a po prostu zniknął w 2023 roku, zostawiając setki klientów bez edytora treści. Zamiast szukać kolejnego dostawcy, który może zniknąć tak samo, zespół zbudował własny produkt, Sitepins, i teraz robi krok dalej, otwierając kod na licencji AGPL-3.0.

Sama koncepcja produktu jest sensowna dla każdego, kto trzyma treść strony jako Markdown w repozytorium: Sitepins nie wymaga ręcznego definiowania kolekcji i pól w jakimś schemacie konfiguracyjnym, tylko czyta pliki, które już są w repo, wyciąga strukturę z frontmattera i na tej podstawie buduje interfejs edycji. Każdy zapis to prawdziwy commit Git, więc historia zmian jest tam, gdzie zawsze była, w repozytorium, a nie w bazie danych dostawcy SaaS.

AGPL-3.0 to konkretny wybór licencyjny, nie przypadkowy. Pozwala na darmowe modyfikowanie i self-hosting, ale jeśli zmodyfikowaną wersję wystawisz jako usługę dla innych, musisz publicznie udostępnić swój kod. To klasyczny sposób na to, żeby zostać open source i jednocześnie nie dać dużym firmom hostingowym za darmo skopiować produktu i sprzedawać go jako własną usługę bez oddania czegokolwiek społeczności. Dla klientów korporacyjnych, którzy nie chcą się bawić z AGPL, dostępna jest licencja komercyjna przez plan agencyjny.

Użytkownicy chmurowej wersji Sitepins nie zauważą żadnej zmiany, model biznesowy się nie zmienia, po prostu dochodzi opcja self-hosted dla tych, którzy chcą pełną kontrolę albo nie ufają, że firma przetrwa kolejne pięć lat.

**Key takeaways:**
- AGPL-3.0 daje darmowy self-hosting, ale wymaga otwarcia kodu, jeśli modyfikacje trafiają do publicznej usługi
- CMS czyta strukturę treści z istniejących plików Markdown i frontmattera, bez ręcznej konfiguracji schematu
- To głównie ruch biznesowy budujący zaufanie po tym, jak poprzedni dostawca CMS-a zniknął z rynku

**Why do I care:** To bardziej historia biznesowa niż inżynierska, więc mówię to od razu. Ale jako ktoś, kto zarządzał treścią kilku stron statycznych, rozumiem lęk, który stoi za tą decyzją: nikt nie chce drugi raz zostać bez edytora, kiedy dostawca po prostu zamknie firmę. AGPL jest tu rozsądnym kompromisem, bo chroni projekt przed tym, żeby jakiś hyperscaler po prostu wziął kod i odsprzedał jako swoją usługę. Jeśli ktoś trzyma treść w Markdownie w repo, to i tak jest to zdrowszy model niż zamknięty CMS z własną bazą danych, więc Sitepins trafia w realny problem, nawet jeśli sama nowość jest głównie licencyjna.

**Link:** [Sitepins CMS is now open source](https://sitepins.com/blog/sitepins-cms-is-now-open-source)

## Anthropic rozbudowuje certyfikaty Claude do czterech egzaminów

**TLDR:** Program certyfikacji Claude od Anthropic wyrósł z jednego egzaminu dla architektów do czterech: Associate Foundations, Developer Foundations, Architect Foundations i Architect Professional. Każdy trwa 120 minut, próg zdawalności to 720 z 1000 punktów, a certyfikat jest ważny 12 miesięcy. To ruch typowo biznesowy w ramach większego programu partnerskiego Anthropic.

**Summary:** Do połowy 2026 roku istniał tylko jeden egzamin, dla architektów rozwiązań korzystających z Claude. W lipcu program rozrósł się do czterech ścieżek, co pokazuje, jak szybko Anthropic chce zbudować ekosystem ludzi z formalnym potwierdzeniem umiejętności wokół swoich produktów, podobnie jak od lat robią to AWS, Google Cloud czy Salesforce.

Associate Foundations jest skierowany do osób, które nie programują, tylko doradzają albo wdrażają Claude w procesach biznesowych, i to 60 pytań w siedmiu domenach. Developer Foundations celuje w inżynierów budujących z Claude API, Claude Code i Model Context Protocol, od pierwszej integracji do produkcyjnych agentów, i wymaga swobody w Pythonie albo TypeScript oraz komfortu z REST API. Architect Foundations jest dla osób projektujących całe rozwiązania z Claude, z rekomendowanym doświadczeniem około sześciu miesięcy praktycznej pracy. Architect Professional to szczyt drabiny, dla seniorów zarządzających wdrożeniami na poziomie enterprise, z rekomendowanymi trzema latami w architekturze systemów.

Co ciekawe, żaden z egzaminów nie wymaga wcześniejszego zdania innego jako warunku, czyli można od razu podejść do Architect Professional bez przechodzenia przez Foundations. Egzaminy są dostarczane przez Pearson VUE, online albo w centrach testowych, co jest standardowym rozwiązaniem dla certyfikacji korporacyjnych. Materiały do nauki są darmowe, ale sam egzamin to koszt rzędu 99 do 175 dolarów w zależności od ścieżki.

To wszystko dzieje się w ramach szerszego programu partnerskiego Anthropic, ogłoszonego z zapowiedzią stu milionów dolarów inwestycji w ekosystem, co sugeruje, że Anthropic traktuje certyfikację jako narzędzie do budowania lojalności partnerów i konsultantów, nie tylko jako sposób weryfikacji wiedzy.

**Key takeaways:**
- Program wyrósł z jednego egzaminu dla architektów do czterech ścieżek: Associate, Developer, Architect Foundations i Architect Professional
- Żaden egzamin nie wymaga wcześniejszego zdania innego jako prerequisitu, więc ścieżki są niezależne
- Egzaminy kosztują od 99 do 175 dolarów, dostarczane przez Pearson VUE, ważne 12 miesięcy

**Why do I care:** To zdecydowanie historia biznesowa, nie techniczna, więc nie oczekujcie tu żadnego nowego insightu inżynierskiego. Certyfikaty od dostawców modeli traktuję z rezerwą, bo umiejętność zdania egzaminu wielokrotnego wyboru o Claude API mówi mi mniej o realnych kompetencjach kandydata niż jeden dobrze przeprowadzony wywiad techniczny albo przegląd jego kodu. Rozumiem, że dla firm konsultingowych taki papierek bywa przydatny jako argument sprzedażowy do klienta korporacyjnego, ale jako architekt patrzę na to raczej jako na element marketingu ekosystemu Anthropic niż na realny wyznacznik jakości pracy.

**Link:** [Claude Certifications: The Complete 2026 Guide to All Four Anthropic Exams](https://claudecertificationguide.com/blog/new-claude-certifications-2026)
