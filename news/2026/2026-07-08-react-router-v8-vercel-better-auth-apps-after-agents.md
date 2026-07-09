---
title: "React Router v8, Vercel przejmuje Better Auth i przyszłość aplikacji w erze agentów AI"
excerpt: "Tygodniowy przegląd: nowe wydanie React Router v8 z RSC, przejęcie Better Auth przez Vercel, filozofia substratów w świecie agentów AI oraz esej o sensie uczenia się programowania."
publishedAt: "2026-07-08"
slug: "react-router-v8-vercel-better-auth-apps-after-agents"
hashtags: "#uidev #reactrouter #vercel #betterauth #opentelemetry #ai #agents #pl"
source_pattern: "ui.dev"
---

## React Router v8

**TLDR:** React Router właśnie wydał v8 i jest to jeden z najbardziej nudnych major release'ów w historii projektu. Nudnych w bardzo dobrym sensie: miliony projektów mogą przejść na nową wersję bez rewolucji. Największe zmiany to wsparcie dla RSC, nowy hook useRouterState oraz oficjalne wsparcie dla "agent skills".

**Summary:**

Dwanaście lat temu React Router zmienił to, jak myślimy o nawigacji w aplikacjach React. Przez lata każda nowa major wersja wywoływała nerwowe ataki u deweloperów próbujących ogarnąć skalę zmian. Tym razem jest inaczej, bo zespół konsekwentnie realizuje filozofię "future flags" od wersji v7, dzięki której większość zmian można adoptować inkrementalnie, zanim jeszcze trafi do oficjalnej major wersji.

W v8 podniesiono wymagania dla środowiska: Node.js wymaga teraz minimum 22.22.0, React 19.2.7 i Vite 7. Biblioteka jest teraz publikowana wyłącznie jako moduł ESM, co eliminuje sporo historycznego bagażu. Usunięto też pakiet react-router-dom, który był jedynie aliasem ułatwiającym migrację z v6 i od teraz nie ma uzasadnienia dla jego istnienia.

Dwie rzeczy zasługują na więcej uwagi. Po pierwsze, wsparcie dla React Server Components jest na pokładzie, choć wciąż oznaczone jako niestabilne. Można zwracać React elementy z loaderów i akcji, eksportować ServerComponent z modułu trasy, albo skorzystać z trybu RSC Data Mode dla własnych abstrakcji. To nie jest gotowe do produkcji, ale kierunek jest wyraźny. Po drugie, nowy hook useRouterState konsoliduje rozproszony przez lata ekosystem małych hooków: useLocation, useParams, useNavigation i kilka innych mają teraz jeden punkt wejścia. To zmiana, na którą wiele aplikacji czekało.

Ciekawostką jest wprowadzenie "agent skills" bezpośrednio do create-react-router. Nowe projekty dostają gotowy kontekst dla asystentów AI, który rozumie strukturę projektu. Zespół oficjalnie uznaje, że kodowanie wspomagane AI jest teraz standardowym workflow, nie eksperymentem.

React Router v6 i Remix v2 trafiają na EOL. Jeśli ktoś jeszcze siedzi na tych wersjach, czas na migrację. Na horyzoncie pojawia się też informacja, że Remix 3 idzie zupełnie inną drogą, oddzielając się od React i stając się full-stack frameworkiem niezależnym od biblioteki UI.

**Key takeaways:**
- React Router v8 wymaga Node 22.22+, React 19.2.7+ i Vite 7, a sama biblioteka jest teraz ESM-only
- RSC jest dostępne jako eksperymentalna funkcja, a hook useRouterState porządkuje chaos rozproszonych hooków
- Projekt przyjmuje roczny cykl major release'ów, co czyni wersjonowanie bardziej przewidywalnym

**Why do I care:** Doceniam kierunek, w jakim idzie React Router. "Boring upgrades" to nie marketing, to realna zmiana filozofii w stosunku do traumy migracji z v3 na v4 czy v5 na v6. Niepokoją mnie jednak dwie rzeczy: RSC wciąż jest niestabilne po roku od zapowiedzi, i coraz wyraźniej widać, że React Router z RSC to skomplikowane skrzyżowanie odpowiedzialności między routerem a bundlerem. Ciekaw jestem, czy roczny cadence release'ów przetrwa zderzenie z realnym tempem zmian w ekosystemie React. Remix 3 idący "inną drogą" też brzmi jak potencjalne zamieszanie dla osób, które dopiero niedawno przeszły z Remix v2 na React Router v7.

