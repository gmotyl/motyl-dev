---
title: "Lighthouse dla agentów AI, Basecoat 1.0 i psychologia wydajności — przegląd tygodnia"
excerpt: "Pięć artykułów o tym, jak AI zmienia wymagania wobec stron WWW, dlaczego aplikacje czujemy jako wolne nawet gdy są szybkie, oraz jak shadcn/ui trafia wreszcie poza React."
publishedAt: "2026-07-02"
slug: "lighthouse-agenci-ai-basecoat-psychologia-wydajnosci-2026-07-02"
hashtags: "#dailydev #frontend #webdev #rust #lighthouse #ai #architecture #performance #shadcn #tailwind #generated #pl"
source_pattern: "daily.dev"
---

## In Rust We Trust — daily.dev show (S1E10)

**TLDR:** Dziesiąty odcinek serialu daily.dev World poświęcony jest Rustowi — językowi, który od lat wzbudza zachwyt developerów, a teraz coraz śmielej wchodzi do mainstreamu. Rozmowa dotyka zarówno ekosystemu, jak i pytania, czy Rust to nadal niszowe hobby, czy realny wybór produkcyjny.

**Summary:** Daily.dev ma własny format wideo i podcastowy o nazwie daily.dev World, gdzie regularnie pojawiają się tematy gorące w społeczności programistycznej. Sezon 1, odcinek 10 to "In Rust We Trust" — tytuł nie jest przypadkowy. Rust od lat bije rekordy w rankingach "najbardziej lubianych języków" na Stack Overflow, a w 2024 roku Biały Dom wprost zaapelował do branży, żeby przenosiła krytyczne systemy z języków podatnych na błędy pamięci właśnie na Rusta.

To, co kiedyś brzmiało jak akademicki projekt, dziś staje się realnością w firmware, systemach operacyjnych, backendie sieciowym i toolingu. Rust trafia do Linuksa, do Androida, do Chrome'a. Microsoft pisał o przepisywaniu części Windows. Ale dla większości developerów webowych Rust wciąż pozostaje "tym językiem, który chciałbym kiedyś nauczyć się poprawnie". I tu pojawia się pytanie, które warto sobie zadać: czy to mit o stromej krzywej uczenia się nadal trzyma się prawdy, czy raczej jest wygodną wymówką?

Odcinek jest dostępny na platformie daily.dev World. Jeśli jesteś typem dewelopera, który śledzi trendy i zastanawia się, czy warto inwestować czas w naukę czegoś nowego — Rust to jeden z tych zakładów, które z roku na rok wyglądają coraz rozsądniej.

**Key takeaways:**
- Rust notuje rekordowe zainteresowanie produkcyjne — nie tylko akademickie
- Biały Dom w 2024 formalnie zalecił migrację z C/C++ na Rusta w krytycznych systemach
- Ekosystem rośnie: Nunjucks, Django, backend sieciowy, firmware — wszędzie te same argumenty o bezpieczeństwie pamięci
- Krzywa uczenia się jest realna, ale już mniej stroma niż 3 lata temu dzięki lepszej dokumentacji i toolingowi

**Why do I care:** Z perspektywy architekta frontendu, Rust jest coraz bardziej obecny nie jako "język backendowy" ale jako język toolingu webowego. Vite, Rollup, Biome, Turbopack — fundamenty nowoczesnego frontendu są pisane w Rust lub Go. To oznacza, że rozumienie chociażby podstaw wpływa na to, jak debugujemy, konfigurujemy i rozszerzamy nasze narzędzia. Ignorowanie Rusta w 2026 to jak ignorowanie Node.js w 2014.

