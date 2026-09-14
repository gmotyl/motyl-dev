---
title: "App Router kontra Pages Router, Astryx od Mety, cmentarzysko feature flagów i debata o AI doom"
excerpt: "Toss Bank testuje migrację na App Router i się wycofuje, Meta otwiera design system Astryx, a nieusuwane feature flagi kosztowały Knight Capital 440 milionów dolarów."
publishedAt: "2026-09-14"
slug: "app-router-toss-bank-astryx-feature-flags-ai-doom"
hashtags: "#dailydev #frontend #nextjs #react #architecture #ai #generated #pl"
source_pattern: "daily.dev"
---

## Czy korzyści App Routera są korzyściami także dla nas?

**TLDR:** Zespół frontendowy Toss Banku przez kilka miesięcy testował migrację z Pages Router na App Router i React Server Components. Na koniec świadomie zostawił produkcję przy starym rozwiązaniu, bo koszty utrzymania granicy server/client przebiły korzyści ze streamingu i mniejszego bundle'a.

**Summary:** Toss Bank to koreański fintech łączący płatności, bankowość i inwestycje w jednej aplikacji, a jego ekrany renderują się głównie w webview wewnątrz aplikacji mobilnej. Zespół sprawdzał, czy wyświetlanie sekcji strony w miarę gotowości danych, czyli obietnica Suspense i App Routera, poprawi realny UX. W testach z opóźnieniami rzędu jednej, trzech i pięciu sekund na trzy sekcje pierwszy render (FCP) wyniósł 64 ms w Chromium, ale aż 5065 ms w WebKit, bo silnik czekał, aż uzna, że na stronie jest "wystarczająco dużo treści" do namalowania. Niewidzialny SVG na górze strony zbił to do 103 ms. Rozwiązał tylko jeden problem, bo kolejnym było to, że skeletony i realna treść mają różną wysokość, więc w pionowym layoucie sekcja ładująca się wyżej przesuwała w dół to, na co użytkownik już patrzył. Dopracowanie wysokości skeletonów zbiło CLS z 0,138 do 0,036, ale każda zmiana treści wymagała ponownej kalibracji.

Server Components dawały realne plusy niezależnie od streamingu. Mniejszy bundle dzięki wykluczeniu kodu server-only z klienta i prostszy dostęp do danych autoryzacyjnych przez `headers()` zamiast ręcznego przekazywania tokenów przez `getServerSideProps`. Problem w tym, że `headers()` nie działa w komponencie klienckim nawet podczas renderowania po stronie serwera, więc zespół rozdzielił implementacje server/client przez warunkowe eksporty w `package.json`, zachowując jedną ścieżkę importu dla wywołujących. Prawdziwym kosztem okazało się jednak pilnowanie granicy między drzewem server-only a kodem przeglądarkowym. Most komunikujący webview z aplikacją natywną po prostu cicho nic nie robił, gdy wywołano go z Server Component, bez żadnego błędu.

Najbardziej kosztowny okazał się bug przy współistnieniu obu routerów. Z ustawionym `basePath` nawigacja z ekranu Pages Router na inny ekran Pages Router czasem kończyła się 404, bo `basePath` doklejał się podwójnie. Router kliencki używa filtra Blooma do zgadywania, czy cel należy do App Routera, a trasa dynamiczna App Routera zarejestrowana jako `/a/[id]` dopasowywała się też do `/a/a` z Pages Routera, co przy pełnym przeładowaniu strony prowadziło do nieistniejącego URL-a. Strategia współistnienia routerów, która miała ograniczać ryzyko migracji, sama stała się jego źródłem. Do tego dochodziła frustracja z powolnym tempem ekosystemu. PR przywracający wzorzec trasy w `usePathname()` (potrzebny do grupowania logów) wisiał jako draft od końca października, a usunięcie `router.events` wymusiło budowę osobnego pakietu zastępczego.