**Link:** [React Router v8](https://remix.run/blog/react-router-v8)

---

## Vercel acquires Better Auth to accelerate open source auth

**TLDR:** Vercel przejął Better Auth, najpopularniejszą TypeScriptową bibliotekę do autoryzacji z 4,7 miliona tygodniowych pobrań z npm. Biblioteka pozostaje open source na licencji MIT, a przejęcie ma związek z rosnącym zapotrzebowaniem na tożsamość agentów AI.

**Summary:**

Better Auth to stosunkowo młoda biblioteka, która w krótkim czasie zdobyła dominującą pozycję w ekosystemie TypeScript dzięki prostocie integracji, niezależności od frameworków i ponad 850 kontrybutorów. Decyzja Vercela o przejęciu jest ciekawa z kilku powodów naraz.

Po pierwsze, strategia Vercela ostatnich lat jest konsekwentna: kupować lub budować narzędzia, które są "otwarte domyślnie" i działają poza własną platformą. Next.js, AI SDK, Nuxt, teraz Better Auth. To nie jest przypadek. Model polega na tym, że infrastruktura staje się ekosystemem, a nie zamkniętą platformą, bo deweloperzy nie chcą vendor lock-in na poziomie fundamentalnych bibliotek.

Po drugie, naprawdę ciekawy jest powód przejęcia, który nie jest natychmiast oczywisty: tożsamość agentów AI. Kiedy agent działa w twoim imieniu, używa twojej tożsamości i twoich uprawnień. Nie ma żadnego czystego mechanizmu, który pozwoliłby ograniczyć co konkretny agent lub sub-agent może zrobić, albo wyłączyć jednego agenta nie odcinając przy tym wszystkich pozostałych. Zespół Better Auth od jakiegoś czasu pracuje nad Agent Auth Protocol, który pozwala każdemu agentowi mieć własną tożsamość i własne, ograniczone, odwołalne uprawnienia, z użytkownikiem jako centralnym punktem kontroli.

To jest faktycznie ważny problem infrastrukturalny, który pojawia się w momencie gdy systemy wieloagentowe przestają być eksperymentem i stają się produkcją. Vercel Connect ma wkrótce skorzystać z tej pracy. Biblioteka pozostaje wolna, MIT, bez żadnych zmian w strukturze zarządzania ani wspieranych frameworkach.

**Key takeaways:**
- Better Auth zachowuje licencję MIT i niezależną strukturę governance po przejęciu
- Vercel kupił bibliotekę przede wszystkim dla kompetencji w zakresie tożsamości agentów AI, nie tylko klasycznej autoryzacji użytkowników
- Agent Auth Protocol adresuje realne luki bezpieczeństwa w systemach wieloagentowych

**Why do I care:** Przejęcia "soft landing" open source projektów mają swoją historię i nie zawsze kończą się dobrze dla społeczności. W tym przypadku motywacja biznesowa Vercela jest czytelna i zbieżna z kierunkiem rozwoju biblioteki, więc ryzyko wydaje mi się mniejsze niż przy typowych przejęciach. Natomiast problem tożsamości agentów jest realny i niedoceniany. Budując dziś systemy agentic na produkcji, operujesz z blankietowymi poświadczeniami. Agent Auth Protocol to kierunek, w którym cała branża i tak musi zmierzać.

**Link:** [Vercel acquires Better Auth to accelerate open source auth](https://vercel.com/blog/vercel-acquires-better-auth)

---

## Designing for GenUI: What Changes When AI Builds the UI?

**TLDR:** Zespół gskinner zaprojektował i zbudował Hatcha, aplikację do planowania wydarzeń korzystającą z Google GenUI na Flutter, gdzie AI komponuje interfejs w czasie rzeczywistym na podstawie systemu projektowego. Artykuł opisuje jak zmienia się rola designera gdy zamiast projektować ekrany, projektuje się reguły, struktury i katalog komponentów.

**Summary:**

Google GenUI to SDK wydany przez Flutter team, który pozwala AI składać interfejsy użytkownika w runtime na podstawie systemu projektowego. Hatcha jest open-source aplikacją demonstracyjną, w której gospodarz planuje wydarzenie przez rozmowę z AI, a GenUI generuje dynamicznie spersonalizowane zaproszenia i interfejs zarządzania dla konkretnych gości.

Fundamentalna zmiana, którą opisuje artykuł, dotyczy relacji designera z produktem. Klasyczne UI to kompozycja z góry ustalona: każdy ekran jest zaprojektowany, każdy przepływ użytkownika zmapowany. Projektant wie, dokładnie co zobaczy użytkownik w każdym kroku. W GenUI ta pewność znika, bo ekrany są składane na bieżąco z katalogu komponentów i zestawu reguł. Praca designera przesuwa się więc od projektowania ekranów do projektowania struktury, hierarchii, reguł priorytetyzacji i guardrails. System projektowy przestaje być dokumentacją implementacji, a staje się inwentarzem z którego AI wybiera odpowiednie elementy do zadanego kontekstu.

To pociąga za sobą poważne pytanie, które pochłonęło zespół gskinner znaczną ilość czasu: co powinno być GenUI, a co nie? Każda powierzchnia GenUI to tradeoff między przewidywalnością a elastycznością. Stałe fragmenty interfejsu są szybkie, tanie i zachowują się identycznie za każdym razem. GenUI wydaje tokeny przy każdej kompozycji, renderuje wolniej i może pojawić się w kształtach, których nie do końca przewidywałeś. Dla liniowych, regulowanych procesów gdzie każdy krok musi być audytowalny, stały przepływ nadal jest właściwą odpowiedzią.

Artykuł opisuje też zmianę deliverables: zamiast makiet projektant oddaje definicje komponentów, kryteria kiedy każdy komponent powinien się pojawić, prompty kształtujące każdą pętlę i decyzję co w ogóle powinno być GenUI. Pętla feedbacku z developmentem staje się obowiązkowa, bo tylko przez testowanie dowiadujesz się czy definicja komponentu rzeczywiście robi to, co myślisz że robi.

**Key takeaways:**
- W GenUI projektant tworzy inwentarz komponentów z regułami użycia, nie gotowe ekrany
- Pytanie "co powinno być GenUI a co nie" jest centralnym problemem projektowym, który wymaga świadomego wyboru przy każdej powierzchni
- Bliska współpraca z developmentem i szybkie pętle testowania są niezbędne, bo AI może interpretować definicje komponentów inaczej niż projektant zakładał

**Why do I care:** Artykuł jest uczciwy w kwestii kosztów i ograniczeń, co wyróżnia go na tle marketingowych showcase'ów. Realna obserwacja: GenUI to nie "AI robi UI za ciebie", to bardziej "AI wybiera z twojego katalogu lepiej dopasowane elementy do konkretnego kontekstu". Systemowe myślenie, hierarchia informacji, atomowe komponenty jako building blocks, to nie jest nowe dla doświadczonych designerów systemów. Nowe jest tylko to, że klientem tych abstrakcji jest teraz model językowy zamiast dewelopera. Warto eksperymentować z tym kierunkiem, szczególnie przy produktach gdzie personalizacja jest wartością samą w sobie.

**Link:** [Designing for GenUI: What Changes When AI Builds the UI?](https://blog.gskinner.com/archives/2026/06/designing-for-genui-what-changes-when-ai-builds-the-ui.html)

---

## Harness Engineering for Self-Improvement

**TLDR:** Lilian Weng z Anthropic opublikowała rozległy przegląd badań nad "harness engineering", czyli systemami otaczającymi modele AI, które odpowiadają za to jak modele myślą, planują, korzystają z narzędzi i zarządzają kontekstem. Artykuł bada jak te systemy mogą same siebie ulepszać, co prowadzi w kierunku rekurencyjnego samodoskonalenia AI.

**Summary:**

Harness to system otaczający bazowy model językowy: zarządza przepływem pracy, obsługuje narzędzia, zarządza kontekstem, przechowuje artefakty i ocenia wyniki. Claude Code, Codex i podobne produkty to w istocie bazy modelów plus harness, a nie sam model. Ta warstwa jest równie ważna co raw intelligence modelu.

Artykuł organizuje aktualny stan badań wokół kilku wzorców projektowych. Workflow automation to definiowanie pętli cel-planowanie-wykonanie-testowanie-iteracja. Filesystem as persistent memory to wzorzec gdzie harness nie trzyma całego stanu w kontekście, ale pisze do plików: logi eksperymentów, trajektorie rolloutów, podsumowania błędów. Sub-agent i backend jobs to możliwość spawniowania równoległych agentów do różnych hipotez, z parent agentem jako prostym process managerem.

Szczególnie interesująca jest część o optymalizacji harnessu. Agentic Context Engineering (ACE) traktuje kontekst jako ewoluujący playbook z numerowanymi punktami, które są inkrementalnie aktualizowane. Meta Context Engineering (MCE) idzie poziom wyżej: optymalizuje mechanizm zarządzania kontekstem, a nie sam kontekst. Meta-Harness optymalizuje kod który decyduje co w ogóle powinno być w kontekście.

Najbardziej prowokacyjna część to Self-Harness, gdzie agent minuje własne wzorce porażek, proponuje ograniczone zmiany w harnesssie, i waliduje je przez testy regresji. System działa, ale autor wprost ostrzega: jeśli program może edytować swój własny "OS", granice abstrakcji są złamane. Warstwy kontroli uprawnień muszą leżeć poza pętlą, która ewoluuje harness.

Artykuł kończy się listą otwartych problemów, które brzmią jak szczera diagnoza: słabe ewaluatory dla nieobjektywnych zadań, kolapsy dywersyfikacji w pętlach ewolucyjnych, reward hacking, degradacja umiejętności ludzkich przy wzroście autonomii agentów (paradoks Bainbridge'a) i pytanie o rolę ludzi jako oversight, nie jako zastępowanych pracowników.

**Key takeaways:**
- Harness jest tak samo ważny jak sam model: Claude Code i podobne narzędzia to model plus system otaczający, nie sam model
- Rekurencyjne ulepszanie harnessu działa, ale wymaga warstw bezpieczeństwa poza pętlą optymalizacji
- Paradoks Bainbridge'a jest realnym zagrożeniem: im lepsze agenty, tym bardziej ludzie wyłączają się z pętli feedbacku, niszcząc właśnie kompetencje potrzebne gdy automatyzacja zawiedzie

**Why do I care:** To jeden z najważniejszych artykułów technicznych o AI jakie czytałem w tym roku. Autorka nie sprzedaje wizji, tylko opisuje konkretne wzorce i ich ograniczenia z naukową precyzją. Dla mnie jako architekta systemów kluczowe jest rozróżnienie między harness a core intelligence: architektury które budujemy dziś mają tyle samo wspólnego z programowaniem co z inżynierią systemów operacyjnych. Wzorzec "filesystem as persistent memory" i "sub-agents jako parallel workers" to nie metafory, to dosłowny kierunek na najbliższe lata. Ostrzeżenie przed reward hacking i konieczność zewnętrznego oversight to nie bezpieczna rezerwa badaczki z Anthropic, to rzeczy które deweloperzy budujący agentic systems dziś powinni uwzględniać w architekturze.

**Link:** [Harness Engineering for Self-Improvement](https://lilianweng.github.io/posts/2026-07-04-harness/)

---

## Apps After Agents

**TLDR:** Kyle Matthews z bricolage.io argumentuje, że aplikacje przetrwają erę agentów AI z dwóch powodów: agenci nie mogą zautomatyzować pracy nierutynowej, a użytkownicy i tak wołą zaprojektowane interfejsy od prompt-driven chat. Centralną tezą jest koncepcja "substratu", czyli skrystalizowanej wiedzy organizacyjnej, która jest prawdziwym moatem firmy.

**Summary:**

Artykuł zaczyna od konfrontacji z "capability maximalists": tezą, że wystarczająco inteligentny agent zrobi wszystko. Autor przyznaje, że Gorzka Lekcja Richa Suttona (ogólne metody skalujące się przez obliczenia biją specjalistyczną wiedzę) jest prawdziwa, ale ma granice. Satya Nadella, który zainwestował 13 miliardów w OpenAI i zarabia na infrastrukturze ich modeli, zakłada jednak, że "granica bez ekosystemu nie jest stabilna". Modele są zamienialne, learning loop jest IP.

Distinkcja między "camera mode" a "engine mode" agentów jest najbardziej użyteczną częścią artykułu. W camera mode agent eksploruje: czyta pliki, buduje mapę kodu, zadaje pytania wyjaśniające. W engine mode wykonuje: ma plan, pisze kod, odpala testy. Engine mode jest eksploatacją, działa świetnie w stabilnych domenach gdzie mapa odpowiada terytorium. Camera mode jest eksploracją, powolną ale samokorygującą się. Błąd mode blindness, niewiedzenie w jakim trybie jesteś, prowadzi do "psychotic productivity": agent wykonuje z pełną prędkością przez domenę, której nie rozumie, produkuje outputy szybciej niż ktokolwiek może je ocenić.

Argument o automatyzacji jest historycznie umocowany: każda fala automatyzacji przez 150 lat eliminuje rutynową pracę, ale tworzy nowe kategorie pracy nierutynowej. Traktory zastąpiły 39% rolników, ale pozostałe 2% robi teraz diagnozę chorób roślin, planowanie upraw i zarządzanie sprzętem. Podobnie będzie z agentami.

Substrate jako koncepcja to najbardziej oryginalny wkład artykułu. To nie tylko skumulowane dane, ale skrystalizowane decyzje, udokumentowane konwencje, historia wyjątków, zakodowana wiedza o tym co działa. System of record, który przechwytuje wiedzę tacitną ze spotkań korytarzowych i głów ekspertów. Modele są commodity. Substrate, a zwłaszcza substrate o tym co czyni cię różnym, jest moatem. Pytanie nie brzmi "jak inteligentni są twoi agenci", ale "gdzie mieszka twoja skrystalizowana ocena sytuacji".

Autor punktuje też paradoks Bainbridge'a: im lepsi agenci, tym bardziej ludzie wyłączają się. Ale camera territory wciąż wymaga ludzkiego zaangażowania, a umiejętność rozpoznawania camera territory degraduje się przez nieużywanie.

**Key takeaways:**
- Aplikacje przetrwają z powodów po stronie podażowej (agenci nie mogą zautomatyzować pracy nierutynowej) i popytowej (użytkownicy wolą zaprojektowane interfejsy od chat)
- Substrate, skrystalizowana wiedza organizacyjna, jest realnym moatem; modele są commodity i wymienialne
- Mode blindness (niewiedzenie czy jesteś w camera czy engine mode) to centralny failure mode systemów agentic

**Why do I care:** To jest jeden z lepszych esejów o naturze automatyzacji jakie przeczytałem. Historyczna analogia do poprzednich fal automatyzacji jest uczciwa i uniemożliwia zarówno panikę jak i samozadowolenie. Koncepcja substratu rezonuje z tym co obserwuję u klientów: ci którzy wygrywają z AI to ci, którzy mają świetne testy, dobrą dokumentację konwencji i historię decyzji architektonicznych zakodowaną gdzieś dostępnym dla agentów. Ale artykuł omija jeden ważny problem: kto decyduje co jest camera a co engine territory? Ten meta-problem jest trudniejszy niż sam podział.

**Link:** [Apps After Agents](https://bricolage.io/apps-after-agents/)

---

## Learning to code is still worthwhile

**TLDR:** Steve Krouse, założyciel Val Town, argumentuje że warto uczyć się programowania nawet w erze AI, ale z powodów edukacyjnych i twórczych, nie czysto zawodowych. Kodowanie uczy meta-umiejętności myślenia, debugowania i logiki, a samo w sobie jest formą twórczej ekspresji.

**Summary:**

Sam Harris stwierdził niedawno, że nikt w Dolinie Krzemowej nie mówi już "naucz się kodować" jako ścieżki wyjścia z ubóstwa. Krouse zgadza się z tym wąsko zawodowym odczytaniem, ale broni wartości kodowania z szerszej perspektywy. Porównuje programowanie do matematyki, literatury czy muzyki: warto uczyć się nie dla pracy, ale dla samej wartości edukacyjnej.

Artykuł przywołuje Seymoura Paperta i jego koncepcję Mathland: zamiast uczyć matematyki przez instrukcje, stworzyć środowisko, gdzie ludzie "mówią matematiką" przez eksplorację. Papert stworzył język LOGO z żółwiem rysującym na ekranie. Krouse widzi programowanie jako podobne środowisko: uczy debugowania, kompozycji i logiki jako meta-umiejętności, a przede wszystkim daje poczucie, że nie ma nic czego nie można się nauczyć.

Porównanie do rzucania zaklęć jest trafne: opanowanie archaicznej składni otwiera możliwość materialializowania wyobraźni. LLMy piszą po angielsku równie dobrze jak piszą kod, ale nikt nie boi się o znaczenie humanistyki przez to, że AI pisze eseje. Ta sama intuicja powinna dotyczyć kodu. Argument jest skrócony i nieco miękki, ale uczciwy w swojej skromności.

**Key takeaways:**
- Wartość uczenia się kodowania leży w meta-umiejętnościach i twórczym wyrażaniu siebie, nie tylko w perspektywach zawodowych
- Papertowska filozofia uczenia przez eksplorację jest równie aktualna w erze AI jak była w erze LOGO
- Samo programowanie jest formą twórczej ekspresji porównywalnej do pisania lub muzyki

**Why do I care:** Artykuł jest krótki i osobisty, co czyni go odświeżającym na tle technicznych deep dive'ów. Zgadzam się z tezą, ale brakuje mi odpowiedzi na trudniejsze pytanie: co konkretnie powinien teraz umieć junior developer, skoro AI pisze boilerplate lepiej niż przeciętna osoba po bootcampie? Meta-umiejętności debugowania i logiki są ważne, ale potrzebują nowego nośnika. Może LOGO dla 2026 roku to jest właśnie promptowanie i iterowanie z agentem, a nie pisanie od zera?

**Link:** [Learning to code is still worthwhile](https://stevekrouse.com/learn-to-code)

---

## How to Export Next.js Traces with OpenTelemetry

**TLDR:** Sentry opisuje jak skonfigurować eksport śladów (traces) z Next.js do dowolnego backendu OpenTelemetry przy użyciu biblioteki @vercel/otel, z praktycznym przykładem wysyłki do Sentry. Next.js ma wbudowaną obsługę tracingu, ale bez skonfigurowanego eksportera śladów nigdy nie zobaczysz.

**Summary:**

Next.js instrumentuje automatycznie przychodzące żądania, wywołania fetch, middleware i server-side rendering, ale dane te gdzieś muszą trafić. OpenTelemetry to otwarty standard dla transportu danych telemetrycznych i @vercel/otel to biblioteka, która konfiguruje SDK automatycznie i obsługuje różnice między runtime'em Node i Edge.

Konfiguracja sprowadza się do stworzenia pliku instrumentation.ts w katalogu głównym projektu i wywołania registerOTel z nazwą serwisu. Next.js automatycznie ładuje ten plik przy starcie. Eksport do Sentry wymaga dwóch zmiennych środowiskowych: endpointu OTLP i nagłówka autoryzacyjnego. Bez żadnych innych zmian w kodzie aplikacji, ślady zaczynają spływać do wybranego backendu.

Automatyczne spany od Next.js są generyczne, nie zawierają wiedzy o logice biznesowej. Dlatego artykuł opisuje jak dodawać własne spany wokół krytycznych operacji: generowanie faktury, ładowanie obrazu, wywołanie modelu AI. Konwencja nazewnictwa z notacją kropkową jest praktyczna: invoice.generate-pdf pozwala agregować spany po domenie, a potem zawężać do konkretnej operacji.

Artykuł uczciwie porównuje dwa podejścia: bezpośredni eksport OTLP przez @vercel/otel versus Sentry SDK. Direct OTLP jest lżejszy, standardowy i dobry gdy masz już istniejący stack OpenTelemetry lub hostujesz Next.js samodzielnie. Sentry SDK daje więcej: browser tracing, monitorowanie błędów, source-mapped stack traces, Session Replay. Istotne ograniczenie @vercel/otel: customowe spany działają tylko w runtime Node, nie w Edge.

**Key takeaways:**
- @vercel/otel minimalizuje konfigurację tracingu w Next.js do kilku linii kodu i dwóch zmiennych środowiskowych
- Własne spany wokół operacji biznesowych mają fundamentalne znaczenie dla użyteczności danych telemetrycznych
- Direct OTLP i Sentry SDK nie powinny być inicjalizowane jednocześnie w tej samej aplikacji, bo oba rejestrują tracer provider

**Why do I care:** Observability jest jednym z najbardziej niedoinwestowanych obszarów w typowych projektach frontend. Większość zespołów wie że tracing jest ważny, ale konfiguruje go dopiero gdy produkcja już płonie. @vercel/otel obniża barierę na tyle, że nie ma wymówek. Doceniam też uczciwe zestawienie OTLP vs SDK zamiast prostego "użyj naszego produktu". Jedyne co brakuje w artykule to dyskusja o kosztach: tracing generuje dane i ktoś płaci za ich przechowywanie, więc selektywność w tym co instrumentujesz ma znaczenie ekonomiczne.

**Link:** [How to Export Next.js Traces with OpenTelemetry](https://blog.sentry.io/nextjs-export-traces-opentelemetry/)
