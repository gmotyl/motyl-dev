---
title: "Front-end i architektura — Moore's Law, Node.js Event Loop, Functional HTML, zależności, Mantine 8 i starter Next.js"
excerpt: "Zestaw krótkich analiz technicznych dla frontendowców i architektów o Node.js, reimaginacji HTML, zarządzaniu zależnościami, Mantine 8, oraz praktycznym starterze Next.js."
publishedAt: "2025-05-06"
slug: "frontend-architektura-nodejs-mantine-functional-html"
hashtags: "#generated #pl #javascript #typescript #react #nodejs #frontend #architecture #performance #nextjs #tailwind #vitest #mantine #html #server-components"
---

## Bytes #390 — Moore's Law is a social construct
**TLDR:** Esej przypomina, że Moore’s Law to raczej samospełniająca się obietnica niż fizyczne prawo, która ukształtowała decyzje przemysłu półprzewodników. Autor pokazuje, jak prognozy i narracje technologiczne potrafią zmieniać realne inwestycje i priorytety przemysłu.

Summary:
Autor zaczyna od historycznego kontekstu — jak przewidywania Gordona Moore’a z 1965 r. (pierwotnie roczne podwajanie) przekształciły się w powszechne oczekiwanie „około co dwa lata”. Kluczowa obserwacja: to nie obiektywne prawo fizyki, lecz zbiorowy plan działania branży, który — poprzez inwestycje i harmonogramy — stał się samospełniającą prognozą. To wyjaśnia, dlaczego tak wiele decyzji inżynieryjnych i biznesowych opierało się na tej narracji.

W praktyce autor argumentuje, że traktowanie Moore’s Law jako niepodważalnej zasady doprowadziło do przyspieszenia tempa innowacji, ale też do ryzykownych założeń: planowania chipów, fabryk i ekosystemów produkcyjnych pod konkretny wzrost. Gdy warunki ekonomiczne lub fizyczne zmieniły się, to wymuszało kosztowne korekty. To lektura przypominająca, że „przepisy” technologiczne bywają polityczne i społeczne, nie tylko naukowe.

Co autor omija lub słabo rozważa: brakuje analizy skutków dla oprogramowania — jak zmniejszanie tempa wzrostu mocy obliczeniowej wpływa na modele rozwoju stacków wysokopoziomowych, oczekiwania dotyczące optymalizacji, czy koszty chmury. Nie poruszono też mocno aspektów środowiskowych i kosztów kapitałowych skalowania fabryk półprzewodnikowych.

Dla architektów i zespołów: ta perspektywa uzmysławia, że nie można zakładać nieograniczonego rosnącego budżetu obliczeniowego. Planując architekturę aplikacji, warto przewidzieć ograniczenia wydajnościowe, koszt chmury i trend de‑riskingu przedłużających się inwestycji sprzętowych — zamiast bezrefleksyjnie polegać na „mocy, która zawsze się pojawi”.

Key takeaways:
- Moore’s Law to narracja ekonomiczno‑techniczna, nie surowe prawo fizyki.
- Branża konstruowała plany inwestycyjne wokół tej narracji, co wpływało na tempo innowacji.
- Inżynierowie powinni planować architekturę bez założenia nieograniczonego wzrostu mocy obliczeniowej.

Tradeoffs:
- Przyjęcie Moore’s Law jako wytycznej oznacza szybki postęp technologiczny, ale kosztem dużego ryzyka kapitałowego i zależności od trendów produkcyjnych.