**Link:** [In Rust We Trust - daily.dev show (S1E10)](https://daily.dev/posts/0D7y7HlXE)

---

## Is your site ready for AI agents? Lighthouse now has an answer

**TLDR:** Google Lighthouse 13.3 dostał nową kategorię audytów: "Agentic Browsing". Sprawdza ona, czy twoja strona jest gotowa na obsługę przez agenty AI — i wyniki pierwszych testów są brutalne, większość stron dostaje wyniki poniżej 50%.

**Summary:** Przez lata Lighthouse był narzędziem do mierzenia wydajności, dostępności i SEO. Teraz Google dodał czwarty wymiar: gotowość na obsługę przez agenty AI. Lighthouse 13.3 wprowadza kategorię "Agentic Browsing", która ocenia cztery rzeczy: czy accessibility tree jest poprawnie zbudowane, czy strona ma stabilny layout bez nagłych przesunięć treści, czy zaimplementowano WebMCP, i czy istnieje plik llms.txt.

Wyniki pierwszych testów są trzeźwiące. Typowa dobrze utrzymana strona w czerwcu 2026 zdobywała tylko 33% punktów w nowej kategorii, bo jedyną zdaną próbą był CLS. Llms.txt i accessibility tree — oblewają. A średnia dla całego internetu to 48 na 100, przy czym zaledwie 2% stron osiąga próg "AI-Ready" (80 punktów i więcej).

Co ciekawe, Google nie wymaga od ciebie zupełnie nowych technologii żeby zdać ten audyt. Przykład.com, czyli domyślna testowa strona W3C, dostaje zielone 2 na 2. To nie jest wyścig po nowe feature'y — to w dużej mierze powrót do podstaw. Poprawne accessibility tree oznacza, że twoja strona jest dostępna. Brak CLS to dobre praktyki od 2020 roku. WebMCP to coś nowego, ale llms.txt to prosty plik tekstowy.

Ważna uwaga z dokumentacji: kategoria jest wciąż oznaczona jako "under development". Google sam przyznaje, że jest dużo niepewności co do tego, czego agenty AI faktycznie potrzebują żeby efektywnie korzystać ze stron. To uczciwe podejście, ale powinno też hamować zbyt gwałtowny entuzjazm — nie warto przepisywać architektury aplikacji pod standard, który sam producent nazywa eksperymentalnym.

**Key takeaways:**
- Lighthouse 13.3 dodaje kategorię "Agentic Browsing" z czterema audytami: accessibility tree, CLS, WebMCP, llms.txt
- Średni wynik w internecie to 48/100, tylko 2% stron jest "AI-Ready"
- Większość wymagań to stare dobre praktyki (poprawny HTML, brak CLS), nie nowe technologie
- Kategoria jest wciąż "under development" — Google sam ostrzega przed nadmierną pewną siebie interpretacją
- Można sprawdzić swój wynik przez DebugBear lub komendę `lighthouse --view` lokalnie

**Why do I care:** Jako ktoś, kto pracuje z komponentami i architekturą frontendową, ten audyt mówi mi jedno: dostępność to nie filantropijny feature, to infrastruktura. Poprawne role ARIA, semantyczny HTML, accessibility tree — przez lata to były rzeczy, o które trzeba było walczyć z designem i biznesem. Teraz AI daje tym argumentom nową twarz. Może wreszcie trafi do decydentów.

**Link:** [Google Lighthouse Has A New Agentic Browsing Category](https://www.debugbear.com/blog/lighthouse-agentic-browsing)

---

## Software Architecture's Biggest Enemy (Not What You Think)

**TLDR:** Dave Farley, autor i praktyk Continuous Delivery, opublikował film o tym, co tak naprawdę niszczy architekturę oprogramowania — i spoiler: to nie jest zły kod ani zły framework. To coupling — sprzężenie, które narasta cicho, aż system staje się niemożliwy do zmiany.

**Summary:** Dave Farley to jeden z tych głosów w branży, który mówi rzeczy niemodne, ale prawdziwe. Jego film "Software Architecture's Biggest Enemy (Not What You Think)" wychodzi od pytania: dlaczego tak wiele zespołów widziało swoje oprogramowanie stopniowo spowalniać, aż wdrożenia zaczęły zajmować tygodnie, a każda zmiana wymagała koordynacji między dwunastoma zespołami?

Odpowiedź Farleya jest prosta, ale konsekwencje głęboka: największym wrogiem architektury jest coupling. Nie nieporządny kod, nie brak testów, nie zły framework, nie błędna decyzja technologiczna z 2018 roku. Coupling — czyli wzajemne zależności między modułami, serwisami, teamami — jest tym, co zamienia dobry system w system niemożliwy do zmiany bez efektu domina.

To, co mnie tutaj zatrzymuje to pytanie, którego Farley może nie zadaje wystarczająco głośno: coupling jest naturalną konsekwencją organizacji biznesu. Conway's Law mówi wprost — architektura systemu odzwierciedla strukturę komunikacji w organizacji. Jeśli masz dwadzieścia zespołów z rozmytymi granicami odpowiedzialności, twój system będzie miał dwadzieścia warstw sprzężenia niezależnie od tego, jaką architekturę narysujesz na tablicy. Film skupia się na symptomie, nie na przyczynie.

Z drugiej strony, Farley ma rację, że programiści zbyt chętnie eskalują problemy sprzężenia do "za trudne, to kwestia organizacyjna" i nie robią nic z tym, co mają pod kontrolą. Można pisać bardziej odsprzężony kod nawet w skomplikowanym środowisku. Testy jednostkowe wymuszają niskie sprzężenie — bo kod z wysokim sprzężeniem jest nie do przetestowania. To jest ten punkt, który warto zapamiętać.

**Key takeaways:**
- Największy wróg architektury to coupling, nie konkretny język, framework ani nieporządny kod
- Coupling narasta stopniowo i cicho — często nikt nie podejmuje decyzji "zróbmy to tightly coupled"
- Testy jednostkowe są naturalnym detektorem sprzężenia — niemożliwy do przetestowania kod to zazwyczaj kod zbyt silnie sprzężony
- Conway's Law oznacza, że decyzje architektoniczne muszą iść w parze z decyzjami organizacyjnymi
- Continuous Delivery nie jest możliwe bez modularnego, odsprzężonego systemu

**Why do I care:** Pracując z dużymi frontendem — monorepo, wiele pakietów, kilka teamów — coupling objawia się jako "hej, zmieniłem jeden komponent i zepsuła się strona w zupełnie innej części aplikacji". To nie jest problem z React ani TypeScript. To problem z granicami modułów. Farley daje dobry języzkowy aparat do rozmowy z teamem o tym, co warto zrobić inaczej.

**Link:** [Software Architecture's Biggest Enemy (Not What You Think)](https://www.youtube.com/watch?v=grPtnrOTP_4)

---

## Why Your App Feels Slow Even When It's Fast — The Psychology and Science of Perceived Performance

**TLDR:** Aplikacja może być technicznie szybka, a mimo to użytkownicy będą ją postrzegać jako wolną. Ten artykuł tłumaczy, dlaczego metryki z profilera kłamią o realnym doświadczeniu użytkownika i co naprawdę liczy się w perceived performance.

**Summary:** "Wydajność twojej aplikacji jest tak dobra, jak doświadczenie najwolniejszego użytkownika." To zdanie z artykułu powinno wisieć nad monitorem każdego developera, który odpalił profiler w Chrome DevTools na swoim MacBooku Pro podłączonym do gigabitowego internetu i ogłosił, że "aplikacja jest szybka".

Centralny argument jest taki: ludzki mózg nie mierzy czasu tak jak komputer. 2-sekundowy loader z paskiem postępu czujemy jako szybszy od 1-sekundowej pustej białej strony. Amazon przez lata dokumentował, że każde 100 milisekund dodatkowego czasu ładowania kosztuje 1% sprzedaży — nie dlatego, że strona była wolna, ale dlatego, że _czuła się_ wolna. To różnica fundamentalna.

Artykuł opisuje kilka ukrytych pułapek wydajnościowych, które profiler pomija. Animacje wyglądające idealnie na deweloperskim komputerze mogą gubić klatki na realnych, budżetowych urządzeniach użytkowników. Sekwencyjne ładowanie danych tworzy "wodospady" opóźnień niewidoczne w testach lokalnych — strona ładuje JavaScript, JavaScript wykonuje zapytanie API, API zwraca dane, dopiero wtedy następuje renderowanie. Każdy krok czeka na poprzedni, a łącznie to 3-4 sekundy perceived latency nawet gdy każdy krok trwa chwilę. Wycieki pamięci, które profiler uznaje za oczyszczone przez garbage collector, wracają po 30 minutach korzystania z aplikacji jako sporadyczne spowolnienia.

Rozwiązania są znane, ale rzadko priorytetyzowane: skeleton screens zamiast spinnerów, optimistic UI, prefetching danych przy hover, ładowanie krytycznych zasobów przed resztą. Prawda jest taka, że większość problemów z perceived performance to problemy designu — nie algorytmiczne poprawki, które wymagają tygodnia przepisywania.

Co mi tu brakuje w tym artykule? Rozmowy o narzędziach i metrykach, które rzeczywiście mierzą doświadczenie użytkownika w produkcji: Core Web Vitals w real user monitoring, Chrome User Experience Report, SpeedCurve. Artykuł opisuje problemy trafnie, ale rozwiązania są zbyt ogólne żeby wdrożyć je bez dodatkowego researchu.

**Key takeaways:**
- Perceived performance to nie to samo co zmierzona wydajność — ludzka percepcja czasu jest nieliniowa
- Puste ekrany są gorsze niż powolne ładowanie z feedbackiem wizualnym
- Sekwencyjne API calls tworzą nieproporcjonalne spowolnienia w odczuciu użytkownika
- Testy na własnym sprzęcie są zawodnicze — test na wolnych urządzeniach, 3G i trybie oszczędzania baterii
- Skeleton screens i optimistic UI mają 10x większy wpływ na perceived performance niż algorytmiczne optymalizacje

**Why do I care:** Frontend architecture to w dużej mierze zarządzanie tym, co użytkownik widzi i czuje. React 18 i Server Components zmieniają model ładowania, ale nie zmieniają neurologii. Priorytet streamu treści, Suspense boundaries, progressive hydration — wszystko to jest po części odpowiedzią na problem perceived performance. Ten artykuł przypomina, dlaczego te narzędzia w ogóle powstały.

**Link:** [Why Your App Feels Slow Even When It's Fast](https://medium.com/@hiren6997/why-your-android-app-still-feels-slow-even-after-profiling-707a5eea43d5)

---

## Basecoat 1.0 — shadcn/ui dla każdego stosu webowego, bez React

**TLDR:** Basecoat osiągnął wersję 1.0. To biblioteka komponentów z estetyką shadcn/ui zbudowana na Tailwind CSS i waniliowym JavaScript, działająca z dowolnym backendem — Flask, Rails, Laravel, Django, HTMX. Bez React, bez bundlera, bez JSX.

**Summary:** shadcn/ui wygrało wojnę o estetykę UI w świecie React. Problem w tym, że ta estetyka była wyłącznie dla React. Jeśli twoja aplikacja jest w Django, Laravel, Rails albo po prostu renderujesz HTML po stronie serwera, mogłeś patrzeć na piękne komponenty shadcn/ui z dystansu.

Basecoat 1.0 to pierwsza stabilna odpowiedź na ten problem. Biblioteka implementuje wizualny styl i konwencje komponentów shadcn/ui, ale w zwykłym HTML, Tailwind CSS i minimalnym JavaScript. Nie ma tu React, nie ma Radix UI, nie ma JSX. Jest za to jeden plik CSS, kilka kilobajtów JavaScript dla interaktywnych komponentów i zestaw szablonów Nunjucks i Jinja dla server-rendered stacks.

API jest świadomie proste: button z klasą `btn`, card z klasą `card`, badge z klasą `badge`. Warianty przez atrybuty `data-*` zamiast props. To eleganckie podejście — komponent wygląda tak samo w Django template jak w pliku HTML. Nie trzeba się zastanawiać, jak przekazać prop przez granicę serwer-klient.

Wersja 1.0 przynosi jeden ujednolicony pakiet `basecoat-css`, likwiduje stare CLI, dodaje szablony Nunjucks i Jinja bezpośrednio do pakietu npm, i publikuje osiem gotowych style packów (Vega, Nova, Maia i inne), które są kompatybilne z motywami shadcn/ui. Mam jeden zarzut: naming "style packs" jest nieoczywisty dla kogoś przychodzącego ze świata React — zanim ktoś zrozumie, że to odpowiednik "theme", musi przeczytać dokumentację.

Co jest na liście breaking changes: usunięto stare API formularzy, zmieniono sposób inicjalizacji JavaScript, przebudowano Combobox. Jeśli używałeś wersji pre-1.0 w produkcji, migracja wymaga uważnego czytania release notes.

**Key takeaways:**
- Basecoat 1.0 to stabilna biblioteka komponentów w stylu shadcn/ui bez React — działa z dowolnym backendem
- Instalacja przez `npm install basecoat-css`, użycie przez proste klasy HTML i atrybuty `data-*`
- Zawiera szablony Nunjucks i Jinja dla server-rendered stacks (Django, Flask, itd.)
- 8 gotowych style packów kompatybilnych z motywami shadcn/ui
- Liczne breaking changes z wersji pre-1.0 — wymagana migracja przy upgrade

**Why do I care:** Kiedy pracuję z ekosystemem e-commerce albo CMS, często mam do czynienia ze stackami, które nie są React-first. Basecoat otwiera możliwość spójnego design systemu w środowiskach, gdzie shadcn/ui było niedostępne. Z drugiej strony, warto obserwować, jak projekt będzie utrzymywany — shadcn/ui ewoluuje szybko, a Basecoat jest jedynym maintainerem, który musi za nim nadążać. To ryzyko długoterminowe, o którym artykuły hype'owe zazwyczaj nie mówią.

**Link:** [Basecoat 1.0 — shadcn/ui dla każdego stosu](https://basecoatui.com/introduction/)
