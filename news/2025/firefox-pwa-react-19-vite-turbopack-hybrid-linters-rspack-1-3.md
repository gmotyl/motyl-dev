---
title: "Przegląd: Firefox i PWA, React 19.1, buildery i narzędzia linters — co warto wiedzieć"
excerpt: "Omówienie najważniejszych materiałów o PWA w Firefoxie, wydaniu React 19.1, porównaniu Vite vs Turbopack, hybrydowych linterach i Rspack 1.3 — z praktycznymi wnioskami dla zespołów frontendowych i architektów."
publishedAt: "2025-03-31"
slug: "firefox-pwa-react-19-vite-turbopack-hybrid-linters-rspack-1-3"
hashtags: "#generated #pl #frontend #react #typescript #pwa #vite #turbopack #rspack #webdev #performance #architecture"
---

## Bytes #380 - Firefox is finally adding PWA support
**TLDR:** Firefox wreszcie idzie w stronę obsługi web apps, ale robi to po swojemu — Taskbar Tabs zachowuje pasek adresu i toolbar, a niekoniecznie przyjmuje specyfikację PWA znaną z Chromium. Dla deweloperów to sygnał, że PWA jako „standard” są mniej jednolite niż myśleliśmy, a doświadczenia będą różnić się między przeglądarkami.

**Summary:**
Firefox dodał eksperymentalny flag — browser.taskbarTabs.enabled — i pracuje nad funkcją nazwaną Taskbar Tabs, czyli pewnym wariantem obsługi web apps. Zamiast kopiować model Chromium (minimalne ramki, pełne „aplikacje”), Mozilla chce zachować elementy przeglądarki: pasek narzędzi, pasek adresu, rozszerzenia i pewne przyciski. Różnica jest istotna: to podejście deklaratywnie traktuje web apps jako „wciąż strony w przeglądarce”, a nie całkowicie oddzielne natywne okna.

Autor Bytes ma rację zwracając uwagę, że opóźnienie Mozilli sprawiło, że wielu deweloperów „przestawiło się” na inne rozwiązania, a rynek PWA już zdążył się podzielić. Firefox obiecuje jednopunktowe przypinanie zakładek do taskbara, przechwytywanie linków, oraz możliwość tymczasowego przejścia zakładki w tryb aplikacji bez ponownego logowania. Brzmi praktycznie, ale też „minimalnie” — wiele zaawansowanych API z PWA spec może nie być zaimplementowane.

Co autor unikał lub pominął: nie ma głębokiej dyskusji o kompatybilności funkcji (np. WebAPK, service workers zachowania w trybie „app-like”), o wpływie na bezpieczeństwo/izolację rozszerzeń, ani o tym, jak deweloperzy mają testować różnice między UA. Brakuje też rozważenia, jakie konsekwencje ma zachowanie paska adresu dla zaufania użytkowników przy captive flows (OAuth), deep linking czy instalacjach offline-first.

Dla zespołów i architektów: przygotujcie warstwę aplikacji, która nie polega na jedynym modelu instalacji. Jeśli Wasz produkt używa PWA-features intensywnie (background sync, web push, file system), sprawdźcie, które z nich działają w Firefox Nightly i miejcie plan fallbacków. Testy end-to-end powinny uwzględniać różne zachowania instalacji i przypinania linków.

**Key takeaways:**
- Firefox wprowadza Taskbar Tabs — podejście „app-like” ale z zachowaniem UI przeglądarki.
- Deweloperzy muszą testować PWA na kilku modelach instalacji, bo doświadczenia między przeglądarkami będą różne.
- Brakuje jeszcze jasności co do wsparcia zaawansowanych PWA-API i efektów na bezpieczeństwo/izolację.

**Tradeoffs:**
- "Zachowanie paska adresu utrzymuje spójność i bezpieczeństwo, ale kosztem bardziej natywnego odczucia aplikacji."
- "Minimum-viable approach przyspiesza wdrożenie, ale może pozostawić brakujące API i fragmentację doświadczeń."