Link: [Bytes #390 — Moore's Law is a social construct](https://bytes.dev/archives/390)

---

## DeepIntoDev — How Node.js works behind the scenes
**TLDR:** Szczegółowy przegląd mechanizmów Node.js: event loop, libuv i rolę różnych faz pętli zdarzeń — dlaczego runtime Nodea jest bardziej złożony niż model przeglądarkowy. Artykuł tłumaczy, skąd wynika ta złożoność i jakie ma to konsekwencje dla wydajności I/O.

Summary:
Autor tłumaczy, że Node.js nie jest tylko „JavaScriptem poza przeglądarką” — to kompletny runtime, który dzięki libuv mapuje wywołania asynchroniczne na mechanizmy systemowe (epoll, IOCP). Daje to Nodeowi zdolność do wydajnego obsługiwania operacji sieciowych i plikowych, ale wymaga rozbudowanej pętli zdarzeń z wieloma fazami, by poradzić sobie z różnymi rodzajami zadań i callbacków.

W artykule wyjaśnione są różnice między kolejkami zadań i mikrozadań (task queue vs microtask queue) oraz jak Node korzysta z wielu faz pętli, co wpływa na kolejność wykonywania operacji asynchronicznych. Autor porównuje to do prostszego modelu w przeglądarkach i pokazuje, że wiele błędów logicznych w serwerowych aplikacjach pochodzi z niepełnego zrozumienia tych niuansów.

Praktyczne wnioski: dla backendowych aplikacji asynchronicznych ważne jest projektowanie tak, by nie blokować faz pętli zdarzeń i by rozumieć, gdzie trafią promisy versus I/O callbacks. Artykuł podkreśla też znaczenie profilowania i używania narzędzi obserwowalności, bo błędy timingowe bywają subtelne i zależne od systemu.

Co autor pomija: brakuje głębszego omówienia wpływu tych mechanizmów na bezpieczeństwo (np. ataki typu event loop starvation) oraz mapowania na modele wielowątkowe (Worker Threads) w realnych systemach — autor wspomina, ale nie analizuje kompromisów między wielowątkowością a architekturą opartej na pętli zdarzeń.

Dla architektów i zespołów: zrozumienie pętli zdarzeń to warunek konieczny projektowania skalowalnych usług Node. Zespół powinien definiować kontrakty dotyczące czasu blokowania, stosować ograniczenia czasu wykonania operacji CPU‑bound i rozważyć offloading (workers, kolejki, microservices) tam, gdzie obciążenia CPU mogą zablokować event loop.

Key takeaways:
- Node.js używa libuv i wielofazowej pętli zdarzeń do obsługi różnorodnych operacji I/O.
- Różnice między kolejkami zadań a mikrozadań wpływają na kolejność i wydajność.
- Unikaj blokowania event loop; profiluj i obserwuj zachowanie runtime’u.

Tradeoffs:
- Zastosowanie event loop daje prostotę modelu asynchronicznego i niskie overhead I/O, ale kosztem złożoności mentalnej i trudności z obsługą obciążeń CPU‑bound.

Link: [How Node.js works behind the scenes](https://www.deepintodev.com/blog/how-nodejs-works-behind-the-scenes)

---

## Functional HTML — overreacted (reimagining HTML as server-driven components)
**TLDR:** Esej proponuje myślenie o HTML jako o języku serwera, gdzie znaczniki mogą być funkcjami serwerowymi, a serializacja zamiast czystego tekstu — może przyjmować formę struktur JSON. To ćwiczenie myślowe stawia pytania o granice między HTML, templatingiem i komponentami serwera.

Summary:
Autor zaczyna od prostego pytania: gdyby HTML miał być projektowany dziś od zera, które cechy byśmy dodali i w jakiej kolejności? Propozycja to „server tags” — znacznik w HTML, który ma semantykę funkcji po stronie serwera; po serializacji serwer wywołuje te funkcje i zwraca gotowy HTML. Dalej rozwija pomysł obsługi atrybutów, przekazywania obiektów i serializacji drzewa DOM jako struktury JSON zamiast czystego tekstu.

To podejście rozmywa granicę między HTML a komponentami serwera (server components). Autor pokazuje korzyści: bezpośrednie komponowanie interfejsu na serwerze, lepsze możliwości optymalizacji i mniejsza potrzeba klienta do wykonywania pracy. Jednocześnie ujawnia wyzwania: jak przesyłać obiekty, jak radzić sobie ze stylami, stanem i bezpieczeństwem serializacji.

Krytyczna uwaga autora (i nasza): to fascynująca koncepcja, ale nie rozwiązuje automatycznie problemów związanych z interakcją klient‑serwer — hydration, event handling, partial updates — i przenosi dużą odpowiedzialność na serwer. Brakuje też szerszej dyskusji o kosztach sieciowych i kompatybilności z narzędziami webowymi (cache CDN, edge rendering).

Dla architektów i zespołów: pomysł jest inspirujący jako model projektowy — server-driven components ułatwiają kontrolę nad renderingiem i mogą redukować czasu ładowania. Zespoły muszą jednak wyciągnąć balans: większa logika po stronie serwera oznacza prostszy klient, ale mocniej angażuje back‑end w skalowanie i bezpieczeństwo serializacji/stanu.

Key takeaways:
- Warto myśleć o HTML jako potencjalnym języku serwera z funkcjonalnymi tagami.
- Serializacja drzewa do struktur (np. JSON) daje nowe możliwości optymalizacji i kontroli.
- Przeniesienie logiki na serwer upraszcza klienta, ale zwiększa odpowiedzialność back‑endu.

Tradeoffs:
- Użycie server-driven components daje prostszy klient i lepszą kontrolę renderingu, ale kosztem większej odpowiedzialności serwera i potencjalnego wzrostu kosztów sieci/skalowania.

Link: [Functional HTML — overreacted](https://overreacted.io/functional-html/)

---

## Categorize Your Dependencies — antfu.me
**TLDR:** Artykuł porządkuje znaczenie dependencies vs devDependencies w package.json i pokazuje, że pierwotne rozróżnienie ma sens głównie dla bibliotek publikowanych na npm. W praktyce narzędzia buildowe nadały tym polom nowe role, co komplikuje decyzje.

Summary:
Autor zaczyna od przypomnienia podstaw: dependencies są do produkcji, devDependencies są do developu. Następnie rozbiera problem na trzy typy projektów — aplikacje, biblioteki i pakiety wewnętrzne (monorepo) — i pokazuje, że ich wymagania wobec package.json różnią się zasadniczo. Ważne wnioski: kontekst projektu determinuje, jak traktować zależności; nie ma jednego „słusznego” podziału.

Tekst omawia, jak współczesne narzędzia (Vite, tsup, bundlery) reinterpretują pola: Vite traktuje dependencies jako pakiety klienta do pre‑optymalizacji, bundlery zewnętrzają (externalize) zależności wymienione w dependencies, a narzędzia monorepo wpływają na to, co powinno być devDependency. To tłumaczy, dlaczego widzimy projekty z Vue w devDependencies — to może oznaczać inlining, typy lub tylko dev‑only użycie.

Autor sugeruje praktyczne reguły i heurystyki, a także zwraca uwagę, że dokumentacja projektów i narzędzi jest kluczowa: zamiast ślepo stosować konwencje, należy świadomie ustalać zasady dla repozytorium i je dokumentować. To pragmatyczne podejście zamiast dogmatyzmu.

Co brakuje: brak głębokiej dyskusji o narzędziach do automatycznego audytu zależności, o bezpieczeństwie supply chain (np. skanowanie podatności), oraz o wpływie na CI/CD i zarządzanie cache w monorepo. Autor też nie omawia konsekwencji licencyjnych i prawnych przy publikowaniu bibliotek.

Dla architektów i zespołów: ustalcie politykę zależności zależną od typu projektu. W monorepo zdefiniujcie reguły konwencji, wykorzystajcie narzędzia do audytu i automatyzacji (dependabot/renovate) oraz dokumentujcie powody umieszczenia konkretnego pakietu w dependencies vs devDependencies.

Key takeaways:
- Kontekst projektu determinuje sens fields dependencies vs devDependencies.
- Narzędzia buildowe reinterpretują te pola, co wymaga świadomych zasad.
- Dokumentacja i polityka zależności w repozytorium są ważniejsze niż domyślne konwencje.

Tradeoffs:
- Trzymanie pakietów w dependencies zapewnia kompatybilność dla konsumentów, ale może zwiększyć rozmiar bundla i komplikować tree‑shaking; trzymanie w devDependencies zmniejsza produkcyjny ślad, ale może prowadzić do braków przy publikacji biblioteki.

Link: [Categorize Your Dependencies — antfu.me](https://antfu.me/posts/categorize-deps)

---

## Version v8.0.0 | Mantine — changelog
**TLDR:** Mantine 8 wprowadza rozdzielenie globalnych styli, nowe komponenty (m.in. TimePicker), oraz zmianę reprezentacji dat na stringi (YYYY-MM-DD / YYYY-MM-DD HH:mm:ss) by unikać problemów z timezone. Są też breaking changes wymagające migracji.

Summary:
Changelog Mantine 8 skupia się na kilku kluczowych zmianach: granularne eksporty globalnych styli (baseline.css, default-css-variables.css, global.css), wsparcie submenu w Menu, nowe propsy jak hideDetached dla Popover, a przede wszystkim migracja komponentów dat do formatu stringów bez strefy czasowej. Autorzy tłumaczą, że zmiana dat wynika z problemów związanych z timezones i ma na celu przewidywalność wyników.

Dla dewelopera oznacza to, że przejście z Date objects na stringi wymaga aktualizacji kodu, szczególnie tam, gdzie logika opierała się na obiektach Date lub przekazywaniu timezone przez DatesProvider. Mantine sugeruje korzystanie z bibliotek dat (dayjs, luxon, date-fns) dla operacji na strefach czasowych. Dodano też TimePicker i zmiany w DateTimePicker, co daje więcej możliwości interakcji z czasem.

Autorzy dostarczają migracyjny przewodnik 7.x → 8.x oraz konkretne instrukcje, jak zmienić importy styli. To dobra praktyka, ale trzeba być świadomym, że migracja dotyczy wielu punktów integracji UI i testów. Uwaga: zmiana domyślnego formatu dat może wpłynąć na API serwera i integracje — szczególnie w systemach, które wcześniej oczekiwały obiektów Date.

Co nie zostało omówione dogłębnie: wpływ na istniejące testy (np. snapshoty) oraz na serializację/storowanie dat w bazach danych. Brakuje też rekomendacji migracyjnych dla systemów, gdzie backend sam oczekuje Date zamiast stringów.

Dla architektów i zespołów: planujcie migrację w kroku: testy → backend contract → UI. Ustalcie standard reprezentacji dat w całym stacku; jeśli potrzebujecie stref czasowych, zdecydujcie się na jedną z rekomendowanych bibliotek i dokumentujcie kontrakty API.

Key takeaways:
- Mantine 8 wprowadza granularne styli, nowe komponenty i zmienia format dat na stringi bez strefy czasowej.
- Migracja wymaga zmiany importów i aktualizacji miejsc, gdzie używane były obiekty Date.
- Zespoły powinny ustalić spójny sposób obsługi dat w całym stacku i zaktualizować testy.

Tradeoffs:
- Przechowywanie dat jako stringi eliminuje niespodzianki związane ze strefami czasowymi, ale zabiera natywne API Date i wymusza korzystanie z bibliotek do operacji czasowych.

Link: [Version v8.0.0 | Mantine changelog](https://mantine.dev/changelog/8-0-0/)

---

## Unverceled Next.js — GitHub starter (Next.js 15 + Cloudflare)
**TLDR:** Starter kit Next.js 15 zintegrowany z Cloudflare Workers (OpenNext) zawiera pełny zestaw narzędzi: testy (Playwright, Vitest), linting, CI, Tailwind, shadcn/UI i ścisłe ustawienia TypeScript — gotowy jako punkt wyjścia do produkcji.

Summary:
Repozytorium to „tooling heavy” starter: nie tyle przykład aplikacji, co kompletny setup narzędziowy. W paczce znajdziemy zmiany konfiguracyjne (wrangler.toml), Playwright do E2E, Vitest do testów jednostkowych i browser component testing, konfiguracje ESLint/Prettier, strict TypeScript, oraz integracje z shadcn i Tailwind. Wszystko to z myślą o wdrożeniu na Cloudflare Workers przy użyciu OpenNext.

To dobry start dla zespołów, które wolą skupić się na funkcjonalności, nie na konfiguracji. Wbudowane narzędzia CI, pre-commit hooks i testy E2E ułatwiają utrzymanie jakości. Jednocześnie taka „opinia” toolingu może narzucać pewne decyzje architektoniczne — np. preferencję dla deploya edge i konkretnego flow testowego.

Co autorzy nie analizują: kompromisów związanych z takim „ciężkim” starterem — większa złożoność onboardingowa dla nowych deweloperów, potencjalne nadmiarowe zależności i konieczność dostosowania do specyficznych wymagań projektu (np. inna platforma deploymentu). Brakuje też wskazówek migracyjnych jeśli zespół zaczyna od prostszego projektu i chce potem przyjąć ten stack.

Dla architektów i zespołów: wykorzystajcie taki starter jako mapę narzędzi, nie sztywną regułę. Przeprowadźcie audit, usuńcie niepotrzebne elementy i zadbajcie o dokumentację onboardingową. Jeśli planujecie edge deploy na Cloudflare, starter daje realne przyspieszenie prac.

Key takeaways:
- Kompletny starter z Next.js 15 i OpenNext na Cloudflare, z naciskiem na jakość narzędziową.
- Przyspiesza setup produkcyjny, ale może zwiększyć krzywą uczenia dla zespołu.
- Traktuj repozytorium jako bazę do adaptacji, nie jako jedyny sposób pracy.

Tradeoffs:
- Przyjęcie tooling‑heavy startera przyspiesza wdrożenie standardów i jakości, ale kosztem wzrostu złożoności onboardingowej i liczby zależności.

Link: [ixahmedxi/unverceled-nextjs — GitHub](https://github.com/ixahmedxi/unverceled-nextjs)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by gpt-5-mini LLM. While we strive for accuracy, please verify critical information independently.
