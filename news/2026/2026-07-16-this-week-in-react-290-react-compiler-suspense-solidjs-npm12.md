---
title: "React Compiler, Suspense, SolidJS 2.0 i bezpieczeństwo npm v12 — przegląd tygodnia"
excerpt: "Tygodniowy przegląd najważniejszych wydarzeń ze świata React i frontendu: React Compiler w szczegółach, aktualizacja programu bezpieczeństwa Next.js, Better Auth dołącza do Vercel, SolidJS 2.0 beta, asynchroniczna hydratacja w Preact i kilka mocnych argumentów o narzędziach budowania."
publishedAt: "2026-07-16"
slug: "this-week-in-react-290-react-compiler-suspense-solidjs-npm12"
hashtags: "#react #typescript #javascript #frontend #nextjs #solidjs #preact #reactnative #thisweekinreact #generated #pl"
source_pattern: "This Week In React"
---

## React Compiler — automatyczne memoizowanie bez wysiłku

**TLDR:** React Compiler to narzędzie działające w fazie budowania, które automatycznie dodaje memoizację do komponentów funkcyjnych. Wystarczy jeden wpis w konfiguracji Vite lub Next.js, żeby pozbyć się `useMemo`, `useCallback` i `React.memo` ze swojego kodu.

**Summary:** Artykuł Neciudana na neciudan.dev to jedno z lepszych, bardziej technicznych wyjaśnień tego, jak React Compiler faktycznie działa pod spodem. Nie używa `useMemo` w wynikowym kodzie, bo każde takie wywołanie alokuje domknięcie i tablicę zależności przy każdym renderowaniu. Zamiast tego kompilator generuje własny mechanizm cache'owania oparty na zwykłych tablicach, gdzie każdy slot przechowuje poprzednią wartość wejściową i wyjściową. Sprawdzanie odbywa się przez proste porównanie referencji — identyczne reguły, jakie stosuje `React.memo` i tablice zależności.

Co ważne, kompilator śledzi zależności na podstawie rzeczywistego przepływu danych, a nie tego, co programista wpisał w tablicę. Może też memoizować w miejscach, gdzie `useMemo` jest niedozwolone — na przykład po wczesnym returnie. Aby pominąć re-rendery komponentów potomnych, kompilator umieszcza wynik JSX w cache'u: jeśli nic się nie zmieniło, do Reacta trafia dokładnie ten sam obiekt elementu co poprzednim razem, a React po prostu pomija renderowanie całego poddrzewa. Efekt uboczny: żaden `React.memo` nie jest potrzebny, bo to rodzic przestaje produkować nowe opisy.

Liczby z produkcji są obiecujące. Meta zmierzyła poprawę o 12% w ładowaniu strony Quest Store, Sanity zanotowało 20-30% mniej czasu renderowania, a Wakelet odnotował poprawę LCP o 10% i INP o 15%. W samym Next.js 16 wystarczy ustawić `reactCompiler: true` w konfiguracji, żeby to włączyć. Warto jednak wiedzieć, że Next.js normalnie nie używa Babel — włączenie kompilatora dołącza go z powrotem do pipeline'u, co spowalnia buildowanie. Trwają prace nad pluginem SWC.

**Key takeaways:**
- Kompilator generuje własny mechanizm cache'owania zamiast `useMemo`, co jest tańsze przy masowym stosowaniu.
- Memoizacja działa przez stabilizację obiektów JSX, nie przez `React.memo` na dziecku.
- Istniejące `useMemo` i `useCallback` można zostawić — kompilator nie usuwa ich, dopóki nie może zagwarantować co najmniej równoważnej memoizacji.
- W Expo nowe aplikacje z SDK 54 mają kompilator włączony domyślnie.

**Why do I care:** Memoizacja to jeden z największych źródeł błędów w dużych bazach kodu React. Widziałem projekty, gdzie połowa `useMemo` nie robiła nic, bo gdzieś wyżej w drzewie tworzono nowy obiekt przy każdym renderowaniu. Kompilator rozwiązuje ten problem strukturalnie, a nie poprzez apelowanie do dyscypliny programistów. Wadą jest zaciemnienie relacji między kodem źródłowym a tym, co faktycznie się wykonuje — debugowanie może wymagać otwierania React DevTools zamiast czytania kodu.