**Link:** [Bytes #380 — Firefox is finally adding PWA support](https://bytes.dev/archives/380)

---

## Bug 1915736 (Taskbar-Tabs) — Mozilla Bugzilla meta ticket
**TLDR:** Meta-bug na Bugzilli agreguje zadania związane Taskbar Tabs; dyskusja pokazuje, że deweloperzy skupiają się na MVP (ikony, poprawne przypinanie) i odsuwają bardziej luksusowe rzeczy na później. To typowy sygnał: funkcjonalność wdrażana iteracyjnie, ale z ryzykiem pominięcia interoperacyjności.

**Summary:**
Meta ticket zgromadził dyskusje o priorytetach: zrealizować MVP, czyli zamianę ikony Firefox na favicon serwisu, poprawne pinowanie w taskbarze, a dopiero potem rozwiązywać kwestie kontekstowych menu, session restore czy detali UX. W komentarzach widać, że Taskbar Tabs trafia najpierw na Windows, użytkownicy pytają o Linux, a testy pojawiają się stopniowo w Nightly 139.

Z technicznego punktu widzenia ciekawy jest nacisk na to, by zminimalizować zależności, szybko osiągnąć wersję używalną i dopiero potem rozwijać. To rozsądne podejście, ale łatwo pominąć kompatybilność z ekosystemem PWA — np. czy link association będzie zgodne z manifestami, czy service workers będą się zachowywać jak w Chromium.

Czego autorzy i dyskutanci nie poruszają wystarczająco: testów automatycznych na różnych platformach, wpływu na policy i security model (np. uprawnienia okien vs. okien przeglądarki), ani strategii migracji użytkowników z istniejących app-like rozwiązań. Również słabo widać plan komunikacji dla deweloperów, by wiedzieli, które API działają, a które nie.

Dla architektów: obserwujcie śledzenie tego buga jeśli Wasze systemy polegają na deep linking lub przypinaniu (np. komunikatory, aplikacje prezentujące powiadomienia). Zadbajcie o testy interoperacyjności i plan awaryjny, gdy Taskbar Tabs zachowuje się inaczej niż w Chromium.

**Key takeaways:**
- Mozilla priorytetuje szybkie MVP: favicony i poprawne przypinanie.
- Funkcja trafia najpierw na Windows; Linux i reszta mogą pojawić się później.
- Konieczne testy międzyprzeglądarkowe i plan komunikacji dla deweloperów.

**Tradeoffs:**
- "Priorytetyzacja MVP przyspiesza wydanie, ale ryzykuje brak pełnej zgodności ze specyfikacją PWA."

**Link:** [Bug 1915736 — Taskbar Tabs (Bugzilla)](https://bugzilla.mozilla.org/show_bug.cgi?id=1915736)

---

## Progressive Web Apps | web.dev — zestaw materiałów i przewodnik
**TLDR:** web.dev oferuje wyczerpujący przegląd PWA: co to jest, jakie ma możliwości i jak zbudować aplikację webową z doświadczeniem aplikacji natywnej. To dobre źródło referencyjne, ale nie zastąpi testów na rzeczywistych przeglądarkach, które coraz bardziej różnią się we wdrożeniu PWA.

**Summary:**
Strona web.dev to formalny, techniczny przewodnik od Chromium team, który omawia koncepcję PWA, ich biznesowy sens i techniki budowy: manifest, service workers, caching, installability, push. Materiał jest praktyczny i stanowi punkt wyjścia do implementacji klasycznych PWA features.

Jednak kontekst rynkowy uległ zmianie — przeglądarki implementują PWA różnie (patrz Firefox), a platformy natywne nadal oferują lepszy dostęp do systemowych API. web.dev nadal trafnie opisuje core patterns, ale nie rozwiązuje problemu fragmentacji implementacji ani nie proponuje standardu, który absolutnie działa na wszystkich klientach.

Autorzy unikają głębszej dyskusji o strategiach versioningu service workers, migracji między modelami instalacji, czy wpływie specyficznych przeglądarek na UX i bezpieczeństwo. To typowy dokument referencyjny — świetny do nauki, ale nie wystarczający jako jedyny punkt odniesienia przy projektowaniu krytycznych workflowów offline lub background.

Dla zespołów: traktujcie web.dev jako checklistę techniczną, ale dopiszcie własne testy cross-browser, scenariusze fallbackowe i monitoring, żeby wychwycić różnice w zachowaniu PWA między Chromium, Safari i teraz Firefoxem.

**Key takeaways:**
- web.dev to solidna baza wiedzy o PWA: manifest, service workers, caching, installability.
- Fragmentacja implementacji przeglądarek oznacza konieczność testów na realnych klientach.
- Używajcie web.dev jako checklisty, nie jako jedynego źródła decyzji producenckich.

**Link:** [Progressive Web Apps — web.dev](https://web.dev/explore/progressive-web-apps/)

---

## Firefox is Finally Adding Support for Web Apps — OMG! Ubuntu article
**TLDR:** OMG! Ubuntu relacjonuje, że Firefox Nightly udostępnia flagę Taskbar Tabs i opisuje, jak Mozilla planuje różnić się od Chromium — m.in. zachowaniem toolbaru i możliwością „przejścia” zakładki w app mode bez wylogowania. Dobra szybka wiadomość, ale bez głębszej analizy konsekwencji.

**Summary:**
Artykuł koncentruje się na praktycznym aspekcie: instrukcji, jak włączyć flagę w Nightly i co się spodziewać. Podkreśla, że Taskbar Tabs nie jest kopią modelu Chromium i że Mozilla chce, by web apps były „wciąż w przeglądarce”, oferując jedynie app-like doświadczenie na zasadzie opcjonalnej. Artykuł wymienia też kilka funkcji: ikony w docku, otwieranie linków w zainstalowanej web appie, ustawianie zakładek.

Brakuje tu jednak bardziej krytycznych pytań: jak to wpłynie na programy, które polegają na izolacji okna, ile dodatkowej odpowiedzialności pozostawiono zespołom deweloperskim (np. testy zachowania service workers), i czy deweloperzy powinni oczekiwać wsparcia dla feature parity z Chromium. Tekst robi dobrą robotę informacyjną, ale ma powierzchowny charakter.

Dla zespołów produktowych: traktujcie to jako zaproszenie do weryfikacji instalowalności i deep linking w Firefoxie; nie spodziewajcie się jednak, że wszystko „po prostu zadziała” — przygotujcie testy, monitorujcie zachowanie na Nightly i release.

**Key takeaways:**
- Firefox Nightly udostępnia flagę Taskbar Tabs, zapowiadając web app integration.
- Podejście Mozilli różni się od Chromium: utrzymanie toolbaru i adresu.
- Artykuł informacyjny, ale nie analizuje szczegółowo konsekwencji technicznych.

**Link:** [Firefox is Finally Adding Support for Web Apps — OMG! Ubuntu](https://www.omgubuntu.co.uk/2025/03/firefox-nightly-supports-web-apps-taskbar-tabs)

---

## Release 19.1.0 (March 28, 2025) · facebook/react
**TLDR:** React 19.1 wprowadza kilka deweloperskich i perfomansowych usprawnień: Owner Stacks w dev-mode, rozszerzone wsparcie dla Suspense (również podczas hydration), poprawki schedulingu i mniejsze ciśnienie GC przy retry Suspense. To kolejne kroki w stabilizowaniu modelu Suspense i lepszym debugowaniu.

**Summary:**
W wydaniu 19.1 pojawił się koncept Owner Stack — deweloperskie ułatwienie pozwalające zidentyfikować komponenty odpowiedzialne za renderowanie danego elementu w czasie debugowania (tylko w dev builds). To konkretny, pragmatyczny krok poprawiający DX podczas tropienia błędów w złożonych drzewach komponentów.

Najważniejsze zmiany dotykają Suspense: lepsze wsparcie dla boundary wszędzie — na serwerze, kliencie i podczas hydration — oraz poprawki harmonogramu, które redukują niepotrzebne renderowania klienta. Dodatkowo poprawiono retry behaviour, co zmniejsza presję na garbage collector przy częstych retry Suspense boundaries. Wprowadzono też szereg drobnych napraw i ostrzeżeń deweloperskich (np. dev-only warning dla null/undefined w efektach).

Autorzy nie rozwodzą się nad wpływem tych zmian na istniejące aplikacje o dużej skali. Brakuje dyskusji o migracji dużych kodowych baz korzystających z kombinacji SSR, RSC i hydration (np. jak te zmiany wpłyną na memory footprint w długotrwałych sesjach). Nie ma też głębszej analizy narzędzi do profilowania nowych retry i schedulingu.

Dla architektów i zespołów: jeśli korzystacie z Suspense i server rendering, zaktualizujcie testy wydajnościowe i obserwujcie zachowanie pamięci przy długich sesjach. Owner Stacks ułatwią debugowanie i wdrażanie introspekcji błędów, co może zmniejszyć koszt lokalizowania regresji w produkcji.

**Key takeaways:**
- Owner Stacks pomagają debugować, będą dostępne tylko w dev builds.
- Poprawki Suspense (hydration, scheduling, retry) redukują nadmiarowe rendery i pressure na GC.
- Aktualizacja wymaga testów wydajnościowych dla dużych aplikacji korzystających z SSR/RSC.

**Tradeoffs:**
- "Wyższa czystość dev-UX (Owner Stacks) oznacza dodatkowy narzut implementacyjny tylko w dev buildach, a więc nie rozwiązuje problemów widocznych w produkcji."
- "Agresywniejsze optymalizacje hydrate/suspense zmniejszają render cost, ale mogą zmieniać czas pojawienia się treści i wymagać dostrojenia priorytetów."

**Link:** [Release 19.1.0 — React (GitHub)](https://github.com/facebook/react/releases/tag/v19.1.0)

---

## War story: the hardest bug I ever debugged — ClientServer.dev
**TLDR:** Opowieść o nie-deterministycznym, rzadkim crashu w Google Docs, którego lokalizacja ujawniła słabości w cache'owaniu i engine layoutu aplikacji. To lekcja: skomplikowane mikroskopijne optymalizacje (agresywne cache’owanie) potrafią ukryć groźne błędy, a reprodukowalność to klucz.

**Summary:**
Autor opisuje, jak w Google Docs pojawił się fatalny, sporadyczny błąd działający tylko w Chrome i ujawniany dopiero po wielu iteracjach operacji (bold/unbold). Problem był nie-deterministyczny — występował przypadkowo między 10. a 40. iteracją — i dopiero dzięki automatycznemu skryptowi autor uzyskał reprodukcję. Root cause leżał w „bookkeeping” view: obszerny system layoutu miał agresywne cache’owanie i podczas powtarzalnych zmian pojawiały się rozjazdy w strukturach danych.

Historia pokazuje, że debugowanie rzadkich bugów wymaga systematycznego podejścia: szukanie wzorców, tworzenie reprodukcji maszynowej, instrumentacja oraz pytanie „co się zmienia w czasie” (nie tylko „co tu jest inaczej”). Autor też sugeruje, że czasami należy poświęcić część wydajności na rzecz prostszej i bezpieczniejszej implementacji.

Czego brakuje w opowieści: głębszej analizy tradeoffs między optymalizacją pamięci a odpornością na błędy, oraz narzędzi i praktyk, które dziś (profilery, fuzzing, property-based tests) mogłyby skrócić diagnozę. Nie wspomniano też o długofalowym zarządzaniu długiem technicznym — jak zapobiegać narastaniu tego typu „micro-optimizations” w dużych kodowych bazach.

Dla zespołów: uczcie się reprodukować defekty automatycznie, miejcie scenariusze długotrwałego obciążenia i testy regresji, które nie tylko sprawdzają pojedyncze przypadki, ale powtarzalność sekwencji operacji. Przy projektowaniu silników layoutu rozważcie instrumentację stanu i prostsze invariants zamiast maksymalnej mikro-optymalizacji.

**Key takeaways:**
- Rzadkie błędy często ujawniają się przy powtarzalnych operacjach i agresywnym cache’owaniu.
- Reprodukcja automatyczna i narzędzia do powtarzania sekwencji to klucz do szybkiej diagnozy.
- Optymalizacje mikro mogą ukryć błędy — warto balansować między wydajnością a prostotą.

**Link:** [War story: the hardest bug I ever debugged — ClientServer.dev](https://www.clientserver.dev/p/war-story-the-hardest-bug-i-ever)

---

## Is Vite faster than Turbopack? — praktyczny test na realnym projekcie
**TLDR:** Autor przetestował czas startu deweloperskiego i operacje (cold start, page compilation, hard refresh, fast refresh) na realnym medium-sized Next.js app porównując Webpack, Turbopack i Vite. Wynik: ani metryka, ani doświadczenie nie dają jednoznacznej odpowiedzi — zależy od scenariusza i konfiguracji projektu.

**Summary:**
Artykuł to empiryczne porównanie wykonane na aplikacji Particl (ok. 200k LOC) i laptopie M1. Testy obejmowały cold start, kompilację strony przy przejściu do nowej trasy, hard refresh i Fast Refresh. Kluczowe spostrzeżenie: każdy bundler ma swoje mocne strony — Turbopack (ściślej zintegrowany z Next.js) jest obiecujący w scenariuszach powiązanych z frameworkiem, Vite błyszczy w prostszych projektach i szybkich edytach, a Webpack pozostaje stabilny, ale wolniejszy.

Autor postawił praktyczny warunek testowy: dwie kopie repo uruchamiane jednocześnie, śledzenie realnych opóźnień w renderowaniu w przeglądarce (wideo + scrubbing). To dobra metoda, bo pokazuje realne doświadczenie dewelopera, nie tylko syntetyczne benchmarki.

Co brakuje: analiza wpływu monorepo, wielu pakietów, oraz rozważań o pamięci i użyciu CPU w ciągu dłuższych sesji. Nie ma też dyskusji o kosztach migracji (np. zmiana konfiguracji, pluginów, edge-cases z aliasami). Autor unika porównań w kontekście CI i produkcyjnych pipeline’ów, gdzie zachowanie bundlera może się różnić.

Dla zespołów: zanim zmienicie bundler, zmierzcie realne przypadki użycia (dev-UX, hot-reload, cold starts) na waszym kodzie. Migracja to koszt — rozważcie instrumentację czasu deweloperskiego jako metrykę DX przy decyzji architektonicznej.

**Key takeaways:**
- Vite i Turbopack dają różne korzyści w zależności od projektu; nie ma jednego winnera.
- Realne testy na własnym kodzie są niezbędne przed zmianą bundlera.
- Migracja powinna uwzględniać koszty konfiguracji, pluginów i CI.

**Tradeoffs:**
- "Przejście na Vite może poprawić Fast Refresh i developer experience, ale wymaga pracy konfiguracyjnej i migracji pluginów."
- "Turbopack daje integrację z Next.js i potencjalne przyspieszenia, kosztem dojrzałości i ekosystemu w porównaniu z Vite."

**Link:** [Is Vite faster than Turbopack? — Kyle Gill (essays)](https://www.kylegil.com/essays/vite-vs-turbopack/)

---

## Hybrid Linters: The Best of Both Worlds — Goldblog (Hybrid linters idea)
**TLDR:** Pomysł „hybrydowego” lintera łączy natywną, szybką warstwę do parsowania i generowania type info z warstwą reguł napisaną w TypeScript; to kompromis między szybkością Rust/Go a przyjaznością tworzenia reguł w TS.

**Summary:**
Autor argumentuje, że wydajność linterów wynika głównie z parsowania i generowania informacji typów, dlatego te części sensownie jest przenieść do natywnego kodu (Rust/Go). Równocześnie warstwa koordynacyjna i reguły lintera są naturalnie przyjazne do implementowania w TypeScript — lepsza DX, łatwiejsze pluginy i społeczność. Dowód koncepcyjny pokazuje czasy rzędu ~2.9s dla 10k plików w proof-of-concept, co jest konkurencyjne z natywnymi narzędziami.

To rozsądne i praktyczne stanowisko: szybkość + ergonomia. Autor pokazuje, że JavaScript engines radzą sobie dobrze z samymi regułami, a większość czasu pochłania analiza typów. Hybrydowy model pozwala zyskać szybkość bez utraty przystępności ekosystemu reguł.

Czego brakuje: dyskusji o modelu bezpieczeństwa i izolacji reguł uruchamianych w JS (np. sandboxing), zarządzaniu wersjami tej „hybrydowej” architektury (kto odpowiada za API między natywną częścią a TS), oraz potencjalnych kosztach serializacji danych między procesami. Brakuje też omówienia, jak to wpływa na monorepo i incremental linting.

Dla zespołów: rozważcie hybrydowy model, jeśli skala lintowania w repo staje się problemem. Kluczowe jest projektowanie API między natywnym backendem a regułami TS, dobranie cache i strategii incremental run, oraz przemyślenie bezpieczeństwa uruchamiania reguł w środowisku deweloperskim.

**Key takeaways:**
- Parsowanie i type-info to główne źródła kosztu — przeniesienie ich do natywnego kodu daje największy zysk.
- Reguły w TypeScript zapewniają lepszy DX i większą elastyczność ekosystemu.
- Hybrydowy linter wymaga dobrze zaprojektowanego API między warstwami i uwzględnienia bezpieczeństwa.

**Tradeoffs:**
- "Hybrid approach gains performance from native parsing but sacrifices simplicity of single-runtime tooling."
- "TypeScript rule layer increases developer ergonomics but requires serialization boundary and version coordination."

**Link:** [Hybrid Linters: The Best of Both Worlds — Joshua Goldberg](https://www.joshuakgoldberg.com/blog/hybrid-linters-the-best-of-both-worlds/)

---

## Announcing Rspack 1.3 — Rspack blog
**TLDR:** Rspack 1.3 dodaje detekcję circular dependencies, wsparcie dla importów HTTP podczas buildu, ulepszenia lazy compilation i optymalizacje wydajności (code splitting, memory). To solidny krok, by Rspack stał się realną alternatywą bundlerów opartych na JS.

**Summary:**
Wersja 1.3 wprowadza kilka konkretnych nowości: plugin do wykrywania cyklicznych zależności zaimplementowany po rustowemu (bez kosztów serializacji), eksperyment umożliwiający pobieranie HTTP imports w czasie buildu zamiast runtime fetch (przydatne dla ESM CDN), oraz middleware dla lazy compilation by uniknąć uruchamiania dwóch serwerów deva. Do tego optymalizacje code splittingu (~25% faster), mniejsze bundle sizes i poprawki pamięciowe.

Szczególnie interesująca jest funkcja buildHttp — możliwość pobrania zewnętrznych modułów w czasie buildu i umieszczenia ich w cache/output. To zmienia paradygmat pracy z ESM CDN-ami i ułatwia offline-friendly buildy. CircularDependency plugin i middleware do lazy compilation poprawiają developer experience i diagnostykę błędów.

Czego autor nie rozwija: wpływu na bezpieczeństwo przy pobieraniu HTTP imports (zaufanie do zasobów z zewnętrznych CDN-ów), polityk cache invalidation i reproducibility buildów. Nie ma też szczegółów o kompatybilności z szeregiem istniejących pluginów Webpack/webpack ecosystem, ani na ile migracja z Webpack będzie bezbolesna.

Dla architektów: Rspack wygląda coraz bardziej jak poważny gracz — jeśli rozważacie migrację bundlera, przetestujcie buildHttp i lazy compilation middleware na swoich projektach, zwracając uwagę na reproducibility, zabezpieczenie zewnętrznych zależności i CI caches.

**Key takeaways:**
- Rspack 1.3: circular dependency detection, build-time HTTP imports, lazy compilation middleware i znaczące optymalizacje.
- buildHttp umożliwia bundlowanie zewnętrznych ESM CDN przy buildzie — przydatne, ale trzeba przemyśleć bezpieczeństwo i cache.
- Middleware lazy compilation usuwa potrzebę dwóch serwerów deva, upraszczając konfigurację.

**Tradeoffs:**
- "Build-time HTTP imports zwiększają deterministyczność buildów i offline capability, ale wymagają zaufania do zewnętrznych źródeł i strategii cache invalidation."
- "Rust implementation daje wydajność i mniej overheadu, ale zwiększa barierę wejścia dla contributorów nieznających toolchainu."

**Link:** [Announcing Rspack 1.3 — Rspack](https://rspack.dev/blog/announcing-1-3)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by gpt-5-mini LLM. While we strive for accuracy, please verify critical information independently.