**Key takeaways:**
- Suspense i streaming nie zawsze poprawiają UX. W layoutach jednokolumnowych, typowych dla webview, różne wysokości skeletonów generują własny layout shift.
- RSC realnie zmniejsza bundle i upraszcza obsługę auth przez `headers()`, ale koszt pilnowania granicy server/client bywa niedoceniany, a błędy na tej granicy bywają nieme.
- Współistnienie Pages Router i App Routera nie jest bezpieczne z definicji. Filtr Blooma używany do routingu może fałszywie dopasować trasę i wysłać użytkownika na nieistniejący URL.
- Popularność frameworka nie gwarantuje szybkich poprawek dla mniej mainstreamowych potrzeb, jak wzorzec trasy w logach.

**Why do I care:** To rzadki przypadek, w którym zespół nie tylko przetestował App Router, ale i pokazał całą matematykę decyzji o rezygnacji, łącznie z liczbami z prawdziwych testów na Chromium i WebKit. Warto to czytać jako kontrapunkt do defaultowego "migrujemy na App Router, bo tak się teraz robi". Jeśli wasze ekrany są proste, głównie klienckie i renderują się w webview, streaming może wam nic nie dać, a koszt utrzymania dwóch środowisk wykonania zostanie na lata.

**Link:** [Would App Router's Benefits Be Benefits for Us, Too?](https://daily.dev/posts/hhA4CruCf)

## Budowa pipeline'u do automatyzacji tłumaczeń

**TLDR:** Inżynier opisuje wydzielenie plików tłumaczeń wielojęzycznej usługi turystycznej (koreański, angielski, uzbecki w alfabecie łacińskim i cyrylicy, karakałpacki) z frontendowego repozytorium do osobnego serwisu serwowanego statycznie z poda nginx w Kubernetesie.

**Summary:** Zamiast trzymać pliki JSON z tłumaczeniami razem z kodem frontendu, zespół przeniósł je do dedykowanego repozytorium i zbudował skrypt Node.js, który spłaszcza zagnieżdżone klucze i porównuje je z bazowym językiem koreańskim, oznaczając brakujące klucze jako błąd blokujący deployment przez niezerowy kod wyjścia. Pipeline wdrożeniowy (walidacja, spakowanie do tar, znalezienie poda, `kubectl cp`, rozpakowanie) powstał zarówno w bashu, jak i PowerShellu, żeby obsłużyć zespoły na macOS i Windowsie. Po drodze trafili na błąd występujący tylko na Windowsie: wieloliniowe here-stringi przekazywane do `kubectl exec` ucinały się w połowie, co rozwiązali, dzieląc jedno wywołanie na kilka osobnych komend `kubectl exec`.

Efekt jest prosty do zmierzenia. Aktualizacje tłumaczeń wdrażają się w kilka sekund niezależnie od builda frontendu, a brakujące klucze są wyłapywane, zanim trafią na produkcję.

**Key takeaways:**
- Wydzielenie tłumaczeń z frontendowego repo do osobnego serwisu odseparowuje cykl release'u treści od cyklu release'u kodu.
- Prosty skrypt Node.js porównujący spłaszczone klucze z bazowym językiem wystarcza jako bramka jakości w CI.
- Multi-platformowy pipeline (bash i PowerShell) bywa konieczny nawet w małych zespołach, a różnice w obsłudze here-stringów między powłokami potrafią ukryć się głęboko w `kubectl exec`.

**Why do I care:** To bardzo przyziemny, ale rzetelny opis problemu, który dotyka każdy i18n w większej skali. Treści rosną szybciej niż cykl deploymentu frontendu, a walidacja kompletności tłumaczeń zwykle jest pierwszą rzeczą, którą ktoś pomija, "bo na razie i tak wszystko działa". Warto podkroić ten wzorzec do własnego stosu, zanim braki w tłumaczeniach wypłyną dopiero na produkcji.

**Link:** [Building a Translation Automation Pipeline](https://daily.dev/posts/5ce5C1gJu)

## Meta otwiera Astryx, design system gotowy pod agentów AI

**TLDR:** Meta open-source'owała Astryx, budowany wewnętrznie przez osiem lat design system dla Reacta oparty na React 19 i kompilatorze StyleX, z ponad 150 komponentami i narzędziami CLI/MCP kierowanymi do agentów AI.

**Summary:** Astryx trafił do publicznego repozytorium w becie na licencji MIT. Poza standardowym zestawem konfigurowalnych komponentów oferuje komendę `swizzle` do "wysunięcia" kodu źródłowego komponentu, gdy customizacja przez tokeny projektowe czy wzorzec wrappera nie wystarcza, czyli dostęp do prywatnego stanu, struktury DOM czy niepodpiętych listenerów zdarzeń. Komponenty zachowują natywne wsparcie dla `className`, więc dają się mieszać z Tailwindem czy CSS Modules obok typowanej właściwości `xstyle` ze StyleX-a, bez dodatkowej konfiguracji kompilatora. Reakcje społeczności są mieszane. Część użytkowników Reddita pyta o długoterminowe utrzymanie i governance frameworka sponsorowanego przez jedną firmę, inni już portują architekturę tokenów Astryksa do Svelte 5 i Fluttera.

**Key takeaways:**
- Astryx wymaga React 19+ i buduje się na StyleX, kompilatorze CSS-in-JS opracowanym wewnętrznie w Mecie.
- Komenda `swizzle` daje ucieczkę do pełnej customizacji przez ejekcję kodu, gdy tokeny i wzorce kompozycyjne nie wystarczają.
- Dedykowane narzędzia CLI i MCP sugerują, że Astryx projektowano z myślą o pracy agentów AI nad kodem UI, nie tylko o ludzkich developerach.

**Why do I care:** Osiem lat rozwoju wewnątrz Mety to solidna podszewka pod bibliotekę, ale pytanie o governance jest uzasadnione. Widzieliśmy już nieraz, jak wewnętrzne narzędzia dużych firm tracą priorytet po open-source'owaniu. Ciekawszy sygnał to nastawienie na agentów. Jeśli design systemy zaczynają dostawać dedykowane API dla AI obok API dla ludzi, to kierunek, na który architekci frontendowi powinni patrzeć przy wyborze kolejnego stacku UI, niezależnie od tego, czy akurat wybiorą Astryxa.

**Link:** [Meta Open-Sources Astryx, Its Agent-Ready React Design System](https://daily.dev/posts/CaH6B5xQf)

## Cmentarzysko feature flagów: jak siatka bezpieczeństwa zamienia się w dług techniczny

**TLDR:** Nieusuwane po wdrożeniu feature flagi generują kombinatoryczną eksplozję nieprzetestowanych ścieżek kodu i realne ryzyko produkcyjne, jak w 2012 roku, gdy przywrócona stara flaga kosztowała Knight Capital 440 milionów dolarów w 45 minut.

**Summary:** Flagi wprowadzane po to, by bezpiecznie wdrażać nowy kod, z czasem zamieniają się w niezarządzany dług, jeśli nikt ich nie usuwa po pełnym rollout. Przy dziesięciu aktywnych flagach serwis ma teoretycznie do 1024 kombinacji stanu systemu działających jednocześnie na produkcji. Żaden proces QA ani pipeline nie testuje realistycznie wszystkich kombinacji, więc klienci regularnie trafiają na układy flag, których żaden inżynier nigdy lokalnie nie uruchomił. Historia Knight Capital jest tu ostrzeżeniem podręcznikowym: nowy kod ponownie użył nazwy starej flagi, co włączyło przestarzałą, nieprzetestowaną ścieżkę na jednym z serwerów produkcyjnych i wywołało lawinę błędnych transakcji giełdowych.

Tekst proponuje klasyfikować flagi według cyklu życia (release, eksperyment, operacyjna, uprawnienia) i egzekwować ich wygasanie metadanymi w CI/CD: adnotacja z właścicielem i datą wygaśnięcia, po przekroczeniu której build się wywala, jeśli flaga wciąż istnieje w kodzie. Do tego dochodzą alerty na Slacku po 14 dniach od osiągnięcia 100% rollout oraz obowiązkowy ticket sprzątający tworzony razem z każdą nową flagą.

**Key takeaways:**
- Przy 10 aktywnych flagach system ma do 1024 możliwych kombinacji stanu, realistycznie nietestowalne w całości.
- Flaga to niespłacona pożyczka: traktowanie jej jako trwałego elementu architektury, a nie tymczasowego mostu, prowadzi wprost do długu technicznego.
- Skuteczne mechanizmy porządkujące to metadane z datą wygaśnięcia w CI/CD, alerty o zastałych flagach i ticket sprzątający tworzony razem z flagą, nie po fakcie.

**Why do I care:** Feature flagi to jeden z tych mechanizmów, które każdy wprowadza z dobrymi intencjami i prawie nikt nie ma procesu na ich systematyczne usuwanie. Incydent Knight Capital pokazuje, że to nie jest teoretyczne ryzyko, tylko konkretna, policzalna strata. W architekturze, którą projektujesz albo audytujesz, warto od razu wymusić metadane wygasania w CI, zamiast liczyć na to, że ktoś "kiedyś posprząta", bo z reguły nikt nie sprząta.

**Link:** [The Feature Flag Graveyard: How a Safety Net Becomes Technical Debt](https://daily.dev/posts/SEJGD2oAU)

## Naprawdę wierzą, że AI może zabić wszystkich

**TLDR:** Wiralowy tweet z rezygnacją badacza z Anthropic, ostrzegający przed wyginięciem ludzkości przez AI do końca dekady, wznowił debatę o "AI doom". Tekst broni tezy, że społeczność bezpieczeństwa AI szczerze wierzy w to ryzyko od połowy lat 2000., a nie robi PR.

**Summary:** Zamiast zbywać takie opinie jako self-promocję, próbę manipulacji kursem akcji czy czysty PR, autor prześledza historię społeczności AI safety sięgającą postaci takich jak Eliezer Yudkowsky, publikujący o ryzyku superinteligencji jeszcze przed 2010 rokiem, zanim temat trafił do mainstreamu. Omawia proponowane mechanizmy zagłady w kolejności wiarygodności: autonomiczne laboratoria biologiczne tworzące maksymalnie zjadliwy patogen, infiltrację systemów decyzyjnych wojska prowadzącą do globalnej wojny nuklearnej, przejęcie robotyki i dronów do fizycznej eliminacji ludzi oraz nanotechnologiczną "szarą maź". Odpiera typowe kontrargumenty. Częściowa zagłada wciąż się liczy, rządy nie mogą po prostu znacjonalizować laboratoriów, a "po prostu wyłączmy to" nie zadziała wobec wystarczająco zdolnego systemu.

Najciekawszy wątek to wyjaśnienie, dlaczego wierzący w te scenariusze wciąż pracują nad AI zamiast się jej przeciwstawiać: wielu uważa, że tylko dopasowana (aligned) superinteligencja może uratować ludzkość długoterminowo, a dynamika typu "foom", czyli gwałtownego samodoskonalenia, sprawia, że kto pierwszy dotrze do przełomu, ten może zatrzymać rywalizujące laboratoria.

**Key takeaways:**
- Ryzyko egzystencjalne AI jest w tej społeczności traktowane poważnie od ponad piętnastu lat, nie od czasu ostatniej fali hype'u.
- Główne proponowane mechanizmy zagłady to bioweapons, przejęcie systemów wojskowych, robotyka i nanotechnologia, w tej kolejności wiarygodności według badaczy.
- Termin "p(doom)" funkcjonuje w środowisku od około 2010 roku jako skrót na prawdopodobieństwo katastrofalnego scenariusza.
- Logika wyścigu "foom" tłumaczy, czemu część badaczy bezpieczeństwa nie odchodzi z branży, tylko zostaje w niej, by dotrzeć tam pierwsza.

**Why do I care:** Niezależnie od tego, czy podzielasz te scenariusze, warto rozumieć logikę stojącą za decyzjami dużych laboratoriów AI, bo ta logika kształtuje tempo wydawania nowych modeli, politykę bezpieczeństwa i to, jakie ograniczenia trafiają, albo nie trafiają, do produktów, z których korzystamy jako deweloperzy. To nie jest wyłącznie temat dla filozofów czy dziennikarzy. Decyzje podejmowane w tej logice realnie wpływają na to, jak szybko i jak bezpiecznie dostajemy kolejne wersje narzędzi, których używamy codziennie.

**Link:** [They really do think AI might kill everyone](https://daily.dev/posts/DUCtcwiyd)