**Link:** [The React Compiler](https://neciudan.dev/react-compiler-explained)

---

## Next.js formalizuje program wydań bezpieczeństwa

**TLDR:** Vercel ogłosił regularny, miesięczny cykl wydań poprawek bezpieczeństwa dla Next.js. Pierwsze planowane wydanie trafi do użytkowników 20 lipca 2026, obejmując poprawki czterech luk o wysokiej i pięciu o średniej krytyczności.

**Summary:** Program bezpieczeństwa Next.js dojrzewa do postaci, jakiej można oczekiwać od frameworka tej skali. Dotychczas łatki bezpieczeństwa pojawiały się ad hoc, bez zapowiedzi, co utrudniało planowanie. Teraz Vercel zobowiązuje się do publikowania zapowiedzi z wyprzedzeniem — informując o terminie i maksymalnym poziomie krytyczności nadchodzącej łatki. To daje czas na zaplanowanie aktualizacji i pozwala dostawcom hostingu przygotować reguły zapory sieciowej chroniące aplikacje, które jeszcze nie zdążyły się zaktualizować.

Kontekstem jest rosnący wolumen badań nad bezpieczeństwem, napędzany przez narzędzia oparte na LLM. Mozilla ujawniła ostatnio 271 problemów w jednym wydaniu Firefox, znalezionych przez Anthropic Mythos Preview. Vercel prowadzi podobne skanowanie Next.js przez własny zespół i program bug bounty. Tryb awaryjny dla krytycznych podatności aktywnie eksploatowanych w sieci pozostaje bez zmian — łatki będą publikowane natychmiast, niezależnie od harmonogramu.

**Key takeaways:**
- Miesięczny cykl z zapowiedzią daje czas na zaplanowanie aktualizacji w organizacjach z dłuższymi procesami wdrożeniowymi.
- Pierwsze wydanie: 20 lipca 2026, obejmuje Next.js 16.2 i 15.5.
- Program bug bounty dla Next.js i innych frameworków open source jest dostępny przez Vercel Open Source Bug Bounty.

**Why do I care:** Framework używany przez miliony aplikacji produkcyjnych potrzebuje przewidywalnego procesu bezpieczeństwa. Brak harmonogramu oznaczał, że organizacje z rygorystycznym procesem change management musiały albo łatać w pośpiechu, albo zostawać z podatnością. Przewidywalność to rzecz, którą duże firmy bardzo sobie cenią przy wyborze technologii.

**Link:** [Next.js Security Release and Our Next Patch Release](https://nextjs.org/blog/next-security-release-program)

---

## Better Auth dołącza do Vercel

**TLDR:** Better Auth, popularna biblioteka uwierzytelniania open source, ogłosiła przejście pod skrzydła Vercel. Biblioteka pozostaje open source i niezależna od platformy, a Next Auth/Auth.js już wcześniej dołączył do projektu.

**Summary:** Historia Better Auth zaczęła się od frustracji twórcy przy dodawaniu obsługi organizacji do aplikacji Next.js. NextAuth w 2023 roku radził sobie dobrze z prostym "zaloguj się przez Google", ale wsparcie dla wielodostępnych środowisk, ról i uprawnień wymagało tygodni pracy z nieergonomicznym API. Efektem było stworzenie frameworka agnostycznego względem platformy, który przez pluginy obsługuje dowolną funkcję uwierzytelnienia.

Przejście do Vercel ma konkretny cel. Uwierzytelnianie w erze agentów AI to inny problem niż logowanie użytkownika w przeglądarce. Agenty działające w imieniu użytkownika potrzebują ograniczonego, odwoływalnego dostępu z precyzyjnym zakresem uprawnień. Better Auth uruchomiło Agent Auth Protocol, a Vercel inwestuje w infrastrukturę agentową z projektami jak Eve i Vercel Connect. Połączenie sił ma sens technicznie i strategicznie. Biblioteka zachowuje otwartość — Vercel wprost zobowiązał się do utrzymania auth jako open source i niezależnego od platformy.

**Key takeaways:**
- Better Auth pozostaje open source i framework-agnostic po przejęciu.
- Auth.js/NextAuth.js jest teraz częścią ekosystemu Better Auth.
- Główny kierunek rozwoju to uwierzytelnianie dla systemów agentowych.

**Why do I care:** To ciekawa konsolidacja rynku uwierzytelniania. Z jednej strony mamy Supabase Auth, z drugiej Firebase Auth, a teraz Vercel buduje własny, silny kąt w tej przestrzeni przez Better Auth. Dla deweloperów pracujących na stosie Vercel to potencjalnie najwygodniejsza opcja. Pozostaje pytanie, jak zachowa się rzeczywista niezależność od platformy w praktyce — deklaracje są, ale czas pokaże.

**Link:** [Better Auth is joining Vercel](https://better-auth.com/blog/better-auth-joins-vercel)

---

## Suspense — co aktywuje granicę Suspense?

**TLDR:** Dokumentacja React opisuje sześć warunków aktywujących granicę Suspense. Warto znać je wszystkie, bo nie wszystkie są oczywiste — część dotyczy arkuszy stylów, fontów i obrazów w połączeniu z `ViewTransition`.

**Summary:** Często traktujemy Suspense jako mechanizm do obsługi ładowania danych przez `use()` lub `lazy()`. Tymczasem oficjalna dokumentacja wymienia kilka innych scenariuszy. Granica Suspense oczekuje na załadowanie arkuszy stylów renderowanych przez `<link rel="stylesheet">` z atrybutem `precedence` — co chroni przed momentem, gdy treść jest widoczna bez odpowiednich stylów. Podczas aktualizacji `<ViewTransition>` React blokuje również na fonty i obrazy, żeby animacja nie startowała z częściowo załadowanymi zasobami.

Interesująca jest też eksperymentalna właściwość `defer` dla granic Suspense: gdy `defer={true}`, React może najpierw pokazać fallback i wyrenderować lub przesłać strumieniowo dzieci później, nawet jeśli nic w nich nie zawiesza renderowania. To narzędzie do obsługi komponentów kosztownych obliczeniowo, nie tylko tych zależnych od danych zewnętrznych. Mechanizm throttlingu ujawniania granic co 300 ms też jest wart zapamiętania przy projektowaniu sekwencji ładowania.

**Key takeaways:**
- Suspense aktywuje `lazy()`, `use()`, arkusze stylów z `precedence`, strumieniowe SSR, fonty i obrazy (te dwa ostatnie tylko w `ViewTransition`).
- `useDeferredValue` to praktyczny wzorzec na pokazywanie nieaktualnych danych podczas ładowania nowych.
- `startTransition` zapobiega chowaniu już widocznej treści podczas nawigacji — routery oparte na Suspense powinny to robić automatycznie.

**Why do I care:** Debugowanie niespodziewanego zachowania Suspense jest trudne, jeśli nie wiesz, co może granicę aktywować. Arkusze stylów z `precedence` to szczególnie nieoczywisty przypadek, który łatwo pominąć przy code review.

**Link:** [Suspense – React](https://react.dev/reference/react/Suspense#what-activates-a-suspense-boundary)

---

## Optymistyczne UI i problem wielokrotnego kliknięcia

**TLDR:** `useOptimistic` wygląda świetnie w demo, ale szybkie kliknięcia wysyłają wiele równoległych żądań do bazy danych — rozwiązanie jest proste i sprowadza się do blokowania elementu, gdy żądanie jest w toku.

**Summary:** To jeden z tych artykułów, które opisują bug, który natychmiast rozpoznajesz. Checkbox z `useOptimistic` przełącza się natychmiast w UI, ale pięć szybkich kliknięć wysyła pięć żądań do bazy, które lądują w losowej kolejności. Nic nie wyrzuca błędu, UI wygląda poprawnie — po prostu rzeczywisty stan przestaje odpowiadać temu, co widać na ekranie.

Rozwiązanie to blokowanie konkretnego elementu (nie całej listy) na czas trwania żądania przez prosty `useState<string | null>(null)` śledzący `id` aktualnie przetwarzanego elementu. Co do cofania optymistycznej aktualizacji przy błędzie — w przypadku prostego przełącznika `useOptimistic` robi to automatycznie po zakończeniu tranzycji, bo tymczasowa wartość jest nakładką na stan bazowy. Ręczne cofanie trzeba pisać tylko gdy optymistycznie dodajemy nowy element, który jeszcze nie istnieje na serwerze.

Artykuł porusza też różnicę między `revalidatePath`, `revalidateTag` i nowym `updateTag` w Next.js 16. `updateTag` wygasa tag natychmiast dla bieżącej strony, co jest właściwym wyborem gdy użytkownik patrzy na wynik swojej akcji.

**Key takeaways:**
- Blokuj tylko ten element listy, dla którego trwa żądanie, a nie całą listę.
- `useOptimistic` automatycznie cofa stan tymczasowy po zakończeniu tranzycji — ręczne cofanie jest potrzebne tylko przy dodawaniu nowych elementów.
- `updateTag` w Next.js 16 natychmiast wygasa cache dla bieżącej strony, `revalidateTag` działa z opóźnieniem i dla wszystkich stron.

**Why do I care:** Optymistyczne UI to jeden z tych wzorców, które wyglądają świetnie w demo (jeden klik, brak spinnera) i schodzą się w produkcji od przypadków brzegowych. Szybkie kliknięcia, zgubione połączenie w połowie żądania, jednoczesna edycja przez dwóch użytkowników — to są rzeczy, o których trzeba myśleć zanim wyjdzie z kodu.

**Link:** [My Next.js 16 Optimistic UI Looked Perfect. Then Someone Clicked It Five Times Fast](https://dev.to/shubhradev/my-nextjs-16-optimistic-ui-looked-perfect-then-someone-clicked-it-five-times-fast-b2c)

---

## SolidJS 2.0 beta — pierwsze spojrzenie z perspektywy React developera

**TLDR:** SolidJS 2.0 beta wprowadza natywną obsługę asynchronicznych danych w grafie reaktywności. Sygnały, które zwracają Promise'y, są teraz obywatelami pierwszej klasy, a rozróżnienie między "jeszcze nic nie mamy" a "odświeżamy to, co już mamy" jest wbudowane w prymitywy.

**Summary:** Kluczowa zmiana konceptualna to to, że `createMemo` może zwracać Promise i graf reaktywności wie, co z tym zrobić. Nie potrzebujesz `createResource` ani wrapper'a — asynchroniczne dane po prostu płyną przez reaktywny graf. Nowy `<Loading>` zastępuje `<Suspense>` z semantyką skoncentrowaną wyłącznie na pierwszym ładowaniu: pokazuje fallback dopóki poddrzewo nie ma nic do wyświetlenia, a potem schodzi z drogi. Przy odświeżaniu danych treść nie znika i nie pojawia się spinner — do tego służy `isPending`.

Batching zapisów na mikrozadaniu to zmiana, która trochę może zaskoczyć przyzwyczajonych do synchroniczności Reacta. `setCount(1); count()` zwróci nadal `0` — żeby odczytać zaktualizowaną wartość synchronicznie, trzeba wywołać `flush()`. Zmiany nazw są liczne: `<Suspense>` staje się `<Loading>`, `createEffect` rozdziela się na fazę śledzenia i fazę efektu ubocznego, sklepy domyślnie działają jak Immer z mutowaniem wersji roboczej.

Propozycja TC39 Signals (Stage 1) z udziałem twórcy Solid, Ryana Carniate, dąży do standaryzacji reaktywności na poziomie języka. Solid 2.0 nie implementuje tej propozycji bezpośrednio, bo obsługuje asynchroniczność, która wykracza poza obecny zakres propozycji.

**Key takeaways:**
- `createMemo` może teraz zwracać Promise, co eliminuje potrzebę `createResource` dla większości przypadków.
- `<Loading>` dotyczy wyłącznie pierwszego ładowania, `isPending` informuje o odświeżaniu.
- Zapis jest buforowany na mikrozadaniu — inaczej niż synchroniczny model Reacta.
- Beta jest dostępna jako `solid-js@next`.

**Why do I care:** Solid od lat pokazuje, że wirtualny DOM to kompromis, nie konieczność. Wersja 2.0 idzie krok dalej: asynchroniczność jako prymityw, nie nakładka. React 19 robi podobne rzeczy przez tranzycje i Suspense, ale wymaga opt-inu w każdym miejscu. Nie planuję przepisywać projektów, ale weekend z `solid-js@next` to dobra inwestycja żeby zobaczyć, co można przenieść z powrotem do codziennej pracy z React.

**Link:** [SolidJS 2.0: A React Developer's First Look at Signals and Async](https://morello.dev/blog/solidjs-2-react-developers-first-look)

---

## Asynchroniczna hydratacja w Preact — Hydration 2.0

**TLDR:** Preact implementuje "resumed hydration" przez Suspense, gdzie granice hydratują się niezależnie. Hydration 2.0 naprawia przypadek narożny gdzie zawieszona granica zwraca zero lub wiele węzłów DOM — zamiast jednego.

**Summary:** Hydratacja synchroniczna to podejście wszystko-albo-nic: nic na stronie nie jest interaktywne dopóki cały JavaScript się nie wykonał. Preact od jakiegoś czasu wspiera "resumed hydration", gdzie granice Suspense hydratują się niezależnie. Gdy dziecko zawiesza hydratację, Preact zapamiętuje gdzie skończyło i kontynuuje resztę aplikacji. Po rozwiązaniu Promise'a wraca do tej granicy.

Hydration 2.0 rozwiązuje problem z poprzednim algorytmem: ten zapamiętywał dokładnie jeden węzeł DOM jako punkt kontynuacji. To psuło się gdy zawieszona granica produkowała zero węzłów (komponent zwracający `null`) lub wiele węzłów (Fragment). Nowe podejście polega na emitowaniu przez `renderToStringAsync` znaczników otwierających i zamykających wokół DOM produkowanego przez zawieszony komponent. Klient może wtedy precyzyjnie zidentyfikować zakres DOM należący do tej granicy.

Otwarty problem to stabilność `useId` przez asynchroniczne granice. Gdy granice rozwiązują się w innej kolejności po stronie klienta niż serwera, identyfikatory wychodzą różne — co psuje atrybuty `aria-*`. Kilka prób naprawy musiało być cofniętych przez jeszcze subtelniejsze regresje. Streaming HTML jest planowany na Preact 11.

**Key takeaways:**
- Preact ma "resumed hydration" od jakiegoś czasu — Hydration 2.0 czyni ją niezawodną.
- Granice hydratują niezależnie, co zmniejsza czas blokowania głównego wątku.
- Stabilność `useId` przez asynchroniczne granice to nadal otwarty problem.

**Why do I care:** Porównanie z selektywną hydratacją Reacta jest uczciwe — Preact pokrywa większość przypadków, z wyjątkiem priorytetyzacji na podstawie interakcji użytkownika. Dla aplikacji zbudowanych na Preact to ważna poprawa, a transparentność co do otwartych problemów (zwłaszcza `useId`) jest godna docenienia.

**Link:** [Async hydration in Preact](https://jovidecroock.com/blog/resumed-hydration-preact/)

---

## HTMX i Web Components zamiast React — architektura platformy analitycznej

**TLDR:** Architekt z FernUniversität w Hagen opisuje dlaczego wybrał HTMX i waniliowe Web Components zamiast React do platformy analitycznej. Kluczowy argument: kształt aplikacji determinuje wybór technologii, a nie odwrotnie.

**Summary:** Platforma do analizy danych edukacyjnych to w swojej naturze aplikacja request/response: wyszukaj, przeglądaj listę, otwórz szczegóły, rozwiń podgląd. Każda z tych interakcji to naturalnie żądanie i odpowiedź. Autor zadał pytanie, które powinno poprzedzać każdą decyzję technologiczną: które nasze konkretne problemy rozwiązałby React? Odpowiedź była żadnych.

HTMX pozwala serwerowi pozostać jedynym źródłem prawdy: renderuje HTML i podmienia fragmenty strony. Stan żyje w bazie danych i URL-u — parametry wyszukiwania są w query stringu, co sprawia że deep linking i przyciski back/forward działają bez żadnego dodatkowego wysiłku. Dwadzieścia waniliowych Web Components pokrywa to, co naprawdę wymaga logiki po stronie klienta: sortowalne tabele, dialogi, wykresy, interaktywny graf powiązań. Każdy komponent musiał "zarobić" na swoje istnienie zachowaniem.

Ciekawy wątek to dostępność: gdy Web Component jest wyjątkiem, a nie regułą, naturalnie zadaje się pytanie "czy istnieje semantyczny element HTML który to robi?". `<dialog>` daje focus trapping, klawisz Escape i poprawną semantykę za darmo. Argument dziesięcioletni: kod oparty na standardach webowych ma ćwierćwiecze historii wstecznej kompatybilności za sobą. Baza kodu React z dziesięć lat temu to dziś projekt migracyjny.

**Key takeaways:**
- Wybór stosu powinien wynikać z kształtu aplikacji — request/response nie potrzebuje SPA.
- HTMX + 20 Web Components zastępuje cały framework frontendowy dla platformy danych.
- Semantyczny HTML jako domyślny wybór strukturalnie wymusza myślenie o dostępności.
- Realne koszty: brak ekosystemu React, brak optymistycznego UI, mniejsza pula rekrutacyjna.

**Why do I care:** To uczciwy, dobrze argumentowany przypadek użycia. Nie jest anty-React — jest pro-odpowiedniego-narzędzia. Argument o horyzoncie dziesięcioletnim i kosztach utrzymania przez kolejne zespoły trafia w rzeczywistość platform instytucjonalnych, gdzie software musi przeżyć budżet projektu.

**Link:** [HTMX and Web Components Instead of React](https://kore-nordmann.de/blog/htmx-and-web-components-instead-of-react.html)

---

## Storybook 10.5 — AI workflows i Angular Vite

**TLDR:** Storybook 10.5 wprowadza eksperymentalne wsparcie dla AI workflow: agentic review z podglądem wizualnych zmian, pluginy dla Claude i Codex, framework Angular-Vite jako preview oraz nowy mechanizm docgen dla React oparty na otwartym serwisie.

**Summary:** Wydanie skupia się na dwóch obszarach. Po pierwsze, integracja z narzędziami AI: eksperymentalna opcja "agentic review" generuje kuratowane zestawy wizualnych zmian i wyniki wyszukiwania, pluginy dla Claude i Codex pozwalają na integrację ADE jednym kliknięciem. Nowy serwis docgen dla React ujednolica metadane między MCP, Docs i Controls. Po drugie, framework `@storybook/angular-vite` jako preview — nowocześniejszy i szybszy dev server dla projektów Angular.

Nowa opcja `initialGlobals` w adonie Vitest pozwala przypinać globalne ustawienia projektu (motyw, viewport, locale), co umożliwia systematyczne testowanie kombinacji bez ręcznego przepisywania stories. To praktyczna odpowiedź na częsty problem z testowaniem wielomotywowych UI.

**Key takeaways:**
- `@storybook/angular-vite` jako preview — szybszy pipeline dla Angular.
- `initialGlobals` w Vitest umożliwia testowanie między motywami i viewportami.
- Eksperymentalne pluginy AI (Claude, Codex) dla jednokliku integracji ADE.
- Ujednolicony docgen serwis dla React między MCP, Docs i Controls.

**Why do I care:** Kierunek Storybooka z MCP i integracjami AI jest logiczny — narzędzia do pracy z komponentami i narzędzia AI naturalnie się uzupełniają. Praktyczny wynik dla codziennej pracy to lepsza jakość docgen w React, co przekłada się na bardziej użyteczne Controls i Docs bez ręcznego dokumentowania propów.

**Link:** [Release v10.5.0 · storybookjs/storybook](https://github.com/storybookjs/storybook/releases/tag/v10.5.0)

---

## Rive React Native przepisany na Nitro Modules — 94x szybciej

**TLDR:** Przepisanie SDK Rive dla React Native z Nitro Modules zamiast klasycznych NativeModules pozwoliło na współdzielenie jednego pliku `.riv` między wieloma widokami. Efekt: 24 widoki renderują się w 29 ms zamiast 2716 ms.

**Summary:** Problem z poprzednią architekturą był strukturalny: React Native TurboModules to singletony z płaską listą metod. Rive potrzebuje modelu obiektowego — plików, widoków, właściwości — które można tworzyć, przechowywać i przekazywać. Bez tego każdy widok musiał samodzielnie parsować plik `.riv`, każdorazowo. Przy 24 widokach korzystających z pliku 2.9 MB efektem jest blokada przez 2.7 sekundy.

Nitro Modules pozwalają na implementowanie obiektów JavaScript w C++, Swift lub Kotlin. `RiveFile` staje się `HybridObject` — prawdziwym obiektem natywnym z własnym stanem, metodami i cyklem życia zarządzanym przez garbage collector (przez `jsi::NativeState`). Hook `useRiveFile` ładuje plik raz i udostępnia go wielu widokom. Efekt w liczbach: 24 widoki z jednego pliku — 29 ms vs 2716 ms, zużycie pamięci — 112 MB vs 525 MB. Nitro calls są też ~4-5x tańsze niż wywołania przez TurboModules na poziomie overhead per-call.

**Key takeaways:**
- Nitro Modules umożliwiają tworzenie natywnych obiektów (nie tylko modułów-singletonów), co rewolucjonizuje SDK z bogatym modelem obiektowym.
- Współdzielenie pliku między widokami eliminuje wielokrotne parsowanie — największe źródło zysku wydajnościowego.
- Zwolnienie zasobów jest deterministyczne przez `useRiveFile` hook i oparte na GC jako fallback.
- Własny framework testowy `react-native-harness` testuje SDK na prawdziwym symulatorze, nie mockach.

**Why do I care:** To konkretny dowód na to, że architektura warstwy natywnej ma ogromne znaczenie wydajnościowe niezależnie od jakości samego kodu React. Nitro Modules otwierają możliwości dla bibliotek z bogatym modelem obiektowym — wrappery audio, wideo, grafiki 2D/3D — które dotychczas musiały toczyć walkę z ograniczeniami TurboModules.

**Link:** [Rewriting Rive React Native with Nitro Modules: up to 94× Faster Multi-View Loads](https://blog.margelo.com/rewriting-rive-react-native-with-nitro-modules)

---

## Fetch potrzebuje kodów błędów — propozycja TC39

**TLDR:** Gdy `fetch()` rzuca błąd sieciowy, zawsze otrzymujesz `TypeError` bez żadnych informacji o przyczynie. Propozycja TC39 dodaje właściwość `.code` do konstruktora `Error`, co pozwoliłoby Fetch API na przekazywanie kodów błędów HTTP/2 i HTTP/3 do kodu aplikacji.

**Summary:** Problem jest konkretny: HTTP/2 i HTTP/3 mają bogatą semantykę błędów strumieniowych. `REFUSED_STREAM` w HTTP/2 oznacza "serwer nie przetworzył Twojego żądania — możesz bezpiecznie je powtórzyć", nawet dla żądań POST. `H3_REQUEST_CANCELLED` oznacza "serwer mógł częściowo przetworzyć żądanie — nie powtarzaj automatycznie". Fetch API niszczy tę informację, zwracając identyczny `TypeError` w obu przypadkach.

Przeglądarka celowo ukrywa szczegóły błędów dla żądań cross-origin — ujawnienie czy host się rozwiązuje, czy TLS jest skonfigurowany, czy port jest otwarty, to bezpieczeństwo. Ale dla żądań same-origin i serwerowych runtime'ów jak Node.js, Deno, Bun ta opaqueness jest bezużyteczna. Propozycja `.code` na konstruktorze `Error` (etap Stage 1, pod rozważenie Stage 2.7 na kolejnym plenum TC39) to minimalny, wstecznie kompatybilny mechanizm: istniejący kod nie sprawdzający `.code` zachowuje się identycznie.

**Key takeaways:**
- `REFUSED_STREAM`/`H3_REQUEST_REJECTED` gwarantuje retryability — Fetch API to traci.
- Propozycja `.code` na Error to mała zmiana z dużymi konsekwencjami dla obserwowalności.
- Kody preconnection (DNS, TLS) nie powinny być ujawniane dla żądań cross-origin.
- Node.js, Deno i Bun już używają konwencji `.code` — propozycja ją formalizuje.

**Why do I care:** Każdy kto debugował sieciowe błędy w kodzie produkcyjnym wie jak irytujące jest "TypeError: Failed to fetch" bez żadnego kontekstu. Możliwość programatycznego odróżnienia "nie przetworzone, można powtórzyć" od "anulowane w połowie" to realna różnica w jakości systemów do automatycznego retry i obserwowalności.

**Link:** [Fetch Needs Error Codes](https://www.jasnell.me/posts/fetch-needs-error-codes)

---

## npm v12 — skrypty instalacyjne domyślnie wyłączone

**TLDR:** npm v12 wyłącza domyślnie wykonywanie skryptów instalacyjnych z zależności. Pakiety z `preinstall`, `install`, `postinstall` i nawet niejawnym `node-gyp rebuild` nie uruchamiają się bez jawnego zatwierdzenia.

**Summary:** Prawie każdy atak na łańcuch dostaw npm w ostatnim roku uruchamiał swój ładunek podczas instalacji — zanim załadował się jakikolwiek kod aplikacji. Technika "Phantom Gyp" polegała na dodaniu małego pliku `binding.gyp` do pakietu, co wywoływało niejawny `node-gyp rebuild` podczas `npm install`, nawet bez żadnego skryptu lifecycleowego w `package.json`. Narzędzia skanujące `preinstall`/`postinstall` tego nie wykrywały.

npm v12 wprowadza miękkie blokowanie: nieautoryzowany skrypt jest pomijany z ostrzeżeniem, instalacja się kończy. Trybem ścisłym (`strict-allow-scripts`) zamieniamy ostrzeżenie w błąd. Warto wiedzieć że pominięty `node-gyp build` nie psuje instalacji — psuje runtime, gdy aplikacja próbuje załadować moduł, który nigdy nie był skompilowany. `sharp`, `better-sqlite3`, `bcrypt`, `node-sass`, `Cypress`, `Playwright`, `Electron` — wszystkie wymagają zatwierdzenia. pnpm wprowadził to w wersji 10, npm dołącza teraz.

**Key takeaways:**
- Skrypty instalacyjne i niejawny `node-gyp rebuild` wymagają teraz jawnego `allowScripts`.
- Pomijanie skryptu to ostrzeżenie, nie błąd — chyba że włączone jest `strict-allow-scripts`.
- Natywne moduły (sharp, better-sqlite3) mogą się nie skompilować bez zatwierdzenia.
- 2FA-bypass tokeny tracą uprawnienia do wrażliwych operacji konta od sierpnia 2026.

**Why do I care:** Supply chain attacks to jeden z najpoważniejszych problemów bezpieczeństwa frontendu. Zmiana jest znacząca i warto ją sprawdzić w CI pipeline'ach przed aktualizacją do npm v12. Dla projektów z natywnymi zależnościami konieczna jest aktualizacja konfiguracji. Kierunek jest właściwy — pnpm pokazał, że to możliwe.

**Link:** [npm v12 Ships With Install Scripts Off by Default](https://socket.dev/blog/npm-12)

---

## Czy nadal potrzebujemy narzędzi budowania?

**TLDR:** Szczegółowa analiza tego, które przypadki użycia CSS i JavaScript nadal wymagają bundlerów, a które można obsłużyć bez nich. Spoiler: dla większości dużych projektów bundler nadal jest potrzebny, ale z innych powodów niż dekadę temu.

**Summary:** Artykuł Olliego Williamsa przechodzi przez każdą kategorię narzędzi budowania osobno. Po stronie CSS: minifikacja pozostaje dobrą praktyką, kompresja wielu małych plików jest mniej wydajna niż jednego dużego, preprocessing przez Sass traci rację bytu w miarę jak CSS natively dostaje nesting, custom properties i funkcje kolorów. Po stronie JavaScript: bundlery redukują waterfall przez spłaszczenie grafu importów, eliminują nieużywany kod, a nawet z HTTP/2 setki niezbundlowanych modułów to problem wydajnościowy.

Importowanie modułów ES bezpośrednio z `node_modules` przez import maps jest technicznie możliwe, ale wymaga ręcznego mapowania wszystkich zależności przechodnich — co szybko staje się nieznośne. CDN-y jak esm.sh rozwiązują problem, ale kosztem zależności od zewnętrznej infrastruktury. TypeScript i JSDoc pozwalają na część pracy z typami bez kroku budowania, ale JSX wymaga transpilacji.

**Key takeaways:**
- Bundlowanie pozostaje konieczne dla większości projektów ze względu na efektywność kompresji i eliminację waterfallów.
- CSS preprocessing przez Sass traci popularność w miarę jak natywne CSS go wyprzedza.
- Import maps działają, ale zarządzanie zależnościami przechodnimi jest problematyczne bez narzędzi.
- Deweloperzy są niezadowoleni z narzędzi budowania od 2016 roku, a wskaźnik satysfakcji nie zmienił się mimo znacznej poprawy samych narzędzi.

**Why do I care:** To uczciwy obraz obecnego stanu. Argument o złożoności narzędzi jest prawdziwy — 42 497 pytań o Webpack na Stack Overflow (z czego 10 845 bez odpowiedzi) to realna liczba. Jednocześnie "no-build" to nie jest opcja dla projektu z TypeScriptem, JSX i dziesiątkami zależności. Interesujące jest to, że branża jako całość utknęła w punkcie, gdzie narzędzia nie przynoszą satysfakcji, ale alternatywy też nie wychodzą.

**Link:** [Do we still need build tools?](https://olliewilliams.xyz/blog/no-build/)
